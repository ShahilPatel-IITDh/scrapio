!function(e,t){if(!e.SearchaniseIncluded){e.SearchaniseIncluded=!0;for(var o=e.Searchanise||{},a=document.getElementsByTagName("script"),s=0;s<a.length;s++)if(a[s].src){var n=a[s].src.indexOf("/widgets/bigcommerce/init");if(-1!=n){var i=a[s].src.indexOf("//");if(-1!=i){var r=/api_key=(?:\s*)([a-zA-Z0-9]{10})/.exec(decodeURIComponent(a[s].src));if(r[1]){o.host=a[s].src.substring(i+2,n),o.ApiKey=r[1],o.SearchInput='input[name="q"][type!="hidden"],input[name="search_query"][type!="hidden"],input[id^="search_query"][type!="hidden"],input[name="nav-quick-search"][type!="hidden"],input[name="nav-menu-quick-search"][type!="hidden"],input[data-search-quick][type!="hidden"]',o.options=o.options||{},o.options.Platform="bigcommerce",o.options.ResultsDiv="#snize_results",o.options.ResultsFormPath="/search-results-page";break}}}}if(o.passiveListenerSupported=!1,o.userOptions=o.options||{},o.AutoCmpParams=o.AutoCmpParams||{},o.ResultsParams=o.ResultsParams||{},o.userOptions.api_key=o.AutoCmpParams.api_key=o.ResultsParams.api_key=o.api_key||o.ApiKey,o.userOptions.SearchInput=o.SearchInput,o.userOptions.ResultsFallbackUrl=window.location.protocol+"//"+(window.location.hostname||window.location.host)+"/search.php?search_query=",o.paths={},!1===o.useCDN?o.prefix="https:"==document.location.protocol?"https://s3.amazonaws.com/static.searchanise.com/":"http://static.searchanise.com/":o.prefix=("https:"==document.location.protocol?"https://":"http://")+"searchanise-ef84.kxcdn.com/",o.paths.jq=o.jq||"//ajax.aspnetcdn.com/ajax/jQuery/jquery-3.6.0.min.js",o.paths.jqRollback="//ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js","www.searchanise.com"==o.host||"searchserverapi.com"==o.host||"www.searchserverapi.com"==o.host?o.paths.widgets=o.widgets||o.prefix+"widgets.23647.min.js":o.paths.widgets="//"+o.host+"/widgets/v2.0/compiled/widgets.min.js",o.paths.tpl=o.tpl||o.prefix+"templates.[API_KEY].js".split("[API_KEY]").join(o.userOptions.api_key),o.paths.styles=o.styles||[],o.paths.preload=o.preload||o.prefix+"preload_data.[API_KEY].js".split("[API_KEY]").join(o.userOptions.api_key),o.userOptions.api_key){try{window.addEventListener("snize_test",null,Object.defineProperty({},"passive",{get:function(){o.passiveListenerSupported=!0}}))}catch(e){}o.loadScript=function(e,t,o){var a=document.createElement("script");a.charset="utf-8",a.src=e,a.onload=a.onreadystatechange=function(){a.readyState&&!/loaded|complete/.test(a.readyState)||(a.onload=a.onreadystatechange=null,a=void 0,t&&t())},a.onerror=function(){o&&o()},document.getElementsByTagName("head")[0].appendChild(a)},o.loadCss=function(e,t){var o=document.createElement("link");o.rel="stylesheet",o.href=e,o.className="snize_widget_css";var a=setTimeout((function(){o.onload=null,t&&t()}),5e3);o.onload=function(){clearTimeout(a),t&&t()},document.getElementsByTagName("head")[0].appendChild(o)},o.getStyles=function(e){var t=e.AutocompleteStyle?e.AutocompleteStyle:"ITEMS_MODERN",a=e.ResultsStyle?e.ResultsStyle:"RESULTS_BIG_PICTURES",s=e.WidgetsEnabled?e.WidgetsEnabled:"Y",n=e.AutocompleteShow?e.AutocompleteShow:"Y",i=e.AutocompleteShowMobileWidget?e.AutocompleteShowMobileWidget:"Y",r=e.ResultsShow?e.ResultsShow:"N",c=[],d={autocomplete:"",autocompleteMobile:"",results:"",resultsMobile:"",recommendation:"recommendation",quickView:""};if("N"==s)return c;if("Y"==n&&(d.autocomplete=t.toLowerCase(),"Y"==i&&(d.autocompleteMobile=d.autocomplete+".mobile")),"Y"==r&&(d.results=a.toLowerCase(),window.innerWidth<769&&(d.resultsMobile=d.results+".mobile")),"quick_view"!=e.ResultsShowActionButton&&"quick_view"!=e.RecommendationShowActionButton||(d.quickView="quick-view"),"www.searchanise.com"==o.host||"searchserverapi.com"==o.host||"www.searchserverapi.com"==o.host)for(var l in d)d[l]&&c.push(o.prefix+d[l]+".23647.css".split("[API_KEY]").join(o.userOptions.api_key));else for(var l in d)d[l]&&c.push("//"+o.host+"/widgets_src/css/"+d[l]+".css");return c},o.triggerDocumentEvent=function(e){var t;"function"==typeof Event?t=new Event(e):(t=document.createEvent("Event")).initEvent(e,!0,!1),document.dispatchEvent(t)},o.loader={ready:null,loadedCount:0,loaded:function(){o.loader.loadedCount++,5==this.loadedCount&&o.loader.ready()},jqLoaded:function(){if(o.$.event.special.touchstart={setup:function(e,t,a){t.includes("noPreventDefault")?this.addEventListener("touchstart",a,{passive:!1}):o.passiveListenerSupported&&this.addEventListener("touchstart",a,{passive:!0})}},o.loadScript(o.paths.widgets,(function(){o.loader.loaded()})),document.attachEvent?"complete"===document.readyState:"loading"!==document.readyState)o.loader.loaded();else var e=setInterval((function(){(document.attachEvent?"complete"===document.readyState:"loading"!==document.readyState)&&(o.loader.loaded(),clearInterval(e))}),100);o.loader.loaded()},init:function(t){var a=document.createElement("script");o.loader.ready=t,o.loadScript(o.paths.tpl,(function(){o.templates.CustomJS&&(a.innerHTML=o.templates.CustomJS,o.templates.CustomJSPlace&&"body"==o.templates.CustomJSPlace?document.body.appendChild(a):document.head.appendChild(a));var e=0;o.paths.styles=o.getStyles(o.templates),o.paths.styles.forEach((function(t,a,s){e++,o.loadCss(t),e===s.length&&o.loader.loaded()})),o.loader.loaded()})),o.forceUseExternalJQuery?(o.$=e.jQuery,o.loader.jqLoaded()):o.loadScript(o.paths.jq,(function(){o.$=jQuery.noConflict(!0),o.loader.jqLoaded()}),(function(){o.loadScript(o.paths.jqRollback,(function(){o.$=jQuery.noConflict(!0),o.loader.jqLoaded()}),(function(){console.log("jQuery loading error")}))})),o.loadScript(o.paths.preload)}},o.loader.init((function(){o.Init(),o.SetPaths(o.paths),o.SetOptions(e.Searchanise.templates),o.SetOptions(o.userOptions),o.SetParams(o.AutoCmpParams),o.SetResultsParams(o.ResultsParams),o.Loaded=!0,o.triggerDocumentEvent("Searchanise.Loaded"),o.Start()})),e.Searchanise=o}}}(window);