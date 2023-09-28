
    window.dataLayer = window.dataLayer || [];
    window.ask = window.ask || {};
    var ask = window.ask;

    
window.dataLayer.push({"event":"search-result-impression","searchQuery":"gmail","searchResult_delta_center_resultsDisplayed":11});
    
window.dataLayer.push({"event":"related-search-impression","searchQuery":"gmail","relatedSearch_Rogers_top_resultsDisplayed":10,"relatedSearch_Rogers_right_resultsDisplayed":12});
    
window.dataLayer.push({"event":"display-ad-impression","programmaticAd_programmaticAd_right":1});
    
window.dataLayer.push({"event":"pagination-result-impression","pagination_pagination_center_resultsDisplayed":5});
    
window.dataLayer.push({"event":"navigation-result-impression","navigation_searchbox_header_resultsDisplayed":1,"navigation_logo_header_resultsDisplayed":1,"navigation_navigation_footer_resultsDisplayed":1});
    
window.dataLayer.push({"event":"paa-results-impression","searchQuery":"gmail","paa_top_results_displayed":4});
    

    window.dataLayer.push({"event": "page-display-loaded"});

    function getAdsShownTime(){
        var adsShownTime = 0;

        if (performance.getEntriesByName("adsShownTime.start").length > 0 &&
                performance.getEntriesByName("adsShownTime.end").length > 0) {     
            adsShownTime = performance.measure("time", "adsShownTime.start", "adsShownTime.end");
            adsShownTime = adsShownTime ? adsShownTime.startTime : 0;
        }

        return adsShownTime;
    }

    function setupPerformanceDataEvent(adsShownTime){
        
        var timeOrigin = performance.timeOrigin,
            requestStart = performance.timing.requestStart - timeOrigin,
            responseStart = performance.timing.responseStart - timeOrigin,
            responseEnd = performance.timing.responseEnd - timeOrigin,
            domComplete = performance.timing.domComplete - timeOrigin;

        window.dataLayer.push({
            'event': 'page-performance',
            'adsShownTime': adsShownTime,
            'requestStartTime': requestStart,
            'responseStartTime': responseStart,
            'responseEndTime': responseEnd,
            'domCompleteTime': domComplete
        });
    }

    $(document).ready(function() {
        window.ask = window.ask || {};
        var ask = window.ask;

        
        $(window).on("blur", function(){
            window.ask = window.ask || {};
            var ask = window.ask;
            
            if (ask.iframeMouseOver) {
                var p1 = ask.iframeElement ? ask.iframeElement.parent() : undefined, 
                    p2 = p1 ? p1.parent() : undefined,
                    data = p2 ? p2.data('analytics') : undefined;
                
                if (!data) {
                    data = {};
                }

                data['event'] = 'display-ad-click';
                dataLayer.push(data);
            }
        });

        var displayAdIntervalCount = 0;
        var checkExistDisplayAdiFrame = setInterval(function() {
            displayAdIntervalCount++;
            
            if ($(".PartialRtkAdSlot-ads iframe").length) {
                clearInterval(checkExistDisplayAdiFrame);

                $(".PartialRtkAdSlot-ads iframe").on("mouseover", function(){
                    window.ask = window.ask || {};
                    var ask = window.ask;
                    ask.iframeMouseOver = true;
                    ask.iframeElement = $(this);
                });
                $(".PartialRtkAdSlot-ads iframe").on("mouseout", function(){
                    window.ask = window.ask || {};
                    var ask = window.ask;
                    ask.iframeMouseOver = false;
                    ask.iframeElement = undefined;
                });

            } else if (displayAdIntervalCount >= 20) {
                clearInterval(checkExistDisplayAdiFrame);
            }
        }, 100);


        
        if (ask.CSA) {
            
            ask.CSA.addCSALoadCallback(function () {
                var topCount = ask.CSA.numTopAds,
                    midCount = ask.CSA.numMiddleAds,
                    botCount =  ask.CSA.numBottomAds,
                    repeatAds = ask.CSA.pageOptions && ask.CSA.pageOptions.numRepeated;
                var maxOfMidAndBot =  Math.max(midCount || 0 , botCount || 0);
                var repeatedAdsCount  = Math.min(maxOfMidAndBot, repeatAds);
                
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'search-ad-impression',
                    'providerSource': 'gsl',
                    'numberRepeatAdsShown': repeatedAdsCount,
                    'textAds_googleCsa_top_resultsDisplayed': topCount,
                    'textAds_googleCsa_bottom_resultsDisplayed': botCount,
                    'textAds_googleCsa_right_resultsDisplayed': midCount
                });
            }, function () {
                if (ask.CSA && typeof ask.CSA.showSerp === "function") {
                    ask.CSA.showSerp();
                }
            }, 2000);
        }

        if (ask.BING) {
            ask.BING.addBINGLoadCallback(function () {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    'event': 'search-ad-impression',
                    'providerSource': 'bing-js',
                    'textAds_bingjs_top_resultsDisplayed': ask.BING.numTopAds,
                    'textAds_bingjs_bottom_resultsDisplayed': ask.BING.numBottomAds,
                    'textAds_bingjs_right_resultsDisplayed': ask.BING.numRightAds
                });
            },
            4000);
        }
        if (ask.AMAZONJS) {
            ask.AMAZONJS.amzn_assoc_callbacks(function () {
                window.dataLayer = window.dataLayer || [];
                var found = false;
                for (var i = 0; i < window.dataLayer.length; i++) {
                    if (window.dataLayer[i].event == 'smart-answer-impression') {
                        window.dataLayer[i].smartAnswer_amazon_center_resultsDisplayed = ask.AMAZONJS.totalAds;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    window.dataLayer.push({
                        'event': 'smart-answer-impression',
                        'providerSource': 'amazon js',
                        'smartAnswer_amazon_center_resultsDisplayed': ask.AMAZONJS.totalAds
                    });
                }
            });
        }
    });


    $(window).on("load", function() {
        
        var hasCSAAds = !!ask.CSA;

        var adsShownTime = getAdsShownTime();
        
        if (adsShownTime > 0 || hasCSAAds === false) {
            setupPerformanceDataEvent(adsShownTime);
        } else {
            
            var performanceIntervalCount = 0;   
            var checkExistPerformanceData = setInterval(function() {
                performanceIntervalCount++;
                adsShownTime = getAdsShownTime();

                
                if (adsShownTime > 0 || performanceIntervalCount >= 10) {
                    clearInterval(checkExistPerformanceData);

                    setupPerformanceDataEvent(adsShownTime);
                }
            }, 200);
        }
    });

    App.events.push({
    partial: "partial-ga-analytics",
    contextSelector: document,
    elementSelector: "a,  button",
    type: "click",
    handler: function(evt) {
        var _link = $(this);
        var data = _link.data("analytics");

        if (data) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(data);
        } else {
            return; 
        }
    }
});  

