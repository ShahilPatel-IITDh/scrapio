$(document).ready(function() {

  // SWIPER INITIATE
  if(typeof(Swiper) !== 'undefined') { 
    var swiper = new Swiper(".swiper-container", {
      slideClass: "swiper-slide",
      navigation: {
        nextEl: ".swiper-next",
        prevEl: ".swiper-prev",
      },
      on: {
        afterInit: function () {
        },
        activeIndexChange: function (swp) {
          if(gamLazy == "1") {
            gamLazyLoadImages();
            //$(window).scrollTop($(window).scrollTop()+1);
            //$(window).scrollTop($(window).scrollTop()-1);
          }
        }
      }
    });
  }
  
  // MOBILE FOOTER - SHOW MORE
  $('body').on('click', 'footer .cl .lnk.show-hidden', function(e) {
    e.preventDefault();
 
    if(!$(this).hasClass('opened')) {
      $(this).addClass('opened');
      $(this).closest('.cl').find('.lnk.go-hide').show(0);
    } else {
      $(this).removeClass('opened');
      $(this).closest('.cl').find('.lnk.go-hide').hide(0);
    }
  });



  // NICE SCROLL - MANAGE FADERS
  $('.nice-scroll').on('scroll', function(e) {
    var box = $(this);

    var maxScroll = (box.prop('scrollWidth') - box.scrollLeft()) - box.width();

    if (box.scrollLeft() < 20) {
      box.siblings('.nice-scroll-left').fadeOut(200);
    } else {
      box.siblings('.nice-scroll-left').fadeIn(200);
    }

    if (maxScroll < 20) {
      box.siblings('.nice-scroll-right').fadeOut(200);
    } else {
      box.siblings('.nice-scroll-right').fadeIn(200);
    }
  });


  // HIDE FADERS WHEN NOT NEEDED
  $('.nice-scroll').each(function() {
    var box = $(this);
 
    if(box.prop('scrollWidth') - box.width() <= 0) {
      box.siblings('.nice-scroll-left').hide(0);
      box.siblings('.nice-scroll-right').hide(0);
    }
  });




  // USER MENU HIGHLIGHT ACTIVE
  var url = window.location.toString();

  $('.user-top-menu > .umenu a').each(function(){
    if(!$('.user-top-menu > .umenu a.active').length) {
      var myHref = $(this).attr('href');

      if(url == myHref) {
        if(myHref.indexOf(url) >= 0)
        $(this).parent('li').addClass('active');
        return;
      }
    }
  });


  // USER PROFILE - SWITCH CARDS
  $('body').on('click', '.usr-menu.profile-menu > div', function(e) {
    e.preventDefault();

    $('.usr-menu.profile-menu > div').removeClass('active');
    $(this).addClass('active');

    $('.body-ua #main.profile .box').hide(0);
    $('.body-ua #main.profile .box[data-id="' + $(this).attr('data-id') + '"]').fadeIn(200);
  });


  // USER ALERTS - SWITCH ALERTS
  $('body').on('click', '.usr-menu.alerts-menu > div', function(e) {
    if(!$(e.target).closest('a').length){
      e.preventDefault();

      $('.usr-menu.alerts-menu > div').removeClass('active');
      $(this).addClass('active');

      $('.alert-box').hide(0);
      $('.alert-box[data-id="' + $(this).attr('data-id') + '"]').fadeIn(200);
    }
  });


  // SUBCAT SHOW THEM ALL
  $('body').on('click', '#sub-cat .link.show-all a', function(e) {
    e.preventDefault();

    if(!$(this).hasClass('opened')) {
      $(this).addClass('opened');
      $(this).closest('.list').find('.link.hidden').show();
    } else {
      $(this).removeClass('opened');
      $(this).closest('.list').find('.link.hidden').hide();
    }
  });


  // HEADER CATEGORIES BUTTON
  $('body').on('click', 'header .left a.categories', function(e) {
    e.preventDefault();

    if($(this).hasClass('opened')) {
      $(this).removeClass('opened');
      $('#cat-box').fadeOut(0).removeClass('overlay-black');
      $('#overlay.black').fadeOut(0);
    } else { 
      $(this).addClass('opened');
      $('#cat-box').fadeIn(200).addClass('overlay-black');
      $('#overlay.black').fadeIn(0);
    }
  });


  // HOME CATEGORIES SCROLL - LEFT
  $('body').on('click', '#home-cat2 .scroll-left', function(e) {
    e.preventDefault();

    $('#home-cat2 .wrap').animate({
      scrollLeft: "-=" + 300 + "px"
    }, 200, function() {
      homeCatScrolls();
    });
  });


  // MANAGE SCROLLING
  $('#home-cat2 .wrap').on('scroll', function(e) {
    homeCatScrolls();
  });


  // HOME CATEGORIES SCROLL - RIGHT
  $('body').on('click', '#home-cat2 .scroll-right', function(e) {
    e.preventDefault();

    $('#home-cat2 .wrap').animate({
      scrollLeft: "+=" + 300 + "px"
    }, 200, function() {
      homeCatScrolls();
    });
  });

  // HIDE RIGHT SCROLL BUTTON IF NOT NEEDED
  if($('#home-cat2 .line').width() > $('#home-cat2 .wrap').width()) {
    $('#home-cat2 .scroll-right').fadeIn(200);
  }


  // CHECK MISSING ICONS MOBILE MENU USER
  $('#menu-user a').each(function() {
    if(!$(this).find('i').length) {
      $(this).prepend('<i class="far fa-square"></i>');
    }
  });

  

  // SHOW USER MENU IN HEADER
  $('body').on('click', 'header .right a.my-account', function(e) {
    e.preventDefault();

    if (($(window).width() + scrollCompensate()) < 768) {
      if(!$('header .right a.my-account').hasClass('opened')) {
        $('header .right a.my-account').addClass('opened');
        $('#menu-user').addClass('opened').fadeIn(300);
      } else {
        $('header .right a.my-account').removeClass('opened');
        $('#menu-user').removeClass('opened').fadeOut(0);
      }
    } else {
      if(!$('header .user-menu').hasClass('overlay-white')) {
        $('#overlay.white').fadeIn(100);
        $('header .user-menu').addClass('overlay-white').fadeIn(100);
      } else {
        $('#overlay.white').fadeOut(0);
        $('header .user-menu').removeClass('overlay-white').fadeOut(0);
      }
    }
  });


  // CLOSE OVERLAY - WHITE
  $('body').on('click', '#overlay.white', function(e) {
    e.preventDefault();

    $('#overlay.white').fadeOut(0);
    $('.overlay-white').removeClass('overlay-white').fadeOut(0);
  });

  // CLOSE OVERLAY - BLACK
  $('body').on('click', '#overlay.black', function(e) {
    e.preventDefault();

    $('#overlay.black').fadeOut(0);
    $('.overlay-black').removeClass('overlay-black').fadeOut(0);
    $('header .left a.categories').removeClass('opened');
  });


  // REUPLOAD PLUGIN ATTRIBUTES FOR CATEGORIES ON MOBILE SEARCH PAGE
  $('body').on('change', '.search-mobile-filter-box input[name="sCategory"]', function(e) {
    var sidebar = $('.search-mobile-filter-box form');
    var ajaxSearchUrl = baseDir + "index.php?" + sidebar.find(':input[value!=""]').serialize();
    
    $('.sidehook').addClass('loading');

    $.ajax({
      url: ajaxSearchUrl,
      type: "GET",
      success: function(response){
        var length = response.length;

        var sidehook = $(response).contents().find('.sidehook').html();

        if(sidehook === undefined) {
          $('.search-mobile-filter-box .sidehook').remove();
          return false;
        }

        if (!$('.search-mobile-filter-box .sidehook').length) {
          $('.filter .wrap .box').last().after('<div class="box sidehook"></div>');
        }

        $('.search-mobile-filter-box .sidehook').html(sidehook).removeClass('loading');

      }
    });
  });


  // OPEN SEARCH BOX ON MOBILE
  $('body').on('click', 'a#m-search', function(e) {
    e.preventDefault();

    if($(this).hasClass('opened')) {
      $(this).removeClass('opened');
      $('#menu-search').css('opacity', 1).css('top', '60px').animate({opacity: 0, top:'0px'} , 300, function() { $('#menu-search').hide(0); });

    } else {
      $(this).addClass('opened')
      $('#menu-search').show(0).css('opacity', 0).css('top', '0px').animate({ opacity: 1, top:'60px'}, 300);

      if($('#m-options').hasClass('opened')) {
        $('#m-options').click();
      }

    }
  });


  // DISABLE LINKS SEARCH ON MOBILE AND REPLACE WITH "CHECKBOX" LIKE
  $('body').on('click', '.search-mobile-filter-box a', function(e) {
    e.preventDefault();

    var inptName = $(this).attr('data-name');
    var inptVal = $(this).attr('data-val');
 
    $('[name="' + inptName + '"]').val(inptVal);

    $(this).parent().find('a').removeClass('active');
    $(this).addClass('active');

  });


  // SHOW PHONE CONTACT INFORMATION ON ITEM PAGE ON MOBILE
  $('body').on('click', '.mobile-item.item-phone', function(e) {
    e.preventDefault();
 
    $('.mobile-user-data').fadeOut(0);
    $('.mobile-item-data').fadeToggle(300);
    
    if($(this).find('i').hasClass('fa-phone')) {
      $(this).find('i').removeClass('fa-phone').addClass('fa-times');
    } else {
      $(this).find('i').addClass('fa-phone').removeClass('fa-times');
    }
  });


  // SHOW USER LINKS ON ITEM PAGE ON MOBILE
  $('body').on('click', '.mobile-item.item-user', function(e) {
    e.preventDefault();
 
    $('.mobile-item-data').fadeToggle(0);
    $('.mobile-user-data').fadeToggle(300);
  });


  // COPY PHONE NUMBER
  $('body').on('click', 'a.copy-number', function(e) {
    e.preventDefault();

    var inpt = $('<input class="just-sec"/>');
    $('body').append(inpt);
    inpt.val($(this).attr('href')).select();
    document.execCommand('copy');
    inpt.remove();
    $(this).text($(this).attr('data-done'));
  });


  // ADD ICON TO USER MENU IF MISSING
  $('ul.user_menu li a').each(function() {
    if(!$(this).find('i').length) {
      $(this).prepend('<i class="fa fa-folder-o"></i>');
    }
  });


  // SCROLL - HEADER BORDER & MOBILE POST BUTTON ON HOME
  $(window).scroll(function(e) {
    var scroll = $(window).scrollTop();
    
    if(scroll <= 0) {
      $('header').css('border-bottom-color', '#fff');
    } else {
      $('header').css('border-bottom-color', '#ccc');
    }

    if(scroll <= 500) {
      $('.mobile-post-wrap').fadeOut(300);
    } else {
      $('.mobile-post-wrap').fadeIn(300);
    }
  });


  // TABS FUNCTIONALITY ON ITEM PAGE
  $('body').on('click', '.main-head a', function(e) {
    e.preventDefault();

    if($(this).hasClass('active')) {
      return false;
    }

    if($(this).hasClass('tab-img')) {
      $('.main-data .loc').hide(0);
      $('.main-data .img').show(0);
    } else {
      $('.main-data .img').hide(0);
      $('.main-data .loc').show(0);

      if(typeof osmMap !== 'undefined') { 
        osmMap.invalidateSize();
      }

    }

    $('.main-head a').removeClass('active');
    $(this).addClass('active');
  });


  // TOP PAGE LOADER
  $(document).ajaxStart(function() {
    //Pace.restart();
  });

  $('body').on('click', 'a.alert-notify', function(e) {
    e.preventDefault();
    $('.alert-box').slideDown(200);
    $(this).slideUp(200);
  });


  $('body').on('click', '.cat-confirm, .loc-confirm', function(e) {
    e.preventDefault();
    $(this).closest('.shower').fadeOut(200);
    $(this).closest('.cat-picker').find('input.term3').removeClass('open');
    $(this).closest('.loc-picker').find('input.term2').removeClass('open');
  });


  // CATEGORY PICKER SMART
  $('body').on('click', '.cat-tab .elem', function(e) {
    e.preventDefault();
    var elem = $(this);
    var shower = $(this).closest('.cat-picker').find('.shower');

    shower.find('.cat-tab:not(.root)').each(function() {
      if($(this).attr('data-level') > elem.closest('.cat-tab').attr('data-level')) {
        $(this).removeClass('active');
        $(this).find('.elem').removeClass('active');
      } 
    });

    //if(!elem.hasClass('active') && !elem.hasClass('blank')) {
    if(!elem.hasClass('blank')) {
      shower.find('.cat-tab[data-parent="' + elem.attr('data-category') + '"]').addClass('active');
    }


    //var boxCols = parseFloat(shower.find('.cat-tab[data-parent="' + elem.attr('data-category') + '"]').attr('data-level'))-1;
    var boxCols = parseFloat(shower.find('.cat-tab.active').last().attr('data-level'))-1;
    shower.find('.wrapper').attr('data-columns', boxCols);


    $('input[name="sCategory"], input[name="catId"]').val($(this).attr('data-category'));

    if(!$(this).closest('.search-mobile-filter-box').length) {
      $('input[name="sCategory"], input[name="catId"]').change();
    } else {
      $('.search-mobile-filter-box form input[name="sCategory"]').change();
    }

    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    $(this).closest('.cat-picker').find('input.term3').val($(this).text());
   
  });




  // LATEST SEARCH BOX
  var delayQuery = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

  $('body').on('click', '.query-picker .pattern', function() {
    if(!$('.query-picker .shower .option').length) {
      $(this).keypress();
    } else {
      if(!$(this).hasClass('open')) {
        $(this).closest('.query-picker').find('.shower').show(0).css('opacity', 0).css('margin-top', '30px').css('margin-bottom', '-30px').animate( { opacity: 1, marginTop:'0', marginBottom:'0'} , 300);
        $(this).addClass('open');
        $(this).closest('.line1').addClass('open');
      }
    }
  });



  // AJAX LOCATION SMART
  $('body').on('click', '.loc-tab .elem', function(e) {
    e.preventDefault();

    if(!$(this).hasClass('active') && !$(this).hasClass('city')) {
      var elem = $(this);
      var shower = $(this).closest('.loc-picker').find('.shower');

      elem.addClass('loading');

      if(elem.hasClass('region')) {
        elem.closest('.loc-picker').find('.city-tab').addClass('loading');
      } else if (elem.hasClass('country')) {
        elem.closest('.loc-picker').find('.region-tab').addClass('loading');
        elem.closest('.loc-picker').find('.city-tab').html('');
      }

      $.ajax({
        type: "GET",
        url: baseAjaxUrl + "&ajaxLoc2=1&country=" + elem.attr('data-country') + "&region=" + elem.attr('data-region') + "&city=" + elem.attr('data-city'),
        success: function(data) {
          //console.log(data);

          if(elem.attr('data-region') != '') {
            shower.find('.city-tab').replaceWith(data);
          } else if(elem.attr('data-country') != '') {
            shower.find('.region-tab').replaceWith(data);
          }

          elem.siblings().removeClass('active');
          elem.addClass('active').removeClass('loading');

        }
      });
    }

    if($(this).hasClass('active')) {
      if($(this).hasClass('country')) {
        $(this).closest('.shower').find('.elem.region').removeClass('active');
        $(this).closest('.shower').find('.elem.city').removeClass('active');

      } else if($(this).hasClass('region')) {
        $(this).closest('.shower').find('.elem.city').removeClass('active');

      }
    }


    if($(this).hasClass('city')) {
      $(this).parent().find('.elem').removeClass('active');
      $(this).addClass('active');
    }

     $('input[name="sCountry"], input[name="countryId"]').val($(this).attr('data-country'));
     $('input[name="sRegion"], input[name="regionId"]').val($(this).attr('data-region'));
     $('input[name="sCity"], input[name="cityId"]').val($(this).attr('data-city'));

     if($('body#body-search').length) {
       $('input[name="locUpdate"]').change();
     }
 
     $(this).closest('.loc-picker').find('input.term2').val($(this).text());
   
  });




  // QUERY PICKER - LIVE ITEM SEARCH ON QUERY WRITTING
  $('body').on('keyup keypress', '.query-picker .pattern', function(e) {
    delayQuery(function(){
      var min_length = 1;
      var elem = $(e.target);
      var query = encodeURIComponent(elem.val());
      var queryOriginal = elem.val();

      var block = elem.closest('.query-picker');
      var shower = elem.closest('.query-picker').find('.shower');

      //shower.html('');

      if(query.length >= min_length) {
        $.ajax({
          type: "POST",
          url: baseAjaxUrl + "&ajaxQuery=1&pattern=" + query,
          dataType: 'json',
          success: function(data) {
            shower.html('');

            var length = data.length;
            var result = '';

            for(key in data) {
              if(!shower.find('div[data-hash="' + data[key].hash + '"]').length) {

                result += '<div class="option query" data-hash="' + data[key].string_hash + '">' + data[key].string_format + '</div>';
              }
            }

            if(length <= 0) {
              result += '<div class="option query" data-hash="blank"><b>' + queryOriginal + '</b></div>';
            }

            shower.html(result);

            if(!elem.hasClass('open')) {
              shower.show(0).css('opacity', 0).css('margin-top', '30px').css('margin-bottom', '-30px').animate( { opacity: 1, marginTop:'0', marginBottom:'0'} , 300);
              elem.addClass('open');
              elem.closest('.line1').addClass('open');
            }
          }
        });
      } else {
        shower.html('');

        if(elem.hasClass('open') && queryOriginal != '') {
          shower.hide(0);
          elem.removeClass('open');
          elem.closest('.line1').removeClass('open');
        }
      }
    }, 100);
  });


  // QUERY PICKER - WHEN CLICK OUTSIDE LOCATION PICKER, HIDE SELECTION
  $(document).mouseup(function (e){
    var container = $('.query-picker');

    if(!container.is(e.target) && container.has(e.target).length === 0) {
      container.find('.shower').fadeOut(0);
      container.find('.pattern').removeClass('open');
      container.closest('.line1').removeClass('open');
    }
  });


  // QUERY PICKER - PICK OPTION
  $(document).on('click', '.query-picker .shower .option', function(e){
    $('.query-picker .pattern').removeClass('open');
    $('.query-picker .shower').fadeOut(0);
    $('.query-picker .pattern').val($(this).text());
    $('.query-picker').closest('.line1').removeClass('open');
  });


  // QUERY PICKER - OPEN ON CLICK IF NEEDED
  $(document).on('click', '.query-picker .pattern', function(e){
    if(!$(this).hasClass('open') && $(this).val() != '' && $(this).closest('.query-picker').find('.shower .option').length) {
      $(this).closest('.query-picker').find('.shower').show(0).css('opacity', 0).css('margin-top', '30px').css('margin-bottom', '-30px').animate( { opacity: 1, marginTop:'0', marginBottom:'0'} , 300);
      $(this).addClass('open');
      $(this).closest('.line1').addClass('open');
    }
  });


  // ARROW CLICK OPEN BOX
  $(document).on('click', '#location-picker .fa-angle-down', function(e){
    $(this).siblings('input[type="text"]').click();
  });


  // FANCYBOX - LISTING PREVIEW
  $(document).on('click', '.simple-prod .preview:not(.disabled)', function(e){
    e.preventDefault();
    var url = this.href;

    var maxWidth = 680;
    var windowsWidth = parseInt($(window).outerWidth()) - 40;
    var windowsHeight = parseInt($(window).outerHeight()) - 40;

    if(windowsWidth > maxWidth) {
      windowsWidth = maxWidth;
    }

    gamModal({
      width: windowsWidth,
      height: windowsHeight,
      content: url, 
      wrapClass: 'imgviewer',
      closeBtn: true, 
      iframe: true, 
      fullscreen: 'mobile',
      transition: 200,
      delay: 0,
      lockScroll: true
    });


    /*
    if(jqueryVersion == '1') {
      if (!!$.prototype.fancybox) {
        $.fancybox.open({
          'padding': 0,
          'width': windowsWidth,
          'height': windowsHeight,
          'scrolling': 'yes',
          'wrapCSS': 'imgviewer',
          'type': 'iframe',
          'href': url
       });
      }
    } else { 
      if (!!$.prototype.fancybox) {
        windowsWidth = windowsWidth.toString() + 'px';
        windowsHeight = windowsHeight.toString() + 'px';

        $.fancybox.open({
          toolbar : true,
          type: 'iframe',
          baseClass: 'imgviewer',
          src: url,
          iframe: {
            css: {
                width : windowsWidth,
                height : windowsHeight,
                padding: 0
              }
          }
        });
      }
    }
    */
  });


  // Handle no pictures
  $(document).on('click', '.orange-but.open-image.disabled', function(e){
    e.preventDefault();
    return false;
  });




  // HOME SEARCH - LOCATION PICK AVOID EMPTY
  //$(document).one('submit', 'form#home-form, form#search-form', function(e){
  $(document).one('submit', 'form#home-form', function(e){
    if(locationPick == "1" && 1==2) {
      e.preventDefault();

      if($(this).find('input.term').val() != '' && $(this).find('input[name="sCity"]') == '' && $(this).find('input[name="sRegion"]') == '' && $(this).find('input[name="sCountry"]') == '') {
        if($(this).find('.shower .option:not(.service):not(.info)').length) {
          $(this).find('.shower .option:not(.service):not(.info)').first().click();
        }
      }

      $(this).submit();
    }
  });


  // MASONRY - CREATE GRID WHEN IMAGES HAS DIFFERENT SIZE (height)
  if(gamMasonry == "1") {
    var $grid = $('.products .prod-wrap, #search-items .products, .products .wrap').masonry({
      itemSelector: '.simple-prod'
    });

    $grid.imagesLoaded().progress(function(){
      $grid.masonry('layout');
    });
  }


  // LAZY LOADING OF IMAGES
  if(gamLazy == "1" && gamMasonry == "0" ) {
    gamLazyLoadImages();
  }


  // PRINT ITEM
  $('body').on('click', 'a.print', function(e){
    e.preventDefault();
    window.print();
  });


  // IF LABEL CONTAINS LINK, OPEN IT WITHOUT ANY ACTION
  $(document).on('click', 'label a', function(e){
    if($(this).attr('href') != '#') {
      var newWin = window.open($(this).attr('href'), '_blank');
      newWin.focus();
      return false;
    }
  });


  // ENSURE ATTRIBUTE PLUGIN LABEL CLICK WORKS CORRECTLY
  $(document).on('click', 'input[type="checkbox"]:not([id^="bpr-cat-"]):not([name^="pol-val"]) + label', function(e){
    var inpId = $(this).attr('for');

    if(inpId != '') {
      var checkBox = $('input[type="checkbox"][id="' + inpId + '"]');

      if(!checkBox.length) {
        e.preventDefault();
        checkBox = $('input[type="checkbox"][name="' + inpId + '"]');
      }

      if(!checkBox.length) {
        e.preventDefault();
        checkBox = $(this).parent().find('input[type="checkbox"]');
      }

      if(checkBox.length) {
        e.preventDefault();
        checkBox.prop('checked', !checkBox.prop('checked'));
      }


      // Make sure prem & img checks on search page initiate ajax search
      if(checkBox.closest('.img-check').length || checkBox.closest('.prem-check').length) {
        checkBox.change();
      }
    }
  });


  // ENSURE ATTRIBUTE PLUGIN LABEL CLICK WORKS CORRECTLY
  $(document).on('click', '.atr-radio label[for^="atr_"]', function(e){
    var checkBox = $('input[type="radio"][name="' + $(this).attr('for') + '"]');

    if(checkBox.length) {
      e.preventDefault();
      $(this).closest('ul.atr-ul-radio').find('input[type="radio"]:checked').not(this).prop('checked', false);
      checkBox.prop('checked', !checkBox.prop('checked'));
    }
  });


  // MORE FILTERS ON SEARCH PAGE
  $('body').on('click', '.show-hooks', function(e) {
    e.preventDefault();

    var textOpened = $(this).attr('data-opened');
    var textClosed = $(this).attr('data-closed');
 
    if($(this).hasClass('opened')) {
      $(this).removeClass('opened').find('span').text(textClosed);
      $(this).find('i').removeClass('fa-minus').addClass('fa-plus');
      $('input[name="showMore"]').val(0);
      $('.sidebar-hooks').css('margin-top', '0px').css('margin-bottom', '0px').css('opacity', 1).animate( { opacity: 0, marginTop:'40px', marginBottom:'-40px'}, 300, function() { $('.sidebar-hooks').hide(0); });


    } else {
      $(this).addClass('opened').find('span').text(textOpened);
      $(this).find('i').addClass('fa-minus').removeClass('fa-plus');
      $('input[name="showMore"]').val(1);
      $('.sidebar-hooks').show(0).css('margin-top', '40px').css('margin-bottom', '-40px').css('opacity', 0).animate( { opacity: 1, marginTop:'0px', marginBottom:'0px'}, 300);

    }

  });

  
  // SCROLL TO TOP
  $('body').on('click', '#scroll-to-top', function(e) {
    e.preventDefault();
    $('html, body').animate({scrollTop: 0}, 600);
  });



  // REFINE SEARCH - CLOSE BUTTON
  $('body').on('click', '.ff-close', function(e) {
    e.preventDefault();
    
    gamModalCloseParent();
    //parent.$.fancybox.close();
  });


  // REFINE SEARCH - MOBILE
  $('body').on('click', '.filter-button', function(e) {
    e.preventDefault();

    gamModal({
      width: 320,
      height: 640,
      content: '<div class="filter filter-fancy">' + $('.filter').html() + '</div>', 
      wrapClass: 'search-mobile-filter-box',
      closeBtn: true, 
      iframe: false, 
      fullscreen: true,
      transition: 200,
      delay: 0,
      lockScroll: true
    });
    
    /*
    if(jqueryVersion == '1') {
      if (!!$.prototype.fancybox) {
        $.fancybox.open({
          'padding':  0,
          'width':    320,
          'height':   640,
          'autoSize': false,
          'autoDimensions': false,
          'scrolling': 'yes',
          'closeBtn': true,
          'wrapCSS':  'search-mobile-filter-box',
          'content':  '<div class="filter filter-fancy"">' + $('.filter').html() + '</div>'
        });
      }
    } else { 
      if (!!$.prototype.fancybox) {
        $.fancybox.open({
          toolbar : true,
          type: 'inline',
          src: '<div class="filter filter-fancy">' + $('.filter').html() + '</div>',
          baseClass: 'search-mobile-filter-box',
          css: {
              width : '320px',
              height : '640px',
              padding: 0
            }
        });
      }
    }
    */
  });


  // MOBILE USER MENU
  $('body').on('click', '.user-button', function(e) {
    e.preventDefault();

    var elem = $(this);

    if(elem.hasClass('opened')) {
      //$('#user-menu').css('margin-top', '0px').css('margin-bottom', '0px').css('opacity', 1).animate( { opacity: 0, marginTop:'40px', marginBottom:'-40px'}, 300, function() { $('#user-menu').hide(0); });
      $('#user-menu').slideUp(200);
      elem.removeClass('opened');

    } else {
      //$('#user-menu').show(0).css('margin-top', '40px').css('margin-bottom', '-40px').css('opacity', 0).animate( { opacity: 1, marginTop:'0px', marginBottom:'0px'}, 300);
      $('#user-menu').slideDown(200);
      elem.addClass('opened');

    }    
  });


  // MOBILE USER MENU - CLICK OUTSIDE
  if (($(window).width() + scrollCompensate()) < 768) {
    $(document).mouseup(function (e){
      var container = $('.user-menu-wrap');
      var elem = container.find('.user-button');

      if (!container.is(e.target) && container.has(e.target).length === 0) {
        //$('#user-menu').css('margin-top', '0px').css('margin-bottom', '0px').css('opacity', 1).animate( { opacity: 0, marginTop:'40px', marginBottom:'-40px'}, 300, function() { $('#user-menu').hide(0); });
        $('#user-menu').slideUp(300);
        elem.removeClass('opened');
      }
    });
  }



  // MOBILE BLOCKS
  $('body').on('click', '.mobile-block a#m-options', function(e) {
    e.preventDefault();

    var elem = $(this);
    var elemId = elem.attr('id');
    var elemMenuId = elem.attr('data-menu-id');

    if(elem.hasClass('opened')) {
      var isOpened = true;
    } else {
      var isOpened = false;
    }

    if(isOpened) {
      $('#menu-cover').fadeOut(300);
      elem.removeClass('opened');
      $('.mobile-box' + elemMenuId).removeClass('opened').css('margin-left', '0px').css('margin-right', '0px').css('opacity', 1).animate( { opacity: 0, marginLeft:'80px', marginRight:'-80px'}, 300, function() { $('.mobile-box' + elemMenuId).hide(0); });

    } else {
      $('#menu-cover').fadeIn(300);
      elem.addClass('opened');
      $('.mobile-box' + elemMenuId).show(0).addClass('opened').css('margin-left', '80px').css('margin-right', '-80px').css('opacity', 0).animate( { opacity: 1, marginLeft:'0px', marginRight:'0px'}, 300);

      if($('#m-search').hasClass('opened')) {
        $('#m-search').click();
      }
    }    

  });


  // CLOSE MOBILE MENU
  $('body').on('click', '.mobile-box a.mclose, #menu-cover', function(e) {
    e.preventDefault();
    $('#menu-cover').fadeOut(300);
    $('.mobile-block a').removeClass('opened');
    $('.mobile-box.opened').removeClass('opened').css('margin-left', '0px').css('margin-right', '0px').css('opacity', 1).animate( { opacity: 0, marginLeft:'80px', marginRight:'-80px'}, 300, function() { $('.mobile-box').hide(0); });
  });





  // USER ACCOUNT - ALERTS SHOW HIDE
  $('body').on('click', '.alerts .alert .menu', function(e) {
    e.preventDefault();

    var elem = $(this).closest('.alert');
    var blocks = elem.find('.param, #alert-items');

    if(elem.hasClass('opened')) {
      blocks.css('opacity', 1).css('margin-top', '0px').css('margin-bottom', '0px').animate( { opacity: 0, marginTop:'40px', marginBottom:'-40px'}, 300, function() { blocks.hide(0); });
      elem.removeClass('opened');

    } else {
      blocks.show(0).css('opacity', 0).css('margin-top', '40px').css('margin-bottom', '-40px').animate( { opacity: 1, marginTop:'0px', marginBottom:'0px'}, 300);
      elem.addClass('opened');

    }

    return false;
  });


  // PROFILE PICTURE - OPEN BOX
  $(document).on('click', '.update-avatar', function(e){
    e.preventDefault();
    
    gamModal({
      width: 420,
      height: 450,
      content: $('#show-update-picture-content').html(), 
      wrapClass: 'fancy-form pict-func',
      closeBtn: true, 
      iframe: false, 
      fullscreen: 'mobile',
      transition: 200,
      delay: 0,
      lockScroll: true
    });
    
    /*
    if(jqueryVersion == '1') {
      if (!!$.prototype.fancybox) {
        $.fancybox.open({
          'padding':  0,
          'width':    420,
          'height':   450,
          'autoSize': false,
          'autoDimensions': false,
          'closeBtn' : true,
          'wrapCSS':  '',
          'content':  $('#show-update-picture-content').html()
        });
      }
    } else { 
      if (!!$.prototype.fancybox) {
        $.fancybox.open({
          toolbar : true,
          type: 'inline',
          src: '<div style="width:420px;height:450px;padding:0;"><div class="pict-func">' + $('#show-update-picture-content').html() + '</div></div>'
        });
      }
    }
    */
  });


  // USER ACCOUNT - MY PROFILE SHOW HIDE
  $('body').on('click', '.body-ua #main.profile h3', function(e) {
    if (($(window).width() + scrollCompensate()) < 1201) {
      e.preventDefault();
      $(this).siblings('form').slideToggle(200);
    }
  });


  // POST-EDIT - CHANGE LOCALE
  $('body').on('click', '.locale-links a', function(e) {
    e.preventDefault();

    var locale = $(this).attr('data-locale');
    var localeText = $(this).attr('data-name');
    $('.locale-links a').removeClass('active');
    $(this).addClass('active');

    if($('.tabbertab').length > 0) {
      $('.tabbertab').each(function() {
        if($(this).find('[id*="' + locale + '"]').length || $(this).find('h2').text() == localeText) {
          $(this).removeClass('tabbertabhide').show(0).css('opacity', 0).css('margin-top', '40px').css('margin-bottom', '-40px').animate( { opacity: 1, marginTop:'0px', marginBottom:'0px'}, 300);
        } else {
          $(this).addClass('tabbertabhide').hide(0);
        }
      });
    }

  });


  // PUBLISH PAGE - SWITCH PRICE
  $('body').on('click', '.price-wrap .selection a', function(e) {
    e.preventDefault();

    var price = $(this).attr('data-price');

    $('.price-wrap .selection a').removeClass('active');
    $(this).addClass('active');
    $('.price-wrap .enter').addClass('disable');
    $('.post-edit .price-wrap .enter #price').val(price).attr('placeholder', '');
  });

  $('body').on('click', '.price-wrap .enter .input-box', function(e) {
    $('.price-wrap .selection a').removeClass('active');
    $(this).parent().removeClass('disable');
    $('.post-edit .price-wrap .enter #price').val('').attr('placeholder', '');

  });


  // ITEM LIGHTBOX
  if(typeof $.fn.lightGallery !== 'undefined') { 
    $('.main-data > .img').lightGallery({
      mode: 'lg-slide',
      thumbnail:true,
      cssEasing : 'cubic-bezier(0.25, 0, 0.25, 1)',
      selector: 'li > a',
      getCaptionFromTitleOrAlt: false,
      download: false,
      thumbWidth: 90,
      thumbContHeight: 80,
      share: false
    }); 
  }


  // AJAX - SUBMIT ITEM FORM (COMMENT / SEND FRIEND / PUBLIC CONTACT / SELLER CONTACT)
  $('body').on('click', 'button.item-form-submit', function(e){
    if(ajaxForms == 1) {

      var button = $(this);
      var form = $(this).closest('form');
      var inputs = form.find('input, select, textarea');
      var formType = $(this).attr('data-type');

      // Validate form first
      inputs.each(function(){
        form.validate().element($(this));
      });


      if(form.valid()) {
        button.addClass('btn-loading').attr('disabled', true);

        $.ajax({
          url: form.attr('action'),
          type: "POST",
          data: form.find(":input").filter(function () { return $.trim(this.value).length > 0}).serialize(),
          success: function(response){
            button.removeClass('btn-loading').attr('disabled', false);

            var type = $(response).contents().find('.flashmessage');
            var message = $(response).contents().find('.flash-wrap').text().trim();

            message = message.substring(1, message.length);
            inputs.val("").removeClass('valid');

            if(form.find('#recaptcha').length) { 
              grecaptcha.reset(); 
            }

            if(type.hasClass('flashmessage-error')) {
              gamAddFlash(message, 'error', true); 
            } else {
              gamAddFlash(message, 'ok', true); 
            }

            gamModalCloseParent();
            //parent.$.fancybox.close();
          }
        });
      }
    }
  });



  // FANCYBOX - OPEN ITEM FORM (COMMENT / SEND FRIEND / PUBLIC CONTACT / SELLER CONTACT)
  $('body').on('click', '.open-form', function(e) {
    e.preventDefault();
    var height = 600;
    var url = $(this).attr('href');
    var formType = $(this).attr('data-type');

    if(formType == 'friend') {
      height = 610;
    }
    
    gamModal({
      width: 440,
      height: height,
      content: url, 
      wrapClass: 'fancy-form',
      closeBtn: true, 
      iframe: true, 
      fullscreen: 'mobile',
      transition: 200,
      delay: 0,
      lockScroll: true
    });

    /*
    if(jqueryVersion == '1') {
      if (!!$.prototype.fancybox) {
        $.fancybox({
          'padding': 0,
          'width': 440,
          'height': height,
          'scrolling': 'yes',
          'wrapCSS': 'fancy-form',
          'closeBtn': true,
          'type': 'iframe',
          'href': url
       });
      }    
    } else { 
      if (!!$.prototype.fancybox) {
        $.fancybox.open({
          toolbar : true,
          type: 'iframe',
          src: url,
          baseClass: 'fancy-form',
          iframe: {
            css : {
                width : '440px',
                padding: 0,
                height: height
              }
          }
        });
      }
    }
    */
    
  });

  // CONTACT FORM - ADD REQUIRED PROPERTY
  $('body#body-contact input[name="subject"], body#body-contact textarea[name="message"]').prop('required', true);


  // ATTACHMENT - FIX FILE NAME
  $('body').on('change', '.att-box input[type="file"]', function(e) {
    if( $(this)[0].files[0]['name'] != '' ) {
      $(this).closest('.att-box').find('.att-text').text($(this)[0].files[0]['name']);
    }
  });


  // HIDE FLASH MESSAGE MANUALLY
  $('body').on('click', '.flashmessage .ico-close', function(e) {
    e.preventDefault();

    var elem = $(this).closest('.flashmessage');

    elem.show(0).css('opacity', 1).css('margin-top', '0px').css('margin-bottom', '0px').animate( { opacity: 0, marginTop:'30px', marginBottom:'-30px'}, 300);

    window.setTimeout(function() {
      elem.remove();
    }, 300);

    return false;
  });


  // HIDE FLASH MESSAGES AUTOMATICALLY
  window.setTimeout(function(){ 
    $('.flash-wrap .flashmessage:not(.js)').css('opacity', 1).css('margin-top', '0px').css('margin-bottom', '0px').animate( { opacity: 0, marginTop:'30px', marginBottom:'-30px'}, 300);

    window.setTimeout(function() {
      $('.flash-wrap .flashmessage:not(.js)').remove();
    }, 300);
  }, 10000);


  // LOCATION PICKER - SHOW LIST OF LOCATIONS WHEN CLICK ON TERM
  $('body').on('click', '.loc-picker .term', function() {
    if(!$(this).hasClass('open')) {
      $(this).closest('.loc-picker').find('.shower').show(0).css('opacity', 0).css('margin-top', '30px').css('margin-bottom', '-30px').animate( { opacity: 1, marginTop:'0', marginBottom:'0'} , 300);
      $(this).closest('.loc-picker').find('.term').addClass('open');
    }
  });


  // LOCATION PICKER - WHEN CLICK OUTSIDE LOCATION PICKER, HIDE SELECTION
  $(document).mouseup(function (e){
    var container = $('.loc-picker');
    var form = container.closest('form');

    if (!container.is(e.target) && container.has(e.target).length === 0 && container.find('.term').hasClass('open')) {
      if (($(window).width() + scrollCompensate()) >= 768) {
        if(container.find('.term').val() == '' && container.find('.term').hasClass('open') && ( form.find('input[name="sCountry"]').val() != '' || form.find('input.sCountry').val() != '' || form.find('input[name="sRegion"]').val() != '' || form.find('input.sRegion').val() != '' || form.find('input[name="sCity"]').val() != '' || form.find('input.sCity').val() != '' )) {
          $('input[name="sCountry"], input.sCountry, input[name="sRegion"], input.sRegion, input[name="sCity"], input.sCity').val("");
          $('input[name="sCity"]').change();
        }
      } else {
        form.find('input[name="sCountry"], input.sCountry, input[name="sRegion"], input.sRegion, input[name="sCity"], input.sCity').val("");

      }

      container.find('.shower').fadeOut(0);
      container.find('.term').removeClass('open');
    }
  });


  // CATEGORY PICKER 
  $('body').on('click', '.cat-picker .term3', function() {
    if(!$(this).hasClass('open')) {
      $(this).closest('.cat-picker').find('.shower').show(0).css('opacity', 0).css('margin-top', '30px').css('margin-bottom', '-30px').animate( { opacity: 1, marginTop:'0', marginBottom:'0'} , 300);
      $(this).closest('.cat-picker').find('.term3').addClass('open');
    }
  });


  // CATEGORY PICKER - WHEN CLICK OUTSIDE CATEGORY PICKER, HIDE SELECTION
  $(document).mouseup(function (e){
    var container = $('.cat-picker');
    var form = container.closest('form');

    if (!container.is(e.target) && container.has(e.target).length === 0 && container.find('.term3').hasClass('open')) {
      container.find('.shower').fadeOut(0);
      container.find('.term3').removeClass('open');
    }
  });



  // LOCATION PICKER - SHOW LIST OF LOCATIONS WHEN CLICK ON TERM
  $('body').on('click', '.loc-picker .term2', function() {
    if(!$(this).hasClass('open')) {
      $(this).closest('.loc-picker').find('.shower').show(0).css('opacity', 0).css('margin-top', '30px').css('margin-bottom', '-30px').animate( { opacity: 1, marginTop:'0', marginBottom:'0'} , 300);
      $(this).closest('.loc-picker').find('.term2').addClass('open');
    } else {
      $(this).closest('.loc-picker').find('.term2').removeClass('open');
      $(this).closest('.loc-picker').find('.shower').hide(0);
    }
  });


  // LOCATION PICKER - WHEN CLICK OUTSIDE LOCATION PICKER, HIDE SELECTION
  $(document).mouseup(function (e){
    var container = $('.loc-picker');
    var form = container.closest('form');

    if (!container.is(e.target) && container.has(e.target).length === 0 && container.find('.term2').hasClass('open')) {
      if(container.find('.term2').val() == '' && container.find('.term2').hasClass('open') && ( form.find('input[name="sCountry"]').val() != '' || form.find('input.sCountry').val() != '' || form.find('input[name="sRegion"]').val() != '' || form.find('input.sRegion').val() != '' || form.find('input[name="sCity"]').val() != '' || form.find('input.sCity').val() != '' )) {
        $('input[name="sCountry"], input.sCountry, input[name="sRegion"], input.sRegion, input[name="sCity"], input.sCity').val("");
        $('input[name="sCity"]').change();
      }

      container.find('.shower').fadeOut(0);
      container.find('.term2').removeClass('open');
    }
  });




  // LOCATION PICKER - CLICK FUNCTIONALITY
  $('body').on('click', '.loc-picker .shower .option', function() {
    var container = $(this).closest('.loc-picker');

    if( !$(this).hasClass('empty-pick') && !$(this).hasClass('more-pick') && !$(this).hasClass('service') ) {

      container.find('.shower .option').removeClass('selected');
      $(this).addClass('selected');
      container.find('.shower').fadeOut(0);
      container.find('.term').removeClass('open');


      var term = $(this).find('strong').text();
      $('input.term').val( term );

      $('input[name="sCountry"], input.sCountry').val( $(this).attr('data-country') );
      $('input[name="sRegion"], input.sRegion').val( $(this).attr('data-region') );
      $('input[name="sCity"], input.sCity').val( $(this).attr('data-city') );

      if (($(window).width() + scrollCompensate()) >= 768) {
        $('input[name="sCity"]').change();
      }
    }
  });



  // SIMPLE SELECT - CLICK ELEMENT FUNCTIONALITY
  $('body').on('click', '.simple-select:not(.disabled) .option:not(.info):not(.nonclickable)', function() {
    $(this).parent().parent().find('input.input-hidden').val( $(this).attr('data-id') ).change();
    $(this).parent().parent().find('.text span').html( $(this).html() );
    $(this).parent().parent().find('.option').removeClass('selected');
    $(this).addClass('selected');
    $(this).parent().hide(0).removeClass('opened');

    $(this).closest('.simple-select').removeClass('opened');
  });


  // SIMPLE SELECT - OPEN MENU
  $('body').on('click', '.simple-select', function(e) {
    if(!$(this).hasClass('disabled') && !$(this).hasClass('opened') && !$(e.target).hasClass('option')) {
      $('.simple-select').not(this).removeClass('opened');

      $('.simple-select .list').hide(0);
      $(this).addClass('opened');
      $(this).find('.list').show(0).css('opacity', 0).css('margin-top', '30px').css('margin-bottom', '-30px').animate( { opacity: 1, marginTop:'0', marginBottom:'0'} , 300);
    }
  });


  // SIMPLE SELECT - HIDE WHEN CLICK OUTSIDE
  $(document).mouseup(function(e){
    var container = $('.simple-select');

    if (!container.is(e.target) && container.has(e.target).length === 0) {
      $('.simple-select').removeClass('opened');
      $('.simple-select .list').hide(0);
    }
  });


  // SIMPLE SELECT - NONCLICKABLE, ADD TITLE
  $('.simple-select .option.nonclickable').attr('title', gamTitleNc);


  
  // REGISTER FORM - SWAP FUNCTIONALITY
  $('body').on('click', '#i-forms .swap a', function(e){
    e.preventDefault();

    var boxType = $(this).attr('data-type');

    $('#i-forms .box').hide(0);
    $('#i-forms .box[data-type="' + boxType + '"]').show(0).css('opacity', 0).css('margin-top', '50px').css('margin-bottom', '-50px').animate( { opacity: 1, marginTop:'0', marginBottom:'0'} );

    $('html, body').animate({ scrollTop: 0}, 300);
  });


  // TABS SWITCH - HOME PAGE
  $('body').on('click', '.home-container.tabs a.tab', function(e){
    e.preventDefault();

    var tabId = $(this).attr('data-tab');

    $('.home-container.tabs a.tab').removeClass('active');
    $(this).addClass('active');

    $('.home-container .single-tab').hide(0);
    $('.home-container .single-tab[data-tab="' + tabId + '"]').show(0).css('opacity', 0).css('margin-top', '50px').css('margin-bottom', '-50px').animate( { opacity: 1, marginTop:'0', marginBottom:'0'} );


    // Trigger images to lazy load
    if(gamLazy == "1") {
      $(window).scrollTop($(window).scrollTop()+1);
      $(window).scrollTop($(window).scrollTop()-1);
    }

    // Resize when masonry
    if(gamMasonry == "1") {
      $grid.masonry();
    }
  });


  // LIST OR GRID VIEW
  $('body').on('click', '.list-grid a', function(e){
    e.preventDefault();

    if(!$(this).hasClass('active')) {
      var show = $(this).attr('data-view');

      $('.list-grid a').removeClass('active');
      $(this).addClass('active');

      $('#search-items .products:not(.premiums-block)').removeClass('list').removeClass('grid').addClass(show);
      $('input[name="sShowAs"]').val(show);

      if(gamMasonry == "1") {
        $('#search-items').addClass('no-transition');
        setTimeout(function() {
          $('#search-items').removeClass('no-transition')
        }, 500);
      }

      var href = $(this).attr('href');

      if(href != '') {
        var newUrl = href;
      } else {
        var newUrl = baseDir + 'index.php?' + $('form.search-side-form :input[value!=""], form.search-side-form select, form.search-side-form textarea').serialize();
      }

      window.history.pushState(null, null, newUrl);
    }

    if($('.paginate').length) {
      $('.paginate a, .user-type a, .sort-it a').each(function() {
        var url = $(this).attr('href');

        if(!url.indexOf("index.php") >= 0 && url.match(/\/$/)) {
          if(url.substr(-1) !== '/') {
            url = url + '/'; 
          }
        }

        if(url.indexOf("sShowAs") >= 0) {
          var newUrl = url.replace(/(sShowAs,).*?(\/)/,'$1' + show + '$2').replace(/(sShowAs,).*?(\/)/,'$1' + show + '$2');
        } else {
          if(url.indexOf("index.php") >= 0) {
            var newUrl = url + '&sShowAs=' + show;
          } else {
             var newUrl = url + '/sShowAs,' + show + '/';
          }
        }

        $(this).attr('href', newUrl);
      });
    }

    // MASONRY - CREATE GRID WHEN IMAGES HAS DIFFERENT SIZE (height)
    if(gamMasonry == "1") {
      var $grid = $('.products .prod-wrap, #search-items .products, .products .wrap').masonry({
        itemSelector: '.simple-prod'
      });

      $grid.imagesLoaded().progress(function(){
        $grid.masonry('layout');
      });
    }
  });



  // AJAX SEARCH
  $('body#body-search').on('change click', '.link-check-box a, .filter-remove a, form.search-side-form input:not(.term), body#body-search #sub-nav a, .search-top-cat a, form.search-side-form select, .sort-it a, .user-type a, .paginate a', function(event) {
    var ajaxStop = false;
    
    if(ajaxSearch == 1 && event.type != 'change') {
      //event.preventDefault();    // disabled as radios did not work on search page
    }


    // Disable on mobile devices when input selected from fancybox
    if($(event.target).closest('.search-mobile-filter-box').length) {
      if(!$(event.target).closest('#search-sort').length && !$(event.target).closest('.sub-line').length) {     // it may not be required
        var ajaxStop = true;
        //return false;
      }
    }

    var sidebarReload = true;

    if($(this).closest('.sidebar-hooks').length || $(event.target).attr('name') == 'locUpdate') {
      sidebarReload = false;
    }

    var sidebar = $('.filter form.search-side-form');
    var ajaxSearchUrl = '';

    if (event.type == 'click') {
      if(typeof $(this).attr('href') !== typeof undefined && $(this).attr('href') !== false) {
        ajaxSearchUrl = $(this).attr('href');
      }
    } else if (event.type == 'change') {
      //ajaxSearchUrl = baseDir + "index.php?" + sidebar.find(':input[value!=""]').serialize();   // does not work on jquery 3.x
      ajaxSearchUrl = baseDir + "index.php?" + sidebar.find(":input").filter(function () { return $.trim(this.value).length > 0}).serialize();
    }


    if(ajaxSearch == 1 && $('input[name="ajaxRun"]').val() != "1" && (ajaxSearchUrl != '#' && ajaxSearchUrl != '') && !ajaxStop) {
      if(ajaxSearchUrl == $(location).attr('href')) {
        return false;
      }

      sidebar.find('.init-search').addClass('btn-loading').addClass('disabled').attr('disabled', true);
      sidebar.find('input[name="ajaxRun"]').val("1");
      $('#search-items').addClass('loading');


      $.ajax({
        url: ajaxSearchUrl,
        type: "GET",
        success: function(response){
          var length = response.length;

          var data = $(response).contents().find('#main').html();
          var bread = $(response).contents().find('ul.breadcrumb');
          var filter = $(response).contents().find('.filter').html();
          var categ = $(response).contents().closest('.search-top-cat').html();

          sidebar.find('.init-search').removeClass('btn-loading').removeClass('disabled').attr('disabled', false);
          sidebar.find('input[name="ajaxRun"]').val("");

          $('#main').fadeOut(0, function(){ 
            $('#main').html(data).show(0);

            $('#search-items').hide(0);
            $('#search-items').removeClass('loading');
            $('#search-items').show(0).css('opacity', 0).css('margin-top', '50px').css('margin-bottom', '-50px').animate( { opacity: 1, marginTop:'0', marginBottom:'0'} , 300);

          });

          if(sidebarReload) {
            $('.filter').html(filter);
            $('.search-top-cat').html(categ);
          }
          
          $('ul.breadcrumb').html(bread);


          // LAZY LOADING OF IMAGES
          if(gamLazy == "1" && gamMasonry == "0" ) {
            $('#search-items img.lazy').Lazy({
              effect: "fadeIn",
              effectTime: 300,
              afterLoad: function(element) {
                setTimeout(function() {
                  element.css('transition', '0.2s');
                }, 300);
              }
            });
          }

          // reset scrolls
          homeCatScrolls();
          
          // Update URL
          window.history.pushState(null, null, ajaxSearchUrl);

          if (($(window).width() + scrollCompensate()) >= 768) {
            $('body,html').animate({ scrollTop: $('#main').offset().top-75 }, 800);
          } else {
            $('body,html').animate({ scrollTop: $('#main').offset().top-60 }, 800);
          }
        },

        error: function(response){
          sidebar.find('.init-search').removeClass('btn-loading').removeClass('disabled').attr('disabled', false);
          sidebar.find('input[name="ajaxRun"]').val("");

          response = response.responseText;

          var data = $(response).contents().find('#main').html();
          var bread = $(response).contents().find('ul.breadcrumb');
          var filter = $(response).contents().find('.filter').html();
          var categ = $(response).contents().closest('.search-top-cat').html();

          $('#main').fadeOut(0, function(){ 
            $('#main').html(data).show(0);

            $('#search-items').hide(0);
            $('#search-items').removeClass('loading');
            $('#search-items').show(0).css('opacity', 0).css('margin-top', '50px').css('margin-bottom', '-50px').animate( { opacity: 1, marginTop:'0', marginBottom:'0'} , 300);

          });

          if(sidebarReload) {
            $('.filter').html(filter);
            $('.search-top-cat').html(categ);
          }

          $('ul.breadcrumb').html(bread);


          // LAZY LOADING OF IMAGES
          if(gamLazy == "1" && gamMasonry == "0" ) {
            $('#search-items img.lazy').Lazy({
              effect: "fadeIn",
              effectTime: 300,
              afterLoad: function(element) {
                setTimeout(function() {
                  element.css('transition', '0.2s');
                }, 300);
              }
            });
          }

          // reset scrolls
          homeCatScrolls();
          
          // Update URL
          window.history.pushState(null, null, ajaxSearchUrl);

          if (($(window).width() + scrollCompensate()) >= 768) {
            $('body,html').animate({ scrollTop: $('#main').offset().top-75 }, 800);
          } else {
            $('body,html').animate({ scrollTop: $('#main').offset().top-60 }, 800);
          }
        }
      });

      return false;
    }
  });

});





