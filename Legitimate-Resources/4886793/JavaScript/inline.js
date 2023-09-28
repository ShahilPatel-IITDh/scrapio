
    // Footer - Resources section
    // 5/13/2021
    // Fix links
    $('.footerThree .quickLinks li').each(function( el ) {
        var $this = $(this);
        if($this.text() === "Calculators") {
            $this.html('<a href="/resource-center/calculators" target="_self">Calculators</a>');
        } else if($this.text() === "Videos") {
            $this.html('<a href="/resource-center/videos" target="_self">Videos</a>');
        } else if($this.text() === "Articles") {
            $this.html('<a href="/resource-center/articles" target="_self">Articles</a>');
        } else if($this.text() === "Presentation") {
            $this.html('<a href="/resource-center/presentations" target="_self">Presentations</a>');
        } 
    });
