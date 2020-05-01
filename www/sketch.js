let socket;
let font;
let theTextIWantToWrite;

function preload() {
    font = loadFont('OpenSans-Light.ttf');
}

function setup() {
    socket = io();  // io.connect(window.location.origin);

    socket.on('data', data => {
        console.log(data);
        theTextIWantToWrite = data;
    });

    createCanvas(windowWidth, windowHeight);

    textFont(font);
    textSize(80);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(100);
    text(theTextIWantToWrite, width / 2, height / 2);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}