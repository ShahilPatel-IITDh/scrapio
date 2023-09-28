(function () {
  if (!XMLHttpRequest) return;
  if (document.referrer === '') return;

  var contentElement = document.querySelector('script[data-bsp-contentid]');
  if (contentElement !== undefined) {
    var contentId = contentElement.getAttribute('data-bsp-contentid');

    if (contentId !== null) {
      var req = new XMLHttpRequest();
      req.open('POST', '/cms/siteSearchClick', true);
      req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      req.send('referrer=' + encodeURIComponent(document.referrer) + '&contentId=' + contentId);
    }
  }
})();
