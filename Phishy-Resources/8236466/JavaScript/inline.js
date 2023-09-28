
  function loadOneTap(options={})
  {
    return new Promise((resolve, reject) => {
      var opts = Object.assign({}, {
        client_id:'743172720058-qobj9nhtu20b5tjbtjg7fho4n9s8bbmk.apps.googleusercontent.com',
        auto_select:true, cancel_on_tap_outside:false, prompt_parent_id:'ff-onetap-popup', context:'signin',
        callback:function(response)
        {
          var payload = jwt_decode(response.credential);
          resolve(payload);
        }
      }, options);
      google.accounts.id.initialize(opts);
      google.accounts.id.prompt(notif=>{
        if(notif.isNotDisplayed() || notif.isSkippedMoment()) 
        {
          reject(notif);
        }
        else
        {
          showOneTap();
        }
      });
    }).then(rs=>{
      hideOneTap();
      return rs;
    }).catch(err=>{
      hideOneTap();
      throw err;
    });
  }
  function showOneTap()
  {
    jQuery('#ff-onetap-popup').addClass('active'); 
    jQuery('#ff-onetap-overlay').addClass('active');
    jQuery('body').css('overflow', 'hidden');
  }

  function hideOneTap()
  {
    jQuery('#ff-onetap-popup').removeClass('active'); 
    jQuery('#ff-onetap-overlay').removeClass('active');
    jQuery('body').css('overflow', 'auto');
  }
