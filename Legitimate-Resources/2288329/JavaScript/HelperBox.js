// Get the messageBox
var messageBox = document.getElementById("messageBox")

// Get the helpButton which opens the messageBox
var helpButton = document.getElementById("helpButton")

// Get the close button which closes the messageBox
var closeButton = document.getElementsByClassName("close")[0]

// Indicate that if the messageBox is displayed
var displayed = false

helpButton.onmouseover = function () {
    if (!displayed) {
        messageBox.style.display = "block"
        displayed = true
    }

    // Auto hide after 10s
    if (displayed) {
        setTimeout(function () {
            messageBox.style.display = "none"
            displayed = false
        }, 10000)
    }
}

// Click the helpButton to open the messageBox
helpButton.onclick = function () {
    if (!displayed) {
        messageBox.style.display = "block"
        displayed = true
    } else {
        messageBox.style.display = "none"
        displayed = false
    }

    // Auto hide after 10s
    if (displayed) {
        setTimeout(function () {
            messageBox.style.display = "none"
            displayed = false
        }, 10000)
    }
}

// Click the closeButton to close the messageBox
closeButton.onclick = function () {
    messageBox.style.display = "none"
    displayed = false
}

window.onload = function () {
    // The messageBox is closed by default
    messageBox.style.display = "none"
    displayed = false

    // Uncomment this to hide the messageBox after 10s
    //setTimeout(function() {
    //     messageBox.style.display = "none"
    //     displayed = false
    //}, 10000)
}
