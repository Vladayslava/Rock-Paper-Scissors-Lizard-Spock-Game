const CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
const EMOJI_MAP = {
  rock: '👊',
  paper: '✋',
  scissors: '✌️',
  lizard: '🦎',
  spock: '🖖',
};
const WINNING_CONDITIONS = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['scissors', 'rock'],
};
const MAX_ROUND = 10;
const WINNER_ROLES = {
  user: 'user',
  computer: 'computer',
  tie: 'tie',
};
const WINNER_MESSAGE = {
  user: 'You win!',
  computer: 'You lose!',
  tie: "It's a tie!",
};