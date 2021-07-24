let bg;
let houseFront;
let houseBack;
let fence = [];
let haiderImg;
let screamImg;
let barreneImg;
let menuScreen;
let gameScreen;
let deathScreen;
let activeScreen;

let skrrrSound;

let csr;

function preload() {

  bg = loadImage('assets/Sturm_auf_Schanze_hintergrund.png');
  houseFront = loadImage('assets/saas_Haus_Vorne.png');
  houseBack = loadImage('assets/saas_Haus_Hinten.png');
  for (let i = 1; i <= 7; i++) {
    fence.push(loadImage(`assets/fence/fence${i}.png`));
  }
  
  haiderImg = loadImage('assets/Haider.png');
  screamImg = loadImage('assets/schrei.png');
  barreneImg = loadImage('assets/Barrene.png');
  audiImg = loadImage('assets/AudiA4.png')

  skrrrSound = loadSound('assets/sounds/skrrr-skrrr.mp3');
  

}

function setup() {
  

  createCanvas(1280, 720);

  skrrrSound.setVolume(0.1);

  gameScreen = new GameScreen();
  menuScreen = new MenuScreen();
  deathScreen = new DeathScreen();

  activeScreen = menuScreen;

}

function draw() {

  csr = ARROW;

  activeScreen.update();

  activeScreen.draw();

  cursor(csr);

}



function mouseClicked() {

  activeScreen.click(mouseX, mouseY);
}

function keyPressed() {

  activeScreen.key(keyCode);
}

function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

