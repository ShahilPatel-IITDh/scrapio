/* =============================================================================
FROM Image Loupe JS v0.0.1 | MIT License | https://github.com/alecrios/image-loupe-js
V1 : REMASTERED Duncan Boutet 04/11/2019
V2 : REMASTERED Alexandre Lemercier 20/04/2022
============================================================================= */

'use strict';

class imageLoupe {

	defineCss(){
		var node = document.createElement('style');
		node.innerHTML = "[data-loupe-wrapper] {position:absolute;top:0;bottom:0;width:100%;background:rgba(255,255,255,1);transition:all 0.3s ease-in-out;}"+
						 "[data-loupe-image] {display:block;cursor:none;z-index:10;transition:all 0.3s ease-in-out;}"+
						 "[data-loupe-enlarged-image] {width:auto;max-width:none;}"+
						 "[data-loupe] {position:relative;overflow: hidden;width:100%;height:100%;opacity:1;pointer-events:none;transform:scale(0);transition:all 0.3s ease-in-out;}"+
						 "[data-box] {display:flex;align-items:center;justify-content:center;opacity:0;position:absolute;top:0;left:0;overflow:hidden;width:200px;height:150px;background-image:radial-gradient(#5e5e5e 30%, transparent 20%);background-color:transparent;background-position:0 0, 50px 50px;background-size:4px 4px;pointer-events:none;}";
		document.body.appendChild(node);
	}
	constructor(imageMini, imageMaxi, destDom, zoom) {
		this.defineCss();
		// Original Image
		this.originalImage = imageMini;

		// Enlarged Image
		this.enlargedImage = document.createElement('img');
		this.enlargedImage.src = imageMaxi;
		this.enlargedImage.setAttribute('data-loupe-enlarged-image', '');

		// Wrapper
		// this.wrapper = document.createElement('div');
		this.wrapper = $(destDom).get( 0 );
		this.wrapper.setAttribute('data-loupe-wrapper', '');		

		// Loupe
		this.loupe = document.createElement('div');
		this.loupe.setAttribute('data-loupe', '');

		this.box = document.createElement('div');
		this.box.innerHTML = '<i class="material-icons fs50">zoom_in</i>';
		this.box.setAttribute('data-box', '');

		// Add elements to the DOM
		this.wrapper.appendChild(this.loupe);
		this.loupe.appendChild(this.enlargedImage);

		this.originalImage.parentNode.insertBefore(this.box, this.originalImage);
		// this.wrapper.appendChild(this.originalImage);

		// Pass `this` through to methods
		this.showLoupe = this.showLoupe.bind(this);
		this.hideLoupe = this.hideLoupe.bind(this);
		this.moveLoupe = this.moveLoupe.bind(this);

		this.addEventListeners();
	}

	addEventListeners() {
		this.originalImage.addEventListener('mouseenter', this.showLoupe);
		this.originalImage.addEventListener('mouseleave', this.hideLoupe);
		this.originalImage.addEventListener('mousemove',  this.moveLoupe);
	}

	showLoupe() {
		this.originalImage.style.opacity = 0;
		this.originalImage.style.transitionDelay = '0s';
		this.wrapper.style.opacity = 1;
		this.wrapper.style.transitionDelay = '0.05s';
		this.loupe.style.transform = 'scale(1)';
		this.loupe.style.transitionDelay = '0.05s';

	}

	hideLoupe() {
		this.originalImage.style.opacity = 1;
		this.originalImage.style.transitionDelay = '0.05s';
		this.wrapper.style.opacity = 0;
		this.wrapper.style.transitionDelay = '0s';
		this.loupe.style.transform = 'scale(0)';
		this.loupe.style.transitionDelay = '0s';
	}

	moveLoupe(event) {
		window.requestAnimationFrame(() => {
			// Get the size and position of the original image
			this.originalImageBCR = this.originalImage.getBoundingClientRect();

			this.bigImageBCR = this.enlargedImage.getBoundingClientRect();

			this.wrapperBCR = this.wrapper.getBoundingClientRect();

			this.ratioZoom = Math.max(this.bigImageBCR.width, this.bigImageBCR.height) / this.originalImageBCR.width;
			
			$('[data-box]').css({"width":this.wrapperBCR.width/this.ratioZoom, "height":this.wrapperBCR.height / this.ratioZoom });

			// Get the cursor coordinates on the original image
			this.cursorX = event.x - this.originalImageBCR.left + this.originalImage.offsetLeft;
			this.cursorY = event.y - this.originalImageBCR.top + this.originalImage.offsetTop;

			// Determine the corresponding coordinates on the enlarged image
			this.enlargedImageX = -((this.cursorX - this.originalImage.offsetLeft) / this.originalImageBCR.width * this.enlargedImage.width - this.loupe.offsetWidth / 2);
			this.enlargedImageY = -((this.cursorY - this.originalImage.offsetTop) / this.originalImageBCR.height * this.enlargedImage.height - this.loupe.offsetHeight / 2);

			// Center the loupe on the cursor
			this.boxX = this.cursorX - ( this.wrapperBCR.width/this.ratioZoom / 2 );
			this.boxY = this.cursorY - ( this.wrapperBCR.height / this.ratioZoom / 2 );

			// Apply the translate values
			this.enlargedImage.style.transform = `translate3d(${this.enlargedImageX}px, ${this.enlargedImageY}px, 0)`;
			this.box.style.transform = `translate3d(${this.boxX}px, ${this.boxY}px, 0)`;
		});
	}
}

// Create a new loupe for each image
if (window.matchMedia("(min-device-width: 64rem)").matches) {
	[].forEach.call(document.querySelectorAll('[data-loupe-image]'), function(img) {
		new imageLoupe(img, img.getAttribute("data-img-big"), "#img_zoomed");
	});
}