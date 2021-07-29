class Entity {

  constructor(posX, posY, entityWidth, entityHeight, sprite) {
    this.x = posX;
    this.y = posY;
    this.width = entityWidth;
    this.height = entityHeight;


    this.img = sprite;
    this.img.x = this.x;
    this.img.y = this.y;
    this.img.width = this.width;
    this.img.height = this.height;
    this.img.layer = 0;
    gameScreen.entityContainer.addChild(this.img);
    gameScreen.sortEntities();
  }

  update() {
    
    this.img.x = this.x;
    this.img.y = this.y;
    
  }

  remove() {
    gameScreen.entityContainer.removeChild(this.img);
    let i = gameScreen.entities.indexOf(this);
    gameScreen.entities.splice(i, 1);
  }
}