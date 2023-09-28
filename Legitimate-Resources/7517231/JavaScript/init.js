(function (win, doc) {
    'use strict';

    var html = doc.documentElement;
    var isIE11 = doc.uniqueID && win.matchMedia && !doc.selection;
    var showDialogFlg = true;

    if (isIE11) {
        html.classList.add('is-ie11');
    }

    html.classList.add('js-enabled');
    html = null;
    isIE11 = null;

    function onBeforeunload(e) {
        if (showDialogFlg) {
            e.preventDefault();
            e.returnValue = ''; // Chrome対応

            return '';
        }

        return undefined;
    }

    win.setShowDialog = function (flg) {
        showDialogFlg = flg;
    };

    win.addEventListener('beforeunload', onBeforeunload);
}(window, window.document));
