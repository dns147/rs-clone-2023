import './style-error-page.scss';
import Music from '../../../utils/Music';
import CONST from '../../../spa/coreConst';

export default class ErrorPage {
  music: Music;
  constructor() {
    this.music = new Music(CONST.musicSomethHappenSrc);
  }

  render(): string {
    return `
    <div class="error-page">
      <div class="error-info-container">
        <img class="error-info-container__img" src=${require('../../../assets/map/location-ghost.png')} alt="ghost">
        <p class="error-info-container__text">
          <span class="error-info-container__text-1">You've lost your way...</span>
          <span class="error-info-container__text-2">404</span>
        </p>
      <div>
    </div>
    `;
  }

  init(): void {
    this.music.playMusic();
  }
}
