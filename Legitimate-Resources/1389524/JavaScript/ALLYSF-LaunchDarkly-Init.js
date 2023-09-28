
    (function(){
      const elem = document.createElement('script');
      elem.id = 'ALLYSF-LaunchDarkly';
      elem.type = 'text/javascript';
      elem.async = 'true';
      elem.src = '/content/dam/static/js/ext/ven/ldly/launchdarkly.'
        + window.ALLYSF.API.LAUNCH_DARKLY.version
        + '.js';
      document.head.appendChild(elem);
    }());
  