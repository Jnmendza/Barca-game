// const PORT = process.env.PORT || 5000;
const cards = document.querySelectorAll('.barca-card');

// helps keep track of the first and second card
let hasFlipped = false;
// locks the board after the second card has been clicked on
let lockBoard = false;
// variables set to null 
let firstCard, secondCard;

function flipCard() {
    // 'this' is the element that fired the event -- the card being clicked on.

    // if true then do nothing
    if(lockBoard) return;
    // if the card selected is the firstCard ...do nothing!
    if(this === firstCard) return;

    // add class name 'flip' to the selected element (card)
    this.classList.add('flip');
    // if false
    if(!hasFlipped) {
        // first time user has clicked on the card. Must update the hasFlipped to true
        hasFlipped = true
        // set the variable firstCard to the element clicked
        firstCard = this;
        // if true then return stops here
        return;
    }
    // if true the element selected must be the second and final card. Save in variable
    secondCard = this;   
    // check if both cards match by running the checkMatch function
    checkMatch()
}

// match the cards
function checkMatch() {
    // dataset allows u to access the data-* attribute u named 'player' (data-player='henry')
    const isMatch = firstCard.dataset.player === secondCard.dataset.player
    // if there is a match run disabledCards to hold their position
    //... if there isn't a match run flipBack which flips the cards back to its original position
    isMatch ? disabledCards() : flipBack()
}

function disabledCards() {
    // remove the functionality of the matching cards by removing the event listener
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    // reset the board and continue playing the game
    resetBoard()
}

function flipBack() {
    // set boolean to true to lock the cards to assure no other cards can be selected
    lockBoard = true
    // set timeout to allow the second card to be shown to the user
    setTimeout(() => {
        // remove class 'flip' from both cards
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
    // reset the board and continue playing the game
        resetBoard()
    }, 1500);
}

// Reset the game board and continue the game
function resetBoard() {
    // reset the booleans to false
    [hasFlipped, lockBoard] = [false, false]
    // set the variables back to null
    [firstCard, secondCard] = [null, null]
}

// Shuffle the order of the barca cards
(function shuffle() {
    cards.forEach(card => {
        // save random number in a variable
        const randomPos = Math.floor(Math.random() *12);
        // order property allows u to set order of elements
        card.style.order = randomPos
    })
})()

// whenever clicked run the 'flipCard' function to begin/continue the game
cards.forEach(card => card.addEventListener('click', flipCard));