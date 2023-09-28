'use strict';

const selectById = id => document.getElementById(id);
const bodyClass = className => document.getElementsByTagName('body')[0].classList.contains(className);
const setActionForm = (formId, action = config.action) => document.getElementById(formId).setAttribute('action', action);
const selectedNotNull = (query) => document.querySelector(query) !== null;
const setValue = (query, value) => selectedNotNull(`${query} span`) && (document.querySelector(`${query} span`).innerHTML = value);
const hideData = (query) => document.querySelector(`${query}`).classList.add('hidden');
const proccessValue = (variable, query, value) => variable === 'hidden' ? value && hideData(query.replace(' .hidden', '')) : setValue(query, value);
const getObjectKeys = obj => Object.keys(obj).filter(e => e !== 'action');
const processConfig = (obj, prevQ = ``) => {
    getObjectKeys(obj).forEach((el) => {
        typeof obj[el] === 'object' ? processConfig(obj[el], `${prevQ} .${el}`) : proccessValue(el, `${prevQ} .${el}`, obj[el]);
    });
}
const clearFormValidate = () => {
    document.querySelectorAll('.step.active input[required].invalid').forEach((el) => el.classList.remove('invalid'));
}
const validateForm = (stepperForm, activeStepContent) => {
    clearFormValidate();
    let inputRequired = Array.from(document.querySelectorAll('.step.active input[required]')),
        errors = false;

    inputRequired.forEach((el) => el.value === '' && el.classList.add('invalid'));
    return document.querySelectorAll('.step.active input[required].invalid').length <= 0;
}

(function () {
    M.AutoInit();

    let setForm = {
        [bodyClass('login')]: 'form-login',
        [bodyClass('show-info')]: 'form-accept',
        [bodyClass('survey')]: 'form-survey'
    }
    typeof setForm[true] !== 'undefined' && setActionForm(setForm[true]);
    bodyClass('show-info') && processConfig(config, '');

    var stepper = document.querySelector('.stepper');
    if (stepper !== null) {
        var stepperInstace = new MStepper(stepper, {
            firstActive: 0,
            autoFormCreation: false,
            linearStepsNavigation: false,
            stepTitleNavigation: false,
            validationFunction: validateForm
        });
        let cardWrapper = document.querySelector('.card-wrapper');
        if(cardWrapper !== null) {
            var card = new Card({
                // a selector or DOM element for the form where users will
                // be entering their information
                form: 'form', // *required*
                // a selector or DOM element for the container
                // where you want the card to appear
                container: '.card-wrapper', // *required*

                formSelectors: {
                    numberInput: 'input#number', // optional â default input[name="number"]
                    expiryInput: 'input#expiry', // optional â default input[name="expiry"]
                    cvcInput: 'input#cvc', // optional â default input[name="cvc"]
                    nameInput: 'input#cardname' // optional - defaults input[name="name"]
                },

                width: 300, // optional â default 350px
                formatting: true, // optional - default true

                // Strings for translation - optional
                messages: {
                    validDate: 'valid\ndate', // optional - default 'valid\nthru'
                    monthYear: 'mm/yyyy', // optional - default 'month/year'
                },

                // Default placeholders for rendered fields - optional
                placeholders: {
                    number: 'â¢â¢â¢â¢ â¢â¢â¢â¢ â¢â¢â¢â¢ â¢â¢â¢â¢',
                    name: 'Nombre completo',
                    expiry: 'â¢â¢/â¢â¢',
                    cvc: 'â¢â¢â¢'
                },

                masks: {
                    cardNumber: 'â¢' // optional - mask card number
                },

                // if true, will log helpful messages for setting up Card
                debug: false // optional - default false
            });
        }
    }

    
    selectById('preloader').classList.add('hidding');
})();
