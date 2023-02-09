//--- Вспомогательный класс, который содержит логику анимации ---
// pos - x и y координаты изображения на спрайт карте
// size - размеры (только одного кадра)
// speed - скорость анимации в фрейм/с
// frames - массив индексов фреймов в порядке анимации
// dir - в каком направлении двигаться по спрайт карте: horizontal (по-умолчанию) или vertical
// once:true, если необходимо отобразить только один цикл анимации, false — по-умолчанию
// rad - поворот спрайта ---

export default class Sprite {
  img: HTMLImageElement;
  pos: number[];
  size: number[];
  speed: number;
  frames: number[];
  dir: string | null;
  once: boolean;
  rad: number;
  _index: number;

  constructor(img: HTMLImageElement, pos: number[], size: number[], speed: number, frames: number[], dir: string | null, once: boolean, rad: number) {
    this.img = img;
    this.pos = pos;
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this.dir = dir || 'horizontal';
    this.once = once;
    this.rad = rad;
    this._index = 0;
  }

  update(dt: number): void {
    this._index += this.speed * dt;
  }

  render(ctx: CanvasRenderingContext2D | null) {
    let frame = null;

    if (this.speed > 0) {
      let max = this.frames.length;
      let idx = Math.floor(this._index);
      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        return;
      }
    } else {
      frame = 0;
    }

    let x = this.pos[0];
    let y = this.pos[1];

    if (this.dir === 'vertical') {
      y += frame * this.size[1];
    } else {
      x += frame * this.size[0];
    }

    ctx?.rotate(this.rad);
    ctx?.drawImage(this.img,
      x, y,
      this.size[0], this.size[1],
      -this.size[0]/2, -this.size[1]/2,
      this.size[0], this.size[1]);

    ctx?.resetTransform();
  }
}
