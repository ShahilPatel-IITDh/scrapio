
{{# _.each(arrivalCities, function (city, index) { }}
{{# if (index % 3 === 0) { }}
<div class="od-inspirational-grid-row">
{{# } }}
{{#
var price = 'none';
if (!_.isEmpty(city.price)) {
price = Math.ceil(city.price.amount);
}
}}
<article class="od-inspirational-grid-col"> <figure class="od-inspirational-picture od-inspirational-picture-with-prices inspirational_get_prices_button"
data-iata="{{city.iata}}"
data-geo_node_id="{{city.id}}"
data-city="{{city.name}}"
data-price="{{price}}"
data-position="{{index + 1}}"
data-country="{{city.country}}"
data-country_code="{{city.countryCode}}"> <img class="od-inspirational-picture-default"
style="background-image: url('/images/onefront/destinations/{{ city.iata }}_640x480.jpg'), url('/images/onefront/destinations/XXX_640x480.jpg');"/> <div class="od-inspirational-picture-caption"> <div class="od-inspirational-arrival"> <strong class="od-inspirational-arrival-city">{{city.name}}</strong> <em title="{{city.country}}" class="od-inspirational-arrival-country">{{city.country}}</em> </div> <div class="od-inspirational-arrival-description">
{{city.cityInformation}}
</div> <div class="od-inspirational-prices">
{{# if (!_.isEmpty(city.price)) { }}
<span class="od-inspirational-price-label">dès</span> <span class="od-inspirational-price-text">{{Odigeo.Utils.formatCurrency(price, _.clone(Odigeo.Utils.Currency, {decimalPlaces: 0}))}}</span>
{{# } else { }}
<span class="od-inspirational-price-text">Voir les prix</span>
{{# } }}
</div> </div> </figure> </article>
{{# if (index % 3 === 2) { }}
</div>
{{# } }}
{{# }); }}
