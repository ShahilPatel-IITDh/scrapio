

window.optiload = window.optiload || {};
optiload.cmd = optiload.cmd || [];

window.googletag = window.googletag || {};
googletag.cmd = googletag.cmd || [];

window.evopbjs = window.evopbjs || {};
evopbjs.que = evopbjs.que || [];


googletag.cmd.push(function() {
	googletag.pubads().enableSingleRequest();
	googletag.pubads().disableInitialLoad();
	googletag.pubads().collapseEmptyDivs(true, true);
	googletag.enableServices();
});

(function() {
	var s = document.createElement("script");
	s.async = true;
	s.type = "text/javascript";
	s.src = "https://assets.evolutionadv.it/optiload/4.x.x/optiload.min.js";
	var node = document.getElementsByTagName("script")[0];
	//@ts-ignore
	node.parentNode.insertBefore(s, node);
})();

//CONFIG
optiload.cmd.push(function() {
	optiload.config.domain = "digital-forum.it";
	optiload.config.mobile_width =  728;
	optiload.config.cmp_type = "quantcast";
	optiload.config.cmp_accept_on_scroll = false;
	optiload.config.cmp_privacy_url = "https://www.digital-forum.it/privacy.html";
	optiload.config.confiant_sandbox = true;
	optiload.config.intext_container='nothing';
	optiload.config.amazon_bid = true;
	optiload.config.masthead_viewability = 3000;
	optiload.config.sellerid= 109;
});

