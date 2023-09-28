
    LR.handleAsyncScript('oewa', function() {
        loadScript('//script-at.iocnt.net/iam.js', true, document.getElementById('script-oewa'),function() {
            if (iom && iom.c) {
                iom.c(oewaData,2);
            }
        });
    });
