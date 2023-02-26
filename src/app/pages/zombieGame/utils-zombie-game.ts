let ctx: CanvasRenderingContext2D;
let CANVAS_WIDTH: number;
let CANVAS_HEIGHT: number;
let gameSpeed = 5;
const parallaxSpeed = 5;

let enemies: Enemy[] = [];
let gameOver = false;

let lastTime = 0;
let enemyTimer = 0;
let enemyInterval = 2000;
let min = 300;
const randomEnemyInterval = Math.random() * enemyInterval + min;

let parallaxArr: Parallax[];
let player: Player;

let interval: NodeJS.Timer;
let seconds = 0;
let minutes = 0;

let timerId = setTimeout(function tick() {
  gameSpeed += 0.1;
  if (gameSpeed > 10 && gameSpeed <= 15) {
    enemyInterval = 1000;
    min = 100;
  } else if (gameSpeed > 15 && gameSpeed <= 25) {
    enemyInterval = 500;
    min = 50;
  } else if (gameSpeed > 25) {
    enemyInterval = 100;
    min = 50;
  }
  timerId = setTimeout(tick, 500);
}, 500);

export function setCanvas(): void {
  const canvas = document.querySelector('#canvas-parallax') as HTMLCanvasElement;
  const context = canvas.getContext('2d') as CanvasRenderingContext2D;
  canvas.width = window.innerHeight * 1.6 > window.innerWidth ? window.innerWidth : window.innerHeight * 1.6;
  canvas.height = window.innerHeight;
  CANVAS_WIDTH = canvas.width;
  CANVAS_HEIGHT = canvas.height;
  ctx = context;
}

class Parallax {
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
    this.height = CANVAS_HEIGHT;
    this.width = CANVAS_HEIGHT * 1.77;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = parallaxSpeed * this.speedModifier;
  }

  update() {
    this.speed = parallaxSpeed * this.speedModifier;

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
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
  }
}

class InputHandler {
  keys: string[];

  constructor() {
    this.keys = [];
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && this.keys.indexOf(e.code) === -1) {
        this.keys.push(e.code);
      }
    });
    window.addEventListener('keyup', (e) => {
      console.log(e);
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
    this.y = this.gameHeight - this.height - this.gameHeight * 0.1;
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
        gameOver = true;
        clearTimeout(timerId);
        clearInterval(interval);
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
      this.y = this.gameHeight - this.height - this.gameHeight * 0.1;
    }

    if (this.y < -1) {
      this.y = -1;
    }
  }

  jump() {
    this.vy -= 0.6;
  }

  speedDown() {
    this.speed = 0;
  }

  onGround() {
    return this.y >= this.gameHeight - this.height - this.gameHeight * 0.1;
  }
}

export function createPlayer() {
  const hero = new Image();
  hero.src = require('../../../assets/parallax-game/witch1.png');

  hero.onload = () => {
    player = new Player(hero, hero.width, hero.height, CANVAS_WIDTH, CANVAS_HEIGHT);
    player.draw(ctx);
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
    this.speed = gameSpeed * speedModifier;
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

  parallaxArr = [parallax1, parallax2, parallax3, parallax4, parallax5, parallax6, parallax7];
}

function createEnemies(time: number) {
  const max = 8;
  const min = 1;
  const enemyNum = Math.floor(Math.random() * (max - min + min) + min);
  const enemy = new Image();
  enemy.src = require(`../../../assets/parallax-game/enemy/${enemyNum}.png`);

  if (enemyTimer > enemyInterval + randomEnemyInterval) {
    enemies.push(new Enemy(enemy, enemy.width, enemy.height, 1, CANVAS_WIDTH, CANVAS_HEIGHT));
    enemyTimer = 0;
  } else {
    enemyTimer += time;
  }

  enemies.forEach((e) => {
    e.draw(ctx);
    e.update();
  });

  enemies = enemies.filter((e) => !e.markedForDelition);
}

export function animate(timeStamp: number) {
  const time = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  parallaxArr.forEach((e) => {
    e.update();
    e.draw();
  });

  createEnemies(time);

  player?.draw(ctx);
  player?.update(input, enemies);

  if (!gameOver) {
    requestAnimationFrame(animate);
  }
}

export function timer() {
  const timeContainer = document.querySelector('.parallax-game-results-time__number') as HTMLElement;
  clearInterval(interval);
  timeContainer.textContent = '00:00';
  interval = setInterval(() => {
    seconds++;
    if (seconds < 10 && minutes < 10) {
      timeContainer.textContent = `0${minutes}:0${seconds}`;
    } else if (minutes < 10 && seconds >= 10) {
      timeContainer.textContent = `0${minutes}:${seconds}`;
    } else if (minutes >= 10 && seconds < 10) {
      timeContainer.textContent = `${minutes}:0${seconds}`;
    } else if (minutes >= 10 && seconds >= 10) {
      timeContainer.textContent = `${minutes}:${seconds}`;
    }
    if (seconds >= 59) {
      seconds = -1;
      minutes++;
    }
  }, 1000);
}
