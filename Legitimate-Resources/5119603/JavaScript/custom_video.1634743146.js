function loadClickLoadVideo(div) {

    let vidType = div.dataset.vidType;
    let src = div.dataset.src;
     
    let height = div.dataset.height;
    let width = div.dataset.width;
    let video;

    switch(vidType) {
        case 'playlist':

            if(!height){
                height = '484';
            }
            if(!width){
                width = '100%';
            }

            video = document.createElement('iframe');
            video.setAttribute('type', 'text/html');
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            video.setAttribute('frameborder', '0');
            video.setAttribute('src', src);
        break;
        case 'custom_player':

            if(!height){
                height = '';
            }
            if(!width){
                width = '100%';
            }

            video = document.createElement('object');
            video.setAttribute('width', width);
            video.setAttribute('height', height);
            
            let param1 = document.createElement('param');
            param1.setAttribute('name', 'movie');
            param1.setAttribute('value', src);

            let param2 = document.createElement('param');
            param2.setAttribute('name', 'allowFullScreen');
            param2.setAttribute('value', 'true');

            let param3 = document.createElement('param');
            param3.setAttribute('name', 'allowscriptaccess');
            param3.setAttribute('value', 'always');

            let param4 = document.createElement('param');
            param4.setAttribute('name', 'wmode');
            param4.setAttribute('value', 'opaque');

            let embed = document.createElement('embed');
            embed.setAttribute('src', src);
            embed.setAttribute('type', 'application/x-shockwave-flash');
            embed.setAttribute('allowscriptaccess', 'always');
            embed.setAttribute('allowfullscreen', 'true');
            embed.setAttribute('wmode', 'opaque');
            embed.setAttribute('width', width);
            embed.setAttribute('height', height);

            video.appendChild(param1);
            video.appendChild(param2);
            video.appendChild(param3);
            video.appendChild(param4);
            video.appendChild(embed);

        break;
        default:
            video = document.createElement('iframe');
            video.setAttribute('src', src);
            video.setAttribute('frameborder', '0');
            video.setAttribute('allowfullscreen', '1');
            video.setAttribute(
                'allow',
                'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
            );
                        
            if(width){
                video.setAttribute('width', width);
            }
            if(height){
                video.setAttribute('height', height);
            }
    }

    div.parentNode.replaceChild(video, div);
    
}

function initClickLoadVideos() {
    let playerElements = document.getElementsByClassName('clickLoadVideo');
    for (let n = 0; n < playerElements.length; n++) {
        
        let element = playerElements[n];
        let data = element.dataset;

        let videoId = data.id;
        let vidType = data.vidType;
        let vidTitle = data.vidTitle;
        let dataHeight = data.height;
        let dataWidth = data.width;
        let src = data.src;
        let div = document.createElement('div');
        let titleDiv = document.createElement('div');
        let titleText = document.createTextNode(vidTitle);

        titleDiv.setAttribute('class', 'clickLoadVideoTitle');
        titleDiv.appendChild(titleText);

        div.setAttribute('data-id', videoId);
        div.setAttribute('data-src', src);
        div.setAttribute('data-vid-type', vidType);

        if(dataHeight){
            div.setAttribute('data-height', dataHeight);
        }
        if(dataWidth){
            div.setAttribute('data-width', dataWidth);
        }
        let thumbNode = document.createElement('img');
        thumbNode.src = '//i.ytimg.com/vi/ID/hqdefault.jpg'.replace('ID', videoId);
        div.appendChild(thumbNode);
        let playButton = document.createElement('div');
        playButton.setAttribute('class', 'play');
        div.appendChild(playButton);
        div.appendChild(titleDiv);
        div.onclick = function () {
        loadClickLoadVideo(this);
       
        };
        element.appendChild(div);
    }
}

document.addEventListener('DOMContentLoaded', initClickLoadVideos);