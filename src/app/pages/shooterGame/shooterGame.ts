import './style-shooter-game.scss';
import { Raven, Explosion, Particle } from './utils-shooter-game';
import Music from '../../../utils/Music';
import CONST from '../../../spa/coreConst';
import ModalMessage from '../modalMessage/modalMessage';
import ModalMessageTemplates from '../modalMessage/modalMessageTemplates';
import DataBase from '../../../utils/dataBase';
import { ResultGame } from '../../../spa/coreTypes';

export default class ShooterGame {
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  collisionCanvas: HTMLCanvasElement | null;
  collisionCtx: CanvasRenderingContext2D | null;

  timeToNextRaven: number;
  ravelInterval: number;
  lastTime: number;
  ravens: Raven[];
  explosions: Explosion[];
  particles: Particle[];
  score: number;
  music: Music;
  resultGame: ResultGame;

  constructor() {
    this.canvas = null;
    this.ctx = null;

    this.collisionCanvas = null;
    this.collisionCtx = null;

    this.timeToNextRaven = 0;
    this.ravelInterval = 600; //start 500
    this.lastTime = 0;
    this.ravens = [];
    this.explosions = []; // boom-effect
    this.particles = []; //birds tail-particles
    this.music = new Music(CONST.musicRavensSrc);
    this.score = 0;

    const userName: string = localStorage['userName'] ? JSON.parse(localStorage['userName']) : 'unknown ghost';
    const userId: string = localStorage['userId'] ? JSON.parse(localStorage['userId']) : '';
    this.resultGame = {
      id: userId,
      name: userName,
      game: 'Ravens Hunting',
      score: this.score,
      level: 0,
      time: '-',
    };
  }

  render(): string {
    return `
    <div class="shooter-game">
      <div class="nav-block container">
        <div class="nav-block__left">
          <div class="score-info btn btn--mini accent-font"><span>Score:</span><span>${this.score}</span></div>
        </div>
        <div class="nav-block__right">
        </div>
      </div>

      ${ModalMessageTemplates.startGameBtnTemplate}

      <canvas id="canvas-collision"></canvas>
      <canvas id="canvas-shooter-game"></canvas>
    </div>
    `;
  }

  init(): void {
    this.canvas = document.querySelector('#canvas-shooter-game') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.collisionCanvas = document.querySelector('#canvas-collision') as HTMLCanvasElement;
    this.collisionCtx = this.collisionCanvas.getContext('2d') as CanvasRenderingContext2D;
    this.collisionCanvas.width = window.innerWidth;
    this.collisionCanvas.height = window.innerHeight;

    this.ctx.font = '32px Impact'; // TODO delete

    window.addEventListener('click', this.handlerGame.bind(this));
    window.addEventListener('resize', this.updateRender.bind(this));
    window.addEventListener('hashchange', this.finishGame.bind(this));
  }

  updateRender() {
    this.canvas!.width = window.innerWidth;
    this.canvas!.height = window.innerHeight;
  }

  drawScore() {
    const scoreTitle = document.querySelector('.shooter-game .score-info') as HTMLElement;
    scoreTitle.innerHTML = `<span>Score:</span> ${this.score}`;
  }

  drawGameOver() {
    const gameOverMessage = new ModalMessage();
    gameOverMessage.drawModalMessage(
      `
      <div class="title-modal-message">Game over</div>
      <div class="text-message">Your score: <span class="score-number"> ${this.score}</span></div>
      `
    );
  }

  stopGame(): void {
    this.saveScore(this.score);
    this.saveResultGameToStorage(this.resultGame);

    this.drawGameOver();
    this.music.stopMusic();
    this.soundGameOver();
    this.showStartBtn();
  }

  soundGameOver() {
    const isSoundEffects: boolean = JSON.parse(localStorage.getItem('isSoundEffects') || '{}');
    const soundGameOver = new Audio(CONST.soundGameOverSrc);
    soundGameOver.volume = 0.3;
    if (isSoundEffects) soundGameOver.play();
  }

