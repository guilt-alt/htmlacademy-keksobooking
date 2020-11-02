'use strict';

(() => {
  const map = window.util.map;
  const mapPinMain = window.util.mapPinMain;

  const mapFilters = map.querySelector(`.map__filters`);
  const adForm = window.util.adForm;

  const generatedMocks = window.mocks.generateMock();

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

  const events = () => {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    window.validation.getMainPinCoords();
    formActivation(mapFilters, true);
    formActivation(adForm, true);
    window.pins.createPins(generatedMocks);
    window.validation.roomsValidation();

    window.util.timeIn.addEventListener(`input`, window.validation.timeOutValidation);
    window.util.timeOut.addEventListener(`input`, window.validation.timeInValidation);
    window.util.houseType.addEventListener(`input`, window.validation.houseTypeValidation);
    window.util.capacity.addEventListener(`input`, window.validation.roomsValidation);
    window.util.roomNumber.addEventListener(`input`, window.validation.roomsValidation);
    map.addEventListener(`click`, window.cards.cardOpen);
    map.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter` && evt.target.type === `button`) {
        window.cards.cardOpen(evt);
      }
    });
  };

  mapPinMain.addEventListener(`mousedown`, (evt) => {
    if (evt.which === 1) {
      events();
    }
  });

  mapPinMain.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter`) {
      events();
    }
  });

  formActivation(mapFilters, false);
  formActivation(adForm, false);
})();
