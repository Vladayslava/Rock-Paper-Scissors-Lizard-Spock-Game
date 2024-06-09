/* jshint esversion:8 */
let playerScore = 0;
let computerScore = 0;
let currentWinner;
let currentRound = 0;
const maxRound = 10;
const controlsButtons = document.querySelectorAll('[data-type]');
const playerCurrentChoice = document.getElementById('player-current-choice');
const computerCurrentChoice = document.getElementById('computer-current-choice');
const newGameBtn = document.getElementById('new-game-btn');
const startBtn = document.getElementById('start-btn');
const nextRoundBtn = document.getElementById('next-round-btn');
const currentRoundContainer = document.getElementById('current-round');
const resultDisplay = document.getElementById('final-result');
const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
newGameBtn.style.display = 'none';
nextRoundBtn.style.display = 'none';
const emojiMap = {
    rock: '👊',
    paper: '✋',
    scissors: '✌️',
    lizard: '🦎',
    spock: '🖖'
}
const winningConditions = {
    rock: ['scissors','lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['scissors', 'rock']
};


// переписать
controlsButtons.forEach(
      function (controlsButtons){
          controlsButtons.addEventListener('click', function(event){
            const controlsWeapon = controlsButtons.getAttribute('data-type');
             makeSelection(controlsWeapon);
             disableControlButtons();
              });
          });

function disableControlButtons(){
    controlsButtons.forEach(
        function(button){
            button.disabled = true;
            nextRoundBtn.disabled = false;
    });  

}

nextRoundBtn.addEventListener('click', nextRound)

function nextRound(){
    controlsButtons.forEach(
        function(button){
            button.disabled = false;
            nextRoundBtn.disabled = true;
    });  
}

startBtn.addEventListener('click',startGame);

function startGame(){
    controlsButtons.forEach(
        function(button){
            button.disabled = false;
        });
        startBtn.style.display = 'none';
        newGameBtn.style.display = 'none';
        newGameBtn.style.display = 'none';
        nextRoundBtn.style.display = 'block';
        nextRoundBtn.disabled = false;
}

newGameBtn.addEventListener('click',newGame)

function newGame(){
    controlsButtons.forEach(
          function(buttons){
              buttons.disabled = false;
          });
    playerCurrentChoice.innerHTML = '';
    computerCurrentChoice.innerHTML = '';
    playerScore = 0;
    computerScore = 0;
    document.getElementsByClassName('player_score')[0].textContent = playerScore;
    document.getElementsByClassName('computer_score')[0].textContent = computerScore;
    resultDisplay.innerHTML = '';
    newGameBtn.style.display = 'none';
    nextRoundBtn.style.display = 'block';
    currentRound = 0;
    currentRoundContainer.innerText = currentRound;
}


/**
 * 
 */
function makeSelection(userChoice){
    currentRound++;
    currentRoundContainer.innerText = currentRound;
    console.log(currentRound);
    console.log(userChoice);
    playerCurrentChoice.innerHTML = emojiMap[userChoice];
    const computerChoice = getRandomChoice();
    console.log(computerChoice);
    computerCurrentChoice.innerHTML = emojiMap[computerChoice];
    currentWinner = isWinner(userChoice, computerChoice);
    updateScores(currentWinner);
    if(currentRound===maxRound){
        displayResult(playerScore, computerScore);
        controlsButtons.forEach(
            function(button){
                button.disabled = true;
                newGameBtn.style.display = 'block';
                newGameBtn.disabled = false;
                nextRoundBtn.style.display = 'none';
        });      
        console.log('button.disabled = true')
    }

}

function isWinner(userChoice, computerChoice){


    if(userChoice===computerChoice){
        console.log('tie');
        return 'tie';
    }
    else if (winningConditions[userChoice].includes(computerChoice)) {
        console.log('user');
        return 'user';
    }
    else {
        console.log('computer');
        return 'computer';
    }
}

function getRandomChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function updateScores(winner){
    if(winner==='user'){
        playerScore++;
        document.getElementsByClassName('player_score')[0].textContent = playerScore;
        console.log(document.getElementsByClassName('player_score')[0].textContent);
    }
    else if(winner==='computer'){
        computerScore++;
        document.getElementsByClassName('computer_score')[0].textContent = computerScore;
        console.log(document.getElementsByClassName('computer_score')[0].textContent);
    }
}

function displayResult(playerScore, computerScore){
    if(playerScore === computerScore){
        resultDisplay.textContent = `It's a tie!`;
    }
    else if(playerScore > computerScore){
        resultDisplay.textContent = `You win!`;
    }
    else{
        resultDisplay.textContent = `You lose!`;
    }

}

