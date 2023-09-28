


var PdfDownloadDhtmlJs = {
    
    user_logged_in: false,
    has_signup_cookie: false,
    show_signup_before_download: true,
    
    pdf_url: '',
    pdf_id: 0,
    
    signup_complete: false,
    signup_required: false,
    
    
    pdfs_downloaded: [],
    
    
    
    init: function(){
        //console.log('PdfDownloadDhtmlJs.init  2021-11-22');
        
        // do we have any pdf download links
        // get links with .launchPdfDownloadDhtml class and links where the href contains 'pdf_download.php'
        // the 'pdf_download.php' technically makes the class useless
        let nodes = document.querySelectorAll('.articleDiv .launchPdfDownloadDhtml, .articleDiv a[href*="pdf_download.php"]');
        
        
        if(nodes == null){
            return;
        }
        
        
        // is the user logged in or has the nl signup cookie
        // user_logged_in is global, set in html tpl
        // if have not done anything with PdfDownloadDhtmlJs.has_signup_cookie yet... 
        //if(user_logged_in  ||  PdfDownloadDhtmlJs.has_signup_cookie)
        
        // 2022-01-24
        // i updated this
        // the only time you completely avoid the dhtml is if you have a signup cookie
        
        /*
            2022-01-26 completely gone. decisions are moved to later in the workflow
        if( PdfDownloadDhtmlJs.has_signup_cookie ){
            PdfDownloadDhtmlJs.show_signup_before_download = false;
        }else{
            
            // see if we have local storage
            let allowed_pdfs = JSON.parse(localStorage.getItem("allow_pdf_download"));
            if(allowed_pdfs == null){
                PdfDownloadDhtmlJs.pdfs_downloaded = [];
            }else{
                PdfDownloadDhtmlJs.pdfs_downloaded = allowed_pdfs;
            }
            
            // PdfDownloadDhtmlJs.pdfs_downloaded has the list of pdfs i have previoulsy downloaded
            // but right now, I do not know what pdf i might download on this page
            // see click event below    
        }
        */
        
        
        
        // set the click event for the "pdf download links" 
        nodes.forEach(
            (node, index) => {
                
                node.addEventListener(
                    "click", 
                    function(evt){
                        console.log('evt.currentTarget', evt.currentTarget);
                        evt.preventDefault();
                        
                        // reset this
                        PdfDownloadDhtmlJs.pdf_id = 0;
                        
                        PdfDownloadDhtmlJs.pdf_url = evt.currentTarget.getAttribute('href');
                        console.log('PdfDownloadDhtmlJs.pdf_url', PdfDownloadDhtmlJs.pdf_url);
                        
                        
                        if(PdfDownloadDhtmlJs.pdf_url != null  &&  PdfDownloadDhtmlJs.pdf_url != ''){
                            
                            // create a new url obj using the "pdf url"
                            let new_url = new URL(PdfDownloadDhtmlJs.pdf_url);
                            
                            // get the query string from the url obj
                            PdfDownloadDhtmlJs.urlParams = new URLSearchParams( new_url.search );
                            //console.log('urlParams', PdfDownloadDhtmlJs.urlParams);
                            
                            
                            //console.log('has id', PdfDownloadDhtmlJs.urlParams.has('id'));
                            
                            // see if the qry string has an id key
                            if( PdfDownloadDhtmlJs.urlParams.has('id') ){
                                // get the key value
                                PdfDownloadDhtmlJs.pdf_id = PdfDownloadDhtmlJs.urlParams.get('id');
                            }
                            
                            /*
                            let link_arr = PdfDownloadDhtmlJs.pdf_url.split('=');
                            console.log('link_arr', link_arr);
                            PdfDownloadDhtmlJs.pdf_id = link_arr[1];
                            */
                        }
                        
                        
                        
                        
                        
                        
                        /*
                            2022-09-06 turned off
                        if( PdfDownloadDhtmlJs.pdf_id > 0){
                            // when you click a pdf link, we always want to make a call tho the server to get info on that pdf
                            // the call returns dhtml AND info about the signup being required
                            PdfDownloadDhtmlJs.getPdfData();
                        }else{
                            // we did not find a pdf id, which is unexpected, but try and get the user the pdf anyway
                            console.log('click link - trigger download');
                            PdfDownloadDhtmlJs.triggerDownload();
                        }
                        */
                        
                        
                        // 2022-09-06 turned back on
                        // if we have a pdf id AND
                        // we have an array of pdfs we already download AND
                        // the pdf being requested was already downloaded
                        if( 
                            (PdfDownloadDhtmlJs.pdf_id > 0)  &&  
                            (PdfDownloadDhtmlJs.pdfs_downloaded.length > 0)  &&  
                            (PdfDownloadDhtmlJs.pdfs_downloaded.includes( PdfDownloadDhtmlJs.pdf_id ))
                        ){
                            PdfDownloadDhtmlJs.show_signup_before_download = false;
                        }
                        
                        if( PdfDownloadDhtmlJs.pdf_id > 0  &&  PdfDownloadDhtmlJs.show_signup_before_download == true){
                            PdfDownloadDhtmlJs.getPdfData();
                        }else{
                            PdfDownloadDhtmlJs.triggerDownload();
                        }
                        
                    }, 
                    false
                );
            }
        );
        
        
        
        
        
    }, // init
    
    // called when the user clicks to close the box AND when the form returns
    closeDhtml: function(){
        let nodes = document.querySelectorAll('.dhtmlLoginWrapper');
        nodes.forEach(
            node => {
                node.style.display = 'none';
            }
        );
        
        
        let allow = true; // default
        // is this dhtml signup required 
        // this MIGHT need to be updated
        // not sure how this works if the user comes back or clicks another pdf link for the same pdf or a different pdf
        if( PdfDownloadDhtmlJs.signup_required == true ){
            allow = false;
            // did the user signup
            if( PdfDownloadDhtmlJs.signup_complete == true ){
                allow = true;
            }
        }
        
        
        if(allow == true){
            // set browser storage letting us know the user can get the download
            var dt = new Date();
            
            // get string from storage / conver to array
            let allowed_pdfs = JSON.parse(localStorage.getItem("allow_pdf_download"));
            if(allowed_pdfs == null  ||  !Array.isArray(allowed_pdfs)){
                allowed_pdfs = [];
            }
            
            // add the current pdf id to the array
            allowed_pdfs.push(PdfDownloadDhtmlJs.pdf_id);
            // convert arr to string and save to storage
            localStorage.setItem("allow_pdf_download", JSON.stringify(allowed_pdfs));
            //localStorage.setItem('allow_pdf_download', dt.getTime());
            
            // start the download
            console.log('close dhtml - trigger download');
            PdfDownloadDhtmlJs.triggerDownload();    
        }
            
    },
    
    displaySignup: function(){
        console.log('displaySignup');
        
        window.PdfDownloadDhtml.style.display = 'block';
        
    }, // displaySignup
    
    
    triggerDownload: function(){
        console.log('triggerDownload PdfDownloadDhtmlJs.pdf_url', PdfDownloadDhtmlJs.pdf_url);
        
        // if we got here, you no longer need the dhtml
        PdfDownloadDhtmlJs.show_signup_before_download = false;
        
        if(PdfDownloadDhtmlJs.pdf_url != ''){
            //console.log('aaaaa');
            window.open( PdfDownloadDhtmlJs.pdf_url );
        }else{
            //console.log('bbbb');
        }
    },
    
    
    getPdfData: function(){
        console.log('PdfDownloadDhtmlJs.pdf_id', PdfDownloadDhtmlJs.pdf_id); 
        
        
        fetch(`/ajax_process.php?task=get_pdf_download_pdf_dhtml&pdfID=${PdfDownloadDhtmlJs.pdf_id}`)
            .then((response) => response.json())
            .then(
                (data) => {
                    //console.log(data); 
                    
                    // logic to decide if we show the dhtml (which was previously in init()
                    
                    // see if we have local storage
                    let allowed_pdfs = JSON.parse(localStorage.getItem("allow_pdf_download"));
                    PdfDownloadDhtmlJs.pdfs_downloaded = [];
                    if(allowed_pdfs != null){
                        PdfDownloadDhtmlJs.pdfs_downloaded = allowed_pdfs;
                    }
                    
                    
                    // if we have a pdf id AND
                    // if we have an array of pdfs we already download AND
                    // the pdf being requested was already downloaded
                    if( 
                        (PdfDownloadDhtmlJs.pdf_id > 0)  &&  
                        (PdfDownloadDhtmlJs.pdfs_downloaded.length > 0)  &&  
                        (PdfDownloadDhtmlJs.pdfs_downloaded.includes( PdfDownloadDhtmlJs.pdf_id ))
                    ){
                        // the user already accessed this pdf
                        console.log('already accessed - trigger download');
                        PdfDownloadDhtmlJs.triggerDownload();    
                        return;
                        //PdfDownloadDhtmlJs.show_signup_before_download = false;
                    }
                    
                    
                    
                    // make sure we got dhtml 
                    if( (typeof data.html != undefined)  &&  data.html != ''){
                        
                        let node = window.PdfDownloadDhtml.querySelector('.dhtmlLoginContent'); 
                        
                        if(node != null){
                            node.innerHTML = data.html;
                            
                            window.PdfDownloadDhtml.style.display = 'block';
                            
                            PdfDownloadDhtmlJs.initDhtml();
                        }
                        
                    }else{
                        // i guess we found no dhtml, which should not happen
                        // so give them the pdf
                        console.log('missing dhtml - trigger download');
                        PdfDownloadDhtmlJs.triggerDownload();    
                        return;
                    }
                    
                    
                    
                    
                }
            )
            .catch(
                function(error) {
                    // If there is any error you will catch them here
                    console.log('exception', error);
                }
            );
        
        
    }, // getPdfData
    
    
    initDhtml: function(){
        
        
        // init close
        nodes = window.PdfDownloadDhtml.querySelectorAll('.closeBox');
        nodes.forEach(
            node => {
                node.addEventListener(
                    "click", 
                    function(evt){
                        evt.preventDefault();
                        
                        PdfDownloadDhtmlJs.closeDhtml();
                        
                    }, 
                    false
                );
            }
        );
        
        
        // show/hide privacy
        nodes = window.PdfDownloadDhtml.querySelectorAll('.privacy a');
        nodes.forEach(
            node => {
                node.addEventListener(
                    "click", 
                    function(evt){
                        evt.preventDefault();
                        
                        PdfDownloadDhtmlJs.togglePrivacy();
                        
                    }, 
                    false
                );
            }
        );
        
        // close privacy
        nodes = window.PdfDownloadDhtml.querySelectorAll('.closePrivacyContentLink');
        nodes.forEach(
            node => {
                node.addEventListener(
                    "click", 
                    function(evt){
                        evt.preventDefault();
                        
                        PdfDownloadDhtmlJs.togglePrivacy();
                        
                    }, 
                    false
                );
            }
        );
        
        
        // privacy scroll
        nodes = window.PdfDownloadDhtml.querySelectorAll('.privacyContent .goToTop');
        nodes.forEach(
            node => {
                node.addEventListener(
                    "click", 
                    function(evt){
                        evt.preventDefault();
                        
                        window.PdfDownloadDhtml.querySelector('.privacyContent > div').scrollTop = 0;
                        
                    }, 
                    false
                );
            }
        );
        
        
        let form_node = window.PdfDownloadDhtml.querySelector('form');
        
        form_node.addEventListener(
            'submit', 
            PdfDownloadDhtmlJs.sendData
        );
        
        
        // signup_complete intrigues me
        // i could be here for the fifth time on this page load, getting another dhtml/pdf
        // we are seeing if THIS signup is complete
        PdfDownloadDhtmlJs.signup_complete = false;
        // we are seeing if THIS pdf is req. not req by default
        PdfDownloadDhtmlJs.signup_required = false;
        
        
        if(form_node.dataset != null  &&  form_node.dataset.signupRequired != undefined  &&  form_node.dataset.signupRequired >= 1){
            console.log('signup req');
            PdfDownloadDhtmlJs.signup_required = true;
        }
        
        
        
        
    }, // initDhtml
    
    togglePrivacy: function(){
        
        let node = window.PdfDownloadDhtml.querySelector('.privacyContent');
                        
        if(node != null){
            if(node.classList.contains('show')){
                node.classList.remove('show');
            }else{
                node.classList.add('show');
            }
        }
        
    },
    
    
    sendData: function(event){
        //console.log('sendData', event.target);
        
        event.preventDefault();
        
        
        PdfDownloadDhtmlJs.form_obj = event.target;
        
        PdfDownloadDhtmlJs.form_obj.style.opacity = 0.3;
        
        
        
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
        const XHR = new XMLHttpRequest();
        
        // Bind the FormData object and the form element
        const FD = new FormData(PdfDownloadDhtmlJs.form_obj);
        
        
        // add data to send
        //FD.append('task', PdfDownloadDhtmlJs.form_obj.task.value);
        //FD.append('api_key', 'xm83n2lxkdh');
        
        
        
        // Define what happens on successful data submission
        XHR.addEventListener("load", function(event) {
            //console.log('event.target.responseText', event.target.responseText);
            
            PdfDownloadDhtmlJs.form_obj.style.opacity = 1.0;
            
            var response = JSON.parse( event.target.responseText);
            console.log('response', response);
            //console.log('response.result', response.result);
            
            
            PdfDownloadDhtmlJs.signup_complete = true;
            
            // close sets a localStorage value AND start download
            PdfDownloadDhtmlJs.closeDhtml();
            
            
        });
        
        
        
        // Define what happens in case of error
        XHR.addEventListener("error", function(event) {
            alert('Oops! Something went wrong.');
        });
        
        
        // Set up our request
        XHR.open("POST", PdfDownloadDhtmlJs.form_obj.action);
    
        // The data sent is what the user provided in the form
        XHR.send(FD);
        
    } // sendData
    
}





// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    //console.log('DOMContentLoadedCallback called');
    
    if(typeof PdfDownloadDhtmlJs != "undefined"  &&  typeof PdfDownloadDhtmlJs.init != undefined){
        PdfDownloadDhtmlJs.init();
    }else{
        //console.log('no PdfDownloadDhtmlJs init');
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