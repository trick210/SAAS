let bg;

function setup() {
  bg = loadImage('assets/background.png');
  createCanvas(windowWidth, windowHeight);
}

function draw() {

  background(bg);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}