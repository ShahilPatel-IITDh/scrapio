document.querySelectorAll('[data-modal-content]').forEach(item => {
        const title = item.querySelector('.staff-pill-title');
        if (title) {
            if (title.innerText.indexOf('Hospitalist') > -1) {
								console.log('doc', title.innerText);
                const btn = item.querySelector('.elementor-button-link');
                btn.style.opacity = 0;
                btn.style.pointerEvents = 'none';
            }
        }
    })