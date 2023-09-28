WoLang = {
   group:null,
   langs: {
       "text":{
           "compose":{up:"Up", down:"Down", remove:"Remove", text:"Text", image:"Pic", audio:"Audio",attachment:"Attachment","You really want to remove?":"You really want to remove?",plaintext:"Plain Text",filename:"File name"},
           "user":{error_empty:"Username cannot be empty", error_short:"Too short", error_name_invalid:"Username must be 2-10 alphanumeric string", error_password_not_same:"Two passwords must be same", error_password_empty:"password cannot be empty"}
       }
   },
   setGroup: function(group) {
    this.group=group
   },
   _:function(str){
     return this.langs['text'][this.group][str]
   }
};

WoUser = {

    };

WoUser.notificationCount = -2