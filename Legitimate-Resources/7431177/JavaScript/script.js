/* jQuery alterClass plugin
 * Remove element classes with wildcard matching. Optionally add classes:
 *   $( '#foo' ).alterClass( 'foo-* bar-*', 'foobar' )
 * Copyright (c) 2011 Pete Boere (the-echoplex.net), Free under terms of the MIT license */
(function ( $ ) {
	$.fn.alterClass = function ( removals, additions ) {
		var self = this;
		if ( removals.indexOf( '*' ) === -1 ) {
			// Use native jQuery methods if there is no wildcard matching
			self.removeClass( removals );
			return !additions ? self : self.addClass( additions );
		}
		var patt = new RegExp( '\\s' +
				removals.
				replace( /\*/g, '[A-Za-z0-9-_]+' ).
				split( ' ' ).
				join( '\\s|\\s' ) +
				'\\s', 'g' );
		self.each( function ( i, it ) {
			var cn = ' ' + it.className + ' ';
			while ( patt.test( cn ) ) {
				cn = cn.replace( patt, ' ' );
			}
			it.className = $.trim( cn );
		});
		return !additions ? self : self.addClass( additions );
	};
})( jQuery );
/*alterClass:e*/

//function randomNumber() {
//    return randomFromInterval(1, 1e6)
//}

function randomFromInterval(e, t) {
    return Math.floor(Math.random() * (t - e + 1) + e)
}

function pp_randomNumber() {
    return randomFromInterval(5, 1e6)
}

function randomFromInterval(e, t) {
    return Math.floor(Math.random() * (t - e + 1) + e)
}

// dialog 창
function customDialogInit(selector, contents, xWid, onFunc, offFunc) {
    $("#main_container").delegate(selector, "click", function(e) {
        e.preventDefault();
        $(document).off('focusin.modal');
        console.log("customDialogInit");
        var $contents_clone=$(contents).clone().end();//clone().end() 시에는 copy가 아니라 기존 ele가 여기로 이동됨
        /*var $wrap_c = $(contents).wrap('<div class="get-html-tmp-wrap"></div>');
        var contents_html = $wrap_c.parent().html(); //pure text 변환하여 할당
        $wrap_c.unwrap();*/
        //$contents_clone.show();
        console.log($(contents));
        console.log($contents_clone.html());
        var container = $("#cfDialog");
        container.children().remove();
        //container.append(contents_html);
        container.append($contents_clone);
        var outerWidth=xWid>0 ? $('#main_container').width() + xWid : $('#main_container').width();
        var left_position=xWid>0 ? e.pageX + xWid : e.pageX;

        if(container.css('display') == 'block') {
            $(document).off('click.dialog-click-outside');
            deselectDialog($(this));
        } else {
            if(onFunc!==undefined) onFunc($(this));
            $("#cfDialog").css( { right:"" });

            $(document).on('click.dialog-click-outside', function(e) {
                var container = $("#cfDialog");
                if (e.target.className.indexOf('colorpicker') >= 0) return; // colorpicker는 예외처리
                if (!container.is(e.target) && container.has(e.target).length === 0 && container.css('display') == 'block') {
                    $(document).off('click.dialog-click-outside');
                    deselectDialog($(this));
                    if(offFunc!==undefined) offFunc();
                    console.log("click.dialog-click-outside off");
                }
            });

            $(this).addClass('selected');
            $('#cfDialog').slideFadeToggle(function () { // 팝업창이 화면 밖으로 넘어가면 화면 안으로 위치 재조정
                var positionY = e.pageY;
                if (window.innerHeight + 55 < (e.screenY + $("#cfDialog").height())) {
                    positionY = positionY - (e.screenY + $("#cfDialog").height() - window.innerHeight - 55);
                    $("#cfDialog").fadeIn().animate({top:positionY}, 200, function() { });
                }
                if (outerWidth < (e.pageX + $("#cfDialog").width())) {
                    $("#cfDialog").css( { left:"", right:10 });
                }
            });
        }
        $("#cfDialog").css( {position:"absolute", top:e.pageY, left: left_position}); // side bar 크기 300px
        return false;
    });
}

