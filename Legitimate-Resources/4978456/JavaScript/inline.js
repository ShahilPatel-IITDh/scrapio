
		(function () {
			var searchBoxElement = document.querySelector('.searchBox');
			if (searchBoxElement) {
				try {
					renderSearchBox({
						endpoint: '',
						tenant: 'office-web',
						culture: 'en-US',
						autoSuggestEnabled: true,
						placeholder: 'How can we help you?',
						SERPText: 'Search'
					}, searchBoxElement);
				} catch (e) {
					console.error(e);
				}
			}
		})();
	