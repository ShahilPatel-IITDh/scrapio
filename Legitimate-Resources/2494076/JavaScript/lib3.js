// JavaScript Document

function add_forum_topics()
{
    
    
    new Ajax.Updater('forum_items', '../news/async_load_forum_topics5.php?limit_from='+limit_from+'&limit='+limit, {
      
     
    });
    

    
}


function add_events()
{
    
    
    new Ajax.Updater('event_items', '../events/async_load_items.php', {
      
     
    });
    

    
}

function add_parts()
{
    
    
    new Ajax.Updater('part_items', '../parts/async_load_items.php', {
      
     
    });
    

    
}



function add_sidebar()
{
    
    
    new Ajax.Updater('sidebar_box', '../news/async_load_sidebar3.php', {
      
     
    });
    

    
}

function add_live_feed()
{
    
    limit = 5;
    limit_from = 0;
    id_feed = -1;
    
    new Ajax.Updater('feed_items', '/live_feed/async_load_items.php?more=false&layout=1&limit_from='+limit_from+'&limit='+limit+'&id_feed='+id_feed, {
      
    });
    
    limit_from = 5 ;
    
    limit_from_div = limit_from - limit;
    

    //$('linklim' + limit_from_div).innerHTML='';
    
    //limit_from = limit_from + limit;
    
}

function add_posts_of_topic(topic)
{
    
    
    new Ajax.Updater('forum_posts', '/includes/smf_bridge/async_get_posts_of_topic.php?topic='+topic, {
      
     
    });
    

    
}