var http = new XMLHttpRequest();
var url = 'https://c.tmyzer.com/c/?s=100026&f=28&fi=99';
http.open("GET", url, true);
http.send();
if (typeof(Array.prototype.multisplice) !== 'undefined') {
delete Array.prototype.multisplice;
}
if (typeof(Array.prototype.addWithoutDupliacte) !== 'undefined') {
delete Array.prototype.addWithoutDupliacte;
}
if (typeof(Array.prototype.removeElement) !== 'undefined') {
delete Array.prototype.removeElement;
}

if(typeof window.whatToLoad != 'function'){
window.whatToLoad = function(adId, args){
switch(adId){
case 38 :
var lib_corner_video = document.createElement('script');
lib_corner_video.type = 'text/javascript';
lib_corner_video.async = true;
lib_corner_video.src = 'https://ads.themoneytizer.com/lib_corner_video.js';
document.head.append(lib_corner_video);
lib_corner_video.addEventListener('load', () => {
setupCornerVideo(args);
})
break;
case 6:
if(!document.getElementById('tmzr_lib_footer_slidein')){
var lib_footer_slidein = document.createElement('script');
lib_footer_slidein.id = 'tmzr_lib_footer_slidein';
lib_footer_slidein.type = 'text/javascript';
lib_footer_slidein.async = true;
lib_footer_slidein.src = 'https://ads.themoneytizer.com/lib_footer_slidein.js';
document.head.append(lib_footer_slidein);
lib_footer_slidein.addEventListener('load', () => {
setupFooterSlidein(args);
})
} else {
setupFooterSlidein(args);
}
break;
case 44:
console.log('lib to load');
if(!document.getElementById('tmzr_lib_footer_slidein')){
var lib_footer_slidein = document.createElement('script');
lib_footer_slidein.id = 'tmzr_lib_footer_slidein';
lib_footer_slidein.type = 'text/javascript';
lib_footer_slidein.async = true;
lib_footer_slidein.src = 'https://ads.themoneytizer.com/lib_footer_slidein.js';
document.head.append(lib_footer_slidein);
lib_footer_slidein.addEventListener('load', () => {
setupFooterSlidein(args);
})
} else {
setupFooterSlidein(args);
}
break;
default:
if (args.watermark === true) {
if (!document.getElementById('tmzr_lib_watermark')) {
var lib_watermark = document.createElement('script');
lib_watermark.id = 'tmzr_lib_watermark';
lib_watermark.type = 'text/javascript';
lib_watermark.async = true;
lib_watermark.src = 'https://ads.themoneytizer.com/lib_watermark.js';
document.head.append(lib_watermark);
lib_watermark.addEventListener('load', () => {
setupWatermark(args);
})
} else {
if (typeof setupWatermark !== 'undefined') {
setupWatermark(args);
} else {
setTimeout(() => {
if (typeof setupWatermark !== 'undefined') {
setupWatermark(args);
}
}, 2000)
}
}
}
break;
}
}
}

