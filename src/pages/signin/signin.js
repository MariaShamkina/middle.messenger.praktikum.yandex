export function submitClickDummy(){
    let submit = document.querySelector('.submit-button');
    submit.onclick = function(e){
        location.href = '../chat/chat.html';
        e.preventDefault();
    }
}

export function passwordEqualityValidation(){
    let password = document.querySelector('[name="password"]');
    let confirm_password = document.querySelector('[name="confirmPassword"]');

    password.onkeyup = validatePassword;
    confirm_password.onkeyup = validatePassword;

    let errorFieldImg = document.querySelector('.error-field-img');
    errorFieldImg.onclick = function(){
        let errorText = document.querySelector('.error-text-absolute');
        errorText.hidden = !errorText.hidden;
    }
}

let password = document.querySelector('[name="password"]');
let confirm_password = document.querySelector('[name="confirmPassword"]');
let confPasswordFieldWrapper = document.querySelector('.wrapper-confirmPassword-field');
let errorFieldWrapper = document.querySelector('.wrapper-error-field');
let errorText = document.querySelector('.error-text-absolute');
function validatePassword(){
    if(password.value != confirm_password.value) {
        confPasswordFieldWrapper.classList.add("error-field");
        errorFieldWrapper.hidden = false;
        errorText.textContent = 'Пароли не совпадают';
    }
    else{
        confPasswordFieldWrapper.classList.remove("error-field");
        errorFieldWrapper.hidden = true;
        errorText.textContent = '';
    }
}