
    function toggleDropdown(el,link){
        var targets = document.querySelectorAll(".dropdown"); 
        var target = document.querySelector(link); 
        for (i = 0; i < targets.length;i++) {
            if (targets[i] != target) targets[i].classList.remove("visible");
        }
        document.querySelector(".dropdown-overlay").style.display = "block";
        target.classList.toggle("visible");
    }
    function closeDropdown(){
        var targets = document.querySelectorAll(".dropdown"); 
        for (i = 0; i < targets.length;i++) {
            targets[i].classList.remove("visible");
        }
        document.querySelector(".dropdown-overlay").style.display = "none";
    }
