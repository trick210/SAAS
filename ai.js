class AI {

  constructor(haider) {
    this.haider = haider;
  }

  update() {

  }


}


class RunAI extends AI {

  constructor(haider) {
    super(haider);
  }

  update() {
    if (this.haider.x < width - 300 - this.haider.fenceDist) {
     this.haider.x += this.haider.speed;
    } else {
      this.haider.currentAI = new AttackAI(this.haider);
    }
  }
}


class AttackAI extends AI {

  constructor(haider) {
    super(haider);

    this.dmgCounter = 1000;
  }

  update() {
    
    this.dmgCounter += deltaTime * (deltaTime / 20);

    if (this.dmgCounter > 1000) {
      this.dmgCounter = 0;
      gameScreen.health -= this.haider.damage;
    }
    
  }
}


class WalkBackAI extends AI {

  constructor(haider) {
    super(haider);

    this.counter = 0;
    this.alive = 2000;
  }

  update() {
    
    this.haider.x -= 1.5 * (deltaTime / 20);
    
    this.counter += deltaTime;

    this.haider.alpha = 1 - this.counter / this.alive;

    if (this.counter > this.alive) {
      this.haider.remove();
    }
  }
}