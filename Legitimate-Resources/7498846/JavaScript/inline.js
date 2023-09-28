
var bnb = document.querySelector('.c-breaking-news__content');
if (bnb) {
    var button = document.createElement('a');
    button.href="http://vox.com/pages/support-now?itm_campaign=help-us-plan-eoy22&itm_medium=site&itm_source=banner";
    button.innerText = "Yes, I'll give";
    button.classList.add('p-button', 'c-breaking-news__contribute-button');
    document.querySelector('.c-breaking-news').classList.add('contribute-banner');
    bnb.append(button);
}
