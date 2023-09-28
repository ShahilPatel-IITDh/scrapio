
	<div class="popover-content <%= options.mobileClass %>" style="width: <%=options.width %>px; max-width:<%=options.maxWidth %>px; max-height: <%=options.maxHeight %>px; ">
		<% if (options.showCloseButton) { %>
	        <a href="#close" class="icon close-btn"><i class="icon-close"></i></a>
	    <%}%>
	    <% if (options.showCta) { %>
	        <a href="#close" class="cta"><%= options.ctaText %></a>
	    <%}%>
		<% if (options.advancedCta) { %>
			<% _.each(options.advancedCta, function(value, key, list) { %>
				<a href="#<%= key %>" data-action="<%= key %>" class="cta <%= key %>"><%= value %></a>
			<% }); %>
		<% } %>
	    <% if (options.fullScreenButton) { %>
	        <a href="#" class="icon enable-full-screen"><i class="icon-maximize"></i></a>
	    <%}%>
	</div>
    <div class="footer-safe-area"></div>
