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

let generatedMock = [];

const mapPins = document.querySelector(`.map__pins`);

document.querySelector(`.map`).classList.remove(`map--faded`);

const getRandomIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const cutArray = (arr) => arr.slice(0, getRandomInt(1, arr.length));

const generateObj = (i) => {
  let object = {
    'author': {
      'avatar': `img/avatars/user0${i}.png`
    },
    'offer': {
      'title': `Заголовок предложения`,
      'address': `${getRandomInt(600, 350)}, ${getRandomInt(350, 600)}`,
      'price': getRandomInt(5000, 15000),
      'type': HOUSE_TYPE[getRandomIndex(HOUSE_TYPE)],
      'rooms': getRandomInt(1, 4),
      'guests': getRandomInt(4, 8),
      'checkin': TIMES[getRandomIndex(TIMES)],
      'checkout': TIMES[getRandomIndex(TIMES)],
      'features': cutArray(FEATURES),
      'description': `Cтрока с описанием`,
      'photos': cutArray(PHOTOS)
    },
    'location': {
      'x': getRandomInt(mapPins.clientWidth - 260, 130),
      'y': getRandomInt(130, 640)
    }
  };

  return object;
};

for (let i = 0; i < 8; i++) {
  generatedMock.push(generateObj(i + 1));
}

const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`button`);

const renderPin = function (pins) {
  const pin = pinTemplate.cloneNode(true);
  pin.style = `left: ${pins.location.x}px; top: ${pins.location.y}px;`;
  pin.querySelector(`img`).src = pins.author.avatar;
  pin.querySelector(`img`).alt = pins.offer.title;

  return pin;
};

const fragment = document.createDocumentFragment();
for (let i = 0; i < generatedMock.length; i++) {
  fragment.appendChild(renderPin(generatedMock[i]));
}

mapPins.appendChild(fragment);
