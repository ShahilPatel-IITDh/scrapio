
  (function() {
    // Set to the event you want to track
    var eventName = 'click',
    // Set to false if you don't want to use capture phase
        useCapture = true,
    // Set to false if you want to track all events and not just those in shadow DOM
        trackOnlyShadowDom = true;

    var callback = function(event) {
      if ('composed' in event && typeof event.composedPath === 'function') {
        // Get the path of elements the event climbed through, e.g.
        // [span, div, div, section, body]
        var path = event.composedPath();
        
        // Fetch reference to the element that was actually clicked
        var targetElement = path[0];
        
        // Check if the element is WITHIN the shadow DOM (ignoring the root)
        var shadowFound = path.length ? path.filter(function(i) {
          return !targetElement.shadowRoot && !!i.shadowRoot;
        }).length > 0 : false;
        
        // If only shadow DOM events should be tracked and the element is not within one, return
        //if (trackOnlyShadowDom && !shadowFound) return;
        
        // Push to dataLayer
        if(shadowFound) {
            window.dataLayer.push({
                event: "gtm.click",

                'gtm.element': targetElement,
                'gtm.elementClasses': targetElement.className || '',
                'gtm.elementId': targetElement.id || '',
                'gtm.elementTarget': targetElement.target || '',
                'gtm.elementUrl': targetElement.href || targetElement.action || '',
                inShadowDom: shadowFound

            });
        } else {
            window.dataLayer.push({
                event: "gtm.click",
                inShadowDom: shadowFound
            });
        }
      }
    };
    
    document.addEventListener(eventName, callback, useCapture);
  })();
