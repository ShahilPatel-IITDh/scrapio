var qvDebug={}; //1:debug on
qvDebug.drag=1;

function qvjax_direct(method,url,data,s,e,c){
    if(!method || !QV_BASE_OBJ.length<1) return false;
    if(!c) c="application/x-www-form-urlencoded; charset=UTF-8";

    //set
    var qvjax_direct_data=data+"&method="+method+"&sskey="+QV_BASE_OBJ['sskey']+"&token="+QV_BASE_OBJ['token']+"&account="+QV_BASE_OBJ['account']+"&msid="+QV_BASE_OBJ['msid']+"&stid="+QV_BASE_OBJ['stid']+"&svid="+QV_BASE_OBJ['svid'];

    $.ajax({
        type: "POST",
        url: url,
        dataType: 'json',
        data: qvjax_direct_data,
        contentType: c,
        success: s,
        error:e
    });
}

//	qv global function
var qv_func={
    ereg: function (patt,str){
        if(patt && str) {
            var pattern = new RegExp(patt);
            return pattern.test(str);
        }else{ return false; }
    },
    format_chk: function (patt,str){
        if(patt && str) {
            var r='';
            switch (patt){
                case 'n': //숫자로만 구성
                    r=/^[0-9]+$/;
                    break;
                case 'a': //영문으로만 구성
                    r=/^[a-zA-Z]+$/;
                    break;
                default:
                    return false;
                    break;
            }
            var pattern = new RegExp(r);
            return str.match(pattern);
        }else{ return false; }
    },
    replace_px : function (o){ //0은 else로 분기됨
        if(o){
            if($.type(o)!=="string"){ o=o.toString();}
            return $.trim(o.replace('px',''));
        }else{ return o; }
    },
    replace_perc : function (o){
        if(o){
            if($.type(o)!=="string"){ o=o.toString();}
            return $.trim(o.replace('%',''));
        }else{ return o; }
    },
    replace_pxperc : function (o){
        if(o){
            if($.type(o)!=="string"){ o=o.toString();}
            return $.trim(o.replace('%','').replace('px',''));
        }else{ return o; }
    },
    replace_em : function (o){ //0은 else로 분기됨
        if(o){
            if($.type(o)!=="string"){ o=o.toString();}
            return $.trim(o.replace('em',''));
        }else{ return o; }
    },
    get_unit : function(o){
        if(o){
            o=$.trim(o);
            if($.type(o)!=="string"){ o=o.toString();}
            var pattern = new RegExp(/^([0-9]+)(px|%)$/i);
            var res=o.match(pattern);
            if(res){
                var ret={};
                if(res[1] && res[2]){ ret.number=res[1]; ret.unit=res[2]; }
                else{ ret.number=res[0]; }
                return ret;
            }else{
                if(qv_func.format_chk('n',o)) return o;
                else return false;
            }
            //
        }
    },
    clear_btn_grp : function (o,a){
        var p=o.parent();
        var c=p.children();
        //console.log("["+p.attr('class')+"]");
        if(/btn-group/.test(p.attr('class'))){
            c.each(function(e,t) {
                $(t).removeClass("active");
            });
            //console.log("clear btn grp");
        }
        if(a=="active"){ o.addClass("active"); }
    },
    clear_btn_grp_d : function (o,a){
        var p=o.parent().parent();
        var c=p.children();
        //console.log("["+p.attr('class')+"]");
        if(/btn-group/.test(c.attr('class'))){
            var cc=c.children();
            cc.each(function(e,t) {
                $(t).removeClass("active");
            });
            //console.log("clear btn grp");
        }
        if(a=="active"){ o.addClass("active"); }
    },
    get_active_btn_grp : function (o){
        var p=o.parent();
        var c=p.children();
        var d;
        //console.log("["+p.attr('class')+"]");
        if(/btn-group/.test(p.attr('class'))){
            c.each(function(e,t) {
                if(/active/.test($(t).attr('class'))){ d=$(t).attr('id'); }
            });
            if(d){ return d; }
        }
    },
    get_active_btn_grp_d : function (o){
        var p=o.parent().parent();
        var c=p.children();
        var d;
        //console.log("["+p.attr('class')+"]");
        if(/btn-group/.test(c.attr('class'))){
            var cc=c.children();
            cc.each(function(e,t) {
                if(/active/.test($(t).attr('class'))){ d=$(t).attr('id'); }
            });
            if(d){ return d; }
        }
    },
    get_active_class : function (c,find_class){
        console.log("get_active_class()");
        if(!find_class) find_class="active";
        var r={};
        var r_c,r_i;
        $(c).each(function(e,t) {
            try{ if($(t).attr('class')){ r_c=$.trim($(t).attr('class')); }else{r_c="";} }catch(e){r_c="";}
            try{ if($(t).attr('id')){ r_i=$.trim($(t).attr('id')); }else{r_i="";} }catch(e){r_i="";}
            //console.log("each c:"+ r_c+"/i:"+ r_i);
            if(qv_func.ereg(find_class,r_c)){
                console.log("find class c:"+ r_c+"/i:"+ r_i);
                r.i=r_i;
                r.c=r_c;
                //여기서 return 해도 break 되지 않고 loop를 다 돌아서 r에 할당했음, 여기서 return false; 하면 each문에서만 빠져나옴, $.each내에서 return true면 continue임
            }
        });
        if(r.i || r.c) return r;
        else return false;
    },
    clear_label_grp : function (o,a){ //o=label obj, a=active
        var p=o.parent();
        var c=p.children();
        //console.log("clear_label_grp ["+p.attr('class')+"]");
        if(/label-group/.test(p.attr('class'))){
            c.each(function(e,t) {
                $(t).find('.it-span-outer').removeClass("active");
                $(t).find('input:radio').attr("checked", false);
            });
            //console.log("clear label grp");
        }
        if(a=="active"){
            console.log("active");
            o.find('.it-span-outer').addClass("active");
            o.find('input:radio').attr("checked", true); //label>input-text direct 클릭시 label>radio check 처리
            //$('input:radio').attr("checked", true);
        }
    },
    rgb2hex : function(rgb) {
        if (  rgb.search("rgb") == -1 ) {
            return rgb;
        } else {
            //rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
            var _rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(,\s*(.*))?\)\s?/);
            var hex=function(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            if(_rgb[4]){
                if(_rgb[4]==",1" || _rgb[4]==", 1"){
                    return "#" + hex(_rgb[1]) + hex(_rgb[2]) + hex(_rgb[3]);
                }else{
                    return rgb;
                }
            }else{ return "#" + hex(_rgb[1]) + hex(_rgb[2]) + hex(_rgb[3]); }
        }
    },
    //rgba 포맷일 경우 format:rgba를 붙이고, default color가 있을 경우, 할당해 줌
    colorpicker_auto_opt : function(rgb,color){

    },
    chk_bandwid_val : function(d,s,e){
        if(d){
            if(s && e){
                //console.log("chk_bandwid_val d:"+d+"/s:"+s+"/e:"+e);
                if(parseInt(d)>=parseInt(s) && parseInt(d)<=parseInt(e)){
                    //console.log("chk_bandwid pass !!");
                    return true;
                }
            }else return false;
        }else return false;
    },
    //rm_px d에 'px'이 없을경우, 제대로 동작 안하므로, replace_pxperc 함수를 사용할것, 폐기예정
    rm_px :function(d){ //n+px px delete
        if(d){
            var r =d.match(/([0-9]*)(px)/);
            try{ if(r[1]) c=$.trim(r[1]); return c; }catch(e){}
        }else return false;
    },
    clipboardPlainTextPaste:function(e) {
        e.stopPropagation();
        e.preventDefault();
        if (e.originalEvent.clipboardData) { //chrome,ff
            content = (e.originalEvent || e).clipboardData.getData('text/plain');
            document.execCommand('insertText', false, content);
        }
        else if (window.clipboardData) { //ie
            content = window.clipboardData.getData('Text');
            if (window.getSelection)
                window.getSelection().getRangeAt(0).insertNode(document.createTextNode(content));
        }
    },
    isEmpty:function(value){
        if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
            return true;
        }else{
            return false;
        }
    },

    ckeditorAdd:function($t){
        //console.log("ckeditorAdd");
        $t.attr('contenteditable','true');
        if($t.is('.b-pp-text')){
            //console.log("b-pp-text find");
            $t.removeClass('b-pp-text');
            $t.removeClass('pp-text');
            $t.addClass('pp-text');
        }
        for (var i = 0; i < $t.length; i++) {
            CKEDITOR.inline($t[i]);
        }
    },

    ckeditorAddNoToolbar:function($t, callback){
        console.log("ckeditorAddCallback");
        var editor;
        $t.attr('contenteditable','true');
        if($t.is('.b-pp-text')){
            console.log("b-pp-text find");
            $t.removeClass('b-pp-text');
            $t.removeClass('pp-text');
            $t.addClass('pp-text');
        }
        for (var i = 0; i < $t.length; i++) {
            editor = CKEDITOR.inline($t[i]);
            editor.on('focus',function( e ){
                callback();
                return false;
            });
            editor.on('blur',function( e ){ return false; });
        }
    },

    randomId: function() {
        var text = "";
        var possible_alpahbat = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        text += possible_alpahbat.charAt(Math.floor(Math.random() * possible_alpahbat.length));
        for (var i = 0; i < 4; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    },

    setRandomId: function(ui) {
        if (ui[0].className.indexOf('frm') >= 0) {ui.attr('id', 'f' + qv_func.randomId());}
        $(ui).find('.frm').each(function (i, val) {
            $(val).attr('id', 'f' + qv_func.randomId());
        });
        if (ui[0].className.indexOf('box') >= 0) {ui.attr('id', 'b' + qv_func.randomId());}
        $(ui).find('.box').each(function (i, val) {
            $(val).attr('id', 'b' + qv_func.randomId());
        });
        //이미지는 i-random 을 선언해 주기로 해서, 아래 소스 사용안함
        // if (ui[0].className.indexOf('box') >= 0) {ui.attr('id', 'b' + qv_func.randomId());}
        // $(ui).find('.image-area').each(function (i, val) {
        //     $(val).attr('id', 'i' + qv_func.randomId());
        // });

        return ui;
    },

    getUrlParams: function(url) {
        // how to use
        // - https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters

        var qs = url ? url : document.location.search;
        qs = qs.split('+').join(' ');

        var params = {},
            tokens,
            re = /[?&]?([^=]+)=([^&]*)/g;

        while (tokens = re.exec(qs)) {
            params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
        }

        return params;
    },

    getSiteId: function() {
        return QV_BASE_OBJ.stid;
    },

    is_url: function(val){
        if (val == '') { return true; }
        var regex = /^http(s)?:\/\/(www\.)?[A-Za-z0-9]+([\-\.]{1}[A-Za-z0-9]+)*\.[A-Za-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
        return regex.test(val);
    },
    is_number: function(val){
        if (val == '') { return true; }
        var regex = /^[0-9\s]*$/;
        return regex.test(val);
    },
    is_email: function(val){
        if (val == '') { return true; }
        var regex=/^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{1,5}$/;
        return regex.test(val);
    },
    is_mobile_number: function(val) {
        if (val == '') { return true; }
        var regex = /^\d{2,3}-\d{3,4}-\d{4}$/;
        return regex.test(val);
    },

    setAccessToken: function(f) {
        if($(f).children('input:hidden[name=token]').length == 0)
            $(f).prepend('<input type="hidden" name="token" value="">');

        $.ajax({
            //url: "/module/board/ajax.access_token.php",
            url: "//g" + QV_BASE_OBJ.svid + "m.quv.kr/ajax.access_token.php",
            type: "GET",
            dataType: "json",
            async: false,
            cache: false,
            success: function(data, textStatus) {
                $(f).children('input:hidden[name=token]').val(data.token);
            }
        });
    },

    webfont_loader : function (font_family, fontactive, fontinactive) {
        if (!fontactive) { fontactive = function() {} }
        if (!fontinactive) { fontinactive = function() {} }

        var const_custom=[
            'Noto Sans KR',
            'Noto Serif KR',
            'Nanum Gothic',
            'Nanum Myeongjo',
            'Nanum Barun Gothic',
            'Nanum Square',
            'Nanum Square Round',
            'Nanum Barun Pen',
            'Nanum Brush Script',
            'Nanum Pen Script',
            'BMDOHYEON',
            'Yeon Sung',
            'BMEULJIRO',
            'Jua',
            'Hanna',
            'EBSJSK',
            'EBSHMJE',
            'Gamja Flower',
            'Godo',
            'Godo Maum',
            'Gugi',
            'Kukdetopokki',
            'Maplestory',
            'mj',
            'mn',
            'SeoulNamsan',
            'SeoulNamsanLong',
            'SeoulHangang',
            'SeoulHangangLong',
            'Yanolja Yache',
            'SCDream',
            'OSeong and HanEum',
            'Iropke Batang',
            'LSS',
            'LSSDot',
            'Jeju Gothic',
            'Jeju Myeongjo',
            'Jeju Hallasan',
            'ChosunilboMyeongjo',
            'Tmon Monsori',
            'Hi Melody',
            'Hangyule',
            'Black And White Picture',
        ];

        font_family = font_family.replace(/"/g, '');

        var webfont = {};
        var webfont_google = [];
        var webfont_custom = [];
        var webfont_custom_url = '//quv.kr/css/font.css.php?family=';

        if (const_custom.indexOf(font_family) == -1) {
            webfont_google.push(font_family + ':300,400,700');
            webfont.google = webfont_google;
        }
        else {
            webfont_custom.push(font_family);
            webfont.custom = webfont_custom;
            webfont.custom_url = [webfont_custom_url + font_family.replace(/ /g,'+')];
        }

        var webfontconfig = {};
        if (webfont.google) { webfontconfig.google = { 'families' : webfont.google } }
        if (webfont.custom) { webfontconfig.custom = { 'families' : webfont.custom, 'urls' : webfont.custom_url } }
        webfontconfig.fontactive = function(familyName, fvd) {
            fontactive(familyName, fvd);
        };
        webfontconfig.fontinactive = function(familyName, fvd) {
            fontinactive(familyName, fvd);
        };

        WebFont.load(webfontconfig);
    },
    post: function(path, params) {
        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement('form');
        form.method = 'post';
        form.action = path;

        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement('input');
                hiddenField.type = 'hidden';
                hiddenField.name = key;
                hiddenField.value = params[key];

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
    },
    conversion: function(type, callback) {
        if (QV_BASE_OBJ.is_free_version == 1) {
            callback();
        } else {
            const conversionUrl = '/module/conversion/?type=' + type;
            var iframe = document.createElement("iframe");
            iframe.src = conversionUrl;
            iframe.setAttribute('class', 'conversionIframe');
            // iframe.name = "frame";
            iframe.onload = callback;
            document.body.appendChild(iframe);
        }
    },
    isInAppBrowser: function() {
        let result = false;
        const inAppBrowser = ["kakaotalk", "kakaostory", "line", "naver(inapp", "daumapps", "nate_app", "baiduboxapp", "FBAN", "fb_iab", "instagram",];
        inAppBrowser.forEach(function(key) {
            if (navigator.userAgent.toLowerCase().indexOf(key) > -1) {
                result = true
            }
        })
        return result;
    }

    /*
     chk_ls :  function(d){
     //console.log("chk_ls:"+d);
     if(d){
     if(d>=-1 && d<=3) return true;
     else return false;
     }else return false;
     },
     chk_lh :  function(d){
     console.log("chk_lh:"+d);
     if(d){
     if(d>=0.5 && d<=3) return true;
     else return false;
     }else return false;
     },*/
};

// qv box function
var qv_bx_func={
    get_halign_type : function(d){
        return d=="pp-bx-ha-c"?"center":(d=="pp-bx-ha-r"?"right":"left");
    },
    get_ohalign_type : function(d){
        return d=="pp-obx-ha-c"?"center":(d=="pp-obx-ha-r"?"right":"left");
    },
    get_valign_type : function(d){
        return d=="pp-bx-va-m"?"mid":(d=="pp-bx-va-b"?"bot":"top");
    },
    get_bgi_align : function(o){
        //left/top:0% center:50% right/bottom:100%;
        var s=o.split(" ");
        var r={};
        console.log("bgi_align:"+o+"/c:"+s.length+"/s0:"+s[0]+"/s1:"+s[1]);
        if(s.length>0){
            var fh=function(x) {
                var r = (x=="0%"?"left":(x=="100%"?"right":(x=="50%"?"center":"")));
                if(!r) r = x;
                return r;
            }
            var fv=function(x) {
                var r = (x=="0%"?"top":(x=="100%"?"bottom":(x=="50%"?"center":"")));
                if(!r) r = x;
                return r;
            }
            if(s.length==1){
                r.h=fh(s[0]);
                r.v="center";
                //console.log("1");
            }else{
                r.h=fh(s[0]);
                r.v=fv(s[1]);
                //console.log("2");
            }
            //console.log("h:"+r.h+"/v:"+r.v);
            return r;
        }else{
            return false;
        }
    },
    /*파기:button에서 큐브형으로 변경으로 인해 get_bgi_halign_type : function(d){
     return d=="pp-bx-bg-ha-c"?"center":(d=="pp-bx-bg-ha-r"?"right":"left");
     },
     get_bgi_valign_type : function(d){
     return d=="pp-bx-bg-va-m"?"center":(d=="pp-bx-bg-va-b"?"bottom":"top");
     },*/
    get_bgi_position : function(d){ //id->class로 변경 / d=class, 값으로 "가로 세로" position return
        if(d) {
            var s=d.split(/\s/);
            if(s.length>0){
                var sp=s[1].split("-");
                console.log("get_bgi_position d:"+d+"/s[1]:"+s[1]+"/sp0:"+sp[0]+"/sp1:"+sp[1]);
                if(sp[0] && sp[1]) return sp[0]+" "+sp[1];
            }else{
                console.log("get_bgi_position format error");
            }
        }
        return false;
        //return d=="pp-bx-bg-ha-c"?"center":(d=="pp-bx-bg-ha-r"?"right":"left");
    },
    get_bd_sty_type : function(d){
        return d=="pp-bx-bd-sty-dashed"?"dashed":(d=="pp-bx-bd-sty-dotted"?"dotted":"solid");
    },
    get_bd_rad_type : function(d){
        return d=="7"?"50%":(d=="6"?"50px":(d=="5"?"30px":(d=="4"?"20px":(d=="3"?"10px":(d=="2"?"5px":"0%")))));
    },
    get_bd_rad_r_type : function(d){
        return d=="50%"?"7":(d=="50px"?"6":(d=="30px"?"5":(d=="20px"?"4":(d=="10px"?"3":(d=="5px"?"2":"1")))));
    },
    get_bx_sd :  function(d){
        console.log("get_bx_sd:"+d);
        var c='',w='',r={};
        var r =d.match(/(rgb[a]?\(.*\))(.*)/);
        try{ if(r[1]) c=$.trim(r[1]); w=$.trim(r[2]); }catch(e){}
        if(!c || !w){
            var r =d.match(/(.*)(#.*)/);
            try{ if(r[1]) c=$.trim(r[2]); w=$.trim(r[1]); }catch(e){}
        }
        if(c && w){
            console.log("c:"+c+"/w:"+w);
            var _s=w.split(/\s/);
            var s=$.trim(_s[2]);
            if(s){
                console.log("s:"+s);
                r.w = s=="1px"?1:(s=="2px"?2:(s=="3px"?3:(s=="4px"?4:(s=="5px"?5:(s=="10px"?6:(s=="20px"?7:(s=="30px"?8:(s=="40px"?9:(s=="50px"?10:"")))))))));
                r.c = c;
            }
        }else{
            r={};
            r.w='',r.c='';
        }
        return r;
//1	1px 1px 1px
//2	1px 1px 2px
//3	1px 1px 3px
//4	1px 1px 4px
//5	1px 1px 5px
//6	2px 2px 10px
//7	2px 2px 20px
//8	3px 3px 30px
//9	4px 4px 40px
//10	5px 5px 50px
    },
    set_bx_sd :  function(c,d){
        //console.log("set_bx_sd:"+d+"/c:"+c);
        if(c && d){
            var w = d=="1"?"1px 1px 1px":(d=="2"?"1px 1px 2px":(d=="3"?"1px 1px 3px":(d=="4"?"1px 1px 4px":(d=="5"?"1px 1px 5px":(d=="6"?"2px 2px 10px":(d=="7"?"2px 2px 20px":(d=="8"?"3px 3px 30px":(d=="9"?"4px 4px 40px":(d=="10"?"5px 5px 50px":"")))))))));
            if(w){
                return w+' '+c;
                console.log("w:"+w);
            }
        }
    },
    chk_ls :  function(d){
        //console.log("chk_ls:"+d);
        if(d){
            if(d>=-0.5 && d<=1.5) return true;
            else return false;
        }else return false;
    },
    chk_lh :  function(d){
        console.log("chk_lh:"+d);
        if(d){
            if(d>=0.5 && d<=3) return true;
            else return false;
        }else return false;
    },
    get_ic_wid_type : function(d){
        return d=="6"?"6em":(d=="5"?"5em":(d=="4"?"4em":(d=="3"?"3em":(d=="2"?"2em":"1em"))));
    },
    get_ic_wid_r_type : function(d){
        return d=="6em"?"6":(d=="5em"?"5":(d=="4em"?"4":(d=="3em"?"3":(d=="2em"?"2":"1"))));
    },
    get_ic_bwid_type : function(d){
        return d=="6"?"7em":(d=="5"?"6em":(d=="4"?"5em":(d=="3"?"4em":(d=="2"?"3em":"2em"))));
    },
    get_ic_bwid_r_type : function(d){
        return d=="7em"?"6":(d=="6em"?"5":(d=="5em"?"4":(d=="4em"?"3":(d=="3em"?"2":"1"))));
    },
    get_ic_rad_type : function(d){
        return d=="6"?"50%":(d=="5"?"40%":(d=="4"?"30%":(d=="3"?"20%":(d=="2"?"10%":"0%"))));
    },
    get_ic_rad_r_type : function(d){
        return d=="50%"?"6":(d=="40%"?"5":(d=="30%"?"4":(d=="20%"?"3":(d=="10%"?"2":"1"))));
    },
    /*get_an_sty : function(d){
     if(d){
     var _d=d.substr(-1,1);
     //console.log(_d);
     return _d;
     }else return false;
     },*/
    get_an_sty_set : function(an_sty,an_dir){
        var r={};
        if(!an_dir) an_dir=1;
        if(an_sty==1){
            r.name='fade-in';
            r.dir_hide=1;
        }else if(an_sty==2){
            r.name='scale-up';
            r.dir_hide=1;
        }else if(an_sty==3){
            r.dir_hide=4;
            if(an_dir==1) r.name='r-to-l';
            else if(an_dir==2) r.name='l-to-r';
            else if(an_dir==3) r.name='t-to-b';
            else if(an_dir==4) r.name='b-to-t';
        }else if(an_sty==4){
            r.dir_hide=2;
            if(an_dir==4) r.name='flip-x';
            else r.name='flip-y';
        }else if(an_sty==5){
            r.dir_hide=3;
            if(an_dir==2) r.name='spin-r';
            else r.name='spin';
        }else if(an_sty==6){
            r.dir_hide=1;
            r.name='twist';
        }else if(an_sty==7){
            r.dir_hide=2;
            if(an_dir==4) r.name='pulse';
            else r.name='tossing';
        }else{
            r,dir_hide=1;
        }
        return r;
    },
    get_last : function(d){
        if(d){
            var _d=d.substr(-1,1);
            console.log(_d);
            return _d;
        }else return false;
    },
    get_bt_wid_r_type : function(d){
        var ret;
        var r=d.split(/\s/);
        $.each(r, function(i, s) {
            var s=$.trim(s);
            if(s=="btn-xs"||s=="btn-sm"||s=="btn-lg"||s=="btn-vg"){
                ret=s;
            }
        });
        return ret?ret:'';
    },
    get_bt_sty : function(d){
        if(d){
            var _d=d.substr(-1,1);
            console.log("get_bt_sty:"+_d);
            return _d=="1"?"btn-default":(_d=="2"?"btn-primary":(_d=="3"?"btn-success":(_d=="4"?"btn-info":(_d=="5"?"btn-warning":(_d=="6"?"btn-danger":(_d=="7"?"btn-gray":(_d=="8"?"btn-dark":(_d=="9"?"btn-custom":""))))))));
        }else return false;
    },
    get_bt_sty_r : function(d){
        if(d){
            return d=="btn-default"?"1":(d=="btn-primary"?"2":(d=="btn-success"?"3":(d=="btn-info"?"4":(d=="btn-warning"?"5":(d=="btn-danger"?"6":(d=="btn-gray"?"7":(d=="btn-dark"?"8":(d=="btn-custom"?"9":""))))))));
        }else return false;
    },
    get_bt_txt :function(d){
        if(d){
            //미구현 태그제거 및 stripslashes 구현
            //관련 글로벌 함수 정의후 사용
            return d;
        }else return false;
    },

    color_box_display : function (t){
        var bgcolor=t.val();
        if(bgcolor){
            if(bgcolor.length==6){ bgcolor="#"+bgcolor; }
            t.parent().parent().find(".ci-preview-col").css('background',bgcolor);
        }else{
            t.parent().parent().find(".ci-preview-col").css('background','transparent');
        }
    },
}
