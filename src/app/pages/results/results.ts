import { myDatabase } from '../../firebase';
import { ref, onValue } from "firebase/database";
import './style-results.scss';
import Music from '../../../utils/Music';
import musicChildSongSrc from '../../../assets/audio/music/strashnye-zvuki-child-song.mp3';
import { DataFromDb, DataFromDbInner, ResultGame } from '../../../spa/coreTypes';

export default class Results {
  musicResultsSrc: string;
  music: Music;

  constructor() {
    this.musicResultsSrc = musicChildSongSrc;
    this.music = new Music(this.musicResultsSrc);
  }

  render(): string {
    return `
      <div class="results-page results">
        <div class="container">
          <div class="block-info">
            <button class="btn--settings settings-btn"></button>
          </div>
          ${this.templateTableResults()}
          <div class="animation-field">
            <div class="walk-ghost"></div>
          </div>
        </div>
      </div>
    `;
  }

  templateTableResults(): string {
    return `
      <div class="result-loader"></div>
      <table class="results__table table" id="table">
        <thead class="table__head">
          <tr>
            <th>Num</th>
            <th>Name</th>
            <th>Game</th>
            <th>Score</th>
            <th>Level</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody class="table__body" id="table-body"></tbody>
      </table>
    `;
  }

  init(): void {
    this.music.playMusic();
    this.startLoader();
    this.getFromStorage();
  }

  startLoader(): void {
    const loader = <HTMLElement>document.querySelector('.result-loader');
    const loaderTxt = ["L", "o", "a", "d", "i", "n", "g", ".", ".", "."]
    const spanLoader = [];

    for (let index = 0; index < loaderTxt.length; index += 1) {
      const spani = document.createElement('span');
      spani.setAttribute('style', `--i:${index + 1}`);
      spani.innerHTML = loaderTxt[index];
      spanLoader.push(spani);
    }

    loader.append(...spanLoader);  
  }

  getFromStorage(): void {
    const that = this;
    const dataFromDb = ref(myDatabase, 'users/');

    onValue(dataFromDb, function(snapshot) {
      const resultData = snapshot.val();
      that.removeLoader();
      that.makeTable(resultData);
      that.updateNumResultItemByOrder();
    });
  }

  makeTable(resultData: DataFromDb): void {
    const tableBody = <HTMLElement>document.querySelector('.table__body');

    for (let key1 in resultData) {
      const infoPlayer: DataFromDbInner = resultData[key1];

      for (let key2 in infoPlayer) {
        const infoGamePlayer: ResultGame = infoPlayer[key2];
        const userName = infoGamePlayer.name;
        const userGame = infoGamePlayer.game;
        const userScore = infoGamePlayer.score;
        const userLevel = infoGamePlayer.level;
        const userTime = infoGamePlayer.time;

        tableBody.insertAdjacentHTML('afterbegin', `
          <tr>
            <td class="table__num-str">1</td>
            <td>${userName || '-'}</td>
            <td>${userGame || '-'}</td>
            <td>${userScore || '-'}</td>
            <td>${userLevel || '-'}</td>
            <td>${userTime || '-'}</td>
          </tr>
        `);
      }
    }
  }

  updateNumResultItemByOrder = (): void => {
    const arrNumStr = document.querySelectorAll('.table__num-str');
    arrNumStr.forEach((numStr, index) => {
      numStr.textContent = `${index + 1}`;
    });
  };

  removeLoader(): void {
    const loader = <HTMLElement>document.querySelector('.result-loader');
    loader.innerHTML = '';
  }
}
