'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (typeof stm_album === 'undefined') var stm_album = [];
if (typeof stm_album_name === 'undefined') var stm_album_name = '';
if (typeof stm_current_song === 'undefined') var stm_current_song = 0;
if (typeof stm_album_id === 'undefined') var stm_album_id = 0;
if (typeof stm_repeat === 'undefined') var stm_repeat = true;

(function ($) {
    'use strict';

    $(document).ready(function () {

        if ($('.stm-audio-player').length) {
            stm_album_id = $('.stm-audio-player').data('id');
        }

        if (stm_album.length > 0) {
            new STM_Audio_Player();
        }

        $('body').on('click', '[data-album-song]', function (e) {

            if ($(e.target)[0].localName == 'i') {
                return;
            }

            stm_repeat = true;
            var song_title = $(this).attr('data-song-title');
            var song_url = $(this).attr('data-album-song');
            var player = new STM_Audio_Player();

            var key = '';

            if (typeof $(this).attr('data-album-title') !== 'undefined') {
                stm_repeat = false;
                key = 0;
                stm_album_name = $(this).attr('data-album-title');
                stm_album = [{
                    'title': song_title,
                    'url': song_url,
                    'length': $(this).attr('data-length'),
                    'urls': $(this).find('.stm_album_info__song_links').html()
                }];
            }

            if (key === '') {
                key = $(this).attr('data-key');
            }

            if (typeof $(this).attr('data-album-id') !== 'undefined') {
                stm_album_id = $(this).attr('data-album-id');
            }

            if ($(this).hasClass('playing')) {
                e.preventDefault();
                e.stopPropagation();

                $(this).removeClass('playing').addClass('paused');
                player.pause();

                return false;
            }

            if ($(this).hasClass('paused')) {
                e.preventDefault();
                e.stopPropagation();

                $(this).removeClass('paused').addClass('playing');
                player.resume();

                return false;
            }

            $('[data-album-song]').removeClass('playing paused');
            $(this).addClass('playing');
            player.play(key);
            player.changeAlbumName();
        });

        $('body').on('click', '[data-album]', function (e) {
            stm_repeat = true;
            var album = $(this).attr('data-album');
            var player = new STM_Audio_Player();

            if ($(this).hasClass('playing')) {
                e.preventDefault();
                e.stopPropagation();

                $(this).removeClass('playing').addClass('paused');

                player.pause();
                return false;
            }

            if ($(this).hasClass('paused')) {
                e.preventDefault();
                e.stopPropagation();

                $(this).removeClass('paused').addClass('playing');
                player.resume();
                return false;
            }

            $('[data-album], [data-audio]').removeClass('playing paused');
            $(this).addClass('playing');

            $(this).closest('[data-audio]').addClass('playing');

            $.ajax({
                url: stm_ajaxurl,
                dataType: 'json',
                context: this,
                data: {
                    'album': album,
                    'action': 'pearl_load_album',
                    'security': pearl_load_album
                },
                beforeSend: function beforeSend() {
                    $(this).addClass('loading');
                },
                complete: function complete(data) {
                    $(this).removeClass('loading');
                    data = data.responseJSON;
                    if (typeof data.songs !== 'undefined') {
                        player = new STM_Audio_Player();
                        stm_album = data.songs;
                        stm_album_name = data.album_title;
                        stm_album_id = data.album;

                        stm_current_song = 0;

                        player.play();
                        player.changeAlbumName();
                    }
                }
            });

            e.preventDefault();
            e.stopPropagation();
        });
    });

    $(window).on('load', function () {
        if (stm_album.length > 0) {
            new STM_Audio_Player();
        }
    });
})(jQuery);

