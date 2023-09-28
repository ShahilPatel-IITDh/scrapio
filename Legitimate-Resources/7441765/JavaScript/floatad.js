wzFloatAd = function() {

    this.style = {
//        container: 'width: 728px; height: 90px; position: fixed; bottom: 5px; left: calc(50% - 364px); background: rgba(0, 0, 0, 0.9); color: #fff; border-radius: 5px;',
        container: 'width: 663px; height: 140px; bottom: 5px; position: fixed; background: rgba(0, 0, 0, 0.9); color: #fff; border-radius: 5px; z-index:101;',
//        closeBtn: 'font-family: Arial,Tahoma,sans-serif; cursor: pointer; position: fixed; left: calc(50% + 339px); bottom: 65px; color: #fff;'
        closeBtn: 'font-family: Arial,Tahoma,sans-serif; font-size: 20px; text-decoration: none; font-weight: bold; cursor: pointer; position: absolute; margin-left: 645px; margin-top: 5px; color: #fff; z-index: 1005;',

        text: 'background: #EFEFEF; color: #454554; font-size: 11px; line-height: 12px; text-align: center;'

    }

    this.setCookie = function (name,value,seconds) {
        var expires = "";
        if (seconds) {
            var date = new Date();
            date.setTime(date.getTime() + (seconds*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    };

    this.getCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    };


    this.eraseCookie = function (name) {
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    };


    _this = this;

    this.getElement = function() {
        return _this.element;
    }


    this.show = function() {
        _this.getElement().style.display = 'block';
    }
    this.hide = function() {
        _this.getElement().style.display = 'none';
    }

    this.onClose = function() {
        _this.hide();
        _this.setCookie('floatAdClosed', 1, 300);
    }

    this.onAdLoad = function() {
        _this.contentElement.innerHTML = this.responseText;
    }

    this.matchWindow = function() {
        const viewportW = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
		const docW = document.body.clientWidth * 10;
		const vw = Math.min(viewportW, docW);

		var floatAd = _this.getElement();

		var dw = _this.defaultWidth;
		var dh = _this.defaultHeight;

		var multip = Math.min(vw / dw, 1);
		var targetWidth = Math.round(dw * multip);

		floatAd.style.width = targetWidth + 'px';
		floatAd.style.height = Math.round(dh * multip) + 'px';
		floatAd.style.left = Math.max(Math.round((vw - dw) / 2), 0) + 'px';
		_this.closeBtn.style.marginLeft = (targetWidth - 18) + 'px';
	}


    this.render = function() {
        var floatAd = document.createElement("div");
        floatAd.setAttribute('style', this.style.container);

        var floatAdContent = document.createElement("div");
	floatAdContent.setAttribute('style', 'height:140px;');
        floatAdContent.innerHTML = 'loading...';

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", this.onAdLoad);
        oReq.open("GET", "https://www.webzdarma.cz/assets/static/generatedad.php");
        oReq.send();


        var floatAdBtn = document.createElement("a");
        floatAdBtn.setAttribute('style', this.style.closeBtn);
        floatAdBtn.innerHTML = '&times;';
        floatAdBtn.addEventListener('click', this.onClose)
        floatAd.appendChild(floatAdBtn);

        floatAd.appendChild(floatAdContent)


        var textAd = document.createElement("div");
        textAd.setAttribute('style', this.style.text);
//        textAd.innerHTML = 'Tuto reklamu zobrazuje <a href="https://www.webzdarma.cz">Webzdarma.cz</a> na webech, které poskytuje zdarma. Chcete web bez reklam? → Přejděte na <a href="https://www.webzdarma.cz/hosting/" title="zaklad">Základ</a>.';
        textAd.innerHTML = 'Tuto reklamu zobrazuje <a href="https://www.webzdarma.cz?utm_source=banner&utm_medium=referral&utm_campaign=bottombar">Webzdarma.cz</a> na webech, ktere poskytuje zdarma. Chcete web bez reklam? <a href="https://www.webzdarma.cz/hosting/?utm_source=banner&utm_medium=referral&utm_campaign=bottombar" target="_blank"" title="zaklad">Aktivujte si Zaklad</a>.';
        floatAd.appendChild(textAd);

        this.element = document.body.appendChild(floatAd);
        this.contentElement = floatAdContent;
        this.closeBtn = floatAdBtn;

        this.defaultWidth = parseInt(floatAd.style.width.replace('px', ''));
        this.defaultHeight = parseInt(floatAd.style.height.replace('px', '')) + 12; //12 je text

        this.matchWindow();
    }

    this.render();
    window.addEventListener("resize", this.matchWindow);

    if (this.getCookie('floatAdClosed')) {
        this.hide();
    } else {
        this.show();
    }

}

wzFloatAd();
