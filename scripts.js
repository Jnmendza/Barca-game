const cards = document.querySelectorAll('.barca-card');

let hasFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlipped) {
        // first click
        hasFlipped = true
        firstCard = this;

        return;
    }
    // second click
    secondCard = this;   

    checkMatch()
}

function checkMatch() {
    // match the cards
    const isMatch = firstCard.dataset.framework === secondCard.dataset.framework
    isMatch ? disabledCards() : unflipCards()
}

function disabledCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard()
}

function unflipCards() {
    lockBoard = true

    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard()
    }, 1500);
}

function resetBoard() {
    [hasFlipped, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}



cards.forEach(card => card.addEventListener('click', flipCard));