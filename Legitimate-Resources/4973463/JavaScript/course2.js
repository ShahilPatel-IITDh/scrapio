;(function($) {



jQuery.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}


function bp_course_generate_cookie(){
  var category_filter=[];
     jQuery('.bp-course-category-filter:checked').each(function(){
        var category={'type':'course-cat','value':jQuery(this).val()};
        category_filter.push(category);
     });

     jQuery('.course_cat_nav li.current-cat,input.current-course-cat').each(function(){
        if(typeof jQuery(this).attr('data-slug') != 'undefined'){
          var tax = 'course-cat';
          if(jQuery(this).attr('data-cat') != 'undefined'){
            tax = jQuery(this).attr('data-cat');
          }
          var category={'type':tax,'value':jQuery(this).attr('data-slug')};
          category_filter.push(category);
        }
     });

     jQuery('.bp-course-date-filter').each(function(){
        if(jQuery(this).val().length){
          var date={'type':jQuery(this).attr('data-type'),'value':jQuery(this).val()};    
        }
        category_filter.push(date);
     });
     jQuery('.bp-course-free-filter:checked').each(function(){
      var free={'type':'free','value':jQuery(this).val()};
        category_filter.push(free);
     });
     jQuery('.bp-course-offline-filter:checked').each(function(){
      var offline={'type':'offline','value':jQuery(this).val()};
        category_filter.push(offline);
     });
     jQuery('.course_filter_item:checked').each(function(){
        var filterr={'type':jQuery(this).data('filter-type'),'value':jQuery(this).val()};
        category_filter.push(filterr);
     });
     jQuery('.bp-course-instructor-filter:checked').each(function(){
      var level={'type':'instructor','value':jQuery(this).val()};
        category_filter.push(level);
     });
     $.cookie('bp-course-extras', JSON.stringify(category_filter), { expires: 1 ,path: '/'});
}

jQuery(document).ready(function($){
    if(jQuery('body').hasClass('directory') && jQuery('body').hasClass('course')){
      $.cookie('bp-course-scope', 'all', {path: '/'});
      if(jQuery('body').hasClass('archive')){
        bp_course_generate_cookie();
        bp_filter_request( 'course', '', '', 'div.course','', 1,jq.cookie('bp-course-extras') );
      }else{
        bp_filter_request( 'course', '', '', 'div.course','', 1,'{}');  
      }
      
    }

    if(jQuery('body').hasClass('bp-user my-account course')){
      if(jQuery('body').hasClass('instructor-courses')){ 
        $.cookie('bp-course-scope', 'instructor', {path: '/'});
        $.cookie('bp-course-extras', '', {path: '/'});
        bp_filter_request( 'course', '', 'instructor', 'div.course','', 1,'{}');
      }else{
        $.cookie('bp-course-scope', 'personal', {path: '/'});
        $.cookie('bp-course-extras', '', {path: '/'});
        bp_filter_request( 'course', '', 'personal', 'div.course','', 1,'{}');
      }
    }
});



// Necessary functions
function runnecessaryfunctions(){
    if ($.isFunction($.fn.fitVids)) {
      jQuery('.fitvids').fitVids();
    }
    if (typeof tooltip !== 'undefined') {
      jQuery('.tip').tooltip();
    }
    
    jQuery('.nav-tabs li:first a').tab('show');
    jQuery('.nav-tabs li a').click(function(event){
        event.preventDefault();
        jQuery(this).tab('show');
    });
    jQuery( "#prev_results a" ).unbind( "click" );
    jQuery('#prev_results a').on('click',function(event){
          event.preventDefault();
          jQuery(this).toggleClass('show');
          jQuery('.prev_quiz_results').toggleClass('show');
    });
    jQuery( ".print_results" ).unbind( "click" );
    jQuery('.print_results').on('click',function(event){
        event.preventDefault();
        jQuery('.quiz_result').print();
    });

    jQuery('.quiz_retake_form').on('click',function(e){
        e.preventDefault();
        var qid=jQuery('#unit.quiz_title').attr('data-unit');
        $.ajax({
          type: "POST",
          url: ajaxurl,
          data: { action: 'retake_inquiz', 
                  security: jQuery('#hash').val(),
                  quiz_id:qid,
                },
          cache: false,
          success: function (html) {
             jQuery('a.unit[data-unit="'+qid+'"]').trigger('click');
             
             jQuery('#unit'+qid).removeClass('done');
             jQuery('#all_questions_json').each(function(){
                  var question_ids = $.parseJSON(jQuery(this).val());
                  $.each(question_ids,function(i,question_id){
                  localStorage.removeItem(question_id);
                  localStorage.removeItem('question_result_'+question_id);
                });
             });
             jQuery('body').find('.course_progressbar').removeClass('increment_complete');
             jQuery('body').find('.course_progressbar').trigger('decrement');
          }
        });
    });

    jQuery('.wp-playlist').each(function(){
        return new WPPlaylistView({ el: this });
    });
    if(typeof wplms_init_medialement_on_course_status === 'undefined'){
      jQuery('audio,video').each( function() { if(jQuery(this).parents('.flowplayer').length) return; if(jQuery(this).closest('.wp-playlist').length){return;} if(jQuery(this).parents('.react-player').length) return; jQuery(this).mediaelementplayer()   });
    }
    
    jQuery('.gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function(item) {
                return item.el.attr('title');
            }
        }
    });
    jQuery('.open_popup_link').magnificPopup({
      type:'inline',
      midClick: true 
    });
    jQuery('.ajax-popup-link').magnificPopup({
        type: 'ajax',
        alignTop: true,
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        closeBtnInside: true,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });
    jQuery('.quiz_results_popup').magnificPopup({
        type: 'ajax',
        alignTop: true,
        ajax: {
          settings: {cache:false},
        },
        callbacks: {
                 parseAjax: function( mfpResponse ) {
                  mfpResponse.data = jQuery(mfpResponse.data).find('.user_quiz_result');
                },
                ajaxContentAdded: function(){
                  
                  jQuery('#prev_results a').on('click',function(event){
                        event.preventDefault();
                        jQuery(this).toggleClass('show');
                        jQuery('.prev_quiz_results').toggleClass('show');
                  });
                  jQuery('.print_results').click(function(event){
                      event.preventDefault();
                      jQuery('.quiz_result').print();
                  });
                  jQuery('.quiz_retake_form').on('click',function(e){
                      e.preventDefault();
                      var qid=jQuery('#unit.quiz_title').attr('data-unit');
                      $.ajax({
                          type: "POST",
                          url: ajaxurl,
                          data: { action: 'retake_inquiz', 
                                  security: jQuery('#hash').val(),
                                  quiz_id:qid,
                                },
                          cache: false,
                          success: function (html) {
                             jQuery('a.unit[data-unit="'+qid+'"]').trigger('click');
                             $.magnificPopup.close();
                             jQuery('#unit'+qid).removeClass('done');
                             jQuery('#all_questions_json').each(function(){
                                  var question_ids = $.parseJSON(jQuery(this).val());
                                  $.each(question_ids,function(i,question_id){
                                  localStorage.removeItem(question_id);
                                  localStorage.removeItem('question_result_'+question_id);
                                });
                             });
                             jQuery('body').find('.course_progressbar').removeClass('increment_complete');
                             jQuery('body').find('.course_progressbar').trigger('decrement');
                          }
                        });
                      
                  });
                }
              }
    });

    jQuery(".live-edit").liveEdit({
        afterSaveAll: function(params) {
          return false;
        }
    });
    if ( typeof vc_js == 'function' ) { 
      window.vc_js();
    }

}


