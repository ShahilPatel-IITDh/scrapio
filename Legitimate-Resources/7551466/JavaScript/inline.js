
    var buttons = document.querySelectorAll(".button-call-center");

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
          fetch('/restapi/api/FBConversionsRequest', {
              method: 'POST',
              body: JSON.stringify({
                  userAgent: navigator.userAgent
              }),
              headers: {
                  'Content-type': 'application/json; charset=UTF-8'
              }
           })
        });
    }
