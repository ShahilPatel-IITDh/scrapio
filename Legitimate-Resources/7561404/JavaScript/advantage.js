// (c) 2016 Advantage Services (Europe) Limited

/***********************************************
* Bookmark site script- � Dynamic Drive DHTML code library (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit Dynamic Drive at http://www.dynamicdrive.com/ for full source code
***********************************************/

var catalogueEqualizer = null;

var noPenceDefault = '.00'; // ''

function bookmarksite(title, url){
  url=location.href;
if (document.all)
window.external.AddFavorite(url, title);
else if (window.sidebar)
window.sidebar.addPanel(title, url, "")
}

function writePopUpLink(theUrl, label)
{
  document.write("<a href=\"javascript:openPopUp('" + theUrl + "')\" class=\"body\">");
  document.write(label);
  document.write("</a> (opens a pop-up window)");
}

function openPopUp(theUrl)
{
  window.open(theUrl,"","width=800,height=600,scrollbars,resizable")
}

function price(priceId, selIndex, priceType, software, softwareSupport, support)
{
  this.priceId = priceId;
  this.selIndex = selIndex;
  this.priceType = priceType;
  this.software = software;
  this.softwareSupport = softwareSupport;
  this.support = support;
}

function changePrices(priceId, companies)
{
  for (i = 1; i < prices.length; i++)
  {
    if (prices[i].priceId == priceId && prices[i].selIndex == companies.selectedIndex)
    {
      if ((prices[i].priceType & 4) > 0)
      {
        document.getElementById('software' + priceId).innerHTML = "&pound;" + prices[i].software;
      }
      if ((prices[i].priceType & 2) > 0)
      {
        document.getElementById('softwareSupport' + priceId).innerHTML = "&pound;" + prices[i].softwareSupport;
      }
      if ((prices[i].priceType & 1) > 0)
      {
        document.getElementById('support' + priceId).innerHTML = "&pound;" + prices[i].support;
      }
      continue;
    }
  }
}

function setQty(varname)
{
  eval("document.searchForm." + varname + ".value = 1");
}

function toggleShowHide(element, imageElement)
{
  if(document.getElementById(element).style.display == 'none')
  {
    document.getElementById(element).style.display = 'block';
    document.getElementById(imageElement).src = '/images/minus.jpg';
  }
  else if(document.getElementById(element).style.display == 'block' || document.getElementById(element).style.display == '')
  {
    document.getElementById(element).style.display = 'none';
    document.getElementById(imageElement).src = '/images/plus.jpg';
  }
}

function hideOverviewSections()
{
  toggleShowHide('variant1featuresOverview', 'variant1plusminus');
  toggleShowHide('variant2featuresOverview', 'variant2plusminus');
  toggleShowHide('variant3featuresOverview', 'variant3plusminus');
}

function defaultTabSettings()
{
  showShopTab(0);
}

function showShopTab(shopTabNumber)
{
  if (shopTabNumber != 0) hideShopTab('tab0contents');
  if (shopTabNumber != 1) hideShopTab('tab1contents');
  if (shopTabNumber != 2) hideShopTab('tab2contents');
  if (shopTabNumber != 3) hideShopTab('tab3contents');

  document.getElementById('tab' + shopTabNumber + 'contents').style.display = 'block';
}

function hideShopTab(element)
{
  document.getElementById(element).style.display = 'none';
}

function setOrderBy(newValue)
{
  document.searchForm.orderBy.value = newValue;
  document.searchForm.submit();
}

function toggleOrderByAscDesc()
{
  if (document.searchForm.orderByAscDesc.value == 'ASC')
  {
    document.searchForm.orderByAscDesc.value = 'DESC';
  }
  else
  {
    document.searchForm.orderByAscDesc.value = 'ASC';
  }
  document.searchForm.submit();
}

function setIncludeAllTrainingCentres()
{
  document.searchForm.includeAllTrainingCentres[0].checked = false;
  document.searchForm.includeAllTrainingCentres[1].checked = true;
}

/* popup */
var TINY={};

function T$(i){return document.getElementById(i)}

TINY.box=function(){
	var p,m,b,fn,ic,iu,iw,ih,ia,f=0;
	var timeoutVar;
	return{
		show:function(c,u,w,h,a,t){
			if(!f){
				p=document.createElement('div'); p.id='tinybox';
				m=document.createElement('div'); m.id='tinymask';
				b=document.createElement('div'); b.id='tinycontent';
				document.body.appendChild(m); document.body.appendChild(p); p.appendChild(b);
				m.onclick=TINY.box.hide; window.onresize=TINY.box.resize; f=1
			}
			if(!a&&!u){
				p.style.width=w?w+'px':'auto'; p.style.height=h?h+'px':'auto';
				p.style.backgroundImage='none'; b.innerHTML=c
			}else{
				b.style.display='none'; p.style.width=p.style.height='100px'
			}
			this.mask();
			ic=c; iu=u; iw=w; ih=h; ia=a; this.alpha(m,1,80,3);
			if (timeoutVar) {clearTimeout(timeoutVar)};
			if(t){timeoutVar=setTimeout(function(){TINY.box.hide()},1000*t)}
		},
		fill:function(c,u,w,h,a){
			if(u){
				p.style.backgroundImage='';
				var x=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXObject('Microsoft.XMLHTTP');
				x.onreadystatechange=function(){
					if(x.readyState==4&&x.status==200){TINY.box.psh(x.responseText,w,h,a)}
				};
				x.open('GET',c,1); x.send(null)
			}else{
				this.psh(c,w,h,a)
			}
		},
		psh:function(c,w,h,a){
			if(a){
				if(!w||!h){
					var x=p.style.width, y=p.style.height; b.innerHTML=c;
					p.style.width=w?w+'px':''; p.style.height=h?h+'px':'';
					b.style.display='';
					w=parseInt(b.offsetWidth); h=parseInt(b.offsetHeight);
					b.style.display='none'; p.style.width=x; p.style.height=y;
				}else{
					b.innerHTML=c
				}
				this.size(p,w,h)
			}else{
				p.style.backgroundImage='none'
			}
		},
		hide:function(){
			TINY.box.alpha(p,-1,0,3)
		},
		hideManual:function(){
			if (timeoutVar) {clearTimeout(timeoutVar);}
			TINY.box.hide();
		},
		resize:function(){
			TINY.box.pos(); TINY.box.mask()
		},
		mask:function(){
			m.style.height=TINY.page.total(1)+'px';
			m.style.width=''; m.style.width=TINY.page.total(0)+'px'
		},
		pos:function(){
			var t=(TINY.page.height()/2)-(p.offsetHeight/2); t=t<10?10:t;
			p.style.top=(t+TINY.page.top())+'px';
			p.style.left=(TINY.page.width()/2)-(p.offsetWidth/2)+'px'
		},
		alpha:function(e,d,a){
			clearInterval(e.ai);
			if(d==1){
				e.style.opacity=0; e.style.filter='alpha(opacity=0)';
				e.style.display='block'; this.pos()
			}
			e.ai=setInterval(function(){TINY.box.ta(e,a,d)},20)
		},
		ta:function(e,a,d){
			var o=Math.round(e.style.opacity*100);
			if(o==a){
				clearInterval(e.ai);
				if(d==-1){
					e.style.display='none';
					e==p?TINY.box.alpha(m,-1,0,2):b.innerHTML=p.style.backgroundImage=''
				}else{
					e==m?this.alpha(p,1,100):TINY.box.fill(ic,iu,iw,ih,ia)
				}
			}else{
				var n=Math.ceil((o+((a-o)*.5))); n=n==1?0:n;
				e.style.opacity=n/100; e.style.filter='alpha(opacity='+n+')'
			}
		},
		size:function(e,w,h){
			e=typeof e=='object'?e:T$(e); clearInterval(e.si);
			var ow=e.offsetWidth, oh=e.offsetHeight,
			wo=ow-parseInt(e.style.width), ho=oh-parseInt(e.style.height);
			var wd=ow-wo>w?0:1, hd=(oh-ho>h)?0:1;
			e.si=setInterval(function(){TINY.box.ts(e,w,wo,wd,h,ho,hd)},20)
		},
		ts:function(e,w,wo,wd,h,ho,hd){
			var ow=e.offsetWidth-wo, oh=e.offsetHeight-ho;
			if(ow==w&&oh==h){
				clearInterval(e.si); p.style.backgroundImage='none'; b.style.display='block'
			}else{
				if(ow!=w){var n=ow+((w-ow)*.5); e.style.width=wd?Math.ceil(n)+'px':Math.floor(n)+'px'}
				if(oh!=h){var n=oh+((h-oh)*.5); e.style.height=hd?Math.ceil(n)+'px':Math.floor(n)+'px'}
				this.pos()
			}
		}
	}
}();

TINY.page=function(){
	return{
		top:function(){return document.documentElement.scrollTop||document.body.scrollTop},
		width:function(){return self.innerWidth||document.documentElement.clientWidth||document.body.clientWidth},
		height:function(){return self.innerHeight||document.documentElement.clientHeight||document.body.clientHeight},
		total:function(d){
			var b=document.body, e=document.documentElement;
			return d?Math.max(Math.max(b.scrollHeight,e.scrollHeight),Math.max(b.clientHeight,e.clientHeight)):
			Math.max(Math.max(b.scrollWidth,e.scrollWidth),Math.max(b.clientWidth,e.clientWidth))
		}
	}
}();

/* end popup */

/* shop */
function pageLoaded()
{
}

