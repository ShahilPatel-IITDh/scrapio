(function($) {

    "use strict";



    var Core = {


        initialized: false,
        initialize: function() {
            if (this.initialized)
                return;
            this.initialized = true;
            this.build();
        },


        build: function() {

            this.fixedHeader();
            // Init toggle menu
            this.initToggleMenu();
            // Search
            this.initSearchModal();
            // Dropdown menu
            this.dropdownhover();
            // Submenu
            this.submenuControll();



        },



        // Searc Modal

        initSearchModal: function(options) {



            $(".btn_header_search").click(function() {
                $(".header-search").addClass("open");
            });


            $(document).on("click", ".search-form_close", function(event) {

                $(".header-search").removeClass("open");
            });



            $(document).on("click", ".btn_header_subscribe", function(event) {


                $(".header-subscribe").addClass("open");
            });
            $(document).on("click", ".search-form_close", function(event) {

                $(".header-subscribe").removeClass("open");
            });





        },

        // Toggle Menu

        initToggleMenu: function() {


            $('.toggle-menu-button').each(function(i) {


                var trigger = $(this);
                var isClosed = true;



                function showMenu() {



                    $('#nav').addClass('navbar-scrolling-fixing');



                    if (trigger.hasClass("js-toggle-screen")) {

                        $('#fixedMenu').delay(0).fadeIn(300);

                    }

                    trigger.addClass('is-open');
                    isClosed = false;
                }


                function hideMenu() {
                    $('#fixedMenu').fadeOut(100);
                    $('#nav').removeClass('navbar-scrolling-fixing');
                    trigger.removeClass('is-open');
                    isClosed = true;
                }




                $('.fullmenu-close').on('click', function(e) {
                    e.preventDefault();
                    if (isClosed === true) {
                        hideMenu();
                    } else {
                        hideMenu();
                    }
                });

                trigger.on('click', function(e) {
                    e.preventDefault();
                    if (isClosed === true) {
                        showMenu();
                    } else {
                        hideMenu();
                    }
                });


            });
        },

        // Dropdown


        dropdownhover: function(options) {

            $(".dropdown").on({
                mouseenter: function() {
                    $(this).toggleClass('open');
                },
                mouseleave: function() {
                    $(this).toggleClass('open');
                }
            });

        },



        //Fixed header

        fixedHeader: function(options) {
            if ($(window).width() > 767) {
                // Fixed Header
                var topOffset = $(window).scrollTop();
                if (topOffset > 90) {


                    if ($(".header").is(".navbar-fixed-js")) {

                        $('.header').addClass('navbar-scrolling');


                    }


                }
                $(window).on('scroll', function() {
                    var fromTop = $(this).scrollTop();
                    if (fromTop > 90) {
                        
                         if ($(".header").is(".navbar-fixed-js")) {
                             
                        $('body').addClass('fixed-header');
                        $('.header').addClass('navbar-scrolling');
                             
                                }
                        
                    } else {
                        $('body').removeClass('fixed-header');
                        $('.header').removeClass('navbar-scrolling');
                    }

                });
            }
        },
        
        
        
        // Submenu

        submenuControll: function(options) {

            $('li.menu-item-has-children .menu-parent-link').prepend('<span class="submenu-controll"></span>')


            $(".submenu-controll").click(function() {

                $(this).parent().toggleClass('dropdown-open');

            });


            $('li.menu-item-has-children li.menu-item-has-children').prepend('<span class="submenu-controll-inner"><i class="fa fa-angle-right" aria-hidden="true"></i></span>');


            $('.slidebar-menu  li.menu-item-has-children').prepend('<span class="submenu-controll-inner"><i class="fa fa-angle-right" aria-hidden="true"></i></span>');


        },



    };




    Core.initialize();
    
    // Fixed promo

	$(window).on('scroll', function() {
		var fromTopPromo = $(this).scrollTop();
		if (fromTopPromo > 190) {
			$('.promo-set').addClass('promo-set-view');
		} else {
			$('.promo-set').removeClass('promo-set-view');
		}

	});
    


})(jQuery);



