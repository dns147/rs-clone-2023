let hasFlippedCard = false;
let lockBoard = false;
let firstCard: HTMLElement | null;
let secondCard: HTMLElement | null;
let index = 0;
const matched: HTMLElement[] = [];
let interval: NodeJS.Timer;
let seconds = 0;
let minutes = 0;

// переворачивание карты

export function flipCard(card: HTMLElement) {
  if (lockBoard) return;
  if (card === firstCard) return;

  card.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = card;
    firstCard?.classList.add('no-click');
    countClicks();
    return;
  }

  secondCard = card;
  lockBoard = true;

  checkForMatch(secondCard);
  countClicks();
}

// поиск пары

function checkForMatch(card: HTMLElement) {
  secondCard?.classList.add('no-click');
  const isMatch = card.dataset.hero === firstCard?.dataset.hero;
  isMatch ? disableCards() : unflipCards();
  if (isMatch === true) {
    matched.push(card);
  }
}

// запрет клика по совпавшей паре

function disableCards() {
  firstCard?.classList.add('no-click');
  secondCard?.classList.add('no-click');
  resetBoard();
}

// переворачивание несовпавшей пары

function unflipCards() {
  setTimeout(() => {
    firstCard?.classList.remove('flip');
    secondCard?.classList.remove('flip');
    firstCard?.classList.remove('no-click');
    secondCard?.classList.remove('no-click');
    resetBoard();
  }, 1200);
}

// сброс
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// счетчик шагов

function countClicks() {
  index = index + 1;
  showMoves(index);
  if (index === 1) {
    timer();
  }
  gameOver();
}

export function showMoves(value: number) {
  const moves = document.querySelector('.match-game-moves-container__number') as HTMLElement;
  moves.textContent = String(value);
}

// timer

function timer() {
  const timeContainer = document.querySelector('.match-game-time-container__number') as HTMLElement;
  clearInterval(interval);
  timeContainer.textContent = '00:00';
  interval = setInterval(() => {
    seconds++;
    if (seconds < 10 && minutes < 10) {
      timeContainer.textContent = `0${minutes}:0${seconds}`;
    } else if (minutes < 10 && seconds >= 10) {
      timeContainer.textContent = `0${minutes}:${seconds}`;
    } else if (minutes >= 10 && seconds < 10) {
      timeContainer.textContent = `${minutes}:0${seconds}`;
    } else if (minutes >= 10 && seconds >= 10) {
      timeContainer.textContent = `${minutes}:${seconds}`;
    }
    if (seconds >= 59) {
      seconds = -1;
      minutes++;
    }
  }, 1000);
}

function gameOver() {
  if (matched.length === 8) {
    clearInterval(interval);
  }
}

type ElemParams = {
  tagName: string | HTMLElement;
  className: string;
  textContent?: string;
};

export function createElem({ tagName, className, textContent }: ElemParams): HTMLElement {
  const createdElem: HTMLElement = typeof tagName === 'string' ? document.createElement(tagName) : tagName;

  if (className) {
    createdElem.className = className;
  }

  if (textContent) {
    createdElem.textContent = textContent;
  }

  return createdElem;
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
