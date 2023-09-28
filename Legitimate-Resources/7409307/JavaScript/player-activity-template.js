
	<p class="popover-header">Player Activity</p>
	<p style="margin-top: 3em;">Player Activity</p>
	<div class="table-wrapper">
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th>Time spent</th>
			</tr>
		</thead>
		<tfoot>
			<tr>
				<td>Total</td>
				<td><%= timeInWords(TotalTimeInSeconds) %></td>
			</tr>
		</tfoot>
		<tbody>
<% _.each(Entries, function(Entry) { %>
	<tr>
		<td><%= Entry.date %></td>
		<td><%= timeInWords(Entry.time) %></td>
	</tr>
<% }); %>
		</tbody>
	</table>
	</div>
