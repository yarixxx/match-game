const ALL_CARDS = [
'event_seat','event_seat',
'pets','pets',
'settings_input_hdmi','settings_input_hdmi',
'settings_input_svideo','settings_input_svideo',
'settings_bluetooth','settings_bluetooth',
'power','power',
'dvr','dvr',
'nfc','nfc',
'usb','usb',
'highlight','highlight',
'network_wifi','network_wifi',
'sd_storage','sd_storage'];

class Card {
    constructor(index, value, callback) {
        this.index = index;
        this.value = value;
        this.isOpen = false;
        this.element = document.createElement('div');
        this.element.classList.add('card');
        this.element.id = `i${index}`;
        this.element.innerHTML = '<i class="material-icons">help</i>';
        this.element.addEventListener('click', () => {
            callback(this);
        });
    }

    open() {
        this.isOpen = true;
        this.element.classList.add('open');
        this.element.innerHTML = `<i class="material-icons">${this.value}</i>`;
    }

    close() {
        this.isOpen = false;
        this.element.classList.remove('open');
        this.element.innerHTML = '<i class="material-icons">help</i>';
    }
}

class MatchGame {
    constructor() {
        this.allCards = [];
        this.remaining = 12;
        this.availableCards = [];
        this.selectedCards = [];
        this.cardsScreen = document.getElementById('cardsScreen');
        this.startScreen = document.getElementById('startScreen');
        this.cardsRows = document.getElementById('cardsRows');
        this.startButton = document.getElementById('startGameButton');
        this.startButton.addEventListener('click', () => {
            this.startGame();
        });
    }

    initializeCards() {
        ALL_CARDS.forEach((value, i) => {
            const card = new Card(i, value, (card) => {
                this.checkCard(card);
            });
            this.allCards.push(card);
            this.cardsRows.appendChild(card.element);
        });
        this.shuffleCards();
    }

    shuffleCards() {}

    getCardIndex(element) {
        if (element && element.id) {
            const pair = element.id.split('i');
            if (pair.length == 2) {
                return pair[1];
            }
        }
        throw Error(`Invalid element id '${element.id}'`);
    }

    checkCard(card) {
        if (card.isOpen) { return }

        if (this.selectedCards.length === 0) {
            card.open();
            this.selectedCards.push(card);
            return;
        }
        if (this.selectedCards.length === 1) {
            card.open();
            this.selectedCards.push(card);
        }

        if (this.selectedCards[0].value === this.selectedCards[1].value) {
            this.selectedCards = [];
            this.remaining--;
            if (this.remaining == 0) {
                alert('Win!');
            }
        }
        if (this.selectedCards.length === 2) {
            setTimeout(() => {
                this.resetOpenCards()
            }, 1000);
        }   
    }

    resetOpenCards() {
        this.selectedCards.forEach((card) => {
            card.close();
        });
        this.selectedCards = [];
    }

    startGame() {
        this.initializeCards();
        this.shuffleCards();
        this.startScreen.classList.remove('screen-active');
        this.cardsScreen.classList.add('screen-active');
    }
}

window.addEventListener('load', () => {
    const game = new MatchGame();
});
