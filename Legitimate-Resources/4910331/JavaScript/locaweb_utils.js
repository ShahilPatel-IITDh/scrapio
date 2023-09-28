var locamail = locamail || {};

var locaweb_utils = (function () {

  function userTimeFormatForMoment() {
    var format = rcmail.env.lm_user_time_format.split(" "),
      user_time = format[0].split(":"),
      user_hour = user_time[0],
      user_time_posfix = format[1];

    if (user_hour.match(/[G]/)) {
      user_hour = "H";
    } else if (user_hour.match(/[H]/)) {
      user_hour = "HH";
    } else if (user_hour.match(/[g]/)) {
      user_hour = "h";
    } else if (user_hour.match(/[h]/)) {
      user_hour = "hh";
    }

    user_time_posfix = user_time_posfix ? (" " + user_time_posfix) : "";

    return user_hour + ":mm" + user_time_posfix;
  }

  function closeOpenedDropdowns() {
    $('.dropdown.open').removeClass('open');
  }

  function loadTooltipStyle() {
    $('[data-toggle="tooltip"][title]').tooltip({
      "trigger": "hover"
    });
  }

  function convertMbToBytes(MB) {
    return MB * 1024 * 1024;
  }

  function getText(textIndex, textVariables) {
    var text = rcmail.gettext(textIndex),
      regExpVariable,
      textVariable,
      textVariablesIndex = 0;

    textVariables = textVariables && !$.isArray(textVariables) && typeof textVariables === 'object' ? textVariables : {};

    for (textVariablesIndex in textVariables) {
      textVariable = textVariables[textVariablesIndex];
      regExpVariable = new RegExp('\\$' + textVariablesIndex, 'g');
      text = text.replace(regExpVariable, textVariable);
    }

    return text;
  }

  function microtime(getAsFloat) {
    var seconds;
    var now;

    if (typeof performance !== 'undefined' && performance.now) {
      now = (performance.now() + performance.timing.navigationStart) / 1e3;
      if (getAsFloat) {
        return now;
      }

      seconds = now | 0;
      return (Math.round((now - seconds) * 1e6) / 1e6) + ' ' + seconds;
    }

    now = (Date.now ? Date.now() : new Date().getTime()) / 1e3;
    if (getAsFloat) {
      return now;
    }

    seconds = now | 0;
    return (Math.round((now - seconds) * 1e3) / 1e3) + ' ' + seconds;
  }

  function togglePassword($buttonTarget) {
    var labelShow = rcmail.labels['locamail_translate.showpass'],
      labelHide = rcmail.labels['locamail_translate.hidepass'];

    $buttonTarget.on('click', function () {
      var $button = $(this),
        $passwordField = $button.parent().find('.lm-input-toggle-pass');

      if ($passwordField.attr('type') === 'password') {
        $passwordField.attr('type', 'text');
        $button.text(labelHide);

        return;
      }

      $passwordField.attr('type', 'password');
      $button.text(labelShow);
    });
  }

  return {
    closeOpenedDropdowns: closeOpenedDropdowns,
    userTimeFormatForMoment: userTimeFormatForMoment,
    loadTooltipStyle: loadTooltipStyle,
    convertMbToBytes: convertMbToBytes,
    getText: getText,
    microtime: microtime,
    togglePassword: togglePassword
  };

}());
