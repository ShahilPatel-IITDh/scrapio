(function() {
  var ajax = new XMLHttpRequest();
  ajax.open('GET', 'https://aeon-cdn-prod.axlops.nl.aegon.io/assets/latest/icons.svg', true);
  ajax.onload = function (e) {
    var div = document.createElement('div');
    div.id = 'aeon-icons-svg-sprite';
    div.style.display = 'none';
    div.innerHTML = ajax.responseText;
    document.body.insertBefore(div, document.body.childNodes[0]);
  }
  ajax.send();
})();
