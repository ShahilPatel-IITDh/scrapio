    var isMobile = false;
(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) isMobile = true; })(navigator.userAgent || navigator.vendor || window.opera);

    $(document).ready(function () {


    //Online Banking Click
    $("a[name='onlineBankingButton']").on("click", (function (e) {
        //var username = $("#loginName").val();
        //if (username.length == 0) {
        //    $("#loginName").css('border', '2px solid red');
        //} else {
        //    window.location.replace("https://dna.communityfirstcu.org/2269/login.aspx?UID=" + username);
        //}
        window.location.replace("https://digital.communityfirstcu.org/login");
    }));

    // Code for the Carousel
    $(".regular").slick({
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [
            {
                breakpoint: 1420,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    autoplay: true
                }
            },
            {
                breakpoint: 1135,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true
                }
            },
            {
                breakpoint: 855,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true
                }
            },
            {
                breakpoint: 577,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true
                }
            }
        ]
    });

    //Stops scrolling of background when nav is open
    $(".navbar-toggler").click(function () {
        $("main").toggleClass("fixed");
        $("footer").toggleClass("fixed");
    });



    //Adds class of active if on current page
    $(document).ready(function () {
        var location = window.location.href;
        $('#topheader li a').each(function () {
            if (location.indexOf(this.href) > -1) {
                $(this).parent().addClass('active');
            }
        });
    });

    var rangeSlider = function () {
        var slider = $('.range-slider'),
            range = $('.range-slider-range'),
            value = $('.range-slider-value');

        slider.each(function () {
            value.each(function () {
                var value = $(this).prev().attr('value');
                $(this).html(value);
            });

            range.on('input', function () {
                $(this).next(value).html(this.value);
            });
        });
    };

    rangeSlider();


    $('[id^=less-information-]').click(function () {
        var id = this.id.split('-').pop();
        $("#hide-show-" + id).hide();
        $("#more-information-" + id).removeAttr("hidden");
        $("#less-information-" + id).attr("hidden", "hidden");
    });

    $('[id^=more-information-]').click(function () {
        var id = this.id.split('-').pop();
        $("#hide-show-" + id).show();
        $("#less-information-" + id).removeAttr("hidden");
        $("#more-information-" + id).attr("hidden", "hidden");
    });


});

$(function () {
    var hash = window.location.hash;
    hash && $('ul.nav a[href="' + hash + '"]').tab('show');

    $('.nav-tabs a').click(function (e) {
        $(this).tab('show');
        var scrollmem = $('body').scrollTop();
        window.location.hash = this.hash;
        $('html,body').scrollTop(scrollmem);
    });
});

function showAlertModal() {
    $('#alertModal').modal('show');
}


function calculateButton(item) {
    $(".monthly").fadeOut(1000);
}

$('a').click(function (e) {
    var url = window.location.pathname;
    var urlNavigatingTo = this.href;

    var hash = this.hash;
    var containsPage = urlNavigatingTo.indexOf(url);
    if (hash !== null) {

        if (containsPage > -1) {
            var hashLength = hash.split('#').length - 1;
            if (hashLength === 2) {
                var hashSplit = hash.split('#');
                hash && $('a[href="#' + hashSplit[1] + '"]').tab('show');
                //hash && $('#collapse-' + hashSplit[1]).collapse('show');
                //$(window).scrollTop("#" + hashSplit[2]);
                $('html, body').animate({
                    scrollTop: $("#" + hashSplit[2]).offset().top
                }, 100);
                //window.location.hash = hashSplit[2];
            } else {
                if (!isMobile){
                // Show 
                    hash && $('a[href="' + hash + '"]').tab('show');
                }


                // Open Collapse (Mobile)
                hash && $('#collapse-' + hash.substring(1, hash.length)).collapse('show');
                //window.scrollTo(0, 0);
            }

        }
    }
});

