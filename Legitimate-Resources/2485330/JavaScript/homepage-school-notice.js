$(function () {
    'use strict';

    if ($('#notice').length == 0) {
        return;
    }

    var baseHref = $('#notice').data('base-href');
    var limitPost = $('#notice').data('limit');

    /**** UI START ****/
    var initUI = (function () {
        $(".dotdotdot").dotdotdot({
            wrap: 'letter',
            watch: true
        });
    })
    var strip_tags = (function (content) {
        return $('<div>').html(content).text();
    });
    /**** UI END ****/

    /**** Load api data START ****/
    var api = new ENoticeApi();
    var getData = (function () {
        return api.getNotices();
    });
    /**** Load api data END ****/

    /**** Generate template START ****/
    var app = new Vue({
        el: '#notice',
        data: {
            isLoading: true,
            baseHref: baseHref,
            limitPost: limitPost,
            dataList: [],
        },
        computed: {},
        methods: {
            init: function (data) {
                this.isLoading = false;
                this.dataList = data.splice(0, limitPost);
                Vue.nextTick(initUI);
            },
            getLink: function (data) {
                return this.baseHref.replace('%id%', data.NoticeID);
            },
            strip_tags: strip_tags,
        }
    });
    /**** Generate template END ****/

    /**** Init START ****/
    getData().done(app.init);
    /**** Init END ****/
});