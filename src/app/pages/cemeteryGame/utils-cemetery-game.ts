import { MatchGameState, StorageInfo } from './types-cemetery-game';
import ModalMessage from '../modalMessage/modalMessage';
import Page7 from './cemeteryGame';
import CONST from '../../../spa/coreConst';
import { ResultGame } from '../../../spa/coreTypes';
import DataBase from '../../../utils/dataBase';

const matchGameState: MatchGameState = {
  hasFlippedCard: false,
  lockBoard: false,
  firstCard: null,
  secondCard: null,
  index: 0,
  matched: [],
  seconds: 0,
  minutes: 0,
  interval: 0,
  level: 1,
  results: [],
};

export function flipCard(card: HTMLElement) {
  if (matchGameState.lockBoard) return;
  if (card === matchGameState.firstCard) return;

  card.classList.add('flip');

  if (!matchGameState.hasFlippedCard) {
    matchGameState.hasFlippedCard = true;
    matchGameState.firstCard = card;
    matchGameState.firstCard?.classList.add('no-click');
    countClicks();
    return;
  }

  matchGameState.secondCard = card;
  matchGameState.lockBoard = true;

  checkForMatch(matchGameState.secondCard);
  countClicks();
}

function checkForMatch(card: HTMLElement) {
  matchGameState.secondCard?.classList.add('no-click');
  const isMatch = card.dataset.hero === matchGameState.firstCard?.dataset.hero;
  isMatch ? disableCards() : unflipCards();
  if (isMatch) {
    matchGameState.matched.push(card);
    if (card.dataset.hero === 'ghost') {
      changeStyles();
    }
  }
  console.log(matchGameState.matched);
}

function changeStyles() {
  const matchedCards: NodeListOf<HTMLElement> = document.querySelectorAll('[data-hero="ghost"]');
  matchedCards.forEach((e) => {
    if (e.dataset.hero === 'ghost') {
      const hero = e.querySelector('.back__img1') as HTMLImageElement;
      hero.classList.add('fly-hero');
      matchSoundEffect();
    }
  });
}

function disableCards() {
  matchGameState.firstCard?.classList.add('no-click');
  matchGameState.secondCard?.classList.add('no-click');
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    matchGameState.firstCard?.classList.remove('flip');
    matchGameState.secondCard?.classList.remove('flip');
    matchGameState.firstCard?.classList.remove('no-click');
    matchGameState.secondCard?.classList.remove('no-click');
    resetBoard();
  }, 1200);
}

function resetBoard() {
  [matchGameState.hasFlippedCard, matchGameState.lockBoard] = [false, false];
  [matchGameState.firstCard, matchGameState.secondCard] = [null, null];
}

function countClicks() {
  matchGameState.index = matchGameState.index + 1;
  showMoves(matchGameState.index);
  if (matchGameState.index === 1) {
    timer();
  }
  gameOver();
}

function showMoves(value: number) {
  const moves = document.querySelector('.match-game-moves-container__number') as HTMLElement;
  moves.textContent = String(value);
}

function timer() {
  const timeContainer = document.querySelector('.match-game-time-container__number') as HTMLElement;
  clearInterval(matchGameState.interval);
  timeContainer.textContent = '00:00';
  matchGameState.interval = window.setInterval(() => {
    matchGameState.seconds++;
    if (matchGameState.seconds < 10 && matchGameState.minutes < 10) {
      timeContainer.textContent = `0${matchGameState.minutes}:0${matchGameState.seconds}`;
    } else if (matchGameState.minutes < 10 && matchGameState.seconds >= 10) {
      timeContainer.textContent = `0${matchGameState.minutes}:${matchGameState.seconds}`;
    } else if (matchGameState.minutes >= 10 && matchGameState.seconds < 10) {
      timeContainer.textContent = `${matchGameState.minutes}:0${matchGameState.seconds}`;
    } else if (matchGameState.minutes >= 10 && matchGameState.seconds >= 10) {
      timeContainer.textContent = `${matchGameState.minutes}:${matchGameState.seconds}`;
    }
    if (matchGameState.seconds >= 59) {
      matchGameState.seconds = -1;
      matchGameState.minutes++;
    }
  }, 1000);
}

