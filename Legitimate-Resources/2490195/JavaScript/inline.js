
  var constants = {
    emailTemplate: '<a href="http://surveysupport.medallia.com/">surveysupport.medallia.com</a>',
    defaultLanguage: "en",
  };
  var messages = {
    en: {
      title: "Oops! We couldn't find your survey.",
      primaryText: "Your link may be incorrect or out of date. Please check and try again.",
      secondaryText: "For additional help, go to " + constants.emailTemplate,
      footer: "The Medallia Team",
    },
    es: {
      title: "¡Oh, no! No encontramos tu encuesta.",
      primaryText: "Puede que tu enlace esté incorrecto o desactualizado. Por favor revisa e inténtalo de nuevo.",
      secondaryText: "Para obtener ayuda adicional, visita " + constants.emailTemplate,
      footer: "El equipo de Medallia",
    },
    fr: {
      title: "Oups! Nous n’avons pas trouvé le sondage.",
      primaryText: "Votre lien pourrait être incorrect ou obsolète. Veuillez vérifier et essayer de nouveau.",
      secondaryText: "Pour obtenir de l’aide supplémentaire, allez au " +
        constants.emailTemplate,
      footer: "L'équipe Medallia",
    },
  };
  var switchLanguage = function switchLanguage(newLanguage) {
    document.getElementById("title").innerText = messages[newLanguage].title;
    document.getElementById("primaryText").innerText =
      messages[newLanguage].primaryText;
    document.getElementById("secondaryText").innerHTML =
      messages[newLanguage].secondaryText;
    document.getElementById("footer").innerText = messages[newLanguage].footer;
  };
  switchLanguage(constants.defaultLanguage);
