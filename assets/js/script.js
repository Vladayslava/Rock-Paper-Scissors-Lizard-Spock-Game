const controlsButtons = document.querySelectorAll('[data-type]');
const maxRound = 10;
let playerScore = 0;
let computerScore = 0;
let currentWinner;
let currentRound = 0;
const playerCurrentChoice = document.getElementById('player-current-choice');
const computerCurrentChoice = document.getElementById('computer-current-choice');
const newGameBtn = document.getElementById('new-game-btn');
const startBtn = document.getElementById('start-btn');
const nextRoundBtn = document.getElementById('next-round-btn');
const emojiMap = {
    rock: '👊',
    paper: '✋',
    scissors: '✌️',
    lizard: '🦎',
    spock: '🖖'
}


controlsButtons.forEach(
    function (controlsButtons){
        controlsButtons.addEventListener('click', function(event){
            const controlsWeapon = controlsButtons.getAttribute('data-type');
            makeSelection(controlsWeapon);
            });
        });
function makeSelection(selection) {
console.log(selection);}

controlsButtons.forEach(
    function(button){
        button.disabled = true;
    });
nextRoundBtn.disabled = true;

startBtn.addEventListener('click',
    function(){
        controlsButtons.forEach(
            function(button){
                button.disabled = false;
            });
            startBtn.disabled = true;
    });
if(currentRound===maxRound){
    controlsButtons.forEach(
        function(buttons){
            button.disabled = true;
    });      
        nextRoundBtn.disabled = false;
}

nextRoundBtn.addEventListener('click',
    function(){
        playerCurrentChoice.innerHTML = '';
        computerCurrentChoice.innerHTML = '';
        nextRoundBtn.disabled = true;
        controlsButtons.forEach(
            function(buttons){
                buttons.disabled = false;
            })
    })

function makeSelection(userChoice){
    currentRound++;
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
    }

}

function isWinner(userChoice, computerChoice){

    const winningConditions = {
        rock: ['scissors','lizard'],
        paper: ['rock', 'spock'],
        scissors: ['paper', 'lizard'],
        lizard: ['spock', 'paper'],
        spock: ['scissors', 'rock']
    };
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
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
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
    const resultDisplay = document.getElementById('final-result');
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

