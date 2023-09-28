
      $(window).load(function () {
          "use strict";
          $(window).bind('scroll', function () {
          });

          $('body').scrollspy({
              target: '.navbar-default',
              offset: 70
          })
      });
  