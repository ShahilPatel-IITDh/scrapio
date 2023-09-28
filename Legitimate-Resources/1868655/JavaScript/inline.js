
    setTimeout(() => {
      if (isAdBlockActive) {
        document.dispatchEvent(new CustomEvent("lvAdblock", {'detail': 'initial check (1e3)'}));
      }
    }, 1e3);
    setTimeout(() => {
      if (isAdBlockActive) {
        document.dispatchEvent(new CustomEvent("lvAdblock", {'detail': 'initial check (2e3)'}));
      }
    }, 2e3);
  