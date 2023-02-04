import { Content, Footer, Header } from './components';
import Page1 from './pages/page1/Page1';
import Page2 from './pages/page2/Page2';
import Page3 from './pages/page3/Page3';
import Page4 from './pages/page4/Page4';
import Spa from '../spa/spa';

export default class App {
  spa: Spa;

  constructor() {
    this.spa = new Spa();
  }

  start(): void {
    const components = {
      header: Header,
      content: Content,
      footer: Footer,
    };

    const routes = {
      page1: Page1,
      page2: Page2,
      page3: Page3,
      page4: Page4,
    };

    window.addEventListener('DOMContentLoaded', () => {
      this.spa.init({
        container: '.app',
        routes: routes,
        components: components,
      });
    });
  }
}
