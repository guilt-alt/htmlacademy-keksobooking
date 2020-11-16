'use strict';

const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const SEND_URL = `https://21.javascript.pages.academy/keksobooking`;
const TIMEOUT_IN_MS = 10000;
const StatusCode = {
  OK: 200
};

const getServerRequest = (xhr, successLoad, errorLoad) => {
  xhr.responseType = `json`;

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      successLoad(xhr.response);
    } else {
      errorLoad(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  });

  xhr.addEventListener(`error`, () => {
    errorLoad(`Произошла ошибка соеденения`);
  });

  xhr.addEventListener(`timeout`, () => {
    errorLoad(`Запрос не успел выполниться за ${xhr.timeout}мс`);
  });
};

const load = (successLoad, errorLoad) => {
  const xhr = new XMLHttpRequest();
  getServerRequest(xhr, successLoad, errorLoad);
  xhr.open(`GET`, LOAD_URL);
  xhr.send();
};

const dataLoadHandler = (arr) => {
  const data = arr;

  window.load = {
    data
  };

  window.filter.updatePins();
  window.events.formActivation(window.util.mapFilters, true);
};

const save = (data, successLoad, errorLoad) => {
  const xhr = new XMLHttpRequest();

  getServerRequest(xhr, successLoad, errorLoad);
  xhr.open(`POST`, SEND_URL);
  xhr.send(data);
};

const adFormSave = (evt) => {
  save(new FormData(window.util.adForm), window.messages.saveSuccess, window.messages.saveError);
  evt.preventDefault();
};

const dataSubmitHandler = (evt) => {
  adFormSave(evt);
};

window.backend = {
  load,
  dataLoadHandler,
  dataSubmitHandler
};
