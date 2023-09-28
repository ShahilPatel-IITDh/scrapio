
    var button = document.querySelector(".reciteme");

    button.addEventListener('click', function() {
        loadService();
        return false;
    });

    var serviceUrl = "//api.reciteme.com/asset/js?key=";
    var serviceKey = "51a5a157bea02cc1dffd4b3967eb3099d681cc32";
    var options = {};  // Options can be added as needed
    var autoLoad = false;
    var enableFragment = "#reciteEnable";

    var loaded=[],frag=!1;window.location.hash===enableFragment&&(frag=!0);function loadScript(c,b){var a=document.createElement("script");a.type="text/javascript";a.readyState?a.onreadystatechange=function(){if("loaded"==a.readyState||"complete"==a.readyState)a.onreadystatechange=null,void 0!=b&&b()}:void 0!=b&&(a.onload=function(){b()});a.src=c;document.getElementsByTagName("head")[0].appendChild(a)}function _rc(c){c+="=";for(var b=document.cookie.split(";"),a=0;a<b.length;a++){for(var d=b[a];" "==d.charAt(0);)d=d.substring(1,d.length);if(0==d.indexOf(c))return d.substring(c.length,d.length)}return null}function loadService(c){for(var b=serviceUrl+serviceKey,a=0;a<loaded.length;a++)if(loaded[a]==b)return;loaded.push(b);loadScript(serviceUrl+serviceKey,function(){"function"===typeof _reciteLoaded&&_reciteLoaded();"function"==typeof c&&c();Recite.load(options);Recite.Event.subscribe("Recite:load",function(){Recite.enable()})})}"true"==_rc("Recite.Persist")&&loadService();(autoLoad&&"false"!=_rc("Recite.Persist")||frag)&&loadService();

