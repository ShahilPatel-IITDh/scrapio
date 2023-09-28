/** Shopify CDN: Minification failed

Line 26:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 34:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 43:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 46:13 Transforming async functions to the configured target environment ("es5") is not supported yet
Line 47:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 49:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 50:4 Transforming const to the configured target environment ("es5") is not supported yet
Line 110:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 118:2 Transforming const to the configured target environment ("es5") is not supported yet
Line 119:2 Transforming const to the configured target environment ("es5") is not supported yet
... and 56 more hidden warnings

**/
initiateBackToTopButtons();
initiateLookbookButtons();
initiateQuickAddButtons();
initiateOnQuickOptionButtons("btn-add-book");
initiateOnQuickOptionButtons("options-1");
initiateRegionButtons();
initiateCloseButtons();
initiateCrossSellSelects();

document.addEventListener("click", e => {
  const containerElement = e.target.closest(".quick-add-container");
  
  if (!containerElement) {
    hideQuickAddContainer();
  }
})

window.addEventListener("scroll", (event) => {
  const modalCloseButton = document.querySelector(".quickAddModalMobile .quick-add-close-btn");

  if (modalCloseButton && window.screen.width < 960) modalCloseButton.click();

  hideQuickAddContainer();
});

window.addEventListener("DOMContentLoaded", () => {

  const userInfo = getCookieByName("GlobalE_Data");
  // const userInfo = {"countryISO":"IT","currencyCode":"EUR","cultureCode":"it"}

  setTimeout(async function() {
    const userData = await getUserRegion(userInfo.countryISO);
    // console.log({userData});
    const userRegion = userData.get('userRegion')?.toLowerCase();
    const userCountry = userData.get('countryCode')?.toLowerCase();

    loadVariantLogic(userRegion, userCountry);
    initiateVariantOptionButtons(userRegion);
  }, 100)

// 
//   quickAddButtons.forEach( quickAddButton => {
//     quickAddButton.addEventListener("click", (e) => {
//       const quickAddButton = e.target;
//       const quickAddContainer = quickAddButton.closest(".quick-add-container")?? quickAddButton.closest(".product__details");
// 
//       const sizeSelector = quickAddContainer.querySelector(".size-selector");
//       const submitButton = quickAddContainer.querySelector(".product-form__cart-submit");
// 
//       if (quickAddButton.closest(".quick-add-container")) {
//         sizeSelector.value = quickAddButton.dataset.sizeUs;
//         submitButton.click();
//         closeQuickAddPopups();
//       } else {
//         sizeSelector.value = quickAddButton.innerText;
//         sizeSelector.dispatchEvent(new Event('change'));
//         document.querySelector(".variant-option-btn.active")?.classList.remove("active");
//         quickAddButton.classList.add("active");
//       }
// 
//     });
//   });
  
});

// waitForElement('.ge-switcher-flag').then( element => {
//   const mobileSwitcher = element.cloneNode(true);
//   const mobileMenu = document.querySelector(".header .header__row-mobile .header__row-segment.right");
// 
//   mobileMenu.appendChild(mobileSwitcher);
//   
// });
// 
// function waitForElement(selector) {
//   return new Promise(resolve => {
//     if (document.querySelector(selector)) {
//       return resolve(document.querySelector(selector));
//     }
// 
//     const observer = new MutationObserver(mutations => {
//       if (document.querySelector(selector)) {
//         resolve(document.querySelector(selector));
//         observer.disconnect();
//       }
//     });
// 
//     observer.observe(document.body, {
//       childList: true,
//       subtree: true
//     });
//   });
// }

function hideQuickAddContainer() {
  const quickAddContainersOpen = document.querySelectorAll(".quick-add-container.open");
  
  quickAddContainersOpen.forEach( quickAddContainerOpen => {
    quickAddContainerOpen.classList.remove("open");
  })
}

