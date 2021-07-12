class Haider {


  constructor(posX, posY) {
    this.x = posX;
    this.y = posY;
    this.img = loadImage('assets/Haider.png');
  }

  move() {
    this.x += 1;
  }

  display() {
    image(img, this.x, this.y);
  }
}