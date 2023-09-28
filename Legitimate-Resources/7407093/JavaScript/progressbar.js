class EditorPlusProgressBar {
  constructor(wrapper) {
    this.wrapper = wrapper;
    this.progressBar = this.wrapper.querySelector(".ep_pb");
    this.percentage = this.wrapper.querySelector(".ep_pb_percentage");
    this.progressBarPercentage = Number(this.wrapper.dataset.eppercentage);
    this.showPercentage = this.wrapper.dataset.epdpercentage;

    this.count = 0;
    this.initialize();
  }
  initialize() {
    this.observation();
  }
  updateCounter = () => {
    let isPercentageShow = this.showPercentage === "true" ? true : false;
    this.percentageCounter();
    if (isPercentageShow) {
      if (this.count < this.progressBarPercentage) {
        this.percentage.innerHTML = this.count + 1 + "%";
        requestAnimationFrame(this.updateCounter);
      } else {
        cancelAnimationFrame(this.updateCounter);
      }
    }
  };
  percentageCounter() {
    if (this.count < this.progressBarPercentage) {
      this.count++;
    }
  }
  setPercentage() {
    this.progressBar.style.width = this.progressBarPercentage + "%";
    this.progressBar.style.transition = "1.5s";
  }
  observation() {
    const progressBarAnimation = document.querySelectorAll(".ep_pb");
    progressBarAnimation.forEach((animationElem) => {
      animationElem.style.visibility = "hidden";

      const observer = new IntersectionObserver(
        (entries, observer) => {
          const [entry = null] = entries;
          if (
            entry &&
            entry.isIntersecting &&
            animationElem.isSameNode(this.progressBar)
          ) {
            animationElem.style.visibility = "visible";
            this.setPercentage();
            let counter = requestAnimationFrame(this.updateCounter);
            observer.disconnect();
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
  const wrappers = document.querySelectorAll(".progress_bar_wrapper");
  wrappers.forEach((wrapper) => new EditorPlusProgressBar(wrapper));
});
