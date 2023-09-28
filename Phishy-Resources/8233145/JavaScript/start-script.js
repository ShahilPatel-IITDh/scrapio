/*  Riposizionamento Popover */
function popoverwheretoplace() {
   var width = window.innerWidth;
   /* dashboard popover*/
   if ($('#main-dashboard').length > 0) return 'bottom';
   /* default */
   if (width < 1500) return 'bottom';
   return 'right';
}

/* Verifica presenza .content-federation-bar-minified */
if ($('.content-federation-bar-minified').length > 0) {
   var minifiedHeaderStatus = true;
} else {
   var minifiedHeaderStatus = false;
}



$(document).ready(function() {


   /************************************/
   /* Gestione avviso msg promo su Carosello */
   /* CODE to override:    var msgOnBanner = true/false */
   /* CODE to start   :    putMsgOnBanner(tgt,container(default:'banner-advice'),msg(default:'Messaggio pubblicitario con finalitÃ  promozionale.')) */
   /************************************/

   //putMsgOnBanner('.carousel-a2 .carousel-inner', '', '');


   /************************************/
   /* Retina */
   /************************************/

   if (isRetina()) {
      writeLog('detect Retina display');
   } else if (isHighDensity()) {
      writeLog('detect HighDensity display');
   }


   /************************************/
   /* Gestisci equalize dove richiesto */
   /************************************/
   function globalEqualize(eq_forced) {
      pari_altezza('.equalize',eq_forced);
      pari_altezza('.equalize-2',eq_forced);
      pari_altezza('.equalize-3',eq_forced);
      pari_altezza('.panel-cards-comparison .panel-heading',eq_forced);
      pari_altezza('.panel-cards-comparison .panel-body',eq_forced);
      pari_altezza('.panel-cards-comparison .panel-info',eq_forced);
      pari_altezza('.panel-cards-comparison .panel-footer',eq_forced);
      pari_altezza('.carousel-word .item',eq_forced);
      pari_altezza('.content-mosaic .mosaic-element',eq_forced);
      pari_altezza('.panel-cards-bg-full .panel-wrap .panel-body',eq_forced);
      pari_altezza('.panel-detailed-cards-complete .equalizing-wrap',eq_forced);
      equalizeCycle('.equalize-group', '.panel-cards',eq_forced);
      equalizeCycle('.equalize-group', '.dashboard-subcontent',eq_forced);
      equalizeCycle('.equalize-group', '.box-container',eq_forced);
      equalizeCycle('.equalize-group', '.myservices-area-small',eq_forced);
      //equalizeCycle('.equalize-group', '.panel-cards .panel-heading');
      //pari_altezza('.dashboard-subcontent');
      //pari_altezza(".panel-cards-default");
      //pari_altezza(".panel-cards-large");
      //pari_altezza(".panel-cards-medium");
      //pari_altezza(".panel-cards-basic");
   }

   /* Start Equalize */
   globalEqualize();

   /* Estendi equalize all'interno dei Tab */
   $('[data-toggle="tab"]').on('shown.bs.tab', function(e) {
      globalEqualize(true);
   });

   /* Estendi equalize all'interno di elementi collassati */
   $('.collapse').on('shown.bs.collapse', function(e) {
      globalEqualize(true);
   });


   /*****************************************/
   /* Attiva Bracket sticky */
   /*****************************************/
   if (($('#bracket').length > 0) && (!$('#vertical-navigation').length > 0)) {
     //non attivo su pagine con menu contestuale
      startBracketSticky();
   }


   /*****************************************/
   /* Attiva radioCollapse quando richiesto */
   /*****************************************/
   radioCollapse();



   /*****************************************/
   /* Attiva controllo PinCode */
   /*****************************************/
   $('.control-pincode').focus(function() {
      $(this).select();
   });



   /*****************************************/
   /* Collapse on Select */
   /*****************************************/
   $(".self-select").change(function() {
      var myactualVal = $(this).val();
      var myactualSelectId = $(this).attr('id');

      if ($('#' + myactualVal + '[data-parent="' + myactualSelectId + '"]').length > 0) {
         $('.self-contentblock[data-parent="' + myactualSelectId + '"]').not($('#' + myactualVal + '[data-parent="' + myactualSelectId + '"]')).hide(0, function() {
            $('#' + myactualVal + '[data-parent="' + myactualSelectId + '"]').show(0);
         });
      } else {
         $('.self-contentblock' + '[data-parent="' + myactualSelectId + '"]').hide(0);
      }

   });


   /******************/
   /*   Megamenu e Minified Header  */
   /******************/

   /* abilita responsivita' megamenu */
   $('#header-poste-italiane').addClass('nav-resp-pi');
   megamenu(true);

   /* abilita minified e simplified (applicativo semplificato) header */
   minifiedHeader(minifiedHeaderStatus);



   /******************************/
   /* Gestione tooltip e popover */
   /******************************/
   $('[data-toggle="tooltip"]').tooltip();

   /* Popover input-group error */
   $('.has-error .input-group-popover [data-toggle="popover"]').popover({
      html: true,
      template: '<div class="popover popover-gap popover-error"><div class="arrow"></div><div class="popover-content"></div></div>',
      placement: popoverwheretoplace
   });
   /* Popover .input-group success */
   $('.has-success .input-group-popover [data-toggle="popover"]').popover({
      html: true,
      template: '<div class="popover popover-gap popover-success"><div class="arrow"></div><div class="popover-content"></div></div>',
      placement: popoverwheretoplace
   });
   /* Popover input-group warning */
   $('.has-warning .input-group-popover [data-toggle="popover"]').popover({
      html: true,
      template: '<div class="popover popover-gap popover-warning"><div class="arrow"></div><div class="popover-content"></div></div>',
      placement: popoverwheretoplace
   });
   /* Popover inputgroup default */
   $('.input-group-popover [data-toggle="popover"]').popover({
      html: true,
      template: '<div class="popover popover-gap"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
      placement: popoverwheretoplace
   });
   /* Popover error */
   $('.has-error [data-toggle="popover"]').popover({
      html: true,
      template: '<div class="popover popover-error"><div class="arrow"></div><div class="popover-content"></div></div>',
      placement: popoverwheretoplace
   });
   /* Popover success */
   $('.has-success [data-toggle="popover"]').popover({
      html: true,
      template: '<div class="popover popover-success"><div class="arrow"></div><div class="popover-content"></div></div>',
      placement: popoverwheretoplace
   });
   /* Popover warning */
   $('.has-warning [data-toggle="popover"]').popover({
      html: true,
      template: '<div class="popover popover-warning"><div class="arrow"></div><div class="popover-content"></div></div>',
      placement: popoverwheretoplace
   });

   /* Popover default */
   $('[data-toggle="popover"]').popover({
      html: true,
      template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
      placement: popoverwheretoplace
   });


   /* il nuovo popover nasconde i popover gia' presenti in pagina  */
   $('[data-toggle=popover]').on('click', function(e) {
      //$('[data-toggle=popover]').not(this).popover('hide');
   });


   /************************/
   /* Messages - Scrollto  */
   /************************/
   if ($(".box-messages").length > 0) {
      $(".box-messages.box-danger ul li a, .box-messages.box-error ul li a").click(function(e) {
         e.preventDefault();
         anchorScrollingToFocus(this, 80, true);
      });
   }


   /**********************/
   /* Fix scroll ancore  */
   /**********************/
   $('.no-anchor').click(function(e) {
      e.preventDefault();
   });



   /******************/
   /* Avoid accordion panel collapse by click on active element (es.carrello ) */
   /******************/

   $('.panel-group .panel-tools .panel-heading a').on('click', function(e) {
      if ($(this).parents('.panel-tools').children('.panel-collapse').hasClass('in')) {
         e.stopPropagation();
      }
   });



   /**************/
   /* Triggering */
   /**************/

   /* Trigger click selection accordion tool (es.carrello) */
   if ($(".cart-option").length > 0) {
      $(".cart-option").click(function() {
         var myPanelPar = $(this).parents('.panel-tools');
         //evidence my area
         if ($(this).hasClass('collapsed')) {
            $(myPanelPar).addClass('area-evidence-active');
            $(".panel-tools").not(myPanelPar).removeClass('area-evidence-active');
         } else {}
         //check my radio
         $(myPanelPar).children().find('input:radio').prop("checked", true);
         customRadio();
      });
   }


   /* Trigger click date */
   if ($(".date").length > 0) {
      $(".date .input-group-addon").click(function() {
         var myInputTgt = $(this).prev();
         $(myInputTgt).focus()
      });
   }
   /* Trigger click/hover popoverInfo */
   if ($(".input-group-addon-info").length > 0) {
      $(".input-group-addon-info").click(function() {
         if ($(this).prev().attr('data-trigger') == 'focus') {
            var myInputTgt = $(this).prev();
            $(myInputTgt).focus();
         }
      });
      $(".input-group-addon-info").click(function() {
         if ($(this).parent('.input-group').find('select').attr('data-trigger') == 'focus') {
            var myInputTgt = $(this).parent('.input-group').find('select');
            $(myInputTgt).focus();
         }
      });
      $(".input-group-addon-info").on('mouseenter mouseleave', function(e) {
         if ($(this).prev().attr('data-trigger') == 'hover') {
            var myInputTgt = $(this).prev();
            $(myInputTgt).trigger(e.type);
         }
      });
      $(".input-group-addon-info").on('mouseenter mouseleave', function(e) {
         if ($(this).parent('.input-group').find('select').attr('data-trigger') == 'hover') {
            var myInputTgt = $(this).parent('.input-group').find('select');
            $(myInputTgt).trigger(e.type);
         }
      });
   }

   /*************/
   /* Calendari */
   /*************/


if ($('html.pi-mobile').length <= 0) {
   function startDatePicker() {
      if ($(".date").length > 0) {
         $('.date input:not([readonly])').datepicker({
            format: 'dd/mm/yyyy'
         });
      }
   }
   startDatePicker();
}

   /* Trigger click date */
   if ($(".date").length > 0) {
      $(".date .input-group-addon").click(function() {
         var myInputTgt = $(this).prev();
         $(myInputTgt).focus();
      });

      if ($('html.pi-mobile').length > 0) {
         $('.input-group.date input').attr('type', 'date');
      }
   }


   /****************************/
   /* Generic - fix assenza js */
   /****************************/
   var nojsArray = ["nojs-block", "nojs-inline", "nojs-inline-block", "nojs-xs-block", "nojs-xs-inline", "nojs-xs-inline-block", "nojs-sm-block", "nojs-sm-inline", "nojs-sm-inline-block", "nojs-md-block", "nojs-md-inline", "nojs-md-inline-block", "nojs-lg-block", "nojs-lg-inline", "nojs-lg-inline-block"];

   $.each(nojsArray, function(i, val) {
      $("." + val).removeClass(val);
   });


   /****************************/
   /* Pause Emotional video on xs/sm */
   /****************************/
   videoControlmq(".carousel video", "xs");

   /***************/
   /* Modal video */
   /***************/
   if ($(".modal-iframe").length > 0) {
      // onload event
      $('.modal-iframe').each(function() {
         var myid = $(this).attr('id');
         var mysrc = $('#' + myid + ' ' + 'iframe').attr('src');
         $('#' + myid + ' ' + 'iframe').attr('rel', mysrc);
         $('#' + myid + ' ' + 'iframe').removeAttr('src');
      });
      // start event
      $('.start-modal-iframe').click(function() {
         var myDataTarget = $(this).attr('data-target');
         var src = $(myDataTarget + ' ' + 'iframe').attr('rel');
         $(myDataTarget + ' ' + 'iframe').attr('src', src);
      });
      // close event
      $('.modal-iframe').on('hide.bs.modal', function(e) {
         $('.modal-iframe iframe').removeAttr('src');
      });

   }

   if ($(".modal-nocdn").length > 0) {
      // onload event
      $('.modal-nocdn').each(function() {
         var myid = $(this).attr('id');
         var mysrc = $('#' + myid + ' ' + 'video source').attr('src');
         $('#' + myid + ' ' + 'video source').attr('rel', mysrc);
         $('#' + myid + ' ' + 'video source').removeAttr('src');
         $('#' + myid + ' ' + 'video').load();
      });
      // start event
      $('.modal-nocdn').click(function() {
         var myDataTarget = $(this).attr('data-target');
         var src = $(myDataTarget + ' ' + 'video source').attr('rel');
         $(myDataTarget + ' ' + 'video source').attr('src', src);
         $(myDataTarget + ' ' + 'video').load();
      });
      // close event
      $('.modal-nocdn').on('hide.bs.modal', function(e) {
         $('.modal-nocdn video source').removeAttr('src');
         $('.modal-nocdn video').load();
      });
   }

   if ($(".modal-cdn").length > 0) {

      //start event
      $('.start-modal-cdn').click(function() {
         var myDataTarget = $(this).attr('data-target');
         var myCDNvideoTarget = $(myDataTarget + ' video').attr('id');
         $(myDataTarget + ' .azuremediaplayer').removeAttr('style');
         amp(myCDNvideoTarget).play();
      });

      // modal callback event
      /*
      $('.modal-cdn').on('show.bs.modal', function (e) {
          //modalCallback();
      });
      */

      // close event
      $('.modal-cdn').on('hide.bs.modal', function(e) {
         var myModalTarget = $(this).attr('id');
         var myCDNvideoTarget = $('#' + myModalTarget + ' video').attr('id');
         amp(myCDNvideoTarget).pause();
      });

   }

   /************/
   /* Carousel */
   /************/
   $(".carousel .item .container").wrap("<div class='carousel-overlay'></div>");


   $(".submenu-product-scroller").slick({
      dots: false,
      infinite: false,
      centerMode: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      touchThreshold: 30,
      variableWidth: true
   });


   $(".submenu-vert-nav-scroller").slick({
      dots: false,
      infinite: false,
      centerMode: false,
      slidesToShow: 1,
      slidesToScroll: 2,
      touchThreshold: 30,
      variableWidth: true
   });

   $(".submenu-need-scroller").slick({
      dots: false,
      infinite: false,
      centerMode: false,
      slidesToShow: 2,
      slidesToScroll: 1,
      touchThreshold: 30,
      variableWidth: true
   });

   $(".slick-tabs-scroller").slick({
      dots: false,
      infinite: false,
      centerMode: false,
      slidesToShow: 1,
      slidesToScroll: 2,
      touchThreshold: 30,
      variableWidth: true
   });



   /********************/
   /* Carousel bisogni homepage  */
   /********************/

   $(".need-scroller-slick").slick({
      dots: false,
      infinite: true,
      centerMode: false,
      slidesToShow: 5,
      slidesToScroll: 5,
      touchThreshold: 30,
      variableWidth: true,
      arrows: false,
      dots: true,
      responsive: [{
            breakpoint: 1199,
            settings: {
               slidesToScroll: 4
            }
         },
         {
            breakpoint: 992,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 3
            }
         },
         {
            breakpoint: 768,
            settings: {
               slidesToScroll: 5
            }
         }
      ]
   });

   slick_arrows();

   /* Abilita swipe su carosello Bootstrap */
   $(".carousel").swiperight(function() {
      $(this).carousel('prev');
   });
   $(".carousel").swipeleft(function() {
      $(this).carousel('next');
   });


   /* Nascondi le frecce su caroselli senza loop (es. tutorial)  */
   function noLoopController() {
      var $this = $('.carousel-noloop');
      if($('.carousel-inner .item:first').hasClass('active')) {
          $this.children('.left.carousel-control').hide();
          $this.children('.right.carousel-control').show();
      } else if($('.carousel-inner .item:last').hasClass('active')) {
          $this.children('.left.carousel-control').show();
          $this.children('.right.carousel-control').hide();
      } else {
          $this.children('.carousel-control').show();
      }
   };

   $('.carousel-noloop').carousel({
      wrap: false
   }).on('slid.bs.carousel', '', noLoopController);

   noLoopController();


   /* Abilita soft animation su item con altezze differenti  */
   $('.carousel-swipe-soft').on('slid.bs.carousel', function(e) {
      var nextH = $(e.relatedTarget).height();
      $(this).find('.active.item').parent().animate({
         height: nextH
      }, 500);
   });



   /********************/
   /* responsive tabs  */
   /********************/
   if ($(".horizontal-nav-tabs").length > 0) {
      /* start active element on tab */
      $(".horizontal-nav-tabs li").each(function(indice) {
         if (indice == 0) {
            $(this).addClass('active');
         }
      });
      /* start responsive fox xs & sm */
      // fakewaffle.responsiveTabs(['xs', 'sm']);
   }

   /******************/
   /* Tabs verticali */
   /******************/

   if ($("ul.nav-tabs li a").length > 0) {
      $("ul.nav-tabs li a").each(function(i) {

         //writeLog("----");
         //writeLog("Javascript Ready - Starting link nav-tabs");
         //writeLog("----");

         var myrel = $(this).attr("rel");
         var myhref = $(this).attr("href");
         $(this).attr("rel", myhref);
         $(this).attr("href", myrel);

      });
   }


   /******************/
   /* Dropdown windowbox  */
   /******************/

   $('li.dropdown.dropdown-windowbox a.dropdown-toggle-login').on('click', function(event) {
      $(this).parent().toggleClass("open");
      event.preventDefault();
   });

   $('li.dropdown.dropdown-windowbox a.dropdown-toggle-dashboard').on('click', function(event) {
      $(this).parent().toggleClass("open");
      event.preventDefault();
   });


   /* Gestisci animazione e chiamata backdrop su sottomenu prodotto */
   $('#submenu-product-main-item .dropdown-toggle-wrap').on('show.bs.dropdown', function() {
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
      callBackdrop(true);
   });

   $('#submenu-product-main-item .dropdown-toggle-wrap').on('hide.bs.dropdown', function() {
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
      callBackdrop(false);
   });


   /* chiudi le tendine aperte sul body-click e la sidebar */
   $('body').on('click', function(e) {
      if (!$('li.dropdown.dropdown-windowbox').is(e.target) && $('li.dropdown.dropdown-windowbox').has(e.target).length === 0 && $('.open').has(e.target).length === 0) {
         $('li.dropdown.dropdown-windowbox').removeClass('open');
      }
   });


   /******************/
   /*    arrow spin  */
   /******************/

   /* choose site spin*/
   $('.navbar-mysite-list-wrap').on('shown.bs.collapse', function() {
       $(".navbar-mysite-choose .collapsed-arrow").removeClass("collapsed-arrow-closed").addClass("collapsed-arrow-open");
       $(".navbar-mysite-list-wrap").removeClass("collapse");
   });

   $('.navbar-mysite-list-wrap').on('hidden.bs.collapse', function() {
      $(".navbar-mysite-choose .collapsed-arrow").removeClass("collapsed-arrow-open").addClass("collapsed-arrow-closed");
       $(".navbar-mysite-list-wrap").addClass("collapse");
   });


   /*********************************/
   /* Spacing for Simplified header */
   /*********************************/

   spacingOnBody();
   myanimationScroll(window.location.hash);


});


