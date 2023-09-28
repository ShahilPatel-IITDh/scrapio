("use strict");

// suggest location
class Utils {
  isObject(value) {
    return value && typeof value === "object" && value.constructor === Object;
  }

  mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key])
            Object.assign(target, {
              [key]: {}
            });
          this.mergeDeep(target[key], source[key]);
        } else {
          Object.assign(target, {
            [key]: source[key]
          });
        }
      }
    }

    return this.mergeDeep(target, ...sources);
  }
}

/////////////////////////////////////////////////////////

// Validator
class Validator {
  constructor({ props, form, formContainer, fields }) {
    this.form = form;
    this.formContainer = formContainer;
    this.props = props;
    this.fields = fields;
    this.storage = {};
    this.errorList = new Set();
    this.lastErrorName = "";
    this.isSubmitted = false;
    this.hasEmptyFields = true;

    this.setEvents();
  }

  setEvents() {
    this.formContainer.addEventListener("field-validate", e => {
      this.highlight(e.detail.response);
    });
  }

  prepareFormData(fields) {
    const formDataList = fields.reduce((acc, item) => {
      // cancel a repeated request with the same value
      if (this.storage[item.name] === item.element.value) {
        return acc;
      }

      // new formData for new request
      const formData = new FormData();
      formData.append("ajax", "register-form");
      formData.append("scenario", item.validateRule.scenario);
      formData.append(item.fieldName, item.element.value);
      acc.push(formData);

      this.storage[item.name] = item.element.value;
      this.lastErrorName = item.errorName;

      return acc;
    }, []);

    return formDataList;
  }

  prepareRequests(dataList) {
    return dataList.map(request => {
      const data = {
        method: "POST",
        body: request
      };

      return fetch(this.props.actionURL, data);
    });
  }

  validate(fields) {
    // Updating the value of hidden inputs
    this.updateFieldValue(fields);

    // Send requests
    const fieldsData = this.prepareFormData(fields);
    const promises = this.prepareRequests(fieldsData);

    return Promise.all(promises)
      .then(responses => {
        return Promise.all(responses.map(res => res.json()));
      })
      .then(responses => {
        responses.forEach(response => {
          if (Array.isArray(response) && !response.length) {
            this.unhighlight(this.lastErrorName);
          } else {
            //this.highlight(response);
            const eventFieldValidate = new CustomEvent("field-validate", {
              detail: {
                response
              }
            });
            this.formContainer.dispatchEvent(eventFieldValidate);
          }
        });

        return this.errorList;
      })
      .catch(err => {
        console.error(err);
      });
  }

  updateFieldValue(sources) {
    const nodes = sources.map(source => source.element);

    nodes.forEach(({ name, value }) => {
      this.form.querySelector(`[name='${name}']`).value = value;
    });
  }

  unhighlight(data) {
    const errorField = this.fields.find(({ errorName }) => errorName === data);

    if (errorField) {
      // hide error message
      const errorContainer = errorField.element
        .closest(this.props.fieldContainer)
        .querySelector(this.props.errorContainer);
      errorContainer
        .closest(this.props.fieldContainer)
        .classList.remove(this.props.errorClass);
      errorContainer.innerHTML = "";
    }

    this.errorList.delete(data);
  }

  highlight(data) {
    // data example = { UserForm_location: ["Enter your postal code to find local matches"] }

    const [errorName] = Object.keys(data);
    const [errorMessage] = Object.values(data);
    const errorField = this.fields.find(field => field.errorName === errorName);

    if (errorField) {
      // show error message
      const errorContainer = errorField.element
        .closest(this.props.fieldContainer)
        .querySelector(this.props.errorContainer);

      errorContainer
        .closest(this.props.fieldContainer)
        .classList.add(this.props.errorClass);
      errorContainer.dataset.errorName = errorName;
      errorContainer.innerHTML = `<p>${errorMessage[0]}</p>`;
    }

    this.errorList.add(errorName);
  }

