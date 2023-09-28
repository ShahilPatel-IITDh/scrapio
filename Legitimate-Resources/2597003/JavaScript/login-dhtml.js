
var LoginDhtmlJs = {
    
    
    ready: false,
    
    
    init: function(){
        console.log('LoginDhtmlJs.init');
        
        LoginDhtmlJs.privacy_loaded = false;
        
        LoginDhtmlJs.main_node = document.getElementById("dhtmlLogin");
        
        
        LoginDhtmlJs.closeBox = LoginDhtmlJs.main_node.querySelector('.closeBox');
        
        LoginDhtmlJs.closeBox.addEventListener(
            'click', 
            function(evt){
                console.log('evt.currentTarget', evt.currentTarget);
                evt.preventDefault();
                LoginDhtmlJs.hideLoginDhtmlBox();
            }
        );
        
        
        
        LoginDhtmlJs.initLoginLinks();
        
        
        
        
        LoginDhtmlJs.signNavBtn = document.getElementById('signNavBtn');
        
        LoginDhtmlJs.regBtn = document.getElementById('regBtn');
        LoginDhtmlJs.regBtn.classList.add('inactive');
        
        
        LoginDhtmlJs.login_div = LoginDhtmlJs.main_node.querySelector('.login');
        LoginDhtmlJs.login_form = LoginDhtmlJs.login_div.querySelector('form');
        
        
        LoginDhtmlJs.register_div = LoginDhtmlJs.main_node.querySelector('.register');
        LoginDhtmlJs.register_form = LoginDhtmlJs.register_div.querySelector('form');
        
        
        LoginDhtmlJs.feedback_div = LoginDhtmlJs.main_node.querySelector('.feedbackDiv');
        
        
        
        LoginDhtmlJs.initTabs();
        
        // form submit event
        LoginDhtmlJs.login_form.addEventListener(
            'submit', 
            LoginDhtmlJs.sendData
        );
        
        // form submit event
        LoginDhtmlJs.register_form.addEventListener(
            'submit', 
            LoginDhtmlJs.sendData
        );
        
        
        
        // privacy stuff
        LoginDhtmlJs.viewPrivacyLink = LoginDhtmlJs.main_node.querySelector('a[rel|="viewPrivacyLink"]');
        
        LoginDhtmlJs.PrivacyPolicy = LoginDhtmlJs.main_node.querySelector('.newsletterSignUpPrivacyPolicy');
        
        LoginDhtmlJs.closePrivacy = LoginDhtmlJs.main_node.querySelectorAll('a[rel|="closePrivacyContentLink"]');
        
        
        LoginDhtmlJs.viewPrivacyLink.addEventListener(
            'click', 
            function(evt){
                console.log('evt.currentTarget', evt.currentTarget);
                evt.preventDefault();
                
                
                LoginDhtmlJs.getPrivacyText();
                
                
                LoginDhtmlJs.PrivacyPolicy.style.display = 'block';
            }
        );
        
        
        LoginDhtmlJs.closePrivacy.forEach((node) => {
            
            node.addEventListener('click',  (evt) => {
                //console.log('click reveal');
                
                LoginDhtmlJs.PrivacyPolicy.style.display = 'none';
                
                evt.preventDefault();
                
            });
            
        });
        
        
        //http://test.recipelion.com/ajax_process.php?task=get_html_content&hct=privacy_policy&_=1599412188227
        
        // let any other js know the login is ready to be called (added for my-box.js)
        LoginDhtmlJs.ready = true;
        
    }, // init
    
    
    initTabs: function(){
        
        
        // these event handlers could be better / combined
        
        // Sign In btn click
        LoginDhtmlJs.signNavBtn.addEventListener(
            'click', 
            function(evt){
                console.log('evt.currentTarget', evt.currentTarget);
                evt.preventDefault();
                
                
                if( evt.currentTarget.classList.contains('inactive') ){
                    
                    console.log('SHOW sign in');
                    
                    // make Sign In active
                    LoginDhtmlJs.signNavBtn.classList.remove('inactive');
                    LoginDhtmlJs.regBtn.classList.add('inactive');
                    
                    LoginDhtmlJs.login_div.style.display = 'block';
                    LoginDhtmlJs.register_div.style.display = 'none';
                    
                }else{
                    
                    console.log('HIDE sign in');
                    
                    // make Sign In inactive
                    LoginDhtmlJs.signNavBtn.classList.add('inactive');
                    LoginDhtmlJs.regBtn.classList.remove('inactive');
                    
                    LoginDhtmlJs.login_div.style.display = 'none';
                    LoginDhtmlJs.register_div.style.display = 'block';
                }
                
            }
        );
        
        
        // Register btn click
        LoginDhtmlJs.regBtn.addEventListener(
            'click', 
            function(evt){
                console.log('evt.currentTarget', evt.currentTarget);
                evt.preventDefault();
                
                if( evt.currentTarget.classList.contains('inactive') ){
                    
                    console.log('SHOW register');
                    
                    // make Register active
                    LoginDhtmlJs.regBtn.classList.remove('inactive');
                    LoginDhtmlJs.signNavBtn.classList.add('inactive');
                    
                    LoginDhtmlJs.login_div.style.display = 'none';
                    LoginDhtmlJs.register_div.style.display = 'block';
                    
                }else{
                    
                    console.log('HIDE register');
                    
                    // make Register inactive
                    LoginDhtmlJs.regBtn.classList.add('inactive');
                    LoginDhtmlJs.signNavBtn.classList.remove('inactive');
                    
                    LoginDhtmlJs.login_div.style.display = 'block';
                    LoginDhtmlJs.register_div.style.display = 'none';
                }
            }
        );
        
        
        
        
        
        //onclick="$('#regBtn').toggleClass('active');$(this).toggleClass('active');$('.register').hide();$('.login').show();">Sign In</a>
        
        
        //<a id="regBtn" class="active" style="flex-grow:1;text-align:center;border-left:1px solid #000;padding: 8px 0;" onclick="$('#signNavBtn').toggleClass('active');$(this).toggleClass('active');$('.register').show();$('.login').hide();">Create Account</a>
        
    }, // initTabs
    
    
    initLoginLinks: function(){
        
        LoginDhtmlJs.link_reveals = document.querySelectorAll('a[rel|="primeLoginLink"]');
        
        
        LoginDhtmlJs.link_reveals.forEach((node) => {
            
            node.addEventListener('click',  (evt) => {
                console.log('click reveal');
                
                LoginDhtmlJs.displayLoginDhtmlBox('dhtmlLogin');
                
                evt.preventDefault();
                
            });
            
        });
        
        
    }, // initLoginLinks
    
    
    hideLoginDhtmlBox: function(){
        LoginDhtmlJs.main_node.style.display = 'none';
    },
    
    displayLoginDhtmlBox: function(node_id, msg){
        //console.log('node_id', node_id);console.log('msg', msg);
        
        
        // if we are showing the dhtml login, make sure the main menu is closed
        if(typeof MainMenuJs != 'undefined'  &&  MainMenuJs != null){
            MainMenuJs.close();
        }
        
        /*
        // maybe overly coupled, but I gotta close the main menu
        let menu_icon = document.getElementById('menuIcon');
        if( menu_icon !== null){
            console.log('TRIGGER MENU CLICK');
            let evt = new Event("click", {"bubbles":true, "cancelable": true});
            menu_icon.dispatchEvent(evt);
        }
        */
        
        
        LoginDhtmlJs.main_node.style.display = 'block';
        
        window.scrollTo(0, 0);
        
        
    }, // displayLoginDhtmlBox
    
    
    
    sendData: function(event){
        //console.log('sendData', event.currentTarget);
        
        event.preventDefault();
        
        LoginDhtmlJs.feedback_div.innerHTML = '';
        
        
        LoginDhtmlJs.current_form = event.currentTarget;
        
        LoginDhtmlJs.current_form.style.opacity = 0.3;
        
        
        
        
        
        
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
        const XHR = new XMLHttpRequest();
        
        // Bind the FormData object and the form element
        const FD = new FormData(LoginDhtmlJs.current_form);
        
        
        // add data to send
        //FD.append('task', subscriberCenter_obj.login_form.task.value);
        //FD.append('api_key', 'xm83n2lxkdh');
        
        
        
        // Define what happens on successful data submission
        XHR.addEventListener("load", function(event) {
            //console.log('event.target.responseText', event.target.responseText);
            
            LoginDhtmlJs.current_form.style.opacity = 1.0;
            
            var response = JSON.parse( event.target.responseText);
            console.log('response', response);
            //console.log('response.result', response.result);
            
            //console.log('response.errors', response.errors);
            //console.log('response.errors.length', response.errors.length);
            
            
            let str = '';
            
            
            switch(LoginDhtmlJs.current_form.task.value){
                
                case 'register_process':
                    
                    str = 'We could not create your account.';
                    
                    if(response.success > 0){
                        
                        str = 'Thank you for registering!<br><br>';
                        str += 'We just sent e-mail to ' + response.email +' that contains details about your account.';
                        
                        setTimeout('window.location.reload(true)', (1000 * 20));
                                                
                    }else if( response.errors ){
                        console.log('we have response.errors', response.errors);
                        
                        for(let i in response.errors){
                            console.log('i', response.errors[i] );
                            str += "<br><br>" + response.errors[i];
                        }
                        
                    }
                    
                    break;
                    
                case 'user_acct_login':
                
                    str = 'We could not log you in. Please check your email and password.';
                    
                    if(response.success > 0){
                        str = 'You are logged in!';
                        setTimeout('window.location.reload(true)', 1200);
                        
                    }
                    
                    break;
            }
            
            
            LoginDhtmlJs.feedback_div.innerHTML = str;
            
            /*
            
            let str_arr = [];
            str_arr['register_process'] = [];
            str_arr['register_process'][0] = 'We could not create your account.';
            str_arr['register_process'][1] = 'Thank you for registering!';
            
            str_arr['user_acct_login'] = [];
            str_arr['user_acct_login'][0] = 'We could not log you in. Please check your email and password.';
            str_arr['user_acct_login'][1] = 'You are logged in!';
            */
            
            /*
            str = str_arr[ LoginDhtmlJs.current_form.task.value ][0];
            
            if(response.success > 0){
                
                str = str_arr[ LoginDhtmlJs.current_form.task.value ][1];
                
                
                
                

                
            }else if( response.errors ){
                console.log('we have response.errors', response.errors);
                
                for(let i in response.errors){
                    console.log('i', response.errors[i] );
                    str += "<br><br>" + response.errors[i];
                }
                
            }else{
                console.log('NO response.errors');
            }
            */
            
            
            
            
            
            // reset
            LoginDhtmlJs.current_form = null;
            
        }); 
        
        
        
        // Define what happens in case of error
        XHR.addEventListener("error", function(event) {
            alert('Oops! Something went wrong.');
        });
        
        
        // Set up our request
        XHR.open("POST", LoginDhtmlJs.current_form.action);
    
        // The data sent is what the user provided in the form
        XHR.send(FD);
        
        
        
    }, // sendData
    
    
    getPrivacyText: function(){
        
        if(LoginDhtmlJs.privacy_loaded == true){
            return;
        }
        
        // Set up our HTTP request
        var xhr = new XMLHttpRequest();
        
        // Setup our listener to process completed requests
        xhr.onload = function () {
        
        	// Process our return data
        	if (xhr.status >= 200 && xhr.status < 300) {
        		// Runs when the request is successful
        		//console.log(JSON.parse(xhr.responseText));
        		
        		
        		LoginDhtmlJs.PrivacyPolicy.querySelector('.privacy_policy_text').innerHTML = xhr.responseText;
        		
        		
        		LoginDhtmlJs.privacy_loaded = true;
        		
        	} else {
        		// Runs when it's not
        		//console.log(JSON.parse(xhr.responseText));
        	}
        
        };
        
        // Create and send a GET request
        // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
        // The second argument is the endpoint URL
        xhr.open('GET', '/ajax_process.php?task=get_html_content&hct=privacy_policy');
        xhr.send();
        
        //http://test.recipelion.com/ajax_process.php?task=get_html_content&hct=privacy_policy&_=1599412188227
        
        
    } // getPrivacyText
    
    
}








// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    //console.log('DOMContentLoadedCallback called');
    
    
    if(typeof LoginDhtmlJs != "undefined"  &&  typeof LoginDhtmlJs.init != undefined){
        LoginDhtmlJs.init();
    }else{
        console.log('no LoginDhtmlJs init');
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