function subPrice(priceSection, price1, price2, price3, price4, price5, price6, price7, price8, price9, price1InclVAT, price2InclVAT, price3InclVAT, price4InclVAT, price5InclVAT, price6InclVAT, price7InclVAT, price8InclVAT, price9InclVAT, rrp1, rrp2, rrp3, rrp4, rrp5, rrp6, rrp7, rrp8, rrp9, rrp1InclVAT, rrp2InclVAT, rrp3InclVAT, rrp4InclVAT, rrp5InclVAT, rrp6InclVAT, rrp7InclVAT, rrp8InclVAT, rrp9InclVAT, horizontalValue, verticalValue, priceId, youSaveAmount1, youSaveAmount2, youSaveAmount3, youSaveAmount4, youSaveAmount5, youSaveAmount6, youSaveAmount7, youSaveAmount8, youSaveAmount9)
{
  this.priceSection = priceSection;
  this.price1 = price1;
  this.price2 = price2;
  this.price3 = price3;
  this.price4 = price4;
  this.price5 = price5;
  this.price6 = price6;
  this.price7 = price7;
  this.price8 = price8;
  this.price9 = price9;
  this.price1InclVAT = price1InclVAT;
  this.price2InclVAT = price2InclVAT;
  this.price3InclVAT = price3InclVAT;
  this.price4InclVAT = price4InclVAT;
  this.price5InclVAT = price5InclVAT;
  this.price6InclVAT = price6InclVAT;
  this.price7InclVAT = price7InclVAT;
  this.price8InclVAT = price8InclVAT;
  this.price9InclVAT = price9InclVAT;
  this.rrp1 = rrp1;
  this.rrp2 = rrp2;
  this.rrp3 = rrp3;
  this.rrp4 = rrp4;
  this.rrp5 = rrp5;
  this.rrp6 = rrp6;
  this.rrp7 = rrp7;
  this.rrp8 = rrp8;
  this.rrp9 = rrp9;
  this.rrp1InclVAT = rrp1InclVAT;
  this.rrp2InclVAT = rrp2InclVAT;
  this.rrp3InclVAT = rrp3InclVAT;
  this.rrp4InclVAT = rrp4InclVAT;
  this.rrp5InclVAT = rrp5InclVAT;
  this.rrp6InclVAT = rrp6InclVAT;
  this.rrp7InclVAT = rrp7InclVAT;
  this.rrp8InclVAT = rrp8InclVAT;
  this.rrp9InclVAT = rrp9InclVAT;
  this.horizontalValue = horizontalValue;
  this.verticalValue = verticalValue;
  this.priceId = priceId;
  this.youSaveAmount1 = youSaveAmount1;
  this.youSaveAmount2 = youSaveAmount2;
  this.youSaveAmount3 = youSaveAmount3;
  this.youSaveAmount4 = youSaveAmount4;
  this.youSaveAmount5 = youSaveAmount5;
  this.youSaveAmount6 = youSaveAmount6;
  this.youSaveAmount7 = youSaveAmount7;
  this.youSaveAmount8 = youSaveAmount8;
  this.youSaveAmount9 = youSaveAmount9;
}

function changeSubPrice(priceSection)
{
	var formName = "prices" + priceSection;
	var theForm=document.forms[formName];

	// get the price id value
	var x = theForm.elements['multiProduct'];
	for (i=0;i<x.length;i++)
	{
		if (i == x.selectedIndex)
	  	{
	  		priceIdValue = x.options[i].value;

	  		// if the price is a trade-in or charity purchase we want to show a message
	  		//insertMessage(x, x.options[i].text);
	  	}
	}

	// get the vertical value
	var x = theForm.elements['vertical'];
	for (i=0;i<x.length;i++)
	{
		if (i == x.selectedIndex)
	  	{
	  		verticalValue = x.options[i].text;
	  	}
	}

	// get the horizontal value
	var x = theForm.elements['horizontal'];
	for (i=0;i<x.length;i++)
	{
		if (i == x.selectedIndex)
	  	{
	  		horizontalValue = x.options[i].text;
	  	}
	}

	// get the price number
	var x = theForm.elements['priceNumber'];
	var radioLength = x.length;
	if(radioLength == undefined)
	{
		if(x.checked)
		{
			priceNumber = (x.value);
		}
		else
		{
			priceNumber = -1;
		}
	}
	for(var i = 0; i < radioLength; i++)
	{
		if(x[i].checked)
		{
			priceNumber = (x[i].value);
		}
	}

	var priceFound = false;
	for (i = 1; i < prices.length; i++)
	{
		if (prices[i].priceSection == priceSection && prices[i].priceId == priceIdValue && prices[i].horizontalValue == horizontalValue && prices[i].verticalValue == verticalValue)
		{
			if (priceNumber == 1)
			{
				priceToUse = prices[i].price1;
				priceToUseInclVAT = prices[i].price1InclVAT;
				rrpToUse = prices[i].rrp1;
				rrpToUseIncVAT = prices[i].rrp1InclVAT;
				youSaveAmount = prices[i].youSaveAmount1;
			}
			if (priceNumber == 2)
			{
				priceToUse = prices[i].price2;
				priceToUseInclVAT = prices[i].price2InclVAT;
				rrpToUse = prices[i].rrp2;
				rrpToUseIncVAT = prices[i].rrp2InclVAT;
				youSaveAmount = prices[i].youSaveAmount2;
			}
			if (priceNumber == 3)
			{
				priceToUse = prices[i].price3;
				priceToUseInclVAT = prices[i].price3InclVAT;
				rrpToUse = prices[i].rrp3;
				rrpToUseIncVAT = prices[i].rrp3InclVAT;
				youSaveAmount = prices[i].youSaveAmount3;
			}
			if (priceNumber == 4)
			{
				priceToUse = prices[i].price4;
				priceToUseInclVAT = prices[i].price4InclVAT;
				rrpToUse = prices[i].rrp4;
				rrpToUseIncVAT = prices[i].rrp4InclVAT;
				youSaveAmount = prices[i].youSaveAmount4;
			}
			if (priceNumber == 5)
			{
				priceToUse = prices[i].price5;
				priceToUseInclVAT = prices[i].price5InclVAT;
				rrpToUse = prices[i].rrp5;
				rrpToUseIncVAT = prices[i].rrp5InclVAT;
				youSaveAmount = prices[i].youSaveAmount5;
			}
			if (priceNumber == 6)
			{
				priceToUse = prices[i].price6;
				priceToUseInclVAT = prices[i].price6InclVAT;
				rrpToUse = prices[i].rrp6;
				rrpToUseIncVAT = prices[i].rrp6InclVAT;
				youSaveAmount = prices[i].youSaveAmount6;
			}
			if (priceNumber == 7)
			{
				priceToUse = prices[i].price7;
				priceToUseInclVAT = prices[i].price7InclVAT;
				rrpToUse = prices[i].rrp7;
				rrpToUseIncVAT = prices[i].rrp7InclVAT;
				youSaveAmount = prices[i].youSaveAmount7;
			}
			if (priceNumber == 8)
			{
				priceToUse = prices[i].price8;
				priceToUseInclVAT = prices[i].price8InclVAT;
				rrpToUse = prices[i].rrp8;
				rrpToUseIncVAT = prices[i].rrp8InclVAT;
				youSaveAmount = prices[i].youSaveAmount8;
			}
			if (priceNumber == 9)
			{
				priceToUse = prices[i].price9;
				priceToUseInclVAT = prices[i].price9InclVAT;
				rrpToUse = prices[i].rrp9;
				rrpToUseIncVAT = prices[i].rrp9InclVAT;
				youSaveAmount = prices[i].youSaveAmount9;
			}

			// we've found the price, so quit the loop
			priceFound = true;
			continue;

		}
	}

	if (priceFound)
	{
		$('#selectVariantRRPExVAT' + priceSection).html("RRP &pound;" + rrpToUse + " ex VAT");
		$('#selectVariantPriceExVAT' + priceSection).html("&pound;" + priceToUse);
		$('#selectVariantPriceIncVAT' + priceSection).html("(&pound;" + priceToUseInclVAT + " inc VAT)");
	}

}

function changeProductSelected(priceSection, productId, mainProductId)
{
	var priceIdValue = getMultiProductDropdownValue(priceSection, productId, mainProductId);
	//console.log ('mpd=' + priceIdValue);
	
	// get the current values
	var hval = $('#horizontal' + productId + mainProductId).val();
	var vval = $('#vertical' + productId + mainProductId).val();

	// update the options
	$('#horizontal' + productId + mainProductId).html(hopts[priceIdValue]);
	$('#vertical' + productId + mainProductId).html(vopts[priceIdValue]);
	
	// reset the current values if possible
	if ($("#horizontal" + productId + mainProductId + " option[value='" + hval + "']").length !== 0)
	{
		$("#horizontal" + productId + mainProductId).val(hval);
	}
	if ($("#vertical" + productId + mainProductId + " option[value='" + vval + "']").length !== 0)
	{
		$("#vertical" + productId + mainProductId + " option[value='" + vval + "']").prop('selected', true);
	}
	
	changeSubPriceNew(priceSection, productId, mainProductId);
}

function getMultiProductDropdownValue(priceSection, productId, mainProductId)
{
	var priceIdValue = 0;
	var formName = "prices" + priceSection;
	var theForm=document.forms[formName];
	
	var multiProductDropDownId;
	if (mainProductId == '')
	{
		multiProductDropDownId = 'multiProduct' + productId;
	}
	else
	{
		multiProductDropDownId = 'multiProduct' + productId + mainProductId;
	}

	var x = theForm.elements[multiProductDropDownId];
	for (i=0;i<x.length;i++)
	{
		if (i == x.selectedIndex)
		{
			priceIdValue = x.options[i].value;

			// if the price is a trade-in or charity purchase we want to show a message
			//insertMessage(x, x.options[i].text);
		}
	}

	return priceIdValue;
}