//UNITS
optiload.cmd.push(function() {
	var adUnits = [];

	adUnits[0] = {
		name: '/5966054,22474134531/DigitalForum/DigitalForum_masthead',
		sizes: [[300, 250],[970, 90],[728,90]],
		isMasthead: !optiload.fn.isMobile(),
		lazy: false,
		mappings:{
			desktop: [[970,90],[728,90]],
			mobile: [[300,250]]
		},
		hb: {
			sizes: [[970, 90],[728,90]],
			bids:[
			{
				bidder:'adform',
				params:{ mid: '603505'}
			},
			{
				bidder: 'appnexusAst',
				params: { placementId: '13979943'}
			},
			{
				bidder: 'criteo',
				params: { zoneId: 1366099 }
			},
			{
				bidder: 'openx',
				params: { unit: '540327790', delDomain: 'evolution-d.openx.net'}
			},
			{
				bidder: 'rubicon',
				params: { accountId: "17322", siteId:"215796", zoneId: "1062250", sizes: [2,55]}
			},
			{
				bidder: 'smartadserver',
				params: {siteId: 263980, domain:'https://prg.smartadserver.com',pageId:995454, formatId:58989}
			}
			]
		},
		hbmobile:{
			sizes: [[300, 250]],
			bids:[
			{
				bidder:'adform',
				params:{ mid: '603506'}
			},
			{
				bidder: 'appnexusAst',
				params: { placementId: '13979948'}
			},
			{
				bidder: 'criteo',
				params: { zoneId: 1366094 }
			},
			{
				bidder: 'openx',
				params: { unit: '540327789', delDomain: 'evolution-d.openx.net'}
			},
			{
				bidder: 'rubicon',
				params: { accountId: "17322", siteId:"215798", zoneId: "1062252", sizes: [15]}
			},
			{
				bidder: 'smartadserver',
				params: {siteId: 263980, domain:'https://prg.smartadserver.com',pageId:995454, formatId:58994}
			}
			]
		}
	};


	adUnits[1] = {
		name: '/5966054,22474134531/DigitalForum/DigitalForum_intext',
		sizes: [[300, 250],[728, 90],[320, 480]],
		isIntext: true,
		lazy: false,
		mappings:{
			desktop: [[728, 90]],
			mobile: [[300, 250],[320, 480]]
		},
		hb: {
			sizes: [[728, 90]],
			bids:[
			{
				bidder:'adform',
				params:{ mid: '603507'}
			},
			{
				bidder: 'appnexusAst',
				params: { placementId: '13979957'}
			},
			{
				bidder: 'criteo',
				params: { zoneId: 1366098 }
			},
			{
				bidder: 'openx',
				params: { unit: '540327787', delDomain: 'evolution-d.openx.net'}
			},
			{
				bidder: 'rubicon',
				params: { accountId: "17322", siteId:"215796", zoneId: "1062248", sizes: [2]}
			},
			{
				bidder: 'smartadserver',
				params: {siteId: 263980, domain:'https://prg.smartadserver.com',pageId:995454, formatId:66350}
			}
			]
		},
		hbmobile:{
			sizes: [[300, 250],[320, 480]],
			bids:[
			{
				bidder:'adform',
				params:{ mid: '603508'}
			},
			{
				bidder: 'appnexusAst',
				params: { placementId: '13979982'}
			},
			{
				bidder: 'criteo',
				params: { zoneId: 1366095 }
			},
			{
				bidder: 'openx',
				params: { unit: '540327788', delDomain: 'evolution-d.openx.net'}
			},
			{
				bidder: 'rubicon',
				params: { accountId: "17322", siteId:"215798", zoneId: "1062254", sizes: [15]}
			},
			{
				bidder: 'smartadserver',
				params: {siteId: 263980, domain:'https://prg.smartadserver.com',pageId:995454, formatId:58994}
			},
			{
				bidder:'widespace',
				params:{ sid: '085b1a2f-9407-45f1-b128-d21f8af86afd'}
			}
			]
		}
	};

    adUnits[2] = {
		name: '/5966054,22474134531/DigitalForum/DigitalForum_BTF',
		sizes: [[728, 90],[300, 250]],
		lazy: true,
		mappings:{
			desktop: [[728, 90]],
			mobile: [[300, 250]]
		},
		hb: {
			sizes: [[728, 90]],
			bids:[
			{
				bidder:'adform',
				params:{ mid: '603509'}
			},
			{
				bidder: 'appnexusAst',
				params: { placementId: '13979995'}
			},
			{
				bidder: 'criteo',
				params: { zoneId: 1366096 }
			},
			{
				bidder: 'openx',
				params: { unit: '540327786', delDomain: 'evolution-d.openx.net'}
			},
			{
				bidder: 'rubicon',
				params: { accountId: "17322", siteId:"215796", zoneId: "1062246", sizes: [2]}
			},
			{
				bidder: 'smartadserver',
				params: {siteId: 263980, domain:'https://prg.smartadserver.com',pageId:995454, formatId:66350}
			}
			]
		},
		hbmobile:{
			sizes: [[300, 250]],
			bids:[
			{
				bidder:'adform',
				params:{ mid: '603509'}
			},
			{
				bidder: 'appnexusAst',
				params: { placementId: '13979995'}
			},
			{
				bidder: 'criteo',
				params: { zoneId: 1366097 }
			},
			{
				bidder: 'openx',
				params: { unit: '540327786', delDomain: 'evolution-d.openx.net'}
			},
			{
				bidder: 'rubicon',
				params: { accountId: "17322", siteId:"215798", zoneId: "1062256", sizes: [15]}
			},
			{
				bidder: 'smartadserver',
				params: {siteId: 263980, domain:'https://prg.smartadserver.com',pageId:995454, formatId:58994}
			}
			]
		}
	};

	adUnits[3] = {
		name: '/5966054,22474134531/DigitalForum/DigitalForum_MastheadBig',
		sizes: [[970, 250],[970, 90],[728,90],[300,100], [320,100], [300,50], [320,50]],
		lazy: false,
		mappings:{
			desktop: [[970,90],[728,90],[970,250]],
			mobile: [[300,100], [320,100], [300,50], [320,50]]
		},
		hb: {
			sizes: [[970,90],[728,90],[970,250]],
			bids:[
			{
				bidder:'adform',
				params:{ mid: '1151881'}
			},
			{
				bidder: 'appnexusAst',
				params: { placementId: '22927076'}
			},
			{
				bidder: 'criteo',
				params: { zoneId: 1366099 }
			},
			{
				bidder: 'openx',
				params: { unit: '545715211', delDomain: 'evolution-d.openx.net'}
			},
			{
				bidder: 'rubicon',
				params: { accountId: "17322", siteId:"215796", zoneId: "1062250", sizes: [2,55]}
			},
			{
				bidder: 'smartadserver',
				params: {siteId: 263980, domain:'https://prg.smartadserver.com',pageId:995454, formatId:58989}
			}
			]
		},
		hbmobile:{
			sizes: [[300,100], [320,100], [300,50], [320,50]],
			bids:[
			{
				bidder:'adform',
				params:{ mid: '1151884'}
			},
			{
				bidder: 'appnexusAst',
				params: { placementId: '22927076'}
			},
			{
				bidder: 'openx',
				params: { unit: '545715215', delDomain: 'evolution-d.openx.net'}
			},
			{
				bidder: 'smartadserver',
				params: {siteId: 263980, domain:'https://prg.smartadserver.com',pageId:995454, formatId:58992}
			}
			]
		}
	};


	adUnits[4] = {
		name: '/5966054,22474134531/DigitalForum/DigitalForum_FirstPost',
		sizes: [[300, 250],[336, 280],[120,600],[160,600],[300,600]],
		lazy: false,
		mappings:{
			desktop: [[300, 250],[336, 280],[120,600],[160,600],[300,600]],
			mobile: [[300, 250],[336, 280],[120,600],[160,600],[300,600]]
		},
		hb: {
			sizes: [[300, 250],[336, 280],[120,600],[160,600],[300,600]],
			bids:[
			{
				bidder:'adform',
				params:{ mid: '1151880'}
			},
			{
				bidder: 'appnexusAst',
				params: { placementId: '22927077'}
			},
			{
				bidder: 'openx',
				params: { unit: '545715214', delDomain: 'evolution-d.openx.net'}
			},
			{
				bidder: 'rubicon',
				params: { accountId: "17322", siteId:"215798", zoneId: "1062256", sizes: [15]}
			},
			{
				bidder: 'smartadserver',
				params: {siteId: 263980, domain:'https://prg.smartadserver.com',pageId:995454, formatId:85914}
			}
			]
		},
		hbmobile:{
			sizes: [[300, 250],[336, 280],[120,600],[160,600],[300,600]],
			bids:[
			{
				bidder:'adform',
				params:{ mid: '1151880'}
			},
			{
				bidder: 'appnexusAst',
				params: { placementId: '22927077'}
			},
			{
				bidder: 'openx',
				params: { unit: '545715214', delDomain: 'evolution-d.openx.net'}
			},
			{
				bidder: 'rubicon',
				params: { accountId: "17322", siteId:"215798", zoneId: "1062256", sizes: [15]}
			},
			{
				bidder: 'smartadserver',
				params: {siteId: 263980, domain:'https://prg.smartadserver.com',pageId:995454, formatId:85914}
			}
			]
		}
	};

	adUnits[5] = {
		name: '/5966054,22474134531/DigitalForum/DigitalForum_FloorAd',
		sizes: [[300,100], [320,100], [300,50], [320,50],[970, 90],[728,90]],
		isFloorad: true,
		lazy: false,
		mappings:{
			desktop: [[970,90],[728,90]],
			mobile: [[300,100], [320,100], [300,50], [320,50]]
		},
		hb: {
			sizes: [[970, 90],[728,90]],
			bids:[
			{
				bidder:'adform',
				params:{ mid: '1151882'}
			},
			{
				bidder: 'appnexusAst',
				params: { placementId: '22927078'}
			},
			{
				bidder: 'openx',
				params: { unit: '545715212', delDomain: 'evolution-d.openx.net'}
			},
			{
				bidder: 'rubicon',
				params: { accountId: "17322", siteId:"215796", zoneId: "1062250", sizes: [2,55]}
			}
			]
		},
		hbmobile:{
			sizes: [[300,100], [320,100], [300,50], [320,50]],
			bids:[
			{
				bidder:'adform',
				params:{ mid: '1151883'}
			},
			{
				bidder: 'appnexusAst',
				params: { placementId: '22927078'}
			},
			{
				bidder: 'openx',
				params: { unit: '545715213', delDomain: 'evolution-d.openx.net'}
			}
			]
		}
	};

	optiload.config.adunits=  adUnits;
	optiload.enable();
});


