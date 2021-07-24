class Button {

  constructor(text, posX, posY, btnWidth, btnHeight, fn) {

    this.text = text;
    this.x = posX;
    this.y = posY;
    this.width = btnWidth;
    this.heigth = btnHeight;
    this.fn = fn;

    this.fill = 255;

  }

  update() {

    if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.heigth) {
      if (mouseIsPressed) {
        this.fill = 200;
      } else {
        this.fill = 220;
      }

      csr = HAND;
    } else {
      this.fill = 255;
    }

  }

  draw() {

    stroke(0);
    strokeWeight(3);
    fill(this.fill);

    rect(this.x, this.y, this.width, this.heigth, 20);

    textAlign(CENTER, CENTER);

    fill(0);
    strokeWeight(0);

    textSize(20);
    text(this.text, this.x + this.width / 2, this.y + this.heigth / 2);
  }

  click(posX, posY) {
    if (posX > this.x && posX < this.x + this.width && posY > this.y && posY < this.y + this.heigth) {
      this.fn();
      return true;
    }

    return false;
  }


}


class CDButton extends Button {

  constructor(text, posX, posY, btnWidth, btnHeight, fn, cd, ready) {

    super(text, posX, posY, btnWidth, btnHeight, fn);

    this.cd = cd;
    this.ready = ready;
    this.clock = 0;

  }

  update() {

    if (!this.ready) {
      this.clock += deltaTime / 1000;

      if (this.clock >= this.cd.value) {
        this.ready = true;
        this.clock = 0;
      }
    } else {
      if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.heigth) {
        csr = HAND;
      }
    }
  }


  draw () {

    noStroke();
    fill(this.fill);

    rect(this.x, this.y, this.width, this.heigth);
    
    this.ready ? fill(180, 255, 180) : fill(150, 150, 255);

    rect(this.x, this.y, this.width * (this.ready ? 1 : (this.clock / this.cd.value)), this.heigth);

    stroke(0);
    strokeWeight(3);
    noFill();

    rect(this.x, this.y, this.width, this.heigth);

    textAlign(CENTER, CENTER);

    fill(0);
    stroke(0);
    strokeWeight(0);

    textSize(16);
    text(this.text, this.x + this.width / 2, this.y + this.heigth / 2 - 10);
    text(`(${Math.floor((this.cd.value - this.clock))} s)`, this.x + this.width / 2, this.y + this.heigth / 2 + 10);

  }

  click(posX, posY) {
    if (posX > this.x && posX < this.x + this.width && posY > this.y && posY < this.y + this.heigth) {

      if (this.ready) {
        this.fn();
        this.ready = false;
      }
      return true;
    }

    return false;
  }


}


class BuyButton extends Button {

  constructor(text, posX, posY, btnWidth, btnHeight, fn, price) { 
    super(text, posX, posY, btnWidth, btnHeight, fn);

    this.price = price;
  }

  update() {
    if (mouseX > this.x && mouseX < this.x + this.width && mouseY > this.y && mouseY < this.y + this.heigth) {
      if (gameScreen.money >= this.price.value) {
        if (mouseIsPressed) {
          this.fill = color(180, 255, 180);
        } else {
          this.fill = color(200, 255, 200);
        }
        
        csr = HAND;
      } else {
        this.fill = color(255, 200, 200);
      }
      
    } else {
      this.fill = 255;
    }
  }

  draw() {
    stroke(0);
    strokeWeight(3);
    fill(this.fill);

    rect(this.x, this.y, this.width, this.heigth);

    textAlign(CENTER, CENTER);

    fill(0);
    strokeWeight(0);

    textSize(16);
    text(this.text, this.x + this.width / 2, this.y + this.heigth / 2 - 10);
    text(this.price.value, this.x + this.width / 2 + 10, this.y + this.heigth / 2 + 10);
    image(barreneImg, this.x + this.width / 2 - 15 - Math.floor(getBaseLog(10, this.price.value)) * 5, this.y + this.heigth / 2, 16, 16);
  }

  click(posX, posY) {
    if (posX > this.x && posX < this.x + this.width && posY > this.y && posY < this.y + this.heigth) {
      if (gameScreen.money >= this.price.value) {
        this.fn();
      }
      return true;
    }

    return false;
  }

}