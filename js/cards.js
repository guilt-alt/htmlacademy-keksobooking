'use strict';

(() => {
  const map = window.util.map;

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

  const createCard = (data, pin) => {
    const mapFiltersContainer = map.querySelector(`.map__filters-container`);
    const pins = document.querySelectorAll(`.map__pin`);
    const cardsFragment = document.createDocumentFragment();

    for (let i = 1; i < pins.length; i++) {
      if (pins[i] === pin || pins[i] === pin.parentNode) {
        cardsFragment.appendChild(renderCard(data[i - 1], pin));
      }
    }
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
      createCard(window.pins.data, evt.target);

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

  window.cards = {
    cardOpen
  };
})();
