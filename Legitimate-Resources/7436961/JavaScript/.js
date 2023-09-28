
		var ucoz_rndid = 'cmRjMLD';
		function uOnDomOrLater(f){
			if(document.readyState == 'loading') {
				if(document.addEventListener) {
					document.addEventListener('DOMContentLoaded',f);
				} else {
					window.attachEvent('onload',f);
				}
			} else {
				setTimeout(f,0);
			}
		}
	document.write('<div style="width:0px;height:0px;position:fixed;right:0px;top:0px;display:none;overflow:hidden;z-index:2147483640;margin:0;padding:0;background:none;" id="dVcmRjMLD"></div>');
			var mscript=document.createElement('script');
			mscript.src="//"+location.hostname+"/?quHm%5EKBf1M7HPT%3BlTKxiKGsExB3T9F0kCEKfUfVisXyYY0rkBhZ%21zI2z30qCtH4rBs%211g%5ErScU1fzIt87wn2G2fsFXAAd%5EnN9uhGAuz%5EwmaE6HSsSkAPQWm3BD8kB8skV%21VuTmJpcqyeS%5EZ2ZamgO3hrchFHL7D%5EVUMo";
			document.getElementsByTagName('head')[0].appendChild(mscript);
		    function resizeDiv(islasttry){
		        var WX,WY,BX,BY;
		        var o=document.getElementById("dVcmRjMLD"),t,d;
		        if (!o) return;
		        if(typeof window.self_getsizes == 'function'){
		            var s=self_getsizes();
		            if(s.err==1 && !islasttry) return;
		            if(isNaN(s.BX)) s.BX==0;
		            if(isNaN(s.BY)) s.BY==0;
		            if(s.err==1){
		                if (!(t=document.getElementById("bannerXcmRjMLD"))) return;
		                else s.BX=t.value;
		                if (!(t=document.getElementById("bannerYcmRjMLD"))) return;
		                else s.BY=t.value;
		            }
		            BX=s.BX;
		            BY=s.BY;
		        }else{
		            if (!(t=document.getElementById("bannerXcmRjMLD"))) return;
		            else BX=t.value;
		            if (!(t=document.getElementById("bannerYcmRjMLD"))) return;
		            else BY=t.value;
		        }
		        if (!(t=document.getElementById("wrapperXcmRjMLD"))) WX=0;
		        else WX=t.value;
		        if (!(t=document.getElementById("wrapperYcmRjMLD"))) WY=0;
		        else WY=t.value;
		        d=document.getElementById("mainadsdvcmRjMLD");
		        if(d){
		            if (BX<0) d.style.width="100%";
		            else if (BX>0) d.style.width=BX+"px";
		            if (BY<0) d.style.height="100%";
		            else if (BY>0) d.style.height=BY+"px";
		        }
		        BX=parseInt(BX)+parseInt(WX);
		        BY=parseInt(BY)+parseInt(WY);
		        if (BX<0) o.style.width="100%";
		        else if (BX>0) o.style.width=BX+"px";
		        if (BY<0) o.style.height="100%";
		        else if (BY>0) o.style.height=BY+"px";
		        o.style.display='';
		        return true;
		    }
		
				var ucoz_prerollenable = 1 ;
				var ucoz_server = 's202' ;
				
