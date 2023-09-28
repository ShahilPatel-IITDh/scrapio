var imgs, cnt_global_slides = 0, oldID_global_slides = 1, newID_global_slides = 0;


function OnSlidesFinish(obj) {
    $(obj.element).removeClassName("img-animation");
}

function OnSlidesStart(obj) {
    $(obj.element).addClassName("img-animation");
}

function renewGlobalShow(speed) {
    oldID_global_slides = newID_global_slides;
    newID_global_slides = (newID_global_slides >= cnt_global_slides - 1) ? 0 : newID_global_slides + 1;
    if (oldID_global_slides != newID_global_slides) {
        Effect.Fade(imgs[oldID_global_slides], { duration: speed, afterFinish: OnSlidesFinish });
        Effect.Appear(imgs[newID_global_slides], { duration: speed, beforeStart: OnSlidesStart });
    }
}

function initSlideShow(elID, secs, milisecs) {
    document.body.insertBefore($(elID), document.body.childNodes[0]);
    Element.extend($(elID));

    imgs = $(elID).select('img');
    imgs.each(function(elmt) { elmt.hide(); });

    cnt_global_slides = imgs.length;
    oldID_global_slides = 1, newID_global_slides = 0 + Math.floor(Math.random() * cnt_global_slides);
    
    $(imgs[newID_global_slides]).show();
    $(imgs[newID_global_slides]).addClassName("img-animation");

    setInterval("renewGlobalShow(" + secs + ");", milisecs);    
}

