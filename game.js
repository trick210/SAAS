let bg;
let houseFront;
let houseBack;
let fence = [];
let haiderImg;
let screamImg;
let menuScreen;
let gameScreen;
let deathScreen;
let activeScreen;

function preload() {

  bg = loadImage('assets/Sturm_auf_Schanze_hintergrund.png');
  houseFront = loadImage('assets/saas_Haus_Vorne.png');
  houseBack = loadImage('assets/saas_Haus_Hinten.png');
  for (let i = 1; i <= 7; i++) {
    fence.push(loadImage(`assets/fence/fence${i}.png`));
  }
  
  haiderImg = loadImage('assets/Haider.png');
  screamImg = loadImage('assets/schrei.png');

}

function setup() {
  

  createCanvas(1280, 720);

  gameScreen = new GameScreen();
  menuScreen = new MenuScreen();
  deathScreen = new DeathScreen();

  activeScreen = menuScreen;
}

function draw() {

  activeScreen.update();

  activeScreen.draw();

}



function mouseClicked() {

  activeScreen.click(mouseX, mouseY);
}

function keyPressed() {

  activeScreen.key(keyCode);
}

