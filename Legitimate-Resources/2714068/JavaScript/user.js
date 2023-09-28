"use strict";
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e
} : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};

!function (w) {
    // 公共方法
    w.ray7 = {
        _time: 2021011106,
        _use: function (callBack) {
            let _t = this,
                layer = '/static/js/layui/layer/layer.js',
                jq = "/static/js/jquery.min.js";
            callBack = callBack || new Function();
            w.$ = _typeof(w.$) !== "function" ? ((_typeof(w.layui) !== "undefined" && _typeof(w.layui.jquery) === "function") ? layui.jquery : null) : w.$;
            w.layer = _typeof(w.layer) !== "object" ? ((_typeof(w.layui) !== "undefined" && _typeof(w.layui.layer) === "object") ? layui.layer : null) : w.layer;
            if (w.$ === null) {
                _t.loadJC.load(jq, function () {
                    if (w.layer === null) {
                        _t.loadJC.load(layer, function () {
                            return callBack();
                        });
                    } else {
                        return callBack();
                    }
                });
            } else {
                if (w.layer === null) {
                    _t.loadJC.load(layer, function () {
                        return callBack();
                    });
                } else {
                    return callBack();
                }
            }
        },
        ajax: {
            _init: function (callBack) {
                ray7._use(function () {
                    void function () {
                        let ajax = '', _t = this;
                        $.ajax = function (opt, conf) {
                            opt = Object.assign({
                                url: '', data: {}, async: true, headers: {}, type: 'post', dataType: 'json',
                                beforeSend: function (e) {
                                }, success: function (e) {
                                }, error: function (e, m) {
                                    ray7.alert.msg('请求失败: ', m);
                                }
                            }, opt), conf = Object.assign({
                                time: 3 * 1000,
                                msg: '正在处理数据中...',
                            }, conf);
                            const success = opt.success, error = opt.error, beforeSend = opt.beforeSend;
                            opt.success = opt.load ? function (e) {
                                setTimeout(function () {
                                    ray7.alert.loadClose();
                                    success(e)
                                }, conf.time);
                            } : opt.success, opt.error = opt.load ? function (e, m) {
                                setTimeout(function () {
                                    ray7.alert.loadClose();
                                    error(e, m);
                                }, conf.time);
                            } : opt.error, opt.beforeSend = opt.load ? function (e) {
                                ray7.alert.load(conf.msg);
                                beforeSend(e);
                            } : opt.beforeSend, delete opt.load;
                            return ajax(opt);
                        };
                    }();
                    callBack();
                });
            },
            request: function (opt) {
                ray7._use(function () {
                    opt = $.extend({}, {
                        data: {},
                        type: 'get',
                        dataType: 'json',
                        async: true,
                        error: function (e, m) {
                            ray7.alert.alert(m, {}, true);
                        }
                    }, opt);
                    return $.ajax(opt);
                });
            },
            post: function (url, data, suc, load) {
                ray7._use(function () {
                    !(false !== load) || ray7.alert.load(null, true);
                    $.ajax({
                        url: url, data: data, async: true, type: 'post', dataType: "json",
                        success: function success(e) {
                            ray7.alert.loadClose(true);
                            setTimeout(function () {
                                if (e.code < 1) {
                                    ray7.alert.alert(e.msg, {}, true);
                                } else {
                                    ray7.alert.msg(e.msg, {
                                        time: 600
                                    }, true);
                                    !(w.name && parent.layer.getFrameIndex(w.name)) || ray7.alert.loadClose(true);
                                }
                                return suc(e);
                            }, 120)
                        },
                        error: function error(e, m) {
                            ray7.alert.loadClose(true);
                            ray7.alert.alert('远程服务器异常', {}, true);
                        }
                    });
                });
            },
            get: function (url, data, suc, load) {
                ray7._use(function () {
                    !(false !== load) || ray7.alert.load(null, true);
                    $.ajax({
                        url: url, data: data, async: true, type: 'get', dataType: "json",
                        success: function success(e) {
                            ray7.alert.loadClose(true);
                            setTimeout(function () {
                                if (e.code < 1) {
                                    ray7.alert.alert(e.msg, {}, true);
                                } else {
                                    ray7.alert.msg(e.msg, {
                                        time: 600
                                    }, true);
                                    !(w.name && parent.layer.getFrameIndex(w.name)) || ray7.alert.loadClose(true);
                                }
                                suc(e);
                            }, 120)
                        },
                        error: function error(e, m) {
                            ray7.alert.loadClose(true);
                            ray7.alert.alert('远程服务器异常', {}, true);
                        }
                    });
                })
            }
        },
        cookie: {
            set: function (key, val, path, expires) {
                const i = new Date;
                path = path || "/", expires = expires || 1, i.setTime(i.getTime() + 60 * expires * 60 * 1e3),
                    document.cookie = key + "=" + escape(val) + ";path=" + path + (null === expires ? "" : "; expires=" + i.toUTCString())
            },
            get: function (key) {
                const t = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
                return document.cookie.match(t) ? unescape(document.cookie.match(t)[2]) : null
            },
            del: function (key) {
                this.set(key, "", "/", 0)
            }
        },
        str: {
            randomStr: function (len) {
                len = len || 16;
                let char = (new Date().getTime()) + 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', str = '',
                    maxLen = char.length;
                for (let i = 0; i < len; i++) {
                    str += char.charAt(Math.floor(Math.random() * maxLen));
                }
                return str;
            },
            subStr: function (str, start, n) {
                if (str.replace(/[\u4e00-\u9fa5]/g, '**').length <= n) {
                    return str;
                }
                let len = 0, result = '';
                for (let i = start; i < str.length; i++) {
                    if (/[\u4e00-\u9fa5]/.test(str[i])) {
                        len += 2;
                    } else {
                        len += 1;
                    }
                    if (len > n) {
                        break;
                    } else {
                        result += str[i];
                    }
                }
                return result;
            },
            replace: function (str, substr, replace) {
                if (_typeof(str) !== 'string') return str;
                return str.replace(substr, replace);
            },
            /**
             * @param str 待处理字符串
             * @param substr {array} [被替换1，被替换2]
             * @param replace {array} [替换1，替换2]
             */
            replaceAll: function (str, substr, replace) {
                if (_typeof(str) !== 'string') return str;
                if (substr.length !== replace.length) {
                    return console.log('substr长度与replace长度不匹配'), !1;
                }
                const _t = this;
                substr.forEach(function (v, i) {
                    replace.forEach(function () {
                        str = _t.replace(str, v, replace[i]);
                    });
                });
                return str;
            },
            countStr: function (substr, str) {
                if (_typeof(str) !== 'string') return str;
                return str.split(substr).length - 1
            },
            ltrim: function (str) {
                if (_typeof(str) !== 'string') return str;
                const reg_str = /^\s*/g;
                return str.replace(reg_str, "");
            },
            rtrim: function (str, r) {
                if (_typeof(str) !== 'string') return str;
                const reg_str = /\s*$/g;
                return str.replace(reg_str, "");
            },
            strim: function (str) {
                if (_typeof(str) !== 'string') return str;
                const reg_str = /(^\s*)|(\s*$)/g;
                return str.replace(reg_str, "");
            },
            isEmpty: function (e) {
                return !(e !== undefined && null != e && "" !== e && e && this.strim(e) && 0 !== e.length);
            }
        },
        array: {
            // 数组去重
            unique: function (arr) {
                return Array.from(new Set(arr))
            },
            // 数组乱序
            shuffle: function (arr) {
                return arr.sort(function () {
                    return Math.random() - 0.5
                });
            },
            // 随机获取数组的值
            rand: function (arr, count) {
                count = count || 1;
                let sf = arr.slice(0), i = arr.length, min = i - count, temp, index;
                while (i-- > min) {
                    index = Math.floor((i + 1) * Math.random());
                    temp = sf[index];
                    sf[index] = sf[i];
                    sf[i] = temp;
                }
                return sf.slice(min);
            },
            // 数组删除某个元素
            remove: function (arr, item) {
                let t = [];
                delete arr[item];
                arr.forEach(function (v) {
                    !(v) || t.push(v);
                });
                return t;
            },
            // 数组排序
            sort: function (arr, name, by) {
                if (_typeof(arr) !== 'object' || arr.length < 1) return arr;
                by = (by = (by || 'asc'), by === 'asc') ? 1 : -1;
                return arr.sort(function (a, b) {
                    a = a[name],
                        b = b[name];
                    if (a < b) {
                        return by * -1;
                    }
                    if (a > b) {
                        return by * 1;
                    }
                    return 0;
                });
            }
        },
        time: {
            toDay: function (start, end, format) {
                if (end < start) return '结束时间不能小于开始时间';
                let m = '',
                    f = [], s = new Date(start).getTime(),
                    e = new Date(end).getTime();
                format = format || 'd-h-m-s';
                const mss = e - s;
                if (isNaN(mss)) return '时间格式不合法';
                const xx = {
                    d: function d() {
                        return parseInt(mss / (1000 * 60 * 60 * 24)) + " 天 ";
                    },
                    h: function h() {
                        return parseInt(mss % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)) + " 小时 ";
                    },
                    m: function m() {
                        return parseInt(mss % (1000 * 60 * 60) / (1000 * 60)) + " 分钟 ";
                    },
                    s: function s() {
                        return mss % (1000 * 60) / 1000 + " 秒 ";
                    }
                };
                f = format.split('-');
                try {
                    f.forEach(function (a, i) {
                        if (a != '') {
                            m += xx[a].call(this);
                        }
                    });
                    return m;
                } catch (e) {
                    console.log(e.message);
                }
            },
            format: function (time) {
                if (time === 0) return time;
                let n = new Date(time * 1000),
                    y = n.getFullYear(),
                    mon = n.getMonth() + 1,
                    d = n.getDate().toString().length === 1 ? '0' + n.getDate().toString() : n.getDate(),
                    h = n.getHours().toString().length === 1 ? '0' + n.getHours().toString() : n.getHours(),
                    m = n.getMinutes().toString().length === 1 ? '0' + n.getMinutes().toString() : n.getMinutes(),
                    s = n.getSeconds().toString().length === 1 ? '0' + n.getSeconds().toString() : n.getSeconds();
                return y + "-" + mon + "-" + d + "   " + h + ":" + m + ":" + s;
            },
            timeAgo: function (e) {
                let diffTime = parseInt(new Date().getTime() / 1000) - parseInt(new Date(e).getTime() / 1000);
                if (!ray7.str.isEmpty(diffTime)) {
                    if (diffTime < 60) {
                        diffTime = "刚刚";
                    } else if (diffTime < 60 * 60) {
                        diffTime = parseInt(diffTime / 60.0) + "分钟前";
                    } else if (diffTime >= 60 * 60 && diffTime < 60 * 60 * 24) {
                        diffTime = parseInt(diffTime / 3600.0) + "小时前"
                    } else {
                        diffTime = parseInt(diffTime / (60 * 60 * 24)) + '天前';
                    }
                }
                return diffTime;
            }
        },
        alert: {
            msg: function (msg, opt, parent) {
                return ray7._use(function () {
                    let alt = parent ? w.parent.layer.msg : layer.msg;
                    opt = Object.assign({
                        time: 0,
                        shade: .1,
                        type: 1,
                        anim: 5,
                        scrollbar: false,
                        zIndex: ray7._time
                    }, opt);
                    return alt(msg, opt);
                })
            },
            load: function (msg, parent) {
                const _t = this;
                return ray7._use(function () {
                    msg = msg || '正在提交程序中...';
                    return _t.loadMsg = _t.msg(msg, {
                        time: 0,
                        anim: 5,
                    }, parent);
                })
            },
            loadClose: function (parent, name) {
                const _t = this;
                ray7._use(function () {
                    name = name || _t.loadMsg;
                    return parent ? (w.parent.layer.close(name), (w.name && w.parent.layer.close(w.parent.layer.getFrameIndex(w.name))), layer.close(name)) : layer.close(name);
                });
            },
            loadCloseAll: function (parent) {
                ray7._use(function () {
                    return parent ? (parent.layer.closeAll(), layer.closeAll()) : layer.closeAll();
                })
            },
            open: function (title, content, type, width, height, endBack, isFul, p) {
                title = title || !1, type = type || 2, content = content || "404.html",
                    width = ((width > w.innerWidth ? '' : width) || .9 * w.innerWidth),
                    height = ((height > w.innerHeight ? '' : height) || w.innerHeight - 50),
                    endBack = endBack || function () {
                    };
                return ray7._use(function () {
                    const alt = p ? parent.layer.open : layer.open;
                    let index = alt({
                        type: type,
                        area: [width + "px", height === 'auto' ? 'auto' : height + "px"],
                        fixed: false,
                        maxmin: false,
                        shadeClose: !1,
                        resize: true,
                        shade: .1,
                        title: title,
                        content: content,
                        scrollbar: false,
                        end: function (e) {
                            endBack(e)
                        }
                    });
                    isFul && layer.full(index);
                })
            },
            iframe: function (title, content, endBack, ifFul) {
                let w = parent.window.innerWidth * .7, h = parent.window.innerHeight * .8;
                endBack = _typeof(endBack) === "function" ? endBack : new Function();
                return this.open(title, content, 2, w, h, endBack, ifFul, true);
            },
            alert: function (msg, opt, parent) {
                return ray7._use(function () {
                    let alt = parent ? w.parent.layer.alert : layer.alert;
                    opt = Object.assign({
                        skin: 'layui-layer-lan'
                        , title: '错误提示'
                        , closeBtn: 0
                        , shade: .1
                        , anim: 5,
                        btn: ['确定']
                    }, opt);
                    return alt(msg, opt);
                })
            }
        },
        QRcode: {
            get: function (elem, text, width, height, dark, light, level) {
                ray7._use(function () {
                    try {
                        ray7.loadJC.load('/static/js/qrcode.min.js', function () {
                            ray7.qrcode_test = text;
                            return ray7.qrcode = new QRCode(elem, {
                                text: text,
                                width: width || 128,
                                height: height || 128,
                                colorDark: dark || "#000000",
                                colorLight: light || "#ffffff",
                                correctLevel: level || QRCode.CorrectLevel.H
                            });
                        });
                    } catch (e) {
                        ray7.alert.msg(e.message);
                    }
                });
            },
            reload: function () {
                null != ray7.qrcode && ray7.qrcode.makeCode(ray7.qrcode_test + (-1 !== ray7.qrcode_test.indexOf("?") ? "&" : "?&") + "_t=" + (new Date).getTime());
            }
        },
        loadJC: {
            load: function (e, n) {
                var i = [], s = function s(e, t) {
                    if (null != e && 0 < e.length) for (var n = e.length, a = 0; a < n; a++) if (e[a] === t) return !0;
                    return !1
                }, c = function c(e) {
                    return null != e && 0 < e.length ? e.substr(e.lastIndexOf(".")).toLowerCase() : ""
                }, o = function o(e, t) {
                    var n, a;
                    s(i, e) ? t() : (".js" === (n = c(e).toString()) ? (a = document.createElement("script")).src = e : ".css" === n ? ((a = document.createElement("link")).href = e, a.type = "text/css", a.rel = "stylesheet") : ".less" === n && ((a = document.createElement("link")).href = e, a.type = "text/css", a.rel = "stylesheet/less"), t = t || function () {
                    }, a.onload = a.onreadystatechange = function () {
                        this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (t(), i.push(e))
                    }, document.getElementsByTagName("head")[0].appendChild(a))
                }, a = [];
                "object" === (void 0 === e ? "undefined" : _typeof(e)) ? a = e : "string" == typeof e && (a = e.split(",")), null != a && 0 < a.length && function () {
                    for (var e = 0, t = 0; t < a.length; t++) o(a[t], function () {
                        ++e == a.length && n()
                    })
                }()
            }
        },
        user: {
            isLogin: function () {
                return !ray7.str.isEmpty(this.info());
            },
            name: function () {
                return this.info('user_name');
            },
            id: function () {
                return this.info('user_id');
            },
            avatar: function () {
                return this.info('avatar');
            },
            token: function () {
                return this.info('token');
            },
            info: function (e) {
                let t;
                return e = e || "",
                    (t = ray7.cookie.get("ULTOKEN")) ? "token" === e ? JSON.parse(t).token : "user_name" === e ? JSON.parse(t).user_name : "user_id" === e ? JSON.parse(t).user_id : "avatar" === e ? JSON.parse(t).avatar : JSON.parse(t) : ""
            }
        },
        html: {
            url: w.document.url,
            title: w.document.title,
            path: w.location.pathname,
            domain: w.location.origin,
            isPC: function () {
                const userAgent = navigator.userAgent.toLowerCase()
                    , ipad = userAgent.match(/ipad/i) === "ipad"
                    , iphone = userAgent.match(/iphone os/i) === "iphone os"
                    , midP = userAgent.match(/midp/i) === "midp"
                    , rv = userAgent.match(/rv:1.2.3.4/i) === "rv:1.2.3.4"
                    , ucWeb = userAgent.match(/ucweb/i) === "ucweb"
                    , android = userAgent.match(/android/i) === "android"
                    , winCe = userAgent.match(/windows ce/i) === "windows ce"
                    , winMobile = userAgent.match(/windows mobile/i) === "windows mobile";
                return !(ipad || iphone || midP || rv || ucWeb || android || winCe || winMobile);
            },
            urlParam: function (val, url) {
                let name, value, str = (url || location.href), num = str.indexOf("?"), param = [];
                str = str.substr(num + 1);
                const arr = str.split("&");
                for (let i = 0; i < arr.length; i++) {
                    num = arr[i].indexOf("=");
                    if (num > 0) {
                        name = arr[i].substring(0, num);
                        value = arr[i].substr(num + 1);
                        param[name] = value;
                    }
                }
                return param[val] ? param[val] : param;
            },
            formatParam: function (val) {
                let arr = [];
                for (let n in val) {
                    arr.push(encodeURIComponent(n) + "=" + encodeURIComponent(val[n]));
                }
                arr.push(("_t=" + new Date().getTime()));
                return arr.join("&");
            },
            renderUrl: function (url, param) {
                let p = ray7.html.urlParam('', url), key = Object.keys(param);
                if (key.length > 0) {
                    key.forEach(function (i) {
                        p[i] = param[i];
                    });
                }
                url = ray7.str.countStr(url, '?') ? ray7.str.subStr(url, 0, url.indexOf("?")) : url;
                return url + '?' + ray7.html.formatParam(p);
            },
            envType: function () {
                let u = navigator.userAgent
                    , isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
                    , isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                if (isAndroid) {
                    return 'android';
                } else if (isiOS) {
                    return 'ios';
                } else {
                    return 'pc';
                }
            },
            isAlipayOrWechat: function () {
                let payEnv = '';
                if (/MicroMessenger/.test(w.navigator.userAgent)) {
                    payEnv = 'weixin';
                } else if (/AlipayClient/.test(w.navigator.userAgent)) {
                    payEnv = 'alipay';
                } else {
                    payEnv = 'others';
                }
                return payEnv;
            },
            encode: function (str) {
                if (str.length === 0) return "";
                return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&nbsp;").replace(/\'/g, "&#39;").replace(/\"/g, "&quot;");
            },
            decode: function (str) {
                if (str.length === 0) return "";
                return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&#39;/g, "\'").replace(/&quot;/g, "\"");
            },
            checkDomain: function (val) {
                const reg = /^([\w\u4e00-\u9fa5\-\*]{1,100}\.){1,4}([\w\u4e00-\u9fa5\-]{1,24}|[\w\u4e00-\u9fa5\-]{1,24}\.[\w\u4e00-\u9fa5\-]{1,24})$/;
                return reg.test(val);
            },
            // ios禁止缩放
            iosDisZoom: function () {
                let lastTouchEnd = 0;
                document.addEventListener('touchstart', (event) => {
                    if (event.touches.length > 1) {
                        event.preventDefault();
                    }
                }), document.addEventListener('touchend', (event) => {
                    const now = (new Date()).getTime();
                    if (now - lastTouchEnd <= 300) {
                        event.preventDefault();
                    }
                    lastTouchEnd = now;
                }, false), document.addEventListener('gesturestart', (event) => {
                    event.preventDefault();
                });
            }
        },
        // localstorage
        storage: {
            set: function (name, val, expires) {
                let opt = {
                    name: name,
                    value: val,
                    expires: !!(expires) ? new Date().getTime() + (parseInt(expires) * 1000) : 0
                };
                return w.localStorage.setItem(name, JSON.stringify(opt));
            },
            get: function (name) {
                let d = new Date().getTime(), obj = w.localStorage.getItem(name);
                if (obj) {
                    obj = JSON.parse(obj);
                    if ((obj['expires'] > 0) && d > obj['expires']) {
                        this.del(name);
                        return [];
                    }
                    return obj['value'];
                }
                return [];
            },
            del: function (name) {
                return w.localStorage.removeItem(name), !0;
            },
            clear: function () {
                return w.localStorage.clear();
            }
        },
        // 记录浏览数据,测试查看 App/Official/View/index/test.html
        record: {
            /**
             * 设置记录
             * @param [opt={
                    title: '', 标题
                    url: '', 地址
                    index: '', 唯一索引
                }]
             */
            set: function (opt) {
                let rl = [];
                opt = Object.assign({
                    id: ray7.str.randomStr(),
                    title: '',
                    url: '',
                    index: 0,
                    time: new Date().getTime()
                }, opt);
                if (ray7.str.isEmpty(opt['url'])) {
                    return console.log('url地址不应为空'), !1;
                }
                if (ray7.storage.get('recordList').length > 0) {
                    rl = ray7.storage.get('recordList');
                    rl.forEach(function (v, i) {
                        if (v && v.url === opt.url) {
                            rl = ray7.array.remove(rl, i);
                        }
                    })
                }
                rl.push(opt);
                return ray7.storage.set('recordList', rl), !0;
            },
            list: function (elem, page, limit, type) {
                elem = elem || 'recordList', page = page || -1, limit = limit || 1, type = type || 'li';
                let offset = (page - 1) * limit,
                    array = ray7.array.sort(ray7.storage.get('recordList'), 'time', 'desc'),
                    res = page > 0 ? (offset + limit >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + limit) : array,
                    html = '';
                if (type === 'json') {
                    return JSON.stringify(res);
                } else {
                    if (_typeof(type) === 'object') {
                        let conn = type['conn'], temp = type['template'];
                        html += "<" + conn + ">";
                        res.forEach(function (v, i) {
                            html += ray7.str.replaceAll(temp, ['\[title\]', '\[url\]', '\[time\]', '\[index\]'], [v.title, v.url, ray7.time.timeAgo(v.time), v.index]);
                        });
                        html += "</" + conn + ">";
                    } else if (type === 'li') {
                        html += '<ul>';
                        res.forEach(function (v, i) {
                            html += '<li><span>' + v.title + '</span><a>' + v.url + '</a><span>' + ray7.time.timeAgo(v.time) + '</span></li>'
                        });
                        html += '</ul>';
                    } else {
                        res.forEach(function (v, i) {
                            html += '<a title="' + v.title + '">' + v.url + '</a>'
                        });
                    }
                    let cls = document.getElementsByClassName(elem), i = 0;
                    for (; i < cls.length; i++) {
                        cls[i].innerHTML = html;
                    }
                }
            },
            clear: function (name) {
                return ray7.storage.del('recordList', name);
            }
        },
        // 分享弹窗调用
        share: {
            alert: function (elem, title, content, endBack) {
                title = title || '分享',
                    content = content || '/404.html',
                    endBack = endBack || new Function();
                ray7._use(function () {
                    document.getElementById(elem).addEventListener('click', function () {
                        if (!ray7.user.isLogin()) return login.login();
                        let url = ray7.html.renderUrl(content, {'uid': ray7.user.id()}),
                            height = (w.innerHeight - 50 > 700 ? 600 : w.innerHeight - 50);
                        ray7.alert.open(title, url, 2, 350, height, endBack, false, true);
                    }, false);
                })
            }
        }
    };
    // 登录
    w.login = {
        temp: {},
        config: {
            url: {
                login: "/user/api/login",
                registered: "/user/api/register",
                retrievePass: "/user/api/retrieve",
                setPassword: "",
                userInfo: "/user/index/userinfo"
            },
            req_url: {
                login: "/user/api/login_check",
                registered: "/user/api/save_register",
                findPass: "/user/api/findpass",
                setPass: "/user/api/setpassword"
            },
            script: {layui: "/static/js/layui/layui/layui.all.js"}
        },
        init: function () {
            var t = Array.apply(null, document.querySelectorAll("[cc-event]"));
            "undefined" == typeof $ && (window.$ = layui.$),
                t.forEach(function (e) {
                    if (null !== e.getAttribute("cc-event")) try {
                        e.addEventListener("click", new Function("window.login." + e.getAttribute("cc-event")))
                    } catch (t) {
                        console.log(t)
                    }
                })
        },
        showBtn: function (e, t) {
            var n = e || this.getCookie('temp'),
                a = $.extend({login: "alert", registered: "alert", info: "black"}, t, {}),
                i = [
                    ['<a href="javascript:;" cc-event="login(\'\',\'' + a.login + '\')">登录</a>\n<a href="javascript:;" cc-event="registered(\'\',\'' + a.registered + "')\">注册</a>\n"].join(""),
                    ['<a href="javascript:;" cc-event="userInfo(\'\',\'' + a.info + "')\">" + this.userData("user_name") + '</a>\n<a href="javascript:;" cc-event=\'logout()\'>退出</a></div>'].join("")
                ];
            return a.html = a.html || (this.isLogin() ? i[1] : i[0]), this.setCookie('temp', n),
                (this.temp.showBtn = n) && 0 < $(n).length ?
                    ($(n).html("").html(a.html), this.init(), !0) :
                    (console.log("未找到类 “" + n + "” ，无法执行登录按钮初始化"), !1);
        },
        login: function login(e, t, n, a, d) {
            var e = e || this.config.url.login,
                n = n || 500,
                a = a || 300,
                d = d || function () {
                };
            if ("black" === (t = t || "alert")) {
                window.open(e, "_blank");
            } else {
                if ("self" === t) {
                    window.location.href = e;
                } else if (window.name && parent.layer.getFrameIndex(window.name)) {
                    parent.layer.close(parent.layer.getFrameIndex(window.name));
                    parent.login.pO("用户登录", e, 2, n, a, d);
                } else {
                    this.alert("用户登录", e, 2, n, a, d);
                }
            }
            return this;
        },
        logout: function (e) {
            var t = this;
            this.loadJC(this.config.script.layui, function () {
                e = e || function () {
                    layui.layer.msg("退出成功"),
                        window.location.reload(),
                        parent.login.showBtn(t.temp.showBtn)
                }, t.removeCookie("ULTOKEN"), e()
            })
        },
        registered: function (e, t, n, a) {
            return e = e || this.config.url.registered, n = n || 500, a = a || 800,
                "black" === (t = t || "alert") ?
                    window.open(e, "_blank") :
                    (window.name && parent.layer.getFrameIndex(window.name) ?
                        (parent.layer.close(parent.layer.getFrameIndex(window.name)),
                            parent.login.pO("用户注册-1", e, 2, n, a)) : this.alert("用户注册-2", e, 2, n, a)), this
        },
        retrievePass: function (e, t, n, a) {
            return e = e || this.config.url.retrievePass, n = n || 500, a = a || 800, "black" === (t = t || "alert") ? window.open(e, "_blank") : window.name && parent.layer.getFrameIndex(window.name) ? (parent.layer.close(parent.layer.getFrameIndex(window.name)), parent.login.pO("找回密码", e, 2, n, a)) : this.alert("找回密码", e, 2, n, a), this
        },
        setPassword: function (e, t, n, a) {
            return this
        },
        userInfo: function (e, t, n, a) {
            var i = this;
            return this.loadJC(this.config.script.layui, function () {
                return i.isLogin() ? (e = e || i.config.url.userInfo, t = t || "alert", n = n || .9 * $(window).width(), a = a || $(window).height() - 50,
                        void ("black" === t ? window.open(e, "_blank") : window.name && parent.layer.getFrameIndex(window.name) ? (parent.layer.close(parent.layer.getFrameIndex(window.name)),
                            parent.login.pO("用户中心", e, 2, n, a)) : i.alert("用户中心", e, 2, n, a)))
                    :
                    (layui.layer.msg("请先登录"), setTimeout(function () {
                        window.name && parent.layer.getFrameIndex(window.name) ? i.login() : i.login("", "black")
                    }, 120), !1)
            }), this
        },
        req_login: function (t, n) {
            var a = this;
            t = t || this.config.req_url.login, n = n || !1, this.loadJC(this.config.script.layui, function () {
                layui.form.verify({
                    username: function (e) {
                        if (e.length < 3) return "用户名至少得3个字符!"
                    }, password: [/^[\S]{6,}$/, "密码至少需要6位，且不能出现空格!"]
                }),
                    layui.form.on("submit(login)", function (e) {
                        return a.ajax(t, e.field, {}, function (e) {
                            parseInt(e.code) !== 1 ? layer.msg(e.msg) :
                                (layer.msg(e.msg), a.setCookie("ULTOKEN", JSON.stringify(e.data.info)),
                                    window.name && parent.layer.getFrameIndex(window.name) ? setTimeout(function () {
                                        parent.layer.close(parent.layer.getFrameIndex(window.name)),
                                            parent.login.showBtn(a.getCookie('temp')),
                                            parent.$('.ray_comment_iframe').attr('src', parent.$('.ray_comment_iframe').attr('src'))
                                    }, 500) : window.location.href = n ? document.referrer : a.config.url.userInfo)
                        }, function (e) {
                            layer.msg(e.statusText)
                        }, "get", "jsonp"), !1
                    })
            })
        },
        req_register: function (t, n) {
            var a = this;
            this.loadJC(this.config.script.layui, function () {
                layui.jquery;
                t = t || a.config.req_url.registered, n = n || function (e) {
                    parseInt(e.code) !== 1 ? layer.msg(e.msg) : (layer.msg(e.msg), setTimeout(function () {
                        window.name && parent.layer.getFrameIndex(window.name) ? a.login() : a.login("", "self")
                    }, 500))
                },
                    layui.form.verify({
                        user_name: function (e) {
                            if (e.length < 3) return "账号3位字符以上！"
                        }, user_passwd: function (e) {
                            if (e.length < 6) return "密码长度6位以上！"
                        }
                    }),
                    layui.form.on("submit(site_form)", function (e) {
                        return a.ajax(t, e.field, {}, function (e) {
                            n(e)
                        }, function (e) {
                            layer.msg(e.statusText)
                        }, "post"), !1
                    })
            })
        },
        req_retrieve: function (i, s) {
            var c = this;
            i = i || this.config.req_url.findPass, s = s || this.config.req_url.setPass, this.loadJC(this.config.script.layui, function () {
                layui.config({base: "/static/js/layui/layui_exts/"}).use(["layer", "form", "step"], function () {
                    var e = layui.form, t = layui.layer, n = layui.jquery;
                    e.verify({
                        user_name: function (e) {
                            if (e.length < 3) return "账号3位字符以上！"
                        }, user_passwd: function (e) {
                            if (e.length < 6) return "密码长度6位以上！"
                        }
                    }), layui.step.render({
                        elem: "#stepForm",
                        filter: "stepForm",
                        width: "100%",
                        stepWidth: "510px",
                        height: "500px",
                        stepItems: [{title: "填写问题"}, {title: "修改密码"}, {title: "完成"}]
                    }), n(document).on("click", ".pre", function () {
                        layui.step.pre("#stepForm")
                    }), n(document).on("click", ".next", function () {
                        layui.step.next("#stepForm")
                    });
                    var a = 0;
                    layui.form.on("submit(go_next)", function (e) {
                        return c.ajax(i, e.field, {}, function (e) {
                            parseInt(e.code) !== 1 ? t.msg(e.msg) : (a = e.data.user_id, layui.step.next("#stepForm"))
                        }, function (e) {
                            t.msg(e.statusText)
                        }, "post"), !1
                    }),
                        layui.form.on("submit(set_pass)", function (e) {
                            return e.field.edit_id = a, c.ajax(s, e.field, {}, function (e) {
                                parseInt(e.code) !== 1 ? t.msg(e.msg) : (t.msg(e.msg), layui.step.next("#stepForm"))
                            }, function (e) {
                                t.msg(e.statusText)
                            }, "post"), !1
                        })
                })
            })
        },
        alert: function (title, content, type, width, height, endBack, isFull) {
            return ray7.alert.open(title, content, type, width, height, endBack, isFull);
        },
        pO: function (title, content, type, width, height, endBack, isFull) {
            return ray7.alert.open(title, content, type, width, height, endBack, isFull, true);
        },
        getCookie: function (e) {
            return ray7.cookie.get(e);
        },
        setCookie: function (e, t, n, a) {
            return ray7.cookie.set(e, t, n, a);
        },
        removeCookie: function (e) {
            return ray7.cookie.del(e);
        },
        userData: function (e) {
            var t;
            return e = e || "", (t = this.getCookie("ULTOKEN")) ? "token" === e ? JSON.parse(t).token : "user_name" === e ? JSON.parse(t).user_name : "user_id" === e ? JSON.parse(t).user_id : JSON.parse(t) : ""
        },
        ajax: function (e, t, n, a, i, s, c) {
            return a = a || function (e) {
            }, i = i || function (e) {
            }, s = s || "get", c = c || "json", t = t || {}, n = n || {token: this.getCookie("ULTOKEN")}, ray7.ajax.request({
                url: e,
                dataType: c,
                type: s,
                data: t,
                headers: n,
                success: function (e) {
                    a(e)
                },
                error: function (e) {
                    i(e)
                }
            }), !0
        },
        isLogin: function () {
            return !!this.userData("")
        },
        loadJC: function (e, n) {
            return ray7.loadJC.load(e, n);
        }
    };
    // 留言
    w.comment = {
        facePath: [
            {faceName: "微笑", facePath: "/static/admin/face/0.gif"},
            {
                faceName: "撇嘴",
                facePath: "/static/admin/face/1.gif"
            }, {faceName: "色", facePath: "/static/admin/face/2.gif"}, {
                faceName: "发呆",
                facePath: "/static/admin/face/3.gif"
            }, {faceName: "得意", facePath: "/static/admin/face/4.gif"}, {
                faceName: "流泪",
                facePath: "/static/admin/face/5.gif"
            }, {faceName: "害羞", facePath: "/static/admin/face/6.gif"}, {
                faceName: "闭嘴",
                facePath: "/static/admin/face/7.gif"
            }, {faceName: "大哭", facePath: "/static/admin/face/9.gif"}, {
                faceName: "尴尬",
                facePath: "/static/admin/face/10.gif"
            }, {faceName: "发怒", facePath: "/static/admin/face/11.gif"}, {
                faceName: "调皮",
                facePath: "/static/admin/face/12.gif"
            }, {faceName: "龇牙", facePath: "/static/admin/face/13.gif"}, {
                faceName: "惊讶",
                facePath: "/static/admin/face/14.gif"
            }, {faceName: "难过", facePath: "/static/admin/face/15.gif"}, {
                faceName: "酷",
                facePath: "/static/admin/face/16.gif"
            }, {faceName: "冷汗", facePath: "/static/admin/face/17.gif"}, {
                faceName: "抓狂",
                facePath: "/static/admin/face/18.gif"
            }, {faceName: "吐", facePath: "/static/admin/face/19.gif"}, {
                faceName: "偷笑",
                facePath: "/static/admin/face/20.gif"
            }, {faceName: "可爱", facePath: "/static/admin/face/21.gif"}, {
                faceName: "白眼",
                facePath: "/static/admin/face/22.gif"
            }, {faceName: "傲慢", facePath: "/static/admin/face/23.gif"}, {
                faceName: "饥饿",
                facePath: "/static/admin/face/24.gif"
            }, {faceName: "困", facePath: "/static/admin/face/25.gif"}, {
                faceName: "惊恐",
                facePath: "/static/admin/face/26.gif"
            }, {faceName: "流汗", facePath: "/static/admin/face/27.gif"}, {
                faceName: "憨笑",
                facePath: "/static/admin/face/28.gif"
            }, {faceName: "大兵", facePath: "/static/admin/face/29.gif"}, {
                faceName: "奋斗",
                facePath: "/static/admin/face/30.gif"
            }, {faceName: "咒骂", facePath: "/static/admin/face/31.gif"}, {
                faceName: "疑问",
                facePath: "/static/admin/face/32.gif"
            }, {faceName: "嘘", facePath: "/static/admin/face/33.gif"}, {
                faceName: "晕",
                facePath: "/static/admin/face/34.gif"
            }, {faceName: "折磨", facePath: "/static/admin/face/35.gif"}, {
                faceName: "衰",
                facePath: "/static/admin/face/36.gif"
            }, {faceName: "骷髅", facePath: "/static/admin/face/37.gif"}, {
                faceName: "敲打",
                facePath: "/static/admin/face/38.gif"
            }, {faceName: "再见", facePath: "/static/admin/face/39.gif"}, {
                faceName: "擦汗",
                facePath: "/static/admin/face/40.gif"
            }],
        config: {
            url: {
                "delete": "/comment/index/delete",
                reply: "/comment/index/save",
                message: "/comment/index/save",
                reply_more: "/comment/index/read",
                message_more: "/comment/index/read"
            },
            user: {
                id: 0, name: 0, token: "", avatar: "/static/images/face.png", unloginClickBtn: function () {
                    const s = '';
                    return layer.msg("清先登录"), "undefined" !== window.login && top.window.login.login(s, s, s, s, function () {
                        window.comment.reload();
                        parent.login.showBtn();
                    }), !0
                }
            },
            message_init_num: 1,
            reply_init_num: 2,
            message_load_num: 1,
            reply_load_num: 2,
            comment_mid: 1,
            comment_rid: 666,
            comment_sid: 0,
            mode: 'white',
            parseData: function (e) {
                return {code: e.code, msg: e.msg, result: e.data}
            }
        },
        init: function (e) {
            this.dataMerge(e);
            var t = $(".skin").data("rid"), n = $(".skin").data("mid");
            $(".skin").removeClass().addClass("skin_write"),
                this.config.user.id = this.userData("user_id"),
                this.config.user.name = this.userData("user_name"),
                this.config.user.token = this.userData("token"),
                this.config.comment_mid = n || this.config.comment_mid,
                this.config.comment_rid = t || this.config.comment_rid;
            var a = $(".comment_date_or_hf_c").children(".c_hf"),
                o = (this.config.user.id, this.config.user.name);
            $.each(a, function (e, t) {
                var n = $(t), a = (n.data("uid"), n.data("cid")),
                    i = n.data("mname"), s = n.data("pid"), c = "",
                    c = i.toString() === o.toString() ? [' <a class="del" data-cid="' + a + '" data-mname="' + i + '" data-pid="' + s + '" style="display: none">删除</a>'].join(" ") : [' <a class="com c_show" data-cid="' + a + '" data-mname="' + i + '" data-pid="' + s + '" style="display: inline-block">回复</a>'].join(" ");
                n.html("").append(c)
            });
            var i = $(".hf_more");
            $.each(i, function (e, t) {
                var n = $(t),
                    a = (n.data("cid"),
                        parseInt(n.data("len")));
                n.prev().children(".hf").length < a ? n.addClass("c_show") : n.addClass("c_hide")
            });
            !this.isLogin() ? $('.ly_btn').html('登录并留言') : $('.ly_btn').html('发表');
            this.expression(),
                this.speak(),
                this.reply(),
                this["delete"](),
                this.speak_more(),
                this.reply_more(),
                this.refreshHeight();
        },
        show: function () {
            var e = $(".ray_comment").data("mid"),
                t = $(".ray_comment").data("rid"),
                o = $(".ray_comment").data('mode') || 'white';
            if (this.isEmpty(e) || this.isEmpty(t)) return layer.msg("模块id[mid]或关联id[rid]不能为空"), !1;
            var n = ["<iframe id='ray_comment_iframe_" + t + "' src='/comment/index?mid=" + e + "&rid=" + t + '&sid=0&mode=' + o + '\' width="100%" height=\'100%\' frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="yes" allowtransparency="yes" class="ray_comment_iframe"></iframe>'].join(" ");
            $(".ray_comment").html("").html(n)
        },
        expression: function () {
            var n = !1, a = this;
            $(document).on("click", ".imgBtn", function () {
                if (!1 === n) {
                    $(this).parent().prev().animate({marginTop: "-125px"}, 300), setTimeout(() => {
                        n = !0
                    }, 120);
                } else n = !1, $(this).parent().prev().animate({marginTop: "0px"}, 300)
            });
            $(".faceDiv").children("img").click(function () {
                $(".faceDiv").animate({marginTop: "0px"}, 300), n = !1;
                a.insertAtCursor($(".faceDiv").siblings(".Input_text")[0], "[" + $(this).attr("title") + "]");

            })
        },
        read: function (e, t) {
            var a = $(".comment_list"), i = (this.config.user.id, this.config.user.name), s = this;
            return s.ajax(s.config.url.message_more, {
                msg_limit: s.config.message_load_num,
                msg_page: e,
                reply_limit: s.config.message_load_num,
                reply_page: t,
                comment_mid: s.config.comment_mid,
                comment_rid: s.config.comment_rid,
                comment_sid: s.config.comment_sid,
                time: (new Date).getTime()
            }, s.config.headers || {}, function (e) {
                var n, t = e;
                if ("function" == typeof s.config.parseData && (e = s.config.parseData(e), t.code !== e.code)) return layui.layer.msg("状态码有误"), !1;
                1 === parseInt(e.code) ? (n = "", s.isEmpty(e.result) ? $(".ly_more").removeClass("ly_more").addClass("reload_html").html("无更多数据...点击刷新") : $.each(e.result, function (e, t) {
                    n += '<div class="comment_list_i c_hf_' + t.comment_id + '">\n<div class="comment_face_img comment_list_i_left">\n<img src="' + (t.avatar || "/static/images/face.png") + '" alt="用户头像信息">\n</div>\n<div class="comment_list_i_right">\n<div class="ly_main">\n<div class="ly c_btn">\n<div class="comment_text">\n<span class="name">@' + (0 === t.user_id ? "系统" : t.user_name) + '：</span>\n<span class="text">' + s.decodeEntities(t.comment_content) + '</span>\n</div>\n<div class="comment_date_or_hf">\n<div class="comment_date_or_hf_c">\n<span class="c_date">' + s.timeFormat(t.comment_addtime) + '</span>\n<span class="c_hf" >\n<a class="del ' + (i !== t.user_name ? "c_hide" : "c_show") + '" data-cid="' + t.comment_id + '" data-mname="' + t.user_name + '" data-pid="' + t.comment_id + '">删除</a>\n<a class="com ' + (i !== t.user_name ? "c_show" : "c_hide") + '" data-cid="' + t.comment_id + '" data-mname="' + t.user_name + '" data-pid="' + t.comment_id + '">回复</a>\n</span>\n</div>\n</div>\n<div class="_clear"></div>\n</div>\n</div>\n<div class="hf_main">\n<div class="hf_text">\n', s.isEmpty(t.reply) || $.each(t.reply, function (e, t) {
                        n += '<div class="hf c_btn c_hf_' + t.comment_id + '">\n<div class="comment_text">\n<span class="name">@' + (0 === t.user_id ? "系统" : t.user_name) + '<span style="color: #333333;margin: 0 1px;">回复</span>@' + t.reply_name + '：</span>\n<span class="text">' + s.decodeEntities(t.comment_content) + '</span>\n</div>\n<div class="comment_date_or_hf">\n<div class="comment_date_or_hf_c">\n<span class="c_date">' + s.timeFormat(t.comment_addtime) + '</span>\n<span class="c_hf">\n<a class="del ' + (i !== t.user_name ? "c_hide" : "c_show") + '" data-cid="' + t.comment_id + '" data-mname="' + t.user_name + '" data-pid="' + t.comment_pid + '">删除</a>\n<a class="com ' + (i !== t.user_name ? "c_show" : "c_hide") + '" data-cid="' + t.comment_id + '" data-mname="' + t.user_name + '" data-pid="' + t.comment_pid + '">回复</a>\n</span>\n</div>\n</div>\n<div class="_clear"></div>\n</div>'
                    }), n += '</div>\n<div class="hf_more more ' + (1 <= t.reply_count - s.config.reply_init_num ? "c_show" : "c_hide") + " more_" + t.comment_id + '" data-cid="' + t.comment_id + '" data-reply_len="' + t.reply_count + '">\n<span>查看更多</span>\n</div></div>\n</div>\n<div class="_clear"></div>\n</div>'
                }), a.append(n), s.refreshHeight()) : layui.layer.msg(e.msg)
            }, function (e, t) {
                layer.msg("接口请求异常: " + t)
            }, "post"), !0
        },
        speak: function () {
            var o = this;
            $(".ly_btn").on("click", function () {
                if (!o.isLogin()) return o.config.user.unloginClickBtn(), $('ly_btn').html('登录并发表'), !0;
                var n = $(this).parent(".Input_Foot").siblings(".Input_text"),
                    e = o.emoticonConversion(n.val()),
                    t = o.config.user.id, a = (o.config.user.name, o.config.user.avatar),
                    i = o.config.comment_mid,
                    s = o.config.comment_rid, c = $(this).parents(".ly_box").siblings(".comment_list");
                return "" !== e && o.ajax(o.config.url.message, {
                    user_id: t,
                    content: e,
                    comment_mid: i,
                    comment_rid: s,
                    time: (new Date).getTime()
                }, o.config.headers || {}, function (e) {
                    var t = e;
                    if ("function" == typeof o.config.parseData && (e = o.config.parseData(e), t.code !== e.code)) return layui.layer.msg("状态码有误"), !1;
                    1 === parseInt(e.code) ? (c.prepend('<div class="comment_list_i c_hf_' + e.result.comment_id + '">\n<div class="comment_face_img comment_list_i_left">\n<img src="' + a + '" alt="用户头像信息">\n</div>\n<div class="comment_list_i_right">\n<div class="ly_main">\n<div class="ly c_btn">\n<div class="comment_text">\n<span class="name">@' + e.result.username + '：</span>\n<span class="text">' + o.decodeEntities(e.result.comment_content) + '</span>\n</div>\n<div class="comment_date_or_hf">\n<div class="comment_date_or_hf_c">\n<span class="c_date">' + o.timeFormat(e.result.comment_addtime) + '</span>\n<span class="c_hf">\n<a class="del" data-cid="' + e.result.comment_id + '" data-mname="' + e.result.username + '">删除</a>\n</span>\n</div>\n</div>\n<div class="_clear"></div>\n</div>\n</div>\n<div class="hf_main">\n<div class="hf_text">\n</div>\n</div>\n</div>\n<div class="_clear"></div>\n</div>'), n.val("")) : layer.msg(e.msg)
                    o.refreshHeight();
                }, function (e, t) {
                    layer.msg("接口请求异常: " + t)
                }, "post"), !0
            })
        },
        speak_more: function () {
            var t = this;
            $(".ly_more").on("click", function () {
                $(this).siblings(".comment_list");
                var e = parseInt($(".comment_list_i").length / t.config.message_load_num) + 1;
                return t.read(e, 0), !0
            })
        },
        reply_init: function () {
            var a = !0, i = this;
            $(document).on("click", ".com", function () {
                var e, t, n
                if ($(this).parents('.hf_text').length > 0) {
                    return i.isLogin() ? (!1 !== a ? (e = $(this).data("cid"), t = $(this).data("mname"), n = $(this).data("pid"), $(".hf_box").remove(), 0 < $(this).parents(".comment_date_or_hf_c").siblings(".Input_Box").length ? $(this).parents(".comment_date_or_hf_c").siblings(".Input_Box").remove() : $(this).parents(".comment_date_or_hf").append('<div class="Input_Box hf_box">\n<textarea class="Input_text"></textarea>\n<div class="faceDiv"></div>\n<div class="Input_Foot">\n<a class="imgBtn" href="javascript:void(0);"></a>\n<a class="postBtn hf_btn" data-cid="' + e + '" data-mname="' + t + '" data-pid="' + n + '">发表</a>\n</div>\n</div>'), a = !1) : (a = !0, $(this).parents(".comment_date_or_hf_c").siblings(".Input_Box").remove()), !0) : i.config.user.unloginClickBtn();
                }
                return i.isLogin() ? (!1 !== a ? (e = $(this).data("cid"),
                        t = $(this).data("mname"),
                        n = $(this).data("pid"),
                        $(".hf_box").remove()
                        , 0 < $(this).parents('.comment_list_i_right').children('.hf_main').children('.Input_Box').length
                    ? $(this).parents('.comment_list_i_right').children('.hf_main').children('.Input_Box').remove()
                    : $(this).parents('.comment_list_i_right').children('.hf_main').children('.comment_text').after('<div class="Input_Box hf_box">\n<textarea class="Input_text"></textarea>\n<div class="faceDiv"></div>\n<div class="Input_Foot">\n<a class="imgBtn" href="javascript:void(0);"></a>\n<a class="postBtn hf_btn" data-cid="' + e + '" data-mname="' + t + '" data-pid="' + n + '">发表</a>\n</div>\n</div>'), a = !1)
                    : (a = !0, $(this).parents('.comment_list_i_right').children('.hf_main').children('.Input_Box').remove()), !0)
                    : i.config.user.unloginClickBtn();

            })
        },
        reply: function () {
            this.reply_init();
            var c = this;
            $(document).on("click", ".hf_btn", function () {
                if (c.isLogin) {
                    var e = c.emoticonConversion($(this).parent(".Input_Foot").siblings(".Input_text").val()),
                        t = $(this).data("cid"), n = $(this).data("mname"), a = c.config.user.id,
                        i = (c.config.user.name, $(this).data("pid")),
                        s = $(this).parents().siblings(".hf_main").children(".hf_text");
                    return s.length <= 0 && (s = $(this).parents().siblings(".hf").parent(".hf_text")), "" !== e && c.ajax(c.config.url.reply, {
                        comment_id: t,
                        comment_pid: i,
                        reply: !0,
                        user_id: a,
                        content: e,
                        comment_mid: c.config.comment_mid,
                        comment_rid: c.config.comment_rid,
                        time: (new Date).getTime()
                    }, c.config.headers || {}, function (e) {
                        var t = e;
                        if ("function" == typeof c.config.parseData && (e = c.config.parseData(e), t.code !== e.code)) return layui.layer.msg("状态码有误"), !1;
                        1 === parseInt(e.code) ? s.append(' <div class="hf c_btn c_hf_' + e.result.comment_id + '">\n<div class="comment_text">\n<span class="name">@' + e.result.username + '<span style="color: #333333;margin: 0 1px;">回复</span>@' + n + '：</span>\n<span class="text">' + c.decodeEntities(e.result.comment_content) + '</span>\n</div>\n<div class="comment_date_or_hf">\n<div class="comment_date_or_hf_c">\n<span class="c_date">' + c.timeFormat(e.result.comment_addtime) + '</span>\n<span class="c_hf">\n<a class="del" data-cid="' + e.result.comment_id + '" data-mname="' + e.result.username + '">删除</a>\n</span>\n</div>\n</div>\n<div class="_clear"></div>\n</div>') : layui.layer.msg(e.msg);
                        o.refreshHeight();
                    }, function (e, t) {
                        layer.msg("接口请求异常: " + t)
                    }, "post"), $(this).parent(".Input_Foot").siblings(".Input_text").val(""), $(document).find(".hf_box").remove(), !0
                }
                return c.config.user.unloginClickBtn();
            })
        },
        reply_more: function () {
            var o = 0, r = this, m = 0;
            $(document).on("click", ".hf_more", function () {
                var i = $(this), s = $(this).siblings(".hf_text"),
                    c = (r.config.user.id, r.config.user.name),
                    e = $(this).data("cid"), t = $(this).data("len"), n = $(this).prev(".hf_text"),
                    a = $(n).children(".c_btn").length;
                return o !== e && (m = Math.ceil(a / r.config.reply_load_num)), r.config.reply_load_num = t - a < r.config.reply_load_num ? t - a : r.config.reply_load_num, o = e, m += 1, r.ajax(r.config.url.message_more, {
                    comment_id: e,
                    reply_limit: r.config.reply_load_num,
                    reply_page: m,
                    comment_mid: r.config.comment_mid,
                    comment_rid: r.config.comment_rid,
                    comment_sid: r.config.comment_sid,
                    time: (new Date).getTime()
                }, r.config.headers || {}, function (e) {
                    var t = e;
                    if ("function" == typeof r.config.parseData && (e = r.config.parseData(e), t.code !== e.code)) return layui.layer.msg("状态码有误"), !1;
                    var n, a = "";
                    1 === parseInt(e.code) ? (r.isEmpty(e.result[0].reply) ? --m : ($.each(e.result[0].reply, function (e, t) {
                        a += '<div class="hf c_btn c_hf_' + t.comment_id + '">\n<div class="comment_text">\n<span class="name">@' + (0 === t.user_id ? "系统" : t.user_name) + '<span style="color: #333333;margin: 0 1px;">回复</span>@' + t.reply_name + '：</span>\n<span class="text">' + r.decodeEntities(t.comment_content) + '</span>\n</div>\n<div class="comment_date_or_hf">\n<div class="comment_date_or_hf_c">\n<span class="c_date">' + r.timeFormat(t.comment_addtime) + '</span>\n<span class="c_hf">\n<a class="del ' + (c !== t.user_name ? "c_hide" : "c_show") + '" data-cid="' + t.comment_id + '" data-mname="' + t.user_name + '" data-pid="' + t.comment_pid + '">删除</a>\n<a class="com ' + (c !== t.user_name ? "c_show" : "c_hide") + '" data-cid="' + t.comment_id + '" data-mname="' + t.user_name + '" data-pid="' + t.comment_pid + '">回复</a>\n</span>\n</div>\n</div>\n<div class="_clear"></div>\n</div>'
                    }), s.append(a)), n = s.children(".c_btn").length, e.result[0].reply_count - n < 1 && (e.result[0].comment_id, i.html("无更多数据")), r.refreshHeight()) : layer.msg(e.msg)
                }, function (e, t) {
                    layer.msg("接口请求异常: " + t)
                }, "post"), !0
            })
        },
        delete_init: function () {
            var t = this;
            $(document).on("mouseenter mouseleave", ".comment_date_or_hf_c", function (e) {
                "mouseenter" === e.type ? !$(this).children(".c_hf").children(".del").hasClass("c_hide") && t.isLogin() && $(this).find(".del").show() : "mouseleave" === e.type && $(this).find(".del").hide()
            })
        },
        "delete": function () {
            this.delete_init();
            var a = this;
            $(document).on("click", ".del", function () {
                var e = $(this).data("cid"), n = $(this);
                a.ajax(a.config.url["delete"], {
                    c_id: e,
                    time: (new Date).getTime()
                }, a.config.headers || {}, function (e) {
                    var t = e;
                    if ("function" == typeof a.config.parseData && (e = a.config.parseData(e), t.code !== e.code)) return layer.msg("状态码有误"), !1;
                    1 === parseInt(e.code) && (0 < n.parents(".hf").length ? n.parents(".hf").remove() : n.parents(".comment_list_i").remove(), a.refreshHeight()), layer.msg(e.msg)
                }, function (e, t) {
                    layer.msg("接口请求异常: " + t)
                }, "post")
            })
        },
        emoticonConversion: function (o) {
            var r = this;
            return void 0 !== o && function () {
                var a, i, s, c = o.match(/\[(.*?)\]/g);
                if (null != c && "" !== c) for (var e = function e(n) {
                    s = c[n].replace(/(^\[)|(\]$)/g, ""), $.each(r.facePath, function (e, t) {
                        t.faceName === s && (a = ray7.html.domain + "/" + t.facePath, i = '<img src="' + a + '" height="22" width="22" />', o = o.replace(c[n], i))
                    })
                }, t = 0; t < c.length; t++) e(t)
            }(), o
        },
        insertAtCursor: function (e, t) {
            var n, a, i, s;
            document.selection ? (e.focus(),
                    (n = document.selection.createRange()).text = t, n.select()) :
                e.selectionStart || "0" == e.selectionStart ?
                    (a = e.selectionStart, i = e.selectionEnd, s = e.scrollTop, e.value = e.value.substring(0, a)
                        + t + e.value.substring(i, e.value.length), 0 < s && (e.scrollTop = s), e.focus()
                        , e.selectionStart = a + t.length, e.selectionEnd = a + t.length) : (e.value += t, e.focus())
        },
        decodeEntities: function (e) {
            var t = document.createElement("textarea");
            return t.innerHTML = e, t.value
        },
        isEmpty: function (e) {
            return ray7.str.isEmpty(e);
        },
        dataMerge: function (n) {
            var a = this;
            return $.each(n, function (e, t) {
                a.config[e] instanceof Object ? $.extend(a.config[e], n[e]) : a.config[e] = n[e]
            }), a.config
        },
        reload: function () {
            w.location.reload(true)
        },
        refreshHeight: function () {
            const _t = this;
            setTimeout(() => {
                const iframe = parent.document.getElementById('ray_comment_iframe_' + _t.config.comment_rid);
                !(iframe) || (iframe.height = iframe.contentWindow.document.body.scrollHeight + 'px');
            }, 120)
        },
        timeFormat: function (e) {
            return ray7.time.format(e);
        },
        getCookie: function (e) {
            return ray7.cookie.get(e);
        },
        setCookie: function (e, t, n, a) {
            return ray7.cookie.set(e, t, n, a);
        },
        removeCookie: function (e) {
            return ray7.cookie.del(e);
        },
        userData: function (e) {
            return login.userData(e)
        },
        isLogin: function () {
            return !!this.userData("")
        },
        ajax: function (e, t, n, a, i, s, c) {
            return login.ajax(e, t, n, a, i, s, c);
        }
    }
}(window);