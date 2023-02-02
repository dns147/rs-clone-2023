import AppModel from '../model/AppModel';

export default class AppController {
  model: AppModel;
  container: HTMLElement;

  constructor(model: AppModel, container: HTMLElement) {
    this.model = model;
    this.container = container;

    this.getEventsClick = this.getEventsClick.bind(this);
    this.getEventsInput = this.getEventsInput.bind(this);

    document.addEventListener('click', this.getEventsClick);
    document.addEventListener('input', this.getEventsInput);
  }

  getEventsClick(event: Event): void {
    if (event.target instanceof Element) {
      const btnAuthorization = <HTMLElement>event.target.closest('.authorization-btn');
      const btnRegistration = <HTMLElement>event.target.closest('.registration-btn');

      if (btnAuthorization) {
        this.model.authorization();
      }

      if (btnRegistration) {
        this.model.registration();
      }
    }
  }

  getEventsInput(event: Event): void {
    if (event.target instanceof Element) {
      const emailInput = <HTMLInputElement>event.target.closest('#email');
      const passwordInput = <HTMLInputElement>event.target.closest('#password');
      
      if (emailInput) {
        this.model.validateEmail(emailInput);
      }

      if (passwordInput) {
        this.model.validatePassword(passwordInput);
      }
    }
  }
}
