$(window).on('load', function(){

    //LAZY LOADING IMG
    if($("[data-src]").length){
        if(location.hostname.indexOf("shop") === -1 && location.hostname.indexOf("store") === -1 && location.hostname.indexOf("store-inte") === -1){
            $("[data-src]").unveil(200);
        }
    }
    
	// MENU MOBILE
	$(".hamburger-menu").click(function(){
		$(".navmobile").fadeToggle();
		$("header").css("z-index", "105");
        $("header").toggleClass("mobile");
        $("a#mobile-rappel-tel").fadeToggle("fast");
		$(this).toggleClass("close");
		$("body").toggleClass("noscroll");
	});

	$("#lng-popin").click(function(){
		$(".list-lng-popin").toggle();
	})

	$("#cross-close").click(function(){
		$("#lng-popin").fadeOut();
	})

    $("ul.sous-menu").hide();

    $('.mob_menu').on('click', function(){
       $(this).toggleClass('move').siblings().toggleClass('opacity');
       $(this).find("i").toggleClass('chevron-rotate');
       $(this).find("ul.sous-menu").fadeToggle();
       $(this).find("ul.sous-menu").find("li").hide().delay(850).fadeToggle("slow");
    });

    //envoi JSON pour checkbox popin cookie localstorage
    $('.cbx').on('click', function() {
      var fav, favs = [];
      $('.cbx').each(function() { // run through each of the checkboxes
        fav = {id: $(this).attr('id'), value: $(this).prop('checked')};
        favs.push(fav);
      });
      localStorage.setItem("favorites", JSON.stringify(favs));
    });

    $(document).ready(function() {
        if (localStorage.getItem('favorites') != null) {
            var favorites = JSON.parse(localStorage.getItem('favorites'));
            if (!favorites.length) {return};
            for (var i=0; i<favorites.length; i++) {
              $('#' + favorites[i].id ).prop('checked', favorites[i].value);
            }
        }
        $('#bandeau_header ul li.connexion').hover(function() {
            $('#bandeau_header ul li.connexion a svg').addClass('svg-hover');
        }, function() {
            $('#bandeau_header ul li.connexion a svg').removeClass('svg-hover');
        })

        $("#bandeau_header").hover(function(){
            $('.bg-hover').removeClass('hid');
        }, function() {
            $('.bg-hover').addClass('hid');
        });
    });
    //end

    $('.current-lng-header').click(function(){
        $('.list-lng-header').slideToggle();
    });

    $('.current-lng').click(function(){
        $('.list-lng').toggle('slide', {direction: 'down'}, 150);
    });

	$(".close-bandeau").click(function(){
		$(".bandeau").slideUp(200);
	});

	$('.tooltip').tooltipster({
		 animation: 'grow',
		 delay: 200,
		 side: 'bottom',
		 maxWidth: 300,
         contentAsHTML: true,
         interactive: true
	});

    $("#bandeauCookie").click(function(){
        document.cookie = "bandeauCookie=1";
        $("#cookiebar").slideToggle();
    });

    if (document.URL.indexOf("#")>=0){
        var mystring=document.URL.split("#");
        goToByScroll(mystring[1]);
    }


    $('#cookie_unchecked').click(function(){
        if ($('#cookie_unchecked').is(':checked')){
            $('#cookie_unchecked2').prop( "checked", true );
            $('#cookie_unchecked3').prop( "checked", true );
            document.cookie = "no_tracking=1";
            document.cookie = "no_affiliation=1";
            $('.suppr').css('color','#7CB261');
            $('.suppr2').css('color','#7CB261');
        } else{
            $('#cookie_unchecked2').prop( "checked", false );
            $('#cookie_unchecked3').prop( "checked", false );
            document.cookie = "no_tracking=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            document.cookie = "no_affiliation=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            $('.suppr').css('color','#89949b');
            $('.suppr2').css('color','#89949b');
        }
    });
    $('#cookie_unchecked2').click(function(){
        if ($('#cookie_unchecked2').is(':checked')){
            $('#cookie_unchecked').prop( "checked", false );
            document.cookie = "no_tracking=1";
            $('.suppr').css('color','#7CB261');
        } else{
            $('#cookie_unchecked').prop( "checked", false );
            document.cookie = "no_tracking=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            $('.suppr').css('color','#89949b');
        }

        if ($('#cookie_unchecked3').is(':checked')){
            $('#cookie_unchecked').prop( "checked", true );
            document.cookie = "no_tracking=1";
            document.cookie = "no_affiliation=1";
        }

        if (!$(this).is(':checked')){
            $('#cookie_unchecked').prop( "checked", false );
            document.cookie = "no_tracking=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        }
    });
    $('#cookie_unchecked3').click(function(){
        if ($('#cookie_unchecked3').is(':checked')){
            $('#cookie_unchecked').prop( "checked", false );
            document.cookie = "no_affiliation=1";
            $('.suppr2').css('color','#7CB261');
        } else{
            $('#cookie_unchecked').prop( "checked", false );
            document.cookie = "no_affiliation=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            $('.suppr2').css('color','#89949b');
        }

        if ($('#cookie_unchecked2').is(':checked')){
            $('#cookie_unchecked').prop( "checked", true );
            document.cookie = "no_tracking=1";
            document.cookie = "no_affiliation=1";
        }

        if (!$(this).is(':checked')){
            $('#cookie_unchecked').prop( "checked", false );
            document.cookie = "no_affiliation=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        }
    });

});


$(document).on('click', function(event) {
    if (!$(event.target).parent().hasClass("ssmenu")) {
        $(".ssmenu").removeClass("hover");
    }
});

if (navigator.userAgent.match(/(android|iphone|ipad|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi)) {
        if ( ((screen.width  >= 480) && (screen.height >= 800)) || ((screen.width  >= 800) && (screen.height >= 480)) || navigator.userAgent.match(/ipad/gi) ) {
            device="tablette";
        } else { device="mobile"; }
    } else { device="bureau"; }

var ua = navigator.userAgent,
    isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);

var OSName="Unknown OS";
if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

var gts = getCookie("gts_accepted");
var pageview = getCookie("PagesVues");

if (pageview <= 1 && gts != "1"){
    if($("#cookies").length > 0 && location.hostname.indexOf("shop") === -1 && location.hostname.indexOf("store") === -1 && location.hostname.indexOf("store-inte") === -1){
        $('#cookies').addClass("show");
    }
}

$('#cookies .refused').click(function(){
    setCookie("no_tracking", "1");
    setCookie("no_affiliation", "1");
    $('#cookies').addClass("hide");
    setInterval(function(){
        $('#cookies').hide();
    }, 1500);
});

$('#cookies .agree').click(function(){
    setCookie("gts_accepted", "1");
    $('#cookies').addClass("hide");
    setInterval(function(){
        $('#cookies').hide();
    }, 1500);
});

$("li.hoversub a").on("click", function(event){
    if ($(this).is("[disabled]")) {
        event.preventDefault();
    }
});

$("#email").on("blur keyup", function() {
  return checkEmail();
});
$("#password").on("blur keyup", function() {
  return checkPassword($("#password").val());
});
$("#password").on("click", function(){
    $("#conditions_mdp").slideDown();
});
$("#press").mousedown(function(){
  $("#password").attr("type","text");
});
$("#press").mouseup(function(){
  $("#password").attr("type","password");
});
$("#submitAccount").click(function(){
    if( checkEmail() && checkPassword($("#password").val()) && checkCGU() ){
        return true;
    } else {
        return false;
    }
});

$("#logRButton").click(function(){
    email = $("#emailloginR").val();
    password = $("#passloginR").val();
    soft = "MY";
    $.ajax({
    url: '/WebService/loginSALogged',
    type: 'POST',
    data: '{"email":"' + email + '", "password":"' + password + '", "soft": "' + soft + '"}',
    datatype: 'JSON',
    success: function(data) {
        response = JSON.parse(data);
        if (response.Error) {
            $(".errorlogR").fadeIn();
            return false;
        } else {
            $("#formPopinRapidmail").submit();   
            window.location = window.location.href;
        }
    },
    error: function(data){
        $(".errorlogR").fadeIn();
        return false;
    }
    });
});

$('body').click(function(e) {
    if($(e.target).hasClass('fa-user-circle')){
        $(".user-container").toggle()
    } else {
        $(".user-container").hide()
    }
})

/* $("#popin-marketing .close").click(function(){
    setCookie("pop_marketing", "1");
    $("#popin-marketing").hide();
}) */

$("#bulle_chat").click(function() {
    $("#popin-chatConsent").show();
    $('#checkBox-contentChat').css('opacity', 0);
    $('#checkBox-contentChat').css('visibility', 'hidden');
})

$("#popin-chatConsent .close").click(function() {
    $("#popin-chatConsent").hide();
})
 
$(document).on('click',"#axeptio_btn_dismiss", function(){ //Refus Axeptio
    setCookie("pop_axeptio", "0");
    $("#bulle_chat").show();
}); 

$(document).on('click',"#axeptio_btn_acceptAll", function(){ //Acceptation total Axeptio
    setCookie("pop_axeptio", "1");
    setTimeout(function(){
        $("#popin-marketing").show();
    }, 5500); 
    if (window.location.href.indexOf("demo") > -1) {
        var symbol = $("#videoBookADemo")[0].src.indexOf("?") > -1 ? "&" : "?";
        $("#videoBookADemo")[0].src += symbol + "autoplay=1";
    }
});  

