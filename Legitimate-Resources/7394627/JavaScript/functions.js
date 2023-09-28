const btMenu = document.querySelector('.btn-menu');
const navUl = document.querySelector('.menu-nav ul');
btMenu.addEventListener('click', () => {
	btMenu.classList.toggle('active');
	if(btMenu.classList.contains('active')){
		navUl.classList.add('active');
	}else{
		navUl.classList.remove('active');
	}
})

// ---- Slider Compatibles -----------------------------------------------------------
var sliderSteps = tns({
	container: '.slider-compatibles',
	loop: false,
	autoplay: true,
	autoplayButtonOutput: false,
	rewind: true,
	controls: false,
	navPosition: 'bottom',
	items: 1,
});
// ---- Slider Compatibles -----------------------------------------------------------

// ---- Slider favor red -----------------------------------------------------------
var sliderSteps = tns({
	container: '.slider-favor-red',
	loop: false,
	autoplay: false,
	autoplayButtonOutput: false,
	rewind: true,
	controls: false,
	navPosition: 'bottom',
	items: 1,
	responsive: {
		768: {
			items: 2
		},
		992: {
			items: 4,
			nav: false
		}
	}
});
// ---- Slider favor red -----------------------------------------------------------

const links = document.querySelectorAll(".bt-ancla");
for (const link of links) {
	link.addEventListener("click", clickHandler);
}
function clickHandler(e) {
	e.preventDefault();
	const href = this.getAttribute("href");
	const offsetTop = document.querySelector(href).offsetTop;
	scroll({
		top: offsetTop - 0,
		behavior: "smooth"
	});
}



const sections = document.querySelectorAll(".links-sections[id]");
function navHighlighter() {
  let scrollY = window.scrollY;
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = (current.getBoundingClientRect().top + window.scrollY) - 20;
    const sectionId = current.getAttribute("id");
		const linkBar = document.querySelector(`.menu-bar a[href*="${sectionId}"]`);
    ((scrollY > sectionTop) && (scrollY <= sectionTop + sectionHeight)) ? linkBar.parentElement.classList.add('activo') : linkBar.parentElement.classList.remove('activo')
		if((window.innerWidth > 992) && (linkBar.parentElement.classList.contains('activo'))){
			const linkBarH = linkBar.getAttribute('href');
			const logoNav = document.querySelector('.logo-nav');
			((linkBarH === '#equipos-compatibles') || (linkBarH === '#como-activarlo') || (linkBarH === '#que-es-5g') || (linkBarH === '#faq')) ? logoNav.style.fill = '#4D008C' : logoNav.style.fill = '#ffffff'
		}
  });
}

function fadeFn(direction){
	const fadePlus = document.querySelectorAll(`.fade-${direction}`);
	for (let i = 0; i < fadePlus.length; i++) {
		let altura = window.innerHeight/1.3;
		let distancia = fadePlus[i].getBoundingClientRect().top;
		fadePlus[i].classList.add(`transform-${direction}`);
		if(distancia <= altura){
			fadePlus[i].classList.add('show')
		}else{
			fadePlus[i].classList.remove('show')
		}
		
	}
}

window.addEventListener("scroll", () => {
	fadeFn('up');
	fadeFn('down');
	fadeFn('left');
	fadeFn('right');
	navHighlighter();
})




