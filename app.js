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

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('.grid');
    const resultDisplay = document.querySelector('#result');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];

    const startImage = 'https://images.unsplash.com/photo-1607743882420-4412ee605bac?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    function checkForMatch() {
        const cards = document.querySelectorAll('img');
        const [optionOneId, optionTwoId] = cardsChosenId;

        if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
            // Keep images flipped (do nothing)
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            // Flip cards back if they don’t match
            setTimeout(() => {
                cards[optionOneId].setAttribute('src', startImage);
                cards[optionTwoId].setAttribute('src', startImage);
            }, 500);
        }

        cardsChosen = [];
        cardsChosenId = [];
        resultDisplay.textContent = cardsWon.length;

        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = '🎉 You won!';
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (cardsChosenId.includes(cardId) || cardsWon.flat().includes(cardArray[cardId].name)) return; // Prevent flipping matched cards again

        cardsChosen.push(cardArray[cardId].name);
        cardsChosenId.push(cardId);
        this.setAttribute('src', cardArray[cardId].img);

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    function createBoard() {
        grid.innerHTML = '';
        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', startImage); // Default image
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    createBoard();
});