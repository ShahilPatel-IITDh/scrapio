$(function() {
	'use strict';

	// Initialize ajax autocomplete:
	$('#query').autocomplete({
		serviceUrl : 'https://in.search.yahoo.com/sugg/gossip/gossip-in-partner?output=sd1&appid=lycos',
        dataType: 'jsonp',
		paramName : 'command',
		onSearchComplete : function(originalQuery, suggestion) {
			var re = new RegExp('\b' + $.Autocomplete.utils.escapeRegExChars(originalQuery), 'gi');
			return re.test(suggestion.value);
		},
		onSelect : function(suggestion) {
			$('#form_query').submit();
		},
		onInvalidateSelection : function() {
			$('#selction-ajax').html('You selected: none');
		},
		transformResult : function(_response) {
			var response = typeof _response === 'string' ? $.parseJSON(_response) : _response;
			return {
				query : response.q,
				suggestions : $.map(response.r, function(dataItem) {
					return dataItem.k;
				})
			};
		}
	});
});
