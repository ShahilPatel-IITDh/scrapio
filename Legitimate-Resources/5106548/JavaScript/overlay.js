(function () {
  "use strict";

  function closest(el, selector) {
    var matchesSelector =
      el.matches ||
      el.webkitMatchesSelector ||
      el.mozMatchesSelector ||
      el.msMatchesSelector;

    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      } else {
        el = el.parentElement;
      }
    }
    return null;
  }

  function validateUnits(units) {
    var i = new Image();
    i.style.width = units;
    return i.style.width;
  }

  function closeOverlay() {
    removeEventListeners();

    var overlays = document.getElementsByClassName("lookbook-overlay");

    if (overlays.length > 0) {
      for (var i = 0; i < overlays.length; i += 1) {
        overlays[i].parentNode.removeChild(overlays[i]);
      }
    }

    var queryParamsWithoutOverlayUrl =
      window.location.search.split("&").filter(function(query) { return query.indexOf("overlay_url=") == -1 }).join("&");
    window.history.pushState(
      {},
      window.document.title,
      window.location.origin + window.location.pathname + queryParamsWithoutOverlayUrl
    );
  }

  function closeOverlayOnClick() {
    closeOverlay();
  }

  function closeOverlayOnBackgroundClick(event) {
    if (event.target.id === "lookbook-overlay-mask") {
      closeOverlay();
    }
  }

  function closeOverlayOnEscape(event) {
    event = event || window.event;
    var isEscape = false;
    if ("key" in event) {
      isEscape = event.key === "Escape" || event.key === "Esc";
    } else {
      isEscape = event.keyCode === 27;
    }
    if (isEscape) {
      closeOverlay();
    }
  }

  function removeEventListeners() {
    var closeButton = document.getElementById("lookbook-overlay-close");
    closeButton.removeEventListener("click", closeOverlayOnClick);
    document.removeEventListener("keydown", closeOverlayOnEscape);
    document.removeEventListener("click", closeOverlayOnBackgroundClick);
  }

  function showOverlay(
    url,
    overlayWidth,
    overlayHeight,
    shouldCloseOverlayOnBackgroundClick,
    target
  ) {
    if (!url) {
      return false;
    }

    var iframe = document.createElement("iframe");
    iframe.className = "lookbook-overlay-content";
    iframe.title = "overlay-content";
    iframe.src = url;
    iframe.style.width = overlayWidth;
    iframe.style.height = overlayHeight;
    iframe.setAttribute("webkitallowfullscreen", true);
    iframe.setAttribute("mozallowfullscreen", true);
    iframe.setAttribute("allowfullscreen", true);

    var closeButtonWrapper = document.createElement("div");
    closeButtonWrapper.style.height = overlayHeight;
    closeButtonWrapper.className = "lookbook-overlay-close-wrapper";
    var closeButton = document.createElement("div");
    closeButton.id = "lookbook-overlay-close";
    closeButton.className = "lookbook-overlay-close";
    closeButton.innerHTML = "<span>&times;</span>";
    closeButton.addEventListener("click", closeOverlayOnClick);
    closeButtonWrapper.appendChild(closeButton);

    var closeButtonBackgroundColor = target.getAttribute("data-lookbook-close-background-color");
    if (closeButtonBackgroundColor) {
      closeButton.style.backgroundColor = closeButtonBackgroundColor;
    }

    var overlay = document.createElement("div");
    overlay.id = "lookbook-overlay-mask";
    overlay.className = "lookbook-overlay";
    overlay.appendChild(iframe);
    overlay.appendChild(closeButtonWrapper);

    document.body.appendChild(overlay);
    document.addEventListener("keydown", closeOverlayOnEscape);
    if (shouldCloseOverlayOnBackgroundClick) {
      document.addEventListener("click", closeOverlayOnBackgroundClick);
    }
  }

  document.addEventListener("click", function (event) {
    var url;
    var queryString = "";
    var overlayQueryString = "lb-mode=overlay";
    var target = closest(event.target, "[data-lookbook-overlay-href]");
    if (target) {
      url = target.getAttribute("data-lookbook-overlay-href");
      queryString = overlayQueryString;
    }
    if (!url) {
      target = closest(event.target, "[href*='" + overlayQueryString + "']");
      if (target) {
        var search = target.search;
        if (
          search &&
          search.substring(1).split("&").indexOf(overlayQueryString) > -1
        ) {
          url = target.href;
        }
      }
    }
    if (url) {
      if (target.tagName === "A" || target.tagName === "AREA") {
        event.preventDefault();
      }
      var overlayWidth = validateUnits(
        target.getAttribute("data-lookbook-overlay-width") || "80%"
      );
      var overlayHeight = validateUnits(
        target.getAttribute("data-lookbook-overlay-height") || "80%"
      );
      var shouldCloseOverlayOnBackgroundClick =
        target.getAttribute("data-lookbook-bg-click-close") === "true";

      queryString += "&lb-width=" + encodeURIComponent("100%");
      queryString += "&lb-height=" + encodeURIComponent("100%");

      url = url + (url.indexOf("?") === -1 ? "?" : "&") + queryString;
      showOverlay(
        url,
        overlayWidth,
        overlayHeight,
        shouldCloseOverlayOnBackgroundClick,
        target
      );
    }
  });
})();