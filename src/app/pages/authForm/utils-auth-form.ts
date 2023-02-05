import { hideUserMenu } from "../../utils-component";

export function checkSubmitButtonsStatus(isValidEmail: boolean, isValidPassword: boolean): void {
	const registryBtn = <HTMLButtonElement>document.querySelector('.registration-btn');
	const loginBtn = <HTMLButtonElement>document.querySelector('.authorization-btn');
	
	if (isValidEmail && isValidPassword) {
		registryBtn.classList.remove('disabled');
		loginBtn.classList.remove('disabled');
	} else {
		registryBtn.classList.add('disabled');
		loginBtn.classList.add('disabled');
	}
}

export const isValidateEmail = (email: string): string[] | null => {
  return email
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

export function showLoader(): void {
	const formRegistration = <HTMLFormElement>document.querySelector('.registration-form');
	const formContent = <HTMLDivElement>document.querySelector('.form-content');
	
	formContent.style.display = 'none';
	formRegistration.style.height = '345px';
	formRegistration.insertAdjacentHTML('afterbegin', `
		<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
	`);
}

export function showForm() {
	(<HTMLFormElement>document.querySelector('.registration-form')).style.height = 'auto';
	(<HTMLDivElement>document.querySelector('.lds-ellipsis')).style.display = 'none';
	
	const form = <HTMLDivElement>document.querySelector('.form-content');
	form.style.display = 'block';
}

export function showLoginError(msg: string) {
	const errorMessage = <HTMLSpanElement>document.querySelector('.errorMsg');
	errorMessage.textContent = msg;
	errorMessage.style.opacity = '1';

	setTimeout(() => {
		errorMessage.style.opacity = '0';
	}, 5000);
}

export function setUserName(name: string | null): void {
  const userName = <HTMLSpanElement>document.querySelector('.user-name');
  userName.textContent = name;

  const userIcon = <HTMLButtonElement>document.querySelector('.user-icon');
  userIcon.classList.add('user-icon-auth');
  userIcon.disabled = true;

  (<HTMLDivElement>document.querySelector('.user-info')).style.display = 'block';
}

export function hideRegistrationForm(): void {
  const registrationContainer = <HTMLDivElement>document.querySelector('.registration-container');
  registrationContainer.style.display = 'none';

  const userEmail = <HTMLInputElement>document.querySelector('#email');
  const userPassword = <HTMLInputElement>document.querySelector('#password');
  userEmail.value = '';
  userPassword.value = '';

  (<HTMLDivElement>document.querySelector('.form-content')).style.display = 'block';
  (<HTMLDivElement>document.querySelector('.lds-ellipsis')).style.display = 'none';

  const authorizationBtn = <HTMLElement>document.querySelector('.authorization-btn');
  authorizationBtn.classList.add('disabled');
  const registrationBtn = <HTMLElement>document.querySelector('.registration-btn');
  registrationBtn.classList.add('disabled');
}

export function removeUserInfo(): void {
  const userInfo = <HTMLDivElement>document.querySelector('.user-info');
  const userMenu = <HTMLDivElement>document.querySelector('.user-menu');
  const userIcon = <HTMLButtonElement>document.querySelector('.user-icon');
  userInfo.style.display = 'none';
  userMenu.style.display = 'none';
  hideUserMenu(userMenu);
  userIcon.classList.remove('user-icon-auth');
  userIcon.disabled = false;
}
