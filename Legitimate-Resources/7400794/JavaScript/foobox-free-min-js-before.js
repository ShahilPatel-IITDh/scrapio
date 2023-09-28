
/* Run FooBox FREE (v2.7.16) */
var FOOBOX = window.FOOBOX = {
	ready: true,
	disableOthers: false,
	o: {wordpress: { enabled: true }, countMessage:'image %index of %total', excludes:'.fbx-link,.nofoobox,.nolightbox,a[href*="pinterest.com/pin/create/button/"]', affiliate : { enabled: false }},
	selectors: [
		".foogallery-container.foogallery-lightbox-foobox", ".foogallery-container.foogallery-lightbox-foobox-free", ".gallery", ".wp-block-gallery", ".wp-caption", ".wp-block-image", "a:has(img[class*=wp-image-])", ".foobox"
	],
	pre: function( $ ){
		// Custom JavaScript (Pre)
		
	},
	post: function( $ ){
		// Custom JavaScript (Post)
		
		// Custom Captions Code
		
	},
	custom: function( $ ){
		// Custom Extra JS
		
	}
};
