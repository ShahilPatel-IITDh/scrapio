// use $j instead of $ for jquery code
// EXAMPLE USE: $j('.tabs').tabs();
// DO NOT USE: $('.tabs').tabs();
// this handles conlficts with jquery and pure javascript
// being used in the same space

var $j = jQuery.noConflict(); //uncomment this declaration is needed


// Window width - used to make mobile a static site
var windowWidth = $j(window).width();
var isMobile = false;

if(windowWidth < 600 ){
    isMobile = true;
}

// Swiftype initialization
$j('.swiftype-input').swiftypeSearch({
  resultContainingElement: '#st-results-container',
  engineKey: 'QoFaoiW3w8_skWB_oaVC'
});

// Prepend all links in breadcrumbs with /service
var $breadcrumbLinks = $j('.breadcrumb li a');
$j.each($breadcrumbLinks, function(){
	let hrefValue = $j(this).attr('href');
	$j(this).attr('href', '/service' + hrefValue);
});

// scroll to anchor
$j('a.scroll-link').click(function(event) {
    event.preventDefault();
    $j('html, body').animate({ scrollTop: $j($j(this).attr('href')).offset().top - 100 }, 1000);
});

// Copy to clipboard
$j('.copy-to-clipboard').click(function(event){
	event.preventDefault();
	let copiedUrl = $j(this).data('copy-to-clipboard');
	navigator.clipboard.writeText(copiedUrl);
	M.toast({html: 'Link copied to clipboard'})
});

// add class to div around hidden and checkbox form input fields (type="hidden" and type="checkbox")
var $hiddenFields = $j('input[type="hidden"]');
var $checkboxes = $j('input[type="checkbox"]');

$j.each($hiddenFields, function(){
	$j(this).parent().addClass('hidden-field');
    $j(this).removeAttr('tabindex');
});

$j.each($checkboxes, function(){
	$j(this).closest('div').addClass('checkbox-field');
});

// Lead collector: edit text and color for lead collector button
var leadCollectorButtonText = $j('.csc-lead-collector-container').data('button-text');
$j('.csc-lead-collector-container .btn').text(leadCollectorButtonText);
var leadCollectorButtonClass = $j('.csc-lead-collector-container').data('button-color');
$j('.csc-lead-collector-container .btn').addClass(leadCollectorButtonClass);

// Set copyright date
var theDate = new Date();
$j('.current-year').html(theDate.getFullYear());

// replace login link with dev login when in mydev
var currentURL = location.href;
if(currentURL.indexOf('https://mydev.cscglobal.com/') > -1){
	$j('.login-url').attr('href', 'https://login-dev.cscglobal.com/cscglobal-login/public/login');
}
else if(currentURL.indexOf('https://myuat.cscglobal.com/') > -1){
	$j('.login-url').attr('href', 'https://login-uat.cscglobal.com/cscglobal-login/public/login');
}
// Set OG tags
var $head = $j('head');
$head.append('<meta property="og:url" content="' + currentURL + '" />');
if($j('main').data('og-type') !== undefined){
	var ogTypeTag = $j('main').data('og-type');
	$head.append('<meta property="og:type" content="' + ogTypeTag + '" />');
}
if($j('main').data('og-title') !== undefined){
	var ogTitleTag = $j('main').data('og-title');
	$head.append('<meta property="og:title" content="' + ogTitleTag + '" />');
	$head.append('<meta name="twitter:title" content="' + ogTitleTag + '">');
}
if($j('main').data('og-image') !== undefined){
	var ogImageTag = $j('main').data('og-image');
	$head.append('<meta property="og:image:secure" content="' + ogImageTag + '" />');
	$head.append('<meta name="twitter:image" content="' + ogImageTag + '">');
}
if($j('main').data('og-description') !== undefined){
	var ogDescriptionTag = $j('main').data('og-description');
	$head.append('<meta property="og:description" content="' + ogDescriptionTag + '"/>');
	$head.append('<meta name="twitter:description" content="' + ogDescriptionTag + '">');
}
if($j('main').data('og-tcard') !== undefined){
	var ogTCardTag = $j('main').data('og-tcard');
	$head.append('<meta name="twitter:card" content="' + ogTCardTag + '">');
}


//notification bar tasks and functions
var notificationBar = $j('.notification-bar');

