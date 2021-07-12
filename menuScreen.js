class MenuScreen extends Screen {

  constructor() {
    super();
    
    
    this.x = 0;
  }

  update() {
    this.x += Math.PI / 32;

    this.size = 48 + 5 * Math.sin(this.x)
  }


  draw() {
    background(51);

    fill(255);
    textAlign(CENTER, TOP);
    
    textSize(64);
    text('Der Sturm Der Drachenschanze', 0, 30, width, height);

    textSize(48);
    text('A Youtuber\'s Life', 0, 120, width, height);



    textSize(this.size);

    text('click to play', 0, height / 2, width, height);
  }



  click(posX, posY) {

  	activeScreen = gameScreen;
  }

}