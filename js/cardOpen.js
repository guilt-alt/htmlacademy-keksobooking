'use strict';

(() => {
  const map = window.util.map;
  const generatedMocks = window.mocks.generateMock();

  const cardOpen = (evt) => {
    const cardClose = () => {
      const popup = map.querySelector(`.popup`);
      if (popup !== null) {
        popup.remove();
      }
      return;
    };

    if (evt.target.type === `button` || evt.target.parentNode.type === `button`) {
      cardClose();
      window.cards.createCard(generatedMocks, evt.target);

      map.addEventListener(`click`, (e) => {
        if (e.target.matches(`.popup__close`)) {
          cardClose();
        }
      });

      document.addEventListener(`keydown`, (e) => {
        if (e.key === `Escape`) {
          cardClose();
        }
      });
    }
    return;
  };

  window.cardOpen = {
    cardOpen
  };
})();