// close notification banner
$j('.notification-bar-close').click(function(event){
	event.preventDefault();
	notificationBar.addClass('hide');
});

// set bg image for icon cutout hero
if($j('.icon-cutout-hero-middle').length){
	var iconCutoutBackground = 'url(/service/images/headers/' + $j('.icon-cutout-hero-middle').data('iconbg') + ')';
	$j('.icon-cutout-hero-middle').css('background-image', iconCutoutBackground);
}

// set bg image for page sections
var $pageSectionBgImages = $j('.page-section-set-bg-image');
$j.each($pageSectionBgImages, function(){
	var pageSectionBackground = 'url(/service/images/headers/' + $j(this).data('page-section-bg') + ')';
	$j(this).css('background-image', pageSectionBackground);
});



// Materialize initializations go here

	// homepage subpage nav scrollspy
	$j('.scrollspy-homepage').scrollSpy(
	    {
	        throttle: 200,
	        scrollOffset: 100
	    }
	);

	// secondary subnav scrollspy
	$j('.scrollspy-secondary-nav').scrollSpy(
	    {
	        throttle: 200,
	        scrollOffset: 250,
	        activeClass: 'active-section'
	    }
	);

	// Pushpin - secondary subnav
	if($j('.secondary-nav-section').length){
		var $secondNav = $j('.secondary-nav-section');
		$secondNav = $secondNav.offset();
		$j('.secondary-nav-section').pushpin({
			top: $secondNav.top,
			offset: 110
		});
	}

	// navigation tabs
	$j('.dropdown-trigger-tab').dropdown({
		constrainWidth: false,
		coverTrigger: false,
		hover: true,
		container: '.nav-tabs-content-container',
		inDuration: 0,
		outDuration: 0
	});

	// keep tab hover style when hovering over mega menu
	$j('.dropdown-content-tab').hover(function(){
			var elementID = $j(this).attr('id');
			$j('#' + elementID + '_tab').addClass('show-active-tab');
		}, function(){
			var elementID = $j(this).attr('id');
			$j('#' + elementID + '_tab').removeClass('show-active-tab');
		}
	);

	//dropdown - login
	$j('.dropdown-trigger-login').dropdown({
		constrainWidth: false,
		coverTrigger: false,
		alignment: 'right'
	});

	// search
	function onSearchEnter(){
	    var $inputElements = document.querySelectorAll('.swiftype-input');
	    $inputElements.forEach(function(el) {
		    el.addEventListener("keypress", function(event) {
		      if (event.key === "Enter") {
				$j('.dropdown-trigger-search').show();
				$j('.close').hide();
				$j('.search-results-modal').modal('open');
		      }
		    });
		});
	}
	onSearchEnter();

	var focusCursor = function(){
		$j('.swiftype-input').focus();
	}

	var blurCursor = function(){
		$j('.swiftype-input').blur();
	}

	$j('.dropdown-trigger-search').dropdown({
		alignment: 'right',
		constrainWidth: false,
		coverTrigger: false,
		closeOnClick: false,
		container: '.nav-tabs-content-container',
		onOpenEnd: focusCursor,
		onCloseStart: blurCursor
	});

	// mobile menu
	$j('.dropdown-trigger-hamburger').dropdown({
		alignment: 'right',
		constrainWidth: false,
		coverTrigger: false,
		closeOnClick: false,
		container: '.nav-tabs-content-container',
		inDuration: 0,
		outDuration: 0
	});

	// Hamburger and search icon switch
	$j('.dropdown-trigger-hamburger, .dropdown-trigger-search').click(function() {
	    $j('.close').show();
	    $j('.dropdown-trigger-hamburger, .dropdown-trigger-search').hide();
	});
	$j('.close').click(function() {
	    $j('.dropdown-trigger-hamburger, .dropdown-trigger-search').show();
	    $j('.close').hide();
	});


	// Accordions/Collapsible
		// generic collapsible
		$j('.collapsible').collapsible();

		// collapsible icon list / open all
		$j('.collapsible-only-list').collapsible({
			accordion: false
		});
		// open and close all on click
		$j('.collapsible-expand-all').click(function(event) {
		    event.preventDefault();
		    if($j(this).data('accordion-id')){
		    	var accordionId = '#' + $j(this).data('accordion-id');
			    var $iconListItems = $j(accordionId + ' li');
			    $j.each($iconListItems, function(index, val){
			    	$j(accordionId).collapsible('open', index);		    	
			    });
		    }

		    $j(this).toggleClass('hide');
		    $j(this).next().toggleClass('hide');
		});
		$j('.collapsible-collapse-all').click(function(event) {
		    event.preventDefault();
		    if($j(this).data('accordion-id')){
		    	var accordionId = '#' + $j(this).data('accordion-id');
			    var $iconListItems = $j(accordionId + ' li');
			    $j.each($iconListItems, function(index, val){
			    	$j(accordionId).collapsible('close', index);		    	
			    });
		    }

		    $j(this).toggleClass('hide');
		    $j(this).prev().toggleClass('hide');
		});

		
		// tips accordion
		$j('.accordion-icon-list').collapsible({
			accordion: true
		});
		
		// tips accordion
		$j('.tips-accordion').collapsible();

		//campaign landing page accordion
		$j('.landing-page-accordion').collapsible();

	    // mobile menu accordion
	    $j('.collapsible-mobile-menu').collapsible();



	// Tabs
	    $j('.csc-vertical-tabs').tabs();

	    $j('.tabs').tabs();

	// Modals{
		$j('.csc-family-modal').modal();

	    // populate location info
		$j('.csc-location-modal').modal();

		// location modal functions
		$j('.location-modal-trigger').click(function(){
			var locationElementId;
			if($j(this).data('map-point')){
				locationElementId = '#' + $j(this).data('location-element');
				locationElementId = $j(locationElementId);
			}
			else{
				locationElementId = $j(this);
			}
			var locationTitle = locationElementId.find('.location-title').html();
			$j('#modalLocationTitle').html(locationTitle);

			var locationText = locationElementId.find('.location-text').html();
			$j('#modalLocationText').html(locationText);

			var locationImage = locationElementId.data('location-image');
			$j('#modalLocationImg').attr('src', locationImage);

			if(locationElementId.data('map-url') != ""){
				var mapURL = locationElementId.data('map-url');
				$j('#modalLocationMap').attr('src', mapURL);
			}
		});

		// video modal
		var onVideoModalClose = function(){
			$j('.modal-video-content iframe').attr('src', '');
		}

		// modals{
			$j('.video-modal').modal(
				{
					onCloseEnd: onVideoModalClose,
					opacity: 0.75
				}
			);
			$j('.modal').modal();

		// video modal functions
		$j('.video-modal-trigger').click(function(){
			if($j(this).data('video-url') != ""){
				var videoURL = $j(this).data('video-url');
				$j('.modal-video-content iframe').attr('src', videoURL);
			}
		});



	// Parallax
		$j('.parallax').parallax();

		$j('.homepage-parallax').parallax();

	// Carousels
		$j('.carousel').carousel();

	// Tooltips
		$j('.tooltipped').tooltip();

	// Slick carousel initialization
	if($j('.timeline-slick').length){
		$j('.timeline-slick').slick({
			centerMode: true,
			infinite: false,
			speed: 600,
			appendArrows: $j('.timeline-navigation'),
	        prevArrow: '<button class="slick-prev btn btn-rounded btn-primary" aria-label="Previous" type="button"><span class="csc-icon c-i-arrow-left text-white"></span></button>',
	        nextArrow: '<button class="slick-next btn btn-rounded btn-primary" aria-label="Next" type="button"><span class="csc-icon c-i-arrow-right text-white"></span></button>',
	        adaptiveHeight: true,
	        swipeToSlide: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			initialSlide: 2,
			responsive: [
				{
				  breakpoint: 1400,
				  settings: {
				    slidesToShow: 3,
				    slidesToScroll: 1,
					initialSlide: 1
				  }
				},
				{
				  breakpoint: 1200,
				  settings: {
				    slidesToShow: 2,
				    slidesToScroll: 1,
					initialSlide: 1
				  }
				},
				{
				  breakpoint: 993,
				  settings: {
				    slidesToShow: 2,
				    slidesToScroll: 1,
					initialSlide: 1
				  }
				},
				{
				  breakpoint: 769,
				  settings: {
				    slidesToShow: 1,
				    slidesToScroll: 1,
					initialSlide: 0
				  }
				}
			]
		});
	}

	if($j('.employee-slick').length){
		$j('.employee-slick').slick({
			appendArrows: $j('.employee-slide-arrows'),
	        prevArrow: '<div class="slick-prev" aria-label="Previous"><span class="csc-icon c-i-arrow-thin-left text-tertiary"></span></div>',
	        nextArrow: '<div class="slick-next" aria-label="Next"><span class="csc-icon c-i-arrow-thin-right text-tertiary"></span></div>',
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			adaptiveHeight: true,
			autoplay: true,
			autoplaySpeed: 10000
  		});
	}

	if($j('.org-photos-carousel').length){
		$j('.org-photos-carousel').slick({
			appendArrows: $j('.org-photos-carousel-arrows'),
	        prevArrow: '<div class="slick-prev" aria-label="Previous"><span class="csc-icon c-i-arrow-thin-left text-white"></span></div>',
	        nextArrow: '<div class="slick-next" aria-label="Next"><span class="csc-icon c-i-arrow-thin-right text-white"></span></div>',
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			adaptiveHeight: true,
			variableWidth: true,
			autoplay: true,
			autoplaySpeed: 10000,
			centerMode: true,
			dots: true
  		});
	}

	if($j('.growth-video-carousel').length){
		$j('.growth-video-carousel').slick({
			appendArrows: $j('.growth-video-carousel-arrows'),
	        prevArrow: '<div class="slick-prev" aria-label="Previous"><span class="csc-icon c-i-arrow-thin-left text-white"></span></div>',
	        nextArrow: '<div class="slick-next" aria-label="Next"><span class="csc-icon c-i-arrow-thin-right text-white"></span></div>',
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			autoplay: false,
			autoplaySpeed: 10000,
			centerMode: true,
			centerPadding: '40px',
			dots: true,
			mobileFirst: true,
			responsive: [
				{
				  breakpoint: 993,
				  settings: {
					slidesToShow: 3,
					centerPadding: '60px'
				  }
				}
			]
  		});
	}

	if($j('.recruiter-carousel').length){
		$j('.recruiter-carousel').slick({
			appendArrows: $j('.recruiter-carousel-arrows'),
	        prevArrow: '<div class="slick-prev" aria-label="Previous"><span class="csc-icon c-i-arrow-thin-left text-primary"></span></div>',
	        nextArrow: '<div class="slick-next" aria-label="Next"><span class="csc-icon c-i-arrow-thin-right text-primary"></span></div>',
			infinite: true,
			speed: 300,
			slidesToShow: 1,
			adaptiveHeight: true,
			variableWidth: false,
			centerMode: true,
			dots: true,
			mobileFirst: true,
			responsive: [
				{
				  breakpoint: 993,
				  settings: {
					variableWidth: true
				  }
				}
			]
  		});
	}

	if($j('.career-tiles-nav-slick').length){
		$j('.career-tiles-nav-slick').slick({
			appendArrows: $j('.career-tiles-nav-arrows'),
	        prevArrow: '<div class="slick-prev" aria-label="Previous"><span class="csc-icon c-i-arrow-thin-left text-primary"></span></div>',
	        nextArrow: '<div class="slick-next" aria-label="Next"><span class="csc-icon c-i-arrow-thin-right text-primary"></span></div>',
	        accessibility: true,
	        swipeToSlide: true,
			dots: true,
			infinite: true,
			speed: 300,
			slidesToShow: 3,
			slidesToScroll: 3,
			centerMode: true,
			responsive: [
				{
					breakpoint: 993,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
						infinite: true,
						dots: true
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});
	}


	// Customer tabs
	var $activeTab;
	var $selectedTab;
	var $customerTabs = $j('.customer-tab');
	var $customerNames = $j('.customer-name-tab');
	var numCustomerNames = $customerNames.length;

	function switchToTab(activeTab, selectedTab){
		var activeTabID = "#" + activeTab.data('customer-tab');
		var selectedTabID = "#" + selectedTab.data('customer-tab');
		activeTab.removeClass('active');
		$j(activeTabID).removeClass('active');
		selectedTab.addClass('active');
		$j(selectedTabID).addClass('active');
	}

	$j('.customer-name-tab').on('click', function(){
		$selectedTab = $j(this);
		$j.each($customerNames, function(){
			if($j(this).hasClass('active')){
				$activeTab = $j(this);
			}
		});
		switchToTab($activeTab, $selectedTab);
	});

	$j('.arrow-previous-slide').on('click', function(){
		var slideMoved = false;
		$selectedTab = null;

		$j.each($customerNames, function(index, val){
			if(!slideMoved){
				if($selectedTab === null && $j(this).hasClass('active')){
					$activeTab = $j(this);
					$selectedTab = $j(this);
					slideMoved = true;
				}
				else if(!$j(this).hasClass('active')){
					$selectedTab = $j(this);
				}
				else if($j(this).hasClass('active')){
					$activeTab = $j(this);
					slideMoved = true;
				}
			}
		});
		switchToTab($activeTab, $selectedTab);
	});

	$j('.arrow-next-slide').on('click', function(){
		var slideMoved = false;
		var nextTab = false;

		$j.each($customerNames, function(index, val){
			if(index === numCustomerNames){
				if($j(this).hasClass('active')){
					$activeTab = $j(this);
					$selectedTab = $j(this);
				}
				slideMoved = true;
			}
			else if(nextTab && !slideMoved){
				$selectedTab = $j(this);
				slideMoved = true;
			}
			else if((index <= numCustomerNames-1) && !slideMoved){
				if($j(this).hasClass('active')){
					$activeTab = $j(this);
					nextTab = true;
				}
			}
		});
		switchToTab($activeTab, $selectedTab);
	});


// Resize right size image with content
function resizeRightImage(){
	var $sectionsWithRightImage = $j('.page-section-right-img-layout');

	$j.each($sectionsWithRightImage, function(){
		var sectionHeight = $j(this).find('.page-section-foreground-columns').outerHeight(true);
		$j(this).find('.page-section-background-image-right').height(sectionHeight + 'px');
	});

}
resizeRightImage();
$j(window).on('resize', resizeRightImage);

// Resize left size image with content
function resizeLeftImage(){
	var $sectionsWithLeftImage = $j('.page-section-left-img-layout');

	$j.each($sectionsWithLeftImage, function(){
		var sectionHeight = $j(this).find('.page-section-foreground-columns').outerHeight(true);
		$j(this).find('.page-section-background-image-left').height((sectionHeight+52) + 'px');
	});

}
resizeLeftImage();
$j(window).on('resize', resizeLeftImage);


// Make content visible on scroll
var $page_sections = $j('.page-section');
var $window = $j(window);
var topOfPage = $j('body, html').scrollTop();
var counterRan = false;
var numCounterStats = $j('.js-count');
var counterStatsDone = 0;
// var counterRanTwo = false;

function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    

    $j.each($page_sections, function() {
        var $element = $j(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        //check to see if this current container is within viewport
        if(topOfPage != 0){
            if((element_bottom_position >= window_top_position) &&
              (element_top_position <= window_bottom_position)) {
              	$element.addClass('in-view');
                if($element.data('element') === "stats-row") {
                    // start counter
                    if(counterStatsDone < numCounterStats.length){
	                    $j('.js-count').each(function() {
	                        startCounter($j(this));
	                    });
	                    counterRan = true;
	                }
                }
                // else if($element.data('element') === "stats-row-two") {
                //     // start counter
                //     $j('.js-count-two').each(function() {
                //         startCounter($j(this));
                //     });
                //     counterRanTwo = true;
                // }
            }
            else{
            	$element.removeClass('in-view');
            }
        }
        else {
            if((element_bottom_position >= window_top_position) &&
              (element_top_position <= window_bottom_position)) {
                $element.addClass('in-view');
                if($element.data('element') === "stats-row") {
            
                    // start counter
                    if(counterStatsDone < numCounterStats.length){
	                    $j('.js-count').each(function() {
	                        startCounter($j(this));
	                    });
	                    counterRan = true;
	                }
                }
                // else if($element.data('element') === "stats-row-two") {
                //     // start counter
                //     $j('.js-count-two').each(function() {
                //         startCounter($j(this));
                //     });
                //     counterRanTwo = true;
                // }
            }
            else{
            	$element.removeClass('in-view');
            }
        }
    });
}

// Number counter function
function startCounter(countElement) {
    if(!counterRan){
        var delayAmt = countElement.data('delay');
        var decimalPlaces = countElement.data('float');
        countElement.prop('Counter', 0).delay(delayAmt).animate({
            Counter: countElement.data('number')
            }, {
                duration: 3000,
                easing: 'swing',
                step: function(now) {
                	if(decimalPlaces === 0){
	                    countElement.text(Math.ceil(now).toLocaleString('en'));
                	}
                	else{
                		countElement.text(now.toFixed(decimalPlaces).toLocaleString('en'));
                	}
                    countElement.next().removeClass('hidden');
            	}
    	});
    	counterStatsDone++;
	}
 //    else if(!counterRanTwo){
 //        var delayAmt = countElement.data('delay');
 //        var decimalPlaces = countElement.data('float');
 //        countElement.prop('Counter', 0).delay(delayAmt).animate({
 //            Counter: countElement.data('number')
 //            }, {
 //                duration: 3000,
 //                easing: 'swing',
 //                step: function(now) {
 //                	if(decimalPlaces === 0){
	//                     countElement.text(Math.ceil(now).toLocaleString('en'));
 //                	}
 //                	else{
 //                		countElement.text(now.toFixed(decimalPlaces).toLocaleString('en'));
 //                	}
 //                    countElement.next().removeClass('hidden');
 //            	}
 //    	});
	// }
}

// Make side tab visible
function lead_check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);
    

    $j.each($page_sections, function() {
        var $element = $j(this);
        var element_height = $element.outerHeight();
        var element_top_position = $element.offset().top;
        var element_bottom_position = (element_top_position + element_height);

        //check to see if this current container is within viewport
        if((element_bottom_position >= window_top_position) &&
          (element_top_position <= window_bottom_position)) {
            if($element.data('element') == "page-section-hero-header") {
                $j('.side-flyout-tab').hide();
            }
          	$element.addClass('in-view');
        }
        else{
            if($element.data('element') == "page-section-hero-header") {
                $j('.side-flyout-tab').show();
            }
        	$element.removeClass('in-view');
        }
    });
}

