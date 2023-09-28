conte = document.getElementById("cont_8340ba5f196452be00c2553081881609");
                        enlace = document.getElementById("a_8340ba5f196452be00c2553081881609");
                        capa = document.getElementById("h_8340ba5f196452be00c2553081881609");
                        if(capa) capa.style.cssText = "position:absolute; z-index:0;overflow:hidden; visibility:hidden;";
                        if (conte && enlace) {
                            enlace.style.cssText = "font-family:Helvetica;font-size:14px; height:19px; text-align:center;";
                            conte.style.cssText = "text-align:center; width:488px; color:#808080; background-color:#FFFFFF; border:1px solid #3366FF;";
                            elem = document.createElement("iframe");
                            elem.style.cssText = "width:488px; color:#808080; height:54px;";
                            elem.id = "8340ba5f196452be00c2553081881609";
                            elem.src = "https://www.tameteo.com/getwid/8340ba5f196452be00c2553081881609";
                            elem.frameBorder = 0;
                            elem.scrolling = "no";
                            elem.name = "flipe";
                            elem.style.height = "64";
                            conte.appendChild(elem);
                        }