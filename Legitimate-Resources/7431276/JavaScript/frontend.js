"use strict";

[].forEach.call(document.querySelectorAll('a'), function(el) {
    el.addEventListener('click', wpil_link_clicked);
    el.addEventListener('auxclick', wpil_link_clicked);
});

function wpil_link_clicked(e){
//    e.preventDefault(); // todo remember to remove this
    var link = this;
    var linkAnchor = '';
    var hasImage = false;
    var imageTitle = '';
    var imageTags = ['img', 'svg'];

    // if the click wasn't a primary or middle click, or there's no link, exit
    if(!(e.which == 1 || e.button == 0 ) && !(e.which == 2 || e.button == 4 ) || link.length < 1){
        return;
    }

    if('1' === wpilFrontend.disableClicks){
        return;
    }

    if(this.href === undefined || link.href === '#'){
        return;
    }

    function findLinkText(link){
        if(link.children.length > 0){
            for(var i in link.children){
                var childThis = link.children[i];
                if(childThis.children !== undefined && childThis.children.length > 0 && linkAnchor === ''){
                    findLinkText(childThis);
                }
                if(childThis.nodeType === 1 && -1 !== imageTags.indexOf(childThis.nodeName.toLowerCase()) && imageTitle === ''){
                    hasImage = true;
                    var title = (undefined !== childThis.title) ? childThis.title : '';

                    if(undefined !== title){
                        imageTitle = title.trim();
                    }
                }
                linkAnchor = linkAnchor.trim();
                imageTitle = (imageTitle !== undefined) ? imageTitle.trim(): '';
            };
        }
        if(undefined !== link.outerText){
            linkAnchor = link.outerText;
        }
    }

    findLinkText(link);

    if(linkAnchor === '' && hasImage){
        if(imageTitle !== ''){
            linkAnchor = wpilFrontend.clicksI18n.imageText + imageTitle;
        }else{
            linkAnchor = wpilFrontend.clicksI18n.imageNoText;
        }
    }else if(linkAnchor === '' && !hasImage){
        linkAnchor = wpilFrontend.clicksI18n.noText;
    }

    // ignore non-content links
    if(wpilFrontend.trackAllElementClicks === '0' && hasParentElements(link, 'header, footer, nav, [id~=header], [id~=menu], [id~=footer], [id~=widget], [id~=comment], [class~=header], [class~=menu], [class~=footer], [class~=widget], [class~=comment], #wpadminbar')){
        return;
    }

    var location = getLinkLocation(link);

    makeAjaxCall({
        action: 'wpil_link_clicked',
        post_id: wpilFrontend.postId,
        post_type: wpilFrontend.postType,
        link_url: link.href,
        link_anchor: linkAnchor,
        link_location: location
    });
}
window.addEventListener("load", openLinksInNewTab);

/**
 * Sets non nav links on a page to open in a new tab based on the settings.
 **/
function openLinksInNewTab(){
    // exit if non of the links are supposed to open in a new tab via JS
    if(wpilFrontend.openLinksWithJS == 0 || (wpilFrontend.openExternalInNewTab == 0 && wpilFrontend.openInternalInNewTab == 0) ){
        return;
    }

    [].forEach.call(document.querySelectorAll('a'), function(element) {
        // if the link is not a nav link
        if(!hasParentElements(element, 'header, footer, nav, [id~=header], [id~=menu], [id~=footer], [id~=widget], [id~=comment], [class~=header], [class~=menu], [class~=footer], [class~=widget], [class~=comment], #wpadminbar')){
            // if there is a url in the link, there isn't a target and the link isn't a jump link
            if(element.href && !element.target && element.href.indexOf(window.location.href) === -1){
                var url = new URL(element.href);
                var internal = (window.location.hostname === url.hostname) ? true: false;
                // if the settings allow it
                if( (internal && parseInt(wpilFrontend.openInternalInNewTab)) || (!internal && parseInt(wpilFrontend.openExternalInNewTab)) ){
                    // set the link to open in a new page
                    element.setAttribute('target', '_blank');
                }
            }
        }
    });
}

