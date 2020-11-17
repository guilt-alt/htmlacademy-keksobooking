'use strict';

const mapFilters = window.util.mapFilters;
const housingType = mapFilters.querySelector(`#housing-type`);
const housingPrice = mapFilters.querySelector(`#housing-price`);
const housingRooms = mapFilters.querySelector(`#housing-rooms`);
const housingGuests = mapFilters.querySelector(`#housing-guests`);
const housingFeatures = mapFilters.querySelectorAll(`.map__checkbox`);

const Price = {
  LOW: 10000,
  HIGH: 50000
};

const filterByHouse = (type) => housingType.value === `any` || housingType.value === type;
const filterByRooms = (rooms) => housingRooms.value === `any` || Number(housingRooms.value) === rooms;
const filterByGuests = (guests) => housingGuests.value === `any` || Number(housingGuests.value) === guests;

const filterByPrice = (price) => {
  switch (housingPrice.value) {
    case `low`:
      return price < Price.LOW;
    case `middle`:
      return price >= Price.LOW && price <= Price.HIGH;
    case `high`:
      return price > Price.HIGH;
    default:
      return true;
  }
};

const filterByFeatures = (feature) => {
  for (let housingFeature of housingFeatures) {
    if (housingFeature.checked && !feature.includes(housingFeature.value)) {
      return false;
    }
  }
  return true;
};

const updatePins = () => {
  let data = window.load.data;
  window.cards.close();
  window.pins.removePins();

  data = data.filter((item) => {
    return filterByHouse(item.offer.type) &&
      filterByPrice(item.offer.price) &&
      filterByRooms(item.offer.rooms) &&
      filterByGuests(item.offer.guests) &&
      filterByFeatures(item.offer.features);
  });

  window.pins.createPins(data);

  window.filtered = {
    data
  };
};

window.filter = {
  updatePins
};
