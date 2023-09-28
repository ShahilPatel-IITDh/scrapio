
    $('document').ready(function(){
      const options = {rootMargin: '600px', threshold: 0.25};
      const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
          if(entry.intersectionRatio >= 0.25) {
            const {target} = entry;
            const eleId = target.id;
            console.log('ELE', eleId);
            const admode = target.dataset.admode;
            if(admode === 'ab') {
                //console.log('eleId', eleId, 'mode', admode);
                if(!target.classList.contains('adsExp')) {
                if(true) {
                  //console.log('route A');
                  const slotid = target.dataset.slotid;
                  const slot = target.querySelector('ins.ads-slot');
                  //console.log('ADS', slotid, 'W', slot.clientWidth, 'H', slot.clientHeight);
                  if(!slot.classList.contains('adsbygoogle')) {
                    //console.log('ADS F', slotid);
                    slot.classList.add('adsbygoogle');
                    (adsbygoogle = window.adsbygoogle || []).push({});
                    gtag('event', 'ads_trigger', {
                      event_category: 'Ads Trigger',
                      event_label: slotid,
                      non_interaction: true,
                    })
                  }
                } else {
                  //console.log('route B');
                  const slot = target.querySelector('ins.ads-slot');
                  slot.classList.remove('ads-unit-hr');
                  const shm = target.querySelector(`#${target.id}-she`);
                  shm.classList.add('ads-unit-ht');
                  blogherads.adq.push([target.dataset.shem, `${target.id}-she`]);
                  slot.classList.add('adsbyshemedia');
                }
                target.classList.add('adsExp');
                }
            } else {
            if(eleId.includes('she')){
              if(!target.classList.contains('adsbyshemedia')) {
                const slotid = target.dataset.slotid;
                //console.log('eleId', eleId, 'type', slotid);
                blogherads.adq.push([slotid, eleId]);
                target.classList.add('adsbyshemedia');
              }
            } else {
              const slotid = target.dataset.slotid;
              const slot = target.querySelector('ins.ads-slot');
              //console.log('ADS', slotid, 'W', slot.clientWidth, 'H', slot.clientHeight);
               //if(target.classList.contains('ad-ifd')) return;
              if(!slot.classList.contains('adsbygoogle')) {
              // if(!slot.classList.contains('loaded') && slot.dataset.adsbygoogleStatus !== 'done') {
                //console.log('ADS F', slotid);
                slot.classList.add('adsbygoogle');
                (adsbygoogle = window.adsbygoogle || []).push({});
                gtag('event', 'ads_trigger', {
                  event_category: 'Ads Trigger',
                  event_label: slotid,
                  non_interaction: true,
                })
              }
            }
            }
          }
        })
      }, options);
      window.adObserver = observer;
      const slots = document.querySelectorAll('.ads-marker');
      slots.forEach((slot) => observer.observe(slot));
/*
 const observerConnatix = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
          if(entry.intersectionRatio >= 0.25) {
            const {target} = entry;
            const slotid = target.dataset.slotid;
            const slot = target.querySelector('ins.ads-slot');
            if(!target.classList.contains('adsServed')) {
              console.log('ADS Conn', slotid);
              target.classList.add('adsServed');
              var isMobile = Math.min(window.screen.width, window.screen.height) < 768 || navigator.userAgent.indexOf("Mobi") > -1;
              var applyObj = null;
              var targetSlotId = null;
              var scriptElm = null;
              if (isMobile) {
                 targetSlotId = "cnx_placement_ID_432104556a414149ba88088069e90e27";
                 scriptElm = document.createElement('script');
                 scriptElm.setAttribute('id', 'c8dba8c6bf244dcf97700967f3f9f152');
                 var inlineCode = document.createTextNode("(new Image()).src = 'https://capi.connatix.com/tr/si?token=a93d501f-63c0-4319-912a-872a49c37345&cid=bdab4eec-ee37-4cb6-bfcf-619b8ba22d32';  cnx.cmd.push(function() {    cnx({      playerId: \"a93d501f-63c0-4319-912a-872a49c37345\"    }).render(\"c8dba8c6bf244dcf97700967f3f9f152\");  });");
                 scriptElm.appendChild(inlineCode); 
              } else {
                 targetSlotId = "cnx_placement_ID_3f5aa49e26a14905888fe56535ae6181"
                 scriptElm = document.createElement('script');
                 scriptElm.setAttribute('id', 'b510fd27a79b49099fdfc560bcbe7808');
                 var inlineCode = document.createTextNode("(new Image()).src = 'https://capi.connatix.com/tr/si?token=6f692e3a-21af-4f0f-ad07-1a5b639572ba&cid=bdab4eec-ee37-4cb6-bfcf-619b8ba22d32';  cnx.cmd.push(function() {    cnx({      playerId: \"6f692e3a-21af-4f0f-ad07-1a5b639572ba\"    }).render(\"b510fd27a79b49099fdfc560bcbe7808\");  });");
                 scriptElm.appendChild(inlineCode);
              }
              if (slotid == targetSlotId) {
                 //const adsProvider = Math.floor(Math.random() * 10) + 1
                 const adsProvider = -1; //disable it first
                 switch(adsProvider) {
                   case 1:
                    target.id = slotid;
                    document.body.appendChild(scriptElm);
                    break;
                  case 2:
                   case 3:
                   case 4:
                   case 5:
                   case 6:
                   case 7:
                   case 8:
                   case 9:
                   case 10:
                    var script_primis = document.createElement('script');
                    script_primis.setAttribute('src','https://live.primis.tech/live/liveView.php?s=113294');
                    target.appendChild(script_primis)
                    break;
                  case 13:
                    target.setAttribute("id","skm-ad-outstream")
                    target.removeAttribute("data-slotid");
                    target.removeAttribute("class");
                    blogherads.adq.push(['inlineoop', 'skm-ad-outstream']);
                    break;
                }   
              } else {
                  target.parentNode.style.display='none';
              }
            }
          }
        })
      }, options);      
      $(document).ready(function() { 
            const connatixSlots = document.querySelectorAll('.connatixAds-marker');
           connatixSlots.forEach((slot) => observerConnatix.observe(slot));
      });
*/
      });
         
