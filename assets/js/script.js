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

controlsButtons.forEach(
    function(button){
        button.disabled = true;
});

// controlsButtons.forEach(
//     function (controlsButtons){
//         controlsButtons.addEventListener('click', function(event){
//           const controlsWeapon = controlsButtons.getAttribute('data-type');
//            makeSelection(controlsWeapon);
//            disableControlButtons();
//             });
//         });

controlsButtons.forEach(showingButtons);

/**The function retrieves the value of the data-type attribute from the controlsButtons element.
Calls the makeSelection function with this value.
Calls the disableControlButtons function */
function showingButtons(controlsButtons){
    controlsButtons.addEventListener('click', function(event){
        const controlsWeapon = controlsButtons.getAttribute('data-type');
        makeSelection(controlsWeapon);
        disableControlButtons();
});
    }

/**The function disables all buttons in the controlsButtons array and enables the nextRoundBtn button. */
function disableControlButtons(){
    controlsButtons.forEach(
        function(button){
            button.disabled = true;
            nextRoundBtn.disabled = false;
    });  

}

nextRoundBtn.addEventListener('click', nextRound);
/**The function iterates over all controlsButtons elements and for each element:
Enables the button (sets disabled to false).
Disables the nextRoundBtn button (sets disabled to true). */
function nextRound(){
    controlsButtons.forEach(
        function(button){
            button.disabled = false;
            nextRoundBtn.disabled = true;
    });  
}

startBtn.addEventListener('click',startGame);
/**The function enables the game control buttons 
 * and hides the start and new game buttons to commence the game and proceed to the next round. */
function startGame(){
    controlsButtons.forEach(
        function(button){
            button.disabled = false;
        });
        startBtn.style.visibility = 'hidden';
        newGameBtn.style.visibility = 'hidden';
        newGameBtn.style.visibility = 'hidden';
        nextRoundBtn.style.visibility = 'visible';
        nextRoundBtn.disabled = false;
}

newGameBtn.addEventListener('click',newGame);
/**The function is used to start a new game. It resets the current results, sets player and computer scores to zero,
 *  adjusts the visibility of buttons for a new game and the next round, and updates the current round to 0. */
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
    newGameBtn.style.visibility = 'hidden';
    nextRoundBtn.style.visibility = 'visible';
    currentRound = 0;
    currentRoundContainer.innerText = currentRound;
}
/**
*This function handles the user's selection in the "rock-paper-scissors-lizard-Spock" game. 
*It increments the current round, displays the player's and computer's choices, determines the winner of the current round, 
*updates the player and computer scores, 
*and if the maximum round is reached, 
*it displays the final result and makes the button for starting a new game visible.
 */
function makeSelection(userChoice){
    currentRound++;
    currentRoundContainer.innerText = currentRound;
    playerCurrentChoice.innerHTML = emojiMap[userChoice];
    const computerChoice = getRandomChoice();
    computerCurrentChoice.innerHTML = emojiMap[computerChoice];
    currentWinner = isWinner(userChoice, computerChoice);
    updateScores(currentWinner);
    if(currentRound===maxRound){
        displayResult(playerScore, computerScore);
        controlsButtons.forEach(
            function(button){
                button.disabled = true;
                newGameBtn.style.visibility = 'visible';
                newGameBtn.disabled = false;
                nextRoundBtn.style.visibility = 'hidden';
        });      
    }
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

