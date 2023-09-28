
    jQuery(document).ready(function(){
        var links = [
            {
                "bgcolor":"#46a361",
                "icon":"",
                "color":"#ffffff",
            },

                         {
                "tooltip":"Telefonla Ulaşın",
                "url":"tel:05327481841",
                "bgcolor":"#4285f4",
                "color":"#ffffff",
                "icon":""
            },

                        {
                "tooltip":"Whatsapp'tan ulaşın",
                "url":"https://api.whatsapp.com/send?phone=905327481841",
                "bgcolor":"#19701d",
                "color":"#ffffff",
                "icon":""
            },

                    ];
        var options = {
            rotate: true        };
        jQuery('#floatingbtn').jqueryFab(links, options);
    })
