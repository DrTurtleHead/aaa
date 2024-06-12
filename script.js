document.addEventListener('DOMContentLoaded', () => {
    const cardsArray = [
        { name: 'A', value: 'A' },
        { name: 'B', value: 'B' },
        { name: 'C', value: 'C' },
        { name: 'D', value: 'D' },
        { name: 'E', value: 'E' },
        { name: 'F', value: 'F' },
        { name: 'G', value: 'G' },
        { name: 'H', value: 'H' },
        { name: 'A', value: 'A' },
        { name: 'B', value: 'B' },
        { name: 'C', value: 'C' },
        { name: 'D', value: 'D' },
        { name: 'E', value: 'E' },
        { name: 'F', value: 'F' },
        { name: 'G', value: 'G' },
        { name: 'H', value: 'H' }
    ];

    const gameBoard = document.getElementById('game-board');
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function createBoard() {
        shuffle(cardsArray);
        cardsArray.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.name = card.name;
            cardElement.addEventListener('click', flipCard);
            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');
            cardElement.appendChild(cardContent);
            gameBoard.appendChild(cardElement);
        });
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');
        this.querySelector('.card-content').textContent = this.dataset.name;

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        if (firstCard.dataset.name === secondCard.dataset.name) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        firstCard.classList.add('matched');
        secondCard.classList.add('matched');

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            firstCard.querySelector('.card-content').textContent = '';
            secondCard.querySelector('.card-content').textContent = '';

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    createBoard();
});
