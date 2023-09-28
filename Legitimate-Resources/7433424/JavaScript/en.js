/**
* All language strings used in our JavaScript should be wrapped in _t('Foo bar');
* The _t function will look for a matching key in the appropriate language file and use the corresponding value
* It will fall back to the original string if there's no exact match
* Note: although as our default language is English this particular lang file seem redundant, you could use it to override our defaults
*/
var localisedStrings = {

  /**
   * Cookie alert
   */
  'We use cookies to give you the best experience and to help improve our website.': 'We use cookies to give you the best experience and to help improve our website.',
  'I accept cookies on this site': 'I accept cookies on this site',
  'Find out what cookies we use and how to disable them': 'Find out what cookies we use and how to disable them', 
  // URL for 'more info' link
  '/Legal/Cookies/': '/Legal/Cookies/',
  
  /**
   * Postcode lookup
   */
  'Sorry, there are no results. Please check your post code and try again': 'Sorry, there are no results. Please check your post code and try again',
  'Manually enter address': 'Manually enter address',
  'Add a new address': 'Add a new address'
  
};
