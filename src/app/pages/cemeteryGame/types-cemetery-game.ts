export type MatchGameState = {
  hasFlippedCard: boolean;
  lockBoard: boolean;
  firstCard: HTMLElement | null;
  secondCard: HTMLElement | null;
  index: number;
  matched: HTMLElement[];
  seconds: number;
  minutes: number;
  interval: number;
  level: number;
  results: StorageInfo[];
};

export type ElemParams = {
  tagName: string | HTMLElement;
  className: string;
  textContent?: string;
};

export type HeroParams = {
  hero: string;
  link: string;
};

export type StorageInfo = {
  level?: number;
  moves?: number;
  time?: string | null;
};
