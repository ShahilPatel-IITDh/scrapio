
AOS.init({
    offset: 120,
    duration: 400,
    easing: 'ease-in-out',
    delay: 80
});

window.sr = ScrollReveal();
sr.reveal('.prateleira ul li', {
    viewFactor: 0.15,
    duration: 800,
    distance: "0px",
    scale: 1,
    reset: false,
    viewOffset: { top: 40 }
}, 60);
