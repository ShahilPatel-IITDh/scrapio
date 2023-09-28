var now = new Date();

function get_open_time(time) {
    var d = !!time ? time : new Date();
    return d.setMinutes(d.getMinutes() + d.getTimezoneOffset() + 480);
}

var url = new URL(window.location.href);
var track_info = {
    utmid: url.searchParams.get('utmid'),
    custlinkid: url.searchParams.get('custlinkid'),
    utm_source: url.searchParams.get('utm_source'),
    campaign_id: url.searchParams.get('campaign_id'),
    referer: url.searchParams.get('referer'),
    url: window.location.href,
    device: url.searchParams.get('device'),
    browser: url.searchParams.get('browser'),
    open_time: Math.round(now / 1000),
    linkday: url.searchParams.get('linkday'),
};


var postBool = true;
for (var t in track_info) {
    if(t=='referer' || t=='device' || t=='browser' || t=='linkday'){
        if (track_info[t] == null) {
            track_info[t] = '';
        }
    }else{
        if (track_info[t] == null) {
            postBool = false;
        }
    }
}

if(url.searchParams.get('click_id') != null) {
    track_info['click_id'] = url.searchParams.get('click_id');
}
if(url.searchParams.get('aff_id') != null){
    track_info['aff_id'] = url.searchParams.get('aff_id');
}

if (postBool) {
    localStorage.setItem('track_info', JSON.stringify(track_info));
}
try {
    
    var track_info = localStorage.getItem('track_info');
    var day = (!!JSON.parse(track_info).linkday && JSON.parse(track_info).linkday!=0) ? parseInt(JSON.parse(track_info).linkday) : 30;
    var expired = day * 24 * 60 * 60 * 1000;//一天 day=1
    if (!!track_info) {
        if (get_open_time() - JSON.parse(track_info).open_time*1000 < expired) {
            if (!!_dgOreder && !!_dgOreder['order_sn'] && !!_dgGoods && !!_dgGoods[0]['goods_id']) {
                $.ajax({
                    cache: false,
                    cross: true,
                    type: "POST",
                    dataType: "json",
                    url: "https://front.commissiongains.com/catch-order/collector",
                    data: {
                        site_domain: window.location.host,
                        order_info: JSON.stringify(_dgOreder),
                        goods_info: JSON.stringify(_dgGoods),
                        track_info: track_info
                    },
		    beforeSend  : function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                        XMLHttpRequest.withCredentials = false;
                    },
                    error: function (request) {
			console.log(request);
                    },
                    success: function (data) {
			console.log(data);
                    }
                });
            }
        }else{
            localStorage.removeItem('track_info');
        }
    }
} catch (e) {
    //console.log(e);
}