function loadVariantLogic(userRegion, userCountry) {
  const stockAttribute = `data-${userRegion}-stock`;
  const variantSelects = document.querySelectorAll("select[data-variant-type='size']");
  const variantSelectOptions = document.querySelectorAll("select[data-variant-type='size']:not(.cross-sell-select) option:not(.disabled)");
  const crossSellsVariantOptions = document.querySelectorAll("select[data-variant-type='size'].cross-sell-select option:not(.disabled)");
  const variantButtonOptions = document.querySelectorAll(".sizes-container > ul .variant-option-btn");
  const crossSellItems = document.querySelectorAll(".cross-sells .cross-sells__items .cross-sells__item");
  // const klarnaElement = document.getElementsByTagName("klarna-placement");

  crossSellsVariantOptions.forEach( crossSellsVariantOption => {
    const variantStock = crossSellsVariantOption.getAttribute(stockAttribute);

    if (variantStock == 0) {
      crossSellsVariantOption.classList.add("sold-out");
      crossSellsVariantOption.setAttribute("disabled", "disabled");
      if (!crossSellsVariantOption.text.includes("sold out")) crossSellsVariantOption.text += " - sold out";
    }
  });

  crossSellItems.forEach( crossSellItem => {
    const crossSellValidOptions = crossSellItem.querySelectorAll(".cross-sell-select option:not(disabled):not(:not(.sold-out))");
    
    if (crossSellValidOptions.length > 0) {
      const crossSellItemAddToCartButton = crossSellItem.querySelector(".cross-sells__item-add");
      
      if (crossSellItemAddToCartButton) {
        const buttonText = crossSellItemAddToCartButton.querySelector(".cross-sells__text-add");
        crossSellItem.classList.add("d-none");
        crossSellItemAddToCartButton.setAttribute("disabled", "disabled");
        buttonText.innerText = "Unavailable";
      }
    }
  });

  variantSelectOptions.forEach( (variantOption, i) => {
    if (variantButtonOptions[i] && variantButtonOptions[i].dataset.avoidCountries) {
      const blockedCountries = variantButtonOptions[i].dataset.avoidCountries;

      if (blockedCountries.includes(userCountry)) {
        variantOption.setAttribute(stockAttribute, 0);
        variantButtonOptions[i].setAttribute(stockAttribute, 0);
        variantSelectOptions[i].setAttribute(stockAttribute, 0);
      }
    }

    const variantStock = variantOption.getAttribute(stockAttribute);

    if (variantStock == 0) {
      variantOption.classList.add("sold-out");
      variantOption.setAttribute("disabled", "disabled");
      if (variantButtonOptions[i]) variantButtonOptions[i].classList.add("invalid-btn");
      if (!variantOption.text.includes("sold out")) variantOption.text += " - sold out";
    } else if (variantStock < 5) {
      if (variantButtonOptions[i] && variantButtonOptions[i].closest(".variant-sizes")) {
        if (!variantButtonOptions[i].querySelector(".few-items-disclaimer")) {
          variantButtonOptions[i].insertAdjacentHTML("beforeend", `<span class="few-items-disclaimer">few items left</span>`);
        }
      }
    }

  });

  variantSelects.forEach( variantSelect => {
    const firstOptionAvalilable = variantSelect.querySelector("option:not(:disabled):not(.default-option)");

    if (firstOptionAvalilable) {
      // firstOptionAvalilable.selected = true;
    } else {
      const addToCartButton = variantSelect.closest(".quick-product")?.querySelector(".product-form__cart-submit");
      const formButtom = variantSelect.closest(".product-content")?.querySelector(".product-form__cart-submit");
      const productBadgesContainer = variantSelect.closest(".product-item")?.querySelector(".product-badges");

      if (addToCartButton) {
        addToCartButton.setAttribute("disabled", "disabled");
        addToCartButton.querySelector("span[data-add-to-cart-text]").innerHTML = "Unavailable";
      }

      if (formButtom) {
        formButtom.setAttribute("disabled", "disabled");
        formButtom.querySelector("span[data-add-to-cart-text]").innerHTML = "Unavailable";
      }

      if (productBadgesContainer) {
        const soldOutBadge = productBadgesContainer.querySelector(".product-badge--sold-out");

        if (!soldOutBadge) {
          const soldOutBadgeElement = `<div class="product-badge product-badge--sold-out">Sold out</div>`;

          productBadgesContainer.insertAdjacentHTML("beforeend", soldOutBadgeElement);
        }
      }
      // if (klarnaElement.length) klarnaElement[0].remove();
    }
  });
}

