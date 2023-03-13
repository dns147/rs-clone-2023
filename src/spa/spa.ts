import { Components, ISpa } from './coreTypes';
import AppController from '../app/controller/AppController';
import AppModel from '../app/model/appModel';
import AppView from '../app/view/appView';
import { Router } from './router';

export default class Spa {
  router: Router;

  constructor() {
    this.router = new Router();
  }

  init(initObject: ISpa): void {
    const { container, routes, components } = initObject;
    const mainContainer = document.querySelector(container) as HTMLElement;

    this.renderComponents(container, components);
    this.router.start(routes, mainContainer);

    const view = new AppView(mainContainer);
    const model = new AppModel(view);
    new AppController(model, mainContainer);
  }

  renderComponents(container: string, components: Components) {
    const root = document.querySelector(container) as HTMLElement;
    const componentsList = Object.keys(components);

    for (const component of componentsList) {
      root.innerHTML += components[component].render();
    }
  }
}
