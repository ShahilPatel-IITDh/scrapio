jQuery(document).ready(function($){   
    
    var radioValue = $("input[name='lead_call_buttons_settings[lead_call_buttons_general_bg-color]']:checked").val();
    
    if(radioValue == 0){
        $('#lead_call_buttons_general_bg-sl-color').closest('tr').show();
        $('#lead_call_buttons_general_bg-gd-color1').closest('tr').hide();
        $('#lead_call_buttons_general_bg-gd-color2').closest('tr').hide();        
    } else {
        $('#lead_call_buttons_general_bg-sl-color').closest('tr').hide();        
        $('#lead_call_buttons_general_bg-gd-color1').closest('tr').show();
        $('#lead_call_buttons_general_bg-gd-color2').closest('tr').show();        
    } 
   
    $('input:radio[name="lead_call_buttons_settings[lead_call_buttons_general_bg-color]"]').change(function() {
        if ($(this).val() == '0') {
            $('#lead_call_buttons_general_bg-sl-color').closest('tr').show();
            $('#lead_call_buttons_general_bg-gd-color1').closest('tr').hide();
            $('#lead_call_buttons_general_bg-gd-color2').closest('tr').hide();       
        } else {
            $('#lead_call_buttons_general_bg-sl-color').closest('tr').hide();        
            $('#lead_call_buttons_general_bg-gd-color1').closest('tr').show();
            $('#lead_call_buttons_general_bg-gd-color2').closest('tr').show();        
        }
    });  
    
    $(".section-end").closest('tr').addClass('section-line');
          
});