function useGoToForm(u) {
	document.goToForm.action = u;
	document.goToForm.submit();
}
function sp_progress_bar(container,progress) {
	var c = document.getElementById(container);
	var b = document.createElement("div");
	b.className = "tubeStatusBar";
	b.style.verticalAlign = "middle";
	var p = document.createElement("div");
	if(progress == 100) {
		p.className = "tubeStatusBarFillCompleted";
	} else {
		p.className = "tubeStatusBarFill";
	}
	b.appendChild(p);
	c.appendChild(b);
	$(p).animate({width:progress + "%"},1000);
}
function setBg(id,color,linkId,linkColor) {
	document.getElementById(id).style.backgroundColor = color;
	document.getElementById(linkId).style.color = linkColor;
}
function respSetBg(id,color,linkColor) {
	document.getElementById(id).style.backgroundColor = color;
	document.getElementById(id).style.color = linkColor;
}
function toggleStsSetting(){
	var checkbox = document.getElementById("subscriptiontncheckbox");
	var stsStartTrialBtnDivRef = document.getElementById("stsStartTrialBtnDiv");
	var stsStartTrialBtnTdRef = document.getElementById("stsStartTrialBtnTd");
	if(checkbox.checked){
		stsStartTrialBtnDivRef.style.cursor = "pointer";
		stsStartTrialBtnDivRef.style.align = "right";
		stsStartTrialBtnTdRef.style.opacity = "1";
	}else{
		stsStartTrialBtnDivRef.onclick = null;
		stsStartTrialBtnDivRef.style.cursor = "none";
		stsStartTrialBtnDivRef.style.align = "right";
		stsStartTrialBtnTdRef.style.opacity = "0.4";
	}
}
function navigateToUrl(url) {
	var f = document.createElement("FORM");
	f.method = "post";
	f.action = url;
	document.body.appendChild(f);
	f.submit();
}
function imt_slideshow(img,lnk,spd,targ){
	self.imt_slideimages=new Array();
	self.imt_slidelinks=new Array();
	self.imt_slideshowspeed=spd;
	self.imt_slideshowtarget=new Array();
	self.imt_whichlink=0;
	self.imt_whichimage=0;
	var aimg = img.split(",");
	var alnk = lnk.split(",");
	var atarg = targ.split(",");
	for (i=0;i<aimg.length;i++){
		self.imt_slideimages[i]=new Image();
		self.imt_slideimages[i].src=aimg[i];
	}
	for (i=0;i<alnk.length;i++)	{
		self.imt_slidelinks[i]=alnk[i];
	}
	for (i=0;i<atarg.length;i++)	{
		self.imt_slideshowtarget[i]=atarg[i];
	}
	imt_slideit();
}
function imt_slideit(){
	if (!document.images) {
		return;
	}
	document.images.imt_slide.src=imt_slideimages[imt_whichimage].src;
	imt_whichlink=imt_whichimage;
	if (imt_whichimage<imt_slideimages.length-1) {
		imt_whichimage++;
	} else {
		imt_whichimage=0;
	}
	self.imt_timeout = setTimeout("imt_slideit()",imt_slideshowspeed);
}
function imt_slidenext(){
	clearTimeout(self.imt_timeout);
	imt_slideit();
}
function imt_slideprev(){
	clearTimeout(self.imt_timeout);
	if (imt_whichimage>1) {
		imt_whichimage=imt_whichimage-2;
	} else {
		imt_whichimage=imt_slideimages.length-2+imt_whichimage;
	}
	imt_slideit();
}
function imt_gotoshow(){
	if(self.imt_slideshowtarget[imt_whichlink] == "_blank"){
		window.open(imt_slidelinks[imt_whichlink], '_blank');
	}else{
		self.location=imt_slidelinks[imt_whichlink];
	}
}
function imt_slideshow2(img,lnk,spd,targ){
	self.imt_slideimages2=new Array();
	self.imt_slidelinks2=new Array();
	self.imt_slideshowspeed2=spd;
	self.imt_slideshowtarget2=new Array();
	self.imt_whichlink2=0;
	self.imt_whichimage2=0;
	var aimg = img.split(",");
	var alnk = lnk.split(",");
	var atarg = targ.split(",");
	for (i=0;i<aimg.length;i++){
		self.imt_slideimages2[i]=new Image();
		self.imt_slideimages2[i].src=aimg[i];
	}
	for (i=0;i<alnk.length;i++)	{
		self.imt_slidelinks2[i]=alnk[i];
	}
	for (i=0;i<atarg.length;i++)	{
		self.imt_slideshowtarget2[i]=atarg[i];
	}
	imt_slideit2();
}
function imt_slideit2(){
	if (!document.images) {
		return;
	}
	document.images.imt_slide2.src=imt_slideimages2[imt_whichimage2].src;
	imt_whichlink2=imt_whichimage2;
	if (imt_whichimage2<imt_slideimages2.length-1) {
		imt_whichimage2++;
	} else {
		imt_whichimage2=0;
	}
	setTimeout("imt_slideit2()",imt_slideshowspeed2);
}
function imt_gotoshow2(){
	if(self.imt_slideshowtarget2[imt_whichlink2] == "_blank"){
		window.open(imt_slidelinks2[imt_whichlink2], '_blank');
	}else{
		self.location=imt_slidelinks2[imt_whichlink2];
	}
}
