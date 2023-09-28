
function screensize() {
    
var wndow_ht = $( window ).height();
//$('body').css("min-height",wndow_ht);
 
var myPopPage_ht = $( ".myPopPage" ).height();
var top_cal = (wndow_ht - myPopPage_ht)/2;
$('.myPopPage').css("top",top_cal);

/*
if(wndow_ht<aboutBox_ht) {
	$('.myPopPage').css("top","10px");	
	$('.myPopPage').css("padding","0px 0px 10px 0px");	
}
*/

};

$( document ).ready(function() {
  screensize();	
});
$( window ).resize(function() {
  screensize();
});
$( window ).load(function() {
  screensize();
});

//menu
$( ".mnuicn" ).click(function() {
  $( ".menuBx" ).slideToggle( "slow" );
});
