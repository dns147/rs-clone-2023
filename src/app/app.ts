import { Content, Footer, Header } from './components';
import Page1 from './pages/page1/Page1';
import Page2 from './pages/page2/Page2';
import Page3 from './pages/page3/Page3';
import Page4 from './pages/page4/Page4';
import Spa from '../spa/spa';
import PumpkinGame from './pages/pumpkinGame/PumpkinGame';
import ShooterGame from './pages/shooterGame/shooterGame';
import Page6 from './pages/page6/Page6';
import Page7 from './pages/page7/Page7';
import Page8 from './pages/page8/Page8';
import Page9 from './pages/page9/Page9';
import Page10 from './pages/page10/Page10';
import Page11 from './pages/page11/Page11';
import Page12 from './pages/page12/Page12';

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
      pumpkinGame: PumpkinGame,
      shooterGame: ShooterGame,
      page6: Page6,
      page7: Page7,
      page8: Page8,
      page9: Page9,
      page10: Page10,
      page11: Page11,
      page12: Page12,
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
