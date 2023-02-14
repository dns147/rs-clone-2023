import { MousePos } from '../../../spa/coreTypes';
import Sprite from './sprite';
import './style-pumpkin-game.scss';
import { Angle, ClickInfo, Player, Pumpkin } from './types-pumpkin-game';
import { boxCollides, getAngle, getFactor, getImage, getRandomInt, normalize } from './utils-pumpkin-game';
import CONSTS from './consts-pumpkin-game';

export default class PumpkinGame {
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  canvasWidth: number;
  canvasHeight: number;
  posCenterX: number;
  posCenterY: number;
  windowInnerWidth: number;
  windowInnerHeight: number;
  imagesUrl: string[];
  images: HTMLImageElement[];
  pumpkins: Pumpkin[];
  monsters: Player[];
  lastTime: number;
  lastShoot: number;
  timerId: number;
  gameTime: number;
  pumpkinSpeed: number;
  intervalShoot: number;
  enemySpeed: number;
  isGameOver: boolean;

  player: Player | null;
  shootPumpkin: Pumpkin | null;
  spider1: Player | null;
  spider2: Player | null;
  spider3: Player | null;

  constructor() {
    this.canvas = null;
    this.ctx = null;

    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.windowInnerWidth = document.documentElement.clientWidth;
    this.windowInnerHeight = document.documentElement.clientHeight;
    this.posCenterX = this.windowInnerWidth / 2;
    this.posCenterY = this.windowInnerHeight / 2;
    this.imagesUrl = [];
    this.images = [];
    this.pumpkins = [];
    this.monsters = [];
    this.lastTime = 0;
    this.lastShoot = 0;
    this.timerId = 0;
    this.gameTime = 0;
    this.pumpkinSpeed = 1000;
    this.intervalShoot = 800;
    this.enemySpeed = 30;
    this.isGameOver = true;

    this.player = null;
    this.shootPumpkin = null;
    this.spider1 = null;
    this.spider2 = null;
    this.spider3 = null;

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
      <div class="game-container">
        <div class="game-area">
          <div class="status-panel">
            <div class="wrapper-pumpkin-level">
              <div class="pumpkin-level">
                <span class="pumpkin-level-name">LVL</span>
                <span class="pumpkin-level-number">0</span>
              </div>
              <div class="pumpkin-score">
                <span class="pumpkin-score-name">Score</span>
                <span class="pumpkin-score-number">0</span>
              </div>
              <div class="heart-life">
                <img src=${require("../../../assets/img/smiley_pumpkin.png")} class="pumpkin-smiley-icon active-icon" alt="icon">
                <img src=${require("../../../assets/img/smiley_pumpkin.png")} class="pumpkin-smiley-icon" alt="icon">
                <img src=${require("../../../assets/img/smiley_pumpkin.png")} class="pumpkin-smiley-icon" alt="icon">
              </div>
            </div>
            <div class="time-game-pumpkin">
              <span class="time-pumpkin">00:00</span>
            </div>
            <div class="icon-list">
              <button class="pumpkin-settings">             
                <img src=${require("../../../assets/img/icon-settings.svg")} class="pumpkin-settings-icon" alt="icon">
              </button>
              <a class="pumpkin-exit" href="#/page1">
                <i class="fa-solid fa-door-open"></i>
              </a>
            </div>
          </div>
          <button class="pumpkin-play">Play</button>
          <div class="fire-container"></div>
          <svg class="svg-fire">
            <filter id="fire">
              <feTurbulence x="0" y="0" baseFrequency="0.09" numOctaves="5" seed="2">
                <animate attributeName="baseFrequency" dur="50s" values="0.02;0.003;0.02;" repeatCount="indefinite">
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="30">
            </filter>
          </svg>
          <div class="wrapper-canvas">
            <canvas width="1920" height="1080" class="pumpkin-canvas"></canvas>
          </div>
        </div>
      </div>
    `;
  }

  init(): void {
    window.addEventListener('resize', () => document.location.reload());
    window.addEventListener('resize', this.resizeGameArea);
    this.resizeGameArea();
    this.canvas = <HTMLCanvasElement>document.querySelector('.pumpkin-canvas');
    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d');

    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
    this.imagesUrl = CONSTS.IMAGE_URL;
    let countImages = 0;

    for (let i = 0; i < this.imagesUrl.length; i += 1) {
      const img = new Image();
      img.src = this.imagesUrl[i];
      img.onload = () => {
        this.images[i] = img;
        countImages += 1;
        this.checkLoadImages(countImages, this.imagesUrl.length);
      };
    }
  }

  checkLoadImages(countImages: number, imagesLength: number): void {
    if (countImages === imagesLength) {
      this.initGame();
    }
  }

  resizeGameArea(): void {
    const gameArea = <HTMLElement>document.querySelector('.game-area');
    const widthToHeight = 16 / 8.07;
    let newWidth = window.innerWidth;
    let newHeight = window.innerHeight;
    const newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
      newWidth = newHeight * widthToHeight;
      gameArea.style.height = newHeight + 'px';
      gameArea.style.width = newWidth + 'px';
    } else {
      newHeight = newWidth / widthToHeight;
      gameArea.style.width = newWidth + 'px';
      gameArea.style.height = newHeight + 'px';
    }

    gameArea.style.marginTop = (-newHeight / 2) + 'px';
    gameArea.style.marginLeft = (-newWidth / 2) + 'px';

    this.canvasWidth = newWidth;
    this.canvasHeight = newHeight;
  }

  initGame(): void {
    const btnPlay = <HTMLButtonElement>document.querySelector('.pumpkin-play');

    btnPlay.addEventListener('click', () => {
      btnPlay.style.display = 'none';
      this.canvas?.classList.add('pumpkin-canvas-active');
      this.addEntities();
      this.reset();
      this.lastShoot = Date.now();
      this.lastTime = Date.now();
      this.mainLoop();

      this.makeTimer(2, 30, 1);
    });
  }

  addEntities(): void {
    this.player = {
      rotate: 0,
      pos: [0, 0],
      sprite: new Sprite(getImage(this.images, this.imagesUrl[0]), [0, 0], [87.5, 97], 3, [5], null, false, 0),
      width: 87.5,
      height: 97
    };
    
    this.shootPumpkin = {
      rotate: 0,
      pos: [0, 0],
      sprite: new Sprite(getImage(this.images, this.imagesUrl[1]), [0, 0], [35, 28], 5, [5, 4, 3, 2, 1], null, false, 0),
      width: 35,
      height: 28,
      clickInfo: {
        pos: {},
        distance: 0,
        angle: {
          rad: 0,
          grad: 0
        },
      }
    };
    
    this.spider1 = {
      rotate: 0,
      pos: [220, 220],
      sprite: new Sprite(getImage(this.images, this.imagesUrl[2]), [0, 0], [105, 67], 3, [0, 1, 2, 3, 4, 5, 6, 7], null, false, 0),
      width: 105,
      height: 67
    };
    
    this.spider2 = {
      rotate: 0,
      pos: [220, 270],
      sprite: new Sprite(getImage(this.images, this.imagesUrl[3]), [0, 0], [111, 95], 3, [0, 1, 2, 3, 4, 5], null, false, 0),
      width: 111,
      height: 95
    };
    
    this.spider3 = {
      rotate: 0,
      pos: [220, 340],
      sprite: new Sprite(getImage(this.images, this.imagesUrl[4]), [0, 0], [90, 78], 3, [0, 1, 2, 3, 4, 5], null, false, 0),
      width: 90,
      height: 78
    };
  }

  //--- Главный цикл игры ---
  mainLoop(): void {   
    let now = Date.now();
    let dt = (now - this.lastTime) / 1000.0;

    this.update(dt);
    this.renderGame();

    this.lastTime = now;

    if (!this.isGameOver) {
      this.timerId = requestAnimationFrame(this.mainLoop);
    }
  }

  //--- Обновление объектов игры ---
  update(dt: number): void {
    this.gameTime += dt;

    if (this.canvas) {
      this.ctx?.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
    
    this.handleMouse();
    this.handleShoot();
    this.updateEntities(dt);
    this.addMonsters();
    this.checkCollisions(dt);
  }

  addMonsters(): void {
    if (Math.random() < 1 - Math.pow(0.999, this.gameTime) && this.monsters.length <= 10) {
      switch (getRandomInt(0, 4)) {
        case 0:	//left
          this.monsters.push({
            pos: [0, Math.random() * (this.canvasHeight - 30)],
            sprite: new Sprite(getImage(this.images, this.imagesUrl[2]), [0, 0], [105, 67], 5, [0, 1, 2, 3, 4, 5, 6, 7], null, false, 0)
          });

          this.monsters.push({
            pos: [0, Math.random() * (this.canvasHeight - 30)],
            sprite: new Sprite(getImage(this.images, this.imagesUrl[3]), [0, 0], [111, 95], 5, [0, 1, 2, 3, 4, 5], null, false, 0)
          });
          break;

        // case 1:	//top
        //   this.monsters.push({
        //     pos: [Math.random() * this.canvasWidth, 0],
        //     sprite: new Sprite(getImage(this.images, this.imagesUrl[2]), [0, 0], [105, 67], 3, [0, 1, 2, 3, 4, 5, 6, 7], null, false, 0)
        //   });
        //   break;

        // case 2:	//bottom
        //   this.monsters.push({
        //     pos: [Math.random() * this.canvasWidth, this.canvasHeight - 30],
        //     sprite: new Sprite(getImage(this.images, this.imagesUrl[7]), [0, 0], [90, 78], 3, [0, 1, 2, 3, 4, 5], null, false, 0)
        //   });
        //   break;

        default: //right
          this.monsters.push({
            pos: [this.canvasWidth, Math.random() * (this.canvasHeight - 30)],
            sprite: new Sprite(getImage(this.images, this.imagesUrl[5]), [0, 0], [105, 67], 5, [0, 1, 2, 3, 4, 5, 6, 7], null, false, 0)
          });

          this.monsters.push({
            pos: [this.canvasWidth, Math.random() * (this.canvasHeight - 30)],
            sprite: new Sprite(getImage(this.images, this.imagesUrl[6]), [0, 0], [111, 95], 5, [0, 1, 2, 3, 4, 5], null, false, 0)
          });
          break;
      }
    }
  }

  reset(): void {
    if (this.canvas && this.player && this.shootPumpkin) {
      this.player.pos = [this.canvasWidth/2, this.canvasHeight/2];
      this.shootPumpkin.pos = [this.canvasWidth/2, this.canvasHeight/2];
    }

    this.isGameOver = false;
  }

  renderGame(): void {
    if (!this.isGameOver && this.player) {
      this.renderPlayer(this.player);
      this.renderShootPumpkins(this.pumpkins);
      this.renderMonsters(this.monsters);
    }

    if (this.spider1) {
      this.renderPlayer(this.spider1);
    }

    if (this.spider2) {
      this.renderPlayer(this.spider2);
    }

    if (this.spider3) {
      this.renderPlayer(this.spider3);
    }
  }

  renderPlayer(obj: Player): void {
    this.ctx?.translate(obj.pos[0], obj.pos[1]);
    obj.sprite.render(this.ctx);
  }

  renderShootPumpkins(pumpkins: Pumpkin[]): void {
    pumpkins.forEach((pumpkin: Pumpkin) => {
      this.ctx?.translate(pumpkin.pos[0], pumpkin.pos[1]);
      pumpkin.sprite.render(this.ctx);
    });
  }

  renderMonsters(monsters: Player[]): void {
    monsters.forEach((monster: Player) => {
      this.ctx?.translate(monster.pos[0], monster.pos[1]);
      monster.sprite.render(this.ctx);
    });
  }

  handleMouse(): void {
    const mousePos: MousePos = localStorage['mousePos'] ? JSON.parse(localStorage['mousePos']) : {};
    if (this.canvas && this.player) {
      const angle: Angle = getAngle(mousePos['x'], mousePos['y'], this.posCenterX, this.posCenterY);
      const angleGrad: number = angle.grad;
      this.rotatePlayer(angleGrad, this.player);
    } 
  }

  handleShoot(): void {
    if (this.shootPumpkin && localStorage['isClick'] === 'true' && Date.now() - this.lastShoot > this.intervalShoot) {
      const clickInfo: ClickInfo = localStorage['clickInfo'] ? JSON.parse(localStorage['clickInfo']) : [];
      const mousePos: MousePos = clickInfo.pos;
      const angle: Angle = clickInfo.angle;    
      const distance: number = clickInfo.distance;

      this.pumpkins.push({
        pos: [this.canvasWidth/2, this.canvasHeight/2],
        sprite: new Sprite(getImage(this.images, this.imagesUrl[1]), [0, 0], [35, 28], 7, [5, 4, 3, 2, 1], null, false, 0),
        clickInfo: {
          pos: mousePos,
          distance: distance,
          angle: angle,
        }
      });

      this.lastShoot = Date.now();
      localStorage.setItem('isClick', 'false');
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
   this.updateSpiders(dt);
   this.updateMonsters(dt);
  }

  updatePlayer(dt: number): void {
    this.player?.sprite.update(dt);
  }

  updateSpiders(dt: number): void {
    this.spider1?.sprite.update(dt);
    this.spider2?.sprite.update(dt);
    this.spider3?.sprite.update(dt);
  }

  updateMonsters(dt: number): void {
    for (let i = 0; i < this.monsters.length; i += 1) {
      const monster: Player = this.monsters[i];
	    const x0 = monster.pos[0];
      const y0 = monster.pos[1];

      const x1 = this.player ? this.player.pos[0] : 0;
      const y1 = this.player ? this.player.pos[1] : 0;

      let distance = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
      
      monster.pos[0] += this.enemySpeed * dt * (x1 - x0) / distance;
      monster.pos[1] += this.enemySpeed * dt * (y1 - y0) / distance;
      
      monster.sprite.update(dt);

      if (monster.pos[0] < 0 || monster.pos[0] > this.canvasWidth || monster.pos[1] < 0 || monster.pos[1] > this.canvasHeight) {
        this.monsters.splice(i, 1);
        i -= 1;
      }
    }
  }

  updateShootPumpkin(dt: number): void {
    for (let i = 0; i < this.pumpkins.length; i += 1) {
      const pumpkin: Pumpkin = this.pumpkins[i];
      const mouseX: number = pumpkin.clickInfo.pos['x'];
      const mouseY: number = pumpkin.clickInfo.pos['y'];
      const distance: number = pumpkin.clickInfo.distance;
      const angle: Angle = pumpkin.clickInfo.angle;
      const angleGrad: number = angle.grad;
      const angleRad: number = angle.rad;
      const factorX: number = getFactor(angleGrad, angleRad).factorX;
      const factorY: number = getFactor(angleGrad, angleRad).factorY;
      const pumpkinWidth = <number>this.shootPumpkin?.width;
      const pumpkinHeight =  <number>this.shootPumpkin?.height;

      if (angleGrad > 0 && angleGrad <= 90) {
        pumpkin.pos[0] += this.pumpkinSpeed * dt * (mouseX - this.posCenterX - pumpkinWidth) / distance;
        pumpkin.pos[1] += this.pumpkinSpeed * dt * (mouseY - this.posCenterY + pumpkinHeight) / distance;
      }
  
      if (angleGrad > 90 && angleGrad <= 180) {
        pumpkin.pos[0] += this.pumpkinSpeed * dt * (mouseX - this.posCenterX - pumpkinWidth) / distance;
        pumpkin.pos[1] += this.pumpkinSpeed * dt * (mouseY - this.posCenterY - pumpkinHeight) / distance;
      }
  
      if (angleGrad < 0 && angleGrad >= -90) {
        pumpkin.pos[0] += this.pumpkinSpeed * dt * (mouseX - this.posCenterX + pumpkinWidth) / distance;
        pumpkin.pos[1] += this.pumpkinSpeed * dt * (mouseY - this.posCenterY + pumpkinHeight) / distance;
      }
  
      if (angleGrad < -90 && angleGrad >= -180) {
        pumpkin.pos[0] += this.pumpkinSpeed * dt * (mouseX - this.posCenterX + pumpkinWidth) / distance;
        pumpkin.pos[1] += this.pumpkinSpeed * dt * (mouseY - this.posCenterY - pumpkinHeight) / distance;
      }

      if (pumpkin.pos[0] < 0 || pumpkin.pos[0] > this.canvasWidth || pumpkin.pos[1] < 0 || pumpkin.pos[1] > this.canvasHeight) {
        this.pumpkins.splice(i, 1);
        i -= 1;
      }

      pumpkin.sprite.update(dt);
    }
  }

  checkCollisions(dt: number): void {
    this.checkCollisionsMonsters(dt, this.monsters);
  }

  checkCollisionsMonsters(dt: number, monsters: Player[]): void {
    if (this.player) {
      for (let i = 0; i < monsters.length; i += 1) {
        const pos1 = monsters[i].pos;
        const size1 = monsters[i].sprite.size;

        //--- обнаружение столкновений монстров друг с другом ---
        for (let j = i + 1; j < monsters.length; j += 1) {
          const pos2 = monsters[j].pos;
          const size2 = monsters[j].sprite.size;

          if (boxCollides([pos1[0] - size1[0] / 2, pos1[1] - size1[1] / 2], size1, pos2, size2)) {
            const mark1: string = getRandomInt(0, 2) === 0 ? '+' : '-';
            const mark2: string = getRandomInt(0, 2) === 0 ? '+' : '-';

            if (mark1 === '+') {
              monsters[j].pos[0] += this.enemySpeed * dt - 10;
              monsters[j].pos[1] -= this.enemySpeed * dt - 10;
            } else {
              monsters[j].pos[0] -= this.enemySpeed * dt - 10;
              monsters[j].pos[1] += this.enemySpeed * dt - 10;
            }

            if (mark2 === '+') {
              monsters[j].pos[0] += this.enemySpeed * dt - 10;
              monsters[j].pos[1] += this.enemySpeed * dt - 10;
            } else {
              monsters[j].pos[0] -= this.enemySpeed * dt - 10;
              monsters[j].pos[1] -= this.enemySpeed * dt - 10;
            }
          }
        }

        //--- обнаружение столкновений монстров и пуль ---
        for (let j = 0; j < this.pumpkins.length; j += 1) {
          const pos2 = this.pumpkins[j].pos;
          const size2 = this.pumpkins[j].sprite.size;

          if (boxCollides([pos1[0] - size1[0] / 2, pos1[1] - size1[1] / 2], size1, pos2, size2)) {
            monsters.splice(i, 1);
            this.pumpkins.splice(j, 1);
            i -= 1;
            break;
          }
        }
      
        //--- обнаружение столкновений монстров и игрока ---
        if (boxCollides([pos1[0] + size1[0] / 4, pos1[1] + size1[1] / 4], 
                            [size1[0] / 2, size1[1] / 2], 
                            this.player.pos, this.player.sprite.size)) {
          this.gameOver();         
        }
      }
    }
  }

  gameOver() {
    this.gameTime = 0;
    this.monsters = [];
    this.pumpkins = [];
    this.isGameOver = true;
    const btnPlay = <HTMLButtonElement>document.querySelector('.btn-play');
    btnPlay.disabled = false;
    //window.cancelAnimationFrame(this.timerId); 
 }

  makeTimer(min: number, sec: number, level: number): void {
    const gameLevel = <HTMLSpanElement>document.querySelector('.pumpkin-level-number');
    gameLevel.textContent = `${level}`;

    const time = <HTMLSpanElement>document.querySelector('.time-pumpkin');

    setTimeout(function tick() {
      time.textContent = normalize(min) + ":" + normalize(sec);
      
      if (min >= 0) {
        setTimeout(tick, 1000);
      } else {
        //this.showNextLevel(level);
        console.log('time is out')
      }

      sec -= 1;

      if (sec === 0) {
        min -= 1;
        sec = 60;
      }    
    });
  }
}
