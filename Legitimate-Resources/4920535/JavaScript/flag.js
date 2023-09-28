var sc_flag_var = sc_flag_var || [];
function sc_flag(id, bgcolor, fcolor, bdcolor, col, max, cc, ns) {

    if (bgcolor.indexOf("#") != 0) bgcolor = "#" + bgcolor;
    if (fcolor.indexOf("#") != 0) fcolor = "#" + fcolor;
    if (bdcolor.indexOf("#") != 0) bdcolor = "#" + bdcolor;

    var info;

    if (encodeURIComponent) {
        info = '&ua=' + encodeURIComponent(navigator.userAgent);
        info = info + '&ref=' + encodeURIComponent(document.referrer);
        info = info + '&url=' + encodeURIComponent(window.location);
    } else {
        info = '&ua=' + escape(navigator.userAgent);
        info = info + '&ref=' + escape(document.referrer);
        info = info + '&url=' + escape(window.location);

    }
    info = info + '&sw=' + screen.width;
    info = info + '&sh=' + screen.height;
    info = info + '&rand=' + Math.round(100 * Math.random());

    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = "async";
    ga.src = '//service.supercounters.com/fc.php?id=' + id + '&v=1&w=2' + info; (document.getElementsByTagName("head")[0] || d.getElementsByTagName("body")[0]).appendChild(ga);
    sc_flag_var['col'] = col;
    sc_flag_var['max'] = max;
    sc_flag_var['cc'] = cc;
    sc_flag_var['ns'] = ns;
    sc_flag_var['bgcolor'] = bgcolor;
    sc_flag_var['fcolor'] = fcolor;
    sc_flag_var['bdcolor'] = bdcolor;
}
function size(obj) {
    var size = 0,
    key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}

