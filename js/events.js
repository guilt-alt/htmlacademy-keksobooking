'use strict';

(() => {
  const map = window.util.map;
  const mapPinMain = window.util.mapPinMain;

  const mapFilters = map.querySelector(`.map__filters`);
  const adForm = window.util.adForm;

  // const generatedMocks = window.mocks.generateMock();

  const formActivation = (form, enable) => {
    const elements = form.querySelectorAll(`fieldset, select`);

    if (enable === false) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].setAttribute(`disabled`, `disabled`);
      }
    } else {
      for (let j = 0; j < elements.length; j++) {
        elements[j].removeAttribute(`disabled`);
      }
    }

    return;
  };

  const addEvents = () => {
    if (map.classList.contains(`map--faded`)) {
      window.backend.load(window.backend.onLoadHandler, window.messages.loadErrorMessage);
    }

    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    formActivation(mapFilters, true);
    formActivation(adForm, true);
    window.validation.addValidation();
    adForm.addEventListener(`submit`, (evt) => {
      window.backend.adFormSave(evt);
    });
    adForm.addEventListener(`reset`, removeEvents);

    map.addEventListener(`click`, window.cards.cardOpen);
    map.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        window.cards.cardOpen(evt);
      }
    });
  };

  const removeEvents = () => {
    window.pins.removePins();
    window.cards.cardClose();

    map.classList.add(`map--faded`);
    adForm.classList.add(`ad-form--disabled`);
    mapPinMain.style = `left: 570px;top: 375px;`;

    formActivation(mapFilters, false);
    formActivation(adForm, false);
    window.validation.removeValidation();
    adForm.removeEventListener(`submit`, (evt) => {
      window.backend.adFormSave(evt, removeEvents);
    });
    adForm.removeEventListener(`reset`, removeEvents);

    map.removeEventListener(`click`, window.cards.cardOpen);
    map.removeEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        window.cards.cardOpen(evt);
      }
    });
  };

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    if (evt.which === 1) {
      addEvents();
    }
  });

  mapPinMain.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      addEvents();
    }
  });

  formActivation(mapFilters, false);
  formActivation(adForm, false);

  window.events = {
    removeEvents
  };
})();
