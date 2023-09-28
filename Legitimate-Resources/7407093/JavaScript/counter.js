class EditorPlusCounter {
  constructor(wrapper) {
    this.container = wrapper;
    this.counterNumber = this.container.querySelector(".ep_counter_number");
    this.startCount = parseInt(this.container.dataset.startnum, 10);
    this.stopCounter = parseInt(this.container.dataset.endnum, 10);
    this.animationDuration = parseInt(this.container.dataset.animduration, 10);
    this.frameDuration = 1000 / 60;
    this.totalFrames = Math.round((this.animationDuration * 1000) / this.frameDuration);
    this.easeOutQuad = t => t * (2 - t);
    this.initialize();
  }
  initialize() {
    this.observation();
  }
  updateCounter() {
    let frame = 0;
    const countTo = this.stopCounter - this.startCount;

    let interval = setInterval(() => {

      frame++;

      const progress = this.easeOutQuad(frame / this.totalFrames);
      const currentCount = Math.round(countTo * progress) + this.startCount;

      if (parseInt(this.counterNumber.innerHTML, 10) !== currentCount) {
        this.counterNumber.innerHTML = currentCount;
      }

      if (frame === this.totalFrames) {
        clearInterval(interval);
      }

    }, this.frameDuration);
  }
  observation() {
    const counterAnimation = document.querySelectorAll(".ep_counter_number");
    counterAnimation.forEach((animationElem) => {
      animationElem.style.visibility = "hidden";
      const observer = new IntersectionObserver(
        (entries, observer) => {
          const [entry = null] = entries;
          if (
            entry &&
            entry.isIntersecting &&
            animationElem.isSameNode(this.counterNumber)
          ) {
            animationElem.style.visibility = "visible";
            this.updateCounter();
            observer.disconnect()
          }
        },
        {
          rootMargin: "0px",
          threshold: 1.0,
        }
      );
      observer.observe(animationElem);
    });
  }
}
window.addEventListener("load", () => {
  const wrappers = document.querySelectorAll(".epc_num");
  wrappers.forEach((wrapper) => new EditorPlusCounter(wrapper));
});
