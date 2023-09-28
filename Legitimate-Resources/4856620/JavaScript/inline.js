
	$(".title").click(function() {
		$(this).toggleClass("active");
		$(".wrapper ul").toggleClass("active");

		if ($(".title").hasClass("active")) {
			$(".toggle_text").text("Clique para fechar");
            $(".internal-system").addClass("redondo");
		} else {
			$(".toggle_text").text("Clique para expandir");
            $(".internal-system").removeClass("redondo");
		}
	});
