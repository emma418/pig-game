'use strict';

const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');

const score1EL = document.getElementById('score--1');

const current0EL = document.getElementById('current--0');

const current1EL = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');

const btnRoll = document.querySelector('.btn--roll');

const btnHold = document.querySelector('.btn--hold');

score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

let scores, currentScore, activityPlayer, playing;

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activityPlayer = 0;
  playing = true;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player1EL.classList.remove('player--active');
  player0EL.classList.add('player-active');
};

init();

const switchPlayer = () => {
  document.getElementById(`current--${activityPlayer}`).textContent = 0;
  currentScore = 0;
  activityPlayer = activityPlayer === 0 ? 1 : 0;

  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activityPlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activityPlayer] += currentScore;

    document.getElementById(`score--${activityPlayer}`).textContent =
      scores[activityPlayer];

    if (scores[activityPlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activityPlayer}`)
        .classList.add('player--winner');
      diceEL.classList.add('hidden');

      document
        .querySelector(`.player--${activityPlayer}`)
        .classList.remove('player--active ');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
