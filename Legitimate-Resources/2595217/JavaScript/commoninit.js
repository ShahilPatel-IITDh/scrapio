/*
@file: common js functions
@copy: Rediff.com
*/
function fieldTrackChat(name,val){	
    var Rkey = Math.floor(Math.random() * 1000000);
    var tracklink = "";
    if(document.getElementById('fill_metric'))
    {
        tracklink = name+"/"+val+"?rkey="+Rkey; 
        document.getElementById('fill_metric').src = "https://hostsmetric.rediff.com/businessemail.rediff.com/chat-with-user/"+tracklink; 
    }
}


//CHAT Code
$(document).ready(function(){
    setTimeout(function(){ $('#chat_profa').addClass('bounce'); }, 2000);
    
    
	$('.chat_profa').click(function(){
		$('.chatb').slideToggle(300);
		$("#chatbot").attr('src', 'https://chatbot.rediff.com/?skill=rpro-sales&authenticator=open');
		fieldTrackChat('chatbot','open');
	});
	$('.chatb h4 a.close_chat').click(function(){
		$('.chatb').fadeOut();
		fieldTrackChat('chatbot','close');
	})
});

function openChatonAdmin(){
	isBotOpened = true;
    var chatopen = document.getElementById('chatbAdmin');
    var orgChatBot = document.getElementById('chatbot');
    chatopen.style.display='block';
    orgChatBot.setAttribute('src', 'https://chatbot.rediff.com/?skill=rpro-sales&authenticator=open&browseragent='+ismobileagent);
    fieldTrackChat('chatbot','open');
}

function chatClose(){
    var chatopen = document.getElementById('chatbAdmin');
    var orgChatBot = document.getElementById('chatbot');
    chatopen.style.display='none';
    fieldTrackChat('chatbot','close');
}

function refresh() {
    var iframe = document.getElementById('chatbot');
    $("#chatbot").attr('src', 'https://chatbot.rediff.com/?skill=rpro-sales&authenticator=open&refresh=1');
    return true;
}

function deleteCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
// Chat Code


//Home Menu
$(document).ready(function(){
    $('.menu').click(function(){
        $(this).toggleClass('active');
        $('.menu_wrap').toggleClass('open');
    });

    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0,
            }, 1500);
    });
});
//Home Menu


//Home WOW Init and Preloader
new WOW().init();
$(window).on('load', function(event) {
    $('.preloader').delay(500).fadeOut(500);
});
$(window).on('scroll', function(event) {
    if($(this).scrollTop() > 600){
        $('.back-to-top').fadeIn(200)
    } else{
        $('.back-to-top').fadeOut(200)
    }
});
//Home WOW Init and Preloader


//Common Functions
if(typeof allowOnlyNumber == 'undefined'){
    //TO allow only numbers...
    function allowOnlyNumber(obj){
        setTimeout(function() {
            obj.value=obj.value.replace(/[^0-9]/g, '');
        }, 1);
    }
}
if(typeof allowOnlyString == 'undefined'){
    function allowOnlyString(obj){
        setTimeout(function(){
            obj.value=obj.value.replace(/[^a-zA-Z ]/g, '');
        }, 1);
    }
}
if(typeof allowOnlyStringAndNumber == 'undefined'){
    function allowOnlyStringAndNumber(e,obj){
        var keypressed = e.which ? e.which : e.keyCode;
        
        if (   (keypressed === 8)
            || (keypressed === 27)
            || (keypressed === 46)
            || (keypressed >= 35 && keypressed <= 40)
            ) {
                // do nothing..
        }
        else{
            setTimeout(function(){
                obj.value=obj.value.replace(/[^a-zA-Z0-9.-]/g, '');
            }, 1);
        }
    }
}
if(typeof isEmpty == 'undefined'){
    function isEmpty(text){
        var re = /^\s{1,}$/g;
        if ((text.length==0) || (text==null) || ((text.search(re)) > -1)) {
            return true;
        }else{
            return false;
        }
    }
}
//Common Functions