// Trigger in view functions	
$window.on('scroll', check_if_in_view);
// Trigger lead in view functions	
$window.on('scroll', lead_check_if_in_view);
$window.trigger('scroll');

// Toggle lead collector
$j('.side-flyout-tab').click(function() {
    $j('.side-flyout-content').toggleClass('active');
});



// MAP: locations page - Create hover states for map and region on contact us page
var textRegions = document.querySelectorAll('.location-region-container');
var svgRegions = document.querySelectorAll('.region-linkable-area');

function removeAllOn() {
  textRegions.forEach(function(el) {
    el.classList.remove('on');
  });
  svgRegions.forEach(function(el) {
    el.classList.remove('on');
  });
}

function addOnFromState(el) {
  var regionCode = el.getAttribute('data-region');
  var svgRegion = document.querySelector('#' + regionCode);
  el.classList.add('on');
  svgRegion.classList.add('on');
}

function addOnFromList(el) {
  var regionId = el.getAttribute('id');
  var textRegion = document.querySelector('#' + regionId + 'Text');
  if(regionId != 'disabled'){
      el.classList.add('on');
      textRegion.classList.add('on');
  }
}

if(textRegions){
	textRegions.forEach(function(el) {
	  el.addEventListener('mouseenter', function() {
	    addOnFromState(el);
	  });
	  el.addEventListener('mouseleave', function() {
	     removeAllOn();
	  });
	});
}