  async submit(fields) {
    // Prevent double submit form
    if (!this.isSubmitted) {
      const errors = await this.validate(fields);
      if (!errors.size && !this.isSubmitted) {
        this.isSubmitted = true;
        this.form.submit();
      }
    }
  }
}

/////////////////////////////////////////////////////////

// User Recovery
class UserRecovery {
  constructor({ formContainer, props: { userRecoveryProps } }) {
    this.formContainer = formContainer;
    this.userRecoveryProps = userRecoveryProps;

    this.init();
  }

  init() {
    this.emailElement = this.formContainer.querySelector(
      this.userRecoveryProps.emailElement
    );

    const tokenElement = this.formContainer.querySelector(
      this.userRecoveryProps.tokenElement
    );
    this.token = tokenElement ? tokenElement.value : "";

    this.setEvents();
  }

  setEvents() {
    this.formContainer.addEventListener("click", e => {
      e.preventDefault();

      if (e.target.matches(this.userRecoveryProps.passwordElement)) {
        this.recoveryPassword(e.target.href);
      }

      if (e.target.matches(this.userRecoveryProps.confirmElement)) {
        this.recoveryConfirm(e.target.href);
      }

      if (e.target.matches(this.userRecoveryProps.cancelElement)) {
        this.recoveryCancel(e.target.href);
      }
    });
  }

  recoveryRequest(url, formData) {
    const headers = new Headers({
      "x-requested-with": "XMLHttpRequest"
    });

    const options = {
      method: "POST",
      headers: headers,
      body: formData
    };

    fetch(url, options)
      .then(res => res.json())
      .then(({ status, data, meta }) => {
        // redirect to captcha
        if (status === "error" && meta.code === 302 && meta.redirect) {
          this.redirectToCaptcha(meta.redirect);
          return;
        }
        const message =
          status === "success" ? data.message : meta.description.description;
        this.showErrorMessage(message);
      })
      .catch(err => {
        console.error(err);
      });
  }

  recoveryPassword(url) {
    const formData = new FormData();
    formData.append("RecoveryForm[email]", this.emailElement.value);

    this.recoveryRequest(url, formData);
  }

  recoveryConfirm(url) {
    const recoveryId = url.substr(-32);
    url = url.replace("/id/" + recoveryId, "");

    const formData = new FormData();
    formData.append("id", recoveryId);
    formData.append("YII_CSRF_TOKEN", this.token);

    this.recoveryRequest(url, formData);
  }

  recoveryCancel(url) {
    this.recoveryRequest(url);
  }

  showErrorMessage(msg) {
    this.errorElement = this.formContainer.querySelector(
      this.userRecoveryProps.errorElement
    );
    this.errorElement && (this.errorElement.innerHTML = `<p>${msg}</p>`);
  }

  redirectToCaptcha(url) {
    const exp = new RegExp(/\/\/(www|m)/);

    if (!exp.test(url)) {
      url =
        location.protocol +
        "//" +
        location.host +
        (url[0] === "/" ? url : "/" + url);
    }

    window.location.href = url;
  }
}
/////////////////////////////////////////////////////////

// Multi Step
class MultiStep {
  constructor(validator, { formContainer, fields, props }) {
    this.validator = validator;
    this.formContainer = formContainer;
    this.fields = fields;
    this.props = props;

    this.init();
  }

  init() {
    this.stepsList = this.formContainer.querySelectorAll(
      this.props.stepContainer
    );
    this.currentStep = Array.from(this.stepsList).find(step =>
      step.classList.contains(this.props.activeClass)
    );
    this.nextBtn = this.formContainer.querySelector(
      this.props.formControls.nextElement
    );
    this.nextBtn && (this.nextBtn.tabIndex = 0); // need for FocusEvent.relatedTarget
    this.prevBtn = this.formContainer.querySelector(
      this.props.formControls.prevElement
    );

    // if active class is not defined
    if (!this.currentStep) {
      this.setCurrentStepData(0);
    }

    this.currentStepIndex = Array.from(this.stepsList).findIndex(step =>
      step.classList.contains(this.props.activeClass)
    );
    this.setCurrentStepData(this.currentStepIndex);

    this.setEvents();
  }

