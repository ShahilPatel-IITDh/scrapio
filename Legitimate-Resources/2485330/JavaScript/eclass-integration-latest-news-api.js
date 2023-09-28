jQuery(function ($) {
    'use strict';

    window.LatestNewsApi = function LatestNewsApi() {

        //// Private var START ////
        var _self = this;
        //// Private var END ////

        //// Public var START ////
        this.isLoading = false;
        this.allData = [];
        //// Public var END ////


        //// Private func START ////
        //// Private func END ////


        //// Public func START ////
        this.initLatestNewsAPI = function (displayCount) {
            return _self.getLatestNews({
                start_date: (new Date()).toISOString().slice(0, 10)
            }).done(function () {
                $('#latestNews .loading').hide();
                if (_self.allData.length == 0) {
                    $('#latestNews').html('暫時仍未有任何紀錄');
                    return false;
                }

                if (displayCount < _self.allData.length) {
                    $('#latestNewsArea .btnMoreNews').show();
                } else {
                    $('#latestNewsArea .btnMoreNews').hide();
                }

                var $ul = $('#latestNews #news_event');
                $ul.empty();
                var newTemplate = $('#latest-news-template').html();
                var newAttachmentTemplate = $('#new-attachment-template').html();
                for (var i = 0; i < displayCount; i++) {
                    var data = _self.allData[i] || null;
                    if (!data) {
                        break;
                    }

                    var attachmentUrl = '';
                    _.each(data['Attachments']['Attachment'], function (attachment, index) {
                        var compiled = _.template(newAttachmentTemplate);
                        attachmentUrl += compiled({
                            'attachmentUrl': attachment['FileURL'],
                            'attachmentIndex': attachment['FileName']
                        });
                    });

                    var url = ECLASS_LATEST_NEWS_API.page_url + '?';
                    url += 'eventId=' + data['AnnouncementID'];
                    url += '&eventDate=' + data['AnnouncementDate'];

                    var compiled = _.template(newTemplate);
                    $ul.append(compiled({
                        'eventId': data['AnnouncementID'],
                        'eventDate': data['AnnouncementDate'],
                        'eventTitle': data['Title'],
                        'eventDescription': ('' + data['Description']).replace(/(<([^>]+)>)/ig, ""),
                        'eventLink': url,
                        'attachmentUrl': attachmentUrl
                    }));
                }
            });
        }; // End initLatestNewsAPI()

        this.getLatestNews = function (data) {
            var _data = $.extend({}, {
                'action': 'eclass_latest_news_api',
                'num_of_record': null,
                '_ajax_nonce': ECLASS_LATEST_NEWS_API._ajax_nonce
            }, data);

            var $defer = $.Deferred();
            $.ajax({
                url: ECLASS_LATEST_NEWS_API.url,
                type: 'get',
                data: _data,
                beforeSend: function () {
                    _self.isLoading = true;
                },
                complete: function () {
                    _self.isLoading = false;
                },
                success: function (response) {
                    if (
                        typeof(response['Announcements']) == 'undefined' ||
                        typeof(response['Announcements']['Announcement']) == 'undefined'
                    ) {
                        _self.allData.length = 0;
                        $defer.resolve(_self.allData);
                        return;
                    }

                    //// Parse data START ////
                    if (typeof(response['Announcements']['Announcement']['AnnouncementID']) == 'undefined') {
                        $.each(response['Announcements']['Announcement'], function (index, announcement) {
                            _self.allData.push(announcement);
                        });
                    } else {
                        _self.allData.push(response['Announcements']['Announcement']);
                    }

                    $.each(_self.allData, function (index, announcement) {
                        try {
                            var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
                            while (SCRIPT_REGEX.test(announcement['Description'])) {
                                announcement['Description'] = announcement['Description'].replace(SCRIPT_REGEX, "");
                            }

                            if (typeof(announcement['Attachments']['Attachment']['FileURL']) != 'undefined') {
                                announcement['Attachments']['Attachment'] = [announcement['Attachments']['Attachment']];
                            }
                        } catch (e) {
                            announcement['Attachments']['Attachment'] = [];
                        }
                        _self.allData[index] = announcement
                    });
                    //// Parse data END ////

                    $defer.resolve(_self.allData);
                },
                error: function (err) {
                    $defer.reject(err);
                },
            });
            return $defer;
        };
        //// Public func END ////
    }; // End class LatestNewsApi


});
