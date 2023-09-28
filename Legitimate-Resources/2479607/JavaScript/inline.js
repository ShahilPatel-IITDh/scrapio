
  var searchbar = $(".search-bar");
  $(".search-btn").on("click", function(){
    $(searchbar).addClass("active");


    $("body").addClass("overflowhidden");
    $(".search-overlay").addClass("active");
  })

  $(".search-overlay").on("click", function(){
    $(".search-bar").removeClass("active");
    $(this).removeClass("active");
    $("body").removeClass("overflowhidden");
  })


  $(".search-btn").on("click", function(){
    $(".search-bar form input").focus();
  })
  
  $(".close-button-search").on("click", function(){
    $(".search-bar").removeClass("active");
    $(".search-overlay").removeClass("active");
    $("body").removeClass("overflowhidden");
  })
