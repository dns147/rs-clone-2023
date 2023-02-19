import './style-results.scss';
import Music from '../../../utils/Music';
import musicChildSongSrc from '../../../assets/audio/music/strashnye-zvuki-child-song.mp3';

// TODO test, заменить Денису
//!testData, удалить позже
interface IGameObj {
  id: string; // берется из localstorage, userId
  name: string; // берется из localstorage, userName
  game: string;
  score: number;
  level?: number;
  time?: number;
}

const gameObj: IGameObj = {
  id: '1',
  name: 'Denis',
  game: 'Save Pumpkin',
  score: 50,
  level: 1,
  time: 123,
};
const arrGameResultsTest: IGameObj[] = [
  {
    id: '1',
    name: 'Denis',
    game: 'Save Pumpkin',
    score: 50,
    level: 1,
    time: 123,
  },
  {
    id: '2',
    name: 'Anna',
    game: 'Ravens',
    score: 101,
    time: 0,
  },
  {
    id: '3',
    name: 'Tanya',
    game: 'Cemetery',
    score: 0,
    time: 85,
  },
];

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
          ${this.templateTableResults(arrGameResultsTest)}
          <div class="animation-field">
            <div class="walk-ghost"></div>
          </div>
        </div>
      </div>
    `;
  }

  templateTableResults(arrGameResults: IGameObj[]): string {
    // const arrGameResults: IGameObj[] = JSON.parse(localStorage.getItem('?') || '[]');
    // ${this.templateTableResultsItem(gameObj)}

    return `
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
        <tbody class="table__body" id="table-body">
              ${arrGameResults.map((gameResultItem: IGameObj) => {
                return this.templateTableResultsItem(gameResultItem);
              })}
        </tbody>
    </table>
    `;
  }

  templateTableResultsItem(gameObj: IGameObj): string {
    return `
    <tr>
      <td class="table__num-str">1</td>
      <td>
        ${gameObj.name}
      </td>
      <td>${gameObj.game || '?'}</td>
      <td>${gameObj.score || '?'}</td>
      <td>${gameObj.level || '-'}</td>
      <td>${gameObj.time || '-'}</td>
    </tr>
    `;
  }

  updateNumResultItemByOrder = (): void => {
    const arrNumStr = document.querySelectorAll('.table__num-str');
    arrNumStr.forEach((numStr, index) => {
      numStr.textContent = `${index + 1}`;
    });
  };

  init(): void {
    this.updateNumResultItemByOrder();
    this.music.playMusic();
  }
}
