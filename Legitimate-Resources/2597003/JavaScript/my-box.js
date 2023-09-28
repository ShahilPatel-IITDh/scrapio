

var MyBoxJs = {
    
    load_max_attempts: 3,
    login_attempt_counter: 0,
    pagination_attempt_counter: 0,
    
    selected_article_div: false,
	selected_aID: false,
	selected_ufID: false,
	
	submitCallback: null,
    
    init: function(){
        //console.log('MyBoxJs.init  2021-11-10');
        
        
        // are we on the My Box page
        if(typeof document.getElementById('categoryArticles') != null  &&  document.getElementById('categoryArticles') != undefined){
            //console.log('MY BOX PAGE');
            MyBoxJs.initMyList();
        }
        
        
        // is this the article page AND does the page have actionButtons and add to my box functionality
        if(typeof document.querySelector('.fullArticle') != null  &&  document.querySelector('.fullArticle') != undefined){
            if(typeof document.querySelector('header .actionButtons') != null  &&  document.querySelector('header .actionButtons') != undefined){
                MyBoxJs.initArticlePage();
            }
        }
        
        
    },
    
    initArticlePage: function(){
        //console.log('MyBoxJs initArticlePage');
        
        
        
        
        
        // get a div on the ARTICLE page that has the article id in a data atribute
        // the div has these attrs (today) id="545380" data-a-id="545380" data-in-my-box="" data-display-rating="" class="fullArticle articleDiv articleType43 numCols"
        let element = document.querySelector(`[data-a-id]`);
        
        MyBoxJs.selected_aID = 0;
        MyBoxJs.selected_ufID = 0;
        MyBoxJs.is_in_box = 0;
        
        if(typeof element != null  &&  element != undefined){
            MyBoxJs.selected_aID = element.dataset.aId;
            MyBoxJs.is_in_box = element.dataset.inMyBox;    
        }
        
        
        // set the form submit callback for this page
        MyBoxJs.submitCallback = MyBoxJs.articlePageCallback;
        
        
        
        // now see what action buttons
        
        MyBoxJs.saveArticleBtn = document.querySelector('header .actionButtons li.save');
        //console.log('MyBoxJs.saveArticleBtn', MyBoxJs.saveArticleBtn);
        
        if(typeof MyBoxJs.saveArticleBtn != null  &&  MyBoxJs.saveArticleBtn != undefined){
            
            if( MyBoxJs.is_in_box == 0  ||  MyBoxJs.is_in_box == '' ){
                MyBoxJs.saveArticleBtn.style.display = 'block';
            }
            
            
            MyBoxJs.saveArticleBtn.addEventListener(
                "click", 
                function(evt){
                    //console.log('evt.currentTarget', evt.currentTarget);
                    //console.log('user_logged_in', user_logged_in);
                    
                    evt.preventDefault();
                    
                    
                    if(typeof user_logged_in != null  &&  user_logged_in != undefined  &&  user_logged_in == true){
                        // if you are logged in
                        MyBoxJs.saveArticleBtn.style.opacity = 0.3;
                        MyBoxJs.addToBox();
                    }else{
                        if(typeof LoginDhtmlJs != null  &&  LoginDhtmlJs != undefined){
                            LoginDhtmlJs.displayLoginDhtmlBox('dhtmlLogin');
                        }else{
                            alert('Please login to Save an Article');
                        }
                    }
                    
                }, 
                false
            );
        }
        
        
        
        MyBoxJs.removeArticleBtn = document.querySelector('header .actionButtons li.remove');
        if(typeof MyBoxJs.removeArticleBtn != null  &&  MyBoxJs.removeArticleBtn != undefined){
            
            if( MyBoxJs.is_in_box != '' &&  MyBoxJs.is_in_box > 0){
                MyBoxJs.removeArticleBtn.style.display = 'block';
            }
            
            
            MyBoxJs.removeArticleBtn.addEventListener(
                "click", 
                function(evt){
                    //console.log('evt.currentTarget', evt.currentTarget);
                    evt.preventDefault();
                    
                    
                    if(typeof user_logged_in != null  &&  user_logged_in != undefined  &&  user_logged_in == true){
                        // if you are logged in
                        MyBoxJs.removeArticleBtn.style.opacity = 0.3;
                    
                        MyBoxJs.removeFromBox();
                    }else{
                        if(typeof LoginDhtmlJs != null  &&  LoginDhtmlJs != undefined){
                            LoginDhtmlJs.displayLoginDhtmlBox('dhtmlLogin');
                        }else{
                            alert('Please login to Save an Article');
                        }
                    }
                    
                }, 
                false
            );
        }
        

        
        
    },
    
    
    initMyList: function(){
        //console.log('MyBoxJs initMyList');
        
        MyBoxJs.submitCallback = MyBoxJs.myBoxCallback;
        
        
        
        MyBoxJs.addToFolder_node = document.getElementById('addArticleToFolder');
        
        if(typeof MyBoxJs.addToFolder_node == null  ||  MyBoxJs.addToFolder_node == undefined){
            return;
        }
        
        
        MyBoxJs.addToFolder_form = MyBoxJs.addToFolder_node.querySelector('form');
        MyBoxJs.initAddToFolderForm();
        
        
            
        
        let nodes;
        
        nodes = document.querySelectorAll('#categoryArticles .articleDiv .addArticleToFolder a');
        nodes.forEach(
            node => {
                node.addEventListener(
                    "click", 
                    function(evt){
                        evt.preventDefault();
                        
                        MyBoxJs.addToFolder_form.querySelector('input[name=aID]').value = evt.currentTarget.dataset.aId;
                        
                        MyBoxJs.addToFolder_node.style.display = 'block';
                    }, 
                    false
                );
            }
        );
        
        
        // remove from FOLDER
        nodes = document.querySelectorAll('#categoryArticles .articleDiv .removeArticleFromFolder a');
        //console.log('nodes', nodes);
        
        
        // set the event listeners for the links
        nodes.forEach(
            node => {
                node.addEventListener(
                    "click", 
                    function(evt){
                        console.log('evt.currentTarget', evt.currentTarget.dataset);
                        evt.preventDefault();
                        
                        MyBoxJs.selected_article_div = evt.currentTarget.closest('div.articleDiv');
                        MyBoxJs.selected_article_div.classList.add('myBoxSelected');
                        
                        
                        //alert('remove from folder');
                        if(confirm('Would you like to remove this item from the folder?')){
                            
                            MyBoxJs.selected_aID = evt.currentTarget.dataset.aid;
                            MyBoxJs.selected_ufID = evt.currentTarget.dataset.folderid;
                            
                            MyBoxJs.removeArticleFromFolder();
                        }else{
    						MyBoxJs.selected_article_div.classList.remove('myBoxSelected');
    						MyBoxJs.selected_aID = 0;
						}
                    }, 
                    false
                );
	        }
        );
        
        
        // remove from BOX
        nodes = document.querySelectorAll('#categoryArticles .articleDiv .removeArticleFromMyBox a');
        //console.log('nodes', nodes);
        
        nodes.forEach(
            node => {
                node.addEventListener(
                    "click", 
                    function(evt){
                        //console.log('evt.currentTarget', evt.currentTarget);
                        evt.preventDefault();
                        
                        // find the parent/ancestor of this link that has class "articleDiv"
                        MyBoxJs.selected_article_div = evt.currentTarget.closest('div.articleDiv');
                        MyBoxJs.selected_article_div.classList.add('myBoxSelected');
                        
                        
                        if(confirm('Would you like to remove this item?')){
							
							
							//MyBoxJs.selected_aID = $(MyBoxJs.selected_article_div).attr('id');
							MyBoxJs.selected_aID = MyBoxJs.selected_article_div.dataset.aId;
							MyBoxJs.delete_result = false; 
							
							MyBoxJs.removeFromBox();
							
							
						}else{
    						MyBoxJs.selected_article_div.classList.remove('myBoxSelected');
    						MyBoxJs.selected_aID = 0;
						}
                        
                    }, 
                    false
                );
	        }
        );
        
        // remove from BOX
        
        
        
        // hidding for now
        nodes = document.querySelectorAll('.dhtmlLoginWrapper .myBoxAddFolderLink');
        nodes.forEach(
            node => {
                node.style.display = 'none';
            }
        );
        
        
        nodes = document.querySelectorAll('.dhtmlLoginWrapper .closeBox');
        nodes.forEach(
            node => {
                node.addEventListener(
                    "click", 
                    function(evt){
                        //console.log('evt.currentTarget', evt.currentTarget);
                        evt.preventDefault();
                        
                        MyBoxJs.closeDhtml();
                        
                    }, 
                    false
                );
            }
        );
        
    }, // initMyList
    
    
    
    
    displayLogin: function(){
        
        
        // we want to show the dhtml login if needed
        if( typeof LoginDhtmlJs != 'undefined' ){
            
            
            // the html page does have a login link, so set that click
            MyBoxJs.link = document.querySelector('.myBoxPageLoginLink');
            
            MyBoxJs.link.addEventListener(
                'click', 
                function(evt){
                    //console.log('evt.currentTarget', evt.currentTarget);
                    evt.preventDefault();
                    LoginDhtmlJs.displayLoginDhtmlBox('dhtmlLogin');
                }
            );
            
            
            // check if the dhtml login js file is loaded / avaialble
            if(LoginDhtmlJs.ready == true){
                LoginDhtmlJs.displayLoginDhtmlBox('dhtmlLogin');
            }else{
                
                if(MyBoxJs.login_attempt_counter < MyBoxJs.load_max_attempts){
                    // give the LoginDhtmlJs js a chance to load
                    setTimeout("MyBoxJs.displayLogin();", 1500);
                }
                
                MyBoxJs.login_attempt_counter++;
                
            }
            
        }
        
    }, // displayLogin
    
    
    addToBox: function(){
        let data = {
            task: 'add_article_to_box',
            aID: MyBoxJs.selected_aID
        }
        
        MyBoxJs.sendData(data);
    },
    
    
    removeFromBox: function(){
        let data = {
            task: 'remove_article_from_box',
            aID: MyBoxJs.selected_aID
        }
        
        MyBoxJs.sendData(data);
    },
    
    removeArticleFromFolder: function(){
        let data = {
            task: 'remove_article_from_folder',
            aID: MyBoxJs.selected_aID,
            ufID: MyBoxJs.selected_ufID
        }
        
        MyBoxJs.sendData(data);
    },
    
    sendData: function(params){
        //console.log('sendData', params);
        
        
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
        const XHR = new XMLHttpRequest();
        
        // Bind the FormData object and the form element
        const FD = new FormData();
        
        
        // add data to send
        FD.append('task', params.task);
        FD.append('aID', params.aID);
        
        if(typeof params.ufID != 'undefined'  &&  params.ufID != null){
            FD.append('ufID', params.ufID);
        }
        
        
        
        
        // Define what happens on successful data submission
        XHR.addEventListener("load", function(event) {
            //console.log('event.target.responseText', event.target.responseText);
            
            
            MyBoxJs.submitCallback(JSON.parse( event.target.responseText));
            
            
            return;
            
            
            
            var response = JSON.parse( event.target.responseText);
            //console.log('response', response);
            //console.log('response.result', response.result);
            
            
            
            
        });
        
        
        
        
        // Define what happens in case of error
        XHR.addEventListener("error", function(event) {
            alert('Oops! Something went wrong.');
        });
        
        
        // Set up our request
        XHR.open("POST", '/ajax_process.php');
    
        // The data sent is what the user provided in the form
        XHR.send(FD);
        
    
    }, // sendData
    
    
    
    myBoxCallback: function(response){
        //console.log('MyBoxJs myBoxCallback', response);
        
        MyBoxJs.selected_article_div.classList.remove('myBoxSelected');
                    
        MyBoxJs.selected_aID = 0;
        MyBoxJs.selected_ufID = 0;
        
        
        if(response.result == true  ||  response.result >= 1){
            
            MyBoxJs.selected_article_div.classList.add('fadeOut');
            
            let animated = document.querySelector('.fadeOut');
            animated.addEventListener('animationend', () => {
                //console.log('Animation ended');
                MyBoxJs.selected_article_div.remove();
                MyBoxJs.selected_article_div = null;
            });
            
        }else{
            
            alert('error');
            
        }
        
    },
    
    
    articlePageCallback: function(response){
        //console.log('MyBoxJs articlePageCallback', response);
        
        MyBoxJs.saveArticleBtn.style.opacity = 1.0;
        MyBoxJs.removeArticleBtn.style.opacity = 1.0;
        
        if(response.success == 1){
            //alert('success');
            
            if(response.added == 1){
                
                MyBoxJs.removeArticleBtn.style.display = 'block';
                MyBoxJs.saveArticleBtn.style.display = 'none';
                
                alert('This has been added to your saved projects.');
                
            }else if(response.removed == 1){
                //alert('removed');
                MyBoxJs.removeArticleBtn.style.display = 'none';
                MyBoxJs.saveArticleBtn.style.display = 'block';
            }
            
            
        }else{
            alert("Oops... That didn't work. Sorry.");
        }
        
    }, 
    
    
    
    initAddToFolderForm: function(){
        
        if( typeof MyBoxJs.addToFolder_form == undefined  ||  MyBoxJs.addToFolder_form == null){
            return 0;
        }
        
        MyBoxJs.getFolderSelectOptions();
        
        
        MyBoxJs.addToFolder_form.addEventListener(
            'submit', 
            function(event){
                //console.log('submit form');
                event.preventDefault();
                
                
                MyBoxJs.addToFolder_node.style.opacity = 0.6;
                
                
                
                const XHR = new XMLHttpRequest();
                const FD = new FormData(MyBoxJs.addToFolder_form);
                
                
                
                XHR.addEventListener(
                    "load", 
                    function(event) {
                    
                        MyBoxJs.addToFolder_node.style.opacity = 1.0;
                        
                        let response = JSON.parse( event.target.responseText);
                        
                        let msg = '';
                        
                        if(response.success == 1){
                            if(response.msg != ''){
                                msg = response.msg;
                            }
                        }else{
                            msg = 'There was an issue. We could not add to the folder.';
                        }
                        
                        
                        MyBoxJs.addToFolder_node.querySelector('.userFeedback').innerHTML = msg;
                        
                        
                        //hide the dhtml
                        setTimeout("MyBoxJs.closeDhtml();", 1500);
                        
                        //update the list of folders for this article
                        location.reload(); 
                        
                        
                        
                    }
                );
                
                
                
                
                // Define what happens in case of error
                XHR.addEventListener("error", function(event) {
                    alert('Oops! Something went wrong.');
                });
                
                
                // Set up our request
                XHR.open("POST", MyBoxJs.addToFolder_form.action);
            
                // The data sent is what the user provided in the form
                XHR.send(FD);
            }
        );
        
    }, // initAddToFolderForm
    
    
    getFolderSelectOptions: function(){
        
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
        const XHR = new XMLHttpRequest();
        
        // Bind the FormData object and the form element
        const FD = new FormData();
        
        
        // add data to send
        //FD.append('task', 'xxxx');
        
        
        
        // Define what happens on successful data submission
        XHR.addEventListener(
            "load", 
            function(event) {
                //console.log('event.target.responseText', event.target.responseText);
                
                if(typeof event.target.responseText == null  ||  event.target.responseText == undefined  ||  event.target.responseText == ''){
                    return;
                }
                
                var result = JSON.parse(event.target.responseText);
                
                if(result.length < 1){
                    return;
                }
                
                
                
                let select_menu = MyBoxJs.addToFolder_form.querySelector('select[name=ufID]');
                let option_nodes = select_menu.querySelectorAll('option')
                option_nodes.forEach(
                    node => {
                        node.remove();
                    }
                );
                
                
                let option = document.createElement('option');
                
                option.value = 0;
                option.text = '-- Top Level --';
                select_menu.add(option);
                
                for(var x=0; x<result.length; x++) {
                    
                    option = document.createElement('option');
                    option.value = result[x].ufID;
                    option.text = result[x].ufName;
    				
    				select_menu.add(option);
    				
    				if( result[x].sub_folders != null  &&  result[x].sub_folders != undefined  &&  result[x].sub_folders.length > 0 ){
        				
        				for(let z=0; z<result[x].sub_folders.length; z++) {
            				option = document.createElement('option');
                            option.value = result[x].sub_folders[z].ufID;
                            option.text = ' --- ' + result[x].sub_folders[z].ufName;
            				
            				select_menu.add(option);
                        }
        				
    				}
                }
            
        });
        
        
        
        
        
        // Define what happens in case of error
        XHR.addEventListener("error", function(event) {
            alert('Oops! Something went wrong.');
        });
        
        
        // Set up our request
        XHR.open("POST", '/ajax_process.php?task=my_box_get_folder_select_options');
    
        // The data sent is what the user provided in the form
        XHR.send(FD);
        
    }, //getFolderSelectOptions
    
    
    closeDhtml: function(){
        let nodes = document.querySelectorAll('.dhtmlLoginWrapper');
        nodes.forEach(
            node => {
                node.style.display = 'none';
            }
        );
    }
    
}














// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    //console.log('DOMContentLoadedCallback called');
    
    
    if(typeof MyBoxJs != "undefined"  &&  typeof MyBoxJs.init != undefined){
        MyBoxJs.init();
    }else{
        //console.log('no MyBoxJs init');
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