  setEvents() {
    this.nextBtn &&
      this.nextBtn.addEventListener("click", e => {
        if (e.detail > 1) return;
        e.preventDefault();

        this.next();
      });

    this.prevBtn &&
      this.prevBtn.addEventListener("click", e => {
        e.preventDefault();

        this.prev();
      });
  }

  setCurrentStepData(index) {
    this.stepsList[index].classList.add(this.props.activeClass);
    this.currentStep = this.stepsList[index];
    this.formContainer.dataset.currentStepIndex = index + 1;
    document.body.dataset.currentStepName = this.currentStep.dataset.stepName;
  }

  getCurrentStepFields() {
    const currentStepNodes = Array.from(
      this.currentStep.querySelectorAll(`[name^="${this.props.formNamespace}"]`)
    ).map(node => node.name);

    return this.fields.filter(field => {
      return (
        field.validateRule &&
        field.validateRule.required &&
        currentStepNodes.includes(field.fieldName)
      );
    });
  }
  paginationMove() {
    const nextAll = elem => {
      const matched = [];
      while ((elem = elem.nextSibling)) {
        if (elem.nodeType === 1) {
          matched.push(elem);
        }
      }
      return matched;
    };
    const prevAll = elem => {
      const matched = [];
      while ((elem = elem.previousSibling)) {
        if (elem.nodeType === 1) {
          matched.push(elem);
        }
      }
      return matched;
    };
    const currentPaginationItem = document.querySelectorAll(".pagination-item")[
      this.currentStepIndex
    ];
    document
      .querySelectorAll(".pagination-item")
      .forEach(el => el.classList.remove("current"));
    currentPaginationItem.classList.remove("active");
    currentPaginationItem.classList.add("current");
    prevAll(currentPaginationItem).forEach(el => el.classList.add("active"));
    nextAll(currentPaginationItem).forEach(el => el.classList.remove("active"));
  }
  showNextStep() {
    this.currentStepIndex++;
    this.stepBy(this.currentStepIndex, "step-next");
    this.paginationMove();
  }

  next() {
    const currentStepFields = this.getCurrentStepFields();

    if (currentStepFields.length) {
      this.validator
        .validate(currentStepFields)
        .then(errorList => {
          const currentStepErrorNames = currentStepFields
            .map(field => field.errorName)
            .filter(field => errorList.has(field));

          if (!errorList.size || !currentStepErrorNames.length) {
            // Show next step
            this.showNextStep();
          }
        })
        .catch(err => {
          console.error(err);
          return err;
        });
    } else {
      // Show next step if missing required fields
      this.showNextStep();
    }
  }

  prev() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.stepBy(this.currentStepIndex, "step-prev");
      this.paginationMove();
    }
  }

  stepBy(index, eventName = "step-change") {
    this.currentStep.classList.remove(this.props.activeClass);
    this.setCurrentStepData(index);

    //event
    const event = new Event(eventName);
    this.formContainer.dispatchEvent(event);
  }
}
/////////////////////////////////////////////////////////

// import Validator from './validator.js';
// import UserRecovery from './userrecovery.js';
// import SuggestLocation from './suggestlocation.js';
// import MultiStep from './multistep.js';
// import Utils from './utils.js';

// scenario: loginOnly
// scenario: ageOnly
// scenario: email
// scenario: location
// scenario: passwordOnly

// import Validator from './validator.js';
// import UserRecovery from './userrecovery.js';
// import SuggestLocation from './suggestlocation.js';
// import MultiStep from './multistep.js';
// import Utils from './utils.js';

// scenario: loginOnly
// scenario: ageOnly
// scenario: email
// scenario: location
// scenario: passwordOnly

