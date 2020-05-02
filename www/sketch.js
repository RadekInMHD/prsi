let socket;
let playing = false;

function preload() {
    // font = loadFont('OpenSans-Light.ttf');
}

function setup() {
    socket = io();  // io.connect(window.location.origin);

    let roomButts = [];

    socket.on('roomlist', rooms => {
        console.log('roomlist', rooms);

        if (playing)
            return;

        for (let butt of roomButts)
            butt.remove();

        for (let room of rooms)
            roomButts.push(createButton(`${room.name} (${room.numberOfBois})`).mouseClicked(() => {
                console.log(`joining room ${room.id} ${room.name}`);
                socket.emit('joinreq', room.id);
            }));
    });

    
    socket.on('joinres', roomid => {
        console.log('joinres', roomid);
        playing = true;
        
        for (let butt of roomButts)
            butt.remove();  // .remove() removes the button only from th DOM, not from the roomButts (?)
        
        let playerPs = [];

        socket.on('room-status', status => {
            console.log('room-status', status);

            for (let p of playerPs)
                p.remove();  // .remove() removes the p only from th DOM, not from the playerPs (?)

            for (let p of status)
                playerPs.push(createP(p));
        });
    });

    noCanvas();

    // createCanvas(windowWidth, windowHeight);

    // textFont(font);
    // textSize(80);
    // textAlign(CENTER, CENTER);
}

// function draw() {
//     background(100);
//     text(theTextIWantToWrite, width / 2, height / 2);
// }

// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
// }