class Barrene extends Entity {

  constructor(posX, posY) {
    super(posX, posY);

    this.lifetime = 1500;

    this.alpha = 1;
  }

  update() {
    this.y -= 2 * (deltaTime / 20);

    this.lifetime -= deltaTime;

    if (this.lifetime < 1000) {
      this.alpha = (this.lifetime) / 1000;
    }

    if (this.lifetime < 0) {
      let i = gameScreen.entities.indexOf(this);
      gameScreen.entities.splice(i, 1);
    }
  }

  draw() {
    drawingContext.globalAlpha = this.alpha;
    image(barreneImg, this.x - 32, this.y - 32, 64, 64)
    drawingContext.globalAlpha = 1;
  }

}