import './style-aboutGame.scss';
import { setCanvasSize, createAllStars, animateSky, createShootingStar } from './utils-aboutGame';
import Music from '../../../utils/Music';
import musicChildSongSrc from '../../../assets/audio/music/strashnye-zvuki-child-song.mp3';

export default class AboutGame {
  musicResultsSrc: string;
  music: Music;

  constructor() {
    this.musicResultsSrc = musicChildSongSrc;
    this.music = new Music(this.musicResultsSrc);
  }

  render(): string {
    return `
    <div class="about-game">
      <div class="canvas-stars-container">
        <canvas id="canvas-stars"></canvas>
      </div>
      <div class="about-game-content">
        <div class="games-info">
          <div class="game-info-container">
            <div class="game-info-heading">
              <div class="game-icon-container">
                <img class="game-icon-container__img" src=${require('../../../assets/map/skull3.png')} alt="skull">
              </div>
              <h2 class="game-heading">Cemetery</h2>
            </div>
            <div class="game-info-description">
              <p>Open coffins and find matches. Have some fun before real challenges!</p>
              <p>Levels: 2.</p>
              <p>Controls: click...if you dare.</p>
            </div>
          </div>
          <div class="game-info-container">
            <div class="game-info-heading">
              <div class="game-icon-container">
                <img class="game-icon-container__img" src=${require('../../../assets/map/raven.png')} alt="raven">
              </div>
              <h2 class="game-heading">Ravens hunting</h2>
            </div>
            <div class="game-info-description">
              <p>Kill as many ravens as you can.</p>
              <p>Levels: 1.</p>
              <p>Controls: click...if you dare.</p>
           </div>
          </div>
          <div class="game-info-container">
            <div class="game-info-heading">
              <div class="game-icon-container">
                <img class="game-icon-container__img" src="${require('../../../assets/parallax-game/witch1.png')}" alt="witch">
              </div>
              <h2 class="game-heading">Zombie walk</h2>
            </div>
            <div class="game-info-description">
              <p>Help the witch to fly over zombies.</p>
              <p>Levels: 1.</p>
              <p>Controls: Press space or just touch.</p>
            </div>
          </div>
          <div class="game-info-container">
            <div class="game-info-heading">
            <div class="game-icon-container">
              <img class="game-icon-container__img" src=${require('../../../assets/map/pumpkin.png')} alt="pumpkin">
            </div>
            <h2 class="game-heading">Save pumpkin</h2>
          </div>
          <div class="game-info-description">
            <p>Save the pumpkin from Halloween Monsters.</p>
            <p>Levels: 4.</p>
            <p>Controls: Click and press keys 1-4.</p>
          </div>
        </div>
        </div>
        <div class="creators-info">
          <div class="creator">
            <h3 class="creator-name">Denis</h3>
            <ul class="duties-list">
              <li class="duties-list__item">team lead</li>
              <li class="duties-list__item">autorization</li>
              <li class="duties-list__item">save pumpkin</li>
            </ul>
            <a class="github-link" href="https://github.com/dns147" target="_blank">
              <div class="github-link__container">
                <img class="github-link__img" src=${require('../../../assets/img/github-logo.png')} alt="github">
              </div>
            </a>
          </div>
          <div class="creator">
            <h3 class="creator-name">Tatiana</h3>
            <ul class="duties-list">
              <li class="duties-list__item">main design</li>
              <li class="duties-list__item">cemetery</li>
              <li class="duties-list__item">zombie walk</li>
            </ul>
            <a class="github-link" href="https://github.com/Tatiana-Shylovich" target="_blank">
              <div class="github-link__container">
                <img class="github-link__img" src=${require('../../../assets/img/github-logo.png')} alt="github">
              </div>
            </a>
          </div>
          <div class="creator">
            <h3 class="creator-name">Anna</h3>
            <ul class="duties-list">
              <li class="duties-list__item">sound effects</li>
              <li class="duties-list__item">results</li>
              <li class="duties-list__item">ravens hunting</li>
            </ul>
            <a class="github-link" href="https://github.com/avshir" target="_blank">
              <div class="github-link__container">
                <img class="github-link__img" src=${require('../../../assets/img/github-logo.png')} alt="github">
              </div>
            </a>
          </div>
        </div>
        <div class="project-info">
          <a class="project-info-rss-link" href="https://rs.school/js" target="_blank">
            <div class="project-info-rss-link__container">
              <img class="project-info-rss-link__img" src=${require('../../../assets/img/rss.svg')} alt="rsschool">
            </div>
          </a>
          <p class="project-info-text">2023</p>
        </div>
      </div>
    </div>
    `;
  }

  init(): void {
    window.addEventListener('resize', () => document.location.reload());
    setCanvasSize();
    createAllStars();
    animateSky();
    window.setInterval(() => {
      createShootingStar();
    }, 1500);

    this.music.playMusic();
  }
}
