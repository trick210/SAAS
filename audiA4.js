class AudiA4 extends Entity {

  constructor() {
    super(370, 100);

    this.width = 256;
    this.height = 160;

    this.rot = -1;
    this.timeExp = 0;
  }

  update() {
    this.y += 3 * deltaTime / 20;
    this.x -= 1.5 * deltaTime / 20;

    this.timeExp += deltaTime;
    this.rot = (Math.floor(this.timeExp / 500) % 2) * 2 - 1;

    for (let i = 0; i < gameScreen.entities.length; i++) {
      if (gameScreen.entities[i] instanceof Haider && !gameScreen.entities[i].killed) {
        let h = gameScreen.entities[i];
        if (this.x < h.x + h.width && this.x + this.width > h.x && this.y > h.y && this.y < h.y + h.width) {
          h.kill();
        }
      }
    }

    if (this.y > height + 100) {
      this.remove();
    }
  }

  draw() {
    
    push();   
    
    translate(this.x + this.width / 2, this.y - 30 + this.height / 2);
    rotate(this.rot / 30);
    imageMode(CENTER);
    image(audiImg, 0, 0, this.width, this.height);
    pop();

  }
}