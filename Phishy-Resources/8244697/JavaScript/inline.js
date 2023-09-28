
if(new URLSearchParams(location.search).get('error')) $( "body" ).append( "<div id='messagestack'></div>" );
$(function() {
rcmail.init();
});
