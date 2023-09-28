//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
$(window).on('hashchange', function (e) {
    detailApp_OnChangeHash();
});
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
$(document).ready(function () {
    if (window.location.hash === undefined || window.location.hash == "" || window.location.hash == "#") {
        window.location.hash = detailApp_baseHash;
        //Bug #1486
        //zamedzenie scrollovania po otvoreni appky
        if (location.hash) {
            setTimeout(function() {

                window.scrollTo(0, 0);
            }, 1);
        }
        //neni nutne volat detailApp_OnChangeHash
    } else {
        detailApp_OnChangeHash();
    }
    //--------------------------------------------------------------------------------------------------
    function changeLinks(val) {
        if (val == "text") {
            $("#talinks1").show();
            $("#talinks4").hide();
            $("#talinks2").hide();
            $("#talinks3").hide();
            $("#talinks5").hide();
            $("#talinks6").hide();
        }
        if (val == "text2") {
            $("#talinks1").hide();
            $("#talinks4").show();
            $("#talinks2").hide();
            $("#talinks3").hide();
            $("#talinks5").hide();
            $("#talinks6").hide();
        }
        if (val == "button1") {
            $("#talinks1").hide();
            $("#talinks4").hide();
            $("#talinks2").show();
            $("#talinks3").hide();
            $("#talinks5").hide();
            $("#talinks6").hide();
        }
        if (val == "button2") {
            $("#talinks1").hide();
            $("#talinks4").hide();
            $("#talinks2").hide();
            $("#talinks3").show();
            $("#talinks5").hide();
            $("#talinks6").hide();
        }
        if (val == "lista1") {
            $("#talinks1").hide();
            $("#talinks4").hide();
            $("#talinks2").hide();
            $("#talinks3").hide();
            $("#talinks5").show();
            $("#talinks6").hide();
        }
        if (val == "lista2") {
            $("#talinks1").hide();
            $("#talinks4").hide();
            $("#talinks2").hide();
            $("#talinks3").hide();
            $("#talinks5").hide();
            $("#talinks6").show();
        }
    }


    $(".jshidden").hide();
    //-------------------------------------

    //-------------------------------------
    // stitky
    $("#boxtags header").click(function () {
        if (showtags) {
            $(this).css('background-position', 'left top');
            $("#boxtags div").slideUp(100);
            showtags = false;
        }
        else {
            $(this).css('background-position', 'left bottom');
            $("#boxtags div").slideDown(100);
            showtags = true;
        }
    });
    //-------------------------------------
    showlinks = false;
    $("#tblinks input:first").click();
    changeLinks("text");

    $("#boxlinks").show();
    $("#boxlinks div").hide();
    $("#boxlinks header").click(function () {
        if (showlinks) {
            $(this).css('background-position', 'left top');
            $("#boxlinks div").slideUp(100);
            showlinks = false;
        }
        else {
            $(this).css('background-position', 'left bottom');
            $("#boxlinks div").slideDown(100);
            showlinks = true;
        }
    });

    $("#boxlinks table div a").click(function () {
        $(this).parent().parent().parent().children("td").children("input").click();
        return false;
    });
    //-------------------------------------
    // fancybox
    $('#tableimages a').fancybox({
        'transitionIn': 'elastic',
        'transitionOut': 'elastic',
        'speedIn': 300,
        'speedOut': 200,
        'overlayShow': true,
        'overlayOpacity': 0.8,
        'overlayColor': '#000000'
    });
    //-------------------------------------

    $("#tblinks input").change(function () {
        changeLinks($(this).val());
    });

    //-------------------------------------
    $("#itemPreviewGalery img").click(function () {
        var position = $(this).data('position');
        window.location.hash = '#' + detailApp_imageHash;
        $("#tableimages a:eq(" + position + ")").click();
        $.scrollTo($("#tableimages a:eq(" + position + ")"));
    });

    $(".content.contentitemdetail .comments .info a.btReact, .content.contentitemdetail .comments .info a.reagovat").click(function(){
        $("#reakce").html(" ("+$(this).attr("title")+")");

        id = $(this).parent().parent().parent().attr("id").split("-", 2);
        text = $(this).parent().parent().children("div.comment").text();
        $("#reakce-text").html(text);

        $("#commentformparentid").val(id[1]);

        $.scrollTo($(".content.contentitemdetail .comments form", 0));
        return false;
    });
});
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
function detailApp_OnChangeHash() {
    var hashArray = window.location.hash.replace('#', '').split('-');
    var scrollToSelector = '#content';

    if (hashArray[0] != undefined && hashArray[0].length > 1) {
        var $blockEl = $('#content #' + hashArray[0]);

        if ($blockEl.length > 0) {
            var switchId = $blockEl.data('switchid');
            if (switchId.length > 0) {
                var $switchBlockEl = $('#content  #' + switchId);
                if ($switchBlockEl) {
                    $switchBlockEl.find('a').removeClass('active');
                    $switchBlockEl.find('a[data-blockhash="' + hashArray[0] + '"]').addClass('active');
                    if ($switchBlockEl.find('a[data-blockhash="' + hashArray[0] + '"]')) {
                        var title = $switchBlockEl.find('a[data-blockhash="' + hashArray[0] + '"]').data('title');
                        if (title != undefined && title.length > 0) {
                            document.title = title;
                        }
                    }
                }
            }
            if ($blockEl.data('scrollto') && $blockEl.data('scrollto').lenght > 0) {
                scrollToSelector = $blockEl.data('scrollto');
            }

            $('#content .content').not($blockEl).hide();
            $blockEl.show();

            var subId = "";
            var subIdHasDefault = false;

            if (hashArray[1] != undefined && hashArray[1].length > 0) {
                subId = hashArray[0] + '-' + hashArray[1];
            }else{
                var defaultSubId = $blockEl.data('defaultsubid');
                if(defaultSubId != undefined && defaultSubId.length > 0){
                    // default sub - nesmi se scrollovat!!!
                    console.log(defaultSubId);
                    subId = defaultSubId;
                    subIdHasDefault = true;
                }
            }

            if(subId.length > 0) {
                var $blockSubEl = $blockEl.find('#' + subId);
                if ($blockSubEl.length > 0) {
                    $blockSubEl.parent().children().not($blockSubEl).hide();
                    $blockSubEl.show();

                    var switchId = $blockSubEl.data('switchid');
                    if (switchId != undefined) {
                        var $switchBlockEl = $('#content  #' + switchId).first();
                        if ($switchBlockEl && $switchBlockEl.length > 0) {
                            $switchBlockEl.find('a').removeClass('active');
                            $switchBlockEl.find('a[data-blockhash="' + subId + '"]').addClass('active');
                            if ($switchBlockEl.find('a[data-blockhash="' + subId + '"]')) {
                                var title = $switchBlockEl.find('a[data-blockhash="' + subId + '"]').data('title');
                                if (title != undefined && title.length > 0) {
                                    document.title = title;
                                }
                            }

                            var $current = $switchBlockEl.find('a.active').first();
                            if ($current != undefined && $current.length > 0) {
                                // nastaveni prev/next
                                if ($current.data('prev') != undefined && $current.data('prev').length > 0) {
                                    $switchBlockEl.find('.btPrev').attr('href', $current.data('prev'));
                                }
                                if ($current.data('next') != undefined && $current.data('next').length > 0) {
                                    $switchBlockEl.find('.btNext').attr('href', $current.data('next'));
                                }
                            }
                        }
                    }

                    if (!subIdHasDefault && $blockSubEl.data('scrollto') != undefined) {
                        scrollToSelector = $blockSubEl.data('scrollto');
                    }

                }
            }
        }

        // scroll na spravnou pozici
        $.scrollTo(scrollToSelector);

    }
}