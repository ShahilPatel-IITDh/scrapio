
    window.addEventListener('load', function (ev) {
      // Download main.dart.js
      _flutter.loader.loadEntrypoint({
        serviceWorker: {
          serviceWorkerVersion: serviceWorkerVersion,
        }
      }).then(function (engineInitializer) {
        return engineInitializer.initializeEngine();
      }).then(function (appRunner) {
        return appRunner.runApp();
      });
    });
  