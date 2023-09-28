
    window.onscroll = function () {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      const height = window.innerHeight;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const footerRect = document.getElementById("footer").getBoundingClientRect();

      if (top > 100) {
        const offset = Math.max(top, 200);
        const offsetPercentage = 50 + Math.floor(offset / 40);
        const offsetPercentage2 = 50 + Math.floor(offset / 120);
        document.getElementById(
          "header"
        ).style.backgroundPosition = `${offsetPercentage}% 0, ${offsetPercentage2}% 100%, ${offsetPercentage}% 50%`;
      } else {
        document.getElementById("header").style.backgroundPosition = "top center, bottom center, center center";
      }

      const offset = docHeight - top - height;
      if (offset < footerRect.height) {
        const offsetPercentage = 50 + Math.floor(offset / 40);
        document.getElementById("footer").style.backgroundPosition = `${offsetPercentage}% 50%`;
      } else {
        document.getElementById("footer").style.backgroundPosition = "center center";
      }

      updateInView(height);
    };

    function inView(el, height) {
      const eb = el.getBoundingClientRect();
      return eb.top < height - 100;
    }
    function updateInView(height) {
      for (x of document.querySelectorAll("div.bg, div.image")) {
        if (inView(x, height)) x.classList.add("inView");
        else x.classList.remove("inView");
      }
    }

    updateInView(window.innerHeight);
  