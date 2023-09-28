
var grecaptcha_validated = false;
var grecaptcha_active    = false;
var grecaptcha_loaded    = false;



(function($) {
        
        // This will run once registration form submitted and captcha verified
        function onRegSubmit(code) {
                
                grecaptcha_validated = true;	
                jQuery('#wpas_form_registration .wpas-btn[type=submit]').prop('disabled', false ).trigger('click');

        }
        
        window.onRegSubmit = onRegSubmit;

        // Check if captcha is loaded
        function check_recaptcha_loaded() {
                if( 0 === $('.g-recaptcha #g-recaptcha-response').length ) {
                        setTimeout( check_recaptcha_loaded , 500 );
                } else {
                        $('.g-recaptcha iframe').get(0).onload = function() {
                                grecaptcha_loaded = true;
                                $('.g-recaptcha').trigger('loaded');
                        }
                }
        }

        // Fix some css once captcha loaded with error message
        function onCaptchaLoaded() {
                if($('.g-recaptcha .grecaptcha-user-facing-error').length > 0) {
                        $('.g-recaptcha .grecaptcha-user-facing-error').remove();
                        $('.g-recaptcha .grecaptcha-badge').css('width', '300px');
                        $('.g-recaptcha iframe').css('width', '306px');
                }
        }

        // Init captcha verification once registration form submitted
        function onRegFormSubmit(e) {
                if( !grecaptcha_validated ) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        grecaptcha.execute();
                        return false;
                }

                return true;
        }
        
        
        /**
         * Check if element have a attribute
         * 
         * @param string name
         * @returns Boolean
         */
        $.fn.hasAttr = function(name) {  
                return this.attr(name) !== undefined;
        };
        
        $(function() {
                // Check if captcha is active
                grecaptcha_active = $('.g-recaptcha').length > 0 ? true : false
                
                // check if captcha is loaded
                if( grecaptcha_active ) {
                        check_recaptcha_loaded();
                        $('.g-recaptcha').on('loaded', onCaptchaLoaded );
                        $('#wpas_form_registration').on('submit', onRegFormSubmit );
                }
                
                
                /**
                 * Load add/edit email notification form once email card expanded
                 */
                $('body').delegate('.card', 'card_expanded', function( e ) {
                        var card = $(this);
                        
                        
                        var email = card.data( 'email' );
                        var user_notification = card.data( 'user_notification' );
                        var item_id = card.data( 'item_id' );

                        var template = wp.template( 'wpas-notification-add-item' );
                        
                        var type = item_id ? 'edit' : 'add';

                        var el = template( { 
                                item_id : item_id,
                                email : email, 
                                user_notification : user_notification, 
                                can_delete : card.data('can_delete'),
                                type : type
                        } );
                        

                        $(this).find('.card_expanded_inner').append( $(el) );
                });
                
                /**
                 * Clear add/edit email form once email card collapsed
                 */
                $('body').delegate('.card', 'card_collapsed', function( e ) {      
                        var card = $(this);
                        card.find('.card_expanded_inner').html('');
                });
                
                /**
                 * Save notification email from email card
                 */
                $('body').delegate( '.card_expanded_inner .buttons .button.btn-save', 'click', function() {
                
                        var data = new Array();
                        var btn = $(this);
                        var form = $(btn).closest('.card');
                        var sec = form.closest('.wpas_pf_ui_wrapper').data('section');


                        var loader = $('<div class="spinner"></div>');
                        loader.insertBefore( btn );
                        btn.prop('disabled', true );

                        form.find('input, select, textarea').each(function() {

                                if( ($(this).hasAttr('id') || $(this).hasAttr('data-name')) && !$(this).hasClass('ed_button') ) {

                                        if( ('checkbox' == $(this).attr('type') && $(this).prop('checked')) || $(this).attr('type') != 'checkbox' ) {
                                                var name = $(this).hasAttr('data-name') ? $(this).data('name') : $(this).attr('id');
                                                var value = $(this).val();
                                                data.push({ name: name, value : value });
                                        }
                                }
                        });

                        var form_action = form.find('.wpas_form_action').val();
                        data.push({name:'action', value : form_action});
                        data.push({name:'duid', value : $(this).closest('.wpas_pf_ui_wrapper').data('duid')});

                        $.post(ajaxurl, data, function (response) {


                                if( true == response.success ) {


                                        if( response.data.item ) {
                                                $('.wpas_pf_ui_wrapper .wpas_pf_main_msg').removeClass('error').addClass('updated').html('<p>'+response.data.msg+'</p>').show();
                                                
                                                var item = $(response.data.item);
                                                
                                                Window.close_card( $('.cards_add_new_email_notification .card') );
                                                
                                                $('#wpas_pf_'+sec+'_items .wpas_pf_ui_items').append(item);
                                                
                                                
                                        } else if( response.data.update_item ) {
                                                var item = $(response.data.update_item);

                                                $('.wpas_pf_ui_wrapper .wpas_pf_main_msg').removeClass('error').addClass('updated').html('<p>'+response.data.msg+'</p>').show();
                                                
                                                Window.close_card( btn.closest('.card') );
                                                
                                                $('#wpas_pf_'+sec+'_items .wpas_pf_ui_items .wpas_pf_ui_item[data-item_id='+response.data.item_id+']').replaceWith(item);
                                        }


                                        item.trigger( form_action + '_response', [sec, data, response] );

                                } else {
                                        form.find('.wpas_msg').addClass('error').removeClass('updated').html('<p>'+response.data.msg+'</p>');
                                }

                                loader.remove();
                                btn.prop('disabled', false);

                        });
                } );

                
                
                
                // Send delete email request to server
                $('body').delegate('.wpas_pf_ui_item .wpas_pf_ui_item_action.wpas_pf_ui_item_action_delete', 'click', function(e) {
                        e.preventDefault();
                        var section = $(this).closest('.wpas_pf_ui_wrapper').data('section');
                        var item = $(this).closest('.wpas_pf_ui_item');
                        var item_id = item.data('item_id');
                        var btn = $(this);
                        var msg = btn.data('confirm');

                        if(confirm(msg)) {
                                btn.hide();
                                var loader = $('<div class="spinner"></div>');
                                loader.css({visibility: 'visible'})
                                $(this).closest('li').append(loader);

                                var data = new Array();
                                var nonce = btn.closest('.wpas_pf_data_items').find('.delete-nonce');
                                var action = $(this).data('action');

                                data.push({name:'action', value : action });
                                data.push({name:'id', value : item_id});
                                data.push({name:$(nonce).data('name'), value : $(nonce).val()});
                                data.push({name:'duid', value : $(this).closest('.wpas_pf_ui_wrapper').data('duid')});

                                $.post(ajaxurl, data, function (response) {

                                        var msg = item.find('.wpas_pf_ui_item_msg');
                                        $(msg).find('.msg').html(response.data.msg);

                                        if( true == response.success ) {
                                                        item.trigger( action + '_response', [section, data, response] );
                                                        Window.close_card(item);
                                                        item.remove();
                                                        $('.wpas_pf_ui_wrapper .wpas_pf_main_msg').removeClass('error').addClass('updated').html('<p>'+response.data.msg+'</p>').show();
                                        } else {
                                                        msg.removeClass('updated').addClass('error').show();
                                                        loader.remove();
                                                        btn.show();
                                        }
                                });
                        }

                });
                
                
                
        });
	
	
}(jQuery));