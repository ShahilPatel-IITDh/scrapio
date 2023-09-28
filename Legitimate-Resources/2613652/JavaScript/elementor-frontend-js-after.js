
window.scopes_array = {};
                window.backend = 0;
                jQuery( window ).on( "elementor/frontend/init", function() {
                    elementorFrontend.hooks.addAction( "frontend/element_ready/section", function( $scope, $ ){
                        if ( "undefined" == typeof $scope ) {
                                return;
                        }
                        if ( $scope.hasClass( "premium-equal-height-yes" ) ) {
                            var id = $scope.data("id");
                            window.scopes_array[ id ] = $scope;
                        }
                        if(elementorFrontend.isEditMode()){
                            var url = PaModulesSettings.equalHeight_url;
                            jQuery.cachedAssets = function( url, options ) {
                                // Allow user to set any option except for dataType, cache, and url.
                                options = jQuery.extend( options || {}, {
                                    dataType: "script",
                                    cache: true,
                                    url: url
                                });
                                // Return the jqXHR object so we can chain callbacks.
                                return jQuery.ajax( options );
                            };
                            jQuery.cachedAssets( url );
                            window.backend = 1;
                        }
                    });
                });
                jQuery(document).ready(function(){
                    if ( jQuery.find( ".premium-equal-height-yes" ).length < 1 ) {
                        return;
                    }

                    var url = PaModulesSettings.equalHeight_url;

                    jQuery.cachedAssets = function( url, options ) {
                        // Allow user to set any option except for dataType, cache, and url.
                        options = jQuery.extend( options || {}, {
                            dataType: "script",
                            cache: true,
                            url: url
                        });

                        // Return the jqXHR object so we can chain callbacks.
                        return jQuery.ajax( options );
                    };
                    jQuery.cachedAssets( url );
                });	
window.scopes_array = {};
                window.backend = 0;

                jQuery( window ).on( "elementor/frontend/init", function() {

                    elementorFrontend.hooks.addAction( "frontend/element_ready/widget", function( $scope, $ ) {

                        if ( "undefined" == typeof $scope || ! $scope.hasClass( "premium-floating-effects-yes" ) ) {
                                return;
                        }

                        if( elementorFrontend.isEditMode() ){

                            window.current_scope = $scope;
                            window.isPaproInstalled = pa_addons.papro_installed;

                            var url = pa_addons.feffects_url;

                            jQuery.cachedAssets = function( url, options ) {
                                // Allow user to set any option except for dataType, cache, and url.
                                options = jQuery.extend( options || {}, {
                                    dataType: "script",
                                    cache: true,
                                    url: url
                                });
                                // Return the jqXHR object so we can chain callbacks.
                                return jQuery.ajax( options );
							};

							jQuery.cachedAssets( pa_addons.anime_js );

                            setTimeout(function(){ jQuery.cachedAssets( url ); }, 100);

                            window.backend = 1;
                        } else {
                            var id = $scope.data("id");
                            window.scopes_array[ id ] = $scope;
                        }
                    });
                });

                jQuery(document).ready(function(){

                    if ( jQuery.find( ".premium-floating-effects-yes" ).length < 1 ) {
                        return;
                    }

                    var url = pa_addons.feffects_url;

                    jQuery.cachedAssets = function( url, options ) {
                        // Allow user to set any option except for dataType, cache, and url.
                        options = jQuery.extend( options || {}, {
                            dataType: "script",
                            cache: true,
                            url: url
                        });

                        // Return the jqXHR object so we can chain callbacks.
                        return jQuery.ajax( options );
					};

					jQuery.cachedAssets( pa_addons.anime_js );

                    setTimeout(function(){ jQuery.cachedAssets( url ); }, 100);

                });	
