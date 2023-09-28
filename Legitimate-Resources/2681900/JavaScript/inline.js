
                    jQuery(function() {
                                                
                        jQuery(".tooltips img").closest(".tooltips").css("display", "inline-block");
                    
                        new jQuery.Zebra_Tooltips(jQuery('.tooltips').not('.custom_m_bubble'), {
                            'background_color':     '#dd9933',
                            'color':				'#ffffff',
                            'max_width':  250,
                            'opacity':    0.95, 
                            'position':    'center'
                        });
                        
                                            
                    });
                