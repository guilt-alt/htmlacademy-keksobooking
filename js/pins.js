'use strict';

(() => {
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
    for (let i = 0; i < data.length; i++) {
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