function initiateBackToTopButtons() {
  document.addEventListener("click", e => {
    const backToTopButton = e.target.closest(".btn-back-to-top");

    if (backToTopButton) {
      const supportsNativeSmoothScroll = ("scrollBehavior" in document.documentElement.style);

      if (supportsNativeSmoothScroll) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      } else {
        window.scrollTo(0, 0);
      }
    }

  });
}

function initiateLookbookButtons() {
  document.addEventListener("click", e => {
    const lookbookButton = e.target.closest(".lb-caption li[data-url]");

    if (lookbookButton) {
      const url = lookbookButton.dataset.url;

      window.location.href = url;
    }
  });
}

function initiateOnQuickOptionButtons(selectorClass) {
  document.addEventListener("click", e => {
    const bookQuickActionButton = e.target.closest(`.quick-add-btn.${selectorClass}`);

    if (bookQuickActionButton) {
      const quickAddContainer = bookQuickActionButton.closest(".quick-add-container");
      const submitButton = quickAddContainer.querySelector(".product-form__cart-submit");

      if (submitButton) {
        submitButton.click();
        closeQuickAddPopups();
      }
    }
  });
}

function initiateVariantOptionButtons(userRegion) {
  document.addEventListener("click", e => {
    const quickAddButton = e.target.closest(".variant-option-btn:not(.invalid-btn)");

    if (quickAddButton) {
      const stockAttribute = `data-${userRegion}-stock`;
      const quickAddContainer = quickAddButton.closest(".quick-add-container")?? quickAddButton.closest(".product__details");
      const sizeSelector = quickAddContainer.querySelector(".size-selector");
      const submitButton = quickAddContainer.querySelector(".product-form__cart-submit");
      const inventoryWrapperContainer = document.querySelector(".inventoryWrapper");
      const variantStock = quickAddButton.getAttribute(stockAttribute);

      if (quickAddButton.closest(".quick-add-container")) {
        const quickAddMobile = quickAddButton.closest(".quickAddModalMobile");

        if (quickAddMobile) {
          const dataVariantId = quickAddButton.dataset.variantId;
          const productItemContainer = document.querySelector(`.product-item .variant-option-btn[data-variant-id="${dataVariantId}"]`);
          productItemContainer.click();
        } else {
          sizeSelector.value = quickAddButton.dataset.sizeUs;
          submitButton.click();
          closeQuickAddPopups();
          // changeModalValue(quickAddButton.dataset.sizeUs, true);
        }
      } else {
        const buttonValue = quickAddButton.querySelector(".desktop")? quickAddButton.querySelector(".desktop").dataset.size : quickAddButton.dataset.sizeUs;
        const defaultOption = sizeSelector.querySelector("option.disabled");
        const newSelectedOption = sizeSelector.querySelector(`option[value='${buttonValue}']`);
        if (defaultOption) defaultOption.removeAttribute("selected");
        if (newSelectedOption) newSelectedOption.setAttribute("selected", "selected");
        setTimeout(()=> {
        sizeSelector.value = buttonValue;
        sizeSelector.dispatchEvent(new Event('change'));
        document.querySelector(".variant-option-btn.active")?.classList.remove("active");
        quickAddButton.classList.add("active");
      }, 100);
      }

      if (variantStock && variantStock != 0 && variantStock < 10) {
        if (inventoryWrapperContainer) {
          inventoryWrapperContainer.innerHTML = `Only ${variantStock} left`;
          inventoryWrapperContainer.classList.remove("invisible");
        }
      } else {
        if (inventoryWrapperContainer) {
          inventoryWrapperContainer.innerHTML = ".";
          inventoryWrapperContainer.classList.add("invisible");
        }
      }
    }

  });
}

