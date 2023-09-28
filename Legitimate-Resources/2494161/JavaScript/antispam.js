$(document).ready(function(){
  $('.sc_frm_antispam').each(function(){
    var frm=this;
    $(frm).bind('submit',function(){
      $.ajax({'url':'/libs/ajax/antispam.php','data':{'getHash':$('input[type="hidden"][name^="frm_id"]',frm).val()},'async':false,'dataType':'json','success':function(data){
        $(frm).append('<input type="hidden" name="frm_antispam" value="'+data+'" />');
//        alert(data);
      }});
//      return false;
    });
  });

});