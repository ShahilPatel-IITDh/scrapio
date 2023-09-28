function getCookie(sName) {
    var oRegex = new RegExp("(?:; )?" + sName + "=([^;]*);?");
    if (oRegex.test(document.cookie)) {
        return decodeURIComponent(RegExp["$1"]);
    } else {
        return null;
    }
}
function setCookie(sName, sValue) {
    var today = new Date(), expires = new Date();
    if(sValue==""){
        expires.setTime(today.getTime() - 3600);
    } else {
        expires.setTime(today.getTime() + (365*24*60*60*1000));
    }
    if(window.location.hostname.indexOf("mailify") >= 0){
        document.cookie = sName + "=" + encodeURIComponent(sValue) + ";expires=" + expires.toGMTString()+"; path=/ ;domain = .mailify.com";
    } else {
        document.cookie = sName + "=" + encodeURIComponent(sValue) + ";expires=" + expires.toGMTString()+"; path=/ ;domain = .sarbacane.com";
    }
}
function delCookie(nom) {
    setCookie(nom,"")
}
function popinCookies(){
    $('#cookies, #overlay').fadeIn();
    $('#close').click(function(){
        $('#cookies, #overlay').fadeOut();
        location.reload();
    });
}
function closeCornerNotif(){
  $('#home-popin-expiration').fadeOut();
}
function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test( $email );
}
function demanderappeltel(){
    $("#demanderappeltel-bloc").click();
}
function checkMailJetable(mail){
    var jetable=0;
    var mailJetable = ["yopmail.com","jetable.org","mail-temporaire.fr","ephemail.com","trashmail.net","kasmail.com","spamgourmet.com","tempomail.com","guerrillamail.com","mytempemail.com","saynotospams.com","tempemail.co.za","mailinator.com","mytrashmail.com","mailexpire.com","maileater.com","spambox.us","guerrillamail.com","10minutemail.com","dontreg.com","filzmail.com","spamfree24.org","brefmail.com","0-mail.com","link2mail.com","DodgeIt.com","dontreg.com","e4ward.com","gishpuppy","guerrillamail.com","haltospam.com","kasmail.com","mailexpire.com","mailEater.com","mailinator.com","mailNull.com","mytrashMail","nobulk.com","nospamfor.us","PookMail.com","shortmail.net","sneakemail.com","spam.la","spambob.com","spambox.us","spamDay.com","spamh0le.com","spaml.com","tempInbox.com","temporaryinbox.com","willhackforfood.biz","willSelfdestruct.com","wuzupmail.net","10minutemail.com","0815.ru0clickemail.com","0wnd.net","0wnd.org","10minutemail.com","20minutemail.com","2prong.com","3d-painting.com","4warding.com","4warding.net","4warding.org","9ox.net","a-bc.net","amilegit.com","anonbox.net","anonymbox.com","antichef.com","antichef.net","antispam.de","baxomale.ht.cx","beefmilk.com","binkmail.com","bio-muesli.net","bobmail.info","bodhi.lawlita.com","bofthew.com","brefmail.com","bsnow.net","bugmenot.com","bumpymail.com","casualdx.com","chogmail.com","cool.fr.nf","correo.blogos.net","cosmorph.com","courriel.fr.nf","courrieltemporaire.com","curryworld.de","cust.in","dacoolest.com","dandikmail.com","deadaddress.com","despam.it","devnullmail.com","dfgh.net","digitalsanctuary.com","discardmail.com","discardmail.de","disposableaddress.com","disposemail.com","dispostable.com","dm.w3internet.co.uk example.com","dodgeit.com","dodgit.com","dodgit.org","dontreg.com","dontsendmespam.de","dump-email.info","dumpyemail.com","e4ward.com","email60.com","emailias.com","emailinfive.com","emailmiser.com","emailtemporario.com.br","emailwarden.com","ephemail.net","explodemail.com","fakeinbox.com","fakeinformation.com","fastacura.com","filzmail.com","fizmail.com","frapmail.com","garliclife.com","get1mail.com","getonemail.com","getonemail.net","girlsundertheinfluence.com","gishpuppy.com","great-host.in","gsrv.co.uk","guerillamail.biz","guerillamail.com","guerillamail.net","guerillamail.org","guerrillamail.com","guerrillamailblock.com","haltospam.com","hotpop.com","ieatspam.eu","ieatspam.info","ihateyoualot.info","imails.info","inboxclean.com","inboxclean.org","incognitomail.com","incognitomail.net","ipoo.org","irish2me.com","jetable.com","jetable.fr.nf","jetable.net","jetable.org","junk1e.com","kaspop.com","kulturbetrieb.info","kurzepost.de","lifebyfood.com","link2mail.net","litedrop.com","lookugly.com","lopl.co.cc","lr78.com","maboard.com","mail.by","mail.mezimages.net","mail4trash.com","mailbidon.com","mailcatch.com","maileater.com","mailexpire.com","mailin8r.com","mailinator.com","mailinator.net","mailinator2.com","mailincubator.com","mailme.lv","mailnator.com","mailnull.com","mailzilla.org","mbx.cc","mega.zik.dj","meltmail.com","mierdamail.com","mintemail.com","moncourrier.fr.nf","monemail.fr.nf","monmail.fr.nf","mt2009.com","mx0.wwwnew.eu","mycleaninbox.net","mytrashmail.com","neverbox.com","nobulk.com","noclickemail.com","nogmailspam.info","nomail.xl.cx","nomail2me.com","no-spam.ws","nospam.ze.tc","nospam4.us","nospamfor.us","nowmymail.com","objectmail.com","obobbo.com","onewaymail.com","ordinaryamerican.net","owlpic.com","pookmail.com","proxymail.eu","punkass.com","putthisinyourspamdatabase.com","quickinbox.com","rcpt.at","recode.me","recursor.net","regbypass.comsafe-mail.net","safetymail.info","sandelf.de","saynotospams.com","selfdestructingmail.com","sendspamhere.com","shiftmail.com","fuckmail.me","skeefmail.com","slopsbox.com","smellfear.com","snakemail.com","sneakemail.com","sofort-mail.de","sogetthis.com","soodonims.com","spam.la","spamavert.com","spambob.net","spambob.org","spambog.com","spambog.de","spambog.ru","spambox.info","spambox.us","spamcannon.com","spamcannon.net","spamcero.com","spamcorptastic.com","spamcowboy.com","spamcowboy.net","spamcowboy.org","spamday.com","spamex.com","spamfree24.com","spamfree24.de","spamfree24.eu","spamfree24.info","spamfree24.net","spamfree24.org","spamgourmet.com","spamgourmet.net","spamgourmet.org","spamherelots.com","spamhereplease.com","spamhole.com","spamify.com","spaminator.de","spamkill.info","spaml.com","spaml.de","spammotel.com","spamobox.com","spamspot.com","spamthis.co.uk","spamthisplease.com","speed.1s.fr","suremail.info","tempalias.com","tempemail.biz","tempemail.com","tempe-mail.com","tempemail.net","tempinbox.co.uk","tempinbox.com","tempomail.fr","temporaryemail.net","temporaryinbox.com","thankyou2010.com","thisisnotmyrealemail.com","throwawayemailaddress.com","tilien.com","tmailinator.com","tradermail.info","trash2009.com","trash-amil.com","trashmail.at","trash-mail.at","trashmail.com","trash-mail.com","trash-mail.de","trashmail.me","trashmail.net","trashymail.com","trashymail.net","tyldd.com","uggsrock.com","wegwerfmail.de","wegwerfmail.net","wegwerfmail.org","wh4f.org","whyspam.me","willselfdestruct.com","winemaven.info","wronghead.com","wuzupmail.net","xoxy.net","yogamaven.com","yopmail.com","yopmail.fr","yopmail.net","yuurok.com","zippymail.info","jnxjn.com","trashmailer.com","klzlk.com","sofimail.com", "leboncoin.com", "tempemails.io", "emailmonkey.club"]
    var domaine=mail.split('@');
    for(var i= 0; i < mailJetable.length; i++){
        if(domaine[1]==mailJetable[i]){
            jetable++;
        }
    }
    if(jetable==0){
        return true;
    } else {
        return false;
    }
}
function verifMail(mail){
    var reg = new RegExp('^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,18}$', 'i');
    return(reg.test(mail));
}
function goToByScroll(id){
     // Remove "link" from the ID
    id = id.replace("link", "");
    if (document.getElementById(id)) {
        $('html,body').animate({
            scrollTop: $("#"+id).offset().top-($("header").height() + 20)},
            'slow');
      }
}
function viewTemplate(type){
    var desk=$("#template-details-content").find(".desk-template");
    var phone=$("#template-details-content").find(".phone-template");
    var btndesk=$("#template-details-content").find(".btn-template").find("button.desktop");
    var btnphone=$("#template-details-content").find(".btn-template").find("button.phone");

    if(type=="desktop"){
        desk.animate({"opacity": 1}, 500);
        phone.animate({ "left": desk.width()-(phone.width()/2.3) }, 600, function(){
            desk.animate({
                "margin-left": -250
            }, 600, function(){
                desk.css("z-index", 1);
                desk.animate({ "margin-left": 0 }, 600);
            });
        });

        btndesk.addClass("active");
        btnphone.removeClass("active");
    } else if(type=="phone"){
        desk.animate({
            "margin-left": -250
        }, 600, function(){
            desk.css("z-index", 0);
            desk.animate({ "margin-left": 0 }, 600, function(){ phone.animate({ "left": desk.width()/2- phone.width()/2 }, 600, function(){ desk.animate({"opacity": 0.4}, 500); }); });
        });

        btnphone.addClass("active");
        btndesk.removeClass("active");
    }
}
function searchDocs(value, type, categories, lang){
    if(value != ""){
        $.ajax({
            type: "GET",
            url: '/WebService/searchDocs/'+value,
            data: 'type='+type+'&categories='+categories+'&lang='+lang,
            dataType: 'json',
            success: function(data){
                console.log(data);
                old_catID = 0;
                HTML = "";
                $.each(data, function( index, value ) {
                    if( (value.cat_id != old_catID) && (index > 0) ){
                        HTML += '</div>';
                        HTML += '</div>';
                    }
                    if(value.cat_id != old_catID){
                        HTML += '<div class="contenu">'
                        HTML += '<div class="spec_category">';
                    }
                    HTML += '<div class="grid_12"><div class="categorie">';
                        if( (value.lang.toLowerCase() == "fr") || (value.lang.toLowerCase() == "en") ){
                            HTML += '<a href="/help/'+value.parent_cat_url+'/'+value.cat_url+'/'+value.url+'">';
                        } else {
                            HTML += '<a href="/'+value.lang.toLowerCase()+'/help/'+value.parent_cat_url+'/'+value.cat_url+'/'+value.url+'">';
                        }
                        HTML +='<p class="titleCat">'+value.titre+'</p>';
                        HTML += '<div class="right"><i class="material-icons">arrow_forward</i></div>';
                    HTML += '</a></div></div>';
                    HTML += '<div class="clear"></div>';

                    old_catID = value.cat_id;
                });
                if($("#input_search").val() != ""){
                    $(".docs-contenu-search").html(HTML);
                    $(".docs-contenu-search").fadeIn();
                }
            },
            error: function(data){
                showBandeau("error", "Une erreur est survenue");
            }
        });
    } else {
        $(".docs-contenu-search").html("");
        $(".docs-contenu-search").fadeOut();
    }

}
function searchDocsun(value, type, categories, lang){
    if(value != ""){
       
        $.ajax({
            type: "GET",
            url: '/WebService/searchDocsun/'+value,
            data: 'type='+type+'&categories='+categories+'&lang='+lang,
            dataType: 'json',
            success: function(data){
                console.log(data);
                old_catID = 0;
                HTML = "";
                $.each(data, function( index, value ) {
                    if( (value.cat_id != old_catID) && (index > 0) ){
                        HTML += '</div>';
                        HTML += '</div>';
                    }
                    if(value.cat_id != old_catID){
                        HTML += '<div class="contenu">'
                        HTML += '<div class="spec_category">';
                    }
                    HTML += '<div class="grid_12"><div class="categorie">';
                        if( (value.lang.toLowerCase() == "fr") || (value.lang.toLowerCase() == "en") ){
                            HTML += '<a href="/help-sunrise/'+value.parent_cat_url+'/'+value.cat_url+'/'+value.url+'">';
                        } else {
                            HTML += '<a href="/'+value.lang.toLowerCase()+'/help-sunrise/'+value.parent_cat_url+'/'+value.cat_url+'/'+value.url+'">';
                        }
                        HTML +='<p class="titleCat">'+value.titre+'</p>';
                        HTML += '<div class="right"><i class="material-icons">arrow_forward</i></div>';
                    HTML += '</a></div></div>';
                    HTML += '<div class="clear"></div>';

                    old_catID = value.cat_id;
                });
                if($("#input_search").val() != ""){
                    $(".docs-contenu-search").html(HTML);
                    $(".docs-contenu-search").fadeIn();
                }
            },
            error: function(data){
                showBandeau("error", "Une erreur est survenue");
            }
        });
    } else {
        $(".docs-contenu-search").html("");
        $(".docs-contenu-search").fadeOut();
    }

}



