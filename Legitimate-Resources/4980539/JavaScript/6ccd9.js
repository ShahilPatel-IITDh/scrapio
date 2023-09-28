jQuery(function(e){new DLM_XHR_Download});class DLM_XHR_Download{constructor(){(dlmXHRinstance=this).init()}init(){dlmXHRinstance.attachButtonEvent()}attachButtonEvent(){let d="",o="";jQuery.each(dlmXHR.xhr_links.class,function(e,t){-1<t.indexOf("[class")||-1<t.indexOf("[id")?d+=o+" "+t:d+=o+" ."+t,o=","}),jQuery("html, body").on("click",d,function(e){dlmXHRinstance.handleDownloadClick(this,e)})}handleDownloadClick(e,t){t.stopPropagation();var d=e.getAttribute("href");let o={button:e,href:d,buttonObj:jQuery(e)};-1===o.href.indexOf("blob:http")&&"#"!==o.href&&(t.preventDefault(),dlmXHRinstance.retrieveBlob(o))}retrieveBlob(e){let{button:l,href:r,buttonObj:a}=e,s;const i=new XMLHttpRequest,c=dlmXHR.prevent_duplicates;let m=a.attr("class");m=m.replace("dlm-download-started","").replace("dlm-download-completed",""),a.addClass("dlm-download-started"),l.setAttribute("href","#"),l.removeAttribute("download"),l.setAttribute("disabled","disabled");e=0<r.indexOf("?")?r+"&nonce="+dlmXHR.nonce:r+"?nonce="+dlmXHR.nonce;jQuery(document).trigger("dlm_download_triggered",[this,l,a,s]),i.responseType="blob",i.onreadystatechange=function(){var{status:e,readyState:t,statusText:d}=i;let o=i.getAllResponseHeaders().split("\r\n").reduce((e,t)=>{var[t,d]=t.split(": ");return e[t]=d,e},{});if(void 0!==o["dlm-no-waypoints"]&&(i.abort(),window.location.href=r),void 0!==o["dlm-external-download"])return i.abort(),n=o["dlm-file-name"].replace(/\"/g,"").replace(";",""),void dlmXHRinstance.dlmExternalDownload(o,l,a,n,r);if(2==i.readyState&&void 0!==o["dlm-error"]&&""!==o["dlm-error"]&&null!==o["dlm-error"])return dlmXHRinstance.dlmLogDownload(o["dlm-download-id"],o["dlm-version-id"],"failed",!1),i.abort(),void a.append('<span class="dlm-xhr-error">'+o["dlm-error"]+"</span>");if(2==i.readyState&&void 0!==o["dlm-redirect"]&&""!==o["dlm-redirect"]&&null!==o["dlm-redirect"])return dlmXHRinstance.dlmLogDownload(o["dlm-download-id"],o["dlm-version-id"],"redirected",!1,o["dlm-redirect"],o["dlm-no-access"]),void i.abort();if(2==i.readyState&&i.status,404==e&&2==t){let e=document.createElement("p");e.innerHTML=d,l.parentNode.appendChild(e)}if(401==e&&2==t&&(window.location.href=d),403==e&&2==t){let e=document.createElement("p");e.innerHTML=d,l.parentNode.appendChild(e)}if(200==e&&4==t){var n=i.response;let e=o["content-disposition"].split("filename=")[1];e=e.replace(/\"/g,"").replace(";",""),s=URL.createObjectURL(n),l.removeEventListener("click",dlmXHRinstance.handleDownloadClick),l.setAttribute("download",""+e),l.setAttribute("href",s),l.click(),a.removeClass().addClass(m+" dlm-download-complete"),dlmXHRinstance.attachButtonEvent(),jQuery(document).trigger("dlm_download_complete",[this,l,a,s]),dlmXHRinstance.dlmLogDownload(o["dlm-download-id"],o["dlm-version-id"],"completed",c),window.URL.revokeObjectURL(s),l.removeAttribute("download"),l.setAttribute("href",r),setTimeout(function(){a.removeClass().addClass(m).find("span.dlm-xhr-progress").remove()},4e3)}},i.addEventListener("progress",function(e){let t=e.loaded/e.total*100;t=t.toFixed(2);var d;a.find("span.dlm-xhr-progress").remove(),d="dlm-download-started download-"+10*Math.ceil(t/10),1/0!=t&&a.append('<span class="dlm-xhr-progress">&nbsp;'+t+"%</span>"),a.removeClass().addClass(m+" "+d),jQuery(document).trigger("dlm_download_progress",[this,l,a,s,e,t])}),i.onerror=function(){console.log("** An error occurred during the transaction")},i.open("GET",e,!0),i.setRequestHeader("dlm-xhr-request","dlm_XMLHttpRequest"),i.send()}dlmLogDownload(e,t,d,o,n=null,l=null){null!==l?window.location.href=n:(l={download_id:e,version_id:t,status:d,cookie:o,currentURL:window.location.href,action:"log_dlm_xhr_download",nonce:dlmXHR.nonce},jQuery.post(dlmXHR.ajaxUrl,l,function(e){null!==n&&(window.location.href=n)}))}dlmExternalDownload(d,o,n,l,r){const a=new XMLHttpRequest,e=d["dlm-external-download"];let s=n.attr("class"),i;s=s.replace("dlm-download-started","").replace("dlm-download-completed",""),n.addClass("dlm-download-started"),o.setAttribute("href","#"),o.removeAttribute("download"),o.setAttribute("disabled","disabled"),jQuery(document).trigger("dlm_download_triggered",[this,o,n,i]),a.responseType="blob",a.onreadystatechange=function(){var{status:e,readyState:t}=a;a.getAllResponseHeaders().split("\r\n").reduce((e,t)=>{var[t,d]=t.split(": ");return e[t]=d,e},{});if(403===e)return dlmXHRinstance.dlmLogDownload(d["dlm-download-id"],d["dlm-version-id"],"failed",!1),a.abort(),void n.append('<span class="dlm-xhr-error">Acces Denied to file.</span>');200==e&&4==t&&(e=a.response,i=URL.createObjectURL(e),o.removeEventListener("click",dlmXHRinstance.handleDownloadClick),o.setAttribute("download",""+l),o.setAttribute("href",i),o.click(),n.removeClass().addClass(s+" dlm-download-complete"),dlmXHRinstance.attachButtonEvent(),jQuery(document).trigger("dlm_download_complete",[this,o,n,i]),dlmXHRinstance.dlmLogDownload(d["dlm-download-id"],d["dlm-version-id"],"completed",!1),window.URL.revokeObjectURL(i),o.removeAttribute("download"),o.setAttribute("href",r),setTimeout(function(){n.removeClass().addClass(s).find("span.dlm-xhr-progress").remove()},1e3))},a.addEventListener("progress",function(e){let t=e.loaded/e.total*100;t=t.toFixed(2);var d;n.find("span.dlm-xhr-progress").remove(),d="dlm-download-started download-"+10*Math.ceil(t/10),1/0!=t&&n.append('<span class="dlm-xhr-progress">&nbsp;'+t+"%</span>"),n.removeClass().addClass(s+" "+d),jQuery(document).trigger("dlm_download_progress",[this,o,n,i,e,t])}),a.onerror=function(){console.log("** An error occurred during the transaction")},a.open("GET",e,!0),a.setRequestHeader("dlm-xhr-request","dlm_XMLHttpRequest"),a.send()}}