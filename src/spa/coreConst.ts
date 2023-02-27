//audio
import soundGameOverSrc from '../assets/audio/effects/fail-wha-wha.mp3';
import soundSettingsSrc from '../assets/audio/effects/settings-1.mp3';
import soundDoorScripSrc from '../assets/audio/effects/scrip-dveri-min-2.mp3';
import soundBooSrc from '../assets/audio/effects/boo-child.mp3';
import soundWitchLaughSrc from '../assets/audio/effects/laughing-witch-1.mp3';

import musicRavensSrc from '../assets/audio/music/strashnye-zvuki-vorony.mp3'; // for Ravens hunting
import musicChildSongSrc from '../assets/audio/music/strashnye-zvuki-child-song.mp3'; // for results page
import musicSomethHappenSrc from '../assets/audio/music/something-should-happen-sounds.mp3'; // for 404
import musicMagicMetamorphoseSrc from '../assets/audio/music/magic-metamorphosis.mp3'; // for main page

import soundPumpkinCrashesSrc from '../assets/audio/effects/pumpkin-crashes.mp3';
import soundExplosionSrc from '../assets/audio/effects/explosion.mp3';
import soundMonsterDead1Src from '../assets/audio/effects/monster-dead1.mp3';
import soundMonsterDead2Src from '../assets/audio/effects/monster-dead2.mp3';
import soundFireSrc from '../assets/audio/effects/sound-fire1.mp3';
import soundLifeSrc from '../assets/audio/effects/life.mp3';
import soundPumpkinSrc from '../assets/audio/effects/food-pumpkin-smash.mp3';
import soundFreesingSrc from '../assets/audio/effects/freezing.mp3';
import soundGameWinSrc from '../assets/audio/effects/game-win.mp3';
import timeOverSrc from '../assets/audio/effects/time-over.mp3';
import pumpkinLevel1Src from '../assets/audio/music/pumpkin-level1.mp3';
import pumpkinLevel2Src from '../assets/audio/music/pumpkin-level2.mp3';
import pumpkinLevel3Src from '../assets/audio/music/pumpkin-level3.mp3';
import pumpkinLevel4Src from '../assets/audio/music/pumpkin-level4.mp3';

import soundGhostSrc from '../assets/audio/effects/ghost-sound1.mp3';

localStorage.setItem('isMusic', JSON.stringify(true));
localStorage.setItem('isSoundEffects', JSON.stringify(true));
const unknownUserName = 'unknown ghost';

//images
//for main page
import castleImg from '../assets/png/castle-main-min.png';
import witch1Img from '../assets/png/witch1-min.png';
import witch2Img from '../assets/png/witch2-reversed-min.png';
import gravesShortImg from '../assets/png/graves-short-min.png';
import grimReaperImg from '../assets/png/grim-reaper-min.png';
import treeImg from '../assets/png/tree-min-min.png';

export default {
  soundPumpkinCrashesSrc,
  soundExplosionSrc,
  soundMonsterDead1Src,
  soundMonsterDead2Src,
  soundFireSrc,
  soundLifeSrc,
  soundPumpkinSrc,
  soundFreesingSrc,
  soundGameWinSrc,
  timeOverSrc,
  pumpkinLevel1Src,
  pumpkinLevel2Src,
  pumpkinLevel3Src,
  pumpkinLevel4Src,

  soundGhostSrc,

  castleImg,
  witch1Img,
  witch2Img,
  gravesShortImg,
  grimReaperImg,
  treeImg,

  soundGameOverSrc,
  soundSettingsSrc,
  soundDoorScripSrc,
  soundBooSrc,
  soundWitchLaughSrc,

  musicRavensSrc,
  musicChildSongSrc,
  musicSomethHappenSrc,
  musicMagicMetamorphoseSrc,

  unknownUserName,
};
