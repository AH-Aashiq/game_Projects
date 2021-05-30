'use strict';
/*
Game RULES

- The game has 2 playes, playing in rounds
- In each turn, a player rolld a dice as many times as he wishes. Each result get added to his Round score
-But, if the player rools a 1, all his ROUND score gets lost, After that, it's the next player's turn
-The player can choose to 'HOLD' which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
-The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying;
init();
document.querySelector('.btn--roll').addEventListener('click', function () {
     if (gamePlaying) {
          //1.Random number
          var dice = Math.floor(Math.random() * 6) + 1;

          //2.Display the result
          var diceDom = document.querySelector('.dice');

          diceDom.style.display = 'block';
          diceDom.src = 'dice-' + dice + '.png';

          //3.Update the round IF the rolled a number was not a 1
          if (dice != 1) {
               roundScore += dice;
               document.querySelector('#current--' + activePlayer).textContent = roundScore;
          } else {
               //Next Player
               nextPlayer();
          }
     }
});

document.querySelector('.btn--hold').addEventListener('click', function () {
     if (gamePlaying) {
          //Add Current score to Global score
          scores[activePlayer] += roundScore;

          //Update the UI
          document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

          // Check if player won the game
          if (scores[activePlayer] >= 100) {
               document.querySelector('#name--' + activePlayer).textContent = 'winner!';
               document.querySelector('.dice').style.display = 'none';
               document.querySelector('.player--' + activePlayer).classList.add('player--winner');
               document.querySelector('.player--' + activePlayer).classList.remove('player--active');
               gamePlaying = false;
          } else {

               //Next player
               nextPlayer();
          }
     }
});

function nextPlayer() {
     //nextPlayer
     activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
     roundScore = 0;

     document.getElementById('current--0').textContent = '0';
     document.getElementById('current--1').textContent = '0';

     document.querySelector('.player--0').classList.toggle('player--active');
     document.querySelector('.player--1').classList.toggle('player--active');

     // document.querySelector('.dice').style.display = 'none';
}
document.querySelector('.btn--new').addEventListener('click', init);

function init() {
     scores = [0, 0];
     roundScore = 0;
     activePlayer = 0;
     gamePlaying = true;

     document.querySelector('.dice').style.display = 'none';

     document.getElementById('score--0').textContent = '0';
     document.getElementById('score--1').textContent = '0';
     document.getElementById('current--0').textContent = '0';
     document.getElementById('current--1').textContent = '0';

     document.getElementById('name--0').textContent = 'Player 1';
     document.getElementById('name--1').textContent = 'player 2';

     document.querySelector('.player--0').classList.remove('player--winner');
     document.querySelector('.player--1').classList.remove('player--winner');

     document.querySelector('.player--0').classList.remove('player--active');
     document.querySelector('.player--1').classList.remove('player--active');
     document.querySelector('.player--0').classList.add('player--active');

}

//Copied From jonas schmedtmann course 