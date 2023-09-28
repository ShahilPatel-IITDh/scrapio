//animation//animation//animation//animation//animation
//animation//animation//animation//animation//animation
//animation//animation//animation//animation//animation

$(function() {

$("#more-people").click(function(event) {
  pspsps();
});


$("#less-people").click(function(event) {
  pspsps();
});
  // setup before functions
  var typingTimer;                //timer identifier
  var doneTypingInterval = 300;  // time in ms, 5 second for example
  var $input = $(".AnimeInput");

  //on keyup, start the countdown
  $input.on("keyup", function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  });

  //on keydown, clear the countdown 
  $input.on("keydown", function () {
    clearTimeout(typingTimer);
  });

  // user is "finished typing," do something
  function doneTyping() {
    $("#billcoinAnime").fadeOut(1);
    $("#stackAnime").fadeOut(1);
    $("#coinAnime").fadeOut(1);

    var bill  = $input.val();
    // var date = new Date();
    // var birthYear = date.getFullYear() - age;

    if (!bill || bill >= 0 && bill <= 100)
    { 
      $("#coinAnime").fadeIn('slow');
    }
    else if (bill >= 101 && bill <= 1000)
    {
      $("#billcoinAnime").fadeIn('slow');
    }
    else if (bill >= 1001)
    {
      $("#stackAnime").fadeIn('slow');
    }
    }
});

$(function() {
  // setup before functions
  var typingTimer;                //timer identifier
  var doneTypingInterval = 300;  // time in ms, 5 second for example
  var $input = $(".perPerson");

  //on keyup, start the countdown
  $input.on("keyup", function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(doneTyping, doneTypingInterval);
  });

  //on keydown, clear the countdown 
  $input.on("keydown", function () {
    clearTimeout(typingTimer);
  });

  // user is "finished typing," do something
  function doneTyping() {
    $(".perPersonText").fadeOut(1);
    $(".perPersonText").fadeOut(1);

    var people  = $input.val();
    // var date = new Date();
    // var birthYear = date.getFullYear() - age;

    if (people > 1)
    {
      $(".perPersonText").fadeIn(1);
    }
    }
});

function pspsps(){
  var $input = $(".perPerson");
  var people  = $input.val();

  if (people <= 1)
    {
      $(".perPersonText").fadeOut(1);
    }
  else if(people >= 2){
    $(".perPersonText").fadeIn(1);
  }
};

function changeHandler(val)
  {
    if (Number(val.value) > 100)
    {
      val.value = 100
    }
  }