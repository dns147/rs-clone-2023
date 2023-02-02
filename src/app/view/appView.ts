import { checkSubmitButtonsStatus, isValidateEmail, showLoader } from "../pages/page1/utils-auth-form";
import constsAuthForm from "../pages/page1/const-auth-form";
export default class AppView {
  container: HTMLElement;

  isValidEmail: boolean;
  isValidPassword: boolean;

  constructor(container: HTMLElement) {
    this.container = container;

    this.isValidEmail = false;
    this.isValidPassword = false;
  }

  validateEmail(emailInput: HTMLInputElement): void {
    const valueEmailInput: string = emailInput.value;

    if (isValidateEmail(valueEmailInput)) {
      (<HTMLSpanElement>emailInput.nextElementSibling).style.opacity = '0';
      this.isValidEmail = true;
    } else {
      (<HTMLSpanElement>emailInput.nextElementSibling).style.opacity = '1';
      this.isValidEmail = false;
    }

    checkSubmitButtonsStatus(this.isValidEmail, this.isValidPassword);
  }

  validatePassword(passwordInput: HTMLInputElement): void {
    const emailPasswordInput: string = passwordInput.value;

    if (emailPasswordInput.length < constsAuthForm.MIN_PASS_LEN) {
      (<HTMLSpanElement>passwordInput.nextElementSibling).style.opacity = '1';
      this.isValidPassword = false;
    } else {
      (<HTMLSpanElement>passwordInput.nextElementSibling).style.opacity = '0';
      this.isValidPassword = true;
    }

    checkSubmitButtonsStatus(this.isValidEmail, this.isValidPassword);
  }

  async authorization(): Promise<void> {
    const email = <HTMLInputElement>document.querySelector('#email');
    const password = <HTMLInputElement>document.querySelector('#password');
    
    showLoader();
    
    await this.loginUser(email.value, password.value);
  }

  async loginUser(userEmail: string, userPwd: string): Promise<void> {

  }

  async registration(): Promise<void> {
    const name = <HTMLInputElement>document.querySelector('#name');
    const email = <HTMLInputElement>document.querySelector('#email');
    const password = <HTMLInputElement>document.querySelector('#password');
    
    showLoader();
  }
}
