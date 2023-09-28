document.writeln("<script type=\"text/javascript\" src=\"/static/artDialog.js\"></script>");
document.writeln("<script type=\"text/javascript\" src=\"/static/plugins/iframeTools.js\"></script>");
document.writeln("<link rel=\"stylesheet\" href=\"/static/skins/green.css\" type=\"text/css\" />");
function setHome(obj,url){
		var skinName = Cookie.get("skin");
		
		url = 'http://hao.007qu.com/';
		try{
            obj.style.behavior='url(#default#homepage)';obj.setHomePage(url);
	    }
	    catch(e){
	        art.dialog.alert("您使用的浏览器不支持一键设为首页<br>请用CTRL+D收藏本页");
	    }
}
window.onerror = function() { return true; }