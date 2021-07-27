'use strict';

let randomNumber; //random number
let score = 0; //current score
let totalScore0 = 0; //total score player 1
let totalScore1 = 0; //total score player 2
let player = 0;
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const rollBtn = document.querySelector('.btn--roll'); //roll button
const diceImg = document.querySelector('.dice'); // dice image
const newGame = document.querySelector('.btn--new'); //new game button
const player0totalScore = document.querySelector(`#score--0`); //player 1 total score
const player1totalScore = document.querySelector(`#score--1`); //player 2 total score
const currScorePlayer0 = document.querySelector(`#current--0`); //current score of player 1
const currScorePlayer1 = document.querySelector(`#current--1`); //current score of player 2
const holdBtn = document.querySelector(`.btn--hold`); //hold button

// starting conditions
player0totalScore.textContent = totalScore0;
player1totalScore.textContent = totalScore1;
diceImg.style.display = 'none';

const randomNumberGen = () => {
  randomNumber = Math.floor(Math.random() * 6 + 1);
  console.log(randomNumber);
};

const checkWinner = () => {
  if (totalScore1 >= 20 || totalScore0 >= 20) {
    console.log('player has won');
    document
      .querySelector(`.player--${player}`)
      .classList.add('player--winner');
    rollBtn.style.display = 'none';
    holdBtn.style.display = 'none';
    diceImg.style.display = 'none';
  }
};

const changePlayer = () => {
  player === 0 ? (totalScore0 += score) : (totalScore1 += score);
  checkWinner();
  score = 0;
  document.querySelector(`#current--${player}`).textContent = score;
  document.getElementById(`score--${player}`).textContent =
    player === 0 ? totalScore0 : totalScore1;
  document
    .querySelector(`.player--${player}`)
    .classList.remove('player--active');

  player = player === 0 ? 1 : 0;
  document.querySelector(`.player--${player}`).classList.add('player--active');
};

const rollDice = () => {
  randomNumberGen();
  diceImg.style.display = 'block';
  diceImg.setAttribute('src', `./dice-${randomNumber}.png`);
  if (randomNumber === 1) {
    score = 0;
    changePlayer();
  } else {
    score += randomNumber;
    document.getElementById(`current--${player}`).textContent = score;
  }
};

const reset = () => {
  totalScore0 = 0;
  totalScore1 = 0;
  score = 0;

  player = 0;
  currScorePlayer0.textContent = 0;
  currScorePlayer1.textContent = 0;
  player0totalScore.textContent = 0;
  player1totalScore.textContent = 0;
  diceImg.style.display = 'none';
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  rollBtn.style.display = 'block';
  holdBtn.style.display = 'block';

  player1.classList.remove('player--active');
  player0.classList.add('player--active');
};

rollBtn.addEventListener('click', rollDice);
newGame.addEventListener('click', reset);
holdBtn.addEventListener('click', changePlayer);
