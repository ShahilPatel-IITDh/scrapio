
        var idFromel = $(".fecth-id").each(function () {
            return $(this).attr("id");
        });

        for (var i = 0; i < idFromel.length; i++) {
            test(idFromel[i].id);
        }
        function test(idFromel) {
            var num_cols = 1,
                container = $('#' + idFromel + ' .masonry-block-crs'),
                listItem = 'li',
                listClass = 'masonry';

            container.each(function () {
                var items_per_col = new Array(),
                    items = $(this).find(listItem),
                    min_items_per_col = Math.floor(items.length / num_cols),
                    difference = items.length - (min_items_per_col * num_cols);
                for (var i = 0; i < num_cols; i++) {
                    if (i < difference) {
                        items_per_col[i] = min_items_per_col + 1;
                    } else {
                        items_per_col[i] = min_items_per_col;
                    }
                }
                for (var i = 0; i < num_cols; i++) {
                    +
                        $(this).append($('<ul class="link-list"></ul>').addClass(listClass));
                    for (var j = 0; j < items_per_col[i]; j++) {
                        var pointer = 0;
                        for (var k = 0; k < i; k++) {
                            pointer += items_per_col[k];
                        }
                        $(this).find('.' + listClass).last().append(items[j + pointer]);

                    }
                }
            });
            var num_cols = 1,
                containerst = $('#' + idFromel + ' .masonry-block-st'),
                listItemst = 'li',
                listClassst = 'masonry';
            containerst.each(function () {
                var items_per_col = new Array(),
                    items = $(this).find(listItemst),
                    min_items_per_col = Math.floor(items.length / num_cols),
                    difference = items.length - (min_items_per_col * num_cols);
                for (var i = 0; i < num_cols; i++) {
                    if (i < difference) {
                        items_per_col[i] = min_items_per_col + 1;
                    } else {
                        items_per_col[i] = min_items_per_col;
                    }
                }
                for (var i = 0; i < num_cols; i++) {
                    +
                        $(this).append($('<ul class="link-list"></ul>').addClass(listClassst));
                    for (var j = 0; j < items_per_col[i]; j++) {
                        var pointer = 0;
                        for (var k = 0; k < i; k++) {
                            pointer += items_per_col[k];
                        }
                        $(this).find('.' + listClassst).last().append(items[j + pointer]);

                    }
                }
            });
        }
        document.addEventListener("DOMContentLoaded", function (event) {
            var classFromloop = $(".fecth-id").each(function () {
                return $(this).attr("id");
            });
            for (i = 0; i < classFromloop.length; i++) {

                var elem = document.querySelector('#' + classFromloop[i].id + ' .masonry');
                var msnry = new Masonry(elem, {
                    // options
                    itemSelector: '#' + classFromloop[i].id + ' .masonry > li',
                    columnWidth: 120
                });
            }
        });
    