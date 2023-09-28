// console.log('1 >>> window.parent.location: \n', window.parent.location);
// console.log('2 >>> window.parent.location.href: \n', window.parent.location.href);
// console.log('3 >>> window.location: \n', window.location);
// console.log('4 >>> window.location.href: \n', window.location.href);
// console.log('5 >>> window.location.host: \n', window.location.host);
// console.log('6 >>> window.location.origin: \n', window.location.origin);


/* eslint-disable */
function Widget(src, opaId, isFz59) {
  const ACTION_ID = 'js-show-iframe-wrapper';
  const BLOCK_ACTION_CLASS = 'pos-block-action';

  let fz59 = isFz59 ? 'true' : 'false';
  src += '?opaId=' + opaId + '&fz59=' + fz59;

  let div = document.createElement('div');
  let header = document.createElement('header');
  let overlay = document.createElement('div');
  let body = document.getElementsByTagName('body')[0];

  //  css
  div.style.background = 'white';
  div.style.position = 'fixed';
  div.style.maxWidth = '620px';
  div.style.maxHeight = '768px';
  div.style.margin = 'auto';
  div.style.top = '0';
  div.style.bottom = '0';
  div.style.left = '0';
  div.style.right = '0';
  div.style.zIndex = '999999999';

  overlay.style.position = 'fixed';
  overlay.style.zIndex = '999999998';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.backgroundColor = 'rgba(0,0,0,.3)';

  // attr
  div.setAttribute('id', 'js-iframe-wrapper');
  overlay.setAttribute('id', 'js-iframe-overlay');
  let iframe = document.createElement('iframe');

  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = '0';

  iframe.setAttribute('src', src);
  iframe.setAttribute('id', 'js-iframe-widget');
  iframe.referrerPolicy = 'unsafe-url';

  div.appendChild(iframe);
  header.innerHTML = 'Новое обращение';

  function destroy() {
    let body = document.getElementsByTagName('body')[0];
    let wOverlay = document.getElementById('js-iframe-overlay');
    let wWrapper = document.getElementById('js-iframe-wrapper');
    wWrapper && body.removeChild(wWrapper);
    wOverlay && body.removeChild(wOverlay);
  }

  function create() {
    body.appendChild(div);
    body.appendChild(overlay);
  }

  function closeWidget() {
    destroy();
  }

  function showWidget() {
    create();
  }

  const openWidgetBtn = document.getElementById(ACTION_ID);

  if (openWidgetBtn) {

    openWidgetBtn.addEventListener('click', function (e) {

      e.preventDefault();
      showWidget();
    });

    openWidgetBtn.addEventListener('touchend', function (e) {

      if (!document.getElementById(ACTION_ID).classList.contains(BLOCK_ACTION_CLASS)) {

        showWidget();
      } else {

        setTimeout(function () {
          document.getElementById(ACTION_ID).classList.remove(BLOCK_ACTION_CLASS);
        }, 0);

      }

    });

    openWidgetBtn.addEventListener('touchmove', function (e) {

      document.getElementById(ACTION_ID).classList.add(BLOCK_ACTION_CLASS); // предотвращаем экшен при скролле на лаптопах
    });
  }

  window.addEventListener('message', function (event) {
    if (event.data.close) {
      closeWidget();
    }
  }, false);

  // переопределяем слоган
  (function overrideSlogan() {
    const posBanner = document.getElementById(ACTION_ID);
    const posButton = posBanner.querySelector('.bf-1 .pos-banner-btn_2') || posBanner.querySelector('.bf-2 .pos-banner-btn_2');
    
    if (posBanner) {
      const sloganTag = posBanner.querySelector('.bf-1__slogan') || posBanner.querySelector('.bf-2__slogan');

      if (sloganTag) {
        sloganTag.innerHTML = 'Решаем вместе';
      }
      
      if(posButton){
        posButton.innerHTML = 'Сообщить о проблеме';
        posButton.style.width = '240px';
      }
    }

  })();

}