function showArianeCategory(){
    if ($("#ariane").find(".menuPage").is(":visible")) {
        $("#ariane").find(".menuPage").slideToggle();
    }
    if ($("#ariane").find(".submenuCat").is(":visible")) {
        $("#ariane").find(".submenuCat").slideToggle();
    }
    $("#ariane").find(".menuCat").slideToggle();
    $("#cat_arrowup").toggle();
    $("#cat_arrowdown").toggle();
    return false;
}
function showArianeSubCategory(){
    if ($("#ariane").find(".menuPage").is(":visible")) {
        $("#ariane").find(".menuPage").slideToggle();
    }
    if ($("#ariane").find(".menuCat").is(":visible")) {
        $("#ariane").find(".menuCat").slideToggle();
    }
    $("#ariane").find(".submenuCat").slideToggle();
    $("#subcat_arrowup").toggle();
    $("#subcat_arrowdown").toggle();
    return false;
}
function showArianePage(){
    if ($("#ariane").find(".menuCat").is(":visible")) {
        $("#ariane").find(".menuCat").slideToggle();
    }
    if ($("#ariane").find(".submenuCat").is(":visible")) {
        $("#ariane").find(".submenuCat").slideToggle();
    }
    $("#ariane").find(".menuPage").slideToggle();
    $("#page_arrowup").toggle();
    $("#page_arrowdown").toggle();
    return false;
}

