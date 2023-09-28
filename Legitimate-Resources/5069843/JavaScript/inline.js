
    $.ajaxSetup({
        cache: true,
    });
    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.js", function (script, status) {
        new WOW().init();
    });
