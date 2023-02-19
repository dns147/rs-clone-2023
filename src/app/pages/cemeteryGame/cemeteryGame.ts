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
        <img class="match-game-graves__img" src="https://i.ibb.co/yRn1DwL/home-graves-short.png" alt="graves">
      </div>

      <div class="match-game-graves2">
        <img class="match-game-graves2__img" src="https://i.ibb.co/ZzbXc78/graves.png" alt="graves">
      </div>

      <div class="match-game-graves3">
        <img class="match-game-graves3__img" src="https://i.ibb.co/ZzbXc78/graves.png" alt="graves">
      </div>

      <div class="match-game-tree">
        <img class="match-game-tree__img" src="https://i.ibb.co/DV9kL3s/tree-reversed.png" alt="tree">
      </div>

      <div class="match-game-moves">
        <img class="match-game-moves__img" src="https://i.ibb.co/1JxhhJd/lil-ghost.png" alt="tree">
        <div class="match-game-moves-container">
          <span>Moves:</span>
          <span class="match-game-moves-container__number">0</span>
        </div>
      </div>

      <div class="match-game-time">
        <img class="match-game-time__img" src="https://i.ibb.co/wRX2kr2/lil-ghost-reversed.png" alt="tree">
        <div class="match-game-time-container">
          <span>Time:</span>
          <span class="match-game-time-container__number">00:00</span>
        </div>
      </div>

    </div>`;
  }

  init(): void {
    const gameContainer = document.querySelector('.match-game') as HTMLElement;

    const cards = createElem({
      tagName: 'div',
      className: 'cards',
    });

    const heroArr = [
      {
        hero: 'mummy',
        link: 'https://i.ibb.co/RydSF8S/mummy.png',
      },
      {
        hero: 'mummy',
        link: 'https://i.ibb.co/RydSF8S/mummy.png',
      },
      {
        hero: 'skeleton',
        link: 'https://i.ibb.co/k2VY90R/skeleton.png',
      },
      {
        hero: 'skeleton',
        link: 'https://i.ibb.co/k2VY90R/skeleton.png',
      },
      {
        hero: 'scarecrow',
        link: 'https://i.ibb.co/S6X047W/scarecrow.png',
      },
      {
        hero: 'scarecrow',
        link: 'https://i.ibb.co/S6X047W/scarecrow.png',
      },
      {
        hero: 'reaper',
        link: 'https://i.ibb.co/nRZvSyL/reaper.png',
      },
      {
        hero: 'reaper',
        link: 'https://i.ibb.co/nRZvSyL/reaper.png',
      },
      {
        hero: 'monster',
        link: 'https://i.ibb.co/Tmk5gGB/monster.png',
      },
      {
        hero: 'monster',
        link: 'https://i.ibb.co/Tmk5gGB/monster.png',
      },
      {
        hero: 'dracula',
        link: 'https://i.ibb.co/0FqY8sw/dracula.png',
      },
      {
        hero: 'dracula',
        link: 'https://i.ibb.co/0FqY8sw/dracula.png',
      },
      {
        hero: 'devil',
        link: 'https://i.ibb.co/T8mBXsw/devil.png',
      },
      {
        hero: 'devil',
        link: 'https://i.ibb.co/T8mBXsw/devil.png',
      },
      {
        hero: 'ghost',
        link: 'https://i.ibb.co/bvBnbrm/ghost.png',
      },
      {
        hero: 'ghost',
        link: 'https://i.ibb.co/bvBnbrm/ghost.png',
      },
    ];

    const orderArr = createRandomArr(heroArr.length);

    for (let i = 0; i < orderArr.length; i += 1) {
      const card = `
      <div class="card" style="animation-duration: ${i / 5}s" data-hero=${heroArr[orderArr[i]].hero}>
      <div class="front">
        <div class="front-container">
          <img class="front__img1" src="https://i.ibb.co/KDN9ZFR/skull.png" alt="skull">
          <img class="front__img2" src="https://i.ibb.co/CQtfGBW/coffin.png" alt="coffin">
        </div>
      </div>
      <div class="back">
        <div class="back-container">
          <img class="back__img1" src=${heroArr[orderArr[i]].link} alt="${heroArr[orderArr[i]].hero}">
          <img class="back__img2" src="https://i.ibb.co/CQtfGBW/coffin.png" alt="coffin">
        </div>
      </div>
      </div>`;
      cards.insertAdjacentHTML('beforeend', card);
    }

    gameContainer.append(cards);
    const index = 0;
    showMoves(index);
  }
}