//Cookie evaluation
jQuery(document).ready( function($){

  jQuery('.open_popup_link').magnificPopup({
    type:'inline',
    midClick: true 
  });
  jQuery('.item-list').each(function(){
    var cookie_name = 'bp-'+jQuery('.item-list').attr('id');
    var cookieValue = $.cookie(cookie_name);
    if ((cookieValue !== null) && cookieValue == 'grid') {      
      jQuery('.item-list').addClass('grid');
      jQuery('#list_view').removeClass('active');
      jQuery('#grid_view').addClass('active');
    }
  });
  
   jQuery('.curriculum_unit_popup').on('click',function(event){
      event.preventDefault();
      var $this = jQuery(this);
      
      if(!jQuery('#unit_load'+$this.attr('data-id')).length){

        $.ajax({
          type: "POST",
          url: ajaxurl,
          data: { action: 'get_unit_content', 
                  course_id: $this.attr('data-course'),
                  unit_id: $this.attr('data-id'),
                },
          cache: false,
          success: function (html) {
            jQuery('body').append(html);
            runnecessaryfunctions();
            jQuery('body').find('#unit_load'+$this.attr('data-id')).addClass('unit_content');
            jQuery('body').trigger('unit_load'+$this.attr('data-id'));      
          }
        });

      }else{
        jQuery('body').trigger('unit_load'+$this.attr('data-id'));
      } 

      jQuery('body').on('unit_load'+$this.attr('data-id'),function(){
          $.magnificPopup.open({
              items: {
                  src: '#unit_load'+$this.attr('data-id')
              },
              type: 'inline',
              callbacks:{
                open: function(){
                  jQuery('.unit_content').trigger('unit_traverse');
                  jQuery('body').trigger('unit_loaded');
                }
              }
          });
      });
   });
  jQuery('.shop_table.order_details dl.variation').each(function(){ 
    jQuery("[class^=variation-commission]").hide();
  });
  
  
  jQuery('.datepicker').each(function(){
    jQuery(this).datepicker({dateFormat: 'yy-mm-dd'});
  });
});
function bp_course_extras_cookies(){
  jQuery('.bp-course-category-filter,.bp-course-free-filter,.bp-course-level-filter,.bp-course-location-filter,.bp-course-instructor-filter,.bp-course-date-filter,.bp-course-offline-filter,.course_filter_item').on('change',function(){
     bp_course_generate_cookie();
  });
}

jQuery('.course_cat_nav li').each(function(){
    if(jQuery(this).hasClass('current-cat')){
        if(typeof jQuery(this).attr('data-slug') != 'undefined' && jQuery(this).attr('data-slug').length){
            bp_course_generate_cookie();
        }
    }
});
 
jQuery(document).ready(function($){
 
  jQuery('.course_pursue_panel').each(function(){
    var course_pursue_panel = jQuery(this);
    var wheight = jQuery(window).height();
    course_pursue_panel.css('height',wheight+'px');
    var viewportWidth = jQuery(window).width();
    if (viewportWidth < 768) {
      jQuery("body").addClass("course_pursue_panel_hide");
    }else{
      jQuery("body").removeClass("course_pursue_panel_hide");
    }  
  });
  jQuery('#hideshow_course_pursue_panel').on('click',function(){
    jQuery('body').toggleClass('course_pursue_panel_hide');
  });

  //close timeline on load mobile
  jQuery(window).load(function(){
    var viewportWidth = jQuery(window).width();
    if (viewportWidth < 768) {
      jQuery('.unit_content').on('unit_traverse',function(){
        jQuery("body").addClass("course_pursue_panel_hide");
      });
    }
  });

  jQuery(window).on("resize", function() {
      var viewportWidth = jQuery(window).width();
      if (viewportWidth < 768) {
        jQuery("body").addClass("course_pursue_panel_hide");
        //close timeline on mobile on resize
        jQuery('.unit_content').on('unit_traverse',function(){
          jQuery("body").addClass("course_pursue_panel_hide");
        });
      }else{
        jQuery("body").removeClass("course_pursue_panel_hide");
      }
  });
});

function bp_course_category_filter_cookie(){

    var category_filter_cookie =  $.cookie("bp-course-extras");

    if (typeof category_filter_cookie !== "undefined" && (category_filter_cookie !== null) ) { 
        var category_filter = JSON.parse(category_filter_cookie);
        if(typeof category_filter != 'object'){
          return;
        }
        jQuery('#active_filters').remove();
        if(jQuery('#active_filters').length){
          jQuery('#active_filters').fadeIn(200);
        }else{
          jQuery('#course-dir-list').before('<ul id="active_filters"><li>'+vibe_course_module_strings.active_filters+'</li></ul>');
        }
        //Detect and activate specific filters
        jQuery.each(category_filter, function(index, item) {
            if(item !== null){
              
                if(jQuery('input[data-type="'+item['type']+'"]').attr('type') == 'text'){
                 jQuery('input[data-type="'+item['type']+'"]').val(item['value']);
                  var id = jQuery('input[data-type="'+item['type']+'"]').attr('data-type');
                  var text = jQuery('input[data-type="'+item['type']+'"]').attr('placeholder')+' : '+item['value'];
                }else{
                  jQuery('input[value="'+item['value']+'"]').prop('checked', true);
                  var id = jQuery('input[value="'+item['value']+'"]').attr('id');
                  var text = jQuery('label[for="'+id+'"]').text();
                }
              
                if(!jQuery('#active_filters span[data-id="'+id+'"]').length && text.length){
                  jQuery('#active_filters').append('<li><span data-id="'+id+'">'+text+'</span></li>');
                }

            }
        });
        // Delete a specific filter
        jQuery('#active_filters li span').on('click',function(){
           var id = jQuery(this).attr('data-id');
           jQuery(this).parent().fadeOut(200,function(){
            jQuery(this).remove();
            jQuery('#loader_spinner').remove();
            if(jQuery('#active_filters li').length < 3)
              jQuery('#active_filters').fadeOut(200);
            else    
              jQuery('#active_filters').fadeIn(200);
          });
           if(jQuery('#'+id).length){
              if(jQuery('#'+id).attr('type') == 'checkbox'){
                jQuery('#'+id).prop('checked',false);     
              }
              if(jQuery('#'+id).attr('type') == 'radio'){
                jQuery('#'+id).prop('checked',false);     
              }
              if(jQuery('#'+id).attr('type') == 'text'){
                jQuery('#'+id).val('');
              }
           }

           
           /*===== */ 
           
           var category_filter=[];
           
           jQuery('.bp-course-free-filter:checked').each(function(){
            var free={'type':'free','value':jQuery(this).val()};
              category_filter.push(free);
           });
           jQuery('.bp-course-offline-filter:checked').each(function(){
            var offline={'type':'offline','value':jQuery(this).val()};
              category_filter.push(offline);
           });

           jQuery('.course_filter_item:checked').each(function(){
            var filterr={'type':jQuery(this).data('filter-type'),'value':jQuery(this).val()};
              category_filter.push(filterr);
           });
           
           jQuery('.bp-course-instructor-filter:checked').each(function(){
            var level={'type':'instructor','value':jQuery(this).val()};
              category_filter.push(level);
           });
           $.cookie('bp-course-extras', JSON.stringify(category_filter), { expires: 1 ,path: '/'});

           jQuery('.course_filters').trigger('course_filter');
           /* ==== */
        });

        if(!jQuery('#active_filters .all-filter-clear').length)
            jQuery('#active_filters').append('<li class="all-filter-clear">'+vibe_course_module_strings.clear_filters+'</li>');

        // Clear all Filters link
        jQuery('#active_filters li.all-filter-clear').click(function(){
            jQuery('#loader_spinner').remove();
            jQuery('#active_filters li').each(function(){
              var span = jQuery(this).find('span');
               var id = span.attr('data-id');
               span.parent().fadeOut(200,function(){
                  jQuery(this).remove(); });
               if(jQuery('#'+id).attr('type') == 'text'){
                 jQuery('#'+id).val('');
               }else{
                  jQuery('#'+id).prop('checked',false);
               }
              jQuery('#active_filters').fadeOut(200,function(){
                jQuery(this).remove();
              });   
              $.removeCookie('bp-course-extras', { path: '/' });
              jQuery('.course_filters').trigger('course_filter');
              //jQuery('#submit_filters').trigger('click');
            });
        });
        // End Clear All
           // Hide is no filter active
        if(jQuery('#active_filters li').length < 3){
          jQuery('#active_filters').fadeOut(200);
        }else{
          jQuery('#active_filters').fadeIn(200);
        }    
    }
}

