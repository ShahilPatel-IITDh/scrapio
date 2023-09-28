/*****************************************************

    poste-it.js - (c) Poste Italiane 2016/2017/2018 - GD//FS//DU

*****************************************************/

/******************/

/* Nascondi il link "Mostra tutti i prodotti/servizi" */

/******************/
$(document).ready(function () {

   $(document).on("click", "#showproduct", function () {
       hide(this);
       writeLog("Show product");
   });

   $(document).on("click", "#showservices", function () {
       hide(this);
       writeLog("Show services");
   });

});



/******************/

/* Basic function hide/show */

/******************/
function show(target) {
    $(target).addClass('show');
}

function hide(target) {
    $(target).addClass('hide');
}


/******************/

/* Remove video on xs/sm */

/******************/
function videoControlmq(myVideo, myCutpoint) {
    if (!($('html').hasClass('pi-mobile'))) {
        if (($(myVideo).length > 0)) {
            if (mq_Detect == myCutpoint) {
                $(myVideo).each(function () {

                    if ($(".azuremediaplayer").length > 0) {
                        var myVideoId_cdn_xs = $(".azuremediaplayer video").attr('id');
                        amp(myVideoId_cdn_xs).pause();

                    } else {
                        var myVideoId = $(this).attr('id');
                        var myVideoSrc = $('#' + myVideoId + ' source').attr('src');

                        $('#' + myVideoId + ' source').attr('rel', myVideoSrc);
                        $('#' + myVideoId + ' source').removeAttr('src');
                        $('#' + myVideoId).load();
                    }
                });
            } else {
                $(myVideo).each(function () {
                    if ($(".azuremediaplayer").length > 0) {
                        var myVideoId_cdn_lg = $(".azuremediaplayer video").attr('id');
                        amp(myVideoId_cdn_lg).play();

                    } else {
                        var myVideoId = $(this).attr('id');
                        var myVideoRel = $('#' + myVideoId + ' source').attr('rel');

                        $('#' + myVideoId + ' source').attr('src', myVideoRel);
                        $('#' + myVideoId + ' source').removeAttr('rel');
                        $('#' + myVideoId).load();
                    }
                });
            }
        }
    }
}

/******************/

/* Sticky Spalla dx */

/******************/

function startBracketSticky() {
    if (stLi != '' && stickFromTop != '') {
        $('#bracket').hcSticky({
            followScroll: false,
            stickTo: stLi,
            offResolutions: -992,
            top: stickFromTop
        });
    }
}



/******************/

/* Sticky Spalla dx */

/******************/

$(document).ready(function () {
    $("select").change(function () {
        $(this).find("option:selected").each(function () {
            if ($(this).attr("value") == "red") {
                $(".box").not(".red").hide();
                $(".red").show();
            } else if ($(this).attr("value") == "green") {
                $(".box").not(".green").hide();
                $(".green").show();
            } else if ($(this).attr("value") == "blue") {
                $(".box").not(".blue").hide();
                $(".blue").show();
            } else {
                $(".box").hide();
            }
        });
    }).change();
});


/******************/

/* Avviso legale su Carosello */

/******************/
var msgOnBanner = true;

function putMsgOnBanner(tgt, container, msg) {
    writeLog('msgOnBanner = ' + msgOnBanner);
    if (msgOnBanner) {
        var myDefaultText = "Messaggio pubblicitario con finalit&agrave; promozionale."
        if ((msg == '') || (msg == null)) {
            msg = myDefaultText;
        }
        if ((container == '') || (container == null)) {
            container = 'banner-advice';
        }
        $(tgt).append('<div class="' + container + '"><p>' + msg + '</p></div>');
    }
}



/******************/

/* Test Dots on submenu */

/******************/



/*
$(function () {



    var totalWidth = 0;
    var countMyDots = 0;
    var menu = $('#anchor-submenu');
    var menuWidth = menu.innerWidth();
    var myMarginSpace = 20; // margin-left
    var myContentDotSpace = 5 + 5 + 10; // 5px padding + 5px padding + 10 px content

    var myHtmlDotTemplate = ("<ul><li class='myDot-element relative'><button id='dLabel' data-target='dropdown-menuDot' type='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>...<span class='caret'></span></button> <ul class='dropdown-menu dropdown-menuDot' aria-labelledby='dLabel'></ul></li></ul>");

    var mymenu = menu.find('li').each(function (myIndex) {
        totalWidth += $(this).outerWidth() + myMarginSpace;

        if (totalWidth > menuWidth - (myMarginSpace + myContentDotSpace)) {
            if (countMyDots == 0) {
                writeWarning(myIndex);
                $(this).before(myHtmlDotTemplate);
                $(myHtmlDotTemplate).appendTo('.anchor-submenu');
                countMyDots = 1;
                $(this).addClass('overflowed-element');
                $(this).clone().appendTo(".dropdown-menuDot");
            } else {
                $(this).addClass('overflowed-element');
                $(this).clone().appendTo(".dropdown-menuDot");
            }

            //$(this).next().hide();
            //return false; // Abort loop
        }

    });

});




SU CSS


#anchor-submenu{
    overflow: hidden;
    white-space: nowrap;
}




*/
