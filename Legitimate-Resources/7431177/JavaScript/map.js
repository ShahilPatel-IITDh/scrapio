/**
 * Created by quvsoftware on 2019-03-20.
 */


// 네이버 지도 테스트 코드
//initMapListBox();

function initMapListBox(target) {
    if (!target) {
        target = $('#main_container .mapListBox');
    }

    $.each(target, function () {
        var _this = this;
        var interval;
        interval = setInterval(function() {
            if ($(_this).children('.view').width() > 0) {
                clearInterval(interval);
                renderMapListBox($(_this));
            }
        }, 100);
    });
}

function renderMapListBox(box) {
    if (box.hasClass('map-list-rendering-complete')) return;
    box.addClass('map-list-rendering-complete');

    box.find('.qv-map-index').removeClass('fold');

    var zoom = box.find('.qv-map-list').attr('data-zoom');
    var id = box.find('.qv-map-list').attr('id');
    var mid = box.find('.qv-map-list').attr('data-mid');
    if (mid == undefined) return;

    var first_lat = '';
    var first_lng = '';

    // 기본정보 호출
    qvjax_direct(
        "select_map_info_by_mid",
        "/module/map/map.php",
        "mid=" + mid,
        function(data) { // DB에 해당 지도리스트의 정보를 호출
            box.data('mapinfo', data);
        },
        function(xhr) {}
    );

    // 위치 세팅

    qvjax_direct(
        "select_map_location",
        "/module/map/map.php",
        "mid=" + mid,
        function(data) { // DB에서 위치정보 호출 후 사이드 네비에 등록
            var container = box.find('.qv-map-list-location-container');
            container.find('.qv-map-list-location-item').remove();

            // qv-map-index
            $.each(data, function() {
                var location_id = this.location_id;
                var location_data = JSON.parse(this.location_data);

                var html = $('<div class="qv-map-list-location-item" style="display: none"><div class="qv-map-list-location-id"></div><div class="qv-map-list-location-title"></div><div class="qv-map-list-location-address1"></div><div class="qv-map-list-location-address2"></div><div class="qv-map-list-location-icon"><i class="material-icons">place</i></div></div>');
                $(html).attr('id', location_id);
                Object.keys(location_data).forEach(function(key) {
                    $(html).attr('data-' + key, location_data[key]);

                    var classname = '.qv-map-list-location-' + key;
                    if ($(html).find(classname).length > 0) {
                        $(html).find(classname).text(location_data[key])
                    }
                });
                container.append($(html));

                if (first_lat == '' && first_lng == '') { // 대표 위치를 지도에 표시하기위해 첫 좌표를 변수에 등록
                    first_lat = location_data['lat'];
                    first_lng = location_data['lng'];
                }
            });

            if (container.find('.qv-map-list-location-item').first().data('sort')) {
                container.find('.qv-map-list-location-item').orderBy(function() {
                    return +$(this).data('sort')
                }).appendTo('.qv-map-list-location-container')
            }
            container.find('.qv-map-list-location-item').show();

            if (typeof(naver) == "undefined") return;
            if (typeof(naver.maps) == "undefined") return;

            // qv-map-list
            // 네이버 지도 초기화
            box.find('.qv-map-list').height(box.height());
            var mapOptions = {
                center: new naver.maps.LatLng(first_lat, first_lng),
                scaleControl: false,
                logoControl: false,
                mapDataControl: false,
                zoomControl: true,
                zoom: zoom == undefined ? 16 : parseInt(zoom),
                useStyleMap: true,
            };
            var map = new naver.maps.Map(id, mapOptions);
            box.data('map', map);

            // 사이드 네비에 등록된 위치 기준으로 네이버 지도에 마커 및 이벤트 등록
            $.each(box.find('.qv-map-list-location-container .qv-map-list-location-item'), function() {
                var location_id = this.id;
                var location_title = $(this).attr('data-title');
                var location_lat = $(this).attr('data-lat');
                var location_lng = $(this).attr('data-lng');
                var marker = new naver.maps.Marker({
                    title: location_title,
                    location: location_id,
                    position: new naver.maps.LatLng(location_lat, location_lng),
                    map: map
                });

                // 마커 클릭 시 위치상세모달 노출 이벤트
                naver.maps.Event.addListener(marker, 'click', function(e) {
                    showLocationViewModal(box, e.overlay.location)
                    // var location_id = e.overlay.location;
                    // var location_data = $('#' + location_id).data();
                    // var location_detail_html = '';
                    // var location_photo_html = '';
                    // var map_info = box.data('mapinfo');
                    // var map_info_parse = JSON.parse(map_info[0].details);
                    // var exceptionKeys = ['id', 'lat', 'lng', 'country', 'sido', 'sigugun'];
                    //
                    // var unorderedData = location_data;
                    // var orderedData = {};
                    // if (Object.keys(unorderedData)[0] == 'title') {
                    //     orderedData = unorderedData;
                    // }
                    // else {
                    //     Object.keys(unorderedData).reverse().forEach(function (key) {
                    //         orderedData[key] = unorderedData[key];
                    //     });
                    // }
                    //
                    // Object.keys(orderedData).forEach(function(key) {
                    //     if ($.inArray(key, exceptionKeys) > -1) { return; }
                    //     else if (key == 'title') {
                    //         $('#LocationViewModal .modal-body-title > div').text(location_data[key]);
                    //     }
                    //     else if (key.indexOf('photo') > -1) {
                    //         // image process
                    //         var url = decodeURIComponent(location_data[key]).replace(/"/g, '\'');
                    //         var html = '<div class="location-photo-sub-item" style="background-image:' + url + ';"></div>'
                    //         location_photo_html += html;
                    //
                    //         if (key == 'photo1') {
                    //             $('#LocationViewModal .location-photo-main').css('background-image', url);
                    //         }
                    //     }
                    //     else {
                    //         var subject = '';
                    //         Object.keys(map_info_parse).forEach(function(info_key) {
                    //             if (map_info_parse[info_key].id == key) { subject = map_info_parse[info_key].name; }
                    //         });
                    //         if (subject == '') return; // info 정보와 매핑 안되면 리턴
                    //         if (key == 'address2') { subject = ''; }
                    //         var html = '<div>'
                    //             + '<div class="location-view-subject col-sm-4">' + subject + '</div>'
                    //             + '<div class="location-view-contents col-sm-8">' + location_data[key] + '</div>'
                    //             + '</div>';
                    //         location_detail_html += html;
                    //     }
                    // });
                    //
                    // $('#LocationViewModal .location-photo-sub').children().remove();
                    // $('#LocationViewModal .location-photo-sub').append($(location_photo_html));
                    //
                    // $('#LocationViewModal .location-detail-container').children().remove();
                    // $('#LocationViewModal .location-detail-container').append($(location_detail_html));
                    //
                    // // 이미지가 없으면 사진 영역을 제거
                    // $('#LocationViewModal .location-detail-container').removeClass(function (index, className) {
                    //     return (className.match (/(^|\s)col-sm-\S+/g) || []).join(' ');
                    // });
                    // if ($('#LocationViewModal .location-photo-sub').children().length == 0) {
                    //     $('#LocationViewModal .location-photo-container').hide();
                    //     $('#LocationViewModal .location-detail-container').addClass('col-sm-12');
                    // }
                    // else {
                    //     $('#LocationViewModal .location-photo-container').show();
                    //     $('#LocationViewModal .location-detail-container').addClass('col-sm-6');
                    // }
                    //
                    // $('#LocationViewModal').modal('show');
                });
            });

            // 첫 번째 위치로 지도이동
            // box.find('.qv-map-list-location-item').first().trigger('click');
            var first = box.find('.qv-map-list-location-item').first();
            if (first.length > 0) {
                var lat = first.attr('data-lat');
                var lng = first.attr('data-lng');

                var map = first.parents('.mapListBox').data('map');
                if (map == undefined) return;
                map.panTo(new naver.maps.LatLng(lat, lng));
            }
        },
        function(xhr) { }
    );
}

