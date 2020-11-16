'use strict';

const map = window.util.map;
const mapPinMain = window.util.mapPinMain;

const MovePin = {
  MAP_X: map.querySelector(`.map__pins`).clientWidth,

  MAP_MIN_Y: 50,
  MAP_MAX_Y: 630,

  PIN_WIDTH_HALF: 32.5,
  PIN_HEIGHT: 80,

  MOUSE_LIMIT_TOP: 90,
  MOUSE_LIMIT_BOTTOM: 590
};

const mainPinHandleMove = (evt) => {
  evt.preventDefault();

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const mouseX = moveEvt.pageX - map.offsetLeft;
    const mouseY = moveEvt.pageY - map.offsetTop;

    if (mouseX <= 0) {
      mapPinMain.style.left = `${-MovePin.PIN_WIDTH_HALF}px`;
    } else if (mouseX >= MovePin.MAP_X) {
      mapPinMain.style.left = `${MovePin.MAP_X - MovePin.PIN_WIDTH_HALF}px`;
    } else {
      mapPinMain.style.left = `${mouseX - MovePin.PIN_WIDTH_HALF}px`;
    }

    if (mouseY <= MovePin.MOUSE_LIMIT_TOP) {
      mapPinMain.style.top = `${MovePin.MAP_MIN_Y}px`;
    } else if (mouseY >= MovePin.MOUSE_LIMIT_BOTTOM) {
      mapPinMain.style.top = `${MovePin.MAP_MAX_Y - MovePin.PIN_HEIGHT}px`;
    } else {
      mapPinMain.style.top = `${mouseY - MovePin.PIN_WIDTH_HALF}px`;
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
