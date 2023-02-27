import ModalMessage from '../modalMessage/modalMessage';
import { ParallaxGameProps } from './types';

export class InputHandler {
  keys: string[];

  constructor() {
    this.keys = [];
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && this.keys.indexOf(e.code) === -1) {
        this.keys.push(e.code);
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        this.keys.splice(this.keys.indexOf(e.code), 1);
      }
    });
    window.addEventListener('touchstart', (e: TouchEvent) => {
      const target = e.target as HTMLCanvasElement;
      if (target.id === 'canvas-parallax' && e.type === 'touchstart' && this.keys.indexOf(e.type) === -1) {
        this.keys.push(e.type);
      }
    });
    window.addEventListener('touchend', (e) => {
      const target = e.target as HTMLCanvasElement;
      if (target.id === 'canvas-parallax' && e.type === 'touchend') {
        this.keys.splice(this.keys.indexOf(e.type), 1);
      }
    });
  }
}
const input = new InputHandler();

const parallaxGameState: ParallaxGameProps = {
  parallaxSpeed: 0,
  gameSpeed: 0,
  width: 0,
  height: 0,
  seconds: 0,
  minutes: 0,
  lastTime: 0,
  enemyTimer: 0,
  enemyInterval: 0,
  min: 0,
  timerInterval: 0,
  gameOver: false,
  parallaxArr: [],
  enemies: [],
  player: [],
  enemyTimeId: 0,
  enemySpeedModif: 0,
};

export function setInitialValues() {
  parallaxGameState.parallaxSpeed = 5;
  parallaxGameState.gameSpeed = 5;
  parallaxGameState.enemyInterval = 2000;
  parallaxGameState.min = 300;
  parallaxGameState.enemySpeedModif = 1;
}

export class Parallax {
  x: number;
  y: number;
  height: number;
  width: number;
  x2: number;
  image: HTMLImageElement;
  speedModifier: number;
  speed: number;

  constructor(image: HTMLImageElement, speedModifier: number) {
    this.x = 0;
    this.y = 0;
    this.height = parallaxGameState.height;
    this.width = parallaxGameState.height * 1.77;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = parallaxGameState.parallaxSpeed * this.speedModifier;
  }

  update() {
    this.speed = parallaxGameState.parallaxSpeed * this.speedModifier;

    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }
    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }

    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }

  draw() {
    const canvasProps = setCanvas();
    const ctx = canvasProps.context;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

export class Player {
  gameWidth: number;
  gameHeight: number;
  width: number;
  height: number;
  x: number;
  y: number;
  speed: number;
  vy: number;
  weight: number;
  image: HTMLImageElement;

  constructor(
    image: HTMLImageElement,
    playerWidth: number,
    playerHeight: number,
    gameWidth: number,
    gameHeight: number
  ) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.height = gameHeight * 0.24;
    this.width = (this.height * ((playerWidth * 100) / playerHeight)) / 100;

    this.x = gameWidth * 0.01;
    this.y = this.gameHeight - this.height - this.gameHeight * 0.12;
    this.image = image;
    this.speed = 0;
    this.vy = 0;
    this.weight = 0.3;
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update(input: InputHandler, enemies: Enemy[]) {
    // collision
    enemies.forEach((e) => {
      const dx = e.x + e.width / 2 - (this.x + this.width / 2) * 0.9;
      const dy = e.y + e.height / 2 - (this.y + this.height / 2) * 0.9;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < (e.width / 2 + this.width / 2) * 0.9) {
        parallaxGameState.gameOver = true;
        const timeContainer = document.querySelector('.parallax-game-results-time__number') as HTMLElement;
        const time = timeContainer.textContent as string;
        setLocalstorage(time);
        clearInterval(parallaxGameState.enemyTimeId);
        clearInterval(parallaxGameState.timerInterval);
        showGameOver();
      }
    });

    this.x += this.speed;

    if (input.keys.indexOf('Space') > -1) {
      if ((!this.onGround() && this.y > -1) || this.onGround()) {
        this.jump();
      }
    } else {
      this.speedDown();
    }

    if (input.keys.indexOf('touchstart') > -1) {
      if ((!this.onGround() && this.y > -1) || this.onGround()) {
        this.jump();
      }
    } else {
      this.speedDown();
    }

    this.y += this.vy;

    if (!this.onGround()) {
      this.vy += this.weight;
    } else {
      this.vy = 0;
    }

    if (this.y > this.gameHeight - this.height) {
      this.y = this.gameHeight - this.height - this.gameHeight * 0.12;
    }

    if (this.y < -1) {
      this.y = -1;
    }
  }

  jump() {
    this.vy -= 0.9;
  }

  speedDown() {
    this.speed = 0;
  }

  onGround() {
    return this.y >= this.gameHeight - this.height - this.gameHeight * 0.12;
  }
}

