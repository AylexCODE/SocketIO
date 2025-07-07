const express = require('express');
const server = require('http').createServer(express);
const PORT = process.env.PORT || 8080;

const socketIo = require('socket.io')(server, {
    cors: { origin: '*' }
});

const connections = [];

socketIo.on('connection', socket => {
    console.log("A user connected successfully!");

    socket.on('createConnection', (id) => {
        connections[id] = socket.id;
        socket.join(connections[id]);

        console.log("Joined connection", id);
    });

    socket.on('connectToConnection', (id, callback) => {
        if(connections[id]){
            socket.join(connections[id]);
            callback({
                status: "connected"
            });
            console.log("Joined connection", id);
        }else{
            callback({
                status: "thatIdDoesNotExist"
            });
            console.log("Connection with ID: ", id, "does not exist");
        }
    });

    socket.on('sendMessage', (data) => {
        socketIo.in(connections[data.id]).emit('receivedMessage', data);

        console.log("Sending Message to", data.id, "[ Content:", data.message, "]");
    });
});

server.listen(PORT, () =>   
    console.log("Socket is listening... at port", PORT)    
);
