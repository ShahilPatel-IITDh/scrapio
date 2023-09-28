class CindurImpressionTracker {
    constructor() {

        if(typeof window.tlintr == 'undefined') return;

        let nodes = document.querySelectorAll('.cindurImpressionID');

        nodes.forEach(
            (node, index) => {
                // defined in https://api.tigrelist.com/js/intr.js
                window.tlintr('ad_impression', node.dataset.id);
            }
        );
    }

    
}






// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    //console.log('DOMContentLoadedCallback called');
    
    if(typeof CindurImpressionTracker != "undefined"  &&  typeof CindurImpressionTracker.init != undefined){
        const ImpObj = new CindurImpressionTracker();
    }else{
        //console.log('DOMContentLoadedCallback -- no CindurImpressionTracker init');
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
