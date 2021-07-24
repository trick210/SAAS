class GameScreen {

  constructor() {

    

    this.entities = [];
  	this.score = 0;
    this.money = 0;
    
    this.maxHP = 100;
    this.health = this.maxHP;

    this.maxEnergy = 200;
    this.energy = this.maxEnergy;

    this.energyReg = 10;

    this.screamCost = 10;
    this.barreneCost = 10;
    this.skrrrCD = new Object();
    this.skrrrCD.value = 30;

    this.currentFence = 0;
    this.fencePrice = new Object();
    this.fencePrice.value = 20;


    this.clockCounter = 0;

    this.screamCD = false;

    this.overlay = false;
    
    this.ui = new UI(this);
  }

  update() {

    if (this.overlay) {
      return;
    }

		let r = random(50);

		if (r < 1) {
	  	this.spawn();
    }

    if (this.energy < this.maxEnergy) {
      this.clockCounter += deltaTime;
    }

    if (this.clockCounter >= 500) {
      this.clockCounter -= 500;
      this.energy = Math.min(this.maxEnergy, this.energy + this.energyReg / 2);
    }

    this.entities.sort((a, b) => (a.layer == b.layer) ? a.y - b.y : a.layer - b.layer);

    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update();
    }

    this.ui.update();

    if (this.health <= 0) {
      activeScreen = deathScreen;
    }
  }


  draw() {

    background(bg);
    image(houseBack, width - (518 / 1.5), 0, 518 / 1.5, 414 / 1.5);
    image(fence[this.currentFence], width - 270, 100, 241 / 1.5, 782 / 1.5);
    image(houseFront, width - (295 / 1.5), height - (661 / 1.5), 295 / 1.5, 661 / 1.5);

    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].draw();
    }

    this.ui.draw();

  }

  spawn() {
    let y = random(120, 580);
    this.entities.push(new Haider(-64, y));
  }


  click(posX, posY) {

    if (this.ui.click(posX, posY)) {
      return;
    }
    
  	for (let i = 0; i < this.entities.length; i++) {
      if (this.entities[i].click(posX, posY)) {  
        break;
      }
    }

    if (posX > width - 180 && posX < width && posY > 370 && posY < height && this.energy >= this.barreneCost) {
      this.entities.push(new Barrene(posX, posY));
      this.money++;
      this.energy -= this.barreneCost;
    }

  }

  key(code) {
  	if (code === ESCAPE) {
  		activeScreen = menuScreen;
  	}
  }

  upgradeFence() {
    if (this.currentFence < 6) {
      this.health += 50;
      this.maxHP += 50;
      this.currentFence++;
      this.money -= this.fencePrice.value;
      this.fencePrice.value += 20;
    }
  }

  spawnCar() {
    this.entities.push(new AudiA4());
    
  }

}