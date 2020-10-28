'use strict';

(() => {
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

  const mapPins = window.util.mapPins;

  const getRandomInt = window.util.getRandomInt;
  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
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

  window.mocks = {
    generateMock
  };
})();
