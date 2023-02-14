const PLAY_LIST_URL = [
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/settings.mp3',
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/pumpkin-crashes.mp3',
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/click.mp3',
];

const soundSettings = new Audio(PLAY_LIST_URL[0]);
const soundPumpkinCrashes = new Audio(PLAY_LIST_URL[1]);
const soundClick = new Audio(PLAY_LIST_URL[2]);

export default {
	PLAY_LIST_URL,
	soundSettings,
	soundPumpkinCrashes,
	soundClick
};