
	Cookie.set('skin','360');
    try{
		if(window.SR){
			SR.SearchData = {
                                    engine_16: {
						action: "http://music.baidu.com/search",
						name: "key",
						btn: "百度一下",
						img: ["百度音乐","static/images/s/new/yinyue.png"],
						url: "http://music.baidu.com/",
						params: {
							ie:'utf8'
						}
                    },
                                    engine_38: {
						action: "http://image.baidu.com/i",
						name: "word",
						btn: "百度一下",
						img: ["百度图片","static/images/s/new/image.png"],
						url: "http://image.baidu.com/",
						params: {
							ie:'utf8'
						}
                    },
                                    engine_28: {
						action: "http://v.baidu.com/v",
						name: "word",
						btn: "百度一下",
						img: ["百度视频","static/images/s/new/video.png"],
						url: "http://v.baidu.com/v",
						params: {
							ie:'utf-8'
						}
                    },
                                    engine_29: {
						action: "http://news.baidu.com/ns",
						name: "word",
						btn: "百度一下",
						img: ["百度新闻","static/images/s/new/news.png"],
						url: "http://news.baidu.com/",
						params: {
							ie:'utf8'
						}
                    },
                                    engine_31: {
						action: "http://zhidao.baidu.com/search",
						name: "word",
						btn: "百度一下",
						img: ["百度知道","static/images/s/new/zhidao.png"],
						url: "http://zhidao.baidu.com/",
						params: {
							ie:'utf8'
						}
                    },
                                    engine_32: {
						action: "http://map.baidu.com/m",
						name: "word",
						btn: "百度一下",
						img: ["百度地图","static/images/s/new/map.png"],
						url: "http://map.baidu.com/",
						params: {
							ie:'utf8'
						}
                    },
                                
                                    engine_4: {
						action: "http://www.baidu.com/s",
						name: "word",
						btn: "百度一下",
						img: ["百度","static/images/s/new/web.png"],
						url: "http://www.baidu.com/",
						params: {
							ie:'utf8',
							tn:'98136931_hao_pg'
						}
                    },
                				none:{}
            }	
		}
		
		var sbBox = document.getElementById('sb');
		var sbForms = sbBox.getElementsByTagName('form');
		for(var i = 0,len = sbForms.length; i < len; i++){
			sbForms[i].reset();
		}
		
		var sbRadios = sbBox.getElementsByTagName('input');
		var inputTxtArr = [];
		if(sbRadios.length){
			var setRadios = [];
			for(var i = 0,len = sbRadios.length; i < len; i++){
				var input = sbRadios[i];
				if(input.getAttribute("rad") && input.checked){
					setRadios.push(input);
				}
				else if(input.getAttribute("rel") == "kw"){
					var key = inputTxtArr.push(input);
					input.setAttribute("index",key - 1);
					
				}
			}
			try{
			for(var i = 0,len = setRadios.length; i < len; i++){
				var input = setRadios[i];
				
				SR.RadioMod.ClickRadio(input);
			}
			}catch(e){}
		}
	}catch(e){}
    