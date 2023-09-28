
    var _sf_async_config = _sf_async_config || {};
    var _sf_isPc = "";
    if (typeof isPaidContent != 'undefined') {
        if (isPaidContent == true) {
            _sf_isPc = ",paid";
        } else {
            _sf_isPc = ",free";
        }
    }
    _sf_async_config.sections = global_ressort + _sf_isPc;
    //_sf_async_config.authors = 'Change this to your Author name'; //CHANGE THIS

    _cbq = window._cbq = (window._cbq || []);

    (function() {
        function loadChartbeat() {
            function _loadChartbeat() {
                window._sf_endpt = (new Date()).getTime();
                var e = document.createElement('script');
                e.setAttribute('language', 'javascript');
                e.setAttribute('type', 'text/javascript');
                e.setAttribute('src', '//static.chartbeat.com/js/chartbeat.js');
                document.body.appendChild(e);
            }

            LR.handleAsyncScript('chartbeat', function() {
                _loadChartbeat();
            });
        };
        var oldonload = window.onload;
        window.onload = (typeof window.onload != 'function') ?
            loadChartbeat : function() {
                oldonload();
        loadChartbeat();
    };
    })();
