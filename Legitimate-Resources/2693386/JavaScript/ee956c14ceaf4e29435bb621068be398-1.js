var strUrl=window.location.href;if(!strUrl.includes("/de/")&&!strUrl.includes("/fr/")){document.querySelector("#search-field-input").addEventListener("autoComplete",e=>{console.log(e)});const autoCompletejs=new autoComplete({data:{src:async()=>{document.querySelector("#search-field-input").setAttribute("placeholder","Loading...");const e=await fetch("/sites/default/dev/autocomplete.json");const t=await e.json();document.querySelector("#search-field-input").setAttribute("placeholder","Find it faster with search");return t},key:["page","p1"],cache:false},sort:(e,t)=>{if(e.match<t.match)return-1;if(e.match>t.match)return 1;return 0},placeHolder:"Find it faster with search",selector:"#search-field-input",threshold:0,debounce:0,searchEngine:"strict",highlight:true,maxResults:8,resultsList:{render:true,container:e=>{e.setAttribute("id","autoComplete_list")},destination:document.querySelector("#search-field-input"),position:"afterend",element:"ul"},resultItem:{content:(e,t)=>{t.innerHTML=e.match},element:"li"},noResults:()=>{const e=document.createElement("li");e.setAttribute("class","no_result");e.setAttribute("tabindex","1");e.innerHTML=""},onSelection:e=>{const t=e.selection.value.page;document.querySelector("#search-field-input").value=t;document.querySelector("#search-field-input").setAttribute("placeholder",t);console.log(e)}})}