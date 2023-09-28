

var YogaSliderAdJs = {
    
    
    init: function(){
        console.log('YogaSliderAdJs.init');
        
        /*
        not supported yet
        see index_desktop.php
            SiteData::addPageJavascript($content_generator->getJavascript_yogaSliderAd());
            SiteData::addPageContent('yoga_slider_ad', $yoga_slider_ad['html']);
            
            
        also see   sftp://174.129.5.112:22//ebsvol/prime/sites/contenttest.primecp.com/html/site_templates/6001/js/header-scroll.js
        for a sample static js file for this tpl
            
        */
        
    }
    
}









// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    //console.log('DOMContentLoadedCallback called');
    
    
    if(typeof YogaSliderAdJs != "undefined"  &&  typeof YogaSliderAdJs.init != undefined){
        YogaSliderAdJs.init();
    }else{
        console.log('no YogaSliderAdJs init');
    }
    
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    //console.log('DOM loaded 2');
    DOMContentLoadedCallback();
} else {
    //console.log('DOM loaded 1');
    document.addEventListener("DOMContentLoaded", DOMContentLoadedCallback);
}
