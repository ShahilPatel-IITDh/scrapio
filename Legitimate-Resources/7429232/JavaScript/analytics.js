$( document ).ready(function() {
	var dmfExistOnReady = setInterval(() => {
		if (window.DataMappingInterface) {
			clearInterval(dmfExistOnReady);
            if(window.DataMappingInterface.autopageload == undefined || window.DataMappingInterface.autopageload) {
			   DataMappingInterface.disableAutoPageLoad();
			}
	    }
	}, 50);
			
			var friendlyPageName = $('title').text() + " Pg";
			//var pageCategory = $('meta[name=SBC-SEARCH-CATEGORY]').attr('content');
			var pageCategory = $('meta[name=SBC-SEARCH-TAGS_LIST]').attr('content');
			var pageTitle = $('title').text();
			var publishDate = $('meta[name=SBC-SEARCH-PUBLISHDATE]').attr('content');
			var formattedPublishDate = "";
			var contentFriendlyNamesList = $(".contentFriendlyName");
			var marqueeArr = [];
			var marqueeCounter = 0;
			var currentComponentOrder = 0;
			var skipCounter = 0;
			var contentFriendlyName = "";

			$(".marquee__slides").each(function(){marqueeArr.push($(this).find(".banner").length);});

			$(".banner").each(function(bannerIndex){
				if(skipCounter === 0){
					if($(this).parent().closest(".marquee__slides").length > 0) {
						currentComponentOrder++;
						for(var slotNumber=0;slotNumber<marqueeArr[marqueeCounter];slotNumber++){
							$(".banner").eq(bannerIndex+slotNumber).attr("data-order",currentComponentOrder).attr("data-slot",(slotNumber+1));
							$(".banner").eq(bannerIndex+slotNumber).find(".cta--button").attr("data-order",currentComponentOrder).attr("data-slot",(slotNumber+1));
							contentFriendlyName = $(".banner").eq(bannerIndex+slotNumber).find('.contentFriendlyName').val();
							
							var dmfExistMarqueeLoad = setInterval(() => {
								if (window.DataMappingInterface) {
									clearInterval(dmfExistMarqueeLoad);
													
							       if(window.DataMappingInterface.autopageload == undefined || window.DataMappingInterface.autopageload) {
			                          DataMappingInterface.disableAutoPageLoad();
			                       }
								}
							}, 50);
							
							var impression ={
									contentFriendlyName : contentFriendlyName,
									componentName : "Marquee component",
									componentOrder : currentComponentOrder,
									slotOrder : slotNumber+1,
									contentSystem : "AEM"
							}

							var json = {
									eventAction: 'impression',
									eventCode: 'impression',
									eddsupported: false,
									dataset : {"page.pageInfo.pageTitle" : pageTitle},
									additionaldata: impression ,
									datatransform: false 
							};
                            var impressionCallMade = false;
							var dmfExistImpressionCall = setInterval(() => {
								
								if (window.DataMappingInterface && !impressionCallMade) {
									clearInterval(dmfExistImpressionCall);
							
							DataMappingInterface.init(json);
							impressionCallMade = true;
							}
							}, 50);
							
							
							skipCounter = slotNumber;
						}
						marqueeCounter++;
					} else {
						currentComponentOrder++;
						$(this).attr("data-order",currentComponentOrder).attr("data-slot",0);                                                                                                                                                                        console.log("Banner"+":Order->"+currentComponentOrder+" :Slot-> 1");
						$(this).find(".cta--button").attr("data-order",currentComponentOrder).attr("data-slot",0);
						contentFriendlyName = $(this).find('.contentFriendlyName').val();
						
						var dmfExistSecondPageLoad = setInterval(() => {
								if (window.DataMappingInterface) {
									clearInterval(dmfExistSecondPageLoad);
						            if(window.DataMappingInterface.autopageload == undefined || window.DataMappingInterface.autopageload) {
			                           DataMappingInterface.disableAutoPageLoad();
			                        }
						        }
						    }, 50);

						var impression ={
								contentFriendlyName : contentFriendlyName,
								componentName : "Banner component",
								componentOrder : currentComponentOrder,
								slotOrder : "0",
								contentSystem : "AEM"
						}

						var json = {
								eventAction: 'impression',
								eventCode: 'impression',
								eddsupported: false,
								dataset : {"page.pageInfo.pageTitle" : pageTitle},
								additionaldata: impression,
								datatransform: false 
						};
 
                        var marqueeCallMade = false;
						var dmfExistMarqueeJson = setInterval(() => {
							
								if (window.DataMappingInterface && !marqueeCallMade) {
									clearInterval(dmfExistMarqueeJson);
						DataMappingInterface.init(json);
						marqueeCallMade = true;
						}
							}, 50);
						
						skipCounter = 0;
					}
				} else {
					skipCounter--;
				}

			});

			if (typeof publishDate !== typeof undefined && publishDate !== false) {
				formattedPublishDate = dateFormat(publishDate);
			}

			if ($("body").hasClass("story")){
				pageTitle = $('.article__content .featured-headline').find('h1').text();
			}

			else if ($("body").hasClass("blog-post") || $("body").hasClass("media-kit-page")){
				pageTitle = $('.featured-headline').text();
			}

			if ($("body").hasClass("generic")){
				var additionaldata = {
						'page.pageInfo.friendlyPageName': friendlyPageName,
						'page.pageInfo.language': 'EN',
						'page.pageInfo.lineOfBusiness': 'General',
						'page.category.applicationName': 'About',
						'page.category.pageFunction': 'Other',
						'page.category.pageOwnership':'Consumer',
						'page.location.domain': 'about.att.com',
						'page.pageInfo.responsiveWebDesignFlag': '1',
						'page.media.category': pageCategory,
						'page.media.publishDate': formattedPublishDate,
						'page.media.class':'Unspecified'
				};
			}

			else if ($("body").hasClass("blog-landing") || $("body").hasClass("media-kit-landing")) {
				var additionaldata = {
						'page.pageInfo.friendlyPageName': friendlyPageName,
						'page.pageInfo.language': 'EN',
						'page.pageInfo.lineOfBusiness': 'General',
						'page.category.applicationName': 'About',
						'page.category.pageFunction': 'Other',
						'page.category.pageOwnership':'Consumer',
						'page.location.domain': 'about.att.com',
						'page.pageInfo.responsiveWebDesignFlag': '1',
						'page.media.category': pageCategory,
						'page.media.publishDate': formattedPublishDate,
						'page.media.class':'Unspecified',
						'page.media.type':'Landing Page'
				};
			}

			else if ($("body").hasClass("story") || $("body").hasClass("blog-post") || $("body").hasClass("media-kit-page")){

				var date = $('#publishedDate').val();
				var pageType = $('#pageType').val();
				var featuredAsset = $('#featuredAsset').val();

				var additionaldata = {
						'page.pageInfo.pageTitle' : pageTitle,
						'page.pageInfo.friendlyPageName': friendlyPageName,
						'page.pageInfo.language': 'EN',
						'page.pageInfo.lineOfBusiness': 'General',
						'page.category.applicationName': 'About',
						'page.category.pageFunction': 'Other',
						'page.category.pageOwnership':'Consumer',
						'page.location.domain': 'about.att.com',
						'page.pageInfo.responsiveWebDesignFlag': '1',
						'page.media.type':pageType,
						'page.media.class':featuredAsset,
						'page.media.publishDate':date,
						'page.media.category' : pageCategory
				};
			}
			var pathName = window.location.pathname;
			if(!pathName.includes('allnews.html')) {
				
				var dmfExistFeaturedAsset = setInterval(() => {
								if (window.DataMappingInterface) {
									clearInterval(dmfExistFeaturedAsset);
				
				DataMappingInterface.init({
					eventAction: 'pageLoad',
					eventCode: 'Page_Load',
					eddsupported: false,
					dataset : {},
					additionaldata: additionaldata,
					datatransform: false 
				});
				
				}
							}, 50);
				
			}

			//Adding form submit code for all news page
			var form = document.getElementById('content-searchForm');     //  form submit called from  searchkey in allnews
			if(form!=null){
				form.addEventListener('submit', submitReporting);
			}

			var button = document.getElementById('search-submit');    //  form submit called from search component
			if(button != null) {
				var formAction = $("form").attr("action");
				//console.log('formaction is :', formAction);
				if(formAction == '/allnews.html') {
					button.addEventListener('click',submitReporting);
				}
			}


			var form = document.querySelector('.filterform');	 //  form submit called from  filter month in allnews
			if(form!=null){
				form.addEventListener('submit', submitReporting);
			}

			var searchKey = '';
			var categoryValue = '';
			var pathValue = '';
			var monthsValue = '';
			var currentSearchTermCategory ='';
			var monthValue = 'all';


			function submitReporting(event) {
				// console.log('form submit called from search box, month or search component');

				var formData = $('form').serialize();
				var result = formData.split('&');
				for (var i = 0; i < result.length; i++) {
					var skeyName = result[i].split('=');
					if (skeyName[0] == 'category') {
						categoryValue = skeyName[1];
					}
					if (skeyName[0] == 'path') {
						pathValue = skeyName[1];
					}
					/*if (skeyName[0] == 'searchkey') {
						searchValue = skeyName[1];
						}
					  if (skeyName[0] == 'months' && monthValue) {
						monthsValue = skeyName[1];
						}*/
				}

				var searchKeyBox=document.getElementById("search") || document.getElementById("content-search");
				var searchKey =  searchKeyBox.value;
				searchKey = searchKey.replace("+", " ");
				searchKey = searchKey.replace(/%20/g, " ");

				var selMonth = document.getElementById('Months');
				if(selMonth) {
					monthValue = selMonth.options[selMonth.selectedIndex].value;
				}
				var internalSearchTypeValue = internalSearchType(categoryValue,monthValue,pathValue);

				var submitEventData = {
						'authenticatedSearch':'N',
						'currentSearchResultCount':'0',
						'currentSearchTerm':searchKey,
						'internalSearchType':internalSearchTypeValue,
						'eventCode':'ATT_NewsPortal_Text_UserSearch_Submit',
						'linkDestinationUrl':window.location.origin+'/allnews.html',
						'linkName':'Search button',
						'linkPosition':'Body',
						'searchAction':'Search Submit',
						'searchOriginURL':window.location.href,
						'statusCode':'-2',
						'successFlag':'-2'
				};

				// Changes as per new widget search analytics call 
				//ddo.pushEvent('formSubmit','ATT_NewsPortal_Text_UserSearch_Submit',submitEventData);
			}

			// Changes as per new widget search analytics call 

			function allnewsSearchTrackCall(){

				//page load event for all news page
				var full_window_width = window.outerWidth;
				var viewedUIExperience = calculateScreen(full_window_width);
				additionaldata["page.pageInfo.viewedUIExperience"] = viewedUIExperience;
				if (typeof ddo !== 'undefined' && ddo.ext.getCookie('browserid')) {
					var appvisitorcookie = ddo.ext.getCookie('browserid');
					additionaldata["user.appVisitorCookie"] = appvisitorcookie;
				}
				
				var dmfExistAppCookie = setInterval(() => {
								if (window.DataMappingInterface) {
									clearInterval(dmfExistAppCookie);
									
				DataMappingInterface.init({
					eventAction: 'pageLoad',
					eventCode: 'Page_Load',
					eddsupported: false,
					dataset : {},
					additionaldata: additionaldata,
					datatransform: false 
				});
					}
	}, 50);
				

			}			
			//All news form response and page load event tracking
			if(pathName.includes('allnews.html')) {
				
				if(document.getElementById("search") != null){
					if(performance.navigation.type === 0 && document.referrer.indexOf("\/allnews.html?searchkey") === -1
							&& typeof GetURLParameter("srld") === "undefined"){
						allnewsSearchTrackCall();
					}			
				}
				
				/*if(document.getElementById("content-search") != null){
					searchTrack(responseSearch); 
				}*/
			}
			
			
			//Social Channels link tracking
			$('.social-channels a').on('click',function(event){

				var url = checkURL ($(this).attr('href'));
				var additionalData = {
						'linkName': $(this).attr('aria-label'),
						'linkDestinationURL':url,
						'linkPosition': 'Social Channels component'
				}
				ddo.pushEvent('linkClick','Link_Click',additionalData);
			});

			//Featured Item link tracking
			$('.featured-item a').on('click',function(event){

				if (!($(this).parents('.SNR_medialibrary').length)
						&& !($(this).parents('.media-carousel').length)
						&& !($(this).parents('.brand-assets').length)
						&& !($(this).parents('.latest-stories').length)){

					var linkname = "";
					var url = checkURL ($(this).attr('href'));
					var linkposition = "Featured Item component";

					var ariaLabel = $(this).attr('aria-label');
					//var ctaLink = $(this).parentsUntil(".component").find(".cta--link").text();

					if ($(this).parents('.item__media').length){
						if (typeof ariaLabel !== typeof undefined && ariaLabel !== false) {
							linkname = $(this).attr('aria-label');
						}
						else if ($(this).parents('.featured-item').find(".item__title").length) {
							linkname = $(this).parents('.featured-item').find(".item__title").text();
						}
						if (linkname === undefined || linkname === false || linkname == "" ) {
							if ($(this).parentsUntil(".component").find(".cta--link").length) {
								linkname = $(this).parentsUntil(".component").find(".cta--link").text();
							}
							else if ($(this).parentsUntil(".component").find(".cta--button").length) {
								linkname = $(this).parentsUntil(".component").find(".cta--button").text();
							}
						}
					}

					else if ($(this).parents('.item__description').length){
						linkname = $(this).text();
					}

					else if ($(this).parent('.item__cta').length) {
						if($(this).parentsUntil(".featured-item").find(".item__title").length){
							linkname = $(this).parentsUntil(".featured-item").find(".item__title").text();
						}
						else if (!($(this).parentsUntil(".featured-item").find(".item__title").length)){
							linkname = $(this).text();
						}
					}

					if ($(this).parents('.story__related').length){
						linkposition = "Featured Item component - Related Articles";
					}

					else if ($(this).parents('.sidebar__content').length) {
						linkposition = "Featured Item component - Right Rail";
					}

					else if ($(this).parents('.featurestorymultifield').length) {
						linkposition = "Ordered Featured Items component";
					}
					else if ($(this).parents('.blog__related').length){
						linkposition = "Featured Item component - Related Blog Post";
					}

					var additionalData = {
							'linkName': linkname,
							'linkDestinationURL':url,
							'linkPosition': linkposition
					}
					ddo.pushEvent('linkClick','Link_Click',additionalData);
				}
			});

			// Featured Stories - View More/View Less
			$('.featured-stories .stories__cta a').on('click',function(event){

				var url = checkURL ($(this).attr('href'));
				var additionalData = {
						'linkName':$(this).text(),
						'linkDestinationURL':url,
						'linkPosition':'Featured Stories component'
				}

				ddo.pushEvent('linkClick','Link_Click',additionalData);
			});


			// RSS Component
			$('.rss-feed__cta a').on('click',function(event){
				if($(this).attr("id")=='signup')
				{
					var url = checkURL ($(this).attr('href'));
					var additionalData = {
							'linkName':'Subscribe',
							'linkDestinationURL':url,
							'linkPosition':'RSS Feed component'
					}
					ddo.pushEvent('linkClick','Link_Click',additionalData);
				}

			});

			//Tile link tracking
			$('.tile a').on('click', function(event){

				var linkname = "";
				var url = checkURL ($(this).attr('href'));

				if ($(this).find(".tile__headline").length){
					linkname = $(this).find(".tile__headline").text();
					linkname = linkname.replace(/\n|\r/g, " ");
				}
				else {
					linkname = $(this).find(".tile__subheadline").text();
				}

				var additionalData = {
						'linkName': linkname,
						'linkDestinationURL':url,
						'linkPosition': 'Tile component'
				}
				ddo.pushEvent('linkClick','Link_Click',additionalData);
			});

			//Alert link tracking
			$('.alert a').on('click', function(event){

				var url = checkURL ($(this).attr('href'));
				var additionalData = {
						'linkName': $(this).text(),
						'linkDestinationURL':url,
						'linkPosition': 'Alert component'
				}
				ddo.pushEvent('linkClick','Link_Click',additionalData);
			});

			//Stock ticker link tracking
			$('.stock-ticker a').on('click', function(event){

				var url = checkURL ($(this).attr('href'));
				var additionalData = {
						'linkName': $(this).attr('aria-label'),
						'linkDestinationURL':url,
						'linkPosition': 'Stock Ticker component'
				}
				ddo.pushEvent('linkClick','Link_Click',additionalData);
			});

			//Text component link tracking
			$('.text.section a').on('click', function(event){

				var url = checkURL ($(this).attr('href'));
				var additionalData = {
						'linkName':$(this).text(),
						'linkDestinationURL':url,
						'linkPosition':'Text component'
				}
				ddo.pushEvent('linkClick','Link_Click',additionalData);
			});

			//Text component link tracking - blog post page
			$('.blogtext.section a').on('click', function(event){

				var url = checkURL ($(this).attr('href'));
				var additionalData = {
						'linkName':$(this).text(),
						'linkDestinationURL':url,
						'linkPosition':'Text component'
				}
				ddo.pushEvent('linkClick','Link_Click',additionalData);
			});

			//Expandable component link tracking
			$('.SNR_expandable a').on('click', function(event){

				if (!($(this).hasClass('cta--link'))){

					var url = checkURL ($(this).attr('href'));
					var additionalData = {
							'linkName':$(this).text(),
							'linkDestinationURL':url,
							'linkPosition': 'Expandable Text component'
					}
					ddo.pushEvent('linkClick','Link_Click',additionalData);
				}
			});


			//download assets link
			$('.article__assets a').on('click', function(event){

				var bodyclass = $('body').attr('class').trim();
				var url = checkURL ($(this).attr('href'));
				var linkposition = "";

				if (bodyclass.startsWith("story")){
					linkposition = "News Article template";
				}
				else if (bodyclass.startsWith("generic")){
					linkposition = "Generic template";
				}
				else if (bodyclass.includes("blog-landing")){
					linkposition = "Blog Landing template";
				}
				else if (bodyclass.includes("blog-post")){
					linkposition = "Blog Post template";
				}
				else if (bodyclass.includes("media-kit-page")){
					linkposition = "Media Kit template";
				}

				var additionalData = {
						'linkName':$(this).attr('aria-label'),
						'linkDestinationURL':url,
						'linkPosition':linkposition
				}
				ddo.pushEvent('linkClick','Link_Click',additionalData);
			});


			//banner component link tracking
			$('.banner__content a').on('click',function(event){

				var url = checkURL ($(this).attr('href'));
				var linkname = "";

				if ($(this).parentsUntil('.banner__content').find('.banner__headline--text').length){
					linkname = $(this).parentsUntil('.banner__content').find('.banner__headline--text').text();
				}

				else {
					linkname = $(this).text()
				}

				var slotNumber = "";

				if($(this).data('slot') > 0){

					currentComponentOrder = $(this).data('order');
					slotNumber = $(this).data('slot');
					contentFriendlyName = $(this).parent().closest(".banner").find('.contentFriendlyName').val();

					var additionalData = {
							'linkName': linkname,
							'linkDestinationURL':url,
							'linkPosition':'Banner component',
							contentFriendlyName : contentFriendlyName,
							componentName : "Marquee component",
							componentOrder : currentComponentOrder,
							slotOrder : slotNumber,
							contentSystem : "AEM"
					}
					ddo.pushEvent('linkClick','Link_Click',additionalData);
				}

				else{
					currentComponentOrder = $(this).data('order');
					slotNumber = $(this).data('slot');
					contentFriendlyName = $(this).parent().closest(".banner").find('.contentFriendlyName').val();

					var additionalData = {
							'linkName': linkname,
							'linkDestinationURL':url,
							'linkPosition':'Banner component',
							contentFriendlyName : contentFriendlyName,
							componentName : "Banner component",
							componentOrder : currentComponentOrder,
							slotOrder : "0",
							contentSystem : "AEM"
					}
					ddo.pushEvent('linkClick','Link_Click',additionalData);
				}
			});

			//Site navigation
			$('.microsite-nav__site-nav a').on('click',function(event){

				var url = checkURL ($(this).attr('href'));
				var linkname = "";

				if ($(this).hasClass('microsite-nav__logo')){
					linkname = $(this).find('img').attr('alt');
				}

				else if ($(this).hasClass('microsite-nav__title')){
					linkname = $(this).text();
				}

				else if ($(this).parents('.microsite-nav__menu').length){
					linkname = $(this).text();
				}

				var additionalData = {
						'linkName': linkname,
						'linkDestinationURL': url,
						'linkPosition':'Site Navigation component'
				}

				ddo.pushEvent('linkClick','Link_Click',additionalData);

			});

			//share component, built into a template link tracking
			$('.article__share a').on('click',function(event){

				var url = checkURL ($(this).attr('href'));
				var linkposition = 'Share component';
				if ($(this).parents('.blog__header').length){
					linkposition = 'Share Blog Post - component';
				}

				var additionalData = {
						'linkName' : $(this).attr('aria-label'),
						'linkDestinationURL': url,
						'linkPosition':linkposition
				}

				ddo.pushEvent('linkClick','Link_Click',additionalData);
			});

			//share component, stand alone, link tracking
			$('.SNR_share .share').on('click',function(event){

				var target = $(event.target);
				if (target.is('i')){
					var destinationurl = "";
					var url = "";
					var linkname = "";
					if (target.is("i")){
						if (target.parent('a').length){
							if (target.parent('a').attr('href').length){
								destinationurl = target.parent('a').attr('href');
								url = checkURL(destinationurl);
							}
							if (target.parent('a').attr('aria-label').length){
								linkname = target.parent('a').attr('aria-label');
							}
						}
					}

					var additionalData = {
							'linkName' : linkname,
							'linkDestinationURL': url,
							'linkPosition':'Share component'
					}

					ddo.pushEvent('linkClick','Link_Click',additionalData);
				}
			});

			//media component caption
			$('.media__caption a').on('click', function(event){

				var url = checkURL ($(this).attr('href'));
				var additionalData = {
						'linkName': $(this).text(),
						'linkDestinationURL': url,
						'linkPosition':'Media component'
				}

				ddo.pushEvent('linkClick','Link_Click',additionalData);

			});

			//media library CTA button
			$('.media-library .library__cta a').on('click', function(event){

				var url = checkURL ($(this).attr('href'));
				var additionalData = {
						'linkName': $(this).text(),
						'linkDestinationURL': url,
						'linkPosition':'Media Library component'
				}

				ddo.pushEvent('linkClick','Link_Click',additionalData);
			});

			//media library Youtube video
			$('.media-library .item__video--youtube a').on('click', function(event){

				var url = checkURL ($(this).attr('href'));
				var linkname = "";

				if ($(this).find('.item__title').length){
					linkname = $(this).find('.item__title').text();
				}

				else {
					linkname = $(this).attr('aria-label');
				}

				var additionalData = {
						'linkName': linkname,
						'linkDestinationURL': url,
						'linkPosition':'Media Library component'
				}

				ddo.pushEvent('linkClick','Link_Click',additionalData);
			});

			//Assets component link tracking
             $('.story__assets select').change(function (event) {
                var url = checkURL($(this).children("option:selected").val());
                var additionalData = {
                    'linkName': $(this).children("option:selected").text(),
                    'linkDestinationURL': url,
                    'linkPosition': 'Assets component'
                }
                ddo.pushEvent('linkClick', 'Link_Click', additionalData);
            });

			//media library GVP video
			$('.media-library .item__video--gvp').on('click', function(event){

				var target = $(event.target);
				if (target.is("img") || target.is("div.item__thumbnail")){
					var linkname = "";
					var linkdestination = "";

					if (target.parents('.item__video--gvp').find('.item__title').length){
						linkname = target.parents('.item__video--gvp').find('.item__title').text();
					}

					if (target.is("img")){
						if (target.parents('.item__video--gvp').length){
							linkdestination = target.parents('att-gvp').attr('video');
						}
						if (linkname == ""){
							linkname = target.attr('alt');
						}

					}

					else if (target.is("div.item__thumbnail")){
						if (target.parents('.item__video--gvp').length){
							linkdestination = target.parents('att-gvp').attr('video');
						}
						if (linkname == ""){
							linkname = target.find("img").attr("alt");
						}
					}

					var additionalData = {
							'linkName': linkname,
							'linkDestinationURL': linkdestination,
							'linkPosition':'Media Library component'
					}

					ddo.pushEvent('linkClick','Link_Click',additionalData);
				}
			});

			//media library image
			$('.media-library .item__img a').on('click', function(event){

				var url = checkURL ($(this).attr('href'));
				var linkname = "";

				if ($(this).find('.item__title').length){
					linkname = $(this).find('.item__title').text();
				}

				else {
					linkname = $(this).attr('aria-label');
				}

				var additionalData = {
						'linkName': linkname,
						'linkDestinationURL': url,
						'linkPosition':'Media Library component'
				}

				ddo.pushEvent('linkClick','Link_Click',additionalData);
			});

			//Media Kit Landing page, featured article

			$('.media-kit__header .featured-article__cta a').on('click', function(event){

				var url = checkURL ($(this).attr('href'));
				var linkname = "";

				if ($(this).parentsUntil('.media-kit__header ').find('.featured-headline').length){
					linkname = $(this).parentsUntil('.media-kit__header ').find('.featured-headline').text();
				}
				if (linkname === "") {
					linkname = $(this).text();
				}

				var additionalData = {
						'linkName': linkname,
						'linkDestinationURL': url,
						'linkPosition':'Media-kit Landing – Featured Story'
				}

				ddo.pushEvent('linkClick','Link_Click',additionalData);
			});

			//Media carousel
			$('.media-carousel').on('click', function(event){

				//console.log('link click', event.target);

				var target = $(event.target);
				var linkname = "";
				var linkdestination = "";

				if (target.is('img') || target.is("div.item__thumbnail") || target.is('div.item__content') || target.is('.item__title') || target.is("a.item__preview")){
					if (target.parents('.item__media').length){
						if (target.parents('.item__media').find('.item__title').length){
							linkname = target.parents('.item__media').find('.item__title').text();
						}
					}
					//GVP video clicks
					if (target.parents('.item__video--gvp').length){
						linkdestination = target.parents('att-gvp').attr('video');
						if (linkname == ""){
							if (target.is('img')){
								linkname = target.attr('alt');
							}
							else if (target.is("div.item__thumbnail")){
								linkname = target.find('img').attr('alt');
							}
						}
					}
					//Youtube video clicks
					else if (target.parents('.item__video--youtube').length){
						var url = "";
						if (target.is('img')){
							url = target.attr('src').split("/");
							linkdestination = url[4];
							if (linkname == ""){
								linkname = target.attr("alt");
							}
						}
						else if (target.is('div.item__thumbnail')){
							url = target.find('img').attr('src').split("/");
							linkdestination = url[4];
							if (linkname == ""){
								linkname = target.find('img').attr("alt");
							}
						}
						else if (target.is('div.item__content') || target.is('.item__title')){
							if(target.parents('.item__preview').length){
								var urlArray = target.parents('.item__preview').attr('href').split("/");
								url = urlArray[4].split("?");
								linkdestination = url[0];
							}
						}
					}
					//Image clicks
					else if (target.parents('.item__img').length){
						if (target.is("img")){
							var url = checkURL(target.attr('src'));
							linkdestination = url;
							if (linkname == ""){
								linkname = target.attr("alt");
							}
						}
						else if (target.is('div.item__content') || target.is('.item__title')){
							if(target.parents('.item__preview').length){
								var url = target.parents('.item__preview').attr('href');
								linkdestination = checkURL(url);
							}
						}
					}
					var additionalData = {
							'linkName' : linkname,
							'linkDestinationURL' : linkdestination,
							'linkPosition': 'Media Carousel component'
					}

					ddo.pushEvent('linkClick','Link_Click', additionalData);
				}
			});

			//Related news
			//The parameters to use: Link Name: Story title, Link URL: Story URL, Link Position: Related News component
			$('.related-news a').on('click', function(event){

				var url = checkURL ($(this).attr('href'));

				var additionalData = {
						'linkName' : $(this).text(),
						'linkDestinationURL' : url,
						'linkPosition': 'Related News component'
				}

				ddo.pushEvent('linkClick','Link_Click', additionalData);
			});

			//Media Gallery category selection
			$('.brand-assets .type-select a').on('click',function(evnet){

				var additionalData = {
						'linkName': $(this).text(),
						'linkDestinationURL': $(this).attr('href'),
						'linkPosition':'Media Gallery component'
				}

				ddo.pushEvent('linkClick','Link_Click', additionalData);
			});

			//Blog Post Landing - featured story component
			$('.blog-landing .featured-article__cta a').on('click',function(event){

				var url = checkURL ($(this).attr('href'));
				var linkname = "";

				if ($(this).parentsUntil('.blog__header').find('.featured-headline').length){
					linkname = $(this).parentsUntil('.blog__header').find('.featured-headline').text();
					linkname = linkname.replace(/\n|\r/g, " ");
				}

				var additionalData = {
						'linkName' : linkname,
						'linkDestinationURL' : url,
						'linkPosition' : 'Blog Post Landing – Featured Story component'
				}

				ddo.pushEvent('linkClick', 'Link_Click', additionalData);
			});

			//Blog Post Landing - Latest Stories - View by tags
			$('.filter-tags a').on('click',function(event){

				var additionalData = {
						'linkName': $(this).text(),
						'linkDestinationURL': $(this).attr('href'),
						'linkPosition': 'Latest Stories - View By Tag component'
				}

				ddo.pushEvent('linkClick','Link_Click',additionalData);
			});

			//BRAND ASSETS
			$('.brand-assets .assets__feed').on('click',function(event){

				var target = $(event.target);
				if (target.is("a")|| target.is("img") || target.is("div.item__thumbnail")){
					var linkname = "";
					var linkdestination = "";

					//Capture clicks on a link
					if (target.is("a")){

						linkname = target.parents('.content__wrap').find('h3').text();
						linkdestination = target.attr('href');

						if (target.parent('att-gvp').length){
							linkdestination = target.parent("att-gvp").attr('video');
						}

					}

					//Capture clicks on an image
					else if (target.is("img")){

						linkname = target.attr('alt');
						linkdestination = target.attr('src');
						if (target.parents('.item__video--youtube').length){
							linkdestination = target.parents('.item__preview ').attr('href');
						}
						else if (target.parents('.item__img--b-roll').length){
							linkdestination = target.parents('.item__preview ').attr('href');
						}
						else if (target.parents('.item__video--gvp').length){
							linkdestination = target.parents('att-gvp').attr('video');
						}
					}

					//to capture video and b-roll when clicked on the play/download icon
					else if (target.is("div.item__thumbnail")){
						linkdestination = target.find("img").attr("src");
						linkname = target.find("img").attr("alt");
						if (target.parents('.item__video--youtube').length){
							linkdestination = target.parents('.item__preview ').attr('href');
						}
						else if (target.parents('.item__img--b-roll').length){
							linkdestination = target.parents('.item__preview ').attr('href');
						}
						else if (target.parents('.item__video--gvp').length){
							linkdestination = target.parents('att-gvp').attr('video');
						}

					}

					if (linkname == "null" || linkname == "") {

						if (target.parents('.featured-item').find('.item__img--photo').length){
							linkname = 'View Photo';
						}
						else if (target.parents('.featured-item').find('.item__img--graphic').length){
							linkname = 'View Graphic';
						}
						else if (target.parents('.featured-item').find('.item__img--logo').length){
							linkname = 'View Logo';
						}
						else if (target.parents('.featured-item').find('.item__video--youtube').length){
							linkname = 'Watch Video';
						}
						else if (target.parents('.featured-item').find('.item__video--gvp').length){
							linkname = 'Watch Video';
						}
						else if (target.parents('.featured-item').find('.item__img--b-roll').length){
							linkname = 'Download B-roll';
						}

						if (target.is("a.read-more")){
							linkname = "Read Full Story";
						}
					}

					if (linkdestination.includes("/jcr:content")){
						var n = linkdestination.indexOf("jcr:content");
						linkdestination = linkdestination.substring(0, n-1);
					}

					if (!target.parents('.item__video--gvp').length){
						linkdestination = checkURL(linkdestination);
					}

					var additionalData = {
							'linkName': linkname,
							'linkDestinationURL': linkdestination,
							'linkPosition': 'Media Gallery component'
					}

					//console.log('link click', event.target);

					ddo.pushEvent('linkClick','Link_Click',additionalData);
				}
			});

			$('.html-editor .editor__wrap a').on('click',function(evnet){

				var additionalData = {
						'linkName': $(this).text(),
						'linkDestinationURL':$(this).attr('href'),
						'linkPosition': 'Open HTML component'
				}

				ddo.pushEvent('linkClick','Link_Click',additionalData);
			});




});

