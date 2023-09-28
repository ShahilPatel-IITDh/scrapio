$(document).on('click touchend', 'a[data-trrrfrwo]', function (e) {
    e.preventDefault();
    window.open($(this).data('trrrfrwo'));
});

$(document).on('click touchend', 'a[data-trrrfrloc]', function (e) {
    e.preventDefault();
    window.location = $(this).data('trrrfrloc');
});
