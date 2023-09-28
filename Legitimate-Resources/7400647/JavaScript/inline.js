
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
        jQuery(document).ready(function() {
            setTimeout(() => {
                document.getElementById('VideoWorker-0').load();
            }, 3000);
        });
    }