bp_course_extras_cookies();
bp_course_category_filter_cookie();


  if(jQuery('.course_filters').hasClass('auto_click')){
    jQuery('.course_filters input').on('change',function(event){ 
      var jq = jQuery;

      jQuery('#loader_spinner').remove();
      jQuery(this).append('<i id="loader_spinner" class="fa fa-spinner spin loading animation cssanim"></i>');
      if ( jQuery('.item-list-tabs li.selected').length ){
        var el = jQuery('.item-list-tabs li.selected');
      }else{
        jQuery('#course-all').addClass('selected');
        var el = jQuery('#course-all');
      }

      var css_id = el.attr('id').split('-');
      var object = css_id[0];
      var scope = css_id[1];
      var filter = jq(this).val();
      var search_terms = false;

      if ( jq('.dir-search input').length )
        search_terms = jq('.dir-search input').val();

      if ( 'friends' == object )
        object = 'members';

      bp_course_extras_cookies();
      bp_filter_request( object, filter, scope, 'div.' + object, search_terms, 1, jq.cookie('bp-' + object + '-extras') );
      bp_course_category_filter_cookie();
        jq('#buddypress').on('bp_filter_request',function(){
          jQuery('#loader_spinner').remove();
      });
    });
  }
  

/*=========================================================================*/

  jQuery('.category_filter li > span,.category_filter li > label').click(function(event){
    var parent= jQuery(this).parent();
    jQuery(this).parent().find('span').toggleClass('active');
    parent.find('ul.sub_categories').toggle(300);
  });
  
  jQuery('#submit_filters').on('click',function(event){ 
      var jq = jQuery;


      jQuery('#loader_spinner').remove();
      jQuery(this).append('<i id="loader_spinner" class="fa fa-spinner spin loading animation cssanim"></i>');
      
      jQuery('.course_filters').trigger('course_filter');

      return false;
  });

  jQuery('.course_filters').on('course_filter',function(){
      var jq = jQuery;
      if ( jQuery('.item-list-tabs li.selected').length ){
        var el = jQuery('.item-list-tabs li.selected');
      }else{
        jQuery('#course-all').addClass('selected');
        var el = jQuery('#course-all');
      }
      var css_id = el.attr('id').split('-');
      var object = css_id[0];
      var scope = css_id[1];
      var filter = jq(this).val();
      var search_terms = false;

      if ( jq('.dir-search input').length )
        search_terms = jq('.dir-search input').val();

      if ( 'friends' == object )
        object = 'members';

      bp_course_extras_cookies();
      bp_filter_request( object, filter, scope, 'div.' + object, search_terms, 1, jq.cookie('bp-' + object + '-extras') );
      bp_course_category_filter_cookie();
      jq('#buddypress').on('bp_filter_request',function(){
        jQuery('#loader_spinner').remove();
      });

  });
    
  jQuery('#grid_view').click(function(){
    if(!jQuery('.item-list').hasClass('grid')){
      jQuery('.item-list').addClass('grid');
    }
    var cookie_name = 'bp-'+jQuery('.item-list').attr('id');
    $.cookie(cookie_name, 'grid', { expires: 2 ,path: '/'});
    jQuery('#list_view').removeClass('active');
    jQuery(this).addClass('active');
  });
  jQuery('#list_view').click(function(){
    jQuery('.item-list').removeClass('grid');
    var cookie_name = 'bp-'+jQuery('.item-list').attr('id');
    $.cookie(cookie_name, 'list', { expires: 2 ,path: '/'});
    jQuery('#grid_view').removeClass('active');
    jQuery(this).addClass('active');
  });
  jQuery('.dial').each(function(){
    jQuery(this).knob({
        'readOnly': true, 
        'width': 120, 
        'height': 120, 
        'fgColor': vibe_course_module_strings.theme_color, 
        'bgColor': '#f6f6f6',   
        'thickness': 0.1
    });
  });

  jQuery('body').delegate('#apply_course_button','click',function(){
    var $this = jQuery(this);
    var default_html = $this.html();
    $this.html('<i class="fa fa-spinner animated spin"></i>');
      $.confirm({
          text: vibe_course_module_strings.confirm_apply,
          confirm: function() {
             $.ajax({
                    type: "POST",
                    url: ajaxurl,
                    data: { action: 'apply_for_course',
                            security: $this.attr('data-security'),
                            course_id:$this.attr('data-id'),
                          },
                    cache: false,
                    success: function (html) {
                        $this.html(html);
                    }
            });
          },
          cancel: function() {
              $this.html(default_html);
          },
          confirmButton: vibe_course_module_strings.confirm,
          cancelButton: vibe_course_module_strings.cancel
      });
  });


  //RESET Ajx
jQuery( 'body' ).delegate( '.remove_user_course','click',function(event){
      event.preventDefault();
      var course_id=jQuery(this).attr('data-course');
      var user_id=jQuery(this).attr('data-user');
      jQuery(this).addClass('animated spin');
      var $this = jQuery(this);
      $.confirm({
          text: vibe_course_module_strings.remove_user_text,
          confirm: function() {
             $.ajax({
                    type: "POST",
                    url: ajaxurl,
                    data: { action: 'remove_user_course',
                            security: jQuery('#bulk_action').val(),
                            id: course_id,
                            user: user_id
                          },
                    cache: false,
                    success: function (html) {
                        jQuery(this).removeClass('animated');
                        jQuery(this).removeClass('spin');
                        runnecessaryfunctions();
                        jQuery('#message').html(html);
                        jQuery('#s'+user_id).fadeOut('fast');
                    }
            });
          },
          cancel: function() {
              $this.removeClass('animated');
              $this.removeClass('spin');
          },
          confirmButton: vibe_course_module_strings.remove_user_button,
          cancelButton: vibe_course_module_strings.cancel
      });
});

jQuery( 'body' ).delegate( '.reset_course_user','click',function(event){
  event.preventDefault();
  var course_id=jQuery(this).attr('data-course');
  var user_id=jQuery(this).attr('data-user');
  jQuery(this).addClass('animated spin');
  var $this = jQuery(this);
  $.confirm({
    text: vibe_course_module_strings.reset_user_text,
      confirm: function() {
      $.ajax({
              type: "POST",
              url: ajaxurl,
              data: { action: 'reset_course_user', 
                      security: jQuery('#bulk_action').val(),
                      id: course_id,
                      user: user_id
                    },
              cache: false,
              success: function (html) {
                  $this.removeClass('animated');
                  $this.removeClass('spin');

                  var cookie_id = 'course_progress'+course_id;
                  $.removeCookie(cookie_id,{ path: '/' });

                  jQuery('#message').html(html);
              }
      });
     }, 
     cancel: function() {
          $this.removeClass('animated');
          $this.removeClass('spin');
      },
      confirmButton: vibe_course_module_strings.reset_user_button,
      cancelButton: vibe_course_module_strings.cancel
    });
});

  
jQuery( 'body' ).delegate( '.tip.course_stats_user', 'click', function(event){
      event.preventDefault();
      var $this=jQuery(this);
      var course_id=$this.attr('data-course');
      var user_id=$this.attr('data-user');
      
      if($this.hasClass('already')){
        jQuery('#s'+user_id).find('.course_stats_user').fadeIn('fast');
      }else{
          $this.addClass('animated spin');    
        $.ajax({
                type: "POST",
                url: ajaxurl,
                data: { action: 'course_stats_user', 
                        security: jQuery('#bulk_action').val(),
                        id: course_id,
                        user: user_id
                      },
                cache: false,
                success: function (html) {
                    $this.removeClass('animated');
                    $this.removeClass('spin');
                    $this.addClass('already');
                    jQuery('#s'+user_id).append(html);
                    jQuery('.course_students').trigger('load_quiz_results');
                    jQuery(".dial").knob({
                      'readOnly': true, 
                      'width': 160, 
                      'height': 160, 
                      'fgColor': vibe_course_module_strings.theme_color, 
                      'bgColor': '#f6f6f6',   
                      'thickness': 0.1 
                    });

                    jQuery('#s'+user_id+' .curriculum_check li span').click(function(){
                      var $span = jQuery(this);
                      var action;
                      var text;
                      if(jQuery(this).hasClass('done')){
                        action = 'instructor_uncomplete_unit';
                        text = vibe_course_module_strings.instructor_uncomplete_unit;
                      }else{
                        action = 'instructor_complete_unit';
                        text = vibe_course_module_strings.instructor_complete_unit;
                      }

                      $.confirm({
                            text: text,
                            confirm: function() {
                            $.ajax({
                                type: "POST",
                                url: ajaxurl,
                                async: true,
                                data: { action: action, 
                                        security: jQuery('#bulk_action').val(),
                                        course_id: course_id,
                                        id:$span.attr('data-id'),
                                        user_id: user_id
                                      },
                                cache: false,
                                success: function (html) {
                                  console.log(html);
                                  if($span.hasClass('done')){
                                    $span.removeClass('done');
                                  }else{
                                    $span.addClass('done');
                                  }
                                }
                            });
                        }, 
                         cancel: function() {
                          },
                          confirmButton: vibe_course_module_strings.confirm,
                          cancelButton: vibe_course_module_strings.cancel
                        });
                    }); // End span click
                }
        });
      }
  });
  
