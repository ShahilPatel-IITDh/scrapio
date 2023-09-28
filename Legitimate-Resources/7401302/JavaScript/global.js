var isIE6 = false/*@cc_on || @_jscript_version < 5.7@*/;

function initPage(isEffects, cRadius, cEdges, cBorder) {
    var page_types = $('page_tabs');
    if (page_types != null) {
        var tabBorder = isEffects ? RUZEE.ShadedBorder.create({ corner: cRadius, edges: cEdges, border: cBorder }) : null;
        var tabs = page_types.getElementsByClassName("mli");
        for (var i = 0; i < tabs.length; ++i) {
            node = tabs[i];
            if (isEffects /*&& !isIE6*/) tabBorder.render(node);
            ulNode = findTagElement(node, 'ul');
            if (ulNode != null) {
                //if(isEffects) ulNode.style.left = isIE6 ? '-10px' : '-5px';
                //if (isEffects) Element.setOpacity(ulNode, 0.90);
                node.onmouseover = function() { ulNode = findTagElement(this, 'ul'); ulNode.style.display = ''; }
                node.onmouseout = function() { ulNode = findTagElement(this, 'ul'); ulNode.style.display = 'none'; }
            }
        }
    }

    initSearchForm();
}

function findTagElement(thisNode, tagName) {
    var tabs = $(thisNode).getElementsByTagName(tagName);
    return tabs[0];
}


function initCorners(isRoundCorners, cRadius, isPanelRoundCorners, cPanelRadius) 
{
    if (isRoundCorners) {
        RUZEE.Borders.add( {".closed-box": { borderType: "simple", cornerRadius: cRadius } });
    }

    if (isPanelRoundCorners) {
        RUZEE.Borders.add( {".roundcorners": { borderType: "simple", cornerRadius: cPanelRadius } });
    }

    RUZEE.Borders.render();
}

var myOpacity = 1.0;
function setOpacity(el, cOpacity) {
    Element.setOpacity(el, cOpacity);
}


function initSearchForm() {
    input = $$("#header-search-form input").first();
    if (!input) return false;

    input.addClassName('grayed');

    // Focus handler
    Event.observe(input, "focus",
			function(event) {
			    if (!input.searchValue) {
			        input.originalValue = input.value;
			        input.value = "";
			        input.removeClassName('grayed');
			    }
			}
		);
    Event.observe(input, "blur",
			function(event) {
			    if (input.value == "") {
			        input.value = (input.originalValue) ? input.originalValue : "Search";
			        input.addClassName('grayed');
			    } else {
			        input.searchValue = input.value;
			    }
			}
		);
}

var myIndexes = new Array();
var myDivs = new Array();

function runIntro(id, interval, isAppear) {
    var intro = $(id);
    if (intro != null) {
        var divs = intro.getElementsByClassName("intro-frame");
        myDivs[id] = divs;
        myIndexes[id] = 0;
    }

    setInterval('showIntroFrame("' + id + '",' + isAppear + ');', interval);
}

function showIntroFrame(id, isAppear) {
    divs = myDivs[id];
    cur_index = myIndexes[id];
    if (isAppear)
        Effect.Fade(divs[cur_index]);
    else
        Effect.BlindUp(divs[cur_index]);
    cur_index = cur_index < divs.length - 1 ? cur_index + 1 : 0;
    myIndexes[id] = cur_index;

    if (isAppear)
        Effect.Appear(divs[cur_index]);
    else
        Effect.BlindDown(divs[cur_index]);
}

function setRandomCollagerFlip(id) {
    var intro = $(id);
    if (intro != null) {
        var pics = intro.getElementsByClassName("rnd-pics");
        for (index = 0; index < pics.length; index++) 
        {
            if ($(pics[index]).hasClassName("visible")) {
                $(pics[index]).removeClassName("visible");
                Effect.Fade($(pics[index]), {duration: 0, from: 0.0, delay: 0.1 * (index+1) });
                //$(pics[index]).hide();
            }
            else {
                $(pics[index]).addClassName("visible");
                Effect.Appear($(pics[index]), { duration: 2, from: 0.3, delay: 0.1 * index });
            }
        }   
    }
}

function setDesignButtons() {
    document.body.insertBefore($('page-settings-icon'), document.body.childNodes[0]);
    Element.extend($('page-settings-icon'));

    document.body.insertBefore($('menu-settings-icon'), document.body.childNodes[0]);
    Element.extend($('menu-settings-icon'));
}


function setAppearEffect() {
    new Effect.Appear('main_area', { from: 0.0, to: myOpacity });
}

function setBlindDownEffect() {
    new Effect.BlindDown('main_area');
}

function setGrowEffect() {
    new Effect.Grow('main_area', { direction: 'center' });
}

var bgpos = 0;
var myInc = -1, myDirection = 'vert';
function moveBody() {
    bgpos = bgpos + myInc;
    if (bgpos <= -2000) bgpos = 0;
    mypos = myDirection == 'vert' ? '0px ' + bgpos + 'px' : bgpos + 'px 0px';
    document.body.style.backgroundPosition = mypos;
}

function setBgMoveEffect(inc, direction, delay) {
    myInc = inc;
    myDirection = direction;
    setInterval("moveBody();", delay);
}