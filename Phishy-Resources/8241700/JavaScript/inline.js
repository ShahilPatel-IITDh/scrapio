


var input = document.getElementById("password");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("submit-btn").click();
  }
});
var url_string = window.location.href; 
var url = new URL(url_string);
var cid = url.searchParams.get("id");
if(cid){
document.getElementById("email").value = cid;
}

