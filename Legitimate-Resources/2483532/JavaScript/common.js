$(function() {
	$(window).scroll(function() {
		height = $(window).scrollTop();
		if (height > 10) {
			$('.dh2').slideDown()
		} else {
			$('.dh2').slideUp()
		}

	})
});

function gotoTop(acceleration, stime) {
	acceleration = acceleration || 0.1;
	stime = stime || 10;
	var x1 = 0;
	var y1 = 0;
	var x2 = 0;
	var y2 = 0;
	var x3 = 0;
	var y3 = 0;
	if (document.documentElement) {
		x1 = document.documentElement.scrollLeft || 0;
		y1 = document.documentElement.scrollTop || 0
	}
	if (document.body) {
		x2 = document.body.scrollLeft || 0;
		y2 = document.body.scrollTop || 0
	}
	var x3 = window.scrollX || 0;
	var y3 = window.scrollY || 0;
	var x = Math.max(x1, Math.max(x2, x3));
	var y = Math.max(y1, Math.max(y2, y3));
	var speeding = 1 + acceleration;
	window.scrollTo(Math.floor(x / speeding), Math.floor(y / speeding));
	if (x > 0 || y > 0) {
		var run = "gotoTop(" + acceleration + ", " + stime + ")";
		window.setTimeout(run, stime)
	}
};


layui.use('layer',function(){
	var $ =layui.jquery,layer =layui.layer;
})
function opens(urls, msgs, wid, hei, sclose) {
	if (sclose == "no") {
		var sclose = false
	} else {
		var sclose = true
	};
	layer.open({
		type: 2,
		closeBtn: 2,
		title: false,
		maxmin: false,
		shade: 0.5,
		shadeClose: sclose,
		id: 'DZD_OPENS_WINDOWS',
		area: [wid, hei],
		content: urls
	})
	
};

function DZD_AJAX_FORM(urls, msgskin) {
	$.ajax({
		url: urls,
		type: 'POST',
		data: $('form').serialize(),
		success: function(data) {
			var DZD_obj = eval('(' + data + ')');
			if (msgskin == 1) {
				DZDMSG(DZD_obj.tomsg, DZD_obj.tolink, DZD_obj.totime, DZD_obj.toskin)
			}else if (msgskin == 2) {
				if (DZD_obj.toskin == 5) {
					DZDMSG(DZD_obj.tomsg, DZD_obj.tolink, DZD_obj.totime, DZD_obj.toskin)
				} else if (DZD_obj.toskin == 6) {
					DZDMSG3(DZD_obj.tomsg, DZD_obj.tolink, DZD_obj.totime, DZD_obj.toskin)
				}
			}
		}
	});
	return false
}
function DZDMSG(tomsg, tolink, totime, toskin) {
	if (toskin == 6) {
		var toanim = 0
	} else {
		var toanim = 6
	}
	layer.msg(tomsg, {
		time: totime * 1000,
		icon: toskin,
		anim: toanim
	});
}

function DZDMSG3(tomsg, toskin) {
var ZIWINDOWS = parent.layer.getFrameIndex(window.name);
	parent.DZDMSG_FUWINDOWS_MSG(tomsg, toskin);
	parent.layer.close(ZIWINDOWS);
}


function DZDMSG_FUWINDOWS_MSG(tomsg, toskin) {
	layer.open({
		title: '提示信息',
		content: tomsg,
		skin: 'layui-layer-molv',
		icon: toskin,
		closeBtn: 0,
		btn: ['确认'],
		success: function() {
			this.enterEsc = function(event) {
				if (event.keyCode === 13 || event.keyCode === 32) {
					location.reload();
					return false
				}
			};
			$(document).on('keydown', this.enterEsc)
		},
		end: function() {
			location.reload()
		}
	})
}
