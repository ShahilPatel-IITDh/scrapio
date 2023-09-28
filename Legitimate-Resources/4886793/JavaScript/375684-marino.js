  //// ADD THEME SPECIFIC CLASS
$('html').addClass('exclusive-theme theme-1c-centennial');

// ------------------------------------------------------------------
// hero edits
// ------------------------------------------------------------------

var hero1 = $('#section_0 #box1 img').attr('src');
$('#hero1 img').attr('src', hero1);

var hero2 = $('#section_0 #box2 img').attr('src');
$('#hero2 img').attr('src', hero2);

var hero3 = $('#section_0 #box3 img').attr('src');
$('#hero3 img').attr('src', hero3);

var hero4 = $('#section_0 #box4 img').attr('src');
$('#hero4 img').attr('src', hero4);

// ------------------------------------------------------------------
// global vars
// ------------------------------------------------------------------

var windowWidth = $(window).width(),
  windowHeight = $(window).height(),
  navHeight = $('nav#main').height(),
  brokerCheckHeight = $('.fmg-exclusive-brokercheck').height();

// ------------------------------------------------------------------
// add button class
// ------------------------------------------------------------------

$('.learnmore, .readmore, .register, button.submit, .page-team .description a:contains("Click to read more...")').addClass('button');

// ------------------------------------------------------------------
// header
// ------------------------------------------------------------------

$('.header-right').insertAfter('nav#main');
$('.top-bar .header-phone a').appendTo('header .phone-header');


// ------------------------------------------------------------------
// homepage
// ------------------------------------------------------------------

// Insert three-things title 
$('.three-things').prependTo('#section_1 .o-container');
$('.three-numbers').closest('section').addClass('three-container');
$('.three-numbers.n1').insertBefore('.three-container #box1 h2');
$('.three-numbers.n2').insertBefore('.three-container #box2 h2');
$('.three-numbers.n3').insertBefore('.three-container #box3 h2');


// Add class for welcome section
$('.welcome-text1').closest('section').addClass('main-welcome');

// Move Team Title
$('.team-title').prependTo('#section_3 .o-container');

// Move Hero before Section Form 
$('.hero-container').insertBefore('.section_Form:first');

// Move Hero Title
$('.hero-title').prependTo('.section_Rotator .o-container')


// Team Email
$('p.c-team-member__email.u-margin-bottom--5 a').text('Send an Email');



$(`<div class="preFooter"><h2>FOR YOUR INSURANCE NEEDS</h2> <a href="./contact">Contact Us</a></div>`).insertBefore('footer');
$(`<div class="postFooter"><p>Copyright 2020 Agency Revolution | <a href="#" >Privacy</a></p> </div>`).insertAfter('footer');

$(`<div class="footerFour"></div>`).insertAfter('footer .c-footer__disclosure');
$(`<div class="footerThree"><h4>Resources</h4><div class="quickLinks"><ul></ul></div></div>`).insertAfter('footer .c-footer__disclosure');

$('.quickLinks li:last-child').appendTo('.footerThree .quickLinks ul');
$('.quickLinks li:last-child').appendTo('.footerThree .quickLinks ul');
$('.quickLinks li:last-child').appendTo('.footerThree .quickLinks ul');
$('.quickLinks li:last-child').appendTo('.footerThree .quickLinks ul');



$('.footerThree .quickLinks ul li:nth-child(1)').text('Calculators');
$('.footerThree .quickLinks ul li:nth-child(2)').text('Videos');
$('.footerThree .quickLinks ul li:nth-child(3)').text('Articles');
$('.footerThree .quickLinks ul li:nth-child(4)').text('Presentation');


// $('footer .moonlight-address_block p:last-child').appendTo('.footerFour');
$('footer .moonlight-contact-information p:last-child').appendTo('.footerFour');
$('footer .c-socialMedia').appendTo('.footerFour');

$(document).ready(function() {
  // ------------------------------------------------------------------
  // Add button to topbar
  // ------------------------------------------------------------------

  var buttonLink = FMG.RootLocation + "certificate-of-insurance",
      buttonIcon = '',
      buttonText = 'Request Certificate',
      button ='<div class="c-header-btn">\
          <a href="' + buttonLink + '" class="c-header-btn--link" style="color: rgb(255, 255, 255);" data-bg-color-hover="#47A1EF">\
          <i class="' + buttonIcon + '"></i>' + buttonText + '</a>\
          </div>';

  $('.c-topbar .c-topbar-cta-links').append(button);
});

function findNReplace(query, find, replace){
	var searchQuery = query + ":contains(" + find + ")";
	var element = $(searchQuery);
	var stringLength = find.length;
	var position = $(element).html().search(find);
	if(position >= 0){
		var beginning = $(element).html().substring( 0, position);
		var end = $(element).html().substring(position + stringLength);
		$(element).html(beginning + '<span>' + replace + '</span>' + end);
	}
}

findNReplace('footer .contact .moonlight-phone', 'Mobile', 'Text');
