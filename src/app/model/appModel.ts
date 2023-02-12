import AppView from '../view/AppView';
import constsAuthForm from "../pages/authForm/const-auth-form";
import { ControlKeys, MousePos } from '../../spa/coreTypes';
import { Angle } from '../pages/pumpkinGame/types-pumpkin-game';
import { getAngle } from '../pages/pumpkinGame/utils-pumpkin-game';
import CONSTS_PUMPKIN_GAME from '../pages/pumpkinGame/consts-pumpkin-game';
//import sound from '../../assets/mp3/pumpkin-icon-settings.mp3';

export default class AppModel {
  view: AppView;
  
  constructor(view: AppView) {
    this.view = view;
  }

  goToLoginContainer(): void {
    this.view.goToLoginContainer();
  }

  validateEmail(emailInput: HTMLInputElement): void {
    this.view.validateEmail(emailInput);
  }

  validatePassword(passwordInput: HTMLInputElement): void {
    this.view.validatePassword(passwordInput);
  }

  authorization(): void {
    this.view.authorization();
  }

  goToRegistrationMode(): void {
    this.view.switchMode(constsAuthForm.REGISTRATION);
  }

  goToLoginMode(): void {
    this.view.switchMode(constsAuthForm.LOGIN);
  }

  registration(): void {
    this.view.registration();
  }

  closeRegistrationForm(): void {
    this.view.closeRegistrationForm();
  }

  goToUserMenu(): void {
    this.view.goToUserMenu();
  }

  userSignOut(): void {
    this.view.userSignOut();
  }

  rotatePlayer(event: MouseEvent): void {
    const mousePos: MousePos = {'x': event.clientX + 18, 'y': event.clientY + 18};
    localStorage.setItem('mousePos', JSON.stringify(mousePos));
  }

  shootPumpkin(): void {
    const mousePos: MousePos = localStorage['mousePos'] ? JSON.parse(localStorage['mousePos']) : {};
    const posCenterX: number = document.documentElement.clientWidth / 2;
    const posCenterY: number = document.documentElement.clientHeight / 2;
    const mouseX: number = mousePos['x'];
    const mouseY: number = mousePos['y'];
    const distance: number = Math.sqrt((mousePos['x'] - posCenterX) * (mousePos['x'] - posCenterX) + (mousePos['y'] - posCenterY) * (mousePos['y'] - posCenterY));
    const angle: Angle = getAngle(mouseX, mouseY, posCenterX, posCenterY);

    const clickInfo = {
      pos: mousePos,
      distance: distance,
      angle: angle,
    };

    localStorage.setItem('clickInfo', JSON.stringify(clickInfo));
    localStorage.setItem('isClick', 'true');
  }

  showSettingsPumpkin(): void {
    
  }

  soundSettingsPumpkin(btn: HTMLButtonElement): void {
    if (btn.dataset.sound === 'play') {
      btn.setAttribute('data-sound', 'stop');
      CONSTS_PUMPKIN_GAME.soundSettings.pause();
    } else {
      btn.setAttribute('data-sound', 'play');
      CONSTS_PUMPKIN_GAME.soundSettings.play();
    }
  }

  setKeyDown(event: KeyboardEvent): void {
    const controlKeys: ControlKeys = localStorage['controlKeys'] ? JSON.parse(localStorage['controlKeys']) : {};
    controlKeys[event.code] = true;
    localStorage.setItem('controlKeys', JSON.stringify(controlKeys));
  }

  setKeyUp(event: KeyboardEvent): void {
    const controlKeys: ControlKeys = localStorage['controlKeys'] ? JSON.parse(localStorage['controlKeys']) : {};
    controlKeys[event.code] = false;
    localStorage.setItem('controlKeys', JSON.stringify(controlKeys));
  }
}
