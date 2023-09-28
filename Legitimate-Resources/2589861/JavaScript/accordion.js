jQuery(document).ready(function($) {
					var icons = {
						header: "fa fa-caret-right",
						activeHeader: "fa fa-caret-down"
						};
						$( ".ts-acordion-151" ).accordion({
							icons: icons,
							active:0,
							collapsible: true
						});
				});