// let geo = "New York";
// function setLocation() {
//   regform.setFieldValue("location", geo);
//   document.querySelector(
//     ".register-hidden-form [data-type='location']"
//   ).value = geo;
// }
// function isEmpty(obj) {
//   for (var key in obj) {
//     return false;
//   }
//   return true;
// }
// fetch("https://freegeoip.live/json/")
//   .then(userData => userData.json())
//   .then(userData => {
//     if (userData instanceof Object && isEmpty(userData)) {
//       return;
//     }
//     geo = userData.city;
//     setLocation();
//   });

class Regform extends Utils {
  constructor(formContainer, options = {}) {
    super();
    this.formContainer = formContainer;

    this.props = this.initProps(options);
    this.state = this.initState(this.formContainer, this.props);

    this.init();
  }

  init() {
    this.validator = new Validator(this.state);
    this.userRecovery = new UserRecovery(this.state);
    // this.suggestLocation = new SuggestLocation(
    //   this.getSuggestContainer(),
    //   this.state
    // );

    if (this.props.hasMultiSteps) {
      this.multiStep = new MultiStep(this.validator, this.state);
    }

    this.setEvents();
  }

  initProps(options) {
    const defaults = {
      formNamespace: "UserForm",
      formElement: ".register-hidden-form",
      actionURL: "/user/register",
      stepContainer: ".form-step-item",
      fieldContainer: ".form-item",
      errorContainer: ".form-error-block",
      errorClass: "error-field",
      validClass: "valid-field",
      activeClass: "is-active",
      formControls: {
        submitElement: ".submit-btn",
        nextElement: ".next-btn",
        prevElement: ".prev-btn"
      },
      hasMultiSteps: false,
      fields: {
        gender: {
          name: "gender"
        },
        sexual_orientation: {
          name: "sexual_orientation"
        },
        age: {
          name: "age",
          validateRule: {
            required: true,
            scenario: "ageOnly"
          }
        },
        screenname: {
          name: "login",
          validateRule: {
            required: true,
            scenario: "loginOnly"
          }
        },
        location: {
          name: "location",
          validateRule: {
            required: true,
            scenario: "location"
          }
        },
        email: {
          name: "email",
          validateRule: {
            required: true,
            scenario: "email"
          }
        },
        password: {
          name: "password",
          validateRule: {
            required: true,
            scenario: "passwordOnly"
          }
        }
      },
      userRecoveryProps: {
        formNamespace: "UserForm",
        errorElement: `[data-error-name="UserForm_email"]`,
        cancelElement: "#recoveryCancelUser",
        confirmElement: "#recoveryConfirm",
        passwordElement: "#recoveryPassword",
        tokenElement: 'input[name="YII_CSRF_TOKEN"]',
        emailElement: `input[name="UserForm[email]"]`
      }
    };

    return this.mergeDeep(defaults, options);
  }

  initState(formContainer, props) {
    const form = formContainer.querySelector(props.formElement);
    const fields = this.setFields();

    return {
      props,
      formContainer,
      form,
      fields
    };
  }

  setFields() {
    return Object.values(this.props.fields).reduce((acc, field) => {
      const element = this.formContainer.querySelector(
        `[name='${this.props.formNamespace}[${field.name}]']:not([type='hidden'])`
      );

      if (element) {
        const fieldName = element.name;
        const extendedField = {
          element,
          fieldName,
          errorName: `${this.props.formNamespace}_${field.name}`
        };

        acc.push(Object.assign(field, extendedField));
      }

      return acc;
    }, []);
  }

  getFieldsElement(name) {
    return this.state.fields.find(field => field.name === name).element;
  }

