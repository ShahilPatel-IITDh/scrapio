
        window.addEventListener('load', () => {
            document.body.classList.add('page-loaded');
            const pageLoaderElement = document.getElementById("page-loader");
            pageLoaderElement.classList.add('hide');
            setTimeout(() => pageLoaderElement.classList.add('d-none'), 500)


        })

    