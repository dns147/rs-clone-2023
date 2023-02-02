import Authorization from "./authorization";

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
