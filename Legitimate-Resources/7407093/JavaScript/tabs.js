class EditorPlusTabs {
  constructor(container) {
    this.container = container;
    this.tabLabels = this.container.querySelectorAll(".ep_label_main");
    this.tabContents = this.container.querySelectorAll(".ep_tab_item_wrapper");
    this.initialize();
  }
  initialize() {
    let autoPlay =
      this.container.getAttribute("data-autoplay") === "false" ? false : true;
    this.showInitialTabs();
    this.attachEventHandlers();
    autoPlay && this.setupAutoplay();
  }
  setupAutoplay() {
    this.autoPlayTabs();
  }
  setActiveTab(index) {
    for (let i = 0; i < this.tabLabels.length; i++) {
      if (this.tabLabels[i].classList.contains("ep_active_tab")) {
        this.tabLabels[i].classList.remove("ep_active_tab");
      }
      if (this.tabContents[i].classList.contains("ep_active_content")) {
        this.tabContents[i].classList.remove("ep_active_content");
      }
    }
    this.tabLabels[index].classList.add("ep_active_tab");
    this.tabContents[index].classList.add("ep_active_content");
  }
  showInitialTabs() {
    this.setActiveTab(0);
  }
  attachEventHandlers() {
    this.tabLabels.forEach((tab, idx) => {
      tab.addEventListener("click", (event) => {
        event.preventDefault();
        this.setActiveTab(idx);
      });
    });
  }
  autoPlayTabs() {
    let delayInSeconds = Number(this.container.getAttribute("data-delay"));
    let delayInMilliseconds = delayInSeconds * 1000;
    let index = Array.from(
      document.querySelectorAll(".ep_tabs_root .ep_label_main")
    ).findIndex((tab) => tab.classList.contains("ep_active_tab"));
    const autoplayInterval = () => {
      if (index < this.tabContents.length) {
        this.setActiveTab(index);
        index++;
      } else {
        index = 0;
      }
    };
    let interval = setInterval(autoplayInterval, delayInMilliseconds);
    document.addEventListener("mousemove", (event) => {
      const isMouseOnContainer = event.path.find((node) => {
        return node instanceof HTMLElement && this.container.isSameNode(node);
      });
      if (isMouseOnContainer && undefined !== interval) {
        clearInterval(interval);
        interval = undefined;
      } else if (interval === undefined) {
        interval = setInterval(autoplayInterval, delayInMilliseconds);
      }
    });
  }
}
window.addEventListener("load", () => {
  const tabContainers = document.querySelectorAll(".ep_tabs_root");
  tabContainers.forEach((tabContainer) => new EditorPlusTabs(tabContainer));
});
