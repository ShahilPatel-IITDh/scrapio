
      function addClass(e, a) {
        -1 == e.className.indexOf(a) && (e.className += a);
      }

      function removeClass(e, a) {
        e.className = e.className
          .replace(new RegExp('(\\s|^)' + a + '(\\s|$)'), ' ')
          .replace(/^\s+|\s+$/g, '');
      }

      function setBrowserWarningText() {
        var e = '',
          a = '',
          o = '',
          r = window.navigator.language || navigator.browserLanguage;
        r.match(/^es.*$/i)
          ? ((e = 'Actualiza tu navegador'),
            (a =
              'Esta versión de tu navegador no permite visualizar correctamente la página. Para que tengas una buena experiencia y mejor seguridad, te aconsejamos la descarga de cualquiera de los siguientes navegadores:'),
            (o = 'Muchas gracias'))
          : r.match(/^en.*$/i)
          ? ((e = 'Update your browser'),
            (a =
              'Your browser version does not allow you to view this page correctly. For a good experience and security, we suggest you to download any of the following browsers:'),
            (o = 'Thank you'))
          : r.match(/^pt.*$/i)
          ? ((e = 'Atualize seu navegador'),
            (a =
              'A versão de seu navegador não permite visualizar corretamente esta página. Por favor, para que você tenha uma boa experiência e mais segurança, sugerimos que abra esta página em um dos seguintes navegadores:'),
            (o = 'Obrigado.'))
          : ((e = 'Update your browser'),
            (a =
              'Your browser version does not allow you to view this page correctly. For a good experience and security, we suggest you to download any of the following browsers:'),
            (o = 'Thank you')),
          (document.getElementById('browser-title').innerHTML = e),
          (document.getElementById('browser-mainText').innerHTML = a),
          (document.getElementById('browser-closingText').innerHTML = o);
      }

      var browser = {
        isIe: function () {
          return (
            navigator.appVersion.indexOf('MSIE') > -1 ||
            navigator.appVersion.indexOf('Trident') > -1
          );
        },
        navigator: navigator.appVersion,
        getVersion: function () {
          var e = 999;
          return (
            navigator.appVersion.indexOf('MSIE') > -1
              ? (e = parseFloat(navigator.appVersion.split('MSIE')[1]))
              : navigator.appVersion.indexOf('Trident') > -1 &&
                (e = parseFloat(navigator.appVersion.split('rv:')[1])),
            e
          );
        },
      };
      window.onload = function () {
        browser.isIe() &&
          browser.getVersion() <= 11 &&
          (setBrowserWarningText(),
          removeClass(document.getElementById('ie-modal'), 'hide'),
          addClass(document.getElementById('app-container'), 'hide'),
          addClass(document.getElementById('ie-modal'), 'block-full'));
      };
    