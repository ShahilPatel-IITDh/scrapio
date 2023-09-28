// JavaScript Document

//检测是否合法  未定义、null 空值
function islegal(str){
	if(typeof(str) != "undefined" && str != "" && str != null){
		return true;
	}
	return false;
}

//正则匹配字符串
function RegularStr(str,regularrule) {
	if(regularrule.test(str)) {
		return true;
	}
	else return false;
}

//删除字符串两边空格
function trim(str){
　　   return str.replace(/(^\s*)|(\s*$)/g, "");
}

//获取字符串长度 utf8
function getStrLeng(str){
    var realLth = 0;
    var len = str.length;
    var charCode = -1;
    for(var i = 0; i < len; i++){
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) { 
            realLth += 1;
        }else{ 
            // 如果是中文则长度加3
            realLth += 3;
        }
    } 
    return realLth;
}


function timetoDate(ts) {
    var date = new Date(parseInt(ts) * 1000);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return YY + MM + DD + " " + hh + mm + ss;
}