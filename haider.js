class Haider {

  

  constructor(posX, posY) {
    this.x = posX;
    this.y = posY;

    this.width = 64;
    this.height = 128;

    this.currentAI = new RunAI(this);

    this.speed = 1 + random(1);
    this.fenceDist = random(50);

    this.damage = 1;

    this.killed = false;
    this.alpha = 1;
    
  }

  update() {

    this.currentAI.update();
    
  }

  display() {
    drawingContext.globalAlpha = this.alpha;
    if (this.killed) {
      push();
      scale(-1, 1);
      image(haiderImg, -this.x - this.width, this.y, this.width, this.height);
      pop();
    } else {
      image(haiderImg, this.x, this.y, this.width, this.height);
    }
    drawingContext.globalAlpha = 1;
  }

  click(posX, posY) {
    if (posX > this.x && posX < this.x + this.width && posY > this.y && posY < this.y + this.height && !this.killed) {
      gameScreen.score++;
      this.killed = true;
      this.currentAI = new WalkBackAI(this);
      return this;
    }

    return null;
  }
}