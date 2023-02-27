import './style-error-page.scss';

export default class ErrorPage {
  constructor() {}

  render(): string {
    return `
    <div class="error-page">
      <div class="error-info-container">
        <img class="error-info-container__img" src=${require('../../../assets/map/location-ghost.png')} alt="ghost">
        <p class="error-info-container__text">
          <span class="error-info-container__text-1">You've lost your way...</span>
          <span class="error-info-container__text-2">404</span>
        </p>
      <div>
    </div>
    `;
  }

  init(): void {}
}
