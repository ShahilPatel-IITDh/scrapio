
//<![CDATA[
$(document).ready( function() {
    $( '#global-message .msg-success' ).fadeIn( 'slow', function() {      
        if ( localStorage.getItem('msg-stay') ) {
            localStorage.removeItem('msg-stay')
            return;
        }
        $( this ).delay( 2000 ).fadeOut( 'slow' );
    });
    $( '#global-message .msg-info' ).fadeIn( 'slow', function() {      
        if ( $( this ).find( 'p.msg-stay' ).size() )
            return;
        $( this ).delay( 5000 ).fadeOut( 'slow' );
    });
    $( document ).on( 'click', '.list-pop_trigger', function (e) {
      $(this).modelessDialog({
        container: '.list-pop',
        content: '.list-pop_content'
      });

          e.preventDefault();
    });

    $( 'input' ).placeholder();
    $( 'a.poplight' ).click( open_modal_window );
    $( document ).on( 'click', 'a.close, #fade', function( e ) {
        var target = document.elementFromPoint( e.clientX, e.clientY );
        if ( ( $( this ).is( 'a.close' ) )
          || ( target.id == 'fade' ) )
        {
            if (typeof window.onFadeClick == 'function'
                && (!$(this).is('a.close')))
            {
              var res = window.onFadeClick(e);
              if (!res)
                return;
              window.onFadeClick = undefined;
            }
            close_modal_window( e );
                if ( typeof ga != 'undefined' )
                ga('send', 'pageview', location.pathname);
            if ( 'undefined' !== typeof dataLayer )
                dataLayer.push({'gapath':location.pathname});
            }
    } );
    
  const params = ['login', 'to', 'checkout', 'mytickets', 'eid', 'orig_req_url'];
  window.onload = function () {
    localStorage.removeItem('__signin_token');
    params.forEach(element => localStorage.removeItem('__param_'+element) );
    const landing = '';
    if ( landing )
      window.location.href = landing;

    var standalone = window.navigator.standalone,
  userAgent = window.navigator.userAgent.toLowerCase(),
  safari = /safari/.test(userAgent),
  ios = /iphone|ipod|ipad/.test(userAgent),
  hasVersion = /safari\/\d+/.test(userAgent);

const wvErrorMessage = 'You seem to be using an unsupported browser. If you experience any problems, we recommend to use a supported browser such as Google Chrome.';
if (ios) {
  if ( !standalone && ( !safari || ( safari && !hasVersion ) ) ) {
    // iOS webview
    add_global_message( wvErrorMessage );
  }
} else {
  if (userAgent.includes('wv')) {
    add_global_message( wvErrorMessage );
  }
};
  };

  $.fn.getRandomTokenStr = function( length ) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for ( var i = 0; i < length; i++ ) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

  $("#sns-form").submit(function(e) {
    clear_global_messages(0);

    const token = $.fn.getRandomTokenStr(40);
    localStorage.setItem('__signin_token', token );
    $('input[name=signin_token]').val(token);

    // Which signin button was clicked?
    // If not Apple, submit form now
    const clicked = $(document.activeElement).val();
    if ( clicked !== 'Apple' )
      return;

    params.forEach(element => {
      if ( $('input[name='+element+']') ) {
        let val = $('input[name='+element+']').val();
        if (typeof val !== 'undefined' && val !== null && val !== '' && val != 'undefined'){
          if ( element == 'to' )
            val = encodeURIComponent(val);
          localStorage.setItem('__param_'+element, val);
        }
      }
    } );
    // Store original req url
    const orig_req_url = "https://peatix.com/signin?to=https%3A%2F%2Fpeatix.com%2Fuser%2F2262440%2Fpod_payout_details%2F57083%2F2021-12&login=1";
    if ( orig_req_url )
      localStorage.setItem('__param_orig_req_url', orig_req_url);

  });

email_alert();
$( '#signin-form' ).validate( {
  onkeyup: false,
  focusCleanup: true,
  invalidHandler: function () {
    clear_global_messages(0);
  },
  rules: {
    username: {
      required: true,
      email: true
    }
  },
  messages: {
    username: {
      required: 'Please enter your email address',
      email:  'Please enter a valid email address.'
    }
  }
} );

  $( '#next-button' ).click( function( e ) {
    clear_global_messages(0);
    $('#signin-form').validate();
    if ( !$('#signin-form').valid() ) {
      e.preventDefault();
      return;
    }

    var original = $( this ).html();
    $( this )
      .addClass( 'loading' )
      .html( '<i class="loader small"></i>Verifying email...' )

    var that = $( this );
    var formData = new FormData($('#signin-form')[0]);

    $.ajax( {
      type: 'POST',
      url: 'https://peatix.com/user/forgot_password',
      data: formData,
      processData: false,  // tell jQuery not to process the data
      contentType: false,  // tell jQuery not to set contentType
      success: function( response, status ) {
        // Error
        if ( response.json_data.user_messages ) {
          if ( response.json_data.user_messages.error ) {
            add_global_message( response.json_data.user_messages.error );
            that.removeClass( 'loading' ).html( original );
            return;
          }
        }
        // Submit form then
        // proceed to user/signin to enter password
        $('#signin-form')[0].submit();
      },
      error: function ( xhr, response, status ) {
        add_global_message( xhr.responseText );
      },
      dataType: 'json'
    } );
    e.preventDefault();
    return;
  });

if (location.hash == '#entries') {
  $( '#register-text' ).hide();
}

if (localStorage.getItem('likeBtn')) {
  add_global_message('Log in or register and we will remind you to grab a ticket before they are all gone!', 'success');
}


    if ( !legacy_ie() ) {
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '133305523404320',
                xfbml      : true,
                status     : true,
                cookie     : true,
                version    : 'v2.11'
            });

            if ( $('.fb-comments').length ) {
                FB.Event.subscribe('xfbml.render', function() {
                    $('.fb-comments').trigger('hasFinishedLoading');
                });
            }
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
    if ( !legacy_ie() ) {
        $( window ).bind( 'message', function( e ) {
            if ( 'string' !== typeof e.originalEvent.data ) return;
            var msg_args = e.originalEvent.data.split( /::/ );
            if ( msg_args[0] == 'resize_iframe' )
                resize_iframe( msg_args[1], msg_args[2] );
            else if ( msg_args[0] == 'update_ga' && ga ) {
                ga('send', 'pageview', msg_args[1]);
                if ( 'undefined' !== typeof dataLayer )
                    dataLayer.push({'gapath':msg_args[1]});
            }
            else if ( msg_args[0] == 'restore_top' ) {
                e.originalEvent.source.postMessage( 'top_restored::' + msg_args[1], msg_args[2] );
            }
            else if ( msg_args[0] == 'popup_ready' )
                exec_for( msg_args[1] );
            else if ( msg_args[0] == 'popup_to_top' )
                $( '#fade' ).scrollTop( 0 );
        } );
    }
} );
//]]>
