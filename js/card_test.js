import {DEFAULT_ICON, Card} from './card';

describe("Unit tests for Card class", function() {
  let cardElement, document, buttonElement, iconElement;

  beforeEach(function() {
    document = {
        createElement: () => {
            return cardElement;
        }
    };
    buttonElement = {
        addEventListener: () => {},
        classList: {
            add: () => {},
            remove: () => {}
        }
    };
    iconElement = {
        addEventListener: () => {},
        textContent: '',
        classList: {
            add: () => {},
            remove: () => {}
        }
    };
    
    cardElement = {
        querySelector: (path) => {
          if (path === '.match-button') {
            return buttonElement;
          } else if (path === '.material-icons') {
            return iconElement;
          }
        },
        addEventListener: () => {}
    };
  });

  it("should open card correctly", function() {
    spyOn(buttonElement.classList, 'add');
    const card = new Card(document, 1, 'icon', () => {});
    card.open();
    expect(buttonElement.classList.add).toHaveBeenCalledWith('open');
    expect(buttonElement.classList.add).toHaveBeenCalledWith('pulse');
    expect(iconElement.textContent).toBe('icon');
    expect(card.isOpen).toBe(true);
  });

  it("should close card correctly", function() {
    spyOn(buttonElement.classList, 'remove');
    const card = new Card(document, 1, 'icon', () => {});
    card.close();
    expect(buttonElement.classList.remove).toHaveBeenCalledWith('open');
    expect(buttonElement.classList.remove).toHaveBeenCalledWith('pulse');
    expect(iconElement.textContent).toBe(Card.DEFAULT_ICON);
    expect(card.isOpen).toBe(false);
  });

  it("should fix card correctly", function() {
    spyOn(buttonElement.classList, 'remove');
    const card = new Card(document, 1, 'icon', () => {});
    card.fix();
    expect(buttonElement.classList.remove).toHaveBeenCalledWith('pulse');
  });

  it("should hide card correctly", function() {
    spyOn(buttonElement.classList, 'add');
    const card = new Card(document, 1, 'icon', () => {});
    card.hide();
    expect(buttonElement.classList.add).toHaveBeenCalledWith('pulse');
    expect(buttonElement.classList.add).toHaveBeenCalledWith('scale-transition');
    expect(buttonElement.classList.add).toHaveBeenCalledWith('scale-out');
  });

  it("should reset card correctly", function() {
    spyOn(buttonElement.classList, 'remove');
    const card = new Card(document, 1, 'icon', () => {});
    card.open();
    card.reset();
    expect(buttonElement.classList.remove).toHaveBeenCalledWith('pulse');
    expect(buttonElement.classList.remove).toHaveBeenCalledWith('scale-transition');
    expect(buttonElement.classList.remove).toHaveBeenCalledWith('scale-out');
    expect(iconElement.textContent).toBe(DEFAULT_ICON);
    expect(card.isOpen).toBe(false);
  });
});
