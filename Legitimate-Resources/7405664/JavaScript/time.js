window.onload = function() {
    if(!$.cookie('customer_timezone')){
        var exp = new Date();
        var gmtHours = -(exp.getTimezoneOffset()/60);
        setCookie('customer_timezone',gmtHours,1);
        //判断是否为夏令时
        // if (isDayLightTime()) {
        //     setCookie('inDaylightTime',1,1);
        // }
    }
}
//设置Cookie
function setCookie(c_name,value,expiredays){
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : "; expires="+exdate.toGMTString())
}
/*
//判断时间是东半球还是西半球
function isEastEarthTime() {
    var now = new Date();
    var timeZone = now.getTimezoneOffset();
    if(timeZone < 0){
        return true;
    }else{
        return false;
    }
}

//是否是夏令时
function isDayLightTime() {
    var now = new Date();
    var start = new Date();
    //得到一年的开始时间
    start.setMonth(0);
    start.setDate(1);
    start.setHours(0);
    start.setMinutes(0);
    start.setSeconds(0);

    var middle = new Date(start.getTime());
    middle.setMonth(6);
    // 如果年始和年中时差相同，则认为此国家没有夏令时
    if ((middle.getTimezoneOffset() - start.getTimezoneOffset()) == 0){
        return false;
    }

    var margin = 0;
    //判断当前用户在东半球还是西半球
    if(isEastEarthTime()) {
        margin = start.getTimezoneOffset();
    }else{
        margin = middle.getTimezoneOffset();
    }
    if(now.getTimezoneOffset() == margin){
        return true;
    }
    return false;
}
*/

