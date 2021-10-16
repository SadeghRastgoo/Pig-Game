'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.querySelector('#score--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

let currentScore, playing, scores;
let activePlayer = 0;

function resetGame() {
  scores = [0, 0];
  playing = true;
  checkActivePlayer();
  diceEl.classList.add('hidden');
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  player0El.classList.add('player--active');

  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
}
resetGame();

function switchPlayer() {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
}

function checkActivePlayer() {
  if (player0El.classList.contains('player--active')) {
    activePlayer = 0;
  } else if (player1El.classList.contains('player--active')) {
    activePlayer = 1;
  }
}
function pushCurrentToText() {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
}

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      checkActivePlayer();
      pushCurrentToText();
    } else {
      currentScore = 0;
      pushCurrentToText();
      activePlayer = activePlayer === 0 ? 1 : 0;
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    checkActivePlayer();
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', resetGame);
