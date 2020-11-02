'use strict';

(function () {
  const map = window.util.map;
  const mapPinMain = window.util.mapPinMain;

  const pin = {
    mapX: map.querySelector(`.map__pins`).clientWidth,

    mapMinY: 130,
    mapMaxY: 630,

    pinWidthHalf: 32.5,
    pinHeight: 80,

    mouseLimitTop: 167,
    mouseLimitBottom: 590
  };

  const dialogHandleMove = function (evt) {
    evt.preventDefault();

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const mouseX = moveEvt.pageX - map.offsetLeft;
      const mouseY = moveEvt.pageY - map.offsetTop;

      if (mouseX <= 0) {
        mapPinMain.style.left = `${-pin.pinWidthHalf}px`;
      } else if (mouseX >= pin.mapX) {
        mapPinMain.style.left = `${pin.mapX - pin.pinWidthHalf}px`;
      } else {
        mapPinMain.style.left = `${mouseX - pin.pinWidthHalf}px`;
      }

      if (mouseY <= pin.mouseLimitTop) {
        mapPinMain.style.top = `${pin.mapMinY}px`;
      } else if (mouseY >= pin.mouseLimitBottom) {
        mapPinMain.style.top = `${pin.mapMaxY - pin.pinHeight}px`;
      } else {
        mapPinMain.style.top = `${mouseY - pin.pinWidthHalf}px`;
      }

      window.validation.getMainPinCoords(mapPinMain.style.left, mapPinMain.style.top);
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.validation.getMainPinCoords(mapPinMain.style.left, mapPinMain.style.top);
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  mapPinMain.addEventListener(`mousedown`, dialogHandleMove);
}());
