//bannery sitelement advara
function runAd() {
   var m3_u = (location.protocol=='https:'?'https://ad.novara.sk/www/delivery/ajs.php':'http://ad.novara.sk/www/delivery/ajs.php');
   var m3_r = Math.floor(Math.random()*99999999999);
   if (!document.MAX_used) document.MAX_used = ',';
   document.write ('<div class="banner" id="zoneid66">');
   document.write ("<scr"+"ipt type='text/javascript' src='"+m3_u);
   document.write ("?zoneid=66");
   document.write ('&amp;cb=' + m3_r);
   if (document.MAX_used != ',') document.write ("&amp;exclude=" + document.MAX_used);
   document.write (document.charset ? '&amp;charset='+document.charset : (document.characterSet ? '&amp;charset='+document.characterSet : ''));
   document.write ("&amp;loc=" + escape(window.location));
   if (document.referrer) document.write ("&amp;referer=" + escape(document.referrer));
   if (document.context) document.write ("&context=" + escape(document.context));
   if (document.mmm_fo) document.write ("&amp;mmm_fo=1");
   document.write ("'><\/scr"+"ipt>");
   document.write ("<\/div>");
}

function checkAdBox(adboxid, max_height, times) {
    var obj = document.getElementById(adboxid);
    if (obj != null) {
	var height = obj.clientHeight;
	if (height <= max_height) {
	    console.log('RunAD');
	    runAd();
	    times = 0;
	}
    }
    times--;
    if (times > 0) {
	setTimeout("checkAdBox('"+adboxid+"', "+max_height+", "+times+");", 500);
    }
}

// \koniec bannery

$(document).ready(function() {
	$("html").removeClass("no-js");
	$("ul li:first-child").addClass('first');
	$("ul li:last-child").addClass('last');


	$('.level1-sel1').parent('li').prev().children('.level1').addClass('level1-prev');
	$('.level1-sel1').parent('li').next().children('.level1').addClass('level1-next');


	// accordion
	$('.reakcia-list-title').click(function() {
		var checkElement = $(this).next();
		if(checkElement.is(':visible')) {
		  	$(this).removeClass('reakcia-list-open');
		  	checkElement.slideUp('fast');
		}
		if(!checkElement.is(':visible')) {
			$('.reakcia-list-open').removeClass('reakcia-list-open').next().slideUp('fast');
			$(this).addClass('reakcia-list-open');
		  	checkElement.slideDown('fast');
		}
		return false;
	});


    $('.toggle-item').hide();
    $('.link').click(function(){
      $(this).next('.toggle-item').slideToggle(250);
      $(this).text($(this).text() == 'Zobraziť odpoveď' ? 'Skryť odpoveď' : 'Zobraziť odpoveď');
      return false;
    });
    $('.lib-item').hide();
	$('.lib-link').click(function() {
		var checkElement = $(this).next('.lib-item');
		if(checkElement.is(':visible')) {
		  	$(this).removeClass('lib-link-open');
		  	checkElement.slideUp('fast');
		}
		if(!checkElement.is(':visible')) {
			$('.lib-link-open').removeClass('lib-link-open').next().slideUp('fast');
			$(this).addClass('lib-link-open');
		  	checkElement.slideDown('fast');
		}
		return false;
	})

/*
    $('.lib-link').click(function(){
      $(this).next('.lib-item').slideToggle(250);
      return false;
    });*/

	$('#filterFrm_art_banka > option:first-child').text('Všetky banky');

	$('.anketa-odpovede .anketa-odpoved:even').removeClass('anketa-odpoved0').addClass('anketa-odpoved1');
	$('.anketa-odpovede .anketa-bar:even').removeClass('anketa-bar0').addClass('anketa-bar1');

	$("#menu-phone").mmenu({
		"counters": true,
	});
  
    //incl 28.3.19
    setTimeout(function () {
      var _et_script1 = document.createElement('script');
      _et_script1.src = "//sk.search.etargetnet.com/generic/header_bidding.php?ref=56444";
      _et_script1.charset = "text/javascript";
      _et_script1.charset = "utf-8";
      document.getElementById("etarget-id-56444").appendChild(_et_script1);

      var _et_script2 = document.createElement('script');
      _et_script2.src = "//sk.search.etargetnet.com/generic/uni.php?g=ref:57029,area:300x250";
      _et_script2.charset = "text/javascript";
      _et_script2.charset = "utf-8";
      _et_script2.setAttribute("data-ad-type", "iframe v2.0");
      document.getElementById("etarget-id-57029").appendChild(_et_script2);
    }, 100);
         
});