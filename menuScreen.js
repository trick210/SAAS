class MenuScreen extends Screen {

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

    fill(255);
    stroke(0);
    strokeWeight(3);

    textAlign(CENTER, TOP);

    textSize(64);
    text('Sturm auf Altschauerberg', 0, 30, width, height);

    textSize(48);
    text('A Youtuber\'s Life', 0, 120, width, height);



    textSize(this.size);

    text('click to play', 0, height / 2, width, height);
  }



  click(posX, posY) {
    if (posX > 0 && posX < width && posY > 0 && posY < height) {
  	  activeScreen = gameScreen;
    }
  }

}