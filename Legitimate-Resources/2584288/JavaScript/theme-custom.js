/*Generates corresponding Arabic url to switch from English pages*/
function getArabicUrl(){
	var pathname = window.location.href;
	var pattern = 'portal/';
	var arabicPattern = 'portal/ar/';
	var url = "";
	if(pathname.indexOf(arabicPattern) != -1){
		
	} else if(pathname.indexOf(pattern) != -1){
		pathname = pathname.replace('portal', 'portal/ar');
	} else {
		pathname=pathname + "/ar/";
	}
	/*Following code snippet was specifically added to redirect the 
	 * Arabic online forms(Portlets) to respective product page.This is done because at the time of this project deployment
	 * arabic online forms did not exist. */
	/*Begin*/
	if(pathname.indexOf('apply-now') != -1){
		pathname = pathname.replace('/apply-now', '');
	} else if(pathname.indexOf('calculator') != -1){
		var subpath = pathname.substring(0,pathname.lastIndexOf("/"));
		pathname = subpath.substring(0,subpath.lastIndexOf("/"));
	}
	/*End*/
	if(pathname.indexOf('RAKBank_en') != -1){
		pathname = pathname.replace('RAKBank_en', 'RAKBank_ar');
	} else if(pathname.indexOf('rakbank_en') != -1){
		pathname = pathname.replace('rakbank_en', 'rakbank_ar');
	} 
	if (pathname.indexOf('!ut') != -1) {
		url = pathname.substring(0,pathname.lastIndexOf("/!ut"));
		url += pathname.substring(pathname.lastIndexOf("/?"));
	}               
	if(url == "")
		return pathname;
	else
		return url;
}
/*Generates corresponding Engish url to switch from arabic pages*/
function getEnglishUrl(){
	var pathname = window.location.href;
	var url = "";
	pathname = pathname.replace('/ar/', '/');
	if(pathname.indexOf('RAKBank_ar') != -1){
		pathname = pathname.replace('RAKBank_ar', 'RAKBank_en');
	} else if(pathname.indexOf('rakbank_ar') != -1){
		pathname = pathname.replace('rakbank_ar', 'rakbank_en');
	}
	if (pathname.indexOf('!ut') != -1) {
		url = pathname.substring(0,pathname.lastIndexOf("/!ut"));
		url += pathname.substring(pathname.lastIndexOf("/?"));
	}
	if(url == "")
		return pathname;
	else
		return url;
}
/*Validates search text and submits only if the text is not empty*/
function validateSearchForm(searchfieldid){
	var searchNodeUrl = $("#"+searchfieldid).attr('data-url');
	var searchtext= $.trim($("#"+searchfieldid).val());
	if(searchtext.length == 0 || searchtext == "Search"){
		alert('Please enter a valid search text.'); 
		return false; 
	}
	window.open(searchNodeUrl+"?q="+searchtext,"_parent");
	return true;
}  
/*Prevents default submit for Enter key on search field*/
$(document).ready(function(){
    $(".search_form input").keypress(function(event){
		if(event.keyCode == 13){ //on click on Enter button
			event.preventDefault();
			validateSearchForm(event.target.id);
		}
    });
    
    //Webtrends tracking for Rewards link in menu
    /*$(".moblie-menus-top a, .header-middle-left a").click(function(){
    	if($(this).text() == 'Rewards') {
    		dcsMultiTrack('DCS.dcsuri', 'https://rewards.rakbank.ae');
    	}
    });*/
   
});


/*To disable the right click on the web browser*/
document.onmousedown=disableRightClick;
function disableRightClick(event) {
	if(event.button==2) {
		alert('This feature is not available');
		return false;    
	}
}
var win = null;
/*Opens the specific link(or)page in new window*/ 
function NewWindow(mypage,myname,w,h,scroll){
	LeftPosition = (screen.width) ? (screen.width-w)/2 : 0;
	TopPosition = (screen.height) ? (screen.height-h)/2 : 0;
	settings = 'height='+screen.height+',width='+screen.width+',top='+TopPosition+',left='+LeftPosition+',scrollbars='+scroll+',resizable';
	win = window.open(mypage,myname,settings);
	if(screen.availHeight < screen.height)
        win.resizeTo(screen.availWidth, screen.availHeight);
    else
        win.resizeTo(screen.availWidth, screen.availHeight-25);
}

