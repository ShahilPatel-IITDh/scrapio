
const slider = document.querySelector(".topmenu__items");
let isDown = false;
let startX;
let scrollLeft;
slider.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("mouseleave", () => {
  isDown = false;
});
slider.addEventListener("mouseup", () => {
  isDown = false;
});
slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});

  var footermain = document.querySelector('.mainfooter');
var footercont = document.querySelector('.navfooter');
  var footerexpendbtn = document.querySelector('.footer_header .expendfooter__nav');
  footerexpendbtn.addEventListener('click', function(e) {
    footermain.classList.toggle("is__expend");
//footercont.scrollIntoView({behavior: "smooth"});
  });