if(ucoz_prerollenable){
	if (typeof jQuery == 'undefined') {
		document.write('<scr' + 'ipt type="text/javascript" src="/.s/src/jquery-1.7.2.js"></scr' + 'ipt>');
	}
	if (typeof _uWnd == 'undefined') {
		document.write('<scr' + 'ipt type="text/javascript" src="/.s/src/uwnd.min.js"></scr' + 'ipt>');
	}
	function UranCooks1() {
		var urantimest = Date.now() / 1000 | 0;
		document.cookie = 'uaoffc1=' + urantimest + ';domain=.' + window.location.host + ';path=/';
	}
	var uPreroll = {
		ad_duration: 30,
		top_label: 'реклама',
		country : 'in',
		isEnglish: function(){
			return (['hu','ro','au','gb','hk','in','ie','ca','lv','lt','nz','pk','sg','us','ph','za','jm','ee','br','gr','de','rs','fr','bg','it','pl','es','tr','il','cz'].indexOf(uPreroll.country)>=0);
		},
		geo: {
			city: "Dharwad",
			region: "Karnataka"
		},
		themes: [
			{header:'',footer: ''},
			{
				header:'<div class="modal"><div class="toppanel"><div id="popup4"><div class="close_popup"><div class="rotate_left"><span></span></div><div class="rotate_right"><span></span></div></div><div class="title_popup"><span class="r_label_top">%s</span><span class="counter"></span></div></div></div>',
				footer: '<div class="modal_text" id="wrapper_uran_footer"><div><span class="modal_head">Не хотите видеть рекламы вообще?</span><span>Скачайте браузер без рекламы</span></div><div class="modal_text_right"><a href="" target="_blank" class="modal_button">Cкачать URAN</a><a href="" target="_blank" class="modal_icon"><img src="/.s/img/bnr/uran_logo.png"></a></div></div></div>'
			},
			{header:'',footer: ''},
			{
				header:'<div class="modal modal_4"><div class="toppanel"><div id="popup4"><div class="close_popup"><div class="rotate_left"><span></span></div><div class="rotate_right"><span></span></div></div><div class="title_popup"><span class="r_label_top">%s</span><span class="counter"></span></div></div></div>',
				footer: '<div class="modal_text"><div><span class="modal_head">Нужен бизнес-сайт?</span><span>Решения для бизнеса на любой вкус и кошелек</span></div><div class="modal_buttons"><a href="" target="_blank" class="modal_button">Создать сайт</a><a href="" target="_blank" class="modal_logo"><img src="/.s/img/bnr/ukit_logo.png"></a></div>'
			},
			{header:'',footer: ''}
		],
		ga_var_landing: [
			{theme: 1,url:false,track: 'lpnone'},
			{theme: 1,url: '//uran-browser.ucoz.com/',track: 'lp1'},
			{theme: 1,url:'//uran-browser.ucoz.com/index/0-2',track: 'lp2'},
			{theme: 1,url:'//uran-browser.ucoz.com/index/0-3',track: 'lp3'},
			{theme: 1,url:'//uran-browser.ucoz.com/index/0-4',track: 'lp4'}
		],
		user_agent: '',
		ukit_data : {
			getLink: function(lang, server){
				var idx = Math.floor(Math.random()*this[server][lang].length);
				return this[server][lang][idx];
			},
			getUkitWrapperLink: function(){
				return 'https://ukit.com/ru/lp/adaptive/?utm_source=ucoz-advnet&utm_medium=video-bottom-wrap&utm_campaign=create-your-own-website-ru' ;
			},
			ru:{
				text: 'Попробовать на www.ukit.com',
				vlink: '/.s/flash/bnr/TRY4-HD.mp4'
			},
			en: {
				text: 'Try it on www.ukit.com',
				vlink: '/.s/flash/bnr/ukit-eng-popup-HD.mp4'
			},
			ucoz:{
				ru: [[
					'https://ukit.com/ru/lp/adaptive/?utm_source=ucoz-advnet&utm_medium=video-ukit&utm_campaign=video-ru',
					'https://ukit.com/ru/lp/adaptive/?utm_source=ucoz-advnet&utm_medium=video-ukit-button&utm_campaign=video-ru'
				]],
				en: [[
					'https://ukit.com/en/lp/adaptive/?utm_source=ucoz-advnet&utm_medium=video-ukit&utm_campaign=video-en',
					'https://ukit.com/en/lp/adaptive/?utm_source=ucoz-advnet&utm_medium=video-ukit&utm_campaign=video-en'
				]]
			},
			narod:{
				ru: [[
					'https://ukit.com/ru/lp/adaptive/?utm_source=narod-advnet&utm_medium=video-ukit&utm_campaign=video-ru',
					'https://ukit.com/ru/lp/adaptive/?utm_source=narod-advnet&utm_medium=video-ukit-button&utm_campaign=video-ru'
				]],
				en: [[
					'https://ukit.com/en/lp/adaptive/?utm_source=ucoz-advnet&utm_medium=video-ukit&utm_campaign=video-en',
					'https://ukit.com/en/lp/adaptive/?utm_source=ucoz-advnet&utm_medium=video-ukit&utm_campaign=video-en'
				]]
			},
			duration:20
		},
		counters: {
			advmaker_ucoz_ru: 'preroll_advmaker',
			advmaker_narod_ru: 'preroll_advmaker_narod',
			advmaker_ucoz_ua: 'preroll_advmaker_sng_ucoz',
			advmaker_narod_ua: 'preroll_advmaker_sng_narod',
			advmaker_ucoz_sng: 'preroll_advmaker_sng_ucoz',
			advmaker_narod_sng: 'preroll_advmaker_sng_narod',

			winwideo_ucoz_ru: 'preroll_winwideo_sts_ucoz',
			winwideo_narod_ru:'preroll_winwideo_sts_narod',
			winwideo_ucoz_ua: 'preroll_winwideo_sts_ucoz',
			winwideo_narod_ua: 'preroll_winwideo_sts_narod',
			winwideo_ucoz_sng: 'preroll_winwideo_sts_ucoz',
			winwideo_narod_sng: 'preroll_winwideo_sts_narod',

			adwideo_ucoz_ru: 'preroll_adwideo_sts_ucoz',
			adwideo_narod_ru:'preroll_adwideo_sts_narod',

			ukit_ucoz_ru: 'preroll_ukit1',
			ukit_ucoz_ua: 'preroll_ukit1',
			ukit_ucoz_sng: 'preroll_ukit1',

			ukit_narod_ru: 'preroll_narod_ukit1',
			ukit_narod_ua: 'preroll_narod_ukit1',
			ukit_narod_sng: 'preroll_narod_ukit1',
			ukit_narod_en: 'preroll_narod_ukiten1',
			ukit_ucoz_en: 'preroll_ukiten1',

			pladform_ucoz_ru: 'preroll_pladform_ucoz',
			pladform_narod_ru: 'preroll_pladform_narod',
			pladform_ucoz_ua: 'preroll_pladform_ucoz_sng',
			pladform_narod_ua: 'preroll_pladform_narod_sng',
			pladform_ucoz_sng: 'preroll_pladform_ucoz_sng',
			pladform_narod_sng: 'preroll_pladform_narod_sng'
		},
		site_type: 'ucoz',
		uran_wrap_rate: 0,
		isUcoz: function(){
			return (uPreroll.site_type=='ucoz');
		},
		getRegion: function(){
			switch (uPreroll.country){
				case 'ru':
				case 'md':
				case 'am':
				case 'ge':
				return 'ru';
				case 'ua': return 'ua';
				case 'az':
				case 'by':
				case 'kz':
				case 'kg':
				case 'tj':
				case 'uz':
				case 'tm': return 'sng';
				default: return 'en'
			};
		},

		setCounter: function(name, finalName){
			if(!finalName){
				name = uPreroll.counters[name+'_'+uPreroll.site_type+'_'+uPreroll.getRegion()];
			}
			new Image().src = "//counter.yadro.ru/hit;"+name+"?r"+escape(document.referrer)+(screen&&";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth||screen.pixelDepth))+";u"+escape(document.URL)+";"+Date.now();
		},
		setUranLink: function(){
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','uranga');
        uranga('create', 'UA-45896238-1', 'auto', {'name': 'uranTracker','cookieName': '_uranga'});
        uranga('uranTracker.set', 'referrer', '//'+document.location.hostname);
        uranga('uranTracker.send', 'pageview', '/uran_install_show_'+uPreroll.type);
        $('.bottom_popup:not(a), #uran_download_link_1, #uran_download_link_2').on('click', function() {
           var clientId;
           uranga('uranTracker.send', 'pageview', {'page':'/uran_install_type_'+uPreroll.type,
          'hitCallback': function(){
            uranga(function() {
                clientId =  uranga.getByName('uranTracker').get('clientId');
              });
              $('#urangacid').val(clientId);
              $("#geturaninstaller").submit();
          }
        });
    });
		},
		close_preroll_banners: function(){
			$('#uPreroll-holder, #uPreroll-wrapper, #preroll_close_btn, .myWinGrid, #preroll_counter').remove();
			if(this.isEnglish()){
				UranCooks1();
			}
		},

		dummy : {
			ukit: {
				rate: 1 ,
				show : function(containerid) {
					$('.myWinGrid , #uPreroll-holder').remove();
					$('#uPreroll-wrapper').html('');
					uPreroll.ukit_data.duration = 0 ;
					uPreroll.ads.ukit();
				}
			} ,
			banner : {
				rate: 0 ,
				show : function(containerid) {
					uPreroll.close_preroll_banners();
					document.getElementById('bannerY'+ucoz_rndid).value=400;
					document.getElementById('bannerX'+ucoz_rndid).value=240;
					$('#hideAdBlock240x400').detach();
					addUcozWrappers();
					resizeDiv();
					uShowRuAdBanner() ;
				}
			}
		},
		dummy_video : function(containerid){
			var rnd = Math.random() ;
			for(key in uPreroll.dummy) {
				if(rnd < uPreroll.dummy[key].rate) {
					uPreroll.dummy[key].show(containerid);
					break ;
				} else {
					rnd -= uPreroll.dummy[key].rate ;
				}
			}
		} ,
		closeTimerExpired : false ,
		closeCounter: false,
		setCloseCounter: function(){
			if(uPreroll.closeCounter) return ;
			var cid = '.counter';
			var wid = '#uPreroll-wrapper';
			var tmr = uPreroll.ad_duration;
			$(cid).html(tmr);
			uPreroll.closeCounter = setInterval(function() {
				$(cid).html(tmr--);
				if (tmr==-1){
					$(wid + ' .close_popup').addClass('appeared');
					$(cid).css('display','none');
					clearInterval(uPreroll.closeCounter);
					uPreroll.closeTimerExpired = true ;
				}
			}, 1000);

			$(wid + ' .close_popup').click(function(){
				uPreroll.close_preroll_banners();
			});

		},
		add_close_events: function(tmr){
			var uPreroll_count = setInterval(function () {
					$("#preroll_counter").html(tmr--);
					if (tmr==-1){
						$("#preroll_close_btn").show();
						$("#preroll_counter").hide();
						clearInterval(uPreroll_count);
					}
				}, 1000);

				$("#preroll_close_btn").click(function(){
					uPreroll.close_preroll_banners();
				});

		},
		init_gae_done : false ,
		init_gae: function(){
			//верхняя обертка, обратный отсчет и прочее
			$("#uPreroll-wrapper").html(uPreroll.themes[1].header.replace("%s", uPreroll.top_label) + '<div class="uPreroll-dummy" ></div>');
			$("#uPreroll-holder").show();
			uPreroll.setCloseCounter();
			$('.close_popup').click(function(){
				uPreroll.close_preroll_banners();
			});

			if(uPreroll.isEnglish()){
				//setTimeout(function(){UranCooks1();}, 7000);
				UranCooks1();
			}

			uPreroll.init_gae_done = true ;
			if(uPreroll.init_btm_wrapper_ready) {
				uPreroll.init_btm_wrapper();
			}
		},
		init_btm_wrapper_ready : false ,
		init_btm_wrapper: function() {
			if(uPreroll.custom_wrapper) {
				$("#uPreroll-wrapper .modal").append('<div id="uPreroll_btmWrapper" class="uPreroll_btmWrapper"></div>');
				if(typeof uPreroll.uPreroll_btmWrapper == 'function') {
					uPreroll.uPreroll_btmWrapper();
				}
			} else if(uPreroll.random_num < uPreroll.uran_wrap_rate){
				//var experimentid = "HFjPvEF9QYyr6nZ-lFqjMA"; //all
				//var experimentid = "2rq77eKqQLWF6aidxQW50w"; //design
				var experimentid = "o4sJN8YWTbaosZzwch_3mQ";  //landing
				$.getScript("//www.google-analytics.com/cx/api.js?experiment="+experimentid, function(){
					var gavariation = cxApi.chooseVariation();
					var ga_idx = uPreroll.ga_var_landing[gavariation];
					$("#uPreroll-wrapper .modal").append(uPreroll.themes[ga_idx.theme].footer);

					if(ga_idx.url){
						$('#uPreroll-wrapper .modal_button, #uPreroll-wrapper .modal_icon, #uPreroll-wrapper .download_link, #uPreroll-wrapper .download_img').attr('href', ga_idx.url);
					} else {
						$('#uPreroll-wrapper .modal_button, #uPreroll-wrapper .modal_icon').removeAttr('target').removeAttr('href');
					}

					(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
						(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
						m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
					})(window,document,'script','//www.google-analytics.com/analytics.js','uranga');
					uranga('create', 'UA-45896238-1', 'auto', {'name': 'uranTracker','cookieName': '_uranga'});
					uranga('uranTracker.set', 'referrer', '//'+document.location.hostname);
					uranga('uranTracker.send', 'pageview', '/uran_show_wrap_' + ga_idx.track);
					$('#wrapper_uran_footer a').click(function(e){
						e.stopPropagation();
					}) ;
					var clickfunction = function(e) {
						var clientId;
						if(ga_idx.url && this.id == 'wrapper_uran_footer'){
							window.open(ga_idx.url,'_blank');
						}
						uranga('uranTracker.send', 'pageview', {
							'page':'/uran_click_wrap_' + ga_idx.track,
							'hitCallback': function() {
								if(!ga_idx.url){
									uranga(function() {
										clientId =  uranga.getByName('uranTracker').get('clientId');
									});
									$('#urangacid').val(clientId);
									$("#geturaninstaller").submit();
								}
							}
						});
						uPreroll.setCounter('wrpvid_uran_click' , true);
						//return false;
					} ;
					$('#wrapper_uran_footer:not(a), .modal_button, .modal_icon, .download_link, .download_img').each(function(index , elem){
						elem.addEventListener('click' , clickfunction);
					})
					//experiment end
					uPreroll.setCounter('wrpvid_uran_show' , true);
				});
			} else { //ukit theme
				$("#uPreroll-wrapper .modal").addClass('modal_4') ;
				$("#uPreroll-wrapper .modal").append(uPreroll.themes[3].footer);
				var lndg_link = uPreroll.ukit_data.getUkitWrapperLink();
				uPreroll.setCounter('ukit_video_wrap',true);

				$('.modal_text a').click(function(e){
					e.stopPropagation();
				});

				$('.modal_text').click(function(e) {
					if($(this).hasClass('modal_text')){
						window.open(lndg_link,'_blank');
						uPreroll.setCounter('wrpvid_ukit_click' , true);
					}
				});
				$('#uPreroll-wrapper .modal_button, #uPreroll-wrapper .modal_logo, #uPreroll-wrapper .download_link, #uPreroll-wrapper .download_img').attr('href', lndg_link);

				if(typeof uPreroll.ukt_wrap_text1 == 'string') $('#dV'+ucoz_rndid+' .modal_head').text(uPreroll.ukt_wrap_text1);
				if(typeof uPreroll.ukt_wrap_text2 == 'string') $('#dV'+ucoz_rndid+' .modal_head').parent().children('span:not(.modal_head)').text(uPreroll.ukt_wrap_text2);
				if(typeof uPreroll.ukt_wrap_text3 == 'string') $('#dV'+ucoz_rndid+' .modal_button').text(uPreroll.ukt_wrap_text3);
				if(typeof uPreroll.ukt_wrap_removelogo != "undefined" && uPreroll.ukt_wrap_removelogo) {
					$('#dV'+ucoz_rndid+' .modal_logo').remove();
					$('#dV'+ucoz_rndid+' .modal_buttons').css('text-align','right');
				}
				if(typeof uPreroll.ukt_wrap_onclick == 'function') $('#dV'+ucoz_rndid+' .modal_text , #dV'+ucoz_rndid+' .modal_text a').click(uPreroll.ukt_wrap_onclick);
				uPreroll.setCounter('wrpvid_ukit_show' , true);
			}
		} ,
		gads: {},
		ads:{
			ukit: function(){
				var printdiv ;
				if(typeof(ucoz_rndid) != 'undefined') printdiv = document.getElementById('mainadsdv' + ucoz_rndid) ;
				else printdiv = document.body ;
				printdiv.innerHTML += ('<div class="myWinGrid" style="width: 100%; height: 100%; z-index: 21003; position: fixed; left: 0px; top: 0px; opacity: 1; background: rgba(0, 0, 0, 0.6);"></div>');
				printdiv.innerHTML += ("<style>#preroll_counter{width: 40px; height: 40px; position: fixed; left: 50%; top: 50%; text-align: center; margin: -300px 0 0 360px; z-index: 99999999999; color: #000;} #preroll_close_btn {display: none; width: 40px; height: 40px; position: fixed; left: 50%; top: 50%; margin: -300px 0 0 360px; z-index: 99999999999; background-color:transparent;background-image:url(data:image/png;base64,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);background-size:95% 95%;background-repeat:no-repeat;background-position:center;opacity:1}</style><div id='preroll_counter'></div><a id='preroll_close_btn' href='javascript://' onclick='javascript: uPreroll.close_preroll_banners();' class='ucoz-ppp-close-popup'></a>");
				printdiv.innerHTML += ('<style>.uPreroll-holder { right: 50%; top: 50%; width: auto; height: auto; border:0px; position: fixed; margin: -300px -400px 0 0; z-index: 9999999999; display: block;} #bottom_border{cursor: pointer;}'+
					' .ucoz-ppp-link {margin-top: -3px; background: #2b8b67 !important; text-align: center !important; color: white !important; font-size: 20px !important; padding-top: 5px; text-decoration: none !important; width:'
					+ ' 100%;height: 32px;cursor: pointer;display: block;} .ucoz-ppp-link:hover {background: none;} .ucoz-ppp-video-wrapper video{width: 850px;height:auto;left:0;top:0;cursor:pointer} </style>');

				printdiv.innerHTML += ("<style>.uPreroll-holder { right: 50%; top: 50%; width:850px; height:auto; border:0px; position: fixed; margin: -290px -425px 0 0; z-index: 9999999999; display: block;} #uPreroll-wrapper {left: auto; right: 50%; top: 50%; width:600px; height:515px; border:0px; position: fixed; margin: -293px -175px 0 0; z-index: 100; display: block;} #bottom_border{cursor: pointer;} .uPreroll-dummy{width: 850px; height: 518px}</style>");

				var lang_code = uPreroll.isEnglish()?'en':'ru';
				var newIframe = false;
				var landing_link = uPreroll.ukit_data.getLink(lang_code, (uPreroll.isUcoz()?'ucoz':'narod'));
				var lang_data = uPreroll.ukit_data[lang_code];
				printdiv.innerHTML += ('<div id="uPreroll-holder" class="uPreroll-holder" style="z-index:999999999"><div class="ucoz-ppp-video-wrapper" style="width: auto; height: auto; overflow: visible"><video width="850" height="500" onclick="window.open(\''+landing_link[0]+'\', \'_blank\');" src="'+lang_data.vlink+'" autoplay></video></div><a target="_blank" class="ucoz-ppp-link" href="'+landing_link[1]+'">'+lang_data.text+'</a></div>');

				function ukitonload(){
					uPreroll.add_close_events(uPreroll.ukit_data.duration);
					uPreroll.setCounter('ukit');
					if(uPreroll.isEnglish()){
						//setTimeout(function(){UranCooks1();}, 7000);
						UranCooks1();
					}
				}
				if(document.readyState == 'loading')
					document.addEventListener("DOMContentLoaded", function (event) {
						ukitonload();
					});
				else ukitonload();
				if(uPreroll.country == 'ru'){
					uPreroll.uran_wrap_rate = 1;
					uPreroll.init_gae() ;
					document.getElementsByClassName('myWinGrid')[0].remove();
					printdiv.innerHTML += ('<style>.toppanel{display:none;}</style>');
				}
				document.getElementById('preroll_close_btn').style.margin = '-280px 0 0 370px';
				document.getElementById('preroll_counter').style.margin = '-280px 0 0 370px';
			}
		}
	};

	uPreroll.random_num = Math.random();
	uPreroll.unique = (window.uPreroll_showed !== undefined && !uPreroll_showed);
	var a = document.getElementById('dV'+(typeof(u_data)!='undefined' && typeof(u_data)=='object' ? u_data[1] : ucoz_rndid));
	if(a){
		a.insertAdjacentHTML("afterBegin",'<link type="text/css" rel="StyleSheet" href="http://s202.ucoz.net/bnr/wrappers/wrapper_video.css" /><form method="post" id="geturaninstaller" action="//uranupdates.com/installers/ursetup.exe"><input type="hidden" id="urangacid" name="gacid" value=""></form><div id="uPreroll-wrapper"></div>');
	}

	function uPreroll_setcookie(){
		var s = document.createElement('script');
		s.src="//s202.ucoz.net/cgi/uutils.fcg?a=uprdata&aa=1&r=0.717618670899686" ;
		document.head.appendChild(s);
	}
}
window.uad_user_geo = {
	city: "Dharwad",
	region: "Karnataka"
} ;

				document.write('<scr'+'ipt type="text/javascript" src="//rot.spotsniper.ru/?src=ucfs&s_subid=abnd" async></scr'+'ipt>');
				uOnDomOrLater(UranCooks1);new Image().src = "//counter.yadro.ru/hit;preroll_total_narod?r"+escape(document.referrer)+(screen&&";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth||screen.pixelDepth))+";u"+escape(document.URL)+";"+Date.now();