//Common Contact Us Page
$(function() {

    function getURLParam(e,n){var t=e.indexOf("?");if(-1!==t)for(var i=e.substring(t+1).split("&"),o=0;o<i.length;o++){var r=i[o].split	("=");if(decodeURIComponent(r.shift())==n)return decodeURIComponent(r.join("="))}}

    var tag_data_arr = location.pathname.substr(1, location.pathname.length).replace("/", "|").split("|");
    var tag_length = tag_data_arr.length;
    var tag_name = "biz_feature";
    if (tag_length > 0) {
        tag_name = "biz_feature_" + tag_data_arr[tag_length - 1]
    }

    var preloaderContact = $('<div id="contact_preloader" class="dom-status" style="display:none;"><span style="float:left;display: block;color: #f14836;padding: 18px 10px 0 12px;">Please wait</span> <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>');

    $("#com_cont_submit").click(function() {
        var pattern_email = /(.+)@(.+){2,}\.(.+){2,}/;
        var pattern_mobile = /^[\d]+$/;
        if (!pattern_email.test($("#com_cont_email").val())) {
            $("#com_cont_email").focus();
            alert("[Error] Please enter valid email id");
            return false
        }
        if (!pattern_mobile.test($("#com_cont_mobile").val())) {
            $("#com_cont_mobile").focus();
            alert("[Error] Please enter valid mobile number");
            return false
        }
        var phone_no = $("#com_cont_mobile").val() || "",
            user_name = "user",
            email_id = $("#com_cont_email").val() || "",
            company = email_id,
            city = "",
            interest_opt = "10000",
            no_of_id = 0,
            sDescription = "BusinessEmail:Contact-Us|Page:" + location.pathname.substr(1, location.pathname.length).replace("/", "|"),
            sLeadType = "business-feature",
            sServicetype = "epro",
            sSource = "Website",
            campaignid = "",
            tagname = tag_name,
            captcha = "NOCAPTCHAVALIDATION";
        
        if($("#com_cont_name").length > 0){
            user_name = $("#com_cont_name").val();
            if(user_name == '' || user_name.length <= 2){
                $("#com_cont_name").focus();
                alert("[Error] Please enter valid full name");
                return false    
            }
            user_name = encodeURIComponent(user_name);
        }

        var utm_campaign = getURLParam(location.href,'utm_campaign');
        if(utm_campaign && utm_campaign.length > 0){
            sDescription = sDescription+'|All:'+encodeURIComponent(location.search),
            sLeadType = sLeadType+"|campaign_"+location.pathname.substr(1, location.pathname.length).replace('\/', '|'),
            sServicetype = getURLParam(location.href,'utm_campaign') || 'Service_Campaign',
            sSource = 'Campaign',
            tagname = getURLParam(location.href,'utm_medium') || '',
            campaignid = (getURLParam(location.href,'utm_medium') && getURLParam(location.href,'utm_medium') == 'Google_PPC') ? '3':'';
        }

        if($('#contact_preloader').length == 0){
            $('#com_cont_submit').after(preloaderContact);
        }   

        $('#contact_preloader').show();

        $.ajax({
            url: "https://businessemail.rediff.com/clicktocall",
            type: "POST",
            async: true,
            data: "phone=" + phone_no + "&city=" + city + "&captcha=" + captcha + "&user_name=" + user_name + "&email=" + email_id + "&company=" + company + "&interestedin=" + interest_opt + "&no_email_id=" + no_of_id + "&leadtype=" + sLeadType + "&servicetype=" + sServicetype + "&sSource=" + sSource + "&tagname=" + tagname + "&campaignid=" + campaignid + "&description=" + sDescription,
            success: function(data, status, xhr) {
                $('#contact_preloader').hide(0);
                var suc_msg = $('<h3 style="text-transform: initial; color:#155724;background: #d4edda;border: 1px solid #c3e6cb;border-radius: 4px;padding: 20px;font-size: 16px; margin:15px 0 0 0; font-weight:600; line-height:24px;"></h3>').html("Thank you for contacting us.<br>One of our representatives will get in touch with you shortly.");
                $(".rgt_lead_gen_form ul").hide();
                $(".rgt_lead_gen_form ul").after(suc_msg);
            },
            error: function() {
                $('#contact_preloader').hide(0);
                alert("[Error] Sorry your request could not be processed now, please try again.")
            }
        });
        return false
    })
});
//Common Contact Us Page