(function() {
var en_US = function(n, ord
) {
  var s = String(n).split('.'), v0 = !s[1], t0 = Number(s[0]) == n,
      n10 = t0 && s[0].slice(-1), n100 = t0 && s[0].slice(-2);
  if (ord) return (n10 == 1 && n100 != 11) ? 'one'
      : (n10 == 2 && n100 != 12) ? 'two'
      : (n10 == 3 && n100 != 13) ? 'few'
      : 'other';
  return (n == 1 && v0) ? 'one' : 'other';
};
var plural = function(value, offset, lcfunc, data, isOrdinal) {
  if ({}.hasOwnProperty.call(data, value)) return data[value];
  if (offset) value -= offset;
  var key = lcfunc(value, isOrdinal);
  if (key in data) return data[key];
  return data.other;
};

window.__pg_t9n = {
  ALL__6b42874__55db80c: function(d) { return "ALL"; },
  "Assigned to__bb2279f__d035b23": function(d) { return "Assigned to"; },
  Closed__88d86b7__a04a1ed: function(d) { return "Closed"; },
  "Cloudy skies__5330667__0b7c37b": function(d) { return "Cloudy skies"; },
  "Cost Impact__4d7052c__6a1296f": function(d) { return "Cost Impact"; },
  "Date Closed__3189aa4__36237a2": function(d) { return "Date Closed"; },
  "Describe the task__ed5519d__0184390": function(d) { return "Describe the task"; },
  Description__55f8ebc__0184390: function(d) { return "Description"; },
  "Due Date__a1b308e__36237a2": function(d) { return "Due Date"; },
  "Enter cost in dollar__500fea2__6a1296f": function(d) { return "Enter cost in dollars and cents"; },
  "Enter number of whol__5bf42a7__6a1296f": function(d) { return "Enter number of whole days"; },
  Foggy__88957d8__0b7c37b: function(d) { return "Foggy"; },
  General__9239ee2__7b0ee31: function(d) { return "General"; },
  "Hide weather__9f90e47__c124122": function(d) { return "Hide weather"; },
  Humidity__65adb9c__0b7c37b: function(d) { return "Humidity"; },
  "In Review__fc4be1c__a04a1ed": function(d) { return "In Review"; },
  Issue__73781a1__35f4be5: function(d) { return "Issue"; },
  List__a1fffaa__3c6e7d9: function(d) { return "List"; },
  "Loading weather__96cf89d__c124122": function(d) { return "Loading weather"; },
  Location__d219c68__55db80c: function(d) { return "Location"; },
  "NEARBY (BIM)__592a7f9__55db80c": function(d) { return "NEARBY (BIM)"; },
  "No matches found...__4ee5ca7__0349df2": function(d) { return "No matches found..."; },
  "No results found__658e79f__55db80c": function(d) { return "No results found"; },
  Open__cf9b770__a04a1ed: function(d) { return "Open"; },
  Other__6e6a6f2__35f4be5: function(d) { return "Other"; },
  "Partly Cloudy__c525a4f__0b7c37b": function(d) { return "Partly Cloudy"; },
  Pending__96f608c__a04a1ed: function(d) { return "Pending"; },
  "Planned Work__2deef1f__35f4be5": function(d) { return "Planned Work"; },
  "Powered by__68976b9__c124122": function(d) { return "Powered by"; },
  Rain__0a858c9__c124122: function(d) { return "Rain"; },
  Rainy__cb2afce__0b7c37b: function(d) { return "Rainy"; },
  "Schedule Impact__2fbbf61__6a1296f": function(d) { return "Schedule Impact"; },
  "Select a location...__d23d6ba__55db80c": function(d) { return "Select a location..."; },
  "Select a sheet...__c822fcd__0349df2": function(d) { return "Select a sheet..."; },
  Sheet__53bc47a__0349df2: function(d) { return "Sheet"; },
  "Show weather__704e481__c124122": function(d) { return "Show weather"; },
  Sleet__674df73__0b7c37b: function(d) { return "Sleet"; },
  Snow__9c8238f__0b7c37b: function(d) { return "Snow"; },
  Snow__9c8238f__c124122: function(d) { return "Snow"; },
  Stamp__973fc7c__7b0ee31: function(d) { return "Stamp"; },
  "Start Date__9d7ab1a__36237a2": function(d) { return "Start Date"; },
  Status__bae7d5b__d119216: function(d) { return "Status"; },
  "Sunny & Clear__bbc7ceb__0b7c37b": function(d) { return "Sunny & Clear"; },
  Temperature__0a9062a__0b7c37b: function(d) { return "Temperature"; },
  "Title is required__2485113__0a8a191": function(d) { return "Title is required"; },
  Title__768e0c1__0a8a191: function(d) { return "Title"; },
  Type__3deb745__35f4be5: function(d) { return "Type"; },
  Unlisted__8d92c58__3c6e7d9: function(d) { return "Unlisted"; },
  Unspecified__a6e7eb7__6a1296f: function(d) { return "Unspecified"; },
  "Up to two parties ca__f60a4ce__d035b23": function(d) { return "Up to two parties can be assigned"; },
  "Updated { date } at__a7c9d0b__c124122": function(d) { return "Updated " + d.date + " at " + d.time; },
  Watching__96d9e02__d035b23: function(d) { return "Watching"; },
  "Weather data is unav__33860a9__c124122": function(d) { return "Weather data is unavailable at this moment."; },
  Weather__284af3e__0b7c37b: function(d) { return "Weather"; },
  Weather__284af3e__c124122: function(d) { return "Weather"; },
  Wind__142b575__0b7c37b: function(d) { return "Wind"; },
  Windy__d4f0ecb__0b7c37b: function(d) { return "Windy"; },
  inches__45766b4__c124122: function(d) { return "inches"; },
  unavailable__1d5ee31__0b7c37b: function(d) { return "unavailable"; },
  unavailable__1d5ee31__c124122: function(d) { return "unavailable"; },
  "{\n        count, plu__4a27743__d035b23": function(d) { return plural(d.count, 0, en_US, { "1": "1 member", other: d.count + " members" }); },
  "Account Settings__e327076__258b448": function(d) { return "Account Settings"; },
  Debug__bd604d9__f8be457: function(d) { return "Debug"; },
  "Help Center__be927d6__d750695": function(d) { return "Help Center"; },
  "Live Chat__c51fed6__d750695": function(d) { return "Live Chat"; },
  "Log Out__4e8131c__258b448": function(d) { return "Log Out"; },
  Projects__53e890d__4ab32a6: function(d) { return "Projects"; },
  "View Full Project Li__ddb312f__4ab32a6": function(d) { return "View Full Project List"; }
};(function init(fName, windowFName) {
  if (!window[fName] && window[windowFName]) {
    window[fName] = function(trKey, options) {
      var translateFunc = window[windowFName][trKey];

      if (!translateFunc) {
        console.warn("Missing translation key for " + trKey);
        return "";
      }

      return translateFunc(options);
    };
  }

  if (!window[windowFName]) {
    console.warn("translate function not defined on window");
  }
})("t9n", "__pg_t9n");
})();