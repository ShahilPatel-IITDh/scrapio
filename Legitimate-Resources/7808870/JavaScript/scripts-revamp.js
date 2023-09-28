window.onbeforeunload = function () {
  window.scrollTo(0,0);
};

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      appendxmls(this);
    }
  };
  xhttp.open("GET", "https://www.dbs.com.sg/iw/SearchBloxEntitySearch.jsp?q=pay&segment=personal&cat=&start=0", true);
  xhttp.send();
}
function appendxmls(xml) {
  var i;
  var xmlDoc = xml.responseXML;
  var table="<tr><th>Artist</th><th>Title</th></tr>";
  var x = xmlDoc.getElementsByTagName("CD");
  for (i = 0; i <x.length; i++) { 
    table += "<tr><td>" +
    x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
    "</td></tr>";
  }
  document.getElementById("demo").innerHTML = table;
}


var lastKnownPos = $(window).scrollTop();
var isImportantClosed = false;
var originalAdvisoryHeight;
var isbackClosed = false;
/* 
    ?? Note: Since header.html is being called via jQuery's .load() method 
    All scripts related to header.html's DOM should be included in the
    following headerScripts() function.
    */
    var headerScripts = function () {
      // $('.section.back .d-ui.dropdown>.dropdown-menu').hide();
      $('#dropdownMenuDesktop').mouseenter(function (e) {


        $('.section.back .d-ui.dropdown>.dropdown-menu').fadeIn();
        $('.dropdown').mouseleave(function (e) {

          $('.section.back .d-ui.dropdown>.dropdown-menu').fadeOut();
        });
      });
      


      $('.chatbot-trigger').on('click', function () {
        setTimeout(function () {
          $('.chatbot-launcher').trigger('click');
          if( $('.chatbot-launcher').hasClass('chatbot-launcher--show') ) {
            $('body').removeClass('chatmobileStopScroll');
          }
        }, 300);
      });

    // help topic article listing page.
    $('#collapse--helpTopic ul li a').on('click', function () {
      location.href = $(this).attr('href');
      location.reload();

    });

    var top_search = ["Branch Code", "Overseas transfer", "Paynow", "Waive fee", "Repricing", "PayLah"];
    autocomplete(document.getElementById("top-search-input"), ".search-menu-content" , top_search );
    SearchRedirect('#top-search');
// for mobile.
autocomplete(document.getElementById("searchCollapse__mobile--form-input"), ".searchCollapse__mobile" , top_search);
SearchRedirect('#searchCollapse__mobile--form');




window.onscroll = function () {
  sticky_menu();

  if ($(window).width() <= 575) {
    height_mb_menu();
    if ($('#leftNav').length > 0) {
      $('.sticky_leftside').css('top', $('header').height());
      $('.sticky .sticky_leftside').css('top', $('header .menu').height());
    }
  }
  else {
    $('.list-menu-parent').css("height", "auto");
  }


};
var header_height = $('header').height();
$('#main-content').css("margin-top", header_height);
$('.advisory-close').on('click', function () {
  isImportantClosed = true;
  if ($('#leftNav').length > 0) {
    // $('.sticky_leftside').css('top', $('header .menu').height());
    $('.sticky_leftside').css('top', '95px');

  }

    // case of sticky menu
    if (isbackClosed == true) {
      // $('#main-content').css('margin-top', $('header .menu').height());
      console.log( $('header .menu').height() +  $('header .back').height());
      $('#main-content').css('margin-top', '120px');
    }
    else {
     
      if($(window).width() > 575) {
        $('#main-content').css('margin-top', $('header .menu').height() + $('header .back').height());
      }
      else {
        $('#main-content').css('margin-top', $('header .menu').height());
        $('.sticky_leftside').css('top', $('header .menu').height());
      }
      
    }

  });



/* header scoped function */
var setNavCollapseState = function (state) {
  if ($(window).width() <= 575) {
    $('[data-target="#collapse--helpTopic"]').removeAttr('data-toggle');
    $('#collapse--helpTopic').removeClass('collapse');
  } else {
    $('[data-target="#collapse--helpTopic"]').attr('data-toggle', 'collapse');
    $('#collapse--helpTopic').addClass('collapse');
  }
        // console.log('#collapse--helpTopic state: ' + state);
      }
      /* Destroy collapse */
      $(function () {
        setNavCollapseState();
        $(window).resize(function () {
          setNavCollapseState();
        });
        originalAdvisoryHeight = $('.section.advisory').innerHeight();
      });


      /* Desktop search nav  */
      $('#nav-collapse-menu').on('show.bs.collapse', function () {
        $('.collapse-backdrop').remove();
        $('body').append('<div class="collapse-backdrop in"></div>');
        var mobileMenu = $('.navigation-proper');
        var mobileDropdown = $('.navigation-proper .list-menu-parent .parent-menu');

        var lessBack = $('.section.back').innerHeight(),
        lessAdvisory = ($('.section.advisory').is(':visible') ? $('.section.advisory').innerHeight() : 0),
        lessMenu = $('.navigation-proper').innerHeight(),
            lessCollapse = 160,//$('.searchCollapse--form').innerHeight()
            lessTotal = lessAdvisory + lessBack + lessMenu + lessCollapse;
            // console.log(lessAdvisory, lessBack, lessMenu, lessCollapse);

            $('.searchCollapse--nav').addClass('active');
            $('.searchCollapse--trigger span').removeClass('ico-search').addClass('ico-cancel1');
            setTimeout(function () {
              $('.m-searchbox').focus();
            // $('.collapse-backdrop').addClass('in').css({
            //     top: lessTotal + 'px',
            //     height: $('body').innerHeight() - lessTotal + 'px'
            // });
            $('.collapse-backdrop').addClass('in').css({
              top: 0 + 'px',
              height: $('body').innerHeight() - 0 + 'px'
            });
           
          }, 200);
          }).on('hide.bs.collapse', function () {
            $('.collapse-backdrop').remove();
            $('.searchCollapse--nav').removeClass('active');
            $('.searchCollapse--trigger span').removeClass('ico-cancel1').addClass('ico-search');
            $('.m-searchbox').blur();
          });


          /* Mobile dropdown search form events */
          $('#nav-collapse-menu--mobile').on('hide.bs.collapse', function (e) {
        // lastKnownPos = $(window).scrollTop();
       
        // $("html, body").animate({ "scrollTop":lastKnownPos }, 1000);
        $('body').removeClass('fixed-body');
        $('.navigation-proper').toggleClass('active--mobile--form');
        if (!isImportantClosed) {
          $(".section.advisory").slideDown('100');
        }
       
      }).on('shown.bs.collapse', function (e) {

        // lastKnownPos = $(window).scrollTop();
   
        $('.navigation-proper').toggleClass('active--mobile--form');
        $(".section.advisory").slideUp('100');


        // $("html, body").animate({ scrollTop: 0 }, 200);
        setTimeout(function () {
          $('#search-input-navbar').focus();
            // $("html, body").animate({ scrollTop: 0 }, 200);
          }, 200);
      }).on('show.bs.collapse', function (e) {
        
        $(".list-menu-parent").slideUp('100');
        $("#hamburger-menu").removeClass('open');
      }).on('shown.bs.collapse', function (e) {
        setTimeout(function () {
          $('body').addClass('fixed-body');
        }, 200);
      });

      $('.searchCollapse__mobile--form').on('click', function (e) {
        // console.log(e); 
      });

      $('#search-close-mobile').on('click', function () {
        $('#searchCollapse__mobile--form-input').val('');
      });
    }


