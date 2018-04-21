class MatchGame {
    constructor() {
        this.remaining = 12;
        this.availableCards = ['1','1','2','2','3','3','4','4','5','5','6','6','7','7','8','8','9','9','10','10','11','11','12','12'];
        this.allCards = {};
        this.selectedElements = [];
        this.cardsScreen = document.getElementById('cardsScreen');
        this.startScreen = document.getElementById('startScreen');
        this.cardsRows = document.getElementById('cardsRows');
        this.startButton = document.getElementById('startGameButton');
        this.startButton.addEventListener('click', () => {
            this.startGame();
        });
        this.cardsRows.addEventListener('click', (e) => {
            this.checkCards(e.target);
        });
    }

    shuffleCards() {
        for (let i = 0; i < 4; i++) {
            const row = this.createRow();
            for (let j = 0; j < 6; j++) {
                this.allCards[`id${i}${j}`] = this.availableCards.pop();                
            }
        }
    }

    checkCards(card) {
        if (card.classList.contains('open')) { return; }
        if (this.selectedElements.length < 2) {
            card.classList.add('open');
            card.textContent = this.allCards[card.id];
            this.selectedElements.push(card);
            if (this.selectedElements.length === 2) {
                if (this.allCards[this.selectedElements[0].id] === this.allCards[this.selectedElements[1].id]) {
                    this.selectedElements = [];
                    this.remaining--;
                    if (this.remaining == 0) {
                        alert('Win!');
                    }
                }
            }
        }
        if (this.selectedElements.length === 2) {
            setTimeout(() => { this.resetOpenCards() }, 1000);
        }   
    }

    resetOpenCards() {
        this.selectedElements.forEach((card) => {
            card.classList.remove('open');
            card.textContent = '';
        });
        this.selectedElements = [];
    }

    startGame() {
        this.shuffleCards();
        this.startScreen.classList.remove('screen-active');
        this.cardsScreen.classList.add('screen-active');
        this.createCards();
    }

    createCards() {
        for (let i = 0; i < 4; i++) {
            const row = this.createRow();
            for (let j = 0; j < 6; j++) {
                row.appendChild(this.createCard(`id${i}${j}`));                
            }
            this.cardsRows.appendChild(row);  
        }
    }

    createRow() {
        const row = document.createElement('div');
        row.classList.add('cards-row');
        return row;    
    }

    createCard(value) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.id = value;
        return card;
    }
}

window.addEventListener('load', () => {
    const game = new MatchGame();
});
