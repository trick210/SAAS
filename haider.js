class Haider extends Entity {

  

  constructor(posX, posY) {
    super(posX, posY, 96, 192, new Sprite(resources['haiderImg'].texture));

    this.currentAI = new RunAI(this);

    this.speed = 1.5 + Math.random();
    this.fenceDist = Math.random() * 75;

    this.damage = 1;

    this.killed = false;
    this.alpha = 1;

    this.img.interactive = true;
    this.img.on('click', this.click.bind(this));

    this.img.anchor.set(0.5, 1 - 120 / this.height);
    
  }

  update() {
    this.currentAI.update();
    super.update();
    
  }


  click() {
    if (!this.killed && !gameScreen.screamCD) {
      if (gameScreen.energy >= gameScreen.screamCost) {
        this.kill();
        gameScreen.entities.push(new Scream(this.x, this.y));
        gameScreen.energy -= gameScreen.screamCost;
        gameScreen.screamCD = true;
      }
    }
  }

  kill() {
    gameScreen.score++;
    this.killed = true;
    this.img.interactive = false;
    this.currentAI = new WalkBackAI(this);

    
  }
}