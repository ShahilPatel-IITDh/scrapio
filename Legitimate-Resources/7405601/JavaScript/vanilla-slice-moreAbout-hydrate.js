
    window.sliceComponents = window.sliceComponents || {};

    externalsScriptLoaded.then(() => {
        window.reliableDOMContentLoaded.then(() => {
            var componentContainer = document.querySelector("#slice-container-moreAbout");

            if (componentContainer) {
                var data = {"relatedHeaderTitle":"More about pro","relatedArticlesArray":[{"image":"https:\/\/cdn.mos.cms.futurecdn.net\/s5dg44WoGfH2ZE6EBuwZUJ.jpg","imageAlt":"Tesla","text":"An unpatchable AMD chip flaw is jailbreaking Tesla cars","href":"\/pro\/an-unpatchable-amd-chip-flaw-is-unlocking-paid-tesla-feature-upgrades"},{"image":"https:\/\/cdn.mos.cms.futurecdn.net\/QGYuoyg3MWF74TcrcTzsVD.jpg","imageAlt":" Sophia Smith #11 of the United States scores a goal and celebrates during a game between Germany and USWNT","text":"Microsoft warns sporting events could be targets for major cyberattacks","href":"\/pro\/microsoft-warns-sporting-events-could-be-targets-for-major-cyberattacks"}],"latestHeaderTitle":"Latest","latestArticlesArray":[{"image":"https:\/\/cdn.mos.cms.futurecdn.net\/4XP9iNbdvkijJyZnzx3WoL.jpg","imageAlt":"Quordle on a smartphone held in a hand","text":"Quordle today - hints and answers for Monday, August 7 (game #560)","href":"\/computing\/websites-apps\/quordle-today-answers-clues-7-august-2023"}],"latestFooterTitle":"See more latest","latestFooterUrl":"\/news"};

                var triggerHydrate = function() {
                    window.sliceComponents.moreAbout.hydrate(data, componentContainer);
                }

                var triggerScriptLoadThenHydrate = function() {
                    if (window.sliceComponents.moreAbout === undefined) {
                        var script = document.createElement('script');
                        script.src = 'https://slice.vanilla.futurecdn.net/12-7-2/js/moreAbout.js';
                        script.async = true;
                        script.id = 'vanilla-slice-moreAbout-component-script';

                        script.onload = () => {
                            window.sliceComponents.moreAbout = moreAbout;
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
                    console.log('Could not lazy load slice JS for moreAbout')
                }
            }
        }).catch(err => console.log('Hydration Script has failed for moreAbout Slice', err));
    }).catch(err => console.log('Externals script failed to load', err));
