
	$(function(){
	var ele = document.getElementById("years-bus");
	var d = new Date();
    var n = d.getFullYear();
	var yr = n-1995;

	ele.setAttribute("data-count", yr);
	});
    