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

    this.overlay = false;
    this.paused = false;

    this.clockCounter = 0;

    this.screamCD = false;
    
    this.ui = new UI(this);

    this.bg = new Sprite(resources['bg'].texture);
    this.houseFront = new Sprite(resources['houseFrontImg'].texture);
    this.houseBack = new Sprite(resources['houseBackImg'].texture);
    this.fence = new Sprite(resources[`fence1`].texture);

    this.houseBack.x = width - 518;
    this.houseFront.x = width - 295;
    this.houseFront.y = height - 661;
    this.fence.x = width - 405;
    this.fence.y = 150;
  

    this.container = new PIXI.Container();
    this.bgContainer = new PIXI.Container();
    this.entityContainer = new PIXI.Container();

    this.container.addChild(this.bgContainer);
    this.container.addChild(this.entityContainer);
    this.container.addChild(this.ui.container);

    this.bgContainer.addChild(this.bg);
    this.bgContainer.addChild(this.houseBack);
    this.bgContainer.addChild(this.fence);
    this.bgContainer.addChild(this.houseFront);

    this.houseFront.interactive = true;
    this.houseFront.on('pointertap', this.clickHouse.bind(this));

    this.soundManager = new SoundManager();
  }

  update() {

    if (this.overlay) {
      return;
    }

		let r = Math.random() * 50;

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

    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update();
    }

    this.sortEntities();

    this.ui.update();

    if (this.health <= 0) {
      setActiveScreen(deathScreen);
      this.soundManager.stop();
    }
    
  }


  spawn() {
    let y = 250 + Math.random() * 690;
    this.entities.push(new Haider(-64, y));
  }


  clickHouse(event) {
    if (this.energy >= this.barreneCost) {
      this.entities.push(new Barrene(event.data.global.x, event.data.global.y));
      this.money++;
      this.energy -= this.barreneCost;
    }
  }

  keyPress(key) {
  	if (key == "Escape") {
      this.soundManager.pause();
      this.paused = true;
  		setActiveScreen(menuScreen);
  	}
  }

  upgradeFence() {
    if (this.currentFence < 6) {
      this.health += 50;
      this.maxHP += 50;
      this.currentFence++;
      this.fence.texture = resources[`fence${this.currentFence + 1}`].texture;
      this.money -= this.fencePrice.value;
      this.fencePrice.value += 20;
    }
  }

  spawnCar() {
    this.entities.push(new AudiA4());
  }

  sortEntities() {
    this.entityContainer.children.sort((a, b) => (a.layer == b.layer) ? a.y - b.y : a.layer - b.layer);
  }

}