let bg;
let haiders = [];

function setup() {
  bg = loadImage('assets/background.png');
  createCanvas(1280, 720);
}

function draw() {

  background(bg);

  let r = random(50);
  if (r < 1) {
    spawn();
  }

  for (let i = 0; i < haiders.length; i++) {
    haiders[i].move();
    haiders[i].display();
  }


}

function spawn() {
  let y = random(160, 650);
  append(haiders, new Haider(-64, y));
}

function mouseClicked() {

  for (let i = 0; i < haiders.length; i++) {
    if (haiders[i].collide(mouseX, mouseY)) {
      haiders.splice(i, 1);
    }
  }
}

