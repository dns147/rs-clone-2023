import { Content, Footer, Header } from './components';
import MainPage from './pages/mainPage/mainPage';
import Page2 from './pages/page2/Page2';
import ChooseGames from './pages/chooseGames/chooseGames';
import Test from './pages/page4/Page4';
import Spa from '../spa/spa';
import PumpkinGame from './pages/pumpkinGame/PumpkinGame';
import ShooterGame from './pages/shooterGame/shooterGame';
import Results from './pages/results/results';
import CemeteryGame from './pages/cemeteryGame/cemeteryGame';
import ZombieGame from './pages/zombieGame/zombieGame';
import NavBlock from './pages/navBlock/navBlock';
import Page10 from './pages/page10/Page10';
import Page11 from './pages/page11/Page11';
import Page12 from './pages/page12/Page12';
import ErrorPage from './pages/errorPage/ErrorPage';

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
      navBlock: new NavBlock(),
    };

    const routes = {
      mainPage: MainPage,
      page2: Page2,
      chooseGames: ChooseGames,
      page4: Test,
      pumpkinGame: PumpkinGame,
      shooterGame: ShooterGame,
      results: Results,
      cemeteryGame: CemeteryGame,
      zombieGame: ZombieGame,
      page10: Page10,
      page11: Page11,
      page12: Page12,
      error: ErrorPage,
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
