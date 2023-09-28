(function () {
    var oniad_srcs = ['https://tag.oniad.com/640a0a7d-ce44-45c4-9e31-69ea22b64d0e/'];
    for (oniad_src of oniad_srcs) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = oniad_src;
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    }    
})();