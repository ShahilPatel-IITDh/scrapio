if (typeof Sentry !== 'undefined') {
          window.addEventListener('unhandledrejection', event => {
            console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
            Sentry.captureMessage(event.reason);
          });
          Sentry.init({
            dsn: 'https://949d37812f604f039041170b5601fa1a@o529943.ingest.sentry.io/6149229',
            release: '42afed9975a66b8b57123d60406d872d091f2122',
            attachStacktrace: true,
            environment: 'prod',
            integrations: [new Sentry.BrowserTracing()],
            tracesSampleRate: 1,
            denyUrls: [/^chrome-extension:\/\//i],
            beforeSend: (event, hint) => {
              var sampleRate = 0.01
              // if error level is fatal, we don't want to sample it
              if(event && event.level && event.level === 'fatal') {
                sampleRate = 1
              }
              if(hint && hint.originalException) {
                var error = hint.originalException;
                if(error && error.message === 'ResizeObserver loop limit exceeded'){
                  return null;
                }
                // add more info for some errors to make it more useful
                if(error && error.message && error.message.includes('The quota has been exceeded')){
                  try {
                    var _lsTotal = 0, _xLen, _x;
                    for (_x in localStorage) {
                      if (!localStorage.hasOwnProperty(_x)) {
                          continue;
                      }
                      _xLen = ((localStorage[_x].length + _x.length) * 2);
                      _lsTotal += _xLen;
                      if((_xLen / 1024).toFixed(2) >1) {
                        event.extra[_x.substr(0, 50)] = (_xLen / 1024).toFixed(2)
                      }
                    }
                    event.extra['localStorageTotal'] = (_lsTotal / 1024).toFixed(2)
                    event.tags['localStorage'] = '1';
                  } catch (e) {
                    event.tags['localStorage'] = '0';
                  }
                }
                // add more info for some errors to make it more useful
                if(error && error.message === 'Cannot redefine property: src') {
                  try {
                    event.extra['plugins'] = Array.from(navigator.plugins || []).map(item => item.name).join()
                    event.extra['OtAutoBlockTimes'] = Array.from(document.querySelectorAll('script')).filter(script => script.src.includes('OtAutoBlock.js')).length
                    event.tags['plugins'] = '1';
                  } catch (e) {
                    event.tags['plugins'] = '0';
                  }
                }
              }
              var random = Math.random()
              if(random <= sampleRate){
                return event;
              } else {
                return null;
              }
            }
          });
          Sentry.configureScope(scope => {
            scope.setExtra('isServer', false);
            scope.setTag('isServer', false);
          });
        }