
        function waitForGlobal(key, callback, max_retries, failure) {
            max_retries = (typeof max_retries !== 'undefined') ?  max_retries : null;
            failure = (typeof failure !== 'undefined') ?  failure : null;

            if (window[key]) {
                callback();
            } else {
                if (max_retries) {
                    if (!window[key + '_retries']) { window[key + '_retries'] = 1; } else { window[key + '_retries']++; }
                    if (window[key + '_retries'] >= max_retries) {
                        if (failure) { failure(); }
                        return;
                    }
                }

                setTimeout(function() {
                    waitForGlobal(key, callback, max_retries, failure);
                }, 100);
            }
        };

        function showSegmentationButtons(type) {
            switch (type) {
                case 'segmented':
                    jQuery(".btn--segmented").removeClass("d-none");
                    jQuery(".btn--segmented").removeClass("invisible");
                    jQuery(".btn--unsegmented").remove();
                    break;
                case 'unsegmented':
                    jQuery(".btn--unsegmented").removeClass("d-none");
                    jQuery(".btn--unsegmented").removeClass("invisible");
                    jQuery(".btn--segmented").remove();
                    break;
            }
        }

        waitForGlobal('jQuery', function () {
            waitForGlobal(
                'tbp',
                function() {
                    var tbp_retries = 35;
                    var tbp_interval = setInterval(function() {

                        // console.log('trying interval');
                        if (tbp.tbpGetCountryCode()) {
                            // console.log('country found: ' + tbp.tbpGetCountryCode());
                            clearInterval(tbp_interval);
                            if (tbp.tbpIsSLSCountry(tbp.tbpGetCountryCode())) {
                                // console.log('showing segmented');
                                showSegmentationButtons('segmented');
                            } else {
                                // console.log('showing unsegmented1');
                                showSegmentationButtons('unsegmented');
                            }
                        } else {
                            // country not found
                            if (tbp_retries === 0) {
                                // console.log('showing unsegmented2');
                                showSegmentationButtons('unsegmented');
                            }
                        }
                        if (tbp_retries === 0) {
                            // We reached timeout, show the buttons. (per Yaniv)
                            showSegmentationButtons('segmented');
                            clearInterval(tbp_interval);
                        }
                        tbp_retries--;
                    }, 100);
                },
                35,
                function() {
                    // Show segmented on Fail (per Yaniv)
                    // console.log('showing unsegmented3');
                    showSegmentationButtons('segmented');
                })
        })

        //// TODO: California only link
    