/**** se necessario rimuove le freccie dello slick ****/

function slick_arrows() {
   var w_prod_slides = 0;
   $('.slick-slide').each(function(index) {
      w_prod_slides += $(this).width() + 35;
      return w_prod_slides;
   });

   if ($('.submenu-product-scroller').innerWidth() > w_prod_slides) {
      $('.slick-arrow').hide();
   } else {
      $('.slick-arrow').show();
   }
}

var timeoutObj;
var timeoutFuncExe = false;

/**** Popover on end resizing ****/
function popoverClear(focused) {
   focused.popover('show');
   timeoutFuncExe = false;
}


/**** Spacing for Simplified header on end resizing (and on Dom Ready) ****/
function spacingOnBody() {
   if ($('.content-federation-bar-simplified').length > 0) {
      if (mq_Detect == "sm" || mq_Detect == "xs") {
         $('body').css('padding-top', 44);
      } else {
         $('body').css('padding-top', 49);
      }
   } else {
      $('body').css('padding-top', 0);
   }
   timeoutFuncExe = false;
}



$(window).resize(function() {

   clearTimeout(timeoutObj);
   timeoutObj = setTimeout(function() {
      /**** Popover ****/
      var focused = $('[data-toggle=popover]:focus');
      if (focused.length > 0) {
         popoverClear(focused);
      }

      /**** Spacing for Simplified header ****/
      if (mq_Detect !== "sm" && $('.content-header-federation-bar-fixed').length <= 0) {
         spacingOnBody();
      }

      /**** Remove Emotional video on xs/sm ****/
      videoControlmq(".carousel video", "xs");

      /**** Reload Sticky ****/
      if (($('#bracket').length > 0) && (!$('#vertical-navigation').length > 0)) {
        //non attivo su pagine con menu contestuale
         startBracketSticky();
      }

      /* Reset height on carousel item with soft animation */
      if ($('.carousel-swipe-soft').length > 0) {
         $('.carousel-swipe-soft').find('.carousel-inner').css('height', 'auto');
      }


   }, 500);


   if (!timeoutFuncExe) {
      /**** Popover on start resizing ****/
      $('[data-toggle=popover]').popover('hide');

      /**** Spacing for Simplified header on start resizing ****/
      //do nothing

      timeoutFuncExe = true;
   }


   /*********************************/
   /*    Gestisci fix ancore        */
   /*********************************/

   //$('.content-header-federation-bar').removeClass('content-header-federation-bar-fixed');
   if (mq_Detect == "sm" || mq_Detect == "xs") {
      $('.content-page-anchors').removeClass('content-page-anchors-fixed');
      $('.content-page-anchors').removeAttr('style');
      $('.content-hero .container-fluid').removeAttr('style');
   }

   slick_arrows();

});


$(window).scroll(function() {

   /*********************************/
   /*   Icon Scroll on FullpageHero Carousel  */
   /*********************************/
   iconScrollFading('.icon-scroll');


   /*********************************/
   /*   Megamenu e Minified Header  */
   /*********************************/

   /* abilita minified header */
   minifiedHeader(true);



});