optiload.cmd.push(function() {
	optiload.addEventListener("ready", function() {

		/*optiload.$('body').append('<div id="Brid_75633930"></div>');
	optiload.fn.utils.loadJs("//services.brid.tv/player/build/brid.outstream.min.js", function (data, textStatus, jqxhr) {


		function b4u_bridtv_on_request_ad() {
			console.log("[BRIDTV outstream] request ad");
			//optiload.$("#"+b4u_bridtv_conf.div_id).hide();
		}


		function b4u_bridtv_on_error() {
			console.log( "[BRIDTV OUTSTREAM] error ad" );

		}

		function b4u_bridtv_on_adEnd() {
			console.log( "[BRIDTV OUTSTREAM ] end ad" );

		}

		function b4u_bridtv_on_ready() {

			$bos("Brid_75633930").add( 'requestAd', b4u_bridtv_on_request_ad );
			$bos("Brid_75633930").add( 'adEnd', b4u_bridtv_on_adEnd );
			$bos("Brid_75633930").add( 'adError', b4u_bridtv_on_error );
		}
		$bos("Brid_75633930", {"id":"23952","width":"400","height":"220", "inviewBottomOffset": "0px", "inviewRightOffset": "0px"},b4u_bridtv_on_ready);
	});*/


		insertBanner();
		optiload.fn.utils.loadCss('https://assets.evolutionadv.it/digitalforum_it/fix-mh.css');
		optiload.fn.standardConfig();
		optiload.fn.loadComscore();
	});
});









