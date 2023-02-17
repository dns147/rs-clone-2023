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
];

const gameOverModalTemplate = `
	<h2 class="pumpkin-modal">Game Over</h2>
	<button class="btn pumpkin-restart">Restart</button>
	<button class="btn pumpkin-exit"><a class="exit" href="#/page1">Go to Home Page</a></button>
`;

const gameNextLevelModalTemplate = `
	<h2 class="pumpkin-modal">Good job!</h2>
	<button class="btn pumpkin-next-level">Next Level</button>
	<button class="btn pumpkin-exit"><a class="exit" href="#/page1">Go to Home Page</a></button>
`;

export default {
	IMAGE_URL,
	gameOverModalTemplate,
	gameNextLevelModalTemplate,
};
