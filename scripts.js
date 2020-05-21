const cards = document.querySelectorAll('.barca-card');

let hasFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if(lockBoard) return;
    

    this.classList.add('flip');

    if(!hasFlipped) {
        // first click
        hasFlipped = true
        firstCard = this;

        return;
    }
    // second click
    hasFlipped = false;
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
}

function unflipCards() {
    lockBoard = true

    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')
        lockBoard = false
    }, 1500)
}

cards.forEach(card => card.addEventListener('click', flipCard));