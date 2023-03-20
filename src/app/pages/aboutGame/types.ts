import { Particle } from './utils-aboutGame';

export type ShootingStarProps = Particle & {
  isDead: boolean;
  isDying: boolean;
  isSpawning: boolean;
  opacity: number;
  trailLengthDelta: number;
};

export type SkyStateProps = {
  width: number;
  height: number;
  particle: Particle;
  stars: Particle[];
  shootingStars: ShootingStarProps[];
  paused: boolean;
};
