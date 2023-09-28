//window.alert('vai mostrar');
//window.alert(window.top.location.host);
//window.alert(window.top.hostname);
//window.alert(window.top.location.host);
//window.alert(window.location.host);

try
{	

	//hst =  window.top.location.host;
    //window.alert(hst);
    //window.alert(window.top.location.host);
 //document.write(window.top.location.host);

if (
	   window.top.location.host != 'zamoner.com.br' 
	&& window.top.location.host != 'www.zamoner.com.br'
    && window.top.location.host != 'www.protexto.com.br'
    && window.top.location.host != 'editora.protexto.com.br'
    && window.top.location.host != 'www.editora.protexto.com.br'
    && window.top.location.host != 'hom.protexto.com.br'
    && window.top.location.host != 'protexto.provedorcerto.com.br'
	&& window.top.location.host != 'www.adm.protexto.com.br'
	&& window.top.location.host != 'adm.protexto.com.br'
	&& window.top.location.host != 'www.hom.protexto.com.br' 		
	&& window.top.location.host != 'protexto.com.br' 
	&& window.top.location.host != 'airojr.no-ip.org:8080'
	&& window.top.location.host != 'airojr.no-ip.org:8081'
	&& window.top.location.host != 'lander'
    && window.top.location.host != 'localhost'
	&& window.top.location.host != 'localhost:8010'
	&& window.top.location.host != 'localhost:8081'
	&& window.top.location.host != 'localhost:8080'
	&& window.top.location.host != 'mac:8080'
	&& window.top.location.host != 'mac.local:8080'
    && window.top.location.host != 'protexto.intranet'
    && window.top.location.host != 'protextoold.local'
    && window.top.location.host != 'hom.protexto.intranet')
		window.location = 'link_invalido.php?l=' + window.top.location.host;
	;
}
catch (e)
{
	window.location = 'link_invalido.php?p=1';
}




function only_num(e)
{
        var keyChar = String.fromCharCode(window.event.keyCode);

//        window.alert(window.event.keyCode);

        if ((keyChar >= '0' && keyChar <= '9') || (keyChar == '.') || window.event.keyCode == 8
                                                                   || window.event.keyCode == 35
                                                                   || window.event.keyCode == 36
                                                                   || window.event.keyCode == 37
                                                                   || window.event.keyCode == 39
                                                                   || window.event.keyCode == 46																   
                                                                   || window.event.keyCode == 9
                                                                   )
        {
                window.status = "";
                //nada a fazer
        }
        else
        {
                window.status = "Digite apenas números.";
               window.event.returnValue = false;
               return false;
        }
}

function only_data(e)
{
        var keyChar = String.fromCharCode(window.event.keyCode);

//        window.alert(window.event.keyCode);

        if ((keyChar >= '0' && keyChar <= '9')  || window.event.keyCode == 8
                                                                   || window.event.keyCode == 35
                                                                   || window.event.keyCode == 36
                                                                   || window.event.keyCode == 37
                                                                   || window.event.keyCode == 39
                                                                   || window.event.keyCode == 46																   
                                                                   || window.event.keyCode == 9
																   || (keyChar == '/') 
																   || (keyChar == '-') 
																   || (keyChar == ':') 
																   || (keyChar == ' ') 
                                                                   )
        {
                window.status = "";
                //nada a fazer
        }
        else
        {
                window.status = "Digite apenas n�meros.";
               window.event.returnValue = false;
               return false;
        }
}

function only_int(e)
{
        var keyChar = String.fromCharCode(window.event.keyCode);

       //window.alert(window.event.keyCode);

        if ((keyChar >= '0' && keyChar <= '9') 
                                               
                                               
                                              
                                               
                                               																   
                                               
                                               )
        {
                window.status = "";
                //nada a fazer
        }
        else
        {
                window.status = "Digite apenas n�meros.";
               window.event.returnValue = false;
               return false;
        }
}

function only_cgc(e)
{

        var keyChar = String.fromCharCode(window.event.keyCode);

//        window.alert(window.event.keyCode);
        if ((keyChar >= '0' && keyChar <= '9') || keyChar == '.' || keyChar == '/' || keyChar == '-' 
			 													   || window.event.keyCode == 8
                                                                   || window.event.keyCode == 35
																   || window.event.keyCode == 189 // '-'
																   || window.event.keyCode == 190 // '.'
																   || window.event.keyCode == 191 // '/'
                                                                   || window.event.keyCode == 36
                                                                   || window.event.keyCode == 37
                                                                   || window.event.keyCode == 39
                                                                   || window.event.keyCode == 46																   
                                                                   || window.event.keyCode == 9
                                                                   )
        {
                window.status = "";
                //nada a fazer
        }
        else
        {
                window.status = "Digite apenas números.";
               window.event.returnValue = false;
               return false;
        }
}