if(svgRegions){
	svgRegions.forEach(function(el) {
	  el.addEventListener('mouseenter', function() {
	    addOnFromList(el);
	  });
	  el.addEventListener('mouseleave', function() {
	     removeAllOn();
	  });
	});
}

// Map controls
if(document.querySelector('.locations-page-location')){
	var transformMatrix = [1, 0, 0, 1, 0, 0];
	var svg = document.getElementById('world');
	var viewbox = svg.getAttributeNS(null, "viewBox").split(" ");
	var centerX = parseFloat(viewbox[2]) / 2;
	var centerY = parseFloat(viewbox[3]) / 2;
	var matrixGroup = svg.getElementById("map");
}

function pan(dx, dy) {     	
  transformMatrix[4] += dx;
  transformMatrix[5] += dy;
            
  var newMatrix = "matrix(" +  transformMatrix.join(' ') + ")";
  matrixGroup.setAttributeNS(null, "transform", newMatrix);
}

function zoom(scale) {
  for (var i = 0; i < 4; i++) {
    transformMatrix[i] *= scale;
  }
  transformMatrix[4] += (1 - scale) * centerX;
  transformMatrix[5] += (1 - scale) * centerY;
		        
  var newMatrix = "matrix(" +  transformMatrix.join(' ') + ")";
  matrixGroup.setAttributeNS(null, "transform", newMatrix);
}

