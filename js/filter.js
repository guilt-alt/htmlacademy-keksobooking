'use strict';

const mapFilters = window.util.mapFilters;
const housingType = mapFilters.querySelector(`#housing-type`);
const housingPrice = mapFilters.querySelector(`#housing-price`);
const housingRooms = mapFilters.querySelector(`#housing-rooms`);
const housingGuests = mapFilters.querySelector(`#housing-guests`);
const housingFeatures = mapFilters.querySelectorAll(`.map__checkbox`);

const updatePins = () => {
  let data = window.onLoad.data;
  window.cards.cardClose();
  window.pins.removePins();

  for (let i = 0; i < housingFeatures.length; i++) {
    if (housingFeatures[i].checked) {
      data = data.filter((feature) => {
        return feature.offer.features.includes(housingFeatures[i].value);
      });
    }
  }

  const filterPinsType = (value) => {
    data = data.filter((pin) => {
      return pin.offer.type === value;
    });
  };

  const filterPinsPrice = (value) => {
    data = data.filter((pin) => {
      switch (value) {
        case `middle`:
          return (pin.offer.price >= 10000) && (pin.offer.price <= 50000);
        case `low`:
          return pin.offer.price < 10000;
        case `high`:
          return pin.offer.price > 50000;
        default:
          return false;
      }
    });
  };

  const filterPinsRooms = (value) => {
    data = data.filter((pin) => {
      return pin.offer.rooms === Number(value);
    });
  };

  const filterPinsGuests = (value) => {
    data = data.filter((pin) => {
      return pin.offer.guests === Number(value);
    });
  };

  const Filter = [{
    name: housingType,
    filterFunction: filterPinsType
  },
  {
    name: housingPrice,
    filterFunction: filterPinsPrice
  },
  {
    name: housingRooms,
    filterFunction: filterPinsRooms
  },
  {
    name: housingGuests,
    filterFunction: filterPinsGuests
  }
  ];

  for (let i = 0; i < Filter.length; i++) {
    const selectValue = Filter[i].name.value;
    if (selectValue !== `any`) {
      Filter[i].filterFunction(selectValue);
    }
  }

  window.pins.createPins(data);

  window.filtered = {
    data
  };
};

window.filter = {
  updatePins
};
