var radioStarted = false;

function radio() {
    var radio = document.getElementById("radio");
    if (!radioStarted) {
        document.getElementById("radioGo").className = "fas fa-pause";
        radioStarted = true;
        radio.play();
    } else {
        document.getElementById("radioGo").className = "fas fa-play";
        radio.pause();
        radioStarted = false;
    }
}

var radioStarted = false;

function radioPlay() {
    if (!radioStarted) {
        radioStarted = true;
    }
    radio.play();
}

function radioPause() {
    if (radioStarted) {
        var radio = document.getElementById("radio");
        radio.pause();
        radioStarted = false;
    }
}