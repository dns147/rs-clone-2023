import modalMessageTemplates from '../modalMessage/modalMessageTemplates';

const IMAGE_URL = [
  require('../../../assets/sprites/pumpkin-good1.png'),
  require('../../../assets/sprites/pumpkin-fly1.png'),
  require('../../../assets/sprites/spider-walk1.png'),
  require('../../../assets/sprites/spider-walk2.png'),
  require('../../../assets/sprites/spider-walk3.png'),
  require('../../../assets/sprites/spider-walk1-back.png'),
  require('../../../assets/sprites/spider-walk2-back.png'),
  require('../../../assets/sprites/boom1.png'),
  require('../../../assets/sprites/pumpkin-bomb.png'),
  require('../../../assets/sprites/boom3.png'),
  require('../../../assets/sprites/boom4.png'),
  require('../../../assets/sprites/boom5.png'),
  require('../../../assets/sprites/electro-ball.png'),
  require('../../../assets/sprites/freezer.png'),
  require('../../../assets/sprites/bat1.png'),
  require('../../../assets/sprites/bat2.png'),
  require('../../../assets/sprites/bat1-back.png'),
  require('../../../assets/sprites/bat2-back.png'),
  require('../../../assets/sprites/bat3.png'),
  require('../../../assets/sprites/bat3-back.png'),
  require('../../../assets/sprites/casper.png'),
  require('../../../assets/sprites/casper-back.png'),
];

const accentColorNumber = '#ff9900'; //$accent1-color from constants.scss

const gameOverModalMessageTemplate = `
	${modalMessageTemplates.gameOverMessageTemplate}
	<button class="btns__item btn btn--col-7 accent-font accent-font--upper pumpkin-restart">Restart</button>
	${modalMessageTemplates.toPlayGamesBtn}
	${modalMessageTemplates.toResultsBtn}
`;

const nextLevelModalMessageTemplate = `
	${modalMessageTemplates.successMessageTemplate}
	<button class="btns__item btn btn--col-7 accent-font accent-font--upper pumpkin-next-level">Next Level</button>
	${modalMessageTemplates.toPlayGamesBtn}
	${modalMessageTemplates.toResultsBtn}
`;

export default {
  IMAGE_URL,
  gameOverModalMessageTemplate,
  nextLevelModalMessageTemplate,
  accentColorNumber,
};