function changeSubPriceNew(priceSection, productId, mainProductId)
{
	var formName = "prices" + priceSection;
	var theForm=document.forms[formName];
	var rrpToUse = 0;
	var priceToUse = 0;
	var priceToUseInclVAT = 0;
	var basePriceExVat = 0;
	var basePriceIncVat = 0;

	// get the price id value
	var priceIdValue = getMultiProductDropdownValue(priceSection, productId, mainProductId);

	// get the vertical value
	var x = theForm.elements['vertical' + productId + mainProductId];
	for (i=0;i<x.length;i++)
	{
		if (i == x.selectedIndex)
	  	{
	  		verticalValue = x.options[i].text;
	  	}
	}

	// get the horizontal value
	var x = theForm.elements['horizontal' + productId + mainProductId];
	for (i=0;i<x.length;i++)
	{
		if (i == x.selectedIndex)
	  	{
	  		horizontalValue = x.options[i].text;
	  	}
	}

	// get the price number
	//console.log('looking for priceNumber' + productId + mainProductId);
	var x = theForm.elements['priceNumber' + productId + mainProductId];
	var radioLength = x.length;
	if(radioLength == undefined)
	{
		if(x.checked)
		{
			priceNumber = (x.value);
		}
		else
		{
			priceNumber = -1;
		}
	}
	for(var i = 0; i < radioLength; i++)
	{
		if(x[i].checked)
		{
			priceNumber = (x[i].value);
		}
	}
	
	//console.log('selected price is priceNumber ' + priceNumber);
	//console.log('priceSection=' + priceSection);
	//console.log('priceIdValue=' + priceIdValue);
	
	for (i = 1; i < prices.length; i++)
	{
		if (prices[i].priceSection == priceSection && prices[i].priceId == priceIdValue && prices[i].horizontalValue == horizontalValue && prices[i].verticalValue == verticalValue)
		{
			if (priceNumber == 1)
			{
				priceToUse = prices[i].price1;
				priceToUseInclVAT = prices[i].price1InclVAT;
				rrpToUse = prices[i].rrp1;
				rrpToUseIncVAT = prices[i].rrp1InclVAT;
				youSaveAmount = prices[i].youSaveAmount1;
			}
			if (priceNumber == 2)
			{
				priceToUse = prices[i].price2;
				priceToUseInclVAT = prices[i].price2InclVAT;
				rrpToUse = prices[i].rrp2;
				rrpToUseIncVAT = prices[i].rrp2InclVAT;
				youSaveAmount = prices[i].youSaveAmount2;
			}
			if (priceNumber == 3)
			{
				priceToUse = prices[i].price3;
				priceToUseInclVAT = prices[i].price3InclVAT;
				rrpToUse = prices[i].rrp3;
				rrpToUseIncVAT = prices[i].rrp3InclVAT;
				youSaveAmount = prices[i].youSaveAmount3;
			}
			if (priceNumber == 4)
			{
				priceToUse = prices[i].price4;
				priceToUseInclVAT = prices[i].price4InclVAT;
				rrpToUse = prices[i].rrp4;
				rrpToUseIncVAT = prices[i].rrp4InclVAT;
				youSaveAmount = prices[i].youSaveAmount4;
			}
			if (priceNumber == 5)
			{
				priceToUse = prices[i].price5;
				priceToUseInclVAT = prices[i].price5InclVAT;
				rrpToUse = prices[i].rrp5;
				rrpToUseIncVAT = prices[i].rrp5InclVAT;
				youSaveAmount = prices[i].youSaveAmount5;
			}
			if (priceNumber == 6)
			{
				priceToUse = prices[i].price6;
				priceToUseInclVAT = prices[i].price6InclVAT;
				rrpToUse = prices[i].rrp6;
				rrpToUseIncVAT = prices[i].rrp6InclVAT;
				youSaveAmount = prices[i].youSaveAmount6;
			}
			if (priceNumber == 7)
			{
				priceToUse = prices[i].price7;
				priceToUseInclVAT = prices[i].price7InclVAT;
				rrpToUse = prices[i].rrp7;
				rrpToUseIncVAT = prices[i].rrp7InclVAT;
				youSaveAmount = prices[i].youSaveAmount7;
			}
			if (priceNumber == 8)
			{
				priceToUse = prices[i].price8;
				priceToUseInclVAT = prices[i].price8InclVAT;
				rrpToUse = prices[i].rrp8;
				rrpToUseIncVAT = prices[i].rrp8InclVAT;
				youSaveAmount = prices[i].youSaveAmount8;
			}
			if (priceNumber == 9)
			{
				priceToUse = prices[i].price9;
				priceToUseInclVAT = prices[i].price9InclVAT;
				rrpToUse = prices[i].rrp9;
				rrpToUseIncVAT = prices[i].rrp9InclVAT;
				youSaveAmount = prices[i].youSaveAmount9;
			}
			
			// the base price is the minimum price on the row
			basePriceExVat = parseFloat(prices[i].price1);
			if (prices[i].price2 < basePriceExVat && prices[i].price2 > 0) basePriceExVat = prices[i].price2;
			if (prices[i].price3 < basePriceExVat && prices[i].price3 > 0) basePriceExVat = prices[i].price3;
			if (prices[i].price4 < basePriceExVat && prices[i].price4 > 0) basePriceExVat = prices[i].price4;
			if (prices[i].price5 < basePriceExVat && prices[i].price5 > 0) basePriceExVat = prices[i].price5;
			if (prices[i].price6 < basePriceExVat && prices[i].price6 > 0) basePriceExVat = prices[i].price6;
			if (prices[i].price7 < basePriceExVat && prices[i].price7 > 0) basePriceExVat = prices[i].price7;
			if (prices[i].price8 < basePriceExVat && prices[i].price8 > 0) basePriceExVat = prices[i].price8;
			if (prices[i].price9 < basePriceExVat && prices[i].price9 > 0) basePriceExVat = prices[i].price9;
			basePriceIncVat = prices[i].price1InclVAT;
			if (prices[i].price2InclVAT < basePriceIncVat && prices[i].price2InclVAT > 0) basePriceIncVat = prices[i].price2InclVAT;
			if (prices[i].price3InclVAT < basePriceIncVat && prices[i].price3InclVAT > 0) basePriceIncVat = prices[i].price3InclVAT;
			if (prices[i].price4InclVAT < basePriceIncVat && prices[i].price4InclVAT > 0) basePriceIncVat = prices[i].price4InclVAT;
			if (prices[i].price5InclVAT < basePriceIncVat && prices[i].price5InclVAT > 0) basePriceIncVat = prices[i].price5InclVAT;
			if (prices[i].price6InclVAT < basePriceIncVat && prices[i].price6InclVAT > 0) basePriceIncVat = prices[i].price6InclVAT;
			if (prices[i].price7InclVAT < basePriceIncVat && prices[i].price7InclVAT > 0) basePriceIncVat = prices[i].price7InclVAT;
			if (prices[i].price8InclVAT < basePriceIncVat && prices[i].price8InclVAT > 0) basePriceIncVat = prices[i].price8InclVAT;
			if (prices[i].price9InclVAT < basePriceIncVat && prices[i].price9InclVAT > 0) basePriceIncVat = prices[i].price9InclVAT;

			// we've found the price, so quit the loop
			break;

		}
	}

	// get numeric values without formatting for the input values
	var priceExVatToUseValue = priceToUse; //parseFloat(priceToUse.replace(',', ''));
	var priceIncVatToUseValue = priceToUseInclVAT; //parseFloat(priceToUseInclVAT.replace(',', ''));
	var rrpToUseValue = rrpToUse;

	// if we are updating the main product price, then get the extra product prices and update the screen
	if (mainProductId == '')
	{
		var extraPriceInfo = getExtraPriceInfo();
		
		// add it on to the values
		priceExVatToUseValue += extraPriceInfo.priceExVat;
		priceIncVatToUseValue += extraPriceInfo.priceIncVat;
		rrpToUseValue += extraPriceInfo.rrpExVat;

		// show the priceId
		//console.log('priceToUse=' + priceToUse);
		//console.log('basePriceExVat=' + basePriceExVat);
		//console.log('basePriceIncVat=' + basePriceIncVat);
		
		//console.log("priceExVatToUseValue=" + formatPrice(priceExVatToUseValue));
		//console.log("priceIncVatToUseValue=" + formatPrice(priceIncVatToUseValue));
		//console.log("rrpToUseValue=" + formatPrice(rrpToUseValue));
		
		if (newVersion == 1)
		{
			// update the support option fields
			if (parseFloat(prices[i].price1) > 0)
			{
				$('#supportPrice1').html(getPriceDifference(prices[i].price1, basePriceExVat));
			}
			if (parseFloat(prices[i].price2) > 0)
			{
				$('#supportPrice2').html(getPriceDifference(prices[i].price2, basePriceExVat));
			}
			if (parseFloat(prices[i].price3) > 0)
			{
				$('#supportPrice3').html(getPriceDifference(prices[i].price3, basePriceExVat));
			}
			if (parseFloat(prices[i].price4) > 0)
			{
				$('#supportPrice4').html(getPriceDifference(prices[i].price4, basePriceExVat));
			}
			if (parseFloat(prices[i].price5) > 0)
			{
				$('#supportPrice5').html(getPriceDifference(prices[i].price5, basePriceExVat));
			}
			if (parseFloat(prices[i].price6) > 0)
			{
				$('#supportPrice6').html(getPriceDifference(prices[i].price6, basePriceExVat));
			}
			if (parseFloat(prices[i].price7) > 0)
			{
				$('#supportPrice7').html(getPriceDifference(prices[i].price7, basePriceExVat));
			}
			if (parseFloat(prices[i].price8) > 0)
			{
				$('#supportPrice8').html(getPriceDifference(prices[i].price8, basePriceExVat));
			}
			if (parseFloat(prices[i].price9) > 0)
			{
				$('#supportPrice9').html(getPriceDifference(prices[i].price9, basePriceExVat));
			}
			
			// update the base price field
			$('#selectVariantPriceExVAT' + priceSection).html("&pound;" + formatPrice(basePriceExVat));
			$('#selectVariantPriceIncVAT' + priceSection).html("&pound;" + formatPrice(basePriceIncVat));
			
			// update the combined total field
			$('#combinedPrice').html("&pound;" + formatPrice(priceExVatToUseValue) + '<span>ex VAT</span>');
		}
		else
		{
			$('#selectVariantRRPExVAT' + priceSection).html("RRP &pound;" + formatPrice(rrpToUse) + " ex VAT");
			$('#selectVariantPriceExVAT' + priceSection).html("&pound;" + formatPrice(priceToUse));
			$('#selectVariantPriceIncVAT' + priceSection).html("(&pound;" + formatPrice(priceToUseInclVAT) + " inc VAT)");
		}

//		document.getElementById('selectVariantRRPExVAT' + priceSection).innerHTML = "RRP &pound;" + formatPrice(rrpToUseValue) + " ex VAT";
//		document.getElementById('selectVariantPriceExVAT' + priceSection).innerHTML = "&pound;" + formatPricePoundsOnly(priceExVatToUseValue) + "<span class='exVatSmall'>" + formatPricePenceOnly(priceExVatToUseValue) + " ex VAT</span>";
//		document.getElementById('selectVariantPriceIncVAT' + priceSection).innerHTML = "&pound;" + formatPricePoundsOnly(priceIncVatToUseValue) + "<span class='incVatSmall'>" + formatPricePenceOnly(priceIncVatToUseValue) + " inc VAT</span>";

	}
	else
	{
		//console.log("Resetting extra product price")
		//console.log("priceSection=" + priceSection);
		//console.log("priceToUse=" + priceToUse);
		
		// update the hidden fields with this extra product's price
		$('#priceExVat' + priceSection + productId).val(priceExVatToUseValue);
		$('#priceIncVAT' + priceSection + productId).val(priceIncVatToUseValue);
		$('#rrpExVAT' + priceSection + productId).val(rrpToUseValue);
		
		// for the new version, update the shown price as well
		if (newVersion == 1)
		{
			$('#addOnShownPriceExVat' + priceSection + productId).html('&pound;' + formatPrice(priceToUse) + '<span>ex VAT</span>');
		}
		
		// check the main product as well
		changeSubPriceNew(priceSection, mainProductId, '');
	}

}

