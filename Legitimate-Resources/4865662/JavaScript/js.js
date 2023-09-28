(function() {
  var f = document.getElementsByTagName('script')[0],
      s = document.createElement('script');
  s.async = true;
  s.defer = true;
  s.setAttribute('data-jac-ssc', '{"metrics":{"samplingPercent":5,"samplingRateExempt":["FetchTimeoutCount"]},"host":"https://webc2s-oao.pubgw.yahoo.com/jac/"}');
  s.src = 'https://jac.yahoosandbox.com/1.7.3/jac.js';
  f.parentNode.insertBefore(s, f);
})();