function resetPassword(value, lang){

    if(value != ""){
        $.ajax({
            type: "POST",
            url: 'https://www.sarbacane.com/WebService/resetPassword?Email='+value,
            success: function(data){
                if(data != "202" && data != "200"){
                    switch (lang) {
                      case 'FR':
                        $("#reponse").html("Cet email n'existe pas");
                        break;
                      case 'EN':
                        $("#reponse").html("This email does not exist");
                        break;
                      case 'ES':
                        $("#reponse").html("Este correo electrónico no existe");
                        break;
                      case 'DE':
                        $("#reponse").html("Diese E-Mail existiert nicht");
                        break;
                      case 'PT':
                        $("#reponse").html("Este email não existe");
                        break;
                      default:
                        $("#reponse").html("Cet email n'existe pas");
                    }
                } else {
                    switch (lang) {
                      case 'FR':
                        $("#reponse").html("Un email vient de vous être envoyé");
                        break;
                      case 'EN':
                        $("#reponse").html("An email has been sent to you");
                        break;
                      case 'ES':
                        $("#reponse").html("Un correo electrónico acaba de ser enviado a usted");
                        break;
                      case 'DE':
                        $("#reponse").html("Eine E-Mail wurde soeben an Sie gesendet");
                        break;
                      case 'PT':
                        $("#reponse").html("Um email acaba de ser enviado para você");
                        break;
                      default:
                        $("#reponse").html("Un email vient de vous être envoyé");
                    }
                }
            },
            error: function(data){
                switch (lang) {
                  case 'FR':
                    $("#reponse").html("Cet email n'existe pas");
                    break;
                  case 'EN':
                    $("#reponse").html("This email does not exist");
                    break;
                  case 'ES':
                    $("#reponse").html("Este correo electrónico no existe");
                    break;
                  case 'DE':
                    $("#reponse").html("Diese E-Mail existiert nicht");
                    break;
                  case 'PT':
                    $("#reponse").html("Este email não existe");
                    break;
                  default:
                    $("#reponse").html("Cet email n'existe pas");
                }
            }
        });
    }

}

