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
