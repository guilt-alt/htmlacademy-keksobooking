(()=>{"use strict";(()=>{const e=document.querySelector(".map"),t=e.querySelector(".map__pins"),o=t.querySelector(".map__pin--main"),n=e.querySelector(".map__filters"),r=document.querySelector(".ad-form"),i=r.querySelector("#type"),a=r.querySelector("#room_number"),s=r.querySelector("#capacity"),d=r.querySelector("#timein"),l=r.querySelector("#timeout");window.util={map:e,mapPins:t,mapPinMain:o,mapFilters:n,adForm:r,houseType:i,roomNumber:a,capacity:s,timeIn:d,timeOut:l,getRandomInt:(e,t)=>(e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e),onEnterPress:(e,t)=>{"Enter"===e.key&&(e.preventDefault(),t(e))},onEscPress:(e,t)=>{"Escape"===e.key&&(e.preventDefault(),t())}}})(),window.debounce=e=>{let t=null;return function(...o){t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),300)}},(()=>{const e=e=>{const t=document.querySelector("#pin").content.querySelector("button").cloneNode(!0);return t.style=`left: ${e.location.x-25}px; top: ${e.location.y-70}px;`,t.querySelector("img").src=e.author.avatar,t.querySelector("img").alt=e.offer.title,t},t=()=>{const e=document.querySelectorAll(".map__pin:not(.map__pin--main)");for(let t=0;t<e.length;t++)e[t].remove()};window.pins={createPins:o=>{const n=document.createDocumentFragment(),r=o.length>5?5:o.length;t();for(let t=0;t<r;t++)n.appendChild(e(o[t]));return window.util.mapPins.appendChild(n)},activePin:e=>{const t=window.util.map.querySelectorAll(".map__pin:not(.map__pin--main)");for(let e=0;e<t.length;e++)t[e].classList.remove("map__pin--active");e.src?e.parentNode.classList.add("map__pin--active"):e.classList.add("map__pin--active")},removePins:t}})(),(()=>{const e=window.util.map,t=()=>{const t=e.querySelector(".popup");null!==t&&t.remove()};window.cards={cardOpen:o=>{let n=[];const r=".map__pin:not(.map__pin--main)",i=e.querySelectorAll(".map__pin:not(.map__pin--main)");if(o.target.matches(r)||o.target.parentNode.matches(r)){t();for(let e=0;e<i.length;e++)i[e]!==o.target&&i[e]!==o.target.parentNode||(n=window.filtered.data[e]);window.pins.activePin(o.target),(t=>{const o=e.querySelector(".map__filters-container"),n=document.createDocumentFragment();n.appendChild((e=>{const t=document.querySelector("#card").content.querySelector(".popup").cloneNode(!0),o=t.querySelector(".popup__avatar"),n=t.querySelector(".popup__title"),r=t.querySelector(".popup__text--address"),i=t.querySelector(".popup__text--price"),a=t.querySelector(".popup__type"),s=t.querySelector(".popup__text--capacity"),d=t.querySelector(".popup__text--time"),l=t.querySelector(".popup__description"),c=t.querySelector(".popup__features");c.innerHTML="";const u=t.querySelector(".popup__photos");u.innerHTML="";const p=(e,t,o)=>{t?e.remove():e.textContent=o};p(n,!e.offer.title,e.offer.title),p(i,!e.offer.price,e.offer.price+" ₽/ночь"),p(a,!e.offer.type,{flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"}[e.offer.type]),p(s,!e.offer.rooms&&!e.offer.guests,`${e.offer.rooms} комнаты для ${e.offer.guests} гостей`),p(d,!e.offer.checkin&&!e.offer.checkout,`Заезд после ${e.offer.checkin}, выезд до ${e.offer.checkout}`),p(l,!e.offer.description,e.offer.description),p(r,!e.offer.address,e.offer.address),e.author.avatar?o.src=e.author.avatar:o.remove();for(let t=0;t<e.offer.features.length;t++)e.offer.features?(c.insertAdjacentHTML("beforeend",`<li class="popup__feature popup__feature--${e.offer.features[t]}"></li>`),c.children[t].textContent=e.offer.features[t]):c.remove();for(let t=0;t<e.offer.photos.length;t++)e.offer.photos?u.insertAdjacentHTML("beforeend",`<img src="${e.offer.photos[t]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`):u.remove();return t})(t)),e.insertBefore(n,o)})(n),e.addEventListener("click",(e=>{e.target.matches(".popup__close")&&t()})),document.addEventListener("keydown",(e=>{"Escape"===e.key&&t()}))}},cardClose:t}})(),(()=>{const e=["gif","jpg","jpeg","png"],t=window.util.adForm,o=window.util.timeIn,n=window.util.timeOut,r=window.util.houseType,i=t.querySelector("#price"),a=window.util.roomNumber,s=window.util.capacity,d=t.querySelector("#avatar"),l=t.querySelector("#images"),c=t.querySelector(".ad-form-header__preview img"),u=t.querySelector(".ad-form__photo img"),p=(t,o)=>{const n=t.files[0],r=n.name.toLowerCase();if(e.some((e=>r.endsWith(e)))){const e=new FileReader;e.addEventListener("load",(()=>{o.src=e.result,o.classList.remove("hidden")})),e.readAsDataURL(n)}},m=()=>{const e=Number(s.value),t=Number(a.value);e<=t&&100!==t&&0!==e||100===t&&0===e?s.setCustomValidity(""):s.setCustomValidity("Измените количество комнат или гостей"),s.reportValidity()},w=()=>{"bungalow"===r.value?(i.min=0,i.placeholder="0"):"flat"===r.value?(i.min=1e3,i.placeholder="1000"):"house"===r.value?(i.min=5e3,i.placeholder="5000"):(i.min=1e4,i.placeholder="10000")},f=()=>{o.value!==n.value&&(o.value=n.value)},v=()=>{n.value!==o.value&&(n.value=o.value)};window.validation={addValidation:()=>{m(),o.addEventListener("input",v),n.addEventListener("input",f),r.addEventListener("input",w),s.addEventListener("input",m),a.addEventListener("input",m),d.addEventListener("change",(()=>{p(d,c)})),l.addEventListener("change",(()=>{p(l,u)}))},removeValidation:()=>{i.placeholder="1000",c.src="img/muffin-grey.svg",u.classList.add("hidden"),o.removeEventListener("input",v),n.removeEventListener("input",f),r.removeEventListener("input",w),s.removeEventListener("input",m),a.removeEventListener("input",m),d.removeEventListener("change",(()=>{p(d,c)})),l.removeEventListener("change",(()=>{p(l,u)}))},getMainPinCoords:(e,o)=>{const n=window.util.mapPinMain,r=Math.ceil(.5*n.clientWidth),i=n.clientWidth+16,a=t.querySelector("#address"),s=`${parseInt(e,10)+r}, ${parseInt(o,10)+i}`;a.value=s}}})(),(()=>{const e=window.util.map,t=window.util.mapPinMain,o=e.querySelector(".map__pins").clientWidth,n=32.5;t.addEventListener("mousedown",(r=>{r.preventDefault();const i=r=>{r.preventDefault();const i=r.pageX-e.offsetLeft,a=r.pageY-e.offsetTop;t.style.left=i<=0?"-32.5px":i>=o?o-n+"px":i-n+"px",t.style.top=a<=167?"130px":a>=590?"550px":a-n+"px",window.validation.getMainPinCoords(t.style.left,t.style.top)},a=e=>{e.preventDefault(),window.validation.getMainPinCoords(t.style.left,t.style.top),document.removeEventListener("mousemove",i),document.removeEventListener("mouseup",a)};document.addEventListener("mousemove",i),document.addEventListener("mouseup",a)}))})(),(()=>{const e=document.querySelector("main"),t=t=>{const o=document.createDocumentFragment();return o.appendChild(t),e.appendChild(o)},o=e=>{const t=()=>{document.querySelector(e).remove(),document.removeEventListener("mousedown",t),document.removeEventListener("keydown",(e=>{window.util.onEscPress(e,t)}))};document.addEventListener("mousedown",t),document.addEventListener("keydown",(e=>{window.util.onEscPress(e,t)}))};window.messages={loadErrorMessage:e=>{const t=document.createElement("div");t.classList.add("load-err"),t.style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);\n      padding: 30px; max-width: 100%;\n      font-size: 30px; text-align: center; background-color: #CD5C5C; color: white;\n      border-radius: 5px;\n      z-index: 100;",t.textContent=e,document.body.appendChild(t),o(".load-err")},saveSuccessMessage:()=>{const e=document.querySelector("#success").content.querySelector(".success");t(e),window.events.removeEvents(),window.util.adForm.reset(),o(".success")},saveErrorMessage:()=>{const e=document.querySelector("#error").content.querySelector(".error");t(e),o(".error")}}})(),(()=>{const e=(e,t,o)=>{e.responseType="json",e.timeout=1e4,e.addEventListener("load",(()=>{200===e.status?t(e.response):o(`Статус ответа: ${e.status} ${e.statusText}`)})),e.addEventListener("error",(()=>{o("Произошла ошибка соеденения")})),e.addEventListener("timeout",(()=>{o(`Запрос не успел выполниться за ${e.timeout}мс`)}))};window.backend={load:(t,o)=>{const n=new XMLHttpRequest;e(n,t,o),n.open("GET","https://21.javascript.pages.academy/keksobooking/data"),n.send()},onLoadHandler:e=>{const t=e;window.onLoad={data:t},window.filter.updatePins(),window.events.formActivation(window.util.mapFilters,!0)},adFormSave:t=>{((t,o,n)=>{const r=new XMLHttpRequest;e(r,o,n),r.open("POST","https://21.javascript.pages.academy/keksobooking"),r.send(t)})(new FormData(window.util.adForm),window.messages.saveSuccessMessage,window.messages.saveErrorMessage),t.preventDefault()}}})(),(()=>{const e=window.util.mapFilters,t=e.querySelector("#housing-type"),o=e.querySelector("#housing-price"),n=e.querySelector("#housing-rooms"),r=e.querySelector("#housing-guests"),i=e.querySelectorAll(".map__checkbox");window.filter={updatePins:()=>{let e=window.onLoad.data;window.cards.cardClose(),window.pins.removePins();for(let t=0;t<i.length;t++)i[t].checked&&(e=e.filter((e=>e.offer.features.includes(i[t].value))));const a=[{name:t,filterFunction:t=>{e=e.filter((e=>e.offer.type===t))}},{name:o,filterFunction:t=>{e=e.filter((e=>{switch(t){case"middle":return e.offer.price>=1e4&&e.offer.price<=5e4;case"low":return e.offer.price<1e4;case"high":return e.offer.price>5e4;default:return!1}}))}},{name:n,filterFunction:t=>{e=e.filter((e=>e.offer.rooms===Number(t)))}},{name:r,filterFunction:t=>{e=e.filter((e=>e.offer.guests===Number(t)))}}];for(let e=0;e<a.length;e++){const t=a[e].name.value;"any"!==t&&a[e].filterFunction(t)}window.pins.createPins(e),window.filtered={data:e}}}})(),(()=>{const e=window.util.map,t=window.util.mapPinMain,o=window.util.mapFilters,n=window.util.adForm,r=(e,t)=>{const o=e.querySelectorAll("fieldset, select");if(!1===t)for(let e=0;e<o.length;e++)o[e].setAttribute("disabled","disabled");else for(let e=0;e<o.length;e++)o[e].removeAttribute("disabled")},i=()=>{e.classList.contains("map--faded")&&window.backend.load(window.backend.onLoadHandler,window.messages.loadErrorMessage),o.addEventListener("change",window.debounce(window.filter.updatePins)),e.classList.remove("map--faded"),n.classList.remove("ad-form--disabled"),r(n,!0),window.validation.addValidation(),n.addEventListener("submit",(e=>{window.backend.adFormSave(e)})),n.addEventListener("reset",a),e.addEventListener("click",window.cards.cardOpen),e.addEventListener("keydown",(e=>{window.util.onEnterPress(e,window.cards.cardOpen)}))},a=()=>{window.pins.removePins(),window.cards.cardClose(),e.classList.add("map--faded"),n.classList.add("ad-form--disabled"),t.style="left: 570px;top: 375px;",r(o,!1),r(n,!1),window.validation.removeValidation(),n.removeEventListener("submit",(e=>{window.backend.adFormSave(e,a)})),n.removeEventListener("reset",a),e.removeEventListener("click",window.cards.cardOpen),e.removeEventListener("keydown",(e=>{window.util.onEnterPress(e,window.cards.cardOpen)}))};t.addEventListener("mousedown",(e=>{1===e.which&&i()})),t.addEventListener("keydown",(e=>{window.util.onEnterPress(e,i)})),r(o,!1),r(n,!1),window.events={removeEvents:a,formActivation:r}})()})();