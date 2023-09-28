
var input = document.getElementById("tpass");
input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("goNow").click();
    }
});
