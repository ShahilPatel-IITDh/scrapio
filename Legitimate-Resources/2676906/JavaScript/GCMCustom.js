$(document).ready(function () {
    SetGCMPushNotificationTask();
});

function SetGCMPushNotificationTask() {
    if (window.Notification == undefined) {
        return;
    }
    else {
        try {
            window.addEventListener('load', function () {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.register('/service-worker-0001.js').then(function (registration) {
                        registration.update();
                        initialiseState();
                    }, function (err) {
                        console.log('ServiceWorker registration failed: ' + err);
                    });
                }
            });
        }
        catch (e) {

        }
    }
}