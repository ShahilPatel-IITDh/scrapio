$(document).ready( function () {
	
	$('.show-video').bind('click', function(){
		var id = /show-video-(\d+)/.exec(this.className)[1];
		showVideo(id)
	})
	
} )

function showVideo (id) {
	
	kl83.blind_window();
	$('#blind-window').attr('title','Закрыть')	
	
	$('body').append('<div id="video-window"></div>');
	var p_left	= ($('body').width()-650)/2;
	var p_top	= (($(window).height() - 500)/2);	
	$('#video-window').css({
		'position':'fixed',
		'left': p_left+'px',
		'top': p_top+'px',
		'width':'650px',
		'height':'500px',
		'background-color':'#fff',
		'box-shadow':'0 0 4px RGBa(0,0,0,0.4)',
		'z-index':'1001'
	})
	
	$('body').append('<div id="video-title"></div>');
	$('#video-title').css({
		'position':'fixed',
		'left': p_left+'px',
		'top': p_top-30+'px',
		'width':'650px',
		'font-size':'130%',
		'color':'#fff',
		'z-index':'1002'
	})
	
	$.ajax ( { type: 'post', url: '/videogallery/get-video.html', dataType: 'json', async: true,
		data: { id:id },
		success: function ( data ) {
			if ( data.video != '' ) {
				$('#video-window').html(data.video)
			} else {
				$('#video-window').html("Файл не найден")
			}
			$('#video-title').html(data.title)
		}
	})
		
	$('#blind-window').bind('click', function () { closeVideo() } )
}

function closeVideo () {
	kl83.blind_window_hide();
	$('#video-window').remove()
	$('#video-title').remove()
}