  setFieldValue(name, value) {
    const element = this.state.fields.find(field => field.name === name)
      .element;

    element.value = value;
    element.dispatchEvent(new Event("blur"));
    element.dispatchEvent(new Event("change"));
  }
  checkTouchScreen() {
    let hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
      hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
      var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
      if (mQ && mQ.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
      } else if ("orientation" in window) {
        hasTouchScreen = true; // deprecated, but good fallback
      } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen =
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }
    return hasTouchScreen;
  }
  setEvents() {
    const validateRequiredFields = this.state.fields.filter(
      ({ validateRule }) => validateRule && validateRule.required
    );
    const inputs = validateRequiredFields.filter(
      input => input.element.tagName === "INPUT"
    );
    const selects = validateRequiredFields.filter(
      select => select.element.tagName === "SELECT"
    );

    // Event listener for Submit FORM
    const eventFormSubmit = new Event("form-submit");
    this.submitBtn = this.formContainer.querySelector(
      this.props.formControls.submitElement
    );
    this.formContainer.addEventListener(
      "form-submit",
      e => {
        this.validator.submit(validateRequiredFields);
      },
      true
    );
    this.submitBtn.addEventListener("click", e => {
      if (e.detail > 1) return;
      e.preventDefault();

      this.formContainer.dispatchEvent(eventFormSubmit);
    });

    // Event listeners for BLUR INPUTS
    const eventInputBlur = new Event("field-blur");
    inputs.forEach(input => {
      input.element.addEventListener("field-blur", e => {
        this.validator.validate([input]);
      });

      if (this.checkTouchScreen()) {
        input.element.addEventListener("touchend", e => {
          if (
            (this.submitBtn && this.submitBtn === e.relatedTarget) ||
            (this.multiStep &&
              this.multiStep.nextBtn &&
              this.multiStep.nextBtn === e.relatedTarget)
          ) {
            return;
          }

          e.target.dispatchEvent(eventInputBlur);
        });
      } else {
        input.element.addEventListener("blur", e => {
          if (
            (this.submitBtn && this.submitBtn === e.relatedTarget) ||
            (this.multiStep &&
              this.multiStep.nextBtn &&
              this.multiStep.nextBtn === e.relatedTarget)
          ) {
            return;
          }

          e.target.dispatchEvent(eventInputBlur);
        });
      }
    });

    // Event listeners for CHANGE SELECTS
    const eventSelectChange = new Event("field-change");
    selects.forEach(select => {
      select.element.addEventListener("field-change", e => {
        this.validator.validate([select]);
      });
      select.element.addEventListener("change", e => {
        e.target.dispatchEvent(eventSelectChange);
      });
    });

    // Event listener for Orientation
    const orientationField = this.getFieldsElement("sexual_orientation");
    const eventOrientationChange = new Event("orientation-change");
    orientationField.addEventListener("orientation-change", ({ target }) => {
      //this.validator.updateFieldValue([target]);
      const { form, props } = this.state;

      target.dataset.genderSelected =
        target.selectedOptions[0].dataset.genderValue;
      form.querySelector(`[name='${props.formNamespace}[gender]']`).value =
        target.dataset.genderSelected;

      document.body.dataset.orientation = `${target.value}-${target.dataset.genderSelected}`;
      form.querySelector(`[name='${target.name}']`).value = target.value;
    });
    orientationField.addEventListener("change", ({ target }) => {
      target.dispatchEvent(eventOrientationChange);
    });
  }

  setOrientation(gender, orientation) {
    const select = this.getFieldsElement("sexual_orientation");

    select.querySelector(
      `option[value="${orientation}"][data-gender-value="${gender}"]`
    ).selected = true;
    select.dispatchEvent(new Event("change"));
  }
}
////////////////////////////////////////////////////////

