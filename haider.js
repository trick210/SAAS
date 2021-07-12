class Haider {


  constructor(posX, posY) {
    this.x = posX;
    this.y = posY;
    this.speed = 1 + random(1);
    
  }

  move() {
    this.x += this.speed;
  }

  display() {
    image(haiderImg, this.x, this.y);
  }

  collide(posX, posY) {
    return (posX > this.x && posX < this.x + 32 && posY > this.y && posY < this.y + 64);
  }
}