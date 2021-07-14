class GameScreen extends Screen {

  constructor() {
  	super();

  	this.haiders = [];
    this.buttons = [];
  	this.score = 0;
    this.health = 100;
    this.maxHP = 100;

    this.currentFence = 0;

    this.buttons.push(new Button("Upgrade Fence", width - 160, height - 60, 150, 50, this.upgradeFence.bind(this)));


    this.overlay = false;

    this.clicked = false;
    this.clickCD = 500;
    this.timeExp = 0;
    this.screamRot = -1
  }

  update() {

    if (this.overlay) {
      return;
    }

		let r = random(50);

		if (r < 1) {
	  	this.spawn();
    }

    this.haiders.sort((a, b) => a.y - b.y);

    for (let i = 0; i < this.haiders.length; i++) {
	  	this.haiders[i].update();
		}

    if (this.clicked) {
      this.timeExp += deltaTime;
      this.screamRot = (Math.floor(this.timeExp / 50) % 2) * 2 - 1;
    }

    if (this.timeExp > this.clickCD) {
      this.timeExp = 0;
      this.clicked = false;
    }



    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].update();
    }

    if (this.health <= 0) {
      activeScreen = deathScreen;
    }
  }


  draw() {

    background(bg);
    image(houseBack, width - (518 / 1.5), 0, 518 / 1.5, 414 / 1.5);
    image(fence[this.currentFence], width - 270, 100, 241 / 1.5, 782 / 1.5);
    image(houseFront, width - (295 / 1.5), height - (661 / 1.5), 295 / 1.5, 661 / 1.5);

		for (let i = 0; i < this.haiders.length; i++) {
	  	this.haiders[i].display();
		}

    if (this.clicked) {
      push();   
      translate(this.screamPosX + 120, this.screamPosY + 30);
      rotate(this.screamRot / 20);
      imageMode(CENTER);
      image(screamImg, 0, 0, 128 / 1.5, 128 / 1.5);
      pop();
    }



    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].draw();
    }


    //Score

    fill(255);
    stroke(0);
    strokeWeight(3);

		textAlign(LEFT, TOP);
		textSize(32);
		text('Score: ' + this.score, 10, 10);

    //HP Bar

    stroke(0);
    strokeWeight(3);
    fill(100);
    rect(width - 210, 10, 200, 50);

    fill(255 * (1 - this.health / this.maxHP), 255 * (this.health / this.maxHP), 0);

    rect(width - 210, 10, 200 * (this.health / this.maxHP), 50);

    textAlign(CENTER, CENTER);

    fill(255);

    textSize(20);
    text(`${this.health} / ${this.maxHP}`, width - 210 + 200 / 2, 10 + 50 / 2);

  }

  spawn() {
    let y = random(120, 580);
    append(this.haiders, new Haider(-64, y));
  }


  click(posX, posY) {

    if (!this.clicked) {
  	  for (let i = 0; i < this.haiders.length; i++) {
        let h = this.haiders[i].click(posX, posY)

        if (h != null) {   
          this.clicked = true; 
          this.screamPosX = h.x;
          this.screamPosY = h.y;    
          break;
        }
      }
    }

    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].click(posX, posY);
    }

  }

  key(code) {
  	if (code === ESCAPE) {
  		activeScreen = menuScreen;
  	}
  }

  upgradeFence() {
    if (this.currentFence < 6) {
      this.health += 50;
      this.maxHP += 50;
      this.currentFence++;
    }
  }

}