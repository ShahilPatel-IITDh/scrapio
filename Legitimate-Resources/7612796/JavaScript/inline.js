
      window.addEventListener(
        'error',
        function (e) {
          const url = new URL(e.target.src);

          if (
            url.hostname === location.hostname &&
            /^\/.*\.js$/.test(url.pathname) &&
            window.getAllAngularRootElements === undefined
          ) {
            document
              .querySelector('.js-loading-error')
              .classList.remove('disabled');
          }
        },
        true
      );
    