/* 
    ---------------  Slider Functions  ---------------  
    */

/* ?? Since userGuide and featured share the same settings,
    We'll use a global object to setup the options for the sliders.
    Replace the object if they need different settings each.
    */

    var slickSlider = function (target, action, options) {
    /* 
        ? target (is any selectable element)
        ? method (refer to slick JS documentation)
        ? options (pass a custom object or use the 
            globalSliderOptions variable)
            */

    // var OPTIONS = (options == 0 || options == '' || options == undefined ? globalSliderOptions : options);

    // console.log(OPTIONS);
    
    switch (action) {

      case 'create':
      // console.log('? Created: ' + target + ' slider');
      var createGlider = new Glider(document.querySelector(target), options);
      break;
      case 'refresh':

      break;
      default:
      break;


    }
  }
/* 
    ---------------------------------------------  Search Redirect
    */

    var SearchRedirect = function (formid) {
      sitedomain = "https://www.dbs.com.sg/personal/support/";
      destinationURL = sitedomain + "searchresult.html";

      formID = $(formid);

      desktopPID = $('[name="pid"]', formID).attr('data-desktop-pid');
      mobilePID = $('[name="pid"]', formID).attr('data-mobile-pid');
      init: {
        var $this = this;

        var currentPID = ($(window).width() < 768 ? $this.mobilePID : $this.desktopPID);

        $('[name="pid"]', $this.formID).val(currentPID);

        $this.formID.on('submit', function (e) {

          var encoded_parem = encodeURI(decodeURI($(formid+'-input').val()));

          var currentPID = ($(window).width() < 768 ? $this.mobilePID : $this.desktopPID);
          var actionURL = $this.destinationURL;
          $('[name="pid"]', $this.formID).val(currentPID);
            
                 
          var actionURL = actionURL + '?query='+encoded_parem+'&pid='+currentPID;
          location.href = actionURL;
          return false;
        });

        $(window).on('load resize', function () {
          if ($(window).width() < 768) {
            $('body').removeClass('search-desktop search-mobile');
            $('body').addClass('search-mobile');
          } else {
            $('body').removeClass('search-desktop search-mobile');
            $('body').addClass('search-desktop');
          }
        });
      }

    }
    function autocomplete(inp, container , arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {

    var a, b, i, val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();

    if (!val) { 
      $(container).removeClass('open');
      return false;
    }

    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items search-list");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        b.setAttribute("class", "search-item");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function(e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;

              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
            });
        a.appendChild(b);
        $(container).addClass('open');
      }

    }

  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        if (x) x[currentFocus].click();
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        // e.preventDefault(); conflict with search action
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();

          
        }
      }
    });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);

    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }

  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
    $('.banner-input-container').removeClass('open');
  });

}
$(document).on("click", ".search-item", function () {
  var form_id = $(this).parent().attr('id');
  form_id = form_id.split('-inputautocomplete-list')[0];
    // console.log(form_id);
    $('#'+form_id).submit();
  });
