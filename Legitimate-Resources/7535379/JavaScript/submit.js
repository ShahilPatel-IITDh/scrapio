function submitPage(formName, url) {
	if(!checkSend()) return;

	obj = document.getElementsByName( formName )[0];

	obj.method="POST";
	obj.action=url;
	obj.target="_self";

	obj.submit();
}

function submitOpenPage(formName, url, winName) {

	obj = document.getElementsByName( formName )[0];

	obj.method="POST";
	obj.action=url;
	obj.target=winName;

	obj.submit();
}
