let socket;
let font;
let theTextIWantToWrite;

function preload() {
    font = loadFont('OpenSans-Light.ttf');
}

function setup() {
    socket = io();  // io.connect(window.location.origin);

    socket.on('roomlist', data => {
        console.log(data);

        for (let room of data)
            createButton(room.name).mouseClicked(() => console.log(`joining room ${room.id} ${room.name}`));
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