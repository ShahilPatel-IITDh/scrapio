jQuery(function ($) {
    'use strict';

    window.ENoticeApi = function ENoticeApi() {

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
        this.initEnoticeAPI = function (displayCount) {
            return _self.getNotices().done(function () {
                $('#NoticeArea .loading').hide();
                if (_self.allData.length == 0) {
                    $('#Notice').html('暫時仍未有任何紀錄');
                    return false;
                }

                if (displayCount < _self.allData.length) {
                    $('#NoticeArea .btnMoreNotice').show();
                } else {
                    $('#NoticeArea .btnMoreNotice').hide();
                }

                var $ul = $('#NoticeArea #Notice_event');
                $ul.empty();
                var noticeTemplate = $('#notice-template').html();
                var noticeAttachmentTemplate = $('#notice-attachment-template').html();
                for (var i = 0; i < displayCount; i++) {
                    var data = _self.allData[i] || null;
                    if (!data) {
                        break;
                    }

                    var attachmentUrl = '';
                    _.each(data['Attachments']['Attachment'], function (attachment, index) {
                        var compiled = _.template(noticeAttachmentTemplate);
                        attachmentUrl += compiled({
                            'attachmentUrl': attachment['FileURL'],
                            'attachmentIndex': attachment['FileName']
                        });
                    });

                    var url = ECLASS_ENOTICE_API.page_url + '?';
                    url += 'noticeId=' + data['NoticeID'];
                    url += '&noticeDate=' + data['DateStart'];

                    var compiled = _.template(noticeTemplate);
                    $ul.append(compiled({
                        'noticeId': data['NoticeID'],
                        'noticeDate': data['DateStart'],
                        'noticeTitle': data['Title'],
                        //'noticeDescription': data['Description'].replace(/(<([^>]+)>)/ig,""),
                        'noticeLink': url,
                        'attachmentUrl': attachmentUrl
                    }));
                }
            });
        }; // End initLatestNewsAPI()

        this.getNotices = function (data) {
            var _data = $.extend({}, {
                'action': 'eclass_enotice_api',
                'num_of_record': null,
                '_ajax_nonce': ECLASS_ENOTICE_API._ajax_nonce
            }, data);

            var $defer = $.Deferred();
            $.ajax({
                url: ECLASS_ENOTICE_API.url,
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
                        typeof(response['Notices']) == 'undefined' ||
                        typeof(response['Notices']['Notice']) == 'undefined'
                    ) {
                        _self.allData.length = 0;
                        $defer.resolve(_self.allData);
                        return;
                    }

                    //// Parse data START ////
                    if (typeof(response['Notices']['Notice']['NoticeID']) == 'undefined') {
                        $.each(response['Notices']['Notice'], function (index, notice) {
                            _self.allData.push(notice);
                        });
                    } else {
                        _self.allData.push(response['Notices']['Notice']);
                    }

                    $.each(_self.allData, function (index, notice) {
                        try {
                            var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
                            while (SCRIPT_REGEX.test(notice['Description'])) {
                                notice['Description'] = notice['Description'].replace(SCRIPT_REGEX, "");
                            }

                            if (typeof(notice['Attachments']['Attachment']['FileURL']) != 'undefined') {
                                notice['Attachments']['Attachment'] = [notice['Attachments']['Attachment']];
                            }
                        } catch (e) {
                            notice['Attachments']['Attachment'] = [];
                        }
                        _self.allData[index] = notice
                    });
                    //// Parse data END ////
                    $defer.resolve(_self.allData);
                },
                error: function (err) {
                    $defer.reject(err);
                },
            });
            return $defer;
        }; // End getNotices()

        //// Public func END ////
    }; // End class LatestNewsApi


});
