
    $('#imageModal').on('show.bs.modal', function(e) {
        var button = e.relatedTarget
        var imgUrl = button.getAttribute('data-modal-image');
        var imgTitle = button.getAttribute('data-modal-image-title');
        var modalBody = this.querySelector('.modal-body')
        var modalTitle = this.querySelector('.modal-title')
        modalBody.innerHTML = `<img src=${imgUrl} />`
        modalTitle.innerHTML = imgTitle
    })
