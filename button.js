class Button {

  constructor(text, posX, posY, btnWidth, btnHeight, fn) {

    this.text = text;
    this.x = posX;
    this.y = posY;
    this.width = btnWidth;
    this.height = btnHeight;
    this.fn = fn;

    this.isDown = false;
    this.isOver = false;

    this.standardFill = 0xFFFFFF;
    this.hoverFill = 0xDCDCDC;
    this.downFill = 0xC8C8C8;

    this.container = new PIXI.Container();

    this.rect = new PIXI.Graphics();    
   
    this.rect.lineStyle(6, 0x000000, 1);
    this.rect.beginFill(0xFFFFFF);
    this.rect.drawRoundedRect(this.x, this.y, this.width, this.height, 10);
    this.rect.endFill();

    this.rect.tint = this.standardFill;

    this.container.addChild(this.rect);

    this.btnText = new PIXI.Text(text, {fontFamily: 'Arial', fontSize: 30, fill: 'black', align: 'center'});
    this.btnText.x = this.x + this.width / 2;
    this.btnText.y = this.y + this.height / 2;
    this.btnText.anchor.set(0.5);

    this.container.addChild(this.btnText);


    this.rect.interactive = true;
    this.rect.buttonMode = true;
    this.rect.on('pointerdown', this.onButtonDown.bind(this))
    this.rect.on('pointerup', this.onButtonUp.bind(this))
    this.rect.on('pointerupoutside', this.onButtonUp.bind(this))
    this.rect.on('pointerover', this.onButtonOver.bind(this))
    this.rect.on('pointerout', this.onButtonOut.bind(this));
    this.rect.on('pointertap', this.click.bind(this));
    
  }

  onButtonDown() {
    this.isDown = true;
    this.rect.tint = this.downFill;
  }

  onButtonUp() {
    this.isDown = false
    if (this.isOver) {
      this.rect.tint = this.hoverFill;
    } else {
      this.rect.tint = this.standardFill;
    }
  }

  onButtonOver() {
    this.isOver = true;
    if (this.isDown) {
      return;
    }
    this.rect.tint = this.hoverFill;
  }

  onButtonOut() {
    this.isOver = false;
    if (this.isDown) {
      return;
    }
    this.rect.tint = this.standardFill;
  }

  update() {

  }

  click() {
    this.fn();
  }


}


class CDButton extends Button {

  constructor(text, posX, posY, btnWidth, btnHeight, fn, cd, ready) {

    super(text, posX, posY, btnWidth, btnHeight, fn);

    this.cd = cd;
    this.ready = ready;
    this.clock = 0;

    this.btnBorder = new PIXI.Graphics();
    this.btnProgress = new PIXI.Graphics();

    this.container.addChild(this.btnProgress);
    this.container.addChild(this.btnBorder);

    this.container.removeChild(this.btnText);
    this.container.addChild(this.btnText);

    this.btnBorder.lineStyle(6, 0x000000, 1);
    this.btnBorder.beginFill(0x000000, 0);
    this.btnBorder.drawRoundedRect(this.x, this.y, this.width, this.height, 10);
    this.btnBorder.endFill();

    this.btnProgress.beginFill(0xFFFFFF);
    this.btnProgress.drawRoundedRect(0, 0, this.width, this.height, 10);
    this.btnProgress.endFill();

    this.btnProgress.tint = 0x9696FF;

    this.btnProgress.x = this.x;
    this.btnProgress.y = this.y;

    this.hoverFill = 0xFFFFFF;
    this.downFill = 0xFFFFFF;

    this.btnText.style.fontSize = 24;
    this.btnText.y = this.y + this.height / 2 - 15;

    this.cdText = new PIXI.Text(`(${this.cd.value} s)`, {fontFamily: 'Arial', fontSize: 24, fill: 'black', align: 'center'});
    this.cdText.x = this.x + this.width / 2;
    this.cdText.y = this.y + this.height / 2 + 15
    this.cdText.anchor.set(0.5);

    this.container.addChild(this.cdText);

  }


  update() {

    if (!this.ready) {
      this.clock += deltaTime / 1000;

      if (this.clock >= this.cd.value) {
        this.ready = true;
        this.clock = 0;
        this.btnProgress.tint = 0xB4FFB4;
      }

      this.btnProgress.width = this.width * (this.ready ? 1 : (this.clock / this.cd.value));
      this.cdText.text = `(${Math.floor((this.cd.value - this.clock))} s)`;

    }

  }


  click() {   
    if (this.ready) {
      this.fn();
      this.ready = false;
      this.btnProgress.tint = 0x9696FF;
    }
  }


}


class BuyButton extends Button {

  constructor(text, posX, posY, btnWidth, btnHeight, fn, price) { 
    super(text, posX, posY, btnWidth, btnHeight, fn);

    this.price = price;

    this.btnText.style.fontSize = 24;
    this.btnText.y = this.y + this.height / 2 - 15;

    this.priceText = new PIXI.Text(this.price.value, {fontFamily: 'Arial', fontSize: 24, fill: 'black', align: 'center'}); 
    this.priceText.x = this.x + this.width / 2 + 15;
    this.priceText.y = this.y + this.height / 2 + 15
    this.priceText.anchor.set(0.5);

    this.container.addChild(this.priceText);

    this.barrene = new Sprite(resources['barreneImg'].texture);
    this.barrene.x = this.x + this.width / 2 - 24 - this.price.value.toString().length * 5;
    this.barrene.y = this.y + this.height / 2 + 2;
    this.barrene.width = 24;
    this.barrene.height = 24;

    this.container.addChild(this.barrene);
  }

  update() {
    if (gameScreen.money >= this.price.value) {      
        this.hoverFill = 0xB4FFB4;
        this.downFill = 0x96FF96;
    } else {
        this.hoverFill = 0xFFC8C8;
        this.downFill = 0xFFC8C8;
    }

    this.priceText.text = this.price.value;
    this.barrene.x = this.x + this.width / 2 - 24 - this.price.value.toString().length * 5;
    
  }

  click() {    
    if (gameScreen.money >= this.price.value) {
      this.fn();
    }

    if (gameScreen.money < this.price.value) {
      this.hoverFill = 0xFFC8C8;
      this.downFill = 0xFFC8C8;
      this.rect.tint = 0xFFC8C8;
    }
  }

}