function only_fone(e)
{
        var keyChar = String.fromCharCode(window.event.keyCode);

//        window.alert(window.event.keyCode);
		
        if ((keyChar >= '0' && keyChar <= '9') || (keyChar == '-') || (keyChar == '(')		
																   || (keyChar ==')') 
																   || window.event.keyCode == 189
																   || window.event.keyCode == 8
                                                                   || window.event.keyCode == 35
                                                                   || window.event.keyCode == 36
                                                                   || window.event.keyCode == 37
                                                                   || window.event.keyCode == 39
                                                                   || window.event.keyCode == 46																   
                                                                   || window.event.keyCode == 9
                                                                   )
        {
                window.status = "";
                //nada a fazer
        }
        else
        {
                window.status = "Digite apenas n�meros.";
               window.event.returnValue = false;
               return false;
        }

}

function only_cep(e)
{
	
		if (window.event.type!='blur' && window.event.type !='focus')
		{
			var keyChar = String.fromCharCode(window.event.keyCode);
			if (e.value.length>=8 && (keyChar >= '0' && keyChar <= '9'))
			{
				window.event.returnValue = false;
				return false;
			}
		
			if ((keyChar >= '0' && keyChar <= '9') || window.event.keyCode == 8)
			{
					window.status = "";
					//nada a fazer
			}
			else
			{
					window.status = "Digite apenas n�meros.";
				   window.event.returnValue = false;
				   return false;
			}
		}
		if (window.event.type == "blur" || window.event.type == "focus")
		{
			pos = String(e.value).indexOf('-');
			if ( pos != -1)
			{ 
				e.value = String(e.value).substr(0,pos) + String(e.value).substr(pos+1,e.value.length);
			}
			if (window.event.type =="blur")
			{
				if (e.value.length>5)
					e.value = String(e.value).substr(0,5) +"-"+ String(e.value).substr(5,e.value.length);
		
			}
		}
}

function only_cpf(e)
{
//		window.alert(window.event.type);
		if (window.event.type!='blur' && window.event.type !='focus')
		{
			var keyChar = String.fromCharCode(window.event.keyCode);
			if (e.value.length>=11 && (keyChar >= '0' && keyChar <= '9'))
			{
				window.event.returnValue = false;
				return false;
			}
			if ((keyChar >= '0' && keyChar <= '9') || window.event.keyCode == 8)
			{
					window.status = "";
					//nada a fazer
			}
			else
			{
					window.status = "Digite apenas n�meros.";
				   window.event.returnValue = false;
				   return false;
			}
		}
		if (window.event.type == "blur" || window.event.type == "focus")
		{
			pos = String(e.value).indexOf('-');
			if ( pos != -1)
			{ 
				e.value = String(e.value).substr(0,pos) + String(e.value).substr(pos+1,e.value.length);
			}
			if (window.event.type =="blur")
			{
				if (e.value.length>9)
					e.value = String(e.value).substr(0,9) +"-"+ String(e.value).substr(9,e.value.length);
		
			}
		}
}
function only_alpha(e)
{
        var keyChar = String.fromCharCode(window.event.keyCode);

//        window.alert(window.event.keyCode);

        if (	(keyChar >= 'A' && keyChar <= 'z') 
			|| 	(keyChar == '.') 
			|| window.event.keyCode == 8
            || window.event.keyCode == 35
            || window.event.keyCode == 36
            || window.event.keyCode == 37
            || window.event.keyCode == 39
            || window.event.keyCode == 32
            || window.event.keyCode == 46																   
            || window.event.keyCode == 9
			|| (window.event.keyCode >= 224 && window.event.keyCode <=252)
						
																    // acentos
                                                                   )
        {
                window.status = "";
                //nada a fazer
        }
        else
        {
                window.status = "Digite apenas letras.";
               window.event.returnValue = false;
               return false;
        }
}


function only_alphanum(e)
{
        var keyChar = String.fromCharCode(window.event.keyCode);

        if ((keyChar >= '0' && keyChar <= '9') || (keyChar >= 'A' && keyChar <= 'z') || (keyChar == '.') || window.event.keyCode == 8
                                                                   || window.event.keyCode == 35
                                                                   || window.event.keyCode == 36
                                                                   || window.event.keyCode == 37
                                                                   || window.event.keyCode == 39
                                                                   || window.event.keyCode == 32
                                                                   || window.event.keyCode == 46																   
                                                                   || window.event.keyCode == 9
																   || window.event.keycode == 222
			|| (window.event.keyCode >= 224 && window.event.keyCode <=252)
                                                                   )
        {
                window.status = "";
                //nada a fazer
        }
        else
        {
                window.status = "Digite apenas letras e n�meros.";
               window.event.returnValue = false;
               return false;
        }
}


