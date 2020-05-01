const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static('www/'));

let server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('We got a new boi');
    socket.on('disconnect', () => console.log('Bye bye'));
    setInterval(() => io.emit('data', `hello client, server here`), 1000);
});

