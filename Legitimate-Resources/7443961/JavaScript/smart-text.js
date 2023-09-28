String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};
$( document ).ready(function() {
    var st = {
        first_name:"",
        company:"",
        st1:"",
        st2:"",
        st3:"",
        st4:"",
        st5:""
    };
    
    /* Define function for escaping user input to be treated as 
        a literal string within a regular expression */
    const escapeRegExp = function (string){
        return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
        
    /* Define functin to find and replace specified term with replacement string */
    const replaceAll = function (str, term, replacement) {
        return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
    }    
    
    const getUrlParameter = function (name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };   
    
    const getStorage = function(key){
        if (typeof(Storage) !== "undefined") {
          return localStorage.getItem(key)
        } else {
          return ""
        }        
    }

    const setStorage = function(key,value){
        if (typeof(Storage) !== "undefined") {
          return localStorage.setItem(key,value)
        } else {
          return ""
        }        
    }

    
    /* this will set the st object */
    const set_st = function(){
        if(Thinkific.current_user!=null){
            st.first_name = Thinkific.current_user.first_name;
            setStorage("first_name",st.first_name);
        } else {
            //try storage or query param
            if(getUrlParameter("first_name")!=""){
                st.first_name=getUrlParameter("first_name");
                setStorage("first_name",st.first_name);
            } else {
                // check storage
                st.first_name = getStorage("first_name");
            }
        }
        if(getUrlParameter("company")!=""){
            st.company=getUrlParameter("company");
            setStorage("company",st.company);
        } else {
            // check storage
            st.company = getStorage("company");
        }
        if(getUrlParameter("st1")!=""){
            st.st1=getUrlParameter("st1");
            setStorage("st1",st.company);
        } else {
            // check storage
            st.st1 = getStorage("st1");
        }  
        if(getUrlParameter("st2")!=""){
            st.st2=getUrlParameter("st2");
            setStorage("st2",st.company);
        } else {
            // check storage
            st.st2 = getStorage("st2");
        }  
        if(getUrlParameter("st3")!=""){
            st.st3=getUrlParameter("st3");
            setStorage("st3",st.company);
        } else {
            // check storage
            st.st3 = getStorage("st3");
        }        
        
        if(getUrlParameter("st4")!=""){
            st.st4=getUrlParameter("st4");
            setStorage("st4",st.company);
        } else {
            // check storage
            st.st4 = getStorage("st4");
        }        
      
        if(getUrlParameter("st5")!=""){
            st.st5=getUrlParameter("st5");
            setStorage("st5",st.company);
        } else {
            // check storage
            st.st5 = getStorage("st5");
        }  
      
        console.log("ST",st);
    }
    
    const smarttext = function(){
        // check for query parameters and store
        
        // supported first_name, company, st1, st2, st3, st4, st5
        
        // set smarttext tags object
        set_st();
        
        // find smarttext in html and replace
        // <smarttext text="Some text with {{first_name}}"/> or can wrap
        // <smarttext text="Some text with {{first_name}}">Swap this</smarttext>
            var st_attr = "text";
            if(getUrlParameter("v")=="1"){
                st_attr = "text";
                setStorage("smarttext_v","text");
            } else {
                if(getStorage("smarttext_v")=="text"){
                    st_attr = "text";
                }
            }

            if(getUrlParameter("v")=="2"){
                st_attr = "text-2";
                setStorage("smarttext_v","text-2");
            } else {
                if(getStorage("smarttext_v")=="text-2"){
                    st_attr = "text-2";
                }
            }
            if(getUrlParameter("v")=="3"){
                st_attr = "text-3";
                setStorage("smarttext_v","text-3");
            } else {
                if(getStorage("smarttext_v")=="text-3"){
                    st_attr = "text-3";
                }
            }
            //console.log("st_attr", st_attr);
            var st_string = "";
            if ($(this).attr(st_attr) !== undefined){
                st_string = $(this).attr(st_attr);    
            } else {
                if ($(this).attr("text") !== undefined){
                    st_string = $(this).attr("text");  
                }
            }          
        $("smart").each(function(){
            // check which version to use for abc testing
            

            //console.log("st_attr", st_attr);
            var st_string = "";
            if ($(this).attr(st_attr) !== undefined){
                st_string = $(this).attr(st_attr);    
            } else {
                if ($(this).attr("text") !== undefined){
                    st_string = $(this).attr("text");  
                }
            }
            
            if(st_string !=""){
                console.log("Found smarttext",st_string);
                var new_html = st_string;
                if(st.first_name != "" && st.first_name!=null){
                    new_html = replaceAll(new_html, '{{first_name}}', st.first_name);
                }
                if(st.company != "" && st.company != null){
                    new_html = replaceAll(new_html, '{{company}}', st.company);
                }
                if(st.st1 != "" && st.st1!=null){
                    new_html = replaceAll(new_html, '{{st1}}', st.st1);
                }
                if(st.st2 != "" && st.st2!=null){
                    new_html = replaceAll(new_html, '{{st2}}', st.st2);
                }
                if(st.st3 != "" && st.st3!=null){
                    new_html = replaceAll(new_html, '{{st3}}', st.st3);
                }
                if(st.st4 != "" && st.st4!=null){
                    new_html = replaceAll(new_html, '{{st4}}', st.st4);
                }
                if(st.st5 != "" && st.st5!=null){
                    new_html = replaceAll(new_html, '{{st5}}', st.st5);
                }
                
                console.log("newhtml",new_html);
                // make sure we can replace everything otherwise do nothing
                if(new_html.indexOf("{{first_name}}") == -1 && new_html.indexOf("{{company}}") == -1 && new_html.indexOf("{{st1}}") == -1 && new_html.indexOf("{{st2}}") == -1 && new_html.indexOf("{{st3}}") == -1 && new_html.indexOf("{{st4}}") == -1 && new_html.indexOf("{{st5}}") == -1){
                    $(this).html(new_html);    
                }                
            }

            
            
        });
        $(".fr-view .smarttext").each(function(){
            var st_string = "";
            if ($(this).data(st_attr) !== undefined){
                st_string = $(this).data(st_attr);    
            } else {
                if ($(this).data("text") !== undefined){
                    st_string = $(this).data("text");  
                }
            }   
            if(st_string !=""){
                console.log("Found smarttext",st_string);
                var new_html = st_string;
                if(st.first_name != "" && st.first_name!=null){
                    new_html = replaceAll(new_html, '{{first_name}}', st.first_name);
                }
                if(st.company != "" && st.company != null){
                    new_html = replaceAll(new_html, '{{company}}', st.company);
                }
                if(st.st1 != "" && st.st1!=null){
                    new_html = replaceAll(new_html, '{{st1}}', st.st1);
                }
                if(st.st2 != "" && st.st2!=null){
                    new_html = replaceAll(new_html, '{{st2}}', st.st2);
                }
                if(st.st3 != "" && st.st3!=null){
                    new_html = replaceAll(new_html, '{{st3}}', st.st3);
                }
                if(st.st4 != "" && st.st4!=null){
                    new_html = replaceAll(new_html, '{{st4}}', st.st4);
                }
                if(st.st5 != "" && st.st5!=null){
                    new_html = replaceAll(new_html, '{{st5}}', st.st5);
                }
                
                //console.log("newhtml",new_html);
                // make sure we can replace everything otherwise do nothing
                if(new_html.indexOf("{{first_name}}") == -1 && new_html.indexOf("{{company}}") == -1 && new_html.indexOf("{{st1}}") == -1 && new_html.indexOf("{{st2}}") == -1 && new_html.indexOf("{{st3}}") == -1 && new_html.indexOf("{{st4}}") == -1 && new_html.indexOf("{{st5}}") == -1){
                    $(this).html(new_html);    
                } else {
                    $(this).html("");
                }               
            }          
        });
    }
    
    const inject_smarttext_css= function(){
        
        var f = document.getElementsByTagName("script")[0];

           var j3 = document.createElement("link");
           j3.rel = "stylesheet";
           j3.href = "https://assets.superpowerups.com/smart-text.css";
           f.parentNode.insertBefore(j3, f);
   }     
    
    // Course player
    if(typeof(CoursePlayerV2) !== 'undefined') {
      var w_video = null;      
      CoursePlayerV2.on('hooks:contentDidChange', function(data) {
        //console.log(data)
        //console.log("checking for timecodes");
        // need to delay for text part of video lesson
        setTimeout(function(){
            window._wq = window._wq || [];
            _wq.push({ id: "_all", onReady: function(video) {
              //console.log("Got Wistia handle", video);
               w_video = video;
            }});            
            //console.log($(".fr-view u"));
            $(".fr-view u").each(function(){
               var timecode_text = $(this).text();
               timecode_text = timecode_text.trim();
               console.log(timecode_text);
               if(timecode_text.search(/^(0?[0-9]|[0-9]):[0-5][0-9]:[0-5][0-9]$/)!=-1){
                   console.log("matched hh:mm:ss");
                   $(this).html("<chapter data-timecode='"+timecode_text+"'>"+timecode_text+"</chapter>")
               } else {
                 if(timecode_text.search(/^(0?[0-9]|[0-9]):[0-5][0-9]$/)!=-1){
                     console.log("matched mm:ss");
                     $(this).html("<chapter data-timecode='"+timecode_text+"'>"+timecode_text+"</chapter>")

                 }
                 if(timecode_text.search(/[0-5][0-9]:[0-5][0-9]$/)!=-1){
                     console.log("matched mm:ss");
                     $(this).html("<chapter data-timecode='"+timecode_text+"'>"+timecode_text+"</chapter>")

                 }              
                 
               }              
               
            });
            // replace links
            $(".fr-view a").each(function(){
               var href = $(this).attr("href");
               href = href.replaceAll("{{email}}",Thinkific.current_user.email);
               href = href.replaceAll("{{id}}",Thinkific.current_user.id);
               href = href.replaceAll("{{last_name}}",Thinkific.current_user.last_name);
               href = href.replaceAll("{{first_name}}",Thinkific.current_user.first_name);
               $(this).attr("href",href);
            });          
            $("chapter").click(function(){
               //get timecode
               var timecode = $(this).data("timecode");
               //console.log(timecode);
               var times = timecode.split(":");
               var seconds = 0;
               //convert to seconds               
               if(times.length==2){
                   //mm:ss
                   seconds = (parseInt(times[0])*60)+parseInt(times[1])
               }
               if(times.length==3){
                   //hh:mm:ss
                    seconds = (parseInt(times[0])*60*60)+(parseInt(times[1])*60)+parseInt(times[2])
               }
               console.log(seconds);
                //console.log(current_src);
                //console.log(new_src)
               // replace ifrme 
                if($("#content-inner iframe").length==0){
                    // wistia
                    if(w_video != null){
                      w_video.time(seconds);
                    }
                } else {
                    // proxy
                  var current_src = $("#content-inner iframe").attr("src");
                  var new_src = current_src.replace("time=","timereplaced=") + "&time=" + seconds;
                                  
                  $("#content-inner iframe").attr("src",new_src);
                }              
               
               $("#content-inner").scrollTop(0);
            });
            smarttext();
            
        }, 500)        
        
        
      });
      inject_smarttext_css();
    } else {
        // not course player
        smarttext();
    }

    
});