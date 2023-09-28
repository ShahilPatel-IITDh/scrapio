 
//<![CDATA[
/********************************
Blogger Pager Script v2.0
(C) 2008 by Anhvo, http://vietwebguide.com
Visit http://www.vietwebguide.com to get more cool hacks
********************************/

var pager_max_results = 20;
if(location.href.match("max-results=")){
	pager_max_results = parseInt(location.href.substring(location.href.indexOf("max-results=")+12).split("\&")[0]);
} else if(!location.href.match("/search/label/")){
	pager_max_results = pager_max_main;
}


var per_page = pager_max_results ;
if(!location.href.match('/search/label/')) { 
	pager_feedx = "http://www.blogger.com/feeds/"+blogID+"/posts/summary"; 
	pager_pageurl = home_page+"search";
	}
else {
	label = location.href.split("/")[5];
	label = label.split("?")[0];
	label = label.replace(/ /g,"%20");
	pager_feedx = "http://www.blogger.com/feeds/"+blogID+"/posts/summary/-/"+label;
	pager_pageurl = home_page+"search/label/"+label;
}

var pager_opening = 1;
if(location.href.match("popening=")){
	pager_opening = parseInt(location.href.substring(location.href.indexOf("popening=")+9).split("\&")[0]);
} 

var num_pages = 1;

function createBlogPager(){
	var script = document.createElement('script');
	script.src = pager_feedx+"?start-index=1&max-results=0&alt=json-in-script&callback=countnumpost";
	script.type = "text/javascript";
	document.getElementsByTagName('head')[0].appendChild(script)
}

function countnumpost(json) {
	var posts  = json.feed.openSearch$totalResults.$t;
	num_pages = (posts%per_page == 0) ? posts/per_page : Math.floor(posts/per_page)+1;
	//////////////////////////////
	var a1 = document.createElement("a");
		a1.className = "blogpager";
		a1.title = "Jump to page: (1)";
		a1.href = "javascript:page(1)";
		a1.innerHTML = pager_first_text;
		document.getElementById("vwg-pager-first").appendChild(a1);
	var a4 = document.createElement("a");
		a4.className = "blogpager";
		a4.title = "Jump to page: ("+num_pages+")";
		a4.href = "javascript:page("+num_pages+")";
		a4.innerHTML = pager_last_text;
		document.getElementById("vwg-pager-last").appendChild(a4);
		
	var prev = (pager_opening!=1) ? pager_opening-1 : 1;
	var a2 = document.createElement("a");
		a2.className = "blogpager";
		a2.title = "Jump to page: ("+prev+")";
		a2.href = "javascript:page("+prev+")";
		a2.innerHTML = pager_prev_text;
		document.getElementById("vwg-pager-prev").appendChild(a2);
	
	var next = (pager_opening!=num_pages) ? pager_opening+1 : num_pages;
	var a3 = document.createElement("a");
		a3.className = "blogpager";
		a3.title = "Jump to page: ("+next+")";
		a3.href = "javascript:page("+next+")";
		a3.innerHTML = pager_next_text;
		document.getElementById("vwg-pager-next").appendChild(a3);
	
	document.pager20.showingpage.value = pager_opening;
	document.pager20.pagestotal.value = num_pages;

}

function checkpager(){
	var uinput = parseInt(document.pager20.showingpage.value);
	if((uinput <= num_pages)&&(uinput >= 1)) {
		page(uinput);
	} 
	else { 
		alert("Invalid page number. Please try by another!"); 
		document.pager20.showingpage.focus() ;
		document.pager20.showingpage.select();
	}
}

function getDateAndGo(json){
	var date2 = json.feed.entry[0].published.$t;
	ss = parseFloat(date2.substring(17,19));
	if(ss<59) ss++;
	if(ss<10) { ss = "0"+ ss; }
	date4  = encodeURIComponent(date2.substring(0,17)+ss+date2.substring(23,date2.length));
	location.href = pager_pageurl+'?updated-max='+date4+'&max-results=' + per_page + '&popening=' + pager_opening;
}

function page(startindex) { 
	pager_opening = startindex;
	var i = per_page*(startindex-1)+1;
	var script2 = document.createElement("script"); 
	script2.src =  pager_feedx+"?start-index="+i+"&max-results=1&alt=json-in-script&callback=getDateAndGo"; 
	document.getElementsByTagName('head')[0].appendChild(script2)
}


createBlogPager();
//]]>