var STM_Audio_Player = function () {
    function STM_Audio_Player() {
        _classCallCheck(this, STM_Audio_Player);

        this.$ = jQuery;
        this.init();
    }

    _createClass(STM_Audio_Player, [{
        key: 'init',
        value: function init() {
            var __this = this;
            var $ = __this.$;

            $.extend(MediaElementPlayer.prototype, {
                buildprevtrack: function buildprevtrack(player, controls, layers, media) {
                    var audio = $('#audio-player').find('audio');
                    audio = audio[0];
                    var prevTrack = $('<div class="mejs-button mejs-prevtrack-button mejs-prevtrack">' + '<button type="button" aria-controls="' + player.id + '" title="' + player.options.prevText + '"></button>' + '</div>').appendTo(controls).click(function (e) {
                        audio.src = __this.getPrev();
                        audio.load();
                        audio.play();
                    });
                },
                buildnexttrack: function buildnexttrack(player, controls, layers, media) {
                    var audio = $('#audio-player').find('audio');
                    audio = audio[0];
                    var nextTrack = $('<div class="mejs-button mejs-nexttrack-button mejs-nexttrack">' + '<button type="button" aria-controls="' + player.id + '" title="' + player.options.nextText + '"></button>' + '</div>').appendTo(controls).click(function (e) {
                        audio.src = __this.getNext();
                        audio.load();
                        audio.play();
                    });
                }
            });

            $('audio').mediaelementplayer({
                features: ['prevtrack', 'playpause', 'nexttrack', 'current', 'duration', 'progress', 'volume'],
                success: function success(player) {
                    player.addEventListener('ended', function (e) {
                        if (stm_repeat) {
                            player.src = __this.getNext();
                            player.load();
                            player.play();
                            __this.changeActiveSong();
                        } else {
                            $('[data-album-song]').removeClass('playing');
                        }
                    });
                    player.addEventListener('pause', function (e) {
                        $('#audio-player').removeClass('playing');
                        var $album = $('[data-album="' + stm_album_id + '"]');
                        $album.removeClass('playing');
                        $album.closest('[data-audio]').removeClass('playing');
                    });
                    player.addEventListener('play', function (e) {
                        $('#audio-player').addClass('playing');
                        var $album = $('[data-album="' + stm_album_id + '"]');
                        $album.addClass('playing');
                        $album.closest('[data-audio]').addClass('playing');
                    });
                },
                keyActions: []
            });

            __this.changeAlbumName();
        }
    }, {
        key: 'play',
        value: function play(key) {

            if (typeof key === 'undefined') key = 0;

            var __this = this;
            var $ = __this.$;
            var audio = $('#audio-player').find('audio');

            __this.changeSongTitle(stm_album[key]['title']);

            audio = audio[0];
            audio.src = stm_album[key]['url'];
            audio.load();
            audio.play();
        }


    }, {
        key: 'resume',
        value: function resume() {
            var __this = this;
            var $ = __this.$;
            var audio = $('#audio-player').find('audio');
            audio = audio[0];
            audio.play();
        }
    }, {
        key: 'pause',
        value: function pause() {
            var __this = this;
            var $ = __this.$;
            var audio = $('#audio-player').find('audio');
            audio = audio[0];
            audio.pause();
        }
    }, {
        key: 'changeAlbumName',
        value: function changeAlbumName() {
            var __this = this;
            var $ = __this.$;
            if (stm_album_name !== '') $('#audio-player .audio-album label').text(stm_album_name);

            __this.changeAlbumSongs();
        }
    }, {
        key: 'changeAlbumSongs',
        value: function changeAlbumSongs() {
            var __this = this;
            var $ = __this.$;

            var songs = '';
            stm_album.forEach(function (song, key) {
                songs += '<div class="stm_album_info__song" ' + 'data-key="' + key + '" ' + 'data-song-title="' + song.title + '" ' + 'data-album-song="' + song.url + '">' + '<div class="stm_album_info__song_number"><span class="number">' + (key + 1) + '.</span></div>' + '<div class="stm_album_info__song_title">' + song.title + '</div>';

                if (typeof song.urls !== 'undefined') {
                    if (_typeof(song.urls) === 'object') {
                        songs += '<div class="stm_album_info__song_links">';
                        song.urls.forEach(function (link) {
                            songs += '<a href="' + link.url + '" target="_blank"><i class="' + link.icon + '"></i></a>';
                        });
                        songs += '</div>';
                    } else {
                        songs += '<div class="stm_album_info__song_links">' + song.urls + '</div>';
                    }
                }

                songs += '<div class="stm_album_info__song_length">' + song.length + '</div>' + '</div>';
            });

            $('#audio-player__list .stm_album_info__playlist').html(songs);

            __this.changeActiveSong();
        }
    }, {
        key: 'changeActiveSong',
        value: function changeActiveSong() {
            var __this = this;
            var $ = __this.$;
            $('#audio-player__list [data-album-song]').removeClass('playing');
            var audio = $('#audio-player').find('audio');
            $('#audio-player__list [data-album-song="' + audio[0].src + '"]').addClass('playing');
        }
    }, {
        key: 'getNext',
        value: function getNext() {
            var __this = this;
            var album = stm_album;
            var album_length = album.length;

            if (stm_current_song + 1 == album_length) {
                stm_current_song = 0;
            }
            else if (album_length == 1) {
                    stm_current_song = 0;
                }
                else if (album_length > 1) {
                        stm_current_song++;
                    }

            __this.changeSongTitle(album[stm_current_song]['title']);

            return album[stm_current_song]['url'];
        }
    }, {
        key: 'getPrev',
        value: function getPrev() {
            var __this = this;
            var album = stm_album;
            var album_length = album.length;

            if (album_length == 1) {
                stm_current_song = 0;
            }
            else if (stm_current_song == 0) {
                    stm_current_song = album_length - 1;
                } else if (album_length > 1) {
                    stm_current_song--;
                }

            __this.changeSongTitle(album[stm_current_song]['title']);

            return album[stm_current_song]['url'];
        }
    }, {
        key: 'changeSongTitle',
        value: function changeSongTitle(title) {
            var __this = this;
            var $ = __this.$;
            $('#audio-player .audio-title').text(title);
        }
    }]);

    return STM_Audio_Player;
}();



(function ($) {
    "use strict";

    $(document).ready(function () {
        stm_audio_stuck();
    });

    $(window).on('load', function () {
        stm_audio_stuck();
    });

    $(window).on('scroll', function () {
        stm_audio_stuck();
    });

    function stm_audio_stuck() {
        var $player = $('#audio-player');

        if (!$player.length) return;

        var player_height = $player.outerHeight();
        var $holder = $('#audio-player-holder');

        var currentScrollPos = $(window).scrollTop() + $(window).height() - player_height;
        var holderPos = $holder.offset().top;

        var wW = $(window).width();
        var fW = $('.stm-footer').width();
        var mgL = (wW - fW) / 2;

        if (currentScrollPos < holderPos) {
            $player.addClass('fixed');
            $player.css({
                'position': 'fixed',
                'bottom': 0,
                'width': fW + 'px',
                'margin-left': mgL + 'px'
            });

            $holder.css({
                'height': player_height + 'px'
            });
        } else {
            $player.removeClass('fixed');
            $player.css({
                'position': 'static',
                'bottom': 0,
                'width': '100%',
                'margin-left': 0
            });

            $holder.css({
                'height': 0
            });
        }
    }

    $(document).ready(function () {
        $('.audio-toggle').on('click', function () {
            $('#audio-player__list').slideToggle();
            $(this).toggleClass('active');
            if (!$(this).hasClass('active')) {
                $('html, body').animate({
                    scrollTop: 9999
                }, 700);
            }
        });
    });
})(jQuery);