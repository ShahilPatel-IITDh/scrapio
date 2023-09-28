jQuery(document).ready(function () {

    var domain_resrict_toggle = jQuery("#mo_saml_enable_domain_restriction_login");
    domain_resrict_toggle.change(function() {
        if (!domain_resrict_toggle.is(":checked")) {
            jQuery("#allow_login").attr('disabled', true);
            jQuery("#deny_login").attr('disabled', true);
			jQuery("#saml_am_email_domains").attr('disabled', true);
        } else {
            jQuery("#allow_login").attr('disabled', false);
            jQuery("#deny_login").attr('disabled', false);
			jQuery("#saml_am_email_domains").attr('disabled', false);
        }
    });

	var dont_create_with_groups = jQuery("#dont_allow_user_tologin_create_with_given_groups");
    dont_create_with_groups.change(function() {
        if (!dont_create_with_groups.is(":checked")) {
            jQuery("#mo_saml_restrict_users_with_groups").attr('disabled', true);
        } else {
            jQuery("#mo_saml_restrict_users_with_groups").attr('disabled', false);
        }
    });

	//show and hide attribute mapping instructions
    jQuery("#toggle_am_content").click(function () {
        jQuery("#show_am_content").toggle();
    });
	jQuery("#dont_allow_unlisted_user_role").change(function() {
		if(jQuery(this).is(":checked")) {
			jQuery("#saml_am_default_user_role").attr('disabled', true);
		} else {
			jQuery("#saml_am_default_user_role").attr('disabled', false);
		}
	});
    if(jQuery("#dont_allow_unlisted_user_role").is(":checked")) {
			jQuery("#saml_am_default_user_role").attr('disabled', true);
		} else if(!jQuery("#dont_allow_unlisted_user_role").is(":disabled")){
			jQuery("#saml_am_default_user_role").attr('disabled', false);
		}
		
	jQuery("#dont_create_user_if_role_not_mapped").change(function() {
		if(jQuery(this).is(":checked")) {
			jQuery("#dont_allow_unlisted_user_role").attr('disabled', true);
			jQuery("#saml_am_default_user_role").attr('disabled', true);
		} else {
			jQuery("#dont_allow_unlisted_user_role").attr('disabled', false);
			jQuery("#saml_am_default_user_role").attr('disabled', false);
		}
	});
    if(jQuery("#dont_create_user_if_role_not_mapped").is(":checked")) {
			jQuery("#dont_allow_unlisted_user_role").attr('disabled', true);
			jQuery("#saml_am_default_user_role").attr('disabled', true);
		} else if(!jQuery("#dont_allow_unlisted_user_role").is(":disabled")){
			//jQuery("#dont_allow_unlisted_user_role").attr('disabled', false);
			//jQuery("#saml_am_default_user_role").attr('disabled', false);
		}
	/*
	 * Identity Provider help
	 
	jQuery("#user_selected_idp").change(function() {
		var idp = this.value;
		if(idp == 'adfs') {
			var content = "<a href='http://miniorange.com/adfs_as_idp_wordpress' target='_blank'>Click here to see the guide</a>"
		} else if(idp == 'simplesaml') {
			var content = "<a href='http://miniorange.com/simplesaml_as_idp_wordpress' target='_blank'>Click here to see the guide</a>"
		} else if(idp == 'salesforce') {
			var content = "<a href='http://miniorange.com/salesforce_as_idp_wordpress' target='_blank'>Click here to see the guide</a>"
		} else if(idp == 'okta') {
			var content = "<a href='http://miniorange.com/okta_as_idp_wordpress' target='_blank'>Click here to see the guide</a>"
		}else if(idp == 'shibboleth') {
			var content = "<a href='http://miniorange.com/shibboleth_as_idp_wordpress' target='_blank'>Click here to see the guide</a>"
		} else {
			jQuery("#idp_guide_link").html("");
		}
		jQuery("#idp_guide_link").html(content);
	});*/
	
	/*
	 * Help & Troubleshooting
	 */
	 
	//Enable cURL
	jQuery("#help_curl_enable_title").click(function () {
        jQuery("#help_curl_enable_desc").slideToggle(400);
    });
	
	//enable openssl
	jQuery("#help_openssl_enable_title").click(function () {
        jQuery("#help_openssl_enable_desc").slideToggle(400);
    });
	
	//attribute mapping
	jQuery("#attribute_mapping").click(function () {
        jQuery("#attribute_mapping_desc").slideToggle(400);
    });
	
	//role mapping
	jQuery("#role_mapping").click(function (e) {
		e.preventDefault();
        jQuery("#role_mapping_desc").slideToggle(400);
    });
	
	//idp details
	jQuery("#idp_details_link").click(function (e) {
		e.preventDefault();
        jQuery("#idp_details_desc").slideToggle(400);
    });
	
	//add widget
	jQuery("#mo_saml_add_widget").change(function () {
        jQuery("#mo_saml_add_widget_steps").slideToggle(400);
    });
	
	//add shorcut
	jQuery("#mo_saml_add_shortcode").change(function () {
        jQuery("#mo_saml_add_shortcode_steps").slideToggle(400);
    });
	
	//registration
	jQuery("#help_register_link").click(function (e) {
		e.preventDefault();
        jQuery("#help_register_desc").slideToggle(400);
	});
	
	jQuery("#enable_domain_mapping").click(function(e){
		e.preventDefault();
		jQuery("#enable_domain_mapping_desc").slideToggle(400);
	});
	
	
	//Widget steps
	jQuery("#help_widget_steps_title").click(function () {
        jQuery("#help_widget_steps_desc").slideToggle(400);
    });
	
	//redirect to idp
	jQuery("#redirect_to_idp").click(function (e) {
		e.preventDefault;
        jQuery("#redirect_to_idp_desc").slideToggle(400);
    });
	
	//redirect to idp
	jQuery("#force_authentication_with_idp").click(function (e) {
		e.preventDefault;
        jQuery("#force_authentication_with_idp_desc").slideToggle(400);
    });

	//redirect to idp
	jQuery("#rss_feed_toggle").click(function (e) {
		e.preventDefault;
        jQuery("#rss_feed_toggle_info").slideToggle(400);
    });
	
	//redirect to idp
	jQuery("#registered_only_access").click(function (e) {
		e.preventDefault;
        jQuery("#registered_only_access_desc").slideToggle(400);
    });
	 
	 jQuery("#auto_redirect_access").click(function (e) {
		e.preventDefault;
        jQuery("#auto_redirect_access_desc").slideToggle(400);
    });
	
	jQuery("#redirect_default_idp").click(function (e) {
		e.preventDefault;
        jQuery("#redirect_default_idp_desc").slideToggle(400);
    });
	 //Instructions
	 jQuery("#help_steps_title").click(function () {
        jQuery("#help_steps_desc").slideToggle(400);
    });
	
	//Working of plugin
	 jQuery("#help_working_title1").click(function () {
		 jQuery("#help_working_desc2").hide();
        jQuery("#help_working_desc1").slideToggle(400);
    });
	 
	 jQuery("#help_working_title2").click(function () {
		   jQuery("#help_working_desc1").hide();
	        jQuery("#help_working_desc2").slideToggle(400);
	    });
	
	//What is SAML
	 jQuery("#help_saml_title").click(function () {
        jQuery("#help_saml_desc").slideToggle(400);
    });
	
	//SAML flows
	 jQuery("#help_saml_flow_title").click(function () {
        jQuery("#help_saml_flow_desc").slideToggle(400);
    });
	
	//FAQ - certificate
	 jQuery("#help_faq_cert_title").click(function () {
        jQuery("#help_faq_cert_desc").slideToggle(400);
    });
	
	//FAQ - 404 error
	 jQuery("#help_faq_404_title").click(function () {
        jQuery("#help_faq_404_desc").slideToggle(400);
    });
	
	//FAQ - idp not configured properly issue
	 jQuery("#help_faq_idp_config_title").click(function () {
        jQuery("#help_faq_idp_config_desc").slideToggle(400);
    });
	
	//FAQ - redirect to idp issue
	 jQuery("#help_faq_idp_redirect_title").click(function () {
        jQuery("#help_faq_idp_redirect_desc").slideToggle(400);
    });

	//SYNC Metdata
	jQuery("#sync_metadata").click(function () {
        jQuery("#select_time_sync_metadata").slideToggle(400);
    });
	
	jQuery('#mo_saml_search_idp_list').focus(function(){
		document.getElementById("mo_saml_idps_grid_div").style.display="";
	});
	
     //Licensing Plans
	 jQuery('.goto-opt a').click(function() {
        jQuery('.goto-active').removeClass('goto-active');
        jQuery(this).addClass('goto-active');
    });
    jQuery('.tab').click(function() {
        jQuery('.handler').hide();
        jQuery('.' + jQuery(this).attr('id')).show();
        jQuery('.active').removeClass('active');
        jQuery(this).addClass('active');
        jQuery('.' + jQuery(this).attr('id') + '-rot').css('transform', 'rotateY(0deg)');
        jQuery('.common-rot').not('.' + jQuery(this).attr('id') + '-rot').css({
            'transform': 'rotateY(180deg)',
            'transition': '0.3s'
		});
        jQuery('.cp-single-site, .cp-multi-site').removeClass('show');
        jQuery('.cp-' + jQuery(this).attr('id')).addClass('show');
        jQuery('.' + jQuery(this).attr('id') + ' .clk-icn i').removeClass('fa-expand-alt').addClass('fa-times');
    });
    jQuery('.clk-icn').click(function() {
        jQuery(this).find('i').toggleClass('fa-times fa-expand-alt');
    });
	
	jQuery("#compare-plans").click(function(){ 
        if (jQuery('#demo').hasClass("show")) { 
            jQuery('#demo').removeClass('show');
            jQuery('#demo').removeClass('in');
        } else {
            jQuery('#demo').addClass('show');
            jQuery('#demo').removeClass('in');
        }
    });

    jQuery("#compare-multi-plans").click(function(){ 
        if (jQuery('#demo1').hasClass("show")) { 
            jQuery('#demo1').removeClass('show');
            jQuery('#demo1').removeClass('in');
        } else {
            jQuery('#demo1').addClass('show');
            jQuery('#demo1').removeClass('in');
        }
    });

    jQuery('.goto-opt a').click(function(e) {
        var href = jQuery(this).attr("href"),
            offsetTop = href === "#" ? 0 : jQuery(href).offset().top - 180;
        jQuery('html, body').stop().animate({
            scrollTop: offsetTop
        }, 300);
    });
    const toggles = document.querySelectorAll(".faq-toggle");
    toggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            toggle.parentNode.classList.toggle("active");
        });
    });
    jQuery(".tab-us").css('border-bottom', '1px solid #2f4f4f');
    jQuery(".instances").css('border-bottom', '4px solid #2f4f4f');
    jQuery(".integration-section").css('display', 'none');
    jQuery("#instances").css('display', 'block');
    jQuery(".multi-network").click(function() {
        jQuery(".integration-section").css('display', 'none');
        jQuery("#multi-network").css('display', 'block');
        jQuery(".multi-network").css('border-bottom', '4px solid #2f4f4f');
    });
    jQuery(".instances").click(function() {
        jQuery(".integration-section").css('display', 'none');
        jQuery("#instances").css('display', 'block');
        jQuery(".instances").css('border-bottom', '4px solid #2f4f4f');
    });
    jQuery(".multi-idp").click(function() {
        jQuery(".integration-section").css('display', 'none');
        jQuery("#multi-idp").css('display', 'block');
        jQuery(".multi-idp").css('border-bottom', '4px solid #2f4f4f');
    });
    jQuery(".multi-network,.instances,.multi-idp").hover(function() {
        jQuery(".tabs11,.tab-us").css('border-bottom', '1px solid #2f4f4f');
    });
    jQuery(".intg-tab").click(function() {
        jQuery(".intg-tab").removeClass('active-tab');
        jQuery(this).addClass('active-tab');
    });
    jQuery(window).scroll(function() {
        var scrollDistance = jQuery(window).scrollTop();
        var num = -1;

        jQuery('.saml-scroll').each(function(i) {
            if (jQuery(this).offset().top - 450 <= scrollDistance) {
                num = i;
            }
        });
        if (num != -1) {
            jQuery('.goto-opt a.goto-active').removeClass('goto-active');
            jQuery('.goto-opt a').eq(num).addClass('goto-active');
        } else {
            jQuery('.goto-opt a.goto-active').removeClass('goto-active');
        }
    }).scroll();


	//IDP grid div 
	jQuery('#mo_saml_search_idp_list').keyup(function(){
		var value = jQuery(this).val().toLowerCase();
		var customidp = '';
		var counter = 0;
		document.getElementById('mo_saml_search_custom_idp_message').style.display = "none";
		jQuery("#mo_saml_idps_grid_div li").filter(function(){
			var p = jQuery(this).find('a');
			var di = p.html();
			var div1 = di.split('<br>')[1].split('<h4>')[1].split('</h4>')[0];
			if(div1.toLowerCase().indexOf(value)>-1){
				jQuery(this).css("display","inline-block");
				counter+=1;
			}else{
				jQuery(this).css("display","none");
			}
			if(div1.toLowerCase().indexOf('custom idp')>-1){
				customidp = jQuery(this);
			}

		});
		if(counter == 0){
			customidp.css('display','inline-block');
			document.getElementById('mo_saml_search_custom_idp_message').style.display = "";
		}
	});

	jQuery('#mo_saml_idps_grid_div li').on('click',function(){
        document.getElementById('mo_saml_selected_idp_div').style.display = "";
        var video_link = jQuery(this).find('a').data('video');
        var video_index = jQuery(this).find('a').data('idp-value');
        if(video_index == ''){
            document.getElementById('saml_idp_video_link').style.display = "none";
        }
        else{
            document.getElementById('saml_idp_video_link').style.display = "";
            document.getElementById("saml_idp_video_link").href = video_link;
        }

        var guide_link = jQuery(this).find('a').data('href');
        document.getElementById("saml_idp_guide_link").href = guide_link;
        document.getElementById("mo_saml_selected_idp_icon_div").innerHTML = jQuery(this).html();
        document.getElementById("saml_identity_provider_guide_name").value = jQuery(this).html().split('<br>')[1].split('<h4>')[1].split('</h4>')[0];
        if(document.getElementById("saml_identity_provider_guide_name").value==="Custom IDP"){
            document.getElementById('custom_idp_selected').style.display = "block";
            document.getElementById("custom_idp_selected").innerHTML = "<p style=\"font-size: 18px;background: #f3f5f6;padding-top: 10px;padding-bottom: 10px;padding-left: 9px;border-radius: 16px;\"><i><b>Note: </b>Please feel free to reach out to us in case of any issues for setting up the Custom IDP using the Contact Us dialog</i></p>"
        }
        else{
           document.getElementById('custom_idp_selected').style.display = "none";
        }
         document.getElementById('selected_idp_div').style.zIndex = 2;

		var idp_name = document.getElementById("saml_identity_provider_guide_name").value;
        if(idp_name =="Azure B2C")
		 {   
		 	document.getElementById("saml_pw_reset_url_row").hidden = false;
		 	document.getElementById("saml_pw_reset_url_space").hidden = false;
		 }
		 else{ 
		     document.getElementById("saml_pw_reset_url_row").hidden = true;
		 	document.getElementById("saml_pw_reset_url_space").hidden = true;
		 }
        jQuery('html, body').animate({
           'scrollTop' : jQuery("#mo_saml_selected_idp_div").offset().top-50
		}, 600);
    });

	jQuery("#mo_saml_idps_grid_div li").filter(function(){
		var p = jQuery(this).find('a');
		var value = jQuery("#saml_identity_provider_guide_name").val(); 
		var di = p.html();
		var div1 = di.split('<br>')[1].split('<h4>')[1].split('</h4>')[0];
		if(div1.toLowerCase().indexOf(value.toLowerCase())>-1){
			document.getElementById("mo_saml_selected_idp_icon_div").innerHTML = jQuery(this).html();
			 var guide_link = jQuery(this).find('a').data('href');
			 document.getElementById("saml_idp_guide_link").href = guide_link;

			 var video_link = jQuery(this).find('a').data('video');
			 var video_index = jQuery(this).find('a').data('idp-value');
			 if(video_index == ''){
				 document.getElementById('saml_idp_video_link').style.display = "none";
			 }
			 else{
				 document.getElementById('saml_idp_video_link').style.display = "";
				 document.getElementById("saml_idp_video_link").href = video_link;
			 }
		}
	});

	if(!jQuery('#saml_identity_provider_guide_name').val()){		
		jQuery("#mo_saml_selected_idp_div").css('display','none');
	}
	
});

function getlicensekeysform(){
				jQuery("#loginform").submit();
}