$('#LocationViewModal').delegate('.location-photo-sub-item', 'click', function() {
    var url = $(this).css('background-image');
    $('#LocationViewModal .location-photo-main').css('background-image', url);
});

$('.qv-map-index').delegate('.qv-map-list-location-item', 'click', function() {
    var mapBox = $(this).parents('.mapListBox').first().find('.qv-map-list');
    var mapId = mapBox.attr('id');
    var lat = $(this).attr('data-lat');
    var lng = $(this).attr('data-lng');

    var map = $(this).parents('.mapListBox').data('map');
    if (map == undefined) return;
    map.panTo(new naver.maps.LatLng(lat, lng));

    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
    if (isMobile) {
        mapBox.siblings('.qv-map-index').find('.container-fold').trigger('click');
    }
});

$('.qv-map-index').delegate('.qv-map-list-location-selector-sido', 'change', function() {
    var sido = $(this).val();
    var sido_select = $(this).siblings('select.qv-map-list-location-selector-sigugun');
    var sigugun = $(this).children('option:selected').data('sigugun');
    var html = '';

    if (sigugun == undefined) { }
    else {
        var arr = [];
        $.each(sigugun.split(','), function () {
            var sigungu = this.toString();
            if (arr.indexOf(sigungu) > -1) return;
            arr.push(sigungu);
            html += '<option value="' + this + '" data-sido="' + sido + '">' + this + '</option>';
        });
    }
    sido_select.children('option').not('.location-default').remove();
    sido_select.append($(html));
    showSelectedArea(sido, '', $(this).parents('.mapListBox').first());
});