jQuery('.course_students').on('load_quiz_results',function(){
    jQuery('.check_user_quiz_results').click(function(){
        $.ajax({
                type: "POST",
                url: ajaxurl,
                data: { action    : 'check_user_quiz_results',
                        quiz      : jQuery(this).attr('data-quiz'),
                        user      : jQuery(this).attr('data-user'),
                        course_id : jQuery('#course_user_ajax_search_results').attr('data-id'),
                        security  : jQuery('#bulk_action').val()
                      },
                cache: false,
                success: function (html) {
                    //jQuery('.check_user_quiz_results').append('<div class="quiz_results_wrapper hide">'+html+'</div>');
                    $.magnificPopup.open({
                        items: {
                            src: jQuery('<div id="item-body">'+html+'</div>'),
                            type: 'inline'
                        }
                    });
                    jQuery('.print_results').click(function(event){
                        event.preventDefault();
                        jQuery('.quiz_result').print();
                    });
                }
        });
    });
});
  
  jQuery('body').delegate('.data_stats li','click',function(event){
    event.preventDefault();
    var defaultxt = jQuery(this).html();
    var content = jQuery('.main_content');
    if(jQuery('.main_unit_content.in_quiz') && jQuery('.main_unit_content.in_quiz').length){
      var content = jQuery('.main_unit_content.in_quiz') ;
    }
    var $this = jQuery(this);
    var id = jQuery(this).attr('id');

    if(id == 'desc'){
      content.show();
      jQuery('.stats_content').hide();
    }else{
      if(jQuery(this).hasClass('loaded')){
        content.hide();
        jQuery('.stats_content').show();
      }else{
         $this.addClass('loaded');  
         content.hide();
         jQuery(this).html('<i class="fa fa-spinner"></i>');
         var quiz_id = $this.parent().attr('data-id');
         var cpttype = $this.parent().attr('data-type');
         $.ajax({
                type: "POST",
                url: ajaxurl,
                data: { action: 'load_stats', 
                        cpttype: cpttype,
                        id: quiz_id
                      },
                cache: false,
                success: function (html) {

                  content.after(html);
                  console.log(cptchatjs);
                  
                      $.ajax({
                        type: "POST",
                        url: ajaxurl,
                        dataType: 'json',
                        data: { action: 'cpt_stats_graph', 
                                cpttype: cpttype,
                                id: quiz_id
                              },
                        cache: false,
                        success: function (json) {
                          console.log('loading cpt stats')

                          jQuery.getScript(cptchatjs).done(function(){
                            console.log('loade');
                              new Chart(document.getElementById("stats_chart"),
                                {
                                  "type":"doughnut",
                                  "data":{
                                    "labels":json.labels,
                                    "datasets":[
                                      { 
                                        "label":"My First Dataset",
                                        "data":json.data,
                                        "backgroundColor":["rgb(255, 99, 132)","rgb(54, 162, 235)","rgb(255, 205, 86)","rgb(112, 201, 137)"]
                                      }
                                    ]
                                  }
                                });
                            })
                        }

                      });

                  jQuery('#load_more_cpt_user_results').on('click',function(){
                    var loadmore = jQuery(this);

                    if(loadmore.hasClass('loading'))
                      return;

                    jQuery(this).addClass('loading');

                      $.ajax({
                      type: "POST",
                      url: ajaxurl,
                      data: { action: 'load_more_stats', 
                              cpttype: cpttype,
                              id: quiz_id,
                              starting_point:loadmore.attr('data-starting_point')
                            },
                      cache: false,
                      success:function(html){
                        loadmore.removeClass('loading');
                        loadmore.hide(200);
                        jQuery('.stats_content ol.marks').append(html);  
                      }
                    });
                  });    
                  
                  setTimeout(function(){$this.html(defaultxt); }, 1000);
                }
        });
      }
    }
    $this.parent().find('.active').removeClass('active');
    $this.addClass('active');
  });

  jQuery('#calculate_avg_course').click(function(event){
      event.preventDefault();
      var course_id=jQuery(this).attr('data-courseid');
      jQuery(this).addClass('animated spin');

      $.ajax({
              type: "POST",
              url: ajaxurl,
              data: { action: 'calculate_stats_course', 
                      security: jQuery('#security').val(),
                      id: course_id
                    },
              cache: false,
              success: function (html) {
                  jQuery(this).removeClass('animated');
                  jQuery(this).removeClass('spin');
                  jQuery('#message').html(html);
                   setTimeout(function(){location.reload();}, 3000);
              }
      });

  });


jQuery('.course.submissions #quiz,.course.submissions #course').on('loaded',function(){
    jQuery('.tip').tooltip();
});

jQuery( 'body' ).delegate( '.reset_quiz_user', 'click', function(event){
  event.preventDefault();
  var course_id=jQuery(this).attr('data-quiz');
  var user_id=jQuery(this).attr('data-user');
  jQuery(this).addClass('animated spin');
  var $this = jQuery(this);
  $.confirm({
      text: vibe_course_module_strings.quiz_reset,
      confirm: function() {

  $.ajax({
          type: "POST",
          url: ajaxurl,
          data: { action: 'reset_quiz', 
                  security: jQuery('#qsecurity').val(),
                  id: course_id,
                  user: user_id
                },
          cache: false,
          success: function (html) {
              jQuery(this).removeClass('animated');
              jQuery(this).removeClass('spin');
              jQuery('#message').html(html);
              jQuery('#qs'+user_id).fadeOut('fast');
          }
  });
  }, 
   cancel: function() {
        $this.removeClass('animated');
        $this.removeClass('spin');
    },
    confirmButton: vibe_course_module_strings.quiz_rest_button,
    cancelButton: vibe_course_module_strings.cancel
  });
});

jQuery( 'body' ).delegate( '.evaluate_quiz_user', 'click', function(event){
  event.preventDefault();
  var quiz_id=jQuery(this).attr('data-quiz');
  var user_id=jQuery(this).attr('data-user');
  jQuery(this).addClass('animated spin');

  $.ajax({
          type: "POST",
          url: ajaxurl,
          data: { action: 'evaluate_quiz', 
                  security: jQuery('#qsecurity').val(),
                  id: quiz_id,
                  user: user_id
                },
          cache: false,
          success: function (html) {
              jQuery(this).removeClass('animated');
              jQuery(this).removeClass('spin');
              jQuery('.quiz_students').html(html);
              calculate_total_marks();
              jQuery('#total_marks>strong>span').on('click',function(){
                var $this = jQuery(this);jQuery('#set_quiz_marks').remove();
                 jQuery('#total_marks').append('<input type="number" id="set_quiz_marks">');
                 jQuery('#set_quiz_marks').on('blur',function(){
                  var val = jQuery(this).val();
                    $this.text(val);
                    jQuery(this).remove();
                 });
              });
          }
  });
});

