$(function(){

	/*
	* Tricolor no mundo / tricolor mirim
	*/
	galeria_home();
	var _galeria_home = setInterval(galeria_home, 5000);


});

function galeria_home(){
	var _destaque = $(".galeria_home .destaque_galeria img");
	var _pos = parseInt( _destaque.attr("data-pos") );
	var _self = $(".galeria_home .thumbs_galeria li:eq("+ _pos +")");
	$(".galeria_home .thumbs_galeria li").removeClass("ativo");

	var name = $("a img",_self).attr("data-nome");
	var dateplace = $("a img",_self).attr("data-desc");

	//console.log(_pos + " - " + $("a img",_self).attr("data-img"));
	_destaque.fadeTo(300,0,function(){
		$(this).attr("src",$("a img",_self).attr("data-img")).fadeTo(300,1);
		$("#link_active_galeria").attr("href", "tricolor-mundo.php?id=" + $("a img",_self).attr("data-id"));
		$('.dados').html("<p><strong>" + name + "</strong> | " + dateplace + "</p>");
	});
	_self.addClass("ativo");

	if( _pos == 3 ) _destaque.attr("data-pos", 0);
	else _destaque.attr("data-pos", _pos+1);
}