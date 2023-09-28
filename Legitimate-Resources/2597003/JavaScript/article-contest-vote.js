


var ArticleContestVoteJs = {
    
    
	vote_complete: 0,
    contest_id: 0,
    cookie_name: '',
    cdn_domain: '',
			
    articles_voted_for: [],
    //total_votes_cast: 0,
    total_votes_allowed: 0,
    
			
    
    init: function(){
        //console.log('ArticleContestVoteJs.init  2021-11-22');
        
        
        if(window.articleContestListDiv == null){
            return;
        }
        
        
        // grab data-attr values
        ArticleContestVoteJs.contest_id = window.articleContestListDiv.dataset.contestId;
        ArticleContestVoteJs.cookie_name = window.articleContestListDiv.dataset.cookieName;
        ArticleContestVoteJs.cdn_domain = window.articleContestListDiv.dataset.cdnDomain;
        ArticleContestVoteJs.total_votes_allowed = window.articleContestListDiv.dataset.totalVotesAllowed;
        
        ArticleContestVoteJs.has_storage = 0;
		if(typeof(Storage) !== "undefined") {
			ArticleContestVoteJs.has_storage = 1;
			
			// get data about previous votes
            ArticleContestVoteJs.articles_voted_for = ArticleContestVoteJs.getVoteData();
            
            //ArticleContestVoteJs.total_votes_cast = ArticleContestVoteJs.articles_voted_for.length;
            ArticleContestVoteJs.articles_voted_for.forEach(
        	    (listID, index) => {
            	    ArticleContestVoteJs.markArticleVotedFor(listID);
        	    }
            );
            
            // have you reached the limit on voting
			if(ArticleContestVoteJs.articles_voted_for.length >= ArticleContestVoteJs.total_votes_allowed){
				ArticleContestVoteJs.vote_complete = 1;
				ArticleContestVoteJs.voteComplete();
            }
        }
            
        
		        
        // links to show article content
        let nodes = window.articleContestListDiv.querySelectorAll('.imageWrapper a, .viewArticleLink');
        nodes.forEach(
            node => {
                node.addEventListener(
                    "click", 
                    function(evt){
                        //console.log('evt.currentTarget', evt.currentTarget.dataset.listId);
                        
                        evt.preventDefault();
                        
                        ArticleContestVoteJs.viewArticle( evt.currentTarget.dataset.listId );
                        
                    }, 
                    false
                );
            }
        );
        
        
        // vote buttons in the grid (not the dhtml)
        ArticleContestVoteJs.initVoteButtons();
        
        
        
        // dhtml close box
        window.articleContestArticleViewDiv.querySelector('.articleContestArticleViewContent .closeBox').addEventListener(
            "click", 
            function(evt){
                console.log('evt.currentTarget', evt.currentTarget);
                
                evt.preventDefault();
                
                ArticleContestVoteJs.closeArticleBox();
                
            }, 
            false
        );
        
        
    }, // init
    
    
    viewArticle: function(aclID){
        console.log('viewArticle aclID', aclID);
        
        // get article html for this article that displays in the dhtml
        fetch(`/ajax_process.php?task=get_contest_article&aclID=${aclID}`)
            .then((response) => response.text())
            .then(
                (html) => {
                    console.log('viewArticle return');
                    
                    if( (typeof html != undefined)  &&  html != ''){
                        
                        // add html content
                        window.articleContestArticleViewDiv.querySelector('.ajaxContent').innerHTML = html;
                        
                        // show the dhtml
                        window.articleContestArticleViewDiv.style.display = 'block';
                        
                        // move the dhtml
                        window.articleContestArticleViewDiv.style.top = (window.scrollY) + 'px';
                        // dim the grid of articles
                        window.articleContestListDiv.style.opacity = 0.3;
                        
                        
//ArticleContestVoteJs.initPrintLinks();
						
						
                        // init vote btn click in dhtml
						ArticleContestVoteJs.initVoteButtons('dhtml');
						
						// did the user already vote for this article
						if( ArticleContestVoteJs.articles_voted_for.includes(aclID) ){
    						ArticleContestVoteJs.markArticleVotedFor(aclID);
                        }
                        
                        // if you have reached your voting limit
                        if(ArticleContestVoteJs.vote_complete == 1){
    						
    						// below could be done in voteComplete()
    						let nodes = window.articleContestArticleViewDiv.querySelectorAll('.contestArticleVoteButtonDiv');
    						
    						if(nodes == null){
                        		return;
                    		}
                    		
                    		nodes.forEach(
                        	    (node, index) => {
                            	    node.style.opacity = 0.3;
                        	    }
                        		
                            );
                            
                            nodes = window.articleContestArticleViewDiv.querySelectorAll('.contestArticleVoteButtonDiv a');
                            nodes.forEach(
                        	    (node, index) => {
                            	    node.style.cursor = 'default';
                        	    }
                        		
                            );
                        }
						
                        
                    }
                    
                }
            )
            .catch(
                function(error) {
                    // If there is any error you will catch them here
                    console.log('exception', error);
                }
            );
				
    }, // viewArticle
    
    
    closeArticleBox: function(){
        
        window.articleContestListDiv.style.opacity = 1.0;
        
        window.articleContestArticleViewDiv.style.display = 'none';
        
	}, // closeArticleBox
	
	
	initVoteButtons: function(link_set){
    	
    	let nodes;
    	
    	var links;
		switch(link_set){
			case 'dhtml':
			    // just the newly added vote button in the dhtml
			    nodes = window.articleContestArticleViewDiv.querySelectorAll('.contestArticleVoteButtonDiv a');
			    break;
			    
            default:
                // get multiple vote links from the grid
                nodes = window.articleContestListDiv.querySelectorAll('.contestArticleVoteButtonDiv a');
                break;
        }
    	
    	if(nodes == null){
        	return;
    	}
    	
    	nodes.forEach(
            node => {
                node.addEventListener(
                    "click", 
                    function(evt){
                        //console.log('initVoteButtons evt.currentTarget', evt.currentTarget.dataset.listId);
                        evt.preventDefault();
                        
                        ArticleContestVoteJs.vote(evt.currentTarget.dataset.listId);
                    }, 
                    false
                );
            }
        );
    	
    	
	}, // initVoteButtons
	
	vote: function(aclID){
    	                
        if( ArticleContestVoteJs.articles_voted_for.includes(aclID)  ||  ArticleContestVoteJs.vote_complete == 1 ){
            // already voted for
        }else{
            // not voted yet
            
            let data = new FormData();
            data.append( "task", 'vote_contest_article' );
            data.append( "aclID", aclID );
            
            fetch("/ajax_process.php",
            {
                method: "POST",
                body: data
            })
            .then(function(res){ return res.json(); })
            .then(
                function(data){ 
                    console.log(data);
                    // add the id to the list of article voted for
                    ArticleContestVoteJs.articles_voted_for.push(data.aclID);
                    
                    // save vote data to storage
                    ArticleContestVoteJs.saveVoteData();
    										
                    // mark that article as voted
    				ArticleContestVoteJs.markArticleVotedFor(data.aclID);
    				
    				
    				if(ArticleContestVoteJs.articles_voted_for.length >= ArticleContestVoteJs.total_votes_allowed){
        				ArticleContestVoteJs.vote_complete = 1;
        				
        				ArticleContestVoteJs.voteComplete();
        				
                    }
                    
                }
            )
            
        } // end not voted yet block
        
        
	}, // vote
	
	
	getVoteData: function(){
		let votes = [];
		if(ArticleContestVoteJs.has_storage == 1){
			let storedData = localStorage.getItem(ArticleContestVoteJs.cookie_name);
            if (storedData) {
                votes = JSON.parse(storedData);
            }
        }
        
        return votes;
    },
	
	saveVoteData: function(){
		if(ArticleContestVoteJs.has_storage == 1){
		    localStorage.setItem(ArticleContestVoteJs.cookie_name, JSON.stringify(ArticleContestVoteJs.articles_voted_for));	
        }
    },
	
	markArticleVotedFor: function(listID){
    	
    	let node = window.articleContestDiv.querySelector(`.contestArticleVoteDiv.aclID${listID}`);	
    	
    	if(node != null){
        	node.classList.add('votedFor');
    	}
    	
    	
    }, // markArticleVotedFor
	
	voteComplete: function(){
		// fades ALL the vote buttons back (grid and dhtml)
		let nodes = window.articleContestDiv.querySelectorAll('.contestArticleVoteButtonDiv');
		
		if(nodes == null){
    		return;
		}
		
		nodes.forEach(
    	    (node, index) => {
        	    node.style.opacity = 0.3;
    	    }
    		
        );
        
        nodes = window.articleContestDiv.querySelectorAll('.contestArticleVoteButtonDiv a');
        nodes.forEach(
    	    (node, index) => {
        	    node.style.cursor = 'default';
    	    }
    		
        );
        
        
        
        let node = window.articleContestDiv.querySelector('.thanksMessage');
        if(node != null){
            
            // hide content used by the "submit an article" workflow
            let node2 = node.querySelector('.doAnother');
            node2.style.display = 'none';
            
            // display the thanks
            node.style.position = 'absolute';
            node.style.display = 'block';
            node.style.top = (window.scrollY) + 'px';
            node.style.right = '10%';
            node.style.left = '10%';
            
            node.style.zIndex = 999999;
            
            setTimeout("ArticleContestVoteJs.closeThanks()", 8000);
        }
        
								
	}, // voteComplete
	
	closeThanks: function(){
    	let node = window.articleContestDiv.querySelector('.thanksMessage');
        if(node != null){
            node.style.display = 'none';
        }
	}
    
}





// this replaces JQ ready
// https://www.sitepoint.com/jquery-document-ready-plain-javascript/
var DOMContentLoadedCallback = function(){
    // Handler when the DOM is fully loaded
    //console.log('DOMContentLoadedCallback called');
    
    if(typeof ArticleContestVoteJs != "undefined"  &&  typeof ArticleContestVoteJs.init != undefined){
        ArticleContestVoteJs.init();
    }else{
        //console.log('no ArticleContestVoteJs init');
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