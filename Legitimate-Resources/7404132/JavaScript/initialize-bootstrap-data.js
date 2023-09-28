const focusSplashScreen = function () {
      let splashScreen = window.document.getElementById("splash-screen");
      if (splashScreen) {
        splashScreen.focus();
      }
    };
    // as defined in ShortenedTheme in packages\services\utilities\services-utilities-constants\src\layout.ts
    // we only support default and dark theme for now
    const isDarkTheme = function () {
      try {
        const result = /[?&]t=([\d]*)/.exec(location.search);
        return result && result[1] === "1";
      } catch (e) {
        return false;
      }
    };

    const isDark = isDarkTheme();
    const bodyStyle = document.body.style;
    bodyStyle.backgroundColor = isDark ? "#201F1F" : "#FFFFFF";
    bodyStyle.color = isDark ? "#FFFFFF" : "#252424";

    // focus splash screen in order to narrate loading message and title of the window
    focusSplashScreen();