
    <div class="parallax">
        <div class="markets-wrapper">            
            <div class="single-market-wrapper">
                <img src="https://static.32red.com/img/easter-egg-hunt/eggs/promo1.png" alt="">
            </div>            
            <%  var day=0;  for(var i=0; i < data.length; i++){  day++;                                                                           
                    var index = "day"+day;                                      
                    var promoStatus = dayStatus(data[i][index]['params']);                                                      
            %>
                    <div class="single-market-wrapper <%= data[i][index]['params']['lastPromo'] %> <%= promoStatus %>">
                        <img src="https://static.32red.com/img/easter-egg-hunt/eggs/<%= data[i][index]['params']['img-src'] %>" alt="">
                        <div class="one-cta-wrapper egg-<%= day %> <%= promoStatus %> <%= day %>">
                            <a href="#" data-page="<%= data[i][index]['params']['link'] %>" data-popup="<%= data[i][index]['params']['popup'] %>" class="cta market-cta <%= index %> <%= data[i][index]['params']['isHidden'] %>"><%= data[i][index]['content'] %></a>
                        </div>
                    </div>
            <% } %>
        </div>
        <div id="group1" class="parallax__group">
            <div class="parallax__layer parallax__layer--back">
                <img src="https://static.32red.com/img/easter-egg-hunt/background.png">
            </div>
        </div>

        <div id="group2" class="parallax__group">
            <div class="parallax__layer parallax__layer--base">
                <img src="https://static.32red.com/img/easter-egg-hunt/middleground.png">
            </div>
        </div>
    </div>
    <a href="#" class="btn" id="next-market"><i class="icon-arrow-right"></i></a>
    <a href="#" class="btn" id="prev-market"><i class="icon-arrow-left"></i></a>