function setCanvas() {
  const canvasElement = document.querySelector('#canvas-parallax') as HTMLCanvasElement;
  const ctx = canvasElement.getContext('2d') as CanvasRenderingContext2D;
  return { context: ctx, canvas: canvasElement };
}

export function setCanvasSize() {
  const canvasProps = setCanvas();
  canvasProps.canvas.width =
    window.innerHeight * 1.6 > window.innerWidth ? window.innerWidth : window.innerHeight * 1.6;
  canvasProps.canvas.height = window.innerHeight;
  parallaxGameState.width = canvasProps.canvas.width;
  parallaxGameState.height = canvasProps.canvas.height;
}

export function createPlayer() {
  const canvasProps = setCanvas();
  const ctx = canvasProps.context;
  const hero = new Image();
  hero.src = require('../../../assets/parallax-game/witch1.png');

  hero.onload = () => {
    const player = new Player(hero, hero.width, hero.height, parallaxGameState.width, parallaxGameState.height);
    player.draw(ctx);
    parallaxGameState.player.push(player);
  };
}

export class Enemy {
  gameWidth: number;
  gameHeight: number;
  width: number;
  height: number;
  x: number;
  y: number;
  speed: number;
  image: HTMLImageElement;
  markedForDelition: boolean;

  constructor(
    image: HTMLImageElement,
    enemyWidth: number,
    enemyHeight: number,
    speedModifier: number,
    gameWidth: number,
    gameHeight: number
  ) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.height = gameHeight * 0.28;
    this.width = (this.height * ((enemyWidth * 100) / enemyHeight)) / 100;
    this.image = image;
    this.x = gameWidth;
    this.y = this.gameHeight - this.height - this.gameHeight * 0.08;
    this.speed = parallaxGameState.gameSpeed * speedModifier;
    this.markedForDelition = false;
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update() {
    this.x -= this.speed;
    if (this.x < 0 - this.width) {
      this.markedForDelition = true;
    }
  }
}

export function createBackground(): void {
  const layer1 = new Image();
  layer1.src = require('../../../assets/parallax-game/1_game_background/layers/1.png');

  const layer2 = new Image();
  layer2.src = require('../../../assets/parallax-game/1_game_background/layers/2.png');

  const layer3 = new Image();
  layer3.src = require('../../../assets/parallax-game/1_game_background/layers/3.png');

  const layer4 = new Image();
  layer4.src = require('../../../assets/parallax-game/1_game_background/layers/4.png');

  const layer5 = new Image();
  layer5.src = require('../../../assets/parallax-game/1_game_background/layers/5.png');

  const layer6 = new Image();
  layer6.src = require('../../../assets/parallax-game/1_game_background/layers/6.png');

  const layer7 = new Image();
  layer7.src = require('../../../assets/parallax-game/1_game_background/layers/7.png');

  const parallax1 = new Parallax(layer1, 0);
  const parallax2 = new Parallax(layer2, 0.2);
  const parallax3 = new Parallax(layer3, 0.4);
  const parallax4 = new Parallax(layer4, 0.6);
  const parallax5 = new Parallax(layer5, 0.8);
  const parallax6 = new Parallax(layer6, 0.8);
  const parallax7 = new Parallax(layer7, 0.8);

  parallaxGameState.parallaxArr = [parallax1, parallax2, parallax3, parallax4, parallax5, parallax6, parallax7];
}

function createEnemies(time: number) {
  const canvasProps = setCanvas();
  const ctx = canvasProps.context;
  const max = 8;
  const min = 1;
  const enemyNum = Math.floor(Math.random() * (max - min + min) + min);
  const interval = getRandomEnemyInterval();
  const enemy = new Image();
  enemy.src = require(`../../../assets/parallax-game/enemy/${enemyNum}.png`);

  if (parallaxGameState.enemyTimer > parallaxGameState.enemyInterval + interval) {
    parallaxGameState.enemies.push(
      new Enemy(
        enemy,
        enemy.width,
        enemy.height,
        parallaxGameState.enemySpeedModif,
        parallaxGameState.width,
        parallaxGameState.height
      )
    );
    parallaxGameState.enemyTimer = 0;
  } else {
    parallaxGameState.enemyTimer += time;
  }

  parallaxGameState.enemies.forEach((e) => {
    e.draw(ctx);
    e.update();
  });

  parallaxGameState.enemies = parallaxGameState.enemies.filter((e) => !e.markedForDelition);
}

