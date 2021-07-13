class GameScreen extends Screen {

  constructor() {
  	super();

  	this.haiders = [];
    this.buttons = [];
  	this.score = 0;

    this.currentFence = 0;

    this.buttons.push(new Button("Upgrade Fence", width - 160, height - 60, 150, 50, this.upgradeFence.bind(this)));
  }

  update() {

		let r = random(50);

		if (r < 1) {
	  	this.spawn();
    }


    for (let i = 0; i < this.haiders.length; i++) {
	  	this.haiders[i].move();
		}

    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].update();
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

    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].draw();
    }


    fill(255);
    stroke(0);
    strokeWeight(3);

		textAlign(LEFT, TOP);
		textSize(32);
		text('Score: ' + this.score, 10, 10);

  }

  spawn() {
    let y = random(120, 580);
    append(this.haiders, new Haider(-64, y));
  }


  click(posX, posY) {

  	for (let i = 0; i < this.haiders.length; i++) {
      if (this.haiders[i].collide(posX, posY)) {
        this.haiders.splice(i, 1);
        this.score++;
        break;
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
      this.currentFence++;
    }
  }

}