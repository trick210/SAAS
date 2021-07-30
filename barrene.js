class Barrene extends Entity {

  constructor(posX, posY) {
    super(posX, posY, 96, 96, resources['barreneImg'].texture);

    this.lifetime = 1500;

    this.alpha = 1;

    this.layer = 20;
    this.anchor.set(0.5);
  }

  update() {
    this.y -= 3 * (deltaTime / 20);

    this.lifetime -= deltaTime;

    if (this.lifetime < 1000) {
      this.alpha = (this.lifetime) / 1000;
    }

    if (this.lifetime < 0) {
      this.remove();
    }
  }


}