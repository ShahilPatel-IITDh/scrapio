var mouseY = 0;
var modalEnable = false;
var modalKey = "oa-exit-incentive-modal_seen";
var showModalTime = 15000;

function closeModal() {
    sessionStorage.setItem(modalKey, true);
    wa.trackLink(true, "eincentive-click-close");
}

function showModal() {
    if (
        !sessionStorage.getItem(modalKey) &&
        document.querySelector("[data-modalid='oa-exit-incentive-modal']") == null
    ) {
        if (
            document.querySelector("[data-modalid='oa-exit-incentive-modal']") != null
        ) {
            document
                .querySelector(
                    "[data-modalid='oa-exit-incentive-modal'] [aria-label='Close']"
                )
                .click();
        }
        document.getElementById("triggerModal").click();
        wa.trackLink(true, "eincentive-popup-viewed");
        sessionStorage.setItem(modalKey, true);

        if (
            document.querySelector("[data-modalid='oa-exit-incentive-modal']") != null
        ) {
            document
                .querySelector(
                    "[data-modalid='oa-exit-incentive-modal'] [aria-label='Close']"
                )
                .setAttribute("onClick", "closeModal()");
        }
    }
}

function addEventListeners() {
    document.addEventListener("mousemove", function (e) {
        mouseY = e.clientY;
        if (mouseY > 100) {
            modalEnable = true;
        }
    });

    document.addEventListener("mouseleave", function (e) {
        if (mouseY < 100 && modalEnable) {
            showModal();
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        addEventListeners();
    }, showModalTime);
});
