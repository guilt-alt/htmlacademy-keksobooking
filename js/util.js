'use strict';

const DEBOUNCE_INTERVAL = 500;

const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const mapPinMain = mapPins.querySelector(`.map__pin--main`);

const mapFilters = map.querySelector(`.map__filters`);
const adForm = document.querySelector(`.ad-form`);

const debounce = (cb) => {
  let lastTimeout = null;

  return function (...parameters) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const enterPressHandler = (evt, action) => {
  if (evt.key === `Enter`) {
    evt.preventDefault();
    action(evt);
  }
};

const escPressHandler = (evt, action) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    action();
  }
};

window.util = {
  map,
  mapPins,
  mapPinMain,
  mapFilters,
  adForm,
  debounce,
  getRandomInt,
  enterPressHandler,
  escPressHandler
};
