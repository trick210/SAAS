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