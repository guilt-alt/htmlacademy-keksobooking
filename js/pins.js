'use strict';

(() => {
  const PINS_MAX_COUNT = 5;
  const pins = {
    pinsMiddle: 25,
    pinsBottom: 70
  };

  const renderPin = (data) => {
    const pinTemplate = document.querySelector(`#pin`)
      .content
      .querySelector(`button`);

    const pin = pinTemplate.cloneNode(true);
    pin.style = `left: ${data.location.x - pins.pinsMiddle}px; top: ${data.location.y - pins.pinsBottom}px;`;
    pin.querySelector(`img`).src = data.author.avatar;
    pin.querySelector(`img`).alt = data.offer.title;

    return pin;
  };

  const createPins = (data) => {
    const pinsFragment = document.createDocumentFragment();
    const takeNumber = data.length > PINS_MAX_COUNT ?
      PINS_MAX_COUNT :
      data.length;

    removePins();

    for (let i = 0; i < takeNumber; i++) {
      pinsFragment.appendChild(renderPin(data[i]));
    }

    return window.util.mapPins.appendChild(pinsFragment);
  };

  const removePins = () => {
    const pinsList = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    for (let i = 0; i < pinsList.length; i++) {
      pinsList[i].remove();
    }
  };

  window.pins = {
    createPins,
    removePins
  };
})();
