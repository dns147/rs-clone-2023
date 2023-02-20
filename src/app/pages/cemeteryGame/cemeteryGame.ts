import './style-cemetery-game.scss';
import { showMoves, createElem, createRandomArr } from './utils-cemetery-game';

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
          <span>Moves:</span>
          <span class="match-game-moves-container__number">0</span>
        </div>
      </div>

      <div class="match-game-time">
        <img class="match-game-time__img" src=${require('../../../assets/match-game/lil-ghost-reversed.png')} alt="ghost">
        <div class="match-game-time-container">
          <span>Time:</span>
          <span class="match-game-time-container__number">00:00</span>
        </div>
      </div>

    </div>`;
  }

  showCards(): void {
    const gameContainer = document.querySelector('.match-game') as HTMLElement;

    const cards = createElem({
      tagName: 'div',
      className: 'cards',
    });

    const heroArr = [
      {
        hero: 'mummy',
        link: require('../../../assets/match-game/mummy.png'),
      },
      {
        hero: 'mummy',
        link: require('../../../assets/match-game/mummy.png'),
      },
      {
        hero: 'skeleton',
        link: require('../../../assets/match-game/skeleton.png'),
      },
      {
        hero: 'skeleton',
        link: require('../../../assets/match-game/skeleton.png'),
      },
      {
        hero: 'scarecrow',
        link: require('../../../assets/match-game/scarecrow.png'),
      },
      {
        hero: 'scarecrow',
        link: require('../../../assets/match-game/scarecrow.png'),
      },
      {
        hero: 'reaper',
        link: require('../../../assets/match-game/reaper.png'),
      },
      {
        hero: 'reaper',
        link: require('../../../assets/match-game/reaper.png'),
      },
      {
        hero: 'monster',
        link: require('../../../assets/match-game/monster.png'),
      },
      {
        hero: 'monster',
        link: require('../../../assets/match-game/monster.png'),
      },
      {
        hero: 'dracula',
        link: require('../../../assets/match-game/dracula.png'),
      },
      {
        hero: 'dracula',
        link: require('../../../assets/match-game/dracula.png'),
      },
      {
        hero: 'devil',
        link: require('../../../assets/match-game/devil.png'),
      },
      {
        hero: 'devil',
        link: require('../../../assets/match-game/devil.png'),
      },
      {
        hero: 'ghost',
        link: require('../../../assets/match-game/ghost.png'),
      },
      {
        hero: 'ghost',
        link: require('../../../assets/match-game/ghost.png'),
      },
    ];

    const orderArr = createRandomArr(heroArr.length);

    for (let i = 0; i < orderArr.length; i += 1) {
      const card = `
      <div class="card" data-hero=${heroArr[orderArr[i]].hero}>
      <div class="front">
        <div class="front-container">
          <img class="front__img1" src=${require('../../../assets/match-game/skull.png')} alt="skull">
          <img class="front__img2" src=${require('../../../assets/match-game/coffin.png')} alt="coffin">
        </div>
      </div>
      <div class="back">
        <div class="back-container">
          <img class="back__img1" src=${heroArr[orderArr[i]].link} alt="${heroArr[orderArr[i]].hero}">
          <img class="back__img2" src=${require('../../../assets/match-game/coffin.png')} alt="coffin">
        </div>
      </div>
      </div>`;
      cards.insertAdjacentHTML('beforeend', card);
    }
    gameContainer.append(cards);
  }

  init(): void {
    this.showCards();

    const index = 0;
    showMoves(index);
  }
}
