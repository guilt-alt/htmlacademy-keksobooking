'use strict';

const mapFilters = window.util.mapFilters;
const housingType = mapFilters.querySelector(`#housing-type`);
const housingPrice = mapFilters.querySelector(`#housing-price`);
const housingRooms = mapFilters.querySelector(`#housing-rooms`);
const housingGuests = mapFilters.querySelector(`#housing-guests`);
const housingFeatures = mapFilters.querySelectorAll(`.map__checkbox`);
const filters = [
  housingType,
  housingPrice,
  housingRooms,
  housingGuests
];

const updatePins = () => {
  let data = window.load.data;
  window.cards.close();
  window.pins.removePins();

  const getFilteredData = (value) => {
    data = data.filter((pin) => {
      switch (value) {
        case housingType.value:
          return pin.offer.type === value;
        case housingRooms.value:
          return pin.offer.rooms === Number(value);
        case housingGuests.value:
          return pin.offer.guests === Number(value);
        case `middle`:
          return (pin.offer.price >= 10000) && (pin.offer.price <= 50000);
        case `low`:
          return pin.offer.price < 10000;
        case `high`:
          return pin.offer.price > 50000;
        case `wifi`:
          return pin.offer.features.includes(value);
        case `dishwasher`:
          return pin.offer.features.includes(value);
        case `parking`:
          return pin.offer.features.includes(value);
        case `washer`:
          return pin.offer.features.includes(value);
        case `elevator`:
          return pin.offer.features.includes(value);
        case `conditioner`:
          return pin.offer.features.includes(value);
        default:
          return false;
      }
    });
  };

  housingFeatures.forEach((housingFeature) => {
    if (housingFeature.checked) {
      const feature = housingFeature.value;
      getFilteredData(feature);
    }
  });

  filters.forEach((filter) => {
    const selectValue = filter.value;
    if (selectValue !== `any`) {
      getFilteredData(selectValue);
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
