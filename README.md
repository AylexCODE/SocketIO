# About This Repository
A simple socket.io project with `Rooms` feature

A Socket.IO room is an arbitrary channel that sockets can join and leave. It can be used to broadcast events to a subset of clients. [See here](https://socket.io/docs/v3/rooms/)

# Getting Started
To get a local copy up and running follow these simple example steps.

## Prerequisites
> [![NodeJS](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white)](https://nodejs.org)<br />
> **Node.js** is a JavaScript runtime that allows you to run JavaScript code on the server-side. You can think of it as the JavaScript runtime (e.g. console) from the web browser (e.g. Chrome) ripped out and made available for web servers.
  If you haven't already, head along to [https://nodejs.org](https://nodejs.org) and install Node on your machine.

* check node version
  ```sh
  node -v
  ```
* npm
  ```sh
  npm install npm@latest -g
  ```
* check npm version
  ```sh
  npm -v
  ```
  **npm** is the standard package manager for Node.js.
  **npm** installs, updates and manages downloads of dependencies of your project. Dependencies are pre-built pieces of code, such as libraries and packages, that your Node.js application needs to work.


## Installation
1. Clone the repository
   ```sh
   git clone https://github.com/AylexCODE/SocketIO.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Start server
   ```sh
   node .
   ```
   The output should be `Socket is listening... at port [PORT]`

# Adding Socket.io to HTML/Javascript Projects
## Client-side

include the client bundle from a CDN

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.8.1/socket.io.min.js"></script>
```

### Initialize socket

Localhost
```javascript
const socket = io();
```

Non-Local Host
```javascript
const socket = io("URL");
```

### Listen to connect/disconnects

```javascript
socket.on('connect', () => {
    console.log("Connected!");
});

socket.on('disconnect', () => {
    console.log("Disconnected!");
});
```

### Listening/Sending events from server

* Send event to a server
`socket.emit(event, ...args);`

```javascript
// example: 'sendMessage' event
socket.emit("sendMessage", "World");
```

* Listen for events sent by a server
`socket.on(event, ...args);`

```javascript
// example: 'recieveMessage' event
socket.on('recieveMessage', (message) => {
  console.log(message);
});
```

<br />

## Server-side

### Listening/Sending events from client

* Listen for an event sent by a client
`socket.on(event, ...args);`

```javascript
// example: listen for an event named 'sendMessage' sent by a client
socket.on("sendMessage", (message) => {
  console.log(message);
}
```

* Send an event to a client
`socket.emit(event, ...args);`

```javascript
// example: send an event named 'recieveMessage' to a client
socket.emit("receiveMessage", "Hi");
```

Refer to [Socket.IO](https://socket.io/docs/v3/) for more info.

That's all.
Don't forget to give the project a star! Thank you for visiting.
