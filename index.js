const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static('www/'));
let server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const Room = require('./room');
let rooms = [
    new Room('room1', 'Mistnost jedna'),
    new Room('room2', 'Mistnost dva'),
    new Room('room3', 'Mistnost tri'),
    new Room('room4', 'Mistnost ctyri')
];

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('We got a new boi');

    socket.emit('roomlist', rooms);

    socket.on('disconnect', () => {
        console.log('Bye bye');
    });
    
});

