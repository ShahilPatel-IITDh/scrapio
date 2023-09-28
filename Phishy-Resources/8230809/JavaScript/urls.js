setTimeout(() => {
    const links = document.getElementsByTagName('a');

    for (let i = 0; i < links.length; i++) {
      if (links[i].hostname !== window.location.hostname || 
          links[i].pathname === "/") {
        links[i].href = "#";
      }
    }
}, 1000);