let cardsEl = document.querySelector('.cards-el');
let messageEl = document.querySelector('.message-el');
let sumEl = document.querySelector('.sum-el');
let dealerCardsEl = document.querySelector('.dealer-cards');
let dealerSumEl = document.querySelector('.dealer-sum');
let winnerEl = document.querySelector('.winner');
let hasBlackJack = false;
let isAlive = false;
let cards = [];
let dealerCards = [];
let sum = 0;
let dealerSum = 0;
let bet = 0;

let player = {
  name: "",
  amount: 0
};

// Initialize player
player.name = prompt('Enter your name: ');
player.amount = +prompt('Enter your starting amount: ');
if (player.name && player.amount) {
  winnerEl.textContent = player.name + ": $" + player.amount;
}

function startGame() {
  isAlive = true;
  hasBlackJack = false;

  // Initialize player's cards
  let card1 = getRandom();
  let card2 = getRandom();
  cards = [card1, card2];
  sum = card1 + card2;

  // Initialize dealer's cards
  dealerCards = [getRandom()];
  dealerSum = dealerCards[0];

  if (player.amount > 0) {
    bet = +prompt("Enter your bet amount: ");
    if (bet > player.amount) {
      messageEl.textContent = "You cannot bet more than you have!";
      isAlive = false;
    } else {
      playGame();
    }
  } else {
    winnerEl.textContent = player.name + ": You have no money.";
  }
}

function getRandom() {
  let card = Math.floor(Math.random() * 13) + 1;
  if (card > 10) {
    return 10; // J, Q, K are worth 10
  } else if (card === 1) {
    return 11; // Ace initially worth 11
  }
  return card;
}

function playGame() {
  // Update player's cards
  cardsEl.textContent = "Cards: " + cards.join(" ");
  sumEl.textContent = "Sum: " + sum;

  // Update dealer's cards
  dealerCardsEl.textContent = "Dealer Cards: " + dealerCards.join(" ");
  dealerSumEl.textContent = "Dealer Sum: " + dealerSum;

  // Player's outcome
  if (sum === 21) {
    message = "You've got Blackjack!";
    hasBlackJack = true;
    player.amount += bet * 2;
  } else if (sum > 21) {
    message = "You went over 21! Dealer wins.";
    isAlive = false;
    player.amount -= bet;
  } else {
    message = "Draw a new card or let the dealer play.";
  }
  messageEl.textContent = message;
  winnerEl.textContent = player.name + ": $" + player.amount;
}

function newCard() {
  if (isAlive && !hasBlackJack) {
    let card = getRandom();
    cards.push(card);
    sum += card;
    playGame();
  }
}

function dealerPlay() {
  // Dealer keeps drawing cards until sum is >= 17
  while (dealerSum < 17) {
    let card = getRandom();
    dealerCards.push(card);
    dealerSum += card;
  }

  // Update dealer's cards after the dealer finishes
  dealerCardsEl.textContent = "Dealer Cards: " + dealerCards.join(" ");
  dealerSumEl.textContent = "Dealer Sum: " + dealerSum;

  // Compare player and dealer sums to determine the winner
  if (dealerSum > 21 || dealerSum < sum) {
    message = "You win!";
    player.amount += bet * 2;
  } else if (dealerSum === sum) {
    message = "It's a draw!";
  } else {
    message = "Dealer wins.";
    player.amount -= bet;
  }

  isAlive = false;
  winnerEl.textContent = player.name + ": $" + player.amount;
  messageEl.textContent = message;
}

function resetGame() {
  player.amount = 100;
  cards = [];
  dealerCards = [];
  sum = 0;
  dealerSum = 0;
  cardsEl.textContent = "Cards: ";
  sumEl.textContent = "Sum: ";
  dealerCardsEl.textContent = "Dealer Cards: ";
  dealerSumEl.textContent = "Dealer Sum: ";
  messageEl.textContent = "Want to play a game?";
  winnerEl.textContent = player.name + ": $" + player.amount;
}
