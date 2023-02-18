const PUMPKIN_LIST_URL = [
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/settings.mp3', // 0
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/pumpkin-crashes.mp3', // 1
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/click.mp3', // 2
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/explosion.mp3', //3
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/monster-dead1.mp3', // 4
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/monster-dead2.mp3', // 5
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/sound-fire1.mp3', // 6
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/life.mp3', // 7
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/food-pumpkin-smash.mp3', // 8
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/freezing.mp3', // 9
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/game-win.mp3', // 10
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/game-over.mp3', // 11
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/time-over.mp3', // 12
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/pumpkin-bg3.mp3', // 13
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/pumpkin-bg2.mp3', // 14
];

const soundSettings = new Audio(PUMPKIN_LIST_URL[0]);
const soundPumpkinCrashes = new Audio(PUMPKIN_LIST_URL[1]);
const soundClick = new Audio(PUMPKIN_LIST_URL[2]);
const soundExplosion = new Audio(PUMPKIN_LIST_URL[3]);
const soundMonsterDead1 = new Audio(PUMPKIN_LIST_URL[4]);
const soundMonsterDead2= new Audio(PUMPKIN_LIST_URL[5]);
const soundFire = new Audio(PUMPKIN_LIST_URL[6]);
const soundLife = new Audio(PUMPKIN_LIST_URL[7]);
const soundPumpkin = new Audio(PUMPKIN_LIST_URL[8]);
const soundFreesing = new Audio(PUMPKIN_LIST_URL[9]);
const soundGameWin = new Audio(PUMPKIN_LIST_URL[10]);
const soundGameOver = new Audio(PUMPKIN_LIST_URL[11]);
const timeOver = new Audio(PUMPKIN_LIST_URL[12]);
const pumpkinMusic1 = new Audio(PUMPKIN_LIST_URL[13]);
const pumpkinMusic2 = new Audio(PUMPKIN_LIST_URL[14]);

localStorage.setItem('isMusic', JSON.stringify(true));
localStorage.setItem('isSoundEffects', JSON.stringify(true));

const userTemplate = `
	<div class="main-user-icon"></div>
	<span class="main-user-name"></span>
`;

export default {
	PUMPKIN_LIST_URL,
	soundSettings,
	soundPumpkinCrashes,
	soundClick,
	soundExplosion,
	soundMonsterDead1,
	soundMonsterDead2,
	soundFire,
	soundLife,
	soundPumpkin,
	soundFreesing,
	soundGameWin,
	soundGameOver,
	timeOver,
	pumpkinMusic1,
	pumpkinMusic2,
	userTemplate,
};
