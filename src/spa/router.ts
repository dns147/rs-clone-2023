import AuthForm from '../app/pages/authForm/AuthForm';
import { Routes, TypeOfClasses } from './coreTypes';

export class Router {
  start(routes: Routes, container: HTMLElement): void {
    window.addEventListener('hashchange', () => this.loadRoute(routes, container));
    this.loadRoute(routes, container);
  }

  loadRoute(routes: Routes, container: HTMLElement): void {
    const contentContainer = container.querySelector('.main') as HTMLElement;
    let routeName = 'page1';
    const hashPageName: string = window.location.hash.slice(2);

    if (hashPageName.length > 0) {
      routeName = hashPageName in routes ? hashPageName : 'page1';
    }

    window.document.title = routeName;

    const page: TypeOfClasses = new routes[routeName]();
    contentContainer.innerHTML = page.render();
    page.init();

    this.renderRegistrationContainer(container);
  }

  renderRegistrationContainer(container: HTMLElement): void {
    const registrationContainer = <HTMLDivElement>container.querySelector('.registration-container');

    if (!registrationContainer) {
      const pageAuthForm: TypeOfClasses = new AuthForm;
      container.insertAdjacentHTML('beforeend', pageAuthForm.render());
  
      const registrationContainer = <HTMLDivElement>container.querySelector('.registration-container');
      registrationContainer.style.display = 'none';
    }
  }
}
