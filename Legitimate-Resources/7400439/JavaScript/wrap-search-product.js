
	<div class="wrap-search-product">
		{{#if categories}}
		<div class="categories">
			<div class="head">Categories</div>
			<div class="list">
				{{#each categories}}
				<div class=""><a href="{{url}}"><div class="title">{{{title}}}</div></a></div>
				{{/each}}
			</div>
		</div>
		{{/if}}

		{{#if products}}
		<div class="products">
			<div class="head"><a href="https://cryptogeekstore.com?post_type=product&s={{q}}">Top matching products</a></div>
			<div class="list">
				{{#each products}}
				<a href="{{url}}">
					<div class="item">
						<div class="box-img"><img src="{{img}}" alt=""></div>
						<div class="box-title">
							<div class="title">{{{title}}}</div>
							<div class="price">{{{price}}}</div>
						</div>
					</div>
				</a>
				{{/each}}
			</div>
		</div>
		{{/if}}

		{{#if countShow}}
		<div class="view-all 2222"><a href="https://cryptogeekstore.com?post_type=product&s={{q}}">View all<span>({{count}})</span></a></div>
		{{/if}}
	</div>
    