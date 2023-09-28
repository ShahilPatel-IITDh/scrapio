window.addEventListener('DOMContentLoaded', function() {
window.scope_array = [];
								window.backend = 0;
								jQuery.cachedScript = function( url, options ) {
									// Allow user to set any option except for dataType, cache, and url.
									options = jQuery.extend( options || {}, {
										dataType: "script",
										cache: true,
										url: url
									});
									// Return the jqXHR object so we can chain callbacks.
									return jQuery.ajax( options );
								};
							    jQuery( window ).on( "elementor/frontend/init", function() {
									elementorFrontend.hooks.addAction( "frontend/element_ready/global", function( $scope, $ ){
										if ( "undefined" == typeof $scope ) {
												return;
										}
										if ( $scope.hasClass( "uael-particle-yes" ) ) {
											window.scope_array.push( $scope );
											$scope.find(".uael-particle-wrapper").addClass("js-is-enabled");
										}else{
											return;
										}
										if(elementorFrontend.isEditMode() && $scope.find(".uael-particle-wrapper").hasClass("js-is-enabled") && window.backend == 0 ){		
											var uael_url = uael_particles_script.uael_particles_url;
											
											jQuery.cachedScript( uael_url );
											window.backend = 1;
										}else if(elementorFrontend.isEditMode()){
											var uael_url = uael_particles_script.uael_particles_url;
											jQuery.cachedScript( uael_url ).done(function(){
												var flag = true;
											});
										}
									});
								});
								 jQuery( document ).on( "ready elementor/popup/show", () => {
									if ( jQuery.find( ".uael-particle-yes" ).length < 1 ) {
										return;
									}
									var uael_url = uael_particles_script.uael_particles_url;
									jQuery.cachedScript = function( url, options ) {
										// Allow user to set any option except for dataType, cache, and url.
										options = jQuery.extend( options || {}, {
											dataType: "script",
											cache: true,
											url: url
										});
										// Return the jqXHR object so we can chain callbacks.
										return jQuery.ajax( options );
									};
									jQuery.cachedScript( uael_url );
								});	
jQuery( window ).on( "elementor/frontend/init", function() {
					elementorFrontend.hooks.addAction( "frontend/element_ready/global", function( $scope, $ ){
						if ( "undefined" == typeof $scope ) {
							return;
						}

						if ( $scope.hasClass( "uael-party-propz-yes" ) ) {
							element_type = $scope.data( "element_type" );
							extension_html = $scope.next();
							if( $scope.next().hasClass( "uael-party-propz-wrap" ) ) {
								if( element_type == "section" ) {

									section_wrap = $scope.find( ".elementor-container" );

									section_wrap.before( extension_html );

								} else if( element_type == "column" ) {

									if( $scope.find( ".elementor-column-wrap" ).length == 0 ) {

										$scope.append( extension_html );

									} else if( $scope.find( ".elementor-column-wrap" ).length != 0 ) {

											$column = $scope.find( ".elementor-column-wrap" );
											$column.after( extension_html );

									}
								}
							}
						}
					});
				}); 
});