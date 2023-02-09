import AppView from '../view/AppView';
import constsAuthForm from "../pages/authForm/const-auth-form";
import { ControlKeys, MousePos } from '../../spa/coreTypes';
import { stringify } from '@firebase/util';

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
    const mousePos: MousePos = {'x': event.clientX, 'y': event.clientY};
    localStorage.setItem('mousePos', JSON.stringify(mousePos));
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
