
function check_poll_form( _form ) {
	
	var count_question = _form.find('.plg-question').length;
	
	var count_answer = 0;
	_form.find('.plg-question').each( function() {
		var count_cheked = $(this).find('input:checkbox:checked').length;
		var comment = $.trim( $(this).find('textarea').val() ) != ""?1:0;
		if ( count_cheked || comment ) count_answer++;
	} )
	
	if ( count_answer < count_question ) {
		alert( 'Вы ответили не на все впоросы!' );
		return false;
	}
	if ( _form.find('.g-recaptcha').length ) {
		var recaptcha_error = 0;
		$.ajax( {
			async: false,
			type: 'post',
			url: '/polls/index.html',
			data: { action: 'check-recaptcha', 'g-recaptcha-response': grecaptcha.getResponse() },
			dataType: 'text',
			success: function(response) {
				if ( response != '1' ) {
					recaptcha_error = 1;
					alert( 'Подтвердите, что вы не робот!' );
				}
			}
		} )
		if ( recaptcha_error ) return false;
	}
	
	return true;
}

$(document).ready( function() {
	
	$('.plg-polls .plg-question .plg-answer label').on( 'click', function() {
		var question = $(this).parents('.plg-question:first');
		var checkbox = $(this).prev('input[type="checkbox"]');
		var answer_avalible = /available-(\d+)/.exec(question.attr('class'))[1];
		var count_cheked = question.find('input[type="checkbox"]:checked').length;
		
		if ( answer_avalible == 1 ) {
			question.find('.plg-answer input[type="checkbox"]').prop('checked', false);
			checkbox.prop('checked', true);			
		} else if ( count_cheked >= answer_avalible ) {
			checkbox.prop('checked', false);
		} else {
			checkbox.prop('checked', true);
		}
	} )
	
	$('.plg-polls .plg-button').click( function() {
		
		var poll_form = $(this).parents('form:first');
		var poll_id = /poll-(\d+)/.exec(poll_form.parents('.plg-polls:first').attr('class'))[1];
		
		if ( check_poll_form(poll_form) ) {
					
			$.cookie('poll_' + poll_id, true, {expires: 7, path:'/'});
			
			$.ajax( {
				async: false,
				type: 'post',
				url: '/polls/index.html',
				data: { action: 'vote-log', poll: poll_id },
				dataType: 'text',
				success: function(response) {
					if ( response != '1' ) alert( 'Ошибка!' )
				}
			} )
			
			poll_form.find('input:checkbox:checked').each( function() {
				answer_id = $(this).val();
				$.ajax( {
					async: false,
					type: 'get',
					url: '/polls/index.html',
					data: { action: 'vote', answer: answer_id },
					dataType: 'text',
					success: function(response) {
						if ( response != '1' ) alert( 'Ошибка!' )
					}
				} )
			} )
			
			poll_form.find('textarea[name^="comment-"]').each( function() {
				var question_id = /comment-(\d+)/.exec($(this).attr('name'))[1];
				var comment_text = $(this).val();
				$.ajax( {
					async: false,
					type: 'post',
					url: '/polls/index.html',
					data: { action: 'vote-comment', question: question_id, comment: comment_text },
					dataType: 'text',
					success: function(response) {
						if ( response != '1' ) alert( 'Ошибка!' );
					}
				} )
			} )
			window.location.reload();
		}
	} )
	
} )