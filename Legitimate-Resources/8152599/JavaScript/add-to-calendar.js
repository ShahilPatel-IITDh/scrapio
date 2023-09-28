'use strict';

/* eslint-disable */
(function (createCalendar, $) {

  if ($('.event__add-to-calendar').length > 0) {
    var convertToMilitary = function convertToMilitary(value) {
      var timeRegex = /(\d{1,2})(?:[: ]?(\d{2}))? *([APap][Mm])/;
      var match = timeRegex.exec(value);

      if (match != null) {
        var hour = parseInt(match[1]);
        var minute = parseInt(match[2]);
        var period = match[3].toUpperCase();

        if (period === 'PM' && hour < 12) {
          hour += 12;
        } else if (period === 'AM' && hour === 12) {
          hour = 0;
        }

        if (isNaN(minute)) {
          minute = 0;
        }

        minute = '00' + minute.toString();
        hour = '00' + hour.toString();

        return hour.substring(hour.length - 2) + ':' + minute.substring(minute.length - 2);
      } else {
        return null;
      }
    };

    var pageTitle = $('#page-title').text();
    var startTime = convertToMilitary($('.event__add-to-calendar').attr('data-start-time'));
    var endTime = convertToMilitary($('.event__add-to-calendar').attr('data-end-time'));
    var date = $('.event__add-to-calendar').attr('data-date');
    var concatStart = date + ' ' + startTime;
    var concatEnd = date + ' ' + endTime;

    var myCalendar = createCalendar({
      options: {
        class: 'my-class',

        // You can pass an ID. If you don't, one will be generated for you
        id: 'my-id'
      },
      data: {
        // Event title
        title: $('.event__headline-title').text(),
        // Event start date
        start: new Date(concatStart),
        // You can also choose to set an end time
        // If an end time is set, this will take precedence over duration
        end: new Date(concatEnd),
        // Event Address
        address: $('.event__info-location').text(),
        // Event Description
        description: $('.event__subhead p').text()
      }
    });

    document.querySelector('.event__add-to-calendar').appendChild(myCalendar);
  }
})(createCalendar, jQuery);
/* eslint-enable */
//# sourceMappingURL=add-to-calendar.js.map
