import './style-page8.scss';

import { createBackground, createPlayer, setCanvas, animate, timer } from './utils-page8';

export default class Page8 {
  constructor() {}

  render(): string {
    return `<div class="parallax-game">
      <div class="parallax-game-wrapper">
        <div class="parallax-game-results">
          <div class="parallax-game-results-time">
            <span class="parallax-game-results-time__text">Time:</span>
            <span class="parallax-game-results-time__number">00:00</span>
          </div>
        </div>
        <div class="canvas-container">
          <canvas id="canvas-parallax"></canvas>
        </div>
      </div>
    </div>`;
  }

  init(): void {
    setCanvas();
    createBackground();
    createPlayer();
    animate(0);
    timer();
  }
}
