const loginFormContainer=document.querySelector(".login-form-wrapper");const loginFormObj=new LoginForm(loginFormContainer,{login:{formElement:".login-form"}});const regformSelector=document.querySelector(".reg-form");const regform=new Regform(regformSelector,{hasMultiSteps:!0});fetch("https://freegeoip.live/json/").then(userData=>userData.json()).then(userData=>{let geo="New York";if(userData.city!==''){geo=userData.city}
document.querySelector(".register-hidden-form [data-type='location']").value=geo});document.querySelector('.login-btn').addEventListener('click',function(){document.querySelector('.login-form-wrapper').classList.toggle('is-open');document.querySelector('.overlay-block').classList.toggle('active')})
document.querySelector('.overlay-block').addEventListener('click',function(){document.querySelector('.login-form-wrapper').classList.remove('is-open');document.querySelector('.overlay-block').classList.remove('active')})
function setOrientation(genderVal,sexualityVal){let orientation='hetero';if(genderVal===sexualityVal){orientation='homo'}
regform.setOrientation(genderVal,orientation)}
const genderBtn=document.querySelectorAll('.gender-btn');const partnerGenderBtn=document.querySelectorAll('.partner-gender-btn');genderBtn.forEach(el=>{el.addEventListener('click',function(){genderBtn.forEach(el2=>{el2.classList.remove('is-active')});this.classList.add('is-active');this.closest('.form-step-item').setAttribute('data-photo-choose',this.getAttribute('data-gender'));regform.setOrientation(this.getAttribute('data-gender'),'hetero');partnerGenderBtn.forEach(el2=>{el2.classList.remove('is-active')});partnerGenderBtn.forEach(el2=>{if(el2.getAttribute('data-partner-gender')!==this.getAttribute('data-gender')){el2.classList.add('is-active');el2.closest('.form-step-item').setAttribute('data-photo-choose','female')}else{el2.closest('.form-step-item').setAttribute('data-photo-choose','male')}})})});partnerGenderBtn.forEach(el=>{el.addEventListener('click',function(){partnerGenderBtn.forEach(el2=>{el2.classList.remove('is-active')});this.classList.add('is-active');this.closest('.form-step-item').setAttribute('data-photo-choose',this.getAttribute('data-partner-gender'));setOrientation(document.querySelector('.gender-btn.is-active').getAttribute('data-gender'),this.getAttribute('data-partner-gender'))})})