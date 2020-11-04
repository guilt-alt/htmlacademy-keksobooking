'use strict';

(() => {
  const pins = {
    pinsWidth: 50,
    pinsHeight: 70
  };

  const renderPin = (data) => {
    const pinTemplate = document.querySelector(`#pin`)
      .content
      .querySelector(`button`);

    const pin = pinTemplate.cloneNode(true);
    pin.style = `left: ${data.location.x - pins.pinsWidth}px; top: ${data.location.y - pins.pinsHeight}px;`;
    pin.querySelector(`img`).src = data.author.avatar;
    pin.querySelector(`img`).alt = data.offer.title;

    return pin;
  };

  const createPins = (data) => {
    const pinsFragment = document.createDocumentFragment();
    for (let i = 0; i < data.length; i++) {
      pinsFragment.appendChild(renderPin(data[i]));
    }

    window.pins = {
      data
    };

    return window.util.mapPins.appendChild(pinsFragment);
  };

  window.pins = {
    createPins
  };
})();
