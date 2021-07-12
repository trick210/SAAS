class GameScreen extends Screen {

  constructor() {
  	super();

  	this.score = 0;

  	
  	
  }

  update() {

	let r = random(50);

	if (r < 1) {
	  this.spawn();
    }


    for (let i = 0; i < haiders.length; i++) {
	  haiders[i].move();
	}
  }


  draw() {

    background(bg);

	for (let i = 0; i < haiders.length; i++) {
	  haiders[i].display();
	}

	textAlign(LEFT);
	textSize(32);
	text('Score: ' + this.score, 10, 10);

  }

  spawn() {
    let y = random(160, 650);
    append(haiders, new Haider(-64, y));
  }


  click(posX, posY) {

  	for (let i = 0; i < haiders.length; i++) {
      if (haiders[i].collide(posX, posY)) {
        haiders.splice(i, 1);
        this.score++;
        break;
      }
    }
  }

  key(code) {
  	if (code === ESCAPE) {
  		activeScreen = menuScreen;
  	}
  }

}