  
jQuery('a[href*="mailto:"]').on('click',  function(){   
gtag('event', 'click', {   
'send_to':'UA-167512130-1',   
'event_category': 'email-address'   
});   
  
fbq('track', 'Lead');   
});   
jQuery('.social-container a').on('click',  function(){   
gtag('event', 'click', {   
'send_to':'UA-167512130-1',   
'event_category': 'social-media'   
});   
  
fbq('track', 'Lead');   
});               
