
	<% _.each(fields, function(caption, i) {
        if( i != "Avatar"){
            if (currentUser == true)  { %>
                <td name="currentUser" class="currentUser" >
            <% } else {	%>
                <td>
            <% }

            if(i == "Player"){ %>
                <img class="avatar" src="https://static.32red.com/avatars/myAccount_avatar_<%= fields['Avatar']%>.svg"> <%= caption %></td>
            <%} else{%>
                <%= caption  %></td>
            <% }
        }
    }); %>
