var dla=dla||{};dla.lotteries=dla.lotteries||{},dla.lotteries.drawing={},dla.lotteries.drawing.showResults={target:"",show:function(e,t,a){dla.lotteries.drawing.showResults.target=e,new dla.helper.HtmlBuffer("lottery_").span("label").textI18n(a).end();for(var r=$("<span/>").addClass("label").html(dla.messages.get("lotto_"+a+"_label")),s=$("<ul/>").addClass("balls medium results"),i=0;i<t.length;i++){$("<li/>").addClass("l-lottery-number fadeIn-"+(i+1)).html(t[i]).appendTo(s)}e.addClass("resultsBox"),e.html("").append(r[0]).append(s[0]),setTimeout(function(){jsf.ajax.request("filterTicketsForm","click",{execute:"@form",render:"games",onevent:function(e){"success"===e.status&&setTimeout((function(){var e=dla.lotteries.drawing.showResults.target.closest(".ticketBody").prev().attr("id");$("#"+e).trigger("click")}),500)}})}.bind(e),1e3*(t.length+2))}},dla.lotteries.drawing.autoRefresh={interval:3e3,drawingId:"",lotteryName:"",listener:[],refresh:function(){var e={url:dla.navigate.rootUrl+"/api/drawings/"+dla.lotteries.drawing.autoRefresh.drawingId,dataType:"text",success:function(e){if(e){var t=$.parseJSON(e);t.numbers?(dla.lotteries.drawing.showResults.show($(".noResultsBox"),t.numbers,dla.lotteries.drawing.autoRefresh.lotteryName),dla.lotteries.drawing.autoRefresh.stop()):dla.lotteries.drawing.autoRefresh.start(dla.lotteries.drawing.autoRefresh.drawingId)}},error:function(e){"timeout"===e.statusText&&dla.lotteries.drawing.autoRefresh.isListening()&&dla.lotteries.drawing.autoRefresh.restart()},timeout:2e3};$.ajax(e)},setTimeout:function(){dla.lotteries.drawing.autoRefresh.timeoutId&&window.clearTimeout(this.timeoutId),dla.lotteries.drawing.autoRefresh.timeoutId=window.setTimeout(dla.lotteries.drawing.autoRefresh.refresh,dla.lotteries.drawing.autoRefresh.isListening()?100:dla.lotteries.drawing.autoRefresh.interval)},isListening:function(){return dla.lotteries.drawing.autoRefresh.listener.length>0},start:function(e){void 0!==e?(dla.lotteries.drawing.autoRefresh.drawingId=e,dla.lotteries.drawing.autoRefresh.lotteryName=e.split("_").shift(),dla.lotteries.drawing.autoRefresh.setTimeout()):dla.lotteries.drawing.autoRefresh.stop()},stop:function(){dla.lotteries.drawing.autoRefresh.drawingId=void 0,this.timeoutId&&window.clearTimeout(dla.lotteries.drawing.autoRefresh.timeoutId)}};