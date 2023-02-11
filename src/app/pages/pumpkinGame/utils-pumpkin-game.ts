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
