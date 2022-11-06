'use strict';
const activePlayerel = document.querySelectorAll('.turn-player');
const score0el = document.querySelector('#score-0');
const score1el = document.getElementById('score-1'); // select element by ID
const current0el = document.getElementById('current-0');
const current1el = document.getElementById('current-1');
const diceEL = document.querySelectorAll('.dice');
const btnNew = document.querySelector('.btn-new');
const btnRow = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');
let score, currentScore, activePlayer, playing; // khai baos trong func khoong the dung ngoai func

const init = function () {
  //functiton starting.
  diceEL[1].classList.add('hidden');
  diceEL[0].classList.add('hidden');
  current0el.textContent = 0;
  current1el.textContent = 0;
  score1el.textContent = 0;
  score0el.textContent = 0;
  score = [0, 0]; // khai baos trong func khoong the dung ngoai func
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  activePlayerel[0].classList.remove('winner');
  activePlayerel[1].classList.remove('winner');
  activePlayerel[0].classList.remove('winner');
  activePlayerel[1].classList.remove('active');
};
init();
const switchPlayer = function () {
  document.getElementById(`current-${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  for (let a = 0; a < activePlayerel.length; a++) {
    activePlayerel[a].classList.toggle('active'); //thêm class khi chưa có và xóa class khi đang có
  }
};

// starting conditions
for (let i = 0; i < diceEL.length; i++) diceEL[i].classList.add('hidden');
//Rolling dice functionality
const funcroll = function () {
  //1. generating a radom dice roll
  if (playing === true) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.display dice
    diceEL[activePlayer].classList.remove('hidden');
    diceEL[activePlayer].src = `dice-${dice}.png`;
    //3.check rolled 1: if true, switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current-${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
};
console.log(btnRow);
btnRow.addEventListener('click', funcroll);
const funchold = function () {
  if (playing) {
    //add current score to active player's score
    score[activePlayer] += currentScore;
    //score[1]=score[1]+ currentScore;
    document.getElementById(`score-${activePlayer}`).textContent =
      score[activePlayer];
    //1.check if player's score is >=100
    if (score[activePlayer] >= 100) {
      //finish gmame
      playing = false;
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.add('winner');
      console.log(document.querySelector(`.player-${activePlayer}-panel`));
      document
        .querySelector(`.player-${activePlayer}-panel`)
        .classList.remove('active');
    }

    //switch to next player
    switchPlayer();
  }
};
btnHold.addEventListener('click', funchold);

btnNew.addEventListener('click', init);
