const IMAGE_URL = [
	require('../../../assets/sprites/pumpkin-good1.png'),
	require('../../../assets/sprites/pumpkin-fly1.png'),
	require('../../../assets/sprites/spider-walk1.png'),
	require('../../../assets/sprites/spider-walk2.png'),
	require('../../../assets/sprites/spider-walk3.png'),
	require('../../../assets/sprites/spider-walk1-back.png'),
	require('../../../assets/sprites/spider-walk2-back.png'),
	require('../../../assets/sprites/spider-walk3-back.png'),
];

const PLAY_LIST_URL = [
	'../../../assets/mp3/pumpkin-icon-settings.mp3',
];

const soundSettings = new Audio(PLAY_LIST_URL[0]);

export default {
	IMAGE_URL,
	PLAY_LIST_URL,
	soundSettings,
};