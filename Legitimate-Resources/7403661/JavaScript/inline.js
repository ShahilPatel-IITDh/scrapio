
            function trIcon() {
                var tr_pixel_img = document.createElement("img");
                tr_pixel_img.setAttribute("src", window.location.origin + "/tr-icon.php?src=" + btoa(window.location.href));
                tr_pixel_img.setAttribute("height", "1");
                tr_pixel_img.setAttribute("width", "1");
                tr_pixel_img.setAttribute("alt", "vpnMentor");
                tr_pixel_img.setAttribute("class", "hidden");
                document.body.appendChild(tr_pixel_img);
            }

            document.addEventListener("DOMContentLoaded", function() {
                setTimeout(trIcon, 100);
            });
        