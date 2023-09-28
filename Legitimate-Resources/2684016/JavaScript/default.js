$(document).ready(function(){
	
	
	
	$('.openRoom').on("click", function(){
		
		$('.openRoom').addClass('outFocus');
		var roomId = $(this).attr('room-id');
		$('.openRoom[room-id='+roomId+']').removeClass('outFocus');
		
		$('.appBigContainer').slideUp();
		
		$('.appBigContainer[open-room='+roomId+']').slideDown();
		
		
		/*var imgIds = new Array();
		alert(roomId);

		$("[room-id='+roomId+'] .owl-carousel .item").each(function(){
		    imgIds.push($(this).html());
		});
		
		console.log(imgIds);
		
		//var slideshow = $('[room-id='+roomId+'] .owl-carousel').html();
		//$('.appBigContainer .owl-carousel').html(slideshow);*/
		
	});
	
	$('.closeIcon').on("click", function(){
		$('.appBigContainer').slideUp();
	});
	
	
	
	
});