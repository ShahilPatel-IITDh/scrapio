
		var BunyadSchemeKey = 'bunyad-scheme';
		(() => {
			const d = document.documentElement;
			const c = d.classList;
			const scheme = localStorage.getItem(BunyadSchemeKey);
			if (scheme) {
				d.dataset.origClass = c;
				scheme === 'dark' ? c.remove('s-light', 'site-s-light') : c.remove('s-dark', 'site-s-dark');
				c.add('site-s-' + scheme, 's-' + scheme);
			}
		})();
		