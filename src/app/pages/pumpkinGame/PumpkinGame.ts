import { MousePos } from '../../../spa/coreTypes';
import Sprite from './sprite';
import './style-pumpkin-game.scss';
import { Angle, ClickInfo, Player, Pumpkin } from './types-pumpkin-game';
import { boxCollides, getAngle, getFactor, getImage, getRandomInt, normalize } from './utils-pumpkin-game';
import CONSTS from './consts-pumpkin-game';
import SOUND from '../../../spa/coreConst';

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
  weapons: Pumpkin[];
  monsters1: Player[];
  monsters2: Player[];
  monsters3: Player[];
  monsters4: Player[];
  bursts: Player[];
  freezers: Player[];
  bombs: Player[];
  electrons:Player[];

  lastTime: number;
  lastShoot: number;
  //timerId: number;
  gameTime: number;
  pumpkinSpeed: number;
  intervalShoot: number;
  enemySpeed: number;
  isGameOver: boolean;
  isMonsterStop: boolean;
  score: number;
  numberPumpkins: number;
  numberElectrons: number;
  numberBombs: number;
  numberFreezers: number;

  player: Player | null;
  pumpkinWeapon: Pumpkin | null;
  electroWeapon: Pumpkin | null;
  currentWeapon: Pumpkin | null;
  boom1: Player | null;

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
    this.weapons = [];
    this.monsters1 = [];
    this.monsters2 = [];
    this.monsters3 = [];
    this.monsters4 = [];
    this.bursts = [];
    this.freezers = [];
    this.bombs = [];
    this.electrons = [];

    this.lastTime = 0;
    this.lastShoot = 0;
    this.gameTime = 0;
    this.pumpkinSpeed = 1000;
    this.intervalShoot = 800;
    this.enemySpeed = 30;
    this.isGameOver = true;
    this.isMonsterStop = false
    this.score = 0;
    this.numberPumpkins = 10;
    this.numberElectrons = 10;
    this.numberBombs = 1;
    this.numberFreezers = 1;

    this.player = null;
    this.pumpkinWeapon = null;
    this.electroWeapon = null;
    this.currentWeapon = null;
    this.boom1 = null;

    this.freezMonsters = this.freezMonsters.bind(this);
    this.burstAllMonsters = this.burstAllMonsters.bind(this);
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
              <div class="shells">
                <img src=${require("../../../assets/img/pumpkin-icon.png")} class="pumpkin-shells-icon select-weapon" alt="icon">
                <span class="pumpkin-shells-number">∞</span>
              </div>
              <div class="electo-ball">
                <img src=${require("../../../assets/img/electro-ball.png")} class="pumpkin-electro-icon" alt="icon">
                <span class="pumpkin-electro-number">${this.numberElectrons}</span>
              </div>
              <div class="freezing">
                <img src=${require("../../../assets/img/freezing.png")} class="pumpkin-freezing-icon" alt="icon">
                <span class="pumpkin-freezing-number">${this.numberFreezers}</span>
              </div>
              <div class="bomb">
                <img src=${require("../../../assets/img/pumpkin-bomb.png")} class="pumpkin-bomb-icon" alt="icon">
                <span class="pumpkin-bomb-number">${this.numberBombs}</span>
              </div>
            </div>
            <div class="time-game-pumpkin">
              <span class="time-pumpkin">00:00</span>
            </div>
            <div class="icon-list">
              <div class="user">
                <img src=${require("../../../assets/img/user-solid.svg")} class="user-icon" alt="icon">
                <span class="user-name"></span>
              </div>
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
    const pumpkinFreezing = <HTMLElement>document.querySelector('.pumpkin-freezing-icon');
    pumpkinFreezing.addEventListener('click', this.freezMonsters);

    const pumpkinBomb = <HTMLElement>document.querySelector('.pumpkin-bomb-icon');
    pumpkinBomb.addEventListener('click', this.burstAllMonsters);

    localStorage.setItem('currentWeapon', 'pumpkin');

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
    
    this.pumpkinWeapon = {
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

    this.electroWeapon = {
      rotate: 0,
      pos: [0, 0],
      sprite: new Sprite(getImage(this.images, this.imagesUrl[14]), [0, 0], [48, 45], 1, [0], null, false, 0),
      width: 48,
      height: 45,
      clickInfo: {
        pos: {},
        distance: 0,
        angle: {
          rad: 0,
          grad: 0
        },
      }
    };

    this.currentWeapon = (localStorage['currentWeapon'] === 'electro') ? this.electroWeapon : this.pumpkinWeapon;
      
    // this.boom1 = {
    //   rotate: 0,
    //   pos: [220, 500],
    //   sprite: new Sprite(getImage(this.images, this.imagesUrl[10]), [0, 0], [83, 83], 6, [0, 1, 2, 3, 4, 5, 6, 7], null, false, 0),
    //   //sprite: new Sprite(getImage(this.images, this.imagesUrl[12]), [0, 0], [94, 94], 6, [0, 1, 2, 3, 4, 5], null, false, 0),
    //   width: 83,
    //   height: 83
    // };
  }

  //--- Главный цикл игры ---
  mainLoop(): void {   
    let now = Date.now();
    let dt = (now - this.lastTime) / 1000.0;

    this.update(dt);
    this.renderGame();

    this.lastTime = now;

    if (!this.isGameOver) {
      requestAnimationFrame(this.mainLoop);
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
    this.addMonsters1();
    this.addMonsters2();
    this.addMonsters3();

    this.addItems();
    //this.addFreezers();
    //this.addBombs();

    this.checkCollisions(dt);
    // this.riseScoreGame();
    // this.riseFreezers();
    // this.riseBombs();
  }

  addMonsters1(): void {
    if (Math.random() < 1 - Math.pow(0.999, this.gameTime) && this.monsters1.length <= 3) {
      switch (getRandomInt(0, 4)) {
        case 0:	//left
          this.monsters1.push({
            pos: [0, Math.random() * (this.canvasHeight - 30)],
            sprite: new Sprite(getImage(this.images, this.imagesUrl[2]), [0, 0], [105, 67], 5, [0, 1, 2, 3, 4, 5, 6, 7], null, false, 0)
          });

          this.monsters1.push({
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
          this.monsters1.push({
            pos: [this.canvasWidth, Math.random() * (this.canvasHeight - 30)],
            sprite: new Sprite(getImage(this.images, this.imagesUrl[5]), [0, 0], [105, 67], 5, [0, 1, 2, 3, 4, 5, 6, 7], null, false, 0)
          });

          this.monsters1.push({
            pos: [this.canvasWidth, Math.random() * (this.canvasHeight - 30)],
            sprite: new Sprite(getImage(this.images, this.imagesUrl[6]), [0, 0], [111, 95], 5, [0, 1, 2, 3, 4, 5], null, false, 0)
          });
          break;
      }
    }
  }

  addMonsters2(): void {
    if (Math.random() < 1 - Math.pow(0.999, this.gameTime) && this.monsters2.length <= 3) {
      switch (getRandomInt(0, 4)) {
        case 0:	//left
          this.monsters2.push({
            pos: [0, Math.random() * (this.canvasHeight - 30)],
            sprite: new Sprite(getImage(this.images, this.imagesUrl[3]), [0, 0], [111, 95], 5, [0, 1, 2, 3, 4, 5], null, false, 0)
          });
          break;

        default: //right
          this.monsters2.push({
            pos: [this.canvasWidth, Math.random() * (this.canvasHeight - 30)],
            sprite: new Sprite(getImage(this.images, this.imagesUrl[6]), [0, 0], [111, 95], 5, [0, 1, 2, 3, 4, 5], null, false, 0)
          });
          break;
      }
    }
  }

  addMonsters3(): void {
    if (Math.random() < 1 - Math.pow(0.999, this.gameTime) && this.monsters3.length <= 3) {
      switch (getRandomInt(0, 4)) {
        case 0:	//left
          this.monsters3.push({
            pos: [0, Math.random() * (this.canvasHeight - 30)],
            sprite: new Sprite(getImage(this.images, this.imagesUrl[4]), [0, 0], [90, 78], 3, [0, 1, 2, 3, 4, 5], null, false, 0),
          });
          break;

        default: //right
          this.monsters3.push({
            pos: [this.canvasWidth, Math.random() * (this.canvasHeight - 30)],
            sprite: new Sprite(getImage(this.images, this.imagesUrl[4]), [0, 0], [90, 78], 3, [0, 1, 2, 3, 4, 5], null, false, 0),
          });
          break;
      }
    }
  }

  addItems(): void {
    if (this.freezers.length === 2
      || this.bombs.length === 2
      || this.electrons.length === 2) {
      return;
    }

    if (Math.random() < 1 - Math.pow(0.999, this.gameTime)) {
      switch (getRandomInt(0, 4)) {
        case 0:
          this.freezers.push({
            pos: [Math.random() * this.canvasWidth - 10, 0],
            sprite: new Sprite(getImage(this.images, this.imagesUrl[15]), [0, 0], [53, 53], 1, [0], null, false, 0),
          });
          break;

        case 1:
          this.bombs.push({
            pos: [Math.random() * this.canvasWidth - 10, 0],
            sprite: new Sprite(getImage(this.images, this.imagesUrl[9]), [0, 0], [49, 46], 1, [0], null, false, 0),
          });
        break;

        case 2:
          this.electrons.push({
            pos: [Math.random() * this.canvasWidth - 10, 0],
            sprite: new Sprite(getImage(this.images, this.imagesUrl[14]), [0, 0], [48, 45], 1, [0], null, false, 0),
          });
        break;
      }
    }
  }

  reset(): void {
    if (this.canvas && this.player && this.currentWeapon) {
      this.player.pos = [this.canvasWidth/2, this.canvasHeight/2];
      this.currentWeapon.pos = [this.canvasWidth/2, this.canvasHeight/2];
    }

    this.isGameOver = false;
    this.score = 0;

    this.monsters1 = [];
    this.monsters2 = [];
    this.monsters3 = [];
    this.monsters4 = [];
    this.bursts = [];
    this.weapons = [];
    this.freezers = [];
    this.bombs = [];
    this.electrons = [];
    this.numberFreezers = 1;
    this.numberBombs = 1;
    this.numberElectrons = 10;
  }

  renderGame(): void {
    if (!this.isGameOver && this.player) {
      this.renderPlayer(this.player);
      this.renderShootPumpkins(this.weapons);
      this.renderEntities(this.monsters1);
      this.renderEntities(this.monsters2);
      this.renderEntities(this.monsters3);
      //this.renderEntities(this.monsters4);
      this.renderEntities(this.freezers);
      this.renderEntities(this.bombs);
      this.renderEntities(this.electrons);
      this.renderEntities(this.bursts);
    }

    if (this.boom1) {
      this.renderPlayer(this.boom1);
    }
  }

  renderPlayer(obj: Player): void {
    this.ctx?.translate(obj.pos[0], obj.pos[1]);
    obj.sprite.render(this.ctx);
  }

  renderShootPumpkins(weapons: Pumpkin[]): void {
    weapons.forEach((weapon: Pumpkin) => {
      this.ctx?.translate(weapon.pos[0], weapon.pos[1]);
      weapon.sprite.render(this.ctx);
    });
  }

  renderEntities(entities: Player[]): void {
    entities.forEach((entity: Player) => {
      this.ctx?.translate(entity.pos[0], entity.pos[1]);
      entity.sprite.render(this.ctx);
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
    if (this.currentWeapon && localStorage['isClick'] === 'true' && Date.now() - this.lastShoot > this.intervalShoot) {
      const clickInfo: ClickInfo = localStorage['clickInfo'] ? JSON.parse(localStorage['clickInfo']) : [];
      const mousePos: MousePos = clickInfo.pos;
      const angle: Angle = clickInfo.angle;    
      const distance: number = clickInfo.distance;

      if (localStorage['currentWeapon'] === 'electro' && this.numberElectrons > 0) {
        const spriteWeapon: Sprite = new Sprite(getImage(this.images, this.imagesUrl[14]), [0, 0], [48, 45], 1, [0], null, false, 0);

        this.weapons.push({
          pos: [this.canvasWidth/2, this.canvasHeight/2],
          sprite: spriteWeapon,
          clickInfo: {
            pos: mousePos,
            distance: distance,
            angle: angle,
          }
        });

        SOUND.soundFire.play();
        this.numberElectrons = this.numberElectrons <= 0 ? 0 : this.numberElectrons - 1;
        this.changeNumberElectrons();
      }

      if (localStorage['currentWeapon'] === 'pumpkin') {
        const spriteWeapon: Sprite = new Sprite(getImage(this.images, this.imagesUrl[1]), [0, 0], [35, 28], 7, [5, 4, 3, 2, 1], null, false, 0);

        this.weapons.push({
          pos: [this.canvasWidth/2, this.canvasHeight/2],
          sprite: spriteWeapon,
          clickInfo: {
            pos: mousePos,
            distance: distance,
            angle: angle,
          }
        });

        SOUND.soundPumpkin.play();
      }

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

   if (!this.isMonsterStop) {
    this.updateMonsters(this.monsters1, dt, 1);
    this.updateMonsters(this.monsters2, dt, 2);
    this.updateMonsters(this.monsters3, dt, 2.5);
    //this.updateMonsters(this.monsters4, dt, 2);
   } 

   this.updateItems(dt, this.freezers);
   this.updateItems(dt, this.bombs);
   this.updateItems(dt, this.electrons);
   this.updateBurst(dt);
  }

  updatePlayer(dt: number): void {
    this.player?.sprite.update(dt);
  }

  updateSpiders(dt: number): void {
    this.boom1?.sprite.update(dt);
  }

  updateMonsters(monsters: Player[], dt: number, gainSpeed: number): void {
    for (let i = 0; i < monsters.length; i += 1) {
      const monster: Player = monsters[i];
	    const x0 = monster.pos[0];
      const y0 = monster.pos[1];

      const x1 = this.player ? this.player.pos[0] : 0;
      const y1 = this.player ? this.player.pos[1] : 0;

      let distance = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
      
      monster.pos[0] += this.enemySpeed * dt * gainSpeed * (x1 - x0) / distance;
      monster.pos[1] += this.enemySpeed * dt * gainSpeed * (y1 - y0) / distance;
      
      monster.sprite.update(dt);
    }
  }

  updateItems(dt: number, items: Player[]): void {
    for (let i = 0; i < items.length; i += 1) {
      const item: Player = items[i];

      item.pos[1] += this.enemySpeed * dt;
      item.sprite.update(dt);

      if (item.pos[0] < 0 || item.pos[0] > this.canvasWidth || item.pos[1] < 0 || item.pos[1] > this.canvasHeight) {
        items.splice(i, 1);
        i -= 1;
      }
    }
  }

  updateShootPumpkin(dt: number): void {
    for (let i = 0; i < this.weapons.length; i += 1) {
      const pumpkin: Pumpkin = this.weapons[i];
      const mouseX: number = pumpkin.clickInfo.pos['x'];
      const mouseY: number = pumpkin.clickInfo.pos['y'];
      const distance: number = pumpkin.clickInfo.distance;
      const angle: Angle = pumpkin.clickInfo.angle;
      const angleGrad: number = angle.grad;
      const angleRad: number = angle.rad;
      const factorX: number = getFactor(angleGrad, angleRad).factorX;
      const factorY: number = getFactor(angleGrad, angleRad).factorY;
      const pumpkinWidth = <number>this.currentWeapon?.width;
      const pumpkinHeight =  <number>this.currentWeapon?.height;
      const speedWeapon: number = localStorage['currentWeapon'] === 'electro' ? 2.2 : 1; 

      if (angleGrad > 0 && angleGrad <= 90) {
        pumpkin.pos[0] += this.pumpkinSpeed * dt * speedWeapon * (mouseX - this.posCenterX - pumpkinWidth) / distance;
        pumpkin.pos[1] += this.pumpkinSpeed * dt * speedWeapon * (mouseY - this.posCenterY + pumpkinHeight) / distance;
      }
  
      if (angleGrad > 90 && angleGrad <= 180) {
        pumpkin.pos[0] += this.pumpkinSpeed * dt * speedWeapon * (mouseX - this.posCenterX - pumpkinWidth) / distance;
        pumpkin.pos[1] += this.pumpkinSpeed * dt * speedWeapon * (mouseY - this.posCenterY - pumpkinHeight) / distance;
      }
  
      if (angleGrad < 0 && angleGrad >= -90) {
        pumpkin.pos[0] += this.pumpkinSpeed * dt * speedWeapon * (mouseX - this.posCenterX + pumpkinWidth) / distance;
        pumpkin.pos[1] += this.pumpkinSpeed * dt * speedWeapon * (mouseY - this.posCenterY + pumpkinHeight) / distance;
      }
  
      if (angleGrad < -90 && angleGrad >= -180) {
        pumpkin.pos[0] += this.pumpkinSpeed * dt * speedWeapon * (mouseX - this.posCenterX + pumpkinWidth) / distance;
        pumpkin.pos[1] += this.pumpkinSpeed * dt * speedWeapon * (mouseY - this.posCenterY - pumpkinHeight) / distance;
      }

      if (pumpkin.pos[0] < 0 || pumpkin.pos[0] > this.canvasWidth || pumpkin.pos[1] < 0 || pumpkin.pos[1] > this.canvasHeight) {
        this.weapons.splice(i, 1);
        i -= 1;
      }

      pumpkin.sprite.update(dt);
    }
  }

  updateBurst(dt: number): void {
    for (let i = 0; i < this.bursts.length; i += 1) {
      this.bursts[i].sprite.update(dt);

      if (this.bursts[i].sprite.done) {
        this.bursts.splice(i, 1);
        i -= 1;
      }
    }
  }

  checkCollisions(dt: number): void {
    this.checkCollisionsMonsters(dt, this.monsters1);
    this.checkCollisionsMonsters(dt, this.monsters2);
    this.checkCollisionsMonsters(dt, this.monsters3);
    //this.checkCollisionsMonsters(dt, this.monsters2);
    this.checkCollisionsItems(this.freezers, 'freezer');
    this.checkCollisionsItems(this.bombs, 'bomb');
    this.checkCollisionsItems(this.electrons, 'electron');
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
        for (let j = 0; j < this.weapons.length; j += 1) {
          const pos2 = this.weapons[j].pos;
          const size2 = this.weapons[j].sprite.size;

          if (boxCollides([pos1[0] - size1[0] / 2, pos1[1] - size1[1] / 2], size1, pos2, size2)) {
            monsters.splice(i, 1);
            this.addBurst(pos1);
            i -= 1;
            this.weapons.splice(j, 1);
            this.score += 1;
            this.changeScoreGame();
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

  checkCollisionsItems(items: Player[], nameItem: string): void {
    for (let i = 0; i < items.length; i += 1) {
      const pos1 = items[i].pos;
      const size1 = items[i].sprite.size;

      for (let j = 0; j < this.weapons.length; j += 1) {
        const pos2 = this.weapons[j].pos;
        const size2 = this.weapons[j].sprite.size;

        if (boxCollides([pos1[0] - size1[0] / 2, pos1[1] - size1[1] / 2], size1, pos2, size2)) {
          items.splice(i, 1);
          this.addBurstItem(pos1);
          i -= 1;
          this.weapons.splice(j, 1);

          if (nameItem === 'freezer') {
            this.numberFreezers += 1;
            this.changeNumberFreezers();
          }

          if (nameItem === 'bomb') {
            this.numberBombs += 1;
            this.changeNumberBombs();
          }

          if (nameItem === 'electron') {
            this.numberElectrons += 1;
            this.changeNumberElectrons();
          }

          break;
        }
      }
    }
  }

  addBurst(pos1: number[]): void {
    if (localStorage['currentWeapon'] === 'electro') {
      this.bursts.push({
        pos: pos1,
        sprite: new Sprite(getImage(this.images, this.imagesUrl[12]), [0, 0], [94, 94], 8, [0, 1, 2, 3, 4, 5], null, true, 0),
      });
    } else {
      this.bursts.push({
        pos: pos1,
        sprite: new Sprite(getImage(this.images, this.imagesUrl[8]), [0, 0], [61, 61], 8, [0, 1, 2, 3], null, true, 0),
      });
    }

    SOUND.soundPumpkinCrashes.play();
  }

  addExplosion(pos1: number[]): void {
    this.bursts.push({
      pos: pos1,
      sprite: new Sprite(getImage(this.images, this.imagesUrl[11]), [0, 0], [250, 256], 6, [0, 1, 2, 3, 4, 5], null, true, 0),
    });

    SOUND.soundExplosion.play();
  }

  addBurstItem(pos1: number[]): void {
    this.bursts.push({
      pos: pos1,
      sprite: new Sprite(getImage(this.images, this.imagesUrl[13]), [0, 0], [69, 69], 10, [0, 1, 2, 3, 4, 5, 6, 7], null, true, 0),
    });

    SOUND.soundLife.play();
  }

  gameOver() {
    this.gameTime = 0;
    this.isGameOver = true;
    this.monsters1 = [];
    this.monsters2 = [];
    this.monsters3 = [];
    this.monsters4 = [];
    this.bursts = [];
    this.weapons = [];
    this.freezers = [];
    this.bombs = [];
    this.electrons = [];
    this.numberFreezers = 1;
    this.numberBombs = 1;
    this.numberElectrons = 10;
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

  freezMonsters(): void {
    if (this.numberFreezers > 0) {
      this.isMonsterStop = true;
      window.setTimeout(() => this.isMonsterStop = false, 5000);

      SOUND.soundFreesing.play();

      this.numberFreezers = this.numberFreezers <= 0 ? 0 : this.numberFreezers - 1;
      this.changeNumberFreezers();
    }
  }

  burstAllMonsters(): void {
    if (this.numberBombs > 0) {
      this.useBomb(this.monsters1);
      this.useBomb(this.monsters2);
      this.useBomb(this.monsters3);

      this.numberBombs = this.numberBombs <= 0 ? 0 : this.numberBombs - 1;
      this.changeNumberBombs();
    }
  }

  useBomb(monsters: Player[]): void {
    for (let i = 0; i < monsters.length; i += 1) {
      const pos = monsters[i].pos;
      monsters.splice(i, 1);
      this.addExplosion(pos);
      i -= 1;
      this.score += 1;
      this.changeScoreGame();
    }
  }

  changeScoreGame(): void {
    const scoreGame = <HTMLSpanElement>document.querySelector('.pumpkin-score-number');
    scoreGame.textContent = `${this.score}`;
  }

  changeNumberFreezers(): void {
    const numberFreezing = <HTMLSpanElement>document.querySelector('.pumpkin-freezing-number');
    numberFreezing.textContent = `${this.numberFreezers}`;
  }

  changeNumberBombs(): void {
    const numberBombs = <HTMLSpanElement>document.querySelector('.pumpkin-bomb-number');
    numberBombs.textContent = `${this.numberBombs}`;
  }

  changeNumberElectrons(): void {
    const numberElectroDoom = <HTMLSpanElement>document.querySelector('.pumpkin-electro-number');
    numberElectroDoom.textContent = `${this.numberElectrons}`;
  }
}
