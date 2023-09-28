(function () {
  document.querySelectorAll("#hero-split .anchor-wrap")?.forEach((wrap) => {
    let link = wrap.querySelector("a.anchor-wrap-target");

    if (link) {
      wrap.addEventListener("click", function (e) {
        if (
          e.target.tagName.toLowerCase() != "button" &&
          e.target.tagName.toLowerCase() != "a"
        ) {
          link.click();
        }
      });

      wrap.addEventListener("keydown", function (e) {
        if (
          e.key == "Enter" &&
          e.target.tagName.toLowerCase() != "button" &&
          e.target.tagName.toLowerCase() != "a"
        ) {
          link.click();
        }
      });
    }
  });
}())