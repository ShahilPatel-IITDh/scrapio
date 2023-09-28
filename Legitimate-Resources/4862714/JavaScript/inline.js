
      function i(co) {
        window.Comm100API = window.Comm100API || new Object();
        window.Comm100API.site_id = "100007016";
        window.Comm100API.main_code_plan = co;
      }
      var load_comm100 = function n(co) {
        var elem = document.querySelector("#com1");
        var elem3 = document.querySelector("#comm100-container");
        if (!elem3) {
          i(co);
          var a = document.createElement("script");
          var c = document.getElementsByTagName("script")[0];
          a.type = "text/javascript";
          a.async = !0;
          a.id = "com1";
          a.src =
            "https://liveagentchatter.com/chatserver/livechat.ashx?siteId=" +
            window.Comm100API.site_id;
          c.parentNode.insertBefore(a, c);
        } else {
          i(co);
          elem.remove();
          elem3.remove();
          Comm100API = {};
          window.Comm100API.site_id = "100007016";
          window.Comm100API.main_code_plan = co;
          var a = document.createElement("script");
          var c = document.getElementsByTagName("script")[0];
          a.type = "text/javascript";
          a.async = !0;
          a.id = "com1";
          a.src =
            "https://liveagentchatter.com/chatserver/livechat.ashx?siteId=" +
            window.Comm100API.site_id;
          c.parentNode.insertBefore(a, c);
        }
      };
      window.Comm100_load = { Comm100_load: load_comm100 };
    