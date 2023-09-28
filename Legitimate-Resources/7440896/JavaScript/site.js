// Execute script only if windows has loaded, e.g. if the
// page did load and every element we want
// to manipulate is loaded
window.onload = function () {
  console.log("Page Loaded");
  let windowWidth = window.innerWidth;
  const newsletterBannerText = document.getElementById("newsletter-left");
  const htmlTextLong =
    '<p>Als unabhängiges Medium der Designwirtschaft informieren wir Sie monatlich über das aktuelle Programm von Hessen Design e.&nbsp;V. mit Ausstellungsformaten, Messeauftritten, Konferenzen, Designwettbewerben, Netzwerk-Events sowie Beratungs- und Coaching-Angeboten. Im Fokus stehen auch die Aktivitäten der Gestaltungsstudiengänge hessischer Hochschulen sowie benachbarte Disziplinen der Kultur- und Kreativwirtschaft in Hessen. <span id="newsletter-sub"><u style="cursor: pointer;">Jetzt&nbsp;anmelden<u></span>.</p>';
  const htmlTextShort =
    '<p>Als unabhängiges Medium der Designwirtschaft informieren wir Sie monatlich über das aktuelle Programm von Hessen Design e.&nbsp;V. <span id="newsletter-read-more"><u style="cursor: pointer">mehr&nbsp;lesen<u></span></p>';

  if (windowWidth <= 768) {
    newsletterBannerText.innerHTML = htmlTextShort;
    const readMore = document.getElementById("newsletter-read-more");

    readMore.onclick = function (e) {
      e.preventDefault;
      newsletterBannerText.innerHTML = htmlTextLong;

      const showNewsletterSignupBottomElement =
        document.getElementById("newsletter-sub");
      // Show newsletter signup form by clicking bottom banner element
      showNewsletterSignupBottomElement.onclick = function (e) {
        e.preventDefault;
        showNewsletterSignup();
      };
    };
  }
  // Observe the windows width dynamically and manipulate the
  // content of the newsletter banner accordingly
  window.addEventListener("resize", function () {
    windowWidth = window.innerWidth;
    console.log("window width:", windowWidth);

    // Check if window width reaches breakpoints and manipulate
    // the content of the bottom newsletter banner accordingly.
    // Also remove or set attributes (id's, classes) accordingly.
    if (windowWidth <= 768) {
      console.log("small window detected");
      newsletterBannerText.innerHTML = htmlTextShort;

      const readMore = document.getElementById("newsletter-read-more");

      readMore.onclick = function (e) {
        e.preventDefault;
        newsletterBannerText.innerHTML = htmlTextLong;

        const showNewsletterSignupBottomElement =
          document.getElementById("newsletter-sub");
        // Show newsletter signup form by clicking bottom banner element
        showNewsletterSignupBottomElement.onclick = function (e) {
          e.preventDefault;
          showNewsletterSignup();
        };
      };
    } else {
      console.log("large window detected");
      newsletterBannerText.innerHTML = htmlTextLong;

      const showNewsletterSignupBottomElement =
        document.getElementById("newsletter-sub");
      // Show newsletter signup form by clicking bottom banner element
      showNewsletterSignupBottomElement.onclick = function (e) {
        e.preventDefault;
        showNewsletterSignup();
      };
    }
  });

  // ***** Newsletter in new windows functions *****/
  // give each element on the homepage its individual
  // event listener and accordingly an individual
  // event that gets triggert on click
  let events = document.getElementsByClassName("web-link");
  console.log("events", events);

  const windowFeatures =
    "menubar=no,location=no,resizable=no,scrollbars=no,status=yes,width=850,height=750";

  for (let i = 0; i < events.length; i++) {
    const target = events[i].getAttribute("name");
    console.log("target: ", target);
    events[i].setAttribute("id", "event-" + i);

    events[i].onclick = function (e) {
      console.log("clicked with target: ", target);
      e.preventDefault();
      window.open(target, "winname", windowFeatures);
    };
  }

  // Newsletter banner bottom elements
  // Get all elements bottom
  const newsletterBannerBottomElement = document.getElementById(
    "newsletter-banner-bottom-visible"
  );

  const closeNewsletterBannerButton = document.getElementById(
    "newsletter-banner-bottom-close"
  );

  if (windowWidth > 768) {
    const showNewsletterSignupBottomElement =
      document.getElementById("newsletter-sub");
    // Show newsletter signup form by clicking bottom banner element
    showNewsletterSignupBottomElement.onclick = function (e) {
      e.preventDefault;
      showNewsletterSignup();
    };
  }

  // Hide newsletter banner bottom
  closeNewsletterBannerButton.onclick = function (e) {
    e.preventDefault();
    newsletterBannerBottomElement.removeAttribute(
      "id",
      "newsletter-banner-bottom-visible"
    );
    newsletterBannerBottomElement.setAttribute(
      "id",
      "newsletter-banner-bottom-hidden"
    );
  };

  // Newsletter button top
  const newsletterButtonTop = document.getElementById("newsletter-button-top");
  // show newsletter signup form
  newsletterButtonTop.onclick = function (e) {
    e.preventDefault;
    showNewsletterSignup();
  };

  // Newsletter signup form elements and body
  const newsletterSignup = document.getElementById(
    "newsletter-form-holder-hidden"
  );
  const bodyElement = document.getElementById("body");
  const newsletterSignupClose = document.getElementById(
    "newsletter-form-close"
  );

  newsletterSignupClose.onclick = function (e) {
    e.preventDefault();
    hideNewsletterSignup();
  };

  // Function to show the NL signup form
  function showNewsletterSignup() {
    bodyElement.removeAttribute("id", "body");
    bodyElement.setAttribute("id", "body-newsletter-visible");

    newsletterSignup.removeAttribute("id", "newsletter-form-holder-hidden");
    newsletterSignup.setAttribute("id", "newsletter-form-holder-visible");
  }

  // Function to hide the NL signup form
  function hideNewsletterSignup() {
    console.log("newsletter close clicked");
    bodyElement.removeAttribute("id", "body-newsletter-visible");
    bodyElement.setAttribute("id", "body");

    newsletterSignup.removeAttribute("id", "newsletter-form-holder-visible");
    newsletterSignup.setAttribute("id", "newsletter-form-holder-hidden");
  }
};
