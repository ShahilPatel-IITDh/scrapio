jQuery.validator.addMethod("greaterThanDate", function(value, element, params) {
	if($(params[0]).val() != '') {
		if (!/Invalid|NaN/.test(new Date(value))) {
			return new Date(value) > new Date($(params[0]).val());
		}
		return isNaN(value) && isNaN($(params[0]).val()) || (Number(value) > Number($(params[0]).val()));
	};
	return true; 
},'Must be greater than {1}.');

jQuery.validator.addMethod("greaterThanTime", function(value, element, params) {
	var d1 = new Date(2017, 1, 1, parseInt($(params[0]).val()), parseInt(value), 0, 0);
	var d2 = new Date(2017, 1, 1, parseInt($(params[2]).val()), parseInt($(params[3]).val()), 0, 0);
	return d1 > d2;
},'Must be after {1}.');

jQuery.validator.addMethod("lessThanTime", function(value, element, params) {
	var d1 = new Date(2017, 1, 1, parseInt($(params[0]).val()), parseInt(value), 0, 0);
	var d2 = new Date(2017, 1, 1, parseInt($(params[2]).val()), parseInt($(params[3]).val()), 0, 0);
	return d1 < d2;
},'Must be earlier than {1}.');