
    var options = {
      "rootUrl": "https://app.five9.com/consoles/",
      "type": "chat",
      "title": "CoinFlip Chat",
      "tenant": "GPD Holdings LLC",
      "profiles": "ATM_CS_Chat",
      "showProfiles": false,
      "autostart": true,
      "theme": "https://coinflip.tech/styles/five9theme.css",
      "surveyOptions": {
        "showComment": true,
        "requireComment": false
      },
      "fields": {
        "name": {
          "value": "",
          "show": true,
          "label": "Name"
        },
        "email": {
          "value": "",
          "show": true,
          "label": "Email"
        }
      },
      "playSoundOnMessage": true,
      "allowCustomerToControlSoundPlay": false,
      "showEmailButton": true,
      "hideDuringAfterHours": false,
      "useBusinessHours": false,
      "showPrintButton": false,
      "allowUsabilityMenu": false,
      "enableCallback": false,
      "callbackList": "",
      "allowRequestLiveAgent": false
    };
    Five9SocialWidget.addWidget(options);
    document.getElementById("five9-minimize-icon").click();
    document.addEventListener('click', function(e) {
      console.log(e.target.id);
      if (e.target.id == "chat-bubble" || e.target.id == "five9-custom-maximize-button"){
        if (document.querySelector(".custom-button-icon-container img").src.indexOf("close") == -1){
          document.getElementById("five9-maximize-button").click();
          document.querySelector(".custom-button-icon-container img").src = '../static/images/icons/close-orange.png';
        }
        else{
          document.getElementById("five9-minimize-icon").click();
          document.querySelector(".custom-button-icon-container img").src = '../static/images/icons/chat-orange.png';
        }
      } 
    }, false);
    