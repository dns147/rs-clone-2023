import { ControlKeys, MousePos } from '../../../spa/coreTypes';
import Sprite from './sprite';
import './style-pumpkin-game.scss';
import { ClickInfo, Player } from './types-pumpkin-game';
import { getAngle } from './utils-pumpkin-game';

export default class PumpkinGame {
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  canvasWidth: number;
  canvasHeight: number;
  posCenterX: number;
  posCenterY: number;
  windowInnerWidth: number;
  windowInnerHeight: number;
  images: HTMLImageElement[];
  pumpkins: Player[];
  lastTime: number;
  timerIdMain: number;
  gameTime: number;
  pumpkinSpeed: number;

  player: Player | null;
  shootPumpkin: Player | null;

  constructor() {
    this.canvas = null;
    this.ctx = null;

    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.windowInnerWidth = document.documentElement.clientWidth;
    this.windowInnerHeight = document.documentElement.clientHeight;
    this.posCenterX = this.windowInnerWidth / 2;
    this.posCenterY = this.windowInnerHeight / 2;
    this.images = [];
    this.pumpkins = [];
    this.lastTime = 0;
    this.timerIdMain = 0;
    this.gameTime = 0;
    this.pumpkinSpeed = 300;

    this.player = null;
    this.shootPumpkin = null;

    this.mainLoop = this.mainLoop.bind(this);
    this.update = this.update.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
    this.handleMouse = this.handleMouse.bind(this);
    this.updateEntities = this.updateEntities.bind(this);
  }

  render(): string {
    (<HTMLElement>document.querySelector('.header')).style.display = 'none';
    (<HTMLElement>document.querySelector('.footer')).style.display = 'none';

    return `
      <canvas width="1920" height="1080" class="pumpkin-canvas"></canvas>
    `;
  }

