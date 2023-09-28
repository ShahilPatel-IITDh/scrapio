new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
        loading: false,
        credenciales: {
            alias: null,
            contrasenia: null
        }
    },
    methods: {
        async fncIniciarSesion() {
            try {
                this.loading = true;
                let contraHash = md5(this.credenciales.contrasenia);
                let request = await fetch(location.origin + '/Apilogin/login?alias=' + this.credenciales.alias + '&contrasenia=' + contraHash, {
                    method: 'GET'
                })
                if (request.status != 200 || !request.ok) throw await request.json()
                const token = await request.json()

                sessionStorage.setItem('token', token);
                window.location.href = location.origin + '/home/matrizdedocumentos';
            } catch (ex) {
                console.log(ex);
                alert(ex.ExceptionMessage);
            } finally {
                this.loading = false
            }
        },
        
    }
})