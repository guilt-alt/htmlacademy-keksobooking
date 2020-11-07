'use strict';

(() => {
  const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const STATUS_CODE = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const loadErrMessage = (onError) => {
    const node = document.createElement(`div`);
    node.classList.add(`load-err`);
    node.style = `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
      padding: 30px; max-width: 100%;
      font-size: 30px; text-align: center; background-color: #CD5C5C; color: white;
      border-radius: 5px;
      z-index: 100;`;

    node.textContent = onError;
    document.body.appendChild(node);

    const removeLoadErrMessage = () => {
      document.querySelector(`.load-err`).remove();
      document.removeEventListener(`mousedown`, removeLoadErrMessage);
      document.removeEventListener(`keydown`, (evt) => {
        window.util.onEscPress(evt, removeLoadErrMessage);
      });
    };

    document.addEventListener(`mousedown`, removeLoadErrMessage);
    document.addEventListener(`keydown`, (evt) => {
      window.util.onEscPress(evt, removeLoadErrMessage);
    });
  };

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

  const onLoadHandler = (data) => {
    window.onLoad = {
      data
    };

    window.pins.createPins(window.onLoad.data);
  };

  window.backend = {
    load,
    onLoadHandler,
    loadErrMessage
  };
})();
