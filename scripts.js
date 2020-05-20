const cards = document.querySelectorAll('.barca-card');

let hasFlipped = false;
let firstCard, secondCard;

function flipCard() {
    this.classList.add('flip');

    if(!hasFlipped) {
        // first click
        hasFlipped = true
        firstCard = this;
    } else {
        // second click
        hasFlipped = false;
        secondCard = this;   
    }
}

function checkMatch() {
    // match the cards
        if(firstCard.dataset.framework === secondCard.dataset.framework) {
            firstCard.removeEventListener("click", flipCard);
            secondCard.removeEventListener("click", flipCard);
        } else {
            setTimeout(() => {
                firstCard.classList.remove('flip')
                secondCard.classList.remove('flip')
            }, 1500)
        }
}

cards.forEach(card => card.addEventListener('click', flipCard));