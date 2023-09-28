
            var siteProperties = document.getElementById("matomoScriptTag");
            var siteId = siteProperties.getAttribute("data-siteId");
            var siteUrl = siteProperties.getAttribute("data-siteUrl");
            var _paq = window._paq = window._paq || [];
            /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
                var u=this.siteUrl;
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', this.siteId]);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
              }
            )();
        