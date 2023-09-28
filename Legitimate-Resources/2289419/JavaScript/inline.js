
setTimeout(() =&gt; {
var BreadcrumbList = document.createElement('script')
BreadcrumbList.setAttribute('type', 'application/ld+json')
BreadcrumbList.innerText = '{"@context": "https://schema.org","@type": "BreadcrumbList","itemListElement": [{"@type": "ListItem","position": 1,"name": "Home","item": "http://www.astra-sa.com.br/pt/default.asp"}]}'
document.getElementsByTagName('head')[0].appendChild(BreadcrumbList)
}, 300);