export function animate(timeStamp: number) {
  const canvasProps = setCanvas();
  const ctx = canvasProps.context;

  const time = timeStamp - parallaxGameState.lastTime;
  parallaxGameState.lastTime = timeStamp;

  ctx.clearRect(0, 0, parallaxGameState.width, parallaxGameState.height);

  parallaxGameState.parallaxArr.forEach((e) => {
    e.update();
    e.draw();
  });

  createEnemies(time);

  parallaxGameState.player[0]?.draw(ctx);
  parallaxGameState.player[0]?.update(input, parallaxGameState.enemies);

  if (!parallaxGameState.gameOver) {
    requestAnimationFrame(animate);
  }
}

export function timer() {
  const timeContainer = document.querySelector('.parallax-game-results-time__number') as HTMLElement;
  clearInterval(parallaxGameState.timerInterval);
  timeContainer.textContent = '00:00';
  parallaxGameState.timerInterval = window.setInterval(() => {
    parallaxGameState.seconds++;
    if (parallaxGameState.seconds < 10 && parallaxGameState.minutes < 10) {
      timeContainer.textContent = `0${parallaxGameState.minutes}:0${parallaxGameState.seconds}`;
    } else if (parallaxGameState.minutes < 10 && parallaxGameState.seconds >= 10) {
      timeContainer.textContent = `0${parallaxGameState.minutes}:${parallaxGameState.seconds}`;
    } else if (parallaxGameState.minutes >= 10 && parallaxGameState.seconds < 10) {
      timeContainer.textContent = `${parallaxGameState.minutes}:0${parallaxGameState.seconds}`;
    } else if (parallaxGameState.minutes >= 10 && parallaxGameState.seconds >= 10) {
      timeContainer.textContent = `${parallaxGameState.minutes}:${parallaxGameState.seconds}`;
    }
    if (parallaxGameState.seconds >= 59) {
      parallaxGameState.seconds = -1;
      parallaxGameState.minutes++;
    }
  }, 1000);
}

function getRandomEnemyInterval() {
  return Math.random() * parallaxGameState.enemyInterval + parallaxGameState.min;
}

export function getEnemyTime() {
  clearInterval(parallaxGameState.enemyTimeId);
  parallaxGameState.enemyTimeId = window.setInterval(() => {
    parallaxGameState.gameSpeed += 0.1;
    if (parallaxGameState.gameSpeed > 10 && parallaxGameState.gameSpeed <= 15) {
      parallaxGameState.enemyInterval = 1000;
      parallaxGameState.min = 100;
    } else if (parallaxGameState.gameSpeed > 15 && parallaxGameState.gameSpeed <= 25) {
      parallaxGameState.enemyInterval = 500;
      parallaxGameState.min = 50;
    } else if (parallaxGameState.gameSpeed > 25) {
      parallaxGameState.enemyInterval = 100;
      parallaxGameState.min = 50;
    }
    console.log(parallaxGameState.enemyTimeId);
  }, 500);
}

function setLocalstorage(value: string) {
  const result = { time: value };
  localStorage.setItem('zombieWalk', JSON.stringify(result));
}

function showGameOver() {
  const timeContainer = document.querySelector('.parallax-game-results-time__number') as HTMLElement;
  const time = timeContainer.textContent as string;
  const gameOverMessage = new ModalMessage();
  gameOverMessage.drawModalMessage(
    `
    <div class="title-modal-message">Game over</div>
    <div class="text-message">Time: <span class="score-number">${time}</span></div>
    `
  );
  showStartBtn();
}

export function showStartBtn() {
  const startGameBtn = document.querySelector('.start-game-btn') as HTMLElement;

  setTimeout(() => {
    startGameBtn.classList.remove('hide');
    clearGameState();
  }, 3000);
}
export function clearGameState() {
  const timeContainer = document.querySelector('.parallax-game-results-time__number') as HTMLElement;
  timeContainer.textContent = '00:00';

  parallaxGameState.parallaxSpeed = 0;
  parallaxGameState.gameSpeed = 0;
  parallaxGameState.width = 0;
  parallaxGameState.height = 0;
  parallaxGameState.seconds = 0;
  parallaxGameState.minutes = 0;
  parallaxGameState.lastTime = 0;
  parallaxGameState.enemyTimer = 0;
  parallaxGameState.enemyInterval = 0;
  parallaxGameState.min = 0;
  parallaxGameState.gameOver = false;
  parallaxGameState.parallaxArr = [];
  parallaxGameState.enemies = [];
  parallaxGameState.player = [];
  parallaxGameState.enemySpeedModif = 0;

  clearInterval(parallaxGameState.enemyTimeId);
  clearInterval(parallaxGameState.timerInterval);

  setNewCanvas();
}

export function setNewCanvas() {
  setCanvasSize();
  createBackground();
  createPlayer();
  animate(0);
}
