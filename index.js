const express = require('express');
const socketIO = require('socket.io');
const Player = require('./player');

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

    socket.emit('roomlist', rooms.filter(i => !i.playing));

    let room, player;

    socket.on('joinreq', req => {  // req = { roomid: 'foo', name: 'users name' }
        console.log('joinreq', req);
        socket.join(req.roomid, () => {
            room = rooms[req.roomid];
            player = new Player(socket.id, req.name.substring(0, 16));
            room.newBoi(player);

            io.emit('roomlist', rooms.filter(i => !i.playing));  // TODO: send only to lobby
            socket.emit('joinres', player.admin);
            io.to(req.roomid).emit('room-status', room.players);

            if (player.admin)
                socket.on('start-game', nothing => {
                    room.start();
                    io.emit('roomlist', rooms.filter(i => !i.playing));
                    io.to(req.roomid).emit('game-started', 'xd');
                });
        });
    });

    socket.on('disconnect', () => {
        console.log('Bye bye');

        if (room) {
            room.boiLeft(player);
            io.to(room.id).emit('room-status', room.players);
            io.emit('roomlist', rooms);
            room = null;
        }
    });
    
});

