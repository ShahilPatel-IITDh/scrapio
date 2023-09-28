document.writeln(`
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <link rel="icon" href="/favicon.ico">
  <meta name="robots" content="noindex">
  <meta name="viewport"
    content="initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, user-scalable=no">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title></title>
  <script type="module" crossorigin src="/assets/index-c1e3102c.js"></script>
  <link rel="stylesheet" href="/assets/index-29557f3b.css">
</head>

<body>
  <div id="app"></div>
  <script src="/bootstrap/js/jquery.js"></script>
  <script src="/bootstrap/js/bootstrap.min.js"></script>
  
  <script>
 
    window.onload = function () {
        document.addEventListener('touchstart', function (event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        });
        document.addEventListener('gesturestart', function (event) {
            event.preventDefault();
        });
    };
 
</script>
</body>

</html>

`);