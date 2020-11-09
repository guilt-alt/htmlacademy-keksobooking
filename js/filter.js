'use strict';

(() => {
  const mapFilters = window.util.mapFilters;

  const houseType = mapFilters.querySelector(`#housing-type`);

  let data = [];

  const onLoadHandler = (arr) => {
    data = arr;

    updatePins();
    houseType.addEventListener(`input`, updatePins);
  };

  const updatePins = () => {
    const result = data.filter(function (house) {
      if (houseType.value !== `any`) {
        return house.offer.type === houseType.value;
      } else {
        return house;
      }
    });

    window.pins.createPins(result);
    window.cards.cardClose();

    window.filterResult = {
      result
    };
  };

  window.filter = {
    onLoadHandler
  };
})();
