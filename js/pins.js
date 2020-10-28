'use strict';

(() => {
  const renderPin = (data) => {
    const pinTemplate = document.querySelector(`#pin`)
      .content
      .querySelector(`button`);

    const pin = pinTemplate.cloneNode(true);
    pin.style = `left: ${data.location.x}px; top: ${data.location.y}px;`;
    pin.querySelector(`img`).src = data.author.avatar;
    pin.querySelector(`img`).alt = data.offer.title;

    return pin;
  };

  const createPins = (arr) => {
    const pinsFragment = document.createDocumentFragment();
    for (let i = 0; i < arr.length; i++) {
      pinsFragment.appendChild(renderPin(arr[i]));
    }

    return window.util.mapPins.appendChild(pinsFragment);
  };

  window.pins = {
    createPins
  };
})();
