$(document).ready( function () {

	// Редактирование даты создания
	$('.date-create').bind('dblclick', function() {
		var date_dom = $(this);
		var id = /date-create-(\d+)/.exec(this.className)[1];
		var datetime = date_dom.attr('formated-date');
		date_dom.html('');
		date_dom.after('<input type="datetime-local"/>');
		var input = date_dom.next('input');
		input.val(datetime).focus();
		
		input.bind('blur', function() {
			var setdate = $(this).val();
			var module = date_dom.attr('module');
			$.getJSON("/editlog/update-date-create.html", { id: id, module: module, datetime: setdate }, function(response){
				if ( response ) {
					date_dom.attr('formated-date', response.date1);
					date_dom.html(response.date2);
					input.remove()
				}
			})
		})
	})
	
	// Редактирование даты изменения
	$('.date-edit').bind('dblclick', function() {
		var date_dom = $(this);
		var id = /date-edit-(\d+)/.exec(this.className)[1];
		var datetime = date_dom.attr('formated-date');
		date_dom.html('');
		date_dom.after('<input type="datetime-local"/>');
		var input = date_dom.next('input');
		input.val(datetime).focus();
		
		input.bind('blur', function() {
			var setdate = $(this).val();
			var module = date_dom.attr('module');
			$.getJSON("/editlog/update-date-edit.html", { id: id, module: module, datetime: setdate }, function(response){
				if ( response ) {
					date_dom.attr('formated-date', response.date1);
					date_dom.html(response.date2);
					input.remove()
					
				}
			})
		})
	})
	
})