function initiateCrossSellSelects() {
  document.addEventListener("change", e => {
    const crossSellSelect = e.target.closest(".cross-sells__item-button .cross-sell-select");

    if (crossSellSelect) {
      const crossSellAddToCartButton = crossSellSelect.closest(".cross-sells__item-button").querySelector(".cross-sells__item-add");
      const selectedOption = crossSellSelect.options[crossSellSelect.selectedIndex];
      // console.log({selectedOption});

      if (crossSellAddToCartButton) crossSellAddToCartButton.dataset.addItemId = selectedOption.dataset.variantId;
    }

  });
}


// function changeModalValue(newValue, closePopups = false) {
//   const interval = setInterval(function() {
//     const modalElement = document.querySelector(".quick-view-modal__content");
//     if (modalElement && !modalElement.classList.contains("empty")){
//       clearInterval(interval);
//       const modalSizeSelector = modalElement.querySelector(".size-selector");
//       const modalSubmmitButton = modalElement.querySelector(".product-form__cart-submit");
//       modalSizeSelector.value = newValue;
//       modalSubmmitButton.click();
//       if (closePopups) closeQuickAddPopups();
//     }
//   }, 500);
// }

function initiateQuickAddButtons() {
  document.addEventListener("click", e => {
    const quickAddButton = e.target.closest(".quick-add-btn:not(.btn-add-book)");

    if (quickAddButton) {
      const quickAddModalMobile = document.querySelector(".quickAddModalMobile");
      const quickAddItemImage = e.target.closest(".product-item__media");
      const quickAddContainer = e.target.closest(".quick-add-container");
      const producItemContainer = e.target.closest(".product-item");
      const quickAddModalButton = producItemContainer.querySelector(".show-product-quickview");
      closeQuickAddPopups();
      quickAddItemImage.classList.add("static");
      quickAddContainer.classList.add("open");
      // quickAddModalButton.click();
      quickAddModalMobile.classList.add("open");
      quickAddModalMobile.appendChild(quickAddContainer.cloneNode(true));
    }

  });
}

function initiateCloseButtons() {
  document.addEventListener("click", e => {
    const quickAddCloseButton = e.target.closest(".quick-add-close-btn");

    if (quickAddCloseButton) closeQuickAddPopups();
  });
}

function closeQuickAddPopups() {
  const quickAddContainers = document.querySelectorAll(".quick-add-container.open");
  const quickAddItemImages = document.querySelectorAll(".product-item__media.static");
  const closeModalButton = document.querySelector(".modal__close-icon");
  const quickAddModalMobile = document.querySelector(".quickAddModalMobile");

  if (quickAddModalMobile) {
    quickAddModalMobile.innerHTML = "";
    quickAddModalMobile.classList.remove("open");
  }

  if (closeModalButton) closeModalButton.click();

  quickAddContainers.forEach( quickAddContainer => {
    quickAddContainer.classList.remove("open");
  });

  quickAddItemImages.forEach( quickAddItemImage => {
    quickAddItemImage.classList.remove("static");
  });
}

function initiateRegionButtons() {
  document.addEventListener("click", e => {
    const regionButton = e.target.closest(".btn-region");

    if (regionButton) {
      const region = regionButton.dataset.label;
      const sizesContainer = regionButton.closest(".sizes-container");
      const productSizes = (sizesContainer.querySelectorAll(".shoes-sizes li").length > 0)? sizesContainer.querySelectorAll(".shoes-sizes li") : sizesContainer.querySelectorAll(".product-sizes li");
      const regionButtons = sizesContainer.querySelectorAll(".btn-region");

      regionButtons.forEach( regionButton => {
        regionButton.classList.remove("selected");
      });

      regionButton.classList.add("selected");

      productSizes.forEach( productSize => {
        const newLabel = productSize.getAttribute(`data-size-${region}`);
        productSize.innerHTML = newLabel;
      })
    }
  });
}