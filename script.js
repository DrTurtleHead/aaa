// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        { name: 'A', img: 'A' },
        { name: 'A', img: 'A' },
        { name: 'B', img: 'B' },
        { name: 'B', img: 'B' },
        { name: 'C', img: 'C' },
        { name: 'C', img: 'C' },
        { name: 'D', img: 'D' },
        { name: 'D', img: 'D' },
        { name: 'E', img: 'E' },
        { name: 'E', img: 'E' },
        { name: 'F', img: 'F' },
        { name: 'F', img: 'F' }
    ];

    cardsArray.sort(() => 0.5 - Math.random());

    const gameBoard = document.getElementById('gameBoard');
    const restartButton = document.getElementById('restartButton');
    let firstCard, secondCard;
    let lockBoard = false;
    let pairsMatched = 0;

    function createBoard() {
        cardsArray.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.name = item.name;

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            cardFront.innerText = item.img;

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');

            card.appendChild(cardFront);
            card.appendChild(cardBack);
            card.addEventListener('click', flipCard);
            gameBoard.appendChild(card);
        });
    }

    function flipCard() {
        if (lockBoard || this === firstCard) return;

        this.classList.add('flip');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.dataset.name === secondCard.dataset.name;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
        pairsMatched++;

        if (pairsMatched === cardsArray.length / 2) {
            setTimeout(() => alert('恭喜，你贏了！'), 500);
        }
    }

    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    function restartGame() {
        gameBoard.innerHTML = '';
        pairsMatched = 0;
        resetBoard();
        cardsArray.sort(() => 0.5 - Math.random());
        createBoard();
    }

    restartButton.addEventListener('click', restartGame);

    createBoard();
});
