import modalMessageTemplates from '../modalMessage/modalMessageTemplates';

const IMAGE_URL = [
	require('../../../assets/sprites/pumpkin-good1.png'), // 0
	require('../../../assets/sprites/pumpkin-fly1.png'), // 1
	require('../../../assets/sprites/spider-walk1.png'), // 2
	require('../../../assets/sprites/spider-walk2.png'), // 3
	require('../../../assets/sprites/spider-walk3.png'), // 4
	require('../../../assets/sprites/spider-walk1-back.png'), // 5
	require('../../../assets/sprites/spider-walk2-back.png'), // 6
	require('../../../assets/sprites/spider-walk3-back.png'), // 7
	require('../../../assets/sprites/boom1.png'), // 8
	require('../../../assets/sprites/pumpkin-bomb.png'), // 9
	require('../../../assets/sprites/boom2.png'), // 10
	require('../../../assets/sprites/boom3.png'), // 11
	require('../../../assets/sprites/boom4.png'), // 12
	require('../../../assets/sprites/boom5.png'), // 13
	require('../../../assets/sprites/electro-ball.png'), // 14
	require('../../../assets/sprites/freezer.png'), // 15
	require('../../../assets/sprites/bat1.png'), // 16
	require('../../../assets/sprites/bat1-died.png'), // 17
	require('../../../assets/sprites/bat2.png'), // 18
	require('../../../assets/sprites/bat2-died.png'), // 19
	require('../../../assets/sprites/bat1-back.png'), // 20
	require('../../../assets/sprites/bat1-died-back.png'), // 21
	require('../../../assets/sprites/bat2-back.png'), // 22
	require('../../../assets/sprites/bat2-died-back.png'), // 23
	require('../../../assets/sprites/worm.png'), // 24
	require('../../../assets/sprites/bat3.png'), // 25
	require('../../../assets/sprites/bat3-back.png'), // 26
	require('../../../assets/sprites/casper.png'), // 27
	require('../../../assets/sprites/casper-back.png'), // 28
	require('../../../assets/sprites/skelet.png'), // 29
	require('../../../assets/sprites/skelet-back.png'), // 30
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
