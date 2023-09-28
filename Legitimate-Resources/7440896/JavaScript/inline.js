
      function menu() {
        var x = document.getElementById("items");
        if (x.style.display === "flex") {
          x.style.display = "none";
        } else {
          x.style.display = "flex";
        }
      }

      function disableScroll() {
          const element = document.getElementById("body");
            element.classList.toggle("no-scrolling");
      }

      function enableScroll() {
          const element = document.getElementById("body");
            element.classList.remove("no-scrolling");
      }

      function background() {
        const element = document.getElementById("nav");
          element.classList.toggle("menu-background"); 
      }
