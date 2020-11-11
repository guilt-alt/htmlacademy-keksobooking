'use strict';

(() => {
  const mapFilters = window.util.mapFilters;

  const houseType = mapFilters.querySelector(`#housing-type`);

  const updatePins = () => {
    let data = window.onLoad.data;
    window.cards.cardClose();
    window.pins.removePins();

    data = data.filter(function (data) {
      if (houseType.value !== `any`) {
        return data.offer.type === houseType.value;
      } else {
        return data;
      }
    });

    window.pins.createPins(data);

    window.filtered = {
      data
    };
  };

  window.filter = {
    updatePins
  };
})();
