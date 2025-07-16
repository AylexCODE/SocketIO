const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 8080;

const cors = require('cors');

const socketIo = require('socket.io')(server, {
    cors: { origin: '*' }
});

app.use(cors());

const connections = [];

function createServerConnection(id, socket){
    connections[id] = socket.id;
    console.log("Create connection", id);

    socket.join(connections[id]);
    console.log("Joined connection", id);
}

socketIo.on('connection', socket => {
    console.log("A user connected successfully!");

    socket.on('connectToConnection', (dacallback) => {
        console.log(type, id);
        if(type == "client"){
            if(connections[id]){
                socket.join(connections[id]);
                callback({
                    status: "Connected"
                });
                console.log("Joined connection", id);
            }else{
                callback({
                    status: "Invalid ID"
                });
                console.log("Connection with ID: ", id, "does not exist");
            }
        }else{
            createServerConnection(id, socket);
            callback({
                status: "Create Connection"
            });
        }
    });

    socket.on('sendMessage', (data) => {
        socketIo.in(connections[data.id]).emit('receivedMessage', data);

        console.log("Sending Message to", data.id, "[ Content:", data.message, "]");
    });

    socket.on('update', (data) => {
        socket.broadcast.emit('update', data);

        console.log("Update:", data);
    });

    socket.on('disconnect', () => {
        for(const connectionId of connections){
            console.log(connections, "=>", socket.id);
            if(connectionId == socket.id){
                delete connections[connectionId];
            }
        }
    });
});

app.get('/', (req, res) => {
    console.log("ok");
    
    res.status(200).send("ok");
});

server.listen(PORT, () =>   
    console.log("Socket is listening... at port", PORT)    
);
