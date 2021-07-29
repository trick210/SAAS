class AudiA4 extends Entity {

  constructor() {
    super(555 + 192, 150 + 90, 384, 240, new Sprite(resources['audiImg'].texture));

    this.rot = -1;
    this.timeExp = 0;

    this.img.anchor.set(0.5);

    gameScreen.soundManager.play('skrrrSound', true);

  }

  update() {
    this.y += 4.5 * deltaTime / 20;
    this.x -= 2.3 * deltaTime / 20;

    this.timeExp += deltaTime;
    this.rot = (Math.floor(this.timeExp / 500) % 2) * 2 - 1;

    this.img.rotation = this.rot / 30;

    for (let i = 0; i < gameScreen.entities.length; i++) {
      if (gameScreen.entities[i] instanceof Haider && !gameScreen.entities[i].killed) {
        let h = gameScreen.entities[i];
        if (this.x - this.width / 2 < h.x + h.width / 2 && this.x + this.width / 2 > h.x - h.width / 2 && this.y > h.y && this.y < h.y + h.height * h.img.anchor.y) {
          h.kill();
        }
      }
    }

    if (this.y > height + 150) {
      this.remove();
    }

    super.update();
  }

}