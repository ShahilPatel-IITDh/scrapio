
      if (!window.mainTracker) {
        window.mainTracker = "tilda";
      }
      setTimeout(function () {
        (function (d, w, k, o, g) {
          var n = d.getElementsByTagName(o)[0],
            s = d.createElement(o),
            f = function () {
              n.parentNode.insertBefore(s, n);
            };
          s.type = "text/javascript";
          s.async = true;
          s.key = k;
          s.id = "tildastatscript";
          s.src = g;
          if (w.opera == "[object Opera]") {
            d.addEventListener("DOMContentLoaded", f, false);
          } else {
            f();
          }
        })(
          document,
          window,
          "acf30d49d9191dd680a8e54fcc01de80",
          "script",
          "js/tilda-stat-1.0.min.js"
        );
      }, 2000);
    