jQuery( 'body' ).delegate( '.evaluate_course_user', 'click', function(event){
    event.preventDefault();
    var course_id=jQuery(this).attr('data-course');
    var user_id=jQuery(this).attr('data-user');
    jQuery(this).addClass('animated spin');

    $.ajax({
            type: "POST",
            url: ajaxurl,
            data: { action: 'evaluate_course', 
                    security: jQuery('#security').val(),
                    id: course_id,
                    user: user_id
                  },
            cache: false,
            success: function (html) {
                jQuery(this).removeClass('animated');
                jQuery(this).removeClass('spin');
                jQuery('.course_students').html(html);
                calculate_total_marks();
            }
    });
});



jQuery( 'body' ).delegate( '.reset_answer', 'click', function(event){
       event.preventDefault();
      var ques_id=jQuery('#comment-status').attr('data-quesid');
      var $this = jQuery(this);
      var qid = jQuery('#comment-status').attr('data-quesid');
      $this.prepend('<i class="fa fa-spinner animated spin"></i>');
      $.ajax({
              type: "POST",
              url: ajaxurl,
              data: { action: 'reset_question_answer', 
                      security: $this.attr('data-security'),
                      ques_id: ques_id,
                    },
              cache: false,
              success: function (html) {
                  $this.find('i').remove();
                   jQuery('#comment-status').html(html);
                   jQuery('#ques'+qid).removeClass('done');
                   setTimeout(function(){ $this.addClass('hide');}, 500);
              }
      });
});

jQuery( 'body' ).delegate( '#course_complete', 'click', function(event){
      event.preventDefault();
      var $this=jQuery(this);
      var user_id=$this.attr('data-user');
      var course = $this.attr('data-course');
      var marks = parseInt(jQuery('#course_marks_field').val());
      if(marks <= 0){
        alert('Enter Marks for User');
        return;
      }

      $this.prepend('<i class="fa fa-spinner animated spin"></i>');
      $.ajax({
              type: "POST",
              url: ajaxurl,
              data: { action: 'complete_course_marks', 
                      security: jQuery('#security').val(),
                      course: course,
                      user: user_id,
                      marks:marks
                    },
              cache: false,
              success: function (html) {
                  $this.find('i').remove();
                  $this.html(html);
              }
      });
});

  // Registeration BuddyPress
  jQuery('.register-section h4').click(function(){
      jQuery(this).toggleClass('show');
      jQuery(this).parent().find('.editfield').toggle('fast');
  });

});

jQuery( 'body' ).delegate( '.hide_parent', 'click', function(event){
  jQuery(this).parent().fadeOut('fast');
});


jQuery( 'body' ).delegate( '.give_marks', 'click', function(event){
      event.preventDefault();
      var $this=jQuery(this);
      var ansid=$this.attr('data-ans-id');
      var from_activity = $this.attr('data-from-activity');
      var quiz_id = $this.attr('data-quiz');
      var user_id = $this.attr('data-user');
      var aval = jQuery('#'+ansid).val();
      $this.prepend('<i class="fa fa-spinner animated spin"></i>');
      $.ajax({
              type: "POST",
              url: ajaxurl,
              data: { action: 'give_marks', 
                      //security:
                      //qid:  
                      aid: ansid,
                      aval: aval,
                      from_activity:from_activity,
                      quiz_id:quiz_id,
                      user_id:user_id,
                    },
              cache: false,
              success: function (html) {
                  $this.find('i').remove();
                  $this.html(vibe_course_module_strings.marks_saved);
              }
      });
});

jQuery( 'body' ).delegate( '#mark_complete', 'click', function(event){
    event.preventDefault();
    var $this=jQuery(this);
    var quiz_id=$this.attr('data-quiz');
    var user_id = $this.attr('data-user');
    var marks = parseInt(jQuery('#total_marks strong > span').text());
    $this.prepend('<i class="fa fa-spinner animated spin"></i>');
    var from_activity = $this.attr('data-from-activity');
    tinyMCE.triggerSave();

    $.ajax({
            type: "POST",
            url: ajaxurl,
            data: { action: 'save_quiz_marks', 
                    quiz_id: quiz_id,
                    user_id: user_id,
                    marks: marks,
                    from_activity:from_activity,
                    remarks:jQuery('#quiz_remarks').val()
                  },
            cache: false,
            success: function (html) {
                $this.find('i').remove();
                $this.html(vibe_course_module_strings.quiz_marks_saved);
                if(from_activity && from_activity != 'undefined'){
                  window.location.reload();
                }
            }
    });
});

function calculate_total_marks(){
  jQuery('.question_marks').on('keyup',function(){
      var marks=parseInt(0);
      var $this = jQuery('#total_marks strong > span');
      jQuery('.question_marks').each(function(){
          if(jQuery(this).val())
            marks = marks + parseInt(jQuery(this).val());
        });
      $this.html(marks);
  });
}




 


jQuery( 'body' ).on( 'click','.expand_message',function(event){
  event.preventDefault();
  jQuery('.bulk_message').toggle('slow');
});

jQuery('body').on('click','.expand_change_status',function(event){
    
  event.preventDefault();
  jQuery('.bulk_change_status').toggle('slow');
  jQuery('#status_action').on('change',function(){
      if(jQuery(this).val() === 'finish_course' ){
          jQuery('#finish_marks').removeClass('hide');
      }else{
        jQuery('#finish_marks').addClass('hide');
      }
  });
});

jQuery( 'body' ).on( 'click','.expand_add_students',function(event){
  event.preventDefault();
  jQuery('.bulk_add_students').toggle('slow');
});

jQuery( 'body' ).on( 'click','.expand_assign_students', function(event){
  event.preventDefault();
  jQuery('.bulk_assign_students').toggle('slow');
});

jQuery( 'body' ).on( 'click','.extend_subscription_students', function(event){
  event.preventDefault();
  jQuery('.bulk_extend_subscription_students').toggle('slow');
});


jQuery( 'body' ).delegate( '#send_course_message', 'click', function(event){
    
  event.preventDefault();
  var members=[];

  var $this = jQuery(this);
  var defaultxt=$this.html();
  $this.html('<i class="fa fa-spinner animated spin"></i> '+vibe_course_module_strings.sending_messages);
  var i=0;
  jQuery('.member').each(function(){
    if(jQuery(this).is(':checked')){
      members[i]=jQuery(this).val();
      i++;
    }
  });
  $.ajax({
        type: "POST",
        url: ajaxurl,
        data: { action: 'send_bulk_message',
                security: jQuery('#bulk_action').val(),
                course:$this.attr('data-course'),
                sender: jQuery('#sender').val(),
                all: jQuery('#all_bulk_students:checked').val(),
                members: JSON.stringify(members),
                subject: jQuery('#bulk_subject').val(),
                message: jQuery('#bulk_message').val(),
              },
        cache: false,
        success: function (html) {
            jQuery('#send_course_message').html(html);
            setTimeout(function(){$this.html(defaultxt);}, 5000);
        }
    });    
});

