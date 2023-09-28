/*  
 * Plugin Name: WooCommerce Social Media Share Buttons
 * Plugin URI: http://www.toastiestudio.com 
 * Description: The Woocommerce Social Media Share Buttons plugin allows visitors to your woocommerce shop to easily share your products on popular social media platforms.
 * Author: Toastie Studio
 * Author URI: http://www.toastiestudio.com
 *
 * Copyright 2015 Toastie Studio (email : toastiestudio@gmail.com)	
 *
 *     This file is part of WooCommerce Social Media Share Buttons
 *     plugin for WordPress.
 *
 *     WooCommerce Social Media Share Buttons is free software:
 *     You can redistribute it and/or modify it under the terms of the
 *     GNU General Public License as published by the Free Software
 *     Foundation, either version 2 of the License, or (at your option)
 *     any later version.
 *
 *     WooCommerce Social Media Share Buttons is distributed in the hope that
 *     it will be useful, but WITHOUT ANY WARRANTY; without even the
 *     implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
 *     PURPOSE. See the GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with WordPress. If not, see <http://www.gnu.org/licenses/>.
 */


(function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id))
            return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.3";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

(function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
        if (!d.getElementById(id)) {
            js = d.createElement(s);
            js.id = id;
            js.src = p + '://platform.twitter.com/widgets.js';
            fjs.parentNode.insertBefore(js, fjs);
        }
    }(document, 'script', 'twitter-wjs'));


(function (d,s,id) {
		   var js, ajs = d.getElementsByTagName(s)[0];
		   if (!d.getElementById(id)) {
			   js = d.createElement(s);
			   js.id = id;
			   js.src = "https://secure.assets.tumblr.com/share-button.js";
			   ajs.parentNode.insertBefore(js, ajs);
			}
		}(document, "script", "tumblr-js"));


(function () {
		   var li = document.createElement("script");
		   li.type = "text/javascript";
		   li.async = true;
		   li.src = ("https:" == document.location.protocol ? "https:" : "http:") + "//platform.stumbleupon.com/1/widgets.js";
		   var s = document.getElementsByTagName("script")[0];
		   s.parentNode.insertBefore(li, s);
		   })();


(function () {
        var po = document.createElement('script');
        po.type = 'text/javascript';
        po.async = true;
        po.src = 'https://apis.google.com/js/platform.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(po, s);
    })();