$j('.pan-bottom-map-btn a').click(function(event){
	event.preventDefault();
	pan(0, -25);
});
$j('.pan-left-map-btn a').click(function(event){
	event.preventDefault();
	pan(25, 0);
});
$j('.pan-top-map-btn a').click(function(event){
	event.preventDefault();
	pan(0, 25);
});
$j('.pan-right-map-btn a').click(function(event){
	event.preventDefault();
	pan(-25, 0);
});
$j('.zoom-in-map-btn a').click(function(event){
	event.preventDefault();
	zoom(1.25);
});
$j('.zoom-out-map-btn a').click(function(event){
	event.preventDefault();
	zoom(0.8);
});



// DBOYS page functions
var cursorLocationX = 0;
var cursorLocationY = 0;
var stateTooltip = document.getElementById('stateTooltip');
var stateElements = document.querySelectorAll('.us-state-item');
var stateAbbrevElement = document.getElementById('stateAbbrev');
var stateNameElement = document.getElementById('stateName');
var stateSloganElement = document.getElementById('stateSlogan');
var usMapContainerElement = document.getElementById('usMapContainer');

function hideStateTooltip() {
    stateTooltip.classList.remove('on');
}

function cursorCoords(event){
  cursorLocationX = event.pageX;
  cursorLocationY = event.pageY;
}

