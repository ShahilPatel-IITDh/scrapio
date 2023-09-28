function pendoCloseOption() {
    if (window.pendo && window.pendo.isReady && window.pendo.isReady() && document.querySelector(".pendo-block-wrapper")) {
        var pendoIcon = document.querySelector(".pendo-block-wrapper");
        var closeIcon = document.createElement('div');
        closeIcon.className = "pendo-close-wrapper"
        closeIcon.innerHTML = '<span class="pendo-close-hover" title="Hide for now"><svg style="width: 14px; height: 14px; color: #444;" width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
            '    <g id="Symbolicons-Pro---Line" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">\n' +
            '        <g id="Controls" transform="translate(-293.000000, -149.000000)" stroke="#000000" stroke-width="2">\n' +
            '            <g id="cancel" transform="translate(294.000000, 150.000000)">\n' +
            '                <line x1="0.0003" y1="0" x2="12.0003" y2="12" id="Stroke"></line>\n' +
            '                <line x1="0.0003" y1="12" x2="12.0003" y2="0" id="Stroke"></line>\n' +
            '                <line x1="0.0003" y1="0" x2="12.0003" y2="12" id="Stroke"></line>\n' +
            '                <line x1="0.0003" y1="12" x2="12.0003" y2="0" id="Stroke"></line>\n' +
            '            </g>\n' +
            '        </g>\n' +
            '    </g>\n' +
            '</svg></span>';
        pendoIcon.appendChild(closeIcon);
        closeIcon.addEventListener("click", function(e){
            e.stopPropagation();
            document.querySelector(".pendo-block-wrapper").style.display = "none";
            document.querySelector(".pendo-resource-center-badge-notification-bubble").style.display = "none";
            return false;
        }, false);
    } else {
        setTimeout(function() {
            pendoCloseOption();
        }, 500);
    }
}