class LoginForm extends Utils {
  constructor(formContainer, options = {}) {
    super();
    this.formContainer = formContainer;
    this.props = this.initProps(options);
    this.state = this.initState(this.formContainer);
    this.errorList = [];
    this.lastErrorContainer = null;
    this.isSubmitted = false;
    this.setEvents();
  }
  initProps(options) {
    const defaults = {
      login: {
        formNamespace: "LoginForm",
        actionURL: "/site/checkLogin",
        formElement: ".login-form",
        emailElement: ".login-email-field",
        emailError: '[data-error-name="email"]',
        msisdnError: '[data-error-name="msisdn"]',
        passwordElement: ".login-password-field",
        passwordError: '[data-error-name="password"]',
        submitElement: ".login-form-submit"
      },
      recovery: {
        formNamespace: "RecoveryForm",
        actionURL: "/account/remindPassword",
        formElement: ".recovery-form",
        emailElement: ".recovery-email-field",
        emailError: '[data-error-name="email"]',
        emailSuccess: '[data-success-name="email"]',
        submitElement: ".recovery-form-submit"
      },
      fieldContainer: ".form-item",
      fieldElement: ".form-input input",
      errorClass: "error-field",
      validClass: "valid-field"
    };
    return this.mergeDeep(defaults, options);
  }
  initState(formContainer) {
    const loginForm = formContainer.querySelector(this.props.login.formElement);
    const recoveryForm = formContainer.querySelector(
      this.props.recovery.formElement
    );
    const fields = this.initFields(loginForm, recoveryForm);
    return {
      loginForm,
      recoveryForm,
      fields
    };
  }
  initFields(loginForm, recoveryForm) {
    const { login, recovery } = this.props;
    const loginEmailField = loginForm.querySelector(login.emailElement);
    const loginEmailError = loginForm.querySelector(login.emailError);
    const loginMsisdnError = loginForm.querySelector(login.msisdnError);
    const loginPasswordField = loginForm.querySelector(login.passwordElement);
    const loginPasswordError = loginForm.querySelector(login.passwordError);
    const recoveryEmailField = recoveryForm.querySelector(
      recovery.emailElement
    );
    const recoveryEmailError = recoveryForm.querySelector(recovery.emailError);
    const recoveryEmailSuccess = recoveryForm.querySelector(
      recovery.emailSuccess
    );
    return {
      [loginEmailField.name]: {
        element: loginEmailField,
        value: null,
        error: loginEmailError
      },
      [`${login.formNamespace}[msisdn]`]: {
        element: loginEmailField,
        value: null,
        error: loginMsisdnError
      },
      [loginPasswordField.name]: {
        element: loginPasswordField,
        value: null,
        error: loginPasswordError
      },
      [recoveryEmailField.name]: {
        element: recoveryEmailField,
        value: null,
        error: recoveryEmailError,
        success: recoveryEmailSuccess
      }
    };
  }
  setEvents() {
    const { login, recovery } = this.props;
    const { loginForm, recoveryForm } = this.state;
    const loginSubmitBtn = loginForm.querySelector(login.submitElement);
    loginSubmitBtn.addEventListener("click", e => {
      e.preventDefault();
      if (this.hasSameValues(loginForm)) return;
      this.submit(login.actionURL, loginForm);
    });
    const recoverySubmitBtn = recoveryForm.querySelector(
      recovery.submitElement
    );
    recoverySubmitBtn.addEventListener("click", e => {
      e.preventDefault();
      this.validate(recovery.actionURL, recoveryForm);
    });
    const forgotPassword = this.formContainer.querySelector(
      ".recovery-password-btn"
    );
    forgotPassword.addEventListener("click", e => {
      this.switchToForm("login", "recovery");
    });
    const backToLogin = this.formContainer.querySelector(".login-switch-btn");
    backToLogin.addEventListener("click", e => {
      this.switchToForm("recovery", "login");
    });
  }
  hasSameValues(form) {
    const sameValues = [];
    form
      .querySelectorAll(this.props.fieldElement)
      .forEach(({ name, value }) => {
        sameValues.push(this.state.fields[name].value === value);
      });
    return sameValues.every(Boolean);
  }
  switchToForm(from, to) {
    const fromForm = this.formContainer.querySelector(
      this.props[from].formElement
    );
    const toForm = this.formContainer.querySelector(this.props[to].formElement);
    fromForm.classList.remove("visible");
    fromForm.classList.add("hidden");
    toForm.classList.remove("hidden");
    toForm.classList.add("visible");
    fromForm
      .querySelector(this.props.fieldContainer)
      .classList.remove(this.props.errorClass);
    const { fields } = this.state;
    if (
      fields[`${this.props[from].formNamespace}[email]`].element.value !== ""
    ) {
      fields[`${this.props[to].formNamespace}[email]`].element
        .closest(".form-item")
        .classList.add("is-focused");
      fields[`${this.props[from].formNamespace}[email]`].element
        .closest(".form-item")
        .classList.remove("is-focused");
    }

    fields[`${this.props[to].formNamespace}[email]`].element.value =
      fields[`${this.props[from].formNamespace}[email]`].element.value;
    toForm.querySelector(this.props[to].submitElement).click();
    // .dispatchEvent(new Event("click"));
    // toForm
    //   .querySelector(this.props.fieldElement)
    //   .dispatchEvent(new Event("blur"));
  }
  updateState(form) {
    form
      .querySelectorAll(this.props.fieldElement)
      .forEach(({ name, value }) => {
        // this.state.fields[name].value = value;
      });
  }
  redirect(url) {
    const exp = new RegExp(/\/\/(www|m)/);
    if (!exp.test(url)) {
      url =
        location.protocol +
        "//" +
        location.host +
        (url[0] === "/" ? url : "/" + url);
    }
    window.location.href = url;
  }
  prepareFetchOptions(form) {
    const body = new FormData(form);
    const headers = new Headers({
      "x-requested-with": "XMLHttpRequest"
    });
    return {
      method: "POST",
      headers,
      body
    };
  }
  validate(url, form) {
    this.updateState(form);
    const options = this.prepareFetchOptions(form);
    return fetch(url, options)
      .then(res => res.json())
      .then(({ data, status, meta }) => {
        if (status === "error") {
          if (meta.code === 302 && meta.redirect) {
            this.redirect(meta.redirect);
            return;
          }
          this.renderErrors(meta.description);
        }

        if (status === "success") {
          if (data.valid) {
            this.renderErrors(data);
            return;
          }
          this.errorList = [];
        }
        return this.errorList;
      })
      .catch(err => {
        throw err;
      });
  }
  renderErrors(data) {
    const { login, recovery, errorClass, validClass } = this.props;
    const { fields } = this.state;
    if (data.type) {
      const errorName = `${login.formNamespace}[${data.type}]`;
      this.renderMessage(fields[errorName].error, data.message, errorClass);
      this.errorList.push(errorName);
    }
    if (data.type === "email") {
      fields["LoginForm[password]"].error
        .closest(this.props.fieldContainer)
        .classList.remove(errorClass);
    }
    if (data.type === "password") {
      fields["LoginForm[email]"].error
        .closest(this.props.fieldContainer)
        .classList.remove(errorClass);
    }
    const recoveryName = `${recovery.formNamespace}[email]`;
    if (data.email) {
      this.renderMessage(
        fields[recoveryName].error,
        data.email[0],
        errorClass,
        validClass
      );
    }
    if (data.valid) {
      this.renderMessage(
        fields[recoveryName].success,
        data.message,
        validClass,
        errorClass
      );
    }
  }
  renderMessage(container, message, errorClass, validClass) {
    this.lastErrorContainer && (this.lastErrorContainer.innerHTML = "");
    this.lastErrorContainer = container;
    container.innerHTML = `<p>${message}</p>`;

    container.closest(this.props.fieldContainer).classList.add(errorClass);
    container.closest(this.props.fieldContainer).classList.remove(validClass);
  }
  async submit(url, form) {
    if (!this.isSubmitted) {
      const errors = await this.validate(url, form);
      if (!errors.length && !this.isSubmitted) {
        this.isSubmitted = true;
        form.submit();
      }
    }
  }
}

