// 显示日期------------------------------
(() => {
    let calendar = {
        lunarInfo: [19416, 19168, 42352, 21717, 53856, 55632, 91476, 22176, 39632, 21970, 19168, 42422, 42192, 53840, 119381, 46400, 54944, 44450, 38320, 84343, 18800, 42160, 46261, 27216, 27968, 109396, 11104, 38256, 21234, 18800, 25958, 54432, 59984, 28309, 23248, 11104, 100067, 37600, 116951, 51536, 54432, 120998, 46416, 22176, 107956, 9680, 37584, 53938, 43344, 46423, 27808, 46416, 86869, 19872, 42448, 83315, 21200, 43432, 59728, 27296, 44710, 43856, 19296, 43748, 42352, 21088, 62051, 55632, 23383, 22176, 38608, 19925, 19152, 42192, 54484, 53840, 54616, 46400, 46496,
            103846, 38320, 18864, 43380, 42160, 45690, 27216, 27968, 44870, 43872, 38256, 19189, 18800, 25776, 29859, 59984, 27480, 21952, 43872, 38613, 37600, 51552, 55636, 54432, 55888, 30034, 22176, 43959, 9680, 37584, 51893, 43344, 46240, 47780, 44368, 21977, 19360, 42416, 86390, 21168, 43312, 31060, 27296, 44368, 23378, 19296, 42726, 42208, 53856, 60005, 54576, 23200, 30371, 38608, 19415, 19152, 42192, 118966, 53840, 54560, 56645, 46496, 22224, 21938, 18864, 42359, 42160, 43600, 111189, 27936, 44448
        ],
        lunarMonth: "正,二,三,四,五,六,七,八,九,十,十一,腊".split(","),
        monthPrefix: ["初", "十", "廿",
            "三"
        ],
        lunarDay: "十,一,二,三,四,五,六,七,八,九".split(","),
        lYearDays: function(a) { let b, d = 348; for (b = 32768; b > 8; b = b >> 1) d = d + (this.lunarInfo[a - 1900] & b ? 1 : 0); return d + this.leapDays(a) },
        leapDays: function(a) { return this.leapMonth(a) ? this.lunarInfo[a - 1900] & 65536 ? 30 : 29 : 0 },
        leapMonth: function(a) { return this.lunarInfo[a - 1900] & 15 },
        monthDays: function(a, b) { return this.lunarInfo[a - 1900] & 65536 >> b ? 30 : 29 },
        Lunar: function(a) {
            let b = 0,
                d = 0,
                c = Math.floor((a - new Date(1900, 0, 31)) / 864E5);
            this.dayCyl = c + 40;
            this.monCyl = 14;
            for (a = 1900; a < 2050 &&
                c > 0; a++) {
                d = this.lYearDays(a);
                c = c - d;
                this.monCyl = this.monCyl + 12
            }
            if (c < 0) {
                c = c + d;
                a--;
                this.monCyl = this.monCyl - 12
            }
            this.year = a;
            this.yearCyl = a - 1864;
            b = this.leapMonth(a);
            this.isLeap = false;
            for (a = 1; a < 13 && c > 0; a++) {
                if (b > 0 && a == b + 1 && this.isLeap == false) {
                    --a;
                    this.isLeap = true;
                    d = this.leapDays(this.year)
                } else d = this.monthDays(this.year, a);
                if (this.isLeap == true && a == b + 1) this.isLeap = false;
                c = c - d;
                this.isLeap == false && this.monCyl++
            }
            if (c == 0 && b > 0 && a == b + 1)
                if (this.isLeap) this.isLeap = false;
                else { this.isLeap = true;--a;--this.monCyl }
            if (c <
                0) { c = c + d;--a;--this.monCyl }
            this.month = a;
            this.day = c + 1
        }
    };

    let a = new Date;
    let b = a.getMonth() + 1,
        c = a.getDay(),
        d = a.getDate(),
        e = a.getMinutes(),
        f = a.getHours(),
        g = a.getFullYear(),
        h = ["日", "一", "二", "三", "四", "五", "六"];
    b = (b < 10 ? "0" : "") + b;
    d = (d < 10 ? "0" : "") + d;
    e = (e < 10 ? "0" : "") + e;
    f = (f < 10 ? "0" : "") + f;
    calendar.Lunar(a);
    a = "";
    calendar.isLeap && (a = "闰");
    a = a + (calendar.lunarMonth[calendar.month - 1] + "月");
    a = calendar.day != 20 ? a + calendar.monthPrefix[calendar.day <= 10 ? 0 : Math.floor(calendar.day / 10)] : a + "二";
    a = a + calendar.lunarDay[Math.floor(calendar.day % 10)];

    $("#date_of_today").html(g + "年" + b + "月" + d + "日");
    $("#lunarDate").html("农历" + a);
    $("#real_time").html(f + ":" + e);
    setInterval(function() {
        let a = new Date;
        if (a.getSeconds() == 0) {
            f = a.getHours();
            e = a.getMinutes();
            e = (e < 10 ? "0" : "") + e;
            f = (f < 10 ? "0" : "") + f;
            $("#real_time").html(f + ":" + e)
        }
    }, 1E3)
    $('#searchBtn').on('click', function() {
        let a = $("#searchInput").val();
        if (a != '') window.open("https://www.sogou.com/web?pid=sogou-site-1becf26e9f32353e&ie=utf8&query=" + a);
    });
})();