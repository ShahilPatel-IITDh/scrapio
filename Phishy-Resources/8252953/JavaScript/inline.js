
    const x = setInterval(function () {
        let y = document.querySelector('a[href="https://tiiny.host?ref=free-site"]');
        if (y) {
            y.remove()
            clearInterval(x)
        }
    }, 100)

    const z = setInterval(() => {
        let str = location.hash;
        if (str) {
            localStorage.setItem("pageId", str.substring(1));
            clearInterval(z)
        }
    }, 100)