$(function () {


 if ($('#banner-search-input').length > 0 ) {
   var recent_search = ["Branch Code", "Overseas transfer", "Paynow", "Waive fee", "Repricing", "PayLah"];
   autocomplete(document.getElementById("banner-search-input"), ".banner-input-container" , recent_search);
   SearchRedirect('#banner-search');
 }

 if ($('.featured-slider .glider-proper').length > 0) {
  slickSlider('.featured-slider .glider-proper', 'create', {
    slidesToShow: 1.5,
    slidesToScroll: 'auto',
    draggable: true,

    dots: '.featured-slider .dots',
    itemWidth: 220,
    arrows: true,
    arrows: {
      prev: '.featured-slider .glider-prev',
      next: '.featured-slider .glider-next',
    },
    responsive: [

    {
            // greater than 1200
            breakpoint: 1200,
            settings: {

              slidesToShow: 4,
              slidesToScroll: 4,
              itemWidth: 300,
            }
          },
          
          {
            // greater than 981
            breakpoint: 981,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              itemWidth: 300,
            }
          },
          
          {
            // greater than 767
            breakpoint: 767,
            settings: {
              slidesToShow: 2.5,
              slidesToScroll: 2,
              itemWidth: 300,
            }
          },
          {
            // greater than 575
            breakpoint: 575,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              itemWidth: 300,
            }
          }
          
          ]
        });
}

if ($('.user-guide-slider .glider-proper').length > 0) {
  slickSlider('.user-guide-slider .glider-proper', 'create', {
    slidesToShow: 1.5,
    slidesToScroll: 'auto',
    draggable: true,
    dots: '.user-guide-slider .dots',
    itemWidth: 220,
    arrows: true,
    arrows: {
      prev: '.user-guide-slider .glider-prev',
      next: '.user-guide-slider .glider-next',
    },
    responsive: [

    {
            // greater than 1200
            breakpoint: 1200,
            settings: {

              slidesToShow: 4,
              slidesToScroll: 4,
              itemWidth: 300,
            }
          },
          
          {
            // greater than 981
            breakpoint: 981,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              itemWidth: 300,
            }
          },
          
          {
            // greater than 767
            breakpoint: 767,
            settings: {
              slidesToShow: 2.5,
              slidesToScroll: 2,
              itemWidth: 300,
            }
          },
          {
            // greater than 575
            breakpoint: 575,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              itemWidth: 300,
            }
          }
          
          ]
        });
}

      // article detail card carousel section
      if ($('.card-carousel-1 .glider-proper').length > 0) {
        slickSlider('.card-carousel-1 .glider-proper', 'create', {
          slidesToShow: 1.5,
          slidesToScroll: 'auto',
          draggable: true,
          // dots: '.card-carousel .dots',
          itemWidth: 220,
          arrows: true,
          arrows: {
            prev: '.card-carousel-1 .glider-prev',
            next: '.card-carousel-1 .glider-next',
          },
          responsive: [
          {
            // greater than 1300
            breakpoint: 1300,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              itemWidth: 300,
            }
          },
          {
            // greater than 1024
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              itemWidth: 300,
            }
          },
          {
            // greater than 575
            breakpoint: 575,
            settings: {
              slidesToShow: '2',
              slidesToScroll: '2',
              itemWidth: 300,
            }
          }
          
          ]
        });
      }


      if ($('.card-carousel-2 .glider-proper').length > 0) {
        slickSlider('.card-carousel-2 .glider-proper', 'create', {
          slidesToShow: 1.5,
          slidesToScroll: 'auto',
          draggable: true,
          // dots: '.card-carousel .dots',
          itemWidth: 220,
          arrows: true,
          arrows: {
            prev: '.card-carousel-2 .glider-prev',
            next: '.card-carousel-2 .glider-next',
          },
          responsive: [
          {
            // greater than 1300
            breakpoint: 1300,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              itemWidth: 300,
            }
          },
          {
            // greater than 1024
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              itemWidth: 300,
            }
          },
          {
            // greater than 575
            breakpoint: 575,
            settings: {
              slidesToShow: '2',
              slidesToScroll: '2',
              itemWidth: 300,
            }
          }
          
          ]
        });
      }




    });










