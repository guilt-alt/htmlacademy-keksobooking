'use strict';

(() => {
  const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const SEND_URL = `https://21.javascript.pages.academy/keksobooking`;
  const STATUS_CODE = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const errorHandler = (xhr, onLoad, onError) => {
    xhr.responseType = `json`;

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === STATUS_CODE.OK) {
        onLoad(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соеденения`);
    });

    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });
  };

  const load = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    errorHandler(xhr, onLoad, onError);
    xhr.open(`GET`, LOAD_URL);
    xhr.send();
  };

  const onLoadHandler = (arr) => {
    const data = arr;

    window.onLoad = {
      data
    };

    window.filter.updatePins();
  };

  const save = (data, onSuccess, onError) => {
    const xhr = new XMLHttpRequest();

    errorHandler(xhr, onSuccess, onError);
    xhr.open(`POST`, SEND_URL);
    xhr.send(data);
  };

  const adFormSave = (evt) => {
    save(new FormData(window.util.adForm), window.messages.saveSuccessMessage, window.messages.saveErrorMessage);
    evt.preventDefault();
  };

  window.backend = {
    load,
    onLoadHandler,
    adFormSave
  };
})();