// Page Stats Emailing
function statemailGenerateHTML(data, jours){
    var YHTML = "";
    for (var i = 0; i < data.scale.length; i++) {
        YHTML += "<li><span>"+data.scale[i]+"</span></li>";
    }
    $("#numbers").append(YHTML);
    var XHTML = "";
    var highestNb = parseInt($("#chart #numbers li:last-child span").html());
    for (var i = 0; i < data.value.length; i++) {
        if (data.value[i] == highestNb) {
            var style = "bar barHigh";
        } else {
            var style = "bar";
        }
        XHTML += "<li><div data-percentage='"+data.percent[i]+"' data-value='"+data.value[i]+"' class='"+style+"'><div class='head'><i class='fa fa-envelope'></i></div></div><span>"+jours[i]+"</span></li>";
    }
    $("#bars").append(XHTML);
}
function statemailAnimation(){
    $("#loader").hide();
    $("#chart").waypoint(function() {
        var delay = 0;
        var length = 0;
        $("#bars li .bar").each( function( key, bar ) {
            length = length + 1;
            var width = (100 / length) - 0.5;
            var percentage = $(this).data('percentage');
            $("#bars li").css("width", width+'%');
            $(this).delay(delay).animate({
                'height' : percentage + '%',
                'opacity' : 1
            }, 800);
            delay += 600;
        });
        this.destroy();
    },{
        offset: '50%'
    });
}

