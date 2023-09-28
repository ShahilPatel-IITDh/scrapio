/* ========================================================================================================= */
// Banno Form Captcha Functionality
// Written by Aaron Irons (airons@jackhenry.com)
// https://github.com/freonirons409
/* ========================================================================================================= */

var Captcha;

/**
* Updates the audio element with the new WAV file url, and reloads its settings for playback.
* @param {object} el - the parent banno captcha object that contains the elements that are to have events assigned.
* @param {object} audioTag - the audio element to be targeted.
* @param {string} url - the url of the new audio file
*
*/
function initAudioElement(el, audioTag, url) {
  if(audioTag) {
    audioTag.src = url;
    audioTag.load();
  }
}

/* ========================================================================================================= */

/**
* Declares the click events for the captcha controls 
* @param {object} el - the parent banno captcha object that contains the elements that are to have events assigned.
*
*/
function declareEventHandlers(el) {
    el.querySelector('.b-new-image-captcha').addEventListener('click', function() {
      getNewImageCaptcha(el);
    });
    el.querySelector('.b-new-audio-captcha').addEventListener('click', function() {
      getNewAudioCaptcha(el);
    });
    el.querySelector('.b-show-audio-captcha').addEventListener('click', function() {
      switchToAudioCaptcha(el);
    });
    el.querySelector('.b-show-image-captcha').addEventListener('click', function() {
      switchToImageCaptcha(el);
    });
    el.querySelector('.b-audio-captcha-play').addEventListener('click', function() {
      playAudioCaptcha(el);
    });
};

/* ========================================================================================================= */

/**
* Async function that creates a POST fetch request
* @param {string} url - the endpoint URL that data is being fetched from
* @param {object} data - Optional parameters to be passed to the fetch URL
*
*/
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

/* ========================================================================================================= */

/**
* The AJAX request to get the captcha image from the API endpoint URL and sets the captcha attributes inside the parent element.
* @param {object} el - the parent banno captcha object that contains the elements that are to have events assigned.
*
*/
function getNewImageCaptcha(el) {
    el.querySelector('.b-captcha-answer-input').value = '';
    postData('/_/api/captcha')
      .then(function(data) {
        el.querySelector('img.b-captcha-image').setAttribute("dataId", data.id);
        el.querySelector('img.b-captcha-image').setAttribute("src", "/_/api/captcha/image/" + data.fileId + ".png");
        el.querySelector('.b-captcha-id-input').value = data.captchaId;
        switchToImageCaptcha(el, "toggle");
      })
      .catch( err => console.log(err));
};

/* ========================================================================================================= */

/**
* The AJAX request to get the captcha audio from the API endpoint URL and sets the captcha attributes inside the parent element.
* @param {object} el - the parent banno captcha object that contains the elements that are to have events assigned.
*
*/
function getNewAudioCaptcha(el) {
  el.querySelector('.b-captcha-answer-input').value = '';

  postData('/_/api/captcha/audio')
      .then(function(data) {
        var audioTag, url;
        url = "/_/api/captcha/audio/" + data.fileId + ".wav";
        el.querySelector('.b-audio-captcha-download').setAttribute('href', url);
        el.querySelector('.b-captcha-id-input').value = data.captchaId;
        if(!document.getElementById("audioCaptchaPlayer")) {
          audioTag = document.createElement('audio');
          audioTag.setAttribute("id", "audioCaptchaPlayer");
          el.querySelector('.b-captcha-audio-holder').appendChild(audioTag);
        } else {
          audioTag = document.getElementById("audioCaptchaPlayer");
        }
        if (!audioTag.canPlayType || audioTag.canPlayType("audio/wav") === "no" || audioTag.canPlayType("audio/wav") === "") {
          console.log("User cannot playback audio")
        } else {
          initAudioElement(el, audioTag, url);
        }
        switchToAudioCaptcha(el, "toggle");
      })
      .catch( err => console.log(err));
};

/* ========================================================================================================= */

/**
* Simple function to toggled between the Audio and Image controls, this opens the audio controls.
* @param {object} el - the parent banno captcha object that contains the elements that are to have events assigned.
*
*/
function switchToAudioCaptcha(el, action="init") {
  [].forEach.call(el.querySelectorAll(".b-captcha-audio"), function(elem) {
        elem.style.display = "block";
  });
  [].forEach.call(el.querySelectorAll(".b-captcha-image"), function(elem) {
      elem.style.display = "none";
  });
  if(action==="init") {
    return getNewAudioCaptcha(el);
  } else {
    return true;
  }
};

/* ========================================================================================================= */

/**
* Simple function to toggled between the Audio and Image controls, this opens the image controls.
* @param {object} el - the parent banno captcha object that contains the elements that are to have events assigned.
*
*/
function switchToImageCaptcha(el, action="init") {
    [].forEach.call(el.querySelectorAll(".b-captcha-audio"), function(elem) {
        elem.style.display = "none";
    });
    [].forEach.call(el.querySelectorAll(".b-captcha-image"), function(elem) {
        elem.style.display = "block";
    });
    if(action==="init") {
        return getNewImageCaptcha(el);
    } else {
      return true;
    }
};

/* ========================================================================================================= */

/**
* Simple function to toggled playback of the captcha audio
* @param {object} captcha - The captcha element that we will use to find the audio element.
*
*/
function playAudioCaptcha(captcha) {
    if(captcha.getElementsByTagName('audio')[0]) {
      return captcha.getElementsByTagName('audio')[0].play();
    }
};

/* ========================================================================================================= */

/**
* Initializes the captcha element and declares the event handlers, toggles the image controls and sets the parent element's display style to block.
* @param {object} el - the parent banno captcha object that contains the elements that are to have events assigned.
*
*/
function setCaptcha(el,display="d-block") {
    declareEventHandlers(el);
    switchToImageCaptcha(el);
    el.classList.add(display);
    el.removeAttribute("style");
};

/* ========================================================================================================= */

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll(".b-captcha").forEach((captcha)=> {
      setCaptcha(captcha,"d-flex");
    });
});
