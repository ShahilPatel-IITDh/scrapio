
        $(function () {
            if ($('#modal-mentor').length) {
                $('#modal-mentor').load('/lille/modal-mentor', function () { initForm(); });
            }
        });
    