/* jshint esversion:8 */
let playerScore = 0;
let computerScore = 0;
let currentRound = 0;
let currentWinner;

const controlsButtons = document.querySelectorAll('[data-type]');
const playerCurrentChoice = document.getElementById('player-current-choice');
const computerCurrentChoice = document.getElementById('computer-current-choice');
const newGameBtn = document.getElementById('new-game-btn');
const startBtn = document.getElementById('start-btn');
const nextRoundBtn = document.getElementById('next-round-btn');
const currentRoundContainer = document.getElementById('current-round');
const resultDisplay = document.getElementById('final-result');
const actionsButton = document.querySelector('.btn_start_newgame');
const userInfoBlock = document.querySelector('.btn_next_round_count');

controlsButtons.forEach(showingButtons);
nextRoundBtn.addEventListener('click', nextRound);
startBtn.addEventListener('click', startGame);
newGameBtn.addEventListener('click', newGame);

/**
 * The function gets the value of the data-type attribute from the controlsButtons element.
 * Calls the makeSelection function with this value.
 * Turns on the nextRoundBtn button and calls the controlListElementsDisabled function to disable the control buttons.
 */
function showingButtons(controlsButton) {
    controlsButton.addEventListener('click', function () {
    const controlsWeapon = controlsButton.getAttribute('data-type');
    nextRoundBtn.disabled = false;
    makeSelection(controlsWeapon);
    controlListElementsDisabled(controlsButtons, true);
    });
}

/**
 * Function for moving to the next round.
 * Disables the nextRoundBtn button and enables the control buttons.
 */
function nextRound() {
    nextRoundBtn.disabled = true;
    controlListElementsDisabled(controlsButtons, false);
}

(function () {
    const rulesBtn = document.getElementById('rules-btn');
    const rulesModal = document.getElementById('rules-modal');
    const closeBtn = rulesModal.querySelector('.close-btn');

    /**
     * Adds an event listener to the rulesBtn button.
     * When the rulesBtn button is clicked, it shows the modal window with the rules.
     */
    rulesBtn.addEventListener('click', () => {
    rulesModal.style.display = 'block';
    });

    /**
     * Adds an event listener to the closeBtn button.
     * When the closeBtn button is clicked, it hides the modal window with the rules.
     */
    closeBtn.addEventListener('click', () => {
    rulesModal.style.display = 'none';
    });

    /**
     * Adds an event listener to the window object.
     * If the user clicks outside the modal window, it closes.
     */
    window.addEventListener('click', (event) => {
    if (event.target === rulesModal) {
        rulesModal.style.display = 'none';
    }
    });
})();

/**
 * Game start function.
 * Enables game controls and hides the start and new game buttons.
 */
function startGame() {
    userInfoBlock.classList.remove('flex-end');
    controlElementShowValue(actionsButton, 'none');
    controlElementShowValue(startBtn, 'none');
    controlElementShowValue(nextRoundBtn, 'block');
    nextRound();
}


/**
 * The function of starting a new game.
 * Resets current results, sets player and computer scores to zero,
 * adjusts the visibility of the buttons for the new game and the next round,
 * and resets the current round to zero.
 * Source: https://stackoverflow.com/questions/28744682/the-best-way-to-reset-your-javascript-game-after-gameover-and-how
 */
function newGame() {
    startGame();
    const playerElem = document.querySelector('.player_score');
    const computerElem = document.querySelector('.computer_score');

    controlElementShowValue(newGameBtn, 'none');
    playerCurrentChoice.innerHTML = '';
    computerCurrentChoice.innerHTML = '';
    resultDisplay.innerHTML = '';
    playerScore = 0;
    computerScore = 0;
    currentRound = 0;
    playerElem.textContent = playerScore;
    computerElem.textContent = computerScore;
    currentRoundContainer.innerText = currentRound;
}

/**
 * The function of processing the user's choice in the game.
 * Increments the current round, shows the player's and computer's choices, and determines the winner of the round,
 * updates the player's and computer's scores, and if the maximum round is reached,
 * shows the final score and makes the button for the new game visible.
 */
function makeSelection(userChoice) {
    currentRound = updateScore(currentRoundContainer, currentRound);
    updatePlayerChoice(userChoice, EMOJI_MAP);
    const computerChoice = updateComputerChoice(EMOJI_MAP);
    currentWinner = isWinner(userChoice, computerChoice);
    updateScores(currentWinner);
    if (currentRound === MAX_ROUND) {
    finishGame(playerScore, computerScore);
    setGamesPoints(currentWinner);
    }
}

/**The function disables all buttons in the controlsButtons array and enables the nextRoundBtn button. */
function disableControlButtons(){
    controlsButtons.forEach(
        function(button){
            button.disabled = true;
            nextRoundBtn.disabled = false;
    });  

}

    
/**This function determines the winner in a game between the user and the computer based on their choices. 
 * If the user's choice and the computer's choice are the same, the function returns 'tie'. 
 * If the user's choice beats the computer's choice according to pre-defined conditions (winningConditions), the function returns 'user'. 
 * Otherwise, the function returns 'computer', indicating that the computer has won. */
function isWinner(userChoice, computerChoice){
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
/**This function returns a random element from the array choices. */
function getRandomChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}
/**This function updates the game scores based on the winner. If the winner is the user (winner equals 'user'), it increments the playerScore variable by 1 
 * and updates the text content of an element with the class 'player_score' with the new playerScore value. 
 * If the winner is the computer (winner equals 'computer'), it increments the computerScore variable by 1 
 * and updates the text content of an element with the class 'computer_score' with the new computerScore value. */
function updateScores(winner){
    if(winner==='user'){
        playerScore++;
        document.getElementsByClassName('player_score')[0].textContent = playerScore;
    }
    else if(winner==='computer'){
        computerScore++;
        document.getElementsByClassName('computer_score')[0].textContent = computerScore;
    }
}
/**This function displays the result of a game between a player and a computer based on their scores. 
 * If the player's score equals the computer's score, the function displays "It's a tie!". 
 * If the player's score is greater than the computer's score, it displays "You win!". 
 * If the player's score is less than the computer's score, it displays "You lose!". */
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