function gameOver() {
  if (matchGameState.level === 1 && matchGameState.matched.length === 8) {
    createResults();
    clearInterval(matchGameState.interval);
    setTimeout(() => {
      matchGameState.level += 1;
      switchLevel(matchGameState.level);
      clearInfo();
    }, 1500);
  }

  if (matchGameState.level === 2 && matchGameState.matched.length === 12) {
    createResults();
    clearInterval(matchGameState.interval);
    showGameOver();
  }
}

function createResults() {
  const timeContainer = document.querySelector('.match-game-time-container__number') as HTMLElement;
  const result: StorageInfo = {};
  result.level = matchGameState.level;
  result.moves = matchGameState.index;
  result.time = timeContainer.textContent;
  matchGameState.results.push(result);
  setLocalstorage();
  saveResultGameToStorage(result);
}

function saveResultGameToStorage(result: StorageInfo): void {
  const userName: string = localStorage['userName'] ? JSON.parse(localStorage['userName']) : '';
  const userId: string = localStorage['userId'] ? JSON.parse(localStorage['userId']) : '';
  const timeGame = <string>result.time;
  const levelGame = <number>result.level;
  const scoreGame = <number>result.moves;
    
  const resultGame: ResultGame = {
    id: userId,
    name: userName,
    game: 'Cemetery',
    score: scoreGame,
    level: levelGame,
    time: timeGame
  }

  const db = new DataBase();
  db.saveToStorage(resultGame);
}

function switchLevel(value: number) {
  if (value === 2) {
    const matchGame = new Page7();
    matchGame.showLevel2();
  }
  showLevel();
}

function clearInfo() {
  const timeContainer = document.querySelector('.match-game-time-container__number') as HTMLElement;
  timeContainer.textContent = '00:00';
  const moves = document.querySelector('.match-game-moves-container__number') as HTMLElement;
  moves.textContent = '0';

  matchGameState.hasFlippedCard = false;
  matchGameState.lockBoard = false;
  matchGameState.firstCard = null;
  matchGameState.secondCard = null;
  matchGameState.index = 0;
  matchGameState.matched = [];
  matchGameState.seconds = 0;
  matchGameState.minutes = 0;
}

function showLevel() {
  const level = document.querySelector('.match-game-moves-container__number-level') as HTMLElement;
  level.textContent = String(matchGameState.level);
}

export function createRandomArr(length: number) {
  const ARR: number[] = [];
  const MIN = 0;
  const MAX = length;
  while (ARR.length < length) {
    const RESULT = Math.floor(Math.random() * (MAX - MIN)) + MIN;
    if (!ARR.includes(RESULT)) {
      ARR.push(RESULT);
    }
  }
  return ARR;
}

function setLocalstorage() {
  localStorage.setItem('cementary', JSON.stringify(matchGameState.results));
}

function showGameOver() {
  const gameOverMessage = new ModalMessage();
  gameOverMessage.drawModalMessage(
    `
    <div class="title-modal-message">Game over</div>
    `
  );
  matchSoundEffect();
  showStartBtn();
}

function showStartBtn() {
  const startGameBtn = document.querySelector('.start-game-btn') as HTMLElement;

  setTimeout(() => {
    startGameBtn.classList.remove('hide');
    clearInfo();
    const level = document.querySelector('.match-game-moves-container__number-level') as HTMLElement;
    level.textContent = '1';
    matchGameState.level = 1;
    matchGameState.results = [];

    clearCards();
  }, 3000);
}

export function clearCards() {
  const cards = document.querySelector('.cards') as HTMLElement;
  cards.innerHTML = '';
}

export function matchSoundEffect() {
  const isSoundEffects: boolean = JSON.parse(localStorage.getItem('isSoundEffects') || '{}');
  const sound = new Audio(CONST.soundGhostSrc);
  sound.volume = 0.2;
  if (isSoundEffects) sound.play();
}
