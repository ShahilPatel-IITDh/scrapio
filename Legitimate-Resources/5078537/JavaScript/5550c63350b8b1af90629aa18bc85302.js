(function() {

  function insertScript(content, type, id) {
    var s = document.createElement('script');
    var body = document.querySelector('body');
    s.type = type;
    if (id) {
      s.id = id;
    }
    s.innerText = content;
    body.appendChild(s);
  }

  function insertCSS(content) {
    var sheet = document.createElement('style');
    var head = document.querySelector('head');
    sheet.type = 'text/css';

    sheet.innerText = content;
    head.appendChild(sheet);
  }






}());

var doofinder_script ='//cdn.doofinder.com/media/js/doofinder-classic.7.latest.min.js';
(function(d,t){var f=d.createElement(t),s=d.getElementsByTagName(t)[0];f.async=1;
f.src=('https:'==location.protocol?'https:':'http:')+doofinder_script;
f.setAttribute('charset','utf-8');
s.parentNode.insertBefore(f,s)}(document,'script'));

var dfClassicLayers = [{
  "hashid": "5550c63350b8b1af90629aa18bc85302",
  "zone": "eu1",
  "display": {
    "lang": "it",
    "width": "65%",
    "align": "center",
    "dtop": 1,
    "facets": {
      "width": "280px",
      "attached": "left"
    }
  },
  "queryInput": "#search_query_top"
}];