function rightRailItems(event){
	var url = checkURL ($(this).attr('href'));
	var linkposition = "Right Rail";

	//article-right-rail-analytics
	if ($(this).parents('.widget--news').length){
		linkposition = "Featured Item component - Recent News";
	}

	if ($(this).parents('.widget--videos').length){
		linkposition = "Top Videos - Recent News";
	}

	var additionalData = {
			'linkName' : $(this).attr('aria-label'),
			'linkDestinationURL':url,
			'linkPosition':linkposition
	}
	ddo.pushEvent('linkClick','Link_Click',additionalData);
	console.log($(this).attr('aria-label')+" has been clicked");

}

function checkURL (clickedURL) {

	var href = "";
	if (typeof clickedURL !== typeof undefined && clickedURL !== false) {
		href = clickedURL;
		var domain = "https://about.att.com";

		if (href.indexOf("content/dam/") != -1){
			href = href.replace("content/dam", "ecms/dam")
		}

		if (href == "null"){
			href = domain;
		}

		if ( !href.startsWith("https") && !href.startsWith("http") && !href.startsWith("javascript:void(0)") && !href.startsWith("#") && !href.startsWith("mailto")) {
			href = domain + href;
		}
	}

	return href;
}

function dateFormat (date) {

	var dateArray = date.split("T");
	var formattedDate = dateArray[0];
	var publishDate = formattedDate.replace(/-/g,"/");

	return publishDate;
}

