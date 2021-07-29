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
    if (this.haider.x < width - 450 - this.haider.fenceDist) {
     this.haider.x += this.haider.speed * (deltaTime / 20);
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
    
    this.dmgCounter += deltaTime

    if (this.dmgCounter > 1000) {
      this.dmgCounter -= 1000;
      gameScreen.health -= this.haider.damage;
    }
    
  }
}


class WalkBackAI extends AI {

  constructor(haider) {
    super(haider);

    this.counter = 0;
    this.alive = 2000;

    this.haider.img.anchor.x = 0.5;
    this.haider.img.scale.x *= -1;
  }

  update() {
    
    this.haider.x -= 1.5 * (deltaTime / 20);
    
    this.counter += deltaTime;

    this.haider.alpha = 1 - this.counter / this.alive;

    this.haider.img.alpha = this.haider.alpha;

    if (this.counter > this.alive) {
      this.haider.remove();
    }
  }
}