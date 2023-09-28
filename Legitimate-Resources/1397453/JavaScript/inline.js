var dangqian = document.getElementById("dangqian").innerText; //取div中的内容
            if (dangqian == "index") {
                var parent = document.getElementById("1");
                parent.className = parent.className + " active";
            } else if (dangqian == "about") {
                var parent = document.getElementById("2");
                parent.className = parent.className + " active";
            } else if (dangqian == "fw") {
                var parent = document.getElementById("3");
                parent.className = parent.className + " active";
            } else if (dangqian == "case") {
                var parent = document.getElementById("4");
                parent.className = parent.className + " active";
            } else if (dangqian == "news") {
                var parent = document.getElementById("5");
                parent.className = parent.className + " active";
            } else if (dangqian == "contact") {
                var parent = document.getElementById("6");
                parent.className = parent.className + " active";
            }