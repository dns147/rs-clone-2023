import AppModel from '../model/appModel';
import CONST from '../../spa/coreConst';
import Modal from '../pages/modal/modal';
import ModalTemplates from '../pages/modal/modalTemplates';

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

    document.addEventListener('click', this.getEventsClick);
    document.addEventListener('input', this.getEventsInput);
    document.addEventListener('mousemove', this.getEventsMouse);
    document.addEventListener('keyup', this.setKeyUp);
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
      const settingsBtn = document.querySelector('.settings-btn') as HTMLElement;
      const homeBtn = document.querySelector('.home-btn') as HTMLElement;
      const authFormBtn = document.querySelector('.main-user') as HTMLElement;
      const musicGameBtn = document.querySelector('.settings .music-btn') as HTMLElement;
      const soundEffectsBtn = document.querySelector('.settings .sound-btn') as HTMLElement;
      const isSoundEffects: boolean = JSON.parse(localStorage.getItem('isSoundEffects') || '{}');

      const currEl = event.target;

      if (currEl === homeBtn) {
        const soundHome = new Audio(CONST.soundDoorScripSrc);
        soundHome.volume = 0.3;
        if (isSoundEffects) soundHome.play();
      }

      if (currEl === authFormBtn) {
        const soundBooGhost = new Audio(CONST.soundBooSrc);
        soundBooGhost.volume = 0.3;
        if (isSoundEffects) soundBooGhost.play();
      }

      if (currEl === settingsBtn) {
        const soundSettings = new Audio(CONST.soundSettingsSrc);
        if (isSoundEffects) soundSettings.play();

        const modalSettings = new Modal();
        modalSettings.drawModal(ModalTemplates.modalTemplateSettings);
        // this.music.stopMusic();
      }

      if (currEl === musicGameBtn) {
        // this.music.playMusic();
        const isMusic: boolean = JSON.parse(localStorage.getItem('isMusic') || '{}');
        if (isMusic) {
          localStorage.setItem('isMusic', JSON.stringify(false));
          // this.music.stopMusic();
          musicGameBtn.classList.add('off');
        } else {
          localStorage.setItem('isMusic', JSON.stringify(true));
          // this.music.playMusic();
          musicGameBtn.classList.remove('off');
        }
      }

      if (currEl === soundEffectsBtn) {
        soundEffectsBtn.classList.add('off');

        // music.playMusic();
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
}
