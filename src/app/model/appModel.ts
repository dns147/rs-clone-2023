import AppView from '../view/AppView';

export default class AppModel {
  view: AppView;
  
  constructor(view: AppView) {
    this.view = view;
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

  registration(): void {
    this.view.registration();
  }
}
