

      document.querySelectorAll('.read-more').forEach(element => {
        element.addEventListener('click', function p(e){var t=e.target.closest("div");t.getElementsByClassName("short-text")[0].classList.toggle("hidden"),t.getElementsByClassName("full-text")[0].classList.toggle("hidden")});
      });
    