let bg;
var haiderImg;
let haiders = [];
var menuScreen;
var gameScreen;
var activeScreen;

function setup() {
  bg = loadImage('assets/background.png');
  haiderImg = loadImage('assets/Haider.png');
  createCanvas(1280, 720);

  gameScreen = new GameScreen();
  menuScreen = new MenuScreen();

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