function showStateTooltip(el) {
  var stateAbbrev = el.getAttribute('data-state-abbrev');
  var stateName = el.getAttribute('data-state-name');
  var stateSlogan = el.getAttribute('data-stat-slogan');

  stateAbbrevElement.innerHTML = stateAbbrev;
  stateNameElement.innerHTML = stateName;
  stateSloganElement.innerHTML = "&ldquo;" + stateSlogan + "&rdquo;";

  stateTooltip.style.left = cursorLocationX + "px";
  stateTooltip.style.top = cursorLocationY + "px";
  stateTooltip.classList.add('on');
}

if(stateElements){
	stateElements.forEach(function(el) {
	  el.addEventListener('mouseenter', function() {
	  	cursorCoords(event);
	    showStateTooltip(el);
	  });
	  el.addEventListener('mouseleave', function() {
	     hideStateTooltip();
	  });
	});
}

// scroll to letter functions
var alphaLetters = document.querySelectorAll('.letter-list-item');
var alphaLetterContainer = document.querySelector('.alpha-listing')

if(alphaLetters){
	alphaLetters.forEach(function(el) {
	  el.addEventListener('click', function() {
	  	var locationClass = el.getAttribute('data-scroll-letter');
	  	locationClass = '.' + locationClass;
	  	var locationElement = document.querySelector(locationClass);
		scrollToElm( alphaLetterContainer, locationElement , 400 );   
	  });
	});
}

