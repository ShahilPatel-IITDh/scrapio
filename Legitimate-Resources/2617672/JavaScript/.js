(function() {
  var projectId = 758733330;
  var protocol = ('https:' == document.location.protocol ? 'https://' : 'http://');
  var scriptTag = document.createElement('script');
  scriptTag.type = 'text/javascript';
  scriptTag.async = true;
  scriptTag.src = protocol + 'cdn.optimizely.com/js/' + projectId + '.js';
  var head = document.getElementsByTagName('head')[0];
  head.parentNode.insertBefore(scriptTag, head);
})();
function optimizelyTimeout() {
  window.optimizely = window.optimizely || [];
  if(!window.optimizely.data) {
    window.optimizely.push("timeout");
  }
}
setTimeout(optimizelyTimeout, 1000);
(function() {
var target_url = "http:\/\/www.domainmarkt.de\/s-king.de";
	var phrase = ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;&nbsp;>&nbsp;&nbsp;>&nbsp;>&nbsp;>> &nbsp;&nbsp;Kaufpreis dieser Domain: JETZT zeigen &nbsp;-&nbsp; hier klicken! &nbsp;&nbsp; <<&nbsp;<&nbsp;<&nbsp;&nbsp;<&nbsp;&nbsp;&nbsp;<&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<";
 
	var load_sale_banner = function($){
		var $body = $('body');
		$banner = $('<div></div>');
		$banner.attr('style', 'display: none; background: url(http://i.cdnpark.com/themes/sale/sale_simple.png); border-bottom: 1px solid rgb(200,200,200); color: rgb(200,200,200); width: 100%;');
		$banner.html('<a href="' + target_url + '" target="_blank" style="text-decoration: none; display: block; text-align: center; font: 16px arial, sans-serif; height: 28px; padding: 8px 0 0 0; font-weight: bold; color: rgb(255,0,0); text-shadow: #000 0 0 4px;">' + phrase + '</a>');
		$body.prepend($banner);
		$banner.delay(500).show('slow');
	};
	
	var init = function(){
		var url = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
		load_script(url, function(){
			load_sale_banner(jQuery);
		});
	};
	
	var load_script = function(url, callback){
		var script = document.createElement("script");
		script.type = "text/javascript";

		if (script.readyState){  //IE
			script.onreadystatechange = function(){
				if (script.readyState === "loaded" || script.readyState === "complete"){
					script.onreadystatechange = null;
					callback();
				}
			};
		} else {  //Others
			script.onload = function(){
				callback();
			};
		}
		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
	}
 
	if(window.addEventListener) {
		window.addEventListener("load", init);
	} else if(window.attachEvent) {
		window.attachEvent("onload", init);
	} else {
		window.setTimeout(init, 10);
	}
})();
