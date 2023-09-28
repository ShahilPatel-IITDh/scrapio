function dtime_me(d, like_eu) {
    var now = new Date();
    now.setDate(now.getDate() + d + 1);

    var dayNum = '';
    if (now.getDate() < 10) {
        dayNum = '0';
    }
    dayNum += now.getDate();

    var monthNum = '';
    if (now.getMonth() + 1 < 10) {
        monthNum = '0';
    }
    monthNum += now.getMonth() + 1;

    if (like_eu === true) {
        document.write(dayNum + "." + monthNum + "." + now.getFullYear());
    } else {
        document.write(monthNum + "/" + dayNum + "/" + now.getFullYear());
    }

}


months_localized = {
    'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
}

days_localized = {
    'en': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
}

function dtime_mt(d) {
    var now = new Date();
    now.setDate(now.getDate() + d + 1);
    document.write((now.getDate()) + ", " + " " + months_localized['en'][now.getMonth()] + " " + now.getFullYear());
}
