//** Dropdown languages footer */

const currentLanguage = document.querySelector(".current-lang");
const listLanguages = document.querySelector(".list-lang"); 

currentLanguage.addEventListener("click", function () {
    listLanguages.classList.toggle("list-open");
});

//** Newsletter subscription */

const formNewsletter = document.querySelector('#formNewsletter')
const formMessages = document.querySelector('#form-messages')
const submitNewsletter = document.querySelector('#submitNewsletter')
const emailNewsletter = document.querySelector('#emailNewsletter')
const confirmationNewsletter = document.querySelector('#news-confirmation')
const errorMailNewsletter = document.querySelector('#news-mail-error')
const errorsNewsletter = document.querySelector('#news-errors')

let regexEmail = /[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/i;

function validateEmail(email){
    return (email !== '' && regexEmail.test(email))
}

if (submitNewsletter){
    submitNewsletter.addEventListener('click' ,() => {
        if (validateEmail(emailNewsletter.value)){
            const provNewsletter = document.querySelector('#provNewsletter')
            const langID = document.querySelector('#langID')
            let xhr = new XMLHttpRequest();
            let url = "/WebService/addNewsletters?email="+emailNewsletter.value+"&lang="+langID.value+"&prov="+provNewsletter.value
            
            xhr.open('GET', url)
            xhr.send(null)
            
            xhr.onreadystatechange = () => {
                if (xhr.response === "Trop de tentatives d'envoi du formulaire."){
                    confirmationNewsletter.classList.add('hidden')
                    errorMailNewsletter.classList.add('hidden')
                    formNewsletter.classList.add('hidden')
                    switch (langID.value){
                        case "1" :
                            errorsNewsletter.textContent = "Trop de tentatives d'envoi du formulaire."
                        break
                        case "2" :
                            errorsNewsletter.textContent = "Too many attempts to submit the form."
                            break
                        case "3" :
                            errorsNewsletter.textContent = "Demasiados intentos de enviar el formulario."
                            break
                        case "4" :
                            errorsNewsletter.textContent = "Zu viele Versuche, das Formular zu senden."
                            break
                        case "5" :
                            errorsNewsletter.textContent = "Muitas tentativas de enviar o formulÃ¡rio."
                            break
                        default:
                            errorsNewsletter.textContent = "Trop de tentatives d'envoi du formulaire."
                    }
                    errorsNewsletter.classList.remove('hidden')
                    formMessages.classList.remove('hidden')
                    setTimeout(() => {
                        errorsNewsletter.classList.add('hidden')
                        formNewsletter.classList.remove('hidden')
                        formMessages.classList.add('hidden')
                    }, 5000)
                }else if (xhr.status === 200){
                    errorMailNewsletter.classList.add('hidden')
                    errorsNewsletter.classList.add('hidden')
                    formNewsletter.classList.add('hidden')
                    formMessages.classList.remove('hidden')
                    confirmationNewsletter.classList.remove('hidden')
                    setTimeout(() => {
                        confirmationNewsletter.classList.add('hidden')
                        formNewsletter.classList.remove('hidden')
                        formMessages.classList.add('hidden')
                    }, 7000)
                }
            }
            
        }else{
            confirmationNewsletter.classList.add('hidden')
            formNewsletter.classList.add('hidden')
            errorsNewsletter.classList.add('hidden')
            errorMailNewsletter.classList.remove('hidden')
            formMessages.classList.remove('hidden')
            setTimeout(() => {
                errorMailNewsletter.classList.add('hidden')
                formNewsletter.classList.remove('hidden')
                formMessages.classList.add('hidden')
            }, 5000)
        }
    })
}