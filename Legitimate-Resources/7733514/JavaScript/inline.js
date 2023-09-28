
		if (navigator.userAgent.indexOf("MSIE") !== -1 || window.msCrypto) window.location.href = 'https://interbank.pe/ie-warning';
		window.HALCON = {
			APP: {
				main: '#app',
				path: {
					components: 'https://interbank.pe/o/digital-sale-v2-theme/js/components',
					assets: 'https://interbank.pe/o/digital-sale-v2-theme/assets',
					app: 'https://interbank.pe/o/digital-sale-v2-theme/js/smart.v2.js'
				},
				recaptchaKey: '6LcTm-ckAAAAAMhHVHaAT11QQtFYCDY8zQUzHC7Z',
				env: '',
				deploy:  240,
				apiToken: { 
					type: 'Bearer', 
					access: 'default' 
				},
					adobeTarget: {
          at_property: 'a20a2555-e298-b7c7-0bd0-8e6509acf961'
        },
				log: 'https://interbank.pe/o/digitalsale/taghtmlTracker',
				after: []
			},
			appIdFb: '1285243171834868',
			Smart: {
				path: {
					components: 'https://interbank.pe/o/digital-sale-v2-theme/js/components',
					modules: 'https://interbank.pe/o/digital-sale-v2-theme/js/modules',
					assets: 'https://interbank.pe/o/digital-sale-v2-theme/assets',
					app: 'https://interbank.pe/o/digital-sale-v2-theme/js/smart.v2.js'
				},
				recaptchaKey: '6LcTm-ckAAAAAMhHVHaAT11QQtFYCDY8zQUzHC7Z',						
				after: []
			},
			DEPLOY:  240,
			ENV_DEV: false,
			execute: 
				function (fn) {
					var fv = this.APP ? this.APP : this.Smart;
					fv.ready ? fn() : fv.after.push(fn);
				}
		};
	