
  var _paq = _paq || [];
  
    var customUrl = document.location || window.location;
    _paq.push(["setDomains", ["*.webexpress.retarus.com"]]);
  
  //1 to 5 for visit or page
  _paq.push(['setCustomVariable',1,'Language','en', 'visit' ]); 
  _paq.push(['setCustomVariable',1,'Language','en', 'page' ]); 

  
  
  (function() {
    var u="https://analytics.retarus.com/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', 17]);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
  })();

  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  
  if('https:' == document.location.protocol){
	_paq.push(['setSecureCookie', true]);
  }
  