function GetURLParameter(sParam) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for (var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
}

function truncateString(str, num) {
	if (str.length <= num) {
		return str
	}
	return str.slice(0, num)
}

function calculateScreen(screenSize) {

	if(screenSize>1024)
	{
		viewport = 'Desktop';
	}
	else if(screenSize>=768 && screenSize<=1024)
	{
		viewport = 'Tablet';
	}
	else if(screenSize>=320 && screenSize<767)
	{
		viewport = 'Smartphone';
	}
	return viewport;

}
function internalSearchType(categoryValue,monthValue,pathValue) {

	var currentSearchTermCategory ='';

	if(categoryValue)
	{
		currentSearchTermCategory =  categoryValue;
	}
	if(monthValue)
	{
		if(monthValue!="all") {
			var mon = monthValue.split("-")[1];
			var year = monthValue.split("-")[0];
			var subYear = year.substring(2);
			monthValue = mon+subYear;
		}
		if(currentSearchTermCategory){
			currentSearchTermCategory =  currentSearchTermCategory+" "+monthValue;
		}
		else {
			currentSearchTermCategory =  monthValue;
		}
	}
	if(pathValue)
	{
		pathValue = pathValue.replace(/%2F/g, "_");
		if(currentSearchTermCategory){
			currentSearchTermCategory =  currentSearchTermCategory+" "+pathValue;
		}
		else {
			currentSearchTermCategory =  pathValue;
		}
	}

	var currentSearchTermCategoryFinal = truncateString(currentSearchTermCategory, 75);

	return currentSearchTermCategoryFinal;


}