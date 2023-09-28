var RS3 = RS3 || {};
RS3.forums = {
 detailsElement: function(){
  if(typeof(RS3.global) != undefined){
   RS3.global.detailsElement();
  }
  else{
   var summaryElements = $('summary');
   summaryElements.children().on('click',function(ev){
    ev.stopPropagation();
   });
   summaryElements.on('click',function(){
    $(this).parent().toggleClass('details--show');
   });
  }
 },
 postRemainingChars: function(){
  var el = $('#reply-box__area'),
  charsMax = el.attr('maxlength'),
  charsEntered = el.val().length,
  charactersLeft = charsMax - charsEntered,
        replyBoxRemaining = $('#reply-box__chars-remaining');
        replyBoxRemaining.html(charactersLeft);
  if (charsEntered > charsMax) {
   el.val(el.val().slice(0, charsMax));
            replyBoxRemaining.html(0);
  }
 },
 postAddSelectedElementToTextarea: function(selectStart, selectEnd, textStart, textEnd) {
  'use strict';
  var val, val_left, val_right, val_mid, newCaretPos,
   textarea = $('#reply-box__area');
  val = textarea.val();
  val_left = val.substr(0, selectStart);
  val_right = val.substr(selectEnd, val.length);
  val_mid = val.substr(selectStart, (selectEnd - selectStart));
  textarea.val(val_left + textStart + val_mid + textEnd + val_right);
  newCaretPos = selectEnd + textStart.length + textEnd.length;
  textarea.selectRange(newCaretPos, newCaretPos);
 },
 postAddElementToTextarea: function(addTextLeft, addTextRight) {
  'use strict';
  var position, val, val_left, val_right, newCaretPos, start_selection, end_selection,
   textarea = $('#reply-box__area');
  if (textarea[0].selectionStart == textarea[0].selectionEnd) {
   position = textarea.getCursorPosition();
   val = textarea.val();
   val_left = val.substr(0, position);
   val_right = val.substr(position, val.length);
   val_left = val_left + addTextLeft + addTextRight;
   textarea.val(val_left + val_right);
   newCaretPos = position + addTextLeft.length;
   textarea.selectRange(newCaretPos, newCaretPos);
  } else {
   start_selection = textarea[0].selectionStart;
   end_selection = textarea[0].selectionEnd;
   this.postAddSelectedElementToTextarea(start_selection, end_selection, addTextLeft, addTextRight);
  }
 },
 postBbCode: function(){
  //Extend jQuery
  $.fn.selectRange = function (start, end) {
   'use strict';
   var range;
   return this.each(function () {
    if (this.setSelectionRange) {
     this.focus();
     this.setSelectionRange(start, end);
    } else if (this.createTextRange) {
     range = this.createTextRange();
     range.collapse(true);
     range.moveEnd('character', end);
     range.moveStart('character', start);
     range.select();
    }
   });
  };
  $.fn.getCursorPosition = function () {
   'use strict';
   var el = $(this).get(0), pos = 0, Sel, SelLength;
   if('selectionStart' in el) {
    pos = el.selectionStart;
   } else if('selection' in document) {
    el.focus();
    Sel = document.selection.createRange();
    SelLength = document.selection.createRange().text.length;
    Sel.moveStart('character', -el.value.length);
    pos = Sel.text.length - SelLength;
   }
   return pos;
  };
  //Click listeners for bbcode
  $('.reply-box__bb button').on('click', function () {
   var textarea = $('#reply-box__area');
   switch ($(this).data('bbcode')) {
   case 'bold':
    RS3.forums.postAddElementToTextarea('[b]', '[/b]');
    break;
            case 'imgur':
                RS3.forums.postAddElementToTextarea('[imgur src=', ']');
                break;
   case 'italic':
    RS3.forums.postAddElementToTextarea('[i]', '[/i]');
    break;
   case 'underline':
    RS3.forums.postAddElementToTextarea('[u]', '[/u]');
    break;
   case 'strike':
    RS3.forums.postAddElementToTextarea('[s]', '[/s]');
    break;
   case 'link':
    if (textarea[0].selectionStart == textarea[0].selectionEnd) {
     RS3.forums.postAddElementToTextarea('[link url=', '][/link]');
    }
    else{
     RS3.forums.postAddElementToTextarea('[link url=]', '[/link]');
    }
    break;
   case 'qfc':
    if (textarea[0].selectionStart == textarea[0].selectionEnd) {
     RS3.forums.postAddElementToTextarea('[qfc id=', '][/qfc]');
    }
    else{
     RS3.forums.postAddElementToTextarea('[qfc id=]', '[/qfc]');
    }
    break;
   case 'spo':
    RS3.forums.postAddElementToTextarea('[spoiler]', '[/spoiler]');
    break;
   case 'noparse':
    RS3.forums.postAddElementToTextarea('[noparse]', '[/noparse]');
    break;
   case 'img'://Staff only
    RS3.forums.postAddElementToTextarea('[img src= alt= width= height=]', '[/img]');
    break;
   }
  });
  $('.reply-box__bb-align').on('click',function(){
   var align = $(this).data('bbcode');
   RS3.forums.postAddElementToTextarea('['+align+']', '[/'+align+']');
  });
  $('.reply-box__bb-color-plate').on('click',function(){
   var bbColor = $(this).data('bbcode');
   RS3.forums.postAddElementToTextarea('['+bbColor+']', '[/'+bbColor+']');
  });
  $('.reply-box__bb-smiley-plate').on('click',function(){
   var bbSmiley = $(this).html();
   RS3.forums.postAddElementToTextarea(bbSmiley, '');
  });
 },
 postQuoting: function(){
  $('.quote-link').on('click', function(ev){
   var quoteButton = $(this),
   quoteHeader="[quote id="+quoteButton.data("quoteheader")+"]",
   maxLength=quoteButton.data("maxlength"),
   quoteFooter = "[/quote]",
   lengthOfQuoteTags = quoteHeader.length+quoteFooter.length,
   truncatedMessage='',
   lengthOfCloseQuotetags = 0,
   closeQuoteTags= '',
   replyBox = $('#reply-box__area'),
   //Replace escape chars
   message= quoteButton.data("message").replace(/\\n/g,'\n');
   message= message.replace(/\&amp;/g,'&');
   message= message.replace(/\\'/g,"'");
   message= message.replace(/\&quot;/g,'"');
   message= message.replace(/\&lt;/g,'<');
   message= message.replace(/\&gt;/g,'>');
   //Get message length
   var lengthOfMessage = message.length;
   //If the quote is too long truncate it so we can get closing tags in
   if(lengthOfQuoteTags+lengthOfMessage > maxLength){
    var countOfOpenQuoteTags = message.match(/\[quote id/g);
    if(countOfOpenQuoteTags) {
     //[/quote]
     lengthOfCloseQuotetags = countOfOpenQuoteTags.length*8;
     for (var i=0;i<countOfOpenQuoteTags.length;i++) {
      closeQuoteTags+="[/quote]";
     }
    }
    truncatedMessage=message.substr(0,message.length-(lengthOfQuoteTags+lengthOfCloseQuotetags));
    //Sane end to the quoted message
    truncatedMessage=truncatedMessage+closeQuoteTags;
    truncatedMessage=quoteHeader+truncatedMessage+quoteFooter;
   }
   else{
    truncatedMessage=quoteHeader+message+quoteFooter;
   }
   //Send our BB code to the textarea
   replyBox.val(truncatedMessage);
   replyBox.focus();
  });
 },
 postInit: function(){
  var replyBox = $('#reply-box__area');
  if(replyBox.length){
   RS3.forums.postRemainingChars();
   replyBox.on('change keyup paste focus', function() {
    RS3.forums.postRemainingChars();
   });
  }
  RS3.forums.postBbCode();
  RS3.forums.postQuoting();
 },
 forumPicker: function(){
  $('#forum-picker').on('change', function(){
   this.form.submit();
  });
 },
 getTitles: function(){
  //Get all player names on the page
  var nameElements=$('.post-avatar__name'), playerNames=[], counter=0, currentPlayer=null, currentTitle=null, currentTitleSuffix=false;
  if(nameElements.length > 0){
   //Add each name to an array
   nameElements.each(function() {
    playerNames.push($(this).data("displayname"));
   });
   //Ajax request to get titles
   $.ajax({
    url: websiteDataUrl+"/playerDetails.ws?names=" + JSON.stringify(playerNames),
    dataType: "jsonp",
    success: function(response) {
     //Add title to each player
     nameElements.each(function() {
      //Ensure we have a element to get
      if(typeof(response[counter]) !== "undefined"){
       currentTitle = response[counter].title;
       //If the suffix bool is present find out where the title goes
       if(typeof(response[counter].isSuffix) !== "undefined"){
        currentTitleSuffix = response[counter].isSuffix;
       }
       if (currentTitle !== ""){
        if(currentTitleSuffix){
         $(this).append("<span class='post-avatar__title'>"+currentTitle+"</span>");
        }
        else{
         $(this).prepend("<span class='post-avatar__title'>"+currentTitle+"</span>");
        }
       }
      }
      counter++;
     });
    }
   });
  }
 },
 spoilerTags: function(){
  $('.spoiler-contents').on('click',function(){
   $(this).toggleClass('spoiler-contents--show');
  });
 },
    imgTags: function(){
        $('.bb-imgur').on('click',function(){
            var thisImage = $(this);
            if(!thisImage.hasClass('bb-imgur--show')){
                thisImage.attr('src',thisImage.data('url'));
                thisImage.addClass('bb-imgur--show');
            }
        });
    },
 highlightQFC: function(){
  $('.thread-view__qfc-number').on('click',function(){
   var range;
   if (document.selection) {
    range = document.body.createTextRange();
    range.moveToElementText($(this).get(0));
    range.select();
   }
   else if (window.getSelection) {
    range = document.createRange();
    range.selectNode($(this).get(0));
    window.getSelection().addRange(range);
   }
  });
 },
 groupShrink: function(){
  //If we support details elements remove the class, if we do not remove the attr
  if(Modernizr.details){
   $('.forum-group--open').removeClass('forum-group--open');
  }
  else{
   $('.forum-group').removeAttr('open');
  }
  $('.forum-stats').on('click',function(){
   var thisGroup = $(this).parent(), thisGroupId = thisGroup.data('groupid'), thisGroupClosed = null, groupCookie = null, groupArray = null;
   if($.cookie('JXRSFORUMGROUPS')==null){
    groupCookie = $.cookie('JXRSFORUMGROUPS',true,{expires: 730});
    groupArray = {};
   }
   else{
    groupCookie = $.cookie('JXRSFORUMGROUPS');
    groupArray = JSON.parse(groupCookie);
   }
   if(thisGroup.attr('open') || thisGroup.hasClass('forum-group--open')){
    thisGroupClosed = true;
    if(!Modernizr.details){
     thisGroup.removeClass('forum-group--open');
    }
   }
   else{
    thisGroupClosed = false;
    if(!Modernizr.details){
     thisGroup.addClass('forum-group--open');
    }
   }
   groupArray[thisGroupId] = thisGroupClosed;
   groupCookie = $.cookie('JXRSFORUMGROUPS',JSON.stringify(groupArray),{expires: 730});
  });
 },
 threadviewInit: function(){
  RS3.forums.spoilerTags();
        RS3.forums.imgTags();
  RS3.forums.postInit();
  RS3.forums.highlightQFC();
 },
 init: function(){
  var id = document.getElementsByTagName('body')[0].id;
  switch(id){
   case "forums--rootview":
    RS3.forums.groupShrink();
    break;
   case "forums--searchthreads":
     RS3.forums.detailsElement();
    break;
   case "forums--forumview":
    RS3.forums.forumPicker();
    break;
   case "forums--threadview":
    RS3.forums.threadviewInit();
    RS3.forums.getTitles();
    break;
   case "forums--userview":
   case "forums--threadadd":
   case "forums--messageadd":
   case "forums--messageedit":
    RS3.forums.postInit();
    RS3.forums.getTitles();
                RS3.forums.imgTags();
    break;
  }
 }
};
$(function(){RS3.forums.init();});
