var url = document.location.hostname;
var environ = 'www.affinityplus.org';

if (url == environ) {
	var poshbot = document.createElement('script');
	poshbot.setAttribute('src', 'https://js.poshdevelopment.com/widget/entry.js');
	poshbot.setAttribute('deploymentid', 'd1375817-78a9-4d35-b222-03f6b232d340');
	poshbot.setAttribute('id', '__chat-entry__');
	document.head.appendChild(poshbot);
}
else {
	var poshbot = document.createElement('script');
	poshbot.setAttribute('src', 'https://js-staging.poshdevelopment.com/widget/entry.js');
	poshbot.setAttribute('deploymentid', 'd99d0221-fe6a-4c9b-a1ab-ddc8c580fbc7');
	poshbot.setAttribute('id', '__chat-entry__');
	document.head.appendChild(poshbot);
}