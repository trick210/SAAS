class Haider {

  static arrivedDist = 0;

  constructor(posX, posY) {
    this.x = posX;
    this.y = posY;

    this.width = 64;
    this.heigth = 128;

    this.speed = 1 + random(1);
    this.fenceDist = random(50);

    this.arrived = false;
    
  }

  move() {
    if (this.x < width - 300 - this.fenceDist - Haider.arrivedDist) {
     this.x += this.speed;
    } else {
      if (!this.arrived) {
        Haider.arrivedDist++;
        this.arrived = true;
      }
    }
  }

  display() {
    image(haiderImg, this.x, this.y, this.width, this.heigth);
  }

  collide(posX, posY) {
    return (posX > this.x && posX < this.x + this.width && posY > this.y && posY < this.y + this.heigth);
  }
}