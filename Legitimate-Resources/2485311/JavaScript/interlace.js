  $( ".widgets a:first-of-type" ).addClass( "selected" );

  $( "#showinstagram" ).click(function() {
    $( "a" ).removeClass( "selected" );
    $( "#showinstagram" ).addClass( "selected" );
    $( ".dribbble-shots" ).slideUp("fast", "linear");
    $( ".flickr-photos" ).slideUp("fast", "linear");
    $( ".latest-tweets" ).slideUp("fast", "linear");
    $( ".instagram-photos" ).slideToggle( "fast", "linear");
    $( ".liked-posts" ).slideUp("fast", "linear");
    $( ".following" ).slideUp("fast", "linear");
    $( ".group-members" ).slideUp("fast", "linear");
  });
  $( "#showdribbble" ).click(function() {
    $( "a" ).removeClass( "selected" );
    $( "#showdribbble" ).addClass( "selected" );
    $( ".instagram-photos" ).slideUp("fast", "linear");
    $( ".flickr-photos" ).slideUp("fast", "linear");
    $( ".latest-tweets" ).slideUp("fast", "linear");
    $( ".dribbble-shots" ).slideToggle( "fast", "linear");
    $( ".liked-posts" ).slideUp("fast", "linear");
    $( ".following" ).slideUp("fast", "linear");
    $( ".group-members" ).slideUp("fast", "linear");
  });
  $( "#showflickr" ).click(function() {
    $( "a" ).removeClass( "selected" );
    $( "#showflickr" ).addClass( "selected" );
    $( ".instagram-photos" ).slideUp("fast", "linear");
    $( ".latest-tweets" ).slideUp("fast", "linear");
    $( ".dribbble-shots" ).slideUp("fast", "linear");
    $( ".flickr-photos" ).slideToggle( "fast", "linear");
    $( ".liked-posts" ).slideUp("fast", "linear");
    $( ".following" ).slideUp("fast", "linear");
    $( ".group-members" ).slideUp("fast", "linear");
  });
  $( "#showtweets" ).click(function() {
    $( "a" ).removeClass( "selected" );
    $( "#showtweets" ).addClass( "selected" );
    $( ".dribbble-shots" ).slideUp("fast", "linear");
    $( ".instagram-photos" ).slideUp("fast", "linear");
    $( ".flickr-photos" ).slideUp("fast", "linear");
    $( ".latest-tweets" ).slideToggle( "fast", "linear");
    $( ".liked-posts" ).slideUp("fast", "linear");
    $( ".following" ).slideUp("fast", "linear");
    $( ".group-members" ).slideUp("fast", "linear");
  });
  $( "#showlikedposts" ).click(function() {
    $( "a" ).removeClass( "selected" );
    $( "#showlikedposts" ).addClass( "selected" );
    $( ".liked-posts" ).slideToggle("fast", "linear");
    $( ".dribbble-shots" ).slideUp( "fast", "linear");
    $( ".instagram-photos" ).slideUp("fast", "linear");
    $( ".flickr-photos" ).slideUp("fast", "linear");
    $( ".latest-tweets" ).slideUp( "fast", "linear");
    $( ".following" ).slideUp("fast", "linear");
    $( ".group-members" ).slideUp("fast", "linear");
  });
  $( "#showfollowing" ).click(function() {
    $( "a" ).removeClass( "selected" );
    $( "#showfollowing" ).addClass( "selected" );
    $( ".following" ).slideToggle("fast", "linear");
    $( ".dribbble-shots" ).slideUp( "fast", "linear");
    $( ".instagram-photos" ).slideUp("fast", "linear");
    $( ".flickr-photos" ).slideUp("fast", "linear");
    $( ".latest-tweets" ).slideUp( "fast", "linear");
    $( ".liked-posts" ).slideUp("fast", "linear");
    $( ".group-members" ).slideUp("fast", "linear");
  });
  $( "#showgroupmembers" ).click(function() {
    $( "a" ).removeClass( "selected" );
    $( "#showgroupmembers" ).addClass( "selected" );
    $( ".group-members" ).slideToggle("fast", "linear");
    $( ".dribbble-shots" ).slideUp( "fast", "linear");
    $( ".instagram-photos" ).slideUp("fast", "linear");
    $( ".flickr-photos" ).slideUp("fast", "linear");
    $( ".latest-tweets" ).slideUp( "fast", "linear");
    $( ".liked-posts" ).slideUp("fast", "linear");
    $( ".following" ).slideUp("fast", "linear");
   });