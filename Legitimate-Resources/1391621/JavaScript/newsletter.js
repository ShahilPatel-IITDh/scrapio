$(document).ready(function(){ 
    $('#envio_newsletter').submit(agregarnewsletter);
});


function removeTags(string){
  return string.replace(/(?:<(?:script|style)[^>]*>[\s\S]*?<\/(?:script|style)>|<[!\/]?[a-z]\w*(?:\s*[a-z][\w\-]*=?[^>]*)*>|<!--[\s\S]*?-->|<\?[\s\S]*?\?>)[\r\n]*/gi, '');
}

function agregarnewsletter(e){
    e.preventDefault();
    //console.error($('#id_confirm_laws').checked);
    if ($('#id_confirm_laws').attr('checked',true)){
        jQuery.ajax('/newsletter', {
            complete: function(jqXHR) {
                alert(JSON.parse(jqXHR.responseText).error);
                $("#mail-nl").val("");
            },
            data: $(this).serialize(),
            type: 'POST'
        });
    }
}
