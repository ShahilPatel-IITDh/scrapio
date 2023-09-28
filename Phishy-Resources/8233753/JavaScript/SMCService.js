// Presets
var winRef = top;
var sc_body = winRef.document.body;
var sc_href = document.location.href;
var allFormats = [];
var richMediaObject = null;
var sc_creative = null;
var sc_skin_exp_counter = 0;
// /Presets
// Call to RichMediaLoader in case if it was unloaded first
///
function reloadSMC(){
    window.addEventListener('message', function(e){
        if (typeof e.data === 'string' && e.data.match('SMC')) {
            richMediaObject = JSON.parse(e.data);
            if (richMediaObject != undefined) {
                sc_creative = richMediaObject.creative;
                if (sc_creative) {
                    if (sc_creative.serviceType) {
                        allFormats.push(sc_creative.serviceType);
                        SC_SMC();
                    }
                }
            };
        }else {
            return;
        };
    });
}
reloadSMC();

function SC_SMC(){
    function locateTopBanner(className,callback){
        var f;
        var td;
        var googletag = winRef.googletag;
        var document= winRef.document;

    if(document.location.href.match(/filmaffinity/))
    {
        var el=document.getElementById("top-ad");
        if(el)          
            callback(el);
        return;
    }

    if(document.location.href.match(/wuolah/))
    {
        var el=document.getElementById("sc-top");
        if(el)          
            callback(el);
        return;
    }    

    if(sc_href.match(/autopista.es/)||sc_href.match(/mundo-geo.es/)||sc_href.match(/fourfourtwo.es/)||sc_href.match(/revistaoxigeno.es/)||sc_href.match(/planeta2030.es/)||sc_href.match(/trailrun.es/)||sc_href.match(/triatlonweb.es/)||sc_href.match(/ciclismoafondo.es/)||sc_href.match(/sportlife.es/)||sc_href.match(/motociclismo.es/)||sc_href.match(/soycorredor.es/)||sc_href.match(/mountainbike.es/)||sc_href.match(/moncloa.com/)|| sc_href.match(/cotilleo.es/)||sc_href.match(/merca2.es/)||sc_href.match(/que.es/))
    {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform))){
            var el=document.getElementById("sc-oop");
            if(el)          
                callback(el);
            return;
        }
        else {
            var el=document.getElementById("sc-top");
            if(el)          
                callback(el);
            return;
        }
    }

    //A3
    if(sc_href.match(/atresplayer/)||sc_href.match(/antena3/)||sc_href.match(/lasexta/)||sc_href.match(/atresmedia/)||sc_href.match(/correryfitness/)||sc_href.match(/europafm/)||sc_href.match(/flooxernow/)|| sc_href.match(/melodia-fm/))
    {
        var el=document.getElementsByClassName("bxs-bb")[0];
        if(el)          
            callback(el);
        return;
    }
    // sticky-bottom adLoaded
    // BXS exeptions
    if (sc_creative.serviceType && sc_creative.serviceType === 'expandbannerMobile') {
            var el=document.getElementsByClassName("bxs-bb")[0];
            if(el)          
                callback(el);
            return;
    }
    // end bxs exeptions
    
    if(sc_href.match('stilo.es'))
    {
        var el=document.getElementById("csticky_movil-div-gpt-ad_728"); 
        if(el)          
            callback(el);
        return;
    }

    if(sc_href.match(/ondacero/))
    {
        var el=document.querySelector('atres-widget[data-position="top"]').querySelector('.gpt-container');
        if(el)          
            callback(el);
        return;
    }

    if(document.location.href.match('noticias.juridicas.com')||sc_href.match(/guiasjuridicas/))
        {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform))){
                var el=document.querySelector('div[id^=sas_expDiv]');
                if(el)          
                    callback(el);
                return;
            }
            else {
                var el=document.getElementById("sas_52030");
                if(el)          
                    callback(el);
                return;
            }
    }

        //
        if(f=winRef.document.getElementsByClassName(className))
        {
            //NAUTILUS
            if(f.length == 1)
            {
                td=f[0];
                callback(td);
                return;
            } 
            //SITEREP
            else if (f=winRef.document.querySelector('div[id^=sc-top]')) {
                td=f;
                callback(td);
                return;
            }
            //SHOWBIZZARD
            else if(document.location.href.match('showbizzdaily.com') && (f=winRef.document.querySelector('#sc-superbanner-btf'))) {
                td=f;
                callback(td);
                return;
            }
            //TESTPAGE
            else if (f=winRef.document.getElementById("sc-desktopwallpaper")) {
                td=f;
                callback(td);
                return;
            }
        }
            if(typeof googletag != "undefined")
            {
            googletag.cmd.push(function(){
                var au=googletag.pubads().getSlots();
                var maxSize=null;
                var st=(((t = document.documentElement) || (t = document.body.parentNode))
                    && typeof t.scrollTop == 'number' ? t : document.body).scrollTop;

                for(var l=0;l<au.length;l++)
                {
                    var dd=document.getElementById(au[l].getSlotElementId());
                    if(!dd)
                        continue;
                    var bbox=dd.getBoundingClientRect();
                    if(bbox.height < 10)
                        continue;
                    var hh=bbox.top+st;
                    var w=dd.offsetWidth;
                    if(hh > 1200)
                        continue;
                    if(maxSize==null || maxSize.w < w || (maxSize.w == w && hh < maxSize.top))
                    {
                        maxSize={w:bbox.width,div:dd,slot:au[l],top:hh}
                        continue;
                    }
                }
                if(maxSize)
                {
                    callback(maxSize.div);
                }
            });
            }
            else
            {
                var id_exist = document.getElementById("sc-desktopwallpaper");
                if (id_exist) {
                    return
                }else {
                    var th=document.createElement("div");
                    // Existe un elemento llamado "innerDiv"? (Preview de google)
                    var iD=document.getElementById("innerDiv") || document.body;
                    iD.insertBefore(th,null);
                    th.id="sc-desktopwallpaper";
                    callback(th);
                }
            }
    } // end locateTopBanner
    var targetWindow=null;
        var googletag=winRef.googletag;
        var document=winRef.document;

    // changes
        try {

        var decoded = JSON.parse(event.data);
        if(typeof decoded.type=="undefined" || decoded.type!="SMC")
            return;
        var sc_body = winRef.document.body;

        switch(decoded.subtype) {
            case "CONNECT":
            {
                //use in DBM preview
                if(targetWindow!=null)
                    return;
                targetWindow=event.source;
                event.source.postMessage(JSON.stringify({"type": "SMC", "subtype": "SC_OK"}),"*");

            }break;
    // end changes
                case "CREATIVE": // SERVICE_CASE
                {
                    winRef._SMC_SkinParams = richMediaObject;
                    var f=function() {
                            switch (sc_creative.serviceType) {
                                case "skin": {
                                    loadPerSiteFixes();
                                    serveSkin(sc_creative);
                                    sc_body.classList.add('sc-rmp', 'sc-skin');
                                }
                                    break;
                                case "skinimage": {
                                    loadPerSiteFixes();
                                    serveSkin(sc_creative);
                                    sc_body.classList.add('sc-rmp', 'sc-skin');
                                }
                                    break;
                                case "videowall": {
                                    locateTopBanner("sc-desktopwallpaper", function (targetDiv) {
                                    loadPerSiteFixes();
                                    if (targetDiv){targetDiv.classList.add('sc-skin-billboard');}
                                    serveVideoWall(targetDiv, sc_creative);
                                    sc_body.classList.add('sc-rmp', 'sc-skin-exp', 'sc-skin-wall');
                                    });
                                }
                                    break;
                                case "skinInteractive": {
                                    locateTopBanner("sc-desktopwallpaper", function (targetDiv) {
                                    loadSkinInteractive();
                                    loadPerSiteFixes();
                                    if (targetDiv){targetDiv.classList.add('sc-skin-billboard');}
                                    serveVideoWall(targetDiv, sc_creative);
                                    sc_body.classList.add('sc-rmp', 'sc-skin-exp', 'sc-skin-wall', 'test_sc_cache');
                                    });
                                }
                                    break;
                                case "videowall2": {
                                    locateTopBanner("sc-desktopwallpaper", function (targetDiv) {
                                    loadPerSiteFixes();
                                    serveVideowall2(targetDiv, sc_creative);
                                    sc_body.classList.add('sc-rmp', 'sc-skin-exp', 'sc-skin-wall');
                                    });
                                }
                                    break;
                                case "skinExp": {
                                    locateTopBanner("sc-desktopwallpaper", function (targetDiv) {
                                    loadPerSiteFixes();
                                    serveSkinExp(targetDiv, sc_creative);
                                    sc_body.classList.add('sc-rmp', 'sc-skin-exp');
                                    });
                                }
                                    break;
                                case "mobilevideowall": {
                                    loadVideoWallMobilePerSiteFixes();
                                }
                                    break;
                                case "coverparallaxad": {
                                    loadCoverParallaxPerSiteFixes();
                                }
                                    break;
                                case "contentstories": {
                                    loadCoverParallaxPerSiteFixes();
                                }
                                    break;
                                case "infeed": {
                                    loadInfeedAdPerSiteFixes();
                                }
                                    break;
                                case "infeedimage": {
                                    loadInfeedAdImagePerSiteFixes();
                                }
                                    break;
                                case "fixedscroller": {
                                    loadFixedScrollerPerSiteFixes();
                                }
                                    break;
                                case "fixedscrollerV3": {
                                    loadFixedScrollerV3PerSiteFixes();
                                }
                                    break;
                                case "catalogueAd": {
                                    loadcatalogueAdPerSiteFixes();
                                }
                                    break;
                                case "scrollgrow":{
                                    loadScrollGrowPerSiteFixes();
                                }
                                    break;
                                case "NewFixedExp":{
                                    loadNewFixedExpPerSiteFixes();
                                }
                                    break;
                                case "bubbleAd":{
                                    loadBubbleAdExpPerSiteFixes();
                                }
                                    break;
                                case "bubbleAdCustom":{
                                    loadBubbleAdCustomExpPerSiteFixes();
                                }
                                    break;
                                case "bubbleScrollAd":{
                                    loadBubbleScrollAdExpPerSiteFixes();
                                }
                                    break;  
                                case "expandbanner": { 
                                    loadExpandBannerPerSiteFixes();
                                    locateTopBanner("sc-desktopwallpaper", function (targetDiv) {
                                    serveexpandbanner(targetDiv, sc_creative);
                                    sc_body.className += ' sc-rmp-expandbanner-desktop sc-skin-exp';
                                    });
                                }
                                    break;

                                case "expandbanner2": { 
                                    //loadExpandBannerPerSiteFixes();
                                    locateTopBanner("sc-desktopwallpaper", function (targetDiv) {
                                    serveexpandbanner2(targetDiv, sc_creative);
                                    sc_body.className += ' sc-rmp-expandbanner-desktop sc-skin-exp';
                                    });
                                }
                                    break;

                                case "expandbannerMobile": { 
                                    loadExpandBannerMobilePerSiteFixes();
                                    locateTopBanner("sc-desktopwallpaper", function (targetDiv) {
                                    serveexpandbannerMobile(targetDiv, sc_creative);
                                    sc_body.className += ' sc-rmp-expandbanner-mobile';
                                    });
                                }
                                    break;

                                    
                                case "bannernoexpand": { 
                                    loadExpandBannerPerSiteFixes();
                                    locateTopBanner("sc-desktopwallpaper", function (targetDiv) {
                                    servebannernoexpand(targetDiv, sc_creative);
                                    sc_body.className += ' sc-rmp sc-skin';
                                    });
                                }
                                    break;

                               //////// New formats of 2023  ////////
                                case "custom_parallax_infeed": {
                                    loadCustomParallaxOrInfeedPerSiteFixes();
                                }
                                   break;
                                case "custom_video_wall_mobile": {
                                    loadCustomVideWallMobilePerSiteFixes();
                                }
                                   break;
                            }
                    };

                    if(typeof googletag != "undefined") {
                        if (sc_href.match(/guiasjuridicas/) || sc_href.match(/diariogol/) || sc_href.match(/antena3/) || sc_href.match(/lasexta/) || sc_href.match(/atresmedia/) || sc_href.match(/correryfitness/) || sc_href.match(/melodia-fm/) || sc_href.match(/ondacero/)  || sc_href.match(/europafm/)) {
                            f(); 
                        } 
                        else if (sc_href.match(/atresplayer/)) {
                            if (!document.body.classList.contains('sc-rmp')) {
                                f.apply(winRef); 
                            }
                        }
                        else {
                            googletag.cmd.push(function () {
                                f.apply(winRef);
                            });
                        }
                    } 
                    else {
                       f.apply(winRef); 
                    }
                }
            }
        }
        catch(e)
        {

        }
    function loadScript(url) {
        var googletag=winRef.googletag;
        var document=winRef.document;
        
        var sc = document.createElement("script");
        sc.src = url;
        sc.async = "async";
        document.body.appendChild(sc);
    }
    // Size es 980x250 o 300x250..o lo que se parsee
    function loadFTCreative(src,id,size,w,click,expand,viewTrack) {
        var document=winRef.document;
        w.ftClick = click;
        w["ftExpTrack_" + id] = expand;
        w.ftX = "";
        w.ftY = "";
        w.ftZ = "";
        w.ftOBA = 1;
        w.ftContent = "";
        w.ftCustom = "";
        w["ft" + size + "_OOBclickTrack"] = "";
        w.ftRandom = Math.random() * 1000000;
        w["ftClick_" + id] = ftClick;
        w["ftCustomViewTrack_" + id] = viewTrack;
        /*if(typeof(ft_referrer)=="undefined"){w.ft_referrer=(function(){var r="";if(w==top){r=w.location.href;}else{try{r=w.parent.location.href;}catch(e){}r=(r)?r:document.referrer;}while(encodeURIComponent(r).length>1000){r=r.substring(0,r.length-1);}return r;}());}
         var ftDomain = (w==top)?"":(function(){var d=document.referrer,h=(d)?d.match("(?::q/q/)+([qw-]+(q.[qw-]+)+)(q/)?".replace(/q/g,decodeURIComponent("%"+"5C")))[1]:"";return (h&&h!=location.host)?"&ft_ifb=1&ft_domain="+encodeURIComponent(h):"";}());*/
        var ftDomain = document.location.href.replace(/http[s]{0,1}:\/\//, '');
        var ft_referrer = ftDomain;
        var ftTag = document.createElement("script");
        ftTag.id = "ft_servedby_" + id;
        ftTag.src = src + "?ftx=" + ftX + "&fty=" + ftY + "&ftadz=" + ftZ + "&ftscw=" + ftContent + "&ft_custom=" + ftCustom + "&ftOBA=" + ftOBA + ftDomain + "&ft_agentEnv=" + (w.mraid || w.ormma ? "1" : "0") + "&ft_referrer=" + encodeURIComponent(ft_referrer) + "&cachebuster=" + ftRandom;
        ftTag.name = "ftscript_" + size;
        var f=function(){document.body.appendChild(ftTag);}
        if(w.document.readyState=="loading")
            w.document.addEventListener('readystatechange',f);
        else
            f();
    }
    function loadNOFTCreative(id) {
        var document=winRef.document;
            var f=function(){document.body.appendChild(ftTag);}
        if(w.document.readyState=="loading")
            w.document.addEventListener('readystatechange',f);
        else
            f();

    }
    /*libs_*/
    function loadPerSiteFixes() {
        loadScript("https://s3.eu-central-1.amazonaws.com/sc-devel/Skins/skin_collapse_css_template.js");
    }

    function loadSkinInteractive() {
        loadScript("https://s3.eu-central-1.amazonaws.com/sc-devel/Skins/skin_interactive.js");
    }

    function loadVideoWallMobilePerSiteFixes() {
        loadScript("https://sc-devel.s3.eu-central-1.amazonaws.com/parallax/parallax_collapse.js");
    }

    function loadInfeedAdPerSiteFixes() {
        loadScript("https://sc-devel.s3.eu-central-1.amazonaws.com/parallax/infeed_collapse.js");
    }
    
    function loadInfeedAdImagePerSiteFixes() {
        loadScript("https://sc-devel.s3.eu-central-1.amazonaws.com/parallax/infeed_image_collapse.js");
    }

    function loadCoverParallaxPerSiteFixes() {
        loadScript("https://sc-devel.s3.eu-central-1.amazonaws.com/parallax/parallax_collapse_absolute.js");
    }
    function loadcatalogueAdPerSiteFixes() {
        loadScript("https://sc-devel.s3.eu-central-1.amazonaws.com/catalogueAd/catalogueAd_collapse.js");
    }
    function loadFixedScrollerPerSiteFixes() {
        // loadScript("https://sc-devel.s3.eu-central-1.amazonaws.com/stickyscroller/stickyscroller_collapse.js");
        // stickyColorBTN = sc_creative.btnColor;
        // this is vertion of the format is obsolete
    }
    function loadFixedScrollerV3PerSiteFixes() {
        loadScript("https://sc-devel.s3.eu-central-1.amazonaws.com/stickyscroller3/stickyscroller_collapse_3_0.js");
        stickyColorBTN = (typeof sc_creative.sticky_btnColor === 'string') ? sc_creative.sticky_btnColor : false;
        stickyColorArrow = (typeof sc_creative.sticky_arrowColor === 'string') ? sc_creative.sticky_arrowColor : false;
    }

    function loadScrollGrowPerSiteFixes() {
        loadScript("https://sc-devel.s3.eu-central-1.amazonaws.com/scrollgrow/scrollgrow_collapse.js");
    }

    function loadNewFixedExpPerSiteFixes() {
        loadScript("https://sc-devel.s3.eu-central-1.amazonaws.com/newFixedDesplegable/newFixedDesplegable_collapse.js");
        newFixedColorBTN = sc_creative.btnColor;
        newFixedColorArrow = sc_creative.arrowColor;
    }

    function loadBubbleAdExpPerSiteFixes() {
        loadScript("https://sc-devel.s3.eu-central-1.amazonaws.com/BubbleAd/bubble_beta_collapse.js");
        bgColorRMP = sc_creative.btnColor;
    }
    function loadBubbleAdCustomExpPerSiteFixes() {
        loadScript("https://sc-devel.s3.eu-central-1.amazonaws.com/BubbleAd/bubble_custom_beta_collapse.js");
    }
    function loadBubbleScrollAdExpPerSiteFixes() {
        loadScript("https://sc-devel.s3.eu-central-1.amazonaws.com/BubbleAd/bubble_sticky_custom_beta_collapse.js");
    }

    function loadExpandBannerPerSiteFixes() {
        loadScript("https://s3.eu-central-1.amazonaws.com/sc-devel/billboard/billboard_collapse_css_template.js");
    }

    function loadExpandBannerMobilePerSiteFixes() {
        loadScript("https://s3.eu-central-1.amazonaws.com/sc-devel/viewability/320x100_splash_collapse_template.js");
    }
    ////// New formats 2023 //////
    // This function calls the collapse which applies the 4:5 aspect ratio and it calls to the correspondend themplate
    function loadCustomParallaxOrInfeedPerSiteFixes(){
        loadScript("https://sc-devel.s3.eu-central-1.amazonaws.com/parallax/infeed_parallax_custom_collapse.js");
    }
    // This function calls the collapse which applies the 9:16 aspect ratio and it calls to the correspondend themplate
    function loadCustomVideWallMobilePerSiteFixes(){
        loadScript("https://sc-devel.s3.eu-central-1.amazonaws.com/parallax/video_wall_custom_collapse.js");
    }

    /*_libs*/
    /*serve_*/
    function serveSkin(adsParams) {
        adjustContainer(adsParams, "980px");
    }


    function serveexpandbanner(targetDiv,adsParams) {
        var document=winRef.document;
            targetDiv.style.position="relative";
        var subDiv=document.createElement("div");
        subDiv.style.position="absolute";
        subDiv.id="ftdiv"+adsParams.banner_ftdiv;
        targetDiv.appendChild(subDiv);

        loadExpandBannerPerSiteFixes();
        loadFTCreative(adsParams.banner_src,adsParams.banner_ftdiv,adsParams.banner_size,winRef,adsParams.click,adsParams.expand,adsParams.viewTrack);
    }

    function serveexpandbanner2(targetDiv,adsParams) {
        var document=winRef.document;
            targetDiv.style.position="relative";
        var subDiv=document.createElement("div");
        subDiv.style.position="absolute";
        subDiv.id="ftdiv"+adsParams.banner_ftdiv;
        targetDiv.appendChild(subDiv);
        //loadExpandBannerPerSiteFixes();
        loadFTCreative(adsParams.banner_src,adsParams.banner_ftdiv,adsParams.banner_size,winRef,adsParams.click,adsParams.expand,adsParams.viewTrack);
    }

    function bannernoexpand(targetDiv,adsParams) {
        var document=winRef.document;
            targetDiv.style.position="relative";
        var subDiv=document.createElement("div");
        subDiv.style.position="absolute";
        subDiv.id="sc-noft-banner";
        targetDiv.appendChild(subDiv);

        loadExpandBannerPerSiteFixes();
        loadNOFTCreative(adsParams.banner_ftdiv,top);
    }
    function serveexpandbannerMobile(targetDiv,adsParams) {
        var document=winRef.document;
        var subDiv=document.createElement("div");
        subDiv.style.position="absolute";
        subDiv.id="ftdiv"+adsParams.banner_ftdiv;
        targetDiv.appendChild(subDiv);

        loadExpandBannerMobilePerSiteFixes();
        loadFTCreative(adsParams.banner_src,adsParams.banner_ftdiv,adsParams.banner_size,winRef,adsParams.click,adsParams.expand,adsParams.viewTrack);
    }

    function serveVideoWall(targetDiv,adsParams) {
        
        var document=winRef.document;

        targetDiv.style.position="relative";
        var subDiv=document.createElement("div");
        subDiv.style.position="absolute";
        subDiv.id="ftdiv"+adsParams.banner_ftdiv;
        targetDiv.appendChild(subDiv);
        loadFTCreative(adsParams.banner_src,adsParams.banner_ftdiv,adsParams.banner_size,winRef,adsParams.click,adsParams.expand,adsParams.viewTrack);
        var size = winRef.screen.width;
        var bgRandom = Math.random() * 1000000;
        if (size >= 1025) {
            adsParams.image = 'https://cdn.flashtalking.com/42249/assets/bg_transparent.png?'+bgRandom;
        } else if (size > 800 && size < 1025) {
            adsParams.image = 'https://cdn.flashtalking.com/42249/assets/bg_transparent.png?'+bgRandom;
        } else if (size <= 800) {
            adsParams.image = 'https://cdn.flashtalking.com/42249/assets/bg_transparent.png?'+bgRandom;
        }
        if(typeof adsParams.background_image!="undefined")
            adsParams.image=adsParams.background_image;
        // Funci?n de gesti?n del evento del click
        setupBodyBackground(adsParams);
        if(adsParams.background_src!="")
            loadFTCreative(adsParams.background_src,adsParams.banner_ftdiv,adsParams.banner_size,winRef,adsParams.click,adsParams.expand,adsParams.viewTrack);
    }
    function serveVideowall2(targetDiv,adsParams) {
        var document=winRef.document;
        targetDiv.style.position="relative";
        var subDiv=document.createElement("div");
        subDiv.style.position="absolute";
        subDiv.id="ftdiv"+adsParams.banner_ftdiv;
        targetDiv.appendChild(subDiv);
        loadFTCreative(adsParams.banner_src,adsParams.banner_ftdiv,adsParams.banner_size,winRef,adsParams.click,adsParams.expand,adsParams.viewTrack);
        var size = winRef.screen.width;
        var bgRandom = Math.random() * 1000000;
        if (size >= 1025) {
            adsParams.image = 'https://cdn.flashtalking.com/42249/assets/bg_transparent.png?'+bgRandom;
        } else if (size > 800 && size < 1025) {
            adsParams.image = 'https://cdn.flashtalking.com/42249/assets/bg_transparent.png?'+bgRandom;
        } else if (size <= 800) {
            adsParams.image = 'https://cdn.flashtalking.com/42249/assets/bg_transparent.png?'+bgRandom;
        }
        if(typeof adsParams.background_image!="undefined")
            adsParams.image=adsParams.background_image;
        // Funci?n de gesti?n del evento del click
       // setupBodyBackground(adsParams);
        if(adsParams.background_src!="")
            loadFTCreative(adsParams.background_src,adsParams.banner_ftdiv,adsParams.banner_size,winRef,adsParams.click,adsParams.expand,adsParams.viewTrack);
    }

    function serveSkinExp(targetDiv,adsParams) {
        var document=winRef.document;
        targetDiv.style.position="relative";
        var subDiv=document.createElement("div");
        subDiv.style.position="absolute";
        subDiv.id="ftdiv"+adsParams.banner_ftdiv;
        targetDiv.appendChild(subDiv);
        adsParams.image=adsParams.background_image;
        
        setupBodyBackground(adsParams);
        loadFTCreative(adsParams.banner_src,adsParams.banner_ftdiv,adsParams.banner_size,winRef,adsParams.click,adsParams.expand,adsParams.viewTrack);
    }

    function setupBodyBackground(adsParams) {
        if(sc_href.match(/todotest/)||sc_href.match(/fourfourtwo/)||sc_href.match(/autopista/)||sc_href.match(/motociclismo.es/)||sc_href.match(/ecuestre.es/)||sc_href.match(/revistaoxigeno.es/)||sc_href.match(/trailrun/)||sc_href.match(/triatlon/)||sc_href.match(/sportlife/)||sc_href.match(/womenshealth/)||sc_href.match(/soycorredor/)||sc_href.match(/runners.es/)||sc_href.match(/menshealth/)){
            sc_body.className += ' wallpaper-web';
            sc_body.style.backgroundPosition = "50% 0%";
            noClick=true;
        }
        else if(sc_href.match(/libertaddigital/) || sc_href.match(/libremercado/)) {
            ////////INFINITY SCROLL PUBLISHER EXEPTIONS////////
            var infinParm = {
                infBodyLayer: 'infinito',
                new_page: '.contenedor.interior'
            }
            ////////end/INFINITY SCROLL PUBLISHER EXEPTIONS////////
            //makeNewBody(adsParams, infinParm);
            sc_body.style.backgroundPositionX = "50%";
            parent.publd.encaja_skin('scroll');

        }
        else {
            sc_body.style.backgroundPosition = "50% 0%";
        }

        // Test Dinamic Body -- Calling Make New Body Function
        if(typeof sc_creative.dinamic_body != 'undefined' && sc_creative.dinamic_body === 'yes'){
            makeDinamicBody(adsParams);

        }else {
            
        //Ecartelera exeption

            // if (document.location.href.match("ecartelera")) {
            //     var sc_style_background = document.createElement('style');
            //     sc_style_background.id = 'sc_style_background';
            //     sc_body.appendChild(sc_style_background);
            //     sc_style_background.innerHTML = `
            //         body{
            //             background-image: url('${adsParams.image}')!important;
            //             background-repeat: no-repeat!important;
            //             background-color: ${adsParams.backgroundColor}!important;
            //         }
            //     `
            // }

        //End Ecartelera exeption

            sc_body.style.cursor = 'default';
            sc_body.style.minHeight = "500px";
            sc_body.style.width = "100%";

            sc_body.style.setProperty('background-repeat', 'no-repeat', 'important');
            sc_body.style.setProperty('background-color', '' + adsParams.backgroundColor +'', 'important');
            sc_body.style.setProperty('background-attachment', '' + adsParams.attachment +'', 'important');
            
            if(typeof adsParams.image!="undefined")
                sc_body.style.setProperty('background-image', 'url(' + adsParams.image + ')', 'important');
            var skin_backGroundClick = function(e) {
                EE = e ? e : event;
                if (!EE)
                    return;
                var t = EE.target ? EE.target : EE.srcElement;
                if ((!t || t.tagName != "BODY"  ) && t.parentNode.tagName != "BODY")
                    return;
                var ad=winRef.open(adsParams.click+(typeof adsParams.destinationUrl==""?"":adsParams.destinationUrl), true);
            }
            // body.addEventListener("click", skin_backGroundClick);
            sc_body.addEventListener('click', function(e){
                if (String(event.target.classList).match('sc-rmp')) {
                    skin_backGroundClick(e);
                }
            });
        }
        // End Test Dinamic Body -- Calling Make New Body Function
    }

    function adjustContainer(adsParams,width){
        var document=winRef.document;
        setupBodyBackground(adsParams);
        var topDoc = winRef.document;
        // PRESET GENERAL
        var theTimer = setInterval(function() {
            element = winRef.document.getElementById('ftdiv' + adsParams.ftdiv);
            if (!element)
                return;
            element.style.width = width;
            element.style.height = adsParams.height + "px";
            element.style.margin = "0px auto";
            element.style.position = "relative";
            clearInterval(theTimer);
        }, 100);
    }

    function scBasicBodyParm(sc_new_page) {
        var mainBody = document.getElementsByTagName('BODY')[0];
        sc_body = document.createElement('div');
        if (sc_new_page != 'dinamic') {
             sc_body.classList.add('sc_body_box_' + sc_new_page.length);
        }else{
            sc_body.classList.add('sc_dinamic_body_box');
            document.querySelector('HTML').classList.add('sc_skin_dinamic_body');
        }
        mainBody.insertBefore(sc_body, mainBody.getElementsByTagName('DIV')[0]);
    }

    function makeNewBanner(adsParams, sc_new_page){
        if (sc_creative.serviceType.match('skinExp') && sc_new_page.length > 0) {
            var sc_billboard = document.getElementById('ftdiv' + adsParams.banner_ftdiv);
            var sc_iframe = document.getElementById('ftframe' + adsParams.banner_ftdiv);
            // var sc_billboard = document.querySelector('div[id^=ftdiv]');
            // var sc_iframe = document.querySelector('iframe[id^=ftframe]');
            if (sc_billboard.innerHTML != '') {
                sc_billboard.id = 'ftdiv' + adsParams.banner_ftdiv + '_new_' + sc_skin_exp_counter;
                sc_iframe.id = 'ftdiv' + adsParams.banner_ftdiv + '_new_' + sc_skin_exp_counter;
            }
            var newBanner = document.getElementById('ftdiv' + adsParams.banner_ftdiv + '_new_' + sc_skin_exp_counter);
            if (newBanner) {
                newBanner.style.top = sc_new_page[sc_new_page.length - 1].offsetTop - 320 + 'px';
            }
        }
        sc_skin_exp_counter++;
    }

    function makeNewBody(adsParams, infinParm){
        var sc_new_page = document.querySelectorAll(infinParm.new_page);
        makeNewBanner(adsParams, sc_new_page);
            if (sc_creative.serviceType.match('skin') && sc_new_page.length > 0) {
                scBasicBodyParm(sc_new_page);
                var newCurrentLayer = document.querySelector('.sc_body_box_' + sc_new_page.length);
                newCurrentLayer.style.backgroundPositionX = "50%";
                // For LD only where takes a place Lazy charge and the height is changing dynamically
                if(sc_href.match(/libertaddigital/) || sc_href.match(/libremercado/)) { 
                    document.addEventListener('scroll', function(){
                        newCurrentLayer.style.top = sc_new_page[sc_new_page.length - 1].offsetTop - 250 + 'px';
                        newCurrentLayer.style.height = sc_new_page[sc_new_page.length - 1].offsetHeight + 250 + 'px';
                    });
                }else {
                    newCurrentLayer.style.top = sc_new_page[sc_new_page.length - 1].offsetTop - 250 + 'px';
                    newCurrentLayer.style.height = sc_new_page[sc_new_page.length - 1].offsetHeight + 250 + 'px'; 
                }
            }
        var currentLayer = document.querySelector('.sc_body_box' + sc_new_page.length);
    }
    function makeDinamicBody(adsParams){
        console.log('dinamic background is loaded');
        if (sc_creative.serviceType.match('skin')) {
            scBasicBodyParm('dinamic');
            var newCurrentLayer = winRef.document.querySelector('.sc_dinamic_body_box');
            var bodyStyles = getComputedStyle(sc_body);
            console.log('Body styles: ', bodyStyles.width);
            winRef.document.body.style.transform = 'unset!important';
            winRef.document.body.style.left = 'unset!important';
            winRef.document.body.style.right = 'unset!important';
            newCurrentLayer.style.width = '100%';
            newCurrentLayer.style.height = '100%';
            newCurrentLayer.style.position = 'fixed';
            newCurrentLayer.style.backgroundSize = 'initial';
            newCurrentLayer.style.zIndex = '-1';
            newCurrentLayer.style.backgroundPositionX = "50%";
            newCurrentLayer.style.backgroundImage = 'url('+adsParams.image+')';
            newCurrentLayer.style.cursor = 'pointer';
            newCurrentLayer.style.backgroundRepeat = 'no-repeat';
            newCurrentLayer.style.top = '0px';
            var PxStyles = winRef.document.createElement('style');
            PxStyles.id = 'sc_dimBody';
            PxStyles.innerHTML = 'body{transform:unset!important;left:unset!important;right:unset!important;}';
            winRef.document.body.appendChild(PxStyles);
                    
            winRef.addEventListener('click', function(e){
                if (String(e.target.classList).match('sc_dinamic_body_box') || e.target.nodeName == 'BODY') {
                    var ad=winRef.open(adsParams.click+(typeof adsParams.destinationUrl==""?"":adsParams.destinationUrl), true);
                }
            })
        }
    }

    // scSkinCleaner is using for A3
    window.scSkinCleaner = function () {
        var sc_body = document.body;
        var sc_ftdivBg = document.getElementsByClassName('sc-ftdivBg')[0];
        try {
            sc_body.style.cursor = 'default';
            sc_body.style.minHeight = "none";
            sc_body.style.width = "100%";
            sc_body.style.background = "rgb(5, 4, 5)";
            sc_body.classList.remove("sc-atresplayer");
            sc_ftdivBg.remove();
        } catch(err){}
    }
};