function getPriceDifference(priceExVat, basePriceExVat)
{
	if (priceExVat == basePriceExVat)
	{
		return 'FREE';
	}
	else
	{
		//var priceDifference = parseFloat(priceExVat.replace(',', '')) - parseFloat(basePriceExVat.replace(',', ''));
		var priceDifference = priceExVat - basePriceExVat;
		return '&pound;' + formatPrice(priceDifference) + '<span>ex VAT</span>';
	}
}

// work out the total value of the extra products included
function getExtraPriceInfo()
{
	var priceExVat = 0;
	var priceIncVat = 0;
	var rrpExVat = 0;
	
	//console.log("In getExtraPriceInfo");
	
	$('.extra-product-include').each(function()
	{
		var thisCheckbox = $(this);
		if (thisCheckbox.prop('checked'))
		{
			var priceSectionCounter = $(this).data('pricesectioncounter');
			var productId = $(this).data('productid');

			//console.log ("priceSectionCounter=" + priceSectionCounter);
			//console.log ("productId=" + productId);

			// add up the parts
			priceExVat += parseFloat($('#priceExVat' + priceSectionCounter + productId).val());
			priceIncVat += parseFloat($('#priceIncVAT' + priceSectionCounter + productId).val());
			rrpExVat += parseFloat($('#rrpExVAT' + priceSectionCounter + productId).val());

			//console.log ("priceExVat=" + priceExVat);
			//console.log ("priceIncVat=" + priceIncVat);
			//console.log ("rrpExVat=" + rrpExVat);
		}
	});
	
	// build a return object
	var returnObject = { priceExVat: priceExVat, priceIncVat: priceIncVat, rrpExVat: rrpExVat };
	
	//console.log("Leaving getExtraPriceInfo");
	
	return returnObject;
}
/* end shop */

/* switch tabs */
function activateTab(tabNumber)
{
        $('#myTab li:eq(' + tabNumber + ') a').tab('show');
}

/* lightboxes */
$(document).ready(function()
{
	if ($('.youtube').length > 0)
	{
        $(".youtube").colorbox({iframe:true, innerWidth:640, innerHeight:390});
	}
	if ($('.callbacks').length > 0)
	{
        $(".callbacks").colorbox({
			onOpen:function(){ alert('onOpen: colorbox is about to open'); },
			onLoad:function(){ alert('onLoad: colorbox has started to load the targeted content'); },
			onComplete:function(){ alert('onComplete: colorbox has displayed the loaded content'); },
			onCleanup:function(){ alert('onCleanup: colorbox has begun the close process'); },
			onClosed:function(){ alert('onClosed: colorbox has completely closed'); }
        });
    }
});

// Lightbox functionality
$(document).ready(function()
{
	var colorboxId = (window.location.href.indexOf('video=') == -1) ? false : window.location.href.slice(window.location.href.indexOf('video=') + 6).split('&');
	if ($('.youtube').length > 0) {
		$('.youtube').colorbox({
			iframe: true,
			scrolling: false,
			width: '80%',
			height: '80%',
			fixed: true,
			href: function() {
				var videoId = new RegExp('[\\?&]v=([^&#]*)').exec(this.href);
				if (videoId && videoId[1]) {
					return 'https://youtube.com/embed/' + videoId[1] + '?rel=0&playsinline=0&modestbranding=1&autoplay=1&controls=1';
				}
			}
		});
	}
	if ($('.imageBox').length > 0) {
		$('.imageBox').colorbox({
			maxWidth: '90%',
		});
	}
	if ($('.cboxModal').length > 0) {
		$('.cboxModal').colorbox({
			fixed: true,
			maxWidth: '90%',
			maxHeight: '90%',
			width: '90%',
			height: '90%',
			iframe: false,
			escKey: false,
			onComplete: cboxOnCompleteHandler
		});
	}

	// Binds for colorbox resize
	$(window).resize(resizeLightbox);
	if (window.addEventListener)
	{
		window.addEventListener("orientationchange", resizeLightbox, false);
	}
	else
	{
		window.attachEvent("orientationchange", resizeLightbox);
	}
	
	$('.product-support-new .opt-card a.button').click(function()
	{
		if($(this).parent().hasClass('active'))
		{}
		else if($(this).parent().hasClass('fade'))
		{
			$('.product-support-new .opt-card').removeClass('active');
			$('.product-support-new .opt-card').addClass('fade');
			$('.product-support-new .opt-card').find('.button').css({"background-color":"#fff","color":"#028BC6"});
			$('.product-support-new .opt-card').find('.button').text("Select option");
			$(this).parent().addClass('active');
			$(this).parent().removeClass('fade',1);
			$(this).css({"background-color":"#fff","color":"#028BC6"});
		}
		else
		{
			$('.product-support-new .opt-card').addClass('fade');
			$(this).parent().addClass('active');
			$(this).parent().removeClass('fade',1);
		}
		// $('.product-support-new .opt-card').addClass('fade');
	});

});

// Resize Colorbox when resizing window or changing mobile device orientation
function resizeLightbox()
{
	if (this.resizeTimer) clearTimeout(this.resizeTimer);
	this.resizeTimer = setTimeout(function() {
        if ($('#cboxOverlay').is(':visible')) {
                $(".youtube").colorbox.resize({width:'90%', height:'90%'});
    	}
	}, 300);
}

// refresh colorbox
function refreshColorBox(url)
{
	$.ajax({url: url, success: function(data){
		$.colorbox({
			fixed: true,
			maxWidth: '90%',
			maxHeight: '90%',
			width: "90%",
			height: "90%",
			iframe: false,
			escKey: false,
			onComplete: cboxOnCompleteHandler,
			onClosed: cboxOnClosedHandler,
			html: data
		});
	}});
}

// a basic colorbox, no sizing provided, no callbacks
function basicColorBox(url)
{
	$.ajax({url: url, success: function(data){
		$.colorbox({
			fixed: true,
			iframe: false,
			html: data
		});
	}});
}

// show a colorbox modal with custom buttons
function showColorBoxWithButtons(url, showCloseButton, buttons)
{
	$.colorbox({
			fixed: true,
			maxWidth: '90%',
			maxHeight: '90%',
			width: '90%',
			height: '90%',
			iframe: false,
			escKey: false,
			onComplete: cboxOnCompleteHandler,
			onClosed: cboxOnClosedHandler
		});
}

// show an inline modal for HTML already existing on the page
function showInlineModal(url, showCloseButton, buttons)
{
	$.colorbox({
		fixed: true,
		inline:true,
		width: '90%',
		height: '90%',
		closeButton: showCloseButton,
		href: url
	});
	
	addCustomButtons(buttons, false);
}
	
// add custom buttons to a colorbox modal
function addCustomButtons(buttons, foundation, buttonsLeft, removeOldButtons)
{
	// add custom buttons if required
	if (buttons != '')
	{
		// add Bootstrap or Foundation buttons
		var buttonMainClass = 'btn'; // Bootstrap
		if (foundation)
		{
			buttonMainClass = 'button';
		}
		// the buttons can be on the right or the left, but default is right
		var buttonsClass = 'cbox-buttons';
		if (buttonsLeft)
		{
			buttonsClass = 'cbox-buttons-left';
		}
		
		// remove old buttons if they were on there before
		if (removeOldButtons && $('.' + buttonsClass).length > 0)
		{
			$('.' + buttonsClass).remove();
		}

		// only add the buttons if they haven't been added already
		if ($('.' + buttonsClass).length == 0)
		{
			// build up the HTML to insert
			var customButtonsHtml = '<div class="' + buttonsClass + '">';
			
			// put them in a button group for Foundation
			if (foundation)
			{
				customButtonsHtml = customButtonsHtml + '<div class="button-group">';
			}
			
			var buttonsArray = JSON.parse(buttons);
			for (i = 0; i < buttonsArray.buttons.length; i++)
			{
				// add a waiting image if required
				if (buttonsArray.buttons[i].addWaitImageBefore)
				{
					customButtonsHtml = customButtonsHtml + '<img id="' + buttonsArray.buttons[i].waitImageId + '" class="hide" style="' + buttonsArray.buttons[i].waitImageStyle + '" src="/images/spinner.gif"/>';
				}

				// add the button to the screen
				customButtonsHtml = customButtonsHtml + '<button id="' + buttonsArray.buttons[i].id + '" class="' + buttonMainClass + ' ' + buttonsArray.buttons[i].class + '">' + buttonsArray.buttons[i].label + '</button>';
				
				// add a waiting image if required
				if (buttonsArray.buttons[i].addWaitImageAfter)
				{
					customButtonsHtml = customButtonsHtml + '<img id="' + buttonsArray.buttons[i].waitImageId + '" class="hide" style="' + buttonsArray.buttons[i].waitImageStyle + '" src="/images/spinner.gif"/>';
				}
			}
			
			// close the button group for Foundation
			if (foundation)
			{
				customButtonsHtml = customButtonsHtml + '</div>';
			}
			
			// close the div
			customButtonsHtml = customButtonsHtml + '</div>';
			
			// append it to the cbox content div
			$("#cboxContent").append(customButtonsHtml);
			
			// add event handlers
			for (i = 0; i < buttonsArray.buttons.length; i++)
			{
				// if it's a cancel button, then attach the event handler
				if (buttonsArray.buttons[i].isCancel == 'true')
				{
					$('#' + buttonsArray.buttons[i].id).on('click', closeCboxEventHandler);
				}

				// if it has its own event handler, then attach it
				if (buttonsArray.buttons[i].eventHandler != null)
				{
					//console.log('attaching event handler: ' + buttonsArray.buttons[i].eventHandler);
					eventHandlerFunction = window[buttonsArray.buttons[i].eventHandler];
					$('#' + buttonsArray.buttons[i].id).on('click', eventHandlerFunction);
				}
			}
		}
	}
}

// close any open colorbox
function closeCboxEventHandler()
{
	$.colorbox.close();
}

// after closing a colorbox, make sure there is no modal overlay still present
function cboxOnClosedHandler()
{
	$('.modal-backdrop').remove();
}

/* end lightboxes */

