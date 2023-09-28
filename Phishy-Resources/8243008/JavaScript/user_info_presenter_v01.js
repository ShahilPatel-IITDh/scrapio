/**
 * Copyright: Microsoft 2023
 * 
 * Script that injects user name into elements with "x-user-name" class and
 * displays elements with "x-user-name-content" class if the name is available (user is logged in)
 * 
 * If the user profile data is not available, the script will hide elements with
 * "x-user-name-content" class and display elements with "x-no-user-name-content" class
 * 
 * Usage example
 *  <a href="https://web.skype.com/">
 *      <span class="x-no-user-name-content">Open Skype in your browser</span>
 *      <span class="x-user-name-content">Continue as <span class="x-user-name">#UserName</span></span>
 *  </a>
 */

(function () {
    function hideElementsWithClass(className) {
        var elementsToHide = document.getElementsByClassName(className);
        for (var i = 0; i < elementsToHide.length; i++) {
            elementsToHide[i].classList.add("x-hidden");
        }
    }

    function showElementsWithClass(className) {
        var elementsToShow = document.getElementsByClassName(className);
        for (var i = 0; i < elementsToShow.length; i++) {
            elementsToShow[i].classList.remove("x-hidden");
        }
    }

    /**
     * Function to restore defaults - show element with "x-no-user-name-content" class
     * and hide elements with "x-user-name" class
     */
    function showDefaults() {
        hideElementsWithClass("x-user-name-content");
        showElementsWithClass("x-no-user-name-content");
    }

    function syncUserInfo(userProfile) {
        try {
            if (!userProfile) {
                showDefaults();
                return;
            }

            var userProfile = JSON.parse(userProfile);
            if (!userProfile || (!userProfile.firstname && !userProfile.lastname)) {
                showDefaults();
                return;
            }

            // In future, we will handle the avatar URL as well:
            // var avatarUrl = userProfile.avatarUrl;
            var name = (userProfile.firstname || "") + " " + (userProfile.lastname || "");
            showElementsWithClass("x-user-name-content");

            // Inject name to elements with "x-user-name" class
            var elementsToNameInjection = document.getElementsByClassName("x-user-name");
            for (var i = 0; i < elementsToNameInjection.length; i++) {
                elementsToNameInjection[i].textContent = name.trim();
            }

            showElementsWithClass("x-user-name-content");
            hideElementsWithClass("x-no-user-name-content");
        } catch (error) {
            console.error(error);
        }
    }

    var originalProfile = sessionStorage.getItem("profile");
    setInterval(function () {
        var profile = sessionStorage.getItem("profile");
        if (originalProfile !== profile) {
            syncUserInfo(profile);
            originalProfile = profile;
        }
    }, 500);
    window.addEventListener("load", function () {
        syncUserInfo(originalProfile);
    });
})();