/*********** time period text greeting ***********/
function dateTime() {
  var format = "";
  var ndate = new Date();
  var hr = ndate.getHours();
  var h = hr % 12;

  if (hr < 12) {
    greet = 'Good Morning';
    format = 'AM';
  } else if (hr >= 12 && hr <= 17) {
    greet = 'Good Afternoon';
    format = 'PM';
  } else if (hr >= 17 && hr <= 24)
  greet = 'Good Evening';

  var m = ndate.getMinutes().toString();
  var s = ndate.getSeconds().toString();

  if (h < 12) {
    h = "0" + h;
    $(".day-period").text(greet);
  } else if (h < 18) {
    $(".day-period").text(greet);
  } else {
    $(".day-period").text(greet);
  }

  if (s < 10) {
    s = "0" + s;
  }

  if (m < 10) {
    m = "0" + m;
  }

  $('.date').html(h + ":" + m + ":" + s + format);
}
/*********** time period text greeting ***********/

/*********** logo change on viewport size ***********/
function logoChange() {
  var screen = $(window)
  if (screen.width() <= 575) {

       
        $(".dbs-logo a").children("img").attr("src", $(".dbs-logo a").children("img").data("img-mobile"));
      }
      else {
        $(".dbs-logo a").children("img").attr("src", $(".dbs-logo a").children("img").data("img-desktop"));
      }
    }
    /*********** logo change on viewport size ***********/

    /*********** equal height ***********/
    function equalHeight(parent, column) {
      var maxHeight = 0;

      $(parent).each(function () {
        // console.log(column + ' ' + $(this).height());
        if ($(this).find(column).height() > maxHeight) { maxHeight = $(this).find(column).height(); }
      });

    //$(column).height(maxHeight);
  }
  /*********** equal height ***********/

  $(function () {
    //  tooltip should only show at desktop
    if ($(window).width() > 767) {
      $('[data-toggle="popover"]').popover();
    }

  });



  $(document).ready(function () {

    /* Changed interval from 1000 to 60000 (1 min) to reduce performance issues */
    dateTime();
    var setGreeting = setInterval(dateTime, 60000);
    logoChange();
    //equalHeight(".featured-title");
    //equalHeight(".featured-description");
    //equalHeight(".useful-guide-title");
    //equalHeight(".useful-guide-details", ".useful-guide-description");

    setTimeout(function () {
      $(".section.cookie-policy").fadeIn();
    }, 1000);

    /*********** advisory close ***********/
    $(document).on("click", ".advisory-close", function () {
      $(".section.advisory").slideUp();


      // setTimeout(function () {
      //   calculateMobileMenuDropdown($(".advisory-close"));
      // }, 500);
      // if ($(window).width() < 576) {
      //   var header_height = $('header .menu').height();
      //   $('#main-content').css("margin-top", header_height);
      // }

      
    });
    /*********** advisory close ***********/

    /*********** advisory close ***********/
    $(document).on("click", ".btn-close-cookie", function () {
      $(".cookie-policy").fadeOut();
    });
    /*********** advisory close ***********/
    




    /*********** mobile menu trigger ***********/
    $(document).on("click", "#hamburger-menu", function () {
       
        $(this).toggleClass("open");


        // if ($(this).hasClass('open')) {
        //     lastKnownPos = $(window).scrollTop();
        // }
        // $("html, body").animate({ "scrollTop": lastKnownPos }, 1000);
        height_mb_menu();





        $(".list-menu-parent").slideToggle();

        if ($(this).hasClass("open")) {
            // $("html, body").animate({ scrollTop: 0 }, 200);
            $(".section.advisory").slideUp('100', function () {
                // $("html, body").animate({ scrollTop: 0 }, 200, function () {
                  $('body').addClass('fixed-body');
                // });
              });
          } else {
            $('body').removeClass('fixed-body');
            if (!isImportantClosed) {
              $(".section.advisory").slideDown('100');
            }

          }
        });
    /*********** mobile menu trigger ***********/

  });





  $(window).on('resize orientationchange', function () {
    if ($('.featured-tile').length > 0) {
     $('.featured-tile').jQueryEqualHeight('.featured-title');
     $('.featured-tile').jQueryEqualHeight('.featured-description');
      // $('.useful-guide-tile').jQueryEqualHeight('.useful-guide-title');
      $('.useful-guide-tile').jQueryEqualHeight('.useful-guide-description');
    }


    /* Refresh slickSlider */
    // slickSlider('.featured-slider .glider-proper', 'refresh');
    // slickSlider('.user-guide-slider', 'refresh');
    sticky_menu();
    if ($(window).width() <= 575) {
      height_mb_menu();
    }
    else {
      $('.list-menu-parent').css("height", "auto");
    }

  });







  $(document).mouseup(function (e) {
    var container = $(".searchCollapse");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0 && !$('.searchCollapse--nav').is(e.target)) {
      container.collapse('hide');
    }
  });

  // $('#banner-input').on('focus', function () {

  // });

  $('.search-list li').on('click', function () {
    $(".banner-input-container").toggleClass('open');
  });

  $(document).mouseup(function (e) {
    var container = $(".banner-input-container");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.removeClass('open');
    }
  });


  $('.advisory-close').on('click', function () {
    lessBack = 0;

  });

  $('#hamburger-menu').on('click', function () {
    calculateMobileMenuDropdown($('#hamburger-menu'));
  });



  var calculateMobileMenuDropdown = function (target) {
    // console.log(target.hasClass('advisory-close'));

    var mobileMenu = $('.navigation-proper');
    var mobileDropdown = $('.navigation-proper .list-menu-parent .parent-menu');

    var lessBack = $('.section.back').innerHeight(),
    lessAdvisory = originalAdvisoryHeight,
    lessMenu = $('.navigation-proper').innerHeight(),
    lessTotal = lessAdvisory + lessMenu;

    // console.log('calculateMobileMenu: ' + lessTotal);

    if ($(window).width() < 768) {
      mobileDropdown.css({
        minHeight: 'calc(100vh - ' + (!isImportantClosed ? lessTotal + 'px' : '165px') + ')'
      });
      if (target.hasClass('advisory-close')) {
        $('.mobile-backDBS').css('bottom', '0px');
      }
    }
  }

  $(window).on('resize', function () {
    var mobileDropdown = $('.navigation-proper .list-menu-parent .parent-menu');
    // if ($(window).width() >= 768) {
    //   $('.list-menu-parent').show();
    //   mobileDropdown.css({
    //     minHeight: '84px'
    //   });

    // }

    logoChange();
    /* Collapse all search collapse dropdowns */
    $('.searchCollapse').collapse('hide');
  });


  /* Youtube video */
  $('.videoOverlay--modal').on('hide.bs.modal', function () {

    $("#" + $(this).attr('id') + " iframe").remove();
  }).on('show.bs.modal', function () {
    var ytHeight = ($(window).width() <= 575 ? 400 : (550 + (550 * 0.25)));
    var yt = $(this).data('youtube-url');
    $("#" + $(this).attr('id') + " .modal-content").append('<iframe width="100%" mute="1" height="' + ytHeight + '" src="' + yt + '?autoplay=1&mute=1" frameborder="0" allowfullscreen></iframe>');
  });



