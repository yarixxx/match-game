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
const CARDS_NUMBER = 2;

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
        this.shuffleCards();
    }

    closeCards(cards) {
        cards.forEach((card) => card.close());
    }

    shuffleCards() {
        const children = this.cardsRows.children;
        for (let i = 0; i < children.length; i++) {
            this.cardsRows.appendChild(children[Math.random() * i | 0]);
        }
    }

    resetAllCards() {
        this.remaining = this.allCards.length;
        this.allCards.forEach((card) => card.reset());
        this.shuffleCards();
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
