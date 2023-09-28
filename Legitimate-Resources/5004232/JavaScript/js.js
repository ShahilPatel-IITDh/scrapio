
function number_format (number, decimals, dec_point, thousands_sep) {
   //number_format("12.90",2,',','.')
    var n = number, prec = decimals;
 
    var toFixedFix = function (n,prec) {
        var k = Math.pow(10,prec);        return (Math.round(n*k)/k).toString();
    };
 
    n = !isFinite(+n) ? 0 : +n;
    prec = !isFinite(+prec) ? 0 : Math.abs(prec);    var sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep;
    var dec = (typeof dec_point === 'undefined') ? '.' : dec_point;
 
    var s = (prec > 0) ? toFixedFix(n, prec) : toFixedFix(Math.round(n), prec); //fix for IE parseFloat(0.55).toFixed(0) = 0;
     var abs = toFixedFix(Math.abs(n), prec);
    var _, i;
 
    if (abs >= 1000) {
        _ = abs.split(/\D/);        i = _[0].length % 3 || 3;
 
        _[0] = s.slice(0,i + (n < 0)) +
              _[0].slice(i).replace(/(\d{3})/g, sep+'$1');
        s = _.join(dec);    } else {
        s = s.replace('.', dec);
    }
 
    var decPos = s.indexOf(dec);    if (prec >= 1 && decPos !== -1 && (s.length-decPos-1) < prec) {
        s += new Array(prec-(s.length-decPos-1)).join(0)+'0';
    }
    else if (prec >= 1 && decPos === -1) {
        s += dec+new Array(prec).join(0)+'0';    }
    return s;
}

function mostraMenu(valor){
	
	var inputs,i,checados=0;
	inputs = document.getElementsByTagName('li');//pegando os inputs e jogando num array        
	for(i=0;i<inputs.length;i++){//varrendo o array que tem os inputs
		if(inputs[i].className =='cat'+valor){ //se os inputs forem checkbox
			if(inputs[i].style.display=='inline'){
				inputs[i].style.display ='none';
			}else{
				inputs[i].style.display ='inline';
			}
		}
	}
	
	
}

function MM_jumpMenu(targ,selObj,restore){ //v3.0
eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
if (restore) selObj.selectedIndex=0;
}


function cxError(mensagem) {
	var $l = jQuery.noConflict();
	(function($l){
		$l.prompt(''+ mensagem +'',{ prefix: 'Error', show:'slideDown', buttons: { } });
	})($l); 
}

function cxOk(mensagem) {
	var $l = jQuery.noConflict();
	(function($l){
		$l.prompt(''+ mensagem +'',{prefix: 'Ok', show:'slideDown', buttons: { }});
	})($l);
}

function cxMensagem(mensagem) {
	var $l = jQuery.noConflict();
	(function($l){
		$l.prompt(''+ mensagem +'',{ show:'slideDown', buttons: { }});
	})($l);
}
function cxMensagemBut(mensagem) {
	var $l = jQuery.noConflict();
	(function($l){
		$l.prompt(''+ mensagem +'',{ show:'slideDown'});
	})($l);
}



