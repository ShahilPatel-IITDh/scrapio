var randomWidth = 3000;
// The random range will be from 0 to 3000, or whatever you want !

// 1000 = Initial timer when the page is first loaded
var percent = 0;
var timer;

var options = {
    rateMin: 2000,
    rateMax: 5000
}

function toggleSomething(percentToLoad) {
// do stuff, happens to use jQuery here (nothing else does)


    $('#circle').circleProgress('value', (percent / 100));
    console.log(percent / 100);

    if (percent <= 100) {
        clearInterval(timer);
        console.log(parseInt(Math.random() * randomWidth));
        timer = setInterval(toggleSomething(percent), parseInt(Math.random() * randomWidth));
    }

}

function hackDone(){

    $('#hack_ig_text').fadeOut(500);
    $.when($('#proceedbutton').fadeOut(500)).done(function(){$('#download-button').show();})

}


function formNotValid(){
	$(".shake-wrapper").addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$(this).removeClass('shake animated');
	});
}
	
function pullData(){

	$("#ig-profile-form").validator().on("submit", function (event) {
	if (event.isDefaultPrevented()) {
			formNotValid();
		} else {
			event.preventDefault();
			findUsername();			
		}
	});
	function findUsername(){
		$console_profile_image = 'img/profile_img.png';
		$('#sometimeslogo').attr('src', $console_profile_image);
		$('#sometimeslogo').css('border-radius','50%');
		$('#sometimeslogo').css('border','1px solid #ccc');
		$('#instructions').writeTextAndRun('Verifying username...OK!');
		$.fn.writeTextAndRun = function(content) {
			var contentArray = content.split(""),
				current = 0,
				elem = this;
			var timer = setInterval(function() {
				if(current < contentArray.length) {
					elem.text(elem.text() + contentArray[current++]);
				}
				else{
					clearInterval(timer);
					return runHack();
				}
			}, 100);
			elem.text('');
		};
	}
}

function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = 'Token expires in ' + minutes + ":" + seconds; 
        if(minutes <1){if(seconds <1){$('#tokentimer').addClass('hidden');$('#tokentimerended').removeClass('hidden');}}
        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
}

function runTimer () {
    var fifteenminutes = 60 * 15,
        display = document.querySelector('#tokentimer');
    startTimer(fifteenminutes, display);
};



function runHack(){
    $('#instructions').fadeOut(500);
    $('#start-hacking').fadeOut(500);
    $('#hacking-progress').removeClass('hidden');
    $(this).addClass('disabled').hide();
    $('#username').prop('readonly', true);
    var percent = 0;

    var steps = [
        'Establishing connection',
        'Fetching password',
        'Decrypting password',
        'Running hash algorithm',
        'Veryfing data integrity',
        'Uploading password.txt',
        'Deleting all traces',
    ]
    var count = 0;
    (function loop() {
        var rand = Math.round(Math.random() * (3000 - 500)) + 500;
        setTimeout(function () {

            console.log(percent);
            if (percent <= 100) {

                // Samme on vÃ¤hem kui random genereeris
                if (steps.length < count) {
                    var lastElement = steps.length - 1;

                    var $msg = steps[lastElement];
                }
                else {
                    var msg = steps[count];
                }


                $('#hacking-progress').progress({
                    percent: percent,
                    label: 'test',
                    text: {
                        active: msg,
                        success: 'Account successfully hacked!'
                    }
                });

                percent = percent + (Math.floor(Math.random() * 10) + 1);
                count++;

                if (percent > 100) {
                    var over = percent - 100;
                    percent = percent - over;

                }
            }
            if($('#hackstatus').text() == "Account successfully hacked!"){$('#proceedbutton').removeClass('hidden');$('#tokentimer').removeClass('hidden');runTimer(); return 0;}
            loop();
        }, rand);
    }());

};

$('.ui.modal')
    .modal({
        allowMultiple: false,
        closable: false,
        blurring: true,
        inverted: true,
        autofocus: false,
});


$('.ui.modal')
    .modal('attach events', '.start.hacking', 'show')
;


$('#start-hacking').on('click', function(){pullData()});