$(document).ready(function () {
    var hash = window.location.hash;

    if (hash !== null) {
        var hashLength = hash.split('#').length - 1;
        if (hashLength === 2) {
            var hashSplit = hash.split('#');
            hash && $('a[href="#' + hashSplit[1] + '"]').tab('show');
            hash && $('#collapse-' + hashSplit[1]).collapse('show');
            //$(window).scrollTop("#" + hashSplit[2]);
            $('html, body').animate({
                scrollTop: $("#" + hashSplit[2]).offset().top
            }, 2000);
        } else {
            var hashReplace = hash.replace('#', '');
            hash && $('a[href="#' + hashReplace + '"]').tab('show');
            hash && $('#collapse-' + hashReplace).collapse('show');
        }
    }
    $('.tab-pane').addClass('show-tab');
});


// Loads IFrame in Accordian Dynamically
function LoadIFrame(item) {
    var card = $($(item).attr('data-target')).find('.card-body');
    if (card.find('.iframe-wrapper')) {
        var iFrame = card.find('.iframe-wrapper').find('iframe');
        iFrame.attr('src', card.find('.iframe-wrapper').attr('data-url'));

        if (document.body.clientWidth < 768) {
            iFrame.attr('height', card.find('.iframe-wrapper').attr('data-mobile-height'));
        }
    }
}

$(document).ready(function() {
    $('[id*="Modal_close"]').click(function(e) {
        var cookie = $('[id*="modalCookie"]').val();
        if (cookie) {
            var d = new Date();
            d.setTime(d.getTime() + (5 * 24 * 60 * 60 * 1000));

            var expires = "expires=" + d.toUTCString();
            document.cookie = cookie + "=" + "true;" + expires + ";path=/";
        }
    });

});

$(document).ready(function () {
//Pop Up disclaimer for external links
$(".external-site-popup").on("click", function () {
    var confirmValue = confirm("You are about to leave the Community First Credit Union website and enter a linked site.  This link is provided for your convenience and should not be considered as an endorsement of the products, services or information provided, or an assurance of the security provided at the linked site.  Community First's privacy policy does not apply to linked websites.  Would you like to continue?");
    if (confirmValue != true) {
        event.preventDefault();
    }
});

});


// Button jump to new tab
//function JumpTab(item) {
//    if ($(item).attr('data-reload') === 'True') {
//        var hash = item.hash;
//        var hashLength = hash.split('#').length - 1;
//        if (hashLength === 2) {
//            var hashSplit = hash.split('#');
//            hash && $('a[href="#' + hashSplit[1] + '"]').tab('show');
//            window.location.hash = hashSplit[2];
//        } else {
//            // Show Tab
//            hash && $('a[href="' + hash + '"]').tab('show');

//            // Open Collapse (Mobile)
//            hash && $('#collapse-' + hash.substring(1, hash.length)).collapse('show');
//        }


//    }
//}


//Sets cookie when 'Got it' is clicked

//$("#tourclose").click(function () {

//    var d = new Date();
//    var dc = document.cookie;

//    d.setTime(d.getTime() + (5 * 24 * 60 * 60 * 1000));

//    var expires = "expires=" + d.toUTCString();

//    document.cookie = "tourclose" + "=" + "true;" + expires + ";path=/";
//    //window.location.reload();

//});


//function getCookie(tourclose) {
//    var name = tourclose + "=";
//    var decodedCookie = decodeURIComponent(document.cookie);
//    var ca = decodedCookie.split(';');
//    for (var i = 0; i < ca.length; i++) {
//        var c = ca[i];
//        while (c.charAt(0) == ' ') {
//            c = c.substring(1);
//        }
//        if (c.indexOf(name) == 0) {
//            return c.substring(name.length, c.length);
//        }
//    }
//    return "";
//}

//function checkCookie() {
//    var tourclosecookie = getCookie("tourclose");
//    if (tourclosecookie != "") {
//        $(".modal-backdrop").addClass("cookie");
//        alert("cookie stored");
//    } else {
//        $(".modal-backdrop").addClass("nocookie");
//        alert("no cookie");
//    }
//}


