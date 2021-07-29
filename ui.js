class UI {

  constructor(gs) {

    this.gs = gs;

    this.buttons = [];

    this.buttons.push(new BuyButton("Zaun ausbauen", width - 240, height - 90, 225, 75, this.gs.upgradeFence.bind(this.gs), this.gs.fencePrice));
    this.buttons.push(new CDButton("Skrrr Skrrr", width - 480, height - 90, 225, 75, this.gs.spawnCar.bind(this.gs), this.gs.skrrrCD, false));

    this.container = new PIXI.Container();

    for (let i = 0; i < this.buttons.length; i++) {
      this.container.addChild(this.buttons[i].container);
    }

    this.oldHP = this.gs.health;
    this.oldMaxHP = this.gs.maxHP;
    this.oldEnergy = this.gs.energy;
    this.oldMaxEn = this.gs.maxEnergy;

    //Score

    this.scoreText = new PIXI.Text("Score: 0", {fontFamily: 'Arial', fontSize: 48, fill: 'white', align: 'center', stroke: 'black', strokeThickness: 5});
    this.scoreText.x = 15;
    this.scoreText.y = 15;
    this.container.addChild(this.scoreText);


    //Barrene

    this.barreneText = new PIXI.Text("0", {fontFamily: 'Arial', fontSize: 48, fill: 0xFFD700, align: 'center', stroke: 'black', strokeThickness: 5});
    this.barreneText.x = 375;
    this.barreneText.y = 15;
    this.container.addChild(this.barreneText);

    this.barreneImg = new Sprite(resources['barreneImg'].texture);
    this.barreneImg.x = 285;
    this.barreneImg.y = 10;
    this.barreneImg.width = 72;
    this.barreneImg.height = 72;
    this.container.addChild(this.barreneImg);


    this.barBack = new PIXI.Graphics();
    this.barBack.lineStyle(6, 0x000000, 1);
    this.barBack.beginFill(0x646464);
    this.barBack.drawRect(width - 315, 15, 300, 75);
    this.barBack.drawRect(width - 780, 15, 450, 75);
    this.barBack.endFill();
    this.container.addChild(this.barBack);

    //HP Bar

    this.hpBar = new PIXI.Graphics();
    this.hpBar.lineStyle(6, 0x000000, 1);
    this.hpBar.beginFill(0x00FF00);
    this.hpBar.drawRect(width - 315, 15, 300, 75);
    this.hpBar.endFill();
    this.container.addChild(this.hpBar);

    this.hpText = new PIXI.Text(`${this.gs.health} / ${this.gs.maxHP}`, {fontFamily: 'Arial', fontSize: 30, fill: 'white', align: 'center', stroke: 'black', strokeThickness: 5});
    this.hpText.x = width - 315 + 300 / 2
    this.hpText.y = 15 + 75 / 2;
    this.hpText.anchor.set(0.5);
    this.container.addChild(this.hpText);


    //Energy Bar

    this.energyBar = new PIXI.Graphics();
    this.energyBar.lineStyle(6, 0x000000, 1);
    this.energyBar.beginFill(0xFFFF00);
    this.energyBar.drawRect(width - 780, 15, 450, 75);
    this.energyBar.endFill();
    this.container.addChild(this.energyBar);

    this.energyText = new PIXI.Text(`Energy: ${this.gs.energy} / ${this.gs.maxEnergy}`, {fontFamily: 'Arial', fontSize: 30, fill: 'white', align: 'center', stroke: 'black', strokeThickness: 5});
    this.energyText.x = width - 780 + 450 / 2
    this.energyText.y = 15 + 75 / 2;
    this.energyText.anchor.set(0.5);
    this.container.addChild(this.energyText);
  }

  update() {

    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].update();
    }

    this.scoreText.text = `Score: ${this.gs.score}`;
    this.barreneText.text = this.gs.money.toString();

    if (this.oldHP != this.gs.health || this.oldMaxHP != this.gs.maxHP) {
      this.hpBar.clear();
      this.hpBar.lineStyle(6, 0x000000, 1);
      this.hpBar.beginFill(PIXI.utils.rgb2hex([1 - this.gs.health / this.gs.maxHP, this.gs.health / this.gs.maxHP, 0]));
      this.hpBar.drawRect(width - 315, 15, 300 * (this.gs.health / this.gs.maxHP), 75);
      this.hpBar.endFill();
      this.hpText.text = `${this.gs.health} / ${this.gs.maxHP}`
      this.oldHP = this.gs.health;
      this.oldMaxHP = this.gs.maxHP;
    }

    if (this.oldEnergy != this.gs.energy || this.oldMaxEn != this.gs.maxEnergy) {
      this.energyBar.clear();
      this.energyBar.lineStyle(6, 0x000000, 1);
      this.energyBar.beginFill(0xFFFF00);
      this.energyBar.drawRect(width - 780, 15, 450 * (this.gs.energy / this.gs.maxEnergy), 75);
      this.energyBar.endFill();
      this.energyText.text = `Energy: ${this.gs.energy} / ${this.gs.maxEnergy}`;
      this.oldEnergy = this.gs.energy;
      this.oldMaxEn = this.gs.maxEnergy;
    }

  }


}