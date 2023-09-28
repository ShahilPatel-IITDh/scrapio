$(document).ready(function() {
    $('a.search-navigator-tab').click(function() {
        if (!isSearchTabAlreadySelected(this)) {
            switchSearchTabs();
        }
    });
});

function isSearchTabAlreadySelected(tab) {
    return $(tab).hasClass('tab-navegue-ativo') || $(tab).hasClass('tab-refinar-ativo');
}

function switchSearchTabs() {
    $('a.search-navigator-tab').each(function(i, o) {
        if ($(o).hasClass('tab-navegue')) {
            $(o).removeClass('tab-navegue');
            $(o).addClass('tab-navegue-ativo');
            $('div.search-multiple-navigator').hide();
            $('div.search-single-navigator').show();
        }
        else {
            if ($(o).hasClass('tab-navegue-ativo')) {
                $(o).removeClass('tab-navegue-ativo');
                $(o).addClass('tab-navegue');
                $('div.search-single-navigator').hide();
                $('div.search-multiple-navigator').show();
            }
            else {
                if ($(o).hasClass('tab-refinar')) {
                    $(o).removeClass('tab-refinar');
                    $(o).addClass('tab-refinar-ativo');
                }
                else {
                    if ($(o).hasClass('tab-refinar-ativo')) {
                        $(o).removeClass('tab-refinar-ativo');
                        $(o).addClass('tab-refinar');
                    }
                }
            }
        }
    });
}