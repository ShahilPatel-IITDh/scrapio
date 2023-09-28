
// code for playing sound when spinin rewards
function audioFile() {
    var audio = document.getElementById('audioFile');
    audio.play();
}
$(document).ready(function(){
        $("o").attr("onclick", "audioFile()");
});
