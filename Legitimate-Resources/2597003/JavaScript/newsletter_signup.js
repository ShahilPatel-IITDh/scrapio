





/*



WE COULD ADD A TEST OF LOCAL STORAGE TO SEE IF THE SIGNUPS SHOULD DISPLAY



*/

var NewsletterSignupJs = {
    
    form_obj: null,
    
    init: function(){
        console.log('NewsletterSignupJs.init');
        
        
        
        // trying to support multiple signup forms in one js file
        // for today, we have one or two forms: footer, article/home page (same form)
        
        
        NewsletterSignupJs.footer_form = document.querySelector('footer .nlSignupBox form');
        
        if(NewsletterSignupJs.footer_form != null){
            NewsletterSignupJs.initForm( NewsletterSignupJs.footer_form );
        }
        
        
        
        // this one appears on home and article page
        NewsletterSignupJs.article_page_form = document.querySelector('#articlePageNLSignupDiv form');
        
        if(NewsletterSignupJs.article_page_form != null){
            NewsletterSignupJs.initForm( NewsletterSignupJs.article_page_form );
        }
        
        
    }, // init
    
    
    initForm: function(form_node){
        console.log('NewsletterSignupJs.initForm');
        
        if( typeof form_node == undefined  ||  form_node == null){
            return 0;
        }
        
        form_node.addEventListener(
            'submit', 
            NewsletterSignupJs.sendData
        );

        
        
    }, // initForm
    
    
    // not crazy about this here
    // so far, these are not dhtml
    closeNlSignup: function(){
        console.log('call closeNlSignup');
        
        //NlSignupDhtml.overlay.classList.remove('show');
        //NlSignupDhtml.signupFormDhtmlModal.classList.remove('show');
        
        
        var dt = new Date();
        localStorage.setItem('closed_nl_dhtml', dt.getTime());
    },
    
    
    sendData: function(event){
        console.log('sendData', event.target);
        
        event.preventDefault();
        
        
        
        NewsletterSignupJs.form_obj = event.target;
        
        NewsletterSignupJs.form_obj.style.opacity = 0.3;
        
        
        
        NewsletterSignupJs.success_obj = NewsletterSignupJs.form_obj.parentNode.querySelector(".success");
        NewsletterSignupJs.error_obj = NewsletterSignupJs.form_obj.parentNode.querySelector(".error");
        
        
        NewsletterSignupJs.success_obj.style.display = 'none';
        NewsletterSignupJs.error_obj.style.display = 'none';
        
        
        
        
        
        
        
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
        const XHR = new XMLHttpRequest();
        
        // Bind the FormData object and the form element
        const FD = new FormData(NewsletterSignupJs.form_obj);
        
        
        // add data to send
        //FD.append('task', NewsletterSignupJs.form_obj.task.value);
        //FD.append('api_key', 'xm83n2lxkdh');
        
        
        
        // Define what happens on successful data submission
        XHR.addEventListener("load", function(event) {
            //console.log('event.target.responseText', event.target.responseText);
            
            NewsletterSignupJs.form_obj.style.opacity = 1.0;
            
            var response = JSON.parse( event.target.responseText);
            //console.log('response', response);
            //console.log('response.result', response.result);
            
            if(response.result == true){
                
                NewsletterSignupJs.form_obj.style.display = 'none';
                NewsletterSignupJs.success_obj.style.display = 'block';
                
                
                var dt = new Date();
                localStorage.setItem('signed_up', dt.getTime());
                
                
                if (response.optin_sent > 0) {
                    // send user to optin page
                    window.location.href = window.location.origin + '/optin';
                } else {
                    
                    if(typeof flow != "undefined"  &&  typeof flow.init != undefined){
                        flow.isNewSignup = response.is_new_signup;
                        flow.signupRedirect(response.email, response.enc_email);
                    }
                }
                    
                    
                
                // call close to get rid of overlay
                setTimeout(
                    "NewsletterSignupJs.closeNlSignup();", 
                    6000
                );
                
                
                
            }else{
                
                NewsletterSignupJs.error_obj.style.display = 'block';
                
            }
            
        });
        
        
        
        // Define what happens in case of error
        XHR.addEventListener("error", function(event) {
            alert('Oops! Something went wrong.');
        });
        
        
        // Set up our request
        XHR.open("POST", NewsletterSignupJs.form_obj.action);
    
        // The data sent is what the user provided in the form
        XHR.send(FD);
        
        
        
    } // sendData
    
}



// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    //console.log('DOMContentLoadedCallback called');
    
    
    if(typeof NewsletterSignupJs != "undefined"  &&  typeof NewsletterSignupJs.init != undefined){
        NewsletterSignupJs.init();
    }else{
        console.log('no NewsletterSignupJs init');
    }
    
};

if (
    document.readyState === "complete" ||
    (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
    //console.log('DOM loaded 2');
    DOMContentLoadedCallback();
} else {
    //console.log('DOM loaded 1');
    document.addEventListener("DOMContentLoaded", DOMContentLoadedCallback);
}






