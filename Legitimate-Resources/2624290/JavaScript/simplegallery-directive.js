angular.module('dating.directives.simplegallery', [
	])
	.directive('simplegallery', function() {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				$(element).on('click', '.thumbnail', function(ev) {
					ev.preventDefault()
					var $thumb = $(ev.currentTarget)
					var $link = $thumb.find('.simplegallery-thumb')
					$(element).find('.thumbnail').removeClass('active')
					$thumb.addClass('active')
					$(element).find('#simplegallery-big-photo').attr('src', $link.attr('href'))
				})
			},
		}
	})
