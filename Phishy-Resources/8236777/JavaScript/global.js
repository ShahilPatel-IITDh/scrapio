$(function() {
  
  ocdw_form_builder_action();
});

function ocdw_form_builder_action() {
  $('.ocdw_form_builder-call-static-button, .ocdw_form_builder-call-float-button, .ocdw_form_builder-sidebar').remove();
  
  let display_type_1 = location.hash.match(/#ocdw_form_builder_popup_[0-9]/),
      display_type_3 = location.hash.match(/#ocdw_form_builder_sidebar_[0-9]/);
  
  $.ajax({
    type: 'post',
    url: 'index.php?route=extension/ocdevwizard/form_builder/get_forms',
    dataType: 'json',
    success: function (json) {
      $('button.ocdw_form_builder-call-static-button,button.ocdw_form_builder-call-static-button,button.ocdw_form_builder-call-static-before,button.ocdw_form_builder-call-static-after').remove();
      
      $.each(json['forms'], function (i, form) {
        if (form['display_type'] == 1 || form['display_type'] == 3) {
          $.each(form['insert_target'], function (i, selector) {
            if (form['popup_button_type'] == 1) {
              var btn_html = '<button type="button" class="' + form['button_class'] + ' ocdw_form_builder-call-static-button" onclick="ocdw_form_builder_open({a:this,b:\'' + form['form_id'] + '\',c:\'' + form['display_type'] + '\'})">' + (form['icon'] ? '<img src="' + form['icon'] + '" alt=""/>' : form['call_button']) + '</button>';
              
              if (form['location'] == 1) {
                $(selector).before(btn_html);
              } else if (form['location'] == 2) {
                $(selector).prepend(btn_html);
              } else if (form['location'] == 3) {
                $(selector).append(btn_html);
              } else {
                $(selector).after(btn_html);
              }
            } else if (form['popup_button_type'] == 2) {
              $('body').append('<button type="button" id="' + form['float_button_id_selector'] + '" class="ocdw_form_builder-call-float-button" onclick="ocdw_form_builder_open({a:this,b:\'' + form['form_id'] + '\',c:\'' + form['display_type'] + '\'})">' + (form['icon'] ? '<img src="' + form['icon'] + '" alt=""/>' : form['call_button']) + '</button>');
            }
            
            if (form['display_type'] == 1) {
              if (form['open_from_url_status'] == 1) {
                $(document).on('click', 'a[href*=\'#ocdw_form_builder_popup\']', function(e) {
                  e.preventDefault();
                  
                  let element = $(this).attr('href'),
                      form_id = element.match(/\d+/)[0];
                  
                  if (form_id) {
                    let display_type_1 = element.match(/#ocdw_form_builder_popup_[0-9]/);
                
                    if (display_type_1 !== null) {
                      ocdw_form_builder_open({b:form_id,c:'1'});
                    }
                  }
                });
              }
              
              if (form['open_from_url_hash_status'] == 1) {
                if (display_type_1 !== null) {
                  let form_id = display_type_1[0].match(/\d+/)[0];
                  
                  if (form_id == form['form_id']) {
                    ocdw_form_builder_open({b:form_id,c:'1'});
                  }
                }
              }
            }
            
            if (form['display_type'] == 3) {
              var sidebar_position = (form['sidebar_type'] == 1) ? 'left' : 'right';
              
              $('body').prepend('<div id="ocdw_form_builder-sidebar-' + form['form_id'] + '" class="ocdw_form_builder-sidebar sidebar-' + sidebar_position + ' no-active"><div class="ocdw_form_builder-sidebar-bg"></div><div class="ocdw_form_builder-sidebar-body"></div></div>');
              
              if (form['open_from_url_status'] == 1) {
                $(document).on('click', 'a[href*=\'#ocdw_form_builder_sidebar\']', function (e) {
                  e.preventDefault();
    
                  let element = $(this).attr('href'),
                    form_id = element.match(/\d+/)[0];
    
                  if (form_id) {
                    let display_type_3 = element.match(/#ocdw_form_builder_sidebar_[0-9]/);
      
                    if (display_type_3 !== null) {
                      ocdw_form_builder_open({b:form_id,c:'3'});
                    }
                  }
                });
              }
              
              if (form['open_from_url_hash_status'] == 1) {
                if (display_type_3 !== null) {
                  let form_id = display_type_3[0].match(/\d+/)[0];
    
                  if (form_id == form['form_id']) {
                    if ($('#ocdw_form_builder-sidebar-' + form['form_id']).length) {
                      setTimeout(function () {
                        ocdw_form_builder_open({b:form_id,c:'3'});
                      }, 100);
                    }
                  }
                }
              }
            }
          });
        }
      });
    }
  });
}

function ocdw_form_builder_sidebar_close(form_id) {
  $('body, #ocdw_form_builder-sidebar-'+form_id).removeClass('sidebar-active');
  
  let display_type_3 = location.hash.match(/#ocdw_form_builder_sidebar_[0-9]/);

  if (display_type_3 !== null) {
    window.history.replaceState('', document.title, window.location.href.replace(display_type_3[0], ''))
  }
}

function ocdw_form_builder_open(options) {
  var element = options.a || '',
      form_id = options.b || '',
      display_type = options.c || '',
      // product_id = options.d || '',
      popup_button_type = options.e || '',
      popup_background_type = 1,
      popup_animation_type = '0',
      post_data = {'form_id':form_id,'display_type':display_type};

  ocdw_form_builder_load_js('catalog/view/javascript/ocdevwizard/form_builder/main.js', 'form_builder-main',function() {
    if (display_type == 1) {
      ocdw_form_builder_load_css('catalog/view/javascript/ocdevwizard/helper/magnific-popup/magnific-popup.min.css', 'helper-magnific',function() {
        ocdw_form_builder_load_js('catalog/view/javascript/ocdevwizard/helper/magnific-popup/jquery.magnific-popup.min.js', 'helper-magnific',function() {
          $.magnificPopup.open({
            tLoading: '<div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>',
            items: {src:'index.php?route=extension/ocdevwizard/form_builder'},
            type: 'ajax',
            ajax: {
              settings: {
                type: 'post',
                data: post_data
              }
            },
            closeOnContentClick: 0,
            closeOnBgClick: 1,
            closeBtnInside: 1,
            enableEscapeKey: 1,
            alignTop: 0,
            showCloseBtn: 0,
            removalDelay: (popup_animation_type) ? 300 : 0,
            mainClass: popup_animation_type,
            callbacks: {
              beforeOpen: function() {
                this.wrap.removeAttr('tabindex');
              },
              open: function() {
                $('.mfp-content').addClass('mfp-with-anim');
                $('.mfp-container').removeClass('mfp-ajax-holder').addClass('mfp-iframe-holder');
              },
              close: function() {
                let display_type_1 = location.hash.match(/#ocdw_form_builder_popup_[0-9]/),
                    display_type_3 = location.hash.match(/#ocdw_form_builder_sidebar_[0-9]/);
          
                if (display_type_1 !== null) {
                  window.history.replaceState('', document.title, window.location.href.replace(display_type_1[0], ''))
                } else if (display_type_3 !== null) {
                  window.history.replaceState('', document.title, window.location.href.replace(display_type_3[0], ''))
                }
              }
            }
          });
      
          $('.spinner > div').css({
            'background-color': '#ffffff'
          });
      
          $('.mfp-bg').css({
            'background': (popup_background_type == 1) ? 'url(image/catalog/ocdevwizard/form_builder/background/bg_7.png)' : '#000000',
            'opacity': '0.8'
          });
        });
      });
    } else {
      $.ajax({
        type: 'post',
        url: 'index.php?route=extension/ocdevwizard/form_builder',
        data: post_data,
        dataType: 'html',
        beforeSend: function() {
          $(element).prop('disabled', true);
        },
        complete: function() {
          $(element).prop('disabled', false);
        },
        success: function(data) {
          $('body').addClass('sidebar-active');
  
          $('#ocdw_form_builder-sidebar-'+form_id+' .ocdw_form_builder-sidebar-bg').css({
            'background': (popup_background_type == 1) ? 'url(image/catalog/ocdevwizard/form_builder/background/bg_7.png)' : '#000000'
          });
  
          $('#ocdw_form_builder-sidebar-'+form_id+' .ocdw_form_builder-sidebar-body').html(data);
          $('#ocdw_form_builder-sidebar-'+form_id).addClass('sidebar-active');
        }
      });
    }
  });
}

function ocdw_form_builder_load_js(src, src_type, callback) {
  var element = ((document.getElementById(src_type+'-js')) ? true:false);

  if (!element) {
    var s = document.createElement('script');
    
    s.src = src;
    s.id = src_type+'-js';
    s.onreadystatechange = s.onload = function () {
      var state = s.readyState;
      if (!callback.done && (!state || /loaded|complete/.test(state))) {
        callback.done = true;
        callback();
      }
    };
    
    document.getElementsByTagName('head')[0].appendChild(s);
  } else {
    callback.done = true;
    callback();
  }
}

function ocdw_form_builder_load_css(src, src_type, callback) {
  var element = ((document.getElementById(src_type+'-css')) ? true:false);

  if (!element) {
    var s = document.createElement('link');
    
    s.rel = 'stylesheet';
    s.type = 'text/css';
    s.href = src;
    s.id = src_type+'-css';
    s.onreadystatechange = s.onload = function () {
      var state = s.readyState;
      if (!callback.done && (!state || /loaded|complete/.test(state))) {
        callback.done = true;
        callback();
      }
    };
    
    document.getElementsByTagName('head')[0].appendChild(s);
  } else {
    callback.done = true;
    callback();
  }
}