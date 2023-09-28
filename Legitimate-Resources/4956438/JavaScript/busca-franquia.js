$("#js_estado").change(function() {
    var stateInitials = $(this).val();
    getEstado(stateInitials);
});

function getEstado(state) {  
    htmlOption = "<option selected disabled>Unidade</option>";
    $.get(`/jsgetcidades/${state}`, function(data){

        let newArray = JSON.parse(data).data;

        var j = newArray.length;

        var htmlOption = '<option value="">Cidade</option>';

        for (i=0; i < j; i++) {
            var cidade = newArray[i];

            htmlOption += '<option value="'+cidade+'">'+cidade+'</option>';
        }
        $('#js_cidade').html(htmlOption);
    });
return true;
}
