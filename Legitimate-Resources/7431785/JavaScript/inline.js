
    var newPath = 'https:\/\/saml.e-access.att.com\/isam\/sps\/ATTIDP\/saml20\/login?SAMLRequest=fZFRb4IwFIX%2FCumLTwWKEGYjGKcxM3EbUdzDXkwpVZtAy3qL2%2F79CGrmHubr7T3nfPd0PPmqK%2BckDEitkgFx%2FYEjFNelVIdksM0X%2BGEwScfA6qqh09Ye1Vp8tAKs0%2BkU0P4hQa1RVDOQQBWrBVDL6Wb6vKKB69PGaKu5rpCznCdox0jMiiAq8J7HDIdRSDAjoxjzgPukIFFZBiFy3i5EqHPohACtWCqwTNlu5AdD7MeYDHNCaDSiYfCOnOwS8yhVD3%2BXqTgvAX3K8wxnr5scOVMAYWwXOtMK2lqYjTAnycV2vUrQ0doGqOcxa4nbNHV3lMt17VX6INUO2sJtGDr3RHtac1PQfRZ2zUXpr%2FHYu7G69v%2FSaZfzTFeSfzsLbWpm%2F7cmLuknssT7fpW2ChrB5V6Ksru2qvTnzAhmRYKsaQXy0nPo339OfwA%3D';
    var combinedPath = newPath;

function setCookie(c_name,value,expiresInSeconds)
{
    console.log('setCookie() start');
    var exdate=new Date(new Date().getTime() + expiresInSeconds * 1000);
    var c_value=escape(value) + (!expiresInSeconds ? "" : "; Expires="+exdate.toUTCString()) + '; Path=/; Domain=.ppmpro.com; Secure';
    document.cookie=c_name + "=" + c_value;
    console.log('setCookie() end - set ' + c_name + ' to \'' + value + '\'.');
}

    if (location.href && location.href.indexOf('/home.pa') >= 0) {
        var relativeUrl = location.pathname + location.search + location.hash;
        setCookie('queuedRequest', relativeUrl, 120);
    }
    location.replace(combinedPath);
