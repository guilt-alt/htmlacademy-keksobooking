'use strict';

const map = window.util.map;
const mapPinMain = window.util.mapPinMain;

const mapFilters = window.util.mapFilters;
const adForm = window.util.adForm;

const formActivation = (form, enable) => {
  const elements = form.querySelectorAll(`fieldset, select`);

  if (enable === false) {
    elements.forEach((element) => {
      element.setAttribute(`disabled`, `disabled`);
    });
  } else {
    elements.forEach((element) => {
      element.removeAttribute(`disabled`);
    });
  }

  return;
};

const addEvents = () => {
  if (map.classList.contains(`map--faded`)) {
    window.backend.load(window.backend.dataLoadHandler, window.messages.loadError);
  }

  mapFilters.addEventListener(`change`, window.util.debounce(window.filter.updatePins));

  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);

  formActivation(adForm, true);
  window.validation.add();
  adForm.addEventListener(`submit`, window.backend.dataSubmitHandler);

  adForm.addEventListener(`reset`, removeEvents);

  map.addEventListener(`click`, window.cards.open);
  map.addEventListener(`keydown`, window.cards.openHandler);
};

const removeEvents = () => {
  window.pins.removePins();
  window.cards.close();

  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);
  mapPinMain.style = `left: 570px;top: 375px;`;

  formActivation(mapFilters, false);
  formActivation(adForm, false);
  window.validation.remove();
  mapFilters.reset();
  adForm.removeEventListener(`submit`, window.backend.dataSubmitHandler);
  adForm.removeEventListener(`reset`, removeEvents);

  map.removeEventListener(`click`, window.cards.open);
  map.removeEventListener(`keydown`, window.cards.openHandler);
};

mapPinMain.addEventListener(`mousedown`, (evt) => {
  if (evt.which === 1) {
    addEvents();
  }
});

mapPinMain.addEventListener(`keydown`, (evt) => {
  window.util.enterPressHandler(evt, addEvents);
});

formActivation(mapFilters, false);
formActivation(adForm, false);

window.events = {
  remove: removeEvents,
  formActivation
};
