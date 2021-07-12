let bg;
let haiders = [];

function setup() {
  bg = loadImage('assets/background.png');
  createCanvas(1280, 720);
}

function draw() {

  background(bg);

  for (let i = 0; i < haiders.length; i++) {
    haiders[i].move();
    haiders[i].display();
  }
}

mouseClicked() {
  append(haiders, new Haider(mouseX, mouseY));
}