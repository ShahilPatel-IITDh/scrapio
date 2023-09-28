
  document.addEventListener('DOMContentLoaded', function() {
    const abrirUrlsButtons = document.querySelectorAll('.abrir_urls');

    abrirUrlsButtons.forEach(button => {
      button.addEventListener('click', function() {
        const postID = button.getAttribute('data-id');

        if (postID) {
          fetch(`/wp-json/myplugin/v1/link-clicks/${postID}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(response => response.json())
            .then(data => {
              console.log(`Click count for post ${postID}: ${data}`);
              // Aqui você pode atualizar a contagem exibindo-a na página ou fazer outras ações necessárias.
            })
            .catch(error => {
              console.error('Error:', error);
            });
        }
      });
    });
  });
