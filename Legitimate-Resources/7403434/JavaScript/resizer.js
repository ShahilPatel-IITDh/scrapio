var mrf_resized = document.location.href.indexOf('mrf=1') !== -1;

window.matchMedia("(max-width: 480px)").addListener(function(query) {
    if (query.matches && !mrf_resized) {
        mrf_resized = true;

        if (marfeel && marfeel.GardaC && marfeel.GardaC.redirectToMarfeel) {
            marfeel.GardaC.redirectToMarfeel();
        } else {
            var sep =  (document.location.href.indexOf('?') === -1) ? '?' : '&';
            document.location.href = document.location.href + sep + 'mrf=1';
        }
    } else if (!query.matches && mrf_resized) {
        mrf_resized = false;
        document.location.href = document.location.href.replace('mrf=1', '');
    }
});