


var myBoxGetFolder_obj = {
    
    
    init: function(){
        console.log('myBoxGetFolder_obj.init 2021-11-10');
        
        
        
        // are we on the My Folder page
        myBoxGetFolder_obj.main_node = document.getElementById('myBoxFolderContent');
        
        if(typeof myBoxGetFolder_obj.main_node != null  &&  myBoxGetFolder_obj.main_node != undefined){
            //console.log('MY FOLDER PAGE');
            
            myBoxGetFolder_obj.displayLoading();
            //myBoxGetFolder_obj.main_node.style.display = 'block';
            
            
            myBoxGetFolder_obj.addFolder_node = document.getElementById('addFolder');
            myBoxGetFolder_obj.addFolder_form = myBoxGetFolder_obj.addFolder_node.querySelector('form');
            
            myBoxGetFolder_obj.deleteFolder_form = window.deleteFolder.querySelector('form');
            
            
            
            let close_links = document.querySelectorAll('.dhtmlLoginWrapper .closeBox');
            close_links.forEach(
                node => {
                    node.addEventListener(
                        "click", 
                        function(evt){
                            console.log('evt.currentTarget', evt.currentTarget);
                            evt.preventDefault();
                            
                            myBoxGetFolder_obj.closeDhtml();
                            
                        }, 
                        false
                    );
                }
            );
        
            
            
            myBoxGetFolder_obj.initMyList();
        }
        
    }, // init
    
    
    closeDhtml: function(){
        let nodes = document.querySelectorAll('.dhtmlLoginWrapper');
        nodes.forEach(
            node => {
                node.style.display = 'none';
            }
        );
    },
    
    
    displayLoading: function(){
        myBoxGetFolder_obj.main_node.innerHTML = '<img class="loading" src="/images/ajax-indicator.gif" alt="loading" style="max-width: 16px; height: auto;" width="16" > Loading...';
    },
    
    
    initMyList: function(){
        console.log('myBoxGetFolder_obj.initMyList');
        
        myBoxGetFolder_obj.folder_select_obj = {};
		myBoxGetFolder_obj.folder_select_obj.select_node;
		myBoxGetFolder_obj.folder_select_obj.options
		myBoxGetFolder_obj.folder_select_obj.get_options_callback;
        
        
        myBoxGetFolder_obj.initAddFolderLink();
        myBoxGetFolder_obj.initAddFolderForm();
        myBoxGetFolder_obj.getFolderContent();
		
		
		myBoxGetFolder_obj.initDeleteFolderForm();
		
		//myBoxGetFolder_obj.hijackForm_addSubFolderRename();
		
		/*			
		myBoxGetFolder_obj.hijackForm_folderRename();
		myBoxGetFolder_obj.hijackForm_deleteRename();
		myBoxGetFolder_obj.hijackForm_moveRename();
		
		*/
        
    }, // initMyList
    
    
    initAddFolderForm: function(){
        console.log('NewsletterSignupJs.initForm');
        
        //let addFolder_obj = document.getElementById('addFolder');
        //let form_node = addFolder_obj.querySelector('form');
        
        if( typeof myBoxGetFolder_obj.addFolder_form == undefined  ||  myBoxGetFolder_obj.addFolder_form == null){
            return 0;
        }
        
        myBoxGetFolder_obj.addFolder_form.addEventListener(
            'submit', 
            function(event){
                console.log('submit form');
                event.preventDefault();
                
                
                myBoxGetFolder_obj.addFolder_node.style.opacity = 0.3;
                
                
                const XHR = new XMLHttpRequest();
                const FD = new FormData(myBoxGetFolder_obj.addFolder_form);
                
                
                
                XHR.addEventListener(
                    "load", 
                    function(event) {
                    
                        myBoxGetFolder_obj.addFolder_node.style.opacity = 1.0;
                        
                        let response = JSON.parse( event.target.responseText);
                        
                        let msg = '';
                        
                        if(response.success == 1){
                            if(response.msg != ''){
                                msg = response.msg;
                            }
                        }else{
                            msg = 'There was an issue. We could not create your folder.';
                        }
                        
                        
                        myBoxGetFolder_obj.addFolder_node.querySelector('.userFeedback').innerHTML = msg;
                        
                        setTimeout("myBoxGetFolder_obj.closeDhtml();", 1500);
                        
                        myBoxGetFolder_obj.getFolderContent();
                        
                    }
                );
                
                
                
                
                // Define what happens in case of error
                XHR.addEventListener("error", function(event) {
                    alert('Oops! Something went wrong.');
                });
                
                
                // Set up our request
                XHR.open("POST", myBoxGetFolder_obj.addFolder_form.action);
            
                // The data sent is what the user provided in the form
                XHR.send(FD);
            }
        );

        
        
    }, // initForm
    
    
    initAddFolderLink: function(){
        
        let add_link = document.querySelector('.myBoxAddFolderLink');
        
        if(typeof add_link != null  &&  add_link != undefined){
            add_link.addEventListener(
                "click", 
                function(evt){
                    evt.preventDefault();
                    
                    
                    if(evt.currentTarget.dataset.rel != 'undefined'  &&  evt.currentTarget.dataset.rel == 'reloadDirList'){
                        myBoxAddFolder_obj.reopenTheAddArticleToFolderPopup = true;
				    }
				    
				    
					/*
					the "add article to folder" pop up might be open
					it now has a link to add a folder
					*/
					
					//let addFolder_obj = document.getElementById('addFolder');
					myBoxGetFolder_obj.addFolder_node.querySelector('input[name=folder_name]').value = '';
					myBoxGetFolder_obj.addFolder_node.querySelector('.userFeedback').innerHTML = '';
					
					
					
					
					myBoxGetFolder_obj.getFolderSelectOptions();
					
							
                }, 
                false
            );
        }
        
        
            
    }, // initAddFolderLink
    
    
    
    getFolderContent: function(){
		
		myBoxGetFolder_obj.displayLoading();
		
		
		
		var XHR = new XMLHttpRequest();
        
        XHR.addEventListener(
            "load", 
            function(event) {
                console.log('load');
                console.log(event);
                
                myBoxGetFolder_obj.main_node.innerHTML = event.target.responseText;
            }
        );
        
        XHR.addEventListener(
            "loadend", 
            function(event) {
                console.log('loadend');
                myBoxGetFolder_obj.initHtml();
            }
        );
        
        // Define what happens in case of error
        XHR.addEventListener("error", function(event) {
            alert('Oops! Something went wrong.');
        });
        
        
        
        XHR.open('GET', `/ajax_process.php?task=my_box_get_folders&x=${Date.now()}`); // browser cache buster
        
        XHR.send();
		
	}, // getFolderContent
	
	
	initHtml: function(){
    	
    	console.log('myBoxGetFolder_obj.initHtml');
    	
    	
    	myBoxGetFolder_obj.initDelete();
    	
    	
    	return;
    	
    	
    	/*
		$('.myBoxUserFolderDiv').hover(
			function(){
				$(this).css(
					{
						'background-color' : '#f1f1f1'
					}
				);
				
				$(this).find('.folder_options .headline_link').show();
				
			},
			function(){
			
				$(this).css(
					{
						'background-color' : '#fff'
					}
				);
				
				$(this).find('.folder_options').children().hide();
					
				
			}
		);
		
		
		$('.myBoxUserFolderDiv .headline_link').click(
			function(){
				$(this).hide().siblings('ul').show();
				
				myBoxGetFolder_obj.options_menu_shown = true;
				
				return false;
			}
		);
		
		
		$('.myBoxUserFolderDiv .folder_options ul a').each(
			function(i){

				switch($(this).attr('rel')){
					case 'add_subfolder':
						$(this).click(
							function(){
								$(this).find('ul').hide();
								myBoxGetFolder_obj.displayAddSubFolderForm($(this));
								
								return false;
							}
						);
					
						break;
					case 'delete':
						$(this).click(
							function(){
								
								$(this).find('ul').hide();
								myBoxGetFolder_obj.displayDeleteFolderForm($(this));
								
								return false;
							}
						);
					
						break;
					
					case 'move':
						$(this).click(
							function(){
								
								$(this).find('ul').hide();
								myBoxGetFolder_obj.displayMoveFolderForm($(this));
								
								return false;
							}
						);
					
						break;
					
					case 'rename':
						$(this).click(
							function(){
								
								$(this).find('ul').hide();
								myBoxGetFolder_obj.displayRenameFolderForm($(this));
								
								return false;
							}
						);
						break;
						
					default:
						$(this).click(
							function(){
								
								return false;
							}
						);
						break;
				}
			}
		);
		
		*/
		
		
	}, // initHtml
	
	
	initDeleteFolderForm: function(){
    	
    	if( typeof myBoxGetFolder_obj.deleteFolder_form == undefined  ||  myBoxGetFolder_obj.deleteFolder_form == null){
            return 0;
        }
        
        
        myBoxGetFolder_obj.deleteFolder_form.addEventListener(
            'submit', 
            function(event){
                console.log('submit form');
                event.preventDefault();
                
                
                window.deleteFolder.style.opacity = 0.3;
                
                
                
                const XHR = new XMLHttpRequest();
                const FD = new FormData(myBoxGetFolder_obj.deleteFolder_form);
                
                
                
                XHR.addEventListener(
                    "load", 
                    function(event) {
                    
                        window.deleteFolder.style.opacity = 1.0;
                        
                        let response = JSON.parse( event.target.responseText);
                        
                        let msg = '';
                        
                        if(response.success == 1){
                            if(response.msg != ''){
                                msg = response.msg;
                            }
                        }else{
                            msg = 'There was an issue. We could not create your folder.';
                        }
                        
                        
                        myBoxGetFolder_obj.deleteFolder_form.querySelector('.userFeedback').innerHTML = msg;
                        
                        setTimeout("myBoxGetFolder_obj.closeDhtml();", 1500);
                        
                        myBoxGetFolder_obj.getFolderContent();
                        
                    }
                );
                
                
                
                
                // Define what happens in case of error
                XHR.addEventListener("error", function(event) {
                    alert('Oops! Something went wrong.');
                });
                
                
                // Set up our request
                XHR.open("POST", myBoxGetFolder_obj.deleteFolder_form.action);
            
                // The data sent is what the user provided in the form
                XHR.send(FD);
            }
        );
    	
    	
	}, // initDeleteFolderForm
	
	initDelete: function(){
    	
    	
        let nodes = myBoxGetFolder_obj.main_node.querySelectorAll('.myBoxUserFolderDiv h3 .fa-trash-alt');
    	
    	nodes.forEach(
            node => {
                node.addEventListener(
                    "click", 
                    function(evt){
                        //console.log('evt.currentTarget', evt.currentTarget, evt.currentTarget.dataset.ufid, evt.currentTarget.dataset.ufname);
                        
                        evt.preventDefault();
                        
                        
                        window.deleteFolder.querySelector('.folderName').textContent = evt.currentTarget.dataset.ufname;
                        
                        window.deleteFolder.querySelector('form [name="ufID"]').value = evt.currentTarget.dataset.ufid; 
                        
                        window.deleteFolder.style.display = 'block';
                        
                        
                    }, 
                    false
                );
            }
        );
    	
    	
    }, // initDelete
	
	
	
	// not live yet
	hijackForm_addSubFolderRename: function(){
    	
    	
    	myBoxGetFolder_obj.renameFolder_node = document.getElementById('renameFolder');
        myBoxGetFolder_obj.renameFolder_form = myBoxGetFolder_obj.renameFolder_node.querySelector('form');
            
        
        
        if( typeof myBoxGetFolder_obj.renameFolder_form == undefined  ||  myBoxGetFolder_obj.renameFolder_form == null){
            return 0;
        }
        
        
        myBoxGetFolder_obj.renameFolder_form.addEventListener(
            'submit', 
            function(event){
                console.log('submit form');
                event.preventDefault();
                
                myBoxGetFolder_obj.renameFolder_node.style.opacity = 0.3;
                
                
                const XHR = new XMLHttpRequest();
                const FD = new FormData(myBoxGetFolder_obj.renameFolder_form);
                
                
                
                XHR.addEventListener(
                    "load", 
                    function(event) {
                    
                        myBoxGetFolder_obj.renameFolder_node.style.opacity = 1.0;
                        
                        let response = JSON.parse( event.target.responseText);
                        
                        let msg = '';
                        
                        if(response.success == 1){
                            if(response.msg != ''){
                                msg = response.msg;
                            }
                        }else{
                            msg = 'There was an issue. We could not create your folder.';
                        }
                        
                        
                        myBoxGetFolder_obj.renameFolder_node.querySelector('.userFeedback').innerHTML = msg;
                        
                        setTimeout("myBoxGetFolder_obj.closeDhtml();", 1500);
                        
                        myBoxGetFolder_obj.getFolderContent();
                        
                    }
                );
                
                
                
                
                // Define what happens in case of error
                XHR.addEventListener("error", function(event) {
                    alert('Oops! Something went wrong.');
                });
                
                
                // Set up our request
                XHR.open("POST", myBoxGetFolder_obj.renameFolder_form.action);
            
                // The data sent is what the user provided in the form
                XHR.send(FD);
            }
        );
    	
    	/*
    	return;
				
		$('#addSubFolder form').ajaxForm(
			{
				beforeSubmit: myBoxGetFolder_obj.ajaxFormPreSubmit_addSubFolder,
				dataType: 'json',
				success: function(json){
					
					if(json.success == 1){
						myBoxGetFolder_obj.getFolderContent();
						
						$('#addSubFolder .userFeedback').html(json.msg);
						setTimeout( "$('#addSubFolder .closeBox').click()", 3000);
						
					}else{
						$('#addSubFolder .userFeedback').html(json.msg);
					}
					
				},
				error: function(){
				
				},
				complete: function(){
					
				}
			}
		);*/
				
    }, // hijackForm_addSubFolderRename
    
    
    // gets a list of folders/subfolders
    // could be renamed / repurposed if needed
    getFolderSelectOptions: function(){
        
        // https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
        const XHR = new XMLHttpRequest();
        
        // Bind the FormData object and the form element
        const FD = new FormData();
        
        
        // add data to send
        //FD.append('task', 'xxx');
        
        
        
        // Define what happens on successful data submission
        XHR.addEventListener("load", function(event) {
            //console.log('event.target.responseText', event.target.responseText);
            
            
            
            //let addFolder_obj = document.getElementById('addFolder');
            
            myBoxGetFolder_obj.addFolder_node.style.display = 'block';
            
            
            if(typeof event.target.responseText == null  ||  event.target.responseText == undefined  ||  event.target.responseText == ''){
                return;
            }
            
            var result = JSON.parse(event.target.responseText);
            //console.log('result', result);
            
            
            // COULD / SHOULD BE IN A STAND ALONE METHOD
            
            if(result.length < 1){
                return;
            }
            
            
            
            let select_menu = myBoxGetFolder_obj.addFolder_node.querySelector('form select[name=parent_folder_id]');
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

        
        
    } //getFolderSelectOptions
    
    
}





// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    //console.log('DOMContentLoadedCallback called');
    
    if(typeof myBoxGetFolder_obj != "undefined"  &&  typeof myBoxGetFolder_obj.init != undefined){
        myBoxGetFolder_obj.init();
    }else{
        console.log('no myBoxGetFolder_obj init');
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