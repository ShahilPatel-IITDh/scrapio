
    function saveUtms() {
        var utm = {};
        if (typeof window !== typeof undefined && typeof URLSearchParams !== typeof undefined) {
            var queryParams = new URLSearchParams(window.location.search);
            queryParams.forEach(function(value, key) {
                if (key.startsWith('utm_')) {
                    utm[ key.split('utm_')[ 1 ] ] = value;
                }
            });
            if (Object.keys(utm).length) {
                window.localStorage.setItem('one_utm', JSON.stringify(utm));
            }
        }
    }
    saveUtms();
