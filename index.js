const express = require('express');
const server = require('http').createServer(express);

const socketio = require('socket.io')(server, {
    cors: { origin: '*' }
});

const connections = [];

socketio.on('connection', socket => {
    //socket.emit('message', 'Hello World!');
    console.log("A user connected successfully!");

    socket.on('connectToRoom', socket => {
        
    });

    socket.on('update_admin', socket => {
        socketio.emit('update_admin', 'OK');
    });

    socket.on('update_user', socket => {
        socketio.emit('update_user', 'OK');
    });

    socket.on('message', socket => {
        socketio.emit('message', socket);
    });
});

server.listen(3000, () => 
    console.log("Socket is listening...")
);
