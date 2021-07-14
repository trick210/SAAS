class Haider {

  

  constructor(posX, posY) {
    this.x = posX;
    this.y = posY;

    this.width = 64;
    this.heigth = 128;

    this.speed = 1 + random(1);
    this.fenceDist = random(50);

    this.dmgCounter = 0;
    this.damage = 1;
    
  }

  move() {
    if (this.x < width - 300 - this.fenceDist) {
     this.x += this.speed;
    } else {
      this.dmgCounter += deltaTime;

      if (this.dmgCounter > 1000) {
        this.dmgCounter = 0;
        gameScreen.health -= this.damage;
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