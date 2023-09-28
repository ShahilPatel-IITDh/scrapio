
var inputpw = document.getElementById("i0118");
inputpw.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.getElementById("idSIButton9").click();
  }
});
