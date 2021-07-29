class DeathScreen {

  constructor() {    
    
    this.x = 0;
    this.size = 72;

    this.bg = new Sprite(PIXI.Texture.WHITE);
    this.bg.width = width;
    this.bg.height = height;
    this.bg.tint = 0x2C3539;
    this.bg.interactive = true;
    this.bg.on('pointertap', this.click);

    this.deathText = new PIXI.Text('Etzala Besigt!', {fontFamily: 'Arial', fontSize: 144, fill: 'red', align: 'center', stroke: 'black', strokeThickness: 5});
    this.clickText = new PIXI.Text("click to play again", {fontFamily: 'Arial', fontSize: this.size, fill: 'white', align: 'center', stroke: 'black', strokeThickness: 5});

    this.deathText.x = width / 2;
    this.deathText.y = 120;
    this.deathText.anchor.set(0.5, 0);

    this.clickText.x = width / 2;
    this.clickText.y = height / 2;
    this.clickText.anchor.set(0.5);

    this.container = new PIXI.Container();

    this.container.addChild(this.bg);
    this.container.addChild(this.deathText);
    this.container.addChild(this.clickText);
  }

  update() {
    this.x = (this.x + Math.PI / 32) % (2 * Math.PI);

    this.size = 72 + 8 * Math.sin(this.x);
    this.clickText.style.fontSize = this.size;
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



  click() {
    gameScreen = new GameScreen();
  	setActiveScreen(gameScreen);
  }

}