function insertBanner() {
	var selectorRows = 'li.postbitlegacy';
	var boxAdv = "<div class='gptslot' data-adunitid='1' style='text-align: center;text-transform:uppercase;font-size:10px;width:100%;margin-left:0px !important;padding-bottom:15px'></div>";

	optiload.$("body").append('<div id="video-evo-desktop" class="gptslotvideo" data-adunitid="11" data-addesktop="true"></div>');
	optiload.$("body").append('<div id="video-evo-mobile" class="gptslotvideo" data-adunitid="12" data-admobile="true"></div>');
	insertEvoBridPlayerHomeCategorie();
	//evoadipolo();


	if(optiload.fn.isMobile()) {
		selectorRows = 'li.postbitim';
		//optiload.$('li.postbitim:nth-child(2n)').after("<div class='gptslot' data-adunitid='1' style='text-align: center;text-transform:uppercase;font-size:10px;width:100%;margin-left:0px !important;padding-bottom:15px'></div>");
	} //else {
		//optiload.$('li.postbitlegacy:nth-child(2n)').after("<div class='gptslot' data-adunitid='1' style='text-align: center;text-transform:uppercase;font-size:10px;width:100%;margin-left:0px !important;padding-bottom:15px'></div>");
	//}

	var threadElements = optiload.$(selectorRows);

	var j = -1;
	var lastInserted = false;
	for (var i = 0; i < threadElements.length; i++) {
		lastInserted = false;
		if(i==0){
			//after first post
			optiload.$(threadElements[i]).after(boxAdv);
			lastInserted = true;
		}

		if(j==1) {
			//every 2 after the first
			optiload.$(threadElements[i]).after(boxAdv);
			j = 0;
			lastInserted = true;
		} else {
			j++;
		}
	}

	if(!lastInserted) {
		optiload.$(threadElements[threadElements.length-1]).after(boxAdv);
	}
}

