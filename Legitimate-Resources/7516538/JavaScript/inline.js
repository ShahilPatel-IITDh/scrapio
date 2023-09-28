
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});
    
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "navbar") {
        x.className += " responsive";
    } else {
        x.className = "navbar";
    }
}
