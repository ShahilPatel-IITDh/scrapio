
	! function () {
	    function supportsSVG() {
	        return !!document.createElementNS && !! document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect
	    }
	    if (supportsSVG()) document.documentElement.className += ' svg'
	}()
