const PUMPKIN_LIST_URL = [
  '', // 0, нигде не использовался, НО долго грузился (длительность 39с)!
  'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/pumpkin-crashes.mp3', // 1
  'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/click.mp3', // 2 //!долго грузится
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
  'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/level1.mp3', // 13
  'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/level2.mp3', // 14
  'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/level3.mp3', // 15
  'https://github.com/dns147/mp3-rs-clone-2023/raw/main/mp3/level4.mp3', // 16
];

const soundSettings = new Audio(PUMPKIN_LIST_URL[0]);//!ссылка пустая
const soundPumpkinCrashes = new Audio(PUMPKIN_LIST_URL[1]);
const soundClick = new Audio(PUMPKIN_LIST_URL[2]);
const soundExplosion = new Audio(PUMPKIN_LIST_URL[3]);
const soundMonsterDead1 = new Audio(PUMPKIN_LIST_URL[4]);
const soundMonsterDead2 = new Audio(PUMPKIN_LIST_URL[5]);
const soundFire = new Audio(PUMPKIN_LIST_URL[6]);
const soundLife = new Audio(PUMPKIN_LIST_URL[7]);
const soundPumpkin = new Audio(PUMPKIN_LIST_URL[8]);
const soundFreesing = new Audio(PUMPKIN_LIST_URL[9]);
const soundGameWin = new Audio(PUMPKIN_LIST_URL[10]);
const soundGameOver = new Audio(PUMPKIN_LIST_URL[11]);
const timeOver = new Audio(PUMPKIN_LIST_URL[12]);
const pumpkinLevel1 = new Audio(PUMPKIN_LIST_URL[13]);
const pumpkinLevel2 = new Audio(PUMPKIN_LIST_URL[14]);
const pumpkinLevel3 = new Audio(PUMPKIN_LIST_URL[15]);
const pumpkinLevel4 = new Audio(PUMPKIN_LIST_URL[16]);

localStorage.setItem('isMusic', JSON.stringify(true));
localStorage.setItem('isSoundEffects', JSON.stringify(true));

const userTemplate = `
  <div class="main-user user-sign-in btn btn--col-3 accent-font" data-tooltip='sign in'>
    <div class="main-user-icon"></div>
    <span class="main-user-name"></span>
  <div>
  `;

//images
//for main page
import castleImg from '../assets/png/castle-main-min.png';
import witch1Img from '../assets/png/witch1-min.png';
import witch2Img from '../assets/png/witch2-reversed-min.png';
import gravesShortImg from '../assets/png/graves-short-min.png';
import grimReaperImg from '../assets/png/grim-reaper-min.png';
import treeImg from '../assets/png/tree-min-min.png';

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
  pumpkinLevel1,
  pumpkinLevel2,
  pumpkinLevel3,
  pumpkinLevel4,
  userTemplate,

  castleImg,
  witch1Img,
  witch2Img,
  gravesShortImg,
  grimReaperImg,
  treeImg,
};
