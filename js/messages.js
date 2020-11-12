'use strict';

const main = document.querySelector(`main`);

const saveStatusFragment = (message) => {
  const fragment = document.createDocumentFragment();

  fragment.appendChild(message);
  return main.appendChild(fragment);
};

const removeMessage = (selector) => {
  const remove = () => {
    document.querySelector(selector).remove();
    document.removeEventListener(`mousedown`, remove);
    document.removeEventListener(`keydown`, (evt) => {
      window.util.onEscPress(evt, remove);
    });
  };

  document.addEventListener(`mousedown`, remove);
  document.addEventListener(`keydown`, (evt) => {
    window.util.onEscPress(evt, remove);
  });
};

const loadErrorMessage = (onError) => {
  const node = document.createElement(`div`);
  node.classList.add(`load-err`);
  node.style = `position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
      padding: 30px; max-width: 100%;
      font-size: 30px; text-align: center; background-color: #CD5C5C; color: white;
      border-radius: 5px;
      z-index: 100;`;

  node.textContent = onError;
  document.body.appendChild(node);

  removeMessage(`.load-err`);
};

const saveSuccessMessage = () => {
  const successTemplate = document.querySelector(`#success`)
    .content
    .querySelector(`.success`);
  const success = successTemplate.cloneNode(true);

  saveStatusFragment(success);

  window.events.removeEvents();
  window.util.adForm.reset();

  removeMessage(`.success`);
};

const saveErrorMessage = () => {
  const errorTemplate = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);
  const error = errorTemplate.cloneNode(true);

  saveStatusFragment(error);

  removeMessage(`.error`);
};

window.messages = {
  loadErrorMessage,
  saveSuccessMessage,
  saveErrorMessage
};
