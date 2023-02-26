import { MousePos, ResultGame } from '../../../spa/coreTypes';
import Sprite from './sprite';
import './style-pumpkin-game.scss';
import { Angle, ClickInfo, Player, Pumpkin } from './types-pumpkin-game';
import { boxCollides, getAngle, getFactor, getImage, getRandomInt, normalize } from './utils-pumpkin-game';
import CONSTS from './consts-pumpkin-game';
import CORE_CONST from '../../../spa/coreConst';
import ModalMessage from '../modalMessage/modalMessage';
import ModalMessageTemplates from '../modalMessage/modalMessageTemplates';
import DataBase from '../../../utils/dataBase';
import Music from '../../../utils/Music';
import Modal from '../modal/modal';
import ModalTemplates from '../modal/modalTemplates';

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
  electrons: Player[];
  resultGame: ResultGame;

  lastTime: number;
  lastShoot: number;
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
  gameLevel: number;
  userName: string;
  isMusic: boolean;
  isSound: boolean;
  currentMusic: Music;

  player: Player | null;
  pumpkinWeapon: Pumpkin | null;
  electroWeapon: Pumpkin | null;
  currentWeapon: Pumpkin | null;
  monsterGame1: Sprite | null;
  monsterGame2: Sprite | null;
  monsterGame3: Sprite | null;
  monsterGame4: Sprite | null;
  monsterGame5: Sprite | null;
  monsterGame6: Sprite | null;
  monsterGame7: Sprite | null;
  monsterGame8: Sprite | null;
  monsterGame9: Sprite | null;
  monsterGame10: Sprite | null;
  monsterGame11: Sprite | null;
  monsterGame12: Sprite | null;
  monsterGame13: Sprite | null;
  monsterGame14: Sprite | null;

  soundPumpkinCrashes: Music;
  soundExplosion: Music;
  soundMonsterDead1: Music;
  soundMonsterDead2: Music;
  soundFire: Music;
  soundLife: Music;
  soundPumpkin: Music;
  soundFreesing: Music;
  soundGameWin: Music;
  soundGameOver: Music;
  timeOver: Music;
  pumpkinLevel1: Music;
  pumpkinLevel2: Music;
  pumpkinLevel3: Music;
  pumpkinLevel4: Music;

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
    this.resultGame = {
      id: '',
      name: '',
      game: '',
      score: 0,
      level: 0,
    };

    this.lastTime = 0;
    this.lastShoot = 0;
    this.gameTime = 0;
    this.pumpkinSpeed = 1000;
    this.intervalShoot = 800;
    this.enemySpeed = 30;
    this.isGameOver = true;
    this.isMonsterStop = false;
    this.score = 0;
    this.numberPumpkins = 10;
    this.numberElectrons = 15;
    this.numberBombs = 1;
    this.numberFreezers = 1;
    this.gameLevel = 1;
    this.userName = '';
    this.isMusic = localStorage['isMusic'] === 'true';
    this.isSound = localStorage['isSoundEffects'] === 'true';
    this.currentMusic = new Music(CORE_CONST.pumpkinLevel1Src);

    this.player = null;
    this.pumpkinWeapon = null;
    this.electroWeapon = null;
    this.currentWeapon = null;
    this.monsterGame1 = null;
    this.monsterGame2 = null;
    this.monsterGame3 = null;
    this.monsterGame4 = null;
    this.monsterGame5 = null;
    this.monsterGame6 = null;
    this.monsterGame7 = null;
    this.monsterGame8 = null;
    this.monsterGame9 = null;
    this.monsterGame10 = null;
    this.monsterGame11 = null;
    this.monsterGame12 = null;
    this.monsterGame13 = null;
    this.monsterGame14 = null;

    this.soundPumpkinCrashes = new Music(CORE_CONST.soundPumpkinCrashesSrc);
    this.soundExplosion = new Music(CORE_CONST.soundExplosionSrc);
    this.soundMonsterDead1 = new Music(CORE_CONST.soundMonsterDead1Src);
    this.soundMonsterDead2 = new Music(CORE_CONST.soundMonsterDead2Src);
    this.soundFire = new Music(CORE_CONST.soundFireSrc);
    this.soundLife = new Music(CORE_CONST.soundLifeSrc);
    this.soundPumpkin = new Music(CORE_CONST.soundPumpkinSrc);
    this.soundFreesing = new Music(CORE_CONST.soundFreesingSrc);
    this.soundGameWin = new Music(CORE_CONST.soundGameWinSrc);
    this.soundGameOver = new Music(CORE_CONST.soundGameOverSrc);
    this.timeOver = new Music(CORE_CONST.timeOverSrc);
    this.pumpkinLevel1 = new Music(CORE_CONST.pumpkinLevel1Src);
    this.pumpkinLevel2 = new Music(CORE_CONST.pumpkinLevel2Src);
    this.pumpkinLevel3 = new Music(CORE_CONST.pumpkinLevel3Src);
    this.pumpkinLevel4 = new Music(CORE_CONST.pumpkinLevel4Src);

    this.freezMonsters = this.freezMonsters.bind(this);
    this.burstAllMonsters = this.burstAllMonsters.bind(this);
    this.mainLoop = this.mainLoop.bind(this);
    this.update = this.update.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
    this.handleMouse = this.handleMouse.bind(this);
    this.updateEntities = this.updateEntities.bind(this);
    this.setRoundName = this.setRoundName.bind(this);
    this.finishGame = this.finishGame.bind(this);
  }

  render(): string {
    const userName: string = localStorage['userName'] ? JSON.parse(localStorage['userName']) : '';
    const userId: string = localStorage['userId'] ? JSON.parse(localStorage['userId']) : '';
    this.resultGame.name = userName;
    this.resultGame.id = userId;
    this.resultGame.game = 'Save Pumpkin';
    this.resultGame.time = 0;

    return `
      <div class="game-container">
        <div class="status-panel">
          <div class="wrapper-pumpkin-level">
            <div class="pumpkin-level">
              <span class="pumpkin-level-name">Level</span>
              <span class="pumpkin-level-number">0</span>
            </div>
            <div class="pumpkin-score">
              <span class="pumpkin-score-name">Score</span>
              <span class="pumpkin-score-number">0</span>
            </div>
            <div class="shells">
              <img src=${require('../../../assets/img/pumpkin-icon.png')} class="pumpkin-shells-icon select-weapon" width="38" alt="icon">
              <span class="pumpkin-shells-number">∞</span>
            </div>
            <div class="electo-ball">
              <img src=${require('../../../assets/img/electro-ball.png')} class="pumpkin-electro-icon" width="38" alt="icon">
              <span class="pumpkin-electro-number">${this.numberElectrons}</span>
            </div>
            <div class="freezing">
              <img src=${require('../../../assets/img/freezing.png')} class="pumpkin-freezing-icon" width="38" alt="icon">
              <span class="pumpkin-freezing-number">${this.numberFreezers}</span>
            </div>
            <div class="bomb">
              <img src=${require('../../../assets/img/bomb-mini.png')} class="pumpkin-bomb-icon" width="38" alt="icon">
              <span class="pumpkin-bomb-number">${this.numberBombs}</span>
            </div>
          </div>
          <div class="time-game-pumpkin">
            <span class="min">00</span><span>:</span><span class="sec">00</span>
          </div>
        </div>

        <div class="game-area">
          ${ModalMessageTemplates.startGameBtnTemplate}
          <div class="round-number-wrapper">
            Level <span class="round-number">1</span>
          </div>
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
    (<HTMLElement>document.querySelector('.pumpkin-freezing-icon')).addEventListener('click', this.freezMonsters);
    (<HTMLElement>document.querySelector('.pumpkin-bomb-icon')).addEventListener('click', this.burstAllMonsters);
    
    const gameInfoBtn = <HTMLButtonElement>document.querySelector('.game-info-btn');
    gameInfoBtn.classList.remove('hide');
    gameInfoBtn.addEventListener('click', this.showGameInfo);

    window.addEventListener('hashchange', this.finishGame);
    window.addEventListener('resize', () => document.location.reload());
    window.addEventListener('resize', this.resizeGameArea);

    this.resizeGameArea();
    localStorage.setItem('currentWeapon', 'pumpkin');

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
      this.preInitGame();
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

    gameArea.style.marginTop = -newHeight / 2 + 'px';
    gameArea.style.marginLeft = -newWidth / 2 + 'px';

    this.canvasWidth = newWidth;
    this.canvasHeight = newHeight;
  }

  preInitGame(): void {
    const btnPlay = <HTMLButtonElement>document.querySelector('.start-game-btn');

    btnPlay.addEventListener('click', () => {
      btnPlay.style.display = 'none';
      this.canvas?.classList.add('pumpkin-canvas-active');
      this.setRoundName();
    });
  }

  showGameInfo(): void {
    const gameInfoModal = new Modal();
    gameInfoModal.drawModal(ModalTemplates.gameInfoModalTemplate);
  }

  setRoundName(): void {
    const popup = <HTMLElement>document.querySelector('.popup');
    popup?.remove();

    const timeMin = <HTMLSpanElement>document.querySelector('.min');
    const timeSec = <HTMLSpanElement>document.querySelector('.sec');
    timeMin.textContent = normalize(0);
    timeSec.textContent = normalize(0);

    const gameLevel = <HTMLSpanElement>document.querySelector('.pumpkin-level-number');
    gameLevel.textContent = `${this.gameLevel}`;

    const roundNumberWrapper = <HTMLElement>document.querySelector('.round-number-wrapper');
    let roundNumber = <HTMLElement>document.querySelector('.round-number');

    if (!roundNumber) {
      roundNumberWrapper.textContent = 'Level ';
      roundNumber = document.createElement('span');
      roundNumber.classList.add('round-number');
      roundNumberWrapper.append(roundNumber);
    }

    if (this.gameLevel === 3) {
      roundNumberWrapper.textContent = 'Bonus Level';
    } else if (this.gameLevel === 4) {
      roundNumberWrapper.textContent = 'Survival Level';
    } else {
      roundNumber.textContent = `${this.gameLevel}`;
    }

    roundNumberWrapper.style.visibility = 'visible';

    const idTimerRoundName1 = window.setInterval(() => (roundNumberWrapper.style.visibility = 'hidden'), 500);
    const idTimerRoundName2 = window.setInterval(() => (roundNumberWrapper.style.visibility = 'visible'), 1000);
    window.setTimeout(() => {
      window.clearInterval(idTimerRoundName1);
      window.clearInterval(idTimerRoundName2);
      roundNumberWrapper.style.visibility = 'hidden';
      this.initGame();
    }, 3500);
  }

  initGame(): void {
    this.addEntities();
    this.reset();
    this.lastShoot = Date.now();
    this.lastTime = Date.now();
    this.mainLoop();

    switch (this.gameLevel) {
      case 1:
        this.makeTimer(1, 30);
        if (this.isMusic) {
          this.currentMusic = this.pumpkinLevel1;
          this.currentMusic.playMusic(0.9);
        }
        break;
      case 2:
        this.makeTimer(1, 30);
        if (this.isMusic) {
          this.currentMusic = this.pumpkinLevel2;
          this.currentMusic.playMusic(0.8);
        }
        break;
      case 3:
        this.makeTimer(0, 60);
        if (this.isMusic) {
          this.currentMusic = this.pumpkinLevel3;
          this.currentMusic.playMusic(0.8);
        }
        break;
      case 4:
        this.makeTimer(0, 0);
        if (this.isMusic) {
          this.currentMusic = this.pumpkinLevel4;
          this.currentMusic.playMusic(0.3);
        }
        break;
    }
  }

  addEntities(): void {
    this.player = {
      rotate: 0,
      pos: [0, 0],
      sprite: new Sprite(getImage(this.images, this.imagesUrl[0]), [0, 0], [87.5, 97], 3, [5], null, false, 0),
      width: 87.5,
      height: 97,
    };

    this.pumpkinWeapon = {
      rotate: 0,
      pos: [0, 0],
      sprite: new Sprite(
        getImage(this.images, this.imagesUrl[1]),
        [0, 0],
        [35, 28],
        5,
        [5, 4, 3, 2, 1],
        null,
        false,
        0
      ),
      width: 35,
      height: 28,
      clickInfo: {
        pos: {},
        distance: 0,
        angle: {
          rad: 0,
          grad: 0,
        },
      },
    };

    this.electroWeapon = {
      rotate: 0,
      pos: [0, 0],
      sprite: new Sprite(getImage(this.images, this.imagesUrl[12]), [0, 0], [48, 45], 1, [0], null, false, 0),
      width: 48,
      height: 45,
      clickInfo: {
        pos: {},
        distance: 0,
        angle: {
          rad: 0,
          grad: 0,
        },
      },
    };

    this.currentWeapon = localStorage['currentWeapon'] === 'electro' ? this.electroWeapon : this.pumpkinWeapon;

    this.monsterGame1 = new Sprite(
      getImage(this.images, this.imagesUrl[2]),
      [0, 0],
      [105, 67],
      5,
      [0, 1, 2, 3, 4, 5, 6, 7],
      null,
      false,
      0
    );
    this.monsterGame2 = new Sprite(
      getImage(this.images, this.imagesUrl[3]),
      [0, 0],
      [111, 95],
      5,
      [0, 1, 2, 3, 4, 5],
      null,
      false,
      0
    );
    this.monsterGame3 = new Sprite(
      getImage(this.images, this.imagesUrl[5]),
      [0, 0],
      [105, 67],
      5,
      [0, 1, 2, 3, 4, 5, 6, 7],
      null,
      false,
      0
    );
    this.monsterGame4 = new Sprite(
      getImage(this.images, this.imagesUrl[6]),
      [0, 0],
      [111, 95],
      5,
      [0, 1, 2, 3, 4, 5],
      null,
      false,
      0
    );
    this.monsterGame5 = new Sprite(
      getImage(this.images, this.imagesUrl[4]),
      [0, 0],
      [90, 78],
      2,
      [0, 1, 2, 3, 4, 5],
      null,
      false,
      0
    );
    this.monsterGame6 = new Sprite(
      getImage(this.images, this.imagesUrl[14]),
      [0, 0],
      [87, 50],
      5,
      [0, 1, 2, 3, 2, 1],
      null,
      false,
      0
    );
    this.monsterGame7 = new Sprite(
      getImage(this.images, this.imagesUrl[15]),
      [0, 0],
      [75, 83],
      5,
      [0, 1, 2, 3, 4, 5, 4, 3, 2, 1],
      null,
      false,
      0
    );
    this.monsterGame8 = new Sprite(
      getImage(this.images, this.imagesUrl[16]),
      [0, 0],
      [82, 50],
      5,
      [3, 2, 1, 0, 1, 2],
      null,
      false,
      0
    );
    this.monsterGame9 = new Sprite(
      getImage(this.images, this.imagesUrl[17]),
      [0, 0],
      [75, 83],
      5,
      [5, 4, 3, 2, 1, 0, 1, 2, 3, 4],
      null,
      false,
      0
    );
    this.monsterGame10 = new Sprite(
      getImage(this.images, this.imagesUrl[20]),
      [0, 0],
      [95, 52],
      5,
      [0, 1, 2, 3, 2, 1],
      null,
      false,
      0
    );
    this.monsterGame11 = new Sprite(
      getImage(this.images, this.imagesUrl[21]),
      [0, 0],
      [96, 52],
      5,
      [3, 2, 1, 0, 1, 2],
      null,
      false,
      0
    );
    this.monsterGame12 = new Sprite(
      getImage(this.images, this.imagesUrl[18]),
      [0, 0],
      [162, 94],
      5,
      [0, 1, 2, 3, 4, 5, 6, 7],
      null,
      false,
      0
    );
    this.monsterGame13 = new Sprite(
      getImage(this.images, this.imagesUrl[19]),
      [0, 0],
      [164, 99],
      5,
      [0, 1, 2, 3, 4, 5, 6, 7],
      null,
      false,
      0
    );
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

    if (
      this.monsterGame1 &&
      this.monsterGame2 &&
      this.monsterGame3 &&
      this.monsterGame4 &&
      this.monsterGame5 &&
      this.monsterGame6 &&
      this.monsterGame7 &&
      this.monsterGame8 &&
      this.monsterGame9 &&
      this.monsterGame10 &&
      this.monsterGame11 &&
      this.monsterGame12 &&
      this.monsterGame13
    ) {
      switch (this.gameLevel) {
        case 1:
          this.addMonsters1(this.monsterGame1, this.monsterGame2, this.monsterGame3, this.monsterGame4);
          this.addMonsters2(this.monsterGame2, this.monsterGame4);
          this.addMonsters3(this.monsterGame5, this.monsterGame5);
          break;

        case 2:
          this.addMonsters1(this.monsterGame6, this.monsterGame7, this.monsterGame8, this.monsterGame9);
          this.addMonsters2(this.monsterGame10, this.monsterGame11);
          this.addMonsters3(this.monsterGame12, this.monsterGame13);
          break;

        case 4:
          this.addMonsters1(this.monsterGame6, this.monsterGame7, this.monsterGame8, this.monsterGame9);
          this.addMonsters1(this.monsterGame1, this.monsterGame2, this.monsterGame3, this.monsterGame4);
          this.addMonsters2(this.monsterGame10, this.monsterGame11);
          this.addMonsters2(this.monsterGame2, this.monsterGame4);
          this.addMonsters3(this.monsterGame12, this.monsterGame13);
          this.addMonsters3(this.monsterGame5, this.monsterGame5);
          break;

        default:
          break;
      }
    }

    this.addItems();
    this.checkCollisions(dt);
  }

  addMonsters1(monster1: Sprite, monster2: Sprite, monster3: Sprite, monster4: Sprite): void {
    if (Math.random() < 1 - Math.pow(0.999, this.gameTime) && this.monsters1.length <= 3) {
      switch (getRandomInt(0, 4)) {
        case 0: //left
          this.monsters1.push({
            pos: [0, Math.random() * (this.canvasHeight - 30)],
            sprite: monster1,
          });

          this.monsters1.push({
            pos: [0, Math.random() * (this.canvasHeight - 30)],
            sprite: monster2,
          });
          break;

        default: //right
          this.monsters1.push({
            pos: [this.canvasWidth, Math.random() * (this.canvasHeight - 30)],
            sprite: monster3,
          });

          this.monsters1.push({
            pos: [this.canvasWidth, Math.random() * (this.canvasHeight - 30)],
            sprite: monster4,
          });
          break;
      }
    }
  }

  addMonsters2(monster1: Sprite, monster2: Sprite): void {
    if (Math.random() < 1 - Math.pow(0.999, this.gameTime) && this.monsters2.length <= 3) {
      switch (getRandomInt(0, 4)) {
        case 0: //left
          this.monsters2.push({
            pos: [0, Math.random() * (this.canvasHeight - 30)],
            sprite: monster1,
          });
          break;

        default: //right
          this.monsters2.push({
            pos: [this.canvasWidth, Math.random() * (this.canvasHeight - 30)],
            sprite: monster2,
          });
          break;
      }
    }
  }

  addMonsters3(monster1: Sprite, monster2: Sprite): void {
    if (Math.random() < 1 - Math.pow(0.999, this.gameTime) && this.monsters3.length <= 3) {
      switch (getRandomInt(0, 4)) {
        case 0: //left
          this.monsters3.push({
            pos: [0, Math.random() * (this.canvasHeight - 30)],
            sprite: monster1,
          });
          break;

        default: //right
          this.monsters3.push({
            pos: [this.canvasWidth, Math.random() * (this.canvasHeight - 30)],
            sprite: monster2,
          });
          break;
      }
    }
  }

  addItems(): void {
    if (this.freezers.length === 2 || this.bombs.length === 2 || this.electrons.length === 2) {
      return;
    }

    if (Math.random() < 1 - Math.pow(0.999, this.gameTime)) {
      switch (getRandomInt(0, 4)) {
        case 0:
          this.freezers.push({
            pos: [Math.random() * this.canvasWidth - 15, 0],
            sprite: new Sprite(getImage(this.images, this.imagesUrl[13]), [0, 0], [53, 53], 1, [0], null, false, 0),
          });
          break;

        case 1:
          this.bombs.push({
            pos: [Math.random() * this.canvasWidth - 15, 0],
            sprite: new Sprite(getImage(this.images, this.imagesUrl[8]), [0, 0], [49, 46], 1, [0], null, false, 0),
          });
          break;

        case 2:
          this.electrons.push({
            pos: [Math.random() * this.canvasWidth - 15, 0],
            sprite: new Sprite(getImage(this.images, this.imagesUrl[12]), [0, 0], [48, 45], 1, [0], null, false, 0),
          });
          break;
      }
    }
  }

  reset(): void {
    if (this.canvas && this.player && this.currentWeapon) {
      this.player.pos = [this.canvasWidth / 2, this.canvasHeight / 2];
      this.currentWeapon.pos = [this.canvasWidth / 2, this.canvasHeight / 2];
    }

    this.isGameOver = false;
  }

  renderGame(): void {
    if (!this.isGameOver && this.player) {
      this.renderPlayer(this.player);
      this.renderShootPumpkins(this.weapons);
      this.renderEntities(this.monsters1);
      this.renderEntities(this.monsters2);
      this.renderEntities(this.monsters3);
      this.renderEntities(this.freezers);
      this.renderEntities(this.bombs);
      this.renderEntities(this.electrons);
      this.renderEntities(this.bursts);
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
        const spriteWeapon: Sprite = new Sprite(
          getImage(this.images, this.imagesUrl[12]),
          [0, 0],
          [48, 45],
          1,
          [0],
          null,
          false,
          0
        );

        this.weapons.push({
          pos: [this.canvasWidth / 2, this.canvasHeight / 2],
          sprite: spriteWeapon,
          clickInfo: {
            pos: mousePos,
            distance: distance,
            angle: angle,
          },
        });

        if (this.isSound) {
          this.soundFire.playMusic(1);
        }

        this.numberElectrons = this.numberElectrons <= 0 ? 0 : this.numberElectrons - 1;
        this.changeNumberElectrons();
      }

      if (this.numberElectrons === 0) {
        const numberElectron = <HTMLSpanElement>document.querySelector('.pumpkin-electro-number');
        numberElectron.style.color = CONSTS.accentColorNumber;
      }

      if (localStorage['currentWeapon'] === 'pumpkin') {
        const spriteWeapon: Sprite = new Sprite(
          getImage(this.images, this.imagesUrl[1]),
          [0, 0],
          [35, 28],
          7,
          [5, 4, 3, 2, 1],
          null,
          false,
          0
        );

        this.weapons.push({
          pos: [this.canvasWidth / 2, this.canvasHeight / 2],
          sprite: spriteWeapon,
          clickInfo: {
            pos: mousePos,
            distance: distance,
            angle: angle,
          },
        });

        if (this.isSound) {
          this.soundPumpkin.playMusic(1);
        }
      }

      this.lastShoot = Date.now();
      localStorage.setItem('isClick', 'false');
    }

    if (localStorage['isFreez'] === 'true') {
      this.freezMonsters();
      localStorage.setItem('isFreez', 'false');
    }

    if (localStorage['isBomb'] === 'true') {
      this.burstAllMonsters();
      localStorage.setItem('isBomb', 'false');
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

    if (!this.isMonsterStop) {
      this.updateMonsters(this.monsters1, dt, 1);
      this.updateMonsters(this.monsters2, dt, 1 * this.gameLevel);
      this.updateMonsters(this.monsters3, dt, 0.4 * this.gameLevel);
    }

    this.updateItems(dt, this.freezers);
    this.updateItems(dt, this.bombs);
    this.updateItems(dt, this.electrons);
    this.updateBurst(dt);
  }

  updatePlayer(dt: number): void {
    this.player?.sprite.update(dt);
  }

  updateMonsters(monsters: Player[], dt: number, gainSpeed: number): void {
    for (let i = 0; i < monsters.length; i += 1) {
      const monster: Player = monsters[i];
      const x0 = monster.pos[0];
      const y0 = monster.pos[1];

      const x1 = this.player ? this.player.pos[0] : 0;
      const y1 = this.player ? this.player.pos[1] : 0;

      let distance = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));

      monster.pos[0] += (this.enemySpeed * dt * gainSpeed * (x1 - x0)) / distance;
      monster.pos[1] += (this.enemySpeed * dt * gainSpeed * (y1 - y0)) / distance;

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
      const pumpkinHeight = <number>this.currentWeapon?.height;
      const speedWeapon: number = localStorage['currentWeapon'] === 'electro' ? 2.2 : 1;

      if (angleGrad > 0 && angleGrad <= 90) {
        pumpkin.pos[0] +=
          (this.pumpkinSpeed * dt * speedWeapon * (mouseX - this.posCenterX - pumpkinWidth * factorX)) / distance;
        pumpkin.pos[1] +=
          (this.pumpkinSpeed * dt * speedWeapon * (mouseY - this.posCenterY + pumpkinHeight * factorY)) / distance;
      }

      if (angleGrad > 90 && angleGrad <= 180) {
        pumpkin.pos[0] +=
          (this.pumpkinSpeed * dt * speedWeapon * (mouseX - this.posCenterX - pumpkinWidth * factorX)) / distance;
        pumpkin.pos[1] +=
          (this.pumpkinSpeed * dt * speedWeapon * (mouseY - this.posCenterY - pumpkinHeight * factorY)) / distance;
      }

      if (angleGrad < 0 && angleGrad >= -90) {
        pumpkin.pos[0] +=
          (this.pumpkinSpeed * dt * speedWeapon * (mouseX - this.posCenterX + pumpkinWidth * factorX)) / distance;
        pumpkin.pos[1] +=
          (this.pumpkinSpeed * dt * speedWeapon * (mouseY - this.posCenterY + pumpkinHeight * factorY)) / distance;
      }

      if (angleGrad < -90 && angleGrad >= -180) {
        pumpkin.pos[0] +=
          (this.pumpkinSpeed * dt * speedWeapon * (mouseX - this.posCenterX + pumpkinWidth * factorX)) / distance;
        pumpkin.pos[1] +=
          (this.pumpkinSpeed * dt * speedWeapon * (mouseY - this.posCenterY - pumpkinHeight * factorY)) / distance;
      }

      if (
        pumpkin.pos[0] < 0 ||
        pumpkin.pos[0] > this.canvasWidth ||
        pumpkin.pos[1] < 0 ||
        pumpkin.pos[1] > this.canvasHeight
      ) {
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
        if (
          boxCollides(
            [pos1[0] + size1[0] / 4, pos1[1] + size1[1] / 4],
            [size1[0] / 2, size1[1] / 2],
            this.player.pos,
            this.player.sprite.size
          )
        ) {
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

            if (this.numberFreezers > 0) {
              const numberFreezers = <HTMLSpanElement>document.querySelector('.pumpkin-freezing-number');
              numberFreezers.style.color = 'white';
            }
          }

          if (nameItem === 'bomb') {
            this.numberBombs += 1;
            this.changeNumberBombs();

            if (this.numberBombs > 0) {
              const numberBomb = <HTMLSpanElement>document.querySelector('.pumpkin-bomb-number');
              numberBomb.style.color = 'white';
            }
          }

          if (nameItem === 'electron') {
            this.numberElectrons += 2;
            this.changeNumberElectrons();

            if (this.numberElectrons > 0) {
              const numberElectron = <HTMLSpanElement>document.querySelector('.pumpkin-electro-number');
              numberElectron.style.color = 'white';
            }
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
        sprite: new Sprite(
          getImage(this.images, this.imagesUrl[10]),
          [0, 0],
          [94, 94],
          8,
          [0, 1, 2, 3, 4, 5],
          null,
          true,
          0
        ),
      });
    } else {
      this.bursts.push({
        pos: pos1,
        sprite: new Sprite(getImage(this.images, this.imagesUrl[7]), [0, 0], [61, 61], 8, [0, 1, 2, 3], null, true, 0),
      });
    }

    if (this.isSound) {
      this.soundPumpkinCrashes.playMusic(1);
    }
  }

  addExplosion(pos1: number[]): void {
    this.bursts.push({
      pos: pos1,
      sprite: new Sprite(
        getImage(this.images, this.imagesUrl[9]),
        [0, 0],
        [250, 256],
        6,
        [0, 1, 2, 3, 4, 5],
        null,
        true,
        0
      ),
    });

    if (this.isSound) {
      this.soundExplosion.playMusic(1);
    }
  }

  addBurstItem(pos1: number[]): void {
    this.bursts.push({
      pos: pos1,
      sprite: new Sprite(
        getImage(this.images, this.imagesUrl[11]),
        [0, 0],
        [69, 69],
        10,
        [0, 1, 2, 3, 4, 5, 6, 7],
        null,
        true,
        0
      ),
    });

    if (this.isSound) {
      this.soundLife.playMusic(1);
    }
  }

  gameOver() {
    if (this.isMusic) {
      this.currentMusic.stopMusic();
    }

    if (this.isSound) {
      this.soundGameOver.playMusic(0.2);
    }

    this.resultGame.level = this.gameLevel;
    this.saveResultGameToStorage();

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
    this.numberElectrons = 15;
    this.gameLevel = 1;
    this.score = 0;

    const gameOverModalMessage = new ModalMessage();
    gameOverModalMessage.drawModalMessage(CONSTS.gameOverModalMessageTemplate, false);

    const pumpkinRestart = <HTMLElement>document.querySelector('.pumpkin-restart');
    pumpkinRestart.addEventListener('click', () => {
      const pumpkinScore = <HTMLElement>document.querySelector('.pumpkin-score-number');
      const pumpkinElectron = <HTMLElement>document.querySelector('.pumpkin-electro-number');
      const pumpkinFreezer = <HTMLElement>document.querySelector('.pumpkin-freezing-number');
      const pumpkinBomb = <HTMLElement>document.querySelector('.pumpkin-bomb-number');

      pumpkinScore.textContent = `${this.score}`;
      pumpkinElectron.textContent = `${this.numberElectrons}`;
      pumpkinFreezer.textContent = `${this.numberFreezers}`;
      pumpkinBomb.textContent = `${this.numberBombs}`;

      if (this.isSound) {
        this.soundGameOver.stopMusic();
      }

      if (this.isMusic) {
        this.currentMusic = this.pumpkinLevel1;
        this.currentMusic.playMusic(0.9);
      }

      this.setRoundName();
    });
  }

  makeTimer(min: number, sec: number): void {
    const that = this;
    const timeMin = <HTMLSpanElement>document.querySelector('.min');
    const timeSec = <HTMLSpanElement>document.querySelector('.sec');

    if (this.gameLevel === 4) {
      timeMin.textContent = '∞';
      timeSec.textContent = '∞';
      return;
    }

    setTimeout(function tick() {
      timeMin.textContent = normalize(min);
      timeSec.textContent = normalize(sec);
      //time.textContent = normalize(min) + ':' + normalize(sec);

      if (min >= 0 && !that.isGameOver) {
        setTimeout(tick, 1000);
      }

      if (min < 0) {
        timeMin.textContent = normalize(0);
        timeSec.textContent = normalize(0);
        //time.textContent = normalize(0) + ':' + normalize(0);
        that.gameLevel += 1;
        that.nextLevel();
      }

      sec -= 1;

      if (sec === 0) {
        min -= 1;
        sec = 60;
      }

      if (min === 0 && sec < 10) {
        if (that.isSound) {
          that.timeOver.playMusic(0.5);
        }
      }

      if (that.isGameOver) {
        if (that.isSound) {
          that.timeOver.stopMusic();
        }
      }
    });
  }

  nextLevel(): void {
    if (this.isSound) {
      this.soundGameWin.playMusic(0.6);
    }

    if (this.isMusic) {
      this.currentMusic.stopMusic();
    }

    this.resultGame.level = this.gameLevel - 1;
    this.saveResultGameToStorage();

    this.isGameOver = true;
    this.monsters1 = [];
    this.monsters2 = [];
    this.monsters3 = [];
    this.bursts = [];
    this.weapons = [];
    this.freezers = [];
    this.bombs = [];
    this.electrons = [];

    const nextLevelModalMessage = new ModalMessage();
    nextLevelModalMessage.drawModalMessage(CONSTS.nextLevelModalMessageTemplate, false);

    const pumpkinNextLevel = <HTMLElement>document.querySelector('.pumpkin-next-level');
    pumpkinNextLevel.addEventListener('click', this.setRoundName);
  }

  freezMonsters(): void {
    if (this.numberFreezers > 0) {
      this.isMonsterStop = true;
      window.setTimeout(() => (this.isMonsterStop = false), 5000);

      if (this.isSound) {
        this.soundFreesing.playMusic(1);
      }

      this.numberFreezers = this.numberFreezers <= 0 ? 0 : this.numberFreezers - 1;
      this.changeNumberFreezers();
    }

    if (this.numberFreezers === 0) {
      const numberFreezers = <HTMLSpanElement>document.querySelector('.pumpkin-freezing-number');
      numberFreezers.style.color = CONSTS.accentColorNumber;
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

    if (this.numberBombs === 0) {
      const numberBomb = <HTMLSpanElement>document.querySelector('.pumpkin-bomb-number');
      numberBomb.style.color = CONSTS.accentColorNumber;
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
    this.resultGame.score = this.score;
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

  finishGame(): void {
    if (this.isMusic) {
      this.currentMusic.stopMusic();
    }

    if (this.isSound) {
      this.timeOver.stopMusic();
    }

    this.gameTime = 0;
    this.isGameOver = true;
  }

  saveResultGameToStorage(): void {
    const db = new DataBase();
    db.saveToStorage(this.resultGame);
  }
}
