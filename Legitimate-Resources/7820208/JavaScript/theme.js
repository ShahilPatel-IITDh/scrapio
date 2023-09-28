var $ = jQuery.noConflict();

$(document).ready(function() {

    // toggle header newsletter
    $('.newsletter-toggle .btn').on('click', function(){
        $('.header-newsletter-row').slideToggle('fast');
    });

    $('.footer-signup').on('click', function() {

        if ( $(window).width() < 1024 ) {

            $('body').toggleClass('mobile-nav-active').removeClass('mobile-search-active');

            $('html, body').animate({
                scrollTop: 0,
            }, 500);

            $('body.mobile-nav-active ul.mobile-newsletter-signup li.menu-item-has-children > a').trigger('click');

        } else {

            $('.header-newsletter-row').slideToggle('fast');

            $('html, body').animate({
                scrollTop: ( $('.header-newsletter-row').offset().top - 50 )
            }, 500);

        }

    });


    // toggle search bar
    $('.search-toggle').on( 'click', function() {
        $('.header-search').toggleClass('hidden');
        $('.header-search input[type="search"]').focus();
    });

    /* hero carousel */
    var heroImageSwiper = new Swiper ('.hero-carousel .swiper-container', {
        loop: true,
        autoplay: true,
        autoHeight: true,
        nextButton: '.hero-carousel .swiper-button-next',
        prevButton: '.hero-carousel .swiper-button-prev',
        pagination: '.hero-carousel .swiper-pagination'
    });

    $(".hero-carousel .swiper-container").hover(function(){
        heroImageSwiper.stopAutoplay();
    }, function(){
        heroImageSwiper.startAutoplay();
    });

    /* product range carousel */
    var productRangeSwiper = new Swiper ('.product-range-carousel .swiper-container', {
        loop: true,
        autoplay: true,
        nextButton: '.product-range-carousel .swiper-button-next',
        prevButton: '.product-range-carousel .swiper-button-prev',
        pagination: '.product-range-carousel .swiper-pagination',
        slidesPerView: 2,
        spaceBetween: 24,
        paginationClickable: true,
        breakpoints: {
            680: {
                slidesPerView: 1,
                spaceBetween: 10
            }
        }
    });

    /* social-carousel */
    var socialSwiper = new Swiper ('.social-carousel .swiper-container', {
        loop: true,
        nextButton: '.social-carousel .swiper-button-next',
        prevButton: '.social-carousel .swiper-button-prev',
        pagination: '.social-carousel .swiper-pagination',
        slidesPerView: 3,
        spaceBetween: 24,
        paginationClickable: true,
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            560: {
                slidesPerView: 1,
                spaceBetween: 10
            }
        }
    });


    /* related products */
    var relatedProductsSwiper = new Swiper ('.related-products-section .swiper-container', {
        loop: true,
        nextButton: '.related-products-section .swiper-button-next',
        prevButton: '.related-products-section .swiper-button-prev',
        pagination: '.related-products-section .swiper-pagination',
        slidesPerView: 3,
        spaceBetween: 24,
        paginationClickable: true,
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            560: {
                slidesPerView: 1,
                spaceBetween: 10
            }
        }
    });

    /* related products */
    var horseFeedSwiper = new Swiper ('.feed-slider-wrapper .swiper-container', {
        loop: false,
        nextButton: '.feed-slider-wrapper .swiper-button-next',
        prevButton: '.feed-slider-wrapper .swiper-button-prev',
        pagination: '.feed-slider-wrapper .swiper-pagination',
        slidesPerView: 3,
        spaceBetween: 24,
        paginationClickable: true,
        breakpoints: {
            768: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            560: {
                slidesPerView: 1,
                spaceBetween: 10
            }
        }
    });


    // product tabs
    $('#product-tabs #tabs').tabs();

    // accordion
    $('.accordion-panels').accordion({
        collapsible: true,
        active: false,
        heightStyle: "content",
    });



    // filter posts

    function filterPosts( loadmore ) {

        var loadmore = loadmore || false;

        $('.news-index-section').addClass('loading-posts');

        $('.btn.load-more-ajax').html('Loading Posts...');

        relationshipIds = [];
        // each active topic filter add to array
        if ( $('.relationship-filter .active-filter').length !== 0 ) {
            $('.relationship-filter .active-filter').each(function(){
                relationshipIds.push($(this).data('feed-finder-id'));
            });
        } else {
            if ( $('.loaded-posts').attr('data-feed-finder-id') ) {
                relationshipIds.push($('.loaded-posts').attr('data-feed-finder-id'));
            }
        }

        authorIds = [];
        // each active author filter add to array
        if ( $('.author-filter .active-filter').length !== 0 ) {
            $('.author-filter .active-filter').each(function(){
                authorIds.push($(this).data('user-id'));
                //authorIds = $(this).data('user-id');
            });
        } else {
            // console.log('no author filter');
        }

        catIds = [];
        // each active author filter add to array
        if ( $('.categories-filter .active-filter').length !== 0 ) {
            $('.categories-filter .active-filter').each(function(){
                catIds.push($(this).data('cat-id'));
            });
        } else {
            if ( $('.loaded-posts').attr('data-cat-id') ) {
                catIds.push($('.loaded-posts').attr('data-cat-id'));
            }
        }

        if (!loadmore) {
            var offset = false;
        } else {
            var offset = $('.loaded-posts > div').length;
        }

        jQuery.ajax({
            url: ajax_url.ajax_url,
            type: 'post',
            data: {
                action: 'filter_posts',
                authors: authorIds,
                cats: catIds,
                relationships: relationshipIds,
                offset: offset,
            },
            beforeSend: function() {

            },
            success: function(response) {

                if (!loadmore) {
                    $('.loaded-posts').html(response);
                } else {
                    $('.loaded-posts').append(response);
                }

                if ( $('.loaded-posts > div').hasClass('last-post') || $('.loaded-posts > div').length === 0 ) {
                    $('.load-more-ajax').hide();
                } else {
                    $('.load-more-ajax').show();
                    $('.btn.load-more-ajax').html('Load more');
                }

            },
            error: function(textStatus,errorThrown) {
                console.log(textStatus);
                console.log(errorThrown);
            },
            complete: function() {
                $('.news-index-section').removeClass('loading-posts');
                $('.latest-news-section > .tile').css({'display': 'flex'});
            },

        });

    }

    $('.filter-button').on('click', function(){

        $(this).toggleClass('active-filter');

        filterPosts();

    });


    $('.load-more-ajax').on('click', function(e){

        e.preventDefault();

        filterPosts( loadmore = true );

    });


    $('.mc4wp-form').validate();


    $('.filter-buttons').each(function() {

        if ( $(this).height() > 50 ) {
            $(this).parent('.post-filter').addClass('excess-hidden').find('.filter-expand').html('More');
        }

    });

    $('.filter-expand').on('click', function() {
        $(this).parent('.post-filter').toggleClass('excess-hidden excess-shown');
    })


    /* mobile nav */
    $('.mobile-burger-menu').on('click', function() {
        $('body').toggleClass('mobile-nav-active').removeClass('mobile-search-active');

    });



    $('.mobile-nav-wrap').on('click', '.menu-item-has-children > a', function(event) {

        // hijack the link
        event.preventDefault();

        // hide the relevant elements 
        $(this).parents('li').siblings('li').hide();
        $(this).hide();

        if ( $(this).parents('.mobile-shop-menu').length ) {
            $('.mobile-nav').hide();
            $('.mobile-newsletter-signup').hide();
        }

        if ( $(this).parents('.mobile-newsletter-signup').length ) {
            $('.mobile-nav').hide();
            $('.mobile-shop-menu').hide();
        }

        if ( $(this).parents('.mobile-shop-menu').length ) {
            $('.mobile-nav').hide();
            $('.mobile-newsletter-signup').hide();
        }


        // if there is no back button shown
        if ( !$("li.back").length ) {
            // add a back button
            $(this).siblings('.sub-menu').prepend('<li class="back"><a href="#">Back</a></li>');
        }

        // reveal the sub menu items
        $(this).siblings('.sub-menu').show();

    });

    $('.mobile-nav-wrap').on('click', 'li.back a', function() {

        // hide the sub menu items
        $(this).parents('.sub-menu').hide();

        // bring back the top level nav again
        $(this).parents('.menu-item-has-children').children('a').show();
        $(this).parents('.menu-item-has-children').siblings('li').show();
        $('.mobile-nav').show();
        $('.mobile-newsletter-signup').show();
        $('.mobile-shop-menu').show();

        // remove th eback button
        $('li.back').remove();

    });


    /* mobile search */
    $('.mobile-search-toggle').on('click', function() {
        $('body').toggleClass('mobile-search-active');
    });


    // object fit polyfill
    objectFitImages();


    $('.mobile-feed-finder-select').on('click', function() {
        $('.feed-finder-tiles').toggleClass('active');
    })

    // autosize all textareas
    autosize(document.querySelectorAll('textarea'));



    // slider banner 2019

    var heroImageSwiper = new Swiper ('.image-video-carousel .swiper-container', {
        init: false,
        loop: true,
        autoplay: true,
        autoHeight: false,
        updateOnImagesReady: true,
        nextButton: '.image-video-carousel .swiper-button-next',
        prevButton: '.image-video-carousel .swiper-button-prev',
        pagination: '.image-video-carousel .swiper-pagination'
    });

    if ( jQuery( ".image-video-carousel .swiper-container" ).length ) {

        // when the initial slide is a video

        heroImageSwiper.on('init', function() {

            var slideClasses = heroImageSwiper.slides[1].className;

            if ( slideClasses.indexOf("js-uploaded-video") !== -1 ) {
                var video = heroImageSwiper.slides[1].getElementsByTagName('video');
                video[0].muted = true;
                video[0].play();
            }

        });

        heroImageSwiper.init();



        // when active slide finished transition into view

        heroImageSwiper.on('transitionEnd', function() {

            var slideClasses = heroImageSwiper.slides[heroImageSwiper.activeIndex].className;

            if ( slideClasses.indexOf("js-uploaded-video") !== -1 ) {
                var video = heroImageSwiper.slides[heroImageSwiper.activeIndex].getElementsByTagName('video');
                video[0].muted = true;
                video[0].play();
            }

        });


        // when the transition starts, pause and reset the current video

        heroImageSwiper.on('transitionStart', function() {

            var slideClasses = heroImageSwiper.slides[heroImageSwiper.activeIndex].className;

            if ( slideClasses.indexOf("js-uploaded-video") !== -1 ) {
                var video = heroImageSwiper.slides[heroImageSwiper.activeIndex].getElementsByTagName('video');
                video[0].pause();
                video[0].currentTime = 0;
            }

        });


        $(".image-video-carousel .swiper-container").hover(function(){
            heroImageSwiper.stopAutoplay();
        }, function(){
            heroImageSwiper.startAutoplay();
        });

    }

    // end slider banner 2019

