let socket;
let playing = false;

function preload() {
    // font = loadFont('OpenSans-Light.ttf');
}

function setup() {
    socket = io();  // io.connect(window.location.origin);

    let roomButts = [];

    socket.on('roomlist', data => {
        console.log('roomlist', data);

        if (playing)
            return;

        for (let butt of roomButts)
            butt.remove();

        for (let room of data)
            roomButts.push(createButton(`${room.name} (${room.numberOfBois})`).mouseClicked(() => {
                console.log(`joining room ${room.id} ${room.name}`);
                socket.emit('joinreq', room.id);
            }));
    });

    
    socket.on('joinres', data => {
        console.log('joinres', data);
        playing = true;
        
        for (let butt of roomButts)
            butt.remove();  // .remove() removes the button only from th DOM, not from the roomButts (?)
        
        let playerPs = [];

        socket.on('room-status', data => {
            console.log('room-status', data);

            for (let p of playerPs)
                p.remove();  // .remove() removes the button only from th DOM, not from the playerPs (?)

            for (let p of data)
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