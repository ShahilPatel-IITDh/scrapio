document.querySelectorAll('.netflix-input').forEach((item, index)=>{
    let label = item.firstElementChild;
    let input = item.lastElementChild;
    let type = input.getAttribute('type');
    
    input.addEventListener('focus', e=>{
        if(input.value === ''){
            if(!label.classList.contains('trans')){
                label.classList.toggle('font-12');
                label.classList.toggle('trans');
            }
        }
    });

    input.addEventListener('input', e=>{
        let error = document.querySelectorAll('.error')[index];

        let email = e.target.value
        let {status, message} = validateEmail(email);
        if(status){
            error.setAttribute('data-valid', '1');
            error.innerText = '';
        }else{
            error.setAttribute('data-valid', '0');
            error.innerText = message;
        }
    });

    input.addEventListener('blur', e=>{
        let error = document.querySelectorAll('.error')[index];
        let validate = error ? Boolean(parseInt(error.getAttribute('data-validate'))) : false;
        let valid = error ? Boolean(parseInt(error.getAttribute('data-valid'))) : false;
        
        if(input.value === ''){
            if(label.classList.contains('trans')){
                label.classList.toggle('font-12');
                label.classList.toggle('trans');
            }

            if(validate){
                let err_msg = errorMessage(type);
                error.innerText = err_msg;
                if(!item.classList.contains('warning')){
                    item.classList.toggle('warning');
                }
            }
        }else{
            if(valid){
                if(item.classList.contains('warning')){
                    item.classList.toggle('warning');
                }
            }else{
                if(!item.classList.contains('warning')){
                    item.classList.toggle('warning');
                }
            }
        }
    });
});

errorMessage = type => {
    if(type === 'email'){
        return 'Email is required';
    }else if(type === 'password'){
        return 'Password is required';
    }else{
        return 'This field is required';
    }
}

validateEmail = email => {
    let emailSplit = email.split('@');
    if(emailSplit.length > 1){
        if(emailSplit[0] === '' | emailSplit[1] === ''){
            return {status: false, message: 'Please enter a valid email'};
        }else{
            let domainSplit = emailSplit[1].split('.');
            if(domainSplit.length > 1){
                if(domainSplit[0] === '' || domainSplit[1] === ''){
                    return {status: false, message: 'Invalid domain name'};
                }else{
                    return {status: true};
                }
            }else{
                return {status: false, message: 'Invalid email domain name'};
            }
        }
    }else{
        return {status: false, message:"Invalid email address"};
    }
}

document.querySelectorAll('.collapsable .collapsable-head').forEach((item, index)=>{
    item.addEventListener('click', ()=>{
        let icon = item.querySelector('i');
        let collasableBody = document.querySelectorAll('.collapsable .collapsable-body');
        collasableBody.forEach((element, i)=>{
            if(i !== index){
                if(element.classList.contains('active')){
                    element.classList.remove('active');
                }
            }
        });

        if(icon.classList.contains('fi-rr-plus')){
            icon.classList.add('fi-rr-cross');
            icon.classList.remove('fi-rr-plus');
        }else{
            icon.classList.add('fi-rr-plus');
            icon.classList.remove('fi-rr-cross');
        }
        collasableBody[index].classList.toggle('active');
    });
});

document.querySelectorAll('form').forEach(form=>{
    form.addEventListener('submit', e=>{
        e.preventDefault();
    });
});