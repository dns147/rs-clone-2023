import { Angle } from "./types-pumpkin-game";

export function getAngle(x: number, y: number, posCenterX: number, posCenterY: number): Angle {
  const mouseX: number = x - posCenterX;
  const mouseY: number = y - posCenterY;
  const angleRad: number = Math.atan2(mouseX, mouseY);
  const angleGrad: number = angleRad * (180 / Math.PI);

  return {
    rad: angleRad,
    grad: angleGrad,
  };
}

export function getImage(images: HTMLImageElement[], url: string): HTMLImageElement {
  const resultImgs: HTMLImageElement[] = images.filter((img: HTMLImageElement) => img.src === url);
  return resultImgs[0];
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function getFactor(angleGrad: number, angleRad: number): {factorX: number, factorY: number} {
  let factorX: number = 0;
  let factorY: number = 0;

  if (angleGrad < -150 && angleGrad >= -180) {
    factorX = Math.sin(angleRad) * 1.5;
    factorY = 2;
  }

  if (angleGrad < -112 && angleGrad >= -150) {
    factorX = Math.sin(angleRad);
    factorY = 2;
  }

  if (angleGrad < -90 && angleGrad >= -112) {
    factorX = 1;
    factorY = 1;
  }

  if (angleGrad < -60 && angleGrad >= -90) {
    factorX = 0;
    factorY = 0;
  }

  if (angleGrad < 0 && angleGrad >= -60) {
    factorX = 0;
    factorY = 0;
  }

  if (angleGrad > 0 && angleGrad <= 62) {
    factorX = Math.sin(angleRad);
    factorY = Math.sin(angleRad);
  }

  if (angleGrad > 62 && angleGrad <= 90) {
    factorX = 0;
    factorY = Math.cos(angleRad);
  }

  if (angleGrad > 90 && angleGrad <= 112) {
    factorX = 1;
    factorY = Math.sin(angleRad);
  }

  if (angleGrad > 112 && angleGrad <= 165) {
    factorX = 1;
    factorY = Math.sin(angleRad) * 2;
  }

  if (angleGrad > 165 && angleGrad <= 180) {
    factorX = 0.5;
    factorY = 0.5;
  }

  return {
    factorX: factorX, 
    factorY: factorY
  };
}

//--- boxCollides — это обертка для collides, принимающая массивы 
// с положением и размером каждого элемента ---
export function boxCollides(pos1: number[], size1: number[], pos2: number[], size2: number[]) {
  return collides(pos1[0], pos1[1],
                        pos1[0] + size1[0], pos1[1] + size1[1],
                        pos2[0], pos2[1],
                        pos2[0] + size2[0], pos2[1] + size2[1]);
}

//--- collides принимает координаты верхнего/левого и нижнего/правого 
// углов обоих объектов и проверяет, есть ли какие-то пересечения ---
export function collides(x: number, y: number, r: number, b: number, x2: number, y2: number, r2: number, b2: number) {
  return !(r <= x2 || x > r2 || b <= y2 || y > b2);
}

export const normalize = (num: number): string => ((num < 10) ? '0' : '') + num;

export function playAudio(audio: HTMLAudioElement, volume?: number, attribute?: string): void {
  audio.play();

  if (volume) {
    audio.volume = volume;
  }
  
  if (attribute) {
    audio.setAttribute(attribute, attribute);
  }
}

export function stopAudio(audio: HTMLAudioElement): void {
  audio.pause();
  audio.currentTime = 0;
}