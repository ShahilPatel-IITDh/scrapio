
$(document).ready(function () {
    $("#SearchInput").autocomplete({
        source: function (request, response) {
            $.ajax({
                url: "/EpiserverFindSearchPage/GetSuggestions",
                data: JSON.stringify({ term: $('#SearchInput').val() }),
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataFilter: function (data) { return data; },
                success: function (data) {
                    response($.map(data, function (item) {

                        return {
                            value: item
                        }
                    }))
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {

                }
            });
        },
        open: function (event, ui) {
            
        },
        focus: function (event, ui) {
            event.target.value = ui.item.label;
        },

        minLength: 2
    });
});
