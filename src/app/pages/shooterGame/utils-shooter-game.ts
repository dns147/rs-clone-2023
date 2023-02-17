import ravenImg from '../../../assets/shooter-game/raven-dark-left.png';
import soundBoomSrc from '../../../assets/audio/effects/ice-boom.wav';

export class Raven {
  spriteWidth: number;
  spriteHeight: number;
  sizeModifier: number;
  width: number;
  height: number;
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  markedForDeletion: boolean;
  image: HTMLImageElement;
  frame: number;
  maxFrame: number;
  timeSinceFlap: number;
  flapInterval: number;
  randomColors: number[];
  color: string;
  hasTail: boolean;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  collisionCtx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, collisionCtx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.collisionCtx = collisionCtx;

    this.spriteWidth = 200;
    this.spriteHeight = 204;
    this.sizeModifier = Math.random() * 0.6 + 0.8; //size bird 0.8 - 1.4
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = this.canvas.width; // start fly bird from right
    this.y = Math.random() * (this.canvas.height - this.height);
    this.directionX = Math.random() * 5 + 3; //bird speedX: 3-8
    this.directionY = Math.random() * 5 - 2.5; //bird speedY down: 2.5 - -2.5
    this.markedForDeletion = false;
    this.image = new Image();
    this.image.src = ravenImg;
    this.frame = 0;
    this.maxFrame = 7;
    this.timeSinceFlap = 0;
    this.flapInterval = Math.random() * 50 + 50; //bird frame rate (50-100), the animation speed
    this.randomColors = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
    this.color = `rgb(${this.randomColors[0]}, ${this.randomColors[1]}, ${this.randomColors[2]})`;
    this.hasTail = Math.random() > 0.5;
  }
  update(deltatime: number, particles: Particle[]) {
    //keeps the birds only in the screen area at the bottom and top
    if (this.y < 0 || this.y > this.canvas.height - this.height) {
      this.directionY = this.directionY * -1;
    }
    this.x -= this.directionX;
    this.y += this.directionY;

    //flag to remove the bird from the array when it is off-screen
    if (this.x < 0 - this.width) {
      this.markedForDeletion = true;
    }

    this.timeSinceFlap += deltatime;
    if (this.timeSinceFlap > this.flapInterval) {
      this.timeSinceFlap = 0;
      if (this.frame > this.maxFrame) {
        this.frame = 0;
      } else {
        this.frame++;
        //array for bird-tails
        if (this.hasTail) {
          for (let i = 0; i < 5; i++) {
            particles.push(new Particle(this.x, this.y, this.width, this.color, this.ctx));
          }
        }
      }
    }

    //Stop Play Condition: When a bird moves outside the screen on the x-axis
    if (this.x < 0 - this.width) {
      if (this.x < 0 - this.width) localStorage.setItem('isGameOverShooterGame', '1');
    }
  }

  draw() {
    this.collisionCtx.fillStyle = this.color;
    this.collisionCtx.fillRect(this.x, this.y, this.width, this.height);

    this.ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

//boom-effect
export class Explosion {
  spriteWidth: number;
  spriteHeight: number;
  image: HTMLImageElement;
  frame: number;
  maxFrame: number;
  x: number;
  y: number;
  size: number;
  sound: HTMLAudioElement;
  timeSinceLastFrame: number;
  frameInterval: number;
  markedForDeletion: boolean;
  ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, size: number, ctx: CanvasRenderingContext2D) {
    this.spriteWidth = 100;
    this.spriteHeight = 90;
    this.image = new Image();
    this.image.src = require('../../../assets/shooter-game/boom.png');
    this.frame = 0;
    this.maxFrame = 4;
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = ctx;
    this.sound = new Audio();
    this.sound.src = soundBoomSrc;
    this.timeSinceLastFrame = 0;
    this.frameInterval = 200;
    this.markedForDeletion = false;
  }
  update(deltatime: number) {
    const isSoundEffects: boolean = JSON.parse(localStorage.getItem('isSoundEffects') || '{}');

    if (this.frame === 0 && isSoundEffects) this.sound.play();
    this.timeSinceLastFrame += deltatime;
    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame++;
      this.timeSinceLastFrame = 0;
      if (this.frame > this.maxFrame) this.markedForDeletion = true;
    }
  }
  draw() {
    this.ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y + this.size / 6,
      this.size * 0.6,
      this.size * 0.6
    );
  }
}

//birds tail-particles
export class Particle {
  size: number;
  x: number;
  y: number;
  color: string;
  ctx: CanvasRenderingContext2D;
  radius: number;
  maxRadius: number;
  markedForDeletion: boolean;
  speedX: number;

  constructor(x: number, y: number, size: number, color: string, ctx: CanvasRenderingContext2D) {
    this.size = size;
    this.x = x + this.size / 2 + Math.random() * 50 + 25;
    this.y = y + this.size / 3 + Math.random() * 50 + 25;
    this.color = color;
    this.ctx = ctx;
    this.radius = (Math.random() * this.size) / 10;
    this.maxRadius = Math.random() * 20 + 35;
    this.markedForDeletion = false;
    this.speedX = Math.random() * 1 + 0.5;
  }
  update() {
    this.x += this.speedX;
    this.radius += 0.2;
    if (this.radius > this.maxRadius - 5) this.markedForDeletion = true;
  }
  draw() {
    //methods ctx.save(); и ctx.restore(); start and and settings for local
    this.ctx.save();
    this.ctx.globalAlpha = 1 - this.radius / this.maxRadius; // makes tail circles transparent at the end
    this.ctx.beginPath();
    // ctx.fillStyle = this.color; //translucent tail
    // ctx.fillStyle = "rgba(0,0,0, 0.3)"; //black, translucent
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'; //white, translucent
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }
}
