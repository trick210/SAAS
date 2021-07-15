class UI {

  constructor(gs) {

    this.gs = gs;

    this.buttons = [];

    this.buttons.push(new Button("Zaun ausbauen", width - 160, height - 60, 150, 50, this.gs.upgradeFence.bind(this.gs)));
    this.buttons.push(new Button("Skrr Skrr", width - 320, height - 60, 150, 50, this.gs.spawnCar.bind(this.gs)));
  }

  update() {

    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].update();
    }
  }

  draw() {

    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].draw();
    }


    //Score

    fill(255);
    stroke(0);
    strokeWeight(3);

    textAlign(LEFT, TOP);
    textSize(32);
    text('Score: ' + this.gs.score, 10, 10);


    //Barrene

    fill(255, 215, 0);
    text(`${this.gs.money}`, 250, 10);

    noStroke();
    image(barreneImg, 200, 0, 48, 48);

    //HP Bar

    stroke(0);
    strokeWeight(3);
    fill(100);
    rect(width - 210, 10, 200, 50);

    fill(255 * (1 - this.gs.health / this.gs.maxHP), 255 * (this.gs.health / this.gs.maxHP), 0);

    rect(width - 210, 10, 200 * (this.gs.health / this.gs.maxHP), 50);

    textAlign(CENTER, CENTER);

    fill(255);

    textSize(20);
    text(`${this.gs.health} / ${this.gs.maxHP}`, width - 210 + 200 / 2, 10 + 50 / 2);
  }

  click(posX, posY) {

    for (let i = 0; i < this.buttons.length; i++) {
      if (this.buttons[i].click(posX, posY)) {
        return true;
      }
    }

    return false;

  }
}