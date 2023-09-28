/********************************
ActiveBoard Menu Script
Copyright 2004 Sparklit Networks
*********************************/

var ab_mnu_enable_fade_in = false;
var ab_mnu_enable_fade_out = false;

var ab_mnu_elem = new Array();
var ab_mnu_shown = null;
var ab_mnu_fade_lock = null;

function ab_mnu_register(id) {
	if(e = document.getElementById(id)) {
		ab_mnu_elem[ab_mnu_elem.length] = id;
	}
	else {
		return false;
	}
}

function ab_mnu_init_all() {
	for(i = 0; i < ab_mnu_elem.length; i++) {
		ab_mnu_init(ab_mnu_elem[i]);
	}
}

function ab_mnu_init(id) {
	var menuSel = $('#'+id);
	if (menuSel.length > 0)
	{
		var parentSel = $('#'+id+'_parent'),
			parentHeight = parentSel.outerHeight();
		
		menuSel.css('top', (menuSel.position().top + parentHeight) + 'px');
		$(window).on('resize.abMenuHideAll', ab_mnu_hide_all);
	}
	else
	{
		return false;
	}
}

function ab_mnu_hide_all() {
	for(i = 0; i < ab_mnu_elem.length; i++) {
		curID = ab_mnu_elem[i];
		if(ab_mnu_shown == curID)
			continue;
		var menuSel = $('#'+curID);
		if(menuSel.length) {
			if(ab_mnu_enable_fade_out) {
				ab_mnu_fade_out(curID, 10, 10, 1000);	
			} else {
				menuSel.css({
					top: null,
					left: null,
					display: 'none'
				});
			}
		}
	}
}

function ab_mnu_show(id, clicked) {
	if(id != ab_mnu_shown) {
		var itemSel = $('#'+id);
		if(itemSel.length) {
			itemSel.css('display','block');
			
			var itemPos = itemSel.position(),
				itemWidth = itemSel.outerWidth(),
				parentSel = $(clicked),
				parentWidth = parentSel.outerWidth(),
				parentHeight = parentSel.outerHeight(),
				parentPos = parentSel.position(),
				windowWidth = $(window).width();

			itemSel.css('top', parentPos.top + parentHeight);
			if ((itemPos.left + itemWidth) > windowWidth)
				itemSel.css('left', parentPos.left - itemSel.outerWidth() + parentWidth);
			else
				itemSel.css('left', parentPos.left);
			
			if(ab_mnu_enable_fade_in)
				ab_mnu_fade_in(id, 10, 10, 0, 1000);
			ab_mnu_shown = id;
		}
		else {
			return false;
		}
	} else {
		ab_mnu_shown = null;
	}
	
	ab_mnu_hide_all();
}

function ab_mnu_fade_in(id, interval, step, curY, maxY) {
	if((curY < maxY) && (e = document.getElementById(id))) {
		curY = (curY + step < maxY ? curY + step : maxY);
		e.style.clip = "rect(auto, auto, " + curY + "px, auto)";
		setTimeout("ab_mnu_fade_in('"+id+"',"+interval+","+step+","+curY+","+maxY+");", interval);
	}
}

function ab_mnu_fade_out(id, interval, step, curY) {
	if((curY > 0) && (e = document.getElementById(id))) {
		if((curY -= step) < 0)
			curY = 0;
		e.style.clip = "rect(auto, auto, " + curY + "px, auto)";
		setTimeout("ab_mnu_fade_out('"+id+"',"+interval+","+step+","+curY+");", interval);
	}
	
	if((curY == 0) && e) {
		e.style.left = "0px";
		e.style.top = "0px";
		e.style.display="none";
	}
}

function adjustedLeft(initialLeft, width) {
	dw = getDocumentWidth();
	
	if(initialLeft < 0)
		return 0;
	if(initialLeft + width > dw)
		return dw - width;
	return initialLeft;
}

function absoluteLeft(e)
{
	l = 0;
	do {
		if(e.offsetLeft)
			l += e.offsetLeft;
	} while (e = e.offsetParent);
	return l;
}

function absoluteBottom(e)
{
	t = e.offsetHeight;
	do {
		if(e.offsetTop)
			t += e.offsetTop;
	} while (e = e.offsetParent);
	return t;
}

function getDocumentWidth() {
	if (window.innerWidth)
		return window.innerWidth; 
	
	if (document.body.clientWidth)
		return document.body.clientWidth;
}

function getDocumentHeight() {
	if (window.innerHeight)
		return window.innerHeight; 

	if (document.body.clientHeight)
		return document.body.clientHeight; 
}


/********************************/