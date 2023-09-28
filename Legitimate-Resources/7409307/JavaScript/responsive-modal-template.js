
    <section class="modal-wrapper <%= size %> <%= effect %> <%= extraClass %>" >
        <% if (hasHeader) { %>
            <div class="modal-header">
            <% if (showCloseButton) { %>
                <a href="#close" class="icon close-btn"><i class="icon-close"></i></a>
                <%}%>
                <span class="modal-header-image <%= headerImageType %>">
                    <%= image %>
                </span>
            </div>
        <%}%>
        <div class="modal-content">
        </div>
    </section>
