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
  }
}
