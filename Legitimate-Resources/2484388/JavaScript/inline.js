 
(function() {
"use strict";
var subPageMapper = {
'search-itinerary/departure': 'search',
'search-itinerary/destination': 'search',
'search-dates/departure': 'search',
'search-dates/destination': 'search',
'search-rooms': 'search',
};
function deactivateHomeAndActivateFragmentSection(homePageSection, pageFromFragmentSection) {
if (homePageSection) {
homePageSection.className = homePageSection.className.replace(/active/gi, '');
}
if (!pageFromFragmentSection.className.match('active')) {
pageFromFragmentSection.className += ' active';
}
}
var page = document.getElementById('page');
var fragment = window.location.pathname + window.location.hash; // Ideally use getPageNameFromFragment but Odigeo must be initialised
var regexFragment = fragment.match(/\/?(?:frontend-home\/)?(?:(?:dp|secure|flights)\/)?(?:#\/?)(.*?)(?:\/[^\/]*)?$/i);
var pageNameFromFragment = (regexFragment && regexFragment[1]) || 'home';
var sub_pageNameFromFragment = subPageMapper[pageNameFromFragment];
var pageName = sub_pageNameFromFragment || pageNameFromFragment;
var pageFromFragmentSection = document.getElementById(pageName);
var homePageSection = document.getElementById('home');
if (pageFromFragmentSection && pageFromFragmentSection !== homePageSection) {
deactivateHomeAndActivateFragmentSection(homePageSection, pageFromFragmentSection);
page.className = pageNameFromFragment;
} else if (homePageSection) {
if (!homePageSection.className.match('active')) {
homePageSection.className += ' active';
}
page.className = 'home';
}
}());
