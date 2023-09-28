jQuery(function ($) {
    'use strict';

    window.DigitalChannelsApi = function DigitalChannelsApi() {

        //// CONST START ////
        this.TYPE = {
            CATEGORY: 1,
            ALBUM: 2,
            HIGHLIGHT: 3,
        };
        //// CONST END ////

        //// Private var START ////
        var _self = this;
        //// Private var END ////

        //// Public var START ////
        this.isLoading = false;
        //// Public var END ////


        //// Private func START ////
        var getAbsoluteUrl = (function (url) {
            if (url != '' && url.indexOf('://') == -1) {
                url = 'http://' + url;
            }
            return url;
        });
        //// Private func END ////


        //// Public func START ////
        this.loadData = function (args, callback) {
            var data = {
                'action': 'eclass_digital_channels_api',
                '_ajax_nonce': ECLASS_DIGITAL_CHANNELS_API._ajax_nonce
            };
            data.type = args['type'];
            data.albumId = args['albumId'];
            data.categoryCode = args['categoryCode'];
            data.academicYear = args['academicYear'];

            var $defer = $.Deferred();
            $.ajax({
                url: ECLASS_DIGITAL_CHANNELS_API.url,
                type: 'get',
                data: data,
                beforeSend: function () {
                    _self.isLoading = true;
                },
                complete: function () {
                    _self.isLoading = false;
                },
                success: function (response) {
                    var data = [];

                    if (args['type'] == ECLASS_DIGITAL_CHANNELS_API.TYPE_CATEGORY) {
                        if (
                            typeof(response['Categories']) == 'undefined' ||
                            typeof(response['Categories']['Category']) == 'undefined'
                        ) {
                            $defer.resolve(data);
                            return;
                        }

                        if (typeof(response['Categories']['Category']['CategoryCode']) != 'undefined') {
                            response['Categories']['Category'] = [response['Categories']['Category']];
                        }

                        for (var i = 0; i < response['Categories']['Category'].length; i++) {
                            if (
                                typeof(response['Categories']['Category'][i]['Album']) != 'undefined' &&
                                typeof(response['Categories']['Category'][i]['Album']['AlbumID']) != 'undefined'
                            ) {
                                response['Categories']['Category'][i]['Album'] = [response['Categories']['Category'][i]['Album']];
                            }

                            if (response['Categories']['Category'][i]['CategoryTotalAlbum'] > 0) {
                                for (var j = 0; j < response['Categories']['Category'][i]['Album'].length; j++) {
                                    var album = response['Categories']['Category'][i]['Album'][j];

                                    if (typeof(album['AlbumCoverUrl']) !== 'string') {
                                        album['AlbumCoverUrl'] = '';
                                    }

                                    album['AlbumCoverUrl'] = getAbsoluteUrl(album['AlbumCoverUrl']);
                                    if (typeof(album['AlbumTitle']) !== 'string') {
                                        album['AlbumTitle'] = '';
                                    }

                                    response['Categories']['Category'][i]['Album'][j] = album;
                                }
                            }else{
                                response['Categories']['Category'][i]['Album'] = [];
                            }
                        }

                        data = response['Categories']['Category'];
                    } else {
                        if (
                            typeof(response['Albums']) == 'undefined' ||
                            typeof(response['Albums']['Album']) == 'undefined'
                        ) {
                            $defer.resolve(data);
                            return;
                        }

                        if (typeof(response['Albums']['Album']['AlbumID']) != 'undefined') {
                            response['Albums']['Album'] = [response['Albums']['Album']];
                        }

                        for (var i = 0; i < response['Albums']['Album'].length; i++) {
                            var album = response['Albums']['Album'][i];
                            if (typeof(album['AlbumCoverUrl']) !== 'string') {
                                album['AlbumCoverUrl'] = '';
                            }

                            album['AlbumCoverUrl'] = getAbsoluteUrl(album['AlbumCoverUrl']);
                            if (typeof(album['AlbumDescription']) !== 'string') {
                                album['AlbumDescription'] = '';
                            }
                            if (typeof(album['AlbumTitle']) !== 'string') {
                                album['AlbumTitle'] = '';
                            }

                            /**** Handle Photo list START ****/
                            if (typeof(album['Photo']) == 'undefined') {
                                album['Photo'] = [];
                            } else if (typeof(album['Photo']['PhotoID']) != 'undefined') {
                                album['Photo'] = [album['Photo']];
                            }

                            for (var j = 0; j < album['Photo'].length; j++) {
                                var photo = album['Photo'][j];
                                if (typeof(photo['PhotoTitle']) !== 'string') {
                                    photo['PhotoTitle'] = '';
                                }
                                if (typeof(photo['PhotoDescription']) !== 'string') {
                                    photo['PhotoDescription'] = '';
                                }
                                if (typeof(photo['PhotoCoverURL']) !== 'string') {
                                    photo['PhotoCoverURL'] = '';
                                }
                                if (typeof(photo['PhotoURL']) !== 'string') {
                                    photo['PhotoURL'] = '';
                                }


                                photo['Title'] = photo['PhotoTitle'];
                                photo['Description'] = photo['PhotoDescription'];
                                photo['ID'] = photo['PhotoID'];
                                photo['CoverURL'] = photo['PhotoCoverURL'] = getAbsoluteUrl(photo['PhotoCoverURL']);
                                photo['URL'] = photo['PhotoURL'] = getAbsoluteUrl(photo['PhotoURL']);
                                photo['Type'] = 'image/jpeg';

                                response['Albums']['Album'][i]['Photo'][j] = photo;
                            }
                            /**** Handle Photo list END ****/

                            /**** Handle Video list START ****/
                            if (typeof(album['Video']) == 'undefined') {
                                response['Albums']['Album'][i]['Video'] = [];
                            } else if (typeof(album['Video']['VideoID']) != 'undefined') {
                                response['Albums']['Album'][i]['Video'] = [album['Video']];
                            }

                            for (var j = 0; j < album['Video'].length; j++) {
                                var photo = album['Video'][j];
                                if (typeof(photo['VideoTitle']) !== 'string') {
                                    photo['VideoTitle'] = '';
                                }
                                if (typeof(photo['VideoDescription']) !== 'string') {
                                    photo['VideoDescription'] = '';
                                }
                                if (typeof(photo['VideoCoverURL']) !== 'string') {
                                    photo['VideoCoverURL'] = '';
                                }
                                if (typeof(photo['VideoURL']) !== 'string') {
                                    photo['VideoURL'] = '';
                                }

                                photo['Title'] = photo['VideoTitle'];
                                photo['Description'] = photo['VideoDescription'];
                                photo['ID'] = photo['VideoID'];
                                photo['CoverURL'] = photo['VideoCoverURL'] = getAbsoluteUrl(photo['VideoCoverURL']);
                                photo['URL'] = photo['VideoURL'] = getAbsoluteUrl(photo['VideoURL']);
                                photo['Type'] = 'video/mp4';

                                response['Albums']['Album'][i]['Video'][j] = photo;
                            }
                            /**** Handle Video list END ****/


                            /**** Group Photo/Video list START ****/
                            var itemList = $.merge($.merge([], response['Albums']['Album'][i]['Photo']), response['Albums']['Album'][i]['Video']);
                            itemList.sort(function (a, b) {
                                return a['Sequence'] - b['Sequence'];
                            });
                            response['Albums']['Album'][i]['Item'] = itemList;
                            /**** Group Photo/Video list END ****/

                            response['Albums']['Album'][i] = album;
                        }

                        data = response['Albums']['Album'];
                    }

                    if (typeof(callback) == 'function') {
                        callback(response);
                    }
                    $defer.resolve(data);
                },
                error: function (err) {
                    $defer.reject(err);
                },
            });
            return $defer;
        }; // End loadData()
        this.getDigitalChannels = this.loadData;

        this.filterAccessableAlbum = (function(albumArr){
            return _.filter(albumArr, function(album){
                var sharedSince, sharedUntil;
                sharedSince = (album['SharedSince'] == 0)?moment():moment.unix(album['SharedSince']);
                sharedUntil = (album['SharedUntil'] == 0)?moment():moment.unix(album['SharedUntil']);

                return (
                    moment().isBetween(sharedSince,sharedUntil, 'day', '[]') &&
                    album['Target'] == 'ALL'
                );
            })
        });
        //// Public func END ////
    }; // End class DigitalChannelsApi


});
