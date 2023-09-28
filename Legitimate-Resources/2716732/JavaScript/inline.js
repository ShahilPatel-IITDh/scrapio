
					window.addEventListener("DOMContentLoaded", function(){
						if ( navigator.share ) {
							let shareurl = document.location.href;
							let btns = document.querySelectorAll(".juiz_sps_link_shareapi button:not([data-bound])");
							const canon = document.querySelector("link[rel=canonical]");

							if (canon !== null) {
								shareurl = canon.href;
							}

							btns.forEach(function(el) {
								el.closest(".juiz_sps_link_shareapi").removeAttribute( "style" );
								el.setAttribute( "data-bound", "true" );
								el.addEventListener("click", async () => {
									try {
										await navigator.share({
											title: "Alpha Bank a lansat un serviciu nou de Mobile Banking",
											text: "Alpha Bank a lansat un serviciu nou de Mobile Banking - ",
											url: shareurl,
										});
										console.info("Nobs: Successful share");
									} catch(err) {
										console.warn("Nobs: Error sharing", error);
									}
								});
							});
						}
					});
					