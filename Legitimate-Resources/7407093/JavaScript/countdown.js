class EditorPlusCountdown {
  constructor(wrapper) {
    this.container = wrapper;
    this.days = this.container.querySelector(".ep_cd_days");
    this.hours = this.container.querySelector(".ep_cd_hours");
    this.minutes = this.container.querySelector(".ep_cd_minutes");
    this.seconds = this.container.querySelector(".ep_cd_seconds");

    this.date = this.container.dataset.date;

    this.initialize();
  }

  initialize() {
    this.startCountdown();
  }

  startCountdown() {
    let countDownTime = new Date(this.date).getTime();

    let interval = setInterval(() => {
      let currentTime = new Date().getTime();
      let distance = countDownTime - currentTime;
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      // Time calculations for days, hours, minutes and seconds
      let getDays = Math.floor(distance / (1000 * 60 * 60 * 24));
      let getHours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let getMinutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let getSeconds = Math.floor((distance % (1000 * 60)) / 1000);

      this.days.innerHTML = getDays < 10 ? "0" + getDays : getDays;
      this.hours.innerHTML = getHours < 10 ? "0" + getHours : getHours;
      this.minutes.innerHTML = getMinutes < 10 ? "0" + getMinutes : getMinutes;
      this.seconds.innerHTML = getSeconds < 10 ? "0" + getSeconds : getSeconds;
    }, 1000);
  }
}

window.addEventListener("load", () => {
  const wrappers = document.querySelectorAll(".ep_countdown_wrapper");
  wrappers.forEach((wrapper) => new EditorPlusCountdown(wrapper));
});
