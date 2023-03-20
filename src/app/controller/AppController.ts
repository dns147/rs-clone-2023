import AppModel from '../model/appModel';
import CONST from '../../spa/coreConst';
import Modal from '../pages/modal/modal';
import ModalTemplates from '../pages/modal/modalTemplates';
import { togglePlayMusic } from '../utils-component';

export default class AppController {
  model: AppModel;
  container: HTMLElement;

  constructor(model: AppModel, container: HTMLElement) {
    this.model = model;
    this.container = container;

    this.getEventsClick = this.getEventsClick.bind(this);
    this.getEventsInput = this.getEventsInput.bind(this);
    this.getEventsMouse = this.getEventsMouse.bind(this);
    this.setKeyUp = this.setKeyUp.bind(this);
    this.showGamePumpkinInfo = this.showGamePumpkinInfo.bind(this);

    document.addEventListener('click', this.getEventsClick);
    document.addEventListener('input', this.getEventsInput);
    document.addEventListener('mousemove', this.getEventsMouse);
    document.addEventListener('keyup', this.setKeyUp);
    window.addEventListener('hashchange', this.showGamePumpkinInfo);
  }

  getEventsClick(event: Event): void {
    if (event.target instanceof Element) {
      const btnAuthorization = <HTMLElement>event.target.closest('.authorization-btn');
      const regLink = <HTMLElement>event.target.closest('.reg-link');
      const loginLink = <HTMLElement>event.target.closest('.login-link');
      const btnRegistration = <HTMLElement>event.target.closest('.registration-btn');
      const closeRegistrationForm = <HTMLElement>event.target.closest('.close-registration-form');
      const playGamePumpkin = <HTMLElement>event.target.closest('.pumpkin-play');
      const exitGamePumpkin = <HTMLElement>event.target.closest('.pumpkin-exit');
      const pumpkinShellsIcon = <HTMLElement>event.target.closest('.pumpkin-shells-icon');
      const pumpkinElectroIcon = <HTMLElement>event.target.closest('.pumpkin-electro-icon');
      const pumpkinBombIcon = <HTMLElement>event.target.closest('.pumpkin-bomb-icon');
      const pumpkinFreezingIcon = <HTMLElement>event.target.closest('.pumpkin-freezing-icon');
      const pumpkinCanvas = <HTMLElement>event.target.closest('.pumpkin-canvas');
      const shooterGameCanvas = <HTMLElement>event.target.closest('.shooter-game');
      const card = <HTMLElement>event.target.closest('.card');
      const userSignIn = <HTMLElement>event.target.closest('.user-sign-in');

      //  ==== nav-block, settings ====
      const musicGameBtn = <HTMLElement>event.target.closest('.music-btn');
      const soundEffectsBtn = <HTMLElement>event.target.closest('.sound-btn');
      const settingsBtn = <HTMLElement>event.target.closest('.settings-btn');
      const homeBtn = <HTMLElement>event.target.closest('.home-btn');
      const authFormBtn = <HTMLElement>event.target.closest('.main-user');
      
      const isSoundEffects: boolean = JSON.parse(localStorage.getItem('isSoundEffects') || '{}');
      const isMusic: boolean = JSON.parse(localStorage.getItem('isMusic') || '{}');

      if (homeBtn) {
        const soundHome = new Audio(CONST.soundDoorScripSrc);
        soundHome.volume = 0.3;
        if (isSoundEffects) soundHome.play();
      }

      if (authFormBtn) {
        const soundBooGhost = new Audio(CONST.soundBooSrc);
        soundBooGhost.volume = 0.3;
        if (isSoundEffects) soundBooGhost.play();
      }

      if (settingsBtn) {
        const soundSettings = new Audio(CONST.soundSettingsSrc);
        if (isSoundEffects) soundSettings.play();

        const modalSettings = new Modal();
        modalSettings.drawModal(ModalTemplates.modalTemplateSettings);

        const soundEffectsBtn = <HTMLElement>document.querySelector('.sound-btn');
        const musicGameBtn = <HTMLElement>document.querySelector('.music-btn');

        if (!isSoundEffects) {
          soundEffectsBtn.classList.add('off');
        }

        if (!isMusic) {
          musicGameBtn.classList.add('off');
        }
      }

      if (musicGameBtn) {
        togglePlayMusic();

        if (isMusic) {
          localStorage.setItem('isMusic', JSON.stringify(false));
          musicGameBtn.classList.add('off');
        } else {
          localStorage.setItem('isMusic', JSON.stringify(true));
          musicGameBtn.classList.remove('off');
        }
      }

      if (soundEffectsBtn) {
        soundEffectsBtn.classList.add('off');

        if (isSoundEffects) {
          localStorage.setItem('isSoundEffects', JSON.stringify(false));
          soundEffectsBtn.classList.add('off');
        } else {
          localStorage.setItem('isSoundEffects', JSON.stringify(true));
          soundEffectsBtn.classList.remove('off');
        }
      }

      //  ==== /settings ====
      if (card) {
        this.model.cardGame(card);
      }

      if (userSignIn) {
        if (userSignIn.classList.contains('signin-active')) {
          this.model.userSignOut();
        } else {
          this.model.goToLoginContainer();
        }
      }

      if (btnAuthorization) {
        this.model.authorization();
      }

      if (regLink) {
        this.model.goToRegistrationMode();
      }

      if (loginLink) {
        this.model.goToLoginMode();
      }

      if (btnRegistration) {
        this.model.registration();
      }

      if (closeRegistrationForm) {
        this.model.closeRegistrationForm();
      }

      if (pumpkinCanvas) {
        this.model.shootPumpkin();
      }

      if (
        playGamePumpkin ||
        exitGamePumpkin ||
        pumpkinShellsIcon ||
        pumpkinElectroIcon ||
        pumpkinBombIcon ||
        pumpkinFreezingIcon
      ) {
        this.model.playSoundClick(event.target, pumpkinShellsIcon, pumpkinElectroIcon);
      }

      if (shooterGameCanvas) {
        this.model.shooterGameSettings();
      }
    }
  }

  getEventsInput(event: Event): void {
    if (event.target instanceof Element) {
      const emailInput = <HTMLInputElement>event.target.closest('#email');
      const passwordInput = <HTMLInputElement>event.target.closest('#password');

      if (emailInput) {
        this.model.validateEmail(emailInput);
      }

      if (passwordInput) {
        this.model.validatePassword(passwordInput);
      }
    }
  }

  getEventsMouse(event: MouseEvent): void {
    if (event.target instanceof Element) {
      const pumpkinCanvasArea = <HTMLCanvasElement>event.target.closest('.pumpkin-canvas');

      if (pumpkinCanvasArea) {
        this.model.rotatePlayer(event);
      }
    }
  }

  setKeyUp(event: KeyboardEvent): void {
    this.model.setKeyUp(event);
  }

  showGamePumpkinInfo(): void {
    this.model.showGamePumpkinInfo();
  }
}
