// Geody Home Config - Favorite Links

var shwFav=true; // Show Favorite Links
var startshwFav=true; // Show Favorite Links at startup (if shwFav=true)
var favNewWin='_self'; // New Window behavior: '_self': same window, '_blank': a new window for every instance, 'new': reuse the same window for all links
if (window.innerWidth>smlwinw) {var favsprow=5;} else {var favsprow=0;} // Favorite links per row (0: No limit)
var favs=new Array(); // Title, Web Address (URL), Image (suggested size: 32 x 32 pixels)
i=0;
++i; favs[i]=new Array('Fake ID Generator','https://www.elfqrin.com/fakeid.php','img/websites/fav_id-card_1.png');
++i; favs[i]=new Array('Discard Credit Card Generator','https://www.elfqrin.com/discard_credit_card_generator.php','img/websites/fav_card_discard.png');
++i; favs[i]=new Array('Card BIN Generator','https://www.elfqrin.com/credit_card_bin_generator.php','img/websites/fav_card_bin.png');
++i; favs[i]=new Array('Personal ID Generator','https://www.elfqrin.com/usssndriverlicenseidgen.php','img/websites/fav_id-card_2.png');
++i; favs[i]=new Array('Plate<br />Car License Generator','https://www.elfqrin.com/uscarlicenseplates.php','img/websites/fav_car_ylw.png');
++i; favs[i]=new Array('Password Generator','https://www.elfqrin.com/pwgen.php','img/websites/fav_password.png');
++i; favs[i]=new Array('Random Numbers Generator','https://www.elfqrin.com/rndgen.php','img/websites/fav_dice.png');
++i; favs[i]=new Array('Anonymity Check','https://www.elfqrin.com/binfo_check_anonymity.php','img/websites/fav_mask.png');

var favsn=i; // Total Number of Favorite Links
