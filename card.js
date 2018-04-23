const DEFAULT_ICON = 'help';

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
