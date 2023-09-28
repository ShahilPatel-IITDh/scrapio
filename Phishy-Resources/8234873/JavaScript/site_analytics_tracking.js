
  var _yts = _yts || [];
  var tracking_tag = document.getElementById("site_analytics_tracking");
  _yts.push(["_siteId", tracking_tag.getAttribute('data-id')]);
  _yts.push(["_userId", tracking_tag.getAttribute('data-user')]);
  _yts.push(["_partnerId", tracking_tag.getAttribute('data-partner')]);
  _yts.push(["_trackPageview"]);

  (function() {
    var isScriptInjected = false;

    function isRunInEditor() {
      try {
        return Boolean(window.parent.ws);
      } catch (e) {
        return false;
      }
    }

    function injectScript() {
      var yts = document.createElement("script");
      yts.type = "text/javascript";
      yts.async = true;
      yts.src = document.getElementById("site_analytics_tracking").getAttribute('data-url');
      (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(yts);
      isScriptInjected = true;
    }

    if (!isRunInEditor()) {
      var cookiePermissionsManager = window.getCookiePermissionsManager && window.getCookiePermissionsManager();

      if (cookiePermissionsManager) {
        var isSiteWitAllowed = cookiePermissionsManager.get('sitewit');
        if (isSiteWitAllowed){
          injectScript();
        }
        cookiePermissionsManager.on('sitewit', (service, isPermitted) => {
          if (isPermitted && !isScriptInjected) {
            injectScript();
          }
        });
      }else {
        window.addEventListener('load', function() {
          injectScript();
        });
      }
    }
  })();