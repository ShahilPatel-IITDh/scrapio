
    const expandMenu = document.getElementById("MenuExpand");
    const menu = document.getElementById("Header");
    expandMenu.addEventListener("click", (e) => {
        e.preventDefault();
        e.target.classList.toggle("expanded");
        menu.classList.toggle("expanded")
    });
