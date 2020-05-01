const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 8080;

const Card = require('./card');
const bagr = new Card();
console.log(bagr.bagr);

const app = express();

app.use(express.static('www/'));

let server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('We got a new boi');

    let interval = setInterval(() => {
        let n = Math.floor(Math.random() * 1000);
        console.log(`sendin ${n}`);
        socket.emit('data', n);
    }, 1000);

    socket.on('disconnect', () => {
        clearInterval(interval);
        console.log('Bye bye');
    });
    
});

