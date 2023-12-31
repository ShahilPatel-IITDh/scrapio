/* eslint-disable */
!(function (r, u) {
  'use strict'
  var c = 'function',
    i = 'undefined',
    b = 'object',
    s = 'model',
    e = 'name',
    o = 'type',
    a = 'vendor',
    n = 'version',
    d = 'architecture',
    t = 'console',
    w = 'mobile',
    l = 'tablet',
    m = 'smarttv',
    p = 'wearable',
    g = {
      extend: function (i, s) {
        var e = {}
        for (var o in i)
          s[o] && s[o].length % 2 == 0
            ? (e[o] = s[o].concat(i[o]))
            : (e[o] = i[o])
        return e
      },
      has: function (i, s) {
        return (
          'string' == typeof i &&
          -1 !== s.toLowerCase().indexOf(i.toLowerCase())
        )
      },
      lowerize: function (i) {
        return i.toLowerCase()
      },
      major: function (i) {
        return 'string' == typeof i
          ? i.replace(/[^\d\.]/g, '').split('.')[0]
          : u
      },
      trim: function (i) {
        return i.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
      },
    },
    f = {
      rgx: function (i, s) {
        for (var e, o, r, a, n, d, t = 0; t < s.length && !n; ) {
          var w = s[t],
            l = s[t + 1]
          for (e = o = 0; e < w.length && !n; )
            if ((n = w[e++].exec(i)))
              for (r = 0; r < l.length; r++)
                (d = n[++o]),
                  typeof (a = l[r]) == b && 0 < a.length
                    ? 2 == a.length
                      ? typeof a[1] == c
                        ? (this[a[0]] = a[1].call(this, d))
                        : (this[a[0]] = a[1])
                      : 3 == a.length
                      ? typeof a[1] != c || (a[1].exec && a[1].test)
                        ? (this[a[0]] = d ? d.replace(a[1], a[2]) : u)
                        : (this[a[0]] = d ? a[1].call(this, d, a[2]) : u)
                      : 4 == a.length &&
                        (this[a[0]] = d
                          ? a[3].call(this, d.replace(a[1], a[2]))
                          : u)
                    : (this[a] = d || u)
          t += 2
        }
      },
      str: function (i, s) {
        for (var e in s)
          if (typeof s[e] == b && 0 < s[e].length) {
            for (var o = 0; o < s[e].length; o++)
              if (g.has(s[e][o], i)) return '?' === e ? u : e
          } else if (g.has(s[e], i)) return '?' === e ? u : e
        return i
      },
    },
    h = {
      browser: {
        oldsafari: {
          version: {
            '1.0': '/8',
            1.2: '/1',
            1.3: '/3',
            '2.0': '/412',
            '2.0.2': '/416',
            '2.0.3': '/417',
            '2.0.4': '/419',
            '?': '/',
          },
        },
      },
      device: {
        amazon: { model: { 'Fire Phone': ['SD', 'KF'] } },
        sprint: {
          model: { 'Evo Shift 4G': '7373KT' },
          vendor: { HTC: 'APA', Sprint: 'Sprint' },
        },
      },
      os: {
        windows: {
          version: {
            ME: '4.90',
            'NT 3.11': 'NT3.51',
            'NT 4.0': 'NT4.0',
            2e3: 'NT 5.0',
            XP: ['NT 5.1', 'NT 5.2'],
            Vista: 'NT 6.0',
            7: 'NT 6.1',
            8: 'NT 6.2',
            8.1: 'NT 6.3',
            10: ['NT 6.4', 'NT 10.0'],
            RT: 'ARM',
          },
        },
      },
    },
    v = {
      browser: [
        [
          /(opera\smini)\/([\w\.-]+)/i,
          /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,
          /(opera).+version\/([\w\.]+)/i,
          /(opera)[\/\s]+([\w\.]+)/i,
        ],
        [e, n],
        [/(opios)[\/\s]+([\w\.]+)/i],
        [[e, 'Opera Mini'], n],
        [/\s(opr)\/([\w\.]+)/i],
        [[e, 'Opera'], n],
        [
          /(kindle)\/([\w\.]+)/i,
          /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
          /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,
          /(bidubrowser|baidubrowser)[\/\s]?([\w\.]+)/i,
          /(?:ms|\()(ie)\s([\w\.]+)/i,
          /(rekonq)\/([\w\.]*)/i,
          /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i,
        ],
        [e, n],
        [/(konqueror)\/([\w\.]+)/i],
        [[e, 'Konqueror'], n],
        [/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],
        [[e, 'IE'], n],
        [/(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i],
        [[e, 'Edge'], n],
        [/(yabrowser)\/([\w\.]+)/i],
        [[e, 'Yandex'], n],
        [/(Avast)\/([\w\.]+)/i],
        [[e, 'Avast Secure Browser'], n],
        [/(AVG)\/([\w\.]+)/i],
        [[e, 'AVG Secure Browser'], n],
        [/(puffin)\/([\w\.]+)/i],
        [[e, 'Puffin'], n],
        [/(focus)\/([\w\.]+)/i],
        [[e, 'Firefox Focus'], n],
        [/(opt)\/([\w\.]+)/i],
        [[e, 'Opera Touch'], n],
        [/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],
        [[e, 'UCBrowser'], n],
        [/(comodo_dragon)\/([\w\.]+)/i],
        [[e, /_/g, ' '], n],
        [/(windowswechat qbcore)\/([\w\.]+)/i],
        [[e, 'WeChat(Win) Desktop'], n],
        [/(micromessenger)\/([\w\.]+)/i],
        [[e, 'WeChat'], n],
        [/(brave)\/([\w\.]+)/i],
        [[e, 'Brave'], n],
        [/(qqbrowserlite)\/([\w\.]+)/i],
        [e, n],
        [/(QQ)\/([\d\.]+)/i],
        [e, n],
        [/m?(qqbrowser)[\/\s]?([\w\.]+)/i],
        [e, n],
        [/(baiduboxapp)[\/\s]?([\w\.]+)/i],
        [e, n],
        [/(2345Explorer)[\/\s]?([\w\.]+)/i],
        [e, n],
        [/(MetaSr)[\/\s]?([\w\.]+)/i],
        [e],
        [/(LBBROWSER)/i],
        [e],
        [/xiaomi\/miuibrowser\/([\w\.]+)/i],
        [n, [e, 'MIUI Browser']],
        [/;fbav\/([\w\.]+);/i],
        [n, [e, 'Facebook']],
        [/safari\s(line)\/([\w\.]+)/i, /android.+(line)\/([\w\.]+)\/iab/i],
        [e, n],
        [/headlesschrome(?:\/([\w\.]+)|\s)/i],
        [n, [e, 'Chrome Headless']],
        [/\swv\).+(chrome)\/([\w\.]+)/i],
        [[e, /(.+)/, '$1 WebView'], n],
        [/((?:oculus|samsung)browser)\/([\w\.]+)/i],
        [[e, /(.+(?:g|us))(.+)/, '$1 $2'], n],
        [/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],
        [n, [e, 'Android Browser']],
        [/(sailfishbrowser)\/([\w\.]+)/i],
        [[e, 'Sailfish Browser'], n],
        [/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],
        [e, n],
        [/(dolfin)\/([\w\.]+)/i],
        [[e, 'Dolphin'], n],
        [/(qihu|qhbrowser|qihoobrowser|360browser)/i],
        [[e, '360 Browser']],
        [/((?:android.+)crmo|crios)\/([\w\.]+)/i],
        [[e, 'Chrome'], n],
        [/(coast)\/([\w\.]+)/i],
        [[e, 'Opera Coast'], n],
        [/fxios\/([\w\.-]+)/i],
        [n, [e, 'Firefox']],
        [/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],
        [n, [e, 'Mobile Safari']],
        [/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],
        [n, e],
        [/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
        [[e, 'GSA'], n],
        [/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],
        [e, [n, f.str, h.browser.oldsafari.version]],
        [/(webkit|khtml)\/([\w\.]+)/i],
        [e, n],
        [/(navigator|netscape)\/([\w\.-]+)/i],
        [[e, 'Netscape'], n],
        [
          /(swiftfox)/i,
          /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
          /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,
          /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,
          /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
          /(links)\s\(([\w\.]+)/i,
          /(gobrowser)\/?([\w\.]*)/i,
          /(ice\s?browser)\/v?([\w\._]+)/i,
          /(mosaic)[\/\s]([\w\.]+)/i,
        ],
        [e, n],
      ],
      cpu: [
        [/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],
        [[d, 'amd64']],
        [/(ia32(?=;))/i],
        [[d, g.lowerize]],
        [/((?:i[346]|x)86)[;\)]/i],
        [[d, 'ia32']],
        [/windows\s(ce|mobile);\sppc;/i],
        [[d, 'arm']],
        [/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],
        [[d, /ower/, '', g.lowerize]],
        [/(sun4\w)[;\)]/i],
        [[d, 'sparc']],
        [
          /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i,
        ],
        [[d, g.lowerize]],
      ],
      device: [
        [/\((ipad|playbook);[\w\s\),;-]+(rim|apple)/i],
        [s, a, [o, l]],
        [/applecoremedia\/[\w\.]+ \((ipad)/],
        [s, [a, 'Apple'], [o, l]],
        [/(apple\s{0,1}tv)/i],
        [
          [s, 'Apple TV'],
          [a, 'Apple'],
          [o, m],
        ],
        [
          /(archos)\s(gamepad2?)/i,
          /(hp).+(touchpad)/i,
          /(hp).+(tablet)/i,
          /(kindle)\/([\w\.]+)/i,
          /\s(nook)[\w\s]+build\/(\w+)/i,
          /(dell)\s(strea[kpr\s\d]*[\dko])/i,
        ],
        [a, s, [o, l]],
        [/(kf[A-z]+)\sbuild\/.+silk\//i],
        [s, [a, 'Amazon'], [o, l]],
        [/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i],
        [
          [s, f.str, h.device.amazon.model],
          [a, 'Amazon'],
          [o, w],
        ],
        [/android.+aft([bms])\sbuild/i],
        [s, [a, 'Amazon'], [o, m]],
        [/\((ip[honed|\s\w*]+);.+(apple)/i],
        [s, a, [o, w]],
        [/\((ip[honed|\s\w*]+);/i],
        [s, [a, 'Apple'], [o, w]],
        [
          /(blackberry)[\s-]?(\w+)/i,
          /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,
          /(hp)\s([\w\s]+\w)/i,
          /(asus)-?(\w+)/i,
        ],
        [a, s, [o, w]],
        [/\(bb10;\s(\w+)/i],
        [s, [a, 'BlackBerry'], [o, w]],
        [
          /android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone|p00c)/i,
        ],
        [s, [a, 'Asus'], [o, l]],
        [/(sony)\s(tablet\s[ps])\sbuild\//i, /(sony)?(?:sgp.+)\sbuild\//i],
        [
          [a, 'Sony'],
          [s, 'Xperia Tablet'],
          [o, l],
        ],
        [
          /android.+\s([c-g]\d{4}|so[-l]\w+)(?=\sbuild\/|\).+chrome\/(?![1-6]{0,1}\d\.))/i,
        ],
        [s, [a, 'Sony'], [o, w]],
        [/\s(ouya)\s/i, /(nintendo)\s([wids3u]+)/i],
        [a, s, [o, t]],
        [/android.+;\s(shield)\sbuild/i],
        [s, [a, 'Nvidia'], [o, t]],
        [/(playstation\s[34portablevi]+)/i],
        [s, [a, 'Sony'], [o, t]],
        [/(sprint\s(\w+))/i],
        [
          [a, f.str, h.device.sprint.vendor],
          [s, f.str, h.device.sprint.model],
          [o, w],
        ],
        [
          /(htc)[;_\s-]+([\w\s]+(?=\)|\sbuild)|\w+)/i,
          /(zte)-(\w*)/i,
          /(alcatel|geeksphone|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i,
        ],
        [a, [s, /_/g, ' '], [o, w]],
        [/(nexus\s9)/i],
        [s, [a, 'HTC'], [o, l]],
        [/d\/huawei([\w\s-]+)[;\)]/i, /(nexus\s6p|vog-l29|ane-lx1|eml-l29)/i],
        [s, [a, 'Huawei'], [o, w]],
        [/android.+(bah2?-a?[lw]\d{2})/i],
        [s, [a, 'Huawei'], [o, l]],
        [/(microsoft);\s(lumia[\s\w]+)/i],
        [a, s, [o, w]],
        [/[\s\(;](xbox(?:\sone)?)[\s\);]/i],
        [s, [a, 'Microsoft'], [o, t]],
        [/(kin\.[onetw]{3})/i],
        [
          [s, /\./g, ' '],
          [a, 'Microsoft'],
          [o, w],
        ],
        [
          /\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,
          /mot[\s-]?(\w*)/i,
          /(XT\d{3,4}) build\//i,
          /(nexus\s6)/i,
        ],
        [s, [a, 'Motorola'], [o, w]],
        [/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],
        [s, [a, 'Motorola'], [o, l]],
        [/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],
        [
          [a, g.trim],
          [s, g.trim],
          [o, m],
        ],
        [/hbbtv.+maple;(\d+)/i],
        [
          [s, /^/, 'SmartTV'],
          [a, 'Samsung'],
          [o, m],
        ],
        [/\(dtv[\);].+(aquos)/i],
        [s, [a, 'Sharp'], [o, m]],
        [
          /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,
          /((SM-T\w+))/i,
        ],
        [[a, 'Samsung'], s, [o, l]],
        [/smart-tv.+(samsung)/i],
        [a, [o, m], s],
        [
          /((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,
          /(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,
          /sec-((sgh\w+))/i,
        ],
        [[a, 'Samsung'], s, [o, w]],
        [/sie-(\w*)/i],
        [s, [a, 'Siemens'], [o, w]],
        [/(maemo|nokia).*(n900|lumia\s\d+)/i, /(nokia)[\s_-]?([\w-]*)/i],
        [[a, 'Nokia'], s, [o, w]],
        [/android[x\d\.\s;]+\s([ab][1-7]\-?[0178a]\d\d?)/i],
        [s, [a, 'Acer'], [o, l]],
        [/android.+([vl]k\-?\d{3})\s+build/i],
        [s, [a, 'LG'], [o, l]],
        [/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],
        [[a, 'LG'], s, [o, l]],
        [/(lg) netcast\.tv/i],
        [a, s, [o, m]],
        [
          /(nexus\s[45])/i,
          /lg[e;\s\/-]+(\w*)/i,
          /android.+lg(\-?[\d\w]+)\s+build/i,
        ],
        [s, [a, 'LG'], [o, w]],
        [/(lenovo)\s?(s(?:5000|6000)(?:[\w-]+)|tab(?:[\s\w]+))/i],
        [a, s, [o, l]],
        [/android.+(ideatab[a-z0-9\-\s]+)/i],
        [s, [a, 'Lenovo'], [o, l]],
        [/(lenovo)[_\s-]?([\w-]+)/i],
        [a, s, [o, w]],
        [/linux;.+((jolla));/i],
        [a, s, [o, w]],
        [/((pebble))app\/[\d\.]+\s/i],
        [a, s, [o, p]],
        [/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],
        [a, s, [o, w]],
        [/crkey/i],
        [
          [s, 'Chromecast'],
          [a, 'Google'],
          [o, m],
        ],
        [/android.+;\s(glass)\s\d/i],
        [s, [a, 'Google'], [o, p]],
        [/android.+;\s(pixel c)[\s)]/i],
        [s, [a, 'Google'], [o, l]],
        [/android.+;\s(pixel( [23])?( xl)?)[\s)]/i],
        [s, [a, 'Google'], [o, w]],
        [
          /android.+;\s(\w+)\s+build\/hm\1/i,
          /android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,
          /android.+(mi[\s\-_]*(?:a\d|one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,
          /android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i,
        ],
        [
          [s, /_/g, ' '],
          [a, 'Xiaomi'],
          [o, w],
        ],
        [/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i],
        [
          [s, /_/g, ' '],
          [a, 'Xiaomi'],
          [o, l],
        ],
        [/android.+;\s(m[1-5]\snote)\sbuild/i],
        [s, [a, 'Meizu'], [o, w]],
        [/(mz)-([\w-]{2,})/i],
        [[a, 'Meizu'], s, [o, w]],
        [/android.+a000(1)\s+build/i, /android.+oneplus\s(a\d{4})[\s)]/i],
        [s, [a, 'OnePlus'], [o, w]],
        [/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],
        [s, [a, 'RCA'], [o, l]],
        [/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i],
        [s, [a, 'Dell'], [o, l]],
        [/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],
        [s, [a, 'Verizon'], [o, l]],
        [/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],
        [[a, 'Barnes & Noble'], s, [o, l]],
        [/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],
        [s, [a, 'NuVision'], [o, l]],
        [/android.+;\s(k88)\sbuild/i],
        [s, [a, 'ZTE'], [o, l]],
        [/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],
        [s, [a, 'Swiss'], [o, w]],
        [/android.+[;\/]\s*(zur\d{3})\s+build/i],
        [s, [a, 'Swiss'], [o, l]],
        [/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],
        [s, [a, 'Zeki'], [o, l]],
        [
          /(android).+[;\/]\s+([YR]\d{2})\s+build/i,
          /android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i,
        ],
        [[a, 'Dragon Touch'], s, [o, l]],
        [/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],
        [s, [a, 'Insignia'], [o, l]],
        [/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],
        [s, [a, 'NextBook'], [o, l]],
        [
          /android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i,
        ],
        [[a, 'Voice'], s, [o, w]],
        [/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],
        [[a, 'LvTel'], s, [o, w]],
        [/android.+;\s(PH-1)\s/i],
        [s, [a, 'Essential'], [o, w]],
        [/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],
        [s, [a, 'Envizen'], [o, l]],
        [/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],
        [a, s, [o, l]],
        [/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],
        [s, [a, 'MachSpeed'], [o, l]],
        [/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],
        [a, s, [o, l]],
        [/android.+[;\/]\s*TU_(1491)\s+build/i],
        [s, [a, 'Rotor'], [o, l]],
        [/android.+(KS(.+))\s+build/i],
        [s, [a, 'Amazon'], [o, l]],
        [/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],
        [a, s, [o, l]],
        [/\s(tablet|tab)[;\/]/i, /\s(mobile)(?:[;\/]|\ssafari)/i],
        [[o, g.lowerize], a, s],
        [/[\s\/\(](smart-?tv)[;\)]/i],
        [[o, m]],
        [/(android[\w\.\s\-]{0,9});.+build/i],
        [s, [a, 'Generic']],
      ],
      engine: [
        [/windows.+\sedge\/([\w\.]+)/i],
        [n, [e, 'EdgeHTML']],
        [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
        [n, [e, 'Blink']],
        [
          /(presto)\/([\w\.]+)/i,
          /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
          /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,
          /(icab)[\/\s]([23]\.[\d\.]+)/i,
        ],
        [e, n],
        [/rv\:([\w\.]{1,9}).+(gecko)/i],
        [n, e],
      ],
      os: [
        [/microsoft\s(windows)\s(vista|xp)/i],
        [e, n],
        [
          /(windows)\snt\s6\.2;\s(arm)/i,
          /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,
          /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i,
        ],
        [e, [n, f.str, h.os.windows.version]],
        [/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],
        [
          [e, 'Windows'],
          [n, f.str, h.os.windows.version],
        ],
        [/\((bb)(10);/i],
        [[e, 'BlackBerry'], n],
        [
          /(blackberry)\w*\/?([\w\.]*)/i,
          /(tizen|kaios)[\/\s]([\w\.]+)/i,
          /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i,
        ],
        [e, n],
        [/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],
        [[e, 'Symbian'], n],
        [/\((series40);/i],
        [e],
        [/mozilla.+\(mobile;.+gecko.+firefox/i],
        [[e, 'Firefox OS'], n],
        [
          /(nintendo|playstation)\s([wids34portablevu]+)/i,
          /(mint)[\/\s\(]?(\w*)/i,
          /(mageia|vectorlinux)[;\s]/i,
          /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
          /(hurd|linux)\s?([\w\.]*)/i,
          /(gnu)\s?([\w\.]*)/i,
        ],
        [e, n],
        [/(cros)\s[\w]+\s([\w\.]+\w)/i],
        [[e, 'Chromium OS'], n],
        [/(sunos)\s?([\w\.\d]*)/i],
        [[e, 'Solaris'], n],
        [/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],
        [e, n],
        [/(haiku)\s(\w+)/i],
        [e, n],
        [
          /cfnetwork\/.+darwin/i,
          /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i,
        ],
        [
          [n, /_/g, '.'],
          [e, 'iOS'],
        ],
        [/(mac\sos\sx)\s?([\w\s\.]*)/i, /(macintosh|mac(?=_powerpc)\s)/i],
        [
          [e, 'Mac OS'],
          [n, /_/g, '.'],
        ],
        [
          /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,
          /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,
          /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
          /(unix)\s?([\w\.]*)/i,
        ],
        [e, n],
      ],
    },
    x = function (i, s) {
      if (('object' == typeof i && ((s = i), (i = u)), !(this instanceof x)))
        return new x(i, s).getResult()
      var e =
          i ||
          (r && r.navigator && r.navigator.userAgent
            ? r.navigator.userAgent
            : ''),
        o = s ? g.extend(v, s) : v
      return (
        (this.getBrowser = function () {
          var i = { name: u, version: u }
          return f.rgx.call(i, e, o.browser), (i.major = g.major(i.version)), i
        }),
        (this.getCPU = function () {
          var i = { architecture: u }
          return f.rgx.call(i, e, o.cpu), i
        }),
        (this.getDevice = function () {
          var i = { vendor: u, model: u, type: 'desktop' }
          return f.rgx.call(i, e, o.device), i
        }),
        (this.getEngine = function () {
          var i = { name: u, version: u }
          return f.rgx.call(i, e, o.engine), i
        }),
        (this.getOS = function () {
          var i = { name: u, version: u }
          return f.rgx.call(i, e, o.os), i
        }),
        (this.getResult = function () {
          return {
            ua: this.getUA(),
            browser: this.getBrowser(),
            engine: this.getEngine(),
            os: this.getOS(),
            device: this.getDevice(),
            cpu: this.getCPU(),
          }
        }),
        (this.getUA = function () {
          return e
        }),
        (this.setUA = function (i) {
          return (e = i), this
        }),
        this
      )
    }
  ;(x.VERSION = '0.7.21'),
    (x.BROWSER = { NAME: e, MAJOR: 'major', VERSION: n }),
    (x.CPU = { ARCHITECTURE: d }),
    (x.DEVICE = {
      MODEL: s,
      VENDOR: a,
      TYPE: o,
      CONSOLE: t,
      MOBILE: w,
      SMARTTV: m,
      TABLET: l,
      WEARABLE: p,
      EMBEDDED: 'embedded',
    }),
    (x.ENGINE = { NAME: e, VERSION: n }),
    (x.OS = { NAME: e, VERSION: n }),
    typeof exports != i
      ? (typeof module != i && module.exports && (exports = module.exports = x),
        (exports.UAParser = x))
      : 'function' == typeof define && define.amd
      ? define(function () {
          return x
        })
      : r && (r.UAParser = x)
  var k = r && (r.jQuery || r.Zepto)
  if (k && !k.ua) {
    var y = new x()
    ;(k.ua = y.getResult()),
      (k.ua.get = function () {
        return y.getUA()
      }),
      (k.ua.set = function (i) {
        y.setUA(i)
        var s = y.getResult()
        for (var e in s) k.ua[e] = s[e]
      })
  }
})('object' == typeof window ? window : this)

dataLayerObjName = 'dataLayer'
domain = 'ficohsa.com'
domainRegExp = new RegExp(
  /((ficohsa|tuconcienciafinanciera|ficohsapensiones)\.com)|hechoencasa\..com\.hn$/gi
)

function getFullMonth(month) {
  switch (month.toString()) {
    case '01':
    case '1':
      var ptMonth = 'January'
      break
    case '02':
    case '2':
      var ptMonth = 'February'
      break
    case '03':
    case '3':
      var ptMonth = 'March'
      break
    case '04':
    case '4':
      var ptMonth = 'April'
      break
    case '05':
    case '5':
      var ptMonth = 'May'
      break
    case '06':
    case '6':
      var ptMonth = 'June'
      break
    case '07':
    case '7':
      var ptMonth = 'July'
      break
    case '08':
    case '8':
      var ptMonth = 'August'
      break
    case '09':
    case '9':
      var ptMonth = 'September'
      break
    case '10':
      var ptMonth = 'October'
      break
    case '11':
      var ptMonth = 'November'
      break
    case '12':
      var ptMonth = 'December'
      break
    default:
      return month
  }

  return ptMonth
}

// Función que devuelve el nombre del día
function getWeekDay(weekday) {
  switch (weekday.toString()) {
    case '0':
      var ptMonth = 'Sunday'
      break
    case '1':
      var ptMonth = 'Monday'
      break
    case '2':
      var ptMonth = 'Tuesday'
      break
    case '3':
      var ptMonth = 'Wednesday'
      break
    case '4':
      var ptMonth = 'Thursday'
      break
    case '5':
      var ptMonth = 'Friday'
      break
    case '6':
      var ptMonth = 'Saturday'
      break
    case '7':
      var ptMonth = 'Sunday'
      break
    default:
      return weekday
  }

  return ptMonth
}

// Función para llamar una cookie
function getCookie(check_name) {
  var a_all_cookies = document.cookie.split(';')
  var a_temp_cookie = ''
  var cookie_name = ''
  var cookie_value = ''
  var b_cookie_found = false
  for (i = 0; i < a_all_cookies.length; i++) {
    a_temp_cookie = a_all_cookies[i].split('=')
    cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '')
    if (cookie_name == check_name) {
      b_cookie_found = true
      if (a_temp_cookie.length > 1) {
        cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''))
      }
      return cookie_value
      break
    }
    a_temp_cookie = null
    cookie_name = ''
  }
  if (!b_cookie_found) {
    return null
  }
}

// Función para crear una cookie
function setCookie(cname, cvalue, exdays) {
  var expires = ''
  if (exdays != null) {
    var d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    expires = ';expires=' + d.toUTCString()
  }
  document.cookie =
    cname + '=' + cvalue + expires + ';domain=.' + domain + ';path=/; secure'
}

window[dataLayerObjName] = window[dataLayerObjName] || []
window[dataLayerObjName].push({
  technology: (function () {
    var obj = {
      userAgent: window.navigator.userAgent,
      screenResolution: window.screen.width + 'x' + window.screen.height,
      serviceProvider: (function () {
        try {
          var cookieValue = getCookie('serviceProvider')
          return JSON.parse(cookieValue) || { loaded: false }
        } catch (e) {
          return { loaded: false }
        }
      })(),
    }
    try {
      var uaParsed = new UAParser().getResult()
      obj.browser = uaParsed.browser // Browser Information JSON String '{major:(String),name:(String),version:(String)}'
      obj.operatingSystem = uaParsed.os // Operational System JSON String '{name:(String),version:(String)}'
      obj.device = uaParsed.device // Device Information JSON String '{model:(String),type:(String),vendor:(String)}'
    } catch (e) {
      obj.browser = { major: undefined, name: undefined, version: undefined }
      obj.operatingSystem = { name: undefined, version: undefined }
      obj.device = { model: undefined, type: undefined, vendor: undefined }
    }
    return obj
  })(),
  visit: (function () {
    var obj = {},
      today = new Date()
    obj.holiday = (function () {
      try {
        var cookieValue = getCookie('holiday')
        return JSON.parse(cookieValue) || { loaded: false }
      } catch (e) {
        return { loaded: false }
      }
    })()
    obj.location = (function () {
      try {
        var cookieValue = getCookie('location')
        return JSON.parse(cookieValue) || { loaded: false }
      } catch (e) {
        return { loaded: false }
      }
    })()
    obj.weather = (function () {
      try {
        var cookieValue = getCookie('weather')
        return JSON.parse(cookieValue) || { loaded: false }
      } catch (e) {
        return { loaded: false }
      }
    })()
    try {
      obj.day = today.getDate()
      obj.day = obj.day < 10 ? '0' + obj.day : obj.day
      obj.month = today.getMonth() + 1
      obj.month = obj.month < 10 ? '0' + obj.month : obj.month
      obj.monthName = getFullMonth(obj.month)
      obj.year = today.getFullYear().toString()
      obj.date = obj.day + '/' + obj.month + '/' + obj.year
      obj.timezone = parseInt((today.getTimezoneOffset() / 60) * -1)
      obj.timezone = (obj.timezone > 0 ? '+' : '') + obj.timezone
      obj.hour = today.getHours()
      obj.hour = obj.hour < 10 ? '0' + obj.hour : obj.hour.toString()
      obj.minutes = today.getMinutes()
      obj.minutes =
        obj.minutes < 10 ? '0' + obj.minutes : obj.minutes.toString()
      obj.time = obj.hour + ':' + obj.minutes
      obj.secs = today.getSeconds()
      obj.secs = obj.secs < 10 ? '0' + obj.secs : obj.secs.toString()
      obj.timeExact = obj.time + ':' + obj.secs
      obj.weekday = getWeekDay(today.getDay())
      obj.weekdayWeekend =
        obj.weekday == 'Sunday' || obj.weekday == 'Saturday'
          ? 'weekend'
          : 'weekday'
    } catch (e) {}
    return obj
  })(),
})

var GTM_ID = ['www.ficohsa.hn', 'ficohsa.hn'].includes(window.location.host)
  ? 'GTM-NLN3NNV'
  : 'GTM-PGPNTJ9'

window.addEventListener('load', function () {
  ;(function (w, d, s, l, i) {
    w[l] = w[l] || []
    /* w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }) */
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : ''
    j.async = true
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
    f.parentNode.insertBefore(j, f)
  })(window, document, 'script', dataLayerObjName, GTM_ID)
})
