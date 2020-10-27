'use strict';

const TIMES = [
  `12:00`,
  `13:00`,
  `14:00`
];

const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];

const HOUSE_TYPE = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];

const PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);

const mapFilters = map.querySelector(`.map__filters`);
const adForm = document.querySelector(`.ad-form`);

const mapPinMain = mapPins.querySelector(`.map__pin--main`);
const mapPinMainMiddle = Math.ceil(mapPinMain.clientWidth * 0.50);
const mapPinMainBottom = mapPinMain.clientWidth + 16;

const houseType = adForm.querySelector(`#type`);

const roomNumber = adForm.querySelector(`#room_number`);
const capacity = adForm.querySelector(`#capacity`);

const timeIn = adForm.querySelector(`#timein`);
const timeOut = adForm.querySelector(`#timeout`);

const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const cutArray = (arr) => arr.slice(0, getRandomInt(1, arr.length));

const generateMock = () => {
  let generatedMock = [];

  for (let j = 0; j < 8; j++) {
    let object = {
      'author': {
        'avatar': `img/avatars/user0${j + 1}.png`
      },
      'offer': {
        'title': `Заголовок предложения`,
        'address': `${getRandomInt(600, 350)}, ${getRandomInt(350, 600)}`,
        'price': getRandomInt(5000, 15000),
        'type': getRandomItem(HOUSE_TYPE),
        'rooms': getRandomInt(1, 4),
        'guests': getRandomInt(4, 8),
        'checkin': getRandomItem(TIMES),
        'checkout': getRandomItem(TIMES),
        'features': cutArray(FEATURES),
        'description': `Cтрока с описанием`,
        'photos': cutArray(PHOTOS)
      },
      'location': {
        'x': getRandomInt(0, mapPins.clientWidth),
        'y': getRandomInt(130, 630)
      }
    };
    generatedMock.push(object);
  }

  return generatedMock;
};

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

const renderCard = (data, pin) => {
  const appartmentsType = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  const cardTemplate = document.querySelector(`#card`)
    .content
    .querySelector(`.popup`);

  const card = cardTemplate.cloneNode(true);
  const popupAvatar = card.querySelector(`.popup__avatar`);
  const popupTitle = card.querySelector(`.popup__title`);
  const popupAddress = card.querySelector(`.popup__text--address`);
  const popupPrice = card.querySelector(`.popup__text--price`);
  const popupType = card.querySelector(`.popup__type`);
  const popupCapacity = card.querySelector(`.popup__text--capacity`);
  const popupTime = card.querySelector(`.popup__text--time`);
  const popupDescription = card.querySelector(`.popup__description`);
  const popupFeatures = card.querySelector(`.popup__features`);
  popupFeatures.innerHTML = ``;
  const popupImages = card.querySelector(`.popup__photos`);
  popupImages.innerHTML = ``;

  const createTextElement = (element, condition, content) => {
    if (condition) {
      element.remove();
    } else {
      element.textContent = content;
    }

    return;
  };

  createTextElement(popupTitle, !data.offer.title, data.offer.title);
  createTextElement(popupPrice, !data.offer.price, `${data.offer.price} ₽/ночь`);
  createTextElement(popupType, !data.offer.type, appartmentsType[data.offer.type]);
  createTextElement(popupCapacity, !data.offer.rooms && !data.offer.guests, `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`);
  createTextElement(popupTime, !data.offer.checkin && !data.offer.checkout, `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`);
  createTextElement(popupDescription, !data.offer.description, data.offer.description);

  if (pin.matches(`.map__pin`)) {
    popupAvatar.src = pin.querySelector(`img`).src;
    createTextElement(popupAddress, !data.offer.address, `${parseInt(pin.style.left, 10)}, ${parseInt(pin.style.top, 10)}`);
  } else if (pin.src) {
    popupAvatar.src = pin.src;
    createTextElement(popupAddress, !data.offer.address, `${parseInt(pin.parentNode.style.left, 10)}, ${parseInt(pin.parentNode.style.top, 10)}`);
  } else {
    popupAvatar.remove();
  }

  for (let i = 0; i < data.offer.features.length; i++) {
    if (!data.offer.features) {
      popupFeatures.remove();
    } else {
      popupFeatures.insertAdjacentHTML(`beforeend`, `<li class="popup__feature popup__feature--${data.offer.features[i]}"></li>`);
      popupFeatures.children[i].textContent = data.offer.features[i];
    }
  }

  for (let i = 0; i < data.offer.photos.length; i++) {
    if (!data.offer.photos) {
      popupImages.remove();
    } else {
      popupImages.insertAdjacentHTML(`beforeend`, `<img src="${data.offer.photos[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    }
  }

  return card;
};

const createPins = (arr) => {
  const pinsFragment = document.createDocumentFragment();
  for (let i = 0; i < arr.length; i++) {
    pinsFragment.appendChild(renderPin(arr[i]));
  }

  return mapPins.appendChild(pinsFragment);
};

const createCard = (arr, pin) => {
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);
  const cardsFragment = document.createDocumentFragment();
  const randomCard = arr[getRandomInt(0, arr.length - 1)];

  cardsFragment.appendChild(renderCard(randomCard, pin));

  return map.insertBefore(cardsFragment, mapFiltersContainer);
};

const cardOpen = (evt) => {
  const cardClose = () => {
    const popup = map.querySelector(`.popup`);
    if (popup !== null) {
      popup.remove();
    }
    return;
  };

  if (evt.target.type === `button` || evt.target.parentNode.type === `button`) {
    cardClose();
    createCard(generatedMocks, evt.target);

    map.addEventListener(`click`, (e) => {
      if (e.target.matches(`.popup__close`)) {
        cardClose();
      }
    });

    document.addEventListener(`keydown`, (e) => {
      if (e.key === `Escape`) {
        cardClose();
      }
    });
  }
  return;
};

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

const getMainPinCoords = (x, y) => {
  const address = adForm.querySelector(`#address`);
  const pinCoords = `${parseInt(mapPinMain.style.left, 10) + x}, ${parseInt(mapPinMain.style.top, 10) + y}`;
  address.value = pinCoords;

  return;
};

const roomsValidation = () => {
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

const pageActivation = () => {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);

  getMainPinCoords(mapPinMainMiddle, mapPinMainBottom);
  formActivation(mapFilters, true);
  formActivation(adForm, true);
  createPins(generatedMocks);
  roomsValidation();

  timeIn.addEventListener(`input`, timeOutValidation);
  timeOut.addEventListener(`input`, timeInValidation);
  houseType.addEventListener(`input`, houseTypeValidation);
  capacity.addEventListener(`input`, roomsValidation);
  roomNumber.addEventListener(`input`, roomsValidation);
  map.addEventListener(`click`, cardOpen);
  map.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Enter` && evt.target.type === `button`) {
      cardOpen(evt);
    }
  });
};

mapPinMain.addEventListener(`mousedown`, (evt) => {
  if (evt.which === 1) {
    pageActivation();
  }
});

mapPinMain.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    pageActivation();
  }
});

const generatedMocks = generateMock();

getMainPinCoords(mapPinMainMiddle, mapPinMainMiddle);
formActivation(mapFilters, false);
formActivation(adForm, false);
