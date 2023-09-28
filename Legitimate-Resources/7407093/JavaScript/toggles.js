class EditorPlusToggles {
  constructor(toggleWrapper) {
    this.wrapper = toggleWrapper;
    this.toggleItemWrapper = this.wrapper.querySelectorAll(
      ".ep_toggle_item_wrapper"
    );
    this.toggleTitles = this.wrapper.querySelectorAll(".ep_toggle_item_title");
    this.toggleContents = this.wrapper.querySelectorAll(
      ".ep_toggle_item_content"
    );

    // saving toggle content heights.
    this.toggleContentsHeights = Array.from(this.toggleContents).map(
      (contentElem) => contentElem.clientHeight
    );
    this.toggleContentsPadding = Array.from(this.toggleContents).map(
      (contentElem) => getComputedStyle(contentElem).getPropertyValue("padding")
    );
    this.defaultFirstItemOpen = this.wrapper.dataset.open_first;
    this.isAccordion = this.wrapper.dataset.isaccordion;
    this.titleIcon = this.wrapper.querySelectorAll(".ep_toggles_icon");
    this.initialize();
  }
  initialize() {
    this.attachEventHandler();
    this.showInitialToggle();
  }
  showInitialToggle() {
    let isInitialToggleOpen =
      this.defaultFirstItemOpen === "true" ? true : false;
    if (isInitialToggleOpen && this.toggleItemWrapper.length > 0) {
      this.toggleItemWrapper[0].classList.add("ep_ti_open");
      this.toggleContents[0].style.height =
        this.toggleContentsHeights[0] + "px";

      this.toggleContents[0].style.padding = this.toggleContentsPadding[0];
    }
  }
  setActiveToggle(idx) {
    let isAccordion = this.isAccordion === "true" ? true : false;
    this.inActiveIcon = this.titleIcon[idx].dataset.icon;
    this.activeIcon = this.titleIcon[idx].dataset.activeicon;

    // Toggle
    if (!isAccordion && this.toggleItemWrapper.length > 0) {
      this.toggleItemWrapper[idx].classList.toggle("ep_ti_open");
    } else {
      this.toggleItemWrapper.forEach((wrapper, wrapperIndex) => {
        if (idx === wrapperIndex && this.toggleItemWrapper.length > 0) {
          wrapper.classList.toggle("ep_ti_open");
          this.toggleContents[wrapperIndex].style.height =
            this.toggleContentsHeights[wrapperIndex] + "px";

          this.toggleContents[wrapperIndex].style.padding =
            this.toggleContentsPadding[wrapperIndex];
        } else {
          wrapper.classList.remove("ep_ti_open");
          this.toggleContents[wrapperIndex].style.height = 0;
          this.toggleContents[wrapperIndex].style.paddingTop = 0;
          this.toggleContents[wrapperIndex].style.paddingBottom = 0;
        }
      });
    }
    // Accordion
    if (this.toggleItemWrapper[idx].classList.contains("ep_ti_open")) {
      this.titleIcon[idx].classList.remove(this.inActiveIcon);
      this.titleIcon[idx].classList.add(this.activeIcon);

      this.toggleContents[idx].style.height =
        this.toggleContentsHeights[idx] + "px";

      this.toggleContents[idx].style.padding = this.toggleContentsPadding[idx];
    } else {
      this.titleIcon[idx].classList.remove(this.activeIcon);
      this.titleIcon[idx].classList.add(this.inActiveIcon);

      this.toggleContents[idx].style.height = 0;
      this.toggleContents[idx].style.paddingTop = 0;
      this.toggleContents[idx].style.paddingBottom = 0;
    }
  }
  attachEventHandler() {
    this.toggleTitles.forEach((title, idx) => {
      this.toggleContents[idx].style.height = 0;
      this.toggleContents[idx].style.paddingTop = 0;
      this.toggleContents[idx].style.paddingBottom = 0;
      title.addEventListener("click", (event) => {
        event.stopPropagation();
        this.setActiveToggle(idx);
      });
    });
  }
}
window.addEventListener("load", () => {
  const toggleWrappers = document.querySelectorAll(".ep_toggles_wrapper");
  toggleWrappers.forEach(
    (toggleWrapper) => new EditorPlusToggles(toggleWrapper)
  );
});
