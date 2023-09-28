(function($) {

    $.alerts = {

        // These properties can be read/written by accessing $.alerts.propertyName from your scripts at any time
	init: function(){ 
		if(typeof window.is_captainform != 'undefined' && window.is_captainform == true)
		{
			this.overlayColor = '#f1f1f1';
		}
	},
        verticalOffset: -75,                // vertical offset of the dialog from center screen, in pixels
        horizontalOffset: 0,                // horizontal offset of the dialog from center screen, in pixels/
        repositionOnResize: true,           // re-centers the dialog on window resize
        overlayOpacity: .8,                // transparency level of overlay
        overlayColor: '#000',               // base color of overlay
        draggable: false,                    // make the dialogs draggable (requires UI Draggables plugin)
        okButton: lang.get('confirmOkButton'),         // text for the OK button
        deleteButton: lang.get('confirmDeleteButton'),
        cancelButton: lang.get('confirmCancelButton'), // text for the Cancel button
        yesButton: lang.get('reports_rules_yes'),  // 'Yes' - butotn
        noButton: lang.get('standard_no_button'),   // 'No' - button
        dialogClass: null,                  // if specified, this class will be applied to all dialogs

        // Public methods
        alert: function(message, title, callback) {
            if( title == null ) title = 'Alert';
            $.alerts._show(title, message, null, 'alert', function(result) {
                if( callback ) callback(result);
            });
        },

        confirm: function(message, title, confirmType, callback, btns) {
            if( title == null ) title = 'Confirm';
			btns = typeof btns !== 'undefined' ? btns : false;
            $.alerts._show(title, message, null, 'confirm', confirmType, function(result) {
                if( callback ) callback(result);
            },btns);
        },

        prompt: function(message, value, title, callback) {
            if( title == null ) title = 'Prompt';
            $.alerts._show(title, message, value, 'prompt', function(result) {
                if( callback ) callback(result);
            });
        },

        // Private methods

        _show: function(title, msg, value, type, confirmType, callback, btns) {

            $.alerts._hide();
            $.alerts._overlay('show');
			
			btns = typeof btns !== 'undefined' ? btns : false;

            $("BODY").append(
                '<div id="popup_container">' +
                '<h1 id="popup_title"></h1>' +
                '<div id="popup_content">' +
                '<div id="popup_message"></div>' +
                '</div>' +
                '</div>');

            if( $.alerts.dialogClass ) $("#popup_container").addClass($.alerts.dialogClass);

            // IE6 Fix
            var pos = 'fixed';
            //var pos = ($.browser.msie && parseInt($.browser.version) <= 6 ) ? 'absolute' : 'fixed';
            $("#popup_container").css({
                position: pos,
                zIndex: 99999,
                padding: 0,
                margin: 0
            });

            $("#popup_title").text(title);
            $("#popup_content").addClass(type);
            $("#popup_message").text(msg);
            $("#popup_message").html( $("#popup_message").text().replace(/\n/g, '<br />') );

            var confirmationPopUpWidth;
            if( $('body').width() < 767) {
                confirmationPopUpWidth = '70%';
                $("#popup_container").addClass('reponsiveConfirmationPopup');
            } else {
                confirmationPopUpWidth = $("#popup_container").outerWidth();
            }
            $("#popup_container").css({
                minWidth: confirmationPopUpWidth,
                maxWidth: confirmationPopUpWidth
            });

            $.alerts._reposition();
            $.alerts._maintainPosition(true);

            switch( type ) {
                case 'alert':
                    $("#popup_message").after('<div id="popup_panel" class="bootstrap-iso"><input aria-label="Dialog" aria-describedby="popup_message" class="btn-confirm normal btn btn-primary-cta" type="button" value="' + $.alerts.okButton + '" id="popup_ok" /></div>');
                    $("#popup_ok").click( function() {
                        $.alerts._hide();
                    });
                    $("#popup_ok").focus().keypress( function(e) {
                        if( e.keyCode == 13 || e.keyCode == 27 ) $("#popup_ok").trigger('click');
                    });

                    $(document).keydown( function(e) {
                        if( e.keyCode == 27 || e.keyCode == 9) $("#popup_ok").trigger('click');
                    });
                    break;
                case 'confirm':
                    var text = $.alerts.okButton;
                    var cancelText = $.alerts.cancelButton;
                    if(confirmType == 'delete') text = $.alerts.deleteButton;
                    else if (confirmType == 'readmore') {
                        text = 'Read more';
                        cancelText = 'OK';
                    }
                    else if(confirmType == 'YesNo') {
                        text = $.alerts.yesButton;
                        cancelText = $.alerts.noButton;
                    }
                    if(btns){
						text = btns.ok_text;
						cancelText = btns.cancel_text;
					}

                    $("#popup_message").after('<div id="popup_panel" class="bootstrap-iso"><input class="btn ' +(window.new_design == 1?(confirmType == 'delete'?'btn-secondary-red ':'btn-secondary-cta '):'btn-confirm btn-primary-cta ') + confirmType + '" type="button" value="' + text + '" id="popup_ok" /> <input type="button" '+(window.new_design == 1?"autofocus":"")+' class="btn-confirm btn btn-outline" value="' + cancelText + '" id="popup_cancel" /></div>');
                    $("#popup_ok").click( function() {
                        if ($("#popup_message").find('.notifications-select').length) {
                            if (callback) callback(true);
                            $.alerts._hide();
                        } else {
                            $.alerts._hide();
                            if (callback) callback(true);
                        }
                    });
                    $("#popup_cancel").click( function() {
                        $.alerts._hide();
                        if( callback ) callback(false);
                    });
                    $("#popup_ok").focus();
                    $("#popup_ok, #popup_cancel").keypress( function(e) {
                        if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
                        if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
                    });
                    break;
                case 'prompt':
                    $("#popup_message").append('<br /><input type="text" size="30" id="popup_prompt" />').after('<div id="popup_panel"><input type="button" value="' + $.alerts.okButton + '" id="popup_ok" /> <input type="button" value="' + $.alerts.cancelButton + '" id="popup_cancel" /></div>');
                    $("#popup_prompt").width( $("#popup_message").width() );
                    $("#popup_ok").click( function() {
                        var val = $("#popup_prompt").val();
                        $.alerts._hide();
                        if( callback ) callback( val );
                    });
                    $("#popup_cancel").click( function() {
                        $.alerts._hide();
                        if( callback ) callback( null );
                    });
                    $("#popup_prompt, #popup_ok, #popup_cancel").keypress( function(e) {
                        if( e.keyCode == 13 ) $("#popup_ok").trigger('click');
                        if( e.keyCode == 27 ) $("#popup_cancel").trigger('click');
                    });
                    if( value ) $("#popup_prompt").val(value);
                    $("#popup_prompt").focus().select();
                    break;
            }

            // Make draggable
            if( $.alerts.draggable ) {
                try {
                    $("#popup_container").draggable({ handle: $("#popup_title") });
                    $("#popup_title").css({ cursor: 'move' });
                } catch(e) { /* requires jQuery UI draggables */ }
            }
        },

        _hide: function() {
            $("#popup_container").remove();
            $.alerts._overlay('hide');
            $.alerts._maintainPosition(false);
        },

        _overlay: function(status) {
            switch( status ) {
                case 'show':
                    $.alerts._overlay('hide');
                    $("BODY").append('<div id="popup_overlay"></div>');
                    $("#popup_overlay").css({
                        position: 'absolute',
                        zIndex: 99998,
                        top: '0px',
                        left: '0px',
                        width: '100%',
                        height: $(document).height(),
                        background: this.overlayColor,
                        opacity: $.alerts.overlayOpacity
                    });
                    break;
                case 'hide':
                    $("#popup_overlay").remove();
                    break;
            }
        },

        _reposition: function() {
		var top = (($(window).height() / 2) - ($("#popup_container").outerHeight() / 2)) + this.verticalOffset;
		var left = (($(window).width() / 2) - ($("#popup_container").outerWidth() / 2))  + this.horizontalOffset;
          	if(typeof window.global_top_scroll != 'undefined' && typeof window.is_captainform != 'undefined' && window.is_captainform == true)
		{
			top = window.global_top_scroll; 
		}
            if( top < 0 ) top = 0;
            if( left < 0 ) left = 0;

            // IE6 fix
            //if( $.browser.msie && parseInt($.browser.version) <= 6 ) top = top + $(window).scrollTop();

            $("#popup_container").css({
                top: top + 'px',
                left: left + 'px'
            });
            $("#popup_overlay").height( $(document).height() );
        },

        _maintainPosition: function(status) {
            if( $.alerts.repositionOnResize ) {
                switch(status) {
                    case true:
                        $(window).bind('resize', $.alerts._reposition);
                        break;
                    case false:
                        $(window).unbind('resize', $.alerts._reposition);
                        break;
                }
            }
        }

    }

    // Shortuct functions
    jAlert = function(message, title, callback) {
		$.alerts.init();
        $.alerts.alert(message, title, callback);
    }

    jConfirm = function(message, title, confirmType, callback, btns) {
		btns = typeof btns !== 'undefined' ? btns : false;
        $.alerts.init();
        $.alerts.confirm(message, title, confirmType, callback, btns);
    };

    jPrompt = function(message, value, title, callback) {
        $.alerts.init();
        $.alerts.prompt(message, value, title, callback);
    };

})(jQuery);

