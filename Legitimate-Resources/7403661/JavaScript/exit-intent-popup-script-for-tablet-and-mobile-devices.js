function isScrolledUnderContent() {
    let scrollToElementOffset = document.getElementsByTagName('footer')[0].offsetTop;
    let shareBlock = document.getElementsByClassName('share-block')[0];
    if (!shareBlock) {
        shareBlock = document.getElementById('faq');
    }
    scrollToElementOffset = getscrollToElementOffset(shareBlock) ? getscrollToElementOffset(shareBlock) : scrollToElementOffset;

    return window.scrollY + window.innerHeight >= scrollToElementOffset;
}
function showPopUpOnMobile(fireOnMobileEvent, intent_trigger_type){
    console.log('trying to show popup outer', intent_trigger_type);
    if (typeof bioEp !== 'undefined' && !bioEp.checkCookie()) {
        console.log('trying to show popup inner', intent_trigger_type);

        document.dispatchEvent(fireOnMobileEvent);

        window.intent_trigger_type  = intent_trigger_type;//'non_interaction';

        let existingClose = document.querySelector("#bio_ep_close");
        
        if(existingClose !== null) {
            existingClose.parentNode.removeChild(existingClose);
        }

        runExitIntent();
        bioEp.showPopup();
        setTimeout(bioEp.scalePopup, 300);
    }

    /////
}

// document.addEventListener('DOMContentLoaded', function(){
console.log('looking for popup');
window.intent_trigger_type = false;
const popup = document.getElementById('bio_ep');
const fireOnMobileEvent = new Event('fireonmobile');

if (popup !== null) {

    // Exit intent popup script for tablet and mobile devices
    if (typeof mobileAndTabletCheck == "function" && mobileAndTabletCheck()) {
        // Add custom event
        document.addEventListener('fireonmobile', function (e) {
            console.log('fireOnMobileEvent');
            bioEp.addEvent(bioEp.closeBtnEl, "touchend", function () {
                bioEp.hidePopup();
            });
            if (!bioEp.shown) {
                const popupImg = document.getElementsByClassName('popup-cimg')[0];
                if (popupImg !== undefined && popupImg.parentNode !== null) {
                    popupImg.parentNode.removeChild(popupImg);
                }
            }
        }, false);

        // Timer start
        if(adjustMobileForGoogle) {
            var timeoutInMiliseconds = 60000;    
        } else {
            var timeoutInMiliseconds = 15000;
        }
        
        var timeoutId;

        function startTimer() {
            // window.setTimeout returns an Id that can be used to start and stop a timer
            timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds);
        }

        function resetTimer() {
            window.clearTimeout(timeoutId)
            startTimer();
        }

        function doInactive() {
            // Call an event
            // if (typeof bioEp !== 'undefined' && !bioEp.checkCookie()) {
                // document.dispatchEvent(fireOnMobileEvent);

                // window.intent_trigger_type  = intent_trigger_type;//'non_interaction';
                // runExitIntent();
                // bioEp.showPopup();
                // setTimeout(bioEp.scalePopup, 300);
                console.log(timeoutInMiliseconds);
                showPopUpOnMobile(fireOnMobileEvent, 'non_interaction');
            // }
        }

        function setupTimers() {
            document.addEventListener("touchstart", resetTimer, false);
            document.addEventListener("scroll", resetTimer, false);
            startTimer();
        }

        setupTimers();

        // Detect scroll speed
        var checkScrollSpeed = (function (settings) {
            settings = settings || {};

            var lastPos, newPos, timer, delta,
                delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

            function clear() {
                lastPos = null;
                delta = 0;
            }

            clear();

            let deltasArr = [];
            return function () {
                newPos = window.scrollY;
                if (lastPos != null) {
                    delta = newPos - lastPos;
                }
                lastPos = newPos;
                clearTimeout(timer);
                timer = setTimeout(clear, delay);
                if (deltasArr.length < 5) {
                    // Only detect scrolling up
                    if (delta < 0) {
                        deltasArr.push(delta);
                    }
                } else {
                    let arraySum = Math.abs(deltasArr.reduce(function (a, b) {
                        return a + b;
                    }, 0));
                    let average = arraySum / 5;
                    deltasArr = [];
                    if (delta < 0) {
                        deltasArr.push(delta);
                    }
                    return average;
                }
            };
        })();

        function getElementOffset(element)
        {
            let de = document.documentElement;
            let box = element.getBoundingClientRect();
            let top = box.top + window.pageYOffset - de.clientTop;
            let left = box.left + window.pageXOffset - de.clientLeft;
            return { top: top, left: left };
        }

        window.addEventListener('scroll', scrollEvent);

        function scrollEvent() {
            const scrollSpeed = checkScrollSpeed();
            // Check if user is scrolling up fast
            console.log('scrollSpeed up', scrollSpeed);
            if (scrollSpeed && scrollSpeed > 100) {
                // if (typeof bioEp !== 'undefined' && !bioEp.checkCookie()) {
                    // document.dispatchEvent(fireOnMobileEvent);

                    // intent_trigger_type = 'scroll_fast_up';
                    // runExitIntent();
                    // bioEp.showPopup();
                    // setTimeout(bioEp.scalePopup, 300);
                    
                // }
                showPopUpOnMobile(fireOnMobileEvent, 'scroll_fast_up');
            }

            // Check if user is scrolling up from the bottom even not fast
            let isScrolledDown = isScrolledUnderContent();
            if (isScrolledDown) {
                if (scrollSpeed) {
                    // if (typeof bioEp !== 'undefined' && !bioEp.checkCookie()) {
                    //     document.dispatchEvent(fireOnMobileEvent);

                    //     intent_trigger_type = 'end_content_scroll_up';
                    //     runExitIntent();
                    //     bioEp.showPopup();
                    //     setTimeout(bioEp.scalePopup, 300);
                    // }
                    showPopUpOnMobile(fireOnMobileEvent, 'end_content_scroll_up');
                }
            }
        }
    }
}
// });