$('.qv-map-index').delegate('.qv-map-list-location-selector-sigugun', 'change', function() {
    var sido = $(this).children('option:selected').data('sido');
    var sigugun = $(this).val();

    if (sido == undefined) {
        sido = $(this).siblings('select.qv-map-list-location-selector-sido').val();
    }
    showSelectedArea(sido, sigugun, $(this).parents('.mapListBox').first());
});

$('.qv-map-index').delegate('.container-fold', 'click', function() {
    var target = $(this).parents('.qv-map-index').first();
    if (target.hasClass('fold')) {
        target.removeClass('fold');
        $(this).children('i').removeClass('icon-arrow-up');
        $(this).children('i').addClass('icon-arrow-down');
    }
    else {
        target.addClass('fold');
        $(this).children('i').removeClass('icon-arrow-down');
        $(this).children('i').addClass('icon-arrow-up');
    }
});

function showSelectedArea(sido, sigugun, box) {
    var target = $(box).find('.qv-map-list-location-container > .qv-map-list-location-item');
    target.hide();
    $.each(target, function () {
        if ((sido == '' || sido == undefined) && (sigugun == '' || sigugun == undefined)) {
            $(this).show();
        }
        else if (sigugun == '' || sigugun == undefined) {
            if ($(this).data('sido') == sido) {
                $(this).show();
            }
        }
        else {
            if ($(this).data('sido') == sido && $(this).data('sigugun') == sigugun) {
                $(this).show();
            }
        }
    });
}

function showLocationViewModal(box, location_id) {
    var location_data = $('#' + location_id).data();
    var location_detail_html = '';
    var location_photo_html = '';
    var map_info = box.data('mapinfo');
    var map_info_parse = JSON.parse(map_info[0].details);
    var exceptionKeys = ['id', 'lat', 'lng', 'country', 'sido', 'sigugun'];

    var unorderedData = location_data;
    var orderedData = {};
    if (Object.keys(unorderedData)[0] == 'title') {
        orderedData = unorderedData;
    }
    else {
        Object.keys(unorderedData).reverse().forEach(function (key) {
            orderedData[key] = unorderedData[key];
        });
    }

    Object.keys(orderedData).forEach(function(key) {
        if ($.inArray(key, exceptionKeys) > -1) { return; }
        else if (key == 'title') {
            $('#LocationViewModal .modal-body-title > div').text(location_data[key]);
        }
        else if (key.indexOf('photo') > -1) {
            // image process
            var url = decodeURIComponent(location_data[key]).replace(/"/g, '\'');
            var html = '<div class="location-photo-sub-item" style="background-image:' + url + ';"></div>'
            location_photo_html += html;

            if (key == 'photo1') {
                $('#LocationViewModal .location-photo-main').css('background-image', url);
            }
        }
    });

    $.each(map_info_parse, function() {
        var id = this.id;
        var name = this.name;

        if (name && location_data[id] != undefined) {
            var html = '<div>'
                + '<div class="location-view-subject col-sm-4">' + name + '</div>'
                + '<div class="location-view-contents col-sm-8">' + location_data[id] + '</div>'
                + '</div>';
            location_detail_html += html;
        }
    });


    $('#LocationViewModal .location-photo-sub').children().remove();
    $('#LocationViewModal .location-photo-sub').append($(location_photo_html));

    $('#LocationViewModal .location-detail-container').children().remove();
    $('#LocationViewModal .location-detail-container').append($(location_detail_html));

    // 이미지가 없으면 사진 영역을 제거
    $('#LocationViewModal .location-detail-container').removeClass(function (index, className) {
        return (className.match (/(^|\s)col-sm-\S+/g) || []).join(' ');
    });
    if ($('#LocationViewModal .location-photo-sub').children().length == 0) {
        $('#LocationViewModal .location-photo-container').hide();
        $('#LocationViewModal .location-detail-container').addClass('col-sm-12');
    }
    else {
        $('#LocationViewModal .location-photo-container').show();
        $('#LocationViewModal .location-detail-container').addClass('col-sm-6');
    }

    $('#LocationViewModal').modal('show');
}

$('#main_container').delegate('.mapListBox .qv-map-list-location-icon', 'click', function() {
    var location = $(this).parents('.qv-map-list-location-item');
    if (location.length == 0) { return; }
    else {
        var box = $(this).parents('.box.mapListBox');
        var location_id = location.attr('id');

        showLocationViewModal(box, location_id);
    }
});


// NAVER, DAUM 지도
function initMapBox(target) {
    if (!target) {
        target = $('#main_container .mapBox');
    }

    $.each(target, function () {
        var _this = this;
        var interval;
        interval = setInterval(function() {
            if ($(_this).children('.view').width() > 0) {
                clearInterval(interval);
                renderMapBox($(_this));
            }
        }, 100);
    });
}

function renderMapBox(box) {
    if (box.hasClass('map-rendering-complete')) return;
    box.addClass('map-rendering-complete');

    var id = box.find('.qv-map').attr('id');
    var lat = box.find('.qv-map').attr('data-lat');
    var lng = box.find('.qv-map').attr('data-lng');
    var zoom = box.find('.qv-map').attr('data-zoom');
    var type = box.find('.qv-map').attr('data-type');

    /* 2020.05.12 재헌
     * firefox에서 qv-map 객체가 높이값을 제대로 못잡는 문제
     * box의 높이값을 구해 해당 값으로 설정해준다
     */
    if ($.browser.mozilla) {
        var h = box.height();
        box.find('.qv-map').height(h);
    }

    switch (type) {
        case 'naver':
            if (typeof(naver) == "undefined") return;
            if (typeof(naver.maps) == "undefined") return;

            // 지도 초기화
            var mapOptions = {
                center: new naver.maps.LatLng(lat, lng),
                scaleControl: false,
                logoControl: false,
                mapDataControl: false,
                zoomControl: true,
                zoom: zoom == undefined ? 16 : parseInt(zoom),
                useStyleMap: true,
            };
            var map = new naver.maps.Map(id, mapOptions);
            // 마커 초기화
            var marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(lat, lng),
                map: map
            });

            break;
        case 'daum':
            if (typeof(daum.maps) == "undefined") return;

            // 지도 초기화
            var container = document.getElementById(id); //지도를 담을 영역의 DOM 레퍼런스
            var options = { //지도를 생성할 때 필요한 기본 옵션
                center: new daum.maps.LatLng(lat, lng), //지도의 중심좌표.
                level: zoom //지도의 레벨(확대, 축소 정도)
            };
            var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
            // 마커 초기화
            var marker = new daum.maps.Marker({
                map: map,
                position: new daum.maps.LatLng(lat, lng)
            });

            break;
        default: // google embed map
            break;
    }
}

