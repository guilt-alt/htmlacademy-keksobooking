'use strict';

(() => {
  const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const STATUS_CODE = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const errorServerFragment = (onError) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; padding: 30px; max-width: 100%; text-align: center; background-color: #CD5C5C; color: white; border-radius: 5px;`;
    node.style.position = `absolute`;
    node.style.top = `50%`;
    node.style.left = `50%`;
    node.style.transform = `translate(-50%, -50%)`;
    node.style.fontSize = `30px`;

    node.textContent = onError;
    document.body.insertAdjacentElement(`afterbegin`, node);
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

  window.backend = {
    load,
    errorServerFragment
  };
})();
