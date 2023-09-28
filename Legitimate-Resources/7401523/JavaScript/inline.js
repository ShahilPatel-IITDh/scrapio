
var lang = "zh-Hans-CN,zh-Hans;q=0.8,en-US;q=0.5,en;q=0.3";
if(lang != undefined && lang != ""){
	lang = lang.substr(0,2);
}
switch(lang){
	case "ja":
		location.href = "./jp/";
		break;
	case "en":
		location.href = "./en/";
		break;
	default:
		break;
}
