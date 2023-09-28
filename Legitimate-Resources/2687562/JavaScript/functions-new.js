$('#accept_cookie').click(function() {
	$("#mention_cookie").fadeOut();
	$(".pub-bt-fixed").css("bottom","-4px");
	createCookie("accept_cookie", "accept", 100)
	return false;
});

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

var rotation = function (){
  $(".rotate-arrow .arrow").rotate({
	angle:0,
	animateTo:360,
	callback: rotation,
  });
}
rotation();

setTimeout(function(){
  $(".rotate-arrow .arrow").stopRotate();
}, 4000);

scrollResults = false;
id_catchmail = '';

function generateResults(amount,duration,type,sort_type,id_catchmail) {
	if (amount != "" && amount != 0 && duration != "" && duration != 0)
	{
		$('#results').html('<section class="full results"></section>');
		$('#results').addClass('loading');
		
		//$(window).unbind('scroll');
		clearTimeout($.data(this, 'afterPopupTimer'));
		
		if (id_page_att != "62")
		{
			if (sort_type == "" || typeof sort_type === "undefined") {
				id_page_att = "";
			}
		}
		
		if (id_catchmail != "" && typeof id_catchmail !== "undefined") {
			$("html,body").animate({scrollTop:($("#results").offset().top - 140)+'px'},700,'linear');
			scrollResults = true;
		} else if (scrollResults === false) {
			$("html,body").animate({scrollTop:($("#results").offset().top - 165)+'px'},700,'linear');
			scrollResults = true;
		}
		
		$.ajax({
			type: "POST",
			url: "/ajax/credit.php",
			data: "amount=" + amount + "&duration=" + duration + "&provenance=" + provenance + "&campagne=" + campagne + "&type=" + type + "&id_page_att=" + id_page_att + "&sort_type=" + sort_type + "&after_popup=" + after_popup + "&id_catchmail=" + id_catchmail,
			success: function(data){
				$('#results').html(data);
			},
			error: function(){
				$('#results').html('<h2 class="results">Une erreur s\'est produite, veuillez refaire votre simulation, merci.</h2>');
			},
			complete: function(){
				$('#results').removeClass('loading');
			}
		});
	}
}

function compare(type) {
	var amount = 10000;
	if (type == 6) { // Crédit immobilier
		amount = 500000;
	} else if (type == 7) { // Rachat de crédit
		amount = 10000;
	}
	generateResults(amount,"none",type,id_catchmail);
}

$("select#projet").on("change", function() {
	var projet = $(this).val();
	if (projet != "") 
	{		
		if (projet == 9) {
			var obj = 'window.location.replace("http://www.allo-credit.com/credit-professionnel.php");';
			setTimeout(obj,10);
		}
		else if (projet == 2 || projet == 6 || projet == 7) {
			var amount = 10000;
			if (projet == 6) { // Crédit immo
				amount = 500000;
				four_results = 1;
			}
			$('.select-style.second, .select-style.third').slideUp();
			generateResults(amount,"none",projet,'',id_catchmail);
		}
		else
		{
			$('#montant').prop('disabled', true);
			$('#bt-compare').hide();
			
			$('#select-loader').addClass("on")
			$('.select-style.second').slideDown();
			$.ajax({
				type: "POST",
				url: "/ajax/credit.php",
				data: "projet=" + projet + "&type_projet=" + type_projet,
				success: function(data){
					$('#montant').html(data).prop('disabled', false);
					$('#select-loader').removeClass("on");
					loadDuree();
				},
				error: function(){
					$('#results').html('<h2 class="results">Une erreur s\'est produite, veuillez refaire votre demande, merci.</h2>');
				}
			});
		}
	}
	else
	{
		$('#montant').html('<option value="">Choisissez votre projet</option>');
	}
});

$("select#montant").on("change", function() {
	if ($('#select-loader-duration').is(":visible")) {
		$('#duree').removeAttr('disabled');
		var duree = $('#duree').val();
		if (duree != '') {
			generateResults($(this).val(),duree,$("#projet").val(),$("#sort-results").val(),id_catchmail);
		}
	} else {
		generateResults($("#montant").val(),"none",$("#projet").val(),$("#sort-results").val(),id_catchmail);
	}
});

$('select#duree').on("change", function() {
	generateResults($("#montant").val(),$(this).val(),$("#projet").val(),$("#sort-results").val(),id_catchmail);
});

/* ########################################## */
/* --------------- Fonctions --------------- */
/* ######################################## */

/* Affichage dynamique des durées */
function loadDuree() {
	var id_projet = $('#projet').val();
	
	if (id_projet) {
		$('#select-loader-duration').addClass("on")
		$('.select-style.third').slideDown();
		$.ajax({
			type: "POST",
			url: "/ajax/duree.php",
			data: {id_projet: id_projet},
			cache: false,
			success: function(html) {
				$('#select-loader-duration').removeClass("on");
				$("#duree").html(html);
			}
		});
	}
}

$('#moteur').scrollToFixed({
	marginTop: 90,
	minWidth: 1000
});

$(window).on("scroll", function() {
	if($(window).scrollTop() > 100 && $(window).width() > 1000) {
		$(".header").addClass("active");
	} else {
		$(".header").removeClass("active");
	}
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}