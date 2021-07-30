class Scream extends Entity {

  constructor(posX, posY) {
    super(posX + 120, posY - 30, 128, 128, resources['screamImg'].texture);

    this.layer = 10;

    this.rot = -1;

    this.clickCD = 500;
    this.timeExp = 0;

    this.layer = 10;
    this.anchor.set(0.5);

    this.screamID = Math.ceil(Math.random() * screamCount);
    soundManager.play(`scream${this.screamID}`);

  }

  update() {

    this.timeExp += deltaTime;
    this.rot = (Math.floor(this.timeExp / 50) % 2) * 2 - 1;
    
    this.rotation = this.rot / 20;

    if (this.timeExp > this.clickCD) {
      gameScreen.screamCD = false;

      this.remove();
    }
  }


}