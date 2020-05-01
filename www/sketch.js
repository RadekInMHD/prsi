let socket;
let font;
let theTextIWantToWrite;

function preload() {
    font = loadFont('OpenSans-Light.ttf');
}

function setup() {
    socket = io();  // io.connect(window.location.origin);

    let roomButts = [];

    socket.on('roomlist', data => {
        console.log(data);

        for (let butt of roomButts)
            butt.remove();

        for (let room of data)
            roomButts.push(createButton(`${room.name} (${room.numberOfBois})`).mouseClicked(() => {
                console.log(`joining room ${room.id} ${room.name}`);
                socket.emit('joinreq', room.id);
            }));
    });

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