// Add the sticky class to the navbar when you reach its scroll position. Remove ?sticky? when you leave the scroll position
function sticky_menu() {
  sticky_leftside();
  // Get the offset position of the navbar
  if ($('#navbar').length > 0) {
    var navbar = document.getElementById("navbar");
    var sticky_menu = navbar.offsetTop;
    
    if (window.pageYOffset > sticky_menu) {
      $('body').addClass('sticky');
      if ($(window).width() > 575) {
        $(".dbs-logo a").children("img").attr("src", $(".dbs-logo a").children("img").data("img-mobile"));
      }
      if (!isImportantClosed) {
        var advisory_sticky = '-' + $('.advisory').height() + 'px';
        $('header .advisory').css('margin-top', advisory_sticky ); // as per wailing request!
        $('header .back').css('margin-top', '0');
        isbackClosed = true;
      }
    }
    else {
       $('body').removeClass('sticky');
      if ($(window).width() > 575) {
        $(".dbs-logo a").children("img").attr("src", $(".dbs-logo a").children("img").data("img-desktop"));
      }
      if (!isImportantClosed) {
        $('header .advisory').css('margin-top', '0' ); // as per wailing request!
        $('header .back').css('margin-top', '0');
        isbackClosed = false;
      }
    }
  }
}
function height_mb_menu() {
      var availHeight = window.screen.availHeight;
      if (innerHeight != availHeight) {
    // target only for if the phone have mobile dock!
    var menu_parent_height = availHeight - (availHeight - innerHeight) - $('.section.menu').height();
    $('.list-menu-parent').css("height", menu_parent_height + 'px');
  }
 
}
function sticky_leftside() {
  // Get the offset position of the navbar
  if ($('#leftNav').length > 0) {
    var leftNav = document.getElementById("leftNav");
   
    var sticky_leftside = leftNav.offsetTop;
    if (window.pageYOffset >= sticky_leftside) {
     
        $('#leftNav').addClass('sticky_leftside');
        // $('.sticky_leftside').css('top', $('header').height());
     
    }
  }

}