  handlerGame(event: MouseEvent) {
    if (this.collisionCtx) {
      const detectPixelColor: ImageData = this.collisionCtx.getImageData(event.x, event.y, 1, 1); //ImageData{data: Uint8ClampedArray(rgba color!!!), width: 1, height: 1, colorSpace: 'srgb'}
      const pc: Uint8ClampedArray = detectPixelColor.data;

      this.ravens.forEach((raven) => {
        if (raven.randomColors[0] === pc[0] && raven.randomColors[1] === pc[1] && raven.randomColors[2] === pc[2]) {
          //collision detected
          raven.markedForDeletion = true;
          this.score++;
          this.explosions.push(new Explosion(raven.x, raven.y, raven.width, this.ctx!));
        }
      });
    }

    const currEl = event.target;
    const shooterGameArea = document.querySelector('.shooter-game') as HTMLElement;
    const startGameBtn = shooterGameArea.querySelector('.start-game-btn') as HTMLElement;
    const musicGameBtn = document.querySelector('.settings .music-btn') as HTMLElement;

    if (currEl === startGameBtn) {
      this.initGame();
      startGameBtn.classList.add('hide');
    }

    //stop Music on click in Settings
    if (currEl === musicGameBtn) {
      const isMusic: boolean = JSON.parse(localStorage.getItem('isMusic') || '{}');
      if (!isMusic) this.music.stopMusic();
    }
  }

  showStartBtn() {
    const startGameBtn = document.querySelector('.start-game-btn') as HTMLElement;

    setTimeout(() => {
      startGameBtn.classList.remove('hide');
    }, 3000);
  }

  animate(timestamp: number) {
    if (this.canvas && this.ctx && this.collisionCtx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear field canvas before next animate
      this.collisionCtx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear field canvas before next animate

      const deltatime: number = timestamp - this.lastTime; //browser frame speed on the user PC, new image created

      this.lastTime = timestamp;
      this.timeToNextRaven += deltatime;
      //console.log("timestamp: ", timestamp);
      //console.log("deltatime: ", deltatime); //16.66mc mostly
      //create each bird every 500mc  (ravelInterval = 500), will work alone on powerful and weak PCs
      if (this.timeToNextRaven > this.ravelInterval) {
        this.ravens.push(new Raven(this.canvas, this.ctx, this.collisionCtx));
        this.timeToNextRaven = 0;
        this.ravens.sort((a, b) => a.width - b.width); // bird sorts by width (large birds will be on a changing background and cover subsequent birds)
      }
      this.drawScore();

      [...this.particles, ...this.explosions].forEach((obj) => obj.update(deltatime));
      [...this.ravens].forEach((obj) => obj.update(deltatime, this.particles));
      [...this.particles, ...this.ravens, ...this.explosions].forEach((obj) => obj.draw());
      this.ravens = this.ravens.filter((raven) => !raven.markedForDeletion);
      this.explosions = this.explosions.filter((explosion) => !explosion.markedForDeletion);
      this.particles = this.particles.filter((particle) => !particle.markedForDeletion);

      const isGameOver = Boolean(Number(localStorage.getItem('isGameOverShooterGame')));
      if (!isGameOver) {
        requestAnimationFrame(this.animate.bind(this));
      } else {
        this.stopGame();
      }
    }
  }

  saveScore(score: number) {
    localStorage.setItem('scoreShooterGame', `${score}`);
    this.resultGame.score = score;
  }

  saveResultGameToStorage(resultGame: ResultGame): void {
    const db = new DataBase();
    db.saveToStorage(resultGame);
  }

  finishGame(): void {
    this.ravens = [];
    this.explosions = [];
    this.particles = [];
    localStorage.setItem('isGameOverShooterGame', '1');
    if (this.canvas && this.ctx && this.collisionCtx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear field canvas before next animate
      this.collisionCtx.clearRect(0, 0, this.canvas.width, this.canvas.height); //clear field canvas before next animate
    }
  }

  initGame() {
    this.ravens = [];
    this.explosions = [];
    this.particles = [];
    this.score = 0;
    localStorage.setItem('isGameOverShooterGame', '0');
    this.music.playMusic();
    this.animate(0);
  }
}
