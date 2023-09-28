
	<picture><!--[if IE 9]><video style="display: none;"><![endif]-->
<source srcset="https://static.32red.com//img/homepage-header/XL/<%= image_key %>.<%= image_extension %>" media="(min-width: 1920px)" />
<source srcset="https://static.32red.com//img/homepage-header/large/<%= image_key %>.<%= image_extension %>" media="(min-width: 1440px)and (max-width: 1920px)" />
<source srcset="https://static.32red.com//img/homepage-header/medium/<%= image_key %>.<%= image_extension %>" media="(min-width: 1025px) and (max-width: 1440px)" />
<source srcset="https://static.32red.com//img/homepage-header/1400x300/<%= image_key %>.<%= image_extension %>" media="(min-width: 700px) and (max-width: 1025px)" />
<source srcset="https://static.32red.com//img/homepage-header/700x300/<%= image_key %>.<%= image_extension %>" media="(min-width: 300px) and (max-width: 700px)" />
<!--[if IE 9]></video><![endif]-->
<img srcset="https://static.32red.com//img/homepage-header/default/<%= image_key %>.<%= image_extension %>"  /></picture>    <div class="slideshow-text-box <%= box_type %> <%= utype %>">
        <div class="slide-text">
            <h3><%= title %></h3>
            <p><%= text %></p>
            <span class="terms"><%= short_terms %></span>
            <a class="more-info cta <%= link_style %> big" href="<%= link %>"><%= link_text %></a>
            <% if(link2) { %>
                <a class="more-info cta second transparent <%= box_type %> big" href="<%= link2 %>"><%= link_text2 %></a>
            <% } %>
        </div>
    </div>