function deselectDialog(e) {
    $('#cfDialog').slideFadeToggle(function() {
        e.removeClass('selected');
    });
}

//confirm 창 모음
var syncCfEle;
function removeElm() { //ele remove
    $("#main_container").delegate(".remove", "click", function(e) {
        e.preventDefault();
        syncCfEle = $(this).parent().parent();
        var _cfOpt={'title':'해당 컨텐츠를 삭제합니다. 삭제 하시겠습니까?','btn1txt':'삭제','btn1css':'btn-danger','btn1func':cfRemoveEle};
        openCfModal(_cfOpt);

        //if (!$("#main_container .frm").length > 0) {
        //clearDemo()
        //}
    })
}

function dismissCfModal(){ //그냥 cfModal 닫기
    $('#cfModal').modal('hide');
}
function openCfModal(_cfOpt){
    console.log("openCfModal");
    $('#cfModal').data("cfOpt",'');
    $('#cfModal').data("cfOpt",_cfOpt);
    $('#cfModal').modal('show');
    $('#cfModal .modal-cf-title').html(_cfOpt.title);
    $('#cfModal #cfModalBtn1').text(_cfOpt.btn1txt);
    $('#cfModal #cfModalBtn1').removeAttr('class').addClass('btn btn-cf');
    $('#cfModal #cfModalBtn1').addClass(_cfOpt.btn1css);
    //btn1 func는 pp.js에서 #cfModal.data 바로 읽어서 할당
}

// confirm modal- custom func
function cfRemoveEle() {
    if(syncCfEle){
        console.log('cfRemoveEle()');
        syncCfEle.remove();
    }
}

$(window).resize(function() {
    $("body").css("min-height", $(window).height() - 110);
});

//  edmode전용


//selectbox = simple dropdown-box
function selectBox(t,f,s){ //t=jquery selector / f:onClick function / s:selected data-opt 값
    var ev_length=0;
    if(t.data('events')){
        var ev_length=t.data('events')['click'].length;
    }
    if(ev_length<1) { //이벤트 중복 할당 방지
        $(t).delegate("li", "click", function (e) {
            e.preventDefault();
            console.log("selectBox click");
            var btn = $(this).parent().parent().find("button");
            if (btn.length > 0) {
                if (typeof f != "undefined") {
                    if (!f($(this))) {
                        btn.parent().removeClass("open");
                        btn.attr("aria-expanded", "false");
                        return false;
                    }
                } //custom click function - $(item) 전달
                btn.children().remove();
                var sel_html = $(this).find("a").html() + " <span class='caret'></span>";
                var sel_data = $(this).data("opt");
                console.log(sel_data);
                btn.html(sel_html);
                btn.val(sel_data);
            } else {
                console.log("btn not found");
            }
        });
    }
    //selected opt
    if(s){
        var sel_opt=$(t).find(".dropdown-menu [data-opt=\""+s+"\"]");
        if(sel_opt.length<1) sel_opt=$(t).find(".dropdown-menu [data-opt='"+s+"']");
        if(sel_opt.length>0){
            console.log("find sel_opt");
            var btn=$(t).find("button");
            if(btn.length>0){
                btn.children().remove();
                var sel_html=sel_opt.find("a").html()+" <span class='caret'></span>";
                var sel_data=sel_opt.data("opt");
                console.log(sel_data);
                btn.html(sel_html);
                btn.val(sel_data);
            }
        }
    }
}

//dropdown-box, t=jquery selector , f=click function
function dropdownBox(t,f){
    $(t).delegate(".dropdown-item","click",function(e){
        $(t).toggleClass("on");
        $(t).find(".dropdown-item").removeClass("selected");
        $(this).addClass("selected");
        if(typeof f != "undefined" ){ f($(this)); } //custom click function - $(item) 전달
        if($(t).is(".on")) {
            $(document).on('click.qvDropDown', function(e) {
                var container = $(t);
                if(!container.is(".on")){ $(this).off('click.qvDropDown'); console.log("click.qvDropDown off");}
                if (!container.is(e.target) && container.has(e.target).length === 0 && $(t).is(".on")) {
                    $(t).toggleClass("on");
                    console.log("click.qvDropDown on");
                }
            });
        }
    })
}

