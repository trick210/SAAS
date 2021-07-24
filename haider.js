class Haider extends Entity {

  

  constructor(posX, posY) {
    super(posX, posY);

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

  draw() {
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
    if (posX > this.x && posX < this.x + this.width && posY > this.y && posY < this.y + this.height && !this.killed && !gameScreen.screamCD) {
      if (gameScreen.energy >= gameScreen.screamCost) {
        this.kill();
        gameScreen.entities.push(new Scream(this.x, this.y));
        gameScreen.energy -= gameScreen.screamCost;
        gameScreen.screamCD = true;
      }

      return true;
    }

    return false;
  }

  kill() {
    gameScreen.score++;
    this.killed = true;
    this.currentAI = new WalkBackAI(this);

    
  }
}