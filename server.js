const express = require('express');
const socket = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static('web'));

io.on('connection', (socket) => {
    console.log('un utilisateur est connecté');

    socket.on('video-stream', (data) => {
        socket.broadcast.emit('video-stream', data);
    });

    socket.on('disconnect', () => {
        console.log('un utilisateur est déconnecté');
    });
});

const PORT = 3000;
server.listen (PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});