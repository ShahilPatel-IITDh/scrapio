
    var links_count = parseInt(87364639.5);
	
	document.getElementById("myLinkCounter").innerHTML = numberWithCommas(links_count);
	
    window.setInterval(
    function () {
         links_count = links_count + 1;
         document.getElementById("myLinkCounter").innerHTML = numberWithCommas(links_count);

     }, 1800);
	 
function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}	 
