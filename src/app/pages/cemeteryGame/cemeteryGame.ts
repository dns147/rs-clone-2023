import './style-cemetery-game.scss';
import { createRandomArr, clearCards, matchSoundEffect } from './utils-cemetery-game';
import { HeroParams } from './types-cemetery-game';
import { heroArr1, heroArr2 } from './consts';
import ModalMessageTemplates from '../modalMessage/modalMessageTemplates';

export default class Page7 {
  constructor() {}

  render(): string {
    return `<div class="match-game">

      <div class="match-game-sky">
        <div class="match-game-moon">
          <div class="match-game-moon-spots">
            <span class="spot match-game-moon-spots__one"></span>
            <span class="spot match-game-moon-spots__two"></span>
            <span class="spot match-game-moon-spots__three"></span>
            <span class="spot match-game-moon-spots__four"></span>
            <span class="spot match-game-moon-spots__five"></span>
            <span class="spot match-game-moon-spots__six"></span>
            <span class="spot match-game-moon-spots__seven"></span>
            <span class="spot match-game-moon-spots__eigth"></span>
          </div>
          <div class="planet__shadow"></div>
        </div>

      </div>
      <div class="match-game-graves">
        <img class="match-game-graves__img" src=${require('../../../assets/match-game/home-graves-short.png')} alt="graves">
      </div>

      <div class="match-game-graves2">
        <img class="match-game-graves2__img" src=${require('../../../assets/match-game/graves.png')} alt="graves">
      </div>

      <div class="match-game-graves3">
        <img class="match-game-graves3__img" src=${require('../../../assets/match-game/graves.png')} alt="graves">
      </div>

      <div class="match-game-tree">
        <img class="match-game-tree__img" src=${require('../../../assets/match-game/tree-reversed.png')} alt="tree">
      </div>

      <div class="match-game-moves">
        <img class="match-game-moves__img" src=${require('../../../assets/match-game/lil-ghost.png')} alt="ghost">
        <div class="match-game-moves-container">
          <p>
            <span>Moves:</span>
            <span class="match-game-moves-container__number">0</span>
          </p>
          <p>
            <span>Level:</span>
            <span class="match-game-moves-container__number-level">1</span>
          </p>
        </div>
       
      </div>

      <div class="match-game-time">
        <img class="match-game-time__img" src=${require('../../../assets/match-game/lil-ghost-reversed.png')} alt="ghost">
        <div class="match-game-time-container">
          <span>Time:</span>
          <span class="match-game-time-container__number">00:00</span>
        </div>
      </div>

      ${ModalMessageTemplates.startGameBtnTemplate}
      <div class="cards"></div>

    </div>`;
  }

  showLevel1(): void {
    const cards = document.querySelector('.cards') as HTMLElement;
    cards.classList.remove('match-level2');

    clearCards();

    const orderArr = createRandomArr(heroArr1.length);

    this.createCards(cards, heroArr1, orderArr);
  }

  showLevel2() {
    const orderArr = createRandomArr(heroArr2.length);

    const cards = document.querySelector('.cards') as HTMLElement;
    clearCards();
    cards.classList.add('match-level2');

    this.createCards(cards, heroArr2, orderArr);
  }

  createCards(cardsContainer: HTMLElement, heroList: HeroParams[], order: number[]) {
    for (let i = 0; i < order.length; i += 1) {
      const card = `
      <div class="card" data-hero=${heroList[order[i]].hero}>
      <div class="front">
        <div class="front-container">
          <img class="front__img1" src=${require('../../../assets/match-game/skull.png')} alt="skull">
          <img class="front__img2" src=${require('../../../assets/match-game/coffin.png')} alt="coffin">
        </div>
      </div>
      <div class="back">
        <div class="back-container">
          <img class="back__img1" src=${heroList[order[i]].link} alt="${heroList[order[i]].hero}">
          <img class="back__img2" src=${require('../../../assets/match-game/coffin.png')} alt="coffin">
        </div>
      </div>
      </div>`;
      cardsContainer.insertAdjacentHTML('beforeend', card);
    }
  }

  handlerGame(event: MouseEvent) {
    const currEl = event.target;
    const shooterGameArea = document.querySelector('.match-game') as HTMLElement;
    const startGameBtn = shooterGameArea.querySelector('.start-game-btn') as HTMLElement;

    if (currEl === startGameBtn) {
      this.initGame();
      startGameBtn.classList.add('hide');
      matchSoundEffect();
    }
  }

  initGame() {
    this.showLevel1();
  }

  init(): void {
    window.addEventListener('click', this.handlerGame.bind(this));
  }
}
