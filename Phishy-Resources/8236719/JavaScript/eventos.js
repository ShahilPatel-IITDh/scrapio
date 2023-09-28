$(document).ready(function() {



});




/* PADROES */
	$json = ajaxRapido("../../web/img/z_leilao/Lang/default.json");
	var $langgs = jQuery.parseJSON($json);

	function langg($palavra){
		$return = $palavra;
		$.each($langgs, function($key, $value) {
			if($palavra == $key && $value){
				$return = $value;
			}
		});	
		return $return;
	}
/* PADROES */