function xor(a,b)
{
  return ( a || b ) && !( a && b );
}

// in edit mode the user can't navigate away
function showEditModeWarning()
{
	$('#warningModalLabel').html('You are in edit mode.');
	$('#warningDetail').html('Please save your changes or cancel editing in order to navigate away from this screen.');
	$('#warningModal').modal();
}

// refresh the page
function refreshPage()
{
	location.reload();
}

// accounting services images
function popUpGraphs(num)
{
	$.colorbox({
		fixed: true,
		href: '/images/graphs/' + num + '.JPG'
	});
}

function formatPrice(number)
{
    number = number.toFixed(2) + '';
    x = number.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : noPenceDefault;
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function formatPriceWithPenceClass(number, penceClass)
{
    number = number.toFixed(2) + '';
    x = number.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : noPenceDefault;
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + "<span class=\"" + penceClass + "\">" + x2 + "</span>";
}

function formatPricePoundsOnly(number)
{
    number = number.toFixed(2) + '';
    x = number.split('.');
    x1 = x[0];
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1;
}

function formatPricePenceOnly(number)
{
    number = number.toFixed(2) + '';
    x = number.split('.');
    x2 = x.length > 1 ? '.' + x[1] : '';
    return x2;
}

function selectSupportOption()
{
	var linkClicked = $(this);
	var priceSectionCounter = parseInt(linkClicked.data('psc'));
	var mainProductId = linkClicked.data('mp');
	var priceNumber = linkClicked.data('pricenumber');
	var productId = linkClicked.data('product');
	//console.log('checking #priceNumber' + priceNumber + productId);
	$('#priceNumber' + priceNumber + productId).prop('checked', true);
	changeSubPriceNew(priceSectionCounter, productId, mainProductId);
}

function selectAddOnOption()
{
	var linkClicked = $(this);
	var priceSectionCounter = parseInt(linkClicked.data('psc'));
	var mainProductId = linkClicked.data('mp');
	var productId = linkClicked.data('product');
	var isSelected = linkClicked.parent().hasClass('active');
	//console.log('checking #priceNumber' + priceNumber + productId);
	$('#includeProduct' + productId + mainProductId).prop('checked', isSelected);
	changeSubPriceNew(priceSectionCounter, productId, mainProductId);
}

/* software catalogue */
$(document).ready(setUpCatalogueHandlers);

function setUpCatalogueHandlers()
{
	$('.filterByBrand').on('click', filterByBrand);
	$('.filterByIndustry').on('click', filterByIndustry);
	$('.filterBySolution').on('click', filterBySolution);
	$('.filterByType').on('click', filterByType);
	$('#searchName').on('keyup', searchByName);
}

function filterByBrand()
{
	toggleFilterClicked(this, 'filterByBrand');
}

function filterByIndustry()
{
	toggleFilterClicked(this, 'filterByIndustry');
}

function filterBySolution()
{
	toggleFilterClicked(this, 'filterBySolution');
}

function filterByType()
{
	toggleFilterClicked(this, 'filterByType');
}

function searchByName()
{
	// nothing needs to change; just apply all filters
	applyFilters();
}

function toggleFilterClicked(linkClicked, linkClass)
{
	var jLinkClicked = $(linkClicked);
	
	// if the item already has "active" class, then take it off
	if (jLinkClicked.hasClass('active'))
	{
		jLinkClicked.removeClass('active button tag small no-margin');
	}
	else
	{
		$('.' + linkClass).removeClass('active button tag small no-margin')
		jLinkClicked.addClass('active button tag small no-margin');
	}
	
	// apply all filters
	applyFilters();
}

function applyFilters()
{
	var brandId = getFilter('filterByBrand', 'brandid');
	var industryId = getFilter('filterByIndustry', 'industryid');
	var solutionId = getFilter('filterBySolution', 'solutionid');
	var productTypeId = getFilter('filterByType', 'typeid');
	var searchName = $('#searchName').val();
	var words = searchName.split(' ');
	
	// go through each product and decide if it should be visible
	$('.product-box').each(function(index, value)
	{
		var $this = $(this);
		var showIt = true;
		
		if (brandId != 0)
		{
			showIt = applyFilter(brandId, $this, 'brandid');
		}
		if (showIt && industryId != 0)
		{
			showIt = applyFilter(industryId, $this, 'industryid');
		}
		if (showIt && solutionId != 0)
		{
			showIt = applyFilter(solutionId, $this, 'solutionid');
		}
		if (showIt && productTypeId != 0)
		{
			showIt = applyFilter(productTypeId, $this, 'typeid');
		}
		if (showIt)
		{
			var productName = $this.find('h3').text();
			showIt = checkSearchName(productName, words);
		}
		
		// show/hide
		if (showIt)
		{
			$this.removeClass('is-hidden');
		}
		else
		{
			$this.addClass('is-hidden');
		}
	});
	
	// apply the equalizer heights so any elements now made visible are compressed
	if (catalogueEqualizer == null)
	{
		catalogueEqualizer = new Foundation.Equalizer($("#catalogue-top-level"));
	}
	catalogueEqualizer.applyHeight();
	
	// scroll to fade in any hidden elements now in the visible area
	window.scrollTo(0,1);
	window.scrollTo(0,0);
}

function applyFilter(filterValue, jProduct, dataFieldName)
{
	var thisProductValue = jProduct.data(dataFieldName);
	
	if (thisProductValue != filterValue)
	{
		return false;
	}

	return true;
}

function getFilter(filterClass, dataFieldName)
{
	var filterId = 0;
	
	$('.' + filterClass).each(function(index, value)
	{
		var $this = $(this)
		if ($this.hasClass('active'))
		{
			filterId = $this.data(dataFieldName);
		}
	});
	
	return filterId;
}

function checkSearchName(jProduct, words)
{
	var allWordsFound = true;
	
	$.each(words, function(index, word)
	{
		if (jProduct.toLowerCase().indexOf(word.toLowerCase()) == -1)
		{
			allWordsFound = false;
		}
	});
	
	// all words found
	return allWordsFound;
}

function hideMessageButton()
{
	var but = $(this);
	var messageId = but.data('messageid');
	
	$.get("/applications/action/mark-message-seen/" + messageId)
		.done(function(data) { })
		.fail( function(xhr, textStatus, errorThrown) { alert(xhr.responseText); })
		.always(function() { });
}

function submitBasketForm()
{
	var basketNotes = $('#basketNotes').val();
	
	location.href = '/account/show-basket-redirector?confirmTsAndCs=on&basketNotes=' + basketNotes;
}

function mapExactCompany(companyCounter)
{
	var companyToMap = $('#mapExactCompany' + companyCounter).val();
	
	location.href = 'map-exact-company-' + companyCounter + '-' + companyToMap;
}

// try PI
function tryPiSubmit(e)
{
	// get the email address
	var emailAddress = $("#try-pi-email-address").val();

	// make sure the email is not blank first
	if (emailAddress != "")
	{
		// check the format of the email address
		if (checkEmailPi(emailAddress))
		{
			$.post("https://www.advantageservices.co.uk/secure/try-pi", { emailAddress: emailAddress })
				.done(function(data) {
					$('#try-pi-form-enteremail').val(emailAddress);
					$('#try-pi-form').submit();
				})
				.fail(function(data) { $('#try-pi-error-callout').html(data); $('#try-pi-error-callout').removeClass('hide'); })
				.always(function() { });
		}
		else
		{
			// otherwise, put the cursor in the email address field
			$('#try-pi-error-callout').html('Please enter a valid email address');
			$('#try-pi-error-callout').removeClass('hide');
			$("#try-pi-email-address").focus();
		}
	}
	else
	{
		// otherwise, put the cursor in the email address field
		$('#try-pi-error-callout').html('Please enter a valid email address');
		$('#try-pi-error-callout').removeClass('hide');
		$("#try-pi-email-address").focus();
	}

	// stop the form submit being processed
	e.preventDefault();
	return false;
}

// check an email format
function checkEmailPi(emailAddress)
{
    //var email = document.getElementById('txtEmail');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(emailAddress))
    {
	    //showError('Please provide a valid email address');
	    return false;
	}

	// OK if we reach here
	return true;
}

// 2018 shop

function changeSubPriceDropdown3(priceSection, productId, mainProductId)
{
	// get the price number the user selected in the dropdown
	var priceNumber = $('#priceNumber' + productId).val();
	
	// set text and style for selected support option
	setSupportModalSelection(priceSection, mainProductId, productId, priceNumber);
	
	changeSubPrice3(priceSection, productId, mainProductId);
}

function selectSupportOption3()
{
	var linkClicked = $(this);
	var priceSection = parseInt(linkClicked.data('psc'));
	var mainProductId = linkClicked.data('mp');
	var priceNumber = parseInt(linkClicked.data('pricenumber'));
	var productId = '' + linkClicked.data('product');
	console.log('Setting #priceNumber' + productId + ' to ' + priceNumber);
	//$('#priceNumber' + priceNumber + productId).prop('checked', true);
	$('#priceNumber' + productId).val(priceNumber);

	// set text and style for selected support option
	setSupportModalSelection(priceSection, mainProductId, productId, priceNumber);
	
	changeSubPrice3(priceSection, productId, mainProductId);
	
	// close the modal
	//$('#support-options-modal').foundation('reveal', 'close');
}

// set text and style for selected support option
function setSupportModalSelection(priceSection, mainProductId, productId, priceNumber)
{
	// set the text for all other options
	$('.change-support-option').html('Select option');
	$('.change-support-option').css({"background-color":"#fff","color":"#028BC6"});
	$('.change-support-option').parent().addClass('fade');
	
	// change the text and class of the selected price number link
	//console.log("Selected support option button id: " + priceSection + '-' + mainProductId + '-' + productId + '-' + priceNumber);
	var selectedSupportOptionButton = $('#' + priceSection + '-' + mainProductId + '-' + productId + '-' + priceNumber);
	selectedSupportOptionButton.html('Selected');
	selectedSupportOptionButton.css({"background-color":"#028BC6","color":"#fff"});
	selectedSupportOptionButton.parent().removeClass('fade', 1);
}

function selectAddOnOption3()
{
	var linkClicked = $(this);
	var priceSectionCounter = parseInt(linkClicked.data('psc'));
	var mainProductId = linkClicked.data('mp');
	var productId = linkClicked.data('product');
	var isSelected = linkClicked.parent().hasClass('active');
	//console.log('checking #priceNumber' + priceNumber + productId);
	$('#includeProduct' + productId + mainProductId).prop('checked', isSelected);
	changeSubPrice3(priceSectionCounter, productId, mainProductId);
}

function changeProductSelected3(priceSection, productId, mainProductId)
{
	var priceIdValue = getMultiProductDropdownValue(priceSection, productId, mainProductId);
	//console.log ('mpd=' + priceIdValue);
	
	console.log("subsprods[" + priceIdValue + "]=" + subsprods[priceIdValue]);
	
	// change the subscription label and button text as appropriate
	if (subsprods[priceIdValue])
	{
		$('#subscription-label').removeClass('hide');
		$('#buyNowButton').attr('value', 'Subscribe');
		$('#buyNowButton2').attr('value', 'Subscribe');
	}
	else
	{
		$('#subscription-label').addClass('hide');
		$('#buyNowButton').attr('value', 'Buy');
		$('#buyNowButton2').attr('value', 'Buy');
	}
	
	// get the current values
	var hval = $('#horizontal' + productId + mainProductId).val();
	var vval = $('#vertical' + productId + mainProductId).val();

	// update the options
	$('#horizontal' + productId + mainProductId).html(hopts[priceIdValue]);
	$('#vertical' + productId + mainProductId).html(vopts[priceIdValue]);
	
	// reset the current values if possible
	if ($("#horizontal" + productId + mainProductId + " option[value='" + hval + "']").length !== 0)
	{
		$("#horizontal" + productId + mainProductId).val(hval);
	}
	if ($("#vertical" + productId + mainProductId + " option[value='" + vval + "']").length !== 0)
	{
		$("#vertical" + productId + mainProductId + " option[value='" + vval + "']").prop('selected', true);
	}
	
	changeSubPrice3(priceSection, productId, mainProductId);
}

function changeSubPrice3(priceSection, productId, mainProductId)
{
	var formName = "prices" + priceSection;
	var theForm=document.forms[formName];
	var rrpToUse = 0;
	var priceToUse = 0;
	var priceToUseInclVAT = 0;
	var basePriceExVat = 0;
	var basePriceIncVat = 0;

	// get the price id value
	var priceIdValue = getMultiProductDropdownValue(priceSection, productId, mainProductId);

	// get the vertical value
	var x = theForm.elements['vertical' + productId + mainProductId];
	//console.log('vertical' + productId + mainProductId + ':' + x.selectedIndex);
	for (i=0;i<x.length;i++)
	{
		if (i == x.selectedIndex)
	  	{
	  		verticalValue = x.options[i].text;
	  	}
	}

	// get the horizontal value
	var x = theForm.elements['horizontal' + productId + mainProductId];
	//console.log('horizontal' + productId + mainProductId + ':' + x.selectedIndex);
	for (i=0;i<x.length;i++)
	{
		if (i == x.selectedIndex)
	  	{
	  		horizontalValue = x.options[i].text;
	  	}
	}

	// get the price number
	//console.log('looking for priceNumber' + productId + mainProductId);
	var x = theForm.elements['priceNumber' + productId + mainProductId];
	//console.log('priceNumber' + productId + mainProductId + ':' + x.selectedIndex);
	for(var i = 0; i < x.length; i++)
	{
		if(i == x.selectedIndex)
		{
			priceNumber = parseInt(x.options[i].value); // (x.options[i].text);
		}
	}
	
	console.log('selected price is priceNumber ' + priceNumber);
	console.log('priceSection=' + priceSection);
	console.log('priceIdValue=' + priceIdValue);
	console.log('horizontalValue=' + horizontalValue);
	console.log('verticalValue=' + verticalValue);
	
	// find the price
	var priceFound = false;
	
	for (i = 1; i < prices.length; i++)
	{
		if (prices[i].priceSection == priceSection && prices[i].priceId == priceIdValue && prices[i].horizontalValue == horizontalValue && prices[i].verticalValue == verticalValue)
		{
			if (priceNumber == 1)
			{
				priceToUse = prices[i].price1;
				priceToUseInclVAT = prices[i].price1InclVAT;
				rrpToUse = prices[i].rrp1;
				rrpToUseIncVAT = prices[i].rrp1InclVAT;
				youSaveAmount = prices[i].youSaveAmount1;
			}
			if (priceNumber == 2)
			{
				priceToUse = prices[i].price2;
				priceToUseInclVAT = prices[i].price2InclVAT;
				rrpToUse = prices[i].rrp2;
				rrpToUseIncVAT = prices[i].rrp2InclVAT;
				youSaveAmount = prices[i].youSaveAmount2;
			}
			if (priceNumber == 3)
			{
				priceToUse = prices[i].price3;
				priceToUseInclVAT = prices[i].price3InclVAT;
				rrpToUse = prices[i].rrp3;
				rrpToUseIncVAT = prices[i].rrp3InclVAT;
				youSaveAmount = prices[i].youSaveAmount3;
			}
			if (priceNumber == 4)
			{
				priceToUse = prices[i].price4;
				priceToUseInclVAT = prices[i].price4InclVAT;
				rrpToUse = prices[i].rrp4;
				rrpToUseIncVAT = prices[i].rrp4InclVAT;
				youSaveAmount = prices[i].youSaveAmount4;
			}
			if (priceNumber == 5)
			{
				priceToUse = prices[i].price5;
				priceToUseInclVAT = prices[i].price5InclVAT;
				rrpToUse = prices[i].rrp5;
				rrpToUseIncVAT = prices[i].rrp5InclVAT;
				youSaveAmount = prices[i].youSaveAmount5;
			}
			if (priceNumber == 6)
			{
				priceToUse = prices[i].price6;
				priceToUseInclVAT = prices[i].price6InclVAT;
				rrpToUse = prices[i].rrp6;
				rrpToUseIncVAT = prices[i].rrp6InclVAT;
				youSaveAmount = prices[i].youSaveAmount6;
			}
			if (priceNumber == 7)
			{
				priceToUse = prices[i].price7;
				priceToUseInclVAT = prices[i].price7InclVAT;
				rrpToUse = prices[i].rrp7;
				rrpToUseIncVAT = prices[i].rrp7InclVAT;
				youSaveAmount = prices[i].youSaveAmount7;
			}
			if (priceNumber == 8)
			{
				priceToUse = prices[i].price8;
				priceToUseInclVAT = prices[i].price8InclVAT;
				rrpToUse = prices[i].rrp8;
				rrpToUseIncVAT = prices[i].rrp8InclVAT;
				youSaveAmount = prices[i].youSaveAmount8;
			}
			if (priceNumber == 9)
			{
				priceToUse = prices[i].price9;
				priceToUseInclVAT = prices[i].price9InclVAT;
				rrpToUse = prices[i].rrp9;
				rrpToUseIncVAT = prices[i].rrp9InclVAT;
				youSaveAmount = prices[i].youSaveAmount9;
			}
			
			// the base price is the minimum price on the row
			basePriceExVat = parseFloat(prices[i].price1);
			if (prices[i].price2 < basePriceExVat && prices[i].price2 > 0) basePriceExVat = prices[i].price2;
			if (prices[i].price3 < basePriceExVat && prices[i].price3 > 0) basePriceExVat = prices[i].price3;
			if (prices[i].price4 < basePriceExVat && prices[i].price4 > 0) basePriceExVat = prices[i].price4;
			if (prices[i].price5 < basePriceExVat && prices[i].price5 > 0) basePriceExVat = prices[i].price5;
			if (prices[i].price6 < basePriceExVat && prices[i].price6 > 0) basePriceExVat = prices[i].price6;
			if (prices[i].price7 < basePriceExVat && prices[i].price7 > 0) basePriceExVat = prices[i].price7;
			if (prices[i].price8 < basePriceExVat && prices[i].price8 > 0) basePriceExVat = prices[i].price8;
			if (prices[i].price9 < basePriceExVat && prices[i].price9 > 0) basePriceExVat = prices[i].price9;
			basePriceIncVat = prices[i].price1InclVAT;
			if (prices[i].price2InclVAT < basePriceIncVat && prices[i].price2InclVAT > 0) basePriceIncVat = prices[i].price2InclVAT;
			if (prices[i].price3InclVAT < basePriceIncVat && prices[i].price3InclVAT > 0) basePriceIncVat = prices[i].price3InclVAT;
			if (prices[i].price4InclVAT < basePriceIncVat && prices[i].price4InclVAT > 0) basePriceIncVat = prices[i].price4InclVAT;
			if (prices[i].price5InclVAT < basePriceIncVat && prices[i].price5InclVAT > 0) basePriceIncVat = prices[i].price5InclVAT;
			if (prices[i].price6InclVAT < basePriceIncVat && prices[i].price6InclVAT > 0) basePriceIncVat = prices[i].price6InclVAT;
			if (prices[i].price7InclVAT < basePriceIncVat && prices[i].price7InclVAT > 0) basePriceIncVat = prices[i].price7InclVAT;
			if (prices[i].price8InclVAT < basePriceIncVat && prices[i].price8InclVAT > 0) basePriceIncVat = prices[i].price8InclVAT;
			if (prices[i].price9InclVAT < basePriceIncVat && prices[i].price9InclVAT > 0) basePriceIncVat = prices[i].price9InclVAT;

			// we've found the price, so quit the loop
			priceFound = true;
			break;

		}
	}
	
	if (!priceFound)
	{
		console.log('Price not found');
		return;
	}

	// get numeric values without formatting for the input values
	var priceExVatToUseValue = priceToUse; //parseFloat(priceToUse.replace(',', ''));
	var priceIncVatToUseValue = priceToUseInclVAT; //parseFloat(priceToUseInclVAT.replace(',', ''));
	var rrpToUseValue = rrpToUse;

	// if we are updating the main product price, then get the extra product prices and update the screen
	if (mainProductId == '')
	{
		var extraPriceInfo = getExtraPriceInfo();
		
		// add it on to the values
		priceExVatToUseValue += extraPriceInfo.priceExVat;
		priceIncVatToUseValue += extraPriceInfo.priceIncVat;
		rrpToUseValue += extraPriceInfo.rrpExVat;
		
		// get rid of base prices and show actual prices rather than differentials
		basePriceExVat = 0;
		basePriceIncVat = 0;

		// show the priceId
		console.log('priceToUse=' + priceToUse);
		console.log('basePriceExVat=' + basePriceExVat);
		console.log('basePriceIncVat=' + basePriceIncVat);
		
		//console.log("priceExVatToUseValue=" + formatPrice(priceExVatToUseValue));
		//console.log("priceIncVatToUseValue=" + formatPrice(priceIncVatToUseValue));
		//console.log("rrpToUseValue=" + formatPrice(rrpToUseValue));
		
		// update the support option fields
		if (parseFloat(prices[i].price1) > 0)
		{
			$('#supportPrice1').html(getPriceDifference(prices[i].price1, basePriceExVat));
		}
		if (parseFloat(prices[i].price2) > 0)
		{
			$('#supportPrice2').html(getPriceDifference(prices[i].price2, basePriceExVat));
		}
		if (parseFloat(prices[i].price3) > 0)
		{
			$('#supportPrice3').html(getPriceDifference(prices[i].price3, basePriceExVat));
		}
		if (parseFloat(prices[i].price4) > 0)
		{
			$('#supportPrice4').html(getPriceDifference(prices[i].price4, basePriceExVat));
		}
		if (parseFloat(prices[i].price5) > 0)
		{
			$('#supportPrice5').html(getPriceDifference(prices[i].price5, basePriceExVat));
		}
		if (parseFloat(prices[i].price6) > 0)
		{
			$('#supportPrice6').html(getPriceDifference(prices[i].price6, basePriceExVat));
		}
		if (parseFloat(prices[i].price7) > 0)
		{
			$('#supportPrice7').html(getPriceDifference(prices[i].price7, basePriceExVat));
		}
		if (parseFloat(prices[i].price8) > 0)
		{
			$('#supportPrice8').html(getPriceDifference(prices[i].price8, basePriceExVat));
		}
		if (parseFloat(prices[i].price9) > 0)
		{
			$('#supportPrice9').html(getPriceDifference(prices[i].price9, basePriceExVat));
		}

		// update the base price field
		$('#selectVariantPriceExVAT' + priceSection).html("&pound;" + formatPriceWithPenceClass(priceExVatToUseValue, "price-pence"));
		$('#selectVariantPriceIncVAT' + priceSection).html("&pound;" + formatPriceWithPenceClass(priceIncVatToUseValue, "price-pence"));
		$('#selectVariantRRPExVAT' + priceSection).html("&pound;" + formatPriceWithPenceClass(rrpToUseValue, "rrp-price-pence"));
		// update the combined total field
		//$('#combinedPrice').html("&pound;" + formatPrice(priceExVatToUseValue) + '<span>ex VAT</span>');

//		document.getElementById('selectVariantRRPExVAT' + priceSection).innerHTML = "RRP &pound;" + formatPrice(rrpToUseValue) + " ex VAT";
//		document.getElementById('selectVariantPriceExVAT' + priceSection).innerHTML = "&pound;" + formatPricePoundsOnly(priceExVatToUseValue) + "<span class='exVatSmall'>" + formatPricePenceOnly(priceExVatToUseValue) + " ex VAT</span>";
//		document.getElementById('selectVariantPriceIncVAT' + priceSection).innerHTML = "&pound;" + formatPricePoundsOnly(priceIncVatToUseValue) + "<span class='incVatSmall'>" + formatPricePenceOnly(priceIncVatToUseValue) + " inc VAT</span>";

	}
	else
	{
		//console.log("Resetting extra product price")
		//console.log("priceSection=" + priceSection);
		//console.log("priceToUse=" + priceToUse);
		
		// update the hidden fields with this extra product's price
		$('#priceExVat' + priceSection + productId).val(priceExVatToUseValue);
		$('#priceIncVAT' + priceSection + productId).val(priceIncVatToUseValue);
		$('#rrpExVAT' + priceSection + productId).val(rrpToUseValue);
		
		// for the new version, update the shown price as well
		if (newVersion == 1)
		{
			$('#addOnShownPriceExVat' + priceSection + productId).html('&pound;' + formatPrice(priceToUse) + '<span>ex VAT</span>');
		}
		
		// check the main product as well
		changeSubPrice3(priceSection, mainProductId, '');
	}

}

// begin new shop pages 2019

// support option button click handler (on the config page support modal)
function supportOptionClickHandler()
{
	if ($(this).parent().hasClass('active'))
	{
	}
	else if($(this).parent().hasClass('fade'))
	{
		$('.product-support-2019 .opt-card').removeClass('active');
		$('.product-support-2019 .opt-card').addClass('fade');
		//$('.product-support-2019 .opt-card').find('.button').css({"background-color":"#fff","color":"#028BC6"});
		//$('.product-support-2019 .opt-card').find('.button').text("Select option");
		$(this).parent().addClass('active');
		$(this).parent().removeClass('fade',1);
		//$(this).css({"background-color":"#fff","color":"#028BC6"});
	}
	else
	{
		$('.product-support-2019 .opt-card').addClass('fade');
		$(this).parent().addClass('active');
		$(this).parent().removeClass('fade',1);
		$(this).text('Selected');
	}
}

// product option handler
function productOptionClick()
{
	var buttonClicked = $(this);
	var optionType = buttonClicked.data('option-type');
	var newValue = buttonClicked.data('new-value');
	
	//console.log ("option type: " + optionType);
	
	// stop processing if this button is disabled
	if (buttonClicked.hasClass('disabled'))
	{
		return;
	}
	
	// deselect all the other options of this type
	$('button.product-option[data-option-type="' + optionType + '"]').removeClass('active').addClass('inactive');
	
	// select this one
	buttonClicked.removeClass('inactive').addClass('active');
	
	// change the appropriate dropdown based on the option type
	var dropdownName;
	var textSpanId;
	var optionEnablingCheckRequired = false;
	switch (optionType)
	{
		case 1:
			dropdownName = 'horizontal';
			textSpanId = 'horizontal-text';
			break;
			
		case 2:
			dropdownName = 'vertical';
			textSpanId = 'vertical-text';
			break;
			
		case 3:
			dropdownName = 'multiProduct';
			textSpanId = 'multiproduct-text';
			optionEnablingCheckRequired = true;
			break;
	}
	
	var priceSectionCounter = parseInt(buttonClicked.data('psc'));
	var mainProductId = buttonClicked.data('mp');
	//var priceNumber = buttonClicked.data('pricenumber');
	var productId = buttonClicked.data('product');
	//console.log('checking #priceNumber' + priceNumber + productId);
	var dropdownSelector = '#' + dropdownName + productId;
	var theDropdown = $(dropdownSelector);
	theDropdown.val(newValue);
	
	// get the text for the option we just selected
	var newSelectedText = theDropdown.find('option:selected').text();
	$('#' + textSpanId).html(newSelectedText);
	
	if (optionEnablingCheckRequired)
	{
		setOptionAvailability(1, hopts[newValue]);
		setOptionAvailability(2, vopts[newValue]);
	}
	
	changeSubPrice3(priceSectionCounter, productId, mainProductId);
}

function setOptionAvailability(optionType, optionList)
{
	var nowDisabledOptionWasSelected = false;
	
	$('button.product-option[data-option-type="' + optionType + '"]').each(function()
	{
		var element = $(this);
		if (optionList.includes(element.data('new-value')))
		{
			element.removeClass('disabled');
		}
		else
		{
			element.addClass('disabled');
			
			// if this element was selected, then we need to select the first enabled item
			if (element.hasClass('active'))
			{
				element.removeClass('active').addClass('inactive');
				nowDisabledOptionWasSelected = true;
			}
		}
	});
	
	// if an option that has now been disabled was selected, then select the first available option
	if (nowDisabledOptionWasSelected)
	{
		$('button.product-option[data-option-type="' + optionType + '"]').not('.disabled').first().click();
	}
}

function selectSupportOption4()
{
	var linkClicked = $(this);
	var priceSection = parseInt(linkClicked.data('psc'));
	var mainProductId = linkClicked.data('mp');
	var priceNumber = parseInt(linkClicked.data('pricenumber'));
	var productId = '' + linkClicked.data('product');
	//console.log('Setting #priceNumber' + productId + ' to ' + priceNumber);
	//$('#priceNumber' + priceNumber + productId).prop('checked', true);
	$('#priceNumber' + productId).val(priceNumber);

	// set text and style for selected support option
	setSupportModalSelection4(priceSection, mainProductId, productId, priceNumber);
	
	changeSubPrice3(priceSection, productId, mainProductId);
	
	// get the relevant image based on the new label
	var newSupportOption = linkClicked.data('label');
	var newLabel = newSupportOption; // 'Advantage ' + 
	var newImageSrc = getSupportImageBySupportOptionName(newSupportOption);
	
	// change the selected support label
	$('#selected-support-option-text').html(newLabel);
	var supportImage = $('#selected-support-image');
	supportImage.prop('src', newImageSrc);
	supportImage.prop('alt', newLabel);
	
	// only show the image if there is one
	if (newImageSrc == '')
	{
		supportImage.addClass('is-hidden');
	}
	else
	{
		supportImage.removeClass('is-hidden');
	}
	
//	$(".product-support-new .opt-card").addClass("fade");
//	linkClicked.parent().addClass("active");
//	linkClicked.parent().removeClass("fade", 1);
	
//	// set the text on each button to select it
//	$(".product-support-new .opt-card a.button").each(function(element)
//	{
//		var jqElement = $(element);
//		var newLabel = jqElement.data('label');
//		jqElement.html('Select ' + newLabel).addClass('warning');
//		//console.log('Setting label: ' + jqElement.data('label'));
//	});
	
	// set the text on this button to "Selected"
	//linkClicked.html('Selected').addClass('warning');
}

// set text and style for selected support option
function setSupportModalSelection4(priceSection, mainProductId, productId, priceNumber)
{
	// set the text for all other options
	$('.change-support-option-2019').each(function(i, element)
	{
		var jqElement = $(element);
		var newLabel = jqElement.data('label');
		jqElement.addClass('hollow').html('Select ' + newLabel);
		console.log('Setting new label to "Select ' + newLabel + '"');
	});
	
	//$('.change-support-option').css({"background-color":"#fff","color":"#028BC6"});
	$('.change-support-option-2019').parent().addClass('fade');
	
	// change the text and class of the selected price number link
	//console.log("Selected support option button id: " + priceSection + '-' + mainProductId + '-' + productId + '-' + priceNumber);
	var selectedSupportOptionButton = $('#' + priceSection + '-' + mainProductId + '-' + productId + '-' + priceNumber);
	selectedSupportOptionButton.html('Selected').removeClass('hollow');
	//selectedSupportOptionButton.css({"background-color":"#028BC6","color":"#fff"});
	selectedSupportOptionButton.parent().removeClass('fade', 1);
}

// get the support logo by option name
function getSupportImageBySupportOptionName(supportOptionLabel)
{
	var newImageSrc = '';

	switch (supportOptionLabel)
	{
		case 'Advantage Starter':
			newImageSrc = '/images/development/icons/adv-strt.png';
			break;

		case 'Advantage Extra':
			newImageSrc = '/images/development/icons/adv-extr.png';
			break;

		case 'Advantage Ultimate':
			newImageSrc = '/images/development/icons/adv-ult.png';
			break;
	}

	return newImageSrc;
}

// end new shop pages 2019

var titlePrefix = '<a href="javascript:;">';
var titleSuffix = '</a>';

$(document).ready(function()
{
	// new shop pages 2019: set up product option handlers
	$('button.product-option').on('click', productOptionClick);
	$('.change-support-option-2019').on('click', selectSupportOption4);
	$('.product-support-2019 .opt-card a.button').click(supportOptionClickHandler);

    $("table").find('.table-accordion ~ tr').hide();
	$("table").find('.table-accordion td').html(titlePrefix + 'Show more' + titleSuffix);
	
    $("table").find(".table-accordion").click(function(){
        $(this).parent().find('.table-accordion ~ tr').fadeToggle(500);
		var existingText = $(this).find('td').html();
		//console.log('et: ' + existingText);
		var newText;
		if (existingText == titlePrefix + 'Show more' + titleSuffix)
		{
			newText = 'Show less';
			$(this).addClass('is-active');
		}
		else
		{
			newText = 'Show more';
			$(this).removeClass('is-active');
		}
		$(this).find('td').html(titlePrefix + newText + titleSuffix);
    });
	
	// lazy load youtube videos
    var youtube = document.querySelectorAll( ".youtube-lazy" );
    
    for (var i = 0; i < youtube.length; i++) {
        
        var source = "https://img.youtube.com/vi/"+ youtube[i].dataset.embed +"/sddefault.jpg";
        
        var image = new Image();
                image.src = source;
                image.addEventListener( "load", function() {
                    youtube[ i ].appendChild( image );
                }( i ) );
        
                youtube[i].addEventListener( "click", function() {

                    var iframe = document.createElement( "iframe" );

                            iframe.setAttribute( "frameborder", "0" );
                            iframe.setAttribute( "allowfullscreen", "" );
                            iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1" );

                            this.innerHTML = "";
                            this.appendChild( iframe );
                } );  
				
	}
	
	$('#sticky-main').on('sticky.zf.stuckto:top', function()
	{
		//console.log("stuckto");
		setShrinkClass(this, "stuckto");
		return;
		var doc = document.documentElement;
		var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
		//console.log (top);
		if (top > 124)
		{
			$(this).addClass('shrink');
		}
		else
		{
			//console.log (top);
		}
	}).on('sticky.zf.unstuckfrom:top', function()
	{
		//console.log("unstuckfrom");
		setShrinkClass(this, "unstuckfrom");
		return;
		var doc = document.documentElement;
		var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
		//console.log (top);
		if (top <= 124)
		{
			$(this).removeClass('shrink');
		}
		else
		{
			
		}
	});
	
	// download link handler - only attach this if the handler method is present (could be implemented differently in different apps)
	if (typeof downloadLinkClick === "function")
	{
		$('.download-link').on('click', downloadLinkClick);
	}
});

function setShrinkClass(obj, theEvent)
{
	var doc = document.documentElement;
	var top = (window.pageYOffset || doc.scrollTop); // - (doc.clientTop || 0);
	//console.log ('window.pageYOffset=' + window.pageYOffset);
	//console.log ('window.scrollY=' + window.scrollY);
	//console.log(doc.documentElement);
	//console.log (top);
	if (top > 124 && theEvent == "stuckto")
	{
		$(obj).addClass('shrink');
	}
	else if (top <= 124 && theEvent == "unstuckfrom")
	{
		$(obj).removeClass('shrink');
		window.scrollTo(0, 0);
	}
}

var tableToExcel = (function () {
        var uri = 'data:application/vnd.ms-excel;base64,'
        , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head>' +
				'<style>.excel-num{	mso-number-format:General;} .excel-text{	mso-number-format:"\@";/*force text*/}</style>' +
				'<body><table>{table}</table></body></html>'
        , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
        , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
        return function (table, name, filename)
		{
			console.log('table name=' + table);
            if (!table.nodeType) table = document.getElementById(table);
			console.log('table=' + table);
            var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
			console.log('ctx=' + ctx);

            document.getElementById("dlink").href = uri + base64(format(template, ctx));
            document.getElementById("dlink").download = filename;
            document.getElementById("dlink").click();
        }
    })()

// set up a data table with export buttons
// the tableId passed in should be the DOM id of the table element
function setUpDataTableForExport(tableId, allowCopyToClipboard, allowExportToExcel, allowExportToCsv, allowExportToPdf)
{
	// remove any existing buttons
	removeExistingDataTableButtons(tableId);
	
	let buttons = [];
	
	if (allowCopyToClipboard)
	{
		buttons.push('copyHtml5');
	}
	if (allowExportToExcel)
	{
		let excelHtml5Button = {
			extend: 'excelHtml5',
			exportOptions: {
                            columns: ':visible',
                            rows: ':visible',
//                            format: {
//                                body: function ( data, row, column, node ) {
//                                    // all the currency columns have the class currency on the td node
//                                    if (node.classList.contains('currency'))
//                                    {
//                                        return data.substring(10); // remove "GBP&nbsp;£" or similar
//                                    }
//                                    else
//                                    {
//                                        return data;
//                                    }
//                                }
//                            }
			}
		}
		buttons.push(excelHtml5Button);
	}
	if (allowExportToCsv)
	{
		let csvHtml5Button = {
			extend: 'csvHtml5',
			exportOptions: {
                            columns: ':visible',
                            rows: ':visible',
//                            format: {
//                                body: function ( data, row, column, node ) {
//                                    // all the currency columns have the class currency on the td node
//                                    if (node.classList.contains('currency'))
//                                    {
//                                        return data.substring(10); // remove "GBP&nbsp;£" or similar
//                                    }
//                                    else
//                                    {
//                                        return data;
//                                    }
//                                }
//                            }
			}
		}
		buttons.push(csvHtml5Button);
	}
	if (allowExportToPdf)
	{
		let pdfButton = {
            extend: 'pdf',
            orientation: 'landscape'
        };
		buttons.push(pdfButton);
	}
	
	// initiate DataTable
	try
	{
		let table = $("#".concat(tableId)).DataTable({
			dom: 'B',
			buttons: buttons,
			paging: false,
			ordering: false,
			iDisplayLength: -1,
                        scrollX: true,
                        scrollCollapse: true
		});
		

		// style the buttons
		let buttonsContainer = table.buttons().container();
		styleDataTableButtonContainer(buttonsContainer);
		
		// add the toggle list items button if needed
		showDataTableToggleLineItemsButtonIfNeeded(buttonsContainer, tableId);
	}
	catch (e)
	{
		// don't worry about this (if there is no data table on the screen)
	}
}

// style the datatable buttons
function styleDataTableButtonContainer(buttonsContainer)
{
	buttonsContainer.addClass('float-right button-group');
	buttonsContainer.find('button').addClass('button');
}

// add the toggle list items button if needed
function showDataTableToggleLineItemsButtonIfNeeded(buttonsContainer, tableId)
{
	// get the table
	const tableElement = $('#' + tableId);
	const listType = tableElement.data('listtype');

	// add the toggle line items button for the main PO list screen only
	if (listType == 'full')
	{
		// make sure it's not there already
		const existingButtonCheck = $('#toggleLineItems');
		if (existingButtonCheck.length == 0)
		{
			let toggleButton = "<button id=\"toggleLineItems\" data-lineitemsvisible=\"hidden\" class=\"button\">Show line items</button>";
			buttonsContainer.append(toggleButton);

			// add the event handler
			$('#toggleLineItems').on('click', toggleLineItemsClick);
		}
	}
}


// toggle line items visibility
function toggleLineItemsClick()
{
	var toggleButton = $(this);
	var currentVisibility = toggleButton.data("lineitemsvisible");
	var newButtonLabel;
	
	if (currentVisibility == "hidden")
	{
		currentVisibility = "shown";
		newButtonLabel = "Hide line items";
		$(".lineitemdetail").removeClass("hide");
		$(".headeronlydetail").addClass("hide");
	}
	else
	{
		currentVisibility = "hidden";
		newButtonLabel = "Show line items";
		$(".lineitemdetail").addClass("hide");
		$(".headeronlydetail").removeClass("hide");
	}
	
	// save it back to the button
	toggleButton.html(newButtonLabel);
	toggleButton.data("lineitemsvisible", currentVisibility);
}

// remove any existing buttons
function removeExistingDataTableButtons(tableId)
{
	$("#".concat(tableId, "_wrapper")).remove();
}

// find anything with the class video-iframe within a modal that's just been closed and reset its src attribute to stop videos playing when the modal is closed
function createModalClosedEventHandler() {
  $(document).on(
    'closed.zf.reveal', '[data-reveal]', function () {
      var modalElement = $(this)[0];
      $(modalElement).find('iframe.video-iframe').each(function(index, iframeElement) {
        var iframe = $(iframeElement);
        var existingSrc = iframe.attr('src');
        iframe.attr('src', '');
        iframe.attr('src', existingSrc);
      });
    }
  );
}

// set up any data tables required
$(document).ready(function()
{
	$('.data-table-required').each(function (index, element)
	{
		const jqElement = $(element);
		
		// get the required buttons from the data elements of the table
		let exportToClipboard = (jqElement.data('export-to-clipboard') == true || jqElement.data('export-to-excel') == 'true');
		let exportToExcel = (jqElement.data('export-to-excel') == true || jqElement.data('export-to-excel') == 'true');
		let exportToCsv = (jqElement.data('export-to-csv') == true || jqElement.data('export-to-csv') == 'true');
		let exportToPdf = (jqElement.data('export-to-pdf') == true || jqElement.data('export-to-excel') == 'true');
		
		// there is a data table we want to allow export to Excel/CSV on this screen
		setUpDataTableForExport(element.id, exportToClipboard, exportToExcel, exportToCsv, exportToPdf);
	});
	
	// set up modal close event handler to deal with YouTube videos still playing within modals
	createModalClosedEventHandler();
});