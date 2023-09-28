(function(){
    function r(f){/in/.test(document.readyState)?setTimeout(r,9,f):f()}
    r(function(){
        function b(prefix)
        {
            var script = document.getElementById(prefix + '-s');
            if (!script) return;
            var position = script.getAttribute('data-p'),
                color = script.getAttribute('data-c'),
                type = script.getAttribute('data-t'),
                id = script.getAttribute('data-i'),
                monitor = parseInt(script.getAttribute('data-s'), 10),
                badge = document.createElement('div'),
                badgeClass = [],
                event = badge.addEventListener ? 'click' : (badge.attachEvent ? 'onclick' : false),
                handler = badge.addEventListener ? 'addEventListener' : (badge.attachEvent ? 'attachEvent' : false),
                shade = (("d" === color || "dark" === color) ? "dark" : "light"),
                css = document.createElement('link')
            ;
            
            css.setAttribute('rel', 'stylesheet');
            css.setAttribute('type', 'text/css');

            badgeClass.push(prefix + '-' + (("l" === position || "left" === position) ? "left" : (("r" === position || "right" === position) ? "right" : "relative")));
            badgeClass.push(prefix + '-' + shade);
            badge.id = prefix + '-badge';
            badge.className = badgeClass.join(' ');

            if ("g" === type)
            {
                css.setAttribute('href', "https://cdn.sucuri.net/badge/badge-godaddy.css");
            }
            else
            {
                var symbol = document.createElement('div'),
                    text = document.createElement('span'),
                    logo = document.createElement('div'),
                    symbolClass = ['sucuri-badge-symbol']
                ;

                css.setAttribute('href', "https://cdn.sucuri.net/badge/badge.css");

                symbolClass.push(prefix + '-' + (("s" === type || "secure" === type) ? "secure" : (("t" === type || "tick" === type) ? "tick" : "flame")));
                symbol.className = symbolClass.join(' ');

                text.className = prefix + '-badge-text';
                text.appendChild(document.createTextNode('secured by'));

                logo.className = prefix + '-badge-logo';

                badge.appendChild(symbol);
                badge.appendChild(text);
                badge.appendChild(logo);
            }
            (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(css);

            if (event) badge[handler](event, function()
            {
                var w = 780, h = 800, l = ((screen.width - w) / 2) - 100, t = (screen.height - h) / 4;
                window.open("https://monitor" + monitor + ".sucuri.net/verify.php?r=" + id, prefix, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + t + ', left=' + l);
            });

            if ("relative" === position || "o" === position) script.parentNode.insertBefore(badge, script.nextSibling);
            else document.getElementsByTagName('body')[0].appendChild(badge);
        }
        b('sucuri');
        b('godaddy-security');
    });
})();
