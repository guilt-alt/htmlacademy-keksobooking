'use strict';

(() => {
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

  const createCard = (arr, pin) => {
    const map = window.util.map;
    const mapFiltersContainer = map.querySelector(`.map__filters-container`);
    const cardsFragment = document.createDocumentFragment();
    const randomCard = arr[window.util.getRandomInt(0, arr.length - 1)];

    cardsFragment.appendChild(renderCard(randomCard, pin));

    return map.insertBefore(cardsFragment, mapFiltersContainer);
  };

  window.cards = {
    createCard
  };
})();