jQuery( 'body' ).delegate( '#add_student_to_course', 'click', function(event){
     
  event.preventDefault();
  var $this = jQuery(this);
  var defaultxt=$this.html();
  var students = jQuery('#student_usernames').val();

  if(students.length <= 0){ 
    jQuery('#add_student_to_course').html(vibe_course_module_strings.unable_add_students);
    setTimeout(function(){$this.html(defaultxt);}, 2000);
    return;
  }

  $this.html('<i class="fa fa-spinner animated spin"></i>'+vibe_course_module_strings.adding_students);
  var i=0;
  $.ajax({
        type: "POST",
        url: ajaxurl,
        data: { action: 'add_bulk_students', 
                security: jQuery('#bulk_action').val(),
                course:$this.attr('data-course'),
                members: students,
              },
        cache: false,
        success: function (html) {
          if(html.length && html !== '0'){
            jQuery('#add_student_to_course').html(vibe_course_module_strings.successfuly_added_students);
            jQuery('ul.course_students').prepend(html);
            jQuery('ul.course_students #message').remove();
          }else{
            jQuery('#add_student_to_course').html(vibe_course_module_strings.unable_add_students);
          }
            jQuery('.selectusers').select2('val', '');
            setTimeout(function(){$this.html(defaultxt);}, 3000);
        }
    });    
});

jQuery( 'body' ).delegate( '#download_stats', 'click', function(event){
      
  event.preventDefault();
  var $this = jQuery(this);
  var defaultxt=$this.html();
  var i=0;
  var fields=[]; 
  jQuery('.field:checked').each(function(){
      fields[i]=jQuery(this).attr('id');//jQuery(this).val();
      i++;
  });
  
  if(i==0){
    $this.html(vibe_course_module_strings.select_fields);
    setTimeout(function(){$this.html(defaultxt);}, 13000);
    return false;
  }else{
    $this.html('<i class="fa fa-spinner animated spin"></i> '+vibe_course_module_strings.processing);
    $.ajax({
        type: "POST",
        url: ajaxurl,
        data: { action: 'download_stats', 
                security: jQuery('#stats_security').val(),
                course:$this.attr('data-course'),
                fields: JSON.stringify(fields),
                type:jQuery('#stats_students').val()
              },
        cache: false,
        success: function (html) {
            $this.attr('href',html);
            $this.attr('id','download');
            $this.html(vibe_course_module_strings.download)
            //setTimeout(function(){$this.html(defaultxt);}, 5000);
        }
    });  
  }
});

jQuery('body').delegate('#download_mod_stats','click',function(event){
      
  event.preventDefault();
  var $this = jQuery(this);
  var defaultxt=$this.html();
  var i=0;
  var fields=[]; 
  jQuery('.field:checked').each(function(){
      fields[i]=jQuery(this).attr('id');//jQuery(this).val();
      i++;
  });
  
  if(i==0){
    $this.html(vibe_course_module_strings.select_fields);
    setTimeout(function(){$this.html(defaultxt);}, 13000);
    return false;
  }else{
    $this.html('<i class="fa fa-spinner animated spin"></i> '+vibe_course_module_strings.processing);
    $.ajax({
        type: "POST",
        url: ajaxurl,
        data: { action: 'download_mod_stats', 
                security: jQuery('#stats_security').val(),
                type:$this.attr('data-type'),
                id:$this.attr('data-id'),
                fields: JSON.stringify(fields),
                select:jQuery('#stats_students').val()
              },
        cache: false,
        success: function (html) {
            $this.attr('href',html);
            $this.attr('id','download');
            $this.html(vibe_course_module_strings.download)
            //setTimeout(function(){$this.html(defaultxt);}, 5000);
        }
    });  
  }
});

jQuery( 'body' ).delegate( '#assign_course_badge_certificate', 'click', function(event){
    
  event.preventDefault();
  var members=[]; 

  var $this = jQuery(this);
  var defaultxt=$this.html();
  $this.html('<i class="fa fa-spinner animated spin"></i> '+vibe_course_module_strings.processing);
  var i=0;
  jQuery('.member').each(function(){
    if(jQuery(this).is(':checked')){
      members[i]=jQuery(this).val();
      i++;
    }
  });

  $.ajax({
        type: "POST",
        url: ajaxurl,
        data: { action: 'assign_badge_certificates', 
                security: jQuery('#bulk_action').val(),
                course: $this.attr('data-course'),
                members: JSON.stringify(members),
                assign_action: jQuery('#assign_action').val(),
              },
        cache: false,
        success: function (html) {
            $this.html(html);
            setTimeout(function(){$this.html(defaultxt);}, 5000);
        }
    });    
});

jQuery( 'body' ).delegate( '#change_course_status', 'click', function(event){
    
  event.preventDefault();
  var members=[]; 

  var $this = jQuery(this);
  var defaultxt=$this.html();
  $this.html('<i class="fa fa-spinner animated spin"></i> '+vibe_course_module_strings.processing);
  var i=0;
  jQuery('.member').each(function(){
    if(jQuery(this).is(':checked')){
      members[i]=jQuery(this).val();
      i++;
    }
  });

  $.ajax({
        type: "POST",
        url: ajaxurl,
        data: { action: 'change_course_status', 
                security: jQuery('#bulk_action').val(),
                course: $this.attr('data-course'),
                members: JSON.stringify(members),
                status_action: jQuery('#status_action').val(),
                data: jQuery('#finish_marks').val()
              },
        cache: false,
        success: function (html) {
            $this.html(html);
            setTimeout(function(){$this.html(defaultxt);}, 5000);
        }
    });    
});


jQuery( 'body' ).delegate( '#extend_course_subscription', 'click', function(event){
    
  event.preventDefault();
  var members=[];

  var $this = jQuery(this);
  var defaultxt=$this.html();
  $this.html('<i class="fa fa-spinner animated spin"></i> '+vibe_course_module_strings.processing);
  var i=0;
  jQuery('.member').each(function(){
    if(jQuery(this).is(':checked')){
      members[i]=jQuery(this).val();
      i++;
    }
  });

  $.ajax({
        type: "POST",
        url: ajaxurl,
        data: { action: 'extend_course_subscription', 
                security: jQuery('#bulk_action').val(),
                course: $this.attr('data-course'),
                members: JSON.stringify(members),
                extend_amount: jQuery('#extend_amount').val(),
              },
        cache: false,
        success: function (html) {
            $this.html(html);
            setTimeout(function(){$this.html(defaultxt);}, 5000);
        }
    });    
});


  

