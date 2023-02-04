import AppView from '../view/AppView';
import constsAuthForm from "../pages/authForm/const-auth-form";

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
}
