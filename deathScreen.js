class DeathScreen extends Screen {

  constructor() {
    super();
    
    
    this.x = 0;
  }

  update() {
    this.x = (this.x + Math.PI / 32) % (2 * Math.PI);

    this.size = 48 + 5 * Math.sin(this.x)
  }


  draw() {
    background(51);

    fill(255, 0, 0);
    stroke(0);
    strokeWeight(3);

    textAlign(CENTER, TOP);

    textSize(96);
    text('Etzala Besigt!', 0, 120, width, height);

    fill(255);

    textSize(this.size);

    text('click to play again', 0, height / 2, width, height);
  }



  click(posX, posY) {
    if (posX > 0 && posX < width && posY > 0 && posY < height) {
      gameScreen = new GameScreen();
  	  activeScreen = gameScreen;
    }
  }

}