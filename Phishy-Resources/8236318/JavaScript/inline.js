
                (function() {
          var isLocalStorageSafe = true;
          try {
              if (typeof sessionStorage !== 'undefined' && sessionStorage.fsFonts) {
                document.documentElement.className = document.documentElement.className += ' wf-active';
              }
          } catch (e) {
            console.log('Failed to read from localStorage', e.message);
            isLocalStorageSafe = false;
          }

          var pre = document.createElement('link');

          pre.rel  = 'preconnect';
          pre.href = 'https://fonts.googleapis.com/';
          pre.setAttribute('crossorigin', '');

          var s = document.getElementsByTagName('head')[0];
          s.appendChild(pre);

          var fontConfig = {
            google: {
              families: [
                'Lato:400,700'
              ]
            },
            timeout: 2000,
            active: function() {
              if ( !isLocalStorageSafe || typeof sessionStorage === 'undefined') {
                return;
              }

              sessionStorage.fsFonts = true;
            }
          };

          if (typeof WebFont === 'undefined') {
              window.WebFontConfig = fontConfig;

              var wf = document.createElement('script');

              wf.type  = 'text/javascript';
              wf.async = 'true';
              wf.src   = ('https:' == document.location.protocol ? 'https' : 'http') +
                         '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';

              s.appendChild(wf);
          } else {
            WebFont.load(fontConfig);
          }
        })();

        
        if(window.addEventListener) {
            window.addEventListener('load', loadFormstack, false);
        } else if(window.attachEvent) {
            window.attachEvent('onload', loadFormstack);
        } else {
            loadFormstack();
        }
        

        function loadFormstack() {
            var form5376004 = new Formstack.Form(5376004, 'https://unicreditaustria.formstack.com/forms/');

            
            
            

            form5376004.logicFields = [];

            
            form5376004.calcFields = [];

            
            form5376004.dateCalcFields = [];

            form5376004.init();

                        if (Formstack.Analytics) {
                form5376004.plugins.analytics = new Formstack.Analytics('https://unicreditaustria.formstack.com', 5376004, form5376004);
                form5376004.plugins.analytics.trackTouch();
                form5376004.plugins.analytics.trackBottleneck();
            }
            
            
            
            
            window.form5376004 = form5376004;
        };
    