// THEME FUNCTIONS
function gamAddFlash(text, type, parent = false) {
  var rand = Math.floor(Math.random() * 1000);
  var html = '<div id="flashmessage" class="flashmessage js flashmessage-' + type + ' rand-' + rand + '"><a class="btn ico btn-mini ico-close">x</a>' + text + '</div>';

  if(!parent) {
    $('.flash-box .flash-wrap').append(html);
  } else {
    $('.flash-box .flash-wrap', window.parent.document).append(html);
  }

}


// CALCULATE SCROLL WIDTH
function scrollCompensate() {
  var inner = document.createElement('p');
  inner.style.width = "100%";
  inner.style.height = "200px";

  var outer = document.createElement('div');
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild(inner);

  document.body.appendChild(outer);
  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;
  if (w1 == w2) w2 = outer.clientWidth;

  document.body.removeChild(outer);

  return (w1 - w2);
}



// Lazyload images
function gamLazyLoadImages(type = '') {
  // standard initialization
  if(type == '' || type == 'basic') {
    $('img.lazy').Lazy({
      appendScroll: window,
      scrollDirection: 'both',
      effect: 'fadeIn',
      effectTime: 300,
      afterLoad: function(element) {
        setTimeout(function() {
          element.css('transition', '0.2s');
        }, 300);
      }
    });
  }

  // initialization in nice-scroll slider
  if(type == '') {
    $('.products.related img.lazy, .products.premiums-block img.lazy').Lazy({
      appendScroll: '.nice-scroll',
      scrollDirection: 'both',
      effect: 'fadeIn',
      effectTime: 300,
      afterLoad: function(element) {
        setTimeout(function() {
          element.css('transition', '0.2s');
        }, 300);
      }
    });
  }
}


