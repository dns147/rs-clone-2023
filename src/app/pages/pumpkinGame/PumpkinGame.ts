import Resources from './resources';
import './style-pumpkin-game.scss';

export default class PumpkinGame {
  constructor() {
    //this.canvas = null;
  }

  render(): string {
    (<HTMLElement>document.querySelector('.header')).style.display = 'none';
    (<HTMLElement>document.querySelector('.footer')).style.display = 'none';

    return `
      <canvas width="1920" height="1080" class="pumpkin-canvas"></canvas>
    `;
  }

  init(): void {
    const canvas = <HTMLCanvasElement>document.querySelector('.pumpkin-canvas');
    const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
    
    let images = [require('../../../assets/img/pumpkin-sprite.png')];

    // let img = new Image();
    // img.src = require('../../../assets/img/user-regular.svg');
    // // console.log(img);
    // mainCanvas.insertAdjacentHTML('beforeend', `<img src=${require('./user-solid.svg')}>`);
    // mainCanvas.append(img)

    const resources = new Resources();
    resources.load(images);
    const imgCache: (HTMLImageElement | boolean)[] = [];
    let sum = '';

    images.forEach((img) => imgCache.push(resources.get(img)));

    for (let i = 0; i < imgCache.length; i++) {
      sum += !!imgCache[i];
    }

    //--- Проверка загрузки изображений ---
    if (!sum) {
      resources.onReady(this.start);
    } else {
      this.start();
    }

    // console.log(imgCache)
  }

  start(): void {}
}
