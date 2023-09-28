(function (){
	var pars   = [0,'187','2','0','1','1','ru','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1'];
	var cnt    = '';
	var rname  = "scbmr_"+Math.round(Math.random() * 10000);
	var ttname = "scbmr_t"+Math.round(Math.random() * 10000);
	var twname = "scbmr_tw"+Math.round(Math.random() * 10000);
	var html   = jQuery('<table style="padding:5px 3px" cellspacing="0" cellpadding="0" border="0"/>');
	var desc   = '';
	var sbOver = '';
	var num_c  = pars[2];
	var ic_sz  = pars[3];
	var cLang  = pars[6];
	var opts   = {
		containerClass: 'scil-grp',
		linkClass: 'scil-icn'
	};
	var siteInfo = {
		delicious : {
			url      : 'http://del.icio.us/post?v=2&amp;',
			urlKey   : 'url',
			titleKey : 'title',
			desc     : 'Delicious'
		},
		twitter : {
			url    : 'http://twitter.com/home?',
			urlKey : "status",
			desc   : "Twitter"
		},
		digg : {
			url      : 'http://digg.com/submit?',
			urlKey   : 'url',
			titleKey : 'title',
			desc     : 'DiggIt!'
		},
		facebook : {
			url      : 'http://www.facebook.com/sharer.php?',
			urlKey   : 'u',
			titleKey : 'title',
			desc     : 'FaceBook'
		},
		google : {
			url      : 'http://www.google.com/bookmarks/mark?op=edit&amp;',
			urlKey   : 'bkmk',
			titleKey : 'title',
			desc     : 'Google'
		},
		myspace : {
			url      : 'http://www.myspace.com/Modules/PostTo/Pages/?',
			urlKey   : 'c',
			titleKey : 't',
			desc     : 'MySpace'
		},
		livej : {
			url      : 'http://www.livejournal.com/update.bml?',
			urlKey   : 'event',
			titleKey : 'subject',
			desc     : 'LiveJournal'
		},
		friendfeed : {
			url      : 'http://friendfeed.com/share?',
			urlKey   : 'url',
			titleKey : 'title',
			desc     : 'FriendFeed'
		},
		yahoo : {
			url      : 'http://myweb2.search.yahoo.com/myresults/bookmarklet?',
			urlKey   : 't',
			titleKey : 'u',
			desc     : 'Yahoo'
		},
		bobrdobr : {
			url      : 'http://bobrdobr.ru/addext.html?',
			urlKey   : 'url',
			titleKey : 'title',
			lng      : 'ru',
			desc     : 'BobrDobr.ru'
		},
		memori : {
			url      : 'http://memori.ru/link/?sm=1&amp;',
			urlKey   : 'u_data[url]',
			titleKey : 'u_data[name]',
			lng      : 'ru',
			desc     : 'Memori.ru'
		},
		moemesto : {
			url      : 'http://moemesto.ru/post.php?',
			urlKey   : 'url',
			titleKey : 'title',
			lng      : 'ru',
			desc     : 'MoeMesto.ru'
		},
		yandex : {
			url      : 'http://zakladki.yandex.ru/newlink.xml?',
			urlKey   : 'url',
			titleKey : 'name',
			lng      : 'ru',
			desc     : 'Yandex.ru'
		},
		moymir : {
			url      : 'http://connect.mail.ru/share?',
			urlKey   : 'share_url',
			lng      : 'ru',
			desc     : 'My.mail.ru',
			notitle  : true
		},
		vkru : {
			url      : 'http://vkontakte.ru/share.php?',
			urlKey   : 'url',
			lng      : 'ru',
			desc     : 'Vkontakte.ru',
			notitle  : true
		}
	};
	document.write("<div style='overflow:auto' id=" + rname + "></div>");
	jQuery(html).attr('id', ttname);
	if (num_c != 0 && pars[4] != 0 ) {
		jQuery('#'+rname).width(pars[1]);
	}
	jQuery('#' + rname).append(jQuery(html));
	if (pars[4] == 0 ) {
		num_c = '2';
		ic_sz = '0';
	}
	var s = ['delicious', 'twitter', 'digg', 'facebook', 'google', 'myspace', 'friendfeed', 'yahoo', 'bobrdobr', 'memori', 'moemesto', 'yandex', 'moymir', 'livej', 'vkru'];
	if (pars[7] == '1' ) {
		var sites = s;
	} else {
		var sites = [];
		for (var i = 8; i < pars.length; i++ ) {
			if (pars[i] == 1 ) {
				sites.push(s[i - 8]);
			}
		}
	}
	var sitesLength = sites.length;
	var siteLinks = [];
	var j = 0;
	for (var i = 0; i < sitesLength; i++ ) {
		if (typeof siteInfo[sites[i]].lng == 'undefined' || siteInfo[sites[i]].lng == cLang ) {
			var site = siteInfo[sites[i]];
			if (site === undefined ) continue;
			if (num_c != 0 ) {
				if (j % num_c === 0 ) {
					cnt = jQuery('<tr>');
					j = 0;
				}
			}
			var urlKey = site.urlKey ? site.urlKey + '=' : '';
			if (pars[4] == 0 ) {
				desc = site.desc;
				sbOver = 'onmouseover = "jQuery(this).addClass(\'myWinTD2\')" onmouseout="jQuery(this).removeClass(\'myWinTD2\')"'; //"
			}
			var siteTitle = site.titleKey ? '&amp;' + site.titleKey + '=' : ' - ';
			var title_ = "";
			if (!site.notitle ) {
				title_ = siteTitle + encodeURIComponent(document.title)
			}
			var siteLink='<a class="sbAcls" style="cursor:pointer;text-decoration:none" href="' + site.url + urlKey + encodeURIComponent(window.location.href) + title_ + '" target="_blank" title="Post to: ' + site.desc + '"><img alt="" align="absmiddle" border="0" vspace="4" hspace="4" src="/.s/wid/45/'+ic_sz+'/'+sites[i]+'.png"><span>'+desc+'</span></a>';
			siteLinks[i] = siteLink;
			if (num_c != 0 ) {
				jQuery(cnt).append(jQuery('<td class="sbTdcls" '+ sbOver + '/>').append(siteLink));
				if (pars[4] != 0 ) {
					jQuery('#' + ttname, '#' + rname).append(cnt);
				} else {
					jQuery('#' + ttname).append(cnt).find('.sbTdcls').width(100).end().find('.sbAcls').css({
						'display':'block',
						'width':'100%',
						'height':'100%'
					});
				}
			} else {
				if (pars[4] != 0 ) {
					jQuery('#' + rname).append(jQuery('<div style="float:left;"/>').append(siteLink));
				} else {
					jQuery('#' + ttname).append(jQuery('<td/>').append(siteLink));
				}
			}
			j+=1;
		}
	}
	if (pars[4] == 0 ) {
		var cnt_w = html.parent(0).html();
		jQuery('#'+rname).html('').append(jQuery('<img style="cursor:pointer"/>').attr("src", "/.s/wid/45/thumb/" + pars[5] + ".png").click(function(){
			new _uWnd('wnd_'+rname, 'Bookmarks',217,165, {waitimages: 300000,fadetype: 1, align: 'left', min: 0, max: 0, closeonesc:1, resize: 0, autosize: 1}, cnt_w);
			return false;
		}));
	} else {
		if (num_c == 0) {
			jQuery('#' + rname).append('<div style="clear:both"/>');
		}
	}
})();