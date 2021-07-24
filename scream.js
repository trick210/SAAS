class Scream extends Entity {

  constructor(posX, posY) {
    super(posX, posY);

    this.layer = 10;

    this.rot = -1;

    this.clickCD = 500;
    this.timeExp = 0;
  }

  update() {

    this.timeExp += deltaTime;
    this.rot = (Math.floor(this.timeExp / 50) % 2) * 2 - 1;
    

    if (this.timeExp > this.clickCD) {
      gameScreen.screamCD = false;

      this.remove();
    }
  }

  draw() {
    push();   
    translate(this.x + 120, this.y + 30);
    rotate(this.rot / 20);
    imageMode(CENTER);
    image(screamImg, 0, 0, 128 / 1.5, 128 / 1.5);
    pop();
  }

}