/*
 * Claudiu, 21-09-2015
 * message: text That we whant to display
 * callbackTrueType: 
 *               possible values:
 *                          - link: normal redirect the link that you provide
 *                          - link-blank: redirect in new tab the link that you provide
 *                          - function: specifie the sistem that the callbackTrue - value is a function
 * callbackTrue: contains the link or the name of the function
*/

function ucfirst(str) {

    var text = str;


    var parts = text.split(' '),
        len = parts.length,
        i, words = [];
    for (i = 0; i < len; i++) {
        var part = parts[i];
        var first = part[0].toUpperCase();
        var rest = part.substring(1, part.length);
        var word = first + rest;
        words.push(word);

    }

    return words.join(' ');
}

function confirmPopup(message, callbackTrueType,  callbackTrue, title, confirmType, callbackCancelType,  callbackCancel, btns) {
	btns = typeof btns !== 'undefined' ? btns : false;
    if(typeof title == 'undefined') title = 'Confirmation Dialog';
    if(title != "")
        title = ucfirst(title);
    if(typeof confirmType == 'undefined') confirmType = 'normal';
    if (callbackTrue.indexOf('`') != -1) {
        var newJason = callbackTrue.replace(/`/g, "'");
        callbackTrue = newJason;
    }

    if(typeof callbackCancel !== 'undefined') {
        if (callbackCancel.indexOf('`') != -1) {
            var newJason = callbackCancel.replace(/`/g, "'");
            callbackCancel = newJason;
        }
    }

    jConfirm(message, title, confirmType, function(chose_option)
    {
        if(chose_option) {
            switch(callbackTrueType){
                case 'link':
                        window.location.href = callbackTrue;
                break;
                case 'link-blank': 
                    window.open(callbackTrue, '_blank');
                break;
                case 'link-self':
                    window.open(callbackTrue, '_self');
                    break;
                case 'function': 
                    setTimeout(callbackTrue, 1);
                    /*var regExp = /\(([^)]+)\)/;
                    var matches = regExp.exec(callbackTrue);
                    alert(matches[1]);
                    window[callbackTrue]();*/
                break;
                case 'sync-function':
                    eval(callbackTrue);
                break;
            }            
        } else {
            if(typeof callbackCancelType !== 'undefined') {
                switch(callbackCancelType) {
                    case 'link':
                        window.location.href = callbackCancel;
                        break;
                    case 'link-blank':
                        window.open(callbackCancel, '_blank');
                        break;
                    case 'link-self':
                        window.open(callbackCancel, '_self');
                        break;
                    case 'function':
                        setTimeout(callbackCancel, 1);
                        break;
                    case 'sync-function':
                        eval(callbackTrue);
                        break;
                }
            }
        }
    },btns);
}


function alertPopup(message, title, callback) {
    if(typeof title == 'undefined') title = '';
    if(title != "")
        title = ucfirst(title);

	jAlert(message, title, callback)
}
