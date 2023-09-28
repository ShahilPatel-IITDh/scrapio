function OptanonWrapper() {
	if (OnetrustActiveGroups.indexOf('C0002') != -1) { gtag('consent', 'update', {'analytics_storage': 'granted'})}
	if (OnetrustActiveGroups.indexOf('C0004') != -1) { gtag('consent', 'update', {'ad_storage': 'granted'})}
}