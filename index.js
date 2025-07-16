const express = require('express');
const app = express();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 8080;

const cors = require('cors');

const socketIo = require('socket.io')(server, {
    cors: { origin: '*' }
});

app.use(cors());

const connections = {};
const servers = {};

function createServerConnection(id, socket, callback){
    try{
        if(id.includes(Object.keys(connections))){
            console.warn("Connection with id", id, "exist, generating new id");
            
            createServerConnection(Math.floor(Math.random() * 9999), socket, callback);
            return;
        }

        connections[id] = socket.id;
        console.log("Create connection", id);

        socket.join(connections[id]);
        console.log("Joined connection", id);

        servers[socket.id] = id;

        callback({
            status: "ok",
            id: id
        });
    }catch(error){
        callback({
            status: "error",
            id: 0000
        });
    }
}

socketIo.on('connection', socket => {
    console.log("A device connected successfully!");

    socket.on('connectToConnection', (data, callback) => {
        if(data.type == "client"){
            if(connections[data.id]){
                socket.join(connections[data.id]);
                callback({
                    status: "Connected"
                });
                console.log("Joined connection", data.id);
            }else{
                callback({
                    status: "Invalid ID"
                });
                console.log("Connection with ID: ", data.id, "does not exist");
            }
        }else{
            createServerConnection(data.id, socket, callback);
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
        console.log("User disconnected");
        if(servers.hasOwnProperty(socket.id)){
            const connectionId = servers[socket.id];

            delete connections[connectionId];
            delete servers[socket.id];

            console.log("Delete connection", connectionId);
            console.log(connections, servers);
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
