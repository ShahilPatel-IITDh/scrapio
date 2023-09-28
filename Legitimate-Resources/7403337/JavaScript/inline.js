
		<!--
if (document.images) {
var ouvertures1=new Image();
ouvertures1.src="ouvertures1.gif";
var ouvertures2=new Image();
ouvertures2.src="ouvertures2.gif";

texte2 = 'Le meilleur des Echecs : La Légende des Pièces - '; 
x = texte2.length-1; 
place = 0;
function defilStat(){
	if (place == texte2.length){
		place = 0;
	}
	if (place <= x){
		texteDef = texte2.substring((texte2.length-(x-place)),texte2.length) + texte2.substring(0,place);
		place++;
		}
	window.status = texteDef;
	tempo22 = setTimeout("defilStat()", 170);
}
}
else {
alert("Votre navigateur est malheureusement trop ancien pour afficher correctement cette page!");
}

function roll(lieu,source){
lieu.src=source.src;
}
//-->
		