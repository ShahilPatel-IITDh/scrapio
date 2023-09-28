
(function () {

  'use strict';

  function ImagesSrcReplacer () {

    var attribute = 'data-src';
    var matches = document.querySelectorAll('img[' + attribute + ']');

    for (var i = 0, n = matches.length; i < n; i++) {

      var attrValue = matches[i].getAttribute(attribute);

      if (_isHighDensity ()) {

        var name = attrValue.substring(0, attrValue.lastIndexOf('.'));
        var extention = attrValue.substring(attrValue.lastIndexOf('.'), attrValue.length);

        matches[i].setAttribute('src', name + '@2x' + extention);

      } else {
        matches[i].setAttribute('src', attrValue)
      }
    }

    /**
     * Detect high density
     * @returns {*|boolean}
     */
    function _isHighDensity () {
      return (
      (window.matchMedia &&
      (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches ||
       window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) ||
      (window.devicePixelRatio &&
       window.devicePixelRatio > 1.3));
    }
  }

  return new ImagesSrcReplacer()

}(document, window));
