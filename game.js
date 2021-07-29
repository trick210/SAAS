let menuScreen;
let gameScreen;
let deathScreen;
let activeScreen = null;

let volume = 0.1;
let screamCount = 7;

let width = 1920;
let height = 1080;
let deltaTime = 0;
let lastTime = 0;

//Aliases
let Application = PIXI.Application,
    loader = PIXI.Loader.shared,
    resources = loader.resources,
    Sprite = PIXI.Sprite;

let app = new PIXI.Application({ 
    width: width, 
    height: height,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
  }
);

app.renderer.backgroundColor = 0x2C3539;

document.body.appendChild(app.view);
let scale = scaleToWindow(app.renderer.view, '#2C3539');

window.addEventListener("resize", function(event){ 
  scale = scaleToWindow(app.renderer.view, '#2C3539');
});

loader
  .add('bg', 'assets/Sturm_auf_Schanze_hintergrund.png')
  .add('houseFrontImg', 'assets/saas_Haus_Vorne.png')
  .add('houseBackImg', 'assets/saas_Haus_Hinten.png')
  .add('haiderImg', 'assets/Haider.png')
  .add('screamImg', 'assets/schrei.png')
  .add('barreneImg', 'assets/Barrene.png')
  .add('audiImg', 'assets/AudiA4.png')
  .add('skrrrSound' , 'assets/sounds/skrrr-skrrr.mp3');

for (let i = 1; i <= 7; i++) {
  loader.add(`fence${i}`, `assets/fence/fence${i}.png`);
}

for (let i = 1; i <= screamCount; i++) {
  loader.add(`scream${i}`, `assets/sounds/screams/scream${i}.wav`);
}

loader.load(setup);


let esc = keyboard("Escape");
esc.press = () => {
  if (activeScreen.keyPress) {
    activeScreen.keyPress("Escape");
  }
};

function setup() {

  gameScreen = new GameScreen();
  menuScreen = new MenuScreen();
  deathScreen = new DeathScreen();

  setActiveScreen(menuScreen);

  requestAnimationFrame(update);

}

function setActiveScreen(screen) {
  if (activeScreen != null) {
    app.stage.removeChild(activeScreen.container);
  }
  activeScreen = screen;
  app.stage.addChild(activeScreen.container);
}

function update(time) {

  deltaTime = (time - lastTime) % 100;
  lastTime = time;

  activeScreen.update();

  requestAnimationFrame(update);
}

function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);
  
  window.addEventListener(
    "keydown", downListener, false
  );
  window.addEventListener(
    "keyup", upListener, false
  );
  
  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };
  
  return key;
}