function demanderappeltel(){
    $("#demanderappeltel-bloc").click();
}
function getParam(param) {
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if ( param ) {
        return vars[param] ? vars[param] : null;
    }
    return vars;
}

function openSSMenu(el){
    var dropdowns = document.getElementsByClassName("ssmenu");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('hover') && $(el).attr("id") != openDropdown.id) {
        openDropdown.classList.remove('hover');
      }
    }
    $(el).toggleClass("hover");
}

function showCalendly(url) {
    Calendly.showPopupWidget(url);
    return false;
}

function playVideo(code){
    $("#popinVideo").append('<iframe src="https://www.youtube.com/embed/'+code+'?autoplay=1&loop=1&rel=0&wmode=transparent" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    $("#overlay").fadeIn();
    $("#popinVideo").fadeIn();
}

function closeVideo(){
    $("#overlay").fadeOut();
    $("#popinVideo").fadeOut();
    $("#popinVideo iframe").last().remove();
}

function AffichageErreur(element, txt, typeAccount){
    AffichageReset(element);

    const div = typeAccount ? ".button_arrow" : "img.icone"; 

    typeAccount == "img.icone" ? element.find(div).attr("src", "https://www.sarbacane-cdn.com/img/icone/icon-error.png") : element.find(div).attr("src", "https://www.sarbacane-cdn.com/img/account-creation/SVG/button_cross.svg");
    element.find(div).addClass("icone-erreur");
    typeAccount ? element.parent().next(".error_message").html(txt) : element.find(div).tooltipster('content', txt) ;
    element.find(div).attr("alt", "Element Error");
    element.find("input").removeClass("i_success");
    element.find("input").addClass("i_error");
}
function AffichageSuccess(element, typeAccount){
    AffichageReset(element);
    
    const div = typeAccount ? ".button_arrow" : "img.icone"; 

    typeAccount == "img.icone" ? element.find(div).attr("src", "https://www.sarbacane-cdn.com/img/icone/icon-success.png") : element.find(div).attr("src", "https://www.sarbacane-cdn.com/img/account-creation/SVG/button_arrow.svg");
    element.find(div).addClass("icone-success");
    element.find(div).attr("alt", "Element Success");
    typeAccount ? element.parent().next(".error_message").html("") : element.find(div).tooltipster('content', "OK");
    element.find("input").removeClass("i_error");
    element.find("input").addClass("i_success");
}
function AffichageReset(element){
    element.find("img.icone").removeAttr("src");
    element.find("img.icone").removeAttr("alt");
    element.find("img.icone").removeClass("icone-erreur");
    element.find("img.icone").removeClass("icone-success");
}

function checkEmail(email){
    email = $("#email").val();
    if( (email != "") && (verifMail(email)) && (checkMailJetable(email)) ){
        AffichageSuccess($(".email_cont"));
        return true;
    } else {
        if (email == ""){
            txt = $("#translate-email_vide").html();
        } else if (!verifMail(email)){
            txt = $("#translate-email_incorect").html();
        } else if (!checkMailJetable(email)){
            txt = $("#translate-email_unauthorized").html();
        }
        AffichageErreur($(".email_cont"), txt);
        return false;
    }
}
function checkPassword(password) {
  var regularExpression = /(?=.*[!@#$%^&,<>*])/;
  var checkConditions = "";

  if (password.length >= 8) {
    $("#condition_length").addClass("checked");
    } else {
    $("#condition_length").removeClass("checked");
    checkConditions = "nok";
  }

  if (password.search(/[a-z]/) >= 0 && password.search(/[A-Z]/) >= 0) {
    $("#condition_min").addClass("checked");
  } else {
    $("#condition_min").removeClass("checked");
    checkConditions = "nok";
  }

  if (password.search(/[0-9]/) >= 0 && password.search(/[!.@#$%^&*]/) >= 0) {
    $("#condition_symb").addClass("checked");
  } else {
    $("#condition_symb").removeClass("checked");
    checkConditions = "nok";
  }

  if (checkConditions == "") {
    $(".error-password").html("");
    AffichageSuccess($(".password_cont"));
    return true;
  } else {
    $(".error-password").html("");
    AffichageErreur($(".password_cont"));
    return false;
  }
}
function checkCGU(){
    if(!$("#cgu").is(":checked")){
        $(".box.cgu").find("label").addClass("error");
        return false;
    } else {
        $(".box.cgu").find("label").removeClass("error");
        return true;
    }
}


function checkFooterAccount(){

  if( checkNom() && checkPrenom() && checkEmail() && checkSociety() && checkPhone() && checkComm()){
      return true;
  } else {
      return false;
  }

}

function checkNom(){
    var nom = $("#name_client").val();
    if( nom.length < 2 ){
        $(".tag_error").fadeIn();
        $('#name_client').addClass("input_error");
        return false;
    } else {
        $(".tag_error").fadeOut();
        $('#name_client').removeClass("input_error");
        return true;
    }
}

function checkPrenom(){
    var prenom = $("#last_name_client").val();
    if( prenom.length < 2 ){
        $(".tag_error2").fadeIn();
        $('#last_name_client').addClass("input_error");
        return false;
    } else {
        $(".tag_error2").fadeOut();
        $('#last_name_client').removeClass("input_error");
        return true;
    }
}

function checkEmail(){
    var email = $("#email_client").val();
    if ( email ) {
        if( email.length < 2 ){
            $(".tag_error3").fadeIn();
            $("#email_client").addClass("input_error");
            return false;
        } else {
            $(".tag_error3").fadeOut();
            $("#email_client").removeClass("input_error");
            return true;
        }
    }
}

function checkSociety(){
    var society = $("#a1_client").val();
    if( society.length < 2 ){
        $(".tag_error4").fadeIn();
        $("#a1_client").addClass("input_error");
        return false;
    } else {
        $(".tag_error4").fadeOut();
        $("#a1_client").removeClass("input_error");
        return true;
    }
}

function checkPhone(){
    var phone = $("#a2_client").val();
    if( phone.length < 2 ){
        $(".tag_error5").fadeIn();
        $("#a2_client").addClass("input_error");
        return false;
    } else {
        $(".tag_error5").fadeOut();
        $("#a2_client").removeClass("input_error");
        return true;
    }
}

function checkComm(){
    var comm = $("#commentaires_client").val();
    if( comm.length < 2 ){
        $(".tag_error6").fadeIn();
        $("#commentaires_client").addClass("input_error");
        return false;
    } else {
        $(".tag_error6").fadeOut();
        $("#commentaires_client").removeClass("input_error");
        return true;
    }
}

function logout(){
    var dom = document.location.hostname.split(".");
    if(dom[0] ==  "www-inte"){
        document.cookie = "Token= ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=." + dom[0] + "." + dom[1] + "." + dom[2];
    } else {
        document.cookie = "Token= ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=." + dom[dom.length-2] + "." + dom[dom.length-1];
    }
    location.reload();
    return false;
}

function random(length, string) {
    var result           = '';
    var characters       = string;
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

function avisClientsPopin(){
    var note = 0;
    var comment = null;

    var ticketID = null;
    var reviewLink = null;

    $(document).ready(function(){

        const idSA = document.querySelector('#config_idSA').value;

        if(idSA != ''){

            var settings = {
                "url": "/WebService/popinReview",
                "method": "POST",
                "timeout": 0,
                "data": JSON.stringify({
                "idSA": idSA
                }),
            };

            $.ajax(settings).done(function (response) {

                if(response){
                    
                    var data = JSON.parse(response)[0];
    
                    ticketID = data.fd_id;
                    reviewLink = data.fd_reviewPlatform;
    
                    setTimeout(function(){
                        $('#popin-avis-client').css('display', 'flex');
                        $('#overlay-popin-avis-client').css('display', 'block');
                    },5000);
                    $('#avisExterne').attr('href', reviewLink);
                } else {
                    return
                }

            });

        }

    })

    $('.star-avis').each(function(){

        $(this).on("click", function(){

            note = $(this).data("attribut");

            $('#text-avis-client1').hide();
            $('#text-avis-client2').show();
            setStarColor();

        })

    })

    $('.star-avis').each(function(){

        $(this).on("click", function(){

            note = $(this).data("attribut");

            $('#text-avis-client1').hide();
            $('#text-avis-client2').show();
        })

    })

    function setStarColor(){
        $('.fa-star').each(function(){

            if($(this).data("attribut") <= note){

            $(this).addClass('checked');
            }
        })
    }

    $('#buttonComment').on("click", function(){

        comment = $("#commentInput").val();

        if(comment != ''){
            
            if(note >= 4 ){
                $('#text-avis-client2').hide();
                $('#text-avis-client4').show();

                $("#noteTop").html(note.toString());
                }
                else{
                $('#text-avis-client2').hide();
                $('#text-avis-client3').show();

                $("#noteBad").html(note.toString());
                }

                var data = JSON.stringify({"ticketID":ticketID, "note":note, "commentaire":comment});

                $.ajax({

                type: 'POST',
                url: '/WebService/saveReview',
                data:data
                })
            }   
        }
    )

    $('.closePopin').click(function(){

        console.log("yo")

        $('#popin-avis-client').hide();
        $('#overlay-popin-avis-client').hide();

        $.ajax({
            type: 'POST',
            url: '/WebService/saveReview',
            data: JSON.stringify({"ticketID":ticketID, "note":0, "commentaire":"Popin fermé"})
        })
    
        
    })

    $('#reviewRDV').on("click", function(){
        $('#popin-avis-client').hide();
        $('#overlay').hide();
    })
}

function activateAxeptioChat(){
    $("#bulle_chat, #popin-chatConsent").hide();
    dataLayer.push({'event': 'axeptio_activate_SarbacaneChat'});
}

function activateAxeptioYoutube(){
    setCookie("bookademo_youtube", "1");
    var symbol = $("#videoBookADemo")[0].src.indexOf("?") > -1 ? "&" : "?";
    $("#videoBookADemo")[0].src += symbol + "autoplay=1";
    dataLayer.push({'event': 'axeptio_activate_Youtube'});
}


    





