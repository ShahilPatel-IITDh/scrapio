function addFav()
{if(document.all)
{window.external.AddFavorite(location.href,document.title);}
else
{alert('Ctrl+D pour marquer cette page')}}
function MM_preloadImages(){var d=document;if(d.images){if(!d.MM_p)d.MM_p=new Array();var i,j=d.MM_p.length,a=MM_preloadImages.arguments;for(i=0;i<a.length;i++)
if(a[i].indexOf("#")!=0){d.MM_p[j]=new Image;d.MM_p[j++].src=a[i];}}}
function navigate(form)
{var go=(form.menu.options[form.menu.selectedIndex].value);document.location=go;}
navvers=navigator.appVersion.substring(0,1);if(navvers>3)
navok=true;else
navok=false;today=new Date;jour=today.getDay();numero=today.getDate();if(numero<10)
numero="0"+numero;mois=today.getMonth();if(navok)
annee=today.getFullYear();else
annee=today.getYear();TabJour=new Array("Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi");TabMois=new Array("janvier","f&eacute;vrier","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","d&eacute;cembre");messageDate=TabJour[jour]+" "+numero+" "+TabMois[mois]+" "+annee;