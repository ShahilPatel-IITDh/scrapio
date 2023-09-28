window.addRequireLoadCallback(function() {
    window.require(["js/edison/edison"], function (edisonModule) {
        edisonModule.Edison.waitUntilInitialized().then(function() {
            edisonModule.Edison.doneStreaming();
        });
    });
});