/* Visible or hide password */
var passwordFields = document.querySelectorAll(
  '.form-input input[type="password"]'
);
document.querySelector(".password-icon").addEventListener("click", function(e) {
  e.target.classList.toggle("active");
  passwordFields.forEach(field => {
    if (field.type == "password") {
      field.setAttribute("type", "text");
    } else {
      field.setAttribute("type", "password");
    }
  });
});

/* SELECT,INPUT FOCUS */
var fieldSettings = {
  fieldContainer: ".form-item",
  activeClass: "is-active",
  focusClass: "is-focused",
  select: {
    container: ".form-select",
    selectedValue: ".select-value",
    dropdown: ".select-dropdown",
    dropdownItem: "select-item"
  }
};

function addFocus(el) {
  el.closest(fieldSettings.fieldContainer).classList.add(
    fieldSettings.focusClass
  );
}

function removeFocus(el) {
  el.closest(fieldSettings.fieldContainer).classList.remove(
    fieldSettings.focusClass
  );
}

function selectChange(el) {
  el
    .closest(fieldSettings.select.container)
    .querySelector(fieldSettings.select.selectedValue).innerHTML =
    el.options[el.selectedIndex].textContent;
}
const formSelects = document.querySelectorAll(".form-select select");
formSelects.forEach(select => {
  Array.from(select.options).forEach(option => {
    if (option.selected) {
      selectChange(select);
      addFocus(option);
    }
  });
  select.addEventListener("change", function() {
    addFocus(this);
    selectChange(this);
  });
});
const formInputs = document.querySelectorAll(".form-input input");
formInputs.forEach(input => {
  input.addEventListener("focus", function() {
    addFocus(this);
    this.closest(fieldSettings.fieldContainer).classList.add(
      fieldSettings.activeClass
    );
  });
  input.addEventListener("blur", function() {
    !this.value ? removeFocus(this) : addFocus(this);
    this.closest(fieldSettings.fieldContainer).classList.remove(
      fieldSettings.activeClass
    );
  });
  input.value ? addFocus(input) : removeFocus(input);
});

