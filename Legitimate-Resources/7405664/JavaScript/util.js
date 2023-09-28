// 识别移动设备, 移动设备返回true , 否则返回false
var isMobileDevices = function(){
  var _UA = navigator.userAgent.toLowerCase();
  var _device = ['phone','pad','pod','iphone','ipod','ios','ipad','android','mobile','blackberry','iemobile','mqqbrowser','juc','fennec','wosbrowser','browserng','webos','symbian','windows phone'];
  var flag = false;
  for (var d = 0; d < _device.length; d++) {
    if (_UA.indexOf(_device[d]) > 0) {
      flag = true;
      break;
    }
  }
  return flag;
}