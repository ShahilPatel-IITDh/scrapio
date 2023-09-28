(function (window) {
          let puburl = '';
          try {
            puburl = window.top.location.href;
          } catch(e) {
            puburl = window.location.href;
          }
          var prescript = document.createElement("script");
          var adHost = "https://servingcdn.net/";
          var href = encodeURIComponent(puburl.toLowerCase());
          var params = "?uid=5e18adb5b6e69a5d886e2702&w=320&h=50&click=&puburl=" + href;
          var src = encodeURI(adHost + params);
          prescript.setAttribute("src", src);
          document.body.appendChild(prescript);
          
        })(window);