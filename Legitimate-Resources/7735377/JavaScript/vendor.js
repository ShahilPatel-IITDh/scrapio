
let backTop = $('#backTop');
if(backTop.length > 0) {
    function backTopShow() {
        if(window.scrollY == 0) return backTop.removeClass('show');
        backTop.addClass('show');
    }
    if(backTop && window.scrollY > 0) backTop.addClass('show');
    if(backTop) {
        backTop.click(function(){
            $("html, body").stop().animate({scrollTop:0}, 500, 'swing');
        });
    }
}
let accessAcount = $('#accessAcount');
if(accessAcount.length > 0) {
    var prevScrollpos = window.pageYOffset;
    var accessAcountTimeOut = null;
    if($('#marcas').hasClass('fixed-bottom'))
        accessAcount.addClass('pb-5');
    function accessAcountShow() {
        var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos || currentScrollPos < 50) {
            prevScrollpos = currentScrollPos;
            return document.getElementById("accessAcount").style.bottom = "15px";
        }
        prevScrollpos = currentScrollPos;
        document.getElementById("accessAcount").style.bottom = "-160px";
        if(accessAcountTimeOut != null) clearTimeout(accessAcountTimeOut);
        accessAcountTimeOut = setTimeout(function(){
            return document.getElementById("accessAcount").style.bottom = "15px";
        }, 5000)
    }

}
window.onscroll = function() {
    if(backTop.length > 0) backTopShow();
    if(accessAcount.length >0 && window.innerWidth < 992) accessAcountShow();
};

$.fn.sidenav = function(options) {
    if(!this[0]) return;
    options = _.merge({
        width: '100%',
        target: 'mySidenav',
        bg: true
    }, options, this[0].dataset)
    function getDirection() {
        return options.rtl? 'right': 'left';
    }
    function getAction() {
        if(!options.slide)
            return 'width';
        return getDirection();
    }
    function getWidth() {
        return !options.slide? options.width: '0';
    }
    if(options.rtl) {
        document.getElementById(options.target).style.left = 'auto';
        document.getElementById(options.target).style.right = '-1px';
    }
    if(options.slide) {
        document.getElementById(options.target).style[getDirection()] = '-' + options.width;
        document.getElementById(options.target).style.width = options.width;
    }
    this.click(function(e) {
        e.preventDefault();
        document.getElementById(options.target).style[getAction()] = getWidth();
        $(document.body).addClass('sidenavshow');
    });

    var close = function(){
        document.getElementById(options.target).style[getAction()] = options.slide? '-' + options.width: '0';
        $(document.body).removeClass('sidenavshow');
    };
    var targetEl = $('#' + options.target);
    if(options.bg) {
        targetEl.before('<div class="sidenavbg"></div>');
    }
    $('.sidenavbg').click(close);
    targetEl.find('>a').each(function (){
        if($(this).data('target') === undefined) {
            $(this).click(close)
            return;
        }
        $(this).sidenav({
            slide: true,
            rtl: true,
            bg: false
        });
    });
    return this;
}
$('#hamburger').sidenav({
    slide: true,
    rtl: true
});

AOS.init();
if ($("#accessAcount")[0]) {
    $(window).scroll(function () {
        $("#accessAcount").addClass("show-me");
        clearTimeout($.data(this, 'scrollTimer'));
        $.data(this, 'scrollTimer', setTimeout(function () {
            $("#accessAcount").removeClass("show-me");
        }, 2500));
    });
}
$("a, .event-link").click(function () {
    var attr = $(this).attr('data-event');
    if (typeof attr !== typeof undefined && attr !== false) {
        dataLayer.push({
            'event': $(this).attr('data-event'),
            'categoria': $(this).attr('data-categoria'),
            'acao': 'click',
            'rotulo': $(this).attr('data-rotulo')
        });
    }
});