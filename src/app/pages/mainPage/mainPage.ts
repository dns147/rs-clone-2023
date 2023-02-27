import './style-main-page.scss';
import CONST from '../../../spa/coreConst';
import Music from '../../../utils/Music';

export default class MainPage {
  music: Music;

  constructor() {
    this.music = new Music(CONST.musicMagicMetamorphoseSrc);
  }

  render(): string {
    return `<div class="home">

      <div class="home-sky">
        <div class="home-sky-wrapper">

            <div class="home-sky-witch-left">
              <img class="home-sky-witch-left__img" src=${CONST.witch1Img} alt="witch">
            </div>

            <div class="home-sky-witch-right">
              <img class="home-sky-witch-right__img" src=${CONST.witch2Img} alt="witch">
            </div>

            <div class="home-moon">
              <div class="spots">
                <span class="spot spots__one"></span>
                <span class="spot spots__two"></span>
                <span class="spot spots__three"></span>
                <span class="spot spots__four"></span>
                <span class="spot spots__five"></span>
                <span class="spot spots__six"></span>
                <span class="spot spots__seven"></span>
                <span class="spot spots__eigth"></span>
              </div>
              <div class="planet__shadow"></div>
            </div>

        </div>
      </div>

      <div class="home-castle-ground">
        <div class="home-castle-ground-wrapper">
          <div class="home-castle">
            <img class="home-castle__img" src=${CONST.castleImg} alt="castle">
          </div>
          <div class="home-ground"></div>
          <div class="home-hero">
            <img class="home-hero__img" src=${CONST.grimReaperImg} alt="hero">
          </div>
        </div>
      </div>

      <div class="ground-front">
        <div class="ground-front-wrapper">
          <div class="home-graves">
            <img class="home-graves__img" src=${CONST.gravesShortImg} alt="graves">
          </div>
          <div class="home-tree-right">
            <img class="home-tree-right__img" src="${CONST.treeImg}" alt="tree">
          </div>
        </div>
      </div>

      <div class="home-ground-front"></div>

      <div class="home-navigation">
        <h1 class="home-heading">
          <span>Spooky</span>
          <span>adventure</span>
        </h1>

        <div class="home-buttons-container">
          <a class="home-button btn btn--big accent-font accent-font--upper" href="#/chooseGames">
            <span class="home-button__icon">
              <div class="home-button__animation-1"></div>
              <div class="home-button__animation-2"></div>
            </span>
            <span class="home-button__text">games</span>  
            <span class="home-button__icon">
              <div class="home-button__animation-1"></div>
              <div class="home-button__animation-2"></div>
            </span>
          </a>
          <a class="home-button btn btn--big accent-font accent-font--upper" href="#/about">
            <span class="home-button__icon">
              <div class="home-button__animation-1"></div>
              <div class="home-button__animation-2"></div>
            </span>
            <span class="home-button__text">about</span>
            <span class="home-button__icon">
              <div class="home-button__animation-1"></div>
              <div class="home-button__animation-2"></div>
            </span>
          </a>
          <a class="home-button btn btn--big accent-font accent-font--upper" href="#/results">
            <span class="home-button__icon">
              <div class="home-button__animation-1"></div>
              <div class="home-button__animation-2"></div>
            </span>
            <span class="home-button__text">results</span>
            <span class="home-button__icon">
              <div class="home-button__animation-1"></div>
              <div class="home-button__animation-2"></div>
            </span>
          </a>

        </div>

      </div>

    </div>`;
  }

  init(): void {
    this.music.playMusic();
  }
}