function sc_show_flag(id, s) {
    var i = 0;
    var ch = 0;
    var cw = 0;
    var fnx = 0;
    var ret = eval(s);
    var cts = ret['cts'];
    var ctssize = size(cts);
    var ctlist = eval('({"ad":0,"ae":-16,"af":-32,"ag":-48,"ai":-64,"al":-80,"am":-96,"an":-112,"ao":-128,"ar":-144,"as":-160,"at":-176,"au":-192,"aw":-208,"ax":-224,"az":-240,"ba":-256,"bb":-272,"bd":-288,"be":-304,"bf":-320,"bg":-336,"bh":-352,"bi":-368,"bj":-384,"bm":-400,"bn":-416,"bo":-432,"br":-448,"bs":-464,"bt":-480,"bv":-496,"bw":-512,"by":-528,"bz":-544,"ca":-560,"cc":-576,"cd":-592,"cf":-608,"cg":-624,"ch":-640,"ci":-656,"ck":-672,"cl":-688,"cm":-704,"cn":-720,"co":-736,"cr":-752,"cs":-768,"cu":-784,"cv":-800,"cx":-816,"cy":-832,"cz":-848,"de":-864,"dj":-880,"dk":-896,"dm":-912,"do":-928,"dz":-944,"ec":-960,"ee":-976,"eg":-992,"eh":-1008,"er":-1024,"es":-1040,"et":-1056,"eu":-1072,"fi":-1088,"fj":-1104,"fk":-1120,"fm":-1136,"fo":-1152,"fr":-1168,"ga":-1184,"gb":-1200,"gd":-1216,"ge":-1232,"gf":-1248,"gh":-1264,"gi":-1280,"gl":-1296,"gm":-1312,"gn":-1328,"gp":-1344,"gq":-1360,"gr":-1376,"gs":-1392,"gt":-1408,"gu":-1424,"gw":-1440,"gy":-1456,"hk":-1472,"hm":-1488,"hn":-1504,"hr":-1520,"ht":-1536,"hu":-1552,"id":-1568,"ie":-1584,"il":-1600,"im":-1616,"in":-1632,"io":-1648,"iq":-1664,"ir":-1680,"is":-1696,"it":-1712,"je":-1728,"jm":-1744,"jo":-1760,"jp":-1776,"ke":-1792,"kg":-1808,"kh":-1824,"ki":-1840,"km":-1856,"kn":-1872,"kp":-1888,"kr":-1904,"kw":-1920,"ky":-1936,"kz":-1952,"la":-1968,"lb":-1984,"lc":-2000,"li":-2016,"lk":-2032,"lr":-2048,"ls":-2064,"lt":-2080,"lu":-2096,"lv":-2112,"ly":-2128,"ma":-2144,"mc":-2160,"md":-2176,"me":-2192,"mg":-2208,"mh":-2224,"mk":-2240,"ml":-2256,"mm":-2272,"mn":-2288,"mo":-2304,"mp":-2320,"mq":-2336,"mr":-2352,"ms":-2368,"mt":-2384,"mu":-2400,"mv":-2416,"mw":-2432,"mx":-2448,"my":-2464,"mz":-2480,"na":-2496,"nc":-2512,"ne":-2528,"nf":-2544,"ng":-2560,"ni":-2576,"nl":-2592,"no":-2608,"np":-2624,"nr":-2640,"nu":-2656,"nz":-2672,"om":-2688,"pa":-2704,"pe":-2720,"pf":-2736,"pg":-2752,"ph":-2768,"pk":-2784,"pl":-2800,"pm":-2816,"pn":-2832,"pr":-2848,"ps":-2864,"pt":-2880,"pw":-2896,"py":-2912,"qa":-2928,"re":-2944,"ro":-2960,"rs":-2976,"ru":-2992,"rw":-3008,"sa":-3024,"sb":-3040,"sc":-3056,"sd":-3072,"se":-3088,"sg":-3104,"sh":-3120,"si":-3136,"sj":-3152,"sk":-3168,"sl":-3184,"sm":-3200,"sn":-3216,"so":-3232,"sr":-3248,"st":-3264,"sv":-3280,"sy":-3296,"sz":-3312,"tc":-3328,"td":-3344,"tf":-3360,"tg":-3376,"th":-3392,"tj":-3408,"tk":-3424,"tl":-3440,"tm":-3456,"tn":-3472,"to":-3488,"tr":-3504,"tt":-3520,"tv":-3536,"tw":-3552,"tz":-3568,"ua":-3584,"ug":-3600,"um":-3616,"us":-3632,"uy":-3648,"uz":-3664,"va":-3680,"vc":-3696,"ve":-3712,"vg":-3728,"vi":-3744,"vn":-3760,"vu":-3776,"wf":-3792,"ws":-3808,"ye":-3824,"yt":-3840,"za":-3856,"zm":-3872,"zw":-3888})');
    if (sc_flag_var['max'] > 200 || sc_flag_var['max'] < 1) max = 10;
    else max = sc_flag_var['max'];
    if (ctssize < max) max = ctssize; (sc_flag_var['col'] < 1 || sc_flag_var['col'] > 8) ? col = 1 : col = sc_flag_var['col'];
    if (col == 1) {
        cw = 120;
    } else {
        if (sc_flag_var['cc'] == 1) cw = 90 * col;
        else cw = 95 * col;
    }
    if (max % col == 0) flagH = 17 * (max / col) + 6;
    else flagH = 17 * (max / col) + 15;
    if (sc_flag_var['ns']) {
        if (col == 1) ch = flagH + 18 + 32;
        else ch = flagH + 18 + 20;
    } else {
        if (col == 1) ch = flagH + 95;
        else if (col > 1 && col < 4) ch = flagH + 80;
        else ch = flagH + 30 + 15;
    }
    var url = "http://widget.supercounters.com/images/flagsprites.png";
    var c = document.createElement("img");
    c.onload = function() {
        var cd = document.createElement("div");
        cd.style.position = "relative";
        cd.style.display = "inline-block";
        cd.style.width = cw + "px";
        cd.style.height = ch + "px";
        cd.style.overflow = "hidden";
        cd.style.cursor = "pointer";
        cd.style.borderColor = sc_flag_var['bdcolor'];
        cd.style.borderWidth = "1px";
        cd.style.borderStyle = "solid";
        cd.style.backgroundColor = sc_flag_var['bgcolor'];
        cd.title = "Flag Counter";
        for (ct in cts) {
            var ct = ct.toLowerCase();
            if (ctlist.hasOwnProperty(ct)) {
                if (i % col == 0) {
                    j = 0;
                    y = (i / col) * 17;
                } else {
                    if (sc_flag_var['ns'] != 1) j += 92;
                    else j += 90;
                }

                sc_drawFlag(url, ctlist, ct, 16, 11, y + 6, 3 + j, cd);

                // if (sc_flag_var['ns'] != 1) {
                if (col == 1) {
                    fx = j + 25;
                    fy = y + 5;
                    fnx = 25
                } else {
                    fx = j + 22;
                    fy = y + 5;
                }
                //   } else {
                //       if (col == 1) {
                //           fx = j + 25;
                //           fy = y + 5;
                //      } else {
                //          fx = j + 30;
                //          fy = y + 5;
                //      }
                //  }

                drawText_flag(sc_flag_var['fcolor'], 20, 12, fy, fx, ct.toUpperCase(), cd, "left");

                //  if (sc_flag_var['ns'] != 1) {
                ct = ct.toUpperCase();
                drawText_flag(sc_flag_var['fcolor'], 42, 12, fy, fx + 24 + fnx, cts[ct].toString(), cd, "right");
                //   }

                i++;
            }

            if (i >= max) break;
        }
        if (col == 1) {
            l1 = 20;
            l2 = l1 + 48;
            l3 = l2 + 20;
            l4 = l1;
            l5 = l4 + 48;
            l6 = l5 + 20;
            t1 = t3 = flagH;
            t2 = t1 + 1;
            t4 = t6 = flagH + 16;
            t5 = t4 + 1;
        } else if (col == 2 || col == 3) {
            l1 = (cw / 2) - 70;
            l2 = l1 + 48;
            l3 = l2 + 18;
            l4 = l2 + 40;
            l5 = l4 + 27;
            l6 = l5 + 18;
            t1 = t3 = t4 = t6 = flagH;
            t2 = t5 = flagH + 1;
        } else {
            l1 = 5;
            l2 = l1 + 48;
            l3 = l2 + 18;
            l4 = l2 + 40;
            l5 = l4 + 28;
            l6 = l5 + 18;
            t1 = t3 = t4 = t6 = flagH;
            t2 = t5 = flagH + 1;
        }

        drawText_flag(sc_flag_var['fcolor'], 45, 12, t1, l1, "Newest:", cd, "left");
        if (ctlist.hasOwnProperty(ret["new"])) sc_drawFlag(url, ctlist, ret['new'], 16, 11, t2, l2, cd);
        drawText_flag(sc_flag_var['fcolor'], 20, 12, t3, l3, ret["new"].toUpperCase(), cd, "right");

        drawText_flag(sc_flag_var['fcolor'], 32, 12, t4, l4, "You:", cd, "left");
        if (ctlist.hasOwnProperty(ret["you"])) sc_drawFlag(url, ctlist, ret['you'], 16, 11, t5, l5, cd);
        drawText_flag(sc_flag_var['fcolor'], 20, 12, t6, l6, ret["you"].toUpperCase(), cd, "right");

        if (col == 1) {
            if (sc_flag_var['ns'] != 1) {
                l1 = 5;
                l2 = l1 + 50;
                t1 = t2 = flagH + 33;
                l3 = 5;
                l4 = l1 + 50;
                t3 = t4 = t1 + 16;
                l5 = 5;
                l6 = l5 + 50;
                t5 = t6 = t3 + 16;
                l7 = (cw / 2) - 52;
                t7 = t6 + 14;
            } else {
                l7 = (cw / 2) - 52;
                t7 = flagH + 33;
            }

        } else if (col == 2 || col == 3) {
            if (sc_flag_var['ns'] != 1) {
                l1 = l3 = l5 = (cw / 2) - 60;
                l2 = l4 = l6 = l1 + 55;
                t1 = t2 = flagH + 16;
                t3 = t4 = t1 + 16;
                t5 = t6 = t3 + 16;
                l7 = (cw / 2) - 54;
                t7 = t6 + 14;
            } else {
                l7 = (cw / 2) - 54;
                t7 = flagH + 16;

            }

        } else {
            l1 = 5;
            l2 = l1 + 40;
            l3 = l2 + 70;
            l4 = l3 + 40;
            l5 = l4 + 70;
            l6 = l5 + 40;
            l7 = cw - 110;
            t1 = t2 = t3 = t4 = t5 = t6 = flagH + 16;
            t7 = ch - 15;

        }

        if (sc_flag_var['ns'] != 1) {
            drawText_flag(sc_flag_var['fcolor'], 40, 13, t1, l1, "Today:", cd, "left");
            drawText_flag(sc_flag_var['fcolor'], 60, 12, t2, l2, ret["today"].toString(), cd, "right");

            drawText_flag(sc_flag_var['fcolor'], 40, 13, t3, l3, "Month:", cd, "left");
            drawText_flag(sc_flag_var['fcolor'], 60, 12, t4, l4, ret["month"].toString(), cd, "right");

            drawText_flag(sc_flag_var['fcolor'], 40, 13, t5, l5, "Total:", cd, "left");
            drawText_flag(sc_flag_var['fcolor'], 60, 12, t6, l6, ret["total"].toString(), cd, "right");

        }

        drawText_flag(sc_flag_var['fcolor'], 110, 13, t7, l7, "Supercounters.com", cd, "left");

        cd.onclick = function() {
            window.open("http://www.supercounters.com/stats/" + id);
        };
        ct_insert(cd, "supercounters.com/flag.js");
    };
    c.src = url;
}
function ct_insert(c, d) {
    var a = document.getElementsByTagName("script");
    for (var b = 0; b < a.length; b++) {
        if (a[b].src.indexOf(d) > 0) {
            a[b].parentNode.insertBefore(c, a[b].nextSibling)
        }
    }
}

