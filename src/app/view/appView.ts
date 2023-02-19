import { changeSignInButton, checkSubmitButtonsStatus, isValidateEmail, removeUserInfo, showLoader } from "../pages/authForm/utils-auth-form";
import constsAuthForm from "../pages/authForm/const-auth-form";
import Authorization from "../pages/authForm/authorization";
import { hideUserMenu, showUserMenu } from "../utils-component";
import { flipCard } from '../pages/page7/utils-page7';


export default class AppView {
  container: HTMLElement;
  isValidEmail: boolean;
  isValidPassword: boolean;

  constructor(container: HTMLElement) {
    this.container = container;

    this.isValidEmail = false;
    this.isValidPassword = false;
  }

  goToLoginContainer(): void {
    const registrationContainer = <HTMLDivElement>this.container.querySelector('.registration-container');
    registrationContainer.style.display = 'block';
  }

  closeRegistrationForm(): void {
    const registrationContainer = <HTMLDivElement>this.container.querySelector('.registration-container');
    registrationContainer.style.display = 'none';
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
  }

  registration(): void {
    const userName = <HTMLInputElement>this.container.querySelector('#name');
    const userEmail = <HTMLInputElement>this.container.querySelector('#email');
    const userPassword = <HTMLInputElement>this.container.querySelector('#password');
    showLoader();
    const authUser = new Authorization();
	  authUser.createUser({name: userName.value, email: userEmail.value, password: userPassword.value});
  }

  switchMode(mode: string): void {
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

  goToUserMenu(): void {
    const userMenu = <HTMLElement>this.container.querySelector('.user-menu');
    if (userMenu.classList.contains('active')) {
      hideUserMenu(userMenu);
    } else {
      showUserMenu(userMenu);
    }
  }

  userSignOut(): void {
    const authUser = new Authorization();
	  authUser.userSignOut();

    removeUserInfo();
		changeSignInButton(false);

    this.isValidEmail = false;
    this.isValidPassword = false;
  }

  cardGame(card: HTMLElement): void {
    flipCard(card);
  }
}
