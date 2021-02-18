import {barcaPlayers} from './data.js';

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


// Creates and returns a array of divs with two img tags in each div
function barcaCards (players) {
    const newDivs = [];

    players.forEach(player => {
        const createDiv = () => {
            const div = document.createElement('div');
            div.classList.add('barca-card');
            div.setAttribute('data-player', `${player.name}`);
            div.addEventListener('click', flipCard)
            
            // Image tag for player
            const playerImgTag = document.createElement('img');
            playerImgTag.classList.add('front-side');
            playerImgTag.setAttribute('src', player.playerImg)
            playerImgTag.setAttribute('alt', player.name)
            div.appendChild(playerImgTag)

            // Image tag for the crest
            const crestImgTag = document.createElement('img');
            crestImgTag.classList.add('back-side');
            crestImgTag.setAttribute('src', player.crestImg);
            crestImgTag.setAttribute('alt', 'Barca-logo');
            div.appendChild(crestImgTag)
            
            newDivs.push(div)
        }
        createDiv();
        createDiv();
    })
    return newDivs
}

// set the order to a random # between 0 - the amount of cards
function shuffle(cards) {
    const numOfCards = cards.length;
    cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * numOfCards);
        card.style.order = randomPos
    })
}

// As soon as the page refreshes the startGame function is execute with the function in the first set of parenthesis
// and the second empty set executes it on its own

const gameSection = document.getElementById('game'); // save the <section> in a variable and append to it
(function startGame() {
    // when executing the barcaCards function you get an array of divs
    const arrOfDivs = barcaCards(barcaPlayers);
    // map thru every div and append it to the <section> 
    arrOfDivs.map(div => gameSection.appendChild(div));

    shuffle(arrOfDivs);

})()

// whenever clicked run the 'flipCard' function to begin/continue the game
const cards = barcaCards(barcaPlayers);
cards.forEach(card => {
    card.addEventListener('click', flipCard)
});