$(function () {
			//tracking accordions on AA
	  $('.card h5').on("click",function(event){
				digitalData['button'] = {
					'name': "accordian:"+$(this).text()
				};
				setTimeout(function () {_satellite.track('pweb-generic button'); }, 500);
				"console" in window && console.log("DTM console log :::: Button Click ::: " +digitalData.button.name)
			});           
          //feedback form
      if ($('.support-form-fields').length > 0 ) {
        $('.support-form-fields').hide();
        $('.feedback-msg').hide();
        $('#comments').attr('rows', 3);
        $('#comments').attr('placeholder', 'Tell us your thoughts.');

        $('.feedback-yes').click(function(){
          $('.survey-wrapper').hide();
            $('.survey-wrapper').parents('section').addClass('p-0'); // new line
            // $('#feedback-btn').prop('disabled', true); // new line

            $('.support-form-fields').show().addClass('animatedChat fadeIn');
            $('#find-yes').attr('checked',true);
            $('#ans-yes').attr('checked',true);
            $('.hrRadioBttns').hide();
            // $('.support-feedback-comments label').text('How can we improve this page further for you?');
            $('.support-form-fields h2').text("That's great to hear. Anything you'd like to add?");
            
            // $('.support-form-fields h2').text('Thanks for your feedback!');

			// trigger AA tracking
			digitalData['button'] = {
				'name': "feedback-yes"
			};
			setTimeout(function() {
				_satellite.track('pweb-generic button');
			}, 500);
			"console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name)
      
          });
        $('.feedback-no').click(function(){

          $('.survey-wrapper').hide();
            $('.survey-wrapper').parents('section').addClass('p-0'); // new line
            $('#feedback-btn').prop('disabled', true); // new line
            $('.support-form-fields').show().addClass('animatedChat fadeIn');
            $('#find-no').attr('checked',true);
            $('#ans-no').attr('checked',true);
            $('.hrRadioBttns').hide();
            $('.support-form-fields h2').text("We're sorry to hear that. How can we do better?");
            // $('.support-feedback-comments label').text('How can we do better?');

			// trigger AA tracking
			digitalData['button'] = {
				'name': "feedback-no"
			};
			setTimeout(function() {
				_satellite.track('pweb-generic button');
			}, 500);
			"console" in window && console.log("DTM console log :::: Button Click ::: " + digitalData.button.name)
          
          });
        
        $('#feedback-btn').click(function(){
          $('.feedback-msg').show().addClass('animatedChat fadeIn');
          $('.support-form-fields').hide();
          $('.survey').hide();
            // return false; // comment out due to dbs server!
          });

        $('#comments').on('keyup blur', function(){
          if($(this).val() != '') {
            $('#feedback-btn').prop('disabled', false);
          }
          else {
            $('#feedback-btn').prop('disabled', true);
          } 
        });
      }
 });