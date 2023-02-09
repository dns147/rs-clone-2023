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
  player: Player | null;

  constructor() {
    this.canvas = null;
    this.ctx = null;

    this.images = [];
    this.lastTime = 0;
    this.timerIdMain = 0;
    this.gameTime = 0;

    this.player = null;

    this.mainLoop = this.mainLoop.bind(this);
    this.update = this.update.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
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

    this.lastTime = Date.now();

    const imagesUrl = [
      require('../../../assets/sprites/pumpkin-good1.png'),
    ];

    imagesUrl.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = () => {3
        this.images.push(img);
        this.mainLoop();
      };
    });
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
    
    //control.handleKeys(dt, this); //--- вызов обработчика клавиш из внешнего модуля ---
    this.updateEntities(dt); //--- вызов обновления анимации ---
    //this.checkCollisions(); //--- проверка на коллизии ---
  }

  renderGame(): void {
    this.player = {
      rotate: -Math.PI/2,
      pos: [0, 0],
      sprite: new Sprite(this.images[0], [102, 0], [102, 103], 3, [0, 1, 2], null, false, 0),
      width: 102,
      height: 103
    };

    this.renderPlayer(this.player);
  }

  renderPlayer(player: Player): void {
    if (this.canvas && this.player) {
      this.player.pos = [this.canvas.width/2 - this.player.width/2, this.canvas.height/2];
    }

    this.ctx?.translate(player.pos[0], player.pos[1]);
    player.sprite.render(this.ctx);
  }

  updateEntities(dt: number): void {
    this.player?.sprite.update(dt);
  }
}
