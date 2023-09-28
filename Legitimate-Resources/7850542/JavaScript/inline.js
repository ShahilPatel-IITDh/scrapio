
                
        
        function joerichards_story_minting_wallet(amount) {
            Swal.fire({
              title: "Loading...",
                          
              html: '<strong>'+(amount *2)+' Agent1 NFTs</strong> are waiting for you. <br />Check your wallet and confirm.<br /><br /><img class="img-fluid" src="/static/img/agent1_train_500k.gif">',
              
                            allowOutsideClick: false,              
              showConfirmButton: false,              
              /*
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              */
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            });               
        }        
        
        function joerichards_story_minting(amount) {
            Swal.fire({
              title: "Minting a brand new life",
                          
              html: 'Your new life & adventure is about to begin. <br />Inserting <strong>'+(amount *2)+' Agent1 NFTs</strong> into the blockchain...<br /><br /><img class="img-fluid" src="/static/img/agent1_train_500k.gif">',
              
                            allowOutsideClick: false,              
              showConfirmButton: false,              
              /*
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              */
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            });               
        }
        
        function joerichards_story_minting_failed(amount) {
            Swal.fire({
              title: "Mission failed!",
              html: 'Your Agent1s <strong>did not make it</strong> to the blockchain.<br /><br /><img class="img-fluid" src="/static/img/anim_pixel/blue_lines_fail.gif">',
                            allowOutsideClick: false,              
              showConfirmButton: true,
              /*
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              */
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            });               
        }
        
        function joerichards_story_minting_success(amount) {
            Swal.fire({
              title: "Mission accomplished!",
              html: '<strong>'+(amount *2)+' Agent1s</strong> were inserted into the blockchain, and they are now at your disposal.<br /><br /><img class="img-fluid" src="/static/img/anim_pixel/mr_j_uploading_org.gif">',
                            allowOutsideClick: false,              
              showConfirmButton: true,
              showDenyButton: true,
              confirmButtonText: 'Verify them on Discord',
              denyButtonText: 'Ok',
              /*
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              */
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              },
              customClass: {
                  cancelButton: 'joerichards_pixel_font',
                  confirmButton: 'joerichards_pixel_font',
                  denyButton: 'joerichards_pixel_font',
              },
            }).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
        window.open('https://discord.com/invite/agent1', '_blank');
  } else if (result.isDenied) {
      }
});               
        }
      