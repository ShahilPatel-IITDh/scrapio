
            
    function ieWarning() {
      document.body.setAttribute("style", "padding-bottom: 120px;");
      var warning = document.createElement("section");
      warning.setAttribute("class", "ie-disclaimer");
      warning.setAttribute("style", "background-color: #000; color:#fff; padding: 10px 40px; position: fixed; bottom: 0; z-index: 1040; height: 120px;");
      warning.setAttribute("aria-label", "Important notice regarding browser support");
      var warningContent = 'Please note: As of February 15, 2022, this website will no longer function with this browser' +
      ' version. This website was built to support the use of modern browsers. The browser that you are currently using' +
      ' is no longer fully supported by Microsoft and is not considered a modern browser. To use this site, please open' +
      ' in a modern browser like Google Chrome, Firefox, Safari, or a currently supported version of Microsoft Edge.';
      warning.innerHTML = warningContent;
      var firstElement = document.body.children[0];
      document.body.insertBefore(warning, firstElement);
    }
    window.addEventListener("load", ieWarning);
  
          