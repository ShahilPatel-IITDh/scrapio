/* eslint-disable @lwc/lwc/no-document-query */
// SEO: Add meta description to Guides 
document.addEventListener("ZMSetMetadata", event => {
    let descriptionEl = document.querySelector('meta[name="description"]');
    if(!descriptionEl) { 
        descriptionEl = document.createElement('META'); 
        descriptionEl.setAttribute("name", "description"); 
    }
    descriptionEl.setAttribute("content", event.detail.description);
    document.head.appendChild(descriptionEl);
}); 

//Monitor change in document title to report updated title to Google Analytics
let supportPageviewTimeout;
const originalDocumentTitle = document.title;
let votingListener = false;
const pageTitleObserver = new MutationObserver(() => {
    if(document.title !== originalDocumentTitle) {
        clearTimeout(supportPageviewTimeout);
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        supportPageviewTimeout = setTimeout(() => {
            window.dataLayer.push({ event:"supportPageview", pageTitle: document.title });
            clearTimeout(supportPageviewTimeout);
        }, 3000);
    }

    //DSC Voting
    const dscVoting = document.querySelector('c-dsc-voting');
    if(dscVoting) {
        dscVoting.refresh();
        if(!votingListener) {
            votingListener = true;
            dscVoting.addEventListener('dscvote', e => {
                if(window.dataLayer) window.dataLayer.push({ event: "supportFeedback", ...e.detail});
                else console.error('Voting Error: window.dataLayer does not exist.');
            });
        }
    }
});
pageTitleObserver.observe(document.querySelector('title'), {childList: true}); 

//Account for fixed header to support deep links
window.addEventListener("load", () => {
    const fixedHeader = document.querySelector('.themeLayoutStarterWrapper.isHeaderPinned-true');
    if(fixedHeader) {
        const headerHeight = fixedHeader.querySelector('.header').offsetHeight;
        const html = document.querySelector('html');
        if(html) html.style.scrollPaddingTop = headerHeight + 'px';
    }
});