
        function checkFields(){
            let rulesaccept = $('#rulesaccept')
            if($('#rulesaccept').prop('checked')){
                return true
            }
            $('#rulesaccept').parent('label').css('borderColor', 'red')
            return false
        }

        // check min max value Home page
        let input = document.querySelector(".check-input-min-max");

        let status_min = false;
        let status_max = false;
        let minError = $(".error-min-value")
        let maxError = $(".error-max-value")
        let textMin = minError.attr("data-text")
        let textMax = maxError.attr("data-text")
        let submitButton = $(".dis-btn-ra")

        input.addEventListener("input", function(e) {

            let minValue_ra = document.querySelector(".ra-first-min").getAttribute("data-first-min-value");
            let maxValue_ra = document.querySelector(".ra-first-max").getAttribute("data-first-max-value");

            let value = e.target.value;

            minValue_ra = parseFloat(minValue_ra);
            maxValue_ra = parseFloat(maxValue_ra);

            if(value < minValue_ra ){
                if(!status_min){
                    minError.text(textMin + ' ' + minValue_ra)
                    minError.css('display', 'block')
                    status_min = true;
                }
            }else {
                minError.css('display', 'none')
                status_min = false;
            }

            if(value > maxValue_ra){
                if(!status_max){
                    maxError.text(textMax + ' ' + maxValue_ra)
                    maxError.css('display', 'block')
                    status_max = true;
                }
            }else {
                maxError.css('display', 'none')
                status_max = false;
            }

            if (value < minValue_ra || value > maxValue_ra) {
                submitButton.addClass('disabled-button-ra')
            }else {
                submitButton.removeClass('disabled-button-ra')
            }
        });

    