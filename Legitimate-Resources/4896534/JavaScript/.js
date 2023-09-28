(function (window) {
          let puburl = '';
          try {
            puburl = window.top.location.href;
          } catch(e) {
            puburl = window.location.href;
          }
          var prescript = document.createElement("script");
          var adHost = "https://servedbysmart.com/";
          var href = encodeURIComponent(puburl.toLowerCase());
          var params = "?uid=5cd96c89475de80012f86112&w=300&h=250&click=&puburl=" + href;
          var src = encodeURI(adHost + params);
          prescript.setAttribute("src", src);
          document.body.appendChild(prescript);
          
        })(window);