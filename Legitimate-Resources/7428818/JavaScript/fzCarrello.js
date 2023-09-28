function CTRLQuant()
{
	valore = document.getElementsByName("quant")[0].value;
	len    = valore.length;
	code   = valore.charCodeAt(len-1);
	
	if ( (code < 48) || (code > 57) ) {
		alert("Il campo accetta solo numeri.");
		document.getElementsByName("quant")[0].value = 1;
	}
	else
		if ( valore < 1 ) {
			alert("La quantit inserita non  corretta");
			document.getElementsByName("quant")[0].value = 1;
		}
}

var t = new Array(100)
var v = new Array(100)

var j = 0

function getVariante() {
	var vv = document.getElementsByName("var")
	value = ""
	for(i=0; i<vv.length; i++)
		if( vv[i].checked == true )
			value = vv[i].value
	
	return(value)
}

function Buy( perc ) {
	str = perc + "IDPROD=" + GetPar("IDPROD") +
				 "&quant=" + document.getElementsByName("quant")[0].value +
				 "&var=" + getVariante()
				 
	if( GetPar("lang") != "" )
		str = str + "&lang=" + GetPar("lang")
		
	return(str);
}

function GetPar(parametro) {
	parametro = parametro + "="
	x = parametro.length
	
	attr = location.href
	
	y = attr.indexOf(parametro)
	if( y > 0 )
		attr = attr.slice( y + x , attr.length)
	else
		attr = ""
	
	temp = attr.match("&")
	if( temp > 0 )
		attr = attr.slice(0, temp)
	
	//alert(attr)
	return(attr)
}

function Agg( idProd, idVar, indice ) {
	
	str = "index.asp?carrello=3&IDPROD=" + idProd + "&quant=" + document.getElementById("quant" + indice).value + "&var=" + idVar
	
	if( GetPar("lang") != "") 
		str = str + "&lang=" + GetPar("lang")
	
	//return(str)
	location.href = str
}

function ModArr(id, valore) {
	i=0
	ret = false
	
	if( (id != "") && (valore != "") ) {
		if( j > 0 ) {
			while( t[i] != "" && ret != true ) {
				if( t[i] == id ) {
					v[i] = valore
					ret=true
				}
				i = i+1
			}
		}

		if( ret == true ) {
			v[j] = valore
			t[j] = id
			j = j+1
		}
	}
}
