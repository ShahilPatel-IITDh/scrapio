
	<% if ( games.length > 0) { %>
   		<a href="#<%= getHref() %>" data-category-id="<%= id %>"><%= getDisplayName() %> <span class="games-no">(<%= games.length %>)</span> <small><%= subtitle %></small></a>
    <% } %>
