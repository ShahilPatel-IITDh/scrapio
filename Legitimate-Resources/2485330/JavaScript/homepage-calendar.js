$(function () {
    'use strict';

    if ($('#calendar').length == 0) {
        return;
    }

    var isChinese = $('body').hasClass('zh');
    var currentDate = moment();
    var currentSelectedDate = moment();

    /**** Load api data START ****/
    var api = new CalendarApi();
    var getData = (function () {
        if (_.isUndefined(CalendarApi)) {
            var $defer = $.Deferred();
            setTimeout(function () {
                $defer.resolve([]);
            })
            return $defer;

        }
        return api.getEvents();
        /*var startDate = currentDate.clone().subtract(2, 'years').format('YYYY-01-01');
        var endDate = currentDate.clone().add(2, 'years').format('YYYY-12-31');
        return api.getEvents(startDate, endDate);*/
    });

    var getEventTypeText = (function (type) {
        switch (parseInt(type)) {
            case api.EVENT_TYPE.SCHOOL_EVENT:
                return (isChinese) ? '學校事項' : 'School Events';
            case api.EVENT_TYPE.ACADEMIC_EVENT:
                return (isChinese) ? '教學事項' : 'Academic Events';
            case api.EVENT_TYPE.SCHOOL_HOLIDAY_EVENT:
                return (isChinese) ? '學校假期' : 'School Holidays';
            case api.EVENT_TYPE.GROUP_EVENT:
                return (isChinese) ? '小組事項' : 'Group Events';
            case api.EVENT_TYPE.PUBLIC_HOLIDAY_EVENT:
                return (isChinese) ? '公眾假期' : 'Public Holidays';
        }
        return '';
    });
    /**** Load api data END ****/

    var app = new Vue({
        el: '#calendar',
        data: {
            isLoading: true,
            eventData: {
                /*'2018-07-22': [
                    {
                        'title': '學校事項',
                        'type': 'event',
                        'content': 'TSA 口試（確實日期有待公佈）',
                    },
                ],*/
            },
            cycleData: {

            },
            currentSelectedDate: currentSelectedDate,
            selectedEvent: {},
        },
        computed: {
            blankDayCount: function () {
                return this.currentSelectedDate.startOf('month').day();
            },
            monthDayCount: function () {
                return this.currentSelectedDate.daysInMonth();
            },
        },
        methods: {
            init: function (data) {
                var eventData = {};
                var cycleData = {};
                let data2 = data.filter((row) => row.EventType == 'cycleDay');
                data = data.filter((row) => row.EventType != 'cycleDay');
                for (var i = 0; i < data.length; i++) {
                    var date = data[i]['EventDate'];
                    if (isChinese) {
                    data[i]['Title'] = _.isString(data[i]['Title']) ? data[i]['Title'] : '';
                    } else {
                        data[i]['Title'] = _.isString(data[i]['TitleEn']) ? data[i]['TitleEn'] : '';
                    }
                    if (isChinese) {
                    data[i]['Description'] = _.isString(data[i]['Description']) ? data[i]['Description'] : '';
                    } else {
                        data[i]['Description'] = _.isString(data[i]['DescriptionEn']) ? data[i]['DescriptionEn'] : '';
                    }

                    eventData[date] = eventData[date] || [];
                    eventData[date].push({
                        EventDate: date,
                        Title: data[i]['Title'],
                        Type: data[i]['EventType'],
                        TypeText: getEventTypeText(data[i]['EventType']),
                        Description: data[i]['Description'],
                        CssClass: (data[i]['EventType'] == api.EVENT_TYPE.PUBLIC_HOLIDAY_EVENT) ? 'holiday' : 'event',
                    });
                }
                for (var i = 0; i < data2.length; i++) {
                    let date = data2[i]['EventDate'];

                    cycleData[date] = cycleData[date] || [];
                    cycleData[date].push({
                        Chi: data2[i]['CycleChi'],
                        Eng: data2[i]['CycleEng'],
                        Short: data2[i]['CycleShort']
                    });
                }

                this.eventData = eventData;
                this.cycleData = cycleData;
                this.isLoading = false;
            },
            refreshView: function () {
                this.currentSelectedDate = null;
                this.currentSelectedDate = currentSelectedDate;
            },
            changeSelectedMonth: function (month) {
                currentSelectedDate.add(month, 'months');
                this.refreshView();
            },
            getDayClass: function (day) {
                var day = this.currentSelectedDate.clone().set('date', day);
                var liClass = '';
                var events = this.eventData[day.format('YYYY-MM-DD')];
                var isNoEvent = _.isUndefined(events);
                var isOnlyPublicHoliday = false;

                if (!isNoEvent && events[0]['Type'] == api.EVENT_TYPE.PUBLIC_HOLIDAY_EVENT) {
                    isOnlyPublicHoliday = true;
                }

                if (isNoEvent) {
                    liClass += ' noEvent';
                } else if (!isOnlyPublicHoliday) {
                    liClass += ' event';
                }

                if (day.isSame(currentDate, 'day')) {
                    liClass += ' today';
                }

                if (isOnlyPublicHoliday) {
                    liClass += ' holiday';
                }

                return liClass || 'noEvent';
            },
            getDayCycle: function(day){
                var day = this.currentSelectedDate.clone().set('date', day);
                var cycle = this.cycleData[day.format('YYYY-MM-DD')];

                if (_.isUndefined(cycle)) {
                    return null;
                }

                return cycle[0]['Short'];
            },
            showDayDetails: function (day) {
                var cycleDay = this.getDayCycle(day);
                var day = this.currentSelectedDate.clone().set('date', day);
                var events = this.eventData[day.format('YYYY-MM-DD')];

                if (_.isUndefined(events)) {
                    return;
                }

                /**** Init selected event START ****/
                var dateHtml = '';
                if (isChinese) {
                    dateHtml += day.format('YYYY');
                    dateHtml += ' <span class="small">年</span> ';
                    dateHtml += day.format('MM');
                    dateHtml += ' <span class="small">月</span> ';
                    dateHtml += day.format('DD');
                    dateHtml += ' <span class="small">日</span> ';
                } else {
                    dateHtml += day.format('YYYY-MM-DD');
                }

                if(cycleDay){
                    dateHtml += ' ('+cycleDay+')';
                }

                this.selectedEvent = {
                    dateHtml: dateHtml,
                    events: events
                };
                /**** Init selected event END ****/

                $('#calendarDetails').modal('show');
            },
        }
    });

    /**** Init START ****/
    getData().done(app.init);
    /**** Init END ****/
});