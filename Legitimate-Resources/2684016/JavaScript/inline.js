
			$(document).ready(function() {
				$("body").addClass("full-intro");

				$('.navigation li a').click(function(e) {
					$('.navigation li a').removeClass('active');

					var $this = $(this);
					if (!$this.hasClass('active')) {
						$this.addClass('active');
					}
					//e.preventDefault();
				});

				$("#showMap").click(function() {
					$(this).toggle();
					$('#mapToggle').slideToggle('slow');
				});

				$("#closeMap").on("click", function(){
					$('#mapToggle').slideToggle('slow');
					$('#showMap').slideToggle('slow');
				});

				$(function() {
					$('a[href*=#]:not([href=#])').click(function() {
						if (location.pathname.replace(/^/,'') == this.pathname.replace(/^/,'') && location.hostname == this.hostname) {
							var target = $(this.hash);
							target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
								if (target.length) {
								$('html,body').animate({
									scrollTop: target.offset().top
								}, 1000);
								return false;
							}
						}
					});
				});

				lightbox.option({
					'imageFadeDuration' : 0,
				});

				$('#openEntry').click(function() {
					$("#placeEntry").toggle(500);
				});


				(function() {

					// store the slider in a local variable
					var $window = $(window),
					  flexslider = { vars:{} };

					// tiny helper function to add breakpoints
					function getGridSize() {
						return (window.innerWidth < 600) ? 2 :
						  (window.innerWidth < 900) ? 3 : 4;
					}

					$window.load(function() {
						$('.flexslider').flexslider({
							animation: "slide",
							animationLoop: false,
							controlNav: false,
							itemWidth: 230,
							itemMargin: 25,
							minItems: getGridSize(), // use function to pull in initial value
							maxItems: getGridSize() // use function to pull in initial value
						});
					});

					// check grid size on resize event
					$window.resize(function() {
						var gridSize = getGridSize();

						flexslider.vars.minItems = gridSize;
						flexslider.vars.maxItems = gridSize;
					});
				}());


				$('#Carousel').carousel({
					interval: 5000
				})

				$('a[data-slide="prev"]').click(function() {
					$('#Carousel').carousel('prev');
				});

				$('a[data-slide="next"]').click(function() {
					$('#Carousel').carousel('next');
				});

				//$('#Carousel').find('#Carousel.item').first().addClass('active');
				$('#Carousel').find('.item').first().addClass('active');

				//$('#Carousel').find('#Carousel.item').first().addClass('active');

				/*$("#niceFooter").hide(); //hide your div initially

				var topOfOthDiv = $("#passBy").offset().top;
				$(window).scroll(function() {
					if($(window).scrollTop() > topOfOthDiv) { //scrolled past the other div?
						$("#niceFooter").show(); //reached the desired point -- show div
					}
				});*/

			});
		