function reRenderMapBox(box) { //tmp 10.8
    box.removeClass('map-rendering-complete').addClass('map-rendering-complete');

    var id = box.find('.qv-map').attr('id');
    var lat = box.find('.qv-map').attr('data-lat');
    var lng = box.find('.qv-map').attr('data-lng');
    var zoom = box.find('.qv-map').attr('data-zoom');
    var type = box.find('.qv-map').attr('data-type');

    switch (type) {
        case 'naver':
            if (typeof(naver) == "undefined") return;
            if (typeof(naver.maps) == "undefined") return;

            // 지도 초기화
            var mapOptions = {
                center: new naver.maps.LatLng(lat, lng),
                scaleControl: false,
                logoControl: false,
                mapDataControl: false,
                zoomControl: true,
                zoom: zoom == undefined ? 16 : parseInt(zoom),
                useStyleMap: true,
            };
            var map = new naver.maps.Map(id, mapOptions);
            // 마커 초기화
            var marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(lat, lng),
                map: map
            });

            break;
        case 'daum':
            if (typeof(daum.maps) == "undefined") return;

            // 지도 초기화
            var container = document.getElementById(id); //지도를 담을 영역의 DOM 레퍼런스
            var options = { //지도를 생성할 때 필요한 기본 옵션
                center: new daum.maps.LatLng(lat, lng), //지도의 중심좌표.
                level: zoom //지도의 레벨(확대, 축소 정도)
            };
            var map = new daum.maps.Map(container, options); //지도 생성 및 객체 리턴
            // 마커 초기화
            var marker = new daum.maps.Marker({
                map: map,
                position: new daum.maps.LatLng(lat, lng)
            });

            break;
        default: // google embed map
            break;
    }
}

jQuery.fn.orderBy = function(keySelector) {
    return this.sort(function(a,b)
    {
        a = keySelector.apply(a);
        b = keySelector.apply(b);
        if (a > b)
            return 1;
        if (a < b)
            return -1;
        return 0;
    });
};