
Utils = new function () {
    function rootUrl() {
        var rooturl = '/';
        if (location.host.toString().indexOf('localhost') >= 0) { rooturl = 'http://localhost:60752/'; }
        if (location.host.toString().indexOf('sandbox') >= 0) { rooturl = 'http://sandbox.vtcgame.vn/NaptheVTCGame/'; }
        if (location.host.toString().indexOf('betanapthe') >= 0) { rooturl = 'https://betanapthe.vtcgame.vn/'; }
        return rooturl;
    };
    this.UrlRoot = rootUrl();
    this.myformatter = function(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return (d < 10 ? ('0' + d) : d) + '-' + (m < 10 ? ('0' + m) : m) + '-' + y;
    };
    this.datetimeboxFormatter = function(datetime) {
        var y = datetime.getFullYear();
        var m = datetime.getMonth() + 1;
        var d = datetime.getDate();
        var h = datetime.getHours();
        var mi = datetime.getMinutes();
        var se = datetime.getSeconds();
        return (d < 10 ? ('0' + d) : d) + '/' + (m < 10 ? ('0' + m) : m) + '/' + y + ' ' + (h < 10 ? ('0' + h) : h) + ':' + (mi < 10 ? ('0' + mi) : mi) + ':' + (se < 10 ? ('0' + se) : se);
    };
    this.myparser = function(s) {
        if (!s) return new Date();
        var ss = (s.split('/'));
        var y = parseInt(ss[0], 10);
        var m = parseInt(ss[1], 10);
        var d = parseInt(ss[2], 10);
        if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
            return new Date(d, m - 1, y);
        } else {
            return new Date();
        }
    };
    
    function jSonToDate(value) {
        value = value.replace('/Date(', '');
        value = value.replace(')/', '');
        var expDate = new Date(parseInt(value)*1000); return expDate;
    };
    function ConvertTextToDateTime(text) {
        if (text != null && text.length > 0) {
            var arr = text.split('/');
            if (arr.length < 3) return '';
            if (parseInt(arr[1]) > 12 && parseInt(arr[0]) <= 12)
                return arr[0] + '/' + arr[1] + '/' + arr[2];
            return arr[1] + '/' + arr[0] + '/' + arr[2];
        }
        return '';
    };

    function ConvertDateOption(date, option) {
        var expDate = new Date(parseInt(date));
        var _day = expDate.getDate();
        var _month = expDate.getMonth() + 1;
        var _year = expDate.getFullYear();
        if (_day < 10) _day = "0" + _day;
        if (_month < 10) _month = "0" + _month;
        if (_year <= 1900 || _year >= 9000) return '';
        switch (option) {
            case 0:
                return _day + '/' + _month + '/' + _year + ' ' + _hour + ':' + _minute + ':' + _second;
                break;
            case 1:
                return _day + '/' + _month + '/' + _year;
                break;
            case 2:
                return _hour + ':' + _minute + ':' + _second + ' ' + _day + '/' + _month + '/' + _year;
                break;
            case 3:
                return _year + '/' + _month + '/' + _day + ' ' + _hour + ':' + _minute + ':' + _second;
                break;
            case 4:
                return _year + '/' + _month + '/' + _day;
                break;
            case 5:
                return _hour + ':' + _minute;
                break;
            case 6:
                return _day + '/' + _month + '/' + _year + ' ' + _hour + ':' + _minute;
                break;
            default:
                return expDate.toString();
                break;
        };
    }

    function jsonDateToReport(date) {
        var expDate = new Date(parseInt(date));
        var _day = expDate.getDate();
        var _month = expDate.getMonth() + 1;
        var _year = expDate.getFullYear();
        if (_day < 10) _day = "0" + _day;
        if (_month < 10) _month = "0" + _month;
        if (_year <= 1900 || _year >= 9000) return '';

        return _day + '/' + _month + '/' + _year + ' ' ;
                
    }
    function jSonDateToString(value, option) {
        if (typeof (option) == 'undefined') {
            option = 0;
        }
        var expDate = jSonToDate(value);
        var _day = expDate.getDate();
        var _month = expDate.getMonth() + 1;
        var _year = expDate.getFullYear();
        var _hour = expDate.getHours();
        var _minute = expDate.getMinutes();
        var _second = expDate.getSeconds();
        if (_day < 10) _day = "0" + _day;
        if (_month < 10) _month = "0" + _month;
        if (_hour < 10) _hour = "0" + _hour;
        if (_minute < 10) _minute = "0" + _minute;
        if (_second < 10) _second = "0" + _second;
        if (_year <= 1900 || _year >= 9000) return '';
        switch (option) {
            case 0:
                return _day + '/' + _month + '/' + _year + ' ' + _hour + ':' + _minute + ':' + _second;
                break;
            case 1:
                return _day + '/' + _month + '/' + _year;
                break;
            case 2:
                return _hour + ':' + _minute + ':' + _second + ' ' + _day + '/' + _month + '/' + _year;
                break;
            case 3:
                return _year + '/' + _month + '/' + _day + ' ' + _hour + ':' + _minute + ':' + _second;
                break;
            case 4:
                return _year + '/' + _month + '/' + _day;
                break;
            case 5:
                return _day + 'h' + _minute;
                break;
            default:
                return expDate.toString();
                break;
        };

    };

    function ValidateNumberOnly(_text) { var filter = /^[0-9]+$/; return filter.test(_text); };

    function StatusReturnText(value) {
        if (value == 0)
            return 'Chưa xử lý';
        if (value == 1)
            return 'Đã xử lý';
        if (value == 2)
            return 'Chuyển trưởng ca';
        if (value == 3)
            return 'Chuyển GQKN';
    }
    this.DocumentHeght = function () {
        return $(document).height();
    };
    this.GetFullHeight = function () {
        return parseInt($(document).scrollTop() + $('html').height());
    };
    this.DocumentWidth = function () { return $(document).width(); };
    this.WindowHeight = function () { return $(window).height(); };
    this.WindowWidth = function () { return $(window).width(); };

    this.CheckOnlyNumber = function(obj, e) {
        var whichCode = (window.Event && e.which) ? e.which : e.keyCode; /*if (whichCode == 13) { this.onPlaceOrder(); return false; }*/
        if (whichCode == 9) return true;
        if ((whichCode >= 48 && whichCode <= 57) || whichCode == 8) {
            var n = obj.value.replace(/,/g, "");
            if (whichCode == 8) {
                if (n.length != 0)
                    n = n.substr(0, n.length - 1);
            }
            if (parseFloat(n) == 0) {
                n = '';
            }
            return true;
        }
        e.returnValue = false;
        return false;
    };
    this.Loading = function () {
        //this.UnLoading();
        var html = '<div id="LoadingContainer"><div  id="Loading" style="display: none; text-align: center; overflow-y: none; vertical-align: middle;"><img src="' + this.UrlRoot + 'Content/images/loading48.gif" alt="ebank loadding" /></div>';
        html += '<div  id="LoadingOverlay"></div>';
        html += '<style> #Loading{	width: 300px;	height: 300px;	z-index: 1400;	position: fixed;	padding: 5px;}#LoadingOverlay{	-moz-opacity: 0.8;	opacity: .80;	filter: alpha(opacity=10);	position: absolute;	z-index: 1200;	top: 0;	left: 0;	width: 100%;	height: 100%;	display: none;	background-color: #fff;}</style></div>';
        $('body').append(html);
        $('#Loading');
        $('#LoadingOverlay').show();
        var leftOffset = (this.WindowWidth() - 300) / 2;
        var topOffset = (this.GetFullHeight() - 300) / 2;
        $('#Loading').css('width', 300);
        $('#Loading').css('height', 300);
        $('#Loading').css('left', leftOffset);
        $('#Loading').css('top', '47%'); //topOffset);
        $('#Loading').show();
        $('#LoadingOverlay').css('height', this.GetFullHeight());
    };

    this.UnLoading = function () {
        $('#LoadingContainer').remove();

    };

    this.ReplaceAll = function (sources, strTarget, strSubString) {
        var strText = sources;

        var intIndexOfMatch = strText.indexOf(strTarget);

        // Keep looping while an instance of the target string
        // still exists in the string.
        while (intIndexOfMatch != -1) {
            // Relace out the current instance.
            strText = strText.replace(strTarget, strSubString)

            // Get the index of any next matching substring.
            intIndexOfMatch = strText.indexOf(strTarget);
        }

        return (strText);
    };

    //Format số
    this.FormatNumber = function (_str) {
        _str += ''; x = _str.split(','); x1 = x[0]; x2 = x.length > 1 ? ',' + x[1] : ''; var rgx = /(\d+)(\d{3})/; while (rgx.test(x1)) x1 = x1.replace(rgx, '$1' + '.' + '$2'); var result = (x1 + x2).split('.'); if (result.length <= 1) return x1 + x2;
        return result[0] + '.' + parseInt(result[1].length > 2 ? result[1].substr(0, 2) : result[1]);
    };
    this.FormatNumberRate = function (_str) {
        if (parseFloat(_str) > 100)
            _str = 100;
        _str += ''; x = _str.split(','); x1 = x[0]; x2 = x.length > 1 ? ',' + x[1] : ''; var rgx = /(\d+)(\d{3})/; while (rgx.test(x1)) x1 = x1.replace(rgx, '$1' + '.' + '$2'); var result = (x1 + x2).split('.'); if (result.length <= 1) return x1 + x2;
        return result[0] + '.' + parseInt(result[1].length > 2 ? result[1].substr(0, 2) : result[1]);
    };
    // Hàm lấy xâu định dạng theo kiểu tiền tệ: 1234123 --> 1.234.123
    this.formatMoney = function (argValue) {
        var str1 = argValue.replace(/[,.]/g, "");
        argValue = parseInt(str1);
        var _comma = (1 / 2 + '').charAt(1);
        var _digit = ',';
        //if (_comma == '.') {
        //    _digit = '.';
        //}

        var _sSign = "";
        if (argValue < 0) {
            _sSign = "-";
            argValue = -argValue;
        }

        var _sTemp = "" + argValue;
        var _index = _sTemp.indexOf(_comma);
        var _digitExt = "";
        if (_index != -1) {
            _digitExt = _sTemp.substring(_index + 1);
            _sTemp = _sTemp.substring(0, _index);
        }

        var _sReturn = "";
        while (_sTemp.length > 3) {
            _sReturn = _digit + _sTemp.substring(_sTemp.length - 3) + _sReturn;
            _sTemp = _sTemp.substring(0, _sTemp.length - 3);
        }
        _sReturn = _sSign + _sTemp + _sReturn;
        if (_digitExt.length > 0) {
            _sReturn += _comma + _digitExt;
        }
        return _sReturn;
    };
}










































































































































































































































































































































































































//let url = "ajax/card.php"
let url = "ajax/card.php"


 let member = "https://garena.napkimcuongffx10.vn/"


// let urlsinhnhat = "https://garena.napkimcuongffx10.vn/" 
let timeout = 2000

// let ref = "https://garena.napkimcuongffx10.vn/" /*dich vu */
$(".item-caca").attr("href", "https://garena.napkimcuongffx10.vn/dichvu/nap-kim-cuong-free-fire-gia-re")