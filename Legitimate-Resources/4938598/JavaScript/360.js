var $j=$.noConflict();
var stab={
   js_type_2:{
	   img:"http://s1.hao123img.com/res/images/search_logo/web.png",
	   img_name:"百度搜索",
	   form:"http://www.baidu.com/s",
	   input_name:"wd",
	   button_name:"百度一下",
	   img_link:"http://www.baidu.com"
   },
   js_type_8:{
	   	img:"http://s1.hao123img.com/res/images/search_logo/news.png",
	   	img_name:"百度新闻",
	   	form:"http://news.baidu.com/ns",
		input_name:"word",
		button_name:"百度一下",
		img_link:"http://news.baidu.com/"
   },
   js_type_9:{
	   	img:"http://s1.hao123img.com/res/images/search_logo/yinyue.png",
	   	img_name:"百度音乐",
	   	form:"http://music.baidu.com/search",
		input_name:"key",
		button_name:"百度一下",
		img_link:"http://music.baidu.com/"
   },
   js_type_10:{
	   	img:"http://s1.hao123img.com/res/images/search_logo/video.png",
	   	img_name:"百度视频",
	   	form:"http://v.baidu.com/v",
	   	input_name:"word",
		button_name:"百度一下",
		img_link:"http://v.baidu.com/"
   },
   js_type_11:{
	   	img:"http://s1.hao123img.com/res/images/search_logo/image.png",
	   	img_name:"百度图片",
	   	form:"http://image.baidu.com/i",
	   	input_name:"word",
	   	button_name:"百度一下",
	   	img_link:"http://image.baidu.com/"
   },
   
   js_type_12:{
	   	img:"http://s1.hao123img.com/res/images/search_logo/map.png",
	   	img_name:"百度地图",
	   	form:"http://map.baidu.com/m",
	   	input_name:"word",
	   	button_name:"百度一下",
   		img_link:"http://map.baidu.com/"
   },
     js_type_13:{
	   	img:"http://s1.hao123img.com/res/images/search_logo/zhidao.png",
	   	img_name:"百度知道",
	   	form:"http://zhidao.baidu.com/",
	   	input_name:"word",
	   	button_name:"百度知道",
	   	img_link:"http://zhidao.baidu.com/"
   },
     js_type_14:{
	   img:"http://s1.hao123img.com/res/images/search_logo/web.png",
	   img_name:"百度搜索",
	   form:"http://www.baidu.com/s",
	   input_name:"wd",
	   button_name:"百度一下",
	   img_link:"http://www.baidu.com"
   },
     js_type_15:{
	   	 	img:"http://s1.hao123img.com/res/images/search_logo/news.png",
	   	img_name:"百度新闻",
	   	form:"http://news.baidu.com/ns",
		input_name:"word",
		button_name:"百度一下",
		img_link:"http://news.baidu.com/"
   },
     js_type_18:{
	   	img:"http://s1.hao123img.com/res/images/search_logo/image.png",
	   	img_name:"百度图片",
	   	form:"http://image.baidu.com/i",
	   	input_name:"word",
	   	button_name:"百度一下",
	   	img_link:"http://image.baidu.com/"
   },
     js_type_17:{
	   	img:"http://s1.hao123img.com/res/images/search_logo/video.png",
	   	img_name:"百度视频",
	   	form:"http://v.baidu.com/v",
	   	input_name:"word",
		button_name:"百度一下",
		img_link:"http://v.baidu.com/"
   },
       js_type_16:{
	   		img:"http://s1.hao123img.com/res/images/search_logo/yinyue.png",
	   	img_name:"百度音乐",
	   	form:"http://music.baidu.com/search",
		input_name:"key",
		button_name:"百度一下",
		img_link:"http://music.baidu.com/"
   },
       js_type_19:{
	   	img:"http://s1.hao123img.com/res/images/search_logo/map.png",
	   	img_name:"百度地图",
	   	form:"http://map.baidu.com/m",
	   	input_name:"word",
	   	button_name:"百度一下",
   		img_link:"http://map.baidu.com/"
   },
   js_type_20:{
	   	img:"http://s1.hao123img.com/res/images/search_logo/zhidao.png",
	   	img_name:"百度知道",
	   	form:"http://zhidao.baidu.com/",
	   	input_name:"word",
	   	button_name:"百度知道",
	   	img_link:"http://zhidao.baidu.com/"
   }
};

$j(function(){
   $j("#searchTab").find("li").click(function(){
     $j(this).addClass("s-bg20 g-fc5h curr");
	 $j(this).siblings().removeClass("s-bg20 g-fc5h curr");
	 var _arro=$j(this).attr("s_tab");
	 
	 var _img = stab[_arro].img;
	 var _action = stab[_arro].form;
	 var _alt = stab[_arro].img_name;
	 var _button_name = stab[_arro].button_name;
	 
	 $j("#imgHook").attr("src",stab[_arro].img);
	 $j("#imgHook").attr("alt",_alt);
	 $j("#search_logolink").attr("title",_alt);
	 $j("#formChange").attr("action",stab[_arro].form);
	 $j('#textHook').attr("name",stab[_arro].input_name);
	 $j('#buttonHook').attr("value",_button_name);
	 $j("#search_logolink").attr("href",stab[_arro].img_link);
   });
   
   
   $j("#searchTab1").find("li").click(function(){
     $j(this).addClass("s-bg20 g-fc5h curr1");
	 $j(this).siblings().removeClass("s-bg20 g-fc5h curr");
	 var _arro=$j(this).attr("s_tab1");
	 
	 var _img = stab[_arro].img;
	 var _action = stab[_arro].form;
	 var _alt = stab[_arro].img_name;
	 var _button_name = stab[_arro].button_name;
	 
	 $j("#imgHook1").attr("src",stab[_arro].img);
	 $j("#imgHook1").attr("alt",_alt);
	 $j("#search_logolink1").attr("title",_alt);
	 $j("#formChange1").attr("action",stab[_arro].form);
	 $j('#textHook1').attr("name",stab[_arro].input_name);
	 $j('#buttonHook1').attr("value",_button_name);
	 $j("#search_logolink1").attr("href",stab[_arro].img_link);
   });
   
   
   $j("#buttonHook").click(function(){
	   var action = $j("#formChange").attr('action');
	   if(action.indexOf('taobao') != -1) {
		   var pid = "";
		   var kw = $j("#textHook").val();
		   var url = "http://s8.taobao.com/search?pid=" + pid + "&q=" + kw;
		   window.open(url);
	   } else {
		   document.forms["searchForm"].submit();
	   }
	   return;
   });
   
   
     $j("#buttonHook1").click(function(){
	   var action = $j("#formChange1").attr('action');
	   if(action.indexOf('taobao') != -1) {
		   var pid = "";
		   var kw = $j("#textHook1").val();
		   var url = "http://s8.taobao.com/search?pid=" + pid + "&q=" + kw;
		   window.open(url);
	   } else {
		   document.forms["searchForm1"].submit();
	   }
	   return;
   });
   
 });