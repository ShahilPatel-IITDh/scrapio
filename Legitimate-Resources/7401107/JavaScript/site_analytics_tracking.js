
  var _yts = _yts || [];
  var tracking_tag = document.getElementById('site_analytics_tracking');
  _yts.push(["_siteId", tracking_tag.getAttribute('data-id')]);
  _yts.push(["_userId", tracking_tag.getAttribute('data-user')]);
  _yts.push(["_partnerId", tracking_tag.getAttribute('data-partner')]);
  _yts.push(["_trackPageview"]);
  (function() {
    var yts = document.createElement("script");
    yts.type = "text/javascript";
    yts.async = true;
    yts.src = document.getElementById('site_analytics_tracking').getAttribute('data-url');
    (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]).appendChild(yts);
  })();