function scrollToElm(container, elm, duration){
  var pos = getRelativePos(elm);
  scrollTo( container, pos.top , 2);  // duration in seconds
}

function getRelativePos(elm){
  var pPos = elm.parentNode.getBoundingClientRect(), // parent pos
      cPos = elm.getBoundingClientRect(), // target pos
      pos = {};

  pos.top    = cPos.top    - pPos.top + elm.parentNode.scrollTop,
  pos.right  = cPos.right  - pPos.right,
  pos.bottom = cPos.bottom - pPos.bottom,
  pos.left   = cPos.left   - pPos.left;

  return pos;
}
    
function scrollTo(element, to, duration, onDone) {
    var start = element.scrollTop,
        change = to - start,
        startTime = performance.now(),
        val, now, elapsed, t;

    function animateScroll(){
        now = performance.now();
        elapsed = (now - startTime)/1000;
        t = (elapsed/duration);

        element.scrollTop = start + change * easeInOutQuad(t);

        if( t < 1 )
            window.requestAnimationFrame(animateScroll);
        else
            onDone && onDone();
    };

    animateScroll();
}

function easeInOutQuad(t){ return t<.5 ? 2*t*t : -1+(4-2*t)*t };


// goto page functions
var gotoPageLinks = document.querySelectorAll('.goto-page-link');
var pageSections = document.querySelectorAll('.floating-box-main-content');
// Fix tab indicator

