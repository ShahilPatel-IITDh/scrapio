
function Menu(selector){

	// Set properties, elements
	this.initialise(selector);

	// Size panels and canvas
	this.size();

	// Attach event handling
	this.attachEvents();

	// Adapt to active page
	if (this.activePage > 0){

		this.showTrail(this.activePage);
		this.showGroup(this.activePage);
		this.canvas.css('left', -this.activeLevel * this.width + 'px');
		this.collapseMenu();

	} else {
		this.showGroup('top');
	}

}



Menu.prototype = {


	initialise: function(selector){

		// Get properties
		this.root = jQuery(selector);
		this.width = this.root.width();
		this.activePage = this.root.attr('data-active-page');
		this.initialLevel = this.activePage > 0
			? parseInt(jQuery('.js-menu-item[data-group=' + this.activePage + ']').parents('.js-menu-panel').attr('data-level'))
			: 0;;
		this.activeLevel =this.initialLevel;

		// Get elements
		this.panels = jQuery('.js-menu-panel', this.root);
		this.canvas = jQuery('.js-panel-canvas', this.root);
		this.viewport = jQuery('.js-panel-viewport', this.root);

		// Hide all panels
		jQuery('.js-menu-group', this.panels)
			.hide();

		// Add elements
		this.collapse = jQuery('.js-menu-collapse', this.root);
		this.expand = jQuery('.js-menu-expand', this.root);

		this.displayLevel = 0;
		this.cachedLevel = this.activeLevel;

		this.root.data('menu', this);
	},


	size: function(){

		var thisObject = this;

		function num(value){
			if (isNaN(value))
				return 0;
			else
				return Number(value);
		}

		// Resize the panels
		this.panels.each(
			function(){
				jQuery(this).width(thisObject.width);
			}
		);

		this.root.width(this.width);
		this.viewport.width(this.width);

		// Resize the canvas to accommodate all panels
		this.canvas.width((this.width + 2) * this.panels.length + 'px');

	},


	attachEvents: function(){

		var thisObject = this;

		jQuery('.js-menu-parent', this.root).click(
			function(event){

				var $this = jQuery(this),
					levelId = $this.attr('data-group');

				$this
					.addClass('menu-new-active')
					.siblings('.js-menu-parent')
					.removeClass('menu-new-active');

				if (levelId == thisObject.displayLevelId){
					thisObject.collapseMenu();
					thisObject.displayLevelId = null;
				} else {
					thisObject.showGroup(levelId);
					thisObject.autoCollapse();
					thisObject.displayLevelId = levelId;

				}

				return false;
			}
		);

		jQuery('.js-menu-collapse').click(
			function(){
				thisObject.collapseMenu();
			}
		);

		jQuery('.js-menu-expand').click(
			function(){
				thisObject.expandMenu();
				thisObject.autoCollapse();
			}
		);

	},


	showTrail: function(groupId){

		var
			title = jQuery('.js-menu-item[data-group='+ groupId + ']'),
			parent = title.parents('.js-menu-group').first(),
			nextId = parent.attr('data-group');

		parent.show();
		title.addClass('menu-parent--active');

		if (nextId != 'top'){
			this.showTrail(nextId);
		} else {
			this.displayLevelId = title.attr('data-group');
		}

	},


	showGroup: function(groupId){

		var
			group = jQuery('.js-menu-group[data-group=' + groupId + ']'),
			level = parseInt(group.parent().attr('data-level'));

		this.showLevel(level);

		group
			.fadeIn()
			.siblings()
			.hide();

	},


	showLevel: function(level){

		var
			width = ((level - this.activeLevel + 1) * this.width),
			$window = jQuery(window);

		this.expand.hide();

		if (level == this.activeLevel){
			this.collapse.hide();
			if (this.activeLevel > 0) this.expand.show();
		} else {
			this.collapse.show();
			this.expand.hide();
		}

		this.viewport.add(this.root).animate(
			{
				width: width + "px"
			},
			{
				progress: function(){
					$window.resize();
				}
			}
		);

		this.displayLevel = level;

	},


	collapseMenu: function(href){

		this.activeLevel = this.cachedLevel;

		this.canvas.animate(
			{
				left: -(this.activeLevel * this.width)
			},
			function(){
				if (href !== undefined){
					document.location = href;
				}
			}
		);
		this.showLevel(this.activeLevel);
		this.displayLevelId = null;

	},


	expandMenu: function(){

		this.canvas.animate(
			{ left: 0 }
		);

		this.cachedLevel = this.activeLevel;
		this.activeLevel = 0;
		this.showLevel(this.displayLevel);

	},


	autoCollapse: function(rootElement){

		var
			thisObject = this,

			handler = function(e){
				if (jQuery(e.target).parents('.js-nav').length !== 0) return;
				thisObject.collapseMenu();
				if (rootElement != undefined) rootElement.click();
			};

		setTimeout(
			function(){
				jQuery(document).one('click', handler);
			},
			100
		);
	}


};

function lockedBody(e) {
	var body = jQuery('body');
	if(body.hasClass('locked')){
			body.removeClass('locked');
			jQuery('html').removeClass('locked');
	} else {
			body.addClass('locked');
			jQuery('html').addClass('locked');
	}
	e.stopPropagation();
};

// jQuery('.icon--home').on('click', function(e){
// 	lockedBody(e);
// });
