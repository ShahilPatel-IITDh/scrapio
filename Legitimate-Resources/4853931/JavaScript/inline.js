
document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event) {
        var el = event.target;

        if (el.nodeName.toLowerCase() !== 'a') {
            el = el.closest('a');
        }

        if (!el || el.classList.contains('eb-btn-continue')) {
            return;
        }

        var localBaseDomain = /(^|\.)(paragould\.com)$/;
        var linkUrl = new URL(el.href);

        // Check if the link's protocol is 'mailto:' or 'tel:'
        if (linkUrl.protocol === 'mailto:' || linkUrl.protocol === 'tel:') {
            return;
        }

        // Use the regular expression to check if the link's hostname matches the local base domain
        if (!localBaseDomain.test(linkUrl.hostname)) {
            event.preventDefault(); // prevent the default action

            var box = EngageBox.getInstance(1); // replace 1 with the ID of your box
            box.open();
            box.el.querySelector('.eb-btn-continue').setAttribute('href', el.getAttribute('href'));
        }
    });
});
