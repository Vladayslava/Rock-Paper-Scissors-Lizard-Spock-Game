const controlsButtons = document.querySelectorAll('[data-type]');

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



