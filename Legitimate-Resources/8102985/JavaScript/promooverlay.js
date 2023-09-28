'use strict';

(function () {

  document.addEventListener('DOMContentLoaded', function () {
    var showOverlay = window.__promoData !== void 0 && window.__promoData.showOverlay !== void 0 ? window.__promoData.showOverlay : null;
    var overlay = document.querySelector('[data-promo-overlay]');
    var closeButton = overlay ? overlay.querySelector('[data-promo-overlay-close]') : null;
    var closedKey = 'promoOverlayClosed';

    // ensure we have the overlay and close button available
    if (!showOverlay || !overlay || !closeButton) {
      return;
    }

    /**
     * Helper to toggle the overlay active state
     *
     * @return {void}
     */
    var toggleOverlay = function toggleOverlay() {
      // add active state to overlay
      overlay.classList.toggle('promooverlay--active');
    };

    /**
     * Helper to close the overlay and store event to sessionStorage so it does
     * not open on next page visit, unless browser session closed.
     *
     * @return {void}
     */
    var closeOverlay = function closeOverlay() {
      toggleOverlay();

      window.sessionStorage.setItem(closedKey, 'true');
    };

    // show initial overlay as long as it hasn't been closed previously in session
    if (window.sessionStorage.getItem(closedKey) !== 'true') {
      toggleOverlay();
    }

    // add ability to close overlay when close button clicked
    closeButton.addEventListener('click', function (e) {
      e.preventDefault();

      closeOverlay();
    });
  });
})();