function sc_drawFlag(url, ctlist, ct, w, h, t, l, d) {
    var f = document.createElement("div");
    f.style.backgroundImage = "url(" + url + ")";
    f.style.backgroundRepeat = "no-repeat";
    f.style.backgroundPosition = ctlist[ct] + "px 0px";
    f.style.position = "absolute";
    f.style.padding = "0px";
    f.style.margin = "0px";
    f.style.width = w + "px";
    f.style.height = h + "px";
    f.style.top = t + "px";
    f.style.left = l + "px";
    f.style.overflow = "hidden";
    d.appendChild(f);
}

function drawText_flag(fcolor, w, h, t, l, txt, d, align) {
    var dt = document.createElement("div");
    dt.style.display = "inline-block";
    dt.style.fontFamily = "Arial";
    dt.style.fontSize = "12px";
    dt.style.color = fcolor;
    dt.style.position = "absolute";
    dt.style.fontWeight = "normal";
    dt.style.width = w + "px";
    dt.style.height = h + "px";
    dt.style.top = t + "px";
    dt.style.left = l + "px";
    dt.style.overflow = "hidden";
    dt.style.fontStyle = "normal";
    dt.style.textTransform = "none";
    dt.style.textDecoration = "none";
    dt.style.letterSpacing = "0px";
    dt.style.wordSpacing = "0px";
    dt.style.padding = "0px";
    dt.style.margin = "0px";
    dt.style.textAlign = align;
    dt.style.lineHeight = "normal";
    dt.style.webkitTextSizeAdjust = "none";
    dt.style.direction = "ltr";
    dt.style.verticalAlign = "baseline";
    dt.style.textShadow = "none";
    dt.innerHTML = txt;
    d.appendChild(dt);
}
function errorMsg(msg) {
    var w = msg.length * 7;
    var cd = document.createElement("div");
    cd.style.position = "relative";
    cd.style.display = "inline-block";
    cd.style.width = w + "px";
    cd.style.height = "15px";
    cd.style.overflow = "hidden";
    cd.style.cursor = "pointer";
    cd.style.fontFamily = "Arial";
    cd.style.fontSize = "12px";
    cd.style.color = "#ff0000";
    cd.style.borderColor = "#ffffff";
    cd.style.borderWidth = "1px";
    cd.style.borderStyle = "solid";
    cd.style.backgroundColor = sc_flag_var['bgcolor'];
    cd.title = "Supercounters";
    cd.innerHTML = msg;
    cd.onclick = function() {
        window.location = "http://www.supercounters.com/";
    };
    ct_insert(cd, "supercounters.com/flag.js");
}
