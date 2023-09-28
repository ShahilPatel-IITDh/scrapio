document.write(`
<style type="text/css">
	.KJ-TabBox ul,.KJ-TabBox li{margin:0;list-style:none;padding:0;border:0; background-color:#FFFFFF;}
	.KJ-TabBox li{display:inline-block;border:1px solid darkgrey;padding:5px;border-bottom:0;color:darkgrey;cursor:pointer; background-color:#FFFFFF;}
	.KJ-TabBox li{border-left:none;}
	.KJ-TabBox li:first-child{border-left:solid 1px;}
	.KJ-TabBox li.cur{color:limegreen;font-weight:bold;background-color:white;cursor:default;border-color:limegreen;border-left:solid 1px;border-right:solid 1px;}
	.KJ-TabBox div{border-top:1px solid gainsboro;margin-top:-1px;display:none;}
	.KJ-TabBox div.cur{display:block!important;border-color:limegreen;}
	.KJ-TabBox .KJ-IFRAME{background:white;}
</style>
	<div class="KJ-TabBox">
		<ul><li data-opt="{'color':'limegreen','url':'https://www.345939.com/am/4.html','height':165}">
		澳门六合彩
		</li><li data-opt="{'color':'crimson','url':'https://www.820765.com/baoma13.html','height':165}">
		香港六合彩
		</li></ul>
		<div></div>
		<div></div>
		<div></div>
	</div>
`);
var KJTB ={
	$(str){return document.querySelector(str);},
	init(str){
		var that = this;
		var dom = this.$(str);
		dom.addEventListener("click",function(e){
			var el = e.target;
			if(el.tagName != "LI"||el.className=="cur")return;
			var ind = that.index(el);
			var nodes = dom.querySelectorAll("li");
			for(var item of nodes){
				item.removeAttribute("style");
				item.removeAttribute("class");
			}
			el.className="cur";
			nodes = dom.querySelectorAll("div");
			for(var item of nodes){
				if(item.getAttribute("class")=="cur") that.leave(item);
				item.removeAttribute("style");
				item.removeAttribute("class");
			}					
			var node = that.getEl(dom,ind,"DIV");
			node.className="cur";
			that.cur(dom,el,node);
		});
		var node = that.getEl(dom.querySelector("UL"),0,"LI");
		node.click();
		[[document,"DOMContentLoaded"],[window,"resize"]].forEach((item,index,self)=>{
			var removeEl=(id)=>{
				try{
					var ifr = document.getElementById(id);
					ifr.parentNode.removeChild(ifr);
				}catch(e){}
			};
			var insert = (id,str)=>{
				var dom = document.createElement("style");
				dom.id = id;
				dom.innerHTML = str;
				document.head.appendChild(dom);			
			}
			item[0].addEventListener(item[1],function(){
				removeEl("kj-iframe-css");
				var w = window.screen.availWidth;
				if(w<=650 && w>500){
					insert("kj-iframe-css",".KJ-IFRAME{height:170px;}");
				}else if(w<=500 && w>450){
					insert("kj-iframe-css",".KJ-IFRAME{height:150px;}");
				}else if(w<=450 && w>350){
					insert("kj-iframe-css",".KJ-IFRAME{height:140px;}");
				}else if(w<=350){
					insert("kj-iframe-css",".KJ-IFRAME{height:130px;}");
				}
			},false);
		});
	},
	cur(dom,el,node){
		var that = this;
		var data = el.getAttribute('data-opt');
		data = JSON.parse(data.replace(/'/g,"\""));
		el.style.color = data["color"];
		el.style.borderColor = data["color"];
		node.style.borderColor = data["color"];

		var tid = node.getAttribute("_tid");
		if(tid){
			clearTimeout(parseInt(tid));
			node.removeAttribute("_tid");
			return;
		}
		node.innerHTML = `
			<iframe class="KJ-IFRAME" src="${data["url"]}" width="100%" height="188"height"]}" frameborder="0" scrolling="no"></iframe>
		`;
	},
	leave(item){
		var that = this;
		function remove(el){
			this.id = setTimeout(()=>{								
						if(!el.getAttribute("_tid")) return;
						el.removeAttribute("_tid");
						el.innerHTML="";
					},1000*10);
			el.setAttribute("_tid",this.id);
		}
		new remove(item);
	},
	index(el,tag){
		var node = el.parentNode.childNodes;
		var index = -1;
		for(var item of node){
			(tag) ? (tag==item.tagName) && index++ : index++;
			if (item===el) return index;
		}
		return index;
	},
	getEl(el,index,tag){
		var i = -1;
		for(var item of el.childNodes){
			(tag) ? (tag==item.tagName) && i++ : i++;
			if(index==i) return item;
		}
	}
};
KJTB.init(".KJ-TabBox");