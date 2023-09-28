
    var $inputs = $(":input");
    $inputs.on('input', function () {
        var self = this;
        var matches = $('input[name="' + this.name + '"]');
        var selfIndex = matches.index($(self));
        matches.each(function (index, element) {
            if (selfIndex !== index) {
                $(element).val($(self).val());
            }
        });
    });
