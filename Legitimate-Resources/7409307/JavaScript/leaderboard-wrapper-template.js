
<h3 class="for-mobile leaderboard-head">Leaderboard</h3>
 <% if (displayPosition()) { %>
    <h4 class="user-position"><a href="#" class="cta goToPosition">View Position</a> Your position in the leaderboard is: <%= currentUserPosition %></h4>
<% } %>
<div class="leaderboard-table-wrapper">
<table>
	<thead>
		<tr>
			<% _.each(fields, function(field) {
            if(field.caption != "Avatar")%>
				<th><%= field.caption %></th>
			<% }); %>
		</tr>
	</thead>
	<tbody>
	</tbody>
</table>
</div>
<a href="#" class="for-mobile view-leaderboard">View Leaderboard</a>
<a href="#" class="icon for-mobile hide-leaderboard"><i class="icon-close"></i></a>
