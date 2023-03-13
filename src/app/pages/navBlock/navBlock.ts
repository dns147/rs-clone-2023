import './style-navBlock.scss';
import { changeSignInButton } from '../authForm/utils-auth-form';
import { navBlockTemplate } from './utils-navBlock';

export default class NavBlock {
  constructor() {}

  render(): string {
    return `
      ${navBlockTemplate}
    `;
  }

  init(): void {
    if (localStorage['userName']) {
      changeSignInButton(true);
    }
  }
}
