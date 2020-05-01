let socket;
let font;
let theTextIWantToWrite;

function preload() {
    font = loadFont('OpenSans-Light.ttf');
}

function setup() {
    socket = io.connect('http://localhost:8080');

    socket.on('data', data => {
        console.log(data);
        theTextIWantToWrite = data;
    });

    createCanvas(800, 400);

    textFont(font);
    textSize(80);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(100);
    text(theTextIWantToWrite, width / 2, height / 2);
}