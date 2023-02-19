import { createElem } from '../../../utils/createElem';
import './style-main-page.scss';
import CONSTS from '../../../spa/coreConst';
import { changeSignInButton } from '../authForm/utils-auth-form';

export default class MainPage {
  constructor() {}

  render(): string {
    const signInButtonStatus: string = localStorage['userName'] ? 'sign out' : 'sign in';

    return `<div class="home">

      <div class="home-sky">
        <div class="home-sky-wrapper">

            <div class="home-sky-witch-left">
              <img class="home-sky-witch-left__img" src="https://i.ibb.co/Msr3BS9/witch1.png" alt="witch">
            </div>

            <div class="home-sky-witch-right">
              <img class="home-sky-witch-right__img" src="https://i.ibb.co/CJp3gvJ/witch2-reversed.png" alt="witch">
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
            <img class="home-castle__img" src="https://i.ibb.co/64fJKvP/castle-main.png" alt="castle">
          </div>
          <div class="home-ground"></div>
          <div class="home-hero">
            <img class="home-hero__img" src="https://i.ibb.co/2yQB1DT/grim-reaper.png" alt="hero">
          </div>
        </div>
      </div>

      <div class="ground-front">
        <div class="ground-front-wrapper">
          <div class="home-graves">
            <img class="home-graves__img" src="https://i.ibb.co/yRn1DwL/home-graves-short.png" alt="graves">
          </div>
          <div class="home-tree-right">
            <img class="home-tree-right__img" src="https://i.ibb.co/6Rtqj5c/tree1.png" alt="tree">
          </div>
        </div>
      </div>

      <div class="home-ground-front"></div>

      <div class="home-navigation">
        <h1 class="home-heading">
          <span>spooky</span>
          <span>adveture</span>
        </h1>
        <div class="home-buttons-container">
          <a class="home-button" href="##">
            <span class="home-button__icon">
              <div class="home-button__animation-1"></div>
              <div class="home-button__animation-2"></div>
            </span>
            <span class="home-button__text">play</span>
          </a>
          <button class="home-button user-sign-in">
            <span class="home-button__icon">
              <div class="home-button__animation-1"></div>
              <div class="home-button__animation-2"></div>
            </span>
            <span class="home-button__text user-sign-in-text">${signInButtonStatus}</span>
          </button>
          <a class="home-button" href="##">
            <span class="home-button__icon">
              <div class="home-button__animation-1"></div>
              <div class="home-button__animation-2"></div>
            </span>
            <span class="home-button__text">settings</span>
          </a>
          <a class="home-button" href="##">
            <span class="home-button__icon">
              <div class="home-button__animation-1"></div>
              <div class="home-button__animation-2"></div>
            </span>
            <span class="home-button__text">about</span>
          </a>
        </div>
       
      </div>

    </div>`;
  }

  init(): void {
    const mainUser = createElem('div', 'main-user', '.main');
    mainUser.innerHTML = CONSTS.userTemplate;

    const userName: string = localStorage['userName'] ? JSON.parse(localStorage['userName']) : '';
    const userNameTag = <HTMLSpanElement>document.querySelector('.main-user-name');
    userNameTag.textContent = userName;

    if (localStorage['userName']) {
      changeSignInButton(true);
    }
  }
}
