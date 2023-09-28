

var subscriberCenter_obj = {
    
    flow: false,
    
    init: function(){
        //console.log('subscriberCenter_obj.init');
        
        
        
        
        subscriberCenter_obj.login_form = document.getElementById('subCenterLoginForm');
        
        if( subscriberCenter_obj.login_form === null ){
            // this is not the subcenter page
            return 1;
        }
        
        
        
        if(window.footerNlSignupBox != null){
            window.footerNlSignupBox.style.visibility = 'hidden';
        }
        
        
        
        
        
        subscriberCenter_obj.login_fieldset = document.getElementById('emailAddressFieldSet');
        subscriberCenter_obj.user_email_div = document.getElementById('userEmailDiv');
        
        subscriberCenter_obj.nl_fieldset = document.getElementById('newsletterFieldSet');
        
        
        
        subscriberCenter_obj.init_login();
        
        
        
        // what action do we have
        //console.log('subscriberCenter_obj.action', subscriberCenter_obj.action);
        switch (subscriberCenter_obj.action) {
            case 'signup':
            
                
                /**
                 user's with this action are only signing up
                 we do not make an ajax call to get existing subscriber data
                 we may have an email passed in the url, but we are not trying to see what the current subscription data is
                 */
                
                // set the task of the form 
                subscriberCenter_obj.login_form.querySelector('[name=task]').value = 'subctr_update';
                
                
                
                
                subscriberCenter_obj.login_fieldset.style.marginBottom = '1.0em';
                
                
                // hide the login form / area to enter the email (in order to get existing sub data)
                //subscriberCenter_obj.login_fieldset.style.display = 'none';
                
                // set the form's email field value for this user (that we just hid)
                subscriberCenter_obj.login_form.querySelector('[name=email]').value = subscriberCenter_obj.email;
                
                
                // hide this
                if(subscriberCenter_obj.user_email_div != null){
                    subscriberCenter_obj.user_email_div.style.display = 'none';
                }
                
                // some text to show the user their email value
                //subscriberCenter_obj.user_email_div.innerHTML = 'Your Email: ' + subscriberCenter_obj.email;
                
                
				
				let submitButtonDiv_node = subscriberCenter_obj.login_form.querySelector('.submitButtonDiv');
				submitButtonDiv_node.style.display = 'none';
				
							   							   
                
                // show NLs (i thoink the html does NOT contain SOLOs
                subscriberCenter_obj.nl_fieldset.style.display = 'block';

                // 2022-01-06 this arr is set more than once 
                subscriberCenter_obj.nltrID_arr = subscriberCenter_obj.login_form.querySelectorAll('input.nltrID');

                let form_index = -1;


                // semi duped from formSuccess
                subscriberCenter_obj.nltrID_arr.forEach(
                    (nltrID, index) => {

                        //console.log('nltrID_arr forEach', index);

                        form_index_obj = nltrID.parentNode.querySelector('.form_index');
                        form_index = form_index_obj.value;

                        nltrID.parentNode.querySelector(`#checked${form_index}`).addEventListener(
                            'click', 
                            subscriberCenter_obj.setFormIsChanged

                            /*
                            (evt) => {
                                console.log('click box as signup');
                                subscriberCenter_obj.setFormIsChanged();
                            }
                            */
                        );
                    }
                );
                
                
                break; // signup
                
            default:
                
                // if we have an email value, submit the login
                if( typeof subscriberCenter_obj.email != 'undefined'  &&  subscriberCenter_obj.email != ''){
                    let evt = new SubmitEvent("submit", {"bubbles":true, "cancelable": true});
                    subscriberCenter_obj.login_form.dispatchEvent(evt);
                }
                        
                break;
        } // action switch
            
        
        
        
    }, // init
    
    // get the sub center email/login form running
    init_login: function(){

        //console.log('subscriberCenter_obj.init_login');
        
        subscriberCenter_obj.login_form.style.visibility = 'visible';
        
        subscriberCenter_obj.login_fieldset.style.visibility = 'visible';
        
        // form submit event
        subscriberCenter_obj.login_form.addEventListener(
            'submit', 
            subscriberCenter_obj.sendData
        );
        
        
        
        
        if( subscriberCenter_obj.user_email_div != null ){
            subscriberCenter_obj.user_email_div.querySelector('a.enterUserEmail').addEventListener(
                'click', 
                function(evt){
                    //console.log('click change email');
                    evt.preventDefault();
                    
                    subscriberCenter_obj.login_fieldset.style.display = 'block';
                    subscriberCenter_obj.nl_fieldset.style.display = 'none';
                    
                    
                    subscriberCenter_obj.login_form.querySelector('[name=task]').value = 'subctr_enter_email';
                }
            );
        }
        
        
    }, // init_login
    
    
    
    
    // so far, anytime the form is submitted we run through here 
    sendData: function(event){
        //console.log('sendData', event.target);
        
        event.preventDefault();
        
        subscriberCenter_obj.login_form.style.opacity = 0.3;
        
        
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
        const XHR = new XMLHttpRequest();
        
        // Bind the FormData object and the form element
        const FD = new FormData(subscriberCenter_obj.login_form);
        
        
        // add data to send
        //FD.append('task', subscriberCenter_obj.login_form.task.value);
        //FD.append('api_key', 'xm83n2lxkdh');
        
        
        
        // Define what happens on successful data submission
        XHR.addEventListener("load", function(event) {
            //console.log('event.target.responseText', event.target.responseText);
            
            subscriberCenter_obj.login_form.style.opacity = 1.0;
            
            var response = JSON.parse( event.target.responseText);
            //console.log('response', response);
            //console.log('response.result', response.result);
            
            
            // WE HAVE A LOT OF FORM ACTIVITY GOING ON
            // WE ARE HERE BECUASE THE FORM CAME BACK SUCCESSFULLY
            // BUT THE USER MAY HAVE BEEN DOING A FEW THINGS THAT WE NEED TO CHECK ON
            
            
            // SAVE SOME VALUES THAT GOT RETURNED BEFORE SENDING THE USER TO formSuccess()
            
            // might not have this value passed back (if we did not do a signup)
            subscriberCenter_obj.signup_error = 0;
            if(typeof response.signup_error != null  &&  response.signup_error != undefined){
                subscriberCenter_obj.signup_error = response.signup_error;
            }
            
            subscriberCenter_obj.error_str = '';
            if(typeof response.error_str != null  &&  response.error_str != undefined){
                subscriberCenter_obj.error_str = response.error_str;
            }
            
            
            
            subscriberCenter_obj.lists = [];
            if(typeof response.lists != null  &&  response.lists != undefined){
                subscriberCenter_obj.lists = response.lists;
            }
            subscriberCenter_obj.num_lists = subscriberCenter_obj.lists.length;
            
            
            
// RIGHT SPOT???
            //subscriberCenter_obj.user_email_div.querySelector('span').innerHTML = response.email;
            
            // kinda odd var name
            // it stores the email we got back from the xhr call
            subscriberCenter_obj.response_email = response.email;
            subscriberCenter_obj.response_enc_email = response.enc_email ? response.enc_email : '';
            
            
            
            
            if( typeof grecaptcha != 'undefined'  &&  window.submitBtnParent != null  &&  window.submitBtnParent.querySelector(".g-recaptcha") != null ){
                grecaptcha.reset();
            }else{
                //console.log('no captcha');
            }
            
            
            
            //alert(subscriberCenter_obj.login_form.querySelector('[name=task]').value);  
            if(Array.isArray(response.recaptcha_error)  &&   response.recaptcha_error.length > 0){
                alert('===== Please check the "not a robot" box =====');
                
                
            }else{
                subscriberCenter_obj.formSuccess();
            }
            
        });
        
        
        
        // Define what happens in case of error
        XHR.addEventListener("error", function(event) {
            alert('Oops! Something went wrong.');
        });
        
        
        // Set up our request
        XHR.open("POST", subscriberCenter_obj.login_form.action);
    
        // The data sent is what the user provided in the form
        XHR.send(FD);
        
        
        
        
    }, // sendData  
    
    
    formSuccess: function(){

        console.log('formSuccess subscriberCenter_obj.action', subscriberCenter_obj.action);
        
        
        subscriberCenter_obj.resetFormIsChanged();
        
        
        // THIS IS NOT THE ACTION ATTRIBUTE OF THE FORM
        // NOT IS IT THE TASK FORM FIEDL VALUE, AND THAT MAKES EVERYTHING CONFUSING
        // subscriberCenter_obj.action is a property of the subscriberCenter_obj object
        switch (subscriberCenter_obj.action) {
            case 'signup':
                
                if (subscriberCenter_obj.signup_error == 1) {
                    var alert_str = 'There was an error.';
                    if (subscriberCenter_obj.error_str != undefined) {
                        alert_str = subscriberCenter_obj.error_str;
                    }
                    alert(alert_str);
                } else {
                    
                    // success
                    
                    // get rid of all the content in the NL fieldset
                    subscriberCenter_obj.nl_fieldset.innerHTML = '';
                    
                    
                    // create a new node / message
                    let node = document.createElement('h3');
                    let text = document.createTextNode('Thank You for Subscribing!');
                    node.appendChild(text);
                    node.style.textAlign = 'center';
                    node.style.marginTop = '2.0em';
                    node.style.marginBottom = '10.0em';
                    
                    subscriberCenter_obj.nl_fieldset.appendChild(node);
                    
    				
    				
    				window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
    				
    				
    				let go_option = true;
    				
    				
    				// 2020-09-15
    				// i think this is the right way to handle it
    				// if this internal prop is true
    				if(subscriberCenter_obj.flow == true){
        				// see if the global flow var is present
        				if( typeof flow !== 'undefined'  &&  flow !== null){
            				// follow flow
            				setTimeout('flow.signupRedirect("' + subscriberCenter_obj.response_email + '", "' + subscriberCenter_obj.response_enc_email + '");', 1800);
            				
            				go_option = false;
                        }
    				}
    				
    				//alert('subscriberCenter_obj.action ' + subscriberCenter_obj.action);
    				//alert('subscriberCenter_obj.flow ' + subscriberCenter_obj.flow);
    				
    				subscriberCenter_obj.login_fieldset.style.display = 'none';
    				
    				
    				if(go_option == true){
        				setTimeout("window.location.href = window.location.origin + '/optin';", 2500);
                    }
                    
                    
                    
                    // end success
                }
                
                break; // signup
                
            case 'flow':
                
                // subscriberCenter_obj.flow property is NOT flow (which comes from flow.js)
                subscriberCenter_obj.flow = true;
                subscriberCenter_obj.action = 'signup';
                                        
                // we are here with flow, over write the existing flow url with the exit_url passed in the url, if set 
                ////var new_flow = $("#subCenterLoginForm input[name=exit_url]").val();
                
                var new_flow = subscriberCenter_obj.login_form.querySelector('[name=exit_url]').value;
                
                if (new_flow != '') {
                    // flow is another object, from flow.js
                    if( typeof flow !== 'undefined'  &&  flow !== null){
                        flow.url = new_flow;
                    }
                }
                
                //console.log('new_flow 11', new_flow);
                
                
                let skip_nodes = subscriberCenter_obj.login_form.querySelectorAll('.skip');
                if( typeof skip_nodes !== 'undefined'  &&  skip_nodes !== null){
                    
                    skip_nodes.forEach(
                        node => {
                            node.addEventListener(
                                'click', 
                                function(evt){
                                    evt.preventDefault();
                                    
                                    //console.log('new_flow 22', new_flow);
                                    
                                    window.location.href = new_flow;
                                }
                            );
                        }
                    );
                }
            
                
            default:
                
                // this section handles subscriberCenter_obj.action that is empty or not in a  case above
                
                
                //alert('subscriberCenter_obj.action: ' + subscriberCenter_obj.action);
                
                //alert('task ' + subscriberCenter_obj.login_form.querySelector('[name=task]').value);
                
                
                
                // now look at the the LOGIN form's task
                
                switch( subscriberCenter_obj.login_form.querySelector('[name=task]').value ) {
                    case 'subctr_update':
                        
                        // users come here after updating their subscriber data
                        alert('Your changes were processed.');
                        //$('.sectionContent').prepend('<h3 class="catHeadline changesProcessed" style="text-align: center; font-size: 1.5em;">Your changes were processed.</h3>');
                        //$('.sectionContent').append('<h3 class="catHeadline changesProcessed" style="text-align: center; font-size: 1.5em;">Your changes were processed.</h3>');
                        
                        
                        // i think this is redundant
                        // we do this below in the 'subctr_enter_email' case, and that should cover this traffic (maybe ;) )
                        subscriberCenter_obj.user_email_div.querySelector('span').innerHTML = subscriberCenter_obj.response_email;
					
                        break;
                    
                    case 'subctr_enter_email':
                    
                        // hide the enter email/login content
                        subscriberCenter_obj.login_fieldset.style.display = 'none';
                        //subscriberCenter_obj.login_fieldset.style.display = 'block';
                        // show the lists
                        subscriberCenter_obj.nl_fieldset.style.display = 'block';
                        //subscriberCenter_obj.nl_fieldset.style.display = 'none';
                        
                        
                        if( subscriberCenter_obj.user_email_div != null ){
                            subscriberCenter_obj.user_email_div.querySelector('span').innerHTML = subscriberCenter_obj.response_email;
                        }
                        
                        
                        break;
                        
                    default:
                        
                        //alert('TASK DEFAULT');
                        //subscriberCenter_obj.login_fieldset.style.display = 'block';
                    
                        
                        
                        break;
                }
                
                
                
                break;
        }
        
        
        
        
        
        // get form fields that have ids / PKs in the prime db - have the class 'nltrID'
        // this is a NodeList of form field elements/objects
        // this is data that is in the html of the page (from the db, versus what we get from the ajax calls / TL)
        // 2022-01-06 this arr is set more than once 
        subscriberCenter_obj.nltrID_arr = subscriberCenter_obj.login_form.querySelectorAll('input.nltrID');
        
        
        
        var form_index_obj;
        var form_index;
        var status;
        
        // loop ALL list data we got from TL (which is all the lists Prime has)
        for (var x = 0; x < subscriberCenter_obj.num_lists; x++) {
            
            form_index = -1;
            
            //console.log('---- subscriberCenter_obj.lists[x].nltrID', subscriberCenter_obj.lists[x].nltrID);
            
            // iterate over the all the form fields in the page (which is each newsletter section)
            subscriberCenter_obj.nltrID_arr.forEach(
                nltrID => {
                    // nltrID is a form field/object
                    if( subscriberCenter_obj.lists[x].nltrID == nltrID.value){
                        //console.log('MATCH nltrID', nltrID);
                        
                        // we have a form field storing an index value for sibling form fields
                        // DO WE NEED THE OBJ OR CAN WE JUST GRAB THE VALUE
                        form_index_obj = nltrID.parentNode.querySelector('.form_index');
                        form_index = form_index_obj.value;
                        
                        status = subscriberCenter_obj.lists[x].status;
                        
                        
                        // find the status form field and SET its value
                        nltrID.parentNode.querySelector(`#status${form_index}`).value = status;
                        
                        
                        
                        // set click handler for this NL checkbox
                        // (this will cover all .newsletter and .specialoffer inputs as we loop through)
                        //console.log('addEventListener -- setFormIsChanged');
                        nltrID.parentNode.querySelector(`#checked${form_index}`).addEventListener(
                            'click', 
                            subscriberCenter_obj.setFormIsChanged
                        );
                        
                        
                        // is this a .newsletter checkbox
                        if( nltrID.parentNode.querySelector(`#checked${form_index}`).classList.contains('newsletter') ){
                            // add a click event
                            
                            
                            // THIS WHOLE FRICKIN EVENT HANDLER IS JUST FOR WEEKLY??????
                            nltrID.parentNode.querySelector(`#checked${form_index}`).addEventListener(
                                'click', 
                                function(evt){
                                    //console.log(`NL box clicked (line 231)`, evt.currentTarget);
                                    
                                    let form_index = evt.currentTarget.parentNode.querySelector(`.form_index`).value;
                                    //console.log(`form_index`, form_index);
                                    
                                    let status_obj = evt.currentTarget.parentNode.querySelector(`#status${form_index}`);
                                    //console.log(`status_obj.value`, status_obj.value);
                                    
                                    
                                    // just for weekly?????
                                    switch (status_obj.value){
                                        case 'active':
                                            
                                            let is_checked = evt.currentTarget.checked;
                                            // if the box is not checked
                                            if (is_checked != true) {
                                                //console.log('not checked (line 280)');
                                                
                                                
                                                // I AM NOT SUPPORT WEEKLY FULLY YET
                                                // does the NL support weekly
                                                // check the form for an input with name nltrHasWeekly[x]
                                                //var has_weekly = $('form :input[name="nltrHasWeekly[' + index + ']"]').val();
                                            } else {
                                                // I AM NOT SUPPORT WEEKLY FULLY YET
                                                // cleaning up, just in case anything is out there
                                                //subscriberCenter_obj.removeWeekly($(this).parent(), index);
                                                //subscriberCenter_obj.removeAskAboutWeekly();
                                            }
                                            
                                            break;
                                            
                                        default:
                                            //console.log(`not active`);
                                            break;
                                    }
                                    
                                } // end click event
                            );
                            
                        } // end .newsletter click event
                        


                        
                        
                        
                        let checked = false;
                        switch (status) {
                            case 'active':
                                
                                if (subscriberCenter_obj.flow) {
                                    
                                    /*
                                        
                                        JQ STUFF THAT NEEDS TO GET UPDATED
                                    $('#checked' + form_index).parent().remove();
                                    // uncheck the box so handle the special offers too
                                            
                                    switch (TEMPLATEID) {
                                        case "2002":
                                            $('#checked' + form_index).prop('checked', checked);
                                            break;
                                        default:
                                            $('#checked' + form_index).attr('checked', checked);
                                            break;
                                    }
                                    */
    
                                } else {
                                    // THIS BLOCK JUST DEAL WITH WEEKLY CRAP??
                                    
                                    // default is checked
                                    checked = true;
                                    
                                    
                                    let is_weekly = '';
                                    // if we passed category data for this list
                                    if (subscriberCenter_obj.lists[x].categories != undefined  &&  subscriberCenter_obj.lists[x].categories.length > 0) {
                                        let num_cats = subscriberCenter_obj.lists[x].categories.length;
                                        // loop the list's cats
                                        for (var i = 0; i < num_cats; i++) {
                                            // if the cat 'weekly'
                                            if (subscriberCenter_obj.lists[x].categories[i].name == 'weekly') {
                                                is_weekly = 'isWeekly';
                                                
                                                // have not seen data that gets us here, but my testing showed the js works
                                                
                                                let node = document.createElement("INPUT");
                                                node.setAttribute("class", "orig_category");
                                                node.setAttribute("type", "hidden");
                                                node.setAttribute("name", `orig_category[${form_index}]`);
                                                node.setAttribute("value", subscriberCenter_obj.lists[x].categories[i].name);
                                                
                                                nltrID.parentNode.appendChild(node);
                                                
                                            }
                                        }
                                    }
                                    
                                    
                                    // check the box, and maybe add a class
                                    nltrID.parentNode.querySelector(`#checked${form_index}`).checked = checked;
                                    //nltrID.parentNode.querySelector(`#checked${form_index}`).classList.add(is_weekly);
                                    //nltrID.parentNode.querySelector(`#checked${form_index}`).setAttribute('checked', checked).classList.add(is_weekly);
                                    
                                    //$('#checked' + form_index).attr('checked', checked).addClass(is_weekly);
                                    
                                } // else
                                
                                
                                break; // active
                                
                            default:
                                // nothing
                                break;
                                
                        } // switch (status)
                        
                        
                        
                    }
    	        }    
            ); // forEach
            
            
            
        } // for subscriberCenter_obj.num_lists
        
        
        
        // do this here?
        subscriberCenter_obj.login_form.querySelector('[name=task]').value = 'subctr_update';
        // $('#subCenterLoginForm input[name=task]').val('subctr_update');
        
    }, // formSuccess
    
    
    resetFormIsChanged: function (){
        subscriberCenter_obj.form_is_changed = false;
    
        document.getElementById('submitBtnParent').classList.remove('bottomBar');
        //$('#submitBtnParent').removeClass('bottomBar');
    
        window.onbeforeunload = null;
    },
    
    
    setFormIsChanged: function (){
        if (subscriberCenter_obj.form_is_changed != true) {
            subscriberCenter_obj.form_is_changed = true;
    
            // add a class to the parent div of the submit btn
            document.getElementById('submitBtnParent').classList.add('bottomBar');
    
            window.onbeforeunload = function (e) {
                return 'You made changes to your subscriptions, but have not saved the changes.';
            };
            
        }
    
    }
    
    
    
}; // end object





// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    //console.log('DOMContentLoadedCallback called');
    
    
    if(typeof subscriberCenter_obj != "undefined"  &&  typeof subscriberCenter_obj.init != undefined){
        subscriberCenter_obj.init();
    }else{
        //console.log('no subscriberCenter_obj init');
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