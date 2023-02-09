import { ControlKeys, MousePos } from '../../../spa/coreTypes';
import Sprite from './sprite';
import './style-pumpkin-game.scss';
import { Player } from './types-pumpkin-game';

export default class PumpkinGame {
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  images: HTMLImageElement[];
  lastTime: number;
  timerIdMain: number;
  gameTime: number;
  playerSpeed: number;

  player: Player | null;

  constructor() {
    this.canvas = null;
    this.ctx = null;

    this.images = [];
    this.lastTime = 0;
    this.timerIdMain = 0;
    this.gameTime = 0;
    this.playerSpeed = 200;

    this.player = null;

    this.mainLoop = this.mainLoop.bind(this);
    this.update = this.update.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
    this.handleKeys = this.handleKeys.bind(this);
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

    const imagesUrl = [
      require('../../../assets/sprites/pumpkin-good1.png'),
    ];

    imagesUrl.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = () => {3
        this.images.push(img);
        this.initGame();
      };
    });
  }

  initGame(): void {
    this.player = {
      rotate: -Math.PI/2,
      pos: [0, 0],
      sprite: new Sprite(this.images[0], [0, 0], [87.5, 97], 3, [5], null, false, 0),
      //sprite: new Sprite(this.images[0], [0, 0], [87.5, 97], 3, [5, 1, 0, 2, 3, 4], null, false, 0),
      width: 87.5,
      height: 97
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

    this.lastTime = now;
    this.timerIdMain = requestAnimationFrame(this.mainLoop);
  }

  //--- Обновление объектов игры ---
  update(dt: number): void {
    this.gameTime += dt;

    if (this.canvas) {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    this.handleKeys(dt); //--- вызов обработчика клавиш из внешнего модуля ---
    this.updateEntities(dt); //--- вызов обновления анимации ---
    //this.checkCollisions(); //--- проверка на коллизии ---
  }

  reset(): void {
    if (this.canvas && this.player) {
      this.player.pos = [this.canvas.width/2, this.canvas.height/2];
    }
  }

  renderGame(): void {
    if (this.player) {
      this.renderPlayer(this.player);
    }
  }

  renderPlayer(player: Player): void {
    this.ctx?.translate(player.pos[0], player.pos[1]);
    player.sprite.render(this.ctx);
  }

  handleKeys(dt: number): void {
    // const controlKeys: ControlKeys = localStorage['controlKeys'] ? JSON.parse(localStorage['controlKeys']) : {};
    
    // if (this.player && controlKeys['ArrowRight']) {
    //   this.player.pos[0] += this.playerSpeed * dt;
    // }

    const mousePos: MousePos = localStorage['mousePos'] ? JSON.parse(localStorage['mousePos']) : {};
    
    if (this.canvas && this.player) {
      const mouseX: number = mousePos['x'] - window.innerWidth/2;
      const mouseY: number = mousePos['y'] - window.innerHeight/2;
      const angleRad: number = Math.atan2(mouseX, mouseY);
      const angleGrad: number = angleRad * (180 / Math.PI);

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
    this.player?.sprite.update(dt);
  }
}
