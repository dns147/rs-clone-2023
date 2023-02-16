const PUMPKIN_LIST_URL = [
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/settings.mp3',
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/pumpkin-crashes.mp3',
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/click.mp3',
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/explosion.mp3',
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/monster-dead1.mp3',
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/monster-dead2.mp3',
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/sound-fire.mp3',
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/life.mp3',
];

const soundSettings = new Audio(PUMPKIN_LIST_URL[0]);
const soundPumpkinCrashes = new Audio(PUMPKIN_LIST_URL[1]);
const soundClick = new Audio(PUMPKIN_LIST_URL[2]);
const soundExplosion = new Audio(PUMPKIN_LIST_URL[3]);
const soundMonsterDead1 = new Audio(PUMPKIN_LIST_URL[4]);
const soundMonsterDead2= new Audio(PUMPKIN_LIST_URL[5]);
const soundFire = new Audio(PUMPKIN_LIST_URL[6]);
const soundLife = new Audio(PUMPKIN_LIST_URL[7]);

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
};