
    <section id="<%= id %>" class="games-section" data-nav="right">
        <% if (!gameplayAreaGames) { %>
        <div class="games-header clearfix">
            <h2><%= name %><span class="total-games"><%= totalGames %></span><%= categoryNameSuffix %></h2>
            <div class="games-pagination">
                <a href="#" class="arrow prev" data-action="prev"><i class="icon-arrow-left"></i></a>
                <a href="#" class="arrow next" data-action="next"><i class="icon-arrow-right"></i></a>
                <% if (displayViewAllLink) { %>
                    <a href="<%= viewAllSlug %>" class="view-all all-games"><span class="more">View all</span></a>
                <% } %>
                
            </div>
        </div>
        <% } %>
        <div class="grid-wrapper <%= gridHeight %>">
            <div class="grid games-list template-<%= grid %>">
            </div>
            <a href="#" class="side-arrows arrow prev" data-action="prev"><i class="icon-arrow-left"></i></a>
            <a href="#" class="side-arrows arrow next" data-action="next"><i class="icon-arrow-right"></i></a>
        </div>
    </section>
