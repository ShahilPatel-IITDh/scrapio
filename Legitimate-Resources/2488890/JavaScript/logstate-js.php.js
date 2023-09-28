window.diy = window.diy || {};
window.diy.context = window.diy.context || {};
window.diy.context.type = 'web';
window.diy.context.isLoggedIn = false;
window.diy.context.isPublicView = /publicview=1/.test(location.search);
window.diy.context.isMobilePreviewView = /mobilepreview=1/.test(location.search);

(function () {
    var loadResourcesInterval = setInterval(function () {
        if (typeof jQuery === 'undefined') {
            return;
        } else {
            clearInterval(loadResourcesInterval);
            if (location.search.indexOf('logincallout=1') != -1) {
                jQuery("<link/>", {
                    rel: "stylesheet",
                    type: "text/css",
                    href: jimdoData.cdnUrl + "s/css/web/logincallout.css?1691907514"
                }).appendTo("head");
                jQuery.getScript(webPath + 'cc/logincallout.php');
            }
        }
    }, 100);
}());

