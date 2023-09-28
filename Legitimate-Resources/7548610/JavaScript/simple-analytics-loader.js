!(function(s, i, m, p, l, e) {
    const parent = document.querySelector('#simple-analytics-loader');
    if (!parent) return;
    const dnt = s.doNotTrack || m.doNotTrack || m.msDoNotTrack;
    if (/yes|1/.test(dnt) && parent) {
      parent.setAttribute('data-enabled', false);
      return console.warn('Simple Analytics: Not loading script when doNotTrack is enabled');
    }
    l = i.createElement(p);
    l.addEventListener('load', function() {
      if (parent) {
      parent.setAttribute('data-loaded', true);
        let event;
        if (typeof Event === 'function') {
          event = new Event('script-loaded');
        } else {
          event = document.createEvent('Event');
          event.initEvent('script-loaded', true, true);
        }
        parent.dispatchEvent(event);
      }
    }, false)
    l.async = "true";
    l.src="https://apisa.polkadot.network/latest.js";
    l.type="text/javascript";
    l.setAttribute('id', 'simple-analytics');
    
    e = i.getElementsByTagName(p)[0];
    e.parentNode.insertBefore(l, e);
  })(
    window,
    document,
    navigator,
    'script'
  )