/*
 *
 * constants needed to setup:
 * COOKIE_NAME_NL_SIGNUP
 * COOKIE_EXP_DAYS_NL_SIGNUP
 *
 *
 * depends on following:
 * cms-misc.js              // helper functions for cookies
 *
 * flow.js                  // sending user to flow when
 *                          // successful signup
 *
 *
 *
 */

var dhtml_v2 = {
    _dhtmlData: {},
    _mobile: false,
    _delay: 0,
    _noDhtmlPixels: "",
    _status: "",

    _privacy_loaded: false,

    displayDhtml: false, // this does not get referenced in class. need it?
    displayingDhtml: false, // 2017-11-21 added, this gets referenced in code after ajax returns. i chose to explicitly add

    linkSource: {
        nscID: 0,
        partner: "",
        sourcecode: ""
    },

    onDone: null,
    done: function (callback) {

        // set the onDone handler
        if ((callback != undefined) && (typeof callback == 'function')) {
            this.onDone = callback;

            if (dhtml_v2._status == "done") {
                this.onDone(dhtml_v2.displayingDhtml);
            }
        }

        // if no param passed, and this.onDone is not null
        if (callback == undefined) {
            dhtml_v2._status = "done";
            dhtml_v2.addPixels();

            if (this.onDone !== null) {
                // call dhtml_v2.onDone and pass the displayingDhtml prop (true/false)
                this.onDone(dhtml_v2.displayingDhtml);
            }
        }

    },

    setDelay: function (delay) {
        this._delay = delay;
    },

    setNoDhtmlPixels: function (p) {
        this._noDhtmlPixels = p;
    },

    addPixels: function () {
        if (window.hasOwnProperty('Copush')) {
            Copush.config({ shouldPromptLanding: true });
        }


        if (window.tl_pixels != undefined) {
            window.tl_pixels.checkEvents();
        }
        
    },
    
    

    initialize: function () {
        
        // both viewportGreyout and newsletterSignUpDivAnime are in the html_tpl
        dhtml_v2.greyport_node = document.getElementById('viewportGreyout');
        // just be sure 
        dhtml_v2.greyport_node.classList.remove('show');
        
        dhtml_v2.dhtmlDiv = document.getElementById('newsletterSignUpDivAnime');
        
        
        

        var hidden;
        if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
            hidden = "hidden";
        } else if (typeof document.mozHidden !== "undefined") {
            hidden = "mozHidden";
        } else if (typeof document.msHidden !== "undefined") {
            hidden = "msHidden";
        } else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
        }

        // Only run if the page is not hidden
        // if its hidden then return
        if (document[hidden]) {
            dhtml_v2.done();
            return
        }

        
        if (dhtml_v2.dhtmlDiv.dataset.nscID > 0) {
            this.linkSource.nscID = dhtml_v2.dhtmlDiv.dataset.nscId;
        }
        if (dhtml_v2.dhtmlDiv.dataset.sourcecode > 0) {
            this.linkSource.sourcecode = dhtml_v2.dhtmlDiv.dataset.sourcecode;
        }
        if (dhtml_v2.dhtmlDiv.dataset.partner > 0) {
            this.linkSource.partner = dhtml_v2.dhtmlDiv.dataset.partner;
        }


        // no link source set AND we are on contest/sweeps page
        if ((this.linkSource.nscID != undefined) && (this.linkSource.nscID == 0) && (document.location.pathname.indexOf("/sweeps/") > -1)) {
            // do not show a dhmtl
            dhtml_v2.done();
            return;
        }



        // if on subcenter then don't show dhtml
        if (document.location.pathname.indexOf("/section/subctr") !== -1) {
            // User on subcenter doesn't need to see a dhtml
            cmsMisc.createCookie(COOKIE_NAME_NL_SIGNUP, COOKIE_EXP_DAYS_NL_SIGNUP, COOKIE_EXP_DAYS_NL_SIGNUP);
            dhtml_v2.done();

            return
        }

        // check screensize
        // if less than 600px then 
        // we will get the mobile dhtml
        if (window.innerWidth < 600) {
            dhtml_v2._mobile = true;
        }


        // get page load count
        this._dhtmlData['pageload'] = 1;
        if (localStorage.getItem('pageload') != null) {
            this._dhtmlData['pageload'] = parseInt(localStorage.getItem('pageload')) + 1;
        }
        localStorage.setItem('pageload', this._dhtmlData['pageload']);

        if (this._delay > 0) {
            this._dhtmlData['pageload'] = this._dhtmlData['pageload'] - this._delay;
        }


        // default this to true if 1st pageload and no NL signup cookie
        // this gets updated with 100% accurate value after we 
        // get the API call back for the DHTML
        if (this._dhtmlData['pageload'] == 1 && cmsMisc.readCookie(COOKIE_NAME_NL_SIGNUP) == null) {
            this.displayingDhtml = true;
        }


        // if we have signup cookie then don't do anything
        if (cmsMisc.readCookie(COOKIE_NAME_NL_SIGNUP) != null) {
            dhtml_v2.done();
            return;
        }


        // const defined at top
        if (this.linkSource.nscID && this.linkSource.nscID > 0) {
            this._dhtmlData['id'] = this.linkSource.nscID;

        } else {
            this._dhtmlData['sourcecode'] = this.linkSource.sourcecode;
            this._dhtmlData['sourcepartner'] = this.linkSource.partner;


            // get if user is organic
            // based on the referrer
            this._dhtmlData['organic'] = false;
            if (document.referrer.indexOf("google.com") > -1 ||
                localStorage.getItem('organic') != null) {

                this._dhtmlData['organic'] = true;
                localStorage.setItem('organic', this._dhtmlData['organic']);
            }

            if (this._mobile) {
                this._dhtmlData['device'] = "mobile";
            } else {
                this._dhtmlData['device'] = "desktop";
            }
            this._dhtmlData['sID'] = SID;
        }



        var r;
        var queryString = cmsMisc.objectToQueryString(this._dhtmlData);
        var the_url = "//api-prime.appspot.com/newsletter/dhtml?" + queryString;
        //console.log(the_url);

        // Win IE <= 10
        if (typeof XDomainRequest !== "undefined") {
            r = new XDomainRequest();
            r.open("GET", 'https:' + the_url);
            r.onload = function () {
                
                var responseJson = JSON.parse(r.responseText);

                // add the 100 character clause as a sanity check
                if (responseJson.creative && responseJson.creative.length > 100) {
                    dhtml_v2.displayingDhtml = true;
                    
                    dhtml_v2.dhtmlDiv.innerHTML = responseJson.creative;
                    //$("#newsletterSignUpDivAnime").html(responseJson.creative);


                    dhtml_v2._initDhtmlEvents();

                    window.tl_pixels.fireEvent('prefire');


                    if (dhtml_v2._mobile) {
                        dhtml_v2._showMobileDhtml();
                    } else {
                        dhtml_v2._showDhtml();
                    }
                } else {
                    dhtml_v2.done();
                }
            };


        } else if ('withCredentials' in new XMLHttpRequest()) {
            // modern / preferred

            //console.log('use XMLHttpRequest');
            r = new XMLHttpRequest();
            //r.onreadystatechange = dhtml_v2._dhtml_ready;
            r.onreadystatechange = function () {
                if (r.readyState != 4 || r.status != 200) return;

                var responseJson = JSON.parse(r.responseText);

                // add the 100 character clause as a sanity check
                if (responseJson.creative && responseJson.creative.length > 100) {
                    dhtml_v2.displayingDhtml = true;
                    
                    dhtml_v2.dhtmlDiv.innerHTML = responseJson.creative;
                    //$("#newsletterSignUpDivAnime").html(responseJson.creative);

                    dhtml_v2._initDhtmlEvents();
                    window.tl_pixels.fireEvent('prefire');


                    if (dhtml_v2._mobile) {
                        dhtml_v2._showMobileDhtml();
                    } else {
                        dhtml_v2._showDhtml();
                    }
                } else {
                    dhtml_v2.done();
                }
            };



            r.open("GET", 'https:' + the_url, true);
        }



        if (r == undefined) {
            dhtml_v2.done();
            return;
        }
 
        if (window.tl_pixels != undefined) {
            window.tl_pixels.fireEvent('prefire');
        }


        r.send();
        
    }, // initialize
    

    // this gets called after dhtml
    // is added to the DOM
    _initDhtmlEvents: function () {
        console.log('_initDhtmlEvents');
        
        
        let is_pencil = false;
        
        // check for pencil/placemat ads and add a link for privacy
        if( document.querySelector('.bannerDhtml .newsletterSignUpDivAnimeFormWrapper') !== null ){
            
            is_pencil = true;
            
            //document.querySelector('.bannerDhtml').style.maxHeight = '200px'; // increasing the max height so I can add content
            
            // just easier in jq...
            // EXCEPT WE ARE NOT USING JQ
            // AND I DO NOT KNOW HOW TO TEST THIS YET
            //$(".bannerDhtml .newsletterSignUpDivAnimeFormWrapper").append('<p class="pencilPrivacyLinks">[ <a href="/index.php/hct/privacy_policy" target="privacy">Privacy Policy</a> ] [ <a href="/index.php/hct/privacy_policy#sectionCaliforniaResidents" target="privacy">Information Use</a> ]</p>');
            
        }
        
        

        // add 'information use' link TO CERTAIN creatives (I think the big dhtml and the mobile, not the pencil)
        // newsletterSignUpOpenInfoPolicy is the id of the "info use" link
        if(document.querySelector("#newsletterSignUpOpenInfoPolicy") === null  &&  is_pencil == false) {
            // newsletterSignUpOpenPrivacyPolicy is the id of the "privacy link" IT IS DESKTOP/BIG
            // find the parent of the "privacy link", append a link for "info use"
            
            // EXCEPT WE ARE NOT USING JQ
            // AND I DO NOT KNOW HOW TO TEST THIS YET
            //$("#newsletterSignUpOpenPrivacyPolicy").parent().append('[ <a id="newsletterSignUpOpenInfoPolicy" href="" target="_blank"></a> ]');
            
        }
        
        
        // typo fix
        if( document.getElementById('newsletterSignUpOpenInfoPolicy') !== null) {
            // get the "info use" (which was either in the orig html or added)
            let info_use_link = document.getElementById('newsletterSignUpOpenInfoPolicy');
            // update its text, fixing any issues in the orig html
            info_use_link.innerHTML = 'Information Use';
        }
        
        
        
        // see if we have privacy policy support / html
        if(document.querySelector("#newsletterSignUpPrivacyPolicy") === null) {
            // add this bit of html
            
            var html_str = '<div id="newsletterSignUpPrivacyPolicy" style="display:none;"><div>';
            
            
            // mobile support (not sure which dhtml this is. presumbaly "mobile dhtml" and not pencil/placemat
            
            // EXCEPT WE ARE NOT USING JQ
            // AND I DO NOT KNOW HOW TO TEST THIS YET
            
            //$("#newsletterSignUpDivAnime .mobile-dhtml .nscID_inner").append(html_str);
        }
        
        
        
        // check the submit button. some coming from appspot do not have text/valie for the submit button
        if ( (dhtml_v2.dhtmlDiv !== null)) {
            let btn = dhtml_v2.dhtmlDiv.querySelector('form [type=submit]');
            if ( (btn !== null)) {
                btn.value = 'Submit for FREE Access!';
            }
        }
        
        /*
        if( $('#newsletterSignUpDivAnime').length > 0  &&  $('#newsletterSignUpDivAnime form [type=submit]').val() == '' ){
            $('#newsletterSignUpDivAnime form [type=submit]').val('Submit for FREE Access!');
        }*/
        
        
        
        // set event hanlder for close link
        dhtml_v2.dhtmlDiv.querySelector('#newsletterSignUpDivAnimeCloseLink').addEventListener(
            'click', 
            function(evt){
                console.log('click close dhtml');
                evt.preventDefault();
                
                dhtml_v2.closeDhtml();
            }
        );
        
        //$("#newsletterSignUpDivAnimeCloseLink").click(this.closeDhtml);
        
        
        
        // #newsletterSignUpDivAnime is the base id for mobile and big dhtml dhtml
        // #newsletterSignUpOpenPrivacyPolicy is the "privacy link" id ( BIG dhtmls)
        // .newsletterSignUpPrivacyLink seems to be a class wrapper for the "privacy link" link [MAYBE JUST BIG DHTML???]
        // #newsletterSignUpDivAnime .newsletterSignUpPrivacyLink  is mobile [THE CLASS IS ON THE <A>]
        
        let privacy_policy_links = dhtml_v2.dhtmlDiv.querySelectorAll("#newsletterSignUpOpenPrivacyPolicy, #newsletterSignUpDivAnime .newsletterSignUpPrivacyLink a, #newsletterSignUpDivAnime .newsletterSignUpPrivacyLink");
        
        privacy_policy_links.forEach((node) => {
            
            node.addEventListener('click',  (evt) => {
                evt.preventDefault();
                
                dhtml_v2.privacy_anchor = '';
                dhtml_v2._showPrivacyText('');
            });
            
        });
        /*
        $("#newsletterSignUpOpenPrivacyPolicy, #newsletterSignUpDivAnime .newsletterSignUpPrivacyLink a, #newsletterSignUpDivAnime .newsletterSignUpPrivacyLink").click(function (e) {
            e.preventDefault();
            
            
            dhtml_v2.privacy_anchor = '';
            dhtml_v2._showPrivacyText('');
        });*/
        
        
        
        let info_policy_links = dhtml_v2.dhtmlDiv.querySelectorAll("#newsletterSignUpOpenInfoPolicy");
        
        info_policy_links.forEach((node) => {
            
            node.addEventListener('click',  (evt) => {
                evt.preventDefault();
                
                dhtml_v2.privacy_anchor = 'sectionCaliforniaResidents';
                dhtml_v2._showPrivacyText();
            });
            
        });
        
        /*
        $("#newsletterSignUpOpenInfoPolicy").click(function (e) {
            e.preventDefault();
            
            dhtml_v2.privacy_anchor = 'sectionCaliforniaResidents';
            dhtml_v2._showPrivacyText();
            
        });
        */


        // the dhtml has one with ID and one w/ CLASS...
        let close_privacy_links = dhtml_v2.dhtmlDiv.querySelectorAll("#closePrivacyContentLink, .closePrivacyContentLink");
        close_privacy_links.forEach((node) => {
            
            node.addEventListener('click',  (evt) => {
                evt.preventDefault();
                
                document.getElementById('newsletterSignUpPrivacyPolicy').style.display = 'none';
            });
            
        });
        
        /*
        $("#closePrivacyContentLink, .closePrivacyContentLink").click(function (e) {
            e.preventDefault();
            $("#newsletterSignUpPrivacyPolicy").slideUp();
            return false;
        });
        */
        
        
        
        // when the user clicks the text field, blank any default value
       
if(dhtml_v2.dhtmlDiv.querySelector('#newsletterSignUpFormAnime #emailAnime') != null) { 
        dhtml_v2.dhtmlDiv.querySelector('#newsletterSignUpFormAnime #emailAnime').addEventListener(
            'click', 
            function(evt){
                evt.preventDefault();
                
                evt.currentTarget.focus();
                evt.currentTarget.value = '';
            }
        );
        /*
        $("#newsletterSignUpFormAnime #emailAnime")
            .focus(function () {
                $(this).val('');
            });
          */  
           } 
        
        // ajaxForm setup
        this.setupDhtmlForm();
    },
    
    _showPrivacyText: function () {
        dhtml_v2._getPrivacyText();
        
        
        document.getElementById('newsletterSignUpPrivacyPolicy').style.display = 'block';
        
        /*
        $("#newsletterSignUpPrivacyPolicy").slideDown(
            400,
            function(){
                //console.log('slideDown complete');
                
                // did we set an anchor
                if(dhtml_v2.privacy_anchor !== ''){
                    // check if privacy html loaded yet
                    let delay = 100;
                    if(dhtml_v2._privacy_loaded == false){
                        let delay = 2000;
                    }
                    
                    setTimeout("dhtml_v2._scrollPrivacy()", delay);
                }
            }
        );  
        */
    },
    
    _scrollPrivacy: function(){
        
        // if the anchor is in the html
        if( $('#' + dhtml_v2.privacy_anchor).length > 0){
            // scroll to the anchor
            $('#newsletterSignUpPrivacyPolicy > div').animate(
                { 
                    scrollTop: $('#' + dhtml_v2.privacy_anchor).offset().top 
                }, 
                500
            );
        }
        
        
    },

    _getPrivacyText: function () {
        //console.log('get privacy nl');

        if (dhtml_v2._privacy_loaded == true) {
            return;
        }
        
        
        document.getElementById('newsletterSignUpPrivacyPolicy').innerHTML = '<img style="display: block; margin: 0 auto; max-width: 220px;" src="/images/ajax-loader-bar.gif">';
        //$("#newsletterSignUpPrivacyPolicy").html('<img style="display: block; margin: 0 auto;" src="/images/ajax-loader-bar.gif">');
        
        
        
        // Set up our HTTP request
        var xhr = new XMLHttpRequest();
        
        // Setup our listener to process completed requests
        xhr.onload = function () {
        
        	// Process our return data
        	if (xhr.status >= 200 && xhr.status < 300) {
        		// Runs when the request is successful
        		//console.log(JSON.parse(xhr.responseText));
        		
        		document.getElementById('newsletterSignUpPrivacyPolicy').innerHTML = xhr.responseText;
        		
        		// apply js to some content
                dhtml_v2._initDhtmlEvents();
                
                
        		dhtml_v2._privacy_loaded = true;
        		
        	} else {
        		// Runs when it's not
        		//console.log(JSON.parse(xhr.responseText));
        	}
        
        };
        
        // Create and send a GET request
        // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
        // The second argument is the endpoint URL
        xhr.open('GET', '/ajax_process.php?task=get_nl_dhtml_privacy&hct=privacy_policy');
        xhr.send();
        
        
        /**

        $.ajax({
            url: "/ajax_process.php",
            type: 'GET',
            cache: false,
            dataType: "html",
            timeout: 10000,
            data: (
                {
                    //task: 'get_html_content',
                    task: 'get_nl_dhtml_privacy',
                    hct: 'privacy_policy'
                }
            ),
            complete: function () {

            },
            success: function (html) {
                
                // for now
                // not that this replaces everything in the newsletterSignUpPrivacyPolicy div
                document.getElementById('newsletterSignUpPrivacyPolicy').innerHTML = html;
                //$("#newsletterSignUpPrivacyPolicy").html(html);
                
                // we removed some html that needs js applied, so call this again...
                dhtml_v2._initDhtmlEvents();
                
                
                dhtml_v2._privacy_loaded = true;

            }
        });
        */

    },

    _showDhtml: function () {
        
        
        if ( (dhtml_v2.dhtmlDiv == null) || dhtml_v2.dhtmlDiv.innerHTML.length < 100) {
            return false;
        }
        
        
        
        

        var doc_width = parseInt(document.body.clientWidth);
        //var doc_height = document.body.clientHeight;
        
        
        // add the dhtml to the page so it has a width
        dhtml_v2.dhtmlDiv.style.top = '-999px'; // posistion off the page
        dhtml_v2.dhtmlDiv.style.display = 'block';
        
        
        
        var popup_width = parseInt(dhtml_v2.dhtmlDiv.offsetWidth);
        //var popup_width = $("#newsletterSignUpDivAnime").width();
        

        var popup_left = 0;
        if (popup_width < doc_width) {
            popup_left = (doc_width - popup_width) / 2;
            
            console.log('doc_width', doc_width);
            console.log('popup_width', popup_width);
            console.log('(doc_width - popup_width)', (doc_width - popup_width));
            
            console.log('aaa popup_left', popup_left);
        }
        
        console.log('bbb popup_left', popup_left);
        
        
        // reset top so its on the page  (header / fixed seems to be affecting the top value)
        dhtml_v2.dhtmlDiv.style.top = '0px'; 
        dhtml_v2.dhtmlDiv.style.left = popup_left + 'px';
        //dhtml_v2.dhtmlDiv.style.display = 'block';
        
        /*
        return;
        
        $("#newsletterSignUpDivAnime").css("top", '-600px');
        $("#newsletterSignUpDivAnime").css("left", popup_left + 'px');
        $("#newsletterSignUpDivAnime").show();
        */
        
        
        
        
        
        
        dhtml_v2.greyport_node.classList.add('show');
        
        
        
        /*
            
            skipping animation for the time being
            
        $("#newsletterSignUpDivAnime").animate(
            { "top": "10px" },
            "slow",
            '',
            function () {

                // this fires after the popup is in place
                // fade out the div that will be placed over the page
                // the div is not visible at this point, but we use fade out so we can fade it in after the css updates are made

                $('#viewportGreyout').fadeTo(
                    "fast",
                    0.0,
                    function () {

                        // set some css for the div then fade it in
                        $('#viewportGreyout').css({
                            position: 'absolute',
                            margin: 0,
                            padding: 0,
                            'z-index': 500,
                            'top': '0',
                            'left': '0',
                            'width': doc_width + 'px',
                            'height': doc_height + 'px',
                            'background-color': '#000'
                        }).fadeTo("slow", 0.8);
                    }
                );
            }
        );
        */
        
        
        
        
    },

    _showMobileDhtml: function () {
        //console.log('_showMobileDhtml');

        // set grey background css
	document.querySelector("#viewportGreyout").style.postition = 'absolute';
        document.querySelector("#viewportGreyout").style.top = 0;
        document.querySelector("#viewportGreyout").style.left = 0;
        document.querySelector("#viewportGreyout").style.width = '100%';
        document.querySelector("#viewportGreyout").style.height = '100%';
        document.querySelector("#viewportGreyout").style.margin = 0;
        document.querySelector("#viewportGreyout").style.padding = 0;
        document.querySelector("#viewportGreyout").style.zIndex = 9999;
        document.querySelector("#viewportGreyout").style.backgroundColor = '#333';
        document.querySelector("#viewportGreyout").style.opacity = 0.5;
        document.querySelector("#viewportGreyout").style.display = 'block';

	

	/*
        $('#viewportGreyout').css({
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'width': '100%',
            'height': '100%',
            'margin': 0,
            'padding': 0,
            'z-index': 9999,
            'background-color': '#333',
            'opacity': 0.5
        });
	*/

        // hide ads
	let ads = document.querySelectorAll('.adDiv');
	for(var j = 0; j < ads.length; j++) {
		ads[j].style.display = 'none';
	}
        //$('.adDiv').hide();

        // display the signup form

	let dDiv = document.getElementById("newsletterSignUpDivAnime");
	dDiv.style.position = 'absolute';
	dDiv.style.top = '20px';
	dDiv.style.left = 0;
	dDiv.style.right = 0;
	dDiv.style.width = '85%';
	dDiv.style.margin = 'auto';
	dDiv.style.padding = '0 0 100px 0';
	dDiv.style.background = 'none';
	dDiv.style.zIndex = 9999;
	dDiv.style.display = 'block';


	function centerHorz(ele, wf) {
	  ele.style.transform = "translateX(" + wf + "px)";
	}


        /*
	$('#newsletterSignUpDivAnime').css({
            'position': 'absolute',
            'top': '20px',
            'width': '85%',
            'margin': 0,
            'padding': '0 0 100px 0',
            'background': 'none',
            'z-index': 99999
        }).centerHorz().show();
	*/

        // set the onclick of the newsletter sign up email text field
/*        $('#newsletterSignUpFormAnime input[type=email]').click(
            function () {

                if ($(this).hasClass('defaultTextFieldColor')) {
                    // remove the class that sets the text color to grey
                    $(this).removeClass('defaultTextFieldColor');
                    // remove the default text
                    $(this).val('');
                }
            }

        ).addClass('defaultTextFieldColor');
*/

        document.querySelector("#newsletterSignUpDivAnimeCloseLink").addEventListener('click', this.closeDhtml);

        this.setupDhtmlForm();



    },

    // on AFC call: dhtml_v2.testDhtml(188)
    testDhtml: function (id) {

        var r = new XMLHttpRequest();

        r.open("GET", "https://api-prime.appspot.com/newsletter/dhtml?id=" + id, true);
        r.onreadystatechange = function () {
            if (r.readyState != 4 || r.status != 200) return;

            var responseJson = JSON.parse(r.responseText);

            // add the 100 character clause as a sanity check
            if (responseJson.creative && responseJson.creative.length > 100) {
                
                dhtml_v2.dhtmlDiv.innerHTML = responseJson.creative;
//$("#newsletterSignUpDivAnime").html(responseJson.creative);

                nscID = 1001; // hack for animate function

                //animateDhtmlSignup();
                dhtml_v2._showDhtml();
                dhtml_v2._initDhtmlEvents();
            }
        };
        r.send();

    },

    setupDhtmlForm: function () {
        
        
	tlintr('dhtml', 'displayed');
        
        dhtml_v2.form = dhtml_v2.dhtmlDiv.querySelector('#newsletterSignUpFormAnime');
        
        dhtml_v2.form.addEventListener(
            'submit', 
            function(evt){
                evt.preventDefault();
		tlintr('dhtml', 'submitted');
                dhtml_v2.sendData(evt);
            }
        );
        
        
        
        return;



/*
        // newsletter signup form - dhtml
        $('#newsletterSignUpFormAnime').ajaxForm({
            beforeSubmit: function () {

                if (dhtml_v2._mobile) {
                    $('#newsletterSignUpFormAnime').css({ 'opacity': 0.3 });
                    $('#newsletterSignUpDivAnime .userFeedback_waiting').show();

                } else {
                    $('#newsletterSignUpDivAnime .newsletterSignUpDivAnimeFormUI').fadeTo("slow", 0.2);
                }
                return true;
            },

            dataType: 'json',
            success: function (response) {

                if (dhtml_v2._mobile) {
                    $('#newsletterSignUpDivAnime .userFeedback_waiting').hide();
                    $('#newsletterSignUpFormAnime').css({ 'opacity': 1.0 });
                }

                if (response.result > 0) {
                    // the user is signed up

                    // hide the sign up form fields
                    $('#newsletterSignUpDivAnime .newsletterSignUpDivAnimeFormUI').hide();

                    // display thanks
                    $('#newsletterSignUpThanksAnime').show();

                    // set a cookie so we know this user signed up
                    cmsMisc.createCookie(COOKIE_NAME_NL_SIGNUP, COOKIE_EXP_DAYS_NL_SIGNUP, COOKIE_EXP_DAYS_NL_SIGNUP);

                    if (response.optin_sent > 0) {
                        // send user to optin page
                        window.location.href = window.location.origin + '/optin';
                    } else {

                        flow.isNewSignup = response.is_new_signup;
                        flow.signupRedirect(response.email, response.enc_email);
                    }

                } else {
                    // display error

                    // hide the sign up form fields
                    $('#newsletterSignUpDivAnime .newsletterSignUpDivAnimeFormUI').hide();

                    // mobile
                    $('#newsletterSignUpDivAnime .userFeedback_error').show();
                    setTimeout("$('#newsletterSignUpDivAnime .userFeedback_error').hide();", 5000);

                    // desktop
                    $('#newsletterSignUpErrorAnime').show();
                    setTimeout('dhtml_v2.hideDhtmlSignupError()', 3500);
                }
            }
        }); /// end the code that hijacks the signup anime div
        */
    },

    hideDhtmlSignupError: function () {
        
        let node;
        
        node = dhtml_v2.dhtmlDiv.querySelector('#newsletterSignUpErrorAnime');
        if(node !== null){
            node.style.display = 'none';
        }
        //$('#newsletterSignUpErrorAnime').hide();
        
        
        // show the form again (mobile?)
        
        node = dhtml_v2.dhtmlDiv.querySelector('.newsletterSignUpDivAnimeFormUI');
        if(node !== null){
            node.style.display = 'block';
        }
        //$('#newsletterSignUpDivAnime .newsletterSignUpDivAnimeFormUI').show();
        
        
        // fade it up again
        //$('#newsletterSignUpDivAnime .newsletterSignUpDivAnimeFormUI').fadeTo("slow", 1);
    },

    closeDhtml: function () {
        // the user closed the window w/o signing up
        // plant a cookie so the signup does not appear for this session
        //setNlSignUpCookie();

        // closing doesn't mean jack sh*t anymore
        // per Erin / task #49218
        //cmsMisc.createCookie(COOKIE_NAME_NL_SIGNUP, 1, 0);

        /**
         *move the dhtml up off the page
         */
        
        
        
		tlintr('dhtml', 'closed');
        
        dhtml_v2.dhtmlDiv.style.display = 'none';
        dhtml_v2.dhtmlDiv.style.top = '-999px';
        
        // remove the signup html from the dom. saves memory?
        dhtml_v2.dhtmlDiv.innerHTML = '';
         
         
        dhtml_v2.greyport_node.classList.remove('show');
       
	if( document.querySelector("#viewportGreyout") != null ) {
        document.querySelector("#viewportGreyout").style.display = 'none';
	}
        
        dhtml_v2.done();
        
         /**
             skipping animation for now
        $("#newsletterSignUpDivAnime").animate(
            { "top": "-1000px" },
            "slow",
            function () {
                /**
                 *hide the grey out div
                 ***
                $('#viewportGreyout').css({
                    'width': '0px',
                    'height': '0px',
                    'background-color': 'transparent'
                }).fadeTo("fast", 0.0);

                /**
                 *remove the signup html from the dom
                 *saves memory?
                 *prevents the content from printing
                 ***
                $("#newsletterSignUpDivAnime").remove();
                dhtml_v2.done();
            }
        );*/


        return false;
        
    }, // closeDhtml
    
    
    
    // so far, anytime the form is submitted we run through here 
    sendData: function(evt){
        console.log('sendData', evt.target);
        
        evt.preventDefault();
        
        dhtml_v2.form.style.opacity = 0.3;
        
        
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
        const XHR = new XMLHttpRequest();
        
        // Bind the FormData object and the form element
        const FD = new FormData(dhtml_v2.form);
        
        
        // add data to send
        //FD.append('task', subscriberCenter_obj.login_form.task.value);
        //FD.append('api_key', 'xm83n2lxkdh');
        
        
        //FD.append('email', 'xxxx'); // force an error
        
        
        
        XHR.addEventListener("load", function(event) {
            //console.log('event.target.responseText', event.target.responseText);
            
            dhtml_v2.form.style.opacity = 1.0;
            
            var response = JSON.parse( event.target.responseText);
            console.log('response', response);
            
            
            if (dhtml_v2._mobile) {
                // NEEDS TO BE UPDATED / TESTED
                //$('#newsletterSignUpDivAnime .userFeedback_waiting').hide();
                //$('#newsletterSignUpFormAnime').css({ 'opacity': 1.0 });
            }
            
            
            if (response.result > 0) {
                // the user is signed up
		tlintr('dhtml', 'signup');
                
                
                // hide the sign up form fields
		if(dhtml_v2.dhtmlDiv.querySelector('.newsletterSignUpDivAnimeFormUI') != null) {
                dhtml_v2.dhtmlDiv.querySelector('.newsletterSignUpDivAnimeFormUI').style.display = 'none';
		}
                //$('#newsletterSignUpDivAnime .newsletterSignUpDivAnimeFormUI').hide();
                
                
                // display thanks
                // there is/was no text. i added a simple message
                // I am fairly certain we do NOT show a message, but just redirect, where there is a message
		if(dhtml_v2.dhtmlDiv.querySelector('#newsletterSignUpThanksAnime') != null ) {
                dhtml_v2.dhtmlDiv.querySelector('#newsletterSignUpThanksAnime').innerHTML = 'Thanks for signing up!';
                dhtml_v2.dhtmlDiv.querySelector('#newsletterSignUpThanksAnime').style.display = 'block';
                //$('#newsletterSignUpThanksAnime').show();
               	}


		if(dhtml_v2.dhtmlDiv.querySelector(".userFeedback_suucess") != null) {
			dhtml_v2.dhtmlDiv.querySelector(".userFeedback_suucess").style.display = "block";
		} 
                
                // set a cookie so we know this user signed up
                if(cmsMisc !== null){
                    cmsMisc.createCookie(COOKIE_NAME_NL_SIGNUP, COOKIE_EXP_DAYS_NL_SIGNUP, COOKIE_EXP_DAYS_NL_SIGNUP);
                }
                
                
                if (response.optin_sent > 0) {
                    // send user to optin page
                    window.location.href = window.location.origin + '/optin';
                } else if( typeof flow !== 'undefined'  &&  flow !== null){
                    flow.isNewSignup = response.is_new_signup;
                    flow.signupRedirect(response.email, response.enc_email);                    
                }else{
                    //dhtml_v2.closeDhtml();
                    
                    setTimeout("location.reload();", 3000);
                }

            } else {
                // display error
		tlintr('dhtml', 'signup_error');
                
                
                // hide the sign up form fields
                dhtml_v2.dhtmlDiv.querySelector('.newsletterSignUpDivAnimeFormUI').style.display = 'none';
                //$('#newsletterSignUpDivAnime .newsletterSignUpDivAnimeFormUI').hide();
                
                
                let node;
                
                // mobile
                node = dhtml_v2.dhtmlDiv.querySelector('.userFeedback_error');
                if(node !== null){
                    node.style.display = 'block';
                }
                //$('#newsletterSignUpDivAnime .userFeedback_error').show();
                
                
                node = dhtml_v2.dhtmlDiv.querySelector('.userFeedback_error');
                if(node !== null){
                    setTimeout("dhtml_v2.dhtmlDiv.querySelector('.userFeedback_error').style.display = 'none';", 5000);
                }
                //setTimeout("$('#newsletterSignUpDivAnime .userFeedback_error').hide();", 5000);

                
                // desktop
                node = dhtml_v2.dhtmlDiv.querySelector('#newsletterSignUpErrorAnime');
                if(node !== null){
                    node.style.display = 'block';
                }
                //$('#newsletterSignUpErrorAnime').show();
                setTimeout('dhtml_v2.hideDhtmlSignupError()', 3500);
                
            }
            
            
        });
        
        
        
        // Define what happens in case of error
        XHR.addEventListener("error", function(event) {
	    tlintr('dhtml', 'signup_request_error');
            alert('Oops! Something went wrong.');
        });
        
        
        // Set up our request
        XHR.open("POST", dhtml_v2.form.action);
    
        // The data sent is what the user provided in the form
        XHR.send(FD);
        
        
    
    } // sendData
};

window.dhtml_v2 = dhtml_v2;

if (!window.location.origin) {
    window.location.origin = window.location.protocol + "//"
        + window.location.hostname
        + (window.location.port ? ':' + window.location.port : '');
}





// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    //console.log('DOMContentLoadedCallback called');
    
    
    if(typeof dhtml_v2 != "undefined"  &&  typeof dhtml_v2.initialize != undefined){
        dhtml_v2.initialize();
    }else{
        console.log('no dhtml_v2 init');
    }
    
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    //console.log('DOM loaded 2');
    DOMContentLoadedCallback();
} else {
    //console.log('DOM loaded 1');
    document.addEventListener("DOMContentLoaded", DOMContentLoadedCallback);
}
