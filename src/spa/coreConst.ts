const PLAY_LIST_URL = [
	'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/settings.mp3',
];

const soundSettings = new Audio(PLAY_LIST_URL[0]);

localStorage.setItem('isMusic', JSON.stringify(true));
localStorage.setItem('isSoundEffects', JSON.stringify(true));

const PLAY_LIST = {
  music: [
    'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/music/strashnye-zvuki-vorony.mp3',
    'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/music/strashnye-zvuki-child-song.mp3',
  ],
  soundEffects: [
    'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/effects/ice-boom.mp3',
    'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/effects/settings-1.mp3',
    'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/effects/fail-wha-wha.mp3',
  ],
};

export default {
  PLAY_LIST_URL,
  soundSettings,
  PLAY_LIST,
};
