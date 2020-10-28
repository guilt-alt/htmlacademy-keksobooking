'use strict';

(() => {
  const adForm = window.util.adForm;

  const timeIn = window.util.timeIn;
  const timeOut = window.util.timeOut;

  const roomsValidation = () => {
    const roomNumber = window.util.roomNumber;
    const capacity = window.util.capacity;
    const capacityValue = Number(capacity.value);
    const roomsValue = Number(roomNumber.value);

    if ((capacityValue <= roomsValue && roomsValue !== 100 && capacityValue !== 0) || (roomsValue === 100 && capacityValue === 0)) {
      capacity.setCustomValidity(``);
    } else {
      capacity.setCustomValidity(`Измените количество комнат или гостей`);
    }

    capacity.reportValidity();
  };


  const houseTypeValidation = () => {
    const houseType = window.util.houseType;
    const price = adForm.querySelector(`#price`);
    if (houseType.value === `bungalow`) {
      price.min = 0;
      price.placeholder = `0`;
    } else if (houseType.value === `flat`) {
      price.min = 1000;
      price.placeholder = `1000`;
    } else if (houseType.value === `house`) {
      price.min = 5000;
      price.placeholder = `5000`;
    } else {
      price.min = 10000;
      price.placeholder = `10000`;
    }

    return;
  };

  const timeInValidation = () => {
    if (timeIn.value !== timeOut.value) {
      timeIn.value = timeOut.value;
    }

    return;
  };

  const timeOutValidation = () => {
    if (timeOut.value !== timeIn.value) {
      timeOut.value = timeIn.value;
    }

    return;
  };

  const getMainPinCoords = () => {
    const mapPinMain = window.util.mapPinMain;
    const mapPinMainMiddle = Math.ceil(mapPinMain.clientWidth * 0.50);
    const mapPinMainBottom = mapPinMain.clientWidth + 16;
    const address = adForm.querySelector(`#address`);
    const pinCoords = `${parseInt(mapPinMain.style.left, 10) + mapPinMainMiddle}, ${parseInt(mapPinMain.style.top, 10) + mapPinMainBottom}`;
    address.value = pinCoords;

    return;
  };

  window.validation = {
    roomsValidation,
    houseTypeValidation,
    timeInValidation,
    timeOutValidation,
    getMainPinCoords
  };
})();
