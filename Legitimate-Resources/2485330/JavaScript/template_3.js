// JavaScript Document
$(document).ready(function(){
	/* Mobile menu background */
	$(function() {
		var x = document.getElementById("mmBtn").getAttribute("data-toggle");
		$('.navbar-toggle').on('click', function() {
			if (x === 'collapse') {
				$('body').toggleClass('mmOpen');
				document.documentElement.style.overflow = 'hidden';
				document.documentElement.style.height = '100%';
			}
		});

		$('nav').on('click', function() {
			$('body').removeClass("mmOpen");
			document.documentElement.style.overflow = 'auto';
			document.documentElement.style.height = 'auto';
		});
		$('body').click (function() {
			var y = document.getElementById("mmBtn").getAttribute("aria-expanded");
			if (y === 'true') {
				$('body').removeClass('mmOpen');
				document.getElementById('navbar').setAttribute('aria-expanded', 'false');
				document.documentElement.style.overflow = 'visible';
				document.documentElement.style.height = 'auto';
				$('#mmBtn').addClass('collapsed');
				$('#mmBtn').attr('aria-expanded', 'false');
			}
		});
	});

	$('#navbar').click (function() {
		var y = document.getElementById('mmBtn').getAttribute('aria-expanded');
		if (y === 'true') {
			$('body').removeClass('mmOpen');
			$('#navbar').removeClass('in');
			document.getElementById('navbar').setAttribute('aria-expanded', 'false');
			document.documentElement.style.overflow = 'visible';
			document.documentElement.style.height = 'auto';
			$('#mmBtn').addClass('collapsed');
			$('#mmBtn').attr('aria-expanded', 'false');
		}
	});

	$("#navbar > ul > .dropdown").on('mouseenter mouseleave', function (e) {
		if ($('ul', this).length) {
			var menuItem = $('ul:first', this);
			var checkOff = menuItem.offset().left;
			var checkOff_width = menuItem.width();
			var con = $("#mainMenu");
			var con_off = con.offset().left;
			var con_width = con.width();

			var isEntirelyVisible = (checkOff + checkOff_width <= con_off + con_width);

			if (!isEntirelyVisible) {
				$(this).addClass('showRight');
			}
		}
	});

	$("#navbar > ul > .dropdown > ul > li").on('mouseenter mouseleave', function (e) {
		if ($('ul', this).length) {
			var menuItem = $('ul:first', this);
			var checkOff = menuItem.offset().left;
			var checkOff_width = menuItem.width();
			var con = $("#mainMenu");
			var con_off = con.offset().left;
			var con_width = con.width();

			var isEntirelyVisible = (checkOff + checkOff_width <= con_off + con_width);

			if (!isEntirelyVisible) {
				$(this).addClass('showRight');
			} else {
				$(this).removeClass('showRight');
			}
		}
	});
});

function setMenu() {
	var deviceHeight = document.documentElement.clientHeight;
	var headerHeight = document.getElementById("header").offsetHeight;
	var menuHeight = window.innerHeight - headerHeight;
	var mainMenu = document.getElementById('mainMenu');

	/* Function set header height */
	if (window.innerWidth < 1000){
		document.getElementById("headerSpace").style.height = headerHeight + 'px';
		headerHeight = document.getElementById("header").offsetHeight;
		mainMenu.style.top = headerHeight - 1 + 'px';
		mainMenu.style.height = menuHeight + 'px';
	} else {
		mainMenu.style.top = 'auto';
		mainMenu.style.height = 'auto';
	}
}

window.onload = function() {
		setMenu();

	/* Inner page dropdown menu */
	$('#innerPageMenu .dropdown-submenu a.parentLink').on("click", function(e){
		$(this).next('ul').toggle();
		e.stopPropagation();
		e.preventDefault();
	});
};
