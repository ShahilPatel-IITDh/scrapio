
        window.REBELMOUSE_ACTIVE_TASKS_QUEUE.push(function bootRpm(){
            const INTERNAL_CLASS_PREFIXES = ["tag-", "post-section-", "rm-fl-"];

            function filterOutNoisyClassNames(className) {
                function doesClassNameStartWithPrefix(badPrefix) {
                    return className.indexOf(badPrefix) === 0;
                }
            
                return !INTERNAL_CLASS_PREFIXES.some(doesClassNameStartWithPrefix);
            }
            
            function signatureMaker(id, tagName, classList) {
                const cleanClassList = classList.filter(filterOutNoisyClassNames).sort();
                return [id, tagName, cleanClassList];
            }
            
            window.__rpmOptions = {
                lcpTrackerOptions: {
                signatureMaker: signatureMaker,
                },
            };
            
            
            window.REBELMOUSE_STDLIB.loadExternalScript("https://www.rebelmouse.com/pharos/client/v1/mjs/web.mjs", function(){})
        });

window.REBELMOUSE_ACTIVE_TASKS_QUEUE.push(function(){

    
        !function(e,f,u,i){
	if(!document.getElementById(i)){
		e.async=1;
		e.src=u;
		e.id=i;
		f.parentNode.insertBefore(e,f);
		}
	}(document.createElement('script'),document.getElementsByTagName('script')[0],'//cdn.taboola.com/libtrc/thesocialedge-secondnexus/loader.js','tb_loader_script');
	if(window.performance && typeof window.performance.mark=='function'){
		window.performance.mark('tbl_ic');
	}
    

});