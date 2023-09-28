// JavaScript Document

function add_items()
{
	
	
	new Ajax.Updater('feed_items', '/live_feed/async_load_items.php?limit_from='+limit_from+'&limit='+limit+'&id_feed='+id_feed, {
	  
	  insertion: Insertion.Bottom
	});
	
	limit_from_div = limit_from - limit;
	
	$('linklim'+limit_from_div).innerHTML='';
	
	limit_from = limit_from + limit;
	
}

function add_vimeo(obj,vimeo)
{
	
	$(obj).innerHTML = '<br><object width="600" height="400"><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id='+vimeo+'&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=00adef&amp;fullscreen=1" /><embed src="http://vimeo.com/moogaloop.swf?clip_id='+vimeo+'&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=00adef&amp;fullscreen=1" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="600" height="400"></embed></object>';
}

function add_videos(id)
{
	
	if ( $('vidspan'+id).innerHTML == '' )
	{
	$('vidspan'+id).innerHTML='';
	
	
	new Ajax.Updater('vidspan'+id, '/live_feed/async_load_videos.php?id_item='+id, {
	  
	  insertion: Insertion.Bottom
	});
	}
	else
	{
	$('vidspan'+id).innerHTML='';
	}
	//limit_from_div = limit_from - limit;
	
	
	//limit_from = limit_from + limit;
	
}