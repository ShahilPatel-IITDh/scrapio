
    window.sliceComponents = window.sliceComponents || {};

    externalsScriptLoaded.then(() => {
        window.reliableDOMContentLoaded.then(() => {
            var componentContainer = document.querySelector("#slice-container-relatedArticles");

            if (componentContainer) {
                var data = {"headerTitle":"Most Popular","relatedArticles":[{"url":"https:\/\/www.techradar.com\/gaming\/turns-out-overwatch-2s-mysterious-hooded-hacker-the-enigma-was-john-cena","title":"Turns out Overwatch 2's mysterious hooded hacker \"The Enigma\" was John Cena","imageUrl":"https:\/\/cdn.mos.cms.futurecdn.net\/ZNxZQifLHDhnwRU5mLSH53.png","imageAlt":"Overwatch 2 Invasions roster","authorName":"Vikki Blake","authorHandle":"https:\/\/www.techradar.com\/author\/vikki-blake","publishDate":"2023-08-05T18:14:35Z","index":0,"locale":"en-GB"},{"url":"https:\/\/www.techradar.com\/computing\/cpu\/intel-meteor-lake-turns-heads-with-clock-speed-leak-as-hype-builds-around-next-gen-cpus","title":"Intel Meteor Lake turns heads with clock speed leak as hype builds around next-gen CPUs","imageUrl":"https:\/\/cdn.mos.cms.futurecdn.net\/ERnjLtH4wPyzTtZmemtKDZ.jpg","imageAlt":"CPU concept art of a chip with blue electricity coursing through it","authorName":"Darren Allan","authorHandle":"https:\/\/www.techradar.com\/author\/darren-allan","publishDate":"2023-08-05T15:57:12Z","index":1,"locale":"en-GB"},{"url":"https:\/\/www.techradar.com\/health-fitness\/smartwatches\/the-apple-watch-9-might-underwhelm-apart-from-one-key-upgrade","title":"The Apple Watch 9 might underwhelm \u2013 apart from one key upgrade","imageUrl":"https:\/\/cdn.mos.cms.futurecdn.net\/TC2ZTsMmYCifbDwj6pikoc.jpg","imageAlt":"The Apple WAtch 8 on a blue desk and wrist","authorName":"David Nield","authorHandle":"https:\/\/www.techradar.com\/author\/david-nield","publishDate":"2023-08-05T13:30:13Z","index":2,"locale":"en-GB"},{"url":"https:\/\/www.techradar.com\/pro\/microsoft-warns-sporting-events-could-be-targets-for-major-cyberattacks","title":"Microsoft warns sporting events could be targets for major cyberattacks","imageUrl":"https:\/\/cdn.mos.cms.futurecdn.net\/QGYuoyg3MWF74TcrcTzsVD.jpg","imageAlt":" Sophia Smith #11 of the United States scores a goal and celebrates during a game between Germany and USWNT","authorName":"Lewis Maddison","authorHandle":"https:\/\/www.techradar.com\/author\/lewis-maddison","publishDate":"2023-08-05T10:14:29Z","index":3,"locale":"en-GB"},{"url":"https:\/\/www.techradar.com\/phones\/iphone\/the-latest-iphone-16-pro-rumor-points-to-a-camera-sensor-upgrade-next-year","title":"The latest iPhone 16 Pro rumor points to a camera sensor upgrade next year","imageUrl":"https:\/\/cdn.mos.cms.futurecdn.net\/cBSFciyDXvE2FApT5S5BEZ.jpg","imageAlt":"iPhone 14 Pro Max review camera","authorName":"David Nield","authorHandle":"https:\/\/www.techradar.com\/author\/david-nield","publishDate":"2023-08-05T09:30:04Z","index":4,"locale":"en-GB"},{"url":"https:\/\/www.techradar.com\/computing\/social-media\/why-is-twitter-now-x-elon-musks-rebrand-explained-and-where-x-is-going-next","title":"Why is Twitter called X now? Elon Musk's rebrand explained and where it's going next","imageUrl":"https:\/\/cdn.mos.cms.futurecdn.net\/Pwh2dVaGJY9yDxznmn8vEg.jpg","imageAlt":"Two smartphones on a grey background showing the X app","authorName":"Mark Wilson","authorHandle":"https:\/\/www.techradar.com\/author\/mark-wilson","publishDate":"2023-08-05T09:00:00Z","index":5,"locale":"en-GB"},{"url":"https:\/\/www.techradar.com\/tech\/icymi-the-weeks-biggest-tech-news-from-sonos-move-2-leaks-to-nokia-throwbacks","title":"ICYMI: the week's biggest tech news, from Sonos Move 2 leaks to Nokia throwbacks","imageUrl":"https:\/\/cdn.mos.cms.futurecdn.net\/nDm7Hg8HRR2FvFBME3V2w5.jpg","imageAlt":"A Nokia phone, Sonos speaker and DJI action camera on a pink background","authorName":"Mark Wilson","authorHandle":"https:\/\/www.techradar.com\/author\/mark-wilson","publishDate":"2023-08-05T08:00:00Z","index":6,"locale":"en-GB"},{"url":"https:\/\/www.techradar.com\/phones\/iphone\/a17-bionic","title":"A17 Bionic: what to expect from Apple's next flagship chipset","imageUrl":"https:\/\/cdn.mos.cms.futurecdn.net\/aQhisJdTGgVbdo3XKvHzDa.jpg","imageAlt":"iPhone 14 Pro Max review front angled Always On","authorName":"James Rogerson","authorHandle":"https:\/\/www.techradar.com\/author\/james-rogerson","publishDate":"2023-08-05T04:00:00Z","index":7,"locale":"en-GB"},{"url":"https:\/\/www.techradar.com\/computing\/websites-apps\/quordle-today-answers-clues-5-august-2023","title":"Quordle today - hints and answers for Saturday, August 5 (game #558)","imageUrl":"https:\/\/cdn.mos.cms.futurecdn.net\/4XP9iNbdvkijJyZnzx3WoL.jpg","imageAlt":"Quordle on a smartphone held in a hand","authorName":"Marc McLaren","authorHandle":"https:\/\/www.techradar.com\/author\/marc-mclaren","publishDate":"2023-08-04T23:15:44Z","index":8,"locale":"en-GB"},{"url":"https:\/\/www.techradar.com\/computing\/search-engines\/google-can-warn-you-when-your-personal-info-appears-in-search-and-let-you-take-action","title":"Google can warn you when your personal info appears in search and let you take action","imageUrl":"https:\/\/cdn.mos.cms.futurecdn.net\/SzpV8yv9Mduu8nTB5muDWW.jpg","imageAlt":"A person sitting in front of a laptop showing a Google search page","authorName":"Cesar Cadenas","authorHandle":"https:\/\/www.techradar.com\/author\/cesar-cadenas","publishDate":"2023-08-04T19:24:03Z","index":9,"locale":"en-GB"},{"url":"https:\/\/www.techradar.com\/computing\/windows\/cortana-is-finally-getting-the-boot-by-microsoft-in-favor-of-an-actual-ai","title":"Cortana is finally getting the boot by Microsoft in favor of an actual AI","imageUrl":"https:\/\/cdn.mos.cms.futurecdn.net\/Lor9J5o7ZVZdFvhLZCh6tf.jpg","imageAlt":"a phone with the words \"Hi I'm Cortana\" on the screen","authorName":"Allisa James","authorHandle":"https:\/\/www.techradar.com\/author\/allisa-james","publishDate":"2023-08-04T18:34:21Z","index":10,"locale":"en-GB"}]};

                var triggerHydrate = function() {
                    window.sliceComponents.relatedArticles.hydrate(data, componentContainer);
                }

                var triggerScriptLoadThenHydrate = function() {
                    if (window.sliceComponents.relatedArticles === undefined) {
                        var script = document.createElement('script');
                        script.src = 'https://slice.vanilla.futurecdn.net/12-7-2/js/relatedArticles.js';
                        script.async = true;
                        script.id = 'vanilla-slice-relatedArticles-component-script';

                        script.onload = () => {
                            window.sliceComponents.relatedArticles = relatedArticles;
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
                    console.log('Could not lazy load slice JS for relatedArticles')
                }
            }
        }).catch(err => console.log('Hydration Script has failed for relatedArticles Slice', err));
    }).catch(err => console.log('Externals script failed to load', err));
