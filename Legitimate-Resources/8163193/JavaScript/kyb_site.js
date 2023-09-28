$(document).ready(function(){
    
    $('input[type=submit]').addClass('submitBtn');
	$('input[type=text]').addClass('textbox');
    $('input[type=file]').addClass('uploadField');
	$('input[type=radio]').addClass('radio');
	$('.submitBtn').click(function(){
		$(this).parents('form').submit();
		return false;
	});
    $('form').attr('autocomplete','off');
    
    $('table tr').each(function(){
        $(this).find('td:first').addClass('firstCell');
        $(this).find('td:first').next('td').addClass('secondCell');
    });
    
    $('td').attr('valign','top');
    
    $('form > div').not('.fieldsGroup').addClass('formRow');
    $('.fieldsGroup > div').addClass('formRow');
    
    //tooltip
	$(".tooltipTrigger").tooltip({offset:[10,380],position:"bottom left",relative:true});
    
    //legal info
    var licenseInit = function(){
        var license = $('input[name=license]:checked').val();
        if(license == 'yes')
        {
            $('.licenseField,#legal_upload_license').show();
        }
        else if(license == 'no')
        {
            $('.licenseField,#legal_upload_license').hide();
        }
        else
        {
            $('.licenseField,#legal_upload_license').hide();
        }
    };
    licenseInit();
    
    $('input[name=license]').change(function(){
        licenseInit();
    });
    
    //account holder
    var isChairmanInit = function(){
        var isChairman = $('input[name=isChairman]:checked').val();
        if(isChairman == 'y')
        {
            $('#personalInfo').show();
            $('#upload_attorney').hide();
        }
        else if(isChairman == 'n')
        {
            $('#personalInfo').hide();
            $('#upload_attorney').show();
        }
        else
        {
            $('#personalInfo').hide();
            $('#upload_attorney').hide();
        }
    };
    isChairmanInit();
    
    $('input[name=isChairman]').change(function(){
        isChairmanInit();
    });    
 
  
    
});