
      var isMobile = {
              Android: function() {
                  return navigator.userAgent.match(/Android/i);
              },
              BlackBerry: function() {
                  return navigator.userAgent.match(/BlackBerry/i);
              },
              iOS: function() {
                  return navigator.userAgent.match(/iPhone|iPad|iPod/i);
              },
              any: function() {
                  return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS());
              }
          };
      if ( isMobile.Android() ) {
              document.location.href = "citiglobal://mydeals";
          }
      else if(isMobile.iOS())
      {
      document.location.href="citiglobal://mydeals";
      } else {
      document.location.href="https://online.citi.com/US/ag/products-offers/mydeals";
      }
