
							  {{#each deal}}
								<div class="deal">
								  <a href="{{urlPath permalink}}?&utm_source=slashdot.org&utm_medium=dealfeed-footerfeed&utm_campaign={{slug}}" target="_blank">
								  	<img src="{{main_image}}" alt="" />
								  </a>
								  <p class="title"><a href="{{urlPath permalink}}?&utm_source=slashdot.org&utm_medium=dealfeed-footerfeed&utm_campaign={{slug}}" target="_blank">{{title}}</a></p>
								  <p class="deal-price">{{centConversion price_in_cents}}</p>
								</div>
							  {{/each}}
							