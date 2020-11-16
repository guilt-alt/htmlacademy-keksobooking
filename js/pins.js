'use strict';

const PINS_MAX_COUNT = 5;
const Pins = {
  MIDDLE: 25,
  BOTTOM: 70
};

const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`button`);

const renderPin = (data) => {
  const pin = pinTemplate.cloneNode(true);
  pin.style = `left: ${data.location.x - Pins.MIDDLE}px; top: ${data.location.y - Pins.BOTTOM}px;`;
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

const activePin = (pin) => {
  const pinsList = window.util.map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pinsList.forEach((element) => {
    element.classList.remove(`map__pin--active`);
  });
  if (!pin.src) {
    pin.classList.add(`map__pin--active`);
  } else {
    pin.parentNode.classList.add(`map__pin--active`);
  }
};

const removePins = () => {
  const pinsList = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pinsList.forEach((element) => {
    element.remove();
  });
};

window.pins = {
  createPins,
  activePin,
  removePins
};
