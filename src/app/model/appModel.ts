import AppView from '../view/AppView';
import constsAuthForm from "../pages/authForm/const-auth-form";
import { ControlKeys, MousePos } from '../../spa/coreTypes';
import { stringify } from '@firebase/util';
import { ClickInfo, Player } from '../pages/pumpkinGame/types-pumpkin-game';
import Sprite from '../pages/pumpkinGame/sprite';

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
    const distance: number = Math.sqrt((mousePos['x'] - posCenterX) * (mousePos['x'] - posCenterX) + (mousePos['y'] - posCenterY) * (mousePos['y'] - posCenterY));
    
    const clickInfo: ClickInfo[] = localStorage['clickInfo'] ? JSON.parse(localStorage['clickInfo']) : [];
    clickInfo.push({
      pos: mousePos,
      distance: distance
    });

    localStorage.setItem('clickInfo', JSON.stringify(clickInfo));

    localStorage.setItem('distance', JSON.stringify(distance));
    localStorage.setItem('savedMousePos', JSON.stringify(mousePos));
    localStorage.setItem('isClick', 'true');

    // const pumpkins: Player[] = localStorage['pumpkins'] ? JSON.parse(localStorage['pumpkins']) : [];
    // pumpkins.push(new Sprite())
  }

  setMouseDown(): void {
    //localStorage.setItem('isClick', 'true');
  }

  setMouseUp(): void {
    //localStorage.setItem('isClick', 'false');
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
