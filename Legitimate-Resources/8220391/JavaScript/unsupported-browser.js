/* eslint-disable no-var */
(function () {
  var request = new XMLHttpRequest();
  var showDialog = true;

  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      var response = JSON.parse(this.responseText);
      if (showDialog) {
        showDialog = false;
        displayAlert(response);
      }
    }
  };
  request.open('GET', '/api/content/configs');
  request.setRequestHeader('x-request-id', 'unsupported-browser-cid');
  request.send();

  function displayAlert(response) {
    var container = document.createElement('div');
    var overlay = document.createElement('div');
    var dialog = document.createElement('div');
    var wrapper = document.createElement('div');
    var button = document.createElement('button');
    var icon = document.createElement('span');
    var paragraph = document.createElement('div');

    dialog.setAttribute('role', 'alert');
    button.setAttribute('type', 'button');
    button.setAttribute('name', 'button');
    button.setAttribute('autofocus');

    container.className = 'ws-unsupported-browser';
    overlay.className = 'ws-unsupported-browser__overlay';
    dialog.className = 'ws-unsupported-browser__dialog ws-card';
    icon.className = 'ws-icon notranslate base-color3--text';

    var style = document.createElement('style');
    style.innerHTML =
      '.ws-unsupported-browser__dialog {' +
      'display: flex;' +
      'position: fixed;' +
      'max-width: 500px;' +
      'padding: 24px;' +
      'z-index: 7;' +
      'top: 50%;' +
      'left: 50%;' +
      'transform: translate(-50%, -50%);' +
      '}' +
      '.ws-unsupported-browser__overlay {' +
      'background-color: rgba(0, 0, 0, 0.5);' +
      'width: 100%;' +
      'height: 100%;' +
      'overflow: hidden;' +
      'position: fixed;' +
      'top: 0;' +
      'bottom: 0;' +
      'left: 0;' +
      'z-index: 6' +
      '}';

    icon.innerHTML = 'clear';
    paragraph.innerHTML = response.client.unsupportedbrowsertext;

    button.appendChild(icon);
    wrapper.appendChild(button);
    dialog.appendChild(paragraph);
    container.appendChild(overlay);
    container.appendChild(dialog);
    dialog.appendChild(wrapper);
    container.appendChild(style);
    document.body.appendChild(container);

    overlay.onclick = function () {
      document.body.removeChild(container);
    };
    button.onclick = function () {
      document.body.removeChild(container);
    };
  }
})();
