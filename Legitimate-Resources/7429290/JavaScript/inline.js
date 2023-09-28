(function() {
    function sendNewRelicPerformanceMetrics() {
        // normalize the browsers
        const performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance;
        const timing = performance.timing;
        const metrics = {};
        // IE bug https://gist.github.com/acdha/365f7bc0e10d2e7b7865
        if (!timing.navigationStart) {
            return;
        }

        // Timestamp for the request start
        metrics.navigationStart = timing.navigationStart;
        // Time To First Byte
        metrics.timeToFirstByte = timing.responseStart - timing.navigationStart;

        // Timestamp and duration of First Paint For Chrome
        if (window.chrome && window.performance) {
            let performanceEntries = performance.getEntriesByType('paint');

            metrics.timeToFirstPaint = Math.round(performanceEntries[1].startTime);
            metrics.firstPaint = metrics.timeToFirstPaint + metrics.navigationStart
        }

        // Timestamp and duration of First Paint For IE
        else if (typeof timing.msFirstPaint === 'number') {
            metrics.firstPaint = timing.msFirstPaint;
            metrics.timeToFirstPaint = timing.msFirstPaint- timing.navigationStart;
        }

        // Time To Dom Interactive
        if (timing.domInteractive) {
            metrics.timeToDomInteractive = timing.domInteractive - timing.navigationStart;
        }

        if (typeof newrelic == 'object') {
            newrelic.addPageAction('timings', metrics);
        }
    }
    window.addEventListener('load', sendNewRelicPerformanceMetrics, false);
})();