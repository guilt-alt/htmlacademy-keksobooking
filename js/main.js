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
        'x': getRandomInt(mapPins.clientWidth - 260, 130),
        'y': getRandomInt(130, 640)
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

const renderCard = (data) => {
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
  createTextElement(popupAddress, !data.offer.address, data.offer.address);
  createTextElement(popupPrice, !data.offer.price, `${data.offer.price} ₽/ночь`);
  createTextElement(popupType, !data.offer.type, appartmentsType[data.offer.type]);
  createTextElement(popupCapacity, !data.offer.rooms && !data.offer.guests, `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`);
  createTextElement(popupTime, !data.offer.checkin && !data.offer.checkout, `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`);
  createTextElement(popupDescription, !data.offer.description, data.offer.description);

  if (!data.author.avatar) {
    popupAvatar.remove();
  } else {
    popupAvatar.src = data.author.avatar;
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
    if (!data.offer.features) {
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

const createCard = (arr) => {
  const mapFilters = map.querySelector(`.map__filters-container`);
  const cardsFragment = document.createDocumentFragment();
  cardsFragment.appendChild(renderCard(arr[0]));

  return map.insertBefore(cardsFragment, mapFilters);
};

map.classList.remove(`map--faded`);

const generatedMocks = generateMock();

createPins(generatedMocks);
createCard(generatedMocks);
