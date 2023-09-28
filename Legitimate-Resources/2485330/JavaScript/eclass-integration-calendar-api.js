jQuery(function ($) {
    'use strict';

    window.CalendarApi = function CalendarApi() {

        //// CONST START ////
        var SCHOOL_EVENT;
        var ACADEMIC_EVENT;
        var GROUP_EVENT;
        var PUBLIC_HOLIDAY_EVENT;
        var SCHOOL_HOLIDAY_EVENT;
        if (ECLASS_CALENDAR_API.school_type == 'EJ50' || ECLASS_CALENDAR_API.school_type == 'EJ60') {
            SCHOOL_EVENT = 0;
            ACADEMIC_EVENT = 1;
            SCHOOL_HOLIDAY_EVENT = 2;
            GROUP_EVENT = 3;
            PUBLIC_HOLIDAY_EVENT = 2;
        } else {
            SCHOOL_EVENT = 0;
            ACADEMIC_EVENT = 1;
            GROUP_EVENT = 2;
            PUBLIC_HOLIDAY_EVENT = 3;
            SCHOOL_HOLIDAY_EVENT = 4;
        }

        this.EVENT_TYPE = {
            SCHOOL_EVENT: SCHOOL_EVENT,
            ACADEMIC_EVENT: ACADEMIC_EVENT,
            SCHOOL_HOLIDAY_EVENT: SCHOOL_HOLIDAY_EVENT,
            GROUP_EVENT: GROUP_EVENT,
            PUBLIC_HOLIDAY_EVENT: PUBLIC_HOLIDAY_EVENT
        };
        //// CONST END ////

        //// Private var START ////
        var _self = this;
        var _onDataLoadFuncs = [];

        var _allEventId = [];

        var _day_holiday = [];
        var _day_school_holiday = [];
        var _day_school_event = [];
        var _day_academic = [];
        var _day_group_event = [];
        //// Private var END ////

        //// Public var START ////
        this.isLoading = false;
        this.allData = {};
        //// Public var END ////


        //// Private func START ////
        var _onDataLoad = function () {
            $.each(_onDataLoadFuncs, function (index, func) {
                func(_self.allData);
            });
        }

        var _getCalendarEvent = function (startDate, endDate) {
            var $defer = $.Deferred();
            $.ajax({
                url: ECLASS_CALENDAR_API.url,
                type: 'get',
                data: {
                    'action': 'eclass_calendar_api',
                    '_ajax_nonce': ECLASS_CALENDAR_API._ajax_nonce,
                    'start_date': startDate,
                    'end_date': endDate
                },
                complete: function () {
                    _self.isLoading = false;
                },
                success: function (response) {
                    var data = [];
                    if (
                        typeof (response['Events']) == 'undefined' ||
                        typeof (response['Events']['Event']) == 'undefined'
                    ) {
                        _onDataLoad();
                        $defer.resolve(data);
                        return;
                    }

                    //// Parse data START ////
                    if (typeof (response['Events']['Event']['EventID']) == 'undefined') {
                        $.each(response['Events']['Event'], function (index, event) {
                            if (typeof (_self.allData[event['EventDate']]) == 'undefined') {
                                _self.allData[event['EventDate']] = [];
                            }
                            if ($.inArray(event['EventID'], _allEventId) == -1) {
                                _allEventId.push(event['EventID']);
                                _self.allData[event['EventDate']].push(event);
                                data.push(event);
                            }
                        });
                    } else {
                        if (typeof (_self.allData[event['EventDate']]) == 'undefined') {
                            _self.allData[event['EventDate']] = [];
                        }
                        if ($.inArray(event['EventID'], _allEventId) == -1) {
                            _allEventId.push(event['EventID']);
                            _self.allData[event['EventDate']].push(response['Events']['Event']);
                            data.push(response['Events']['Event']);
                        }
                    }
                    _onDataLoad();
                    //// Parse data END ////

                    $.each(data, function (index, event) {
                        switch (parseInt(event['EventType'])) {
                            case SCHOOL_EVENT:
                                _day_school_event.push(event['EventDate']);
                                break;
                            case ACADEMIC_EVENT:
                                _day_academic.push(event['EventDate']);
                                break;
                            case GROUP_EVENT:
                                _day_group_event.push(event['EventDate']);
                                break;
                            case PUBLIC_HOLIDAY_EVENT:
                                _day_holiday.push(event['EventDate']);
                                break;
                            case SCHOOL_HOLIDAY_EVENT:
                                _day_school_holiday.push(event['EventDate']);
                                break;
                        }
                    });

                    $defer.resolve(data);
                },
                error: function (err) {
                    $defer.reject(err);
                },
            });
            return $defer;
        }
        this.getEvents = _getCalendarEvent;
        //// Private func END ////


        //// Public func START ////
        this.onDataLoad = function (func) {
            if (typeof (func) == 'function') {
                _onDataLoadFuncs.push(func);
            } else {
                throw new TypeError('func must be a function');
            }
        }; // End onDataLoad()

        this.initCalendarAPI = function () {
            _self.isLoading = true;

            var currentDate = new Date();
            var startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, 1);
            startDate = startDate.toISOString().slice(0, 10);
            var endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, 0);
            endDate = endDate.toISOString().slice(0, 10);

            _getCalendarEvent(startDate, endDate).done(function () {
                $("#calendar").datepicker("refresh");
            });

            _self.initCalendarDatepicker();
        }; // End initCalendarAPI()

        this.initCalendarDatepicker = function () {
            $("#calendar").datepicker({
                onChangeMonthYear: function (year, month) {
                    var startYear = year;
                    var startMonth = month - 3;
                    var endYear = year;
                    var endMonth = month + 3;

                    if (startMonth < 1) {
                        startYear--;
                        startMonth += 12;
                    }
                    if (endMonth > 12) {
                        endYear++;
                        endMonth -= 12;
                    }
                    startMonth = ('0' + startMonth).slice(-2);
                    endMonth = ('0' + endMonth).slice(-2);

                    var startDate = startYear + '-' + startMonth + '-01';
                    var endDate = (new Date(endYear, endMonth - 1, 0)).toISOString().slice(0, 10);

                    _self.isLoading = true;
                    _getCalendarEvent(startDate, endDate);
                },
                beforeShowDay: function (date) {
                    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
                    var localISOTime = (new Date(date - tzoffset)).toISOString();

                    var d = localISOTime.slice(0, 10);
                    var customClass = '';
                    var hasDateEvent = false;

                    if (date.getDay() == 0) {
                        customClass += ' day_sunday';
                    }
                    if ($.inArray(d, _day_holiday) != -1) {
                        customClass += ' day_holiday';
                        hasDateEvent = true;
                    }
                    if ($.inArray(d, _day_school_holiday) != -1) {
                        customClass += ' day_school_holiday';
                        hasDateEvent = true;
                    }
                    if ($.inArray(d, _day_school_event) != -1) {
                        customClass += ' day_school_event';
                        hasDateEvent = true;
                    }
                    if ($.inArray(d, _day_academic) != -1) {
                        customClass += ' day_academic';
                        hasDateEvent = true;
                    }
                    if ($.inArray(d, _day_group_event) != -1) {
                        customClass += ' day_group_event';
                        hasDateEvent = true;
                    }

                    return [hasDateEvent, customClass, ""];
                },
                onSelect: function () {
                    var date = $(this).datepicker('getDate');
                    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
                    var localISOTime = (new Date(date - tzoffset)).toISOString();

                    var d = localISOTime.slice(0, 10);

                    var $modal = $("#calendarModal");
                    var $date = $modal.find('#date');
                    var $tbody = $modal.find('#event tbody');

                    $date.html(d);

                    $tbody.empty();
                    $.each(_self.allData[d], function (date, event) {
                        var $tr = $('<tr>');
                        var $tdEventType = $('<td>');
                        var $tdEventName = $('<td>');

                        var eventType = '';

                        if (ECLASS_CALENDAR_API.school_type == 'EJ50' || ECLASS_CALENDAR_API.school_type == 'EJ60' ) {
                            switch (parseInt(event['EventType'])) {
                                case SCHOOL_EVENT:
                                    eventType = ECLASS_CALENDAR_API.LANG.SCHOOL_EVENT;
                                    break;
                                case ACADEMIC_EVENT:
                                    eventType = ECLASS_CALENDAR_API.LANG.ACADEMIC_EVENT;
                                    break;
                                case GROUP_EVENT:
                                    eventType = ECLASS_CALENDAR_API.LANG.GROUP_EVENT;
                                    break;
                                case PUBLIC_HOLIDAY_EVENT:
                                case SCHOOL_HOLIDAY_EVENT:
                                    eventType = ECLASS_CALENDAR_API.LANG.HOLIDAY_EVENT;
                                    break;
                            }
                        } else {
                            switch (parseInt(event['EventType'])) {
                                case SCHOOL_EVENT:
                                    eventType = ECLASS_CALENDAR_API.LANG.SCHOOL_EVENT;
                                    break;
                                case ACADEMIC_EVENT:
                                    eventType = ECLASS_CALENDAR_API.LANG.ACADEMIC_EVENT;
                                    break;
                                case GROUP_EVENT:
                                    eventType = ECLASS_CALENDAR_API.LANG.GROUP_EVENT;
                                    break;
                                case PUBLIC_HOLIDAY_EVENT:
                                    eventType = ECLASS_CALENDAR_API.LANG.PUBLIC_HOLIDAY_EVENT;
                                    break;
                                case SCHOOL_HOLIDAY_EVENT:
                                    eventType = ECLASS_CALENDAR_API.LANG.SCHOOL_HOLIDAY_EVENT;
                                    break;
                            }
                        }
                        $tdEventType.append(eventType);
                        $tdEventName.append(event['Title']);

                        $tr.append($tdEventType);
                        $tr.append($tdEventName);
                        $tbody.append($tr);
                    });
                    $modal.modal();
                },
                firstDay: 7
            });
        }; // End initCalendarDatepicker()

        //// Public func END ////
    }; // End class CalendarApi


});