jQuery(document).ready(function($){
  jQuery('.showhide_indetails').click(function(event){
    event.preventDefault();
    jQuery(this).find('i').toggleClass('icon-minus');
    jQuery(this).parent().find('.in_details').toggle();
  });

jQuery('.ajax-certificate').each(function(){
    var $this = jQuery(this);
    var certificate_url = '#';
    if(window.wplms_pdf_certificates && window.wplms_pdf_certificates[parseInt($this.attr('data-course'))]){
        certificate_url = window.wplms_pdf_certificates[parseInt($this.attr('data-course'))];
    }

    if($this.hasClass('certificate_image')){

      
      $this.magnificPopup({
          type: 'image',
          gallery: {enabled: true},
          closeOnContentClick: false,
          closeBtnInside: false,
          fixedContentPos: true,
          mainClass: 'mfp-no-margins mfp-with-zoom', 
          image: {
            verticalFit: true,
            cursor: 'mfp-zoom-out-cur',
            markup: '<div class="mfp-figure">'+
            '<div class="mfp-close"></div>'+
            '<div id="certificate">'+
            '<div class="extra_buttons">'+
            '<a href="#" class="certificate_close"><i class="fa fa-times"></i></a>'+
            '<a href="#" class="certificate_print"><i class="fa fa-print"></i></a>'+
            '<a href="'+certificate_url+'" class="certificate_pdf"><i class="fa fa-file-pdf-o"></i></a>'+
            '<a href="#" class="certificate_download"><i class="fa fa-download"></i></a>'+
            '<a href="https://www.facebook.com/share.php?u='+jQuery(this).attr('href')+'" target="_blank"><i class="fa fa-facebook"></i></a>'+
            '<a href="https://twitter.com/share?url='+jQuery(this).attr('href')+'" target="_blank"><i class="fa fa-twitter"></i></a>'+
            '<a href="https://www.linkedin.com/shareArticle?mini=true&url='+jQuery(this).attr('href')+'" target="_blank"><i class="fa fa-linkedin"></i></a>'+
            '</div>'+
            '<div id="certificate_image" class="mfp-img"></div>'+
            '<div class="mfp-bottom-bar">'+
              '<div class="mfp-title"></div>'+
              '<div class="mfp-counter"></div>'+
            '</div>'+
            '</div>'+
          '</div>', 
          },
          callbacks: {
            open : function (){
              jQuery('.extra_buttons').show();
              var mp = $.magnificPopup.instance;
              var img = new Image();
              img.onload = function() {
                var canvas = document.createElement("canvas");
                canvas.width = this.width;
                canvas.height = this.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var dataURL = canvas.toDataURL("image/jpeg");

                jQuery('.certificate_pdf').click(function(){
                  if(jQuery(this).attr('href').length <= 1){
                    var doc = new jsPDF();
                    doc.addImage(dataURL, 'JPEG',0,0, this.width,this.height);
                    doc.save('certificate.pdf');
                  }
                });
              }
              img.src = $this.attr('href');

              
            }
          }
      });
    }else if($this.hasClass('pdf_view')){
      $this.attr('target','_blank');
    }else{

      $this.magnificPopup({
          type: 'ajax',
          fixedContentPos: true,
          alignTop:false,
          preloader: false,
          midClick: true,
          removalDelay: 300,
          showCloseBtn:false,
          mainClass: 'mfp-with-zoom',
          callbacks: {
            parseAjax: function( mfpResponse ) {
              mfpResponse.data = jQuery(mfpResponse.data).find('#certificate');
            },
            ajaxContentAdded: function() {
              var node = jQuery('#certificate');
              if(jQuery('#certificate').find('.certificate.type-certificate').length){
                node = jQuery('#certificate .certificate.type-certificate');
              }
              if(jQuery('#certificate .certificate_content').attr('data-width').length){
                var certificate_width = jQuery('#certificate .certificate_content').attr('data-width');
                var fullwidth = jQuery(window).width();
                var ratio = fullwidth/certificate_width;
                if(ratio >= 1){ratio = 1;}else{
                  ratio=ratio-0.1;
                  jQuery('section#certificate').removeAttr('style');
                  jQuery('section#certificate').css('overflow','hidden');
                  jQuery('section#certificate').css('transform','scale('+ratio+')');
                  node = jQuery('section#certificate');
                  node.removeAttr('style');
                }
                
              }
              
                if(!jQuery('section#certificate').hasClass('stopscreenshot')){
                    jQuery('.extra_buttons').hide();
                    html2canvas(node, {
                        backgrounnd:'#ffffff',
                        onrendered: function(canvas) {
                            node.find('#certificate .certificate_content').removeAttr('style');
                            var data = canvas.toDataURL("image/jpeg");
                            if(ratio >= 1){
                                jQuery('#certificate .certificate_content').html('<img src="'+data+'" width="'+jQuery('#certificate .certificate_content').attr('data-width')+'" height="'+jQuery('#certificate .certificate_content').attr('data-height')+'" />');
                            }else{
                                jQuery('#certificate .certificate_content').html('<img src="'+data+'" />');
                            }
                            jQuery('#certificate').trigger('generate_certificate');
                            
                            if(certificate_url.length > 1){
                                  jQuery('.certificate_pdf').attr('href',certificate_url);
                                  jQuery('.certificate_print').attr('href',certificate_url);
                                  jQuery('.certificate_print').removeClass('certificate_print');
                                }  
                            jQuery('.certificate_pdf').click(function(){

                                if(certificate_url.length <= 1){
                                  
                                  var doc = new jsPDF();
                                  var width = 210;
                                  var height = 80;
                                  if(jQuery('#certificate .certificate_content').attr('data-width').length){
                                      height = Math.round(210*parseInt(jQuery('#certificate .certificate_content').attr('data-height'))/parseInt(jQuery('#certificate .certificate_content').attr('data-width')));
                                  }
                                  doc.addImage(data, 'JPEG',0,0, 210,height);
                                  doc.save('certificate.pdf');
                                }
                            });
                            if($this.hasClass('regenerate_certificate')){
                              $.ajax({
                                type: "POST",
                                url: ajaxurl,
                                data: { action: 'save_certificate_image', 
                                        image:data,
                                        security: $this.attr('data-security'),
                                        user_id:$this.attr('data-user'),
                                        course_id:$this.attr('data-course')
                                      },
                                cache: false,
                                success: function(html){
                                  console.log(html);
                                  jQuery('body').find('.certificate_download').attr('data-url',html);
                                  jQuery('.extra_buttons').show();
                                }
                              });
                            }
                        }
                    });
                }else{
                    jQuery('.extra_buttons').show();
                    
                    if(certificate_url.length > 1){
                      jQuery('.certificate_pdf').attr('href',certificate_url);
                    }
                }
            },
          }
      });
    }
});
});
jQuery('.ajax-badge').each(function(){
    
  var $this=jQuery(this);
  var img=$this.find('img');
  jQuery(this).magnificPopup({
        items: {
            src: '<div class="badge-popup"><img src="'+img.attr('src')+'" /><h3>'+$this.attr('title')+'</h3><strong>'+vibe_course_module_strings.for_course+' '+$this.attr('data-course')+'</strong></div>',
            type: 'inline'
        },
        fixedContentPos: false,
        alignTop:false,
        preloader: false,
        midClick: true,
        removalDelay: 300,
        showCloseBtn:false,
        mainClass: 'mfp-with-zoom center-aligned'
    });
});

jQuery( 'body' ).delegate( '.print_unit', 'click', function(event){
    jQuery('.unit_content').print();
});

jQuery( 'body' ).delegate( '.printthis', 'click', function(event){
    jQuery(this).parent().print();
});

jQuery( 'body' ).delegate( '#certificate', 'generate_certificate', function(event){
    jQuery(this).addClass('certificate_generated');
});

function PrintElem(elem){
    Popup(jQuery(elem).html());
}

function Popup(data) {
    var mywindow = window.open('', 'my div', 'height=800,width=1000');

    mywindow.document.head.innerHTML = '<title>PressReleases</title><link rel="stylesheet" href="css/main.css" type="text/css" />'; 
    mywindow.document.body.innerHTML = '<body>' + data + '</body>'; 

    mywindow.document.close();
    mywindow.focus(); // necessary for IE >= 10
    mywindow.print();
    mywindow.close();

    return true;
}
jQuery( 'body' ).delegate( '.certificate_print', 'click', function(event){
    event.preventDefault();
    PrintElem('#certificate');
});
jQuery( 'body' ).delegate( '.certificate_download', 'click', function(event){
     
    event.preventDefault();
    var $this = jQuery(this);
    if(jQuery(this).data('url')){
        var img = jQuery(this).data('url');
        imgWindow = window.open(img, 'imgWindow');
    }else{
        var img = jQuery('#certificate img').attr('src');
        imgWindow = window.open(img, 'imgWindow');
    }
});
jQuery( 'body' ).delegate( '.certificate_close', 'click', function(event){
    event.preventDefault();
    $.magnificPopup.close();
});
jQuery('body').delegate('.pricing_course .drop label','click',function(){
  var labelText = jQuery(this).find('.font-text').html();
   var value = jQuery(this).attr('data-value');
   var parent = jQuery(this).parent().parent();
   jQuery(parent).find('.result').html(labelText);
  if(jQuery('.course_button').length){
    jQuery('.course_button').attr('href',value);
  }
});

jQuery('body').delegate('.pricing_course .result','click',function() {
var parent = jQuery(this).parent();
  jQuery(parent).find('.drop').slideToggle('fast');
});

jQuery('body').delegate('.pricing_course .drop','click',function() {
  var parent = jQuery(this).parent();
  jQuery(parent).find('.drop').slideUp('fast');
});

