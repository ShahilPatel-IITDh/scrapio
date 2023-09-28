
    window.sliceComponents = window.sliceComponents || {};

    externalsScriptLoaded.then(() => {
        window.reliableDOMContentLoaded.then(() => {
            var componentContainer = document.querySelector("#slice-container-regionRedirectBanner");

            if (componentContainer) {
                var data = {"currentEdition":"US","translations":[]};

                var triggerHydrate = function() {
                    window.sliceComponents.regionRedirectBanner.hydrate(data, componentContainer);
                }

                var triggerScriptLoadThenHydrate = function() {
                    if (window.sliceComponents.regionRedirectBanner === undefined) {
                        var script = document.createElement('script');
                        script.src = 'https://slice.vanilla.futurecdn.net/12-7-2/js/regionRedirectBanner.js';
                        script.async = true;
                        script.id = 'vanilla-slice-regionRedirectBanner-component-script';

                        script.onload = () => {
                            window.sliceComponents.regionRedirectBanner = regionRedirectBanner;
                            triggerHydrate();
                        };
                        document.head.append(script);
                    } else {
                        triggerHydrate();
                    }
                }

                if (window.lazyObserveElement) {
                    window.lazyObserveElement(componentContainer, triggerScriptLoadThenHydrate, 1500);
                } else {
                    console.log('Could not lazy load slice JS for regionRedirectBanner')
                }
            }
        }).catch(err => console.log('Hydration Script has failed for regionRedirectBanner Slice', err));
    }).catch(err => console.log('Externals script failed to load', err));
