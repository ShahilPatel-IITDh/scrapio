



function initMenus() {	
	$('#main-sidebar-wrapper ul.menu ul').hide();
	$.each($('ul.menu'), function(){
		$('#showme').show();
	});

	$('#main-sidebar-wrapper ul.menu li strong').click(
		function() {
			var checkElement = $(this).next();
			var parent = this.parentNode.parentNode.id;

			if($('#' + parent).hasClass('noaccordion')) {
				$(this).next().slideToggle('normal');
				return false;
			}
			if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
				if($('#' + parent).hasClass('collapsible')) {
					$('#' + parent + ' ul:visible').slideUp('normal');
				}
				return false;
			}
			if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
				$('#' + parent + ' ul:visible').slideUp('normal');
				checkElement.slideDown('normal');
				return false;
			}
		}
	);
}

$(document).ready(function(){

	initMenus();

});

function test(obj,msg){
	var regex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
	if (regex.test(obj.value)){
		return true;
	}else{
		alert(msg);
		obj.focus();
		return false;
	}
}

function checkempty(obj,msg){
	if(obj.value==""){
		alert(msg);
		obj.focus();
		return false;
	}
}

function checkint(obj,msg){
	if(isNaN(obj.value)){
		alert(msg);
		obj.focus();
		return false;
	}
}

function checkqForm(){
	if(checkempty(document.frminq.yname,"Information - Enter Full Name")==false) return false;
	if(test(document.frminq.emailadd,"Information - Enter Valid Email")==false) return false;
	if(checkempty(document.frminq.cname,"Information - Enter Company Name")==false) return false;
	if(checkempty(document.frminq.country,"Information - Select your Country")==false) return false;
	if(checkempty(document.frminq.telephone,"Information - Enter Phone No.")==false) return false;
	return true;
}


function newsletter(){
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var email = $("#substxt").val();
	if( reg.test(email) ){
		return true;		
	}else{
		alert("Please enter a valide email address.");
		return false;
	}
}


function validateForm(fields, error){
	var length = fields.length;
	var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	var returnval = true;
	for( i=0; i<length; i++ ){
		if( fields[i] == 'email' ){
			if( document.getElementById(fields[i]).value.length < 3 || reg.test(document.getElementById(fields[i]).value)==false ){
				$("#_in_" + fields[i]).html(error).fadeIn('fast');
				returnval = false;
			}else{
				$("#_in_" + fields[i]).fadeOut('slow');
			}
		}else{
			if( document.getElementById(fields[i]).value.length < 1 ){
				$("#_in_" + fields[i]).html(error).fadeIn('fast');
				returnval = false;
			}else{
				$("#_in_" + fields[i]).fadeOut('slow');
			}
		}
	}
	return returnval;
}
