
    (function() {
      if (document.querySelector('header.portlet-topper')) {
        document.querySelectorAll('header.portlet-topper').forEach(elem => elem.parentNode.removeChild(elem));  
      } 
    })();
  