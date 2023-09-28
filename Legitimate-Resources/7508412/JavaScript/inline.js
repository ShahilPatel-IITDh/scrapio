
	$(".submit").on("click", function () {
	    if($(".expForm").valid() == true){
	        var answer = confirm("您確認要送出您所填寫的資訊嗎？");
	        if (answer){
	            grecaptcha.execute();
	        }
	    }
	})

	window.onSubmit = () => {
		$(".expForm").submit();
	}

	$.validator.addMethod("languageName", function(value) {
		// regEx = /^[\u3300-\u9fff\uf900-\ufaff]{2,}$/;
		regEx = /^[a-zA-Z\u0020\u4e00-\u9fa5]{2,}$/;
		if (!regEx.test(value))
			return false;
		else if (regEx.test(value))
			return true;
	}, 'Please enter "anto"!');


	$(".expForm").validate({
		ignore:[],
		rules:{
			name: {
				required: true,
				languageName : true
			},
			age: {
				required: true,
			},
			phone: {
				required: true,
				// minlength: 10,
				// maxlength: 10,
			},
			email: {
				required: true,
			},
			country: {
				required: true
			},
			state: {
				required: true
			},
			privacy: {
				required: true
			}
		},
		messages: {
			name: {
				required: "必填欄位"
			},
			age: {
				required: "必填欄位"
			},
			phone: {
				required: "必填欄位",
				// minlength: "請輸入正確的電話",
				// maxlength: "請輸入正確的電話",
			},
			email: {
				required: "必填欄位",
				email: "請輸入正確的email",
			},
			country: {
				required: "必填欄位"
			},
			state: {
				required: "必填欄位"
			},
			privacy: {
				required: "必填欄位"
			}
		},
		errorPlacement: function(label, element) {
	        // label.addClass('contact-form-error');
	        // label.insertBefore(element);

	        var $els = document.getElementsByName(element[0].name)
	        $els.forEach( function(el, i) {
	        	$(el).addClass("error")
	        });
	    },
	    wrapper: 'div'
	})

	var app = new Vue({
		el: '#myApp',
			data: {
			country: '',
			countries: '',
			state: '',
			states: ''
		},
		methods: {
			async getCountries(){
				axios.get('get_store.php', {
					params: {
						request: 'country'
					}
				})
				.then(function (response) {
					app.countries = response.data;

					app.states = '';
					app.state = '';
				});

			},
			async getStates(){
				$("select[name='state']").css("pointer-events", "none")
				axios.get('get_store.php', {
					params: {
						request: 'store',
						country_id: this.country
					}
				})
				.then(function (response) {
					Vue.set(app, 'states', response.data);
					// app.states = response.data;
					app.state = '';

					$("select[name='state']").css("pointer-events", "auto")
				});
			}
		},
		created: function(){
			this.getCountries();
		}
	});




	$("#a1").on("click", function () {
		if (this.checked) {
			$(".privacy-fancy").fadeIn(600)
			$("body").addClass("is-lock")
		}
	})


	$(".privacy-fancy-article .close, .fancy-close-block").on("click", function () {
		$(".privacy-fancy").fadeOut(600)
		$("body").removeClass("is-lock")
	})


	$(document).keyup(function(e) {
	    if (e.key === "Escape") {
	    	$(".privacy-fancy").fadeOut(600)
	    	$("body").removeClass("is-lock")
	    }
	});
