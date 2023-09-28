document.addEventListener('deviceready', onDeviceReady, false);

			function onDeviceReady() {
				uni && (uni.$cordova = cordova);
				uni.$emit('deviceready')
			}