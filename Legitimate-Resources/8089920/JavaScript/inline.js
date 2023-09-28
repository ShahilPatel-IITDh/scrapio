
        if (typeof Sentry !== 'undefined') {
          window.addEventListener('unhandledrejection', (event) => {
            console.warn("UNHANDLED PROMISE REJECTION:", event.reason)
            // eslint-disable-next-line no-undef -- Sentry
            Sentry.captureMessage(event.reason)
          })
          // eslint-disable-next-line no-undef -- Sentry
          Sentry.init({
            dsn: 'https://f3051be9709a49a682c5cbc9f63e7cdb@o529943.ingest.sentry.io/5762379',
            release: window.__pika_runtime_config__.COMMIT_HEAD,
            attachStacktrace: true,
            tracesSampleRate: 0.001,
            beforeSend: (event, hint) => {
              let sampleRate = 0.01
              // if error level is fatal, we don't want to sample it
              if (event && event.level && event.level === 'fatal') {
                sampleRate = 1
              }
              if (hint && hint.originalException) {
                const error = hint.originalException
                if (error && error.message === 'ResizeObserver loop limit exceeded') {
                  return null
                }
                // add more info for some errors to make it more useful
                if (error && error.message && error.message.includes('The quota has been exceeded')) {
                  try {
                    let _lsTotal = 0
                    let _xLen
                    let _x
                    for (_x in localStorage) {
                      if (!localStorage.hasOwnProperty(_x)) {
                        continue
                      }
                      _xLen = (localStorage[_x].length + _x.length) * 2
                      _lsTotal += _xLen
                      if ((_xLen / 1024).toFixed(2) > 1) {
                        event.extra[_x.substr(0, 50)] = (_xLen / 1024).toFixed(2)
                      }
                    }
                    event.extra.localStorageTotal = (_lsTotal / 1024).toFixed(2)
                    event.tags.localStorage = '1'
                  } catch (e) {
                    event.tags.localStorage = '0'
                  }
                }
                // add more info for some errors to make it more useful
                if (error && error.message === 'Cannot redefine property: src') {
                  try {
                    event.extra.plugins = Array.from(navigator.plugins || [])
                      .map((item) => item.name)
                      .join()
                    event.extra.OtAutoBlockTimes = Array.from(document.querySelectorAll('script')).filter((script) =>
                      script.src.includes('OtAutoBlock.js'),
                    ).length
                    event.tags.plugins = '1'
                  } catch (e) {
                    event.tags.plugins = '0'
                  }
                }
              }
              const random = Math.random()
              if (random <= sampleRate) {
                return event
              }
              return null
            },
          })
        }