function addLinkEntityEncode(str) {
	str = str.replace(/(<br \/>|<br\/>|<br>)/gim, '::br::');
	str = new Option(str).innerHTML;
	return str.replace(/"/g, '&quot;').replace(/::br::/g, '<br />');
}

function addLinkCopiedContent() {
    var body_element = document.getElementsByTagName("body")[0],
    	breaks = "",
    	params = astx_add_link_copied_text,
		site_name = Array(),
		site_url = params.addlinktosite ? params.siteurl : document.URL,
		selection = window.getSelection ? window.getSelection() : document.selection,
		selection1 = selection;    
    for (var i = 0; i < params.breaks; i++) 
		breaks = breaks + "<br />";
    if (params.usetitle) 
		site_name.push(addLinkEntityEncode(params.pagetitle));
    if (params.addsitename) 
		site_name.push(addLinkEntityEncode(params.sitename));	
    if (site_name.length == 0) 
		site_name.push(site_url);
    var pagelink = breaks + " " + addLinkEntityEncode(params.readmore) + " " + "<a href='" + site_url + "' ";
    if (params.target) 
		pagelink += " target = '_blank'";
	if (params.reloption == 'canonical' || params.reloption == 'nofollow') 
		pagelink += " rel = '" + params.reloption + "'";
    pagelink += ">";
    if (!params.addlinktosite && params.usesitenameaslink && !params.frontpage) {
        site_name.push(addLinkEntityEncode(params.sitename));
        pagelink += site_name[0] + "</a> | <a href='" + params.siteurl + "'";
        if (params.target) 
			pagelink += " target = '_blank'";
		if (params.reloption == 'canonical' || params.reloption == 'nofollow') 
			pagelink += " rel = '" + params.reloption + "'";
        pagelink += " >" + site_name[1] + "</a>";
    } 
	else 
		pagelink += site_name.join(" | ") + "</a>";
    
    if (params.cleartext || params.replaced_text.length) {
        selection1 = "";
        if (window.getSelection) 
			selection.removeAllRanges();
        else 
			window.clipboardData.clearData();
        if (params.cleartext) 
			return;
    }
    if (params.replaced_text.length) 
		selection1 = addLinkEntityEncode(params.replaced_text);
    var copytext = selection1 + pagelink;
    var appendeddiv = document.createElement("div");
    appendeddiv.style.position = "absolute";
    appendeddiv.style.left = "-99999px";
    body_element.appendChild(appendeddiv);
    appendeddiv.innerHTML = copytext;
    var d = function() {
        var r = document.body.createTextRange();
        r.moveToElementText(appendeddiv);
        r.select();
    };
    if (!params.cleartext && params.replaced_text.length == 0)
        if (window.getSelection) 
			selection.selectAllChildren(appendeddiv);
        else 
			d();
    else if (window.getSelection) 
		selection.selectAllChildren(appendeddiv);
    else 
		d();
    window.setTimeout(function() {
        body_element.removeChild(appendeddiv);
    }, 0);
}
if (document.addEventListener) 
	document.addEventListener("copy", addLinkCopiedContent, true);
else if (document.attachEvent) 
	document.documentElement.attachEvent("oncopy", addLinkCopiedContent);
else 
	document.oncopy = addLinkCopiedContent;