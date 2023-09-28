function LineWikipedia(Node) {
    var $this = this;
    
    $this.panelNode = Node;
    $this.inputNode = $($this.panelNode).find('input');
    $this.clearButtonNode = $($this.panelNode).find('.button-clear');
    $this.listNode = $($this.panelNode).find('.wikipedia-list');
    $this.totalNode = $($this.panelNode).find('.wikipedia-list-totalhits');
    
    $this.state = {
        timeOutId: null,
        list: null,
        totalhits: null,
        displayAmount: parseInt($(Node).data('display-amount')),
        locale: 'hu'
    };
    
    $this.registerEvents = function() {
        $this.inputNode.on('keyup', $this.eventSearchInputChanged);
        $this.clearButtonNode.on('click', $this.clearInputAndList);
    };

    $this.actionQueryWikipediaApi = function(string) {
        var url = `https://${$this.state.locale}.wikipedia.org/w/api.php`;
        var urlParams = {
            action: 'query',
            format: 'json',
            list: 'search',
            srsearch: string
        };
        
        return $.ajax({
            url: url,
            cache: false,
            data: urlParams,
            header: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            method: 'GET',
            dataType: 'jsonp'
        });
    };
    
    $this.handleChangeEvent = function(inputField) {
        if(inputField.value === '') {
            return;
        }
        
        var $query = $this.actionQueryWikipediaApi(inputField.value);
        $query
            .done(function(data, result, xhr) {
                var state = $.extend({}, $this.state, {
                    query: data,
                    list: data.query.search,
                    totalhits: data.query.searchinfo.totalhits
                });
                
                $this.state = state;
                $this.render();
            })
            .fail(function(xhr) {
                console.error('Failed at querying wikipedia\'s api.');
                console.warn(xhr);
            });
    };
    
    $this.eventSearchInputChanged = function(event) {
        const delay = 500;
        
        if($this.state.timeOutId) {
            clearTimeout($this.state.timeOutId);
        }
        
        $this.state.timeOutId = setTimeout($this.handleChangeEvent, delay, event.currentTarget);
    };
    
    $this.clearInputAndList = function() {
        $this.listNode.empty();
        $this.inputNode.val('');
        $this.totalNode.empty();
        
        return this;
    };
    
    $this.render = function() {
        var ulNode = $this.listNode;
        
        ulNode.empty();
        
        for(var index in $this.state.list) {
            if($this.state.displayAmount > 0 && index > $this.state.displayAmount - 1) {
                break;
            }
            
            index = parseInt(index);
            var item = $this.state.list[index];
            
            var liNode = $('<li></li>');
            var aNode = $('<a></a>');
            var spanNode = $('<span></span>');
            
            spanNode
                .addClass('wikipedia-list-item-title')
                .html(item.title);

            aNode
                .attr('ref', 'nofollow')
                .attr('target', `wikipedia-${item.pageid}`)
                .attr('href', `https://${this.state.locale}.wikipedia.org/?curid=${item.pageid}`)
                .append(spanNode);
        
            liNode
                .append(aNode);
        
            ulNode
                .append(liNode);
        }
        
        var spanTotalNode = $('<span></span>');
        var aTotalNode = $('<a></a>');
        
        spanTotalNode
            .html(`Összes találat: ${$this.state.totalhits}`);
        
        let searchContent = encodeURIComponent($this.inputNode.val());
        
        aTotalNode
            .attr('ref', 'nofollow')
            .attr('target', `_blank`)
            .attr('href', `https://${$this.state.locale}.wikipedia.org/wiki/?search=${searchContent}`)
            .append(spanTotalNode);
        
        $this.totalNode
            .empty()
            .append(aTotalNode);
    };
    
    $this.registerEvents();
}
var WikipediaLines = document.querySelectorAll('.wikipedia-search-panel');
[].forEach.call(WikipediaLines, function(wikipediaNode) {
    new LineWikipedia(wikipediaNode);
});