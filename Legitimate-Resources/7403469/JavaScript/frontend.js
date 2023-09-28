/**
 * Control main function
 * 
 */



var mouse_is_inside = false;

$(document).ready(function() {


  var $customPointSubmit = $('#custom-point-form').find('input[type=submit]');
  $customPointSubmit.click(function(e) {
    e.preventDefault();
    $form = $(this).closest('form');
    $.post('/profile/custom-point-form/',  $form.serializeArray(), function(data) {
      $(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
    });

  });
  
  

  if ($('.league-table.scroll-to').length > 0) {
    $('html,body').delay(500).animate({
      scrollTop: $("tr.active").offset().top - 300},
      'slow');
  }


$('body')
    .delay(50)
    .queue( 
      function(next){ 
        $(this).css('padding-right', '1px'); 
      }
    );

  
  /*
    Sidebar toggler
  */
  function toggleSidebar() {
    if($(this).width() < 1520) {
       $('.sidebar').addClass('hidden');
    }else{
       $('.sidebar').removeClass('hidden');
    }
  }
  
  
  $( window ).resize(function() {
    var leftPadding = ($(document).width() - 940) / 2;
    $('.right-add-homepage').css('left', leftPadding + 938);
    $('.left-add-homepage').css('left', leftPadding - 167);
  });
  
  
  $(window).bind("resize",function() {
    toggleSidebar();
  });

  toggleSidebar();

  $(document).on('change', 'input[name=avatar]', function(){
      var ext = $(this).val().split('.').pop().toLowerCase();
      if($.inArray(ext, ['jpg', 'png', 'jpeg', 'gif']) == -1) {
          alert('Povoleny jsou pouze obrázky ve formátu jpg!');
          $(this).val('');
        return false;
      }
  });

  $('.icon-facebook-share').click(function(e) {
    e.preventDefault();
    $('.share-panel').slideToggle(300);
  });

  $('.close-share').click(function() {
    $('.share-panel').slideUp(300);
  });
  $('#link-share').focus(function(){
    // Select input field contents
    $(this).select();
  });

  $('#facebook-share').click(function(e) {
    e.preventDefault();
      var src  = $('#review-photo img').attr('src');
      var link = $(this).attr('href');
      e.preventDefault();
        FB.ui(
         {
           method: 'feed',
           link: link,
           picture: src,
           caption: 'Zahrej si super hru na freeegame.cz a boduj v lize freeegame!'
         },
         function(response) {}
        );
  });

  $( "#tabs" ).tabs();


  $('.add-to-favorite').click(function(e) {
    e.preventDefault();
    var id = $(this).attr('rel');
    $.get('/profile/set-favorite/ajax/true/id/' + id);
    var span = $(this).siblings('span');
    $(this).fadeOut(function() {
      span.fadeIn();
    });
  });

  $('.remove-game-box').on('click', function(e) {
    e.preventDefault();
    var $that = $(this);
    var id = $(this).attr('rel');
    $.get('/profile/remove-favorite/ajax/true/id/' + id, function() {
        $that.parent('div').fadeOut(function() {
        $(this).remove();
      });
    });
  });
  
});


$(document).ready(function() {

  $(".sign-in").live('click', function(e) {
    var form = $(this).closest('form');
      $('.login-alert').slideUp();
      e.preventDefault();
      $.post( '/auth/sign-in/',  form.serializeArray(), function(data) {
        if (data !== false) {
          if (data === true) {
            $('.loggin-box').load('/auth/logged-in/', function() {
              $('.loggin-box').children('ul').fadeIn(750);
              $('#mask').fadeOut(function() {
                $('.modal-content').empty();
              });
            });
          } else {
            window.location = data;
          }
        } else {
        $('.login-alert').slideDown();
        }
      });
  });
  /*** MASK ****/
  $('button.close').live('click', function(event) {
    event.preventDefault();
    $('body').removeClass('no-scroll');
    $(this).parent('div').parent('#mask').fadeOut(function() {
      $('.modal-content').empty();
    });
  });

  /*** LOADING DATA TO MODAL ***/
  $('.modal-link').live('click', function(event) {
    $('body').addClass('no-scroll');
    event.preventDefault();
    var remote = $(this).attr('href');
    $.get(remote, function(data) {
      showModal(data);
    });
  });

  /*** SHOW MODAL WITH GIVEN CONTENT ***/
  var showModal = function(data) {
    $('.modal-content').append(data);
    $('#mask').fadeIn(150, function() {
      if (window.location.href.indexOf("ref/codo-sign-up") > -1) {
        $('.codo-location').val('codo-sign-up');
      }
    });
  };

  /*** CREATE ACCOUNT ***/
  $('#create-account button').live('click', function() {
    $.post('/account/validate/', $('#create-account').serializeArray(), function(data) {
      if (data.processed === true) {
        $('.errors').empty();
        $('#create-account').submit();
      } else {
        $('.errors').empty();
        parseErrors(data);
      }
    });
    return false;
  });
  /*** VALID AJAX FORM ***/
  /**
   * Parsing errors from data json object
   * @param  {[json]} data Zend_Validation to json output
   * @return void
   */
  var parseErrors = function(data) {
    $.each(data, function(key, value) {
      asignError(value);
    });
  }

  /**
   * Clear previous error from form;
   * @param  {string} element element tdentificated by id
   * @return void
   */
  var clearError = function(element) 
  {
    var parent   = $('#' + element).parent('div.controls');
    $('.help-inline').remove();
    parent.parent('div.control-group').removeClass('error');

    return;
  }


  /**
   * Asign error message to given element
   * @param  {string} message Error message
   * @param  {string} element Identification of element by id
   * @return void
   */
  var asignError = function(message)
  {
    $('.errors').append( '<li>' + message + '</li>');
  }

  if (window.location.href.indexOf("ref/codo-sign-in") > -1) {
    $('.loggin-box .dropdown-toggle').trigger('click');
    $('input[name=email]').focus();
  }

  if (window.location.href.indexOf("ref/codo-sign-up") > -1) {
    $('.loggin-box .modal-link').trigger('click');
  }


  $('.login-box').hover(function(){ 
        mouse_is_inside=true;
  }, function(){ 
        mouse_is_inside=false; 
  });

  $('.toggle').mouseleave(function() {
    $('.login-box').removeClass('hidden');  
  });

  $('.username').mouseleave(function() {
    $('.login-box').removeClass('hidden');  
  });

  $("body").mouseup(function(event){ 
    
    if ($(event.target).hasClass('toggle') || $(event.target).hasClass('username')) {
      if(! $('.login-box').hasClass('show')) {
        $('.login-box').addClass('show');
        $('.toggle').addClass('active');
      } else {
        $('.login-box').hide();
        $('.login-box').removeClass('show');
        $('.login-box').addClass('hidden');
        $('.toggle').removeClass('active');  
        $('.login-box').removeAttr('style');        
      }
    } else {
      if(! mouse_is_inside) {
        $('.toggle').removeClass('active');
        $('.login-box').fadeOut(function() {
          $('.login-box').removeClass('show');  
          $('.login-box').removeAttr('style');
        }); 
        
      }
    }    
  });

        //setup advertisement
        var leftPadding = ($(document).width() - 940) / 2;
        $('.right-add-homepage').css('left', leftPadding + 938);
        $('.left-add-homepage').css('left', leftPadding - 167);

        var speed = 450;
        
        $('.section-list').click(function() {
            var selected = $(this);
            selected.removeClass('section-list');
            var active = $('.section-active');      
            $('.section-list').removeClass('section-active');
            selected.addClass('section-active');
            //lang změnit za id, vyzaduje zmenu v ccs a frontend
            var url = selected.attr('lang');
            var params = url.split('/');
            if ($('#menu-wrapper').is(":hidden")) 
            {
                $('#menu-wrapper').load('/menu/index/section/' + params[1] + '/page/' + params[4], function() {
                    $('#menu-wrapper').slideDown(speed, function() {
                        loadContent(url, true);
                        $('#category-wrapper').slideDown(speed);
                    });
                });
            } 
            else 
            {           
                $('#menu-wrapper').slideUp(speed, function() {
                    $('#category-wrapper').hide();
                    if (typeof active.attr('id') !== "undefined") 
                    {
                        if (selected.attr('id') !== active.attr('id')) 
                        {
                            $('#menu-wrapper').empty();
                            $('#menu-wrapper').load('/menu/index/section/' + params[1] + '/page/' + params[3], function() {
                                $('#menu-wrapper').slideDown(speed, function() {
                                    loadContent(url, true);
                                    $('#category-wrapper').slideDown(speed);
                                });
                            });
                        }
                    }
                });
            }
            selected.addClass('section-list');
        });

        
        if (history.pushState) {
            var ajaxState = 0;
        }
            
        function loadContent(url, push) {
            
            if (history.pushState) {
                ajaxState++;
                loader();
                $('#ajax-content').load(url, function (text, status, xhr) {
                    if (status == 'success') {
                        var title = xhr.getResponseHeader('title');
                        document.title = title;
                        if (push) {
                            scrollTo(0, 0);
                            history.pushState('', title, url);
                        }
                    }
                    loader();
                });
            //}

            } else
                window.location = url;
        }
        
        onpopstate = function (event) {
            if (ajaxState && !/#/.test(location.href)) {
                loadContent(location.href);
            }
        };

        $('.filter-toggle').live('click', function()
        {
            //$(this).toggleClass('filter-show', true);
            $('.filter-box-toggled').slideToggle();
            
            if($(this).is('.filter-show'))
            {
                $(this).removeClass('filter-show');
            } else
            {
                $(this).addClass('filter-show');
            }    
        }); 
        
                
       $('#fsection').change(function() {
              $('.section-1').attr('disabled', 'disabled');
              $('.section-2').attr('disabled', 'disabled');
              $('.section-3').attr('disabled', 'disabled');
              $('.section-4').attr('disabled', 'disabled');
              if ($(this).val() > 0) {
                
                 $('#fsubsection').removeAttr('disabled');
                 $('.section-' + $(this).val()).removeAttr('disabled');
              } else {
                 $('#fsubsection').attr('disabled', 'disabled');
                 $('#fsubsection').val(0); 
              }
       });
       
       $("#label-asc").click(function() {
            $("#label-desc").removeClass('active');
            $("#label-asc").addClass('active');
            $("#asc").attr('checked', true);
       });

       $("#label-desc").click(function() {
            $("#label-asc").removeClass('active');
            $("#label-desc").addClass('active');
            $("#desc").attr('checked', true);
       });
       
    /*** NEW USER FORM ***/
    
    $('#revert-pass').blur(function() {
        var form = $('#f-username').closest('form');
        var id = form.attr('id');
        
        var email = $(this).val();
        var link = $('#forgotten-password-link').attr('rel');
        if (email != '') {
            $.get('/account/check-email/from/registration/email/' + $(this).val() + '/id/' + id, function(data) {
                if (data) {                 
                    $('.revert-pass').slideDown(50);
                    $('#forgotten-password-link').attr('href', link + '/' + email);  
                }
                else
                    $('.revert-pass').slideUp(50);
                return false;
            });
        } else 
            $('.revert-pass').slideUp(50);
    });
    $('#f-username').focusin(function() {
        $('.f-username').fadeOut(50);
        $('.f-valid-username').fadeOut(50);
    });
    
    $('#f-pass-1').focusin(function() {
        $('.f-pass-1').fadeOut(50);
    });
    
    $('#f-pass-2').focusin(function() {
        $('.f-pass-2').fadeOut(50);
    });
    
    $('#f-pass-1').blur(function() {
        var form = $('#f-username').closest('form');
        var id = form.attr('id');
        if($(this).val().length < 5) {
            if (id > 0 && $(this).val().length == 0)
                return
            else
                $('.f-pass-1').fadeIn(50);  
        }
        if($('#f-pass-2').val().length > 4) {
            if($('#f-pass-2').val() != $('#f-pass-1').val()) {
                $('.f-pass-2').fadeIn(50);  
            }
        }
    });
    
    $('#f-pass-2').blur(function() {
        if($('#f-pass-1').val().length > 4) {
            if($('#f-pass-2').val() != $('#f-pass-1').val()) {
                $('.f-pass-2').fadeIn(50);  
            }
        }
    });
    
    $('#f-username').blur(function() {
        var form = $('#f-username').closest('form');
        var id = form.attr('id');
        
        var username = $(this).val();
        var myRegxp = /^([a-žA-Ž0-9_-]+)$/;
        if(myRegxp.test(username)==false || username.length < 4)
        {
            $('.f-username').fadeOut(50, function(){
              $('.f-valid-username').fadeIn(50);
            });
        }
        else
        {
            $('.f-valid-username').fadeOut(50);
            $.get('/account/check-username/from/registration/username/' + username + '/id/' + id, function(data) {
                if (data) {
                    $('.f-username').fadeIn(50);
                }
                else
                    $('.f-username').fadeOut(50);
                return false;
            });
        }
    });

    var getChartTable = function(month, type)
    {
      var url = $('#chart-table').attr('rel') + '/ajax/true/';

      $.post(url, {'month': month, 'type': type}, function(data) {
        $('.chart-table-body').remove();
        $('#chart-table').append(data);
      });
    };
    
    //show chart 
    $('#month-selector').live('change', function() {
      getChartTable($(this).val(), $('#chart-selector').val());
    });

    //show chart 
    $('#chart-selector').live('change', function() {
      getChartTable($('#month-selector').val(), $(this).val());
    });

    

    refreshBoards = function()
    {
      getChartTable($('#month-selector').val(), $('#chart-selector').val());
      var date = getDateTime();
      $('#chart-time-update').html(date);
    };


    //Show my position
    $('.show-my-position').click(function() {
      var tableName = $(this).attr('id');
      var table = $('.' + tableName);
      var set = ($('tr.active' ).index());

      $('tr.score-row', table).each(function(index) {
        var current = $(this).index();
        //if(current > visibleRows && current < visibleRows + 11) 
          if (current <= 19)
            $(this).delay(index * 25).fadeIn(function() {});
          //var row = $('tr.score-row').index(current).attr('class');            
      });
    });
    
    //set/remove default input values
    var clearMePrevious = "";
    // clear input on focus
    $(".clearMeFocus").focus(function() {
        if($(this).val()==$(this).attr("title")) {
            clearMePrevious = $(this).val();
            $(this).val("");
        }
    });
    // if field is empty afterward, add text again
    $(".clearMeFocus").blur(function() {
        if($(this).val()=="") {
            $(this).val(clearMePrevious);
        }
    });

    //loading games on homepage
    offsetOnline = 0;
    offsetDownload = 0;
    offsetMobile = 0;
   $('.best-game-button').click(function() {
      if ($(this).hasClass('active') == false) {
          $(this).next('button').removeClass('active');
          $(this).addClass('active');
          var box = $(this).attr('id'); 
          var next = $('.' + box).next('div');
          
          $('.' + box).fadeOut(100, function(){
             next.fadeIn(100);
          });
      }  
         
   });

   $('.most-played-button').click(function() {
       if ($(this).hasClass('active') == false) {
         $(this).prev('button').removeClass('active');
         $(this).addClass('active');
         var box = $(this).attr('id');
         var prev = $('.' + box).prev('div');
         //alert($('.' + box).prev('div').attr('class')); 
         $('.' + box).fadeOut(100, function(){
               prev.fadeIn(100);
         });
       }       
   });

   /*** LOAD HIGHSCORE GAME BY AJAX ***/
   $('#more-highscore').click(function() {
       limit = $('#more-highscore').attr('class');
       $('.more-highscore').addClass('loading');   
       offsetOnline = offsetOnline + 6;
       if (limit > 0) {
           if (offsetOnline > limit)
               $('#more-more-highscore').hide();
       }
      $("#next-highscore-games").append($("<div>").load('/highscore/more-games/offset/' + offsetOnline + '/section/1', function() {
          $('.more-highscore').removeClass('loading');   
      }));  
   });
   
   /*** LOAD ONLINE GAME BY AJAX ***/
   $('#more-online').click(function() {
       limit = $('#more-online').attr('class');
       $('.more-online').addClass('loading');   
       offsetOnline = offsetOnline + 6;
       if (limit > 0) {
           if (offsetOnline > limit)
               $('#more-online').hide();
       }
      $("#next-online-games").append($("<div>").load('/index/more-games/offset/' + offsetOnline + '/section/1', function() {
          $('.more-online').removeClass('loading');   
      }));  
   });
   
   /*** LOAD MOBILE GAME BY AJAX ***/
   $('#more-mobile').click(function() {
       $('.more-mobile').addClass('loading'); 
       offsetMobile = offsetMobile + 6;
      $("#next-mobile-games").append($("<div>").load('/index/more-games/offset/' + offsetMobile + '/section/3', function() {
          $('.more-mobile').removeClass('loading');   
      }));  
    });
   /*** LOAD DOWNLOAD GAME BY AJAX ***/
   
   $('#more-download').click(function() {
       $('.more-download').addClass('loading'); 
      offsetDownload = offsetDownload + 6;
      $("#next-download-games").append($("<div>").load('/index/more-games/offset/' + offsetDownload + '/section/2', function() {
          $('.more-download').removeClass('loading');   
      }));  
    }); 

   /*** LOAD MMO GAME BY AJAX ***/
   
   $('#more-mmo').click(function() {
       $('.more-download').addClass('loading'); 
      offsetDownload = offsetDownload + 6;
      $("#next-mmo-games").append($("<div>").load('/index/more-games/offset/' + offsetDownload + '/section/4', function() {
          $('.more-download').removeClass('loading');   
      }));  
    }); 
   
   /*** SCOREBOARDS VIEW LESS / MORE ***/
   checkExpand = function(table) {
     table.children('tbody').children('tr.score-row:lt(10)').fadeIn(1);
   /*  var visibleRows = $('tr.score-row:visible', table).length;
     var allRows = $('tr.score-row', table).length;
     if (visibleRows == allRows) {
        $('.more-icon', table).addClass('disabled');
      }
     
     if (visibleRows < allRows)
         $('.more-icon', table).removeClass('disabled');
     
     if (visibleRows < 11) {
         $('.less-icon', table).addClass('disabled');
      }
     
     if (visibleRows > 10) {
         $('.less-icon', table).removeClass('disabled');
      }
      */
   };

  $('.less-icon').addClass('disabled');
  $('.ajax-control div.more-icon').live('click', function() { 
      var button    = $(this);
      var table     = $(this).closest('table');
      var url       = table.attr('rel');
      if (table.attr('lang') === 'medal-wrapper')
        var offset    = $('.medal').length;
      else
        var offset    = $('tr.score-row:visible', table).length;

      var container = table.attr('lang');
      $.get(url + '/offset/' + offset, function(data) {
        $(data).appendTo($('#' + container));
        $('.less-icon', table).removeClass('disabled');
        if (table.attr('lang') === 'medal-wrapper')
          var next = parseInt($('.medal').length) + parseInt(1);   
        else
          var next = parseInt($('tr.score-row:visible', table).length) + parseInt(1);
        $.get(url + '/offset/' + next, function(data) {
        if (data ===  '')
          button.addClass('disabled');
        });
      });

  });


   /*** SCOREBOARDS VIEW LESS / MORE ***/
   checkExpand = function(table) {
     table.children('tbody').children('tr.score-row:lt(10)').fadeIn(1);
     var visibleRows = $('tr.score-row:visible', table).length;
     var allRows = $('tr.score-row', table).length;
     if (visibleRows == allRows) {
        $('.more-icon-s', table).addClass('disabled');
      }
     
     if (visibleRows < allRows)
         $('.more-icon-s', table).removeClass('disabled');
     
     if (visibleRows < 11) {
         $('.less-icon', table).addClass('disabled');
      }
     
     if (visibleRows > 10) {
         $('.less-icon', table).removeClass('disabled');
      }
   };
   
  
  $('div.more-icon').live('click', function() { 
    var table = $(this).closest('table');
    $('tr.score-row', table).each(function(index) {
      $(this).delay(index * 25).slideDown(30,function() {
        checkExpand(table);
      });
    });
  });

  $('div.less-icon').live('click', function() { 
    var table = $(this).closest('table');
    $('tbody tr', table).reverse().each(function(index) {
      $(this).delay(index * 25).slideUp(30, function() {
        checkExpand(table);
        $('td.repeating').show();
      });                 
    });
  });
  checkExpand($('#chart-table'));
  checkExpand($('#score-table'));
  
   
   $('.show-rows span').click(function() {
       
       var table = $(this).closest('table');
       var visibleRows = $('tr.score-row:visible', table).length;
       visibleRows--; 
       if ($(this).attr('class') == 'more-score') {
           $('tr.score-row', table).each(function(index) {
               var current = $(this).index();
                if(current > visibleRows && current < visibleRows + 11) 
                    $(this).delay(index * 25).fadeIn(function() {
                        checkExpand(table);
                    });                 
           });
       } else {
           $('tr.score-row', table).reverse().each(function(index) {
               var current = $(this).index();
               if(current > 4 && current > visibleRows - 10)
                    $(this).delay(index * 25).fadeOut(function(){
                        checkExpand(table);
                    });
           });
       }       
   });

   $('td.repeating').live('click', function() {
    $(this).slideUp(1, function() {
      $(this).parent().nextUntil('tr:visible').fadeIn();
        var visibleRows = $('tbody tr:visible', $('#score-table')).length;
        if (visibleRows > 10) {
           $('.less-icon', $('#score-table')).removeClass('disabled');
        }
    });

   });

   /*** SCOREBOARDS UPDATE DATA ***/
   updateBoards = function() {
       var rowsScore = $('tr.score-row:visible', '#score-table').length;
       $('#score-table-body').load('/highscore/refresh-score/rows/' + rowsScore + '/game/' + tag);
       var date = getDateTime();
       $('#score-time-update').html(date);
    };  
    
    /*** COMMENTS ***/         
    $('#send-comment').click(function() {
        var error = 'The specified result disagrees!';
        $.post('/comment/add/', $('#comment-form').serializeArray(), function(data) {
        if (data == 'captcha') {
            alert(error);
            return;
        } 
        if (data !== false) {
            $('#commnet-name').val('jméno');
            $('#commnet-text').val('text příspěvku');
                $('#new-comment').load('/comment/comment/id/' + data, function() {
                   $('#new-comment').fadeIn();  
                });
            }  
        });
    });
    //
    $('.play-game-handler').click(function() {  
        $('#play-game').slideDown();
        $('.play-game-handler').slideUp();
    });

    $('#close-game').click(function() {
        $('#play-game').slideUp();
        $('.play-game-handler').css('display', 'block'); 
    });
    
    /*** SET CHAT SIZE ***/
    /*set size tu full height if there is no awards box */
    if(typeof awards !== 'undefined') {
       if (awards == 'off') {
           $("#chat-area").height($('.left-chart-box').height() - 52);
      }
    }
    

});

function startDownload(url) {  
   window.open(url);
}

/*** GET FORMATED TIME ***/
function getDateTime() {
    date = new Date();
    with (date) {
        d = getDate();
        month = getMonth();
        if (document.all)
            r = getYear();
        else 
            r = getYear() + 1900;
        h = getHours();
        m = getMinutes();
        s = getSeconds();
        }
    return d+"."+month+"."+r+" "+h+":"+m+":"+s;
}

function loader() {

}

jQuery.fn.reverse = function() {
    return this.pushStack(this.get().reverse(), arguments);
};

/*
  Slimbox v2.04 - The ultimate lightweight Lightbox clone for jQuery
  (c) 2007-2010 Christophe Beyls <http://www.digitalia.be>
  MIT-style license.
*/
(function(w){var E=w(window),u,f,F=-1,n,x,D,v,y,L,r,m=!window.XMLHttpRequest,s=[],l=document.documentElement,k={},t=new Image(),J=new Image(),H,a,g,p,I,d,G,c,A,K;w(function(){w("body").append(w([H=w('<div id="lbOverlay" />')[0],a=w('<div id="lbCenter" />')[0],G=w('<div id="lbBottomContainer" />')[0]]).css("display","none"));g=w('<div id="lbImage" />').appendTo(a).append(p=w('<div style="position: relative;" />').append([I=w('<a id="lbPrevLink" href="#" />').click(B)[0],d=w('<a id="lbNextLink" href="#" />').click(e)[0]])[0])[0];c=w('<div id="lbBottom" />').appendTo(G).append([w('<a id="lbCloseLink" href="#" />').add(H).click(C)[0],A=w('<div id="lbCaption" />')[0],K=w('<div id="lbNumber" />')[0],w('<div style="clear: both;" />')[0]])[0]});w.slimbox=function(O,N,M){u=w.extend({loop:false,overlayOpacity:0.8,overlayFadeDuration:400,resizeDuration:400,resizeEasing:"swing",initialWidth:250,initialHeight:250,imageFadeDuration:400,captionAnimationDuration:400,counterText:"Image {x} of {y}",closeKeys:[27,88,67],previousKeys:[37,80],nextKeys:[39,78]},M);if(typeof O=="string"){O=[[O,N]];N=0}y=E.scrollTop()+(E.height()/2);L=u.initialWidth;r=u.initialHeight;w(a).css({top:Math.max(0,y-(r/2)),width:L,height:r,marginLeft:-L/2}).show();v=m||(H.currentStyle&&(H.currentStyle.position!="fixed"));if(v){H.style.position="absolute"}w(H).css("opacity",u.overlayOpacity).fadeIn(u.overlayFadeDuration);z();j(1);f=O;u.loop=u.loop&&(f.length>1);return b(N)};w.fn.slimbox=function(M,P,O){P=P||function(Q){return[Q.href,Q.title]};O=O||function(){return true};var N=this;return N.unbind("click").click(function(){var S=this,U=0,T,Q=0,R;T=w.grep(N,function(W,V){return O.call(S,W,V)});for(R=T.length;Q<R;++Q){if(T[Q]==S){U=Q}T[Q]=P(T[Q],Q)}return w.slimbox(T,U,M)})};function z(){var N=E.scrollLeft(),M=E.width();w([a,G]).css("left",N+(M/2));if(v){w(H).css({left:N,top:E.scrollTop(),width:M,height:E.height()})}}function j(M){if(M){w("object").add(m?"select":"embed").each(function(O,P){s[O]=[P,P.style.visibility];P.style.visibility="hidden"})}else{w.each(s,function(O,P){P[0].style.visibility=P[1]});s=[]}var N=M?"bind":"unbind";E[N]("scroll resize",z);w(document)[N]("keydown",o)}function o(O){var N=O.keyCode,M=w.inArray;return(M(N,u.closeKeys)>=0)?C():(M(N,u.nextKeys)>=0)?e():(M(N,u.previousKeys)>=0)?B():false}function B(){return b(x)}function e(){return b(D)}function b(M){if(M>=0){F=M;n=f[F][0];x=(F||(u.loop?f.length:0))-1;D=((F+1)%f.length)||(u.loop?0:-1);q();a.className="lbLoading";k=new Image();k.onload=i;k.src=n}return false}function i(){a.className="";w(g).css({backgroundImage:"url("+n+")",visibility:"hidden",display:""});w(p).width(k.width);w([p,I,d]).height(k.height);w(A).html(f[F][1]||"");w(K).html((((f.length>1)&&u.counterText)||"").replace(/{x}/,F+1).replace(/{y}/,f.length));if(x>=0){t.src=f[x][0]}if(D>=0){J.src=f[D][0]}L=g.offsetWidth;r=g.offsetHeight;var M=Math.max(0,y-(r/2));if(a.offsetHeight!=r){w(a).animate({height:r,top:M},u.resizeDuration,u.resizeEasing)}if(a.offsetWidth!=L){w(a).animate({width:L,marginLeft:-L/2},u.resizeDuration,u.resizeEasing)}w(a).queue(function(){w(G).css({width:L,top:M+r,marginLeft:-L/2,visibility:"hidden",display:""});w(g).css({display:"none",visibility:"",opacity:""}).fadeIn(u.imageFadeDuration,h)})}function h(){if(x>=0){w(I).show()}if(D>=0){w(d).show()}w(c).css("marginTop",-c.offsetHeight).animate({marginTop:0},u.captionAnimationDuration);G.style.visibility=""}function q(){k.onload=null;k.src=t.src=J.src=n;w([a,g,c]).stop(true);w([I,d,g,G]).hide()}function C(){if(F>=0){q();F=x=D=-1;w(a).hide();w(H).stop().fadeOut(u.overlayFadeDuration,j)}return false}})(jQuery);

// AUTOLOAD CODE BLOCK (MAY BE CHANGED OR REMOVED)
if (!/android|iphone|ipod|series60|symbian|windows ce|blackberry/i.test(navigator.userAgent)) {
  jQuery(function($) {
    $("a[rel^='lightbox']").slimbox({/* Put custom options here */}, null, function(el) {
      return (this == el) || ((this.rel.length > 8) && (this.rel == el.rel));
    });
  });
}
