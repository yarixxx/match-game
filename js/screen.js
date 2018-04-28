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
