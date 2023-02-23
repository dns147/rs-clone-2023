import './style-choose-games.scss';
import evilLaugh from '../../../assets/audio/music/evil-laugh.mp3';
import Music from '../../../utils/Music';

export default class ChooseGames {
  musicSrc: string;
  music: Music;

  constructor() {
    this.musicSrc = evilLaugh;
    this.music = new Music(this.musicSrc);
  }

  render(): string {
    return `<div class="map">
    <div class="sky">
      <div class="clouds">
        <div class="cloud cloud-front-bottom-fast">
          <img class="cloud__img" src=${require('../../../assets/map/cloud-svg-grey.svg')} alt="cloud">
        </div>
        <div class="cloud cloud-front-bottom-slow">
          <img class="cloud__img" src=${require('../../../assets/map/cloud-svg-grey2.svg')} alt="cloud">
        </div>
        <div class="cloud cloud-front-center-slow">
          <img class="cloud__img" src=${require('../../../assets/map/cloud-svg-grey3.svg')} alt="cloud">
        </div>
        <div class="cloud cloud-front-center-fast">
          <img class="cloud__img" src=${require('../../../assets/map/cloud-svg-grey2.svg')} alt="cloud">
        </div>
        <div class="cloud cloud-front-center-very-slow">
          <img class="cloud__img" src=${require('../../../assets/map/cloud-svg-grey.svg')} alt="cloud">
        </div>
        <div class="cloud cloud-front-bottom-very-slow">
          <img class="cloud__img" src=${require('../../../assets/map/cloud-svg-grey3.svg')} alt="cloud">
        </div>
      </div>
      <div class="map-moon">
        <div class="map-moon-spots">
          <span class="spot map-moon-spots__one"></span>
          <span class="spot map-moon-spots__two"></span>
          <span class="spot map-moon-spots__three"></span>
          <span class="spot map-moon-spots__four"></span>
          <span class="spot map-moon-spots__five"></span>
          <span class="spot map-moon-spots__six"></span>
          <span class="spot map-moon-spots__seven"></span>
          <span class="spot map-moon-spots__eigth"></span>
        </div>
      </div>
    </div>
    <div class="map-caslte">
      <img class="map-castle__img" src=${require('../../../assets/map/map-castle.png')} alt="castle">
      <div id="location-ghost-one" class="location-ghost">
        <img class="location-ghost__img" src=${require('../../../assets/map/location-ghost.png')} alt="ghost">
        <div class="location-ghost__link-container">
          <a class="location-ghost__link" href="#/cemeteryGame">
            <div class="location-ghost__link-img-container location-ghost__link-img-container_opened">
              <img class="location-ghost__link-img" src=${require('../../../assets/map/skull3.png')} alt="skull">
            </div>
          </a>
        </div>
      </div>
      <div id="location-ghost-two" class="location-ghost">
        <img class="location-ghost__img" src=${require('../../../assets/map/location-ghost.png')} alt="ghost">
        <div class="location-ghost__link-container">
          <a class="location-ghost__link" href="#/shooterGame">
            <div class="location-ghost__link-img-container">
              <img class="location-ghost__link-img" src=${require('../../../assets/map/raven.png')} alt="raven">
            </div>
          </a>
        </div>
      </div>
      <div id="location-ghost-three" class="location-ghost">
        <img class="location-ghost__img" src=${require('../../../assets/map/location-ghost-reversed.png')} alt="ghost">
        <div class="location-ghost__link-container">
          <a class="location-ghost__link" href="#/zombieGame">
            <div class="location-ghost__link-img-container">
              <img class="location-ghost__link-img" src="" alt="???">
            </div>
          </a>
        </div>
      </div>
      <div id="location-ghost-four" class="location-ghost">
        <img class="location-ghost__img" src=${require('../../../assets/map/location-ghost.png')} alt="ghost">
        <div class="location-ghost__link-container">
          <a class="location-ghost__link" href="#/pumpkinGame">
            <div class="location-ghost__link-img-container">
              <img class="location-ghost__link-img" src=${require('../../../assets/map/pumpkin.png')} alt="pumpkin">
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="ground"></div>
    <div class="hero">
      <img class="hero__img" src=${require('../../../assets/map/death2.png')} alt="hero">
    </div>
    <div class="mountain">
      <img class="mountain__img" src=${require('../../../assets/map/mountain2.png')} alt="mountain">
    </div>
    <div class="graves">
      <img class="graves__img" src=${require('../../../assets/map/graves.png')} alt="graves">
    </div>
    <div class="forest">
      <img class="forest__img" src=${require('../../../assets/map/forest.png')} alt="forest">
    </div>
  </div>`;
  }

  init(): void {
    window.setTimeout(() => {
      this.music.playMusic();
    }, 2000);
  }
}
