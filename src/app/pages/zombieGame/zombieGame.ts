import './style-zombie-game.scss';
import ModalMessageTemplates from '../modalMessage/modalMessageTemplates';
import {
  createBackground,
  createPlayer,
  setCanvasSize,
  animate,
  timer,
  getEnemyTime,
  setInitialValues,
  soundStartGame,
  clearGameState,
} from './utils-zombie-game';

export default class Page8 {
  constructor() {}

  render(): string {
    return `<div class="parallax-game">
      <div class="parallax-game-wrapper">
        <div class="canvas-container">
          <canvas id="canvas-parallax"></canvas>
          <div class="parallax-game-results">
          <div class="parallax-game-results-time">
            <span class="parallax-game-results-time__text">Time:</span>
            <span class="parallax-game-results-time__number">00:00</span>
          </div>
        </div>
        </div>
        ${ModalMessageTemplates.startGameBtnTemplate}
      </div>
    </div>`;
  }

  init(): void {
    window.addEventListener('hashchange', clearGameState);
    window.addEventListener('resize', () => document.location.reload());
    window.addEventListener('click', this.handlerGame.bind(this));

    setCanvasSize();
    createBackground();
    createPlayer();
    animate(0);
  }

  handlerGame(event: MouseEvent) {
    const currEl = event.target;
    const shooterGameArea = document.querySelector('.parallax-game') as HTMLElement;
    const startGameBtn = shooterGameArea.querySelector('.start-game-btn') as HTMLElement;

    if (currEl === startGameBtn) {
      this.initGame();
      startGameBtn.classList.add('hide');
    }
  }

  initGame() {
    setInitialValues();
    timer();
    getEnemyTime();
    soundStartGame();
  }
}
