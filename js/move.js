'use strict';

const map = window.util.map;
const mapPinMain = window.util.mapPinMain;

const movePin = {
  mapX: map.querySelector(`.map__pins`).clientWidth,

  mapMinY: 130,
  mapMaxY: 630,

  pinWidthHalf: 32.5,
  pinHeight: 80,

  mouseLimitTop: 167,
  mouseLimitBottom: 590
};

const mainPinHandleMove = (evt) => {
  evt.preventDefault();

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const mouseX = moveEvt.pageX - map.offsetLeft;
    const mouseY = moveEvt.pageY - map.offsetTop;

    if (mouseX <= 0) {
      mapPinMain.style.left = `${-movePin.pinWidthHalf}px`;
    } else if (mouseX >= movePin.mapX) {
      mapPinMain.style.left = `${movePin.mapX - movePin.pinWidthHalf}px`;
    } else {
      mapPinMain.style.left = `${mouseX - movePin.pinWidthHalf}px`;
    }

    if (mouseY <= movePin.mouseLimitTop) {
      mapPinMain.style.top = `${movePin.mapMinY}px`;
    } else if (mouseY >= movePin.mouseLimitBottom) {
      mapPinMain.style.top = `${movePin.mapMaxY - movePin.pinHeight}px`;
    } else {
      mapPinMain.style.top = `${mouseY - movePin.pinWidthHalf}px`;
    }

    window.validation.getMainPinCoords(mapPinMain.style.left, mapPinMain.style.top);
  };

  const onMouseUp = (upEvt) => {
    upEvt.preventDefault();

    window.validation.getMainPinCoords(mapPinMain.style.left, mapPinMain.style.top);
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

mapPinMain.addEventListener(`mousedown`, mainPinHandleMove);
