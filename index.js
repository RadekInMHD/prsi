const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.static('www/'));
let server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const Room = require('./room');
let rooms = [
    new Room(0, 'Mistnost jedna'),
    new Room(1, 'Mistnost dva'),
    new Room(2, 'Mistnost tri'),
    new Room(3, 'Mistnost ctyri')
];

const io = socketIO(server);

setInterval(() => console.log(rooms), 1000);

io.on('connection', (socket) => {
    console.log('We got a new boi');

    socket.emit('roomlist', rooms);

    let room;

    socket.on('joinreq', roomid => {
        console.log('joinreq', roomid);
        socket.join(roomid, () => {
            room = rooms[roomid];
            room.newBoi(socket.id);

            io.emit('roomlist', rooms);
            socket.emit('joinres', roomid);
            io.to(roomid).emit('room-status', room.players);
        });
    });

    socket.on('disconnect', () => {
        console.log('Bye bye');

        if (room) {
            room.boiLeft(socket.id);
            io.to(room.id).emit('room-status', room.players);
            io.emit('roomlist', rooms);
            room = null;
        }
    });
    
});