jQuery(document).ready(function($){
    
    //for sub section processing based on " -- " in the start of a section 

    if(jQuery('.course_curriculum') && jQuery('.course_curriculum').length){
      jQuery('.course_curriculum').each(function (){
        var curriculum = jQuery(this);
        curriculum.find('.course_section').each(function (){
          var section = jQuery(this);
          var check = section.find('td').text().split('--');
          if(check && check.length > 1){
            section.find('td').text(check[1]);
            section.addClass('sub_section');
            section.nextUntil('.course_section').addClass('sub_unit');
          }
        });
      });
      
    }



    if(jQuery('.course_timeline') && jQuery('.course_timeline').length){
      jQuery('.course_timeline').each(function (){
        var curriculum = jQuery(this);
        curriculum.find('.section').each(function (){
          var section = jQuery(this);
          var check = section.find('h4').text().split('--');
          if(check && check.length > 1){
            section.find('h4').text(check[1]);
            section.addClass('sub_section');
            section.nextUntil('.section').addClass('sub_unit');
          }
        });
      });
      
    }

    
   jQuery('.course_curriculum.accordion .course_section:not(.sub_section)').click(function(event){
        jQuery(this).toggleClass('show');
        jQuery(this).nextUntil('.course_section:not(.sub_section)','.unit_description').hide(100);
        jQuery(this).nextUntil('.course_section:not(.sub_section)','.course_lesson:not(.sub_unit),.sub_section').toggleClass('show');
        if(!jQuery(this).hasClass('show')){
          jQuery(this).nextUntil('.course_section:not(.sub_section)','.sub_unit,.sub_section').removeClass('show');
          jQuery(this).nextUntil('.course_section:not(.sub_section)','.sub_unit,.sub_section').removeClass('sub_show');
        }
   });

   jQuery('.course_curriculum.accordion .course_section.sub_section').click(function(event){
        jQuery(this).toggleClass('sub_show');
        jQuery(this).nextUntil('.sub_section','.unit_description').hide(100);
        jQuery(this).nextUntil('.sub_section','.sub_unit').toggleClass('show');
   });

   jQuery('.course_curriculum.accordion .course_section').first().trigger('click');

   jQuery('.unit_description_expander').each(function(){
      var course_lesson = jQuery(this).closest('.course_lesson');
      if(!course_lesson.next('.unit_description').length){
        jQuery(this).remove();
      }else{
        jQuery(this).on('click',function(){
          course_lesson.next('.unit_description').toggle(200);
        });
      }
      
   });
    jQuery('.course_timeline.accordion .section:not(.sub_section)').on('click',function(event){
      jQuery(this).toggleClass('show');
      jQuery(this).nextUntil('.section:not(.sub_section)','.unit_line:not(.sub_unit),.sub_section').toggleClass('show');
      if(!jQuery(this).hasClass('show')){
        jQuery(this).nextUntil('.section:not(.sub_section)','.sub_unit,.sub_section').removeClass('show');
        jQuery(this).nextUntil('.section:not(.sub_section)','.sub_unit,.sub_section').removeClass('sub_show');
      }
    });

   jQuery('.course_timeline.accordion .section.sub_section').on('click',function(event){
     jQuery(this).toggleClass('sub_show');
     jQuery(this).nextUntil('.sub_section','.sub_unit').toggleClass('show');
   });

   
    jQuery('.course_timeline.accordion').each(function(){
      var $this = jQuery(this);

      var prevSections = $this.find('.unit_line.active').prevUntil('.section');
      prevSections.prev().trigger('click');
    });

   
    jQuery('body').delegate('.retake_submit','click',function(){
        var $this = jQuery(this);
          $.confirm({
            text: vibe_course_module_strings.confirm_course_retake,
            confirm: function() {
              $this.parent().submit();
            },
            cancel: function() {
            },
            confirmButton: vibe_course_module_strings.confirm,
            cancelButton: vibe_course_module_strings.cancel
          });
    });

  

});


  
  

  

/*== COURSE LIVE SEARCH ==*/
jQuery('#course_user_ajax_search_results').each(function(){
    var xhr;
    var $this = jQuery(this);
    var view = 0;
    if(jQuery('body').hasClass('admin')){view='admin';}
    jQuery('#active_status,#course_status').on('change',function(event){
        var value = jQuery(this).val();
        jQuery('ul.course_students').addClass('loading');
        xhr = $.ajax({
            type: "POST",
            url: ajaxurl,
            data: { action: 'search_course_members', 
                    security: jQuery('#bulk_action').val(),
                    active_status:jQuery('#active_status').val(),
                    course_status:jQuery('#course_status').val(),
                    s: jQuery('#search_course_member input').val(),
                    course_id: jQuery('#course_user_ajax_search_results').attr('data-id'),
                    view: view
                  },
            cache: false,
            success: function (html) {
                jQuery('ul.course_students').removeClass('loading');
                jQuery('ul.course_students').html(html);
            }
        });
    });
    
    jQuery('#search_course_member input').on('keyup',function(event){
        var value = jQuery(this).val();
        if(xhr && xhr.readyState != 4){
            xhr.abort();
        }
        if(value.length >= 4){
            $this.addClass('loading');
            jQuery('ul.course_students').addClass('loading');
            xhr = $.ajax({
                type: "POST",
                url: ajaxurl,
                data: { action: 'search_course_members', 
                      security: jQuery('#bulk_action').val(),
                      active_status:jQuery('#active_status').val(),
                      course_status:jQuery('#course_status').val(),
                      s: jQuery('#search_course_member input').val(),
                      course_id: jQuery('#course_user_ajax_search_results').attr('data-id'),
                      view: view
                    },
                cache: false,
                success: function (html) {
                    jQuery('ul.course_students').removeClass('loading');
                    $this.removeClass('loading');
                    jQuery('ul.course_students').html(html);
                }
            });
        }
    }); 
    jQuery('#search_course_member input').on('blur',function(event){
        var value = jQuery(this).val();
        jQuery('ul.course_students').addClass('loading');
        xhr = $.ajax({
            type: "POST",
            url: ajaxurl,
            data: { action: 'search_course_members', 
                    security: jQuery('#bulk_action').val(),
                    active_status:jQuery('#active_status').val(),
                    course_status:jQuery('#course_status').val(),
                    s: jQuery('#search_course_member input').val(),
                    course_id: jQuery('#course_user_ajax_search_results').attr('data-id'),
                    view: view
                  },
            cache: false,
            success: function (html) {
                jQuery('ul.course_students').removeClass('loading');
                jQuery('ul.course_students').html(html);
            }
        });
    });
});

jQuery('body').on('click','.course_admin_paged',function(){
    jQuery('ul.course_students').addClass('loading');
    var view = '';
    if(jQuery('body').hasClass('admin')){view='admin';}
    $.ajax({
        type: "POST",
        url: ajaxurl,
        data: { action: 'search_course_members', 
                security: jQuery('#bulk_action').val(),
                active_status:jQuery('#active_status').val(),
                course_status:jQuery('#course_status').val(),
                s: jQuery('#search_course_member input').val(),
                page:jQuery(this).text(),
                course_id: jQuery('#course_user_ajax_search_results').attr('data-id'),
                view: view
              },
        cache: false,
        success: function (html) {
            jQuery('ul.course_students').removeClass('loading');
            jQuery('ul.course_students').html(html);
        }
    });
});
jQuery(document).ready(function(){
  jQuery('#applications ul li span').on('click',function(){
    console.log('###');
    var $this = jQuery(this);
    var action = 'reject';
    if($this.hasClass('approve')){
      action = 'approve';
    }
    $this.addClass('loading');
      jQuery.ajax({
          type: "POST",
          url: ajaxurl,
          data: { action: 'manage_user_application',
                  act:action,
                  security: $this.parent().attr('data-security'),
                  user_id:$this.parent().attr('data-id'),
                  course_id:$this.parent().attr('data-course'),
                },
          cache: false,
          success: function (html) {
              $this.removeClass('loading');
              $this.addClass('active');
              setTimeout(function(){$this.parent().remove(); }, 1000);
          }
      });
  });
});



