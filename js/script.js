'use strict';

// variables
let Totals = [
  document.getElementById('score--0'),
  document.getElementById('score--1'),
];
let Currs = [
  document.getElementById('current--0'),
  document.getElementById('current--1'),
];

const players = document.querySelectorAll('.player');
const dice = document.querySelector('.dice');

const winSelect = document.querySelector('#win');

let diceNumber;
let isPlaying;
let winScore = 100;

// functions
const initGame = function () {
  Totals[0].textContent = Totals[1].textContent = 0;
  Currs[0].textContent = Currs[1].textContent = 0;
  players[0].classList.add('player--active');
  dice.classList.add('hide');
  isPlaying = true;
  players[0].classList.remove('player--winner');
  players[1].classList.remove('player--winner');
};

const playerSwitch = function () {
  if (players[0].classList.contains('player--active')) {
    players[0].classList.remove('player--active');
    players[1].classList.add('player--active');
  } else {
    players[1].classList.remove('player--active');
    players[0].classList.add('player--active');
  }
};

const activeWho = () =>
  players[0].classList.contains('player--active') ? 0 : 1;

const rollDice = function () {
  if (isPlaying) {
    diceNumber = Math.trunc(Math.random() * 6) + 1;
    dice.src = `./images/dice-${diceNumber}.png`;
    dice.classList.remove('hide');
    let i = activeWho();
    let currScore = Number(Currs[i].textContent);
    if (diceNumber > 1) {
      currScore += diceNumber;
    } else {
      currScore = 0;
      playerSwitch();
    }
    Currs[i].textContent = currScore;
  }
};

const hold = function () {
  if (isPlaying) {
    let i = activeWho();
    let totalScore = Number(Totals[i].textContent);
    totalScore += Number(Currs[i].textContent);
    Totals[i].textContent = totalScore;
    Currs[i].textContent = 0;
    if (totalScore >= winScore) {
      isPlaying = false;
      dice.classList.add('hide');
      players[i].classList.add('player--winner');
      players[i].classList.remove('player--active');
    } else playerSwitch();
  }
};

// function calls and event handlers
winSelect.addEventListener('change', function () {
  initGame();
  winScore = Number(this.value);
});

initGame();

document.querySelector('.btn--roll').addEventListener('click', rollDice);
document.querySelector('.btn--hold').addEventListener('click', hold);
document.querySelector('.btn--new').addEventListener('click', function () {
  initGame();
  winSelect.value = 100;
  winScore = 100;
});
