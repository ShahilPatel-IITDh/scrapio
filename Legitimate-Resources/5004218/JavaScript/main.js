function checkIE () {
    if ($.browser.msie && parseInt ($.browser.version) < 8) {
        var browsers = '<a href="http://windows.microsoft.com/pl-PL/internet-explorer/download-ie" title="" target="_blank"><img src="css/ie_latest.png" alt="browser" /></a>';
        browsers += '<a href="http://www.mozilla.org/pl/firefox/new/" title="" target="_blank"><img src="css/ff_latest.png" alt="browser" /></a>';
        browsers += '<a href="http://www.opera.com/portal/choice/?language=pl" title="" target="_blank"><img src="css/op_latest.png" alt="browser" /></a>';
        browsers += '<a href="http://www.google.com/intl/pl/chrome/browser/" title="" target="_blank"><img src="css/ch_latest.png" alt="browser" /></a>';
        $('<div id="bad_version">Używasz <u>nieobsługiwanej wersji przeglądarki</u>. Pobierz najnowszą wersję przeglądarki: ' + browsers + '</div>').prependTo ('body');
    } else {
        return false;
    }
}

function updateInputs () {
    $('#order input[type="radio"]').parent ().parent ().removeClass ('active');
}

// @function initializeContactForm
// @descr
//  Funkcja inicjalizuje obsluge formularza kontaktowego, czyli:
//      - zwijanie/rozwijanie calego formularza na wcisniecie przycisku "Wypelnij formularz kontaktowy"
//      - zmiane adresu wysylki formularza po zmianie odbiorcy
//      - obsluge widocznosci pola "Temat" tylko dla kontaktu z supportem
// @input
//  -
// @output
//  -

function initializeContactForm () {
    "use strict";

    var $box, $form, $formToggler, $recipients;

    $formToggler = $("#contact-button");

    $box = $("#contact-form"); // uwaga - #contact-form wskazuje na element div!
    $form = $box.find ("form");
    $recipients = $form.find ("#contact-recipient");

    // wcisniecie przycisku "Wypelnij formularz kontaktowy" zwija/rozwija box z formularzem
    $formToggler.on ("click", function (event) {
        event.preventDefault ();
        $box.slideToggle ();
    });

    $recipients.
        // zmiana odbiorcy powoduje:
        //  - zmiane adresu, na ktory wysylamy formularz
        //  - obsluge widocznosci pola "Temat" tylko dla kontaktu z supportem
        on ("change", function () {
            var value;

            value = $(this).val ();

            $form.attr ("action", $form.data ("actions")[value]);

            $form.find ("input[name=title]").closest ("tr").toggle(value === "support");
        }).
        // uruchamiamy powyzszy handler by nalozyc wszystkie efekty dla zaznaczonej domyslnie w HTMLu opcji
        triggerHandler ("change");
}

var _al = false;

function scrollWin () {
    $('html,body').stop ();

    if (!_al) {
        _al = true;

        $('html,body').animate ({
            scrollTop: $("#register").offset ().top
        }, 600, function () {
            _al = false;
        });
    }
}

$(document).ready (function () {
    $("html").css ('min-width', $(document).width ());
    checkIE ();
    $('#register').hide ();
    updateInputs ();
    initializeContactForm ();

    $('input[type="radio"]').parent ().click (function () {
        if (!_al) {
            updateInputs ();
            $('.button-box').hide ();

            if (!$('#register').parents ('form').hasClass ('autosubmit')) {
                $('#register').slideDown ();
                scrollWin ();
            }

            $('.channels label').removeClass ('active');
            $(this).parents ('label').addClass ('active');

            setTimeout (function () {
                if ($('#register').parents ('form').hasClass ('autosubmit')) {
                    $('#register').parents ('form').submit ();
                }
            }, 500);
        }
    });

    $('.channels input[type="radio"]').addClass ('hid');

    $('.channels input[type="radio"]').parent ().hover (
            function () {
                if (!$(this).hasClass ('disabled'))
                    $(this).addClass ('hover');
            },
            function () {
                $(this).removeClass ('hover');
            }
    );

    $('#tr-type-submit').click (function (event) {
        event.preventDefault ();
        $('.button-box').hide ();
        $('#register').slideToggle ();
        scrollWin ();
    });

    $('.tooltip:not(.tooltip-replaced)').each (function (k, v) {
        var t = $(v).html ();

        $(v).text ('').append (
                $('<span class="icon"/>')
                ).append (
                $('<span class="tip"/>').hide ().html (t)
                ).addClass ('tooltip-replaced');
    }).mouseenter (function () {
        $(this).children ('.tip').show ();
    }).mouseleave (function () {
        $(this).children ('.tip').hide ();
    });
});
