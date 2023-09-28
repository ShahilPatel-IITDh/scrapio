'use strict';

/**
 * Handles JavaScript functionality for the Kaiser Hubspot plugin.
 */
function kaiserHubspot() {
  var i;

  /**
   * An event handler for value changes to checkboxes.
   * @param {Event} event - The event.
   */
  function checkboxChange(event) {
    // Find parent fieldset.
    var allCheckboxes = getSection(event.target).querySelectorAll('input[type="checkbox"]');

    // Was the click for a Select All checkbox?
    if (event.target.classList.contains('kaiser-hubspot-manage-subscriptions-form__select-all')) {
      var startProcessing = false;
      var isChecked = event.target.checked;
      for (i = 0; i < allCheckboxes.length; i++) {
        // Loop over all checkboxes until we encounter the one that was changed, then toggle all after it.
        if (startProcessing) {
          allCheckboxes[i].checked = isChecked;
        } else if (event.target.id === allCheckboxes[i].id) {
          startProcessing = true;
        }
      }
    } else {
      var allChecked = true;
      for (i = allCheckboxes.length - 1; i >= 0; i--) {
        if (allCheckboxes[i].classList.contains('kaiser-hubspot-manage-subscriptions-form__select-all')) {
          if (allCheckboxes[i].checked !== allChecked) {
            allCheckboxes[i].checked = allChecked;
          }
        } else {
          if (!allCheckboxes[i].checked) {
            allChecked = false;
          }
        }
      }
    }
  }

  /**
   * Given an element, gets the containing section.
   * @param {Element} element - The element to start from when searching for a section.
   * @returns {Element} - The section element.
   */
  function getSection(element) {
    var container = element;
    do {
      container = container.parentElement;
    } while (!container.classList.contains('kaiser-hubspot-manage-subscriptions-form__section') && container.parentElement);

    return container;
  }

  /**
   * An event handler for click and keypress events on a Next button.
   * @param {Event} event - The event.
   */
  function nextAccordion(event) {
    event.preventDefault();
    event.stopPropagation();
    var container = getSection(event.target);

    // Collapse the current accordion.
    container.querySelector('[aria-expanded]').click();

    // Expand the next accordion if not already expanded.
    var next = container.nextElementSibling.querySelector('[aria-expanded]');
    if (next.getAttribute('aria-expanded') !== 'true') {
      next.click();
    }

    // Shift focus to the next accordion.
    next.focus();
  }

  /**
   * An event handler for form submit that performs validation.
   * @param {Event} event - The event.
   */
  function onSubmit(event) {
    event.preventDefault();

    // Ensure that the email and the repeat email fields match.
    var email = document.getElementById('kaiser-hubspot-property-email');
    var repeatEmail = document.getElementById('kaiser-hubspot-property-repeat-email');
    if (email.value !== repeatEmail.value) {
      repeatEmail.setCustomValidity('Both email fields must match.');
      document.querySelector('.kaiser-hubspot-manage-subscriptions-form').reportValidity();

      return;
    } else {
      repeatEmail.setCustomValidity('');
    }

    // Handle reCAPTCHA, if configured.
    var sitekey = document.querySelector('.kaiser-hubspot-manage-subscriptions-form').dataset.sitekey;
    if (sitekey && grecaptcha) {
      grecaptcha.ready(function() {
        grecaptcha.execute(sitekey, { action: 'submit' }).then(function(token) {
          document.getElementById('kaiser_hubspot_recaptcha_token').value = token;
          event.target.submit();
        });
      });
    } else {
      event.target.submit();
    }
  }

  /**
   * An event handler for click and keypress events on an accordion control.
   * @param {Event} event - The event.
   */
  function toggleAccordion(event) {
    event.preventDefault();
    event.stopPropagation();
    var isExpanded = event.target.getAttribute('aria-expanded');
    event.target.setAttribute('aria-expanded', isExpanded === 'true' ? 'false' : 'true');
    document.getElementById(event.target.getAttribute('aria-controls')).setAttribute('aria-hidden', isExpanded)
  }

  /**
   * An event handler for changes to the country dropdown.
   * @param {Event} event - The event.
   */
  function toggleUS(event) {
    var isUS = event.target.value === 'United States';
    var regionContainer = document.querySelector('label[for="kaiser-hubspot-property-state"]');
    var regionVisible = regionContainer.getAttribute('aria-hidden') !== 'true';
    if ((isUS && !regionVisible) || (!isUS && regionVisible)) {
      regionContainer.setAttribute('aria-hidden', isUS ? 'false' : 'true');
      document.getElementById('kaiser-hubspot-property-state').required = isUS;
    }
  }

  /**
   * An event handler for an unsubscribe button click.
   * @param {Event} event - The event.
   */
  function unsubscribe(event) {
    event.preventDefault();
    fetch(
      '/wp-json/kaiser-hubspot/v1/unsubscribe'
        + '?type=' + encodeURIComponent(event.target.dataset.type)
        + '&email=' + encodeURIComponent(document.getElementById('kaiser-hubspot-property-email').value)
        + '&_wpnonce=' + encodeURIComponent(document.getElementById('kaiser_hubspot_rest_nonce').value)
    )
      .then(function(response) {
        var message = response.ok
          ? 'You have opted out of these emails. Thank you â€“ no further action is required.'
          : 'We were unable to process your request. Please use the Contact Us link in the footer to report the issue.';
        if (event.target.dataset.type === 'all') {
          document.querySelector('.kaiser-hubspot-manage-subscriptions-form').textContent = message;
        } else {
          getSection(event.target).querySelector('[aria-hidden]').textContent = message;
        }
      });
  }

  // Initialize accordions.
  var accordionControls = document.querySelectorAll('.kaiser-hubspot-manage-subscriptions-form__section [aria-expanded]');
  for (i = 0; i < accordionControls.length; i++) {
    accordionControls[i].addEventListener('click', toggleAccordion);

    // Collapse all but the first on initial load.
    if (i > 0) {
      accordionControls[i].click();
    }
  }

  // Initialize Next buttons.
  var nextControls = document.querySelectorAll('.kaiser-hubspot-manage-subscriptions-form__next');
  for (i = 0; i < nextControls.length; i++) {
    nextControls[i].addEventListener('click', nextAccordion);
  }

  // Handle submit.
  var form = document.querySelector('.kaiser-hubspot-manage-subscriptions-form');
  if (form) {
    form.addEventListener('submit', onSubmit);
  }

  // Handle clicks on checkboxes, which affects the Select All functionality.
  var checkboxControls = document.querySelectorAll('.kaiser-hubspot-manage-subscriptions-form input[type="checkbox"]');
  for (i = 0; i < checkboxControls.length; i++) {
    checkboxControls[i].addEventListener('change', checkboxChange);
  }

  // Listen for changes to the Country dropdown.
  var countryControl = document.getElementById('kaiser-hubspot-property-country');
  if (countryControl) {
    countryControl.addEventListener('change', toggleUS);
    countryControl.dispatchEvent(new Event('change'));
  }

  // Listen for clicks on the unsubscribe buttons.
  var unsubscribeControls = document.querySelectorAll('.kaiser-hubspot-manage-subscriptions-form__unsubscribe-from-all,.kaiser-hubspot-manage-subscriptions-form__unsubscribe-from-section');
  for (i = 0; i < unsubscribeControls.length; i++) {
    unsubscribeControls[i].addEventListener('click', unsubscribe);
  }
}

// Initialize when ready.
if (document.readyState !== 'loading'){
  kaiserHubspot();
} else {
  document.addEventListener('DOMContentLoaded', kaiserHubspot);
}
