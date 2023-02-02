import { checkSubmitButtonsStatus, isValidateEmail, showLoader } from "../pages/page1/utils-auth-form";
import constsAuthForm from "../pages/page1/const-auth-form";
import Authorization from "../pages/page1/authorization";
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

  authorization(): void {
    const userEmail = <HTMLInputElement>this.container.querySelector('#email');
    const userPassword = <HTMLInputElement>this.container.querySelector('#password');
    
    showLoader();

    const authUser = new Authorization();
	  authUser.loginUser({email: userEmail.value, password: userPassword.value});
    
    //await loginUser(email.value, password.value);
  }

  switchMode(mode: string):void {
    const isLogin = (mode === constsAuthForm.LOGIN) ? 'flex' : 'none';
    const isReg = (mode === constsAuthForm.REGISTRATION) ? 'flex' : 'none';
    
    const loginBlocks = this.container.querySelectorAll('.authorization-block') as NodeListOf<HTMLElement>;
    
    loginBlocks.forEach((loginElem: HTMLElement) => {
      loginElem.style.display = isLogin;
    });
    
    const regBlocks = this.container.querySelectorAll('.registration-block') as NodeListOf<HTMLElement>;;
    
    regBlocks.forEach((regElem: HTMLElement) => {
      regElem.style.display = isReg;
    });
  }

  registration() {
    const userName = <HTMLInputElement>this.container.querySelector('#name');
    const userEmail = <HTMLInputElement>this.container.querySelector('#email');
    const userPassword = <HTMLInputElement>this.container.querySelector('#password');
    
    showLoader();

    const authUser = new Authorization();
	  authUser.createUser({email: userEmail.value, password: userPassword.value});
    
  }
}