// window resize -> google map refresh
$(window).resize(function(){
    // $('#main_container iframe[src^="https://www.google.com/maps"]')[0].src = $('#main_container iframe[src^="https://www.google.com/maps"]')[0].src;

    // 2019.05.09 재헌
    // 과도한 지도 리프레시가 발생
    // $('#main_container iframe[src^="https://www.google.com/maps"]').each(function (i, val) {
    //     $(val)[0].src = $(val)[0].src;
    // });
});

$.fn.bindFirst = function(name, fn) {
    // bind as you normally would
    // don't want to miss out on any jQuery magic
    this.on(name, fn);

    // Thanks to a comment by @Martin, adding support for
    // namespaced events too.
    this.each(function() {
        var handlers = $._data(this, 'events')[name.split('.')[0]];
        console.log(handlers);
        // take out the handler we just inserted from the end
        var handler = handlers.pop();
        // move it at the beginning
        handlers.splice(0, 0, handler);
    });
};


// USER ONLY
/**
 * Function to print date diffs.
 *
 * @param {Date} fromDate: The valid start date
 * @param {Date} toDate: The end date. Can be null (if so the function uses "now").
 * @param {Number} levels: The number of details you want to get out (1="in 2 Months",2="in 2 Months, 20 Days",...)
 * @param {Boolean} prefix: adds "in" or "ago" to the return string
 * @return {String} Diffrence between the two dates.
 */
