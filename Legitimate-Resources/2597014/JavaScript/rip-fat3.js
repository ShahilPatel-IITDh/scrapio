(function() {

  // FAT RIP
  // gleuch, 31 jul 2015
  var id = 'rip-' + (Math.random() * 1000000);

  document.write('<div id="' + id + '-countdown" style="background-color: #FF0; padding: 35px; border-radius: 15px; margin: 10px 0;"><h3 style="color: #F0F; font-family: Arial,Helvetica,sans-serif; font-size: 18px; text-transform: uppercase; line-height: 1.0em; margin: 0; padding: 0 0 10px 0; text-align: center">Days since F.A.T. Lab stopped making cool shit.</h3><p style="color: #F0F; font-family: Arial,Helvetica,sans-serif; font-size: 48px; text-transform: lowercase; line-height: 1.0em; margin: 0; padding: 10px 0 10px 0; text-align: center"><span id="' + id + '-countdown-clock">0</span> <small style="font-size: 50%; font-weight: bold;">:\'(</small></p></div>');

  var stopDate = new Date('2015-07-31T23:59:59'),
      el = document.getElementById(id + '-countdown-clock'),
      intv = setInterval(function() {
        var curDate = new Date(),
            days = Math.floor(((curDate - stopDate) / (3600 * 24)) * 100) / 100000;
        el.innerHTML = days + ' day' + (days != 1 ? 's' : '');
      }, 100);

      el.innerHTML = '&ndash; days';


})();