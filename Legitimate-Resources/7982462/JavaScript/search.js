
// On load
$(function(){
    var onClearEventHandler = 0;

    function init() {
        // Bind to search clear button click event
        $(".search-clear-button").click(clearSearchForm);
        // listen to clear search event
        onClearEventHandler = j2w.Search.addClearEventListener(onClearSearch);
    }
    init();

    /**
     * When the clear button is clicked emit Search Clear event.
     * @param oEvent
     */
    function clearSearchForm(oEvent) {
        j2w.Search.emitClearEvent();
        stopDefault(oEvent);
    }

    function onClearSearch() {
        $("input[name=q]").val("")
        $("input[name=locationsearch]").val("")
    }

    function stopDefault(e){
        e.preventDefault();
        e.stopImmediatePropagation();
    }
});