

    (function () {
        var timer, abortTimer;

        timer = setInterval( function() {
            if ( window.jQuery ) {
                clearInterval( timer );
                afterContentArrived( window.jQuery );
            }
        }, 67);

        abortTimer = setTimeout( function () {

            if ( !window.jQuery ) {
                clearInterval( timer );
                console.log('FLOW-FLOW DEBUG MESSAGE: No jQuery on page, please make sure it is loaded because jQuery is plugin requirement');
            }
        }, 20000);

        function afterContentArrived ( $ ) {

            "use strict";

            var hash = '1689889298.9da938b83527d7deba85e9ba201e53cdb5b4e53bbf2c54df75be97da0091ed065c169cdbd579c2392e97e1618aadc040';

            var opts = window.FlowFlowOpts || {"streams":{},"open_in_new":"yep","filter_all":"All","filter_search":"Search","expand_text":"Expand","collapse_text":"Collapse","posted_on":"Posted on","followers":"Followers","following":"Following","posts":"Posts","show_more":"Show more","date_style":"wpStyleDate","dates":{"Yesterday":"Yesterday","s":"s","m":"m","h":"h","ago":"ago","months":["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]},"lightbox_navigate":"Navigate with arrow keys","view_on":"View on","view_on_site":"View on site","view_all":"View all","comments":"comments","scroll":"Scroll for more","no_comments":"No comments yet.","check_comments":"Check all comments","be_first":"Be the first!","loading":"Loading","server_time":1689942056,"forceHTTPS":"nope","isAdmin":false,"ajaxurl":"https:\/\/swiss-athletics.ch\/wp-admin\/admin-ajax.php","isLog":false,"plugin_base":"https:\/\/swiss-athletics.ch\/wp-content\/plugins\/flow-flow","plugin_ver":"4.9.1","domain":"swiss-athletics.ch","token":""};

            var isLS = isLocalStorageNameSupported();

            var FF_resource = window.FF_resource ||
                {
                    scriptDeferred: $.Deferred(),
                    styleDeferred:  $.Deferred(),
                    scriptLoading: false,
                    styleLoading: false
                };

            if ( !window.FF_resource ) window.FF_resource = FF_resource;
            if ( !window.FlowFlowOpts ) window.FlowFlowOpts = opts;

	        
            var data = {
                'shop': 'swiss-athletics.ch',
                'action': 'fetch_posts',
                'stream-id': '1',
                'disable-cache': '',
                'hash': hash,
                'page': '0',
                'preview': '0',
                'token':  '',
                'boosted': '0'
            };

            var isMobile = /android|blackBerry|iphone|ipad|ipod|opera mini|iemobile/i.test( navigator.userAgent );

            var streamOpts = {"name":"Newsticker DE Home","cloud":"nope","mod":"nope","order":"compareByTime","posts":"30","page-posts":"7","cache":"yep","cache_lifetime":"10","gallery":"nope","gallery-type":"classic","private":"nope","hide-on-desktop":"nope","hide-on-mobile":"nope","max-res":"nope","show-only-media-posts":"nope","titles":"nope","hidemeta":"nope","hidetext":"nope","heading":"Newsticker","headingcolor":"rgb(228, 27, 19)","subheadingcolor":"rgb(114, 112, 114)","hhalign":"left","bgcolor":"rgb(229, 229, 229)","filter":"nope","filtercolor":"rgb(205, 205, 205)","mobileslider":"nope","viewportin":"yep","width":"260","margin":"20","layout":"grid","theme":"classic","gc-style":"style-1","upic-pos":"timestamp","upic-style":"round","bradius":"15","icon-style":"label2","icon-col":"colored","cardcolor":"rgb(255, 255, 255)","namecolor":"rgb(246, 11, 1)","textcolor":"rgb(85, 85, 85)","linkscolor":"rgb(228, 27, 19)","restcolor":"rgb(85, 85, 85)","shadow":"rgba(0, 0, 0, 0.05)","bcolor":"rgba(240, 237, 231, 0.4)","talign":"left","icons-style":"outline","cards-num":"3","scrolltop":"yep","c-desktop":"5","c-laptop":"4","c-tablet-l":"3","c-tablet-p":"2","c-smart-l":"2","c-smart-p":"1","s-desktop":"15","s-laptop":"15","s-tablet-l":"10","s-tablet-p":"10","s-smart-l":"5","s-smart-p":"5","m-c-desktop":"5","m-c-laptop":"4","m-c-tablet-l":"3","m-c-tablet-p":"2","m-c-smart-l":"2","m-c-smart-p":"1","m-s-desktop":"15","m-s-laptop":"15","m-s-tablet-l":"10","m-s-tablet-p":"10","m-s-smart-l":"5","m-s-smart-p":"5","j-h-desktop":"260","j-h-laptop":"240","j-h-tablet-l":"220","j-h-tablet-p":"200","j-h-smart-l":"180","j-h-smart-p":"160","j-s-desktop":"0","j-s-laptop":"0","j-s-tablet-l":"0","j-s-tablet-p":"0","j-s-smart-l":"0","j-s-smart-p":"0","c-r-desktop":"2","c-r-laptop":"2","c-r-tablet-l":"2","c-r-tablet-p":"2","c-r-smart-l":"1","c-r-smart-p":"1","c-c-desktop":"5","c-c-laptop":"4","c-c-tablet-l":"3","c-c-tablet-p":"3","c-c-smart-l":"3","c-c-smart-p":"3","c-s-desktop":"0","c-s-laptop":"0","c-s-tablet-l":"0","c-s-tablet-p":"0","c-s-smart-l":"0","c-s-smart-p":"0","c-autoplay":"","c-arrows-always":"yep","c-arrows-mob":"nope","c-dots":"yep","c-dots-mob":"nope","wallwidth":"","wallvm":"20","wallhm":"0","wallcomments":"yep","g-ratio-w":"1","g-ratio-h":"2","g-ratio-img":"1\/2","g-overlay":"nope","m-overlay":"nope","template":["header","text","image","meta"],"tv":"nope","tv-int":"5","big":"nope","id":"1","moderation":"nope","last_changes":1681981199,"status":"1","feeds":[{"id":"dv39191","errors":[],"status":"1","enabled":"yep","last_update":"Jul 21 11:38","cache_lifetime":"60","system_enabled":"1","boosted":"nope","wordpress-type":"posts","category-name":"socialwall","post-id":"","slug":"","shortcodes":"strip","include-post-title":"nope","use-excerpt":"nope","posts":"10","mod":"nope","type":"wordpress","include":"","filter-by-words":"","page":"1"},{"id":"mb15681","errors":[],"status":"1","enabled":"yep","last_update":"Jul 21 11:50","cache_lifetime":"60","system_enabled":"1","boosted":"nope","timeline-type":"page_timeline","content":"swissathletics","posts":"10","mod":"nope","mod-approve":"nope","type":"facebook","include":"","filter-by-words":"","page":"1"}],"preview":false};
            var ads = false;
	        streamOpts.shop = data.shop;
            streamOpts.plugin = 'flow_flow';
            streamOpts.trueLayout = streamOpts.layout;

            /*we will modify 'grid' layout to get 'carousel' layout*/
            if ( streamOpts.layout == 'carousel' ) {
                streamOpts['layout'] = 'grid';
                streamOpts['g-ratio-h'] = "1";
                streamOpts['g-ratio-img'] = "1/2";
                streamOpts['g-ratio-w'] = "1";
                streamOpts['g-overlay'] = "yep";
                streamOpts['c-overlay'] = "yep";
                streamOpts['s-desktop'] = "0";
                streamOpts['s-laptop'] = "0";
                streamOpts['s-smart-l'] = "0";
                streamOpts['s-smart-p'] = "0";
                streamOpts['s-tablet-l'] = "0";
                streamOpts['s-tablet-p'] = "0";
            }
            else if ( streamOpts.layout == 'list' ) {  /*the same with list, we only need news feed style*/
                streamOpts['layout'] = 'masonry';
            }

	        if ( ads ) streamOpts.ads = ads;

            opts.streams['stream' + streamOpts.id] = streamOpts;

            var $cont = $("[data-plugin='flow_flow']#ff-stream-"+data['stream-id']);
            var ajaxDeferred;
            var script, style;
            var layout_pre = streamOpts.layout.charAt(0);
            var isOverlay = layout_pre === 'j' || streamOpts[layout_pre + '-overlay'] === 'yep' && streamOpts.trueLayout !== 'list';
            var imgIndex;
            if (isOverlay) {
                if (streamOpts.template[0] !== 'image') {
                    for (var i = 0, len = streamOpts.template.length; i < len; i++) {
                        if (streamOpts.template[i] === 'image') imgIndex = i;
                    }
                    streamOpts.template.splice(0, 0, streamOpts.template.splice(imgIndex, 1)[0]);
                }
                streamOpts.isOverlay = true;
            };
            if (FF_resource.scriptDeferred.state() === 'pending' && !FF_resource.scriptLoading) {
                script = document.createElement('script');
                script.src = "https://swiss-athletics.ch/wp-content/plugins/flow-flow/js/public.js?ver=4.9.1";
                script.onload = function( script, textStatus ) {
                    FF_resource.scriptDeferred.resolve();
                };
                document.body.appendChild(script);
                FF_resource.scriptLoading = true;
            };
            if (FF_resource.styleDeferred.state() === 'pending' && !FF_resource.styleLoading) {
                style = document.createElement('link');
                style.type = "text/css";
                style.id = "ff_style";
                style.rel = "stylesheet";
                style.href = "https://swiss-athletics.ch/wp-content/plugins/flow-flow/css/public.css?ver=4.9.1";
                style.media = "screen";
                style.onload = function( script, textStatus ) {
                    FF_resource.styleDeferred.resolve();
                };
                document.getElementsByTagName("head")[0].appendChild(style);
                FF_resource.styleLoading = true;
            }
            $cont.addClass('ff-layout-' + streamOpts.trueLayout);
            if (!isMobile && streamOpts.trueLayout !== 'carousel') $cont.css('minHeight', '500px');
            ajaxDeferred = isLS && sessionStorage.getItem(hash) ? {} : $.get(opts.ajaxurl, data)
;
            $.when( ajaxDeferred, FF_resource.scriptDeferred, FF_resource.styleDeferred ).done(function ( data ) {
                var response, $errCont, err;
                var moderation = 0;
                var original = (isLS && sessionStorage.getItem(hash)) ? JSON.parse( sessionStorage.getItem(hash) ) : data[0];
                try {
                    /* response = JSON.parse(original); */
                    response = original; /* since 4.1 */
                } catch (e) {
                    window.console && window.console.log('Flow-Flow gets invalid data from server');
                    if (opts.isAdmin || opts.isLog) {
	                    $errCont = $('<' + 'div class="ff-errors"><' + 'div class="ff-disclaim">If you see this message then you have administrator permissions and Flow-Flow got invalid data from server. Please provide error message below if you are doing support request.<' + '/div><' + 'div class="ff-err-info"><'+'/div><'+'/div>');
	                    $cont.before($errCont);
                        $errCont.find('.ff-err-info').html(original == '' ? 'Empty response from server' : original);
                    }
                    return;
                }

                if ( ! response ) {
                	console.log( 'FLOW-FLOW: null response from server' );
                	return;
                }

                // injecting ads for cloud streams
                if ( ads ) {

                	var newArr = [];

                	var post, ad;

                	for ( var i = 0, len = response.items.length; i < len; i++ ) {

		                post = response.items[ i ];

                		if ( ads[ i ] ) {

                			ad = ads[ i ];
                            ad.id = 'ad_el_' + ad.id;
                            newArr.push ( ad );

			                delete ads[ i ];
                        }

                        newArr.push( post );
                    }

                    response.items = newArr;
                }

                opts.streams['stream' + streamOpts.id]['items'] = response;
                if (!FlowFlowOpts.dependencies) FlowFlowOpts.dependencies = {};
                
                FlowFlow.extensionResourcesRequests = FlowFlow.extensionResourcesRequests || [];
                var request, extension, style;

                for ( extension in FlowFlowOpts.dependencies ) {
                    if ( FlowFlowOpts.dependencies[extension] && FlowFlowOpts.dependencies[extension] !== 'loaded') {
                        request = $.getScript( opts.plugin_base + '-' + extension + '/js/ff_' + extension + '_public.js?ver=4.9.1');
                        FlowFlow.extensionResourcesRequests.push(request);

                        style = document.createElement('link');
                        style.type = "text/css";
                        style.rel = "stylesheet";
                        style.id = "ff_ad_style";
                        style.href = opts.plugin_base + '-' + extension + '/css/ff_' + extension + '_public.css?ver=4.9.1';
                        style.media = "screen";
                        document.getElementsByTagName("head")[0].appendChild(style);

                        FlowFlowOpts.dependencies[extension] = 'loaded';
                    }
                }

                var resourcesLoaded = $.when.apply($, FlowFlow.extensionResourcesRequests);

                resourcesLoaded.done(function(){
                    var $stream, width;
                    console.log('FLOW-FLOW data', response);

                    $stream = FlowFlow.buildStreamWith(response, streamOpts, moderation, FlowFlowOpts.dependencies);

                    if (isLS && response.items.length > 0 && response.hash.length > 0) sessionStorage.setItem(  response.hash , JSON.stringify( original ));

                    var num = streamOpts.layout === 'compact' || (streamOpts.mobileslider === 'yep' && isMobile)? (streamOpts.mobileslider === 'yep' ? 3 : streamOpts['cards-num']) : false;

                    $cont.append( $stream );

                    if ( typeof $stream !== 'string' ) {
                        FlowFlow.setupGrid($cont.find('.ff-stream-wrapper'), num, streamOpts.scrolltop === 'yep', streamOpts.gallery === 'yep', streamOpts, $cont);
                    }

                    setTimeout(function(){
                        $cont.find('.ff-header').removeClass('ff-loading').end().find('.ff-loader').addClass('ff-squeezed').delay(300).hide();
                    }, 0);

                    
                }).fail(function(){
                    console.log('Flow-Flow: resource loading failed');
                });

                var isErr = response.status === "errors";
                if ((opts.isAdmin || opts.isLog) && isErr) {
	                $errCont = $('<'+'div class="ff-errors"><'+'div class="ff-err-info">If you see this then you are administrator and Flow-Flow got errors from APIs while requesting data. Please go to plugin admin and after refreshing page check for error(s) on stream settings page. Please provide error message info if you are doing support request.<'+'/div><'+'/div>');
	                $cont.before($errCont);
                }
            });

            function isLocalStorageNameSupported() {
                var testKey = 'test', storage = window.sessionStorage;
                try {
                    storage.setItem(testKey, '1');
                    storage.removeItem(testKey);
                    return true;
                } catch (error) {
                    return false;
                }
            };

            return false;
        }
    })()

