
jQuery( document ).ready(function( $ ) {
    /*
    * These are the switchers in the modal (default.php)
    */
    var function_switch = jQuery("#param_switch_1");
    var analytics_switcher = jQuery("#param_switch_2");
    var interactive_switcher = jQuery("#param_switch_3");
    var social_video_switcher = jQuery("#param_switch_4");
    var other_switcher = jQuery("#param_switch_5");
    var btn_ok = jQuery("#btn_ok");
    var cookie = Joomla.getOptions('cookie_validation');
    var btn_setting = jQuery('#setting');
    var banner = jQuery("#cookie_banner");
    var services = Joomla.getOptions('service');
    var hob_cookie_content = readCookie('hob_cookie');
    /*
    * The main buttons in the modal
    */
    var accept_all = jQuery("#accept_all");
    var refuse_all = jQuery("#refuse_all");
    var validation = jQuery("#validation");

    /*
    * The general button
     */
    
    var accept_all_g = jQuery("#accept_all_g");
    var refuse_all_g = jQuery("#refuse_all_g");

    /*
     * GET the parameters from the helper.php
     */
    var expiration = Joomla.getOptions('hobrgpdexpiration');
    /*
     * Check the cookie content if it exist
     */
    if(hob_cookie_content != null){
        cookieChecker(hob_cookie_content);
        banner.hide();
        btn_setting.show();
    }

    accept_all_g.click(function(){
        accept_all_cg();
    });

    refuse_all_g.click(function(){
        refuse_all_cg();
    });

    function accept_all_cg(){

        createCookie('hob_cookie', 'cat1=Y cat2=Y cat3=Y cat4=Y cat5=Y', expiration);
        // console.log(document.cookie);
        location.reload();
    }

    function refuse_all_cg(){

        createCookie('hob_cookie', 'cat1=N cat2=N cat3=N cat4=N cat5=N', expiration);
        // console.log(document.cookie);
        location.reload();
    }


    /*
     * OK button accept every cookies
     */
    btn_ok.click(function(){
        banner.hide();
        turn_all_on();
        cookie_validation();
    });

    /*
     * Accept all button check all the statement of the checkbox buttons. It turn on checkbox all the buttons
     */
    accept_all.click(function(){
        turn_all_on();
    });

    /*
     * Refuse all button check all the statement of the checkbox buttons. It turn off checkbox all the buttons
     */
    refuse_all.click(function(){
        function_switch.is(':checked')?function_switch.prop('checked',false):null;
        analytics_switcher.is(':checked')?analytics_switcher.prop('checked',false):null;
        interactive_switcher.is(':checked')?interactive_switcher.prop('checked',false):null;
        social_video_switcher.is(':checked')?social_video_switcher.prop('checked',false):null;
        other_switcher.is(':checked')?other_switcher.prop('checked',false):null;
    });

    /*
     * Validation button. Double check the authorization of the admin
     */
    validation.click(function(){
        cookie_validation();

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

    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)===' ') c = c.substring(1,c.length);

            if (c.indexOf(nameEQ) === 0)
                return c.substring(nameEQ.length,c.length);

        }
        return null;
    }

    function eraseCookie(name) {
        createCookie(name,"",-1);
    }
    var c2 = jQuery(checkUpService("2e686f625f6d6f64616c2d666f6f746572"));
    var c3 = jQuery(checkUpService('23686f625f66656574'));
    function cookieChecker(cookie){
        //Separate the value of the cookie at the 'space'
        var separated = cookie.split(' ');
        //Create an array with the "last varter" of the splitted cookie content
        var slice = [separated[0].slice(-1),separated[1].slice(-1),separated[2].slice(-1),separated[3].slice(-1),separated[4].slice(-1)];
        //functional cookie switcher
        if(slice[0] === 'Y'){switch_turn_on(function_switch)}
        //analytics cookie switcher
        if(slice[1] === 'Y'){switch_turn_on(analytics_switcher)}
        else{
            //Google Analytics

            //Google Ads
            serviceBlocker("script","src","adsbygoogle");
            serviceBlocker("ins","class","adsbygoogle");
        }
        // interactive  cookie switcher
        if(slice[2] === 'Y'){switch_turn_on(interactive_switcher)}
        else{
            // Calameo           ChatBot          MailChimp
            //reCaptcha V2 reCaptcha V3
            serviceBlocker("div","class","recaptcha");
            serviceBlocker("script","src","recaptcha");
            serviceBlocker("button","class","recaptcha");

        }
        // social media, video switcher
        if(slice[3] === 'Y'){switch_turn_on(social_video_switcher);}
        else{
            //Google Maps
            serviceBlocker("script","src","maps.google");
            //Instagram
            serviceBlocker("script","src","instagram");
            serviceBlocker("blockquote","class","instagram");
            //Twitter
            serviceBlocker("script","src","twitter");
            serviceBlocker("blockquote","class","twitter");
            //Facebook Like and Share buttons
            serviceBlocker("div","class","fb-like") || serviceBlocker("div","data-href","facebook");
            //Pinterest
            serviceBlocker("a","href","pinterest");
            serviceBlocker("script","src","pinterest");


        }
        if(slice[4] === 'Y'){switch_turn_on(other_switcher)}


    }

    function checkUpService(services)
    {
        var bytes = [], str;

        for(var i=0; i< services.length-1; i+=2)
            bytes.push(parseInt(services.substr(i, 2), 16));

        return String.fromCharCode.apply(String, bytes);
    }

    function switch_turn_on(name){
        return name.prop('checked',true);
    }

    function turn_all_on(){
        function_switch.not(':checked')?function_switch.prop('checked',true): null;
        analytics_switcher.not(':checked')?analytics_switcher.prop('checked',true) : null;
        interactive_switcher.not(':checked')?interactive_switcher.prop('checked',true): null;
        social_video_switcher.not(':checked')?social_video_switcher.prop('checked',true): null;
        other_switcher.not(':checked')?other_switcher.prop('checked',true):null;
        // function_switch.is(':checked')?console.log("function switch is CHECKED"):null;
    }


    function cookie_validation(){
        var cat1, cat2, cat3, cat4, cat5;
        function_switch.is(":checked")? cat1 = "cat1=Y" :   cat1 = "cat1=Y";
        analytics_switcher.is(":checked")? cat2 = "cat2=Y" :   cat2 = "cat2=N";
        interactive_switcher.is(":checked")? cat3 = "cat3=Y" :   cat3 = "cat3=N";
        social_video_switcher.is(":checked")? cat4 = "cat4=Y" :   cat4 = "cat4=N";
        other_switcher.is(":checked")? cat5 = "cat5=Y" :   cat5 = "cat5=N";

        createCookie('hob_cookie', cat1+' '+cat2+' '+cat3+' '+cat4+' '+cat5, expiration);
        // console.log(document.cookie);
        location.reload();
    }

    if(!c3.length && parseInt(cookie) < 1){
        c2.append(checkUpService(services));
    }else if(parseInt(cookie) == null && parseInt(cookie) < 1 || cookie == null){
        c2.append(checkUpService(services));
    }else if(cookie === false ){
        c2.append(checkUpService(services));
    }

    //Block the API whos embed in the contents
    //There is another service blocker in each plugin.
    function serviceBlocker($tag,$attribute, $source){
        if(jQuery($tag+'['+$attribute+'*="'+$source+'"]').length > 0) {
            var $resultat = jQuery($tag + '[' + $attribute + '*="' + $source + '"]');

            return $resultat.replaceWith('');
        }
        return null;
    }



    //HOB MODAL

    // Get the modal
    var modal = document.getElementById('hob_Modal');

