    
    <div class="e_box p_parentBox"  data-ename="父分类" sortid="{{= id}}">
 <div class="e_box p_parent" data-ename="MO-分类标签">
            {{if target}}
            <a href="{{= linkUrl}}" target="_blank" class="e_link p_link">{{= name}}</a>
            {{else}}
            <a href="{{= linkUrl}}" target="_self" class="e_link p_link">{{= name}}</a>
            {{/if}}
            {{if parent}}<i class="e_icon iconfont p_categoryBtn icon-arrow_up js_clickbtn"></i>
            {{else}}<i class="e_icon iconfont p_categoryBtn"></i>
            {{/if}}

        </div>
        <div class="e_link p_linkBox" data-ename="PC-分类标签">
         {{if targetType}}
            <a class="e_title p_title" href="{{= linkUrl}}"  target="_blank" data-ename="分类名称">{{= name}}</a>
              {{else}}
           <a class="e_title p_title" href="{{= linkUrl}}" target="_self" data-ename="分类名称">{{= name}}</a>
           {{/if}}
          {{if parent}}<i class="e_icon iconfont icon-duduyinleappicon1401 p_categoryBtn js_clickbtn" data-ename="分类图标"></i>
            {{else}}<i class="e_icon iconfont p_categoryBtn" data-ename="分类图标"></i>
            {{/if}}
        </div>
        <div class="e_box p_childBox" data-ename="子分类"></div>
    </div>
