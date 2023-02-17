const PLAY_LIST_URL = [
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/settings.mp3',
];

const soundSettings = new Audio(PLAY_LIST_URL[0]);

localStorage.setItem('isMusic', JSON.stringify(true));
localStorage.setItem('isSoundEffects', JSON.stringify(true));

export default {
  PLAY_LIST_URL,
  soundSettings,
};
