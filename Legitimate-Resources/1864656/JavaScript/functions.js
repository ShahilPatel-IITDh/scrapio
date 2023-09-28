function loop() {
    $('#balloon').animate({
        'top': '110'
    }, {
        duration: 1500,
        complete: function() {
            $('#balloon').animate({
                top: 100
            }, {
                duration: 1500,
                complete: loop
            });
        }
    });

    $('<div/>').text('exiting loop').appendTo($('.results'));
}
loop();