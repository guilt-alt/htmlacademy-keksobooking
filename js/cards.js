'use strict';

const map = window.util.map;
const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.popup`);

const renderCard = (data) => {
  const appartmentsType = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

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
  createTextElement(popupAddress, !data.offer.address, data.offer.address);

  if (!data.author.avatar) {
    popupAvatar.remove();
  } else {
    popupAvatar.src = data.author.avatar;
  }

  if (!data.offer.features) {
    popupFeatures.remove();
  } else {
    data.offer.features.forEach((feature, index) => {
      popupFeatures.insertAdjacentHTML(`beforeend`, `<li class="popup__feature popup__feature--${feature}"></li>`);
      popupFeatures.children[index].textContent = feature;
    });
  }

  if (!data.offer.photos) {
    popupImages.remove();
  } else {
    data.offer.photos.forEach((photo) => {
      popupImages.insertAdjacentHTML(`beforeend`, `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    });
  }

  return card;
};

const createCard = (data) => {
  const mapFiltersContainer = map.querySelector(`.map__filters-container`);
  const cardsFragment = document.createDocumentFragment();

  cardsFragment.appendChild(renderCard(data));
  return map.insertBefore(cardsFragment, mapFiltersContainer);
};

const cardOpenHandler = (evt) => {
  window.util.enterPressHandler(evt, cardOpen);
};

const cardOpen = (evt) => {
  let data = [];
  const pinMatches = `.map__pin:not(.map__pin--main)`;
  const pinsList = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);

  if (evt.target.matches(pinMatches) || evt.target.parentNode.matches(pinMatches)) {
    cardClose();
    pinsList.forEach((pin, index) => {
      if (pin === evt.target || pin === evt.target.parentNode) {
        data = window.filtered.data[index];
      }
    });
    window.pins.activePin(evt.target);
    createCard(data);

    map.addEventListener(`click`, cardCloseHandler);
    map.addEventListener(`keydown`, cardCloseHandler);
    document.addEventListener(`keydown`, cardCloseHandler);
  }
  return;
};

const cardCloseHandler = (evt) => {
  if (evt.target.matches(`.popup__close`)) {
    cardClose();
  } else if (evt.key === `Enter` && evt.target.matches(`.popup__close`)) {
    cardClose();
  } else {
    window.util.escPressHandler(evt, cardClose);
  }
};

const cardClose = () => {
  const popup = map.querySelector(`.popup`);
  if (popup !== null) {
    popup.remove();
    map.removeEventListener(`click`, cardCloseHandler);
    map.removeEventListener(`keydown`, cardCloseHandler);
    document.removeEventListener(`keydown`, cardCloseHandler);
  }
  return;
};

window.cards = {
  open: cardOpen,
  openHandler: cardOpenHandler,
  close: cardClose
};
