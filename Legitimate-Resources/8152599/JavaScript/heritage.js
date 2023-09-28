System.import('references.js').then(function (references) {
  references.init();
});

System.import('navigation.js').then(function (nav) {
  nav.init();
});
// Set our baseURL reference path.
SystemJS.config({
  baseURL: '/themes/heritage/dist/js/components',
});

System.import('share-button.js').then(function (shareButton) {
  shareButton.init();
});

System.import('sticky-nav.js').then(function (stickyNav) {
  stickyNav.init();
});

System.import('issue-breaker.js').then(function (issueBreaker) {
  issueBreaker.init();
});

System.import('read-more.js?v=2').then(function (readMore) {
  readMore.init();
});

System.import('accordion.js').then(function (accordion) {
  accordion.accordion();
});

System.import('parallax.js').then(function (parallax) {
  parallax.init();
});

System.import('percentage-graph.js').then(function (percentageGraph) {
  percentageGraph.init();
});

System.import('filter-tab.js').then(function (filterTab) {
  filterTab.init();
});

System.import('contributors-list-bottom.js').then(function (
  contributorsListBottom
) {
  contributorsListBottom.init();
});

System.import('event-calendar.js').then(function (eventCalendar) {
  eventCalendar.init();
});

System.import('custom-dropdowns.js').then(function (customDropdowns) {
  customDropdowns.init();
});

System.import('read-more-article.js').then(function (readMoreArticle) {
  readMoreArticle.init();
});

System.import('events.js').then(function (events) {
  events.init();
});

System.import('sticky-live-event.js').then(function (stickyLiveEvent) {
  stickyLiveEvent.init();
});

System.import('about-page.js').then(function (aboutPage) {
  aboutPage.aboutPageTabs();
});

System.import('timeline.js').then(function (timeline) {
  timeline.expandTimeline();
});

System.import('slideshow.js?v=1').then(function (slideshow) {
  slideshow.slideshowInit();
});

System.import('search.js?v=2').then(function (search) {
  search.init();
});

System.import('modal-video-overlay.js').then(function (videoOverlay) {
  videoOverlay.videoOverlayInit();
});

System.import('microsite-one-page.js').then(function (onePage) {
  onePage.init();
});

System.import('microsite-sliding-nav.js').then(function (slidingNav) {
  slidingNav.slidingNavInit();
});

System.import('staff-tabs-filters.js?v=1.2').then(function (tabFilters) {
  tabFilters.init();
});

System.import('contact.js').then(function (contact) {
  contact.init();
});
System.import('menu-mobile-footer.js').then(function (menuMobileFooter) {
  menuMobileFooter.init();
});

System.import('expert.js').then(function (expert) {
  expert.init();
});

System.import('full-twitter.js?v=1.0').then(function (fullTwitter) {
  fullTwitter.fullTwitter();
});

System.import('select-center.js').then(function (selectCenter) {
  selectCenter.selectCenter();
});

System.import('copy-link.js').then(function (copyLink) {
  copyLink.init();
});

System.import('sticky-social.js').then(function (social) {
  social.init();
});

System.import('contact-sticky.js').then(function (contactSticky) {
  contactSticky.init();
});

System.import('legacy-spacer.js').then(function (legacySpacer) {
  legacySpacer.init();
});

System.import('back-to-close.js').then(function (backtoclose) {
  backtoclose.init();
});

System.import('print.js').then(function (print) {
  print.init();
});

System.import('constitution.js').then(function (print) {
  print.init();
});

System.import('homepage.js').then(function (homepage) {
  homepage.init();
});

System.import('yt-player.js').then(function (ytPlayer) {
  ytPlayer.init();
});
