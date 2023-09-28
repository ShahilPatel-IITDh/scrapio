/** Shopify CDN: Minification failed

Line 75:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 100:0 Transforming const to the configured target environment ("es5") is not supported yet
Line 103:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 104:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 105:2 Transforming const to the configured target environment ("es5") is not supported yet

**/
(function() {
  var __sections__ = {};
  (function() {
    for(var i = 0, s = document.getElementById('sections-script').getAttribute('data-sections').split(','); i < s.length; i++)
      __sections__[s[i]] = true;
  })();
  (function() {
  if (!__sections__["addresses"] && !window.DesignMode) return;
  try {
    
window.melanieLib.addresses.then(
  function(addresses) {
    addresses.initialize();
  }
);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["blog-nav"] && !window.DesignMode) return;
  try {
    
window.melanieLib["blog-nav"].then(
  function(blogNav) {
    blogNav.initialize();
  }
);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["blog-sidebar"] && !window.DesignMode) return;
  try {
    
window.melanieLib["blog-like"].then(
  function(blog) {
    blog.initialize();
  },
  function(error) {
    console.error("blog-sidebar error", error);
  }
);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["carousel"] && !window.DesignMode) return;
  try {
    
window.melanieLib.carousel.then(
  function(carousel) {
    carousel.initialize();
  }
);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["cart"] && !window.DesignMode) return;
  try {
    
const container = document.querySelector(".cart-section");
window.melanieLib.cart.then(
  function(cart) {
    cart.initialize(container);
  }
);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["collection-settings"] && !window.DesignMode) return;
  try {
    
document
    .querySelector(".products-page-settings")
    .parentNode.classList.add("collection-settings-section-container");

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["gift-card"] && !window.DesignMode) return;
  try {
    
const container = document.querySelector(".gift-card-page");

function initCopyButton() {
  const button = container.querySelector(".copy button");
  const input = container.querySelector(".code-row > input");
  const alert = container.querySelector(".copied");
  button.addEventListener("click", function() {
    input.focus();
    input.select();
    document.execCommand('copy');
    alert.classList.remove("hidden");
  });
}

initCopyButton();

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["inside-the-studio"] && !window.DesignMode) return;
  try {
    
window.melanieLib.home.then(
  function(home) {
    home.insideTheStudio.initialize();
  }
);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["instagram"] && !window.DesignMode) return;
  try {
    
window.melanieLib.home.then(
  function(home) {
    home.instagram.initialize();
  }
);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["login"] && !window.DesignMode) return;
  try {
    
window.melanieLib.login.then(
  function(login) {
    login.initialize();
  }
);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["nav-bar"] && !window.DesignMode) return;
  try {
    
window.melanieLib.application.then(
  function(application) {
    application.default.navBar.initialize();
  }
);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["product-dynamic-sections"] && !window.DesignMode) return;
  try {
    
window.melanieLib.product.then(
  function(product) {
    product.default.dynamicSections.initialize();
  }
);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["product-overview"] && !window.DesignMode) return;
  try {
    
window.melanieLib.product.then(
  function(product) {
    product.default.productOverview.initialize();
  }
);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["register"] && !window.DesignMode) return;
  try {
    
window.melanieLib.register.then(
  function(register) {
    register.initialize();
  }
);

  } catch(e) { console.error(e); }
})();

(function() {
  if (!__sections__["search-settings"] && !window.DesignMode) return;
  try {
    
document
    .querySelector(".products-page-settings")
    .parentNode.classList.add("search-settings-section-container");

  } catch(e) { console.error(e); }
})();

})();
