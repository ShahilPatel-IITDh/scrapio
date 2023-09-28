/*
 * Script from NETTUTS.com [by James Padolsey] V.2 (ENHANCED, WITH COOKIES!!!)
 * @requires jQuery($), jQuery UI & sortable/draggable UI modules & jQuery COOKIE plugin
 */

var iNettuts = {
    
    jQuery : $,
    
    settings : {
        columns : '.column',
        widgetSelector: '.widget',
        handleSelector: '.widget-head',
        contentSelector: '.widget-content-wrapper',
        
        /* If you don't want preferences to be saved change this value to
            false, otherwise change it to the name of the cookie: */
        saveToCookie: 'habbox-widgets-preference',
        
        widgetDefault : {
            movable: true,
            },
        widgetIndividual : {}
    },

    init : function () {
        this.sortWidgets();
        this.makeSortable();
    },
    
    getWidgetSettings : function (id) {
        var $ = this.jQuery,
            settings = this.settings;
        return (id&&settings.widgetIndividual[id]) ? $.extend({},settings.widgetDefault,settings.widgetIndividual[id]) : settings.widgetDefault;
    },
    
   
    makeSortable : function () {
        var iNettuts = this,
            $ = this.jQuery,
            settings = this.settings,
            $sortableItems = (function () {
                var notSortable = '';
                $(settings.widgetSelector,$(settings.columns)).each(function (i) {
                    if (!iNettuts.getWidgetSettings(this.id).movable) {
                        if(!this.id) {
                            this.id = 'widget-no-id-' + i;
                        }
                        notSortable += '#' + this.id + ',';
                    }
                });
                if (notSortable.length > 0) {
return $('> li:not(' + notSortable + ')', settings.columns);
} else {
return $('> li', settings.columns);
}
            })();
        
        $sortableItems.find(settings.handleSelector).css({
            cursor: 'move'
        }).mousedown(function (e) {
            $sortableItems.css({width:''});
            $(this).parent().css({
                width: $(this).parent().width() + 'px'
            });
        }).mouseup(function () {
            if(!$(this).parent().hasClass('dragging')) {
                $(this).parent().css({width:''});
            } else {
                $(settings.columns).sortable('disable');
            }
        });

        $(settings.columns).sortable({
            items: $sortableItems,
            connectWith: $(settings.columns),
            handle: settings.handleSelector,
            placeholder: 'widget-placeholder',
            //forcePlaceholderSize: true,
            revert: 300,
            delay: 100,
            opacity: 0.8,
            containment: 'document',
            start: function (e,ui) {
                $(ui.helper).addClass('dragging');
				ui.placeholder.height($(ui.item).height());
			},
            stop: function (e,ui) {
                $(ui.item).css({width:''}).removeClass('dragging');
                $(settings.columns).sortable('enable');
                /* Save prefs to cookie: */
                iNettuts.savePreferences();
            }
        });
    },
    
    savePreferences : function () {
        var iNettuts = this,
            $ = this.jQuery,
            settings = this.settings,
            cookieString = '';
            
        if(!settings.saveToCookie) {return;}
        
        /* Assemble the cookie string */
        $(settings.columns).each(function(i){
            cookieString += (i===0) ? '' : '|';
            $(settings.widgetSelector,this).each(function(i){
                cookieString += (i===0) ? '' : ';';
                /* ID of widget: */
                cookieString += $(this).attr('id') + ',';
                         
            });
        });
        $.cookie(settings.saveToCookie,cookieString,{
            expires: 365
            //path: '/'
        });
    },
    
    sortWidgets : function () {
        var iNettuts = this,
            $ = this.jQuery,
            settings = this.settings;
        
        /* Read cookie: */
        var cookie = $.cookie(settings.saveToCookie);
        if(!settings.saveToCookie||!cookie) {

            return;
        }
        
        /* For each column */
        $(settings.columns).each(function(i){
            
            var thisColumn = $(this),
                widgetData = cookie.split('|')[i].split(';');
                
            $(widgetData).each(function(){
                if(!this.length) {return;}
                var thisWidgetData = this.split(','),
                    clonedWidget = $('#' + thisWidgetData[0]);
                
              
               
                $('#' + thisWidgetData[0]).remove();
                $(thisColumn).append(clonedWidget);
            });
        });

    }
  
};

iNettuts.init();