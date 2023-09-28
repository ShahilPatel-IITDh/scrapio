const url=window.location.href;
const user_code=$('body').attr('data-user-code');
function form_event_error(errors,type){
    if(errors.length!=0){
        gtag('event',
            'Form Submit from '+user_code+' and '+url+'',
            {
                'event_category': type,
                'event_label': errors
            }
        );
    }
}

function form_event_success(action,category,label) {
    gtag('event',
        action,
        {
            'event_category': category,
            'event_label': label
        }
    );
    gtag4('event', 'Register_Success', {
        'succeess_from':action,
        'type': 'Success Form Page',
        'succeess_email': label
    });
}

/*Global for all Pages*/
(function ($) {
    $(document).ready(function(){
        gtag('event',
            'Access From Country '+user_code+'',
            {
                'event_category': 'Users Access',
                'event_label': url
            }
        );
    });
})(jQuery);