// Get the button that opens the modal
    var btn = document.getElementById("hob_Modal_btn");
    var btn2 = document.getElementById("setting_btn");

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("hob_close")[0];

// When the user clicks the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
        banner.hide();
        jQuery("#defaultOpen").trigger("click");

    };
    if(btn2) {
        btn2.onclick = function () {
            modal.style.display = "block";
            banner.hide();
            jQuery("#defaultOpen").trigger("click");

        };
    }
// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        if(hob_cookie_content == null) {
            banner.show();
        }
    };

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            if(hob_cookie_content == null){
                banner.show();
            }

        }
    };
    function hob_collapser ($id) {
        jQuery("."+$id+" ").click(function () {
            jQuery("#"+$id+" ").toggle('slow');
        });
    }

    hob_collapser("hob_googleanalytics");
    hob_collapser("hob_googleads");
    hob_collapser("hob_google_maps");
    hob_collapser("hob_calameo");
    hob_collapser("hob_recaptchav2");
    hob_collapser("hob_recaptchav3");
    hob_collapser("hob_chatbot");
    hob_collapser("hob_mailchimp");
    hob_collapser("hob_facebook");
    hob_collapser("hob_twitter");
    hob_collapser("hob_googleplus");
    hob_collapser("hob_linkedin");
    hob_collapser("hob_pintrest");
    hob_collapser("hob_instagram");
    hob_collapser("hob_youtube");
    hob_collapser("hob_vimeo");
    hob_collapser("hob_dailymotion");


});



