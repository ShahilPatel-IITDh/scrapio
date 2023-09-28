
    const marketoEnv = "prod";
    (function(){
      if(!window?.ALLYSF?.LOAD?.lendingPageAnalytics){
        return false;
      }
      const elem = document.createElement('script');
      elem.id = 'ALLYSF-Marketo';
      elem.type = 'text/javascript';
      elem.async = 'true';
      elem.src = '/content/dam/static/js/ext/ven/mkto/marketo.'
        + marketoEnv + '.'
        + window.ALLYSF.API.MARKETO.version
        + '.js';
      document.head.appendChild(elem);
    }());
  