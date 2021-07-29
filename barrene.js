class Barrene extends Entity {

  constructor(posX, posY) {
    super(posX, posY, 96, 96, new Sprite(resources['barreneImg'].texture));

    this.lifetime = 1500;

    this.alpha = 1;

    this.img.layer = 20;
    this.img.anchor.set(0.5);
  }

  update() {
    this.y -= 3 * (deltaTime / 20);

    this.lifetime -= deltaTime;

    if (this.lifetime < 1000) {
      this.alpha = (this.lifetime) / 1000;
    }

    this.img.alpha = this.alpha;

    super.update();

    if (this.lifetime < 0) {
      this.remove();
    }
  }


}