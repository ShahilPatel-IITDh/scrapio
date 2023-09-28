
            window.Futy = { key: '64905bd46f340' };
            (function (e, t) {
                var n = e.createElement(t);
                n.async = true;
                var f = window.Promise && window.fetch ? 'modern.js' : 'legacy.js';
                n.src = 'https://v1.widget.futy.io/js/futy-widget-' + f;
                var r = e.getElementsByTagName(t)[0];
                r.parentNode.insertBefore(n, r);
            })(document, 'script');
        