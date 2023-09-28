( function( $ ) {

	'use strict';

	var themePath = window.js_details.theme_uri + '/';
	var ajaxPath = window.js_details.ajax_url;


	///////////////////////////////////////////
	///	Whois / Provider captchas

	// Bind listener for the whois and provider forms
	if($('#form-whois').length || $('#form-provider').length){
		$("#form-whois, #form-provider").submit(function(event) {
			reCaptchaMe(event);
		} );
		$("#form-whois .button, #form-provider .button" ).click( function( e ) {
			const form = e.target.closest( 'form' );
			reCaptchaMe( e );
		} );
	}



	/**
	* @function displayReCatpcha
	* @description Resets all the form inputs to their original view.
	* @param {string} variableName description of variable
	**/
	// code to show captcha and disable page
	function displayReCatpcha(form) {
		var myForm = $("#" + form + "-recaptcha-form"),
			myCaptcha = $("#" + form + "-recaptcha");
			//overlay = $('<div id="overlay"></div>'),
			//body = $(document.body);

		//overlay.css({ 'left': 0, 'top': 0, 'height': body.outerHeight(), 'width': body.outerWidth() });
		//overlay.insertAfter(document.body);
		//overlay.fadeTo(0, 0.5);
		myForm.show();
		$("#recaptcha_response_field").focus();
	    $("#" + form + "-cancel").bind("click", cancelReCaptcha);
		
		//$('body').addClass('stop-scrolling'); // Prevent scrolling
		//$('body').bind('touchmove', function(e){e.preventDefault()});
		
	}

	/**
	*
	* @function cancelReCaptcha
	* @description Resets all the form inputs to their original view.
	* @param {string} variableName description of variable
	**/
	// Remove captcha if user cancels
	function cancelReCaptcha(e) {
		e.preventDefault(); // stop the click
	    //$('#overlay').remove();
	    $(e.target).parents(".popup-captcha").hide();

		// Remove recaptcha container to avoid "placeholder element must be empty" error.
		$('#' + e.currentTarget.name + '-recaptcha').remove();
		
		//$('body').removeClass('stop-scrolling'); // Enable scrolling
		//$('body').unbind('touchmove');
	}

	/**
	* @function reCaptchaMe
	* @description Resets all the form inputs to their original view.
	* @param {string} variableName description of variable
	**/
	// force a re-captcha check on a form before submission
	function reCaptchaMe(e) {

		// stop the original form from submitting
		e.preventDefault();

		var myForm = e.target;
		if( e.target.tagName !== 'FORM' ) {
			myForm = e.target.closest( 'form' );
		}

		console.log( 'target', myForm );

		var formType = myForm.name,
		 	domain = jQuery("#input-"+formType).val(),
			myCaptcha;

		// Remove the "www" form the domain string
		domain = domain.replace("www.", "");
		domain = domain.replace("https://", "");
		domain = domain.replace("http://", "");



		// Create recaptcha container on the fly so it can be removed completely
		// if cancelled to avoid "placeholder element must be empty" error.
		$('<div id="' + formType + '-recaptcha"></div>').insertAfter( '#captcha-' + formType );

		// Validate that the domain contains one or two periods, doesnâ€™t end in a period and isn't empty
		if (domain === "" || domain.indexOf('.') === -1 || domain.slice(-1) === '.') {

			// Display error message
			$("#" + myForm.id + " .error_msg").css({ 'display': 'block' });
			return;

		} else {

			// Remove error message
			$("#" + myForm.id + " .error_msg").css({ 'display': 'none' });

			// Set the whois to the new form
			$("#captcha-" + formType)[0].value = domain;

			// Init captcha
			myCaptcha = grecaptcha.render(formType + '-recaptcha', {
				'sitekey' : '6LcX6-oSAAAAAFYx9UH6piKsSFSa9UmmA8PlCGrM',
				'callback' : function() {displayReCatpcha(formType);},
				'theme' : 'light'
			});

			// Show the captcha on page
			displayReCatpcha(formType);
		}

	}



	
	
	
	
	// Set listeners for all views
	$(window).scroll(function() {
		setFixedHeader();
		closeDropDownMenu();
	});
	
	function setFixedHeader() {
		
		// Close all open dropdowns
		$('.sub-menu').removeClass('open');

		// Get the header
		var header = document.getElementById('header');

		// Get the offset position of the navbar
		var sticky = header.offsetTop;

		if (window.pageYOffset > sticky) {
			header.classList.add('sticky');
		} else {
			header.classList.remove('sticky');
		}
		
	}
	
	function closeDropDownMenu() {

		if ( $(".menu-item").hasClass("open") ) {

			$(".menu-item").removeClass("open");
			
		}
	}
	
	$("#primary, #header").click(function() {
		closeDropDownMenu();
	});
	
	$( ".menu-item-has-children" ).click(function(event) {
		event.stopPropagation();  // Prevent the event to travel to the header so that it doesn't trigger the closeDropDownMenu() function at the same time.
		toggleDropDownMenu(event.currentTarget);
	});
	
	function toggleDropDownMenu(el) {

		if ( $(el).hasClass("open") ) {

			$(el).removeClass("open");

		} else {
			// Close all open dropdowns
			$('.menu-item').removeClass('open');
			$(el).addClass('open');
		}
		
	}
	
	
	// Responsive Menu
	$('#responsiveToggle').click(function() {
		displayResponsiveMenu();
	});

	$('#closeNav').click(function() {
		closeResponsiveMenu();
	});

	$('#burgerOverlay').click(function() {
		closeResponsiveMenu();
	});
	
	
	/**
	* @function displayResponsiveMenu
	* @description opens the responsive menu on user click
	* */
	function displayResponsiveMenu() {
		// Prevent scroll event
		setHtmlScroll(false);

		// Add background overlay behind responsive menu
		if (!$('#menuContainer').hasClass('open')) {
			$('#menuContainer').addClass('open');
		}

	}
	
	/**
	* @function closeResponsiveMenu
	* @description closes the menu nav when on mobile view
	* */
	function closeResponsiveMenu() {
		// Allow scroll event
		setHtmlScroll(true);

		// Close all dropdowns
		$('.sub-menu').removeClass('open');

		// Add background overlay behind responsive menu
		if ($('#menuContainer').hasClass('open')) {
			$('#menuContainer').removeClass('open');
		}

	}


	/**
	* @function setHtmlScroll
	* @description turns off/on scrolling on the body
	* @param {Boolean} scroll: whether or not we allow scrolling on the html of the page
	* */
	function setHtmlScroll(scroll) {
		// if the html can scroll, remove the no scroll class tha blocks scrolling
		if (scroll) {
			$('html').removeClass('noScroll');
		} else {
			$('html').addClass('noScroll');
		}
	}

	
	
	//////////////////////////////
	// Stock FAQs
	
	$('.question button').click(function(event) {
		openAnswer(event.target);
	});
	
	/**
	* @function openAnswer
	* @description toggles the tabulated FAQ questions in the Stock FAQ page
	* @param {Element} el the element being clicked
	* */
	function openAnswer(el) {
		$(el).toggleClass('open');
		$(el.nextElementSibling).toggleClass('open');
	}
	
	
	
	
	///////////////////////////////////////////
	///	Report Abuse / Compliance Forms

	// Form Submissions

	// Bind listener for all forms of type "abuse"
	if($("#abuse-form").length || $("#compliance-form").length){
		$("#abuse-form, #compliance-form").submit(function(event){
			
			clearErrors();

			var result = validateForm(this);

			if( jQuery.isEmptyObject(result) ) {

				console.log("Form is valid");
				if(event.currentTarget.id === 'compliance-form'){
					event.preventDefault();
					handleSubmit(this);
				} else {
					console.log("Abuse Form!");
				}

			} else {

				console.log("Form is invalid");
				event.preventDefault();
				displayErrors(result);

			}

		});
	}

	/**
	* @function validateForm
	* @description Validates form fields
	* @param {string} form: the form html element to be submitted
	* @return {Object} errors: an object with all the individual errors and their error messages to display on screen
	**/
	function validateForm (form) {

		var errors = {},
		 	isEmail = function(email) {
  				var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  				return regex.test(email);
			};



		function ValidURL(str) {

  		
			var regex = /^(?:(ftp|http|https):\/\/)?(?:[\w-]+\.)+[a-z]{2,}$/;

	
			if(!regex .test(str)) {
    				return false;
  			} else {
    			return true;
  			}

		}




		// Validate fields that are commmon to both forms

		if(form.fullname.value === '') {
			errors.fullname  = 'Full name is required';
			$("#fullname").next().text( "Full name is required" );
		}

		if( !isEmail(form.email.value) ){
			errors.email  = 'Invalid email';
			$("#email").next().text( "Invalid email" );
		}

		/*if(form.domain.value === '') {
			errors.domain  = 'Invalid domain name';
			$("#domain").next().text( "Invalid domain name" );
		}*/

		if( form.complaint.value == 'select' ){
            errors.complaint = 'Select an issue';
			$("#complaint").next().text( "Select an issue" );
        }

		if(form.summary.value === '') {
			errors.summary  = 'Required field';
			$("#summary").next().text( "Required field" );
		}

		form.domain.value = form.domain.value.trim();
		let domain = form.domain.value;
		let dcnt = ( domain.split( '.' ) || [] ).length;
		if ( domain === "" ) {
			errors.domain  = 'You must enter a domain name';
            $("#domain").next().text( errors.domain );
		}

		if(form.consent.value === '') {
			errors.consent  = 'Required field';
			$("#consent .error_msg_forms").css({ 'display': 'inline' }); 			
		}


		return errors;

	}

	/**
	*
	* @function handleSubmit
	* @description Submits form via AJAX after validating
	* @param {string} form: the form html element to be submitted
	**/
	function handleSubmit(form) {

		console.log("Handling submit!");
		let data = $(form).serialize();
		data += '&action=tucows_form_submit';
		
		// Set AJAX options and callbacks
	 	var options = {	url      : ajaxPath,
						type     : 'post',
						data     : data,
						dataType : 'json', 	// what type of data do we expect back from the server
						encode   : true
					  },

		/**
  		*
  		* @function doneCallback
  		* @description Called if the AJAX submission was successful. Handles what is returned from the server
  		* @param {string} response: the form html element to be submitted
  		**/
		doneCallback = function (response) {

			console.log(response);

			if ( !response.success) {

			    console.log("Email was not sent");

				// Call some function, pass the response with the errors. Make it display the errors on screen.
				displayErrors(response);

 		   	} else {

				console.log("Email was sent");

			   // Remove form
               $("#compliance-form").remove();

			   $(".contentWrapper").append('<div class="thanks-wrapper"><h3>Thank you.</h3><p>We will do our best to respond to your request within 3-5 business days.</p></div>');

 		   	}
		},

		/**
		*
		* @function failCallback
		* @description Called if the AJAX submission fails.
		* @param {string} err: the error object
		**/
		failCallback = function (xhr, error) {
		    console.log(xhr);
			console.log(error);
		};

		// Execute AJAX call
		$.ajax(options).then(doneCallback, failCallback);

	}


	/**
     *
     * @function clearErrors
     * @description: removes errors from previous validation before re-submiting the form
     **/

	function clearErrors() {

		// Remove every error message
       	$(".error_msg_forms").css('display', 'none');

		// Remove all the input highlights and select input
		$(".input-item, #complaint, #consent").removeClass("errorInput");

    }


	/**
     *
     * @function displayErrors
     * @description displays errors on page based on what is returned from the server
     * @param {string} errors: the error object returned from server
     **/

	function displayErrors(errors) {

		var error;

		// Display top error header
		$(".error_header").css('display', 'block');

		// Loop through error object and display error messages using the object key as a selector
		// * Make sure the error object key in the PHP matches the input element's ID!
		for ( error in errors) {
			$("#" + error).addClass("errorInput");
            $("#" + error).next().css( "display", "inline" );
		}


	}



	// Dynamic Form Inputs

	if($("#complaint").length) {
		$("#complaint").change(function(event){
			handleComplaintChange($(this).val());
		});
	}

 	if($("#domainOwner").length) {
        $("#domainOwner").change(function(event){
            handleDomainChange($(this).is(':checked'));
        });
    }



	// Initialize form options dynamically on page load
	(function() {

		var complaintGET,
            query,
			complaintInput = $("#complaint").val();

		if( $("#domainOwner").is(':checked') ){
        	//$('#description').css('display', 'flex');
    	}

		switch(complaintInput) {

			case 'phishing' : $("#phishing-wrapper").css('display', 'block');
							  break;

			case 'hijacking' : $("#hijacking-wrapper").css('display', 'block');
				  			  break;


			case 'copyright' : $("#copyright-wrapper").css('display', 'block');
							   break;

		}

		// Check if a variable us being passed via GET
		if(document.location.toString().indexOf('?') !== -1) {

			// Get the variable passed
			query = document.location
	                   .toString()
	                   // get the query string
	                   .replace(/^.*?\?/, '')
	                   // and remove any existing hash string
	                   .replace(/#.*$/, '');
	                   //.split('&');   // There will only be one variable passed

		   // Split into an array
	       complaintGET = decodeURIComponent(query).split('=');

		   // Select the option in the select box
		   $("#complaint [value='" + complaintGET[1] + "']").attr("selected", "selected");


		   // Call the select box handler to set the right form
		   handleComplaintChange(complaintGET[1]);

		}

	})();



	/**
	* @function handleComplaintChange
	* @description Handles a change to the "nature of compliant" select box
	* @param {string} value: The value of the select box when the event is fired
	**/
	function handleComplaintChange(value) {

		// Reset hidden forms input
		resetForm ();

		// Show the appropriate optional form inputs based on the select box value
		switch(value) {
			case "phishing":  	// Display optional form inputs for phishing complaints
								$("#phishing-wrapper").css('display', 'block');
							  	break;

			case 'hijacking':    $("#hijacking-wrapper").css('display', 'block');
				  			    break;

			case "copyright": 	// Display optional form inputs for copyright complaints
								$("#copyright-wrapper").css('display', 'block');
							  	break;

			case "whois":		// Hide all form fields except the select box
								$('.input-wrapper:not(#selectField)').css('display', 'none');

								// Hide required field disclaimer
								$('.disclaimer').css('display', 'none');

								// Add the ICANN message on screen
							  	$('#abuse-form').append('<h3 id="whois-msg">To file a complaint about inaccurate Whois Data, please fill out this ICANN <a href="https://forms.icann.org/en/resources/compliance/complaints/whois/inaccuracy-form" target="_blank">form</a>.</h3>');
							  	break;
		}

	}

	/**
    * @function handleDomainChange
    * @description Handles a change to the domain owner checkbox and hides/displays the description textarea accordingly
    * @param {boolean} status: The current status of the checkbox
    **/
	function handleDomainChange(status) {
		if(status){
			//$('#description').css('display', 'flex');
		} else {
			$('#description').css('display', 'none');
		}
	}


	/**
	* @function resetForm
	* @description Resets all the form inputs to their original view.
	**/
	function resetForm () {

		// Display all form fields
		//$('.input-wrapper:not(#selectField, #description)').css('display', 'flex');

		handleDomainChange($('#domain').is(':checked'));

		// Hide optional form fields
		$(".optional").css('display', 'none');

		// Remove the ICANN message if present
		if($("#whois-msg")){
			$("#whois-msg").remove();
		}

		// Show required field disclaimer
        $('.disclaimer').css('display', 'block');


	}
	
	/**
    * @function handleTooltip
    * @description There is a tooltip on hover that needs adjustments so it doesn't leave the page.
    **/
	function handleTooltip() {
		$( 'span.hover_info' ).each( function( i, ele ) {
			var offsets = $( ele ).offset();
			var width = $( ele ).width();
			var offbody = $( window ).width();

			var hov = $( ele ).find( '.inside_hover' );
			if( hov ) {
				if( offsets.left > offbody / 2 ) {
					var w = offsets.left + width;
					if( w > 400 ) { w = 400; }
					$( hov ).css( 'left', 'auto' );
					$( hov ).css( 'right', '0' );
					$( hov ).css( 'width', w + 'px' );
				} else {
					var w = ( offbody - offsets.left );
					if( w > 400 ) { w = 400; }
					$( hov ).css( 'left', '0' );
					$( hov ).css( 'right', 'auto' );
					$( hov ).css( 'width', w + 'px' );
				}
			}
		} );
	}
	window.document.addEventListener( 'DOMContentLoaded', () => {
		handleTooltip();

		const addCaps = () => { 
			let capForm = document.querySelectorAll( 'form.recaptcha' );
			capForm.forEach( form => {
				let dom = form.querySelectorAll( '.captcha_display' );
				showStaticRecaptcha( dom[ 0 ], form );
			} )
		}

		// if its loaded, setup the captchas, if not, add the function to the load routines
		if( window.grecaptcha ) {
			addCaps();
		} else {
			window[ '___grecaptcha_cfg' ] = window[ '___grecaptcha_cfg' ] || {};
			( window[ '___grecaptcha_cfg' ]['fns'] = window[ '___grecaptcha_cfg' ]['fns'] || [] ).push( addCaps );
		}
	} );
	window.addEventListener( 'resize', () => {
		handleTooltip();
	} );

	function showStaticRecaptcha( dom, form ) {

		window.grecaptcha.ready( () => { 
			window.grecaptcha.render( dom, {
				'sitekey': '6LcX6-oSAAAAAFYx9UH6piKsSFSa9UmmA8PlCGrM',
				'callback': ( token ) => {
					let inputtoken = form.querySelectorAll( 'input[name="g-recaptcha-response"]' );
					if( inputtoken && inputtoken.length > 0 ) {
						inputtoken[ 0 ].value = token;
					} else {
						let input = document.createElement( 'input' );
						input.value = token;
						input.name = 'g-recaptcha-response';
						input.type = 'hidden';
						//dom.innerHTML = `<input type="hidden" name="g-recaptcha-response" value="${token}">`;
						form.appendChild( input )
					}
				},
				'theme': 'light'
			} );
		} );
	}

} )( jQuery );
