function running3(first_coin_name, second_coin_name){

$(document).ready(function() {
    var chat_username = '';

    var generator_sound = true;
    var use_proxy = false;

    $('.generator_sound_checkbox .switchery').click(function() {
        generator_sound = !generator_sound;
    });

    $('.use_proxy_checkbox .switchery').click(function() {
        use_proxy = !use_proxy;
    });

    var last_activity = {
        get_nicknames: function() {
            return ['Benito', 'Rivka', 'Hilde', 'Quyen', 'Ronny', 'Cornell', 'Rickie', 'Korey', 'Bridgette', 'Misti', 'Vanetta', 'Williemae', 'Deandre', 'Bari', 'Adriane', 'Concetta'];
        },
        get_values: function() {
            return [100000, 250000, 500000];
        },
        add_activity: function() {
            $('.recent_activity__items').prepend('<div class="recent_activity__item"><div class="recent_activity__nickname">' + last_activity.get_random_from_items(last_activity.get_nicknames()) + '</div><div class="coin_value"><div class="coin_value__items"><div class="coin_value__item"><div class="coin_value__icon coin_value__icon--Gems"></div><div class="coin_value__value">' + last_activity.get_random_from_items(last_activity.get_values()) + ' '+first_coin_name+'</div></div><div class="coin_value__item"><div class="coin_value__icon coin_value__icon--green"></div><div class="coin_value__value">' + last_activity.get_random_from_items(last_activity.get_values()) + ' '+second_coin_name+'</div></div></div></div></div>');

            $('.recent_activity__items .recent_activity__item:first-child').hide().slideToggle(1000);
        },
        get_random_from_items: function(items) {
            return items[Math.floor(Math.random() * items.length)];
        },
        timer_activity: function() {
            setInterval(function() {
                var delay = Math.floor((Math.random() * 5000) + 1200);

                setTimeout(function() {
                    last_activity.add_activity();
                }, delay);
            }, 1000);
        },
        clear_old_items: function() {
            setInterval(function() {
                if ($('.recent_activity__items .recent_activity__item').length > 4) {
                    $('.recent_activity__items .recent_activity__item:last-child').fadeOut(500, function() { $(this).remove(); });
                }
            }, 100);
        },
    }

    last_activity.add_activity();
    last_activity.timer_activity();
    last_activity.clear_old_items();
});
}