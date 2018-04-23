const CARDS_NUMBER = 2;
const DEFAULT_ICON = 'help';
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
    /**
     * Matching card.
     * @constructor
     */
    constructor(index, value, callback) {
        this.index = index;
        this.value = value;
        this.isOpen = false;
        const element = document.createElement('div');
        element.innerHTML = `
    <div class="darken-3 btn-large match-button btn-floating"
         id="i${index}">
            <i class="material-icons">${DEFAULT_ICON}</i>
    </div>`;
        this.buttonElement = element.querySelector('.match-button');
        this.iconElement = element.querySelector('.material-icons');
        this.buttonElement.addEventListener('click', () => callback(this));
    }

    open() {
        this.isOpen = true;
        this.buttonElement.classList.add('open');
        this.buttonElement.classList.add('pulse');
        this.iconElement.textContent = this.value;
    }

    close() {
        this.isOpen = false;
        this.buttonElement.classList.remove('open');
        this.buttonElement.classList.remove('pulse');
        this.iconElement.textContent = DEFAULT_ICON;
    }

    fix() {
        this.buttonElement.classList.remove('pulse');
    }

    hide() {
        this.buttonElement.classList.add('pulse');
        this.buttonElement.classList.add('scale-transition');
        this.buttonElement.classList.add('scale-out'); 
    }

    reset() {
        this.close();
        this.buttonElement.classList.remove('pulse');
        this.buttonElement.classList.remove('scale-transition');
        this.buttonElement.classList.remove('scale-out'); 
    }
}

class Screen {
    constructor(id) {
        this.screenElement = document.getElementById(id);
    }

    show() {
        this.screenElement.classList.add('screen-active');
    }

    hide() {
        this.screenElement.classList.remove('screen-active');
    }
}

class Cards {
    constructor(finishGame) {
        this.finishGame = finishGame;
        this.allCards = [];
        this.selectedCards = [];
        this.cardsRows = document.getElementById('cardsRows');
        ALL_CARDS.forEach((value, i) => {
            const card = new Card(i, value, (card) => this.selectCard(card));
            this.allCards.push(card);
            this.cardsRows.appendChild(card.buttonElement);
        });
        this.remaining = this.allCards.length;
    }

    closeCards(cards) {
        cards.forEach((card) => card.close());
    }

    resetAllCards() {
        this.remaining = this.allCards.length;
        this.allCards.forEach((card) => card.reset());
    }

    resetOpenCards() {
        this.closeCards(this.selectedCards);
        this.selectedCards = [];
    }

    selectCard(card) {
        if (card.isOpen) { return }

        card.open();
        this.selectedCards.push(card);

        if (this.selectedCards.length < CARDS_NUMBER) {
            return;
        }

        if (this.selectedCards.length === CARDS_NUMBER && this.isAllEqual(this.selectedCards)) {
           
            this.fixCards(this.selectedCards);
            this.remaining -= this.selectedCards.length;
            if (this.remaining == 0) {
                this.finishGame();
            }
            this.selectedCards = [];
            return;
        }
        if (this.selectedCards.length === CARDS_NUMBER) {
            setTimeout(() => this.resetOpenCards(), 1000);
        }   
    }

    isAllEqual(cards) {
        return cards.every((card) => card.value === cards[0].value);
    }

    fixCards(cards) {
        cards.forEach((card) => card.fix());
    }

    hide(cards) {
        this.allCards.forEach((card) => card.hide());
    }
}

class MatchGame {
    constructor() {
        this.cards = new Cards(() => {this.finishGame()});
        this.initializeScreens();
        this.startButton = document.getElementById('startGameButton');
        this.startNewGameButton = document.getElementById('startNewGameButton');
        this.startButton.addEventListener('click', () => this.startGame());
        this.startNewGameButton.addEventListener('click', () => this.startGame());
    }

    initializeScreens() {
        this.allScreens = [];
        this.cardsScreen = new Screen('cardsScreen');
        this.allScreens.push(this.cardsScreen);
        this.startScreen = new Screen('startScreen');
        this.allScreens.push(this.startScreen);
        this.finishScreen = new Screen('finishScreen');
        this.allScreens.push(this.finishScreen);
    }

    initializeCards() {
        this.cards.resetAllCards();
    }

    startGame() {
        this.initializeCards();
        this.changeScreen(this.cardsScreen);
    }

    finishGame() {
        this.cards.hide();
        setTimeout(() => this.changeScreen(this.finishScreen), 1000);
    }

    changeScreen(screen) {
        this.allScreens.forEach((screen) => screen.hide());
        screen.show();
    }    
}

window.addEventListener('load', () => {
    const game = new MatchGame();
});