function only_alphanum_sem_esp(e) // Sem espa�o em branco
{
        var keyChar = String.fromCharCode(window.event.keyCode);

        if ((keyChar >= '0' && keyChar <= '9') || (keyChar >= 'A' && keyChar <= 'z') || (keyChar == '.') || window.event.keyCode == 8
                                                                   || window.event.keyCode == 35
                                                                   || window.event.keyCode == 36
                                                                   || window.event.keyCode == 37
                                                                   || window.event.keyCode == 39
                                                                   || window.event.keyCode == 46																   
                                                                   || window.event.keyCode == 9
																   || window.event.keycode == 222
			|| (window.event.keyCode >= 224 && window.event.keyCode <=252)
                                                                   )
        {
                window.status = "";
                //nada a fazer
        }
        else
        {
                window.status = "Digite apenas letras e n�meros.";
               window.event.returnValue = false;
               return false;
        }
}

function valida_cpf(cpf)
{
	pos = String(cpf).indexOf('-');
	if ( pos != -1)
	{ 
		cpf = String(cpf).substr(0,pos) + String(cpf).substr(pos+1,cpf.length);
	}
      var numeros, digitos, soma, i, resultado, digitos_iguais;
      digitos_iguais = 1;
      if (cpf.length < 11)
            return false;
			
      for (i = 0; i < cpf.length - 1; i++)
            if (cpf.charAt(i) != cpf.charAt(i + 1))
                  {
                  digitos_iguais = 0;
                  break;
                  }
      if (!digitos_iguais)
            {
            numeros = cpf.substring(0,9);
            digitos = cpf.substring(9);
            soma = 0;
            for (i = 10; i > 1; i--)
                  soma += numeros.charAt(10 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                  return false;
            numeros = cpf.substring(0,10);
            soma = 0;
            for (i = 11; i > 1; i--)
                  soma += numeros.charAt(11 - i) * i;
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                  return false;
            return true;
            }
      else
            return false;
      }

function valida_cnpj(cnpj)
      {
      var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
      digitos_iguais = 1;
      if (cnpj.length < 14 && cnpj.length < 15)
            return false;
      for (i = 0; i < cnpj.length - 1; i++)
            if (cnpj.charAt(i) != cnpj.charAt(i + 1))
                  {
                  digitos_iguais = 0;
                  break;
                  }
      if (!digitos_iguais)
            {
            tamanho = cnpj.length - 2
            numeros = cnpj.substring(0,tamanho);
            digitos = cnpj.substring(tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--)
                  {
                  soma += numeros.charAt(tamanho - i) * pos--;
                  if (pos < 2)
                        pos = 9;
                  }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(0))
                  return false;
            tamanho = tamanho + 1;
            numeros = cnpj.substring(0,tamanho);
            soma = 0;
            pos = tamanho - 7;
            for (i = tamanho; i >= 1; i--)
                  {
                  soma += numeros.charAt(tamanho - i) * pos--;
                  if (pos < 2)
                        pos = 9;
                  }
            resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
            if (resultado != digitos.charAt(1))
                  return false;
            return true;
            }
      else
            return false;
      } 
	  
function isdate(DATA) {
var expReg = /^(([0-2]\d|[3][0-1])\/([0]\d|[1][0-2])\/[1-2][0-9]\d{2})$/;
var msgErro = 'Formato inv�lido de data.';
var vdt = new Date();
var vdia = vdt.getDay();
var vmes = vdt.getMonth();
var vano = vdt.getYear();
if ((DATA.value.match(expReg)) && (DATA.value!='')){
var dia = DATA.value.substring(0,2);
var mes = DATA.value.substring(3,5);
var ano = DATA.value.substring(6,10);
if((mes==4 && dia > 30) || (mes==6 && dia > 30) || (mes==9 && dia > 30) || (mes==11 && dia > 30)){
return(false); //"Dia incorreto !!! O m�s especificado cont�m no m�ximo 30 dias.");
//DATA.focus();
return false;
} else{ //1
if(ano%4!=0 && mes==2 && dia>28){
return(false);//alert("Data incorreta!! O m�s especificado cont�m no m�ximo 28 dias.");
//DATA.focus();
return false;
} else{ //2
if(ano%4==0 && mes==2 && dia>29){
return (false); //alert("Data incorreta!! O m�s especificado cont�m no m�ximo 29 dias.");
//DATA.focus();
return false;
} else{ //3
if (ano > vano) {
return (false);//alert("Data incorreta!! Ano informado maior que ano atual.");
//DATA.focus();
return false;
}else{ //4
//alert ("Data correta!");
return true;
} //4-else
} //3-else
}//2-else
}//1-else	
} else { //5
//return (false);//alert(msgErro);
//DATA.focus();
return false;
} //5-else
}

function MM_formtCep(e,src,mask) {
        if(window.event) { _TXT = e.keyCode; } 
        else if(e.which) { _TXT = e.which; }
        if(_TXT > 47 && _TXT < 58) { 
  var i = src.value.length; var saida = mask.substring(0,1); var texto = mask.substring(i)
  if (texto.substring(0,1) != saida) { src.value += texto.substring(0,1); } 
     return true; } else { if (_TXT != 8) { return false; } 
  else { return true; }
        }
}