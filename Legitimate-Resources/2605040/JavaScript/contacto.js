$('#botonera-chat').click(function (event) {
    event.preventDefault();

    $('#modal-contactar').modal({
        keyboard: true,
        backdrop: false,
        focus: true
    });

    $('#modal-contactar').show();
});

$('#frmContacto').submit(function (event) {
    if ($('#frmContacto').valid()) {
        event.preventDefault();

        $.ajax({
            type: "POST",
            url: "/home/contactar",
            content: "application/json; charset=utf-8",
            dataType: "json",
            data: $(this).serialize(),
            success: function (r) {
                if (r.success === true) {

                    $('#modal-contactar').hide();

                    $('#msgbox-img-error').addClass('d-none');
                    $('#msgbox-img-ok').removeClass('d-none');

                    $('#msgboxText').text(r.message);

                    limpiarCamposContacto();

                    $('#msgbox').modal({
                        keyboard: true,
                        backdrop: false,
                        focus: true
                    });
                }
                else {
                    $('#modal-contactar').hide();

                    $('#msgboxText').text(r.message);

                    $('#msgbox-img-ok').addClass('d-none');
                    $('#msgbox-img-error').removeClass('d-none');

                    $('#msgbox').modal({
                        keyboard: false,
                        backdrop: false,
                        focus: true
                    });
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Error al contactar!!');
            }
        });
    }
});

function limpiarCamposContacto() {
    $('#contacto-nombre').val('');
    $('#contacto-telefono').val('');
    $('#contacto-email').val('');
    $('#contacto-asunto').val('');
    $('#contacto-mensaje').val('');
}
