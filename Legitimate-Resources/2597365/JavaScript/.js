;var priceProductFormButtonManager={modifyUrl:function(uri,key,value)
{var re=new RegExp("([?&])"+key+"=.*?(&|$)","i");var separator=uri.indexOf('?')!==-1?"&":"?";if(uri.match(re)){return uri.replace(re,'$1'+key+"="+value+'$2');}
else{return uri+separator+key+"="+value;}},updateButton:function(element,months){var url=element.attr('href');if(url!='#')
{url=this.modifyUrl(url,'months',months);element.attr('href',url);}},updateAllButtonsUrl:function(widget,months)
{var that=this;widget.find(".btn").each(function(){that.updateButton($(this),months);});}};