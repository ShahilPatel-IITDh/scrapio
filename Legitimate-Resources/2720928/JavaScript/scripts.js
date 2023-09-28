var log = {
    url: '',
    init: function (config) {
        this.url = config.url
    },
    logConsent: function(data) {

        var fd = new FormData();
        fd.append('level', data.level);

        const requestOptions = {
            method: "POST",
            body: fd
        };

        fetch(this.url, requestOptions)
        .then((res) => res.json())
        .then((res) => {
            location.reload();
        })
        .catch((err) => {
            console.log(err)
            //location.reload();
        })
    }
}