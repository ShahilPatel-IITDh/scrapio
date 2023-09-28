// Compte Ã  Rebours

(function updateTimer() {
        var timers = document.querySelectorAll(".js-timer");
 
        for (var i = 0; i < timers.length; i++) {
            var timer = timers[i];
            var end = timer.dataset.end;
            var v = timer.querySelectorAll(".js-timer_auto")
            var rest = end - Date.now();
 
            // Plus de 3 jours restant
            if (rest > 259200000) {
                // JOURS
                var days = Math.floor(rest / 1000 / 60 / 60 / 24);
                v[0].querySelector(".js-timer_value").innerHTML = days;
                v[0].querySelector(".js-timer_unit").innerHTML = "Jours";
                rest = rest - days * 1000 * 60 * 60 * 24;
                // HEURES
                var hours = Math.floor(rest / 1000 / 60 / 60);
                v[1].querySelector(".js-timer_value").innerHTML = hours > 9 ? hours : "0" + hours;
                v[1].querySelector(".js-timer_unit").innerHTML = "Heures";
                rest = rest - hours * 1000 * 60 * 60;
                // MINUTES
                var minutes = Math.floor((rest / 1000 / 60) % 60);
                v[2].querySelector(".js-timer_value").innerHTML = minutes > 9 ? minutes : "0" + minutes;
                v[2].querySelector(".js-timer_unit").innerHTML = "Minutes";
                rest = rest - minutes * 1000 * 60 * 60;
            }
            // Moins de 3 jours restant
            else {
                // HEURES
                var hours = Math.floor(rest / 1000 / 60 / 60);
                v[0].querySelector(".js-timer_value").innerHTML = hours > 9 ? hours : "0" + hours;
                v[0].querySelector(".js-timer_unit").innerHTML = "Heures";
                rest = rest - hours * 1000 * 60 * 60;
                // MINUTES
                var minutes = Math.floor(rest / 1000 / 60);
                v[1].querySelector(".js-timer_value").innerHTML = minutes > 9 ? minutes : "0" + minutes;
                v[1].querySelector(".js-timer_unit").innerHTML = "Minutes";
                rest = rest - minutes * 1000 * 60;
                // SECONDES
                var seconds = Math.floor(rest / 1000);
                v[2].querySelector(".js-timer_value").innerHTML = seconds > 9 ? seconds : "0" + seconds;
                v[2].querySelector(".js-timer_unit").innerHTML = "Secondes";
                rest = rest - seconds * 1000;
            }
        }
        setTimeout(updateTimer, 100);
    })();