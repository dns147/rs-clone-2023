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