function insertEvoBridPlayerHomeCategorie() {
	var evoSlotVideo = optiload.$("div[data-adunitid='11']");

	if (optiload.fn.isMobile()) {
		evoSlotVideo = optiload.$("div[data-adunitid='12']");
	}


	console.log("[BRIDTV] start");

	//load script
	// var sBrid = document.createElement("script");
	// sBrid.type = "text/javascript";
	// sBrid.src = "//services.brid.tv/player/build/brid.min.js";
	// var node = document.getElementsByTagName("script")[0];
	// //@ts-ignore
	// node.parentNode.insertBefore(sBrid, node);

	optiload.fn.utils.loadJs(
		"https://services.brid.tv/player/build/brid.min.js",
		function() {
			for (var i = 0; i < evoSlotVideo.length; i++) {
				optiload
					.$(evoSlotVideo[i])
					.append(
						'<div id="Brid_29506692_' +
							i +
							'" class="brid" style="z-index:500000;width:480;height:270;"></div>'
					);

				//config
				var adErrorFired = false;

				var b4u_bridtv_conf = {
					div_id: "Brid_29506692_" + i,
					player_id: 28230,
					player_width: 420,
					player_height: 220,
					end_sticky_timeout: 200,
					video_id: 5968,
					passback_sync: false,
					passback_width_px: 300,
					passback_height_px: 250,
					passback_ad_unit: "/5966054,22474134531/test/test"
				};

				// -------------------------------------------- AUXILIARY

				function b4u_brdtv_passback() {
					// config
					console.log("[BRIDTV] passback Async");
					var w = b4u_bridtv_conf.passback_width_px;
					var h = b4u_bridtv_conf.passback_height_px;
					var ad_unit = b4u_bridtv_conf.passback_ad_unit;
					var el = window.document.getElementById(
						b4u_bridtv_conf.div_id
					);
					el.innerHTML = "";
					el.style.display = "none";

					// div
					var d = document.createElement("div");
					d.setAttribute("data-glade", "");
					d.setAttribute("data-ad-unit-path", ad_unit);
					d.setAttribute("width", w);
					d.setAttribute("height", h);
					d.setAttribute(
						"style",
						"width: " +
							w +
							"px; height: " +
							h +
							"px; position: relative; margin: 0px auto;"
					);
					b4u_bridtv_insert_after(d, el);

					// script
					var s = document.createElement("script");
					s.setAttribute("async", "async");
					s.src =
						"https://securepubads.g.doubleclick.net/static/glade.js";
					b4u_bridtv_insert_after(s, el);

					// destroy "X"
					optiload.$(".brid-close").remove();

					console.log("[BRIDTV] passback Async rendered");
				}

				function b4u_brdtv_passback_sync() {
					// config
					console.log("[BRIDTV] passback sync");
					var w = b4u_bridtv_conf.passback_width_px;
					var h = b4u_bridtv_conf.passback_height_px;
					var ad_unit = b4u_bridtv_conf.passback_ad_unit;
					var el = document.getElementById(b4u_bridtv_conf.div_id);
					var id = b4u_bridtv_conf.div_id + "_passback_sync";
					var code =
						"googletag.pubads().definePassback('" +
						ad_unit +
						"', [" +
						w +
						", " +
						h +
						"]).display();";
					el.innerHTML = "";
					el.style.display = "none";

					// iframe
					var iframe = document.createElement("iframe");
					iframe.setAttribute("id", id);
					iframe.setAttribute("frameBorder", "0");
					iframe.setAttribute("scrolling", "no");
					iframe.setAttribute("width", w);
					iframe.setAttribute("height", h);
					iframe.setAttribute("marginwidth", "0");
					iframe.setAttribute("marginheight", "0");
					iframe.setAttribute("vspace", "0");
					iframe.setAttribute("hspace", "0");
					iframe.setAttribute(
						"style",
						"width:" +
							w +
							"px;height:" +
							h +
							"px;position:relative;"
					);

					// javascript
					iframe.src = "JavaScript:''";
					b4u_bridtv_insert_after(iframe, el);
					code =
						"<p style='margin:0;padding:0;'></p><scr" +
						"ipt type='text/javascript'>var inDapIF = true </scr" +
						"ipt><sc" +
						"ript src='https://www.googletagservices.com/tag/js/gpt.js'>" +
						code +
						"</scr" +
						"ipt>";
					var ifr = window.document.getElementById(id);
					ifr.contentWindow.document.open("text/html", "replace");
					ifr.contentWindow.document.write(code);
					ifr.contentWindow.document.close();

					// destroy "X"
					optiload.$(".brid-close").remove();

					console.log("[BRIDTV] passback sync rendered");
				}

				function b4u_bridtv_insert_after(newNode, referenceNode) {
					referenceNode.parentNode.insertBefore(
						newNode,
						referenceNode.nextSibling
					);
				}

				// -------------------------------------------- EVENTS

				function b4u_bridtv_on_request_ad() {
					console.log("[BRIDTV] request ad");
					//optiload.$("#"+b4u_bridtv_conf.div_id).hide();
				}
				function b4u_bridtv_on_ad_start() {
					console.log("[BRIDTV] ad start");
					optiload.$("#" + b4u_bridtv_conf.div_id).show();
				}
				function b4u_bridtv_on_vpaid_start() {
					console.log("[BRIDTV] vpaid start");
					optiload.$("#" + b4u_bridtv_conf.div_id).show();
				}
				function b4u_bridtv_on_adImpression() {
					console.log("[BRIDTV] adImpression");
					optiload.$("#" + b4u_bridtv_conf.div_id).show();
					/*			setTimeout(function () {
// === START VIRALIZE ===
// 					var s = document.createElement("script"),
// 					el = document.getElementsByTagName("script")[0];
// 					s.src = "https://ads.viralize.tv/display/?zid=AADXC3cOg2C2yMGm"; el.setAttribute('data-wid','auto');el.setAttribute('type','text/javascript');
// 					el.parentNode.insertBefore(s, el);
// === END VIRALIZE ===
				},10000)(); */
				}
				function b4u_bridtv_on_adEnd() {

					//evoadipolo();


					if (!adErrorFired) {
						console.log("[BRIDTV] ad End ");
						//avantis
// === START AVANTIS ===
// 						var sAvantis = document.createElement("script"),
// 						elAvantis = document.getElementsByTagName("script")[0];
// 						sAvantis.async = true;
// 						sAvantis.id = 'avantisJS';
// 						sAvantis.src = "https://cdn.avantisvideo.com/avm/js/video-loader.js?id=071f7e7a-29d9-4343-84c1-5915befe1b7c&tagId=1&subId=&callback=";
// 						elAvantis.setAttribute('type','text/javascript');
// 						elAvantis.parentNode.insertBefore(sAvantis, elAvantis);
// === END AVANTIS ===

						//	setTimeout(function(){ (b4u_bridtv_conf.passback_sync)? b4u_brdtv_passback_sync() : b4u_brdtv_passback(); }, b4u_bridtv_conf.end_sticky_timeout+100);
// === START VIRALIZE ===
// 						/*var s = document.createElement("script"),
// 							el = document.getElementsByTagName("script")[0];
// 						s.src =
// 							"https://ads.viralize.tv/display/?zid=AADXC3cOg2C2yMGm";
// 						el.setAttribute("data-wid", "auto");
// 						el.setAttribute("type", "text/javascript");
// 						el.parentNode.insertBefore(s, el);*/
// === END VIRALIZE ===

						// var sWanted = document.createElement("script"),
						// 	elWanted = document.getElementsByTagName(
						// 		"script"
						// 	)[0];
						// sWanted.src =
						// 	"https://tags.smilewanted.com/formats/corner-video/IlMediconline_it_3ee8cff";
						// elWanted.setAttribute("type", "text/javascript");
						// elWanted.parentNode.insertBefore(sWanted, elWanted);
					}
				}
				function b4u_bridtv_on_error() {
//	evoadipolo();

					console.log("[BRIDTV] ad error");
				//	optiload.$("#" + b4u_bridtv_conf.div_id).remove();
				//	$bp(b4u_bridtv_conf.div_id).destroy();
					//avantis
// === START AVANTIS ===
// 					var sAvantis = document.createElement("script"),
// 					elAvantis = document.getElementsByTagName("script")[0];
// 					sAvantis.async = true;
// 					sAvantis.id = 'avantisJS';
// 					sAvantis.src = "https://cdn.avantisvideo.com/avm/js/video-loader.js?id=071f7e7a-29d9-4343-84c1-5915befe1b7c&tagId=1&subId=&callback=";
// 					elAvantis.setAttribute('type','text/javascript');
// 					elAvantis.parentNode.insertBefore(sAvantis, elAvantis);
// === END AVANTIS ===
					adErrorFired = true;
					//	setTimeout(function(){ (b4u_bridtv_conf.passback_sync)? b4u_brdtv_passback_sync() : b4u_brdtv_passback(); }, b4u_bridtv_conf.end_sticky_timeout+100);
// === START VIRALIZE ===
// 					/*var s = document.createElement("script"),
// 						el = document.getElementsByTagName("script")[0];
// 					s.src =
// 						"https://ads.viralize.tv/display/?zid=AADXC3cOg2C2yMGm";
// 					el.setAttribute("data-wid", "auto");
// 					el.setAttribute("type", "text/javascript");
// 					el.parentNode.insertBefore(s, el);*/
// === END VIRALIZE ===

					// var sWanted = document.createElement("script"),
					// 	elWanted = document.getElementsByTagName("script")[0];
					// sWanted.src =
					// 	"https://tags.smilewanted.com/formats/corner-video/IlMediconline_it_3ee8cff";
					// elWanted.setAttribute("type", "text/javascript");
					// elWanted.parentNode.insertBefore(sWanted, elWanted);
				}
				function b4u_bridtv_on_start() {
					console.log( "[BRIDTV] Contenuto Start " );
				//	$bp("#"+b4u_bridtv_conf.div_id).SlideInView.forceHide();

						$bp("#"+b4u_bridtv_conf.div_id).destroy();
				}


				function b4u_bridtv_on_ready() {
					console.log("[BRIDTV] player ready");
					$bp(b4u_bridtv_conf.div_id).add(
						"requestAd",
						b4u_bridtv_on_request_ad
					);
					$bp(b4u_bridtv_conf.div_id).add(
						"adStart",
						b4u_bridtv_on_ad_start
					);
					$bp(b4u_bridtv_conf.div_id).add(
						"vpaidStart",
						b4u_bridtv_on_vpaid_start
					);
					$bp(b4u_bridtv_conf.div_id).add(
						"adImpression",
						b4u_bridtv_on_adImpression
					);
					$bp(b4u_bridtv_conf.div_id).add(
						"adError",
						b4u_bridtv_on_error
					);
					$bp(b4u_bridtv_conf.div_id).add(
						"adEnd",
						b4u_bridtv_on_adEnd
					);
					$bp(b4u_bridtv_conf.div_id).add( 'start', b4u_bridtv_on_start );
					//optiload.$("#"+b4u_bridtv_conf.div_id).hide();
				}

				// -------------------------------------------- INIT

				$bp(
					b4u_bridtv_conf.div_id.toString(),
					{
						"id": b4u_bridtv_conf.player_id.toString(),
						"width": b4u_bridtv_conf.player_width.toString(),
						"height": b4u_bridtv_conf.player_height.toString(),
						"playlist": b4u_bridtv_conf.video_id.toString(),
						"inviewBottomOffset": "0px",
						"inviewRightOffset": "0px",
						"prebid_timeout": 5000,
						"a9_timeout": 5000,
						"prebid_variable": "evopbjs",
						"autoplayStickyAdOnly": true
					},
					b4u_bridtv_on_ready
				);

				//optiload.$("#"+b4u_bridtv_conf.div_id).hide();
			}
		}
	);
}



function evoadipolo() {
	console.log( "Richiamato pb ADPL " );
	optiload.$('body').append('<div class="aplvideo"></div>');

		var ukJS = document.createElement('script');
		ukJS.src = '//tg1.modoro360.com/api/adserver/spt?AV_TAGID=62860cc6b8935e10570004e5&AV_PUBLISHERID=6285ff17683a9437b54ea565';
		ukJS.type = 'text/javascript';
		ukJS.async = true;
		ukJS.id = "AV62860cc6b8935e10570004e5";
		document.getElementsByTagName('head')[0].append(ukJS);
	;

}