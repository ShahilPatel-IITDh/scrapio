function AjaxSuggestion(){return this}AjaxSuggestion.elem=0;AjaxSuggestion.selected=-1;AjaxSuggestion.isStopped=false;AjaxSuggestion.xhr;AjaxSuggestion.init=function(a){this.elem=a;a.attr("autocomplete","off");a.keydown(function(b){if(b.keyCode==9){$(".suggest").hide()}});a.keyup(function(b){if(b.keyCode==27){$(".suggest").hide();return false}if(!AjaxSuggestion.popupShown()&&(b.keyCode==38||b.keyCode==40)){AjaxSuggestion.loadSuggestions();return false}if(b.keyCode==38){AjaxSuggestion.moveUp();return false}if(b.keyCode==40){AjaxSuggestion.moveDown();return false}if(b.keyCode==32){AjaxSuggestion.selected=-1}if(b.keyCode==13){if(AjaxSuggestion.popupShown()&&AjaxSuggestion.selected>=0){if(b.preventDefault){b.preventDefault()}else{b.returnValue=false}if(b.stopPropagation){b.stopPropagation()}else{b.cancelBubble=true}AjaxSuggestion.chooseSearchTypeAndDoIt(a.val())}if(AjaxSuggestion.xhr){AjaxSuggestion.xhr.abort()}$(".suggest").hide();return false}if(b.keyCode==16||b.keyCode==17||b.keyCode==18||b.keyCode==37||b.keyCode==39){return false}if(b.keyCode==8&&!a.val()){if(AjaxSuggestion.xhr){AjaxSuggestion.xhr.abort()}$(".suggest").hide();return false}AjaxSuggestion.startTimer()});a.keypress(AjaxSuggestion.preventDefaultForArrowKeys);a.keyup(AjaxSuggestion.preventDefaultForArrowKeys)};AjaxSuggestion.chooseSearchTypeAndDoIt=function(b){var a=$("body");if(a.hasClass("jsMyAccount")){doOwnAccountSearch(b)}else{if(a.hasClass("jsSearchPage")){$(".jsSearchSuggestedTerm").val(b);$("#searchQuery").val(b);Events.fireEvent("suggestions.change.query")}else{if(a.hasClass("mobile")){searchInputElement.val(b);searchInputElement.closest("form").submit()}else{doHeaderSearch(b)}}}AjaxSuggestion.enableSuggestionsJScount()};AjaxSuggestion.preventDefaultForArrowKeys=function(a){var b=a.keyCode;AjaxSuggestion.isStopped=(b==13)};AjaxSuggestion.highlightSelected=function(){if(AjaxSuggestion.selected>=0){var a=$("#sugg"+AjaxSuggestion.selected);a.addClass("hovered");AjaxSuggestion.elem.val(AjaxSuggestion.normalizeQueryString(a))}};AjaxSuggestion.moveUp=function(){$(".suggestAnchor").removeClass("hovered");if(AjaxSuggestion.selected<=0){AjaxSuggestion.selected=AjaxSuggestion.lastIdx}else{AjaxSuggestion.selected--}AjaxSuggestion.highlightSelected()};AjaxSuggestion.moveDown=function(){$(".suggestAnchor").removeClass("hovered");if(AjaxSuggestion.selected>=AjaxSuggestion.lastIdx){AjaxSuggestion.selected=0}else{AjaxSuggestion.selected++}AjaxSuggestion.highlightSelected()};AjaxSuggestion.timeOut=0;AjaxSuggestion.startTimer=function(){if(AjaxSuggestion.timeOut){clearTimeout(AjaxSuggestion.timeOut)}this.timeOut=setTimeout(AjaxSuggestion.loadSuggestions,0)};AjaxSuggestion.lastIdx=-1;AjaxSuggestion.popupShown=function(){return $(".suggest").is(":visible")};AjaxSuggestion.loadSuggestions=function(){if(AjaxSuggestion.timeOut){clearTimeout(AjaxSuggestion.timeOut)}if(AjaxSuggestion.isStopped){return}var a=AjaxSuggestion.elem.val().replace(/\s{2,}/g," ").replace(/^[\s\u00A0][\s\u00A0]*/,"");if(a==""){$(".suggest").hide();return}if(AjaxSuggestion.xhr){AjaxSuggestion.xhr.abort()}AjaxSuggestion.xhr=$.ajax({url:"//"+Config.suggestionsDomain+"/web/rest/v1_1/suggestions/internal",data:{query:a,limit:10},type:"post",success:function(d){var c=$(".suggest");if(!!d&&!!d.suggestions&&d.suggestions.length>0){var b=$(c).find("ul");b.find("li").remove();$.each(d.suggestions,function(f,i){var h=i.suggestion.substring(a.length);var g=i.suggestion.slice(0,a.length);var e=$("<li><div class='suggestAnchor' id='sugg"+f+"' data-ga='sugg.1-"+f+"'><span></span><b></b></div></li>");e.find("span").text(g);e.find("b").text(h);b.append(e);AjaxSuggestion.lastIdx=f});$(c).ready(function(){var e=$(".suggestAnchor");e.click(function(){AjaxSuggestion.chooseSearchTypeAndDoIt(AjaxSuggestion.normalizeQueryString($(this)))});e.hover(function(){$(".suggestAnchor").removeClass("hovered");$(this).addClass("hovered");AjaxSuggestion.selected=-1})});$(c).show()}else{$(c).hide();$(c).find("ul").html("")}}})};AjaxSuggestion.searchesRelatedTo=function(){var a=$(".jsRelatedSearchesBlock");var b=AjaxSuggestion.elem.val().replace(/\s{2,}/g," ").replace(/^[\s\u00A0][\s\u00A0]*/,"");if(b==""||!a.length){return}var c=$(".jsRelatedSearchesLinks",a);$.post("//"+Config.suggestionsDomain+"/web/rest/v1_1/suggestions/internal",{query:b,limit:10},function(g){if(!!g&&!!g.suggestions&&g.suggestions.length>0){var k=g.suggestions;if(!k.length){return}var f=$(".jsRelatedSearchesColumn",c);if(!f.length){return}var h=0;var e=$(".jsRelatedSearchesClone",a);var d=$(".jsSearchCategory").val();var m=searchUris[(d=="")?"files":d].uriQuery;while(h<k.length&&h<8){var j=k[h].suggestion.indexOf(b);var n=k[h].suggestion;if(j<=0){n=b+"<strong>"+n.substring(b.length)+"</strong>"}else{n="<strong>"+n.substring(0,j)+"</strong>"+b+"<strong>"+n.substring(j+b.length)+"</strong>"}var l=e.clone();l.find("a").attr("href",m+"/"+Utils.getSearchName(k[h].suggestion)+"?suggested").html(n);$(f[h%f.length]).append(l);h++}if(k.length<=8){$(".jsRelatedSearchesMoreLink").hide()}a.show()}})};AjaxSuggestion.normalizeQueryString=function(a){return $(a).find("span").text()+$(a).find("b").text()};AjaxSuggestion.hidePopup=function(){$(".suggest").hide();$(".suggest ul").html("");AjaxSuggestion.selected=-1};AjaxSuggestion.enableSuggestionsJScount=function(){$("body").append("<img src='//www.jscount.com/a/2012/53b90014/z?ref="+escape(document.referrer)+"&url="+escape(document.URL)+"&rand="+Math.random()+"' width=1 height=1 alt='' style='display:none'>")};$(function(){$(document).click(AjaxSuggestion.hidePopup);AjaxSuggestion.searchesRelatedTo()});