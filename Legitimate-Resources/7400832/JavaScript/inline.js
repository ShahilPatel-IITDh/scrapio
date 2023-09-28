
      (function (d, t) {
         var BASE_URL = 'https://embed.mylisterhub.com';
         var g = d.createElement(t),
            s = d.getElementsByTagName(t)[0];
         g.src = BASE_URL + "/js/widget-client.js";
         s.parentNode.insertBefore(g, s);
         g.onload = function () {
            window.LiveChatWidget.initiate({
               websiteToken: 'BbO1hyXzm4DLleFB64VCFE1BcpfuNMbM5paatx1DCKUDqWTnulmp1aZ1Vp4c',
               themeColor: '#0f0f0f',
               textColor: '#ffffff',
               baseUrl: BASE_URL
            })
         }
      })(document, "script");
   