
    (function(g) {
        g.sCut = null;
        g.sCut2 = null;
        var sCutCallback = [];
        var sCutInitialized = false;
        g.onsCutInitialized = function (callback) {
            if (typeof callback === 'function') {
                sCutCallback.push(callback);
                if (sCutInitialized === true) {
                    callback(g.sCut);
                }
            }
        };
        g.fireSCutInitialized = function() { 
            sCutInitialized = true;
            sCutCallback.forEach(function(cb) {cb(g.sCut);});
        };
        g.sCutInit = {
            allowedParameters: ["af_ad","af_ad_id","af_adset","af_c_id","af_channel","af_click_lookback","af_cost_currency","af_cost_model","af_cost_value","af_siteid","af_sub4","af_sub5","affiliate","afid","anid","arena","brand","brandid","brcurrsym","buyin","c","campaignid","campaignidnative","cashier","casinotier","cid","claim","clientdownload","clientversion","country","crm","ctaversion","currency","currencynative","currentpos","daysfp","daysfs","depositamount","dl","dlp","downloadbrand","email","fb_id","firstname","firstnamenative","flag","freebet","ftd","game_id","gameid","gamer_id","gametype","gclid","generic1","generic2","generic3","generic4","generic5","gmtgapreal","guid","ic","idfa","imgandroidphone","imgandroidtab","imgipad","imgiphone","imgpc","isftd","isrealmode","iswrapped","landingpage","lang","langid","lastname","linkid","linksource","livedealer","loyaltylevel","maxfpamount","maxwinnings","minbet","mkw","mkw2","mm_id","mobilenumber","mode","newstext","nickname","numberdays","odmoptintoken","offerenddate","origcid","pg_alreadycreated ","pg_bran","pg_buyin_stakes ","pg_casbo_template","pg_game_type ","pg_language","pg_maximum_buyin ","pg_name ","pg_password ","pg_recurrence ","pg_seats ","pg_serial ","pg_starting_datetime","pg_starting_datetime_gmt","pg_username ","pg_video","pid","productpackageid","promocode","promocodenative","randomchosenpackage","randomchosenpackagenative","real","region","route","runlowcash","rwisall","rwiseight","rwismac","rwisuk","searchterm","sem","serial","sessiontimer","sourceproductpackage","sourcesubbrand","specificnavigation","sr","st","st2","stakes","state","stopforerrors","subid","tableformat","tablename","targetid","targetproductpackage","targetsubbrand","team","teamlogo","teamname","testdata","testingbonustype","testingerrorcode","time","times","tourformat","tourid","tourname","tourtype","txta","txtandroidtaba","txtandroidtabb","txtb","txtc","txtd","txte","txtipada","txtipadb","txtpca","txtpcb","userinfo","username","userstatus","utm_campaign","utm_medium","utm_source","v7","ver","vip","wager","webcontainer","wtc","wtv"],
            serial: 1926992,
            lang: 'en',
            testData: {"utm_medium":"mb","utm_source":"3732","utm_campaign":"28423","orig-lp":"https://www.888casino.com/media/leprechauns-88-freeplay.htm","currentvisittype":"Paid","strategy":"UnidentifiedPaidStrategy","strategysource":"currentvisit"},
            additionalParameters: {"country":"ind","isftd":"false","lang":"en","sr":"1926992","state":"ka","testdata":"{\u0022utm_medium\u0022:\u0022mb\u0022,\u0022utm_source\u0022:\u00223732\u0022,\u0022utm_campaign\u0022:\u002228423\u0022,\u0022orig-lp\u0022:\u0022https://www.888casino.com/media/leprechauns-88-freeplay.htm\u0022,\u0022currentvisittype\u0022:\u0022Paid\u0022,\u0022strategy\u0022:\u0022UnidentifiedPaidStrategy\u0022,\u0022strategysource\u0022:\u0022currentvisit\u0022}","utm_campaign":"28423","utm_medium":"mb","utm_source":"3732"},
            options: {"testDataCookieDomain":"888casino.com","testDataCookieMaxAge":604800,"testDataCookieSameSite":"none","testDataCookieSecure":true,"testDataCookie":{"domain":"888casino.com","sameSite":"none","secure":true,"expiresIn":604800,"extendExpiration":true,"modified":true}}
        };        
    })(this);