$(document).on("change", ".voucher-info .gfield_list_15_cell1 input", function() {
    var sum = 0;
    $(".voucher-info .gfield_list_15_cell1 input").each(function(){
		//if (/[^0-9\.]/g.test($(this).val())){
		//
		var position = this.selectionStart - 1;
    //remove all but number and .
    var fixed = this.value.replace(/[^0-9\.]/g, "");
    if (fixed.charAt(0) === ".")
      //can't start with .
      fixed = fixed.slice(1);

    var pos = fixed.indexOf(".") + 1;
    if (pos >= 0)
      //avoid more than one .
      fixed = fixed.substr(0, pos) + fixed.slice(pos).replace(".", "");

    if (this.value !== fixed) {
      this.value = fixed;
      this.selectionStart = position;
      this.selectionEnd = position;
    }
			if($(this).val()<=50){	
			$(this).removeClass('adm-invalid');
			sum += +$(this).val();
			} else {
				$(this).val('');
				$(this).addClass('adm-invalid');
			}
		/*} else {
			$(this).val('');
			$(this).addClass('adm-invalid');
		}*/
    });
	var tsum = sum.toFixed(2);
    $(".ginput_total.ginput_total_27").empty().html('£'+tsum);
	$("#input_27_16").val(tsum);
	$(".voucher-total-text #input_27_21").val(tsum);
});

	gform.addAction( 'gform_list_post_item_add', function ( container ) {
    var sum = 0;
    $(".voucher-info .gfield_list_15_cell1 input").each(function(){
		//if (/^[0-9]+$/.test($(this).val())){
			if($(this).val()<=50){	
			$(this).removeClass('adm-invalid');
			sum += +$(this).val();
			} else {
				$(this).val('');
				$(this).addClass('adm-invalid');
			}
		//}
    });
		var tsum = sum.toFixed(2);
    $(".ginput_total.ginput_total_27").empty().html('£'+tsum);
	$("#input_27_16").val(tsum);
	$(".voucher-total-text #input_27_21").val(tsum);
});
	gform.addAction( 'gform_list_post_item_delete', function ( container ) {
    var sum = 0;
		//console.log('clicked');
    $(".voucher-info .gfield_list_15_cell1 input").each(function(){
		//if (/^[0-9]+$/.test($(this).val())){
			if($(this).val()<=50){	
			$(this).removeClass('adm-invalid');
			sum += +$(this).val();
			} else {
				$(this).val('');
				$(this).addClass('adm-invalid');
			}
		//}
    });
		var tsum = sum.toFixed(2);
    $(".ginput_total.ginput_total_27").empty().html('£'+tsum);
	$("#input_27_16").val(tsum);
	$(".voucher-total-text #input_27_21").val(tsum);
});
	
	$('#gform_28 input[type="radio"]').on('change', function(){
		var total = 0;
		$('#gform_28').find('input[type="radio"]').each(function () {
            var radio_btn_name = $(this).attr('id');

            if($('input[id="'+radio_btn_name+'"]').is(":checked")){
                total += +$(this).val();
            }
        });
		//alert(total);
		if(total>40) {
			$('#gform_28 #input_28_31').val('Very High');
		} else if(total>25) {
			$('#gform_28 #input_28_31').val('High');
		} else if(total>15) {
			$('#gform_28 #input_28_31').val('Moderate');
		} else  {
			$('#gform_28 #input_28_31').val('Low');
		}
});
	
	$('#gform_29 input[type="radio"]').on('change', function(){
		var total = 0;
		$('#gform_29').find('input[type="radio"]').each(function () {
            var radio_btn_name = $(this).attr('id');

            if($('input[id="'+radio_btn_name+'"]').is(":checked")){
                total += +$(this).val();
            }
        });
		//alert(total);
		if(total>28) {
			$('#gform_29 #input_29_31').val('Very High');
		} else if(total>20) {
			$('#gform_29 #input_29_31').val('High');
		} else if(total>10) {
			$('#gform_29 #input_29_31').val('Moderate');
		} else  {
			$('#gform_29 #input_29_31').val('Low');
		}
});

});


/* hero carousel */
var lazyTest = new Swiper ('.lazy-test.swiper-container', {
    preloadImages: false,
    lazy: true,
});
