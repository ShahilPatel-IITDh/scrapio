if (document.location.href.indexOf("tremending") != -1) {	
var script = document.createElement('script');
script.onload = function () {
};
script.src = "https://sc-devel.s3.eu-central-1.amazonaws.com/sc-tagmanager/publico-tremending.js";
document.head.appendChild(script);
} else if (document.location.href.indexOf("https://www.publico.es/sociedad/alianza-verde-denuncian-fiscalia-vertidos-cenizas-toxicas-aire-libre-cerca-valdemingomez.html#analytics-seccion:listado") != -1) {
		const addCSS = s =>(d=>{d.head.appendChild(d.createElement("style")).innerHTML=s})(document);
		addCSS("#sc_intxt_container {height: auto!important;transition: none!important; overflow: inherit!important;background-color: #F0F0F0; border-radius: 15px; min-height: 667px; width: 95%;background-image: url('https://cdn.flashtalking.com/80821/instantAssets/cargando-mpu.png');background-position: 50% 50px; background-repeat:no-repeat;}#sc_intxt_container > div {position: sticky; top: 92px; margin: auto; text-align: center;}.article-body {outline-offset: 0px!important;}ul.destacados-top {min-height: 40px;}[id^=sc-mpu]{background-image: url('https://cdn.flashtalking.com/80821/instantAssets/cargando-mpu.png');background-position: 50% 50px; background-repeat:no-repeat; width: 95%; height: 667px;background-color: #F0F0F0; border-radius: 15px; }.pbsubmenu-home.top-elements {min-height: 30px;}.article-header-title {min-height 100px;}.main {outline-offset: 0!important;}.topic {min-height: 30px;}.article-page .main .social {min-height: 40px;}#sc-banner-bajotitulo > div {position: sticky; top: 92px; margin: auto;}#sc-mpu1 > div {position: sticky; top: 92px; margin: auto;}#sc-mpu2 > div {position: sticky; top: 92px; margin: auto;}#sc-mpu3 > div {position: sticky; top: 92px; margin: auto;}#sc-mpu4 > div {position: sticky; top: 92px; margin: auto;}#sc-mpu5 > div {position: sticky; top: 92px; margin: auto;}#sc-mpu6 > div {position: sticky; top: 92px; margin: auto;}#sc-mpu7 > div {position: sticky; top: 92px; margin: auto;}#sc-mpu8 > div {position: sticky; top: 92px; margin: auto;}#sc-mpu9 > div {position: sticky; top: 92px; margin: auto;}#sc-banner-bajotitulo {background-color: #F0F0F0; border-radius: 15px; height: 667px; width: 95%;background-image: url('https://cdn.flashtalking.com/80821/instantAssets/cargando-mpu.png');background-position: 50% 50px; background-repeat:no-repeat;}#sc-top > div > iframe {vertical-align: middle; margin: auto!important;}")
		console.log("CLS con publicidad");
	var script = document.createElement('script');
	script.onload = function() {
	};
	script.src = "https://sc-devel.s3.eu-central-1.amazonaws.com/sc-tagmanager/publico-mobile-cls.js";
	document.head.appendChild(script);		
} else if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.platform))) {
	const addCSS = s =>(d=>{d.head.appendChild(d.createElement("style")).innerHTML=s})(document);
	addCSS("[id^=sc-mpu]{background-image: url('https://cdn.flashtalking.com/80821/instantAssets/cargando-mpu.png');background-position: 50% 50px; background-repeat:no-repeat; width: 95%; height: 667px;background-color: #F0F0F0; border-radius: 15px; }#sc-mpu1 > div {position: sticky; top: 92px; margin: auto;}#sc-mpu2 > div {position: sticky; top: 92px; margin: auto;}#sc-mpu3 > div {position: sticky; top: 92px; margin: auto;}#sc-mpu4 > div {position: sticky; top: 92px; margin: auto;}#sc-mpu5 > div {position: sticky; top: 92px; margin: auto;}#sc-mpu6 > div {position: sticky; top: 92px; margin: auto;}#sc-mpu7 > div {position: sticky; top: 92px; margin: auto;}#sc-mpu8 > div {position: sticky; top: 92px; margin: auto;}#sc-mpu9 > div {position: sticky; top: 92px; margin: auto;}#sc-top > div > iframe {vertical-align: middle; margin: auto!important;}")
	var script = document.createElement('script');
	script.onload = function() {
	};
	script.src = "https://sc-devel.s3.eu-central-1.amazonaws.com/sc-tagmanager/publico-mobile.js";
	document.head.appendChild(script);
} else {
		const addCSS = s =>(d=>{d.head.appendChild(d.createElement("style")).innerHTML=s})(document);
		addCSS("#sc-top{min-height: 200px;}")
	var script = document.createElement('script');
	script.onload = function() {
	};
	script.src = "https://sc-devel.s3.eu-central-1.amazonaws.com/sc-tagmanager/publico-desktop.js";
	document.head.appendChild(script);
}
