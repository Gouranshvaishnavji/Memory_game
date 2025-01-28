document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: 'img1', img: 'https://img.freepik.com/premium-vector/vector-illustration-forest-with-car-vector-illustration-forest-with-car_912214-90058.jpg?semt=ais_hybrid' },
        { name: 'img2', img: 'https://img.freepik.com/free-photo/japan-background-digital-art_23-2151546140.jpg' },
        { name: 'img3', img: 'https://img.freepik.com/free-photo/illustration-anime-city_23-2151779669.jpg' },
        { name: 'img4', img: 'https://img.freepik.com/free-photo/japan-background-digital-art_23-2151546124.jpg' },
        { name: 'img5', img: 'https://img.freepik.com/free-photo/japan-background-digital-art_23-2151546189.jpg' },
        { name: 'img1', img: 'https://img.freepik.com/premium-vector/vector-illustration-forest-with-car-vector-illustration-forest-with-car_912214-90058.jpg?semt=ais_hybrid' },
        { name: 'img2', img: 'https://img.freepik.com/free-photo/japan-background-digital-art_23-2151546140.jpg' },
        { name: 'img3', img: 'https://img.freepik.com/free-photo/illustration-anime-city_23-2151779669.jpg' },
        { name: 'img4', img: 'https://img.freepik.com/free-photo/japan-background-digital-art_23-2151546124.jpg' },
        { name: 'img5', img: 'https://img.freepik.com/free-photo/japan-background-digital-art_23-2151546189.jpg' }
    ];

    const startImage = 'https://images.unsplash.com/photo-1607743882420-4412ee605bac?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    const movesDisplay = document.querySelector('#moves');
    const timeDisplay = document.querySelector('#timer');
    const restartBtn = document.querySelector('#restart');
    
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let moveCount = 0;
    let timeElapsed = 0;
    let timer;

    function createBoard() {
        grid.innerHTML = '';
        cardArray.sort(() => 0.5 - Math.random()); // Shuffle the cards

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', startImage);
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }

        // Reset variables
        cardsChosen = [];
        cardsChosenId = [];
        cardsWon = [];
        moveCount = 0;
        timeElapsed = 0;
        movesDisplay.textContent = "0";
        resultDisplay.textContent = "0";
        timeDisplay.textContent = "0 sec";

        // Start timer
        clearInterval(timer);
        timer = setInterval(() => {
            timeElapsed++;
            timeDisplay.textContent = `${timeElapsed} sec`;
        }, 1000);
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (cardsChosenId.includes(cardId) || cardsWon.flat().includes(cardArray[cardId].name)) return;

        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);

        if (cardsChosen.length === 2) {
            moveCount++;
            movesDisplay.textContent = moveCount;
            setTimeout(checkForMatch, 500);
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('img');
        const [optionOneId, optionTwoId] = cardsChosenId;

        if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            setTimeout(() => {
                cards[optionOneId].setAttribute('src', startImage);
                cards[optionTwoId].setAttribute('src', startImage);
            }, 500);
        }

        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;

        if (cardsWon.length === cardArray.length / 2) {
            clearInterval(timer);
            alert(`🎉 You won! Time: ${timeElapsed} sec | Moves: ${moveCount}`);
        }
    }

    restartBtn.addEventListener('click', createBoard); // Restart game when button is clicked

    createBoard(); // Initialize the game
});