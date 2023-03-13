const gameOverMessageTemplate = `
    <div class="title-modal-message">Game over</div>
  `;

const successMessageTemplate = `
  <div class="title-modal-message">Good job!</div>
`;

const toPlayGamesBtn = `
  <a href="#/chooseGames" class="btns__item btn accent-font accent-font--upper">games</a>
`;
const toResultsBtn = `
  <a href="#/results" class="btns__item btn accent-font accent-font--upper">results</a>
`;

const toMainPageBtn = `
  <a href="#" class="btns__item btn accent-font accent-font--upper">On main page</a>
`;

const startGameBtnTemplate = `
  <button class="btn btn--start-game btn--fixed-center start-game-btn">Start Game</button>
`;

export default {
  gameOverMessageTemplate,
  successMessageTemplate,
  toPlayGamesBtn,
  toResultsBtn,
  toMainPageBtn,
  startGameBtnTemplate,
};