function getNiceTime(fromDate, toDate, levels, prefix){
    var locale = LANG ? LANG : 'ko';
    var lang_ko = {
        "date.past": "{0} 전",
        "date.future": "{0} 후",
        "date.now": "방금",
        "date.year": "{0}년",
        "date.years": "{0}년",
        "date.years.prefixed": "{0}년",
        "date.month": "{0}달",
        "date.months": "{0}달",
        "date.months.prefixed": "{0}달",
        "date.day": "{0}일",
        "date.days": "{0}일",
        "date.days.prefixed": "{0}일",
        "date.hour": "{0}시간",
        "date.hours": "{0}시간",
        "date.hours.prefixed": "{0}시간",
        "date.minute": "{0}분",
        "date.minutes": "{0}분",
        "date.minutes.prefixed": "{0}분",
        "date.second": "{0}초",
        "date.seconds": "{0}초",
        "date.seconds.prefixed": "{0}초",
    };
    var lang_en = {
        "date.past": "{0} ago",
        "date.future": "in {0}",
        "date.now": "now",
        "date.year": "{0} year",
        "date.years": "{0} years",
        "date.years.prefixed": "{0} years",
        "date.month": "{0} month",
        "date.months": "{0} months",
        "date.months.prefixed": "{0} months",
        "date.day": "{0} day",
        "date.days": "{0} days",
        "date.days.prefixed": "{0} days",
        "date.hour": "{0} hour",
        "date.hours": "{0} hours",
        "date.hours.prefixed": "{0} hours",
        "date.minute": "{0} minute",
        "date.minutes": "{0} minutes",
        "date.minutes.prefixed": "{0} minutes",
        "date.second": "{0} second",
        "date.seconds": "{0} seconds",
        "date.seconds.prefixed": "{0} seconds",
    };

    switch(locale) {
        case 'en':
            var lang = lang_en;
            break;
        case 'ko':
        default:
            var lang = lang_ko;
            break;
    }

    var langFn = function(id,params){
            var returnValue = lang[id] || "";
            if(params){
                for(var i=0;i<params.length;i++){
                    returnValue = returnValue.replace("{"+i+"}",params[i]);
                }
            }
            return returnValue;
        },
        toDate = toDate ? toDate : new Date(),
        diff = fromDate - toDate,
        past = diff < 0 ? true : false,
        diff = diff < 0 ? diff * -1 : diff,
        date = new Date(new Date(1970,0,1,0).getTime()+diff),
        returnString = '',
        count = 0,
        years = (date.getFullYear() - 1970);
    if(years > 0){
        var langSingle = "date.year" + (prefix ? "" : ""),
            langMultiple = "date.years" + (prefix ? ".prefixed" : "");
        returnString += (count > 0 ?  ', ' : '') + (years > 1 ? langFn(langMultiple,[years]) : langFn(langSingle,[years]));
        count ++;
    }
    var months = date.getMonth();
    if(count < levels && months > 0){
        var langSingle = "date.month" + (prefix ? "" : ""),
            langMultiple = "date.months" + (prefix ? ".prefixed" : "");
        returnString += (count > 0 ?  ', ' : '') + (months > 1 ? langFn(langMultiple,[months]) : langFn(langSingle,[months]));
        count ++;
    } else {
        if(count > 0)
            count = 99;
    }
    var days = date.getDate() - 1;
    if(count < levels && days > 0){
        var langSingle = "date.day" + (prefix ? "" : ""),
            langMultiple = "date.days" + (prefix ? ".prefixed" : "");
        returnString += (count > 0 ?  ', ' : '') + (days > 1 ? langFn(langMultiple,[days]) : langFn(langSingle,[days]));
        count ++;
    } else {
        if(count > 0)
            count = 99;
    }
    var hours = date.getHours();
    if(count < levels && hours > 0){
        var langSingle = "date.hour" + (prefix ? "" : ""),
            langMultiple = "date.hours" + (prefix ? ".prefixed" : "");
        returnString += (count > 0 ?  ', ' : '') + (hours > 1 ? langFn(langMultiple,[hours]) : langFn(langSingle,[hours]));
        count ++;
    } else {
        if(count > 0)
            count = 99;
    }
    var minutes = date.getMinutes();
    if(count < levels && minutes > 0){
        var langSingle = "date.minute" + (prefix ? "" : ""),
            langMultiple = "date.minutes" + (prefix ? ".prefixed" : "");
        returnString += (count > 0 ?  ', ' : '') + (minutes > 1 ? langFn(langMultiple,[minutes]) : langFn(langSingle,[minutes]));
        count ++;
    } else {
        if(count > 0)
            count = 99;
    }
    var seconds = date.getSeconds();
    if(count < levels && seconds > 0){
        var langSingle = "date.second" + (prefix ? "" : ""),
            langMultiple = "date.seconds" + (prefix ? ".prefixed" : "");
        returnString += (count > 0 ?  ', ' : '') + (seconds > 1 ? langFn(langMultiple,[seconds]) : langFn(langSingle,[seconds]));
        count ++;
    } else {
        if(count > 0)
            count = 99;
    }
    if(prefix){
        if(returnString == ""){
            returnString = langFn("date.now");
        } else if(past)
            returnString = langFn("date.past",[returnString]);
        else
            returnString = langFn("date.future",[returnString]);
    }
    return returnString;
}


function pushNotification(title, body, type) {
    if (QV_BASE_OBJ.use_app != 1) { return; }

    var color = '#777777';
    var msid = QV_BASE_OBJ.msid;

    // title
    title = QV_BASE_OBJ.site_name + ' ' + title;
    if (title.length > 30) {
        title = title.substr(0, 30) + '...';
    }

    // body
    switch(type) {
        case 'board':
            body = '[새 게시물] ' + body;
            break;
        case 'form':
            body = '[새 응답] ' + body;
            break;
    }
    if (body.length > 50) {
        body = body.substr(0, 50) + '...';
    }

    qvjax_direct(
        "push_notification",
        "/module/mobile/mobile.php",
        'push_title=' + title + '&push_body=' + body + '&push_color=' + color + '&push_msid=' + msid + '&push_type=' + type,
        function (data) {
            console.log('[push success]', data)
        },
        function (xhr) {
            console.log('[push failure]', xhr)
        }
    );
}