
    window.sliceComponents = window.sliceComponents || {};

    externalsScriptLoaded.then(() => {
        window.reliableDOMContentLoaded.then(() => {
            var componentContainer = document.querySelector("#slice-container-popularBox");

            if (componentContainer) {
                var data = {"tabs":[{"tabName":"Most Popular","articles":[{"href":"\/televisions\/tcls-new-98-inch-4k-tv-is-as-ridiculously-cheap-as-it-is-ridiculously-big","heading":"TCL's new 98-inch 4K TV is as ridiculously cheap as it is ridiculously big","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/78RtRLX42r3FyawWkiPVMQ.jpg","alt":"TCL P745","fullscreen":false,"lazyLoading":true,"addSEOMetaData":false,"eager":false}},{"href":"\/streaming\/7-new-movies-and-tv-show-to-stream-on-netflix-disney-plus-max-and-more-this-weekend-august-4","heading":"7 new movies and TV shows to stream on Netflix, Disney Plus, Max, and more this weekend (August 4)","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/LQYf7QLDEvv5UFJ84EBrAD.jpg","alt":"Star-Lord looks at his crew who are off-camera in Guardians of the Galaxy Vol 3","fullscreen":false,"lazyLoading":true,"addSEOMetaData":false,"eager":false}},{"href":"\/streaming\/netflixs-most-watched-show-faces-cancellation-calls-and-its-down-to-ratings","heading":"Netflix\u2019s most-watched show faces cancellation calls and it\u2019s down to ratings","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/ks7YxhuNqmoidceTfXK4bC.jpg","alt":"Geralt of Rivia holds his sword as he prepares to fight in The Witcher season 3","fullscreen":false,"lazyLoading":true,"addSEOMetaData":false,"eager":false}},{"href":"\/streaming\/entertainment\/scotland-vs-france-live-stream-how-to-watch-the-2023-rugby-summer-internationals","heading":"Scotland vs France live stream \u2014 how to watch the 2023 rugby Summer International for free today, team news","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/LBAvez3UunGVJNMQQ85qBo.jpg","alt":"Pierre Schoeman of Scotland is tackled during the Six Nations Rugby match","fullscreen":false,"lazyLoading":true,"addSEOMetaData":false,"eager":false}},{"href":"\/televisions\/disney-might-be-killing-4k-blu-ray-and-itll-be-a-crime-to-movie-fans-if-it-does","heading":"Disney might be killing 4K Blu-ray, and it\u2019ll be a crime to movie fans if it does","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/jxxuHeXgNbGhHeZx67he.jpg","alt":"blu-ray disc in player drive","fullscreen":false,"lazyLoading":true,"addSEOMetaData":false,"eager":false}}]},{"tabName":"Most Shared","articles":[{"href":"\/streaming\/netflix\/need-more-fantasy-after-the-witcher-season-3-watch-these-7-superb-shows-on-netflix-prime-video-max-and-more","heading":"Need more fantasy after The Witcher season 3? Watch these 7 superb shows on Netflix, Prime Video, Max, and more","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/Ts8XdbdhEAGeAP9vCbhtLg.jpg","alt":"Geralt, Ciri, and Yennefer stare at something off camera in The Witcher season 3","fullscreen":false,"lazyLoading":true,"addSEOMetaData":false,"eager":false}},{"href":"\/phones\/oppo-reno10-5g-the-artistic-mastery-in-smartphones","heading":"OPPO Reno10 5G: The Artistic Mastery in Smartphones","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/KfLD9jcBihNnyiB9SNycFW.jpg","alt":"The OPPO Reno10 5G","fullscreen":false,"lazyLoading":true,"addSEOMetaData":false,"eager":false}},{"href":"\/computing\/artificial-intelligence\/stopped-using-chatgpt-these-six-handy-new-features-might-tempt-you-back","heading":"Stopped using ChatGPT? These six handy new features might tempt you back","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/oS6aQ4ynjMfottA7m9hJqJ.jpg","alt":"A laptop on a blue background showing the ChatGPT homescreen","fullscreen":false,"lazyLoading":true,"addSEOMetaData":false,"eager":false}},{"href":"\/streaming\/netflix\/the-lincoln-lawyer-season-3-everything-we-know-so-far","heading":"The Lincoln Lawyer season 3: everything we know so far","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/Z8K33mjMwFs3DGNF4AzSVL.jpg","alt":"Mickey Haller sits at a desk in a court room with a bandaged hand in The Lincoln Lawyer season 2, which precedes The Lincoln Lawyer season 3","fullscreen":false,"lazyLoading":true,"addSEOMetaData":false,"eager":false}},{"href":"\/phones\/iphone\/the-iphone-15-hits-a-major-milestone-on-the-road-to-release","heading":"The iPhone 15 hits a major milestone on the road to release","image":{"src":"https:\/\/cdn.mos.cms.futurecdn.net\/WRs6fEhQ8akiavSaio44ti.jpg","alt":"iPhone 14 Plus","fullscreen":false,"lazyLoading":true,"addSEOMetaData":false,"eager":false}}]}]};

                var triggerHydrate = function() {
                    window.sliceComponents.popularBox.hydrate(data, componentContainer);
                }

                var triggerScriptLoadThenHydrate = function() {
                    if (window.sliceComponents.popularBox === undefined) {
                        var script = document.createElement('script');
                        script.src = 'https://slice.vanilla.futurecdn.net/12-7-2/js/popularBox.js';
                        script.async = true;
                        script.id = 'vanilla-slice-popularBox-component-script';

                        script.onload = () => {
                            window.sliceComponents.popularBox = popularBox;
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
                    console.log('Could not lazy load slice JS for popularBox')
                }
            }
        }).catch(err => console.log('Hydration Script has failed for popularBox Slice', err));
    }).catch(err => console.log('Externals script failed to load', err));
