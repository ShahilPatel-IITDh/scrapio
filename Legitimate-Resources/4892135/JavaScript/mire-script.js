$(function () {
    focus();
});

function focus() {
    var username = $("#username");
    var password = $("#password");
    if (username.attr("type") == "hidden") password.focus(); else username.focus();
}

function sendStats(pn) {
    try {
        stats({pn: pn})
    } catch (e) {
    }
}

function sendStatsMsg(m) {
    sendStats(_stats_pageName+m)
}
 
function sendStatsHelp(m) {
    sendStats(_stats_pagename+"Aide/"+m)
}

function trackLink(l, m) {
    s_tl(l, 'o', s.pageName + m)
}

function openLayer(link, layer, pn) {
	link.click(function(e){
		e.preventDefault();
		sendStatsHelp(pn);
		layer.show();
	});
}
function closeLayer() {
	$(".sr-popin-closer").bind("click", function(e){
		e.preventDefault();
		var layer_id = $(this).closest(".sr-popin").attr("id");
		$("#" + layer_id).fadeOut();
	});
}
$(document).ready(function(){
	closeLayer();
	// LAYER PHISHING
	// openLayer($("#mire-phishing a.really-light-link"), $("#layer-bloc1"), "/Layer Info Phishing");
	// LAYER IDENTIFIANT OUBLIE
	openLayer($("#mire-items .forgotId"), $("#layer-bloc2"), "/Layer Identifiant Oublie");
	// LAYER PREMIERE CONNEXION
	openLayer($("#mire-items .firstAuthent"), $("#layer-bloc3"), "/Layer Premiere Connexion");

	// SHOW/HIDE PASSWORD
	$(".sr-icon-eye").on("click",function() {
		$(this).toggleClass("sr-icon-eye-slash");
		var input = $("#password");
		if (input.attr("type") == "password") {
			input.attr("type", "text");
		} else {
			input.attr("type", "password");
		}
	});

	// FORMULAIRE
	var form = $("#loginForm");
	var input_id = $("#usernameInput");
	var input_pwd = $("#passwordInput");
	var inputs = form.find(".input-line input");
	var errorPanel = $(".sr-message-error");
	var username = $("#username");
	var password = $("#password");
	form.submit(function(e){
		if (form.data('submitted') === true) {
			e.preventDefault();
			return false;
		}
		var error = 0;
		var error_num = 0;
		var error_type = "";
		var statsError = "";
		input_id.removeClass("on-error");
		input_pwd.removeClass("on-error");
		inputs.removeClass("error");
		if(typeof grecaptcha !== 'undefined'){
			if (!grecaptcha.getResponse()) {
				statsError = "/Erreur/gRecaptcha not used";
				error_type = 'Veuillez cocher la case "Je ne suis pas un robot"';
				error++;
			}
		}
		if(username.val() == ""){
			statsError = "/Erreur/ID Vide MDP Saisi";
			error++;
			error_num = 1;
			error_type = "Saisissez votre identifiant";
			input_id.addClass("on-error");
			input_id.find("input").addClass("error");
		}
		if(password.val() == ""){
			statsError = "/Erreur/ID Saisi MDP Vide";
			error++;
			error_num = 2;
			error_type = "Saisissez votre mot de passe";
			input_pwd.addClass("on-error");
			input_pwd.find("input").addClass("error");
		}
		if(error > 0){
			errorPanel.removeAttr('style').addClass("show");
			var focus = (typeof _cCas == 'undefined' || _cCas.focus);
			if(error >= 2) {
				statsError = "/Erreur/Couple ID MDP Vides";
				error_type = "Saisissez votre identifiant et votre mot de passe";
				if (focus) username.focus();
			} else {
				if (focus) {
					if(error_num == 1) username.focus();
					if(error_num == 2) password.focus();
				}
			}
			errorPanel.html(error_type);
			sendStatsMsg(statsError);
			return false;
		} else {
			form.data('submitted', true);
			return true;
		}
	});
});
