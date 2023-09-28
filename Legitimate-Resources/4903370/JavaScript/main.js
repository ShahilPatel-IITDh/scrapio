( function ($) {
  "use strict";

  $.widget("pektsekye.productCategoryDropdowns", { 

     
    _create : function () {

      $.extend(this, this.options);       

      this.categoryContainer  = this.element.find('.pcd-category-container');           
      
      this._on({ 
          "change .pcd-select": $.proxy(this.checkSubCategories, this),            
          "click button.pcd-submit": $.proxy(this.submit, this)                                                                              
      }); 

      if (this.preCategories && this.preCategories.rootCategoryIds){
        this.rootCategoryIds = this.preCategories.rootCategoryIds;      
        this.categories = this.preCategories.categories;
                 
        this.addCategorySelect(this.rootCategoryIds); 
                          
        this.preselectDropdowns();                            
      }      
                        
    },


    preselectDropdowns : function(){           
           
      if (this.selectedIds.length){
        var cId,sel;  
        var l = this.selectedIds.length;		  
        for (var i=0;i<l;i++){
          cId = this.selectedIds[i];
          sel = this.element.find('.pcd-select:eq('+i+')');
          sel.val(cId);
          if (this.categories[cId] && this.categories[cId].children){
            sel.change();
          }  
        }          
      }            
    },
      
  
    removeSubCategories : function(element){           
           
      var startRemove = element == undefined ? true : false;
      this.element.find('.pcd-select').each(function() {
        if (startRemove){
          $(this).remove();
        }                 
        if (!startRemove && this == element[0])
          startRemove = true;  
      });
            
    },
 
     
    addCategorySelect : function(categoryIds){
    
      var selectHtml = '<select class="pcd-select"></select>';

      this.categoryContainer.append(selectHtml);         
         
      var select = this.element.find('.pcd-select').last();
      
      select[0].options[0] = new Option(this.categoryDefOptionTitle, '');
 
      var categories = this.categories;
      
      categoryIds.sort(function(a, b){
          var x = categories[a].title.toLowerCase();
          var y = categories[b].title.toLowerCase();
          if (x < y) return -1;
          if (x > y) return 1;
          return 0;         
      });
      
      var cId;  
      var l = categoryIds.length;		  
      for (var i=0;i<l;i++){
        cId = categoryIds[i];
        select[0].options[i+1] = new Option(this.categories[cId].title, cId);
      }    
    
    },


    checkSubCategories : function(e){
      var element = $(e.target)

      this.removeSubCategories(element);

      var cId = element.val();
      if (cId != ''){     
        if (this.categories[cId].children){
          this.addCategorySelect(this.categories[cId].children);
        } else {
          this.submitCategory(cId);                
        }
      }        
    },  
      
      
    getLastSelectedCategory : function(){
    
      var categoryId = null;
      
      var widget = this;
      this.element.find('.pcd-select').each(function() {
        var cId = $(this).val();
        if (cId && widget.categories[cId].url){
          categoryId = cId;
        }   
      });
      
      return categoryId;
    },
    
          
    submit : function(){     
      var categoryId = this.getLastSelectedCategory();
      if (categoryId){
        this.submitCategory(categoryId);
      }
    },
    
    
    submitCategory : function(categoryId){   
      window.location.href = this.categories[categoryId].url;     
    }	                    
    
            
  });
  
})(jQuery);            