function showPageSection(sectionId){
	var pageSection = document.getElementById(sectionId);
	pageSections.forEach(function(el){
		el.style.display = 'none';
	});
	pageSection.style.display = 'block';
	var commentsElement = pageSection.querySelector('.dboys-state-content-comments');

	if(commentsElement.clientHeight < 600){
		pageSection.querySelector('.arrow-down-circle').style.display = 'none';
	}
	$j('.tabs').tabs('updateTabIndicator');

}

if(gotoPageLinks){
	gotoPageLinks.forEach(function(el) {
	  el.addEventListener('click', function() {
	  	var pageSectionId = el.getAttribute('data-linkto');
	  	pageSectionId = pageSectionId;
	  	showPageSection(pageSectionId);
	  });
	});
}

// holiday modal
var holidayModal = document.getElementById("holidayModal");

if(holidayModal){
  var modalClose = document.getElementsByClassName("holiday-modal-close")[0];
  var ls = localStorage.getItem('namespace.holiday');

  if (ls <= 1) {
   holidayModal.style.display = "block";
   ls++;
   localStorage.setItem('namespace.holiday', ls)
  }
  modalClose.onclick = function() {
    holidayModal.style.display = "none";
  }
}

window.onclick = function(event) {
 if (event.target == holidayModal) {
  holidayModal.style.display = "none";
 }
}

// Content modal
var contentModal = document.getElementById('cscLicensePro');

if(contentModal){
	var modalClose = document.getElementsByClassName('default-modal-close')[0];
	var firstVisit = localStorage.getItem('namespace.firstVisit');
	if (firstVisit <= 0) {
   		contentModal.style.display = 'block';
        firstVisit++;
    }
    localStorage.setItem('namespace.firstVisit', firstVisit);
	modalClose.onclick = function() {
		contentModal.style.display = 'none';
	}
	window.onclick = function(event) {
		if (event.target == contentModal) {
			contentModal.style.display = 'none';
		}
	}
}

// Set expiration for local storage
var hours = 168; // Reset when storage is more than 7 days
var now = Date.now();
var firstVisitClear = localStorage.getItem('firstVisitClear');
if (firstVisitClear === null) {
     localStorage.setItem('firstVisitClear', now);
}
else if (now - firstVisitClear > hours*60*60*1000) {
    localStorage.removeItem('namespace.firstVisit');
    localStorage.setItem('firstVisitClear', now);
}


// Chatbot functions
var chatbotLaunchDiv = document.querySelector('.launch-chatbot-container');
if(chatbotLaunchDiv){
	var chatbotUrl = chatbotLaunchDiv.getAttribute('data-chatbot-url');
}
var startChatbotBtn = document.querySelector('.start-chatbot');
var hideBotButton = document.querySelector('.hide-bot-window');
var showBotButton = document.querySelector('.show-bot-window');
var botContainer = document.querySelector('.bot-container');

var botSession = sessionStorage.getItem('botsession');
if(botContainer && botSession){
	botContainer.remove();
}
else{
	if(startChatbotBtn){
		startChatbotBtn.addEventListener('click', function(event){
		    event.preventDefault();
		    sessionStorage.setItem('botsession', true);
		    botContainer.remove();
		    window.open(chatbotUrl,'Chatbot','toolbar=0,location=0,menubar=0,width=600,height=650');
		});
	}

	if(botContainer && chatbotUrl){
	   hideBotButton.addEventListener('click', function(){
	      hideBotButton.classList.toggle('hide');
	      showBotButton.classList.toggle('hide');
	      botContainer.classList.toggle('bot-active');
	   });
	   showBotButton.addEventListener('click', function(){
	      showBotButton.classList.toggle('hide');
	      hideBotButton.classList.toggle('hide');
	      botContainer.classList.toggle('bot-active');
	   });
	   setTimeout(function(){
	      showBotButton.classList.toggle('hide');
	      hideBotButton.classList.toggle('hide');
	      botContainer.classList.toggle('bot-active');
	    }, 5000);
	}
	else{
		if(botContainer){
		   botContainer.remove();
		}
	}
}

// UPDATED: Toggle lead collector
$j('.slide-lead-container-tab, .slide-lead-container-tab-nav, .slide-lead-close').click(function() {
    $j('.slide-lead-container-content').toggleClass('active');
});
