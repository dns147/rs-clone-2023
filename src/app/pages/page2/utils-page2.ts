import { ShootingStarProps, SkyStateProps } from './types';

export class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = 0;
  }

  create(x: number, y: number) {
    const obj = Object.create(this);
    obj.x = x;
    obj.y = y;
    return obj;
  }

  getSpeed() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  }

  setSpeed(value: number) {
    const heading = this.getHeading();
    this.vx = Math.cos(heading) * value;
    this.vy = Math.sin(heading) * value;
  }

  getHeading() {
    return Math.atan2(this.vy, this.vx);
  }

  setHeading(value: number) {
    const speed = this.getSpeed();
    this.vx = Math.cos(value) * speed;
    this.vy = Math.sin(value) * speed;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }
}

const skyState: SkyStateProps = {
  width: 0,
  height: 0,
  particle: new Particle(),
  stars: [],
  shootingStars: [],
  paused: false,
};

function setCanvas() {
  const canvasElement = document.getElementById('canvas-stars') as HTMLCanvasElement;
  const ctx = canvasElement.getContext('2d') as CanvasRenderingContext2D;
  return { context: ctx, canvas: canvasElement };
}

export function setCanvasSize() {
  const canvasProps = setCanvas();
  canvasProps.canvas.width = window.innerWidth;
  canvasProps.canvas.height = window.innerHeight;
  skyState.width = canvasProps.canvas.width;
  skyState.height = canvasProps.canvas.height;
}

export function createAllStars() {
  const layers = [
    { speed: 0.0, scale: 0.2, count: 320 },
    { speed: 0.0, scale: 0.5, count: 60 },
    { speed: 0.0, scale: 0.75, count: 15 },
  ];
  layers.forEach((layer) => {
    for (let i = 0; i < layer.count; i += 1) {
      const starsAngle = 145;
      const star = skyState.particle.create(getRandomNum(0, skyState.width), getRandomNum(0, skyState.height));
      star.radius = layer.scale * 2;
      star.setSpeed(layer.speed);
      star.setHeading(degreesToRadians(starsAngle));
      skyState.stars.push(star);
    }
  });
}

export function createShootingStar() {
  const shootingStar = skyState.particle.create(
    getRandomNum(skyState.width / 2, skyState.width),
    getRandomNum(0, skyState.height / 2)
  );

  const shootingStarSpeed = { min: 15, max: 20 };
  const starsAngle = 145;

  shootingStar.setSpeed(getRandomNum(shootingStarSpeed.min, shootingStarSpeed.max));
  shootingStar.setHeading(degreesToRadians(starsAngle));
  shootingStar.radius = 3;
  shootingStar.opacity = 0;
  shootingStar.trailLengthDelta = 0;
  shootingStar.isSpawning = true;
  shootingStar.isDying = false;
  skyState.shootingStars.push(shootingStar);
}

export function animateSky() {
  const canvasProps = setCanvas();
  const context = canvasProps.context;
  if (!skyState.paused) {
    context.clearRect(0, 0, skyState.width, skyState.height);
    context.fillStyle = 'transparent';
    context.fillRect(0, 0, skyState.width, skyState.height);
    context.fill();

    skyState.stars.forEach((star) => {
      star.update();
      drawStar(star);
      if (star.x > skyState.width) {
        star.x = 0;
      }
      if (star.x < 0) {
        star.x = skyState.width;
      }
      if (star.y > skyState.height) {
        star.y = 0;
      }
      if (star.y < 0) {
        star.y = skyState.height;
      }
    });

    changeStarState();
  }

  requestAnimationFrame(animateSky);
}

function changeStarState() {
  const shootingStarOpacityDelta = 0.01;
  const trailLengthDelta = 0.01;
  skyState.shootingStars.forEach((shootingStar) => {
    if (shootingStar.isSpawning) {
      shootingStar.opacity += shootingStarOpacityDelta;
      if (shootingStar.opacity >= 1.0) {
        shootingStar.isSpawning = false;
        setTimeout(() => {
          shootingStar.isDying = true;
        }, 500);
      }
    }
    if (shootingStar.isDying) {
      shootingStar.opacity -= shootingStarOpacityDelta;
      if (shootingStar.opacity <= 0.0) {
        shootingStar.isDying = false;
        shootingStar.isDead = true;
      }
    }
    shootingStar.trailLengthDelta += trailLengthDelta;
    shootingStar.update();
    if (shootingStar.opacity > 0.0) {
      drawShootingStar(shootingStar);
    }
  });
  for (let i = skyState.shootingStars.length - 1; i >= 0; i -= 1) {
    if (skyState.shootingStars[i].isDead) {
      skyState.shootingStars.splice(i, 1);
    }
  }
}

function drawStar(star: Particle) {
  const canvasProps = setCanvas();
  const context = canvasProps.context;
  context.fillStyle = 'rgb(255, 255, 255)';
  context.beginPath();
  context.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
  context.fill();
}

function drawShootingStar(star: ShootingStarProps) {
  const canvasProps = setCanvas();
  const context = canvasProps.context;
  const x = star.x;
  const y = star.y;
  const currentTrailLength = star.trailLengthDelta * 300;
  const pos = lineToAngle(x, y, -currentTrailLength, star.getHeading());
  const starLength = getRandomInt(4, 14);

  context.fillStyle = 'rgba(255, 255, 255, ' + star.opacity + ')';
  context.beginPath();
  context.moveTo(x - 1, y + 1);
  context.lineTo(x, y + starLength);
  context.lineTo(x + 1, y + 1);
  context.lineTo(x + starLength, y);
  context.lineTo(x + 1, y - 1);
  context.lineTo(x, y + 1);
  context.lineTo(x, y - starLength);
  context.lineTo(x - 1, y - 1);
  context.lineTo(x - starLength, y);
  context.lineTo(x - 1, y + 1);
  context.lineTo(x - starLength, y);
  context.closePath();
  context.fill();

  context.fillStyle = 'rgba(255, 221, 157, ' + star.opacity + ')';
  context.beginPath();
  context.moveTo(x - 1, y - 1);
  context.lineTo(pos.x, pos.y);
  context.lineTo(x + 1, y + 1);
  context.closePath();
  context.fill();
}

function lineToAngle(x1: number, y1: number, length: number, radians: number) {
  const x2 = x1 + length * Math.cos(radians);
  const y2 = y1 + length * Math.sin(radians);
  return { x: x2, y: y2 };
}

function getRandomNum(min: number, max: number) {
  const random = Math.random() * (max - min) + min;
  return random;
}

function getRandomInt(min: number, max: number) {
  const random = Math.floor(Math.random() * (max - min) + min);
  return random;
}

function degreesToRadians(degrees: number) {
  const value = (degrees / 180) * Math.PI;
  return value;
}
