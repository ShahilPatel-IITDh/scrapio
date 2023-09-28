
        ;(function(win, doc, style, timeout) {
          var STYLE_ID = 'at-body-style';

          function getParent() {
            return doc.getElementsByTagName('head')[0];
          }

          function addStyle(parent, id, def) {
            if (!parent) {
              return;
            }

            var style = doc.createElement('style');
            style.id = id;
            style.innerHTML = def;
            parent.appendChild(style);
            return style
          }

          var style = addStyle(getParent(), STYLE_ID, style);
          setTimeout(function() {
            if (style && style.parentNode && style.parentNode.removeChild) {
              style.parentNode.removeChild(style);
            }
          }, timeout);
        }(window, document, "body {opacity: 0 !important}", 3000));
      