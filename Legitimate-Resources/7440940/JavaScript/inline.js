
    var myArray = [
      'Coding has over 700 languages',
      '67% of programming jobs aren’t in the technology industry',
      'Coding is behind almost everything that is powered by electricity',
      'Knowing how to code is a major requirement for astronomers',
      'The first computer didn’t use any electricity',
      'Do you know there is a coding language named “Go“',
      'Computer programming is one of the fastest-growing careers',
      'Fortran (FORmula TRANslation) was the name of the first programming language',
      'The first programmer was the daughter of a mad poet',
      'Many programming languages share the same structure',
      'Coding will soon be as important as reading',
      'How many programmers does it take to change a light bulb? None, that’s a hardware problem',
      'Why do Java developers wear glasses? Because they can’t C',
      'Software and temples are much the same — first we build them, then we pray',
      'An engineer will not call it a bug — it’s an undocumented feature',
      'In a room full of top software designers, if two agree on the same thing, that’s a majority',
      'C programmers never die. They are just cast into void',
      'Knock, knock … Who’s there? … *very long pause* … Java',
      'The best thing about a boolean is even if you are wrong, you are only off by a bit',
      'Linux is only free if your time has no value',
      'The computer was born to solve problems that did not exist before',
      'Your career will load faster than this',
    ];
    var randomItem = myArray[Math.floor(Math.random() * myArray.length)];
    document.getElementsByClassName('quote')[0].innerHTML = randomItem;
  