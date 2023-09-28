/*
 * Sales form click tracker
 *
 * tlink() will load a 1x1 GIF to track clickouts to the contact form
 * Some basic scrambling prevents (a lot of) web scrapers to follow the link
 *
 * Date: 2016-03-22
*/

// function tlink(v, wow)
// v is a fixed string
// wow will contain the current domain name
function tlink(v, wow) {
    if (document.location.search.indexOf('_xas') === -1) {
        // define some compenents that will later form the link to the 1x1 GIF
        var proto_suf = "tp",
            string = "omainb",
            parameter = "php?salelink=1";
        // generate and load the 1x1 GIF
        new Image().src= "ht" + proto_suf + ":" + "//" + "ww" + "w.myd" + string + "uy.com/sale_form." + parameter + "&dom" + "ain_name=" + wow;
    }
}
