const controlsButtons = document.querySelectorAll('[data-type]');
let playerScore = 0;
let computerScore = 0;

controlsButtons.forEach(
    function (controlsButtons){
        controlsButtons.addEventListener('click', function(event){
            const controlsWeapon = controlsButtons.getAttribute('data-type');
            makeSelection(controlsWeapon);
            });
        });
function makeSelection(selection) {
console.log(selection);}

function makeSelection(userChoice){
    console.log('User choice:', userChoice);
    const computerChoice = getRandomChoice();
    console.log('Computer choice:', computerChoice);
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
        return 'tie';
    }
    else if (winningConditions[userChoice].includes(computerChoice)) {
        return 'user';
    }
    else {
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

function displayResult(userChoice, computerChoice, winner){
    const resultDisplay = document.querySelector('.resultDisplay');
    if(winner === 'tie'){
        resultDisplay.textContent = `It's a tie! Both chose ${userChoice}.`;
    }
    else if(winner === 'user'){
        resultDisplay.textContent = `You win! ${userChoice} beats ${computerChoice}.`;
    }
    else{
        resultDisplay.textContent = `You lose! ${computerChoice} beats ${userChoice}.`;
    }

}