const {
  container,

  selectedValue,
  dropdown,
  dropdownItem
} = fieldSettings.select;

function renderSelects(container, selectedValue, dropdown, dropdownItem) {
  const selectContainer = document.querySelectorAll(container);

  selectContainer.forEach(select => {
    let clonedSelectHTML = "";
    const selectValue = [...select.querySelectorAll(selectedValue)];
    const clonedOption = select.querySelectorAll("option");
    const pageDropdown = select.querySelector(dropdown);

    clonedOption.forEach((option, i) => {
      const optionHTML = option.innerHTML;
      if (option.selected) selectValue[i].innerHTML = optionHTML;
      clonedSelectHTML += `<div class="${dropdownItem}" value="${option.value}"> ${optionHTML} </div>`;
    });
    pageDropdown.innerHTML = clonedSelectHTML;
  });
}

renderSelects(container, selectedValue, dropdown, dropdownItem);

const pageSelects = document.querySelectorAll(container);

pageSelects.forEach(select => {
  const event = new Event("change");
  select.addEventListener("click", function(e) {
    if (e.target.classList.contains(dropdownItem)) {
      const index = [
        ...this.querySelectorAll(`.${e.target.classList}`)
      ].indexOf(e.target);
      this.querySelector("select").selectedIndex = index;
      this.querySelector("select").dispatchEvent(event);
    }
    this.classList.toggle(fieldSettings.activeClass);
  });
});

// Close all possible opened select boxes on outside click
document.addEventListener("click", e => {
  const activeClass = "is-active";
  const select = document.querySelectorAll(fieldSettings.select.container);
  if (e.target.closest(".form-item") === null) {
    select.forEach(el => el.classList.remove(activeClass));
  } else {
    const activeSelect = [...select].filter(i =>
      i.classList.contains(activeClass)
    );
    if (activeSelect.length === [...select].length) {
      console.log(activeSelect);
      activeSelect[1].classList.remove(activeClass);
    }
  }
});
