function init_viewport() {
    var dpr = window.devicePixelRatio;
    var dWith = document.documentElement.clientWidth;
    var dHtml = document.documentElement.style;
    dHtml.fontSize = dWith / 7.5 + "px";
    document.documentElement.setAttribute("data-dpr", dpr);
    if (dWith > 750) {
        dWith = 750;
    }
    dHtml.fontSize = (dWith / 7.5).toFixed(2) + "px";
    var html = document.getElementsByTagName('html')[0];
    var settedFs = settingFs = parseInt(html.style.fontSize);
    var whileCount = 0;
    while (true) {
        var realFs = parseInt(window.getComputedStyle(html).fontSize);
        var delta = realFs - settedFs;
        if (Math.abs(delta) >= 1) {
            if (delta > 0) settingFs--; else settingFs++;
            html.setAttribute('style', 'font-size:' + settingFs + 'px!important');
        } else
            break;
        if (whileCount++ > 100)
            break
    }
}

init_viewport();
window.onresize = function () {
    init_viewport();
}