import './style-choose-games.scss';

export default class ChooseGames {
  constructor() {}

  render(): string {
    return `<div class="map">
    <div class="sky">
      <div class="clouds">
        <div class="cloud cloud-front-bottom-fast">
          <img class="cloud__img" src=${require('../../../assets/img/cloud-svg-grey.svg')} alt="cloud">
        </div>
        <div class="cloud cloud-front-bottom-slow">
          <img class="cloud__img" src=${require('../../../assets/img/cloud-svg-grey2.svg')} alt="cloud">
        </div>
        <div class="cloud cloud-front-center-slow">
          <img class="cloud__img" src=${require('../../../assets/img/cloud-svg-grey3.svg')} alt="cloud">
        </div>
        <div class="cloud cloud-front-center-fast">
          <img class="cloud__img" src=${require('../../../assets/img/cloud-svg-grey2.svg')} alt="cloud">
        </div>
        <div class="cloud cloud-front-center-very-slow">
          <img class="cloud__img" src=${require('../../../assets/img/cloud-svg-grey.svg')} alt="cloud">
        </div>
        <div class="cloud cloud-front-bottom-very-slow">
          <img class="cloud__img" src=${require('../../../assets/img/cloud-svg-grey3.svg')} alt="cloud">
        </div>
      </div>
      <div class="moon">
        <ul class="moon-wrapper">
          <li class="moon-wrapper__crater"></li>
          <li class="moon-wrapper__crater"></li>
          <li class="moon-wrapper__crater"></li>
          <li class="moon-wrapper__crater"></li>
          <li class="moon-wrapper__crater"></li>
          <li class="moon-wrapper__crater"></li>
        </ul>
      </div>
    </div>
    <div class="map-caslte">
      <img class="map-castle__img" src="https://i.ibb.co/hMjTxYH/map-castle.png" alt="castle">
      <div id="location-ghost-one" class="location-ghost">
        <img class="location-ghost__img" src="https://i.ibb.co/NCMqVpQ/location-ghost.png" alt="ghost">
      </div>
      <div id="location-ghost-two" class="location-ghost">
        <img class="location-ghost__img" src="https://i.ibb.co/NCMqVpQ/location-ghost.png" alt="ghost">
      </div>
      <div id="location-ghost-three" class="location-ghost">
        <img class="location-ghost__img" src="https://i.ibb.co/nz0kT7K/location-ghost-reversed.png" alt="ghost">
      </div>
    </div>
    <div class="ground"></div>
    <div class="hero">
      <img class="hero__img" src="https://i.ibb.co/bHLwxkY/death.png" alt="hero">
    </div>
    <div class="mountain">
      <img class="mountain__img" src="https://i.ibb.co/1QFn4vG/mountain2.png" alt="mountain">
    </div>
    <div class="graves">
      <img class="graves__img" src="https://i.ibb.co/ZzbXc78/graves.png" alt="mountain">
    </div>
    <div class="forest">
      <img class="forest__img" src="https://i.ibb.co/cJMvV3L/forest.png" alt="forest">
    </div>
  </div>`;
  }

  init(): void {}
}
