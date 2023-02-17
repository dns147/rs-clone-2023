import './style-shooter-game.scss';
import { Raven, Explosion, Particle } from './utils-shooter-game';
import Music from '../../../utils/Music';
import musicRavensSrc from '../../../assets/audio/music/strashnye-zvuki-vorony.mp3';
import soundGameOverSrc from '../../../assets/audio/effects/fail-wha-wha.mp3';

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
  musicGameSrc: string;

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
    this.score = 0;

    // this.musicGameSrc = AUDIO_CONST.PLAY_LIST.music[0]; //strashnye-zvuki-vorony.mp3'
    this.musicGameSrc = musicRavensSrc;
    this.music = new Music(this.musicGameSrc);
  }

  render(): string {
    return `
    <div class="shooter-game">
      <section class="block-settings">
        <h2>shooter game</h2>
        <div class="navigation">
          <button class="btn start-game-btn">Start Game</button>
          <button class="btn music-btn btn--col-3">Music on/off</button>
          <button class="btn sound-btn btn--col-3">Sound effects on/off</button>
        </div>
      </section >
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
  }

  drawScore() {
    if (this.ctx) {
      this.ctx.fillStyle = 'white';
      this.ctx.fillText(`Score: ${this.score}`, 50, 75);
    }
  }

  drawGameOver() {
    if (this.ctx && this.canvas) {
      this.ctx.textAlign = 'center';

      this.ctx.fillStyle = 'white';
      this.ctx.fillText(`GAME OVER! Your score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2);
    }
  }

  stopGame(): void {
    this.saveScoreLSt(this.score);
    this.drawGameOver();
    this.music.stopMusic();
    this.soundGameOver();
  }

  soundGameOver() {
    const isSoundEffects: boolean = JSON.parse(localStorage.getItem('isSoundEffects') || '{}');
    const soundGameOver = new Audio();
    soundGameOver.src = soundGameOverSrc;
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

    const gameArea = document.querySelector('.shooter-game') as HTMLElement;
    const startGameBtn = document.querySelector('.start-game-btn') as HTMLElement;
    const musicGameBtn = document.querySelector('.music-btn') as HTMLElement;
    const soundEffectsBtn = document.querySelector('.sound-btn') as HTMLElement;

    if (currEl === startGameBtn) {
      this.initGame();
    }

    if (currEl === musicGameBtn) {
      this.music.playMusic();
      const isMusic: boolean = JSON.parse(localStorage.getItem('isMusic') || '{}');

      if (isMusic) {
        localStorage.setItem('isMusic', JSON.stringify(false));
        this.music.stopMusic();
      } else {
        localStorage.setItem('isMusic', JSON.stringify(true));
        this.music.playMusic();
      }
    }

    if (currEl === soundEffectsBtn) {
      const isSoundEffects: boolean = JSON.parse(localStorage.getItem('isSoundEffects') || '{}');

      // music.playMusic();
      if (isSoundEffects) {
        localStorage.setItem('isSoundEffects', JSON.stringify(false));
      } else {
        localStorage.setItem('isSoundEffects', JSON.stringify(true));
      }
    }
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

  saveScoreLSt(score: number) {
    localStorage.setItem('scoreShooterGame', `${score}`);
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
