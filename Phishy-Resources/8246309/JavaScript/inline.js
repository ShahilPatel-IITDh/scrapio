
    if ('serviceWorker' in navigator) {
        $(window).on("load", function () {
            navigator.serviceWorker.register("/sw.js", { scope: '/' }).catch(function(error) {
                console.error('SW Registration failed with ' + error);
            });
        });
    }
