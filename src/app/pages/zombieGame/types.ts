import { Parallax, Enemy, Player } from './utils-zombie-game';

export type ParallaxGameProps = {
  parallaxSpeed: number;
  gameSpeed: number;
  width: number;
  height: number;
  seconds: number;
  minutes: number;
  lastTime: number;
  enemyTimer: number;
  enemyInterval: number;
  min: number;
  timerInterval: number;
  gameOver: boolean;
  parallaxArr: Parallax[];
  enemies: Enemy[];
  player: Player[];
  enemyTimeId: number;
  enemySpeedModif: number;
};
