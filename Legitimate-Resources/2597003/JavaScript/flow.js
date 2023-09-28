var flow = {
    isNewSignup: false,
    flowID: 0,
    url: '',
    placeholders: {
        site_url: "",
        email: "",
        enc_email: ""
    },

    initialize: function() {

    },

    // user signed up for a
    // newsletter
    signupRedirect: function(email, enc_email) {

        // log the user being sent to flow 
        if(this.flowID > 0){
            // we do not need a response for the ajax call logFlowID, but we are still giving a small delay
            
            const XHR = new XMLHttpRequest();
            
            
            const FD = new FormData();
            
            // add data to send
            FD.append('task', 'log_flow_id');
            FD.append('fuID', this.flowID);
            
            
            
            
            // Define what happens on successful data submission
            XHR.addEventListener("load", function(event) {
                console.log('event.target.responseText', event.target.responseText);
            
            }); 
            
            
            
            // Define what happens in case of error
            XHR.addEventListener("error", function(event) {
                alert('Oops! Something went wrong.');
            });
            
            
            // Set up our request
            XHR.open("POST", '/ajax_process.php');
        
            // The data sent is what the user provided in the form
            XHR.send(FD);
            
        }

        
        // do we have a redirect url
        if (this.url != '') {
            
            
            // set some vars that are strings we will search for
            var replace_site_url = this.placeholders.site_url;
            var replace_email = this.placeholders.email;
            var replace_enc_email = this.placeholders.enc_email;
                


            // go through each string, if it is not empty
            if (replace_site_url != '') {
                // add the home page url for this site, urlencoded
                this.url = this.url.replace(replace_site_url, escape(window.location.origin));
            }
            
            if (replace_email != '') {
                // add the email address the user signed up with
                this.url = this.url.replace(replace_email, email);
            }
        
            if (replace_enc_email != '') {
                // add the email address the user signed up with
                // haystack_string.replace(needle, replace_string)
                this.url = this.url.replace(replace_enc_email, enc_email);
            }		
            
            /**
            *2012-10-12
            *see if the signup is actually a new signup (based on criteria in ML API classes)
            *if so, append a key/val to the redirect flow url
            */
            if( this.isNewSignup ){
                var addl_qry_str = '?';
                if(this.url.indexOf("?") > 0){
                    // the url already has a query string, so just tack on to it
                    addl_qry_str = '&';
                }
                
                this.url += addl_qry_str + 'pp=1';
            }
            
            
            
            
            // redirect the user
            window.location.href = this.url;
        }

    }

};


window.flow = flow;
