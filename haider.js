class Haider {


  constructor(posX, posY) {
    this.x = posX;
    this.y = posY;
    this.speed = 1 + random(1);
    this.img = loadImage('assets/Haider.png');
  }

  move() {
    this.x += this.speed;
  }

  display() {
    image(this.img, this.x, this.y);
  }

  collide(posX, posY) {
    return (posX > this.x && posX < this.x + 64 && posY > this.y && posY < this.y + 64);
  }
}