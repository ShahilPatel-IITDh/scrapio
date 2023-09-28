$(document).ready(function(){
$(".table1 tr").mouseover(function() {$(this).addClass("over");}).mouseout(function() {$(this).removeClass("over");});
$(".table1 tr:even").addClass("alt");
});

$(document).ready(function(){
	var sw = $('#wrapper').width()
	if(sw < '960') {
		$('#wrapper').width('960')
		$('#footer').width('960')
		}
});