
        window.addEventListener("load", function() {

            //Esto me permite detectar el event cuando cambie de valor el select
            var estado = document.getElementById("estado");
            estado.addEventListener("change", (event) => {
                let estado = event.target.value;

                //Reiniciamos el valor de la sucursal al realizar el cambio de ciudad
                let sucursales = document.getElementById("sucursal");
                sucursales.innerHTML = "<option value='0'>Selecciona una sucursal</option>";
                document.getElementById("direccion_sucursal").innerHTML = '';
                let direccion = document.getElementById("direccion").value = '';
              
                $.ajax({
                    type: "POST",
                    url: "../../ajax/sucursales.php",
                    dataType: "json",
                    data: {
                        "opcion": "1",
                        "estado": estado
                    },
                    success: function(data) {
                        console.log(data);
                        let html = "<option value='0'>Selecciona una ciudad</option>";
                        if (data.length > 0) {
                            for (let i = 0; i < data.length; i++) {

                                html += '<option value="' + data[i] + '">' + data[i] + '</option>';
                            }
                        }
                        //Dibujamos el select de los municipios
                        let ciudades = document.getElementById("ciudad");
                        ciudades.innerHTML = html;
                    },
                    error: function(data) {
                        console.log("Problemas al traer municipios");
                    }
                });
                // console.log("Cambio el valor del estado : " + event.target.value);
            }, false);

            //Esto es para detectar el cambio de una ciudad y obtener las sucursales
            var ciudad = document.getElementById("ciudad");
            ciudad.addEventListener("change", (event) => {
                let municipio = event.target.value;
                let estado = document.getElementById("estado").value;
                document.getElementById("direccion_sucursal").innerHTML = '';
                let direccion = document.getElementById("direccion").value = '';

                $.ajax({
                    type: "POST",
                    url: "../../ajax/sucursales.php",
                    dataType: "json",
                    data: {
                        "opcion": "2",
                        "estado": estado,
                        "municipio": municipio
                    },
                    success: function(data) {
                        console.log(data);
                        let html = "<option value='0'>Selecciona una sucursal</option>";
                        if (data.length > 0) {
                            for (let i = 0; i < data.length; i++) {
                                html += '<option value="' + data[i] + '">' + data[i] + '</option>';
                            }
                        }
                        //Dibujamos el select de los municipios
                        let sucursales = document.getElementById("sucursal");
                        sucursales.innerHTML = html;
                    },
                    error: function(data) {
                        console.log("Problemas al traer sucursales");
                    }
                });
            }, false);



            //Esto detecta la sucursal
            var sucursales = document.getElementById("sucursal");
            sucursales.addEventListener('change', (event) => {

                let estado = document.getElementById("estado").value;
                let municipio = document.getElementById("ciudad").value;
                let sucursal = event.target.value;
                let direccion = document.getElementById("direccion");

                $.ajax({
                    type: "POST",
                    url: "../../ajax/sucursales.php",
                    dataType: "json",
                    data: {
                        "opcion": "3",
                        "estado": estado,
                        "municipio": municipio,
                        "sucursal": sucursal
                    },
                    success: function(data) {
                        document.getElementById("direccion_sucursal").innerHTML = data[0];
                        direccion.value = data[0];
                    },
                    error: function(data) {
                        console.log("Problemas al traer sucursales");
                        direccion.value = data[0];
                    }
                });
            }, false);
        });
    