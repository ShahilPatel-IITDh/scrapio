window.onload = function() {
	
    var totalPics=0,
        currPic=1,
        nxtPic,
        working=false,
        theTimer=null,
        autoTimer,
        is2ndRunVertScroll=true,
        initialTouch=true,
        touchsurface = document.getElementById('touch-box'),
        startX,
        startY,
        dist,
        minDist = 50, //min distance to be considered swipe
        timeLimit = 800, //max time to travel distance
        swipeTime,
        startTime,
        touchobjSTART,
        touchobjEND,
        dir,
        isWindows=window.navigator.msPointerEnabled,
        version=window.navigator.userAgent;
    
//*******************Determine how many carousel items have been loaded

    itemsParent = document.getElementById("items-container");
    totalPics = itemsParent.getElementsByClassName("carousel-item").length;

    //set z-index for pics (need to set in JS)
    for(i=1;i<=totalPics;i++){  
          document.getElementById("s"+i).style.zIndex=String(totalPics-i);
    }
    
    
 //*******************START Touch capture

if(isWindows){ //check for Windows Phone for bug fix

    startTouchCapture();
}else{

    if ('ontouchstart' in window) {
        startTouchCapture();
    }
    
}

function startTouchCapture(){
    //add touch listeners
    if (isWindows) {
        /* For Windows Phone 8.0 */
        touchsurface.addEventListener("MSPointerDown", touchHandler, true);
        touchsurface.addEventListener("MSPointerMove", touchHandler, false);
        touchsurface.addEventListener("MSPointerUp", touchHandler, false);
        /* For Windows Phone 8.1+ */
        touchsurface.addEventListener("pointerdown", touchHandler, true);
        touchsurface.addEventListener("pointermove", touchHandler, false);
        touchsurface.addEventListener("pointerup", touchHandler, false);
    }else{
         touchsurface.addEventListener('touchstart', touchHandler, true);
         touchsurface.addEventListener('touchmove', touchHandler, false);   
         touchsurface.addEventListener('touchend', touchHandler, false);
    }


    if (!isWindows) {
        var e = document.createEvent('TouchEvent');
        
    }
    else{
        var e =document.createEvent('MouseEvent');
    }

}
    function touchHandler(event){ 
        switch (event.type) { //determine if touch was a swipe, vert scroll, or tap
            
            case "touchstart": case "MSPointerDown": case "pointerdown":
                    //gather time/location touch starts 
                    dist = 0

                        if(!isWindows){
                            
                            if((!is2ndRunVertScroll)||(initialTouch)){//^^If first round of touch evaluation set touchobj (otherwise is a second touchevent manually called below to allow scrolling and will use same as previous round)
                                
                                touchobjSTART = event.changedTouches[0]
                            }
                        
                            startX = touchobjSTART.pageX
                            startY = touchobjSTART.pageY
                        
                        }else{

                            startX = event.pageX
                            startY = event.pageY
                        }
                                
                    startTime = new Date().getTime();
                    
                    if(!is2ndRunVertScroll){
                    
                        event.preventDefault();
                        event.stopPropagation();

                    }

                    break;
            
            case "touchmove": case "MSPointerMove": case "pointermove": 
                    break;
            
            case "touchend": case "MSPointerUp": case "pointerup": 
                    //gather info on touch distance and duration
                    
                    if(!isWindows){

                        if((!is2ndRunVertScroll)||(initialTouch)){//Same as condtion set in touch start -see note ^^ above
                            
                            touchobjEND = event.changedTouches[0];
                        
                        }

                        dist = touchobjEND.pageX - startX;
                        vertDist=Math.abs(touchobjEND.pageY - startY);

                    }else{
                        dist =  event.pageX - startX;
                        vertDist=Math.abs(event.pageY - startY);
                    }
                    
                    swipeTime = new Date().getTime() - startTime 
                                
                    dir = (dist<0) ? "forward" : "back";
                    
                    handletouch(dir,swipeTime,vertDist,dir)
                                    
                    break;
        }
        
        if(initialTouch){//default initial interaction
        
            initialTouch=false;
            is2ndRunVertScroll=false;
        }
    }

    function handletouch(swipeDir,swipeTime,vertDist,dir){

    //Evaluate the type of touch interaction
        
        //test to see if qualifies as swipe
        var swipeDetected = (swipeTime <= timeLimit && dist >= minDist &&  vertDist<= 50) || (swipeTime <= timeLimit && (-1*dist) >= minDist && vertDist <= 50)

        //is a swipe
        if (swipeDetected){
            
            (swipeDir=="forward")? moveIt("fwd-move",true):moveIt("bck-move",true);   
             
            return;
        }
        //is a vertical scroll
        else if(vertDist>=30){
            if(!is2ndRunVertScroll){//prevent repeating a 3rd time
                               
                doScroll();
            }

            return;
        }  
        //is a tap  
        else if((vertDist<10)&&(is2ndRunVertScroll==false)&&(swipeTime<500)&&(dist<5)&&(dist>-5)){//<<< can modify sensitivity of tap/touch link here
        
            window.location=document.getElementById("carousel-link-"+currPic).href;
        }
    }

    function doScroll(){

        //interaction evaluated as a scroll so initiate another touch event, but without eventPreventDefault to allow window to scroll (this method is a bug fix for BB7 and iOS)

        window.setTimeout(resetScroll,500);//needs to happen after initTouchEvent below but get's ignored after initEvent, so setTimeout instead
        is2ndRunVertScroll=true;
        
        if(!isWindows){
            e.initUIEvent("touchstart", true, true, window, 1, 50, 0, 50, 0, false, false, false, false, 0, null);
            touchsurface.dispatchEvent(e);
            
        }else{
            e.initMouseEvent("pointerdown", true, true, window, 1, 50, 0, 50, 0,  false, false, false, false, 0, null);
            touchsurface.dispatchEvent(e);
        }

    }

    function resetScroll(){
        
        is2ndRunVertScroll=false;

    }

    //*******end touch capture


    //*******************Start Animation  

    //start 6 sec autorotation on page load
    autoTimer = window.setInterval(moveIt,6000,'fwd-move',false);
    var classNameDirIn, classNameDirOut;

    //Animate slides
    function moveIt(dir,userInit) {
    		//if only one image do not rotate
    		if (totalPics<=1){
    			return;
    		}
            //if user inititated a carousel swipe, stop timer (reset below)
            if(userInit){   
                clearInterval(autoTimer); 
            }

            if(working){//prevent multi/quick clicking
                return false;
            }
            else{
                working=true;

                //determine current pic and direction of next pic  
                nxtPic=(dir=="fwd-move")? currPic+1:currPic-1;
                (nxtPic==0)?nxtPic=totalPics:null;
                (nxtPic==totalPics+1)?nxtPic=1:null;
                currPicId="s"+currPic;
                nxtPicId="s"+nxtPic;

                //add classes for animation
                classNameDirIn = dir + "-in";
                classNameDirOut = dir + "-out";
                addClassName(document.getElementById(nxtPicId), classNameDirIn);
                addClassName(document.getElementById(nxtPicId), "carousel-item-on");
                addClassName(document.getElementById(currPicId), classNameDirOut);
          

                //change indidcator status
                removeClassName(document.getElementById("indicator"+currPic), "indicator-on");
                addClassName(document.getElementById("indicator"+nxtPic), "indicator-on");
               
                //change z-index of current pic
                document.getElementById(nxtPicId).style.zIndex=String(totalPics-1);
                
                
                //Move current and previous pics to correct z-index; remove animate classes after animations are complete 
                theTimer = window.setTimeout(function(){
                  document.getElementById(currPicId).style.zIndex="1",
                  document.getElementById(nxtPicId).style.zIndex=String(totalPics),
                  removeClassName(document.getElementById(currPicId), classNameDirOut),
                  removeClassName(document.getElementById(currPicId), "carousel-item-on"),
                  removeClassName(document.getElementById(nxtPicId), classNameDirIn),
                  document.getElementById("touch-box").style.zIndex="50",
                  working=false;
                },600); 

                //if a user initiated swipe, restart timer
                (userInit)?autoTimer = window.setInterval(moveIt,6000,'fwd-move',false):null;

                //get ready for next pic
                currPic=nxtPic;
            }
 
            //*******end animation
    }
    
    function addClassName(element, classNameToAdd){
        classNameToAdd = " " + classNameToAdd; //adding a space before new classname
        element.className = element.className.replace(classNameToAdd,""); //removing new classname if it already exists
        element.className = element.className + classNameToAdd; // appending the new classname
    }
    
    function removeClassName(element, classNameToRemove){
    	classNameToRemove = " " + classNameToRemove; //adding a space before classname
        element.className = element.className.replace(classNameToRemove,""); //removing classname 
    }


//********* Desktop click

if ((!navigator.userAgent.match(/WPDesktop/i)) && (!navigator.userAgent.match(/iemobile/i))){
   document.getElementById("touch-box").addEventListener('click',desktopClick);
}
function desktopClick(){
   document.getElementById("touch-box").style.cursor="pointer";
   window.location=document.getElementById("carousel-link-"+currPic).href;
}
//********* End Desktop click
}