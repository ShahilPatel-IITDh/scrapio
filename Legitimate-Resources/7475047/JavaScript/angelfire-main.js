// Scripts for talking things on page
var scripts = {
    woofers: Array("My Favorite FTP program? Fetch of course!", "Web design doesn't have to be RUFF!", "Woof!", "Give me a bone.  Or some of your pizza. WOOF!"),
    balloon: Array("Look out for that rocket!", "EEEEK! Stop clicking us!  This is scary!", "Dive! Dive!", "Look out below!", "Well there goes Billy.  Nice job."),
    sheep:   Array("Baaaah. The grass is greener over here.", "Baaah Humbug.", "*chomp chomp*", "I haven't moved from this spot in a while..."),
    acorn:   Array("For a talking squirel, I don't seem to be able to do much else...", "Gotta collect them all! AND THEN EAT THEM!", "Nutz are delicious!", "YOU CLICKED ME!!!  'giggle'")
}

/************************************************/
/* Redefinining jQuery's Animation interval because of the 
 * slow movement of the airplane can cause unnneeded performance
 * hits:
 * http://stackoverflow.com/questions/459224/jquery-animate-and-browser-performance
 ***/
$(document).ready(function() {
    /*********************************************************************/
    // Facebook Initialization
    

    /*********************************************************************/

    // Set the currently selected tab to selected.
    var locsplit = location.pathname.split("/");
    var whereami = locsplit[1];
    switch (whereami) {
        case "":
            whereami = "cpanel";
            break;
        case "cgi-auth":
            whereami = "addons";
            break;
        case "community":
            whereami = "community";
            break;
        case "cgi-bin":
            whereami = "help";
            break;
        default:
            break;
    }
	

    // make social login buttons open EOL msg
    $("a.socialauth").click( function() {
        $("#socialEolMsg").toggle();
    });

    $("#nav_"+whereami).addClass('selectedPage');

    // Panel sliders
    $('.regBtn').click(function() {
        $('.selectedBtn').removeClass('selectedBtn');
        $(this).addClass('selectedBtn');

        var i = parseInt(this.id.replace("slideBtn", ""));
        $(".cover").animate({
            left: (i * 765 * -1) + "px"
        }, 800);

        // Set the URL location hash so we can load this address and get this slide again
        location.hash = 'slide' + (i + 1);
        return false;
    });

    // A panel may be referenced in location.hash, in which case that panel should be shown immediately
    var slideNum = location.hash.replace('#slide', '');
    // slideBtn0
    $("#slideBtn" + (slideNum - 1)).click();

    $('.webonBtn').click(function() {
        $('.selectedBtn').removeClass('selectedBtn');
        $(this).addClass('selectedBtn');

        var i = parseInt(this.id.replace("slideBtn", "")) -1;
        var moveLeftAmt = (i * $('.styles-panel:first', '#styles-preview-window').outerWidth(true) * -1);

        $(".cover").animate({
            left:  moveLeftAmt + "px"
        }, 600);
        
        return false;
    });

    $("#styles-preview-window").find("img").mouseover(function() {
        $("#image1").attr("src", this.src.replace("125x90", "260x199"));
    });

    $('.mobile-plan-btn').click(function() {
        var i = parseInt(this.id.replace("mobilePlanBtn", ""));
        var $me = $(this);
        var $desc = $("#mobilePlan" + i);
        var isShow = !$me.hasClass("selected");

        // Stop Animations and roll up everyone.
        $(".mobilePlan").stop(true, true).slideUp();
        $(".mobile-plan-btn").removeClass("selected").css({"background-position": "206px 7px"});

        if (isShow) {
            $me.addClass("selected");
            $me.css({"background-position": "206px -13px"});
            $desc.slideDown();
        }

        return false;
    });

    $('.faq-btn').click(function() {
        var i = parseInt(this.id.replace("faqBtn", ""));
        $(".faq").stop().slideUp();
        $("#faq" + i).stop().slideDown();
        return false;
    });


    // Login/Logout buttons
    $('.login-btn').click(function() {
        // Allow everyone but IE6 to display the faded-in login box
        if ($.browser.version != '6.0') {
            $(".loginBOX").fadeIn(150);
            $("#username", ".loginBOX").focus();
            return false;
        }
    });

    $('.logclose-btn').click(function() {
        $(".loginBOX").fadeOut(150);
        return false;
    });


    // Set up the random text generations for the talking things on the page.
    $(".talkie")
    .mousedown(function() {
        var arr = scripts[this.id];
        var ind = Math.floor(Math.random() * arr.length);
        $(this).find(".hiddenMessage").text(arr[ind]);
        $(this).find(".hiddenMessage").add(".word-arrow-down").fadeIn(100);
    })
    .mouseup(function() {
        $(this).find(".hiddenMessage").add(".word-arrow-down").fadeOut(100);
    })
    .click(function(ev) {
        ev.preventDefault();
        return false;
    });
	
	// return false class
	$('.returnFalse').click(function(){
		return false;
	});

    // Animation of airplane.  zoom!
    $("#airplane").css({"top": "160px", "left": "-300px"}).animate({"top": "-100px", "left": "2500px"}, 30000);


    // Balloon-related awesomeness.
    var balloonFun = {
        initialize: function() {
            // bind events.
            $("#balloon")
                .mousedown(function() {
                    //clearTimeout(this.btimer);
                    $("#balloon-widget").stop(true, false).animate({"top": "150px"}, 200);
                    return false;
                })
                .mouseup(function() {
                    $("#balloon-widget").stop(true, false).animate({"top": "30px"}, 500, function() {
                        //balloonFun.setBalloonTimer();
                    });
                });

            //this.setBalloonTimer();
        },

        setBalloonTimer: function() {
            this.btimer = setTimeout(this.moveBalloon, 400);
        },

        moveBalloon: function() {
            // initial position: right: -170, top: 24;
            var x = Math.round(Math.random() * 30 - 170);
            var y = Math.round(Math.random() * 30);
            $("#balloon-widget").animate({"top": y + "px", "right": x + "px"}, 4000, function() {
                balloonFun.setBalloonTimer();
            });
        }
    }

	// modal box for sign up
	
var SPEED = 400;

$(document).ready(function() {
	if (top.location!= self.location) {
          top.location = self.location.href;}
});



    balloonFun.initialize();

    // Select three random callout boxes to display underneath the main content area
    var howManyToShow = 2;
    elementsToShow = $("section", ".randomized").get().sort(
        function() {
            return Math.round(Math.random())-0.5 
        }
    ).slice(0,howManyToShow);

    $(elementsToShow).css('display', 'block');
});
