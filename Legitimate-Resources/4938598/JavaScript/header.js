var Cookie = {
	set:function(name,value,expires,path,domain){
		if(typeof expires=="undefined"){
			expires=new Date(new Date().getTime()+1000*3600*24*365);
		}
		
		document.cookie=name+"="+escape(value)+((expires)?"; expires="+expires.toGMTString():"")+((path)?"; path="+path:"; path=/")+((domain)?";domain="+domain:"");
		
	},
	get:function(name){
		var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
		if(arr!=null){
			return unescape(arr[2]);
		}
		return null;
	},
	clear:function(name,path,domain){
		if(this.get(name)){
		document.cookie=name+"="+((path)?"; path="+path:"; path=/")+((domain)?"; domain="+domain:"")+";expires=Fri, 02-Jan-1970 00:00:00 GMT";
		}
	}
}
var skinName = Cookie.get("skin");
function topleft()
{
	var host = window.location.host;
	document.writeln("<div style=\"float:left;\">&nbsp;<a href=\"\/\" ><img src=\"\/static\/images\/logo\/360.png\"  width=\"165\" \/><\/a><\/div>");
	
}

function topcenter()
{
	document.writeln("<iframe style=\"float:left;margin:8px 5px\" width=\"415\" scrolling=\"no\" height=\"75\" frameborder=\"0\" allowtransparency=\"true\" src=\"http:\/\/i.tianqi.com\/index.php?c=code&id=12&icon=2&num=3\" style=\"margin-left:20px;margin-top:10px\"><\/iframe>");
	/*document.writeln("<div style=\"float:left;margin-top:10px\">");
	document.writeln("	<form id=\"mail\" name=\"mail\" method=\"post\" onsubmit=\"MailLogin.sendMail();return false;\" action=\"\" target=\"_blank\">");
	document.writeln("		<ul>");
	document.writeln("			<li>");
	document.writeln("				 <input type=\"text\" id=\"mail_user_114la\" class=\"int\" style=\"width:86px\" \/>");
	document.writeln("				<select id=\"mail_server_114la\" onchange=\"MailLogin.change(this)\" style=\"width:114px\">");
	document.writeln("					<option selected=\"selected\">--请选择邮箱--<\/option>");
	document.writeln("					<option>@sina.com<\/option>");
	document.writeln("					<option>@vip.sina.com<\/option>");
	document.writeln("					<option>@yahoo.com.cn<\/option>");
	document.writeln("					<option>@yahoo.cn<\/option>");
	document.writeln("					<option>百度帐号<\/option>");
	document.writeln("					<option>人人网<\/option>");
	document.writeln("					<option style=\"color:#36c;\">--以下请在弹出页登录↓--<\/option>");
	document.writeln("					<option>开心网<\/option>");
	document.writeln("					<option>QQ空间<\/option>");
	document.writeln("					<option>@qq.com<\/option>");
	document.writeln("					<option>@139.com<\/option>");
	document.writeln("					<option>@gmail.com<\/option>");
	document.writeln("					<option>@188.com<\/option>");
	document.writeln("				<\/select>");
	document.writeln("			<\/li>");
	document.writeln("			<li>");
	document.writeln("				<input type=\"password\" id=\"mail_passwd_114la\" class=\"int\" style=\"width:150px\" \/>");
	document.writeln("				<input type=\"submit\" value=\"登 录\" id=\"mail_submit_114la\" class=\"btn\" \/>");
	document.writeln("			<\/li>");
	document.writeln("		<\/ul>");
	document.writeln("	<\/form>");
	document.writeln("<\/div>");*/
}


function topright()
{
	if(skinName == '2345') {
		document.writeln("<div style=\"float:right;\"><a href=\"http:\/\/ai.taobao.com\" target=\"_blank\"><img src=\"\/static\/images\/" + skinName + ".png\" height=\"69\" \/><\/a><\/div>");
	} else {
		document.writeln("<div style=\"float:right;margin-top:8px;\"><a href=\"http://www.herborist.com.cn/?521\" target=\"_blank\"><img src=\"\/static\/images\/baicaoji.jpg\" width=\"174\" height=\"54\" \/><\/a><\/div>");
	}
	document.writeln("<div style=\"clear:both;\"><\/div>");
}
topleft();
topcenter();
topright();


