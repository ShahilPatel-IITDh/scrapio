jQuery(".donate-amount").change(function() {
	var $amount = this.value;
	jQuery('input[name$="amount"]').val($amount);
	jQuery('input[name$="Custom Donation Amount"]').on("keyup", function() {
		var sn = jQuery(this).val();
		jQuery('input[name$="amount"]').val(sn);
	});
});
jQuery("a#donate-popup").click(function() {
	jQuery(".donate-amount").val(20);
	jQuery('form.sai input[name$="amount"]').val(20);
	jQuery('.custom-donate-amount').hide();
	jQuery('input[name$="Custom Donation Amount"]').val('');
});
function ValidateEmail(email) {
	var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	return expr.test(email);
}; 
jQuery('.paypal-submit-form').submit(function(e) {
	jQuery("label.error").hide();
	jQuery(".error").removeClass("error");
	var $formid = jQuery(this).attr('id');
	jQuery('form#'+$formid+' #message').empty();
	var $userfield = jQuery("form#"+$formid+" #username");
	var $emailfield = jQuery("form#"+$formid+" #email");
	var $amount = jQuery("form#"+$formid+" input[name$=amount]").val();
	var $itemnumber = jQuery("form#"+$formid+" input[name$=item_number]").val();
	var $phone = jQuery("form#"+$formid+" #phone").val();
	var $reg_status = jQuery("form#"+$formid+" #reg-status").val();
	var $event_reg_date = jQuery("form#"+$formid+" #event-reg-date").val();
	var $postname = jQuery("form#"+$formid+" #postname").val();
	var $address = jQuery("form#"+$formid+" #address").val();
	var $notes = jQuery("form#"+$formid+" #notes").val();
	var $lastname = jQuery("form#"+$formid+" #lastname").val();
	var platinum_ticket_select = jQuery("#platinum-ticket").val();
	var gold_ticket_select = jQuery("#gold-ticket").val();
	var silver_ticket_select = jQuery("#silver-ticket").val();
	var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	var isValid = true;
	var select_ticket = '';
	if(jQuery('.table-tickets').length)
	{
		jQuery(".premium-tickets").each(function(index, element) {
    if(jQuery(this).val()=="0"&&select_ticket=='')
		{
			isValid = false;
			jQuery('form#'+$formid+' #message').empty();
			jQuery('form#'+$formid+' #message').append("<div class=\"alert alert-error\">Please select ticket</div>");
			//return false;
		}
		else
		{
			isValid = true;
			select_ticket = '1';
			jQuery('form#'+$formid+' #message').empty();
		}
  	});
	}
	if (jQuery.trim($userfield.val()) == '') {
		isValid = false;
		jQuery('form#'+$formid+' #message').append("<div class=\"alert alert-error\">You must enter your name</div>");
		return false;
	} else if(!ValidateEmail($emailfield.val())) {
		isValid = false;
		jQuery('form#'+$formid+' #message').append("<div class=\"alert alert-error\">You must enter your email</div>");
		return false;
	} 
	else 
	{
			if(isValid!=false)
		{
			jQuery('form#'+$formid+' #message').empty();
			if($amount!=''||$amount!=0) 
			{
				jQuery('form#'+$formid+' #message').append("<div class=\"alert alert-success\">You are redirecting to paypal</div>"); 
			}
			else 
			{
				jQuery('form#'+$formid+' #message').append("<div class=\"alert alert-success\">Registering you for Event</div>"); 
			}
		}
		jQuery.ajax({
			type: 'POST',
			url: urlajax.ajaxurl,
			async: false,
			data: {
				action: 'imic_event_grids',
				itemnumber: $itemnumber,
				reg_date: $event_reg_date,
				reg_status: $reg_status,
				name: $userfield.val(),
				lastname: $lastname,
				email: $emailfield.val(),
				amount: $amount,
				phone: $phone,
				address: $address,
				notes: $notes,
				posttype: $postname,
				platinum: platinum_ticket_select,
				gold: gold_ticket_select,
				silver: silver_ticket_select
			},
			success: function(data) {
			},
			complete: function() {
			}
	
	 	});
   	}
	if (isValid == false) {	e.preventDefault(); }
});
jQuery(document).ready(function($){
	var tickets_total_amount = parseInt(Number($(".tickets-total-cost").find("span").text()));
	if(tickets_total_amount!=0||tickets_total_amount!='')
	{
		$("#register-event").val(cause.paypal);
	}
	else
	{
		$("#register-event").val(cause.register);
	}
	$(".premium-tickets").on("change", function(){
		var total_cost = '';
		var ticket_price = $(this).parent().parent().find(".ticket-price").text();
		var strip_price = ticket_price.replace(/\D/g,'');
		if(strip_price!=''||strip_price!=0)
		{
			var ticket_selected = $(this).val();
			var ticket_cost_calculated = strip_price*ticket_selected;
			$(this).parent().parent().find(".ticket-cost-calculated").text(ticket_cost_calculated);
		} //alert(total_cost);
		$(".ticket-cost-calculated").each(function(index, element) {
			if(!isNaN(parseInt($(this).text()))) 
			{
      	total_cost = Number(total_cost) + Number($(this).text());
			}
    });
		$(".tickets-total-cost").find("span").remove();
		$(".tickets-total-cost").append("<span>"+total_cost+"</span>");
		$("input[name=amount]").val(total_cost);
		var tickets_total_amount_inner = parseInt(Number($(".tickets-total-cost").find("span").text()));
		var paypal_url = $("#paypal-url").val();
		var normal_url = $("#normal-url").val();
		if(tickets_total_amount_inner!=0||tickets_total_amount_inner!='')
		{
			$("#register-event").val(cause.paypal);
			$("#register-event").closest("form").attr('action', paypal_url);
		}
		else
		{
			$("#register-event").val(cause.register);
			$("#register-event").closest("form").attr('action', normal_url);
		}
	});
});