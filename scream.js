class Scream extends Entity {

  constructor(posX, posY) {
    super(posX + 120, posY - 30, 128, 128, new Sprite(resources['screamImg'].texture));

    this.layer = 10;

    this.rot = -1;

    this.clickCD = 500;
    this.timeExp = 0;

    this.img.layer = 10;
    this.img.anchor.set(0.5);

    this.screamID = Math.ceil(Math.random() * screamCount);
    gameScreen.soundManager.play(`scream${this.screamID}`);

  }

  update() {

    this.timeExp += deltaTime;
    this.rot = (Math.floor(this.timeExp / 50) % 2) * 2 - 1;
    
    this.img.rotation = this.rot / 20;

    if (this.timeExp > this.clickCD) {
      gameScreen.screamCD = false;

      this.remove();
    }
  }


}