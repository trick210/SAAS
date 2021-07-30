class LoadingScreen {

  constructor() {    

    this.loadingText = new PIXI.Text("Loading...", {fontFamily: 'Arial', fontSize: 72, fill: 'white', align: 'center', stroke: 'black', strokeThickness: 5});

    this.loadingText.x = width / 2;
    this.loadingText.y = height / 2 - 200;
    this.loadingText.anchor.set(0.5, 0);

    this.barBack = new PIXI.Graphics();    
    this.barBack.lineStyle(6, 0x000000, 1);
    this.barBack.beginFill(0x000000, 0);
    this.barBack.drawRect(width / 2 - 253, height / 2 - 3, 506, 76);
    this.barBack.endFill();

    this.barFront = new PIXI.Graphics();    
    this.barFront.beginFill(0xFFFFFF);
    this.barFront.drawRect(0, 0, 500, 70);
    this.barFront.endFill();
    this.barFront.x = width / 2 - 250;
    this.barFront.y = height/ 2;
    this.barFront.width = 0;

    this.container = new PIXI.Container();

    this.container.addChild(this.loadingText);
    this.container.addChild(this.barBack);
    this.container.addChild(this.barFront);

  }

  progress(loader) {
    
    let prog = loader.progress / 100;
    this.barFront.width = 500 * prog;
  }


}