'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mapPinMain = mapPins.querySelector(`.map__pin--main`);

  const adForm = document.querySelector(`.ad-form`);
  const houseType = adForm.querySelector(`#type`);
  const roomNumber = adForm.querySelector(`#room_number`);
  const capacity = adForm.querySelector(`#capacity`);
  const timeIn = adForm.querySelector(`#timein`);
  const timeOut = adForm.querySelector(`#timeout`);

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const onEscPress = (evt, action) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      action();
    }
  };

  window.util = {
    map,
    mapPins,
    mapPinMain,
    adForm,
    houseType,
    roomNumber,
    capacity,
    timeIn,
    timeOut,
    getRandomInt,
    onEscPress
  };
})();