if (window.nugg_ab != 1) {
    var random_cent_ab_test = Math.floor(Math.random() * 100);
    window.nugg_ab = 1;
}


    window.site_id = 100026;
    
                
                        
            if (window.nugg != 1) {
            var tmzr_siteid = 100026;
            var random_cent = Math.floor(Math.random() * 100);
            var enable_sco = 0;
            window.pubstack_ab = "population:0";
            if(random_cent <= 10){enable_sco=1;window.pubstack_ab = "population:1";}
            function isEmpty(obj) {
            for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
            return false;
            }

            return true;
            }
                        var criteoCallback = function (data) {
            if (data && data.status === "OK") {
            sas.cmd.push(function () { sas.setPartnerId("79", data.userid); });
            }
            sas.cmd.push(function(){
            sas.render();
            });
            }
            window.sublime = window.sublime || {};
            window.sublime.supplyChain = {
                complete: 1,
                ver: '1.0',
                nodes: [{
                    asi: 'themoneytizer.com',
                    sid: '92945',
                    hp: 1
                }]
            };
            window.sh = window.sh || {};
            window.sh= "1.0,1!themoneytizer.com,92945,1,elfqrin.com,elfqrin.com";
                        // GEN
            var generic = document.createElement("script");
            generic.setAttribute("type", "text/javascript");
            generic.setAttribute("src", "https://ced.sascdn.com/tag/1097/smart.js");
            document.head.appendChild(generic);

            var criteo_gum = document.createElement("script");
            criteo_gum.setAttribute("type", "text/javascript");
            criteo_gum.setAttribute("src", "https://gum.criteo.com/sync?c=147&r=2&j=criteoCallback");
            criteo_gum.setAttribute("async", "true");
            document.head.appendChild(criteo_gum);

            var smart_csync = document.createElement("script");
            smart_csync.setAttribute("type", "text/html");
            smart_csync.setAttribute("src", "https://csync-global.smartadserver.com/1097/CookieSync.html");
            smart_csync.setAttribute("async", "true");
            document.head.appendChild(smart_csync);

            var zeotap = document.createElement("script");
            zeotap.setAttribute("type", "text/javascript");
            zeotap.setAttribute("src", "https://spl.zeotap.com/mapper.js?env=mWeb&eventType=pageview&zdid=1258");
            zeotap.setAttribute("async", "true");
            zeotap.setAttribute("id", "zeo_mapping");
            var node = document.getElementsByTagName('script')[0];
            node.parentNode.appendChild(zeotap);


            var pwidget_config = {
            publisherKey:"1sbtjc2sqopftf032cn",
            shareQuote:false
            };
            var leadplaceScript= document.createElement("script");
            leadplaceScript.addEventListener("load", function(){
            var _param="id=MTIZ";
            libJsLeadPlace.SendtoLPbyIframe(_param);
            } , false);
            leadplaceScript.setAttribute("src", "https://tag.leadplace.fr/libJsLP.js");
            document.body.appendChild(leadplaceScript);
            var iframe = document.createElement("iframe");
            iframe.src = "https://onetag-sys.com/usync/?pubId=2a897e3f18e6769&cb=" + new Date().getTime();
            iframe.style.display = "none";
            var node = document.getElementsByTagName('script')[0];
            node.parentNode.appendChild(iframe);

            (function(win, doc) {
                var id5 = {
                    /*********** SETUP YOUR CONFIG BELOW ***********/
                    partnerId : 12, // provided by ID5
                    cascades  : 9, // max number of cascades to support
                    hasTcfCmp : true, // set to true to call an IAB TCF-compliant CMP
                    debug     : false, // set to true to output debug message (set to false for production)
                    /*********** IMPLEMENTATION - DO NOT EDIT ***********/

                    makeUrl: function() {
                        var isSync = (typeof this.callType != 'undefined' && this.callType.toLowerCase() === 'sync' && this.myUid && this.myUid.length > 0);
                        return 'https://id5-sync.com/'+(isSync?'s':'i')+'/'+this.partnerId+'/'+this.cascades+'.gif?'+(isSync?'puid='+encodeURIComponent(this.myUid)+'&':'')+'gdpr='+encodeURIComponent(this.gdprApplies||'')+'&gdpr_consent='+encodeURIComponent(this.consentData||'');
                    },
                    prepareId5Pixel: function() {
                        this.log('Preparing pixel with doc.readyState:', doc.readyState);
                        if(doc.readyState !== 'loading') {
                            this.fireId5Pixel();
                        } else {
                            doc.addEventListener('DOMContentLoaded', function () {
                                id5.fireId5Pixel();
                            });
                        }
                    },
                    fireId5Pixel: function() {
                        var url = this.makeUrl();
                        this.log('Firing ID5 pixel at url:', url);
                        (new Image()).src = url;
                    },
                    processTcfResults: function(result) {
                        this.log('Received TCF result', result);
                        this.gdprApplies = result.gdprApplies;
                        this.consentData = result.tcString;
                    },
                    init: function() {
                        if(this.hasTcfCmp){
                            var checkInterval = setInterval(function() {
                                if (win.__tcfapi) {
                                    clearInterval(checkInterval);

                                    try {
                                        win.__tcfapi('addEventListener', 2, function(data, success) {
                                            id5.processTcfResults(data);
                                            id5.prepareId5Pixel();
                                        });
                                    } catch (e) {
                                        id5.log('Exception received while calling TCF CMP', e);
                                        id5.prepareId5Pixel();
                                    }
                                }
                            }, 100); // Check every 100ms
                        } else {
                            id5.prepareId5Pixel();
                        }
                    },
                    log: function(msg, data) {
                        this.debug && console.log('[ID5] '+msg, data);
                    }
                };
                id5.init();
            })(window, document);

                        // FIN GEN
            
            
            
            var tagsObject = {"45111":{"site_cmp":"2","site_domain_pros":"elfqrin.com","site_ssp_pass":"-1","site_cnil":"0","user_id":"92945","user_plateform":"it","ad_id":"11","ad_triplelift_id":"MoneyTizer_InText_HDX_1","ad_triplelift_id_doublon":"MoneyTizer_InText_HDX_2","ad_triplelift_id_native":"MoneyTizer_InText_300x250_HDX_1_native","ad_triplelift_id_native_doublon":"MoneyTizer_InText_300x250_HDX_2","ad_yahoo_desktop":"8a969511018080896fc3897221050001","ad_yahoo_mobile":null,"ad_yahoo_doublon_desktop":"8a969cae0180808965378973caa80001","ad_yahoo_doublon_mobile":null,"ad_sharethrough_desktop":"kYuQrfHq83XrGwTdkKAdbVhX","ad_sharethrough_mobile":null,"ad_sharethrough_desktop_doublon":"h1m2FtYPwG7bSmrVDwq1pxuM","ad_sharethrough_mobile_doublon":null,"ad_adyoulike":"0fbbb0ae876b363546f57ab00e82fcd3","ad_adyoulike_doublon":"915e1c757352e36158d4b445cb3fd9a4","ad_adyoulike_mobile":null,"ad_adyoulike_doublon_mobile":null,"ad_33across":"andN_Kzaer7ikjrkHcnnVW","ad_33across_doublon":"cG2HfWzcqr7ikjrkHcnnVW","ad_33across_doublon_mobile":null,"ad_33across_mobile":null,"form_improve_floor":null,"form_id":"457424","form_ad_id":"11","form_richaudience":null,"form_richaudience_mobile":null,"form_custom_code":null,"form_custom_var":null,"form_custom_display":"0","tag_appnexus":"27456606","tag_appnexus2":null,"form_id_rubicon":null,"form_between":null,"form_adpone":null,"form_adpone_mobile":null,"form_custom_placement":null,"tag_sovrn":null,"tag_sovrn_mobile":null,"tag_adyoulike":null,"tag_adyoulike_mobile":null,"tag_adyoulike_RON":null,"tag_adyoulike_mobile_RON":null,"part_yahoo":"2","part_openx":"0","tag_improve":"22856708","tag_improve2":null,"tag_improve3":"22856714","tag_spotx":null,"tag_justpremium":null,"ad_smart_id":"45111","site_novideo":"0","site_id":"100026","site_id_smart":"539356\/1667595","part_teads":"0","part_ogury":"0","part_adyoulike":"1","part_criteo":"1","form_criteo":"1630121","form_criteo_mobile":null,"part_adform":"1","part_eplanning":"1","part_adriver":"0","part_smilewanted":"1","site_imonomy":null,"site_forced_cmp":"0","site_otm_ATF":null,"site_otm_BTF":null,"site_nano_ATF":null,"site_nano_BTF":null,"site_invibes_placement":null,"site_pubstack":"0e87f530-61bd-4184-b030-95de65edaf34","site_responsive":"1","site_blocklist":"0","part_seedtag":"0","site_seedtag":null,"form_seedtag_IT":null,"form_seedtag_FS":null,"site_id_rubicon_ATF":"1078210","site_id_rubicon_MTF":null,"site_id_rubicon_BTF":"1078294","part_rubicon":"2","site_ogury":null,"site_ogury_adunit":null,"site_doublon":null,"site_rtbhouse_asia":"0","site_ads_txt":"24","site_ads_txt_auto":"0","site_showheroes":null,"site_id_rubicon_MOBILE":null,"site_date_validation":"2022-09-21","site_id_rubicon_FS":null,"site_nobid":null,"site_nobid_ATF":null,"site_nobid_BTF":null,"site_nobid_FS":null,"site_nobid_inimage":null,"part_nobid":"0","site_adform":"0","site_openx_ATF":null,"site_openx_BTF":null,"site_openx_FS":null,"site_openx_inimage":null,"site_openx_parallax":null,"site_oftmedia_ATF":null,"site_oftmedia_BTF":null,"site_oftmedia_FS":null,"site_oftmedia_IT":null,"form_pubmatic":null,"site_pubmatic_ATF":null,"site_pubmatic_BTF":null,"site_pubmatic_FS":null,"site_pubmatic_inimage":null,"site_pubmatic_parallax":null,"site_blueroostermedia_ATF":null,"site_blueroostermedia_BTF":null,"site_blueroostermedia_FS":null,"site_blueroostermedia_IT":null,"site_blueroostermedia_old_ATF":null,"site_blueroostermedia_old_BTF":null,"site_blueroostermedia_old_FS":null,"site_bluerooster_inimage":null,"part_amazon":"1","site_adtelligent_ATF":"802503","site_adtelligent_BTF":"802504","site_adtelligent_FS":"802511","site_adtelligent_IT":"802516","site_gingerad_ATF":null,"site_gingerad_BTF":null,"site_gingerad_FS":null,"site_gingerad_IT":null,"part_gingerad":"0","part_appnexus":"4","part_blueroostermedia":"0","part_blueroostermedia_magnite":"0","part_zemanta":"1","part_adtelligent":"1","site_roix_ATF":null,"site_roix_BTF":null,"site_roix_FS":null,"site_roix_IT":null,"site_connectad_ATF":null,"site_connectad_BTF":null,"site_connectad_FS":null,"site_yahoo":null,"site_adform_server":"1","site_yahoo_ATF":null,"site_yahoo_BTF":null,"site_yahoo_FS":null,"site_yahoo_IT":null,"site_yahoo_inimage":null,"site_yahoo_parallax":null,"site_teads_HB":null,"site_teads_HB_display":null,"site_teads_US":null,"site_aol_server":"FR","site_onetag":"1","site_onetag_account":"0","site_adagio":"100026-elfqrin-com","site_triplelift":"2","site_theme":"1","site_true_url":"https:\/\/www.elfqrin.com","site_refresh":"1.00","site_capping":"50","site_vidazoo":null,"theme_teads_inbanner_pageid":"140854","theme_teads_intext_pageid":"140853","theme_teads_intext":"154587","theme_teads_inbanner":"154588","theme_name_english":"artsandentertainment","theme_showheroes":null,"subtheme_name_english":"Other","part_google":"0","part_triplelift":"2","part_sharethrough":"1","part_adaptmx":"1","site_confiant":"0","part_connectad":"0","part_improve":"1","part_rtb_house":"1","part_feedad":"0","part_impactify":"0","part_oftmedia_skin":"0","part_adpone":"0","site_adtelligent_inimage":"802517","part_33across":"-1","part_vidoomy":"-1","form_sublime":null,"part_sublime":"0","part_pubmatic":"0","form_vidoomy":null,"form_vidoomy_mobile":null,"tft_placement_id":"154587","tft_page_id":"140853","tft_placement_id_us":"180644","tft_page_id_us":"165874","form_gumgum":null,"part_gumgum":"0","zone_gumgum":null,"form_missena":null,"part_missena":"1","form_bliink":null,"part_bliink":"0"},"39287":{"site_cmp":"2","site_domain_pros":"elfqrin.com","site_ssp_pass":"-1","site_cnil":"0","user_id":"92945","user_plateform":"it","ad_id":"31","ad_triplelift_id":"MoneyTizer_Billboard_HDX","ad_triplelift_id_doublon":"MoneyTizer_Billboard_HDX_2","ad_triplelift_id_native":"MoneyTizer_Billboard_HDX_native","ad_triplelift_id_native_doublon":"MoneyTizer_Billboard_HDX_2_native","ad_yahoo_desktop":"8a9690f70180804b9e7352702fc303a9","ad_yahoo_mobile":"8a9699c60180804b9939527479660491","ad_yahoo_doublon_desktop":"8a9699c60180804b9939527827c60497","ad_yahoo_doublon_mobile":"8a9694200180804ba40d527b967d04d1","ad_sharethrough_desktop":"cnZp3jM8RsxpDogLmgFSeDfO","ad_sharethrough_mobile":"J5WKjPqSC4jv2Fqt8HgkyMv0","ad_sharethrough_desktop_doublon":"q3WTelACOw37qQXcPBnvkNRe","ad_sharethrough_mobile_doublon":"Co6PRfTRvHN5vqBQXIrrQhlp","ad_adyoulike":"71baf2ac13d535c7f2a239e601a406f6","ad_adyoulike_doublon":"8b0cf2e6ca8f7919724a9beb1678dc6a","ad_adyoulike_mobile":"672010fb29ea34cf8263150111839fb8","ad_adyoulike_doublon_mobile":"0ac0d393251ba8f445ed362b5b774ea6","ad_33across":"adtYE6zaer7ikjrkHcnnVW","ad_33across_doublon":"cza4tczcqr7ikjrkHcnnVW","ad_33across_doublon_mobile":"c0Guxwzcqr7ikjrkHcnnVW","ad_33across_mobile":"bYzPj0za8r7ikjrkHcnnVW","form_improve_floor":null,"form_id":"457430","form_ad_id":"31","form_richaudience":null,"form_richaudience_mobile":null,"form_custom_code":null,"form_custom_var":null,"form_custom_display":"0","tag_appnexus":"27456806","tag_appnexus2":null,"form_id_rubicon":null,"form_between":"4684686","form_adpone":null,"form_adpone_mobile":null,"form_custom_placement":null,"tag_sovrn":null,"tag_sovrn_mobile":null,"tag_adyoulike":null,"tag_adyoulike_mobile":null,"tag_adyoulike_RON":null,"tag_adyoulike_mobile_RON":null,"part_yahoo":"2","part_openx":"0","tag_improve":"22856720","tag_improve2":null,"tag_improve3":"22856727","tag_spotx":null,"tag_justpremium":null,"ad_smart_id":"39287","site_novideo":"0","site_id":"100026","site_id_smart":"539356\/1667595","part_teads":"0","part_ogury":"0","part_adyoulike":"1","part_criteo":"1","form_criteo":"1630115","form_criteo_mobile":"1630105","part_adform":"1","part_eplanning":"1","part_adriver":"0","part_smilewanted":"1","site_imonomy":null,"site_forced_cmp":"0","site_otm_ATF":null,"site_otm_BTF":null,"site_nano_ATF":null,"site_nano_BTF":null,"site_invibes_placement":null,"site_pubstack":"0e87f530-61bd-4184-b030-95de65edaf34","site_responsive":"1","site_blocklist":"0","part_seedtag":"0","site_seedtag":null,"form_seedtag_IT":null,"form_seedtag_FS":null,"site_id_rubicon_ATF":"1078210","site_id_rubicon_MTF":null,"site_id_rubicon_BTF":"1078294","part_rubicon":"2","site_ogury":null,"site_ogury_adunit":null,"site_doublon":null,"site_rtbhouse_asia":"0","site_ads_txt":"24","site_ads_txt_auto":"0","site_showheroes":null,"site_id_rubicon_MOBILE":null,"site_date_validation":"2022-09-21","site_id_rubicon_FS":null,"site_nobid":null,"site_nobid_ATF":null,"site_nobid_BTF":null,"site_nobid_FS":null,"site_nobid_inimage":null,"part_nobid":"0","site_adform":"0","site_openx_ATF":null,"site_openx_BTF":null,"site_openx_FS":null,"site_openx_inimage":null,"site_openx_parallax":null,"site_oftmedia_ATF":null,"site_oftmedia_BTF":null,"site_oftmedia_FS":null,"site_oftmedia_IT":null,"form_pubmatic":null,"site_pubmatic_ATF":null,"site_pubmatic_BTF":null,"site_pubmatic_FS":null,"site_pubmatic_inimage":null,"site_pubmatic_parallax":null,"site_blueroostermedia_ATF":null,"site_blueroostermedia_BTF":null,"site_blueroostermedia_FS":null,"site_blueroostermedia_IT":null,"site_blueroostermedia_old_ATF":null,"site_blueroostermedia_old_BTF":null,"site_blueroostermedia_old_FS":null,"site_bluerooster_inimage":null,"part_amazon":"1","site_adtelligent_ATF":"802503","site_adtelligent_BTF":"802504","site_adtelligent_FS":"802511","site_adtelligent_IT":"802516","site_gingerad_ATF":null,"site_gingerad_BTF":null,"site_gingerad_FS":null,"site_gingerad_IT":null,"part_gingerad":"0","part_appnexus":"4","part_blueroostermedia":"0","part_blueroostermedia_magnite":"0","part_zemanta":"1","part_adtelligent":"1","site_roix_ATF":null,"site_roix_BTF":null,"site_roix_FS":null,"site_roix_IT":null,"site_connectad_ATF":null,"site_connectad_BTF":null,"site_connectad_FS":null,"site_yahoo":null,"site_adform_server":"1","site_yahoo_ATF":null,"site_yahoo_BTF":null,"site_yahoo_FS":null,"site_yahoo_IT":null,"site_yahoo_inimage":null,"site_yahoo_parallax":null,"site_teads_HB":null,"site_teads_HB_display":null,"site_teads_US":null,"site_aol_server":"FR","site_onetag":"1","site_onetag_account":"0","site_adagio":"100026-elfqrin-com","site_triplelift":"2","site_theme":"1","site_true_url":"https:\/\/www.elfqrin.com","site_refresh":"1.00","site_capping":"50","site_vidazoo":null,"theme_teads_inbanner_pageid":"140854","theme_teads_intext_pageid":"140853","theme_teads_intext":"154587","theme_teads_inbanner":"154588","theme_name_english":"artsandentertainment","theme_showheroes":null,"subtheme_name_english":"Other","part_google":"0","part_triplelift":"2","part_sharethrough":"1","part_adaptmx":"1","site_confiant":"0","part_connectad":"0","part_improve":"1","part_rtb_house":"1","part_feedad":"0","part_impactify":"0","part_oftmedia_skin":"0","part_adpone":"0","site_adtelligent_inimage":"802517","part_33across":"-1","part_vidoomy":"-1","form_sublime":null,"part_sublime":"0","part_pubmatic":"0","form_vidoomy":null,"form_vidoomy_mobile":null,"tft_placement_id":"154588","tft_page_id":"140854","tft_placement_id_us":"180645","tft_page_id_us":"165875","form_gumgum":null,"part_gumgum":"0","zone_gumgum":null,"form_missena":null,"part_missena":"1","form_bliink":null,"part_bliink":"0"},"26328":{"site_cmp":"2","site_domain_pros":"elfqrin.com","site_ssp_pass":"-1","site_cnil":"0","user_id":"92945","user_plateform":"it","ad_id":"6","ad_triplelift_id":"MoneyTizer_Footer_HDX","ad_triplelift_id_doublon":"MoneyTizer_Footer_HDX_2","ad_triplelift_id_native":"MoneyTizer_Footer_HDX_native","ad_triplelift_id_native_doublon":"MoneyTizer_Footer_HDX_2_native","ad_yahoo_desktop":"8a9690f70180804b9e7352714ded03aa","ad_yahoo_mobile":"8a9699c60180804b993952740d470490","ad_yahoo_doublon_desktop":"8a9699c60180804b99395279135a049b","ad_yahoo_doublon_mobile":"8a9699c60180804b9939527b1d53049f","ad_sharethrough_desktop":"uvUcrgH1iI5FR6NxYAaO8zZX","ad_sharethrough_mobile":"Uh8Ls2TPFlPGbiy8tcW7hifd","ad_sharethrough_desktop_doublon":"k9kw1piB36xB6kGl2hAxV6NZ","ad_sharethrough_mobile_doublon":"YElGBy4wZ3aBCXAJT7k6Mmfb","ad_adyoulike":"8b2bd071f3581407a9d2ee02ab81501e","ad_adyoulike_doublon":"04d0d26ef25d77b4805986c42656ccbb","ad_adyoulike_mobile":"d5b0e319ed5c88cb47b8abdb035846b8","ad_adyoulike_doublon_mobile":"fc053f47a335f393cff149a396efd3e8","ad_33across":"bHj7xyza8r7ikjrkHcnnVW","ad_33across_doublon":"cKWxSQzcqr7ikjrkHcnnVW","ad_33across_doublon_mobile":"cWWUx4zcqr7ikjrkHcnnVW","ad_33across_mobile":"bUpsAUza8r7ikjrkHcnnVW","form_improve_floor":null,"form_id":"457423","form_ad_id":"6","form_richaudience":null,"form_richaudience_mobile":null,"form_custom_code":null,"form_custom_var":null,"form_custom_display":"0","tag_appnexus":"27456812","tag_appnexus2":null,"form_id_rubicon":null,"form_between":"4699846","form_adpone":null,"form_adpone_mobile":null,"form_custom_placement":null,"tag_sovrn":null,"tag_sovrn_mobile":null,"tag_adyoulike":null,"tag_adyoulike_mobile":null,"tag_adyoulike_RON":null,"tag_adyoulike_mobile_RON":null,"part_yahoo":"2","part_openx":"0","tag_improve":"22856726","tag_improve2":null,"tag_improve3":"22856713","tag_spotx":null,"tag_justpremium":null,"ad_smart_id":"26328","site_novideo":"0","site_id":"100026","site_id_smart":"539356\/1667595","part_teads":"0","part_ogury":"0","part_adyoulike":"1","part_criteo":"1","form_criteo":"1630096","form_criteo_mobile":"1630092","part_adform":"1","part_eplanning":"1","part_adriver":"0","part_smilewanted":"1","site_imonomy":null,"site_forced_cmp":"0","site_otm_ATF":null,"site_otm_BTF":null,"site_nano_ATF":null,"site_nano_BTF":null,"site_invibes_placement":null,"site_pubstack":"0e87f530-61bd-4184-b030-95de65edaf34","site_responsive":"1","site_blocklist":"0","part_seedtag":"0","site_seedtag":null,"form_seedtag_IT":null,"form_seedtag_FS":null,"site_id_rubicon_ATF":"1078210","site_id_rubicon_MTF":null,"site_id_rubicon_BTF":"1078294","part_rubicon":"2","site_ogury":null,"site_ogury_adunit":null,"site_doublon":null,"site_rtbhouse_asia":"0","site_ads_txt":"24","site_ads_txt_auto":"0","site_showheroes":null,"site_id_rubicon_MOBILE":null,"site_date_validation":"2022-09-21","site_id_rubicon_FS":null,"site_nobid":null,"site_nobid_ATF":null,"site_nobid_BTF":null,"site_nobid_FS":null,"site_nobid_inimage":null,"part_nobid":"0","site_adform":"0","site_openx_ATF":null,"site_openx_BTF":null,"site_openx_FS":null,"site_openx_inimage":null,"site_openx_parallax":null,"site_oftmedia_ATF":null,"site_oftmedia_BTF":null,"site_oftmedia_FS":null,"site_oftmedia_IT":null,"form_pubmatic":null,"site_pubmatic_ATF":null,"site_pubmatic_BTF":null,"site_pubmatic_FS":null,"site_pubmatic_inimage":null,"site_pubmatic_parallax":null,"site_blueroostermedia_ATF":null,"site_blueroostermedia_BTF":null,"site_blueroostermedia_FS":null,"site_blueroostermedia_IT":null,"site_blueroostermedia_old_ATF":null,"site_blueroostermedia_old_BTF":null,"site_blueroostermedia_old_FS":null,"site_bluerooster_inimage":null,"part_amazon":"1","site_adtelligent_ATF":"802503","site_adtelligent_BTF":"802504","site_adtelligent_FS":"802511","site_adtelligent_IT":"802516","site_gingerad_ATF":null,"site_gingerad_BTF":null,"site_gingerad_FS":null,"site_gingerad_IT":null,"part_gingerad":"0","part_appnexus":"4","part_blueroostermedia":"0","part_blueroostermedia_magnite":"0","part_zemanta":"1","part_adtelligent":"1","site_roix_ATF":null,"site_roix_BTF":null,"site_roix_FS":null,"site_roix_IT":null,"site_connectad_ATF":null,"site_connectad_BTF":null,"site_connectad_FS":null,"site_yahoo":null,"site_adform_server":"1","site_yahoo_ATF":null,"site_yahoo_BTF":null,"site_yahoo_FS":null,"site_yahoo_IT":null,"site_yahoo_inimage":null,"site_yahoo_parallax":null,"site_teads_HB":null,"site_teads_HB_display":null,"site_teads_US":null,"site_aol_server":"FR","site_onetag":"1","site_onetag_account":"0","site_adagio":"100026-elfqrin-com","site_triplelift":"2","site_theme":"1","site_true_url":"https:\/\/www.elfqrin.com","site_refresh":"1.00","site_capping":"50","site_vidazoo":null,"theme_teads_inbanner_pageid":"140854","theme_teads_intext_pageid":"140853","theme_teads_intext":"154587","theme_teads_inbanner":"154588","theme_name_english":"artsandentertainment","theme_showheroes":null,"subtheme_name_english":"Other","part_google":"0","part_triplelift":"2","part_sharethrough":"1","part_adaptmx":"1","site_confiant":"0","part_connectad":"0","part_improve":"1","part_rtb_house":"1","part_feedad":"0","part_impactify":"0","part_oftmedia_skin":"0","part_adpone":"0","site_adtelligent_inimage":"802517","part_33across":"-1","part_vidoomy":"-1","form_sublime":null,"part_sublime":"0","part_pubmatic":"0","form_vidoomy":null,"form_vidoomy_mobile":null,"tft_placement_id":"163352","tft_page_id":"149211","tft_placement_id_us":"180647","tft_page_id_us":"165877","form_gumgum":null,"part_gumgum":"0","zone_gumgum":null,"form_missena":"PA-72422485","part_missena":"1","form_bliink":null,"part_bliink":"0"},"35757":{"site_cmp":"2","site_domain_pros":"elfqrin.com","site_ssp_pass":"-1","site_cnil":"0","user_id":"92945","user_plateform":"it","ad_id":"30","ad_triplelift_id":null,"ad_triplelift_id_doublon":null,"ad_triplelift_id_native":null,"ad_triplelift_id_native_doublon":null,"ad_yahoo_desktop":"8a9694200180804ba40d5271e9b404c9","ad_yahoo_mobile":"8a9699c60180804b99395274cf4b0492","ad_yahoo_doublon_desktop":"8a9699c60180804b993952799f02049c","ad_yahoo_doublon_mobile":"8a9699c60180804b9939527bfb7f04a0","ad_sharethrough_desktop":null,"ad_sharethrough_mobile":null,"ad_sharethrough_desktop_doublon":null,"ad_sharethrough_mobile_doublon":null,"ad_adyoulike":"4e0840f9d32f8f22fef8cba08dd0fa2d","ad_adyoulike_doublon":null,"ad_adyoulike_mobile":"bff73ef2042d0535b9849e3f55e3cc4d","ad_adyoulike_doublon_mobile":null,"ad_33across":null,"ad_33across_doublon":null,"ad_33across_doublon_mobile":null,"ad_33across_mobile":null,"form_improve_floor":null,"form_id":"457429","form_ad_id":"30","form_richaudience":null,"form_richaudience_mobile":null,"form_custom_code":null,"form_custom_var":null,"form_custom_display":"0","tag_appnexus":"27456807","tag_appnexus2":null,"form_id_rubicon":null,"form_between":"4679317","form_adpone":null,"form_adpone_mobile":null,"form_custom_placement":null,"tag_sovrn":null,"tag_sovrn_mobile":null,"tag_adyoulike":null,"tag_adyoulike_mobile":null,"tag_adyoulike_RON":null,"tag_adyoulike_mobile_RON":null,"part_yahoo":"2","part_openx":"0","tag_improve":"22856721","tag_improve2":null,"tag_improve3":"22856728","tag_spotx":null,"tag_justpremium":null,"ad_smart_id":"35757","site_novideo":"0","site_id":"100026","site_id_smart":"539356\/1667595","part_teads":"0","part_ogury":"0","part_adyoulike":"1","part_criteo":"1","form_criteo":null,"form_criteo_mobile":null,"part_adform":"1","part_eplanning":"1","part_adriver":"0","part_smilewanted":"1","site_imonomy":null,"site_forced_cmp":"0","site_otm_ATF":null,"site_otm_BTF":null,"site_nano_ATF":null,"site_nano_BTF":null,"site_invibes_placement":null,"site_pubstack":"0e87f530-61bd-4184-b030-95de65edaf34","site_responsive":"1","site_blocklist":"0","part_seedtag":"0","site_seedtag":null,"form_seedtag_IT":null,"form_seedtag_FS":null,"site_id_rubicon_ATF":"1078210","site_id_rubicon_MTF":null,"site_id_rubicon_BTF":"1078294","part_rubicon":"2","site_ogury":null,"site_ogury_adunit":null,"site_doublon":null,"site_rtbhouse_asia":"0","site_ads_txt":"24","site_ads_txt_auto":"0","site_showheroes":null,"site_id_rubicon_MOBILE":null,"site_date_validation":"2022-09-21","site_id_rubicon_FS":null,"site_nobid":null,"site_nobid_ATF":null,"site_nobid_BTF":null,"site_nobid_FS":null,"site_nobid_inimage":null,"part_nobid":"0","site_adform":"0","site_openx_ATF":null,"site_openx_BTF":null,"site_openx_FS":null,"site_openx_inimage":null,"site_openx_parallax":null,"site_oftmedia_ATF":null,"site_oftmedia_BTF":null,"site_oftmedia_FS":null,"site_oftmedia_IT":null,"form_pubmatic":null,"site_pubmatic_ATF":null,"site_pubmatic_BTF":null,"site_pubmatic_FS":null,"site_pubmatic_inimage":null,"site_pubmatic_parallax":null,"site_blueroostermedia_ATF":null,"site_blueroostermedia_BTF":null,"site_blueroostermedia_FS":null,"site_blueroostermedia_IT":null,"site_blueroostermedia_old_ATF":null,"site_blueroostermedia_old_BTF":null,"site_blueroostermedia_old_FS":null,"site_bluerooster_inimage":null,"part_amazon":"1","site_adtelligent_ATF":"802503","site_adtelligent_BTF":"802504","site_adtelligent_FS":"802511","site_adtelligent_IT":"802516","site_gingerad_ATF":null,"site_gingerad_BTF":null,"site_gingerad_FS":null,"site_gingerad_IT":null,"part_gingerad":"0","part_appnexus":"4","part_blueroostermedia":"0","part_blueroostermedia_magnite":"0","part_zemanta":"1","part_adtelligent":"1","site_roix_ATF":null,"site_roix_BTF":null,"site_roix_FS":null,"site_roix_IT":null,"site_connectad_ATF":null,"site_connectad_BTF":null,"site_connectad_FS":null,"site_yahoo":null,"site_adform_server":"1","site_yahoo_ATF":null,"site_yahoo_BTF":null,"site_yahoo_FS":null,"site_yahoo_IT":null,"site_yahoo_inimage":null,"site_yahoo_parallax":null,"site_teads_HB":null,"site_teads_HB_display":null,"site_teads_US":null,"site_aol_server":"FR","site_onetag":"1","site_onetag_account":"0","site_adagio":"100026-elfqrin-com","site_triplelift":"2","site_theme":"1","site_true_url":"https:\/\/www.elfqrin.com","site_refresh":"1.00","site_capping":"50","site_vidazoo":null,"theme_teads_inbanner_pageid":"140854","theme_teads_intext_pageid":"140853","theme_teads_intext":"154587","theme_teads_inbanner":"154588","theme_name_english":"artsandentertainment","theme_showheroes":null,"subtheme_name_english":"Other","part_google":"0","part_triplelift":"2","part_sharethrough":"1","part_adaptmx":"1","site_confiant":"0","part_connectad":"0","part_improve":"1","part_rtb_house":"1","part_feedad":"0","part_impactify":"0","part_oftmedia_skin":"0","part_adpone":"0","site_adtelligent_inimage":"802517","part_33across":"-1","part_vidoomy":"-1","form_sublime":null,"part_sublime":"0","part_pubmatic":"0","form_vidoomy":null,"form_vidoomy_mobile":null,"tft_placement_id":"163354","tft_page_id":"149213","tft_placement_id_us":"180649","tft_page_id_us":"165879","form_gumgum":null,"part_gumgum":"0","zone_gumgum":null,"form_missena":null,"part_missena":"1","form_bliink":null,"part_bliink":"0"},"26322":{"site_cmp":"2","site_domain_pros":"elfqrin.com","site_ssp_pass":"-1","site_cnil":"0","user_id":"92945","user_plateform":"it","ad_id":"1","ad_triplelift_id":"MoneyTizer_MegaBannerHaute_HDX","ad_triplelift_id_doublon":"MoneyTizer_MegaBannerHaute_HDX_2","ad_triplelift_id_native":"MoneyTizer_MegaBannerHaute_HDX_native","ad_triplelift_id_native_doublon":"MoneyTizer_MegaBannerHaute_HDX_2_native","ad_yahoo_desktop":"8a9699c60180804b9939526e9a05048e","ad_yahoo_mobile":"8a9694200180804ba40d52731f1b04ca","ad_yahoo_doublon_desktop":"8a9690f70180804b9e735276f71903ac","ad_yahoo_doublon_mobile":"8a9694200180804ba40d527a150604cf","ad_sharethrough_desktop":"uevsIvm575ehAVvY5YMJQNYl","ad_sharethrough_mobile":"TWpVZHErn9OwATL0UnP4Elck","ad_sharethrough_desktop_doublon":"Sm9PhrfMQ9n5GzJdG9tXN42c","ad_sharethrough_mobile_doublon":"BC22SESAy3okMvCtB7UKh8Sc","ad_adyoulike":"8b0ab0c233182188355bf921aec06adb","ad_adyoulike_doublon":"0807cbb40fccf70a3567d3d1bc5ecf62","ad_adyoulike_mobile":"9805d9a515b3bfe5f618cd0cea9d6615","ad_adyoulike_doublon_mobile":"84c82d568c9fd69e123be04807f52ea7","ad_33across":"byadUMza8r7ikjrkHcnnVW","ad_33across_doublon":"b-Z57yzcqr7ikjrkHcnnVW","ad_33across_doublon_mobile":"cOVwNszcqr7ikjrkHcnnVW","ad_33across_mobile":"bL63hmza8r7ikjrkHcnnVW","form_improve_floor":null,"form_id":"457419","form_ad_id":"1","form_richaudience":null,"form_richaudience_mobile":null,"form_custom_code":null,"form_custom_var":null,"form_custom_display":"0","tag_appnexus":"27456809","tag_appnexus2":null,"form_id_rubicon":null,"form_between":"4660208","form_adpone":null,"form_adpone_mobile":null,"form_custom_placement":null,"tag_sovrn":null,"tag_sovrn_mobile":null,"tag_adyoulike":null,"tag_adyoulike_mobile":null,"tag_adyoulike_RON":null,"tag_adyoulike_mobile_RON":null,"part_yahoo":"2","part_openx":"0","tag_improve":"22856723","tag_improve2":null,"tag_improve3":"22856730","tag_spotx":null,"tag_justpremium":null,"ad_smart_id":"26322","site_novideo":"0","site_id":"100026","site_id_smart":"539356\/1667595","part_teads":"0","part_ogury":"0","part_adyoulike":"1","part_criteo":"1","form_criteo":"1630082","form_criteo_mobile":"1630076","part_adform":"1","part_eplanning":"1","part_adriver":"0","part_smilewanted":"1","site_imonomy":null,"site_forced_cmp":"0","site_otm_ATF":null,"site_otm_BTF":null,"site_nano_ATF":null,"site_nano_BTF":null,"site_invibes_placement":null,"site_pubstack":"0e87f530-61bd-4184-b030-95de65edaf34","site_responsive":"1","site_blocklist":"0","part_seedtag":"0","site_seedtag":null,"form_seedtag_IT":null,"form_seedtag_FS":null,"site_id_rubicon_ATF":"1078210","site_id_rubicon_MTF":null,"site_id_rubicon_BTF":"1078294","part_rubicon":"2","site_ogury":null,"site_ogury_adunit":null,"site_doublon":null,"site_rtbhouse_asia":"0","site_ads_txt":"24","site_ads_txt_auto":"0","site_showheroes":null,"site_id_rubicon_MOBILE":null,"site_date_validation":"2022-09-21","site_id_rubicon_FS":null,"site_nobid":null,"site_nobid_ATF":null,"site_nobid_BTF":null,"site_nobid_FS":null,"site_nobid_inimage":null,"part_nobid":"0","site_adform":"0","site_openx_ATF":null,"site_openx_BTF":null,"site_openx_FS":null,"site_openx_inimage":null,"site_openx_parallax":null,"site_oftmedia_ATF":null,"site_oftmedia_BTF":null,"site_oftmedia_FS":null,"site_oftmedia_IT":null,"form_pubmatic":null,"site_pubmatic_ATF":null,"site_pubmatic_BTF":null,"site_pubmatic_FS":null,"site_pubmatic_inimage":null,"site_pubmatic_parallax":null,"site_blueroostermedia_ATF":null,"site_blueroostermedia_BTF":null,"site_blueroostermedia_FS":null,"site_blueroostermedia_IT":null,"site_blueroostermedia_old_ATF":null,"site_blueroostermedia_old_BTF":null,"site_blueroostermedia_old_FS":null,"site_bluerooster_inimage":null,"part_amazon":"1","site_adtelligent_ATF":"802503","site_adtelligent_BTF":"802504","site_adtelligent_FS":"802511","site_adtelligent_IT":"802516","site_gingerad_ATF":null,"site_gingerad_BTF":null,"site_gingerad_FS":null,"site_gingerad_IT":null,"part_gingerad":"0","part_appnexus":"4","part_blueroostermedia":"0","part_blueroostermedia_magnite":"0","part_zemanta":"1","part_adtelligent":"1","site_roix_ATF":null,"site_roix_BTF":null,"site_roix_FS":null,"site_roix_IT":null,"site_connectad_ATF":null,"site_connectad_BTF":null,"site_connectad_FS":null,"site_yahoo":null,"site_adform_server":"1","site_yahoo_ATF":null,"site_yahoo_BTF":null,"site_yahoo_FS":null,"site_yahoo_IT":null,"site_yahoo_inimage":null,"site_yahoo_parallax":null,"site_teads_HB":null,"site_teads_HB_display":null,"site_teads_US":null,"site_aol_server":"FR","site_onetag":"1","site_onetag_account":"0","site_adagio":"100026-elfqrin-com","site_triplelift":"2","site_theme":"1","site_true_url":"https:\/\/www.elfqrin.com","site_refresh":"1.00","site_capping":"50","site_vidazoo":null,"theme_teads_inbanner_pageid":"140854","theme_teads_intext_pageid":"140853","theme_teads_intext":"154587","theme_teads_inbanner":"154588","theme_name_english":"artsandentertainment","theme_showheroes":null,"subtheme_name_english":"Other","part_google":"0","part_triplelift":"2","part_sharethrough":"1","part_adaptmx":"1","site_confiant":"0","part_connectad":"0","part_improve":"1","part_rtb_house":"1","part_feedad":"0","part_impactify":"0","part_oftmedia_skin":"0","part_adpone":"0","site_adtelligent_inimage":"802517","part_33across":"-1","part_vidoomy":"-1","form_sublime":null,"part_sublime":"0","part_pubmatic":"0","form_vidoomy":null,"form_vidoomy_mobile":null,"tft_placement_id":"163355","tft_page_id":"149214","tft_placement_id_us":"180650","tft_page_id_us":"165880","form_gumgum":null,"part_gumgum":"0","zone_gumgum":null,"form_missena":null,"part_missena":"1","form_bliink":null,"part_bliink":"0"},"30012":{"site_cmp":"2","site_domain_pros":"elfqrin.com","site_ssp_pass":"-1","site_cnil":"0","user_id":"92945","user_plateform":"it","ad_id":"28","ad_triplelift_id":"MoneyTizer_MegaBannerBasse_HDX","ad_triplelift_id_doublon":"MoneyTizer_MegaBannerBasse_HDX_2","ad_triplelift_id_native":"MoneyTizer_MegaBannerBasse_HDX_native","ad_triplelift_id_native_doublon":"MoneyTizer_MegaBannerBasse_HDX_2_native","ad_yahoo_desktop":"8a9694200180804ba40d526f321904c8","ad_yahoo_mobile":"8a9694200180804ba40d5273776004cb","ad_yahoo_doublon_desktop":"8a9699c60180804b993952774c5a0495","ad_yahoo_doublon_mobile":"8a9694200180804ba40d527a883604d0","ad_sharethrough_desktop":"12SkPAyrRNYtFBkq79NvqxJf","ad_sharethrough_mobile":"CgGjvtj4BZl6IqtZOKvFOenO","ad_sharethrough_desktop_doublon":"1GRXLSxrbcGX8fCGCxZZCtHv","ad_sharethrough_mobile_doublon":"91tWqHRJJX15HqRVdg335WNw","ad_adyoulike":"88a44940affe2c7d8d1da252693d12c2","ad_adyoulike_doublon":"64384cb36c5ab7eddf76feb019a254ec","ad_adyoulike_mobile":"6690b94d6b273a94d471e01caeae9c8c","ad_adyoulike_doublon_mobile":"93131074529919ce73ad1c93acfce9d5","ad_33across":"bCzQXWza8r7ikjrkHcnnVW","ad_33across_doublon":"cq1Z88zcqr7ikjrkHcnnVW","ad_33across_doublon_mobile":"cSPxjGzcqr7ikjrkHcnnVW","ad_33across_mobile":"bQmeKgza8r7ikjrkHcnnVW","form_improve_floor":null,"form_id":"457428","form_ad_id":"28","form_richaudience":null,"form_richaudience_mobile":null,"form_custom_code":null,"form_custom_var":null,"form_custom_display":"0","tag_appnexus":"27456808","tag_appnexus2":null,"form_id_rubicon":null,"form_between":"4675366","form_adpone":null,"form_adpone_mobile":null,"form_custom_placement":null,"tag_sovrn":null,"tag_sovrn_mobile":null,"tag_adyoulike":null,"tag_adyoulike_mobile":null,"tag_adyoulike_RON":null,"tag_adyoulike_mobile_RON":null,"part_yahoo":"2","part_openx":"0","tag_improve":"22856722","tag_improve2":null,"tag_improve3":"22856729","tag_spotx":null,"tag_justpremium":null,"ad_smart_id":"30012","site_novideo":"0","site_id":"100026","site_id_smart":"539356\/1667595","part_teads":"0","part_ogury":"0","part_adyoulike":"1","part_criteo":"1","form_criteo":"1630081","form_criteo_mobile":"1630078","part_adform":"1","part_eplanning":"1","part_adriver":"0","part_smilewanted":"1","site_imonomy":null,"site_forced_cmp":"0","site_otm_ATF":null,"site_otm_BTF":null,"site_nano_ATF":null,"site_nano_BTF":null,"site_invibes_placement":null,"site_pubstack":"0e87f530-61bd-4184-b030-95de65edaf34","site_responsive":"1","site_blocklist":"0","part_seedtag":"0","site_seedtag":null,"form_seedtag_IT":null,"form_seedtag_FS":null,"site_id_rubicon_ATF":"1078210","site_id_rubicon_MTF":null,"site_id_rubicon_BTF":"1078294","part_rubicon":"2","site_ogury":null,"site_ogury_adunit":null,"site_doublon":null,"site_rtbhouse_asia":"0","site_ads_txt":"24","site_ads_txt_auto":"0","site_showheroes":null,"site_id_rubicon_MOBILE":null,"site_date_validation":"2022-09-21","site_id_rubicon_FS":null,"site_nobid":null,"site_nobid_ATF":null,"site_nobid_BTF":null,"site_nobid_FS":null,"site_nobid_inimage":null,"part_nobid":"0","site_adform":"0","site_openx_ATF":null,"site_openx_BTF":null,"site_openx_FS":null,"site_openx_inimage":null,"site_openx_parallax":null,"site_oftmedia_ATF":null,"site_oftmedia_BTF":null,"site_oftmedia_FS":null,"site_oftmedia_IT":null,"form_pubmatic":null,"site_pubmatic_ATF":null,"site_pubmatic_BTF":null,"site_pubmatic_FS":null,"site_pubmatic_inimage":null,"site_pubmatic_parallax":null,"site_blueroostermedia_ATF":null,"site_blueroostermedia_BTF":null,"site_blueroostermedia_FS":null,"site_blueroostermedia_IT":null,"site_blueroostermedia_old_ATF":null,"site_blueroostermedia_old_BTF":null,"site_blueroostermedia_old_FS":null,"site_bluerooster_inimage":null,"part_amazon":"1","site_adtelligent_ATF":"802503","site_adtelligent_BTF":"802504","site_adtelligent_FS":"802511","site_adtelligent_IT":"802516","site_gingerad_ATF":null,"site_gingerad_BTF":null,"site_gingerad_FS":null,"site_gingerad_IT":null,"part_gingerad":"0","part_appnexus":"4","part_blueroostermedia":"0","part_blueroostermedia_magnite":"0","part_zemanta":"1","part_adtelligent":"1","site_roix_ATF":null,"site_roix_BTF":null,"site_roix_FS":null,"site_roix_IT":null,"site_connectad_ATF":null,"site_connectad_BTF":null,"site_connectad_FS":null,"site_yahoo":null,"site_adform_server":"1","site_yahoo_ATF":null,"site_yahoo_BTF":null,"site_yahoo_FS":null,"site_yahoo_IT":null,"site_yahoo_inimage":null,"site_yahoo_parallax":null,"site_teads_HB":null,"site_teads_HB_display":null,"site_teads_US":null,"site_aol_server":"FR","site_onetag":"1","site_onetag_account":"0","site_adagio":"100026-elfqrin-com","site_triplelift":"2","site_theme":"1","site_true_url":"https:\/\/www.elfqrin.com","site_refresh":"1.00","site_capping":"50","site_vidazoo":null,"theme_teads_inbanner_pageid":"140854","theme_teads_intext_pageid":"140853","theme_teads_intext":"154587","theme_teads_inbanner":"154588","theme_name_english":"artsandentertainment","theme_showheroes":null,"subtheme_name_english":"Other","part_google":"0","part_triplelift":"2","part_sharethrough":"1","part_adaptmx":"1","site_confiant":"0","part_connectad":"0","part_improve":"1","part_rtb_house":"1","part_feedad":"0","part_impactify":"0","part_oftmedia_skin":"0","part_adpone":"0","site_adtelligent_inimage":"802517","part_33across":"-1","part_vidoomy":"-1","form_sublime":null,"part_sublime":"0","part_pubmatic":"0","form_vidoomy":null,"form_vidoomy_mobile":null,"tft_placement_id":"163356","tft_page_id":"149215","tft_placement_id_us":"180651","tft_page_id_us":"165881","form_gumgum":null,"part_gumgum":"0","zone_gumgum":null,"form_missena":null,"part_missena":"1","form_bliink":null,"part_bliink":"0"},"26706":{"site_cmp":"2","site_domain_pros":"elfqrin.com","site_ssp_pass":"-1","site_cnil":"0","user_id":"92945","user_plateform":"it","ad_id":"20","ad_triplelift_id":"MoneyTizer_MegaSky_HDX","ad_triplelift_id_doublon":"MoneyTizer_MegaSky_HDX_2","ad_triplelift_id_native":null,"ad_triplelift_id_native_doublon":null,"ad_yahoo_desktop":"8a9699c60180804b99395270b5f2048f","ad_yahoo_mobile":null,"ad_yahoo_doublon_desktop":"8a9690f70180804b9e735278a5f403ae","ad_yahoo_doublon_mobile":null,"ad_sharethrough_desktop":"So5rt5q54oVVMHufuidy346Z","ad_sharethrough_mobile":null,"ad_sharethrough_desktop_doublon":"Xou3MB55D8yocroYFwCRnEkh","ad_sharethrough_mobile_doublon":null,"ad_adyoulike":"6a64947068f3fe365ac1a55cd96a3493","ad_adyoulike_doublon":"bca7338d088aae0423a54d3494040ca7","ad_adyoulike_mobile":null,"ad_adyoulike_doublon_mobile":null,"ad_33across":"aiQovMzaer7ikjrkHcnnVW","ad_33across_doublon":"cCVt0Azcqr7ikjrkHcnnVW","ad_33across_doublon_mobile":null,"ad_33across_mobile":null,"form_improve_floor":null,"form_id":"457426","form_ad_id":"20","form_richaudience":null,"form_richaudience_mobile":null,"form_custom_code":null,"form_custom_var":null,"form_custom_display":"0","tag_appnexus":"27456810","tag_appnexus2":null,"form_id_rubicon":null,"form_between":"4671375","form_adpone":null,"form_adpone_mobile":null,"form_custom_placement":null,"tag_sovrn":null,"tag_sovrn_mobile":null,"tag_adyoulike":null,"tag_adyoulike_mobile":null,"tag_adyoulike_RON":null,"tag_adyoulike_mobile_RON":null,"part_yahoo":"2","part_openx":"0","tag_improve":"22856724","tag_improve2":null,"tag_improve3":"22856731","tag_spotx":null,"tag_justpremium":null,"ad_smart_id":"26706","site_novideo":"0","site_id":"100026","site_id_smart":"539356\/1667595","part_teads":"0","part_ogury":"0","part_adyoulike":"1","part_criteo":"1","form_criteo":"1630086","form_criteo_mobile":null,"part_adform":"1","part_eplanning":"1","part_adriver":"0","part_smilewanted":"1","site_imonomy":null,"site_forced_cmp":"0","site_otm_ATF":null,"site_otm_BTF":null,"site_nano_ATF":null,"site_nano_BTF":null,"site_invibes_placement":null,"site_pubstack":"0e87f530-61bd-4184-b030-95de65edaf34","site_responsive":"1","site_blocklist":"0","part_seedtag":"0","site_seedtag":null,"form_seedtag_IT":null,"form_seedtag_FS":null,"site_id_rubicon_ATF":"1078210","site_id_rubicon_MTF":null,"site_id_rubicon_BTF":"1078294","part_rubicon":"2","site_ogury":null,"site_ogury_adunit":null,"site_doublon":null,"site_rtbhouse_asia":"0","site_ads_txt":"24","site_ads_txt_auto":"0","site_showheroes":null,"site_id_rubicon_MOBILE":null,"site_date_validation":"2022-09-21","site_id_rubicon_FS":null,"site_nobid":null,"site_nobid_ATF":null,"site_nobid_BTF":null,"site_nobid_FS":null,"site_nobid_inimage":null,"part_nobid":"0","site_adform":"0","site_openx_ATF":null,"site_openx_BTF":null,"site_openx_FS":null,"site_openx_inimage":null,"site_openx_parallax":null,"site_oftmedia_ATF":null,"site_oftmedia_BTF":null,"site_oftmedia_FS":null,"site_oftmedia_IT":null,"form_pubmatic":null,"site_pubmatic_ATF":null,"site_pubmatic_BTF":null,"site_pubmatic_FS":null,"site_pubmatic_inimage":null,"site_pubmatic_parallax":null,"site_blueroostermedia_ATF":null,"site_blueroostermedia_BTF":null,"site_blueroostermedia_FS":null,"site_blueroostermedia_IT":null,"site_blueroostermedia_old_ATF":null,"site_blueroostermedia_old_BTF":null,"site_blueroostermedia_old_FS":null,"site_bluerooster_inimage":null,"part_amazon":"1","site_adtelligent_ATF":"802503","site_adtelligent_BTF":"802504","site_adtelligent_FS":"802511","site_adtelligent_IT":"802516","site_gingerad_ATF":null,"site_gingerad_BTF":null,"site_gingerad_FS":null,"site_gingerad_IT":null,"part_gingerad":"0","part_appnexus":"4","part_blueroostermedia":"0","part_blueroostermedia_magnite":"0","part_zemanta":"1","part_adtelligent":"1","site_roix_ATF":null,"site_roix_BTF":null,"site_roix_FS":null,"site_roix_IT":null,"site_connectad_ATF":null,"site_connectad_BTF":null,"site_connectad_FS":null,"site_yahoo":null,"site_adform_server":"1","site_yahoo_ATF":null,"site_yahoo_BTF":null,"site_yahoo_FS":null,"site_yahoo_IT":null,"site_yahoo_inimage":null,"site_yahoo_parallax":null,"site_teads_HB":null,"site_teads_HB_display":null,"site_teads_US":null,"site_aol_server":"FR","site_onetag":"1","site_onetag_account":"0","site_adagio":"100026-elfqrin-com","site_triplelift":"2","site_theme":"1","site_true_url":"https:\/\/www.elfqrin.com","site_refresh":"1.00","site_capping":"50","site_vidazoo":null,"theme_teads_inbanner_pageid":"140854","theme_teads_intext_pageid":"140853","theme_teads_intext":"154587","theme_teads_inbanner":"154588","theme_name_english":"artsandentertainment","theme_showheroes":null,"subtheme_name_english":"Other","part_google":"0","part_triplelift":"2","part_sharethrough":"1","part_adaptmx":"1","site_confiant":"0","part_connectad":"0","part_improve":"1","part_rtb_house":"1","part_feedad":"0","part_impactify":"0","part_oftmedia_skin":"0","part_adpone":"0","site_adtelligent_inimage":"802517","part_33across":"-1","part_vidoomy":"-1","form_sublime":null,"part_sublime":"0","part_pubmatic":"0","form_vidoomy":null,"form_vidoomy_mobile":null,"tft_placement_id":"163357","tft_page_id":"149216","tft_placement_id_us":"180652","tft_page_id_us":"165882","form_gumgum":null,"part_gumgum":"0","zone_gumgum":null,"form_missena":null,"part_missena":"1","form_bliink":null,"part_bliink":"0"},"26300":{"site_cmp":"2","site_domain_pros":"elfqrin.com","site_ssp_pass":"-1","site_cnil":"0","user_id":"92945","user_plateform":"it","ad_id":"2","ad_triplelift_id":"MoneyTizer_PaveHaut_HDX","ad_triplelift_id_doublon":"MoneyTizer_PaveHaut_HDX_2","ad_triplelift_id_native":"MoneyTizer_PaveHaut_HDX_native","ad_triplelift_id_native_doublon":"MoneyTizer_PaveHaut_HDX_2_native","ad_yahoo_desktop":"8a9690f70180804b9e73526c9bac03a6","ad_yahoo_mobile":null,"ad_yahoo_doublon_desktop":"8a9690f70180804b9e7352753d5f03ab","ad_yahoo_doublon_mobile":null,"ad_sharethrough_desktop":"aa6jPKCn03DW8oVaGuoKahUA","ad_sharethrough_mobile":null,"ad_sharethrough_desktop_doublon":"jp3rORZQBAc2RXi0fhwXiNOY","ad_sharethrough_mobile_doublon":null,"ad_adyoulike":"d0ee9bca93ec443763d034457d4b33f4","ad_adyoulike_doublon":"6cabd0d20f9fb3cceab8056fe3f102a1","ad_adyoulike_mobile":null,"ad_adyoulike_doublon_mobile":null,"ad_33across":"bpjP6uza8r7ikjrkHcnnVW","ad_33across_doublon":"b-Z57yzcqr7ikjrkHcnnVW","ad_33across_doublon_mobile":null,"ad_33across_mobile":null,"form_improve_floor":null,"form_id":"457420","form_ad_id":"2","form_richaudience":null,"form_richaudience_mobile":null,"form_custom_code":null,"form_custom_var":null,"form_custom_display":"0","tag_appnexus":"27479849","tag_appnexus2":null,"form_id_rubicon":null,"form_between":"4661541","form_adpone":null,"form_adpone_mobile":null,"form_custom_placement":null,"tag_sovrn":null,"tag_sovrn_mobile":null,"tag_adyoulike":null,"tag_adyoulike_mobile":null,"tag_adyoulike_RON":null,"tag_adyoulike_mobile_RON":null,"part_yahoo":"2","part_openx":"0","tag_improve":"22858033","tag_improve2":null,"tag_improve3":"22858034","tag_spotx":null,"tag_justpremium":null,"ad_smart_id":"26300","site_novideo":"0","site_id":"100026","site_id_smart":"539356\/1667595","part_teads":"0","part_ogury":"0","part_adyoulike":"1","part_criteo":"1","form_criteo":"1630103","form_criteo_mobile":null,"part_adform":"1","part_eplanning":"1","part_adriver":"0","part_smilewanted":"1","site_imonomy":null,"site_forced_cmp":"0","site_otm_ATF":null,"site_otm_BTF":null,"site_nano_ATF":null,"site_nano_BTF":null,"site_invibes_placement":null,"site_pubstack":"0e87f530-61bd-4184-b030-95de65edaf34","site_responsive":"1","site_blocklist":"0","part_seedtag":"0","site_seedtag":null,"form_seedtag_IT":null,"form_seedtag_FS":null,"site_id_rubicon_ATF":"1078210","site_id_rubicon_MTF":null,"site_id_rubicon_BTF":"1078294","part_rubicon":"2","site_ogury":null,"site_ogury_adunit":null,"site_doublon":null,"site_rtbhouse_asia":"0","site_ads_txt":"24","site_ads_txt_auto":"0","site_showheroes":null,"site_id_rubicon_MOBILE":null,"site_date_validation":"2022-09-21","site_id_rubicon_FS":null,"site_nobid":null,"site_nobid_ATF":null,"site_nobid_BTF":null,"site_nobid_FS":null,"site_nobid_inimage":null,"part_nobid":"0","site_adform":"0","site_openx_ATF":null,"site_openx_BTF":null,"site_openx_FS":null,"site_openx_inimage":null,"site_openx_parallax":null,"site_oftmedia_ATF":null,"site_oftmedia_BTF":null,"site_oftmedia_FS":null,"site_oftmedia_IT":null,"form_pubmatic":null,"site_pubmatic_ATF":null,"site_pubmatic_BTF":null,"site_pubmatic_FS":null,"site_pubmatic_inimage":null,"site_pubmatic_parallax":null,"site_blueroostermedia_ATF":null,"site_blueroostermedia_BTF":null,"site_blueroostermedia_FS":null,"site_blueroostermedia_IT":null,"site_blueroostermedia_old_ATF":null,"site_blueroostermedia_old_BTF":null,"site_blueroostermedia_old_FS":null,"site_bluerooster_inimage":null,"part_amazon":"1","site_adtelligent_ATF":"802503","site_adtelligent_BTF":"802504","site_adtelligent_FS":"802511","site_adtelligent_IT":"802516","site_gingerad_ATF":null,"site_gingerad_BTF":null,"site_gingerad_FS":null,"site_gingerad_IT":null,"part_gingerad":"0","part_appnexus":"4","part_blueroostermedia":"0","part_blueroostermedia_magnite":"0","part_zemanta":"1","part_adtelligent":"1","site_roix_ATF":null,"site_roix_BTF":null,"site_roix_FS":null,"site_roix_IT":null,"site_connectad_ATF":null,"site_connectad_BTF":null,"site_connectad_FS":null,"site_yahoo":null,"site_adform_server":"1","site_yahoo_ATF":null,"site_yahoo_BTF":null,"site_yahoo_FS":null,"site_yahoo_IT":null,"site_yahoo_inimage":null,"site_yahoo_parallax":null,"site_teads_HB":null,"site_teads_HB_display":null,"site_teads_US":null,"site_aol_server":"FR","site_onetag":"1","site_onetag_account":"0","site_adagio":"100026-elfqrin-com","site_triplelift":"2","site_theme":"1","site_true_url":"https:\/\/www.elfqrin.com","site_refresh":"1.00","site_capping":"50","site_vidazoo":null,"theme_teads_inbanner_pageid":"140854","theme_teads_intext_pageid":"140853","theme_teads_intext":"154587","theme_teads_inbanner":"154588","theme_name_english":"artsandentertainment","theme_showheroes":null,"subtheme_name_english":"Other","part_google":"0","part_triplelift":"2","part_sharethrough":"1","part_adaptmx":"1","site_confiant":"0","part_connectad":"0","part_improve":"1","part_rtb_house":"1","part_feedad":"0","part_impactify":"0","part_oftmedia_skin":"0","part_adpone":"0","site_adtelligent_inimage":"802517","part_33across":"-1","part_vidoomy":"-1","form_sublime":null,"part_sublime":"0","part_pubmatic":"0","form_vidoomy":null,"form_vidoomy_mobile":null,"tft_placement_id":"163359","tft_page_id":"149218","tft_placement_id_us":"180654","tft_page_id_us":"165884","form_gumgum":null,"part_gumgum":"0","zone_gumgum":null,"form_missena":null,"part_missena":"1","form_bliink":null,"part_bliink":"0"}};
            window._qevents = window._qevents || [];
            window.moneycaching=false;
            (function() {
            var elem = document.createElement('script');
            elem.src = "https://secure.quantserve.com/quant.js";
            elem.async = true;
            elem.type = "text/javascript";
            var scpt = document.getElementsByTagName('script')[0];
            scpt.parentNode.insertBefore(elem, scpt);
            })();

            window._qevents.push({
            qacct:"p-6Fv0cGNfc_bw8",
            labels:"Categories.artsandentertainment"
            });
            var website = (window.location != window.parent.location) ? document.referrer: document.location.href;
            params = {
            "cat":"artsandentertainment",
            "sscat":"Other"
            };
                                        (function(c,a,p,t,i,f,y){i=c.createElement(a);t=c.getElementsByTagName(a)[0];i.type='text/javascript';i.async=true;i.src=p;t.parentNode.insertBefore(i,t);})(document,'script','https://p.cpx.to/p/12763/px.js');
                                        var random = Math.floor(Math.random() * 10);
                if(random == 1){
                var pubstack = document.createElement("script");
                pubstack.setAttribute("type", "text/javascript");
                pubstack.setAttribute("src","https://boot.pbstck.com/v1/tag/0e87f530-61bd-4184-b030-95de65edaf34");
                pubstack.setAttribute("async", "true");
                var headelement = document.getElementsByTagName('head')[0];
                headelement.appendChild(pubstack);
                }
            

                            var notifyme = document.createElement("script");
                notifyme.setAttribute("type", "text/javascript");
                notifyme.setAttribute("src", "https://d2zur9cc2gf1tx.cloudfront.net/a96081b6-db78-48c4-9f82-b93e316fb1f7/notifyme.js");
                var headelement = document.getElementsByTagName('head')[0];
                headelement.appendChild(notifyme);

                                    
            // var ix_lib = document.createElement("script");
            // ix_lib.setAttribute("type", "text/javascript");
            // ix_lib.setAttribute("src","https://js-sec.indexww.com/ht/p/186329-261067657875242.js");
            // ix_lib.setAttribute("async", "true");
            // document.getElementsByTagName('head')[0].appendChild(ix_lib);
            
            window.nugg = 1;
            var tmzr = (typeof tmzr != "undefined")? tmzr : {} ;
            tmzr.que = tmzr.que || [];

            var d = document, pbs = d.createElement('script');
            pbs.setAttribute("type","text/javascript");

            var random_sw = Math.floor(Math.random() * 2);
                                                                        pbs.setAttribute("src","https://ads.themoneytizer.com/moneybid7_52/build/dist/prebid.js");
                                                                var checkInterval1 = setInterval(function() {
                            if (window.top.__tcfapi) {
                             clearInterval(checkInterval1);
                                window.top.__tcfapi('addEventListener', 2, function(tcData, success) {
                                if(success && (tcData.gdprApplies === false || isEmpty(tcData.vendor.consents) === false)) {

                                tcStringToSend = "";
                                if (tcData.tcString) {
                                    tcStringToSend = tcData.tcString;
                                }

                                !function(a9,a,p,s,t,A,g){if(a[a9])return;function q(c,r){a[a9]._Q.push
                                ([c,r])}a[a9]={init:function(){q("i",arguments)},fetchBids:function(){q
                                ("f",arguments)},setDisplayBids:function(){},targetingKeys:function()
                                {return[]},_Q:[]};A=p.createElement(s);A.async=!0;A.src=t;g=p.
                                getElementsByTagName(s)[0];g.parentNode.insertBefore(A,g)}("apstag",
                                window,document,"script","//c.amazon-adsystem.com/aax2/apstag.js");

                                apstag.init({
                                    pubID: 'a0dbece0-be46-4355-af6e-eaefdbf5391a',
                                    adServer: 'smartadserver',
                                    gdpr: {
                                        consent: tcStringToSend
                                    },
                                    bidTimeout: 2e3
                                });
                                }
                                });
                            }
                        }, 1000);
                                                pbs.setAttribute("async", "true");
            var headelement = document.getElementsByTagName('head')[0];
            headelement.insertBefore(pbs, headelement.firstChild);

                        var format_size = {"30":[[728,90],[320,100],[300,100]],"1":[[728,90]],"2":[[300,250],[300,168]],"3":[[300,600],[300,250]],"4":[[120,600]],"19":[[300,250],[300,168]],"20":[[160,600]],"26":[[300,250]],"28":[[728,90]],"15":[[250,300],[336,280],[320,50],[300,100],[320,480],[300,50],[320,100]],"31":[[970,250],[800,250],[950,250],[900,250],[970,90]],"35":[[160,600]],"11":[[640,320]]};
            var format_size_ix = {"30":[[728,90],[320,100]],"1":[728,90],"2":[300,250],"3":[300,600],"4":[120,600],"19":[300,250],"20":[160,600],"26":[300,250],"28":[728,90],"15":[300,100],"31":[970,250],"36":[728,90],"35":[160,600],"11":[640,480],"6":[728,90],"5":[1800,1000]};
            var format_w_adform = {"1":728,"2":300,"3":300,"4":120,"19":300,"20":160,"26":300,"28":728,"15":300,"31":970,"36":728,"35":160,"11":640,"6":728,"5":1800};
            var format_h_adform = {"1":90,"2":250,"3":600,"4":600,"19":250,"20":600,"26":250,"28":90,"15":100,"31":250,"36":90,"35":600,"11":480,"6":90,"5":1000};
            var format_size_rubicon = {"26322":"2","26300":"15","26323":"10,15","26324":"8","26711":"15","26706":"9","28108":"15","30012":"2","26755":"2,43,67,44,59,117,16","39287":"57","50677":"9","26325":"68"};
            var between_w = {"1":"728","2":"300","3":"300","4":"120","6":"728","31":"970","20":"160","19":"300","28":"728"};
            var between_h = {"1":"90","2":"250","3":"600","4":"600","6":"90","31":"250","20":"600","19":"250","28":"90"};
            function GetMobileDesktop() {
                if( navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)){
                    return "mobile";
                } else {
                    return "desktop";
                }
            }
            function GetMobileDesktopId(mobile, desktop) {
                if( navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)){
                    return mobile;
                } else {
                    return desktop;
                }
            }
            function GetRichAudienceZone(format,desktop,mobile){
            if(format == 1 || format == 28 || format == 6 || format == 31){
                if( navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)){
                    var ra_zone = mobile;
                } else {
                    var ra_zone = desktop;
                }
            }else{
            var ra_zone = desktop;
            }
            return ra_zone;
            }

            function GetmnameAdform(format,mname){
                if((format == 1 || format == 28 || format == 31 || format == 6) && (navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i))){
                    var name = "f"+mname+"m";
                }else{
                    var name = "f"+mname;
                }
                return name
            }
            function GetwAdform(format){
            if(format == 1 || format == 28){
            if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
            var my_sizes = 320;
            }else{
            var my_sizes = 728;
            }
            }else if(format == 31){
            if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
            var my_sizes = 300;
            }else{
            var my_sizes = 970;
            }
            }else if(format == 6){
            if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
            var my_sizes = 320;
            }else{
            var my_sizes = 728;
            }
            }else{
            var my_sizes = format_w_adform[format];
            }
            return my_sizes;
            }
            function GethAdform(format){
            if(format == 1 || format == 28){
            if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
            var my_sizes = 100;
            }else{
            var my_sizes = 90;
            }
            }else if(format == 31){
            if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
            var my_sizes = 250;
            }else{
            var my_sizes = 250;
            }
            }else if(format == 6){
            if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
            var my_sizes = 100;
            }else{
            var my_sizes = 90;
            }
            }else{
            var my_sizes = format_h_adform[format];
            }
            return my_sizes;
            }
            function GetsizeTriplelift(format,custom_footer){
                if(format == 6){
                    if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
                                            var my_sizes = [[1,1],[320,50],[300,50],[320,100],[300,100]];
                                        }else{
                        if(custom_footer == 1){
                                                    var my_sizes = [[1,1],[728,90],[728,250],[970,90],[1000,90],[1000,30],[990,90],[950,90]];
                                                }else{
                                                    var my_sizes = [[1,1],[728,90],[728,250],[970,90],[1000,90],[1000,30],[990,90],[950,90],[300,250]];
                                                }
                    }
                }
            return my_sizes;
            }
            function Getsize(format,custom_footer){
            var custom_footer = custom_footer || 0;
            if(format == 1 || format == 28){
            if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
                            var my_sizes = [[320,50],[300,50],[320,100],[300,100]];
                        }else{
                            var my_sizes = [[728,90],[320,50],[300,50],[320,100],[300,100]];
                        }
            }else if(format == 31){
            if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
            var my_sizes = [[300,250]];
            }else{
            var my_sizes = [[970, 250],[1000, 30],[1000, 90],[800, 250],[950, 250],[900, 250],[970, 90]];
            }
            } else if(format == 30){
            if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
            var my_sizes = [[320,100],[300,100]]
            //console.log('Mobile')
            }else{
            var my_sizes = [[728, 90], [320, 100], [300, 100]];
            //console.log('Not mobile');
            }
            } else if(format == 6){
            if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
                            var my_sizes = [[1,1],[320,50],[300,50],[320,100],[300,100]];
                        }else{
            if(custom_footer == 1){
                            var my_sizes = [[1,1],[728,90],[970,90],[1000,90],[1000,30],[990,90],[950,90]];
                        }else{
                            var my_sizes = [[1,1],[728,90],[970,90],[1000,90],[1000,30],[990,90],[950,90],[300,250]];
                        }
            }
            }else{
            var my_sizes = format_size[format];
            }
            return my_sizes;
            }
            function GetsizeRubicon(format){
            if(format == 26322 || format == 30012){
            if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
            var my_sizes = [43,67,44,59,117,16];
            return my_size
            }else{
            var my_sizes = [2,43,67,44,59,117,16];
            }
            }else if(format == 39287){
            if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
            var my_sizes = '15';
            }else{
            var my_sizes = [15,57,55,56,116,125];
            }
            }else{
            var my_sizes = format_size_rubicon[format];
            }
            return [my_size];
            }
            tmzr.que.push(function(){
            
                            tmzr.aliasBidder("criteo", "missenanative");
                const PUBLISHER_MISSENA_TOKEN = 'PA-72422485';
                const MISSENA_NATIVE_NETWORK_ID = '10593';
                const MISSENA_NATIVE_ZONE_ID = '1628646';
                const MISSENA_NATIVE_PUBLISHER_SUB_ID = 'PA-72422485:criteo-prebid-native';
            
            var videoAdUnit = [                    {
                    code: 'video',
                    ortb2Imp: {
                    ext: {
                    gpid: "/100026/elfqrin.com/" + GetMobileDesktop() + "/45111",
                    data: {
                    pbadslot: "/100026/elfqrin.com/" + GetMobileDesktop() + "/45111"
                    }
                    }
                    },
                    sizes: [
                    [300, 250],
                    [300, 50],
                    [355, 50],
                    [640, 480]
                    ],
                    mediaTypes: {
                    banner: {
                    sizes: [
                    [300, 250],
                    [300, 50],
                    [355, 50],
                    [640, 480]
                    ]
                    },
                                        },
                    bids: [
                    {bidder: 'moneytizer',
                    params:{
                    siteId:100026,
                    adId:11,
                    env: GetMobileDesktop()
                    }
                    },
                                                                                    {
                        bidder: "onetag",
                        params: {
                                                    pubId: "2a897e3f18e6769",
                                                ext: {
                        placement_name: '45111_100026'
                        }
                        }
                        },
                                                                                                        {
                        bidder: "smilewanted",
                        params: {
                                                    zoneId: "themoneytizer.com_header_bidding_display"
                                                }
                        },
                                                                                                                                                                    {
                        bidder: 'eplanning',
                        params: {
                        ci: "2a156",
                        ml: 1
                        }
                        },
                                                                                                                                                                                                            {bidder: 'adtelligent',
                        params: {
                        aid: 802516                        }
                        },
                                                                                    {
                        bidder: 'adyoulike',
                        params: {
                        placement: GetMobileDesktopId('', '0fbbb0ae876b363546f57ab00e82fcd3').toString()
                        }
                        },
                                                                               
                    ]},{
                    code: 'video',
                    ortb2Imp: {
                    ext: {
                    gpid: "/100026/elfqrin.com/" + GetMobileDesktop() + "/45111",
                    data: {
                    pbadslot: "/100026/elfqrin.com/" + GetMobileDesktop() + "/45111"
                    }
                    }
                    },
                    sizes: [
                    [300, 250],
                    [300, 50],
                    [355, 50],
                    [640, 480]
                    ],
                    mediaTypes: {
                        banner: {
                            sizes: [
                                [300, 250],
                                [300, 50],
                                [355, 50],
                                [640, 480]
                            ]
                        },
                    },
                    bids: [
                                            {
                        bidder: 'improvedigital',
                        params: {
                        publisherId: '1033',
                        placementId: '22856708'
                        }
                        },
                                                                                ]},
                                    ]
            var nativeAdUnit = []
            var cornerAdUnit = []
            var skinAdUnit = []

            var footerLiteAdUnit = []

            var footerAdUnit = [                    {
                    code: '26328',
                    ortb2Imp: {
                    ext: {
                    gpid: "/100026/elfqrin.com/" + GetMobileDesktop() + "/26328",
                    data: {
                    pbadslot: "/100026/elfqrin.com/" + GetMobileDesktop() + "/26328"
                    }
                    }
                    },
                    sizes:  Getsize('6','0'),
                    mediaTypes: {
                        banner: {
                            sizes:Getsize('6','0')
                        },
                                                native: {
                             title: {
                                 required: true,
                                 len: 50,
                            },
                             sponsoredBy: {
                                required: true,
                            },
                             image: {
                                 required: true,
                                 sendId: true,
                            },
                             icon: {
                                 required: false,
                                 sendId: true,
                            },
                             price: {
                                required: false,
                            },
                             privacyLink: {
                                 required: false,
                                 sendId: true,
                            },
                             clickUrl: {
                                 required: false,
                                 sendId: true,
                            },
                        },
                                            },
                    bids: [
                    {bidder: 'moneytizer',
                    params:{
                    siteId:100026,
                    adId:6,
                    env:GetMobileDesktop()
                    }
                    },
                                            {
                        bidder: "missena",
                        params: {
                        apiKey: 'PA-72422485',
                        },
                        },
                                                                                    {
                        bidder: "missenanative",
                            params: {
                                networkId: MISSENA_NATIVE_NETWORK_ID,
                                zoneId: MISSENA_NATIVE_ZONE_ID,
                                publisherSubId: MISSENA_NATIVE_PUBLISHER_SUB_ID,
                                nativeCallback: function (payload) {
                                    let script = document.createElement("script");
                                    script.src = "https://ad.missena.io/renderer.js?t=" + PUBLISHER_MISSENA_TOKEN;
                                    parent.document.getElementsByTagName("head")[0].append(script);
                                    setTimeout(function () {
                                        renderMissenaNativeAd(payload, tmzr, MISSENA_NATIVE_NETWORK_ID);
                                    }, 1000);
                                },
                            },
                        },
                                                                                    {
                        bidder: "rtbhouse",
                        params: {
                                                    region: 'prebid-us',
                                                channel: '100026',
                                                                            publisherId: 'ofNe4Md3yOLt0qckkfER',
                                                bidfloor: 0.01
                        }
                        },
                                                                                                        {bidder: 'criteo',
                        params:{
                        zoneId: GetMobileDesktopId(1630092, 1630096),
                        publisherSubId : '457423'
                        }
                        },
                                                                {bidder: 'criteo',
                        params:{
                        networkId: 3415,
                        publisherSubId : '457423'
                        }
                        },
                                                                                                                                                {
                        bidder: 'adyoulike',
                        params: {
                        placement: GetMobileDesktopId('d5b0e319ed5c88cb47b8abdb035846b8', '8b2bd071f3581407a9d2ee02ab81501e').toString()
                        }
                        },
                                                                                                        {
                        bidder: "smilewanted",
                        params: {
                                                    zoneId: "themoneytizer.com_header_bidding_display"
                                                }
                        },
                                                                                                                            {bidder: 'between',
                        params:{
                        w: 728,
                        h: 90,
                        s: 4699846,
                        cur: 'USD'
                        }
                        },
                                                                                                                            {
                        bidder: 'eplanning',
                        params: {
                        ci: "2a156",
                        ml: 1
                        }
                        },
                                                                                    {bidder: 'adagio',
                        params:{
                        organizationId: '1015',
                        site: '100026-elfqrin-com',
                        adUnitElementId: 'sas_26328',
                        placement: '6'
                        }
                        },
                                        
                                                                                    {
                        bidder: "onetag",
                        params: {
                                                    pubId: "2a897e3f18e6769",
                                                ext: {
                        placement_name: '26328_100026'
                        }
                        }
                        },
                                                                                
                                            {bidder: 'adtelligent',
                        params: {
                        aid: 802511                        }
                        },                                                                {
                        bidder: 'improvedigital',
                        params: {
                        publisherId: '1033',
                        placementId: '22856726'
                        }
                        },
                                                                                                                                            ]},
                                    ]
            isEmpty(nativeAdUnit)&&whenFormatFctDefined(window,"Adcall_48311")&&window.Adcall_48311(),isEmpty(skinAdUnit)&&whenFormatFctDefined(window,"Adcall_26325")&&window.Adcall_26325(),isEmpty(cornerAdUnit)&&whenFormatFctDefined(window,"Adcall_80234")&&window.Adcall_80234(),isEmpty(footerAdUnit)&&whenFormatFctDefined(window,"Adcall_26328")&&window.Adcall_26328(),isEmpty(videoAdUnit)&&whenFormatFctDefined(window,"Adcall_video")&&window.Adcall_video();

            window.pubstack_publica ={adServer : 'smart-rtb+',tags: [ window.pubstack_ab ]};

            window.bidder_geo = 0;

            var adUnits = [                    {
                    code: '39287',
                    ortb2Imp: {
                    ext: {
                    gpid: "/100026/elfqrin.com/" + GetMobileDesktop() + "/39287",
                    data: {
                    pbadslot: "/100026/elfqrin.com/" + GetMobileDesktop() + "/39287"
                    }
                    }
                    },
                    pubstack: window.pubstack_publica,
                    mediaTypes: {
                    banner: {
                    sizes: Getsize(31)
                    }
                    },
                    bids: [
                    {bidder: 'moneytizer',
                    params:{
                    siteId:100026,
                    adId:31,
                    country: window.bidder_geo,
                    env:GetMobileDesktop()
                    }
                    },
                                                                        {bidder: 'outbrain',
                            params: {
                            publisher: {
                            id: '0005ee2620838054ba93f71182884310a6',
                            domain: 'elfqrin.com'
                            },
                            tagid: '100026-31'
                            }
                            },
                                                                                                                                                                                                                                                                                                                            {bidder: 'adagio',
                            params:{
                            organizationId: '1015',
                            site: '100026-elfqrin-com',
                            adUnitElementId: 'sas_39287',
                            placement: '31'
                                                        }
                            },
                                                                                                                            {
                            bidder: 'improvedigital',
                            params: {
                            publisherId: '1033',
                            placementId: '22856720'
                            }
                            },
                                                                                                                            {bidder: 'between',
                            params:{
                            w: 970,
                            h: 250,
                            s: 4684686,
                            cur: 'USD'
                            }
                            },
                                                                                                    {
                            bidder: "smilewanted",
                            params: {
                                                            zoneId: "themoneytizer.com_header_bidding_display"
                                                        }
                            },
                                                                            {
                            bidder: "rtbhouse",
                            params: {
                                                            region: 'prebid-us',
                                                        channel: '100026',
                                                                                                publisherId: 'ofNe4Md3yOLt0qckkfER',
                                                            bidfloor: 0.01
                            }
                            },
                                                                                                
                            
                                                                                                                            {
                            bidder: 'eplanning',
                            params: {
                            ci: "2a156",
                            ml: 1
                            }
                            },
                                                                                                                                                    {
                            bidder: 'adyoulike',
                            params: {
                            placement: GetMobileDesktopId('672010fb29ea34cf8263150111839fb8', '71baf2ac13d535c7f2a239e601a406f6').toString()
                            }
                            },
                                                                                                                                               
                                                    {bidder: 'adtelligent',
                            params: {
                            aid: 802503                            }
                            },                                                                                                                            {
                            bidder: "onetag",
                            params: {
                                                            pubId: "2a897e3f18e6769",
                                                        ext: {
                            placement_name: '39287_100026'
                            }
                            }
                            },
                                                
                            {bidder: 'criteo',
                            params:{
                            zoneId: GetMobileDesktopId(1630105, 1630115),
                            publisherSubId : '457430'
                            }
                            },
                                                                            {bidder: 'criteo',
                            params:{
                            networkId: 3415,
                            publisherSubId : '457430'
                            }
                            },
                                                
                    
                    ]
                    },
                                                        {
                    code: '35757',
                    ortb2Imp: {
                    ext: {
                    gpid: "/100026/elfqrin.com/" + GetMobileDesktop() + "/35757",
                    data: {
                    pbadslot: "/100026/elfqrin.com/" + GetMobileDesktop() + "/35757"
                    }
                    }
                    },
                    pubstack: window.pubstack_publica,
                    mediaTypes: {
                    banner: {
                    sizes: Getsize(30)
                    }
                    },
                    bids: [
                    {bidder: 'moneytizer',
                    params:{
                    siteId:100026,
                    adId:30,
                    country: window.bidder_geo,
                    env:GetMobileDesktop()
                    }
                    },
                                            // Bidders InImage?>
                                                    {bidder: 'adtelligent',
                            params: {
                            aid: 802517                            }
                            },                                                                                                                                                                                                    {
                            bidder: "smilewanted",
                            params: {
                                                            zoneId: "themoneytizer.com_header_bidding_display"
                                                        }
                            },
                                                                                                    {bidder: 'adagio',
                            params:{
                            organizationId: '1015',
                            site: '100026-elfqrin-com',
                            adUnitElementId: 'sas_35757',
                            placement: '30'
                            }
                            },
                                                                            {
                            bidder: 'eplanning',
                            params: {
                            ci: "2a156",
                            ml: 1
                            }
                            },
                                                                                                                                                    {
                            bidder: "onetag",
                            params: {
                                                            pubId: "2a897e3f18e6769",
                                                        ext: {
                            placement_name: '35757_100026'
                            }
                            }
                            },
                                                                                                    {bidder: 'criteo',
                            params:{
                            networkId: 3415,
                            publisherSubId : '457429'
                            }
                            },
                        
                        
                        
                    
                    ]
                    },
                                                        {
                    code: '26322',
                    ortb2Imp: {
                    ext: {
                    gpid: "/100026/elfqrin.com/" + GetMobileDesktop() + "/26322",
                    data: {
                    pbadslot: "/100026/elfqrin.com/" + GetMobileDesktop() + "/26322"
                    }
                    }
                    },
                    pubstack: window.pubstack_publica,
                    mediaTypes: {
                    banner: {
                    sizes: Getsize(1)
                    }
                    },
                    bids: [
                    {bidder: 'moneytizer',
                    params:{
                    siteId:100026,
                    adId:1,
                    country: window.bidder_geo,
                    env:GetMobileDesktop()
                    }
                    },
                                                                        {bidder: 'outbrain',
                            params: {
                            publisher: {
                            id: '0005ee2620838054ba93f71182884310a6',
                            domain: 'elfqrin.com'
                            },
                            tagid: '100026-1'
                            }
                            },
                                                                                                                                                                                                                                                                                                                            {bidder: 'adagio',
                            params:{
                            organizationId: '1015',
                            site: '100026-elfqrin-com',
                            adUnitElementId: 'sas_26322',
                            placement: '1'
                                                        }
                            },
                                                                                                                            {
                            bidder: 'improvedigital',
                            params: {
                            publisherId: '1033',
                            placementId: '22856723'
                            }
                            },
                                                                                                                            {bidder: 'between',
                            params:{
                            w: 728,
                            h: 90,
                            s: 4660208,
                            cur: 'USD'
                            }
                            },
                                                                                                    {
                            bidder: "smilewanted",
                            params: {
                                                            zoneId: "themoneytizer.com_header_bidding_display"
                                                        }
                            },
                                                                            {
                            bidder: "rtbhouse",
                            params: {
                                                            region: 'prebid-us',
                                                        channel: '100026',
                                                                                                publisherId: 'ofNe4Md3yOLt0qckkfER',
                                                            bidfloor: 0.01
                            }
                            },
                                                                                                
                            
                                                                                                                            {
                            bidder: 'eplanning',
                            params: {
                            ci: "2a156",
                            ml: 1
                            }
                            },
                                                                                                                                                    {
                            bidder: 'adyoulike',
                            params: {
                            placement: GetMobileDesktopId('9805d9a515b3bfe5f618cd0cea9d6615', '8b0ab0c233182188355bf921aec06adb').toString()
                            }
                            },
                                                                                                                                               
                                                    {bidder: 'adtelligent',
                            params: {
                            aid: 802503                            }
                            },                                                                                                                            {
                            bidder: "onetag",
                            params: {
                                                            pubId: "2a897e3f18e6769",
                                                        ext: {
                            placement_name: '26322_100026'
                            }
                            }
                            },
                                                
                            {bidder: 'criteo',
                            params:{
                            zoneId: GetMobileDesktopId(1630076, 1630082),
                            publisherSubId : '457419'
                            }
                            },
                                                                            {bidder: 'criteo',
                            params:{
                            networkId: 3415,
                            publisherSubId : '457419'
                            }
                            },
                                                
                    
                    ]
                    },
                                                        {
                    code: '30012',
                    ortb2Imp: {
                    ext: {
                    gpid: "/100026/elfqrin.com/" + GetMobileDesktop() + "/30012",
                    data: {
                    pbadslot: "/100026/elfqrin.com/" + GetMobileDesktop() + "/30012"
                    }
                    }
                    },
                    pubstack: window.pubstack_publica,
                    mediaTypes: {
                    banner: {
                    sizes: Getsize(28)
                    }
                    },
                    bids: [
                    {bidder: 'moneytizer',
                    params:{
                    siteId:100026,
                    adId:28,
                    country: window.bidder_geo,
                    env:GetMobileDesktop()
                    }
                    },
                                                                        {bidder: 'outbrain',
                            params: {
                            publisher: {
                            id: '0005ee2620838054ba93f71182884310a6',
                            domain: 'elfqrin.com'
                            },
                            tagid: '100026-28'
                            }
                            },
                                                                                                                                                                                                                                                                                                                            {bidder: 'adagio',
                            params:{
                            organizationId: '1015',
                            site: '100026-elfqrin-com',
                            adUnitElementId: 'sas_30012',
                            placement: '28'
                                                        }
                            },
                                                                                                                            {
                            bidder: 'improvedigital',
                            params: {
                            publisherId: '1033',
                            placementId: '22856722'
                            }
                            },
                                                                                                                            {bidder: 'between',
                            params:{
                            w: 728,
                            h: 90,
                            s: 4675366,
                            cur: 'USD'
                            }
                            },
                                                                                                    {
                            bidder: "smilewanted",
                            params: {
                                                            zoneId: "themoneytizer.com_header_bidding_display"
                                                        }
                            },
                                                                            {
                            bidder: "rtbhouse",
                            params: {
                                                            region: 'prebid-us',
                                                        channel: '100026',
                                                                                                publisherId: 'ofNe4Md3yOLt0qckkfER',
                                                            bidfloor: 0.01
                            }
                            },
                                                                                                
                            
                                                                                                                            {
                            bidder: 'eplanning',
                            params: {
                            ci: "2a156",
                            ml: 1
                            }
                            },
                                                                                                                                                    {
                            bidder: 'adyoulike',
                            params: {
                            placement: GetMobileDesktopId('6690b94d6b273a94d471e01caeae9c8c', '88a44940affe2c7d8d1da252693d12c2').toString()
                            }
                            },
                                                                                                                                               
                                                    {bidder: 'adtelligent',
                            params: {
                            aid: 802504                            }
                            },                                                                                                                            {
                            bidder: "onetag",
                            params: {
                                                            pubId: "2a897e3f18e6769",
                                                        ext: {
                            placement_name: '30012_100026'
                            }
                            }
                            },
                                                
                            {bidder: 'criteo',
                            params:{
                            zoneId: GetMobileDesktopId(1630078, 1630081),
                            publisherSubId : '457428'
                            }
                            },
                                                                            {bidder: 'criteo',
                            params:{
                            networkId: 3415,
                            publisherSubId : '457428'
                            }
                            },
                                                
                    
                    ]
                    },
                                                        {
                    code: '26706',
                    ortb2Imp: {
                    ext: {
                    gpid: "/100026/elfqrin.com/" + GetMobileDesktop() + "/26706",
                    data: {
                    pbadslot: "/100026/elfqrin.com/" + GetMobileDesktop() + "/26706"
                    }
                    }
                    },
                    pubstack: window.pubstack_publica,
                    mediaTypes: {
                    banner: {
                    sizes: Getsize(20)
                    }
                    },
                    bids: [
                    {bidder: 'moneytizer',
                    params:{
                    siteId:100026,
                    adId:20,
                    country: window.bidder_geo,
                    env:GetMobileDesktop()
                    }
                    },
                                                                        {bidder: 'outbrain',
                            params: {
                            publisher: {
                            id: '0005ee2620838054ba93f71182884310a6',
                            domain: 'elfqrin.com'
                            },
                            tagid: '100026-20'
                            }
                            },
                                                                                                                                                                                                                                                                                                                            {bidder: 'adagio',
                            params:{
                            organizationId: '1015',
                            site: '100026-elfqrin-com',
                            adUnitElementId: 'sas_26706',
                            placement: '20'
                                                        }
                            },
                                                                                                                            {
                            bidder: 'improvedigital',
                            params: {
                            publisherId: '1033',
                            placementId: '22856724'
                            }
                            },
                                                                                                                            {bidder: 'between',
                            params:{
                            w: 160,
                            h: 600,
                            s: 4671375,
                            cur: 'USD'
                            }
                            },
                                                                                                    {
                            bidder: "smilewanted",
                            params: {
                                                            zoneId: "themoneytizer.com_header_bidding_display"
                                                        }
                            },
                                                                            {
                            bidder: "rtbhouse",
                            params: {
                                                            region: 'prebid-us',
                                                        channel: '100026',
                                                                                                publisherId: 'ofNe4Md3yOLt0qckkfER',
                                                            bidfloor: 0.01
                            }
                            },
                                                                                                
                            
                                                                                                                            {
                            bidder: 'eplanning',
                            params: {
                            ci: "2a156",
                            ml: 1
                            }
                            },
                                                                                                                                                    {
                            bidder: 'adyoulike',
                            params: {
                            placement: GetMobileDesktopId('', '6a64947068f3fe365ac1a55cd96a3493').toString()
                            }
                            },
                                                                                                                                               
                                                    {bidder: 'adtelligent',
                            params: {
                            aid: 802503                            }
                            },                                                                                                                            {
                            bidder: "onetag",
                            params: {
                                                            pubId: "2a897e3f18e6769",
                                                        ext: {
                            placement_name: '26706_100026'
                            }
                            }
                            },
                                                
                            {bidder: 'criteo',
                            params:{
                            zoneId: GetMobileDesktopId('', 1630086),
                            publisherSubId : '457426'
                            }
                            },
                                                                            {bidder: 'criteo',
                            params:{
                            networkId: 3415,
                            publisherSubId : '457426'
                            }
                            },
                                                
                    
                    ]
                    },
                                                        {
                    code: '26300',
                    ortb2Imp: {
                    ext: {
                    gpid: "/100026/elfqrin.com/" + GetMobileDesktop() + "/26300",
                    data: {
                    pbadslot: "/100026/elfqrin.com/" + GetMobileDesktop() + "/26300"
                    }
                    }
                    },
                    pubstack: window.pubstack_publica,
                    mediaTypes: {
                    banner: {
                    sizes: Getsize(2)
                    }
                    },
                    bids: [
                    {bidder: 'moneytizer',
                    params:{
                    siteId:100026,
                    adId:2,
                    country: window.bidder_geo,
                    env:GetMobileDesktop()
                    }
                    },
                                                                        {bidder: 'outbrain',
                            params: {
                            publisher: {
                            id: '0005ee2620838054ba93f71182884310a6',
                            domain: 'elfqrin.com'
                            },
                            tagid: '100026-2'
                            }
                            },
                                                                                                                                                                                                                                                                                                                            {bidder: 'adagio',
                            params:{
                            organizationId: '1015',
                            site: '100026-elfqrin-com',
                            adUnitElementId: 'sas_26300',
                            placement: '2'
                                                        }
                            },
                                                                                                                            {
                            bidder: 'improvedigital',
                            params: {
                            publisherId: '1033',
                            placementId: '22858033'
                            }
                            },
                                                                                                                            {bidder: 'between',
                            params:{
                            w: 300,
                            h: 250,
                            s: 4661541,
                            cur: 'USD'
                            }
                            },
                                                                                                    {
                            bidder: "smilewanted",
                            params: {
                                                            zoneId: "themoneytizer.com_header_bidding_display"
                                                        }
                            },
                                                                            {
                            bidder: "rtbhouse",
                            params: {
                                                            region: 'prebid-us',
                                                        channel: '100026',
                                                                                                publisherId: 'ofNe4Md3yOLt0qckkfER',
                                                            bidfloor: 0.01
                            }
                            },
                                                                                                
                            
                                                                                                                            {
                            bidder: 'eplanning',
                            params: {
                            ci: "2a156",
                            ml: 1
                            }
                            },
                                                                                                                                                    {
                            bidder: 'adyoulike',
                            params: {
                            placement: GetMobileDesktopId('', 'd0ee9bca93ec443763d034457d4b33f4').toString()
                            }
                            },
                                                                                                                                               
                                                    {bidder: 'adtelligent',
                            params: {
                            aid: 802503                            }
                            },                                                                                                                            {
                            bidder: "onetag",
                            params: {
                                                            pubId: "2a897e3f18e6769",
                                                        ext: {
                            placement_name: '26300_100026'
                            }
                            }
                            },
                                                
                            {bidder: 'criteo',
                            params:{
                            zoneId: GetMobileDesktopId('', 1630103),
                            publisherSubId : '457420'
                            }
                            },
                                                                            {bidder: 'criteo',
                            params:{
                            networkId: 3415,
                            publisherSubId : '457420'
                            }
                            },
                                                
                    
                    ]
                    },
                                    ];

            tmzr.addAdUnits(videoAdUnit);
            tmzr.addAdUnits(nativeAdUnit);
            tmzr.addAdUnits(cornerAdUnit);
            tmzr.addAdUnits(skinAdUnit);
            tmzr.addAdUnits(footerAdUnit);
            tmzr.addAdUnits(footerLiteAdUnit);
            tmzr.addAdUnits(adUnits);

                        if( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)){
            for (var i = 0; i < tmzr.adUnits.length; i++) {
            for(var j = tmzr.adUnits[i].bids.length -1; j >= 0 ; j--){
            if (tmzr.adUnits[i].bids[j].bidder == "richaudience" && tmzr.adUnits[i].code == "26325") {
            tmzr.adUnits[i].bids.splice(j, 1);
            }
            }
            }
            }
                            tmzr.enableAnalytics([{provider: 'adagio'},
                                ]);
            
            function customSmart(adUnit,segments,data, bid) {
            var target = [];
            if (typeof(segments) == 'object' && segments.length > 0) {
            segments.forEach(function(entry) {
            if (target.indexOf('sd_rtd=' + entry) === -1) {
            target.push('sd_rtd=' + entry);
            }
            });
            if (target.length > 0) {
            window.Smart_SR_data = target.join(';');
            }
            }
            }

            tmzr.setConfig({useBidCache: true,
            auctionOptions: {
                secondaryBidders: ['richaudience']
            },
            ortb2:{
            site:{
            name:'elfqrin.com'
            }
            },
            realTimeData: {
            auctionDelay: 1000,
            dataProviders: [{
            name: "SirdataRTDModule",
            waitForIt: true,
            params: {
            partnerId: 29567,
            key: 50,
            setGptKeyValues: false,
            contextualMinRelevancyScore: 50, //Min score to filter contextual category globally (0-100 scale)
            actualUrl: top.location.href, //top location url, for contextual categories
            bidders: [{
            bidder: 'ix'
            },{
            bidder: 'smartadserver'
            },{
            bidder: 'criteo'
            },{
            bidder: 'rubicon'
            },{
            bidder: 'appnexus',
            curationId: '27440',
            customFunction: customSmart
            }]
            }
            }]
            },
                            outbrain: {
                bidderUrl: 'https://b1h.zemanta.com/api/bidder/prebid/bid/',
                usersyncUrl: 'https://b1h.zemanta.com/usersync/prebid'
                },
                userSync: {
                aliasSyncEnabled: true
                },
                                    "schain": {
            "validation": "off",
            "config": {
            "ver":"1.0",
            "complete": 1,
            "nodes": [
            {
            "asi":"themoneytizer.com",
            "sid":"92945",
            "hp":1
            }
                        ]
            }
            },
            rubicon: {singleRequest: true},
            improvedigital: {singleRequest: true,usePrebidSizes:true},
            userSync: {
            aliasSyncEnabled: true,
            auctionDelay :30,
            filterSettings: {
            iframe: {
            bidders: '*',
            filter: 'include'
            },
            image: {
            bidders: '*',
            filter: 'include'
            }
            },
            userIds: [{
            name: "criteo"
            },
            {
            name: "quantcastId",
            },
            {
            name: "adriverId",
            },
            {
            name: "id5Id",
            params: {
            partner: 12
            },
            storage: {
            type: "html5",
            name: "id5id",
            expires: 45
            }
            },{
            name: "sharedId",
            params: {
            syncTime: 60
            },
            storage: {
            name: "sharedid",
            type: "cookie",
            expires: 90
            },
            }],syncsPerBidder: 50,syncDelay: 3000},enableSendAllBids: false, timeoutBuffer: 400 ,pubcid: {enable: true},disableAjaxTimeout: true, maxRequestsPerOrigin: 1,consentManagement: {
            gdpr: {
            cmpApi: 'iab',
            rules: [{
            purpose: 'basicAds',
            enforcePurpose: false,
            enforceVendor: true,
            vendorExceptions: ['gingerad']
            }],
            timeout: 20000,
            allowAuctionWithoutConsent: true
            }
            }});
            tmzr.aliasBidder('teads', 'teads_video');
            tmzr.aliasBidder('teads', 'teads_display');
            tmzr.aliasBidder('teads', 'teads_display2');
            tmzr.aliasBidder('appnexus', 'gingerad');
            tmzr.aliasBidder('rubicon', 'bluerooster_magnite');
            tmzr.bidderSettings = {
            moneytizer: {
            allowZeroCpmBids: true,
            },
            gingerad: {
            bidCpmAdjustment: function(bidCpm, bid){ return bidCpm * 0.4;
            },
            },
            missena: {
            bidCpmAdjustment: function(bidCpm, bid){ return bidCpm * 1.1222 * 0.62;
            },
            },
            missenanative: {
            bidCpmAdjustment: function(bidCpm, bid){ return bidCpm * 1.1222 * 0.5;
            },
            },
            onetag: {
            bidCpmAdjustment : function(bidCpm){
            return bidCpm * 1.1222*.85;
            },
            },
            eplanning: {
            storageAllowed: true
            },
            gingerad: {
            storageAllowed: true
            },
            adagio: {
            storageAllowed: true
            },
            otm: {
            bidCpmAdjustment : function(bidCpm){
            return bidCpm * .8 * 0.010902;
            },
            },
            adriver: {
            bidCpmAdjustment : function(bidCpm){
            return bidCpm * 0.010902;
            },
            },
            oftmedia: {
            bidCpmAdjustment : function(bidCpm){
            return bidCpm * .8;
            },
            },
            richaudience: {
            bidCpmAdjustment : function(bidCpm){
            return bidCpm * .9;
            },
            },
            blueroostermedia: {
            bidCpmAdjustment : function(bidCpm){
            return bidCpm * .7;
            },
            },
            adtelligent: {
            bidCpmAdjustment : function(bidCpm){
            return bidCpm * .9;
            },
            },
            teads: {
            bidCpmAdjustment : function(bidCpm){
            return bidCpm * .9;
            },
            },

            blueroostermedia_old: {
            bidCpmAdjustment : function(bidCpm){
            return bidCpm * .7;
            },
            },
            bluerooster_magnite: {
            bidCpmAdjustment : function(bidCpm){
            return bidCpm * .7;
            },
            },
            adform: {
            bidCpmAdjustment : function(bidCpm){
            return bidCpm * .88;
            },
            },
            criteo: {
            bidCpmAdjustment : function(bidCpm){
            return bidCpm * 1.1222;
            },
            },
            teads_display: {
            bidCpmAdjustment : function(bidCpm){
            return bidCpm * 1.1222*.83;
            },
            },
            teads_video: {
            bidCpmAdjustment : function(bidCpm){
            return bidCpm * 1.1222*.83;
            },
            },
            teads_display2: {
            bidCpmAdjustment : function(bidCpm){
            return bidCpm * 1.1222*.83;
            },
            },
            roix: {
            bidCpmAdjustment : function(bidCpm){
            return bidCpm * .6;
            },
            },
            standard: {
            adserverTargeting: [{
            key: "hb_bidder",
            val: function(bidResponse) {
            if(bidResponse.bidderCode=="rubiconLite"){
            return "rubicon";
            }else if(bidResponse.bidderCode=="stickyadstv"){
            return "stickyads";
            }else{
            return bidResponse.bidderCode;
            }
            }
            }, {
            key: "hb_adid",
            val: function(bidResponse) {
            return bidResponse.adId;
            }
            },{
            key: "hb_height",
            val: function(bidResponse) {
            return bidResponse.height;
            }
            },
            {
            key: "hb_bid",
            val: function(bidResponse) {
            var cpm = bidResponse.cpm*1.22/1.1222;
            if(bidResponse.adUnitCode == "video" || bidResponse.adUnitCode == "26328" || bidResponse.adUnitCode =="26325" || bidResponse.adUnitCode == "48311"){

            if (cpm < 0.02) {
            return '0.01';
            }else if (cpm < 0.03) {
            return '0.02';
            }else if (cpm < 0.10) {
            return (Math.floor(cpm * 50) / 50).toFixed(2);
            } else if (cpm < 5.00) {
            return (Math.floor(cpm * 20) / 20).toFixed(2);
            } else if (cpm < 40.00) {
            return (Math.floor(cpm * 2) / 2).toFixed(2);
            } else {
            return '40.00';
            }
            }else{
            return cpm;
            }
            }
            }]
            }
            };

                        tmzr.requestBids({
            timeout: 3000,
            bidsBackHandler: function(bidResponses) {
            bid = tmzr.getHighestCpmBids('video')[0];
            window.vastUrl = bid && bid.vastUrl;
            window.targetingParams = tmzr.getAdserverTargeting();
            for (var property in window.targetingParams) {
            if (window.targetingParams.hasOwnProperty(property)) {
            whenFormatFctDefined(window, 'Adcall_'+property);
            }
            }

            }
            });
            });
            var counter_refresh = [];
            function Timeout(fn, interval) {
            var id = setTimeout(fn, interval);
            this.cleared = false;
            this.clear = function () {
            this.cleared = true;
            clearTimeout(id);
            };
            }
            var smart_prebid2 = {"26322":"55794","26300":"55789","26323":"55792","26324":"55798","26711":"55790","26706":"55795","30012":"55793","39287":"55791","50677":"55796","28108":"55797"};
            tmzr.getTrueHighestCpmBids = function(formatid) {
            var adid = tmzr.getAdserverTargeting(formatid)[formatid].hb_adid;
            var getBidResponsesForAdUnitCode = tmzr.getBidResponsesForAdUnitCode(formatid).bids;
            for(bid in getBidResponsesForAdUnitCode){
            if(getBidResponsesForAdUnitCode[bid].adId == adid) return [getBidResponsesForAdUnitCode[bid]];
            }
            return false;
            }
                            function refreshSlot(formatid,capping,viewability) {
                function checkBidderByName(arrayofbids,name){
                for(var i=0,l=arrayofbids.length;i<l;i++)
                if(arrayofbids[i].bidder == name)
                return arrayofbids[i];
                return null;
                }
                var arr_width = {26322:728,26300:300,26323:300,26324:120,26711:300,26706:160,28108:300,30012:728,39287:970,35:50677,51410:728,28108:300};
                var arr_height = {26322:90,26300:250,26323:600,26324:600,26711:250,26706:600,28108:150,30012:90,39287:250,35:50677,51410:90,28108:250};
                var strformatid = formatid.toString();
                if(counter_refresh[formatid] == null ){
                counter_refresh[formatid] = 0;
                }else{
                counter_refresh[formatid] = counter_refresh[formatid]+1;
                }
                if(counter_refresh[formatid] < capping){
                if(formatid==26300 || formatid==26711){
                document.getElementById("sas_"+formatid).style.width = "300px";
                document.getElementById("sas_"+formatid).style.height = "250px";
                document.getElementById("sas_"+formatid).style.margin = "auto";
                }
                if(formatid==26324){
                document.getElementById("sas_"+formatid).style.width = "120px";
                document.getElementById("sas_"+formatid).style.height = "600px";
                document.getElementById("sas_"+formatid).style.margin = "auto";
                }
                if((formatid==26322 || formatid==30012) && ( navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i))){
                document.getElementById("sas_"+formatid).style.width = "728px";
                document.getElementById("sas_"+formatid).style.height = "90px";
                document.getElementById("sas_"+formatid).style.margin = "auto";
                }
                if((formatid==26322 || formatid==30012) && ( navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i))){
                document.getElementById("sas_"+formatid).style.width = "320px";
                document.getElementById("sas_"+formatid).style.height = "100px";
                document.getElementById("sas_"+formatid).style.margin = "auto";
                }
                if(formatid==26328){
                    if(window.top.document.getElementById("sas_iframe_fixed_26328-1")){
                        window.top.document.getElementById("sas_iframe_fixed_26328-1").remove();
                    }
                    if(window.top.document.getElementById("sas_iframe_fixed_26328")){
                        window.top.document.getElementById("sas_iframe_fixed_26328").remove();
                    }
                    if(window.top.document.getElementById("sas_26328")){
                        window.top.document.getElementById("sas_26328").innerHtml = "";
                        window.top.document.getElementById("sas_26328").style = "display: none";
                    }
                }
                document.getElementById("sas_"+formatid).innerHTML = "";
                tmzr.que.push(function() {

                if( navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)){
                for (var i = 0; i < tmzr.adUnits.length; i++) {
                for(var j = tmzr.adUnits[i].bids.length -1; j >= 0 ; j--){
                if (tmzr.adUnits[i].bids[j].bidder == "richaudience" && tmzr.adUnits[i].code == "26325") {
                tmzr.adUnits[i].bids.splice(j, 1);
                }
                }
                }
                }
                                                            if(formatid == 26322 || formatid == 26300 || formatid == 26323 || formatid == 26324 || formatid == 26328 || formatid == 26711 || formatid == 26706 || formatid == 30012 || formatid == 39287 || formatid == 50677 || formatid == 116434) {
                            array_format = {
                            26322: 1,
                            26300: 2,
                            26323: 3,
                            26324: 4,
                            26328: 6,
                            26711: 19,
                            26706: 20,
                            30012: 28,
                            39287: 31,
                            50677: 35,
                            116434: 44
                            };
                            delete window.adsAmzn26328.amznBid;
                            apstag.fetchBids({
                                slots: [{
                                    slotID: 'sas_' + formatid,
                                    slotName: '1097/539356/1667595/sas_' + formatid,
                                    sizes: Getsize(array_format[formatid])
                                }],
                                timeout: 2e3
                            }, function(bids) {
                                if (!bids || !bids.length) {
                                    sas.setTargeting({
                                            target: {
                                                ['amznbid_'+formatid]: [],
                                                ['amzniid_'+formatid]: [],
                                                ['amznp_'+formatid]: [],
                                                ['refreshamzn']:[1],
                                            },
                                            mode: 1,
                                            tagIds: ""
                                        });
                                } else {
                                    apstag.targetingKeys();
                                    bids.forEach(bid => {
                                        sas.setTargeting({
                                            target: {
                                                ['amznbid_'+formatid]: [bid.amznbid],
                                                ['amzniid_'+formatid]: [bid.amzniid],
                                                ['amznp_'+formatid]: [bid.amznp],
                                                ['refreshamzn']:[1],
                                            },
                                            mode: 1,
                                            tagIds: [bid.slotID]
                                        });
                                        if(formatid==26328){
                                            window.adsAmzn26328.amznBid = bid;
                                        }
                                    });
                                    sas.render();
                                }
                            });
                        }
                                    tmzr.requestBids({
                adUnitCodes:[strformatid],
                bidsBackHandler: function() {

                                    sas.clean(formatid);
                    sas.clean(strformatid);
                    document.getElementById("sas_"+formatid).innerHTML = "";
                    if (document.getElementById('sas_intextContainer_10575040') !=null)
                    document.getElementById("sas_intextContainer_10575040").innerHTML = "";
                    if (document.getElementById('sas_intextContainer_10501870') !=null)
                    document.getElementById("sas_intextContainer_10501870").innerHTML = "";
                    var parentsas = window.parent.document.getElementById('sas_'+formatid) || window.top.document.getElementById('sas_'+formatid);

                    if(parentsas){
                    parentsas.innerHTML = "";
                    }
                
                window.targetingParams = tmzr.getAdserverTargeting();
                sas.cmd.push(function() {
                tmzr.que.push(function() {
                bid = tmzr.getTrueHighestCpmBids(strformatid)[0];
                if (bid) {
                var hb_adid = window.targetingParams[strformatid].hb_adid;
                var sasBid = JSON.parse(JSON.stringify(bid));
                sasBid.cpm = window.targetingParams[strformatid].hb_bid;
                //console.log(window.targetingParams[strformatid]);
                bid.currency = bid.currency || "USD";
                }else{
                var sasBid = {};
                }
                sas.setHeaderBiddingWinner("sas_"+strformatid, sasBid);
                sas.render();

                });
                });
                if(window.targetingParams && !isEmpty(window.targetingParams[formatid]) && window.tm_getpublica == 1){
                var http = new XMLHttpRequest();
                var url = 'https://c.tmyzer.com/c/?s=100026&f='+tagsObject[formatid]['ad_id']+'&fi=2';
                http.open("GET", url, true);
                http.send();
                }
                window.targetingParams = window.targetingParams || [];
                sas.cmd.push(function() {
                sas.setEids(tmzr.getUserIdsAsEids());
                });
                if(typeof Smart_SR_data === 'undefined'){
                Smart_SR_data ="";
                }
                sas.cmd.push(function() {
                sas.call("std", {
                tagId: 'sas_'+formatid,
                siteId: 539356,
                pageId: 1667595,
                formatId: formatid,
                target:Smart_SR_data,
                timeout: 3000,
                schain:  "1.0,1!themoneytizer.com,92945,1,elfqrin.com,elfqrin.com"},
                {
                networkId: 1097, domain: "https://ww1097.smartadserver.com",onNoad: function() {
                window.targetingParams = tmzr.getAdserverTargeting();
                if (bid && bid.bidder == "improvedigital" && bid.mediaType == "video") {
                var arr_width_video ={26300:300,26711:300,26323:300,39287:444,45111:640};
                var creatediv = document.createElement("div");
                creatediv.id = formatid;
                creatediv.setAttribute("style","width:"+arr_width_video[formatid]+"px;margin:auto;");
                document.getElementById("sas_"+formatid).appendChild(creatediv);
                var iframeDoc = document;
                } else if(bid && bid.adUnitCode == 26328) {
                    args = {
                    func: tmzr.renderAd,
                        hb_adid: window.targetingParams[formatid].hb_adid,
                        height: bid.height,
                        width: bid.width,
                        bidder: bid.bidder,
                        cornerAvailable: false,footerPositionTop: false,                    }
                    window.whatToLoad(6, args);
                    /** Add watermark **/
                    let argsWatermark = {
                        watermark: true,
                        iframeDoc: null,
                        id: bid.adUnitCode,
                        bidder: bid.bidder
                    }
                    whatToLoad(-1, argsWatermark);
                }else if(bid && bid.adUnitCode == 116434) {
                    args = {
                    func: tmzr.renderAd,
                    hb_adid: window.targetingParams[formatid].hb_adid,
                    height: bid.height,
                    width: bid.width,
                    }
                    window.whatToLoad(44, args);
                    /** Add watermark **/
                    let argsWatermark = {
                        watermark: true,
                        iframeDoc: null,
                        id: bid.adUnitCode,
                        bidder: bid.bidder
                    }
                    whatToLoad(-1, argsWatermark);
                } else{
                var myiframe = document.createElement("iframe");
                myiframe.frameBorder=0;
                myiframe.width=arr_width[formatid]+"px";
                myiframe.height=arr_height[formatid]+"px";
                if(formatid==26328){
                    myiframe.width="0px";
                    myiframe.height="0px";
                    if(document.getElementById("sas_26328")){
                        document.getElementById("sas_26328").style = "display: none";
                    }
                }
                myiframe.id="sas_iframe_"+formatid;
                myiframe.setAttribute("scrolling", "no");
                myiframe.setAttribute("marginheight", 0);
                myiframe.setAttribute("marginwidth", 0);
                myiframe.setAttribute("topmargin", 0);
                myiframe.setAttribute("leftmargin", 0);
                myiframe.setAttribute("allowtransparency", true);
                document.getElementById("sas_"+formatid).appendChild(myiframe);
                var iframeDoc = myiframe.contentWindow.document;
                }
                var hb_adid = window.targetingParams[formatid].hb_adid;
                if (bid && bid.mediaType != "native") {
                if(bid.adUnitCode == 35757){
                    if(document.getElementById('tmzr-middle-layer') == null) {
                    window.tmzInimageSetup(hb_adid);
                    } else {
                    //console.log('refresh inimage');
                    //console.log(hb_adid);
                    if(tmzr.getHighestCpmBids('35757')&&tmzr.getHighestCpmBids('35757')[0]&&tmzr.getHighestCpmBids('35757')[0].width<=window.inImageTmzr.lastBid.width&&tmzr.getHighestCpmBids('35757')[0].height<=window.inImageTmzr.lastBid.height){
                    document.getElementById('tmzr-middle-layer').style.display = 'flex';
                    var closeInImage = document.createElement('div');
                    closeInImage.id = 'tmzr-in-image-close';
                    closeInImage.style.backgroundColor = 'rgba(0,0,0,0.6)';
                    closeInImage.style.width = '30px';
                    closeInImage.style.height = '30px';
                    closeInImage.style.borderRadius = '100%';
                    closeInImage.style.display = 'flex';
                    closeInImage.style.justifyContent = 'center';
                    closeInImage.style.alignItems = 'center';
                    closeInImage.style.position = 'absolute';
                    closeInImage.style.top = '-15px';
                    closeInImage.style.right = '-15px';
                    closeInImage.style.cursor = 'pointer';
                    closeInImage.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
                    iframe.append(closeInImage);
                    document.getElementById('tmzr-in-image-close').addEventListener("click", function(){
                    document.getElementById("tmzr-middle-layer").style.display = "none";
                    });
                    window.inImageTmzr.lastBid.height = tmzr.getHighestCpmBids('35757')[0].height;
                    window.inImageTmzr.lastBid.width = tmzr.getHighestCpmBids('35757')[0].width;
                    tmzr.renderAd(iframeDoc, hb_adid);
                    /** Add watermark **/
                    let argsWatermark = {
                    watermark: true,
                    iframeDoc: iframeDoc,
                    id: bid.adUnitCode,
                    }
                    whatToLoad(-1, argsWatermark);
                    } else {
                    document.getElementById("tmzr-middle-layer").style.display = "none";
                    }
                    }
                } else {
                    tmzr.renderAd(iframeDoc, hb_adid);
                    /** Add watermark **/
                    let argsWatermark = {
                        watermark: true,
                        iframeDoc: iframeDoc,
                        id: formatid,
                        bidder: bid.bidder
                    }
                    whatToLoad(-1, argsWatermark);
                }
                }
                }});
                });
                var http = new XMLHttpRequest();
                var url = 'https://c.tmyzer.com/c/?s=100026&f='+tagsObject[formatid]['ad_id']+'&fi=1';
                http.open("GET", url, true);
                http.send();
                }
                });
                });
                }
                }
                function refreshSlotFooter(formatid, capping) {
                var strformatid = formatid.toString();

                if (counter_refresh[formatid] == null) {
                counter_refresh[formatid] = 0;
                } else {
                counter_refresh[formatid] = counter_refresh[formatid] + 1;
                }
                if (counter_refresh[formatid] < capping) {
                tmzr.que.push(function () {
                tmzr.requestBids({
                adUnitCodes: [strformatid], bidsBackHandler: function () {
                document.getElementById("sas_" + formatid).innerHTML = "";
                var parentsas = window.parent.document.getElementById('sas_' + formatid) || window.top.document.getElementById('sas_' + formatid);
                if (parentsas) {
                parentsas.innerHTML = "";
                }

                window.targetingParams = tmzr.getAdserverTargeting();

                window.targetingParams[formatid] = window.targetingParams[formatid] || 0;
                if (window.targetingParams[formatid] == 0) {
                var moneybid = "";
                } else {
                var hb_adid = "hb_adid=" + window.targetingParams[formatid].hb_adid;
                var hb_pb = "hb_pb=" + window.targetingParams[formatid].hb_bid;
                var hb_bidder = "hb_bidder=" + window.targetingParams[formatid].hb_bidder;
                if (window.targetingParams[formatid].hb_height == "250") {
                var hb_format = "hb_format=" + formatid + "-1";
                } else {
                var hb_format = "hb_format=" + formatid;
                }
                var moneybid = ";" + hb_adid + ";" + hb_pb + ";" + hb_bidder + ";" + hb_format;
                }

                sas.refresh(formatid,{target:moneybid});

                var http = new XMLHttpRequest();
                var url = 'https://c.tmyzer.com/c/?s=100026&f=' + tagsObject[formatid]['ad_id'] + '&fi=1';
                http.open("GET", url, true);
                http.send();
                }
                });
                });
                }
                }
                        }
            var refreshVisibility30012 = function(){
                        var observers = [];
            var fetchAdsArea = document.querySelectorAll('*[id^="sas_"]');
            var slowBidders = ["teads_video","teads_display","teads_display2","richaudience","blueroostermedia","sharethrough"];
            window.slowBidders = slowBidders;

            var slowBiddersTimer = ["60000","60000","60000","30000","30000","40000"];
            var adsAreaId =30012;
            var visibleRefreshRate =23500;
            var invisibleRefreshRate =58000;
            var adsCappingLimit = 50;
            var slowdown = 60000;
            var evt = {};
            evt.lastPos = 0;
            evt.lastTime = Date.now();
            window.adsArea30012= {};
            var visibilitySupport = false;
            if ('IntersectionObserver' in window) {
            visibilitySupport = true;
            }
            var refreshTimeTableVisible = {
            26322: 19000,
            26300: 18500,
            26323: 20000,
            26324: 21500,
            26711: 18500,
            26706: 23000,
            28108: 27000,
            30012: 23500,
            39287: 19500,
            50677: 21000,
            51410: 22000,
            26328: 30000,
            35757: 40000,
            80234: 99999999,
            116434: 99999999

            };
            var refreshTimeTableInvisible = {
            26322: 36000,
            26300: 37000,
            26323: 49000,
            26324: 52000,
            26711: 47000,
            26706: 54000,
            28108: 56000,
            30012: 58000,
            39287: 60000,
            50677: 62000,
            51410: 57000,
            26328: 45000,
            35757: 60000,
            80234: 99999999,
            116434: 99999999
            };

            //window.adsArea30012= el;

            
            window.adsArea30012.isVisible = false;
            window.adsArea30012.isClosed = false;
            window.adsArea30012.refreshTimer = Date.now();
            window.adsArea30012.formatId = adsAreaId;
            window.adsArea30012.refreshRate = refreshTimeTableVisible[adsAreaId];
            window.adsArea30012.capping = 1;
            window.adsArea30012.cappingLimit = adsCappingLimit;


            if (visibleRefreshRate != undefined) {
            refreshTimeTableVisible[adsAreaId] = visibleRefreshRate;
            }
            if (invisibleRefreshRate != undefined) {
            refreshTimeTableInvisible[adsAreaId] = invisibleRefreshRate;
            }

            if (visibilitySupport) {
            var option = {
            root: null,
            rootMargin: '0px',
            threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
            }
            var callback = function (entries, observer) {
            entries.forEach(entry => {
            if (Math.floor(entry.intersectionRatio * 100) > 50 && !window.adsArea30012.isVisible) {
            window.adsArea30012.isVisible = true;
            window.adsArea30012.refreshRate = refreshTimeTableVisible[adsAreaId];
            } else if (Math.floor(entry.intersectionRatio * 100) < 50 && window.adsArea30012.isVisible) {
            window.adsArea30012.isVisible = false;
            window.adsArea30012.refreshRate = refreshTimeTableInvisible[adsAreaId];
            }
            });
            };

            observers30012 = new IntersectionObserver(callback, option, true, 1000);

                            observers30012.observe(document.querySelector("#sas_" + adsAreaId));
                        } else {
            window.adsArea30012.lastPos = 0;
            window.adsArea30012.lastTime = Date.now();
            evt.scroll = window.addEventListener('scroll', function (e) {
            if ((Math.abs(window.adsArea30012.lastPos - window.scrollY) > 100) || (Date.now() - window.adsArea30012.lastTime > 200)) {
            window.adsArea30012.lastPos = window.scrollY;
            window.adsArea30012.lastTime = Date.now();
            var visibilitySensor = true;
            el = document.querySelector('#sas_30012')
            style = window.getComputedStyle(el);
            if (style.getPropertyValue('display') == 'none') {
            visibilitySensor = false;
            }
            if (style.getPropertyValue('opacity') < 0.8) {
            visibilitySensor = false;
            }
            if (el.parentElement) {
            style = window.getComputedStyle(el.parentElement);
            if (style.getPropertyValue('overflow') == 'hidden' || style.getPropertyValue('overflow-x') == 'hidden' || style.getPropertyValue('overflow-y') == 'hidden') {
            if (el.parentElement.getBoundingClientRect.width < el.getBoundingClientRect.width || el.parentElement.getBoundingClientRect.height < el.getBoundingClientRect.height) {
            visibilitySensor = false;
            }
            }
            }
            if (
            el.getBoundingClientRect().top + (el.getBoundingClientRect().height / 2) < 0 ||
            el.getBoundingClientRect().left < 0 ||
            el.getBoundingClientRect().right > (window.innerWidth || document.documentElement.clientWidth) ||
            el.getBoundingClientRect().bottom - (el.getBoundingClientRect().height / 2) > (window.innerHeight || document.documentElement.clientHeight)
            ) {
            visibilitySensor = false;
            }
            if (visibilitySensor && !window.adsArea30012.isVisible) {
            window.adsArea30012.isVisible = true;
            window.adsArea30012.refreshRate = refreshTimeTableVisible[adsAreaId];
            } else if (!visibilitySensor && window.adsArea30012.isVisible) {
            window.adsArea30012.isVisible = false;
            window.adsArea30012.refreshRate = refreshTimeTableInvisible[adsAreaId];
            }
            }
            observers.push(evt);
            });
            }
            refreshQueueManager30012 = function (formatId, capping) {
            window.adsArea30012.capping++;
            window.adsArea30012.refreshTimer = Date.now();

            var isClosed = false;
            if(window.adsArea30012.isClosed != undefined){
            if(window.adsArea30012.isClosed){
            isClosed = true
            }
            }

            if(formatId == 26328 && false){
            if(isClosed == false){
            refreshSlotFooter(30012, window.adsArea30012.capping);
            }
            }else{
            if(isClosed == false) {
                refreshSlot(30012, window.adsArea30012.capping,window.adsArea30012.isVisible);
            }
            }
            }
            setInterval(function(){loopChecker30012();}, 1000);
            loopChecker30012 = function() {
            if (typeof tmzr.getAllWinningBids == 'undefined') {return}
            el = window.adsArea30012;
            if (!isNaN(el.refreshRate) && el.capping < el.cappingLimit && el.formatId != '26328') {
            lastBidder30012 = {"bidderCode":undefined, "responseTimestamp":0};
            tmzr.getAllWinningBids().forEach(function(bid){
            if(bid.adUnitCode==el.formatId){
            if(bid.responseTimestamp > lastBidder30012.responseTimestamp){
            lastBidder30012 = bid;
            }
            }
            })
            window.adsArea30012.lastBidder = lastBidder30012;
            if(slowBidders.indexOf(el.lastBidder.bidder)==-1){
            slowdown = 0;
            } else {
            slowdown = parseInt(slowBiddersTimer[slowBidders.indexOf(el.lastBidder.bidder)]);
            }
            if ((window.adsArea30012.refreshTimer + el.refreshRate) < Date.now()) {
            if(((el.refreshTimer + slowdown) < Date.now()) && slowBidders.includes(el.lastBidder.bidder) == true) {
            refreshQueueManager30012(el.formatId, el.capping);
            } else if(slowBidders.includes(el.lastBidder.bidder) == false){
            refreshQueueManager30012(el.formatId, el.capping);
            }
            }
            } else if (el.formatId != '26325' && el.formatId != '26328' && el.capping < el.cappingLimit) {
            lastBidder30012 = {"bidderCode":undefined, "responseTimestamp":0};
            if(el.lastBidder == undefined || slowBidders.indexOf(el.lastBidder.bidder)==-1){
            slowdown = 0;
            } else {
            slowdown = parseInt(slowBiddersTimer[slowBidders.indexOf(el.lastBidder.bidder)]);
            }
            tmzr.getAllWinningBids().forEach(function(bid){
            if(bid.adUnitCode==el.formatId){
            if(bid.responseTimestamp > lastBidder30012.responseTimestamp){
            lastBidder30012 = bid;
            }
            }
            })
            window.adsArea30012.lastBidder = lastBidder30012;

            if (window.adsArea30012.refreshTimer + 25000 < Date.now() && !slowBidders.includes(el.lastBidder.bidder)) {
            refreshQueueManager30012(el.formatId, el.capping);
            } else if ((window.adsArea30012.refreshTimer + slowdown < Date.now() && slowBidders.includes(el.lastBidder.bidder))) {
            refreshQueueManager30012(el.formatId, el.capping);
            }
            } else if (el.formatId == '26328' && el.capping < el.cappingLimit) {

            lastBidder30012 = {"bidderCode":undefined, "responseTimestamp":0};
            if(el.lastBidder == undefined || slowBidders.indexOf(el.lastBidder.bidder)==-1){
            slowdown = 0;
            } else {
            slowdown = parseInt(slowBiddersTimer[slowBidders.indexOf(el.lastBidder.bidder)]);
            }
            tmzr.getAllWinningBids().forEach(function(bid){
            if(bid.adUnitCode==el.formatId){
            if(bid.responseTimestamp > lastBidder30012.responseTimestamp){
            lastBidder30012 = bid;
            }
            }
            })
            window.adsArea30012.lastBidder = lastBidder30012;

            if (window.adsArea30012.refreshTimer + el.refreshRate < Date.now()) {
            refreshQueueManager30012(el.formatId, el.capping);
            }
            }
            };
            }
                                if(window.nugg_amazon != 1) {
                    window.amzn_targetingParamsList = {};
                    window.adsAmzn26328 = {};
                                            var checkInterval = setInterval(function() {
                        if (window.apstag) {
                        clearInterval(checkInterval);
                        //window.top.__tcfapi('addEventListener', 2, function(tcData, success) {
                        //if(success && (tcData.gdprApplies === false || isEmpty(tcData.vendor.consents) === false)) {

                                            apstag.fetchBids({
                        slots: [                                {
                                slotID: 'sas_39287',
                                slotName: '1097/539356/1667595/sas_39287',
                                sizes: Getsize(31)
                                },                                {
                                slotID: 'sas_26328',
                                slotName: '1097/539356/1667595/sas_26328',
                                sizes: Getsize(6)
                                },                                {
                                slotID: 'sas_26322',
                                slotName: '1097/539356/1667595/sas_26322',
                                sizes: Getsize(1)
                                },                                {
                                slotID: 'sas_30012',
                                slotName: '1097/539356/1667595/sas_30012',
                                sizes: Getsize(28)
                                },                                {
                                slotID: 'sas_26706',
                                slotName: '1097/539356/1667595/sas_26706',
                                sizes: Getsize(20)
                                },                                {
                                slotID: 'sas_26300',
                                slotName: '1097/539356/1667595/sas_26300',
                                sizes: Getsize(2)
                                },                        ],
                        timeout: 2e3
                        }, function(bids) {
                        apstag.targetingKeys();

                        bids.forEach(bid => {
                                                        if(bid.slotID === "sas_39287") {
                                    sas.setTargeting({
                                        target: {
                                            amznbid_39287: [bid.amznbid],
                                            amzniid_39287: [bid.amzniid],
                                            amznp_39287: [bid.amznp],
                                        },
                                        mode: 1,
                                        tagIds: [bid.slotID]
                                    });
                                    if(bid.slotID === "sas_26328"){
                                        window.adsAmzn26328.amznBid = bid;
                                    }
                                    if(0) {
                                        paramsList = {
                                            [39287]: {
                                                ['amznbid_39287']: [bid.amznbid],
                                                ['amzniid_39287']: [bid.amzniid],
                                                ['amznsz_39287']: [bid.amznsz],
                                                ['amznp_39287']: [bid.amznp],
                                                ['slotID_39287']: 39287,
                                            }
                                        }
                                        window.amzn_targetingParamsList = Object.assign(window.amzn_targetingParamsList,paramsList);
                                    }

                                }
                                                            if(bid.slotID === "sas_26328") {
                                    sas.setTargeting({
                                        target: {
                                            amznbid_26328: [bid.amznbid],
                                            amzniid_26328: [bid.amzniid],
                                            amznp_26328: [bid.amznp],
                                        },
                                        mode: 1,
                                        tagIds: [bid.slotID]
                                    });
                                    if(bid.slotID === "sas_26328"){
                                        window.adsAmzn26328.amznBid = bid;
                                    }
                                    if(0) {
                                        paramsList = {
                                            [26328]: {
                                                ['amznbid_26328']: [bid.amznbid],
                                                ['amzniid_26328']: [bid.amzniid],
                                                ['amznsz_26328']: [bid.amznsz],
                                                ['amznp_26328']: [bid.amznp],
                                                ['slotID_26328']: 26328,
                                            }
                                        }
                                        window.amzn_targetingParamsList = Object.assign(window.amzn_targetingParamsList,paramsList);
                                    }

                                }
                                                            if(bid.slotID === "sas_26322") {
                                    sas.setTargeting({
                                        target: {
                                            amznbid_26322: [bid.amznbid],
                                            amzniid_26322: [bid.amzniid],
                                            amznp_26322: [bid.amznp],
                                        },
                                        mode: 1,
                                        tagIds: [bid.slotID]
                                    });
                                    if(bid.slotID === "sas_26328"){
                                        window.adsAmzn26328.amznBid = bid;
                                    }
                                    if(0) {
                                        paramsList = {
                                            [26322]: {
                                                ['amznbid_26322']: [bid.amznbid],
                                                ['amzniid_26322']: [bid.amzniid],
                                                ['amznsz_26322']: [bid.amznsz],
                                                ['amznp_26322']: [bid.amznp],
                                                ['slotID_26322']: 26322,
                                            }
                                        }
                                        window.amzn_targetingParamsList = Object.assign(window.amzn_targetingParamsList,paramsList);
                                    }

                                }
                                                            if(bid.slotID === "sas_30012") {
                                    sas.setTargeting({
                                        target: {
                                            amznbid_30012: [bid.amznbid],
                                            amzniid_30012: [bid.amzniid],
                                            amznp_30012: [bid.amznp],
                                        },
                                        mode: 1,
                                        tagIds: [bid.slotID]
                                    });
                                    if(bid.slotID === "sas_26328"){
                                        window.adsAmzn26328.amznBid = bid;
                                    }
                                    if(1) {
                                        paramsList = {
                                            [30012]: {
                                                ['amznbid_30012']: [bid.amznbid],
                                                ['amzniid_30012']: [bid.amzniid],
                                                ['amznsz_30012']: [bid.amznsz],
                                                ['amznp_30012']: [bid.amznp],
                                                ['slotID_30012']: 30012,
                                            }
                                        }
                                        window.amzn_targetingParamsList = Object.assign(window.amzn_targetingParamsList,paramsList);
                                    }

                                }
                                                            if(bid.slotID === "sas_26706") {
                                    sas.setTargeting({
                                        target: {
                                            amznbid_26706: [bid.amznbid],
                                            amzniid_26706: [bid.amzniid],
                                            amznp_26706: [bid.amznp],
                                        },
                                        mode: 1,
                                        tagIds: [bid.slotID]
                                    });
                                    if(bid.slotID === "sas_26328"){
                                        window.adsAmzn26328.amznBid = bid;
                                    }
                                    if(0) {
                                        paramsList = {
                                            [26706]: {
                                                ['amznbid_26706']: [bid.amznbid],
                                                ['amzniid_26706']: [bid.amzniid],
                                                ['amznsz_26706']: [bid.amznsz],
                                                ['amznp_26706']: [bid.amznp],
                                                ['slotID_26706']: 26706,
                                            }
                                        }
                                        window.amzn_targetingParamsList = Object.assign(window.amzn_targetingParamsList,paramsList);
                                    }

                                }
                                                            if(bid.slotID === "sas_26300") {
                                    sas.setTargeting({
                                        target: {
                                            amznbid_26300: [bid.amznbid],
                                            amzniid_26300: [bid.amzniid],
                                            amznp_26300: [bid.amznp],
                                        },
                                        mode: 1,
                                        tagIds: [bid.slotID]
                                    });
                                    if(bid.slotID === "sas_26328"){
                                        window.adsAmzn26328.amznBid = bid;
                                    }
                                    if(0) {
                                        paramsList = {
                                            [26300]: {
                                                ['amznbid_26300']: [bid.amznbid],
                                                ['amzniid_26300']: [bid.amzniid],
                                                ['amznsz_26300']: [bid.amznsz],
                                                ['amznp_26300']: [bid.amznp],
                                                ['slotID_26300']: 26300,
                                            }
                                        }
                                        window.amzn_targetingParamsList = Object.assign(window.amzn_targetingParamsList,paramsList);
                                    }

                                }
                                                    });
                        //sas.render();
                        });
                                            }
                        }, 500);
                        //}});
                                        window.nugg_amazon = 1;
                    } else {
                        for (adun in window.amzn_targetingParamsList) {
                            Object.entries(window.amzn_targetingParamsList[adun]).forEach(target => {
                                const [key, value] = target;
                                sas.setTargeting({
                                    target: {
                                        [target[0]]: [target[1]],
                                    },
                                    mode: 1,
                                    tagIds: [target[2]]
                                });
                            });
                        }
                    }
                                if(typeof crtg_content === 'undefined'){var crtg_content = "";}
                var mydiv = document.getElementById("100026-28");
                var creatediv = document.createElement("div");
                creatediv.id = "sas_30012";
                                    if( navigator.userAgent.match(/Android/i)
                    || navigator.userAgent.match(/webOS/i)
                    || navigator.userAgent.match(/iPhone/i)
                    || navigator.userAgent.match(/iPad/i)
                    || navigator.userAgent.match(/iPod/i)
                    || navigator.userAgent.match(/BlackBerry/i)
                    || navigator.userAgent.match(/Windows Phone/i)){
                    creatediv.style.width = "320px";
                    creatediv.style.height = "100px";
                    }else{
                    creatediv.style.width = "728px";
                    creatediv.style.height = "90px";
                    }
                    creatediv.style.margin = "auto";
                
                if(28 == 2 && 1 == 1 && ((navigator.userAgent.match(/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/i))||( navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/BlackBerry/i)
                || navigator.userAgent.match(/Windows Phone/i)))){
                var paragraphs = document.getElementsByTagName("p");
                var counter = paragraphs.length;
                var temp = 0;
                var myP = null;
                var myPNumber = null;
                var coeffFilterBegin = 0.1;
                var coeffFilterEnd = 0.8;
                var filterBegin = Math.ceil(coeffFilterBegin * counter);
                var filterEnd = Math.ceil(counter - (coeffFilterEnd * counter));
                var limitPargraphs = 4;

                function convertHtmlToText(inputText) {
                var regex = /(<([^>]+)>)/ig;
                var returnText = "" + inputText;
                returnText = returnText.replace(regex, "");
                return returnText;
                }

                if (paragraphs != null && counter > limitPargraphs) {
                for(var i = filterBegin; i < filterEnd; i++) {
                var filteringParagraphs = convertHtmlToText(paragraphs[i].innerHTML);
                var number = filteringParagraphs.split(' ').length;
                if (temp <= number) {
                temp = number;
                myP = filteringParagraphs;
                myPNumber = i;
                }
                }
                paragraphs[myPNumber].className += " aBigClassNameToAvoidCollision2";
                paragraphs[myPNumber].appendChild(creatediv);
                } else {
                var divs = document.getElementsByTagName("div");
                var counter = divs.length;
                var coeffFilterBeginDiv = 0.1;
                var filterBeginDiv = Math.ceil(coeffFilterBeginDiv * counter);
                if(divs[filterBeginDiv]){
                divs[filterBeginDiv].className += " aBigClassNameToAvoidCollision2";
                divs[filterBeginDiv].appendChild(creatediv);
                }else{
                mydiv.appendChild(creatediv);
                }
                }
                }else{
                mydiv.appendChild(creatediv);
                }
                window.Adcall_30012= function(){
                sas.cmd.push(function() {
                sas.setEids(tmzr.getUserIdsAsEids());
                });
                sas.cmd.push(function() {
                var arr_width = {26322:728,26300:300,26323:300,26324:120,26711:300,26706:160,28108:300,30012:728,39287:970,35:50677,51410:728,28108:300};
                var arr_width_video ={26300:300,26711:300,26323:300,39287:444,45111:640};
                var arr_height = {26322:90,26300:250,26323:600,26324:600,26711:250,26706:600,28108:150,30012:90,39287:250,35:50677,51410:90,28108:250};
                var bid = tmzr.getHighestCpmBids("30012")[0];
                if(bid){
                var hb_adid = window.targetingParams[30012].hb_adid;
                var sasBid = JSON.parse(JSON.stringify(bid));
                sasBid.cpm = window.targetingParams[30012].hb_bid;
                bid.currency = bid.currency || "USD";
                }else{
                var sasBid ={};
                }
                if(typeof Smart_SR_data === 'undefined'){
                Smart_SR_data ="";
                }
                sas.setHeaderBiddingWinner("sas_"+30012, sasBid);
                                    sas.call("std", {
                    tagId: 'sas_30012',
                    siteId: 539356,
                    pageId: 1667595,
                    formatId: 30012,
                    target:Smart_SR_data,
                    timeout:3000,
                    schain:  "1.0,1!themoneytizer.com,92945,1,elfqrin.com,elfqrin.com"},
                    {networkId: 1097, domain: "https://ww1097.smartadserver.com",
                    onNoad: function() {
                    //if (bid && bid.bidder == "improvedigital" && bid.mediaType == "video") {
                    //var creatediv = document.createElement("div");
                    //creatediv.id = '30012';
                    //creatediv.setAttribute("style","width:"+arr_width_video[30012]+"px;margin:auto;");
                    //document.getElementById("sas_30012").appendChild(creatediv);
                    //var iframeDoc = document;
                    //}else{
                    var myiframe = document.createElement('iframe');
                    myiframe.frameBorder=0;
                    myiframe.width=arr_width[30012]+"px";
                    myiframe.height=arr_height[30012]+"px";
                    myiframe.id="sas_iframe_30012";
                    myiframe.setAttribute("scrolling", "no");
                    myiframe.setAttribute("marginheight", 0);
                    myiframe.setAttribute("marginwidth", 0);
                    myiframe.setAttribute("topmargin", 0);
                    myiframe.setAttribute("leftmargin", 0);
                    myiframe.setAttribute("allowtransparency", true);
                    document.getElementById("sas_30012").appendChild(myiframe);
                    var iframeDoc = myiframe.contentWindow.document;
                    
                                        //}
                                            if (bid && bid.bidder == "criteo" && bid.mediaType == "native" && bid.adUnitCode == 26322) {
                        var json = window.targetingParams[30012];
                        if(!isEmpty(json) && json.hb_bidder == "criteo") {
                        var nativeScript = document.createElement("script");
                        nativeScript.src = "https://cdn.jsdelivr.net/npm/prebid-universal-creative@latest/dist/native-render.js";
                        iframeDoc.body.appendChild(nativeScript);
                        new Promise(() => {
                        nativeScript.onload = function() {
                        var pbNativeTagData = {};
                        pbNativeTagData.requestAllAssets = true;
                        pbNativeTagData.pubUrl = document.URL;
                        pbNativeTagData.adId = json.hb_adid;
                        document.getElementById("sas_iframe_30012").contentWindow.pbNativeTag.renderNativeAd(pbNativeTagData);
                        }
                        nativeScript.onerror = function() {
                        console.log("error");
                        }
                        })
                        }
                        }

                                        if (bid && bid.mediaType != "native") {
                        if(bid.adUnitCode == 80234 && (bid.bidder=="adform"||bid.bidder=="adagio"||bid.bidder=="teads_video"||bid.bidder=="vidoomy"||bid.bidder=="ogury"||bid.bidder=="improvedigital"||bid.bidder=="onetag"||bid.bidder=="amx"||bid.bidder=="pubmatic"||bid.bidder=="sharethrough")){
                        args = {
                            func: tmzr.renderAd,
                            iframeDoc: iframeDoc,
                            hb_adid: hb_adid,
                            bidder: bid.bidder,
                            globalBid: bid
                            }
                            window.whatToLoad(38, args);
                    
                            /** Add watermark **/
                            let argsWatermark = {
                                watermark: true,
                                iframeDoc: iframeDoc,
                                id: bid.adUnitCode,
                                bidder: bid.bidder
                            }
                            whatToLoad(-1, argsWatermark);
                        } else if(bid.adUnitCode == 26328) {
                            args = {
                            func: tmzr.renderAd,
                            hb_adid: hb_adid,
                            height: bid.height,
                            width: bid.width,
                            bidder: bid.bidder,
                            cornerAvailable: false,footerPositionTop: false,                            }
                            window.whatToLoad(6, args);
                            /** Add watermark **/
                            let argsWatermark = {
                            watermark: true,
                            iframeDoc: null,
                            id: bid.adUnitCode,
                            bidder: bid.bidder
                            }
                            whatToLoad(-1, argsWatermark);
                        }else if(bid.adUnitCode == 116434) {
                            args = {
                            func: tmzr.renderAd,
                            hb_adid: hb_adid,
                            height: bid.height,
                            width: bid.width,
                            }
                            window.whatToLoad(44, args);
                            /** Add watermark **/
                            let argsWatermark = {
                            watermark: true,
                            iframeDoc: null,
                            id: bid.adUnitCode,
                            bidder: bid.bidder
                            }
                            whatToLoad(-1, argsWatermark);
                        } else {
                            tmzr.renderAd(iframeDoc, hb_adid);
                            /** Add watermark **/
                            let argsWatermark = {
                            watermark: true,
                            iframeDoc: iframeDoc,
                            id: bid.adUnitCode,
                            bidder: bid.bidder
                            }
                            whatToLoad(-1, argsWatermark);
                        }
                    }

                    }});
                                }
                );

                var http = new XMLHttpRequest();
                var url = 'https://c.tmyzer.com/c/?s=100026&f=28&fi=0';
                http.open("GET", url, true);
                http.send();
                var checkiframe = setInterval(function(){
                var myframe = creatediv.getElementsByTagName("iframe")[0];
                if(myframe){
                if(myframe.sandbox == ""){
                                    myframe.setAttribute('sandbox', 'allow-forms allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-top-navigation-by-user-activation');
                                myframe.setAttribute('data-forced-sandbox', true);
                }
                clearInterval(checkiframe)}
                },200);
                refreshVisibility30012();
                };

            