// SHOW/HIDE SCROLL BUTTONS
function homeCatScrolls() {
  var maxScroll = ($('#home-cat2 .line').width() - $('#home-cat2 .wrap').scrollLeft()) - $('#home-cat2 .wrap').width();

  if ($('#home-cat2 .wrap').scrollLeft() < 10) {
    $('#home-cat2 .scroll-left').fadeOut(100);
  } else {
    $('#home-cat2 .scroll-left').fadeIn(100);
  }
  if (maxScroll < 10) {
    $('#home-cat2 .scroll-right').fadeOut(100);
  } else {
    $('#home-cat2 .scroll-right').fadeIn(100);
  }
}



// CUSTOM MODAL BOX
function gamModal(opt) {
  width = (typeof opt.width !== 'undefined' ? opt.width : 480);
  height = (typeof opt.height !== 'undefined' ? opt.height : 480);
  content = (typeof opt.content !== 'undefined' ? opt.content : '');
  wrapClass = (typeof opt.wrapClass !== 'undefined' ? ' ' + opt.wrapClass : '');
  closeBtn = (typeof opt.closeBtn !== 'undefined' ? opt.closeBtn : true);
  iframe = (typeof opt.iframe !== 'undefined' ? opt.iframe : true); 
  fullscreen = (typeof opt.fullscreen !== 'undefined' ? opt.fullscreen : false); 
  transition = (typeof opt.transition !== 'undefined' ? opt.transition : 200); 
  delay = (typeof opt.delay !== 'undefined' ? opt.delay : 0);
  lockScroll = (typeof opt.lockScroll !== 'undefined' ? opt.lockScroll : true); 

  var id = Math.floor(Math.random() * 100) + 10;
  width = adjustModalSize(width, 'width') + 'px';
  height = adjustModalSize(height, 'height') + 'px';

  var fullscreenClass = '';
  if(fullscreen === 'mobile') {
    if (($(window).width() + scrollCompensate()) < 768) {
      width = 'auto'; height = 'auto'; fullscreenClass = ' modal-fullscreen';
    }
  } else if (fullscreen === true) {
    width = 'auto'; height = 'auto'; fullscreenClass = ' modal-fullscreen';
  }

  var html = '';
  html += '<div class="modal-cover" data-modal-id="' + id + '" onclick="gamModalClose(\'' + id + '\');"></div>';
  html += '<div id="gamModal" class="modal-box' + wrapClass + fullscreenClass + '" style="width:' + width + ';height:' + height + ';" data-modal-id="' + id + '">';
  html += '<div class="modal-inside">';
  
  if(closeBtn) {
    html += '<div class="modal-close" onclick="gamModalClose(\'' + id + '\');"><i class="fas fa-times"></i></div>';
  }
    
  html += '<div class="modal-body ' + (iframe === true ? 'modal-is-iframe' : 'modal-is-inline') + '">';
  
  if(iframe === true) {
    html += '<div class="modal-content"><iframe class="modal-iframe" data-modal-id="' + id + '" src="' + content + '"/></div>';
  } else {
    html += '<div class="modal-content">' + content + '</div>';
  }
  
  html += '</div>';
  html += '</div>';
  html += '</div>';
  
  if(lockScroll) {
    $('body').css('overflow', 'hidden');
  }
  
  $('body').append(html);
  $('div[data-modal-id="' + id + '"].modal-cover').fadeIn(transition);
  $('div[data-modal-id="' + id + '"].modal-box').delay(delay).fadeIn(transition);
}


// Close modal by clicking on close button
function gamModalClose(id = '', elem = null) {
  if(id == '') {
    id = $(elem).closest('.modal-box').attr('data-modal-id');
  }
  
  $('body').css('overflow', 'initial');
  $('div[data-modal-id="' + id + '"]').fadeOut(200, function(e) {
    $(this).remove(); 
  });
  
  return false;
}


// Close modal by some action inside iframe
function gamModalCloseParent() {
  var boxId = $(window.frameElement, window.parent.document).attr('data-modal-id');
  window.parent.gamModalClose(boxId);
}


// Calculate maximum width/height of modal in case original width/height is larger than window width/height
function adjustModalSize(size, type = 'width') {
  var size = parseInt(size);
  var windowSize = (type == 'width' ? $(window).width() : $(window).height());
  
  if(size <= 0) {
    size = (type == 'width' ? 640 : 480);  
  }
  
  if(size*0.9 > windowSize) {
    size = windowSize*0.9;
  }
  
  return Math.floor(size);
}