// replacement for "$(element).parents('x,y,z')" in if checks
function hasParentElements(element, parentList = ''){
    var tag = (!element) ? false: element.tagName.toLowerCase();
    if(!element || tag === 'body' || tag === 'main' || tag === 'article'){
        return false;
    }

    if(typeof parentList === 'string'){
        parentList = parentList.split(',');
    }

    var found = false;
    for(var i in parentList){
        var j = parentList[i];

        if(-1 !== j.indexOf('id~=')){
            var id = j.replace(/\[id~=|\]/g, '').trim();

            if(undefined !== element.id && '' !== element.id && -1 !== element.id.indexOf(id)){ // if the id is set and has a match
                found = true;
                break;
            }
        }else if(-1 !== j.indexOf('class~=')){
            var id = j.replace(/\[class~=|\]/g, '').trim();
            if(undefined !== element.classList && '' !== element.className && -1 !== element.className.indexOf(id)){
                found = true;
                break;
            }
        }else if(-1 !== j.indexOf('#')){
            var id = j.replace(/#/g, '').trim();
            if(undefined !== element.id && '' !== element.id && id === element.id){
                found = true;
                break;
            }
        }else if(!j.match(/[^a-zA-Z]/)){ // tag match
            var id = j.trim();
            if(element.tagName.toLowerCase() === id){
                found = true;
                break;
            }
        }
    }

    if(found){
        return true;
    }else if(element.parentNode !== ''){
        return hasParentElements(element.parentNode, parentList);
    }

    return false;
};

function makeAjaxCall(callData = {}){
    if(window.jQuery){
        callWithJquery(callData);
    }else{
        callWithVanilla(callData);
    }
}

function callWithJquery(callData = {}){
    jQuery.ajax({
        type: 'POST',
        url: wpilFrontend.ajaxUrl,
        data: callData,
        success: function(response){

        }
    });
}

function callWithVanilla(callData = {}){
    function respond(dat){
        if(dat.currentTarget !== undefined){
            console.log(dat.currentTarget.response);
        }
    }

    async function ajaxPost (data, callback) {
        var url = wpilFrontend.ajaxUrl,
            xhr = new XMLHttpRequest();
        var params = [];
        for(var i in data){
            params.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
        }
        params = params.join('&');
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//        xhr.onload = callback.bind(xhr);
        xhr.send(params);
    }

    ajaxPost(callData, respond);
}

function getLinkLocation(element){
    var location = 'Body Content';
    var sections = {'Search': ['search', '[id~=search]', '[class~=search]'],
                    'Header': ['header', '[id~=header]', '[class~=header]'],
                    'Comment Section': ['[id~=comment]', '[class~=comment]'],
                    'Footer': ['footer', '[id~=footer]', '[class~=footer]'],
                    'Menu': ['[id~=menu]', '[class~=menu]'],
                    'Navigation': ['nav'],
                    'Sidebar': ['sidebar', '[id~=sidebar]', '[class~=sidebar]', '[id~=widget]', '[class~=widget]'],
                    'Body Content': ['main', 'article', '[class~=main]'],
                    };

    if(!element || element.tagName.toLowerCase() === 'body'){
        return location;
    }

    var found = false;
    elementLoop:
    for(var section in sections){
        var sectionData = sections[section];
        for(var i in sectionData){
            var j = sectionData[i];

            if(-1 !== j.indexOf('id~=')){
                var id = j.replace(/\[id~=|\]/g, '').trim();

                if(undefined !== element.id && '' !== element.id && -1 !== element.id.indexOf(id)){ // if the id is set and has a match
                    found = true;
                    location = section;
                    break elementLoop;
                }
            }else if(-1 !== j.indexOf('class~=')){
                var id = j.replace(/\[class~=|\]/g, '').trim();
                if(undefined !== element.classList && '' !== element.className && -1 !== element.className.indexOf(id)){
                    found = true;
                    location = section;
                    break elementLoop;
                }
            }else if(-1 !== j.indexOf('#')){
                var id = j.replace(/#/g, '').trim();
                if(undefined !== element.id && '' !== element.id && id === element.id){
                    found = true;
                    location = section;
                    break elementLoop;
                }
            }else if(!j.match(/[^a-zA-Z]/)){ // tag match
                var id = j.trim();
                if(element.tagName.toLowerCase() === id){
                    found = true;
                    location = section;
                    break elementLoop;
                }
            }
        }
    }

    if(found){
        return location;
    }else if(element.parentNode !== ''){
        return getLinkLocation(element.parentNode);
    }

    return false;
}