  init(): void {
    this.canvas = <HTMLCanvasElement>document.querySelector('.pumpkin-canvas');
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');

    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;

    const imagesUrl = [
      require('../../../assets/sprites/pumpkin-good1.png'),
      require('../../../assets/sprites/pumpkin-fly1.png'),
    ];

    let countImages = 0;

    imagesUrl.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        this.images.push(img);
        countImages += 1;
        this.checkLoadImages(countImages, imagesUrl.length);
      };
    });
  }

  checkLoadImages(countImages: number, imagesLength: number): void {
    if (countImages === imagesLength) {
      this.initGame();
    }
  }

  initGame(): void {
    this.player = {
      rotate: 0,
      pos: [0, 0],
      sprite: new Sprite(this.images[0], [0, 0], [87.5, 97], 3, [5], null, false, 0),
      width: 87.5,
      height: 97
    };

    this.shootPumpkin = {
      rotate: 0,
      pos: [this.canvasWidth/2, this.canvasHeight/2],
      sprite: new Sprite(this.images[1], [0, 0], [35, 28], 5, [5, 4, 3, 2, 1], null, false, 0),
      width: 35,
      height: 28
    };

    this.reset();
    this.lastTime = Date.now();
    this.mainLoop();
  }

  //--- Главный цикл игры ---
  mainLoop(): void {   
    let now = Date.now();
    let dt = (now - this.lastTime) / 1000.0;

    this.update(dt);
    this.renderGame();

    // if (this.shootPumpkin && localStorage['isClick'] === 'true') {
    //   this.pumpkins.push(this.shootPumpkin);
    //   console.log(this.pumpkins);
    //   localStorage.setItem('isClick', 'false');
    // }

    this.lastTime = now;
    this.timerIdMain = requestAnimationFrame(this.mainLoop);
  }

  //--- Обновление объектов игры ---
  update(dt: number): void {
    this.gameTime += dt;

    if (this.canvas) {
      this.ctx?.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    if (this.shootPumpkin && localStorage['isClick'] === 'true') {
      this.pumpkins.push(this.shootPumpkin);
      console.log(this.pumpkins);
      localStorage.setItem('isClick', 'false');
    }
    
    this.handleMouse(); //--- вызов обработчика клавиш из внешнего модуля ---
    this.updateEntities(dt); //--- вызов обновления анимации ---
    //this.checkCollisions(); //--- проверка на коллизии ---
  }

  reset(): void {
    if (this.canvas && this.player && this.shootPumpkin) {
      this.player.pos = [this.canvasWidth/2, this.canvasHeight/2];
      this.shootPumpkin.pos = [this.canvasWidth/2, this.canvasHeight/2];
    }
  }

  renderGame(): void {
    if (this.player) {
      this.renderPlayer(this.player);
    }

    // if (this.shootPumpkin) {
    this.renderShootPumpkin();
    // }
  }

  renderPlayer(player: Player): void {
    this.ctx?.translate(player.pos[0], player.pos[1]);
    player.sprite.render(this.ctx);
  }

  renderShootPumpkin(): void {
    this.ctx?.translate(this.canvasWidth/2, this.canvasHeight/2);

    this.pumpkins.forEach((shootPumpkin) => {
      // this.ctx?.translate(shootPumpkin.pos[0], shootPumpkin.pos[1]);
      // shootPumpkin.pos = [this.canvasWidth / 2, this.canvasHeight / 2];
      shootPumpkin.sprite.render(this.ctx);
    });
  }

  handleMouse(): void {
    const mousePos: MousePos = localStorage['mousePos'] ? JSON.parse(localStorage['mousePos']) : {};
    
    if (this.canvas && this.player) {
      const angleGrad: number = getAngle(mousePos['x'], mousePos['y'], this.posCenterX, this.posCenterY);
      this.rotatePlayer(angleGrad, this.player);
    } 
  }

  rotatePlayer(angleGrad: number, player: Player): void {
    if (angleGrad > 0 && angleGrad > 45 && angleGrad < 145) {
      player.sprite = new Sprite(this.images[0], [0, 0], [87.5, 97], 3, [0], null, false, 0);
    }

    if (angleGrad > 0 && angleGrad > 145 && angleGrad < 180) {
      player.sprite = new Sprite(this.images[0], [0, 0], [87.5, 97], 3, [2], null, false, 0);
    }

    if (angleGrad < 0 && angleGrad < -145) {
      player.sprite = new Sprite(this.images[0], [0, 0], [87.5, 97], 3, [2], null, false, 0);
    }

    if (angleGrad < 0 && angleGrad > -145 && angleGrad < -45) {
      player.sprite = new Sprite(this.images[0], [0, 0], [87.5, 97], 3, [3], null, false, 0);
    }

    if (angleGrad < 0 && angleGrad > -45) {
      player.sprite = new Sprite(this.images[0], [0, 0], [87.5, 97], 3, [4], null, false, 0);
    }

    if (angleGrad > 0 && angleGrad < 45) {
      player.sprite = new Sprite(this.images[0], [0, 0], [87.5, 97], 3, [1], null, false, 0);
    }

    if (angleGrad === 0) {
      player.sprite = new Sprite(this.images[0], [0, 0], [87.5, 97], 3, [5], null, false, 0);
    }
  }

  updateEntities(dt: number): void {
   this.updatePlayer(dt);
   this.updateShootPumpkin(dt);
  }

  updatePlayer(dt: number): void {
    this.player?.sprite.update(dt);
  }

  updateShootPumpkin(dt: number): void {
    const clickInfo: ClickInfo[] = localStorage['clickInfo'] ? JSON.parse(localStorage['clickInfo']) : [];

    this.pumpkins.forEach((shootPumpkin: Player, index: number) => {
      const mousePos: MousePos = clickInfo[index].pos;
      const mouseX: number = mousePos['x'];
      const mouseY: number = mousePos['y'];
      const angleGrad: number = getAngle(mouseX, mouseY, this.posCenterX, this.posCenterY);
      const distance: number = clickInfo[index].distance;
     
      if (angleGrad > 0 && angleGrad < 90) {
        shootPumpkin.pos[0] += this.pumpkinSpeed * dt * (mouseX - this.posCenterX - 35) / distance;
        shootPumpkin.pos[1] += this.pumpkinSpeed * dt * (mouseY - this.posCenterY + 28) / distance;
      }

      if (angleGrad > 90 && angleGrad < 180) {
        shootPumpkin.pos[0] += this.pumpkinSpeed * dt * (mouseX - this.posCenterX - 35) / distance;
        shootPumpkin.pos[1] += this.pumpkinSpeed * dt * (mouseY - this.posCenterY - 28) / distance;
      }

      if (angleGrad < 0 && angleGrad > -90) {
        shootPumpkin.pos[0] += this.pumpkinSpeed * dt * (mouseX - this.posCenterX + 35) / distance;
        shootPumpkin.pos[1] += this.pumpkinSpeed * dt * (mouseY - this.posCenterY + 28) / distance;
      }

      if (angleGrad < -90 && angleGrad > -180) {
        shootPumpkin.pos[0] += this.pumpkinSpeed * dt * (mouseX - this.posCenterX + 35) / distance;
        shootPumpkin.pos[1] += this.pumpkinSpeed * dt * (mouseY - this.posCenterY - 28) / distance;
      }
      
      shootPumpkin.sprite.update(dt);
      this.checkBounds(shootPumpkin, clickInfo, index);
    });
  }

  checkBounds(obj: Player, clickInfo: ClickInfo[], index: number): void {
    if (obj.pos[0] < 0 || obj.pos[0] > this.canvasWidth || obj.pos[1] < 0 || obj.pos[1] > this.canvasHeight) {
      this.pumpkins.splice(index, 1);
      clickInfo.splice(index, 1);
      localStorage.setItem('clickInfo', JSON.stringify(clickInfo));
    }
  }
}
