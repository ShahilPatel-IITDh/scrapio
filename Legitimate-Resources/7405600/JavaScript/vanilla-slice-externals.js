
    const loadExternalsScript = () => {
        return new Promise((resolve, reject) => {
            try {
                const scriptTag = document.createElement('script');
                scriptTag.async = true;
                scriptTag.type = 'text/javascript';
                scriptTag.id = 'vanilla-slice-externals-script';
                scriptTag.src = 'https://slice.vanilla.futurecdn.net/12-7-2/js/externals.js';
                scriptTag.onload = resolve;
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
            } catch (err) {
                reject(err);
            }
        });
    };
    var externalsScriptLoaded = loadExternalsScript();
