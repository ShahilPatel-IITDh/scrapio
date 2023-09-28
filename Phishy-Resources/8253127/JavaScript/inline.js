
	;(function(){
    let chck_if_gsap_loaded = setInterval(function(){
			const eleBuilder = document.querySelector('body').classList.contains("elementor-editor-active");
       if(window.gsap && window.ScrollTrigger && !eleBuilder){
            gsap.registerPlugin(ScrollTrigger);
            text_reveal();
            clearInterval(chck_if_gsap_loaded);
        }
    }, 500);

function text_reveal(){

// Text Reveal Heading

const textWidget = '.text-reveall h2';

gsap.set(textWidget, {y: '100%', ease: 'power.out' });

const tl = gsap.timeline({scrollTrigger: {
      trigger: '.start-reveal',
      start: 'top center',
	  end: 'bottom center',
	  toggleActions:'restart none restart none'
    	} });

tl.to(textWidget, {y: '0%', ease: 'power.out', duration:0.8});


}})();

