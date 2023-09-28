///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//-------------------Assessment slide next--------------------------------B

$(function () {
    $("input[name=checkbox-toggle-1]").on('change', function () {
        if ($(this).is(":checked")) {
            $(".sky-form .toggle input:checked + i").css({ "background-color": "#008FD3" });
            $('<style>.sky-form .toggle i::after{color:#fff!important}</style>').appendTo('head');
            $('<style>.sky-form .toggle i::before{background-color:#fff!important}</style>').appendTo('head');
            $("#regUrl").show();
            $('#regTable').show();
            // document.getElementById("regUrl", "regTable") = "visible";
        }
        else {
            $('<style>.sky-form .toggle i::after{color:#fff!important}</style>').remove();
            $('<style>.sky-form .toggle i::before{background-color:#fff!important}</style>').remove();
            $('<style>.sky-form .toggle i::after{color:#5f5f5f!important}</style>').appendTo('head');
            $('<style>.sky-form .toggle i::before{background-color:#999!important}</style>').appendTo('head');
            $(".sky-form .toggle input:focus + i").css({ "background-color": "#fff" });
            $("#regUrl").hide();
            $("#regTable").hide();
            // document.getElementById("regUrl", "regTable")= "hidden";
        }
    });

    var dvLength = $('div.slide').length;

    var counter = dvLength - dvLength + 1;

    $('.slide:first-child').addClass('activeSlide');


    $('.btnClickNext').click(function () {

        if ($('.slide:first-child').hasClass('activeSlide')) {
            $('.slide:first-child').removeClass('activeSlide').slideUp();
            $('.slide:first-child').next().addClass('activeSlide').show();
            slideHeading();

        } else if ($('.slide:last-child').hasClass('activeSlide')) {
            slideHeading();

        } else if ($('.slide').hasClass('activeSlide')) {
            $('.activeSlide').next().addClass('activeSlide').show().prev().removeClass('activeSlide').slideUp();
            slideHeading();
        }
    });


    //    Assessment slide back ---------------------B
    $('.btnClickPrev').click(function () {

        if ($('.slide:last-child').hasClass('activeSlide')) {
            $('.slide:last-child').removeClass('activeSlide').hide();
            $('.slide:last-child').prev().addClass('activeSlide').slideDown();
            slideHeading();
        } else if ($('.slide:first-child').hasClass('activeSlide')) {
            slideHeading();

        } else if ($('.slide').hasClass('activeSlide')) {
            $('.activeSlide').prev().addClass('activeSlide').slideDown().next().removeClass('activeSlide').hide();
            slideHeading();
        }
    });

});

