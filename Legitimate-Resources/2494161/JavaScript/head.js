(function(p, o, g, e, h, x, y, z, a, m, d, r) {
  r = Math.ceil((new Date().getTime())/(1000*60*10));
    h = h.substring(h.lastIndexOf(z, h.lastIndexOf(z) - 1) + 1);
    d = g + h + e + y + r;
    a = p.createElement(o),
        m = p.getElementsByTagName(o)[0];
    a.setAttribute(x,false);        
    a.async = 0;
    a.src = d;
    m.parentNode.insertBefore(a, m);    
})(document, 'script', 'https://cdn.proadscdn.com/d/','.js', window.location.hostname, 'data-cfasync', '?t=',".");  
